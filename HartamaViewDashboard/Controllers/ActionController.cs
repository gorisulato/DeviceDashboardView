using HartamaViewDashboard.Class;
using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class ActionController : Controller
    {
        FeatureeRoleClass FR = new FeatureeRoleClass();
        ActionModel act = new ActionModel();
        ActionClass acs = new ActionClass();
        // GET: Action
        public ActionResult Index()
        {
            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();
            var ListType = new SelectList(new[]
                                      {


                                                new { ID = "2", Name = "Fixing" },
                                                  new { ID = "3", Name = "Ignore" },

                                        }, "ID", "Name");
            ViewData["LT"] = ListType;
            return View();
        }

        [HttpPost]
        public ActionResult create(ActionModel mdl)
        {
            var ret = "";
            var user = Session["IDUser"].ToString();
            int AffectedRows = 0;
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            try
            {
                var count = db.TActions.Count()+1;
                var takeAction = db.Set<TAction>();
                takeAction.Add(new TAction
                {

                   
                    Action_ID = "ACT"+count,
                    NotificationID = mdl.IDNotif,
                    ActionType = mdl.ActionType,
                    ActionDescription = mdl.ActionDescription,
                    UserEntry = user,
                    DateEntry = DateTime.Now


                });
                AffectedRows = db.SaveChanges();
                if(AffectedRows > 0)
                {
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + "Failed To Insert Data";
                }


            }
            catch (Exception e)
            {

                ret = "Err|" + e.Message;
            }

            return Json(new { result = ret });

        }

        public ActionResult SelectActionByID(string id)
        {
            if (Session["IDRole"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                
                //List<TNotificationModel> ret = new List<TNotificationModel>();

                try
                {
                    var ret = acs.GetActionByDevice(id);
                    var resutltJson = from d in ret
                                      select new string[]
                                 {
                                    d.Action_ID,
                                    d.ActionDescription,
                                    d.Device_Name,
                                    d.ActionType==2?"Action Taked":"Ignored",
                                    d.Fullname,
                                    d.DateEntry.ToString()


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
    }
}