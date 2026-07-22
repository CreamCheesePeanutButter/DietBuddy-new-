namespace DietBuddy.DTOs.Request;

public record class LoginDTO(
    string Username,
    string Password
);