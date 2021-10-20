using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TheMenu.BackEnd.Areas.Identity.Data;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Services
{
    public class JwtHandlerService
    {
        private readonly EnvironmentSpecificSettings _settings;
        private readonly UserManager<TheMenuBackEndUser> _userManager;

        public JwtHandlerService(IConfiguration configuration, UserManager<TheMenuBackEndUser> userManager)
        {
            _userManager = userManager;
            _settings = configuration.Get<EnvironmentSpecificSettings>();
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_settings.JwtSecretKey);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        public async Task<List<Claim>> GetClaimsAsync(TheMenuBackEndUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var tokenOptions = new JwtSecurityToken(
                issuer: _settings.JwtValidIssuer,
                audience: _settings.JwtValidAudience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(1), //DateTime.Now.AddMinutes(5), //TODO TEMP
                signingCredentials: signingCredentials);

            return tokenOptions;
        }

        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var signingCredentials = GetSigningCredentials();
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims.ToList());
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return token;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.UTF8.GetBytes(_settings.JwtSecretKey);
            var secret = new SymmetricSecurityKey(key);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = secret,
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (IsTokenInvalid(jwtSecurityToken))
            {
                throw new SecurityTokenException("Invalid token");
            }
            return principal;
        }

        private bool IsTokenInvalid(JwtSecurityToken? jwtSecurityToken)
        {
            return jwtSecurityToken == null || 
                !jwtSecurityToken.Header.Alg.Equals(
                    SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);
        }        

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalAuth externalAuth)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _settings.GoogleSignInClientId }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(externalAuth.IdToken, settings);
                return payload;
            }
            catch (Exception ex)
            {
                // TODO log an exception
                return null;
            }
        }
    }
}
