using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class FeatureController : Controller
    {
        private TFeatureClass Feature;
        ConvertClass ConvertDate = new ConvertClass();
        FeatureeRoleClass FR = new FeatureeRoleClass();
        // GET: Test
        public ActionResult Index()
        {
            //if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var ModuleClass = new TModuleClass();
            var ModuleResultList = ModuleClass.ModuleSelect("", "", 1000, 0);
            var ModuleSelectList = new SelectList(ModuleResultList, "IDModule", "ModuleName");
            ViewBag.ModuleSelect = ModuleSelectList;

            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();
            return View();
        }

        public ActionResult Create(string id)
        {
            TFeatureModel mdl = new TFeatureModel();
            mdl.IDModule = id;
            return View(mdl);


        }

        [HttpPost]
        public ActionResult Create(TFeatureModel mdl)
        {
            mdl.UserEntry = Session["IDUser"].ToString();
            mdl.DateEntry = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);

            mdl.IsExternal = true;
            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Feature = new TFeatureClass();
                    ret = Feature.FeatureInsert(mdl);
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
        //[HttpGet]
        //public ActionResult Edit(string IDFeature, string IDModule)
        //{
        // if (IDFeature == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }

        //    var Feature = new TFeatureClass();
        //    var res = Feature.FeatureSelectByIDFeatureIDModule(IDFeature,IDModule).FirstOrDefault();

        //    if (res == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    TFeatureModel mdl = new TFeatureModel();
        //    mdl.IDModuleFeatures = res.IDModuleFeatures;
        //    mdl.IDModule = res.IDModule;
        //    mdl.IDFeatures = res.IDFeatures;
        //    mdl.FeaturesName = res.FeaturesName;
        //    mdl.FeaturesCode = res.FeaturesCode;
        //    mdl.FeaturesDesc = res.FeaturesDesc;
        //    mdl.FeaturesType = res.FeaturesType;
        //    mdl.FeaturesAction = res.FeaturesAction;
        //    mdl.PathApp = res.PathApp; //Add By Robby For Field Path App
        //    mdl.IDIcon = res.IDIcon;
        //    mdl.IconClass = res.IconClass;
        //    mdl.UserEntry = res.UserEntry;
        //    mdl.IsExternal = res.IsExternal;
        //    mdl.UserLastMaintenance = res.UserLastMaintenance;
        //    mdl.DateEntry = ConvertDate.convert_date(res.DateEntry);
        //    mdl.DateLastMaintenance = ConvertDate.convert_date(res.DateLastMaintenance);

        //    return View(mdl);

        //}
        [HttpPost]
        public ActionResult Edit(TFeatureModel mdl)
        {

            var CUI = Session["CurrentUICulture"].ToString();
            DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
            mdl.DateEntry = DateEntry.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);

            mdl.IsExternal = true;
            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Feature = new TFeatureClass();
                    ret = Feature.FeatureUpdate(mdl);
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


        //public ActionResult Delete(string IDFeature, string IDModule)
        //{
        //    if (IDFeature == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }

        //    var Feature = new TFeatureClass();
        //    var res = Feature.FeatureSelectByIDFeatureIDModule(IDFeature, IDModule).FirstOrDefault();

        //    if (res == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    TFeatureModel mdl = new TFeatureModel();
        //    mdl.IDModuleFeatures = res.IDModuleFeatures;
        //    mdl.IDModule = res.IDModule;
        //    mdl.IDFeatures = res.IDFeatures;
        //    mdl.FeaturesName = res.FeaturesName;
        //    mdl.FeaturesCode = res.FeaturesCode;
        //    mdl.FeaturesDesc = res.FeaturesDesc;
        //    mdl.FeaturesType = res.FeaturesType;
        //    mdl.FeaturesAction = res.FeaturesAction;
        //    mdl.IDIcon = res.IDIcon;
        //    mdl.IconClass = res.IconClass;
        //    mdl.UserEntry = res.UserEntry;
        //    mdl.IsExternal = res.IsExternal;
        //    mdl.UserLastMaintenance = res.UserLastMaintenance;
        //    mdl.DateEntry = ConvertDate.convert_date(res.DateEntry);
        //    mdl.DateLastMaintenance = ConvertDate.convert_date(res.DateLastMaintenance);
        //    mdl.IconType = res.IconType;
        //    mdl.IconPath = res.IconPath;
        //    return View(mdl);

        //}
        [HttpPost]
        public ActionResult Delete(TFeatureModel mdl)
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
                    Feature = new TFeatureClass();
                    ret = Feature.FeatureDelete(mdl);
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

        public ActionResult FeatureMove(string IDModule, string IDFeature)
        {
            TFeatureModel mdl = new TFeatureModel();
            var CUI = Session["CurrentUICulture"].ToString();
            DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
            mdl.DateEntry = DateEntry.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);

            string ret = "";
            try
            {
                Feature = new TFeatureClass();
                ret = Feature.FeatureMove(IDModule, IDFeature, mdl);
                return Json(new { result = ret });
            }
            catch (Exception err)
            {
                ret = "Err|" + err.Message;
                return Json(new { result = ret });
            }
        }

        public ActionResult FeatureDuplicate(string IDModule, string IDFeature)
        {
            string ret = "";
            try
            {
                TFeatureModel mdl = new TFeatureModel();
                mdl.IDModule = IDModule;
                mdl.IDFeatures = IDFeature;
                var CUI = Session["CurrentUICulture"].ToString();
                DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
                mdl.UserEntry = Session["IDUser"].ToString();
                mdl.DateEntry = DateTime.Now.ToString();
                mdl.UserLastMaintenance = Session["IDUser"].ToString();
                mdl.DateLastMaintenance = DateTime.Now.ToString();

                TFeatureClass Feature = new TFeatureClass();
                ret = Feature.FeatureDuplicate(mdl);
                return Json(new { result = ret });
            }
            catch (Exception err)
            {
                ret = "Err|" + err.Message;
                return Json(new { result = ret });
            }
        }

        public ActionResult ModuleFeatureUpdateSequence(string IDModule, string IDFeature, string FeatureType, string direction)
        {
            string ret = "";
            try
            {
                TFeatureModel mdl = new TFeatureModel();
                mdl.IDModule = IDModule;
                mdl.IDFeatures = IDFeature;
                mdl.FeaturesType = FeatureType;
                Feature = new TFeatureClass();
                ret = Feature.FeatureUpdateSequence(mdl, direction);
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
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var filter = Convert.ToString(Request["search[value]"]);
            var orderby = Convert.ToString(Request["order[0][column]"]);
            var dir = Convert.ToString(Request["order[0][dir]"]);
            var ModuleClass = new TModuleClass();
            var res = ModuleClass.ModuleSelect("", "", 1000, 0);
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
                                    d.IDModule,
                                    d.ModuleName,
                                    d.ModuleCode


                                };
            return Json(new
            {
                sEcho = sEcho,
                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltnya
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDataModalModule(string sEcho, int Start, int Length)
        {
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var filter = Convert.ToString(Request["search[value]"]);
            var orderby = Convert.ToString(Request["order[0][column]"]);
            var dir = Convert.ToString(Request["order[0][dir]"]);
            var ModuleClass = new TModuleClass();
            //Length = 100;
            var res = ModuleClass.ModuleSelectByKeyword(filter, Length, Start);
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
                                    d.ModuleName,
                                    d.ModuleCode


                                };
            return Json(new
            {
                sEcho = sEcho,
                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltnya
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetDataFeatureByIDModule(string sEcho, int Start, int Length, string IDModule)
        {

            var FeatureClass = new TFeatureClass();
            //Length = 100;
            //var res = FeatureClass.FeatureSelectByIDModule(IDModule);
            // var displaytable = res.Skip(Start).Take(Length);
            var res = FeatureClass.GetDataFeatureByModule(Start, Length, IDModule);
            Int32? TotalRecords;
            if (res.Count() > 0)
            {
                TotalRecords = res.FirstOrDefault().TotalRecord;
            }
            else
            {
                TotalRecords = 0;
            }

            var resultnya = from d in res
                            select new string[]
                             {

                                    d.FeaturesCode,
                                    d.FeaturesName,
                                    d.FeaturesDesc,
                                    d.FeaturesType,
                                    d.FeaturesAction,
                                    d.PathApp,
                                    d.IconName,
                                    d.UserEntry,
                                    d.DateEntry,
                                    d.UserLastMaintenance,
                                    d.DateLastMaintenance,
                                    d.IDModuleFeatures,
                                    d.IDIcon,
                                    d.IDModule,
                                    d.IDFeatures

                                };
            return Json(new
            {
                sEcho = sEcho,
                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resultnya
            }, JsonRequestBehavior.AllowGet);
        }
    }
}