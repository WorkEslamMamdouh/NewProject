using DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Login
{
    public interface ILoginServices
    {
        LoginPage GetById(int id);
        List<LoginPage> GetAll();
        List<LoginPage> GetAll(Expression<Func<LoginPage, bool>> predicate);
        LoginPage Insert(LoginPage entity);
        LoginPage Update(LoginPage entity);
        void Delete(int id);
        void UpdateList(List<LoginPage> Lstservice);
    }
}
