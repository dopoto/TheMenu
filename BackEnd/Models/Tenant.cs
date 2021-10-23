using TheMenu.BackEnd.Areas.Identity.Data;

namespace TheMenu.BackEnd.Models
{
    /// <summary>
    /// A Tenant is for now just a simple container that has a 1-to-1 relation with an 
    /// Owner User. This will evolve later.
    /// </summary>
    public class Tenant
    {
        public Tenant()
        {
            Id = "";
            OwnerId = "";
            Owner = new AppUser();
        }

        public string Id { get; set; }

        public string OwnerId { get; set; }

        public AppUser Owner { get; set; }
    }
}
