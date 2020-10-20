using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class ChartModel
    {
        public string Date { get; set; }
        public string Detail_SensorName { get; set; }
        public decimal average_of_day { get; set; }
        public decimal lower { get; set; }
        public decimal upper { get; set; }
        
    }
}