using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TFeatureAccessModel
    {
        //public IEnumerable<string> IDFeatureAccess { get; set; }
        //public IEnumerable<string> IDSite { get; set; }
        //public IEnumerable<string> IDModuleFeatures { get; set; }
        //public IEnumerable<bool> view { get; set; }
        //public IEnumerable<bool> Visible { get; set; }
        //public IEnumerable<bool> New { get; set; }
        //public IEnumerable<bool> Edit { get; set; }
        //public IEnumerable<bool> Delete { get; set; }
        //public IEnumerable<bool> Printable { get; set; }

        //public IEnumerable<string> Action { get; set; }
        //public string UserEntry { get; set; }
        //public string IDRole { get; set; }
        //public System.DateTime DateEntry { get; set; }
        //public string UserLastMaintenance { get; set; }
        //public Nullable<System.DateTime> DateLastMaintenance { get; set; }
        public string BindIDFeatureAccess { get; set; }
        public string BindIDModuleFeatures { get; set; }
        public string BindView { get; set; }
        public string BindVisible { get; set; }
        public string BindNew { get; set; }
        public string BindEdit { get; set; }
        public string BindDelete { get; set; }
        public string BindPrintable { get; set; }

        public string BindAction { get; set; }
        public string UserEntry { get; set; }
        public string IDRole { get; set; }
        public string PathApp { get; set; }
        public System.DateTime DateEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public Nullable<System.DateTime> DateLastMaintenance { get; set; }
    }
}