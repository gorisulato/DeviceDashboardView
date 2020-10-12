using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class OptionModel
    {
        public string OptionsID { get; set; }
        public string OptionsName { get; set; }
        public string OptionsValue { get; set; }
        public int TotalRecords { get; set; }
    }
}