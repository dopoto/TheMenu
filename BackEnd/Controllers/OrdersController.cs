using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TheMenu.BackEnd.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        [HttpGet]
        [EndpointName("/orders")]
        public IEnumerable<string> Get()
        {
            return new string[] { "Order 1", "Order 2" };
        }
    }
}
