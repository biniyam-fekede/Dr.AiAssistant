using System.Text.RegularExpressions;
using DrAiAssistant.Validation.Core.Interfaces;

namespace DrAiAssistant.Validation.Core.Services;

public class OutputSanitizationService : IOutputSanitizer
{
    private const int MaxResponseLength = 5000;

    // Patterns for PII that might leak through the LLM
    private static readonly Regex PhonePattern = new(
        @"\b(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b", RegexOptions.Compiled);
    private static readonly Regex EmailPattern = new(
        @"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", RegexOptions.Compiled);
    private static readonly Regex SsnPattern = new(
        @"\b\d{3}-\d{2}-\d{4}\b", RegexOptions.Compiled);

    // LLM artifact tokens that may leak through
    private static readonly Regex LlmArtifactPattern = new(
        @"<\|[^|]*\|>|<s>|</s>|\[INST\]|\[/INST\]|<<SYS>>|<</SYS>>", RegexOptions.Compiled);

    public string Sanitize(string output)
    {
        if (string.IsNullOrWhiteSpace(output))
            return string.Empty;

        var sanitized = output;

        // Remove LLM artifacts
        sanitized = LlmArtifactPattern.Replace(sanitized, string.Empty);

        // Mask PII patterns
        sanitized = SsnPattern.Replace(sanitized, "[SSN REDACTED]");
        sanitized = EmailPattern.Replace(sanitized, "[EMAIL REDACTED]");
        sanitized = PhonePattern.Replace(sanitized, "[PHONE REDACTED]");

        // Cap response length
        if (sanitized.Length > MaxResponseLength)
            sanitized = sanitized[..MaxResponseLength] + "...";

        return sanitized.Trim();
    }
}
