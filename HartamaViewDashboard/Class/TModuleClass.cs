using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class TModuleClass
    {
        private Hartama_IOTEntities db;//= new AssetDBEntities();

        public TModuleClass()
        {


        }

        public String ModuleInsert(TModuleModel mdl)
        {
            try
            {
                db = new Hartama_IOTEntities();

                string ret = "";
                var res = db.PTModuleInsert(
                    mdl.ModuleCode,
                    mdl.ModuleName,
                    mdl.ModuleDesc,
                    mdl.UserEntry,
                    Convert.ToDateTime(mdl.DateEntry),
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance),
                    mdl.Sequence,
                    mdl.IsDefault,
                    mdl.IDIcon
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelModule, retSplit[1]);
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
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelModule, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;
                }

                return "Err|" + ErrMsg;
            }

        }

        public String ModuleUpdate(TModuleModel mdl)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.PTModuleUpdate(
                    mdl.IDModule,
                    mdl.ModuleCode,
                    mdl.ModuleName,
                    mdl.ModuleDesc,
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance),
                    mdl.Sequence,
                    mdl.IsDefault,
                    mdl.IDIcon
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|'); ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelModule, retSplit[1]);
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
                        ErrMsg = TranslateMessageClass.TranslateMessage(ErrSplit[0], Resources.Resource.LabelModule, ErrSplit[1]);
                    }
                }
                else
                {
                    ErrMsg = err.InnerException.Message;

                }

                return "Err|" + ErrMsg;
            }

        }

        public String ModuleDelete(TModuleModel mdl)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.PTModuleDelete(
                    mdl.IDModule,
                    mdl.UserLastMaintenance,
                   Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|'); ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelModule, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.Message;
            }

        }

        public String ModuleUpdateSequence(string IDModule, string direction)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.PTModuleUpdateSequence(
                    IDModule, direction
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelModule, retSplit[1]);
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
                return "Err|" + err.Message;

            }
        }
        public List<PTModuleSelect_Result> ModuleSelect(string OrderBy, string Direction, int Limit, int Offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTModuleSelect(OrderBy, Direction, Limit, Offset).ToList();
            return res;

        }

        public List<PTModuleSelectByID_Result> ModuleSelectByID(string IDmodule)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTModuleSelectByID(IDmodule).ToList();
            return res;
        }

        public List<PTModuleSelectByKeyword_Result> ModuleSelectByKeyword(string keyword, int Limit, int Offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTModuleSelectByKeyword(keyword, Limit, Offset).ToList();
            return res;

        }
    }
}