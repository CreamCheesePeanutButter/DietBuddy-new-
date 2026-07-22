namespace DietBuddy.Models;
public class UserMealPlan
{
    public int MealPlanId { get; set; }
    public int UserId { get; set; }
    public required User User { get; set; } // Navigation property to the User
    public required MealPlan MealPlan { get; set; } // Navigation property to the MealPlan
}