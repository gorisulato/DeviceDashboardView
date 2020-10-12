using HartamaViewDashboard.DB;
using HartamaViewDashboard.Hubs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class ChartByDeviceIDClass
    {
        Hartama_IOTEntities db = new Hartama_IOTEntities();
        readonly string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public bool status3 = false;
        public List<GetDeviceChartByID_Result> GetChartbyID(string IDDevice)
        {
            var res = db.GetDeviceChartByID(IDDevice).ToList();
            return res;
        }

        public void notifchartdetail()
        {
            using (var connection = new SqlConnection(_connString))
            {
                connection.Open();
                using (var command = new SqlCommand(@"select datecreated from [dbo].[TChartNotification]  ", connection))
                {
                    {
                        command.Notification = null;
                        var dependency = new SqlDependency(command);
                        dependency.OnChange += new OnChangeEventHandler(chartdetail_OnChange);

                        if (connection.State == ConnectionState.Closed)
                            connection.Open();
                        var reader = command.ExecuteReader();

                    }
                }
                connection.Close();
            }
        }

        public void chartdetail_OnChange(object sender, SqlNotificationEventArgs e)
        {


            if (e.Type == SqlNotificationType.Change)
            {

                status3 = true;
                MessagesHub.SendMessages();

                notifchartdetail();
            }


        }
    }

   
}