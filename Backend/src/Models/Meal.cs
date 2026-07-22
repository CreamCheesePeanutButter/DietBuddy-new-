namespace DietBuddy.Models;

public class Meal
{
    public int DishId { get; set; }
    public int DailyMealPlanId { get; set; }

    public required Dish Dish { get; set; } // Navigation property to the Dish
    public required DailyMealPlan DailyMealPlan { get; set; } // Navigation property to the DailyMealPlan
}