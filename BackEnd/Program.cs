using Microsoft.EntityFrameworkCore;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Models;

var builder = WebApplication.CreateBuilder(args);
var environmentSettings = builder.Configuration.Get<EnvironmentSpecificSettings>();

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddUserSecrets<EnvironmentSpecificSettings>(optional: true)
    .AddEnvironmentVariables();

// Add services to the container.

//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(environmentSettings.SqlDbConnectionString)
//);

builder.Services.AddCors(options =>
{
    var frontEndUrl = environmentSettings.FrontEndUrl;
    var allowedOrigins = new[] { frontEndUrl };
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddAuthentication().AddGoogle(options =>
{
    options.ClientId = environmentSettings.GoogleSignInClientId;
    options.ClientSecret = environmentSettings.GoogleSignInClientSecret;
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "BackEnd", Version = "v1" });
});
builder.Services.AddApplicationInsightsTelemetry(environmentSettings.ApplicationInsightsInstrumentationKey);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TheMenu BackEnd v1"));
}
app.UseCors();
app.UseAuthorization();

app.MapControllers();


//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;
//    try
//    {
//        var context = services.GetRequiredService<AppDbContext>();
//        DbInitializer.Initialize(context);
//    }
//    catch (Exception ex)
//    {
//        var logger = services.GetRequiredService<ILogger<Program>>();
//        logger.LogError(ex, "An error occurred creating the DB.");
//    }
//}


app.Run();



