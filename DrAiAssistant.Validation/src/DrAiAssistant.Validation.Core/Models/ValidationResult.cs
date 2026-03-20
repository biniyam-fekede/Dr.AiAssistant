namespace DrAiAssistant.Validation.Core.Models;

public class ValidationResult
{
    public bool IsValid { get; set; }
    public List<string> Errors { get; set; } = new();
    public string SanitizedInput { get; set; } = string.Empty;

    public static ValidationResult Success(string sanitizedInput) => new()
    {
        IsValid = true,
        SanitizedInput = sanitizedInput
    };

    public static ValidationResult Failure(params string[] errors) => new()
    {
        IsValid = false,
        Errors = errors.ToList()
    };
}
