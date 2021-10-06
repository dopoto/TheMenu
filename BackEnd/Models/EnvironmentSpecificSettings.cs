namespace TheMenu.BackEnd.Models
{
    /// <summary>
    /// POCO that maps environment-specific or secret
    /// app settings, that do not belong in source control.
    /// 
    /// One-time initial setup on dev machines:
    /// - Get secrets.json from another dev machine (*) or generate a JSON 
    /// file from the class below <see cref="https://csharp2json.io/"/>.
    /// - Fill in your data
    /// - Update your local secrets (*)
    /// 
    /// To modify this list:
    /// - Update your local secrets (*)
    /// - Update corresponding property in the class below.
    /// - Update appsettings.json (leave empty value there)
    /// - Update Azure Devops > Pipelines > Library
    /// 
    /// (*) = right-click project in VS > Manage User Secrets
    /// </summary>
    /// <see cref="https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows#map-secrets-to-a-poco"/>
    public class EnvironmentSpecificSettings
    {
        /// <summary>
        /// The Google SignIn app OAuth client ID.
        /// <see cref="https://developers.google.com/identity/sign-in/web/sign-in"/>
        /// </summary>
        public string? GoogleSignInClientId { get; set; }

        /// <summary>
        /// The Google SignIn app OAuth client secret.
        /// <see cref="https://developers.google.com/identity/sign-in/web/sign-in"/>
        /// </summary>
        public string? GoogleSignInClientSecret { get; set; }

        public string? FrontEndUrl { get; set; }

        public string? ApplicationInsightsConnectionString { get; set; }

        public string? ApplicationInsightsInstrumentationKey { get; set; }

        public string? JwtValidIssuer { get; set; }

        public string? JwtValidAudience { get; set; }

        public string? JwtSecretKey { get; set; }

        public string? ClientLoggingLogToConsole { get; set; }

        public string? ClientLoggingLogToApplicationInsights { get; set; }
    }
}
