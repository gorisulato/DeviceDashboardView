using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class DeviceClass
    {
        Hartama_IOTEntities db ;
        public List<GetDeviceCategory_Result> GetDeviceCategory(string keyword, int limit, int offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.GetDeviceCategory(offset,limit,keyword).ToList();
            return res;

        }

        public List<GetSite_Result> GetSite(string keyword, int limit, int offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.GetSite(offset, limit, keyword).ToList();
            return res;

        }

        public List<GetDeviceBySiteDatatable_Result> GetDevice(string user,string keyword, int limit, int offset)
        {
            db = new Hartama_IOTEntities();
            var res = db.GetDeviceBySiteDatatable(user, limit, offset, keyword).ToList();
            return res;

        }


        public string DeviceInsert(DeviceModel mdl)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.InsertDevice(
                   mdl.Device_Name,
                   mdl.Device_category_ID,
                   mdl.Device_Site_ID,
                   mdl.Device_Description,
                   mdl.UserEntry,
                   DateTime.Now.ToShortDateString(),
                   mdl.UserEntry,
                   DateTime.Now.ToShortDateString(),
                   mdl.UserEntry,
                   mdl.MacAddress1,
                   mdl.MacAddress2,
                   mdl.MacAddress3
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

        public string DeviceUpdate(DeviceModel mdl)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.UpdateDevice(
                    mdl.Device_ID,
                   mdl.Device_Name,
                   mdl.Device_category_ID,
                   mdl.Device_Site_ID,
                   mdl.MacAddress1,
                   mdl.MacAddress2,
                   mdl.MacAddress3,
                   mdl.Device_Description,mdl.UserLastMaintenance
              
                 
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

        public string DeviceDelete(DeviceModel id)
        {
            try
            {
                db = new Hartama_IOTEntities();
                string ret = "";
                var res = db.DeleteDevice(id.Device_ID).FirstOrDefault();
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