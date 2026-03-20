using Microsoft.AspNetCore.Mvc;
using DrAiAssistant.Validation.Core.Interfaces;
using DrAiAssistant.Validation.Core.Models;
using DrAiAssistant.Validation.Core.Services;

namespace DrAiAssistant.Validation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatValidationController : ControllerBase
{
    private readonly IInputValidator _inputValidator;
    private readonly IOutputSanitizer _outputSanitizer;
    private readonly IMedicalDisclaimerService _disclaimerService;
    private readonly BackendProxyService _backendProxy;
    private readonly ILogger<ChatValidationController> _logger;

    public ChatValidationController(
        IInputValidator inputValidator,
        IOutputSanitizer outputSanitizer,
        IMedicalDisclaimerService disclaimerService,
        BackendProxyService backendProxy,
        ILogger<ChatValidationController> logger)
    {
        _inputValidator = inputValidator;
        _outputSanitizer = outputSanitizer;
        _disclaimerService = disclaimerService;
        _backendProxy = backendProxy;
        _logger = logger;
    }

    [HttpPost("chat")]
    public async Task<IActionResult> Chat([FromBody] ChatRequest request)
    {
        // 1. Validate input
        var validation = _inputValidator.Validate(request.Message);
        if (!validation.IsValid)
        {
            return BadRequest(new { errors = validation.Errors });
        }

        // 2. Forward sanitized input to Django backend
        var (rawResponse, conversationId) = await _backendProxy.ForwardChatAsync(
            validation.SanitizedInput,
            request.ConversationId,
            request.AccessToken);

        // 3. Sanitize output
        var sanitizedResponse = _outputSanitizer.Sanitize(rawResponse);

        // 4. Assess medical content and attach disclaimers
        var assessment = _disclaimerService.Assess(request.Message, sanitizedResponse);

        var response = new ChatResponse
        {
            Response = sanitizedResponse,
            ConversationId = conversationId,
            Disclaimer = assessment.Disclaimer,
            IsEmergency = assessment.RequiresEmergencyWarning
        };

        return Ok(response);
    }
}
