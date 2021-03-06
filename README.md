# TheMenu

A sample .NET 6 / Angular project.

## Setting up a development environment

### Prerequisites

- Visual Studio 2022
- SQL Server 2019+
- Angular dev environment
- A Google OAuth app (https://developers.google.com/identity/sign-in/web/sign-in)

### Cypress (optional) 

To run Cypress E2E tests locally, you need to use environment-specific variables:
-  Create a `cypress-[your-env-name]-config.json` file in the FrontEnd folder
- Paste the following JSON in 
it, fill in yor values

```json
{
    "env": {
        "google_client_id": "...",
        "google_client_secret": "...",
        "google_client_token": "..."
    }
}
```

- Add a `cypress-[your-name]` task in package.json pointing to the file created above.

You can read more about it here:
- https://docs.cypress.io/api/plugins/configuration-api#Customize-available-browsers
- https://docs.cypress.io/guides/testing-strategies/google-authentication#Using-the-Google-OAuth-2-0-Playground-to-Create-Testing-Credentials

### TODO

### Running the app

- Open the TheMenu.sln solution
- Press F5 or execute ```dot net run``` in the BackEnd folder to run the backend
- Run `npm serve` to run the frontend


### Generating TypeScript models

 The client-side code uses TypeScript interfaces generated from the corresponding C# models. To update them, execute this in the root of the project, while the backend is running:
 ```
 dotnet run --project APIClientGenerator http://localhost:5063/swagger/v1/swagger.json FrontEnd/api/generated-models.ts TypeScript
 ```
