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
        private readonly UserManager<User> _userManager;
        private readonly JwtHandlerService _jwtHandlerService;

        public AccountsController(UserManager<User> userManager,
            JwtHandlerService jwtHandlerService)
        {
            _userManager = userManager;
            _jwtHandlerService = jwtHandlerService;
        }

        [HttpPost]
        [Route("external-login")]
        [EndpointName("/accounts/external-login")]
        public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuth externalAuth)
        {
            var payload = await _jwtHandlerService.VerifyGoogleToken(externalAuth);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");
            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

            // TODO Revisit after implementing EF Core Migrations and adding identity tables (AspNetUsers etc)

            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);

                if (user == null)
                {
                    // TODO user = new User { Email = payload.Email, UserName = payload.Email };
                    user = new User { Email = payload.Email };
                    await _userManager.CreateAsync(user);
                    await _userManager.AddToRoleAsync(user, "Viewer");
                    await _userManager.AddLoginAsync(user, info);
                }
                else
                {
                    await _userManager.AddLoginAsync(user, info);
                }
            }

            if (user == null) {
                return BadRequest("Invalid External Authentication.");
            }

            // TODO check for the Locked out account

            var token = await _jwtHandlerService.GenerateToken(user);
            return Ok(new AuthResponse { Token = token, IsAuthSuccessful = true });
        }
    }
}
