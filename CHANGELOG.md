# Changelog

## Future plans
- https://www.npmjs.com/package/@openapitools/openapi-generator-cli
- [Run EF Core Migrations in Azure DevOps]
- https://mherman.org/blog/authentication-in-angular-with-ngrx/
- it’s a good idea to store tokens in a cookie with httpOnly and secure flags.
- Frontend / backend unit tests + pipeline runners
- Cypress
- Feature flags
- ApplicationInsights integration for frontend and backend
- NGRX
- EF migrations
- NSwag - blocked: https://github.com/RicoSuter/NSwag/issues/3630
- Authorize for all endpoints by default
- Fix nullable-related warnings
- Localization
- Content-Security-Policy
- Add claims to Identity using IUserClaimsPrincipalFactory<ApplicationUser> https://docs.microsoft.com/en-us/aspnet/core/security/authentication/add-user-data?view=aspnetcore-6.0&tabs=visual-studio#add-claims-to-identity-using-iuserclaimsprincipalfactoryapplicationuser

## [0.0.2] (unreleased)
*Angular 13 app / .NET 6 ASP<span>.NET</span> app hosted in Azure. Individual Azure DevOps pipelines to build, test and deploy frontend and backend to Azure. Sign in with Google. ASP<span>.NET</span> Core Authentication with JWT. ApplicationInsights enabled for backend. EntityFramework Core Code First Migrations. ASP<span>.NET</span> Identity.*


- Angular 13 
- Sign In with Google authentication - [Google external login setup in ASP.NET Core] / [How to Sign in with Google Using Angular and ASP.NET Core Web API]
- ASP<span>.NET</span> Core Authentication with JWT and Angular - [ASP.NET Core Authentication with JWT and Angular – Part 1]
- Set up app secrets - [Safe storage of app secrets in development in ASP.NET Core]
- Populate secrets in AzureDevops - [Using secrets safely in development with .NET Core]
- EntityFramework Core Code First Migrations - [Tutorial: Get started with EF Core in an ASP.NET MVC web app]. 
Waiting for EF tooling for .NET 6 - https://gist.github.com/davidfowl/0e0372c3c1d895c3ce195ba983b1e03d ""Some tools (like EF migrations) use Program.CreateHostBuilder to access the application's IServiceProvider to execute custom logic in the context of the application, these tools have been updated to use a new technique to achieve the same thing. We will work with the ecosystem to make sure tools are all updated to use the new model."
- ApplicationInsights - backend
- Diagnose / ping
- ASP<span>.NET</span> Identity + EntityFramework Core Migrations [Scaffold Identity in ASP.NET Core projects]

- [Angular Routing]

## [0.0.1] (2021-09-23)
*Angular 12 app hosted in an Azure storage account + .NET 6 ASP.NET app hosted in an Azure app service. Individual Azure DevOps pipelines to build and deploy frontend and backend.*

- New .NET 6 ASP.NET Core / Angular solution based on the [Visual Studio Standalone Angular template]
- [SPN / Service Connection for Azure Devops pipelines]
- Fix CORS issues - [Enable Cross-Origin Requests (CORS) in ASP.NET Core]
- Azure pipelines - [.NET 6 Azure Web App Deployment using Azure DevOps Pipelines]
- Inject Azure Build Number in the Angular environment.prod.ts file - [How can I inject Azure DevOps pipeline run number in a build artifact file?]
- [Build Pipeline with Azure DevOps – AppSettings.json Transformations] 
- [Angular app in Azure Storage Account]





[0.0.1]: https://github.com/dopoto/TheMenu/releases/tag/0.0.1
[0.0.2]: https://github.com/dopoto/TheMenu/compare/0.0.1...0.0.2


[Visual Studio Standalone Angular template]: https://docs.microsoft.com/en-us/visualstudio/javascript/tutorial-asp-net-core-with-angular?view=vs-2022
[SPN / Service Connection for Azure Devops pipelines]: https://subhankarsarkar.com/simple-way-to-create-spn-and-service-connection-for-azure-devops-pipelines/
[Enable Cross-Origin Requests (CORS) in ASP.NET Core]: https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0
[.NET 6 Azure Web App Deployment using Azure DevOps Pipelines]: https://subhankarsarkar.com/dot-net6-azure-web-app-deployment-using-azure-devops-pipeline/
[How can I inject Azure DevOps pipeline run number in a build artifact file?]: https://stackoverflow.com/questions/69278412/how-can-i-inject-azure-devops-pipeline-run-number-in-a-build-artifact-file
[Angular app in Azure Storage Account]: https://ppolyzos.com/2019/01/18/publish-an-angular-web-app-to-azure-using-github-azuredevops-azure-storage-account/
[Build Pipeline with Azure DevOps – AppSettings.json Transformations]: https://adilraza.ie/2-build-pipeline-with-azure-devops-appsettings-json-transformations/
[Google external login setup in ASP.NET Core]: https://docs.microsoft.com/en-us/aspnet/core/security/authentication/social/google-logins?view=aspnetcore-5.0
[How to Sign in with Google Using Angular and ASP.NET Core Web API]: https://code-maze.com/how-to-sign-in-with-google-angular-aspnet-webapi/
[Safe storage of app secrets in development in ASP.NET Core]: https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows#enable-secret-storage
[Using secrets safely in development with .NET Core]: https://samlearnsazure.blog/2020/06/17/using-secrets-safely-in-development-with-net-core/
[Tutorial: Get started with EF Core in an ASP.NET MVC web app]: https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-6.0
[ASP.NET Core Identity]: https://docs.microsoft.com/en-us/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-6.0&tabs=visual-studio#scaffold-identity-into-a-razor-project-without-existing-authorization
[Scaffold Identity in ASP.NET Core projects]: https://docs.microsoft.com/en-us/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-6.0&tabs=visual-studio#scaffold-identity-into-a-razor-project-without-existing-authorization
[Run EF Core Migrations in Azure DevOps]: https://dotnetthoughts.net/run-ef-core-migrations-in-azure-devops/
[ASP.NET Core Authentication with JWT and Angular – Part 1]: https://code-maze.com/authentication-aspnetcore-jwt-1/
[Angular Routing]: https://angular.io/guide/router