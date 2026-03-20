namespace DrAiAssistant.Validation.Core.Models;

public class ChatResponse
{
    public string Response { get; set; } = string.Empty;
    public int? ConversationId { get; set; }
    public string? Disclaimer { get; set; }
    public bool IsEmergency { get; set; }
}
