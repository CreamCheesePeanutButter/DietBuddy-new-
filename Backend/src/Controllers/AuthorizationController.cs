using Microsoft.AspNetCore.Mvc;
using DietBuddy.Services;
using DietBuddy.DTOs.Request;

namespace DietBuddy.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Sets the base route to: api/auth
    public class AuthController : ControllerBase
    {
        private readonly AuthenticationService _authService;

        // Inject your AuthenticationService into the controller
        public AuthController(AuthenticationService authService)
        {
            _authService = authService;
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            var result = _authService.Validate(loginDTO);

            if (!result.Success)
            {
                // Returns 400 Bad Request if credentials fail
                return BadRequest(new { message = result.Message }); 
            }

            // Returns 200 OK along with your user token and data
            return Ok(result);
        }

        // POST: api/auth/signup
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] SignUpDTO signUpDTO)
        {
            var result = _authService.SignUp(signUpDTO);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            // Returns 201 Created status for a successful registration
            return StatusCode(201, result);
        }

        [HttpPost("refresh-token")]
        public IActionResult ExtendRefreshToken([FromBody] RefreshTokenDTO refreshTokenDTO)
        {
            var result = _authService.ValidateToken(refreshTokenDTO.RefreshToken);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);

        }
    }
}