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
    
    public partial class Report_Parameters
    {
        public int id { get; set; }
        public Nullable<int> ID_Report { get; set; }
        public string Parameter_1 { get; set; }
        public string Parameter_2 { get; set; }
        public string Parameter_3 { get; set; }
        public string Parameter_4 { get; set; }
        public string Parameter_5 { get; set; }
        public string Parameter_6 { get; set; }
        public string Parameter_7 { get; set; }
        public string Parameter_8 { get; set; }
        public string Parameter_9 { get; set; }
    
        public virtual Settings_Report Settings_Report { get; set; }
    }
}
