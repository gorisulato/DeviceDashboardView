using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class RoleController : Controller
    {
        private TRoleClass Role;
        ConvertClass ConvertDate = new ConvertClass();

        FeatureeRoleClass FR = new FeatureeRoleClass();
        // GET: Test
        public ActionResult Index()
        {
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyDiscontinue = Request["historyDiscontinue"];
            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();
            return View();
        }

        public ActionResult Create()
        {
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyDiscontinue = Request["historyDiscontinue"];
            return View();
        }
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Create(TRoleModel mdl)
        {
            mdl.UserEntry = Session["IDUser"].ToString();
            mdl.DateEntry = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);

            mdl.Discontinue = false;
            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Role = new TRoleClass();
                    ret = Role.RoleInsert(mdl);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
            }
            else
            {
                var ret = "Err|" + "Error In Model Validation"; //note robby return error when execute method create
                return Json(new { result = ret });
                //return View(mdl);
            }
        }
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Role = new TRoleClass();
            var res = Role.RoleSelectById(id).FirstOrDefault();

            if (res == null)
            {
                return HttpNotFound();
            }
            TRoleModel mdl = new TRoleModel();
            mdl.IDRole = res.IDRole;
            mdl.Rolename = res.Rolename;
            mdl.RoleDesc = res.RoleDesc;
            mdl.Discontinue = res.Discontinue;
            mdl.UserEntry = res.UserEntry;
            mdl.DateEntry = ConvertDate.convert_date(res.DateEntry);
            mdl.UserLastMaintenance = res.UserLastMaintenance;
            mdl.DateLastMaintenance = ConvertDate.convert_date(res.DateLastMaintenance);
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyDiscontinue = Request["historyDiscontinue"];
            return View(mdl);
        }
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Edit(TRoleModel mdl)
        {
            var CUI = Session["CurrentUICulture"].ToString();
            DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
            mdl.DateEntry = DateEntry.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);

            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Role = new TRoleClass();
                    ret = Role.RoleUpdate(mdl);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
            }
            else
            {
                var ret = "Err|" + "Error In Model Validation"; //note robby return error when execute method create
                return Json(new { result = ret });
                //return View(mdl);
            }

        }
        public ActionResult Delete(String id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Role = new TRoleClass();
            var res = Role.RoleSelectById(id).FirstOrDefault();

            if (res == null)
            {
                return HttpNotFound();
            }
            TRoleModel mdl = new TRoleModel();
            mdl.IDRole = res.IDRole;
            mdl.Rolename = res.Rolename;
            mdl.RoleDesc = res.RoleDesc;
            mdl.Discontinue = res.Discontinue;
            mdl.UserEntry = res.UserEntry;
            mdl.DateEntry = ConvertDate.convert_date(res.DateEntry);
            mdl.UserLastMaintenance = res.UserLastMaintenance;
            mdl.DateLastMaintenance = ConvertDate.convert_date(res.DateLastMaintenance);
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyDiscontinue = Request["historyDiscontinue"];
            return View(mdl);

        }
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult Delete(TRoleModel mdl)
        {
            var CUI = Session["CurrentUICulture"].ToString();
            DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
            mdl.DateEntry = DateEntry.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);

            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Role = new TRoleClass();
                    ret = Role.RoleDelete(mdl);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
            }
            else
            {
                var ret = "Err|" + "Error In Model Validation"; //note robby return error when execute method create
                return Json(new { result = ret });
                //return View(mdl);
            }
        }

        public ActionResult GetDataRole(string sEcho, int Start, int Length, string keyword, string dis)
        {
            //if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var filter = Convert.ToString(Request["search[value]"]);
            var orderby = Convert.ToString(Request["order[0][column]"]);
            var dir = Convert.ToString(Request["order[0][dir]"]);
            var discontinue = false;
            var CUI = Session["CurrentUICulture"].ToString();
            if (dis == "true")
            {

                discontinue = true;
            }
            else
            {
                discontinue = false;

            }


            Role = new TRoleClass();

            var res = Role.RoleSelectByKeywordDiscontinue(orderby, dir, keyword, discontinue, Length, Start);
            Int32? TotalRecords;
            if (res.Count() > 0)
            {
                TotalRecords = res.FirstOrDefault().TotalRecords;
            }
            else
            {
                TotalRecords = 0;
            }
            var resutltnya = from d in res
                             select new string[]
                             {
                                    d.IDRole,
                                    d.Rolename,
                                    d.RoleDesc,
                                    d.Discontinue.ToString(),
                                    d.UserEntry,
                                    d.DateEntry.ToString(),
                                    d.UserLastMaintenance,
                                    d.DateLastMaintenance.HasValue ? d.DateLastMaintenance.Value.ToString(CultureInfo.CreateSpecificCulture(CUI).DateTimeFormat) : string.Empty,

                                };
            return Json(new
            {
                sEcho = sEcho,
                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltnya
            }, JsonRequestBehavior.AllowGet);
        }
    }
}