using Microsoft.AspNetCore.Mvc;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Controllers
{
    [Route("api/configuration")]
    public class ConfigurationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ConfigurationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("environment-specific")]
        [EndpointName("/configuration/environment-specific")]
        public IActionResult GetEnvironmentSpecificConfiguration()
        {
            var environmentSettings = _configuration.Get<EnvironmentSpecificSettings>();
            return Ok(new Dictionary<string, string>
        {
            { "GoogleSignInClientId", environmentSettings.GoogleSignInClientId }
        });
        }
    }
}
