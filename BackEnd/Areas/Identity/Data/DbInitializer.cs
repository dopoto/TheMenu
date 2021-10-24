using Microsoft.AspNetCore.Identity;
using TheMenu.BackEnd.Services;

namespace TheMenu.BackEnd.Data;

public static class DbInitializer
{
    public static async Task Initialize(AppDbContext context, 
        UsersService usersService)
    {
        context.Database.EnsureCreated();

        // Look for any users.
        if (context.Users.Any())
        {
            return; // DB has been seeded
        }

        await SeedDemoData(usersService);
    }

    private static async Task SeedDemoData(UsersService usersService)
    {
        await usersService.GetOrCreateUserAsync(
            "demouser@demosite.com",
            "Demo", 
            "MacDemo",
            "assets/images/demo-face-1.jfif",
            true, 
            new UserLoginInfo("DEMO", "DEMO", "DEMO")
        );
    }
}

