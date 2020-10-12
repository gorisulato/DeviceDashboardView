using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TPasswordPolicyModel
    {
        public string DefaultPassword { get; set; }
        public int MinLength { get; set; }
        public int MaxLength { get; set; }
        public string PasswordCriteria { get; set; }
        public string UserLastMaintenance { get; set; }
        public string DateLastMaintenance { get; set; }
        public string IDPasswordPolicy { get; set; }
        public Nullable<int> PasswordAgingInterval { get; set; }
        public Nullable<bool> IsPasswordAging { get; set; }
        public Nullable<int> AdvancedNoticed { get; set; }
        public Nullable<int> MaximumFailedLogin { get; set; }
        public string Encrypt { get; set; }
    }
}