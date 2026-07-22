using Microsoft.EntityFrameworkCore;

namespace DietBuddy.Models;
public class RefreshToken
{
    public int RefreshTokenId { get; set; }
    public int UserId { get; set; }
    public required string Token { get; set; }
    public DateTime Expiration { get; set; }
}