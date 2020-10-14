using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class SensorDetailModel
    {
        public string id { get; set; }
        public decimal valuelower { get; set; }
        public decimal valueupper { get; set; }
    }
}