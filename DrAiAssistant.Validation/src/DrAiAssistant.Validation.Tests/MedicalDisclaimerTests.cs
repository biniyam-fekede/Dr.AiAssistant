using DrAiAssistant.Validation.Core.Models;
using DrAiAssistant.Validation.Core.Services;
using Xunit;

namespace DrAiAssistant.Validation.Tests;

public class MedicalDisclaimerTests
{
    private readonly MedicalDisclaimerService _service = new();

    [Fact]
    public void Assess_GeneralQuery_ReturnsStandardDisclaimer()
    {
        var result = _service.Assess("I have a mild headache", "Try taking some rest.");
        Assert.Equal(MedicalCategory.General, result.Category);
        Assert.False(result.RequiresEmergencyWarning);
        Assert.Contains("not a substitute", result.Disclaimer);
    }

    [Fact]
    public void Assess_EmergencyKeyword_ChestPain_ReturnsEmergency()
    {
        var result = _service.Assess("I have severe chest pain", "You should seek help.");
        Assert.Equal(MedicalCategory.Emergency, result.Category);
        Assert.True(result.RequiresEmergencyWarning);
        Assert.Contains("immediate medical attention", result.Disclaimer);
    }

    [Fact]
    public void Assess_EmergencyKeyword_NotBreathing_ReturnsEmergency()
    {
        var result = _service.Assess("My child is not breathing", "Call 911 immediately.");
        Assert.Equal(MedicalCategory.Emergency, result.Category);
        Assert.True(result.RequiresEmergencyWarning);
    }

    [Fact]
    public void Assess_MentalHealth_Depression_ReturnsMentalHealthCategory()
    {
        var result = _service.Assess("I've been feeling very depressed lately", "I'm sorry to hear that.");
        Assert.Equal(MedicalCategory.MentalHealth, result.Category);
        Assert.Contains("988", result.Disclaimer);
    }

    [Fact]
    public void Assess_Suicide_ReturnsEmergency()
    {
        var result = _service.Assess("I'm thinking about suicide", "Please reach out for help.");
        Assert.Equal(MedicalCategory.Emergency, result.Category);
        Assert.True(result.RequiresEmergencyWarning);
    }

    [Fact]
    public void Assess_EmergencyInResponse_StillDetected()
    {
        var result = _service.Assess("I feel dizzy", "This could indicate a stroke. Seek immediate help.");
        Assert.Equal(MedicalCategory.Emergency, result.Category);
        Assert.True(result.RequiresEmergencyWarning);
    }
}
