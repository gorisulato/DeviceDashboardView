using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class RoleAccessController : Controller
    {
        // GET: RoleAccess
        RoleAccessClass roleAccess = new RoleAccessClass();
        TFeatureAccessModel FeatureAccessModel = new TFeatureAccessModel();
        TRoleClass Role = new TRoleClass();
        FeatureeRoleClass FR = new FeatureeRoleClass();
        public ActionResult Index()
        {
            var RoleResultList = Role.RoleSelectByKeywordDiscontinue(null, null, "", false, 0, 0);
            var RoleSelectList = new SelectList(RoleResultList, "IDRole", "RoleName");
            ViewBag.RoleSelect = RoleSelectList;

            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();

            return View();
        }
        public ActionResult GetDataModuleFeatures(string sEcho, int Start, int Length, string IDRole)
        {

            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var i = 0;
            var filter = Request["search[value]"];
            var res = roleAccess.ModuleFeaturesSelectAll(IDRole, Session["IDSite"].ToString());
            //var displaytable = res.Skip(Start).Take(Length);
            var resutltJson = from d in res
                              select new string[]
                             {

                                   d.IDModuleFeatures,
                                   d.ModuleName,
                                   d.FeaturesType+" "+d.ModuleName.Replace(" ",string.Empty),
                                   d.FeaturesCode,
                                   d.FeaturesName,
                                   "Visible",
                                   "view",
                                   "New",
                                   "Edit",
                                   "Delete",
                                   "Printable",
                                  i++.ToString(),
                                  ""+d.Visible+"",
                                  ""+d.View+"",
                                  ""+d.New+"",
                                  ""+d.Edit+"",
                                  ""+d.Delete+"",
                                  ""+d.Printable+"",
                                  d.IDfeaturesAccess
                                };
            return Json(new
            {
                sEcho = sEcho,
                //iTotalRecords = roleAccess.ModuleFeaturesSelectAll(IDRole, Session["IDSite"].ToString()).Count(),
                //iTotalDisplayRecords = roleAccess.ModuleFeaturesSelectAll(IDRole, Session["IDSite"].ToString()).Count(),
                aaData = resutltJson
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Save(TFeatureAccessModel featureAccess)
        {
            //featureAccess.UserEntry = Session["IDUser"].ToString();
            //featureAccess.DateEntry = DateTime.Today;
            //featureAccess.UserLastMaintenance = Session["IDUser"].ToString();
            //featureAccess.DateLastMaintenance = DateTime.Today;

            //if (ModelState.IsValid)
            //{
            //    string ret = "";
            //    try
            //    {

            //        ret = roleAccess.SaveRoleAccess(featureAccess);
            //        return Json(new { result = ret });
            //    }
            //    catch (Exception err)
            //    {
            //        ret = "Err|" + err.Message;
            //        return Json(new { result = ret });
            //    }
            //}
            //else
            //{

            //    return View();
            //
            featureAccess.UserEntry = Session["IDUser"].ToString();
            featureAccess.DateEntry = DateTime.Today;
            featureAccess.UserLastMaintenance = Session["IDUser"].ToString();
            featureAccess.DateLastMaintenance = DateTime.Today;
            featureAccess.IDRole = Session["IDRole"].ToString();

            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {

                    ret = roleAccess.SaveRoleAccess(featureAccess);
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

                return View();
            }
        }


        public ActionResult GetDataRole(string sEcho, int Start, int Length)
        {
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var filter = Convert.ToString(Request["search[value]"]);
            var orderby = Convert.ToString(Request["order[0][column]"]);
            var dir = Convert.ToString(Request["order[0][dir]"]);
            var discontinue = false;
            var res = Role.RoleSelectByKeywordDiscontinue(orderby, dir, "", discontinue, 0, 0);
            //var displaytable = res.Skip(Start).Take(Length);
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