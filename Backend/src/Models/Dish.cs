namespace DietBuddy.Models;

public class Dish
{
    //Those are data for displaying
    public int DishId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public double Calories { get; set; }  // Total calories for the dish, calculated from ingredients
    public string ImageUrl {get; set;} = "http://localhost:5042/api/image/0";

    //Those are data for discriptive display

    public required string Instructions { get; set; }
    public int ViewCount { get; set; } = 0;  // New property to track the number of views


    public required ICollection<DishIngredient> DishIngredients { get; set; } // Navigation property to DishIngredients

}
