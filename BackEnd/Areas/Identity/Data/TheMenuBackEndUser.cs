﻿using Microsoft.AspNetCore.Identity;

namespace TheMenu.BackEnd.Areas.Identity.Data;

// Add profile data for application users by adding properties to the TheMenuBackEndUser class
public class TheMenuBackEndUser : IdentityUser
{
	// TODO Add claims to Identity using IUserClaimsPrincipalFactory<ApplicationUser> https://docs.microsoft.com/en-us/aspnet/core/security/authentication/add-user-data?view=aspnetcore-6.0&tabs=visual-studio#add-claims-to-identity-using-iuserclaimsprincipalfactoryapplicationuser

    /// <summary>
    ///  TODO Use enum
    /// </summary>
    //public string SocialProvider { get; set; }
}

