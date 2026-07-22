namespace DietBuddy.Services;
using DietBuddy.Data;
using DietBuddy.Models;
using DietBuddy.DTOs.Response;
using Microsoft.EntityFrameworkCore;

public class DishDisplayService
{
    private readonly AppDbContext _context;

    public DishDisplayService(AppDbContext context)
    {
        _context = context;
    }
    // public async Task<IList<>

    public async Task<IList<DishDTO>> GetTopViewedDishes()
    {
        return await _context.Dishes
            .OrderByDescending(d => d.ViewCount)
            .Take(4)
            .Select(d => new DishDTO(
            
                d.DishId,
                d.Name, 
                d.Description,
                d.ImageUrl == "" ? "http://localhost:5042/api/image/0" : d.ImageUrl,
                d.Instructions,
                d.Calories,
                d.DishIngredients
                    .Select(di => new BriefIngredientDTO(
                        di.IngredientId,
                        di.Ingredient.Name,
                        di.Ingredient.Description,
                        di.Quantity,
                        di.Ingredient.MeasurementUnit,
                        di.Calories
                    )).ToList(),
                
                d.ViewCount
            ))
            .ToListAsync();
    }

}
