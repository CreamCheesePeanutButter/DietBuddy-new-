using Microsoft.EntityFrameworkCore;
using DietBuddy.Data;
using DietBuddy.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
        
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        
        ValidateLifetime = true, // Checks token expiration (exp claim)
        ClockSkew = TimeSpan.Zero // Removes the default 5-minute grace period for expiration
    };
});

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Identify the connection string for the database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string not found.");
// Register the DbContext with the dependency injection container
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<DishDisplayService>();

var app = builder.Build();

app.UseCors("AllowFrontend");

// Auto-apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// app.MapAuthorizationEndPoints();
// app.MapMealPlanEndPoints();

app.UseAuthentication(); // Must come before UseAuthorization
app.UseAuthorization();

app.MapControllers();

app.Run();
