﻿using Microsoft.EntityFrameworkCore;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddUserSecrets<AppSecrets>()
    .AddEnvironmentVariables();

// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    var frontEndUrl = builder.Configuration["FrontEndUrl"];
    var allowedOrigins = new[] { frontEndUrl };
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddAuthentication().AddGoogle(options =>
{
    var appSecrets = builder.Configuration.Get<AppSecrets>();
    options.ClientId = appSecrets.GoogleSignInClientId;
    options.ClientSecret = appSecrets.GoogleSignInClientSecret;
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "BackEnd", Version = "v1" });
});

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


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred creating the DB.");
    }
}


app.Run();



