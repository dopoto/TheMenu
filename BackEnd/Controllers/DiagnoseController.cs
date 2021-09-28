using Microsoft.AspNetCore.Mvc;
using TheMenu.BackEnd.Interfaces;
using TheMenu.BackEnd.Models;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DiagnoseController : ControllerBase
    {
        private readonly ILogger<DiagnoseController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IDataRepository<User> _usersService;

        public DiagnoseController(ILogger<DiagnoseController> logger,
            IConfiguration configuration, IDataRepository<User> usersService)
        {
            _logger = logger;
            _configuration = configuration;
            _usersService = usersService;
        }

        [HttpGet]
        [Route("app-health")]
        [EndpointName("/diagnose/app-health")]
        public int GetAppHealth()
        {
            // TODO Add more checks here
            return 1;
        }

        /// <summary>
        /// Performs a database health check and returns the result.
        /// </summary>
        /// <returns>
        /// - 1 if a database connection can be established and data can be fetched.
        /// - 0 if a database connection cannot be established or data cannot be fetched.
        /// </returns>
        [HttpGet]
        [Route("database-health")]
        [EndpointName("/api/diagnose/database-health")]
        public int GetDatabaseHealth()
        {
            try
            {
                // TODO Replace with lighter check
                IEnumerable<User> users = _usersService.GetAll();
                return users.Count() > 0 ? 1 : 0;
            }
            catch
            {
                return 0;
            }
        }
    }
}
