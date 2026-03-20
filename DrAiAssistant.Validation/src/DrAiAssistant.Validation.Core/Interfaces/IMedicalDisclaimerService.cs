using DrAiAssistant.Validation.Core.Models;

namespace DrAiAssistant.Validation.Core.Interfaces;

public interface IMedicalDisclaimerService
{
    MedicalAssessment Assess(string userInput, string aiResponse);
}
