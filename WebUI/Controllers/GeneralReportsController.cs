//using Inv.API.Models.CustomEntities;
using Inv.WebUI.Models;
using Inv.WebUI.Reports.Models;

 using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{//eslam 1 dec 2020
    public class GeneralReportsController : Controller
    {
        private ReportService MakeReport(ReportParameters p)
        {
            ReportService rep = new ReportService();

            rep.AddParameter<ReportParameters>("par", p);
            return rep;
        }
        /// <summary>
        /// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>
        public ReportService getStandardParameters()
        {
            //Models.SessionRecord sr = SessionManager.SessionRecord;
            ReportService rep = new ReportService();

            //sr.CompanyName = "";
            //sr.CompanyNameAr = "";
            // SystemEnvironment sys = new SystemEnvironment();

            //rep.AddParameter("CompCode", sr.CompCode);
            //rep.AddParameter("braCode", sr.BranchCode);
            //rep.AddParameter("LoginUser", sr.UserCode);
            //rep.AddParameter("ScreenLanguage", sr.ScreenLanguage);
            //rep.AddParameter("SystemCode", sr.SystemCode);
            //rep.AddParameter("SubSystemCode", sr.SubSystemCode);

            //rep.AddParameter("CompNameA", sr.CompanyNameAr);
            //rep.AddParameter("CompNameE", sr.CompanyName);

            //if (string.IsNullOrEmpty(sr.BranchName))
            //{
            //    rep.AddParameter("BraNameA", "");
            //    rep.AddParameter("BraNameE", "");
            //}
            //else
            //{
            //    rep.AddParameter("BraNameA", sr.BranchName);
            //    rep.AddParameter("BraNameE", sr.BranchName);
            //}


            return rep;
        }
        //mahroos adding new parameter 
        public ReportService getStandardParameters(StdParamters sr)
        {
            //Models.SessionRecord sr = SessionManager.SessionRecord;
            ReportService rep = new ReportService();

            //sr.CompanyName = "";
            //sr.CompanyNameAr = "";
            // SystemEnvironment sys = new SystemEnvironment();

            rep.AddParameter("CompCode", sr.CompCode);
            rep.AddParameter("BranchCode", sr.BranchCode);
            rep.AddParameter("LoginUser", sr.UserCode);
            rep.AddParameter("UserCode", sr.UserCode);
            rep.AddParameter("Tokenid", "HGFD-" + sr.Tokenid);
            rep.AddParameter("ScreenLanguage", sr.ScreenLanguage);
            rep.AddParameter("SystemCode", sr.SystemCode);
            rep.AddParameter("SubSystemCode", sr.SubSystemCode);
            rep.AddParameter("CompNameA", sr.CompNameA);
            rep.AddParameter("CompNameE", sr.CompNameE);

            if (string.IsNullOrEmpty(sr.BranchName))
            {
                rep.AddParameter("BraNameA", "");
                rep.AddParameter("BraNameE", "");
            }
            else
            {
                rep.AddParameter("BraNameA", sr.BranchName);
                rep.AddParameter("BraNameE", sr.BranchName);
            }


            return rep;
        }

        public JsonResult rptPaymentNote(Reportparam rp)
        {
            ReportService rep = getStandardParameters(rp);


            rep.AddParameter("TRId", rp.TRId);
            //rep.AddParameter("Type", rp.Type);
            string url = rep.GetReportUrl("KRpt_PaymentNote");


            return Shared.JsonObject(url);
        }
        //public JsonResult RSProc_RPT_FnPaymentList(PaymentRep rp)
        //{
        //    ReportService rep = getStandardParameters(rp);


        //    rep.AddParameter("RepType", rp.Type);
        //    rep.AddParameter("Status", rp.Status);
        //    rep.AddParameter("CustCode", rp.CustCode);
        //    rep.AddParameter("RentType", rp.RepType);
        //    rep.AddParameter("TrType", rp.TrType);
        //    rep.AddParameter("FromDate", rp.FromDate);
        //    rep.AddParameter("ToDate", rp.ToDate);
        //    rep.AddParameter("FromDateH", rp.FromDateH);
        //    rep.AddParameter("ToDateH", rp.ToDateH);


        //    string url = rep.GetReportUrl("R_RPT_FnPaymentList");


        //    return Shared.JsonObject(url);
        //}

        public JsonResult RPT_Test_(Reportparam rp)
        {
            ReportService rep = getStandardParameters(rp);


            //rep.AddParameter("RepType", rp.Type);
            //rep.AddParameter("Status", rp.Status);
            //rep.AddParameter("CustCode", rp.CustCode);
            //rep.AddParameter("RentType", rp.RepType);
            //rep.AddParameter("TrType", rp.TrType);
            //rep.AddParameter("FromDate", rp.FromDate);
            //rep.AddParameter("ToDate", rp.ToDate);
            //rep.AddParameter("FromDateH", rp.FromDateH);
            //rep.AddParameter("ToDateH", rp.ToDateH);


            string url = rep.GetReportUrl("RPT_Test");


            return Shared.JsonObject(url);
        }
        public JsonResult RPT_RecieveDemand_(Reportparam rp)
        {
            ReportService rep = getStandardParameters(rp);


            //rep.AddParameter("RepType", rp.Type);
            //rep.AddParameter("Status", rp.Status);
            //rep.AddParameter("CustCode", rp.CustCode);
            //rep.AddParameter("RentType", rp.RepType);
            //rep.AddParameter("TrType", rp.TrType);
            //rep.AddParameter("FromDate", rp.FromDate);
            //rep.AddParameter("ToDate", rp.ToDate);
            //rep.AddParameter("FromDateH", rp.FromDateH);
            //rep.AddParameter("ToDateH", rp.ToDateH);


            string url = rep.GetReportUrl("RPT_Test");


            return Shared.JsonObject(url);
        }
        //////////////////////////////////////////////////////////
        //printTransaction

        // print Recieptlist //IProc_Rpt_AccReceiptList 
        public JsonResult IProc_Rpt_AccReceiptList(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("Status", rp.Status);
            rep.AddParameter("BoxId", rp.BoxId);
            rep.AddParameter("RecType", rp.RecType);
            rep.AddParameter("TrType", rp.TrType);
            rep.AddParameter("FromDate", rp.FromDate);
            rep.AddParameter("ToDate", rp.ToDate);
            if (rp.BnfID == null) rp.BnfID = "";
            rep.AddParameter("BnfID", rp.BnfID);
            if (rp.BnfDesc == null) rp.BnfDesc = "";
            rep.AddParameter("BnfDesc", rp.BnfDesc);
            //R_Rpt_AccReceiptList 
            string url = rep.GetReportUrl("R_Rpt_AccReceiptList");

            return Shared.JsonObject(url);
        }

        public JsonResult rptReceiptNote(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TRId", rp.TRId);
            rep.AddParameter("Repdesign", rp.Repdesign);
            //rep.AddParameter("Type", rp.Type);//IProc_Prnt_AccReceive
            string url = rep.GetReportUrl("Rpt_Prnt_AccReceive");


            return Shared.JsonObject(url);
        }

        // print CustomerAdjustlist //IProc_Rep_AccAdjustList
        public JsonResult IProc_Rep_AccAdjustList(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("Status", rp.Status);
            rep.AddParameter("AdjDebit", rp.AdjDebit);
            rep.AddParameter("AdjId", rp.AdjId);
            rep.AddParameter("CustomerID", rp.CustomerID);
            rep.AddParameter("VendorId", rp.VendorId);
            rep.AddParameter("TrType", rp.TrType);
            rep.AddParameter("FromDate", rp.FromDate);
            rep.AddParameter("ToDate", rp.ToDate);
            //R_Rpt_AccReceiptList 
            string url = rep.GetReportUrl("R_Rpt_AccAdjustList");

            return Shared.JsonObject(url);
        }
        //IProc_Prnt_AccAdjust
        public JsonResult rptAdjustNote(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TRId", rp.TRId);
            rep.AddParameter("Repdesign", rp.Repdesign);
            //rep.AddParameter("Type", rp.Type);//IProc_Prnt_AccReceive
            string url = rep.GetReportUrl("Rpt_Prnt_AccAdjust");

            return Shared.JsonObject(url);
        }
        //IProc_Rpt_SlsInvoiceList
        public JsonResult IProc_Rpt_SlsInvoiceList(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("Status", rp.Status);
            rep.AddParameter("SalesmanID", rp.SalesmanID);
            rep.AddParameter("CashType", rp.CashType);
            rep.AddParameter("CustomerID", rp.CustomerID);
            rep.AddParameter("VendorId", rp.VendorId);
            rep.AddParameter("TrType", rp.TrType);
            rep.AddParameter("FromDate", rp.FromDate);
            rep.AddParameter("ToDate", rp.ToDate);
          

            //R_Rpt_AccReceiptList 
            string url = rep.GetReportUrl("R_Rpt_SlsInvoiceList");

            return Shared.JsonObject(url);
        }
        public JsonResult rptInvoiceNote(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TRId", rp.TRId);
            rep.AddParameter("Repdesign", rp.Repdesign);
            rep.AddParameter("typ", rp.typ);
            //rep.AddParameter("Type", rp.Type);//IProc_Prnt_AccReceive
            string url = rep.GetReportUrl("Rpt_Prnt_SlsInvoice");

            return Shared.JsonObject(url);
        }
        ///IProc_Rpt_AccSlsCashInvoiceList
        public JsonResult IProc_Rpt_AccSlsCashInvoiceList(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("Status", rp.Status);
            rep.AddParameter("SalesmanID", rp.SalesmanID);
            rep.AddParameter("CashType", rp.PaymentType);
            rep.AddParameter("CustomerID", rp.CustomerID);
            rep.AddParameter("VendorId", rp.CashBoxID);
            rep.AddParameter("TrType", rp.TrType);
            rep.AddParameter("FromDate", rp.FromDate);
            rep.AddParameter("ToDate", rp.ToDate);
            rep.AddParameter("MobileNo", rp.MobileNo);
            //R_Rpt_AccReceiptList 
            string url = rep.GetReportUrl("Rpt_AccSlsCashInvoiceList");

            return Shared.JsonObject(url);
        }
        ///IProc_Rpt_PurInvoiceList

        public JsonResult IProc_Rpt_PurReceiveList(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TrType", rp.TrType);
            rep.AddParameter("FromDate", rp.FromDate);
            rep.AddParameter("ToDate", rp.ToDate);
            rep.AddParameter("VendorId", rp.VendorId);
            rep.AddParameter("SalesmanID", rp.SalesmanID);
            rep.AddParameter("CashType", rp.CashType);
                rep.AddParameter("Status", rp.Status);
           
            //R_Rpt_AccReceiptList 
            string url = rep.GetReportUrl("Rpt_PurReceiveList");

            return Shared.JsonObject(url);
        }
        public JsonResult IProc_Prnt_PurReceive(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TRId", rp.TRId);
            
          
            string url = rep.GetReportUrl("Rpt_Prnt_PurReceive");

            return Shared.JsonObject(url);
        }

        public JsonResult IProc_Prnt_PurReceiveCharge(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TRId", rp.TRId);

            //rep.AddParameter("Type", rp.Type);//IProc_Prnt_AccReceive
            string url = rep.GetReportUrl("Rpt_Prnt_PurReceiveCharge");

            return Shared.JsonObject(url);
        }
        public JsonResult IProc_Rpt_PurReceiveList_R(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TrType", rp.TrType);
            rep.AddParameter("FromDate", rp.FromDate);
            rep.AddParameter("ToDate", rp.ToDate);
            rep.AddParameter("VendorId", rp.VendorId);
            rep.AddParameter("SalesmanID", rp.SalesmanID);
            rep.AddParameter("CashType", rp.CashType);
            rep.AddParameter("Status", rp.Status);

            //R_Rpt_AccReceiptList 
            string url = rep.GetReportUrl("Rpt_PurReceiveList_R");

            return Shared.JsonObject(url);
        }
        //-
        public JsonResult IProc_Prnt_PurReceiveRet(RepFinancials rp)
        {
            ReportService rep = getStandardParameters(rp);

            rep.AddParameter("RepType", rp.RepType);
            rep.AddParameter("TRId", rp.TRId);

            //rep.AddParameter("Type", rp.Type);//IProc_Prnt_AccReceive
            string url = rep.GetReportUrl("Rpt_Prnt_PurReceiveReturn");

            return Shared.JsonObject(url);
        }




    }
}