using Microsoft.AspNetCore.Identity;
using TheMenu.BackEnd.Areas.Identity.Data;
using TheMenu.BackEnd.Interfaces;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Services;

public class UsersService
{
    private readonly EnvironmentSpecificSettings _settings;
    private readonly UserManager<AppUser> _userManager;
    private readonly ITenantsService _tenantsService;

    public UsersService(IConfiguration configuration, UserManager<AppUser> userManager, 
        ITenantsService tenantsService)
    {
        _settings = configuration.Get<EnvironmentSpecificSettings>();
        _userManager = userManager;        
        _tenantsService = tenantsService;
    }

    /// <summary>
    /// TODO Refactor - strange method signature.
    /// </summary>
    /// <param name="email"></param>
    /// <param name="firstName"></param>
    /// <param name="lastName"></param>
    /// <param name="photoUrl"></param>
    /// <param name="isDemo"></param>
    /// <param name="info"></param>
    /// <returns></returns>
    public async Task<AppUser> GetOrCreateUserAsync(string email, 
        string firstName, string lastName, string photoUrl, bool isDemo, UserLoginInfo info)
    {
        var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        if (user == null)
        {
            user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                user = new AppUser
                {
                    Email = email,
                    UserName = email,
                    FirstName = firstName,
                    LastName = lastName,
                    PhotoUrl = photoUrl,
                    IsDemo = isDemo,
                };
                await _userManager.CreateAsync(user);

                // TODO prepare and send an email for the email confirmation

                await _userManager.AddToRoleAsync(user, "Owner");
                //await _userManager.AddToRoleAsync(user, "StaffMember");                
                await _userManager.AddLoginAsync(user, info);
                await _tenantsService.CreateTenantForUser(user);
            }
            else
            {
                //TODO check if account is Locked Out
                await _userManager.AddLoginAsync(user, info);
            }
        }
        return user;
    }

    public async Task<AppUser> GetUserAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user;
    }

    public Task<IdentityResult> UpdateAsync(AppUser user)
    {
        return _userManager.UpdateAsync(user);
    }
}
