//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class The_Gard
    {
        public int id_Num { get; set; }
        public string PRODUCT_NAME { get; set; }
        public Nullable<decimal> PRODUCT_Purchasing_price { get; set; }
        public Nullable<decimal> PRODUCT_PRICE { get; set; }
        public Nullable<double> PRODUCT_Qut { get; set; }
        public Nullable<decimal> Total_Price_One_Part { get; set; }
        public Nullable<decimal> Shortage { get; set; }
        public Nullable<decimal> Outlet { get; set; }
        public Nullable<double> Task { get; set; }
        public string Day_Date { get; set; }
        public string Shift_User { get; set; }
    }
}
