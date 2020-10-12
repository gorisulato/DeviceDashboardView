using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TRoleModel
    {

        public string IDRole { get; set; }
        public string Rolename { get; set; }
        public string RoleDesc { get; set; }
        public bool Discontinue { get; set; }
        public string UserEntry { get; set; }
        public string DateEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public string DateLastMaintenance { get; set; }
    }
}