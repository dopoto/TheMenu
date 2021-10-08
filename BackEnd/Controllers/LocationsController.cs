using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TheMenu.BackEnd.Controllers
{
    [ApiController]
    [Authorize(Roles = "Owner")]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
        [HttpGet]
        [EndpointName("/locations")]
        public IEnumerable<string> Get()
        {
            return new string[] { "Buddha Bar", "Varice" };
        }
    }
}
