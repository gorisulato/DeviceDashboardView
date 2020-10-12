using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TModuleModel
    {
        public string IDModule { get; set; }
        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string ModuleCode { get; set; }
        public string ModuleName { get; set; }
        public string ModuleDesc { get; set; }
        public string UserEntry { get; set; }
        public string DateEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public string DateLastMaintenance { get; set; }
        public int Sequence { get; set; }
        public bool IsDefault { get; set; }
        public string IDIcon { get; set; }
        public string IDIconModule { get; set; }
        public string IconName { get; set; }
        public string IconClass { get; set; }
        public string IconType { get; set; }
        public string IconPath { get; set; }
    }
}