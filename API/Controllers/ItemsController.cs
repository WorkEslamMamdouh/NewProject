using API.Models;
using BLL.Services.Item;
using DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Controllers;
using WebUl.API.Tools;
using System.Web.Http.Cors;
using System.Data.SqlClient;
using System.Data.Entity;
using WebUl.DAL.Repository;
using Newtonsoft.Json;

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ItemsController : BaseController
    {
         
        private readonly IItemServices ItemServices;

        public ItemsController(IItemServices _IItemServices)
        {
            ItemServices = _IItemServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode)
        {
            if (ModelState.IsValid)
            {
                var Items = ItemServices.GetAll().ToList();
                
                    return Ok(new BaseResponse(Items));
              
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_Item_by_Cat(int Cat)
        {
            if (ModelState.IsValid)
            {
                var Item = ItemServices.GetAll(x => x.ID_CAT == Cat ).ToList();
               
                return Ok(new BaseResponse(Item));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult open_and_close_Login(string UserName, string password , int Open_Login)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<GetUser_Login_Result>("GetUser_Login  N'" + UserName + "',N'" + password + "',"+ Open_Login + " ").ToList();
                    //var companies = db.GFun_Companies(userCode).ToList();

                    return Ok(new BaseResponse(companies));


                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult PROC_Delete_Rows(int ID, string TR_Type)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<Delete_Rows_Result>("Delete_Rows " + ID + ",'"+ TR_Type + "'").ToList();
                   
                    return Ok(new BaseResponse(companies));


                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult PROC_Enter_Customer(int ID, string TR_Type)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<Enter_Customer_Result>("Enter_Customer " + ID + ",'" + TR_Type + "'").ToList();

                    return Ok(new BaseResponse(companies));


                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }

        protected IEnumerable<T> Get<T>(string SqlStatement)
        {
            //var companiesList = new List<PRODUCT>();
            //foreach (var company in companies)
            //{
            //    var comp = new PRODUCT();
            //    comp.ID = company.ID;
            //    comp.Num= company.Num;
            //    comp.Name= SecuritySystem.Decrypt(company.Name);
            //    comp.Phone= SecuritySystem.Decrypt(company.Phone);
            //    comp.Type = SecuritySystem.Decrypt(company.Type);
            //    comp.Message= SecuritySystem.Decrypt(company.Message);
            //    comp.cheak = Convert.ToBoolean(company.cheak);
            //    comp.StatusFlag = SecuritySystem.Decrypt(company.StatusFlag);
            //    companiesList.Add(comp);
            //};
            //return Ok(companiesList);



            //var SqlStatment = "insert_Table  '" + Name + "','" + Phone + "','" + Type + "','" + Message + "'";

            ////string result = this.ExecuteScalar(SqlStatment);

            //var result = this.Get<object>(SqlStatment);

            //return Ok(new BaseResponse(companiesList));   
            //SqlParameter[] Param = new SqlParameter[] {
            //       new SqlParameter("@Name",Name),
            //       new SqlParameter("@Phone",Phone),
            //       new SqlParameter("@Type",Type),
            //       new SqlParameter("@Message",Message)

            //};
            //db.Database.SqlQuery<string>("Select name from sys.tables").ToList();
            //var data = db.Database.SqlQuery<string>("insert_Table  '"+ Name + "','" + Phone + "','" + Type + "','" + Message + "'").ToList();

            string connectionString = db.Database.Connection.ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();
                    PRODUCT table = new PRODUCT();
                    //table.Load(command.ExecuteReader());
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();

                    var result = JsonConvert.DeserializeObject<IEnumerable<T>>(JsonConvert.SerializeObject(table));
                    return result;
                }
            }

        }

        public string ExecuteScalar(string SqlStatement)
        {
            string connectionString = db.Database.Connection.ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();

                    string result = string.Empty;

                    result = command.ExecuteScalar().ToString();
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();


                    return result;
                }
            }

        }

     


        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]PRODUCT Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = ItemServices.Insert(Nation);
                    return Ok(new BaseResponse(Nationality));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(int ID)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ItemServices.Delete(ID);
                    return Ok(new BaseResponse());
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(0, "Error"));
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]PRODUCT Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = ItemServices.Update(Nation);
                    return Ok(new BaseResponse(Nationality));
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
            return BadRequest(ModelState);
        }



        //***************asmaa********************//
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateLst(List<PRODUCT> PRODUCT)
        {
            try
            {
                ItemServices.UpdateList(PRODUCT);
                return Ok(new BaseResponse());
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }
        }

    }
}
