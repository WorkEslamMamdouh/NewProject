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
    
    public partial class Purchases_Master
    {
        public int TrNo { get; set; }
        public string Tr_Date { get; set; }
        public Nullable<int> ID_Supplier { get; set; }
        public Nullable<bool> Type_Debit { get; set; }
        public Nullable<decimal> Total_Amount { get; set; }
        public Nullable<decimal> Paid_Up { get; set; }
        public Nullable<decimal> To_be_Paid { get; set; }
    }
}