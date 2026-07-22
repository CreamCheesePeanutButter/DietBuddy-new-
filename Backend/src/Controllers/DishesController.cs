using Microsoft.AspNetCore.Mvc;
using DietBuddy.Services;
using DietBuddy.DTOs.Response;

namespace DietBuddy.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Sets the base route to: api/auth
    public class DishesController : ControllerBase
    {
        public DishesController(DishDisplayService dishDisplayService)
        {
            _dishDisplayService = dishDisplayService;
        }
        private readonly DishDisplayService _dishDisplayService;
        [HttpGet("top-dishes")]
        public async Task<IActionResult> GetTopDish()
        {
            ICollection<DishDTO> dishDTOs = await _dishDisplayService.GetTopViewedDishes();
            return Ok(dishDTOs);
        }

        
    }
}