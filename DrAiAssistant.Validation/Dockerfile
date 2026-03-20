FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY DrAiAssistant.Validation.sln .
COPY src/DrAiAssistant.Validation.Api/DrAiAssistant.Validation.Api.csproj src/DrAiAssistant.Validation.Api/
COPY src/DrAiAssistant.Validation.Core/DrAiAssistant.Validation.Core.csproj src/DrAiAssistant.Validation.Core/
COPY src/DrAiAssistant.Validation.Tests/DrAiAssistant.Validation.Tests.csproj src/DrAiAssistant.Validation.Tests/
RUN dotnet restore

# Copy everything and build
COPY . .
RUN dotnet publish src/DrAiAssistant.Validation.Api/DrAiAssistant.Validation.Api.csproj \
    -c Release -o /app/publish --no-restore

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

ENTRYPOINT ["dotnet", "DrAiAssistant.Validation.Api.dll"]
