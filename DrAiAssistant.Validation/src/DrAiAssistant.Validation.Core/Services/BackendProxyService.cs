using System.Net.Http.Json;
using System.Text.Json;

namespace DrAiAssistant.Validation.Core.Services;

public class BackendProxyService
{
    private readonly HttpClient _httpClient;
    private readonly string _backendBaseUrl;

    public BackendProxyService(HttpClient httpClient, string backendBaseUrl = "http://localhost:8000")
    {
        _httpClient = httpClient;
        _backendBaseUrl = backendBaseUrl.TrimEnd('/');
    }

    public async Task<(string response, int? conversationId)> ForwardChatAsync(
        string message, int? conversationId, string? accessToken)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, $"{_backendBaseUrl}/api/get-data/");

        if (!string.IsNullOrEmpty(accessToken))
        {
            request.Headers.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
        }

        var body = new { message, conversation_id = conversationId };
        request.Content = JsonContent.Create(body);

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        var responseText = json.GetProperty("response").GetString() ?? string.Empty;
        int? returnedConversationId = json.TryGetProperty("conversation_id", out var cidProp)
            && cidProp.ValueKind == JsonValueKind.Number
            ? cidProp.GetInt32()
            : conversationId;

        return (responseText, returnedConversationId);
    }
}
