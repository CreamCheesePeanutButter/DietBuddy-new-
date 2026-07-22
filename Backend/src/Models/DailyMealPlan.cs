namespace DietBuddy.Models;

public class DailyMealPlan
{
    public int DailyMealPlanId { get; set; }
    public int MealPlanId { get; set; }
    public DateOnly Date { get; set; }
    public required MealPlan MealPlan { get; set; } // Navigation property to the MealPlan
    public List<Meal> Meals { get; set; } = new List<Meal>(); // Navigation property to Meals
}