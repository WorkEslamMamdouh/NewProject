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
    
    public partial class PRODUCT
    {
        public int PRODUCT_ID { get; set; }
        public string PRODUCT_NAME { get; set; }
        public Nullable<int> PRODUCT_QET { get; set; }
        public Nullable<decimal> PRODUCT_Purchasing_price { get; set; }
        public Nullable<decimal> PRODUCT_PRICE { get; set; }
        public Nullable<int> ID_CAT { get; set; }
    }
}
