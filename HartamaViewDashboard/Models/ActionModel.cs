using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class ActionModel
    {
        public string IDNotif { get; set; }
        public string Device_ID { get; set; }
        public string DeviceName { get; set; }
        public string SiteName { get; set; }
        public int ActionType { get; set; }
        public string ActionDescription { get; set; }

    }
}