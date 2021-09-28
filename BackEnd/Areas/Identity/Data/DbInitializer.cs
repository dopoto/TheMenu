using TheMenu.BackEnd.Areas.Identity.Data;

namespace TheMenu.BackEnd.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TheMenuBackEndContext context)
        {
            context.Database.EnsureCreated();

            // Look for any users.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var users = new TheMenuBackEndUser[]
            {
                new TheMenuBackEndUser {Email="user@example.com"}
            };
            foreach (TheMenuBackEndUser s in users)
            {
                context.Users.Add(s);
            }
            context.SaveChanges();
        }
    }
}
