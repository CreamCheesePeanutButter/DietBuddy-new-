namespace DietBuddy.Models;

public class DishIngredient
{
    public int DishId { get; set; }
    public int IngredientId { get; set; }
    public double Quantity { get; set; }
    public int Calories { get; set; }
    public required Dish Dish { get; set; } // Navigation property to the Dish
    public required Ingredient Ingredient { get; set; } // Navigation property to the Ingredient
}