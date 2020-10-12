using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Models
{
    public class CW_SiteModel
    {

        public string idsite { get; set; }
        public string idlevel { get; set; }
        public string levelname { get; set; }

        public string sitecode { get; set; }
        public string sitename { get; set; }

        public string sitelist { get; set; }

        public string supervisor { get; set; }
        public string sitesupervisorid { get; set; }
        public string sitefax { get; set; }
        public string idtimezone { get; set; }
        public string timezone { get; set; }
        public string tzoffset { get; set; }
        public string idcurrency { get; set; }
        public string currencycode { get; set; }
        public string add1 { get; set; }
        public string add2 { get; set; }
        public string add3 { get; set; }
        public string add4 { get; set; }
        public string add5 { get; set; }
        public string add6 { get; set; }
        public string add7 { get; set; }
        public string add8 { get; set; }
        public string add9 { get; set; }
        public string add10 { get; set; }
        public string SiteLogo { get; set; }
        public string filename { get; set; }
        public string PMAttachmentName { get; set; }
        public string PMAttachmentPath { get; set; }
        public string userentry { get; set; }
        public string dateentry { get; set; }
        public string userlastmaintenance { get; set; }
        public string datelastmaintenance { get; set; }
        public byte[] SiteLogoByte { get; set; }
        public int totalrecods { get; set; }

        //subcasetypeid

        public string subcasetypeid { get; set; }

        public string sctdescription { get; set; }

        //service type category

        public string servicetypecategoryid { get; set; }

        public string stcdescription { get; set; }

        //SLA

        public string SubcaseType { get; set; }
        public string ServiceTypeCategory { get; set; }
        public string ServiceType { get; set; }
        public string ServiceTypeID { get; set; }
        public string WorkPriority { get; set; }
        public string WorkPriorityID { get; set; }

        public string CompletionTime { get; set; }
        public string UnitOfTime { get; set; }

        public string ResponseTime { get; set; }
        public string ResponseUnitOfTime { get; set; }
        public string SiteCodeSLA { get; set; }

        public string SiteSLAID { get; set; }
    }
}