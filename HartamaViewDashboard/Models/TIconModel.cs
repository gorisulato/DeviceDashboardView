using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TIconModel
    {
        public string IDIcon { get; set; }
        public string IconName { get; set; }
        public string IconDesc { get; set; }
        public string IconClass { get; set; }
        public string IconType { get; set; }
        public string IconPath { get; set; }
        public string IconCategory { get; set; }
        public Nullable<bool> IsDefault { get; set; }
        public string UserEntry { get; set; }
        public string DateEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public string DateLastMaintenance { get; set; }
    }
}