using System.Collections.Generic;
using System.Linq;
using TheMenu.BackEnd.Data;
using TheMenu.BackEnd.Interfaces;
using TheMenu.BackEnd.Models;

namespace TheMenu.BackEnd.Services
{
    public class UsersService : IDataRepository<User>
    {
        readonly AppDbContext _appDbContext;

        public UsersService(AppDbContext context)
        {
            _appDbContext = context;
        }
        public IEnumerable<User> GetAll()
        {
            return _appDbContext.Users.ToList();
        }
        public User Get(Guid id)
        {
            return _appDbContext.Users.FirstOrDefault(e => e.Id == id.ToString());
        }

        public void Add(User entity)
        {
            throw new NotImplementedException();
        }

        public void Update(User dbEntity, User entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(User entity)
        {
            throw new NotImplementedException();
        }

        //public void Add(Employee entity)
        //{
        //    _employeeContext.Employees.Add(entity);
        //    _employeeContext.SaveChanges();
        //}
        //public void Update(Employee employee, Employee entity)
        //{
        //    employee.FirstName = entity.FirstName;
        //    employee.LastName = entity.LastName;
        //    employee.Email = entity.Email;
        //    employee.DateOfBirth = entity.DateOfBirth;
        //    employee.PhoneNumber = entity.PhoneNumber;
        //    _employeeContext.SaveChanges();
        //}
        //public void Delete(Employee employee)
        //{
        //    _employeeContext.Employees.Remove(employee);
        //    _employeeContext.SaveChanges();
        //}
    }

}
