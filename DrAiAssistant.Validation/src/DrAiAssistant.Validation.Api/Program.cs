using DrAiAssistant.Validation.Api.Middleware;
using DrAiAssistant.Validation.Core.Interfaces;
using DrAiAssistant.Validation.Core.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddSingleton<IInputValidator, InputValidationService>();
builder.Services.AddSingleton<IOutputSanitizer, OutputSanitizationService>();
builder.Services.AddSingleton<IMedicalDisclaimerService, MedicalDisclaimerService>();

// Register BackendProxyService with HttpClient
var backendUrl = builder.Configuration["BackendApi:BaseUrl"] ?? "http://localhost:8000";
builder.Services.AddHttpClient<BackendProxyService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(120);
}).AddTypedClient((httpClient, _) => new BackendProxyService(httpClient, backendUrl));

// CORS
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:3000" };
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middleware pipeline
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseMiddleware<RequestLoggingMiddleware>();
app.UseMiddleware<RateLimitingMiddleware>();

app.UseCors();
app.MapControllers();

app.Run();
