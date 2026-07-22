
namespace DietBuddy.DTOs.Response;
using DietBuddy.Models;
public record class DishDTO(
    int ID,    
    string Name,
    string Description,
    string Instruction,
    string ImageUrl,
    double Calories,
    ICollection<BriefIngredientDTO> Ingredients,
    int ViewCount
);