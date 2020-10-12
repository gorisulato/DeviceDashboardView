using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TNotificationModel
    {
        public string Notification_ID { get; set; }
        
        public string Device_ID {get;set;}
        public string Title {get;set;}
        public string Description {get;set;}
        public string DateCreated {get;set;}
        public string Action {get;set;}
        public string status {get;set;}
        public string DateOnly { get; set; }
        public string TimeOnly { get; set; }
        public string DeviceName { get; set; }
        public string SiteName { get; set; }
        public string statusInt { get; set; }
        public int CountTotal { get; set; }
        public int CountUnread { get; set; }



    }
}