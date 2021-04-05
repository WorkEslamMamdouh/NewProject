﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Domain
{
    public class UpdateFlagClass
    {
        public string StatusFlag { get; set; }
    }
    public class SecurityClass
    {
        public string UserCode { get; set; }
        public string Token { get; set; }
    }
    public class SecurityandUpdateFlagClass
    {
        public string StatusFlag { get; set; }
        public string UserCode { get; set; }
        public string Token { get; set; }
    }
    public partial class LoginPage : SecurityandUpdateFlagClass
    {

    }

    public partial class PRODUCT : SecurityandUpdateFlagClass
    {

    }
    public partial class CATEGRE : SecurityandUpdateFlagClass
    {

    }

    
}
