using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using HartamaViewDashboard.DB;
using System.Linq;
using System.Web;
using System.Data.SqlTypes;
using System.Data.SqlClient;
using HartamaViewDashboard.Hubs;
using System.Data;

namespace HartamaViewDashboard.Class
{
    public class TUserClass
    {

        private int ret;
        private Hartama_IOTEntities db = new Hartama_IOTEntities();
        CW_UtilityClass CWU = new CW_UtilityClass();
        List<TUserModel> modelUser = new List<TUserModel>();
        List<TNotificationModel> modelTNotification = new List<TNotificationModel>();
        //List<EmployeeModel> ModelEployee = new List<EmployeeModel>();
        string sqlcount = "";
        SqlDependency dependency;
        string sql = "";
        public bool status3 = false;
        readonly string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
      

        public List<PTUserLogin_Result> TUserLogin(AuthModel Auth)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTUserLogin(Auth.userName, Auth.password).ToList();
            return res;

        }

        public List<PTUserSelectByKeyword_Result> UserSelectAll(string orderby, string dir, string keyword)
        {
            var res = db.PTUserSelectByKeyword(orderby, dir, "").ToList();
            return res;

        }

        //public List<PTUserSelectBySiteRoleKeyword_Result> UserSelectSearch(string orderby, string dir, string keyword, string IDRole, string IDSite, int limit, int offset, bool discontinue)
        //{
        //    var res = db.PTUserSelectBySiteRoleKeyword(orderby, dir, keyword, IDRole, IDSite, limit, offset, discontinue).ToList();
        //    return res;

        //}

        public List<PTUserSelectByKeyword_Result> UserSelectByKeyword(string orderby, string dir, string keyword, int limit, int offset)
        {
            var res = db.PTUserSelectByKeyword(orderby, dir, keyword).ToList();
            return res;

        }

        public List<PTUserSelectALL_Result> UserSelectALL()
        {
            var res = db.PTUserSelectALL().ToList();
            return res;

        }

        public List<PTUserSelectByID_Result> UserSelectByID(string ID)
        {
            var res = db.PTUserSelectByID(ID).ToList();


            return res;

        }

        public List<TUserModel> SelectOperationAdditionalPermisions(string ID)
        {
            if (CWU.OpenConnection())
            {


                var sql = "select count(*) from dbo.UserAdditionalPermissions AS a where a.UserID ='" + ID + "'";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    var SubStore = new TUserModel();
                    SubStore.IsCreate = CWU.dtreader[0].ToString();
                    //SubStore.SubStoreName = CWU.dtreader[1].ToString();
                    modelUser.Add(SubStore);
                }
            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return modelUser;
        }

        public List<TUserModel> SelectAdditionalPermisions(string ID)
        {
            if (CWU.OpenConnection())
            {

                modelUser.Clear();
                var sql = "select a.UserAdditionalPermissionsID, " +
                           " a.UserID, " +
                           " a.AllowReOpenWO, " +
                           " a.AllowAssignWO, " +
                           " a.AllowCloseWO," +
                           " a.AllowCancelWO," +
                           " a.AllotToViewCostWO," +
                           " a.AllowMaterialReturnFromWO," +
                           " a.AllowMaterialIssueFromWO," +
                           " a.CanViewAssignWOOnly," +
                           " a.AllowPMGeneration," +
                           " a.AllowToCreatePR," +
                           " a.AllowToReopenPR," +
                           " a.AllowToCancelPR," +
                           " a.AllowToApprovedPR," +
                           " a.AllowToCreatePO," +
                           " a.AllowToReopenPO," +
                           " a.AloowToAuthorizedPO," +
                           " a.AllowToCancelPO," +
                           " a.AllowToPrintPO," +
                           " a.RegisterInvoiceTo," +
                           " a.POApprovalAmount," +
                           " a.AllowToCreateGRN," +
                           " a.AllowAdjusment," +
                           " a.LimitWebRequest," +
                           " a.AllowCancelWR," +
                           " a.AllowChangeStatus , a.AllowToChecklistGR , a.AllowToClosePO , a.AllowToCloseSO , a.AllowToAcceptGRTolleranceLimit" +
                           " from dbo.UserAdditionalPermissions AS a where a.UserID ='" + ID + "'";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    var UM = new TUserModel();
                    UM.UserAdditionalPermissionsID = CWU.dtreader[0].ToString();
                    UM.UserID = CWU.dtreader[1].ToString();
                    UM.AllowReOpenWO = CWU.dtreader[2].ToString();
                    UM.AllowAssignWO = CWU.dtreader[3].ToString();
                    UM.AllowCloseWO = CWU.dtreader[4].ToString();
                    UM.AllowCancelWO = CWU.dtreader[5].ToString();
                    UM.AllotToViewCostWO = CWU.dtreader[5].ToString();
                    UM.AllowMaterialReturnFromWO = CWU.dtreader[7].ToString();
                    UM.AllowMaterialIssueFromWO = CWU.dtreader[8].ToString();
                    UM.CanViewAssignWOOnly = CWU.dtreader[9].ToString();
                    UM.AllowPMGeneration = CWU.dtreader[10].ToString();
                    UM.AllowToCreatePR = CWU.dtreader[11].ToString();
                    UM.AllowToReopenPR = CWU.dtreader[12].ToString();
                    UM.AllowToCancelPR = CWU.dtreader[13].ToString();
                    UM.AllowToApprovedPR = CWU.dtreader[14].ToString();
                    UM.AllowToCreatePO = CWU.dtreader[15].ToString();
                    UM.AllowToReopenPO = CWU.dtreader[16].ToString();
                    UM.AloowToAuthorizedPO = CWU.dtreader[17].ToString();
                    UM.AllowToCancelPO = CWU.dtreader[18].ToString();
                    UM.AllowToPrintPO = CWU.dtreader[19].ToString();
                    UM.RegisterInvoiceTo = CWU.dtreader[20].ToString();
                    UM.POApprovalAmount = CWU.dtreader[21].ToString();
                    UM.AllowToCreateGRN = CWU.dtreader[22].ToString();
                    UM.AllowAdjusment = CWU.dtreader[23].ToString();
                    UM.LimitWebRequest = CWU.dtreader[24].ToString();
                    UM.AllowCancelWR = CWU.dtreader[25].ToString();
                    UM.AllowChangeStatus = CWU.dtreader[26].ToString();
                    UM.AllowToChecklistGR = CWU.dtreader[27].ToString();
                    UM.AllowToClosePO = CWU.dtreader[28].ToString();
                    UM.AllowToCloseSO = CWU.dtreader[29].ToString();
                    UM.AllowToAcceptGRTolleranceLimit = CWU.dtreader[30].ToString();
                    modelUser.Add(UM);
                }
            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return modelUser;
        }

