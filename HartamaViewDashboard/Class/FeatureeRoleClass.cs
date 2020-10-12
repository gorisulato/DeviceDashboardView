using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class FeatureeRoleClass
    {

        string sql = "";
        int ret = 0;
        CW_UtilityClass CWU = new CW_UtilityClass();
        List<TFeatureAccessModel> ModelFeature = new List<TFeatureAccessModel>();
        List<PTModuleFeaturesSelectAll_Result> RoleAccessModel = new List<PTModuleFeaturesSelectAll_Result>();
        public List<TFeatureAccessModel> RoleAccess(string path, string RoleID)
        {

            if (CWU.OpenConnection())
            {

                sql = "SELECT a.[view], a.New, a.Edit,a.[Delete], a.Printable, c.PathApp, a.IDRole FROM TFeaturesAccess as a left join TModuleFeatures as b on b.IDModuleFeatures = a.IDModuleFeatures left join TFeatures as c on c.IDFeatures = b.IDFeatures where c.PathApp ='" + path + "' and a.IDRole = '" + RoleID + "'";


                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    var Role = new TFeatureAccessModel();
                    //Employee.UserID = CWU.dtreader[0].ToString();
                    Role.BindView = CWU.dtreader[0].ToString();
                    Role.BindNew = CWU.dtreader[1].ToString();
                    Role.BindEdit = CWU.dtreader[2].ToString();
                    Role.BindDelete = CWU.dtreader[3].ToString();
                    //Role.BindDelete = CWU.dtreader[3].ToString();
                    Role.BindPrintable = CWU.dtreader[4].ToString();
                    // Employee.SiteCode = CWU.dtreader[5].ToString();
                    Role.PathApp = CWU.dtreader[5].ToString();
                    Role.IDRole = CWU.dtreader[6].ToString();



                    ModelFeature.Add(Role);
                }

            }

            CWU.dtreader.Close();
            return ModelFeature;
        }
        public PTModuleFeaturesSelectAll_Result RoleAccess(string PathApp)
        {
            PTModuleFeaturesSelectAll_Result RoleAccessFind = new PTModuleFeaturesSelectAll_Result();
            if (HttpContext.Current.Session != null || HttpContext.Current.Session["RoleAccess"] != null)
            {
                RoleAccessModel = JsonConvert.DeserializeObject<List<PTModuleFeaturesSelectAll_Result>>(HttpContext.Current.Session["RoleAccess"].ToString());
                RoleAccessFind = RoleAccessModel.Find(s => s.PathApp == PathApp);
            }
            else
            {
                RoleAccessFind.View = false;
                RoleAccessFind.New = false;
                RoleAccessFind.Delete = false;
                RoleAccessFind.Edit = false;
                RoleAccessFind.Printable = false;
            }
            return RoleAccessFind;
        }
    }
}