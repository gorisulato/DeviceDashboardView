using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class PSensorParameterModel
    {
        public string paramid { get; set; }
        public string paramcode { get; set; }
        public string paramname { get; set; }
        public string paramdesc { get; set; }
        public string[] Detail { get; set; }

    }
}