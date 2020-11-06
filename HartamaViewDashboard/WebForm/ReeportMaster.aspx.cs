using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using CrystalDecisions.Web;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HartamaViewDashboard.WebForm
{
    public partial class ReeportMaster : System.Web.UI.Page
    {
        Tables CrTables;
        //public ReportDocument cryRpt;
        ReportDocument cryRpt = new ReportDocument();
        ParameterFields pfields = new ParameterFields();
        ConnectionInfo crConnectionInfo = new ConnectionInfo();
       

        public void connections(ReportDocument doc)
        {
            //ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            CrTables = cryRpt.Database.Tables;
            crConnectionInfo.ServerName = HartamaViewDashboard.Properties.Settings.Default.ServerName;
            crConnectionInfo.DatabaseName = HartamaViewDashboard.Properties.Settings.Default.DatabaeName;
            crConnectionInfo.UserID = HartamaViewDashboard.Properties.Settings.Default.UserID;
            crConnectionInfo.Password = HartamaViewDashboard.Properties.Settings.Default.Password;

            foreach (CrystalDecisions.CrystalReports.Engine.Table table in CrTables)
            {

                TableLogOnInfo logOnInfo = table.LogOnInfo;
                if (logOnInfo != null)
                {

                    table.LogOnInfo.TableName = table.Name;
                    table.LogOnInfo.ConnectionInfo.UserID = crConnectionInfo.UserID;
                    table.LogOnInfo.ConnectionInfo.Password = crConnectionInfo.Password;
                    table.LogOnInfo.ConnectionInfo.DatabaseName = crConnectionInfo.DatabaseName;
                    table.LogOnInfo.ConnectionInfo.ServerName = crConnectionInfo.ServerName;
                    //crv.LogOnInfo.Add(table.LogOnInfo);
                    table.ApplyLogOnInfo(table.LogOnInfo);
                    var x = crConnectionInfo.DatabaseName;
                    table.Location = x + table.Name;

                    cryRpt.DataSourceConnections[0].SetLogon(crConnectionInfo.UserID, crConnectionInfo.Password);
                    cryRpt.DataSourceConnections[0].SetConnection(crConnectionInfo.ServerName, crConnectionInfo.DatabaseName, crConnectionInfo.UserID, crConnectionInfo.Password);
                    var xxx = cryRpt.DataSourceConnections[0].ServerName;
                }
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void CRVMaster_Init(object sender, EventArgs e)
        {
            TableLogOnInfos crtableLogoninfos = new TableLogOnInfos();
            TableLogOnInfo crtableLogoninfo = new TableLogOnInfo();
            ConnectionInfo crConnectionInfo = new ConnectionInfo();


            crConnectionInfo.ServerName = HartamaViewDashboard.Properties.Settings.Default.ServerName;
            crConnectionInfo.DatabaseName = HartamaViewDashboard.Properties.Settings.Default.DatabaeName;
            crConnectionInfo.UserID = HartamaViewDashboard.Properties.Settings.Default.UserID;
            crConnectionInfo.Password = HartamaViewDashboard.Properties.Settings.Default.Password;
            CRVMaster.PrintMode = PrintMode.ActiveX;
            var a = Request.QueryString["param"].ToString().Split(',');
            string jenis = a[0].ToString();
            #region Swicth Report
            switch (jenis)
            {
                case "ReportLog":
                    #region
                    string site = a[1].ToString();
                    DateTime startdate = Convert.ToDateTime(a[2].ToString());
                    DateTime enddate = Convert.ToDateTime(a[3].ToString());
                    string DeviceID = a[4].ToString();
                   

                    cryRpt.Load(Server.MapPath("~/Report/") + "ReportLog.rpt");
                    CrTables = cryRpt.Database.Tables;
                    connections(cryRpt);
                    CRVMaster.ReportSource = cryRpt;
                    CRVMaster.ID = "Log" + "-" + DateTime.Now.ToString("dd-MM-yyyy");


                    ParameterField pfsite = new ParameterField();
                    ParameterDiscreteValue pdSite = new ParameterDiscreteValue();
                    pdSite.Value = site;
                    pfsite.Name = "@site";
                    pfsite.CurrentValues.Add(pdSite);

                    ParameterField pfStartDate = new ParameterField();
                    ParameterDiscreteValue pdStartDate= new ParameterDiscreteValue();
                    pdStartDate.Value = startdate;
                    pfStartDate.Name = "@startdate";
                    pfStartDate.CurrentValues.Add(pdStartDate);

                    ParameterField pfEndDate = new ParameterField();
                    ParameterDiscreteValue pdEndDate = new ParameterDiscreteValue();
                    pdEndDate.Value = enddate;
                    pfEndDate.Name = "@EndDate";
                    pfEndDate.CurrentValues.Add(pdEndDate);

                    ParameterField pfDeviceID = new ParameterField();
                    ParameterDiscreteValue pdDeviceID = new ParameterDiscreteValue();
                    pdDeviceID.Value = DeviceID;
                    pfDeviceID.Name = "@DeviceID";
                    pfDeviceID.CurrentValues.Add(pdDeviceID);

                   

                    pfields.Add(pfStartDate);
                    pfields.Add(pfEndDate);
                    pfields.Add(pfDeviceID);
                    pfields.Add(pfsite);


                    CRVMaster.ParameterFieldInfo = pfields;
                    #endregion
                    break;
            }
            #endregion
        }
    }
}