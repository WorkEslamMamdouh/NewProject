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
    
    public partial class IQ_Purchases_Details
    {
        public int ID { get; set; }
        public int TrNo { get; set; }
        public string Name_CAT { get; set; }
        public string PRODUCT_NAME { get; set; }
        public Nullable<int> Purchases_Quantity { get; set; }
        public Nullable<decimal> Purchases_Price { get; set; }
        public Nullable<decimal> Sales_Price { get; set; }
        public Nullable<decimal> MinUnitPrice { get; set; }
        public Nullable<int> PRODUCT_ID { get; set; }
        public int ID_CAT { get; set; }
        public Nullable<int> ID_familly_Cat { get; set; }
    }
}
