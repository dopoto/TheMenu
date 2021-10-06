using Microsoft.AspNetCore.Mvc;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            var es = _configuration.Get<EnvironmentSpecificSettings>();
            return Ok(new Dictionary<string, string>
            {
                { "googleSignInClientId", es.GoogleSignInClientId ?? "" },
                { "applicationInsightsInstrumentationKey", es.ApplicationInsightsInstrumentationKey ?? "" },
                { "clientLoggingLogToConsole", es.ClientLoggingLogToConsole ?? "true" },
                { "clientLoggingLogToApplicationInsights", es.ClientLoggingLogToApplicationInsights ?? "true" },
            });
        }
    }
}
