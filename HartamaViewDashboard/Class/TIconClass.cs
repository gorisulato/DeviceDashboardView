using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class TIconClass
    {
        private Hartama_IOTEntities db = new Hartama_IOTEntities();

        public TIconClass()
        {


        }

        public List<PTIconSelectLov_Result> IconSelectLov(string orderBy, string dir, string keyword, int Limit, int Offset)
        {

            db = new Hartama_IOTEntities();
            var res = db.PTIconSelectLov(orderBy, dir, keyword, Limit, Offset).ToList();
            return res;
        }


        public List<PTIconSelectByKeyword_Result> IconSelect(string orderBy, string dir, string keyword)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTIconSelectByKeyword(orderBy, dir, keyword).ToList();
            return res;
        }
        public List<PTIconSelectByKeywordIsDefault_Result> IconSelectByKeywordIsDefault(string orderBy, string dir, string keyword, bool? isDefault, int Limit, int Offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTIconSelectByKeywordIsDefault(orderBy, dir, keyword, isDefault, Limit, Offset).ToList();
            return res;
        }
        public List<PTIconSelectByID_Result> IconSelectById(string id)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTIconSelectByID(id).ToList();
            return res;

        }

        public string IconInsert(TIconModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTIconInsert(
                    mdl.IconName,
                    mdl.IconDesc,
                    mdl.IconClass,
                    mdl.IconType,
                    mdl.IconPath,
                    mdl.IconCategory,
                    mdl.IsDefault,
                    mdl.UserEntry,
                    Convert.ToDateTime(mdl.DateEntry),
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.IconLabelIcon, retSplit[1]);
                }
                else
                {
                    ret = "Err|" + res.Pesan;
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
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelIcon, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;
                }

                return "Err|" + ErrMsg;
            }

        }

        public string IconUpdate(TIconModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTIconUpdate(
                    mdl.IDIcon,
                    mdl.IconName,
                    mdl.IconDesc,
                    mdl.IconClass,
                    mdl.IconType,
                    mdl.IconPath,
                    mdl.IconCategory,
                    mdl.IsDefault,
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.IconLabelIcon, retSplit[1]);
                }
                else
                {
                    ret = "Err|" + res.Pesan;
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
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelIcon, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;
                }

                return "Err|" + ErrMsg;
            }
        }

        public string IconDelete(TIconModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTIconDelete(
                    mdl.IDIcon,
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.IconLabelIcon, retSplit[1]);
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.InnerException.Message;
            }
        }
    }
}