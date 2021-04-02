using DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WebUl.DAL.Repository;

namespace BLL.Services.Login
{
   public class LoginServices : ILoginServices
    {
        private readonly IUnitOfWork unitOfWork;

        public LoginServices(IUnitOfWork _unitOfWork)
        {

            this.unitOfWork = _unitOfWork;

        }


        #region Nationality Services
        public LoginPage GetById(int id)
        {

            return unitOfWork.Repository<LoginPage>().GetById(id);

        }

        public List<LoginPage> GetAll()
        {
            return unitOfWork.Repository<LoginPage>().GetAll();
        }

        public List<LoginPage> GetAll(Expression<Func<LoginPage, bool>> predicate)
        {
            return unitOfWork.Repository<LoginPage>().Get(predicate);
        }

        public LoginPage Insert(LoginPage entity)
        {
            var memb = unitOfWork.Repository<LoginPage>().Insert(entity);
            unitOfWork.Save();
            return memb;
        }

        public LoginPage Update(LoginPage entity)
        {

            var memb = unitOfWork.Repository<LoginPage>().Update(entity);
            unitOfWork.Save();
            return memb;
        }

        public void Delete(int id)
        {
            unitOfWork.Repository<LoginPage>().Delete(id);
            unitOfWork.Save();
        }

        public void UpdateList(List<LoginPage> Lstservice)
        {

            var insertedRecord = Lstservice.Where(x => x.StatusFlag == "i");
            var updatedRecord = Lstservice.Where(x => x.StatusFlag == "u");
            var deletedRecord = Lstservice.Where(x => x.StatusFlag == "d");

            if (updatedRecord.Count() > 0)
                unitOfWork.Repository<LoginPage>().Update(updatedRecord);

            if (insertedRecord.Count() > 0)
                unitOfWork.Repository<LoginPage>().Insert(insertedRecord);


            if (deletedRecord.Count() > 0)
            {
                foreach (var entity in deletedRecord)
                    unitOfWork.Repository<LoginPage>().Delete(entity.ID_User);
            }

            unitOfWork.Save();

        }
        #endregion
    }
}
