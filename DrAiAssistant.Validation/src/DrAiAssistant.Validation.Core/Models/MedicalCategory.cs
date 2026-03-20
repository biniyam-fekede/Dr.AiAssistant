namespace DrAiAssistant.Validation.Core.Models;

public enum MedicalCategory
{
    General,
    Emergency,
    MentalHealth,
    Chronic,
    Pediatric
}

public class MedicalAssessment
{
    public MedicalCategory Category { get; set; } = MedicalCategory.General;
    public bool RequiresEmergencyWarning { get; set; }
    public string Disclaimer { get; set; } = string.Empty;
}
