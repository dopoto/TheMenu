using TheMenu.BackEnd.Areas.Identity.Data;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Interfaces
{
    public interface ITenantsService
    {
        Task<Tenant> CreateTenantForUser(AppUser user);
    }
}
