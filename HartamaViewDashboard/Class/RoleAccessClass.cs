using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class RoleAccessClass
    {
        DB.Hartama_IOTEntities db = new Hartama_IOTEntities();
        string sql = "";
        CW_UtilityClass CWU = new CW_UtilityClass();
        public List<PTModuleFeaturesSelectAll_Result> ModuleFeaturesSelectAll(string IDRole, string IDSite)
        {
            var res = db.PTModuleFeaturesSelectAll(IDRole, IDSite).ToList();
            return res;

        }

        public string SaveRoleAccess(TFeatureAccessModel mdl)
        {
            
            string res = "";
            try
            {
               
                CWU.OpenConnection();
                sql = "[dbo].[PTFeatureAccessSave]";
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.command.CommandType = System.Data.CommandType.StoredProcedure;
                CWU.command.Parameters.AddWithValue("@Visible", mdl.BindVisible);
                CWU.command.Parameters.AddWithValue("@View", mdl.BindView);
                CWU.command.Parameters.AddWithValue("@New", mdl.BindNew);
                CWU.command.Parameters.AddWithValue("@Edit", mdl.BindEdit);
                CWU.command.Parameters.AddWithValue("@Delete", mdl.BindDelete);
                CWU.command.Parameters.AddWithValue("@Printable", mdl.BindPrintable);
                CWU.command.Parameters.AddWithValue("@IDFeatureAccess", mdl.BindIDFeatureAccess);
                CWU.command.Parameters.AddWithValue("@Action", mdl.BindAction);
                CWU.command.Parameters.AddWithValue("@IDModuleFeatures", mdl.BindIDModuleFeatures);
                CWU.command.Parameters.AddWithValue("@UserEntry", mdl.UserEntry);
                CWU.command.Parameters.AddWithValue("@DateEntry", mdl.DateEntry);
                CWU.command.Parameters.AddWithValue("@UserLastMaintenance", mdl.UserLastMaintenance);
                CWU.command.Parameters.AddWithValue("@DateLastMaintenance", mdl.DateLastMaintenance);
                CWU.command.Parameters.AddWithValue("@IDRole", mdl.IDRole);


                int ret = CWU.command.ExecuteNonQuery();
                res = "1|";
                CWU.command.Connection.Close();
               
            }
            catch (Exception err)
            {
                return res = err.Message.ToString();
            }
            return res;

        }
    }
}