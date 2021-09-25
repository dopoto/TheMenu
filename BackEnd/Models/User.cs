namespace TheMenu.BackEnd.Models
{
    public class User
    {
        public Guid ID { get; set; }
        
        public string Email { get; set; }

        public DateTime CreatedDate { get; set; }      
    }
}
