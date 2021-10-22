using TheMenu.BackEnd.Areas.Identity.Data;

namespace TheMenu.BackEnd.Models
{
    public class Location
    {
        public Location()
        {
            Name = "";
            Owner = new AppUser();
        }

        public string Name { get; set; }

        public AppUser Owner { get; set; }
    }
}
