using API.Models;
using BLL.Services.Vendor;
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
    public class SupplierController : BaseController
    {

        private readonly IVendorServices VendorServices;

        public SupplierController(IVendorServices _IVendorServices)
        {
            VendorServices = _IVendorServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(int CompCode)
        {
            if (ModelState.IsValid)
            {
                var Supplier = VendorServices.GetAll().ToList();

                return Ok(new BaseResponse(Supplier));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_Item_by_Cat(int ID_Supplier)
        {
            if (ModelState.IsValid)
            {
                var Item = VendorServices.GetAll(x => x.ID_Supplier == ID_Supplier).ToList();

                return Ok(new BaseResponse(Item));

            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult open_and_close_Login(string UserName, string password, int Open_Login)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<GetUser_Login_Result>("GetUser_Login  N'" + UserName + "',N'" + password + "'," + Open_Login + " ").ToList();
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
                    var companies = db.Database.SqlQuery<Delete_Rows_Result>("Delete_Rows " + ID + ",'" + TR_Type + "'").ToList();

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
            //var companiesList = new List<Supplier>();
            //foreach (var company in companies)
            //{
            //    var comp = new Supplier();
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
                    Supplier table = new Supplier();
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
        public IHttpActionResult Insert([FromBody]Supplier Nation)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Nationality = VendorServices.Insert(Nation);
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
                    VendorServices.Delete(ID);
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
        public IHttpActionResult Update([FromBody]Supplier Nation)
        {
            if (ModelState.IsValid)
            {











                try
                {
                    var Nationality = VendorServices.Update(Nation);
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
        public IHttpActionResult UpdateLst(List<Supplier> Supplier)
        {

            try
            {
                var InsertOperationSupplier = Supplier.Where(x => x.StatusFlag == "i").ToList();
                var updatedOperationSupplier = Supplier.Where(x => x.StatusFlag == "u").ToList();
                var deletedOperationSupplier = Supplier.Where(x => x.StatusFlag == "d").ToList();


                //loop Insert  I_Pur_TR_ReceiveSupplier
                foreach (var item in InsertOperationSupplier)
                {


                    var Insert = VendorServices.Insert(item);

                }

                //loop Update  I_Pur_TR_ReceiveSupplier
                foreach (var item in updatedOperationSupplier)
                {

                    var updated = VendorServices.Update(item);

                }

                //loop Delete  I_Pur_TR_ReceiveSupplier
                foreach (var item in deletedOperationSupplier)
                {
                    int id = item.ID_Supplier;
                    VendorServices.Delete(id);

                }


                return Ok(new BaseResponse("ok"));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, "الصنف مستخدم بافعل لا يمكنك تغيره"));
            }

        }

    }
}
