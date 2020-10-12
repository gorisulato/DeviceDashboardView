using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TFeatureModel
    {
        public string IDModuleFeatures { get; set; }
        public string IDModule { get; set; }
        public string IDFeatures { get; set; }
        public string FeaturesCode { get; set; }
        public string FeaturesName { get; set; }
        public string FeaturesDesc { get; set; }
        public string FeaturesType { get; set; }
        public string FeaturesAction { get; set; }
        public Nullable<bool> IsExternal { get; set; }
        public string PathApp { get; set; }
        public Nullable<int> Sequence { get; set; }
        public string UserEntry { get; set; }
        public string DateEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public string DateLastMaintenance { get; set; }
        public string IDIcon { get; set; }
        public string IconName { get; set; }
        public string IconClass { get; set; }
        public string IconType { get; set; }
        public string IconPath { get; set; }

        public int TotalRecord { get; set; }
    }
}