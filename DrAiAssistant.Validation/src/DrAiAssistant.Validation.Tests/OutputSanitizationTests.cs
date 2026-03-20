using DrAiAssistant.Validation.Core.Services;
using Xunit;

namespace DrAiAssistant.Validation.Tests;

public class OutputSanitizationTests
{
    private readonly OutputSanitizationService _sanitizer = new();

    [Fact]
    public void Sanitize_EmptyInput_ReturnsEmpty()
    {
        Assert.Equal(string.Empty, _sanitizer.Sanitize(""));
    }

    [Fact]
    public void Sanitize_NormalText_PassesThrough()
    {
        var input = "Take two aspirin and drink plenty of water.";
        Assert.Equal(input, _sanitizer.Sanitize(input));
    }

    [Fact]
    public void Sanitize_LlmArtifacts_AreRemoved()
    {
        var input = "Hello <|eot_id|> world <s> test </s>";
        var result = _sanitizer.Sanitize(input);
        Assert.DoesNotContain("<|eot_id|>", result);
        Assert.DoesNotContain("<s>", result);
        Assert.Contains("Hello", result);
        Assert.Contains("world", result);
    }

    [Fact]
    public void Sanitize_SsnPattern_IsMasked()
    {
        var input = "Your SSN is 123-45-6789";
        var result = _sanitizer.Sanitize(input);
        Assert.Contains("[SSN REDACTED]", result);
        Assert.DoesNotContain("123-45-6789", result);
    }

    [Fact]
    public void Sanitize_EmailPattern_IsMasked()
    {
        var input = "Contact john@example.com for more info";
        var result = _sanitizer.Sanitize(input);
        Assert.Contains("[EMAIL REDACTED]", result);
        Assert.DoesNotContain("john@example.com", result);
    }

    [Fact]
    public void Sanitize_LongOutput_IsTruncated()
    {
        var input = new string('a', 6000);
        var result = _sanitizer.Sanitize(input);
        Assert.True(result.Length <= 5003); // 5000 + "..."
    }
}
