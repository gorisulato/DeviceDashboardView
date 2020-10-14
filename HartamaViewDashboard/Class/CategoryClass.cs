using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class CategoryClass
    {
        Hartama_IOTEntities db;
        public List<GetCategoryDatatable_Result> GetCategory(string keyword, int limit, int offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.GetCategoryDatatable(limit, offset,  keyword).ToList();
            return res;

        }

        public List<GETSENSORDetail_Result> GetSensorDetail(string id)
        {
            db = new Hartama_IOTEntities();
            var res = db.GETSENSORDetail(id).ToList();
            return res;

        }

        public string CategoryInsertorupdate(CategoryModel mdl)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.InsertCategory(
                   mdl.CategoryID,
                   mdl.CategoryName,
                   mdl.CategoryDescription,
                   mdl.UserEntry
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    //var retSplit = res.Pesan.Split('|');
                    //ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LabelSite, retSplit[1]);
                    ret = res.Pesan;

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

        public string createoreditsensorparamdetail(string idsensor, string idcategory, decimal lower, decimal upper, string user)
        {
            try
            {

                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.CreateorEditSensor(
                  idsensor,idcategory,lower,upper,user
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

        public string DeleteCategory(CategoryModel mdl)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.DeleteCategory(
                   mdl.CategoryID
                 
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
    }
}