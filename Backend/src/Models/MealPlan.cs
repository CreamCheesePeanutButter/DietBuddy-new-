namespace DietBuddy.Models;
public class MealPlan
{
    public int MealPlanId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public List<DailyMealPlan> DailyMealPlans { get; set; } = new List<DailyMealPlan>(); // Navigation property to DailyMealPlans
}