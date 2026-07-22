namespace DietBuddy.Models;

public class Ingredient
{
    public int IngredientId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string MeasurementUnit { get; set; } // e.g., grams, cups, pieces
    public double CaloriesPerUnit { get; set; } // Calories per measurement unit
    public required ICollection<DishIngredient> DishIngredients { get; set; } // Navigation property to DishIngredients
}