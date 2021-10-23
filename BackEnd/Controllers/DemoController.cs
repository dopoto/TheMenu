using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheMenu.BackEnd.Interfaces;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("[controller]")]
    public class DemoController : ControllerBase
    {
        private readonly IDemoService _demoService;

        public DemoController(IDemoService demoService)
        {
            _demoService = demoService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DemoData))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [EndpointName("/demo")]
        public async Task<IActionResult> GetDemoData()
        {
            var demoData = await _demoService.GetDemoDataAsync();
            return Ok(demoData);
        }
    }
}
