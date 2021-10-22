using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TheMenu.BackEnd.Areas.Identity.Data;
using TheMenu.BackEnd.Configuration;

namespace TheMenu.BackEnd.Data;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);

        builder.ApplyConfiguration(new RoleConfiguration());

        //builder.Entity<User>().ToTable("AspNetUsers");
    }

    //public DbSet<User>? Users { get; set; }
 
}
