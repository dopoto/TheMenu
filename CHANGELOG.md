# Changelog

## Future plans
- EF Core Migrations in Azure DevOps - [Run EF Core Migrations in Azure DevOps](https://dotnetthoughts.net/run-ef-core-migrations-in-azure-devops/) (Waiting for EF tooling for .NET 6 - https://gist.github.com/davidfowl/0e0372c3c1d895c3ce195ba983b1e03d ""Some tools (like EF migrations) use Program.CreateHostBuilder to access the application's IServiceProvider to execute custom logic in the context of the application, these tools have been updated to use a new technique to achieve the same thing. We will work with the ecosystem to make sure tools are all updated to use the new model.") [Run EF Core Migrations in Azure DevOps]
- it’s a good idea to store tokens in a cookie with httpOnly and secure flags.
- Frontend / backend unit tests + pipeline runners
- Cypress
- Feature flags
- ApplicationInsights integration for frontend and backend
- securityheaders.com 
- https://www.npmjs.com/package/@openapitools/openapi-generator-cli   or  NSwag - blocked: https://github.com/RicoSuter/NSwag/issues/3630
- Authorize for all endpoints by default
- Fix nullable-related warnings
- Localization
- Content-Security-Policy
- Add claims to Identity using IUserClaimsPrincipalFactory<ApplicationUser> https://docs.microsoft.com/en-us/aspnet/core/security/authentication/add-user-data?view=aspnetcore-6.0&tabs=visual-studio#add-claims-to-identity-using-iuserclaimsprincipalfactoryapplicationuser
- https://code-maze.com/authentication-aspnetcore-jwt-2/
- TS Lint
- Server-side error handling
- Client-side error handling (incl. ngrx)

## [0.0.2](https://github.com/dopoto/TheMenu/compare/0.0.1...0.0.2) (unreleased)
- Angular 13
- Sign In with Google - [Google external login setup in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/social/google-logins?view=aspnetcore-5.0) and [How to Sign in with Google Using Angular and ASP.NET Core Web API](https://code-maze.com/how-to-sign-in-with-google-angular-aspnet-webapi/)
- ASP<span>.NET</span> Core Authentication with JWT and Angular - [ASP.NET Core Authentication with JWT and Angular – Part 1](https://code-maze.com/authentication-aspnetcore-jwt-1/)
- JWT refresh tokens [Using Refresh Tokens in ASP.NET Core Authentication](https://code-maze.com/using-refresh-tokens-in-asp-net-core-authentication/)
- Sign In With Google flow using NGRX 12 Store + Effects - [Authentication in Angular with NGRX](https://mherman.org/blog/authentication-in-angular-with-ngrx/)
- [ASP.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-6.0&tabs=visual-studio#scaffold-identity-into-a-razor-project-without-existing-authorization)
- [Scaffold Identity in ASP.NET Core projects](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-6.0&tabs=visual-studio#scaffold-identity-into-a-razor-project-without-existing-authorization)
- EntityFramework Core Code First Migrations - [Tutorial: Get started with EF Core in an ASP.NET MVC web app](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-6.0)
- Set up app secrets - [Safe storage of app secrets in development in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows#enable-secret-storage)
- Populate secrets in AzureDevops - [Using secrets safely in development with .NET Core](https://samlearnsazure.blog/2020/06/17/using-secrets-safely-in-development-with-net-core/)
- Application Insights - backend
- Diagnose controller + automated Azure availability testing
- Angular routes with auth guard - [Angular Routing](https://angular.io/guide/router)
- Bootstrap 5
- [Pass ASP.NET Core Appsettings Values to Angular via an API Call](https://elanderson.net/2018/05/pass-asp-net-core-appsettings-values-to-angular-via-an-api-call/)


## [0.0.1](https://github.com/dopoto/TheMenu/releases/tag/0.0.1) (2021-09-23)
- New .NET 6 ASP<span>.NET</span> Core / Angular 12 solution based on the [Visual Studio Standalone Angular template](https://docs.microsoft.com/en-us/visualstudio/javascript/tutorial-asp-net-core-with-angular?view=vs-2022)
- [SPN / Service Connection for Azure Devops pipelines](https://subhankarsarkar.com/simple-way-to-create-spn-and-service-connection-for-azure-devops-pipelines/)
- Azure DevOps pipelines to build and deploy client Angular app to an Azure storage account - [Angular app in Azure Storage Account](https://ppolyzos.com/2019/01/18/publish-an-angular-web-app-to-azure-using-github-azuredevops-azure-storage-account/)
- Azure DevOps pipelines to build and deploy backend .NET 6 app to an Azure Linux app service - [.NET 6 Azure Web App Deployment using Azure DevOps Pipelines](https://subhankarsarkar.com/dot-net6-azure-web-app-deployment-using-azure-devops-pipeline/)
- Fix CORS issues - [Enable Cross-Origin Requests (CORS) in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0)
- Inject Azure Build Number in the Angular environment.prod.ts file - [How can I inject Azure DevOps pipeline run number in a build artifact file?](https://stackoverflow.com/questions/69278412/how-can-i-inject-azure-devops-pipeline-run-number-in-a-build-artifact-file)
- [Build Pipeline with Azure DevOps – AppSettings.json Transformations](https://adilraza.ie/2-build-pipeline-with-azure-devops-appsettings-json-transformations/)