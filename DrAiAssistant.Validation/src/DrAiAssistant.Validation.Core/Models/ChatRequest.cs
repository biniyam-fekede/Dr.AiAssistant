namespace DrAiAssistant.Validation.Core.Models;

public class ChatRequest
{
    public string Message { get; set; } = string.Empty;
    public int? ConversationId { get; set; }
    public string? AccessToken { get; set; }
}
