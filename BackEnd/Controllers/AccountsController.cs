using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using TheMenu.BackEnd.Models;
using TheMenu.BackEnd.Services;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Areas.Identity.Data;
using System.Security.Claims;

namespace TheMenu.BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<TheMenuBackEndUser> _userManager;
        private readonly JwtHandlerService _jwtHandlerService;

        public AccountsController(
            ILogger<AccountsController> logger,
            IConfiguration configuration,
            UserManager<TheMenuBackEndUser> userManager,
            JwtHandlerService jwtHandlerService)
        {
            _userManager = userManager;
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

            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

            var refreshTokenExpiryTime = DateTime.Now.AddMinutes(20); //DateTime.Now.AddDays(7), //TODO TEMP

            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);

                if (user == null)
                {
                    user = new TheMenuBackEndUser { 
                        Email = payload.Email, 
                        UserName = payload.Email, 
                    };
                    await _userManager.CreateAsync(user);

                    // TODO prepare and send an email for the email confirmation

                    await _userManager.AddToRoleAsync(user, "Owner");
                    //await _userManager.AddToRoleAsync(user, "StaffMember");
                    await _userManager.AddLoginAsync(user, info);
                }
                else
                {                    
                    //TODO check if account is Locked Out
                    await _userManager.AddLoginAsync(user, info);
                }
            }

            if (user == null)
                return BadRequest("Invalid External Authentication.");

            var claims = await _jwtHandlerService.GetClaimsAsync(user);
            var token = _jwtHandlerService.GenerateToken(claims);
            var refreshToken = _jwtHandlerService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = refreshTokenExpiryTime;
            await _userManager.UpdateAsync(user);

            return Ok(new AuthResponse {
                Token = token, 
                RefreshToken = refreshToken, 
                RefreshTokenExpiryTime = refreshTokenExpiryTime,
                IsAuthSuccessful = true 
            });
        }
    }
}
