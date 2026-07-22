namespace DietBuddy.Models;

public class User
{
    public int UserId { get; set; }
    public required string Role { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>(); // Navigation property to AccessTokens

    public List<UserMealPlan> UserMealPlans { get; set; } = new List<UserMealPlan>(); // Navigation property to UserMealPlans

    //Extra stuff for later 

    // public required string Email { get; set; }
    // public required string FirstName { get; set; }
    // public required string LastName { get; set; }
    // public required DateTime CreatedAt { get; set; }
    // public float Height { get; set; }
    // public float Weight { get; set; }

}