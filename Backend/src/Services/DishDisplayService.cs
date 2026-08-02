using DietBuddy.Data;
using DietBuddy.Models;
using DietBuddy.DTOs.Response;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System.Text.Json;

namespace DietBuddy.Services;

public class DishDisplayService
{
    private readonly AppDbContext _context;

    private readonly IDatabase _redis;


    public DishDisplayService(AppDbContext context, IConnectionMultiplexer connection)
    {
        _context = context;
        _redis = connection.GetDatabase();
    }

    private const string TopDishesCacheKey = "top-dishes";

    public async Task<IList<DishDTO>> GetTopViewedDishes()
    {
        //Check if redis has the data or not
        var cached = await _redis.StringGetAsync(TopDishesCacheKey);

        if (cached.HasValue)
        {
            Console.WriteLine("Loaded from Redis");
            Console.WriteLine(cached);
            var cachedDishes = JsonSerializer.Deserialize<List<DishDTO>>(cached.ToString())!;

            if (cachedDishes != null)
            {
                return cachedDishes;
            }
        }
        var dishes = await _context.Dishes
            .OrderByDescending(d => d.ViewCount)
            .Take(30)
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
        await _redis.StringSetAsync(
            TopDishesCacheKey,
            JsonSerializer.Serialize(dishes),
            TimeSpan.FromMinutes(0)
        );
        return dishes;
    }

}
