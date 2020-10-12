using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class TUserModel
    {
        public string IDUser { get; set; }
        public string UserCode { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
        public string ExpiredDate { get; set; }


        public bool Locked { get; set; }
        public Nullable<int> FailedLogin { get; set; }
        public string LastLogin { get; set; }
        public string LastPasswordChange { get; set; }
        public string UserEntry { get; set; }
        public string DateEntry { get; set; }
        public string UserLastMaintenance { get; set; }
        public string DateLastMaintenance { get; set; }
        public string IDWorkHour { get; set; }
        public string IDRole { get; set; }
        public string EmployeeEmail { get; set; }
        public string PasswordCriteria { get; set; }
        public string Rolename { get; set; }
        public string WorkDesc { get; set; }
        public string IDSite { get; set; }
        public string SiteName { get; set; }
        public byte[] UserPicturebyte { get; set; }
        public string UserPicture { get; set; }

        public int TotalRecords { get; set; }

        //user additional permisions

        public string UserAdditionalPermissionsID { get; set; }
        public string UserID { get; set; }
        public string AllowReOpenWO { get; set; }
        public string AllowAssignWO { get; set; }
        public string AllowCloseWO { get; set; }
        public string AllowCancelWO { get; set; }
        public string AllotToViewCostWO { get; set; }
        public string AllowMaterialReturnFromWO { get; set; }
        public string AllowMaterialIssueFromWO { get; set; }
        public string CanViewAssignWOOnly { get; set; }
        public string AllowPMGeneration { get; set; }
        public string AllowToCreatePR { get; set; }
        public string AllowToReopenPR { get; set; }
        public string AllowToCancelPR { get; set; }
        public string AllowToApprovedPR { get; set; }
        public string AllowToCreatePO { get; set; }
        public string AllowToReopenPO { get; set; }
        public string AloowToAuthorizedPO { get; set; }
        public string AllowToCancelPO { get; set; }
        public string AllowToPrintPO { get; set; }
        public string RegisterInvoiceTo { get; set; }
        public string POApprovalAmount { get; set; }
        public string AllowToCreateGRN { get; set; }
        public string AllowAdjusment { get; set; }
        public string LimitWebRequest { get; set; }
        public string AllowCancelWR { get; set; }
        public string AllowChangeStatus { get; set; }
        public string AllowChecklistGoodReceipt { get; set; }
        public string IsCreate { get; set; }

        public string AllowToClosePO { get; set; }
        public string AllowToChecklistGR { get; set; }

        public string AllowToCloseSO { get; set; }

        public string AllowToAcceptGRTolleranceLimit { get; set; }

        //Employee

        public string EmployeeID { get; set; }
        public string EmployeeNO { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Positions { get; set; }
        public string DepartmentID { get; set; }
        public string DepartmentNo { get; set; }
        public string Extention { get; set; }
        public string WorkPhone { get; set; }
        public string HandPhone { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string Housephone { get; set; }
        public string Address { get; set; }
        public string OfficeLocation { get; set; }
        public string Status { get; set; }
        public string Category { get; set; }

        //TUserActivityLog

        public string Activity { get; set; }
        public string Time { get; set; }
    }
}