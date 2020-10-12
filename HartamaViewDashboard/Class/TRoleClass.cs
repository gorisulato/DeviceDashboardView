using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class TRoleClass
    {

        private Hartama_IOTEntities db = new Hartama_IOTEntities();
        public TRoleClass()
        {


        }

        public string RoleInsert(TRoleModel mdl)
        {

            try
            {

                string ret = "";
                var res = db.PTRoleInsert(
                    mdl.Rolename,
                    mdl.RoleDesc,
                    mdl.Discontinue,
                    mdl.UserEntry,
                    Convert.ToDateTime(mdl.DateEntry),
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.RoleLabelRoleName, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                string ErrMsg = "";
                if (err.GetType().Name == "EntityCommandExecutionException")
                {
                    var SqlErr = err.InnerException as SqlException;
                    if (SqlErr.Number == 52627)
                    {
                        var ErrSplit = SqlErr.Message.Split('|');
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelRole, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;
                }

                return "0";
            }
        }


        public string RoleUpdate(TRoleModel mdl)
        {

            try
            {

                string ret = "";
                var res = db.PTRoleUpdate(
                    mdl.IDRole,
                    mdl.Rolename,
                    mdl.RoleDesc,
                    mdl.Discontinue,
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.RoleLabelRoleName, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                string ErrMsg = "";
                if (err.GetType().Name == "EntityCommandExecutionException")
                {
                    var SqlErr = err.InnerException as SqlException;
                    if (SqlErr.Number == 52627)
                    {
                        var ErrSplit = SqlErr.Message.Split('|');
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelRole, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;
                }

                return "Err|" + ErrMsg;
            }
        }

        public string RoleDelete(TRoleModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTRoleDelete(
                    mdl.IDRole,
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.RoleLabelRoleName, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.InnerException.Message;
            }

        }

        public List<PTRoleSelectByKeywordDiscontinue_Result> RoleSelectByKeywordDiscontinue(string OrderBy, string Direction, string Keyword, bool Discontinue, int Limit, int Offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTRoleSelectByKeywordDiscontinue(OrderBy, Direction, Keyword, Discontinue, Limit, Offset).ToList();
            return res;

        }

        public List<PTRoleSelectByID_Result> RoleSelectById(string IDRole)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTRoleSelectByID(IDRole).ToList();
            return res;
        }
    }
}