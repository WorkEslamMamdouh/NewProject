using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity;
using System.Web.Http.Dependencies;
using BLL.Services.Login;
using BLL.Services.Item;
using BLL.Services.Category;
using BLL.Services.insert_Table;
using WebUl.DAL.Repository;

namespace Infrastructure
{
    public static class IocConfigurator
    {

        public static void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IUnitOfWork, UnitOfWork>();
            container.RegisterType<Iinsert_TableServices, insert_TableServices>();
            container.RegisterType<ILoginServices, LoginServices>();
            container.RegisterType<IItemServices, ItemServices>();
            container.RegisterType<ICategoryServices, CategoryServices>();



        }
    }
}