        public string InsertUser(TUserModel mdl)
        {
            
            SqlDateTime sqldatetime = new SqlDateTime();
            var res = "";
            if (CWU.OpenConnection())
            {
                sql = "[PTUserInsert]";
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.command.CommandType = System.Data.CommandType.StoredProcedure;
                CWU.command.Parameters.AddWithValue("@UserCode", mdl.UserCode);
                CWU.command.Parameters.AddWithValue("@UserName", mdl.Username);
                CWU.command.Parameters.AddWithValue("@Password", mdl.Password);
                CWU.command.Parameters.AddWithValue("@Fullname", mdl.Fullname);
                CWU.command.Parameters.AddWithValue("@Email", mdl.Email);
                CWU.command.Parameters.Add("@ExpiredDate", sqldatetime).Value = DateTime.ParseExact(mdl.ExpiredDate, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                CWU.command.Parameters.AddWithValue("@IDRole", mdl.IDRole);
                CWU.command.Parameters.AddWithValue("@IDWorkHour", mdl.IDWorkHour);
                CWU.command.Parameters.AddWithValue("@UserEntry", mdl.UserEntry);
                CWU.command.Parameters.AddWithValue("@DateEntry", DBNull.Value);
                CWU.command.Parameters.AddWithValue("@Locked", mdl.Locked);
                try
                {
                    int ret = CWU.command.ExecuteNonQuery();
                    res = "1";
                }
                catch (SqlException e)
                {
                    res = e.Message.ToString();
                }
                finally
                {
                    CWU.command.Connection.Close();
                }

            }

            return res;
        }

        public string UpdateUserPicture(TUserModel mdl, string iduserpicture)
        {
            if (CWU.OpenConnection())
            {
                CWU.command.Connection = CWU.connection;
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = "UPDATE  [Tuser] set  UserPicture = @UserPicture Where IDUser = '" + iduserpicture + "' ";
                if (mdl.UserPicturebyte == null)
                {
                    CWU.command.Parameters.AddWithValue("@UserPicture", System.Data.SqlTypes.SqlBinary.Null);

                }
                else
                {
                    CWU.command.Parameters.AddWithValue("@UserPicture", mdl.UserPicturebyte);
                }
                try
                {
                    ret = CWU.command.ExecuteNonQuery();

                }
                catch (SqlException e)
                {
                    e.Message.ToString();
                }
                finally
                {

                }
            }

            CWU.command.Connection.Close();
            return ret.ToString();

        }

        public string SelectProfilePicture(string iduserpicture)
        {
            string res = "";
            if (CWU.OpenConnection())
            {
                String sql = "SELECT  UserPicture FROM dbo.[Tuser] AS a WHERE IDUser='" + iduserpicture + "'";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                //SqlDataReader rdr = cmd.ExecuteReader();
                CWU.dtreader = CWU.command.ExecuteReader();

                //Site.totalrecods = CWU.dtreader();
                while (CWU.dtreader.Read())
                {
                    var Profic = new TUserModel();
                    //Profic.IDUser = CWU.dtreader[0].ToString();
                    res = CWU.dtreader[0].ToString() != "" ? Convert.ToBase64String((byte[])CWU.dtreader[0]) : "";

                }

            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return res;

        }
        public string DeleteProfilePicture(string iduserpicture)
        {
            if (CWU.OpenConnection())
            {
                CWU.command.Connection = CWU.connection;
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = "UPDATE  [Tuser] set  UserPicture = null Where IDUser = '" + iduserpicture + "' ";

                try
                {
                    ret = CWU.command.ExecuteNonQuery();

                }
                catch (SqlException e)
                {
                    e.Message.ToString();
                }
                finally
                {

                }
            }

            CWU.command.Connection.Close();
            return ret.ToString();


        }

        public string UserUpdate(TUserModel mdl)
        {

            SqlDateTime sqldatetime = new SqlDateTime();
            var res = "";
            if (CWU.OpenConnection())
            {

                sql = "[PTUserUpdate]";
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.command.CommandType = System.Data.CommandType.StoredProcedure;
                CWU.command.Parameters.AddWithValue("@IDUser", mdl.IDUser);

                CWU.command.Parameters.AddWithValue("@UserCode", mdl.UserCode);
                CWU.command.Parameters.AddWithValue("@UserName", mdl.Username);
                CWU.command.Parameters.AddWithValue("@Password", mdl.Password);
                CWU.command.Parameters.AddWithValue("@Fullname", mdl.Fullname);
                CWU.command.Parameters.AddWithValue("@Email", mdl.Email);
                CWU.command.Parameters.Add("@ExpiredDate", sqldatetime).Value = Convert.ToDateTime(mdl.ExpiredDate);
                CWU.command.Parameters.AddWithValue("@IDRole", mdl.IDRole);
                CWU.command.Parameters.AddWithValue("@IDWorkHour", mdl.IDWorkHour);
                CWU.command.Parameters.AddWithValue("@LastLogin", DBNull.Value);
                CWU.command.Parameters.AddWithValue("@LastPasswordChange", DBNull.Value);
                CWU.command.Parameters.AddWithValue("@UserLastMaintanance", mdl.UserLastMaintenance);
                CWU.command.Parameters.AddWithValue("@DateLastMaintanance", DBNull.Value);
                try
                {
                    int ret = CWU.command.ExecuteNonQuery();
                    res = "1";
                }
                catch (SqlException e)
                {
                    res = e.Message.ToString();
                }
                finally
                {
                    CWU.command.Connection.Close();
                }

            }

            return res;

        }

        public String UserDelete(TUserModel mdl)
        {
            try
            {
                string ret = "";
                var res = db.PTUserDelete(mdl.IDUser, mdl.UserLastMaintenance, Convert.ToDateTime(mdl.DateLastMaintenance)).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelUserName, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (SqlException e)
            {
                return "Err|" + e.InnerException.Message;
                //return "0|" + e.Message;
            }
        }

        public String UserLocked(TUserInsertModel mdl)
        {
            try
            {
                string ret = "";
                var res = db.PTUserUpdateLocked(mdl.IDUser, mdl.Locked, mdl.UserLastMaintenance, mdl.DateLastMaintenance).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelUserName, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (SqlException e)
            {
                return "Err|" + e.Message.ToString();
            }
        }

        public String UserUnlocked(TUserInsertModel mdl)
        {
            try
            {
                string ret = "";
                var res = db.PTUserUpdateLocked(mdl.IDUser, mdl.Locked, mdl.UserLastMaintenance, mdl.DateLastMaintenance).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelUserName, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (SqlException e)
            {
                return "Err|" + e.InnerException.Message;
            }
        }

        public String UserResetPassword(TUserInsertModel mdl)
        {
            try
            {
                string ret = "";
                var res = db.PTUserUpdateResetPassword(mdl.IDUser, mdl.UserLastMaintenance, mdl.DateLastMaintenance, mdl.LastPasswordChange).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    ret = res.Pesan + '|' + res.NamaUser + '|' + res.Password + '|' + res.Email;

                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (SqlException e)
            {
                return "Err|" + e.InnerException.Message;
            }
        }
        //Add By Irham for upadte last user login Site
        //04-09-2015
        public void UpdateTUserLastLogin(string IDUser, string IDSite)
        {
            db = new Hartama_IOTEntities();
            db.PTUserUpdateLastLoginSite(IDUser, IDSite);


        }

        public void notifdep()
        {
            using (var connection = new SqlConnection(_connString))
            {
                connection.Open();
                using (var command = new SqlCommand(@"Select status   from [dbo].[TNotification]  ", connection))
                {
                    {
                        command.Notification = null;
                        var dependency = new SqlDependency(command);
                        dependency.OnChange += new OnChangeEventHandler(dependency_OnChange);

                        if (connection.State == ConnectionState.Closed)
                            connection.Open();
                        var reader = command.ExecuteReader();

                    }
                }
                connection.Close();
            }
        }

        public void dependency_OnChange(object sender, SqlNotificationEventArgs e)
        {


            if (e.Type == SqlNotificationType.Change)
            {

                status3 = true;
                MessagesHub.SendMessages();

                notifdep();
            }


        }

        public List<GetDataNotifications_Result> GetDataNotificationLog(string UserID, int limit, int offset)
        {
            var res = db.GetDataNotifications(UserID, offset, limit).ToList();
            return res;
        }
        public List<GetDeviceBySite_Result> GetDevicebySite(string User)
        {
            var res = db.GetDeviceBySite(User).ToList();
            return res;
        }
        public List<GetAllChart_Result> GetChart(string DeviceID)
        {
            var res = db.GetAllChart(DeviceID).ToList();
            return res;
        }

        public List<TNotificationSelect_Result> GetNotificationResult(string UserID, int limit, int offset)
        {
            var res = db.TNotificationSelect(UserID,  offset, limit).ToList();
            return res;
        }

        
        public void notifchart()
        {
 
            using (var connection = new SqlConnection(_connString))
            {
                connection.Open();
                //var x = dependency.HasChanges;
                using (var command = new SqlCommand(@"  select datecreated from [dbo].[TChartNotification]  ", connection))
                {
                    {
                       
                        command.Notification = null;
                        dependency = new SqlDependency(command);
                       
                        dependency.OnChange += new OnChangeEventHandler(chart_OnChange);

                        if (connection.State == ConnectionState.Closed)
                            connection.Open();
                        var reader = command.ExecuteReader();

                    }
                }
                connection.Close();
            }
        }

        public void chart_OnChange(object sender, SqlNotificationEventArgs e)
        {

            if (e.Type == SqlNotificationType.Change)
            {

                status3 = true;
                MessagesHub.SendMessages();
                notifchart();
            }


        }

        //public List<TNotificationModel> SelectUserNotification(string id)
        //{


        //    if (CWU.OpenConnection())
        //    {

        //        sql = "select  "+

        //                "b.Notification_ID, "+
        //                "b.Title, " +
        //                "c.Device_Name, " +
        //                "d.SiteName, " +
        //                "Case when b.status = 1 then 'No Action' when b.status = 2 then 'Waiting For Execution' else 'Solved' end, " +
        //                "Convert(date, b.DateCreated), " +
        //                "concat(DATEPART(hour, b.DateCreated), ':', DATEPART(minute, b.DateCreated)), " +
        //                "b.DateCreated, " +
        //                "b.Description, " +
        //                 "b.status, " +
        //                 "b.status " +
        //            "from dbo.TNotificationDetail a " +
        //            "left join TNotification b on b.Notification_ID = a.NotificationID " +
        //            "left join PDevice c on c.Device_ID = b.Device_ID " +
        //            "left join TSite d on d.IDSite = c.Device_Site_ID where a.UserToNotif ='" + id + "' " + " Order by b.DateCreated Desc"; 
        //        CWU.command.CommandType = System.Data.CommandType.Text;
        //        CWU.command.CommandText = sql;
        //        CWU.command.Connection = CWU.connection;
        //        CWU.dtreader = CWU.command.ExecuteReader();
        //        while (CWU.dtreader.Read())
        //        {
        //            var UA = new TNotificationModel();
        //            UA.Notification_ID = CWU.dtreader[0].ToString();
        //            UA.Title = CWU.dtreader[1].ToString();
        //            UA.DeviceName = CWU.dtreader[2].ToString();
        //            UA.SiteName= CWU.dtreader[3].ToString();
        //            UA.status = CWU.dtreader[4].ToString();
        //            UA.DateOnly = Convert.ToDateTime(CWU.dtreader[5]).ToShortDateString();
        //            UA.TimeOnly = CWU.dtreader[6].ToString();
        //            UA.DateCreated = Convert.ToDateTime(CWU.dtreader[7]).ToString();
        //            UA.Description = CWU.dtreader[8].ToString();
        //            UA.statusInt = CWU.dtreader[9].ToString();
        //            modelTNotification.Add(UA);
        //        }
        //    }
        //    CWU.dtreader.Close();
        //    CWU.command.Connection.Close();
        //    return modelTNotification;
        //}
    }
}