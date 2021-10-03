namespace TheMenu.BackEnd.Models
{
    public class AuthResponse
    {
        public bool IsAuthSuccessful { get; set; }

        public string ErrorMessage { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        public string Provider { get; set; }
    }
}
