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
    public class ModuleController : Controller
    {
        private TModuleClass Module;
        ConvertClass ConvertDate = new ConvertClass();
        FeatureeRoleClass FR = new FeatureeRoleClass();
        // GET: Test
        public ActionResult Index()
        {
            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();
            // if (Session["UserName"] == null) {  return RedirectToAction("Index", "Login"); }
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(TModuleModel mdl)
        {
            mdl.UserEntry = Session["IDUser"].ToString();
            mdl.DateEntry = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.IDIcon = mdl.IDIconModule;


            
                string ret = "";
                try
                {
                    Module = new TModuleClass();
                    ret = Module.ModuleInsert(mdl);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
          
        }
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Module = new TModuleClass();
            var res = Module.ModuleSelectByID(id).FirstOrDefault();

            if (res == null)
            {
                return HttpNotFound();
            }

            TModuleModel mdl = new TModuleModel();
            mdl.IDModule = res.IDModule;
            mdl.ModuleCode = res.ModuleCode;
            mdl.ModuleDesc = res.ModuleDesc;
            mdl.ModuleName = res.ModuleName;
            mdl.Sequence = res.Sequence;
            mdl.IsDefault = res.IsDefault;
            mdl.UserEntry = res.UserEntry;
            mdl.DateEntry = ConvertDate.convert_date(res.DateEntry);
            mdl.UserLastMaintenance = res.UserLastMaintenance;
            mdl.DateLastMaintenance = ConvertDate.convert_date(res.DateLastMaintenance);
            mdl.IDIcon = res.IDIcon;
            mdl.IDIconModule = res.IDIcon;
            mdl.IconClass = res.IconClass;
            mdl.IconName = res.IconName;
            return View(mdl);
        }
        [HttpPost]
        public ActionResult Edit(TModuleModel mdl)
        {
            var CUI = Session["CurrentUICulture"].ToString();
            DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
            mdl.DateEntry = DateEntry.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.IDIcon = mdl.IDIconModule;

            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Module = new TModuleClass();
                    ret = Module.ModuleUpdate(mdl);
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

                return View(mdl);
            }

        }
        public ActionResult Delete(String id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Module = new TModuleClass();
            var res = Module.ModuleSelectByID(id).FirstOrDefault();

            if (res == null)
            {
                return HttpNotFound();
            }
            TModuleModel mdl = new TModuleModel();
            var CUI = Session["CurrentUICulture"].ToString();
            mdl.IDModule = res.IDModule;
            mdl.ModuleCode = res.ModuleCode;
            mdl.ModuleDesc = res.ModuleDesc;
            mdl.ModuleName = res.ModuleName;
            mdl.Sequence = res.Sequence;
            mdl.IsDefault = res.IsDefault;
            mdl.UserEntry = res.UserEntry;
            mdl.DateEntry = res.DateEntry.ToString(CultureInfo.CreateSpecificCulture(CUI).DateTimeFormat);
            mdl.UserLastMaintenance = res.UserLastMaintenance;
            mdl.DateLastMaintenance = res.DateLastMaintenance.HasValue ? res.DateLastMaintenance.Value.ToString(CultureInfo.CreateSpecificCulture(CUI).DateTimeFormat) : string.Empty;
            mdl.IDIcon = res.IDIcon;
            mdl.IconClass = res.IconClass;
            mdl.IconName = res.IconName;
            mdl.IconType = res.IconType;
            mdl.IconPath = res.IconPath;
            return View(mdl);

        }
        [HttpPost]
        public ActionResult Delete(TModuleModel mdl)
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
                    Module = new TModuleClass();
                    ret = Module.ModuleDelete(mdl);
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

                return View(mdl);
            }
        }
        [HttpPost]
        public ActionResult ModuleUpdateSequence(string IDModule, string direction)
        {
            string ret = "";
            try
            {
                Module = new TModuleClass();
                ret = Module.ModuleUpdateSequence(IDModule, direction);
                return Json(new { result = ret }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception err)
            {
                ret = "Err|" + err.Message;
                return Json(new { result = ret }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetDataModule(string sEcho, int Start, int Length)
        {

            var filter = Convert.ToString(Request["search[value]"]);
            var orderby = Convert.ToString(Request["order[0][column]"]);
            var dir = Convert.ToString(Request["order[0][dir]"]);
            var ModuleClass = new TModuleClass();
            //remark by Irham 27 augustus 2015
            //change : Add New parameter for limit and offset, remark display table, change result to res
            var res = ModuleClass.ModuleSelect("", "", Length, Start);
            Int32? TotalRecords;
            if (res.Count() > 0)
            {
                TotalRecords = res.FirstOrDefault().TotalRecords;
            }
            else
            {
                TotalRecords = 0;
            }
            //var displaytable = res.Skip(Start).Take(Length);
            var resutltnya = from d in res
                             select new string[]
                             {
                                    d.IDModule,
                                    d.ModuleCode,
                                    d.ModuleName,
                                    d.ModuleDesc,
                                    d.IconClass,
                                    d.IconType,
                                    d.IconName,
                                    d.IDIcon,
                                    d.UserEntry,
                                    d.DateEntry.ToString(),
                                    d.UserLastMaintenance,
                                    d.DateLastMaintenance.ToString(),
                                    d.Sequence.ToString()

                                };
            return Json(new
            {
                sEcho = sEcho,
                iTotalRecords = TotalRecords,//ModuleClass.ModuleSelect(orderby, dir).Count(),
                iTotalDisplayRecords = TotalRecords,// ModuleClass.ModuleSelect(orderby, dir).Count(),
                aaData = resutltnya
            }, JsonRequestBehavior.AllowGet);
        }
    }
}