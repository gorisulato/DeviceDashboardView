using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TUserInsertModel
    {
        public string IDUser { get; set; }
        public string UserCode { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
        public string ExpiredDate { get; set; }
        public bool Locked { get; set; }
        public Nullable<int> FailedLogin { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }
        public Nullable<System.DateTime> LastPasswordChange { get; set; }
        public string UserEntry { get; set; }
        public System.DateTime DateEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public Nullable<System.DateTime> DateLastMaintenance { get; set; }
        public string IDWorkHour { get; set; }
        public string IDRole { get; set; }
        public string Email { get; set; }
        public string PasswordCriteria { get; set; }
        public string Rolename { get; set; }
        public string WorkDesc { get; set; }
    }
}