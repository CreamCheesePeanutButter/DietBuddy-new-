using DietBuddy.DTOs.Request;
using DietBuddy.DTOs.Response;
using DietBuddy.Data;
using DietBuddy.Models;

namespace DietBuddy.Services;

public class AuthenticationService
{
    private readonly AppDbContext _db;

    public AuthenticationService(AppDbContext db)
    {
        _db = db;
    }
    public AuthenticationServiceResponse Validate(LoginDTO loginDTO)
    {
        var user = _db.Users.FirstOrDefault(u => u.Username == loginDTO.Username && u.Password == loginDTO.Password);
        if (user != null)
        {
            RefreshToken token = GenerateRefreshToken(user);
            return new AuthenticationServiceResponse(true, token, "Login successful");
        }
        return new AuthenticationServiceResponse(false, null!, "Invalid username or password");
    }
    public RefreshToken GenerateRefreshToken(User user)
    {
        var token = new RefreshToken
        {
            UserId = user.UserId,
            Token = Guid.NewGuid().ToString(),
            Expiration = DateTime.UtcNow.AddHours(1)
        };

        _db.RefreshTokens.Add(token);
        _db.SaveChanges();

        return token;
    }
    //Might be useful later for token validation
    public AuthenticationServiceResponse ValidateToken(string token)
    {
        var refreshToken = _db.RefreshTokens.FirstOrDefault(t => t.Token == token);
        if (refreshToken != null && refreshToken.Expiration > DateTime.UtcNow)
        {
            RefreshToken newToken = GenerateRefreshToken(_db.Users.First(u => u.UserId == refreshToken.UserId));
            return new AuthenticationServiceResponse(true, newToken, "Token is valid");
        }
        return new AuthenticationServiceResponse(false, null!, "Invalid or expired token");
    }
    public AuthenticationServiceResponse SignUp(SignUpDTO signUpDTO)
    {
        if (string.IsNullOrWhiteSpace(signUpDTO.Username) || string.IsNullOrWhiteSpace(signUpDTO.Password))
        {
            return new AuthenticationServiceResponse(false, null!, "Username and password cannot be empty");
        }
        if(_db.Users.Any(u => u.Username == signUpDTO.Username))
        {
            return new AuthenticationServiceResponse(false, null!, "Username already exists");
        }
        if (_db.Users.Any(u => u.Password == signUpDTO.Password))
        {
            return new AuthenticationServiceResponse(false, null!, "Password already exists");
        }

        var newUser = new User
        {
            Username = signUpDTO.Username,
            Password = signUpDTO.Password,
            Role = "User" // Default role
        };

        _db.Users.Add(newUser);
        _db.SaveChanges();

        RefreshToken token = GenerateRefreshToken(newUser);
        return new AuthenticationServiceResponse(true, token, "Sign up successful");
    }

    

}