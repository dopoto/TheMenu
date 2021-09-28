using TheMenu.BackEnd.Models;

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

            var users = new User[]
            {
                new User {GuidId= Guid.NewGuid(), Email="user@example.com", CreatedDate = DateTime.Now}
            };
            foreach (User s in users)
            {
                context.Users.Add(s);
            }
            context.SaveChanges();
        }
    }
}
