using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HartamaViewDashboard.Controllers
{
    public class TUserController : Controller
    {

        public class PictureModel
        {
            public HttpPostedFileBase file { get; set; }
        }
        // GET: TUser
        public ActionResult Index()
        {
            return View();
        }

         TUserClass User = new TUserClass();

        [HttpPost]
        public ActionResult UpdateUserLocked(TUserModel mdl)
        {
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            var ret = "";
           

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = User.UpdateLockedUser(mdl);


                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            

            return Json(new { result = ret });
        }

        [HttpPost]
        public ActionResult Update(TUserModel mdl)
        {


            var base64 = mdl.UserPicture.Substring(mdl.UserPicture.IndexOf(',') + 1);

            var binary = Convert.FromBase64String(base64);
            mdl.UserPicturebyte = binary;
            string ret = "";
            mdl.UserLastMaintenance = Session["IDUser"].ToString();

           

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = User.UserUpdate(mdl);


                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            
            return Json(new { result = ret });
        }

        public ActionResult UpdatePassword(TUserModel mdl)
        {
            string ret = "";
            //mdl.Locked = false;
            mdl.IDUser = Session["IDUser"].ToString();
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            // mdl.DateLastMaintenance = DateTime.Now;
            if (ModelState.IsValid)
            {
                try
                {
                    ret = User.UserUpdatePassword(mdl);

                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;

                }
            }
            return Json(new { result = ret });
        }

        [HttpPost]
        public ActionResult Create( TUserModel mdl)
        {

            
            var base64 = mdl.UserPicture.Substring(mdl.UserPicture.IndexOf(',') + 1);

            var binary = Convert.FromBase64String(base64);
            mdl.UserPicturebyte = binary;
            mdl.Password = "pass1234!";
            string ret = "";
            mdl.UserEntry = Session["IDUser"].ToString();

            //if (ModelState.IsValid)
            //{

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = User.InsertUser(mdl);
                  

                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
           // }
            return Json(new { result =ret });
        }
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

        [HttpPost]
        public ActionResult GetRole(string keyword, int Length, int Start)
        {
            string IDUser = Session["IDUser"].ToString();

            try
            {


                var res = User.GetRole(Length,Start,keyword);
                int? TotalRecords;
                if (res.Count() > 0)
                {
                    TotalRecords = res.FirstOrDefault().TotalRecords;
                }
                else
                {
                    TotalRecords = 0;
                }
                var resutltJson = from d in res
                                  select new string[]
                                 {
                                     d.IDRole,
                                           d.Rolename

                                 };
                return Json(new
                {

                    iTotalRecords = TotalRecords,
                    iTotalDisplayRecords = TotalRecords,
                    aaData = resutltJson
                }, JsonRequestBehavior.AllowGet);


            }


            catch (Exception err)
            {
                return Content(err.ToString());
            }
        }

        [HttpPost]
        public ActionResult GetUser(string keyword, int Length, int Start)
        {
            string IDUser = Session["IDUser"].ToString();

            try
            {


                var res = User.GetUser(Length, Start, keyword);
                int? TotalRecords;
                if (res.Count() > 0)
                {
                    TotalRecords = res.FirstOrDefault().TotalRecords;
                }
                else
                {
                    TotalRecords = 0;
                }
                var resutltJson = from d in res
                                  select new string[]
                                 {
                                     d.EmployeeNo,
                                     d.Username,
                                     d.SiteName,
                                     d.Fullname,
                                     d.Email,
                                      d.Rolename,
                                     d.LockedDescription,
                                     d.IDUser,
                                     d.IDSite,
                                     d.IDRole,
                                     d.UserCode,
                                     Convert.ToBase64String(d.UserPicture)
                                    
                                     

                                 };
                return Json(new
                {

                    iTotalRecords = TotalRecords,
                    iTotalDisplayRecords = TotalRecords,
                    aaData = resutltJson
                }, JsonRequestBehavior.AllowGet);


            }


            catch (Exception err)
            {
                return Content(err.ToString());
            }
        }
    }
}