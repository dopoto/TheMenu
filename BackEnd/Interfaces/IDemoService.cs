using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Interfaces
{
    public interface IDemoService
    {
        Task<DemoData> GetDemoDataAsync();
    }
}
