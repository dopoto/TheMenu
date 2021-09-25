namespace TheMenu.BackEnd.Models
{
    /// <summary>
    /// POCO that maps secret app settings or environment-specific 
    /// settings, that do not belong in source control.
    /// 
    /// One-time initial setup on dev machines:
    /// - Generate a JSON file from the class below  
    /// <see cref="https://csharp2json.io/"/>
    ///
    /// - Fill in your data
    /// 
    /// - Right-click project in VS > Manage User Secrets
    /// </summary>
    /// 
    /// <see cref="https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows#map-secrets-to-a-poco"/>
    public class AppSecrets
    {
        /// <summary>
        /// The Google SignIn app OAuth client ID.
        /// <see cref="https://developers.google.com/identity/sign-in/web/sign-in"/>
        /// </summary>
        public string GoogleSignInClientId {  get; set; }

        /// <summary>
        /// The Google SignIn app OAuth client secret.
        /// <see cref="https://developers.google.com/identity/sign-in/web/sign-in"/>
        /// </summary>
        public string GoogleSignInClientSecret { get; set; }
    }   
}
