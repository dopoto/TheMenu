using Microsoft.EntityFrameworkCore;
using TheMenu.BackEnd.Areas.Identity.Data;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Interfaces;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Services;

public class TenantsService: ITenantsService
{
    private readonly EnvironmentSpecificSettings _settings;
    private readonly AppDbContext _context;

    public TenantsService(IConfiguration configuration, AppDbContext context)
    {
        _settings = configuration.Get<EnvironmentSpecificSettings>();
        _context = context; 
    }

    public async Task<Tenant> CreateTenantForUser(AppUser user)
    {
        var et = await _context.Tenants.Where(t => t.OwnerId == user.Id).FirstOrDefaultAsync();
        if(et != null)
        {
            throw new ApplicationException("A tenant already exists for this owner user.");
        }

        var tenant = new Tenant { Id = Guid.NewGuid().ToString(), Owner = user, OwnerId = user.Id};
        _context.Tenants.Add(tenant);
        await _context.SaveChangesAsync();
        return tenant;
    }
}

