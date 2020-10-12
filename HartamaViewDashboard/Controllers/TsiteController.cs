using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class TsiteController : Controller
    {
        TSiteClass BC = new TSiteClass();
        FeatureeRoleClass FR = new FeatureeRoleClass();
        TSiteModel mdl;
        // GET: Tsite
        public ActionResult Index()

        {
            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();
            var ListGRT = new SelectList(new[]
                                        {


                                                new { ID = "1", Name = "Discontinue" },
                                                  new { ID = "2", Name = "No Discontinue" },

                                        }, "ID", "Name");
            ViewData["LGRT"] = ListGRT;
            return View();
        }

        [HttpPost]
        public ActionResult Create(TSiteModel ins)
        {
            string ret = "";
            ins.UserEntry = Session["IDUser"].ToString();

            // ins.SiteCode = Session["IDSite"].ToString();
            if (ModelState.IsValid)
            {

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = BC.SiteInsert(ins);

                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            }
            return Json(new { result = ret });
        }

        [HttpPost]
        public ActionResult Delete(TSiteModel del)
        {
            if (ModelState.IsValid) //untuk check apakah value yang akan di inputkan ke model valid atau tidak
            {

                var ret = "";
                try
                {
                    ret = BC.SiteDelete(del);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
            }
            else //jika tidak maka akan di return kembali ke view
            {

                return View(del);
            }
        }

        [HttpPost]
        public ActionResult Edit(TSiteModel upd)
        {
            upd.UserLastMaintenance = Session["IDUser"].ToString();
            string ret = "";
            if (ModelState.IsValid)
            {

                try
                {
                    ret = BC.SiteUpdate(upd);

                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            }
            return Json(new { result = ret });
        }

        public ActionResult GetSiteByID(string idSite)
        {
            List<TSiteModel> mm1 = new List<TSiteModel>();
            mdl = new TSiteModel();
           
            try
            {
                var res = BC.SiteSelectByID(idSite.Trim());
                if (res.Count > 0)
                {
                    mdl.IDSite = res[0].IDSite;
                    mdl.SiteName = res[0].SiteName;
                    mdl.Address = res[0].Address;
                    mdl.PostCode = res[0].PostCode;
                    mdl.TelephoneNo = res[0].TelephoneNo;
                    mdl.FaxNo = res[0].FaxNo;
                    mdl.Email = res[0].Email;
                    mdl.PICSite = res[0].PICSite;
                    mdl.UserEntry = res[0].UserEntry;
                    mdl.UserLastMaintenance = res[0].UserLastMaintenance;
                    mdl.DateEntry = res[0].DateEntry.ToShortDateString();
                    mdl.DateLastMaintenance = res[0].DateLastMaintenance.Value.ToShortDateString();
                    mdl.Discontinue = res[0].Discontinue.GetValueOrDefault(false);


                }

                mm1.Add(mdl);

            }
            catch (Exception err)
            {

            }
            return Json(new
            {
                Data = mm1.ToList()
            }, JsonRequestBehavior.AllowGet);
            //return mm1.ToList();
        }

        [HttpPost]
        public ActionResult GetDataSite(int Start, int Length, string keyword,bool discontinue)
        {
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var res = BC.SiteSelectByKeyword(keyword,discontinue,"IDSite","ASC", Length,Start);
            Int32? TotalRecords;
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


                                    d.SiteName,
                                    d.Address,
                                    d.FaxNo,
                                    d.PICSite,
                                    d.UserEntry,
                                    d.DateEntry.ToString(),
                                    d.UserLastMaintenance,
                                    d.DateLastMaintenance.Value.ToShortDateString(),
                                    d.IDSite.ToString()



                             };
            return Json(new
            {

                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltJson
            }, JsonRequestBehavior.AllowGet);

        }
    }
}