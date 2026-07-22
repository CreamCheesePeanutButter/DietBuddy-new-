using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;
using System;

namespace DietBuddy.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Resolves natively to: api/image
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        // Dependency injection fetches your app's true content root folder framework
        public ImageController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            // Maps safely to C:\Users\cream\Desktop\DietBuddy\DietBuddy\res\{id}.jpg
            string inputPath = Path.Combine(_env.ContentRootPath,"Backend","src", "res", $"{id}.jpg");
            Console.WriteLine($"Looking for image file at: {inputPath}");

            try
            {
                // Structural safety exit check
                if (!System.IO.File.Exists(inputPath))
                {
                    // return NotFound(new { message = $"Image with ID {id} not found." });
                    inputPath = Path.Combine(_env.ContentRootPath,"Backend","src", "res", $"0.jpg");
                }

                // Asynchronously ingest file stream data to avoid lock overheads
                byte[] imageBytes = await System.IO.File.ReadAllBytesAsync(inputPath);

                // Use the official universal standard MIME format string: "image/jpeg"
                return File(imageBytes, "image/jpeg");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing file: {ex.Message}");
                return StatusCode(500, "An unexpected server error occurred.");
            }
        }
    }
}
