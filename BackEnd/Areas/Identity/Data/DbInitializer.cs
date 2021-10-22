using TheMenu.BackEnd.Areas.Identity.Data;

namespace TheMenu.BackEnd.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any users.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            // TODO Use a users service method to initialiZe user (re-use it in accountsController too)
            var users = new AppUser[]
            {
                new AppUser {Email="user@example.com"}
            };
            foreach (AppUser s in users)
            {
                context.Users.Add(s);
            }
            context.SaveChanges();
        }
    }
}
