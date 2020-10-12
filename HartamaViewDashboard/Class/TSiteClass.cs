using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class TSiteClass
    {
        DB.Hartama_IOTEntities db = new Hartama_IOTEntities();

        public string SiteInsert(TSiteModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTSiteInsert(
                    mdl.SiteName,
                    mdl.Address,
                    mdl.PostCode,
                    mdl.TelephoneNo,
                    mdl.FaxNo,
                    mdl.Email,
                    mdl.PICSite,
                    mdl.UserEntry,
                    DateTime.Now,
                    mdl.Discontinue,
                    mdl.SiteLogo,
                    0
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    //var retSplit = res.Pesan.Split('|');
                    //ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelSite, retSplit[1]);
                    ret = "1";

                }
                else
                {
                    ret = res.Pesan;
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
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelSite, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;
                }

                return ErrMsg;
            }

        }

        public string SiteUpdate(TSiteModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTSiteUpdate(
                    mdl.IDSite,
                    mdl.SiteName,
                    mdl.Address,
                    mdl.PostCode,
                    mdl.TelephoneNo,
                    mdl.FaxNo,
                    mdl.Email,
                    mdl.PICSite,
                    mdl.UserLastMaintenance,
                    DateTime.Now,
                    mdl.Discontinue,
                    mdl.SiteLogo,
                    0
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    //var retSplit = res.Pesan.Split('|');
                    //ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelSite, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = res.Pesan;
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
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelSite, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;
                }

                return ErrMsg;
            }

        }

        public string SiteDelete(TSiteModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTSiteDelete(
                    mdl.IDSite,
                    mdl.UserLastMaintenance,
                    DateTime.Now
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = "1";//0TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelSite, retSplit[1]);
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


        public List<PTSiteSelectByKeywordDiscontinue_Result> SiteSelectAll(bool discontinue, string orderby, string direction)
        {
            var res = db.PTSiteSelectByKeywordDiscontinue("", discontinue, orderby, direction).ToList();
            return res;

        }
        public List<PTSiteSelect_Result> SiteSelectByKeyword(string keyword, bool discontinue, string orderby, string direction, int limit, int offset)
        {
            var res = db.PTSiteSelect(keyword, discontinue, orderby, direction, limit, offset).ToList();
            return res;

        }

        public List<PTSiteSelectByID_Result> SiteSelectByID(string IDmodule)
        {

            var res = db.PTSiteSelectByID(IDmodule).ToList();
            return res;
        }

        /* add by Irham 20 Agustus 2015*/
        public List<PTSiteUserSelectByIDSite_Result> SiteUserSelectByIDSite(string IDSite)
        {
            var res = db.PTSiteUserSelectByIDSite(IDSite).ToList();
            return res;

        }
        /* Add by Irham 24 agustus 2015 for Update Site User*/
        public String SiteUserSave(string IDSite, string ValueList, TSiteModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTSiteUserSave(
                    IDSite,
                    ValueList,
                    mdl.UserEntry,
                    Convert.ToDateTime(mdl.DateEntry),
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelSiteUser, retSplit[1]);

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
        /* End 24 agustus 2015*/

        /* Add By Irham 03 September 2015 for Binding Site User Login*/
        public List<PTSiteUserSelectByIDUser_Result> SiteUserSelectByIDUser(string IDUser)
        {
            var res = db.PTSiteUserSelectByIDUser(IDUser).ToList();
            return res;

        }

        public List<PTSiteSelectAll_Result> SiteSelectAll()
        {
            var res = db.PTSiteSelectAll().ToList();
            return res;

        }
    }
}