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
    
    public partial class Stok_ORDER_DELIVERY
    {
        public int ID_DELIVERY { get; set; }
        public string Name_Product_sell { get; set; }
        public Nullable<double> Quantity_sell { get; set; }
        public Nullable<decimal> price_One_part { get; set; }
        public Nullable<decimal> Total_Price_One_Part { get; set; }
        public string Notes_Order { get; set; }
        public Nullable<int> FK_ORDER_Delivery { get; set; }
    }
}
