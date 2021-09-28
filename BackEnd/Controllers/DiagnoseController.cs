using Microsoft.AspNetCore.Mvc;
using TheMenu.BackEnd.Data;
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
        private readonly TheMenuBackEndContext _dbContext;

        public DiagnoseController(ILogger<DiagnoseController> logger,
            IConfiguration configuration, TheMenuBackEndContext dbContext)
        {
            _logger = logger;
            _configuration = configuration;
            _dbContext = dbContext;
        }

        [HttpGet]
        public string GetAll()
        {
            return GetAppHealth().ToString() + GetDatabaseHealth().ToString();
        }

        [HttpGet]
        [Route("app-health")]
        [EndpointName("/api/diagnose/app-health")]
        public int GetAppHealth()
        {
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
                return _dbContext.Users.Any() ? 1 : 0;
            }
            catch
            {
                return 0;
            }
        }
    }
}
