using System.Text.RegularExpressions;
using DrAiAssistant.Validation.Core.Interfaces;
using DrAiAssistant.Validation.Core.Models;

namespace DrAiAssistant.Validation.Core.Services;

public class MedicalDisclaimerService : IMedicalDisclaimerService
{
    private const string StandardDisclaimer =
        "Disclaimer: This information is for educational purposes only and is not a substitute " +
        "for professional medical advice, diagnosis, or treatment. Always seek the advice of " +
        "your physician or other qualified health provider.";

    private const string EmergencyWarning =
        "WARNING: Based on the symptoms described, this may require immediate medical attention. " +
        "Please call emergency services (911) or go to your nearest emergency room immediately.";

    private static readonly Regex EmergencyPattern = new(
        @"\b(chest\s+pain|heart\s+attack|stroke|seizure|unconscious|not\s+breathing" +
        @"|severe\s+bleeding|suicid[ea]|self[- ]harm|overdose|anaphylaxis" +
        @"|choking|severe\s+allergic|can'?t\s+breathe|difficulty\s+breathing" +
        @"|coughing\s+blood|vomiting\s+blood)\b",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    private static readonly Regex MentalHealthPattern = new(
        @"\b(depress(ed|ion)|anxiety|panic\s+attack|suicid[ea]|self[- ]harm" +
        @"|mental\s+health|eating\s+disorder|ptsd|bipolar)\b",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public MedicalAssessment Assess(string userInput, string aiResponse)
    {
        var combined = $"{userInput} {aiResponse}";
        var assessment = new MedicalAssessment();

        // Check for emergency keywords
        if (EmergencyPattern.IsMatch(combined))
        {
            assessment.Category = MedicalCategory.Emergency;
            assessment.RequiresEmergencyWarning = true;
            assessment.Disclaimer = $"{EmergencyWarning}\n\n{StandardDisclaimer}";
            return assessment;
        }

        // Check for mental health keywords
        if (MentalHealthPattern.IsMatch(combined))
        {
            assessment.Category = MedicalCategory.MentalHealth;
            assessment.Disclaimer =
                "If you or someone you know is struggling with mental health, please reach out to " +
                "a mental health professional or call the 988 Suicide & Crisis Lifeline (call or text 988)." +
                $"\n\n{StandardDisclaimer}";
            return assessment;
        }

        // Default: general medical disclaimer
        assessment.Category = MedicalCategory.General;
        assessment.Disclaimer = StandardDisclaimer;
        return assessment;
    }
}
