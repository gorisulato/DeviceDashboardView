using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class NavigationMenuClass
    {
        DB.Hartama_IOTEntities db = new Hartama_IOTEntities();
        CW_UtilityClass CWU = new CW_UtilityClass();
        List<TPasswordPolicyModel> modelPP = new List<TPasswordPolicyModel>();
        //readonly string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;


        public List<TPasswordPolicyModel> GetPasswordCriteria()
        {
            string sql = "";
            if (CWU.OpenConnection())
            {

                sql = "SELECT PasswordCriteria from tPasswordpolicy";


                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    var AM = new TPasswordPolicyModel();
                    AM.PasswordCriteria = CWU.dtreader[0].ToString();


                    modelPP.Add(AM);
                }
            }
            CWU.dtreader.Close();
            return modelPP;
        }
        public List<PModuleFeatureToMenuTree_Result> GenerateModule(GenerateMenuModel GenerateMenu)
        {
            var res = db.PModuleFeatureToMenuTree(GenerateMenu.IDRole, GenerateMenu.IDSite, GenerateMenu.IDLanguage).ToList();
            return res;
        }
        //public List<PTNotificationSelect_Result> GetNotification(string UserID, int limit, int offset)
        //{
        //    var res = db.PTNotificationSelect(UserID, limit, offset).ToList();
        //    return res;
        //}

      

        //public String UpdateStatusNotification(string IDNotification)
        //{
        //    try
        //    {

        //        string ret = "";
        //        var res = db.PTNotificationRead(
        //            IDNotification
        //            );
        //        return ret;
        //    }
        //    catch (Exception err)
        //    {
        //        return "Err|" + err.InnerException.Message;
        //    }

        //}
    }
}