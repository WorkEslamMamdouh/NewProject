using API.Models;
using BLL.Services.Stok_ORDER;
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
using API.Models.CustomModel;

namespace API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class PurchasesController : BaseController
    {


        private readonly IStok_ORDERServices Stok_ORDERServices;

        public PurchasesController(IStok_ORDERServices _Stok_ORDERServices)
        {
            this.Stok_ORDERServices = _Stok_ORDERServices;

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string UserName, string password)
        {
            if (ModelState.IsValid)
            {
                var Login = Stok_ORDERServices.GetAll().ToList();

                return Ok(new BaseResponse(Login));

            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_IQ_PurchasesMaster(string startDate, string endDate, int? ID_Supplier, int Type_Debit)
        {
            if (ModelState.IsValid)
            {
                string s = "select * from IQ_Purchases_Master where Tr_Date >='" + startDate + "' and Tr_Date <='" + endDate + "'";

                string condition = "";

                if (ID_Supplier != 0 && ID_Supplier != null)
                    condition = condition + " and ID_Supplier =" + ID_Supplier;

                if (Type_Debit != 2 && Type_Debit != null)
                    condition = condition + " and Type_Debit =" + Type_Debit;

                 
                string query = s + condition;
                var res = db.Database.SqlQuery<IQ_Purchases_Master>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll_IQ_Purchases_Details(int TrNo)
        {
            if (ModelState.IsValid)
            {
                string s = "select * from IQ_Purchases_Details where TrNo = " + TrNo + "";
                 
                string query = s ;
                var res = db.Database.SqlQuery<IQ_Purchases_Details>(query).ToList();
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult IQ_PurchasesItemInfo(int TrNo)
        {
            if (ModelState.IsValid)
            {
                var res = db.IQ_Purchases_Details.Where(x => x.TrNo == TrNo).ToList();

                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert_Processes([FromBody]SlsMasterDetails Operation)
        {

            try
            {


                var updatedOperationItems = Operation.I_Sls_TR_InvoiceItems.Where(x => x.StatusFlag == "u").ToList();
                var deletedOperationItems = Operation.I_Sls_TR_InvoiceItems.Where(x => x.StatusFlag == "d").ToList();


                //loop Update  I_Pur_TR_ReceiveItems
                foreach (var item in updatedOperationItems)
                {
                    db.update_SalesReturn(item.PRODUCT_ID, Convert.ToInt16(item.Quantity_sell), item.Total_Price_One_Part, item.ID_DELIVERY, "u");


                }

                //loop Delete  I_Pur_TR_ReceiveItems
                foreach (var item in deletedOperationItems)
                {
                    db.update_SalesReturn(item.PRODUCT_ID, Convert.ToInt16(item.Quantity_sell), item.Total_Price_One_Part, item.ID_DELIVERY, "d");


                }

                var Master = Operation.I_Sls_TR_Invoice;
                var Items = Operation.I_Sls_TR_InvoiceItems;

                db.update_Sales_Master(Master.Total_All, Items[0].UserCode, Master.ID_ORDER_Delivery);

                //string qury = "update_Sales_Master  "+ Master.Total_All + ",'"+ Items[0].UserCode + "'," + Master.ID_ORDER_Delivery + " ";
                //var Total_All = db.Database.SqlQuery<double>(qury).FirstOrDefault();



                return Ok(new BaseResponse("ok"));

            }
            catch (Exception ex)
            {

                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }


        }



    }
}
