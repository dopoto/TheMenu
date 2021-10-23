using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Models;
using TheMenu.BackEnd.Areas.Identity.Data;
using TheMenu.BackEnd.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TheMenu.BackEnd.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var environmentSettings = builder.Configuration.Get<EnvironmentSpecificSettings>();

var environmentSettingsEntries = typeof(EnvironmentSpecificSettings).GetProperties();
//foreach (var property in environmentSettingsEntries)
//{
//    var val = property.GetValue(environmentSettings);
//    if (string.IsNullOrEmpty(val?.ToString()))
//    {
//        throw new KeyNotFoundException("TheMenu Init Error: Environment value not found for: " + property.Name);
//    }
//}

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddUserSecrets<EnvironmentSpecificSettings>(optional: true)
    .AddEnvironmentVariables();

var connectionString = builder.Configuration.GetConnectionString("AppDbContextConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services
    .AddDefaultIdentity<AppUser>(
        options => options.SignIn.RequireConfirmedAccount = true
    )
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

// Add services to the container.

builder.Services.AddScoped<JwtHandlerService>();
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<ITenantsService, TenantsService>();
builder.Services.AddScoped<IDemoService, DemoService>();

//builder.Services.AddScoped<IDataRepository<User>, UsersService>();

builder.Services.AddCors(options =>
{
    var frontEndUrl = environmentSettings.FrontEndUrl ?? "";
    var allowedOrigins = new[] { frontEndUrl };
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();



builder.Services
    .AddAuthentication(opt => {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = environmentSettings.JwtValidIssuer,
            ValidAudience = environmentSettings.JwtValidAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(environmentSettings.JwtSecretKey ?? ""))
        };
    })
    .AddGoogle(options =>
    {
        options.ClientId = environmentSettings.GoogleSignInClientId ?? "";
        options.ClientSecret = environmentSettings.GoogleSignInClientSecret ?? "";
    });

builder.Services.AddSwaggerGen(c =>
{
    // TODO Load actual version
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

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        var usersService = services.GetRequiredService<UsersService>();
        await DbInitializer.Initialize(context, usersService);
    }
    catch (Exception ex)
    {
        // TODO Re-enable
        //var logger = services.GetRequiredService<ILogger<Program>>();
        //logger.LogError(ex, "An error occurred creating the DB.");
    }
}

app.Run();



