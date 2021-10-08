using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheMenu.BackEnd.Areas.Identity.Data;
using TheMenu.BackEnd.Models;
using TheMenu.BackEnd.Services;

namespace TheMenu.BackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        readonly UserManager<TheMenuBackEndUser> _userManager;
        readonly JwtHandlerService _tokenService;

        public TokenController(UserManager<TheMenuBackEndUser> userManager, JwtHandlerService tokenService)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpPost]
        [Route("refresh")]
        [EndpointName("/token/refresh")]
        public async Task<IActionResult> Refresh(TokenApiModel tokenApiModel)
        {
            if (tokenApiModel is null)
            {
                return BadRequest("Invalid client request");
            }
            string accessToken = tokenApiModel.AccessToken;
            string refreshToken = tokenApiModel.RefreshToken;
            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var username = principal?.Identity?.Name; //this is mapped to the Name claim by default

            // TODO FindByLoginAsync returns null. Will be needed in case we implement multiple login providers.
            //var loginProvider = "GOOGLE"; // TODO
            //var user = await _userManager.FindByLoginAsync(loginProvider, username);
            var user = await _userManager.FindByNameAsync(username);
            if (user == null || 
                user.RefreshToken != refreshToken || 
                user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid client request");
            }
            var newAccessToken = _tokenService.GenerateToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _userManager.UpdateAsync(user);
            return new ObjectResult(new
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken
            });
        }

        [HttpPost, Authorize]
        [Route("revoke")]
        [EndpointName("/token/revoke")]
        public async Task<IActionResult> Revoke()
        {
            var username = User?.Identity?.Name;
            // TODO FindByLoginAsync returns null. Will be needed in case we implement multiple login providers.
            //var loginProvider = "GOOGLE"; // TODO
            //var user = await _userManager.FindByLoginAsync(loginProvider, username);
            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return BadRequest();

            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = DateTime.MinValue;
            await _userManager.UpdateAsync(user);

            return NoContent();
        }
    }
}
