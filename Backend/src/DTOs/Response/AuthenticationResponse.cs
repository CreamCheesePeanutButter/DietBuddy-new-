namespace DietBuddy.DTOs.Response;
using DietBuddy.Models;
public record class AuthenticationServiceResponse(
    bool Success,
    RefreshToken Tokens,
    string Message
);