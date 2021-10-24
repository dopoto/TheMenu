using Microsoft.EntityFrameworkCore;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Interfaces;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Services;

public class DemoService: IDemoService
{
    private readonly AppDbContext _dbContext;

    public DemoService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<DemoData> GetDemoDataAsync()
    {
        var demoUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.IsDemo == true);
        if(demoUser == null)
        {
            throw new ApplicationException("Demo data not found");
        }

        return new DemoData
        {
            ClientSideUser = new ClientSideUser
            {
                Id = demoUser.Id,
                Email = demoUser.Email,
                FirstName = demoUser.FirstName,
                LastName = demoUser.LastName,
                PhotoUrl = demoUser.PhotoUrl
            }
        };
    }
}
