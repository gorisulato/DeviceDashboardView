using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class TUserController : Controller
    {
        // GET: TUser
        public ActionResult Index()
        {
            return View();
        }

         TUserClass User = new TUserClass();

        
        public ActionResult SelectUserNotification(string id, int Limit, int Offset)
        {
            if (Session["IDRole"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                id = Session["IDRole"].ToString();
                //List<TNotificationModel> ret = new List<TNotificationModel>();

                try
                {
                    var ret = User.GetNotificationResult(Session["IDRole"].ToString(), Limit, Offset);
                    var resutltJson = from d in ret
                                      select new string[]
                                 {
                                    d.Notification_ID,
                                    d.Title,
                                    d.Description,
                                    d.Device_Name,
                                    d.SiteName,
                                    d.statustext,
                                    d.status.ToString(),
                                    d.datecreated.Value.ToShortDateString(),
                                    d.fulldate.ToString(),
                                    d.timecreated,
                                    d.totalmessages.ToString(),
                                    d.unreadmessages.ToString(),
                                    d.Device_ID


                                    };
                    return Json(resutltJson, JsonRequestBehavior.AllowGet);

                }
                catch (Exception err)
                {
                    var ret = "Err|" + err.Message;
                    return Json(ret, JsonRequestBehavior.AllowGet);
                }

            }
            
        }

        public ActionResult notifdep()
        {
           
            User.notifdep();

            return Json(new { result = "OK" }, JsonRequestBehavior.AllowGet);
        }
    }
}