using Microsoft.AspNetCore.Identity;

namespace TheMenu.BackEnd.Models
{
    public class User : IdentityUser
    {
        public Guid GuidId { get; set; }
        

        public DateTime CreatedDate { get; set; }      
    }
}
