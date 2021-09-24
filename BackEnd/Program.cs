var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

// Add services to the container.

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
//builder.Services.AddAuthentication()
//    .AddGoogle(options =>
//    {
//        IConfigurationSection googleAuthNSection =
//            builder.Configuration.GetSection("Authentication:Google");
//        options.ClientId = googleAuthNSection["ClientId"];
//        options.ClientSecret = googleAuthNSection["ClientSecret"];
//    });
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

app.Run();
