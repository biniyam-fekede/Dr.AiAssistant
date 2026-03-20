using System.Collections.Concurrent;

namespace DrAiAssistant.Validation.Api.Middleware;

public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly int _maxRequests;
    private readonly ConcurrentDictionary<string, ClientRateInfo> _clients = new();

    public RateLimitingMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _maxRequests = configuration.GetValue<int>("RateLimiting:MaxRequestsPerMinute", 30);
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        var now = DateTime.UtcNow;

        var rateInfo = _clients.GetOrAdd(clientIp, _ => new ClientRateInfo());

        lock (rateInfo)
        {
            // Reset window if more than 1 minute has passed
            if ((now - rateInfo.WindowStart).TotalMinutes >= 1)
            {
                rateInfo.WindowStart = now;
                rateInfo.RequestCount = 0;
            }

            rateInfo.RequestCount++;

            if (rateInfo.RequestCount > _maxRequests)
            {
                context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                context.Response.Headers.Append("Retry-After", "60");
                return;
            }
        }

        await _next(context);
    }

    private class ClientRateInfo
    {
        public DateTime WindowStart { get; set; } = DateTime.UtcNow;
        public int RequestCount { get; set; }
    }
}
