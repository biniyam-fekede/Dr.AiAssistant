using DrAiAssistant.Validation.Core.Models;

namespace DrAiAssistant.Validation.Core.Interfaces;

public interface IInputValidator
{
    ValidationResult Validate(string input);
}
