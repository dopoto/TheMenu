using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using TheMenu.BackEnd.Models;
using TheMenu.BackEnd.Services;

namespace TheMenu.BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly UsersService _usersService;
        private readonly JwtHandlerService _jwtHandlerService;

        public AccountsController(
            ILogger<AccountsController> logger,
            IConfiguration configuration,
            UsersService usersService,
            JwtHandlerService jwtHandlerService)
        {
            _usersService = usersService;
            _jwtHandlerService = jwtHandlerService;
        }

        [HttpPost]
        [Route("external-login")]
        [EndpointName("/accounts/external-login")]
        public async Task<IActionResult> ExternalLogin(
            [FromBody] ExternalAuth externalAuth)
        {
            var payload = await _jwtHandlerService.VerifyGoogleToken(externalAuth);
            if (payload == null)
            {
                return BadRequest("Invalid External Authentication.");
            }

            var refreshTokenExpiryTime = DateTime.Now.AddMinutes(200); //DateTime.Now.AddDays(7), //TODO TEMP

            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
                        
            var user = await _usersService.GetOrCreateUserAsync(payload.Email, payload.GivenName, 
                payload.FamilyName, false, info);

            if (user == null) { 
                return BadRequest("Invalid External Authentication.");
            }

            var claims = await _jwtHandlerService.GetClaimsAsync(user);
            var token = _jwtHandlerService.GenerateToken(claims);
            var refreshToken = _jwtHandlerService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = refreshTokenExpiryTime;
            await _usersService.UpdateAsync(user);

            return Ok(new AuthResponse {
                Token = token, 
                RefreshToken = refreshToken, 
                RefreshTokenExpiryTime = refreshTokenExpiryTime,
                IsAuthSuccessful = true 
            });
        }

        [HttpPost]
        [Route("demo-login")]
        [EndpointName("/accounts/demo-login")]
        public async Task<IActionResult> DemoLogin([FromBody] DemoAuth demoAuth)
        {
            var info = new UserLoginInfo("DEMO", "PROVIDER-KEY", "DISPLAY-NAME"); //TODO

            var refreshTokenExpiryTime = DateTime.Now.AddMinutes(200); //DateTime.Now.AddDays(7), //TODO TEMP

            var user = await _usersService.GetUserAsync(demoAuth.Email);

            if (user == null) {
                return BadRequest("Invalid External Authentication.");
            }

            var claims = await _jwtHandlerService.GetClaimsAsync(user);
            var token = _jwtHandlerService.GenerateToken(claims);
            var refreshToken = _jwtHandlerService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = refreshTokenExpiryTime;
            await _usersService.UpdateAsync(user);

            return Ok(new AuthResponse
            {
                Token = token,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = refreshTokenExpiryTime,
                IsAuthSuccessful = true
            });
        }
    }
}
