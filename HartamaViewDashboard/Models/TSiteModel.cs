using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TSiteModel
    {
        public string IDSite { get; set; }
        public string SiteName { get; set; }
        public string Address { get; set; }
        public string PostCode { get; set; }
        public string TelephoneNo { get; set; }
        public string FaxNo { get; set; }
        public string Email { get; set; }
        public string PICSite { get; set; }
        public string UserEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public string DateEntry { get; set; }
        public string DateLastMaintenance { get; set; }
        public bool Discontinue { get; set; }
        public string SiteLogo { get; set; }
        public string ExistingImage { get; set; }
    }
}