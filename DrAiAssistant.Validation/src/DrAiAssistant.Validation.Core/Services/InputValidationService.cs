using System.Text.RegularExpressions;
using DrAiAssistant.Validation.Core.Interfaces;
using DrAiAssistant.Validation.Core.Models;

namespace DrAiAssistant.Validation.Core.Services;

public class InputValidationService : IInputValidator
{
    private const int MinLength = 2;
    private const int MaxLength = 2000;

    private static readonly Regex HtmlTagPattern = new(@"<[^>]*>", RegexOptions.Compiled);
    private static readonly Regex ScriptPattern = new(
        @"(javascript\s*:|on\w+\s*=|<script|</script)", RegexOptions.Compiled | RegexOptions.IgnoreCase);
    private static readonly Regex SqlInjectionPattern = new(
        @"(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\b\s)" +
        @"|(--.*)|(;.*\b(DROP|DELETE|UPDATE)\b)" +
        @"|(\b(OR|AND)\b\s+\d+\s*=\s*\d+)",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);
    private static readonly Regex PromptInjectionPattern = new(
        @"(ignore\s+(all\s+)?previous\s+instructions)" +
        @"|(you\s+are\s+now\s+a)" +
        @"|(system\s*:\s*)" +
        @"|(forget\s+(all\s+)?your\s+(instructions|rules))" +
        @"|(\<\|start_header_id\|\>)" +
        @"|(\<\|end_header_id\|\>)" +
        @"|(\<\|eot_id\|\>)",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public ValidationResult Validate(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return ValidationResult.Failure("Message cannot be empty.");

        var trimmed = input.Trim();

        if (trimmed.Length < MinLength)
            return ValidationResult.Failure($"Message must be at least {MinLength} characters.");

        if (trimmed.Length > MaxLength)
            return ValidationResult.Failure($"Message cannot exceed {MaxLength} characters.");

        // Check for prompt injection attempts
        if (PromptInjectionPattern.IsMatch(trimmed))
            return ValidationResult.Failure("Message contains disallowed patterns.");

        // Strip HTML tags
        var sanitized = HtmlTagPattern.Replace(trimmed, string.Empty);

        // Check for script injection
        if (ScriptPattern.IsMatch(trimmed))
            return ValidationResult.Failure("Message contains disallowed content.");

        // Check for SQL injection patterns
        if (SqlInjectionPattern.IsMatch(trimmed))
            return ValidationResult.Failure("Message contains disallowed patterns.");

        return ValidationResult.Success(sanitized);
    }
}
