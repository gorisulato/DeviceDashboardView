﻿using HartamaViewDashboard.Class;
using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class DashboardsController : Controller
    {
        private string _name;
        TUserClass user = new TUserClass();
        LanguageClass language = new LanguageClass();
       // MiscClass MISC = new MiscClass();
        //DashboardClass Dashboard = new DashboardClass();
        NavigationMenuClass Navigation = new NavigationMenuClass();
        TSiteClass TS = new TSiteClass();
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }
        //public ActionResult FirstLineFix()
        //{
        //    ViewBag.AssetCategoryList = new SelectList(MISC.Get("Asset Categories", "AssetCategoryID", "AssetCategory").ToList(), "IdMisc", "MiscText");
        //    return View();
        //}
        //public ActionResult GetSymptom(string ID)
        //{
        //    var res = MISC.GetByQuery(
        //                            "select distinct" +
        //                            " a.Symptom " +
        //                            " from FirstLineFIx a" +
        //                            " where a.AssetCategoryID = '" + ID + "'"
        //                            ,
        //                            "Symptom",
        //                            "Symptom").ToList();
        //    return Json(new
        //    {
        //        res
        //    }, JsonRequestBehavior.AllowGet);
        //}
        //public ActionResult GetSymptomDescription(string AssetCategoryID, string Symptom)
        //{
        //    string SymptomQuery = Symptom != "" ? " and a.Symptom = '" + Symptom + "'" : "";

        //    var res = MISC.GetByQuery(
        //                            "select distinct" +
        //                            " a.Symptom " +
        //                            ",a.Description" +
        //                            " from FirstLineFIx a" +
        //                            " where a.AssetCategoryID = '" + AssetCategoryID + "'" +
        //                            SymptomQuery
        //                            ,
        //                            "Symptom",
        //                            "Description").ToList();
        //    return Json(new
        //    {
        //        res
        //    }, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult Dashboard_1()
        {
            //System.Web.HttpContext.Current.Session["user_name"] = "Administrator";

            //if ((Session["UserName"] == null) || (Session["IDSite"] == null)) { return RedirectToAction("Index", "Login"); }
           
                //var AutoLogout = new TAutoLogoutClass();
                //var res = AutoLogout.SelectAutoLogout().FirstOrDefault();
                //Session.Add("isAutoLogout", res.isAutoLogout);
                //Session.Add("Interval", res.IntervalAutoLogout);
                //ViewBag.UserName = Session["UserName"].ToString();
                //var res2 = Navigation.GetPasswordCriteria();
                //ViewBag.PC = res2.FirstOrDefault().PasswordCriteria;
                //ViewBag.RN = Session["RoleName"].ToString();

                return View();


            //}
            //catch (Exception err)
            //{
            //    var ret = "Err|" + err.Message;
            //    return RedirectToAction("Index", "Login");
            //}

        }
        [HttpPost]
        public ActionResult Coba(HttpPostedFileBase FileUpload)
        {

            DataTable dt = new DataTable();


            if (FileUpload.ContentLength > 0)
            {

                string fileName = Path.GetFileName(FileUpload.FileName);
                string path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);


                try
                {
                    FileUpload.SaveAs(path);

                    dt = ProcessCSV(path);


                    ViewData["Feedback"] = ProcessBulkCopy(dt);
                }
                catch (Exception ex)
                {

                    ViewData["Feedback"] = ex.Message;
                }
            }
            else
            {

                ViewData["Feedback"] = "Please select a file";
            }


            dt.Dispose();

            return View("Home", ViewData["Feedback"]);
        }

        private static DataTable ProcessCSV(string fileName)
        {

            string Feedback = string.Empty;
            string line = string.Empty;
            string[] strArray;
            DataTable dt = new DataTable();
            DataRow row;


            Regex r = new Regex(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");


            StreamReader sr = new StreamReader(fileName);


            line = sr.ReadLine();
            strArray = r.Split(line);


            Array.ForEach(strArray, s => dt.Columns.Add(new DataColumn()));



            while ((line = sr.ReadLine()) != null)
            {
                row = dt.NewRow();


                row.ItemArray = r.Split(line);
                dt.Rows.Add(row);
            }


            sr.Dispose();


            return dt;


        }


        private static String ProcessBulkCopy(DataTable dt)
        {
            string Feedback = string.Empty;
            string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;


            using (SqlConnection conn = new SqlConnection(connString))
            {

                using (var copy = new SqlBulkCopy(conn))
                {


                    conn.Open();


                    copy.DestinationTableName = "TSparePartsStock";
                    copy.BatchSize = dt.Rows.Count;
                    try
                    {

                        copy.WriteToServer(dt);
                        Feedback = "Upload complete";
                    }
                    catch (Exception ex)
                    {
                        Feedback = ex.Message;
                    }
                }
            }

            return Feedback;
        }
        public ActionResult Home()
        {
            if ((Session["UserName"] == null) || (Session["IDSite"] == null)) { return RedirectToAction("Index", "Login"); }
            ViewBag.Dashboard = "";
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            var res = db.Options.Where(x => x.OptionsName == "SiteURL").FirstOrDefault();
            ViewBag.SiteUrl = res.OptionsValue;
            //GetSiteList();
            return View();
        }
        public ActionResult ReadAllNotification()
        {

            //if ((Session["UserName"] == null) || (Session["IDSite"] == null)) { return RedirectToAction("Index", "Login"); }
            //var res = user.GetNotificationResult((Session["IDRole"]).ToString(), 5, 0).ToList();
            //ViewBag.Notification = res;
            //ViewBag.TotalRecords = res.FirstOrDefault().totalmessages;
            return View();
        }

        public ActionResult Dashboard_2()
        {
            if ((Session["UserName"] == null) || (Session["IDSite"] == null)) { return RedirectToAction("Index", "Login"); }
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            var res = db.Options.Where(x => x.OptionsName == "GapRefreshChart").FirstOrDefault();
            ViewBag.Gap = res.OptionsValue;
            //GetSiteList();
            return View();
        }

        [HttpPost]
        public ActionResult GetSiteByRole ()
        {
            var IDUser = Session["IDUser"].ToString();
           
            var res = TS.GetSiteByRole(IDUser);
            var resutltJson = from d in res
                              select new string[]
                             {
                                    d.IDSite,

                                    d.SiteName,


                             };
            return Json(new
            {

                Data = resutltJson
            }, JsonRequestBehavior.AllowGet);
            //kab = new MasterKabupaten();
            //var res = kab.SearchKabupatenByKeyword(keyword);

            //return new JsonResult
            //{
            //    Data = new SelectList(res, "IDKabupaten", "NamaKabupaten")
            //};
        }

        [HttpPost]
        public ActionResult GetDataNotificationLog(int Start, int Length)
        {
            var id = Session["IDRole"].ToString();
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var res = user.GetDataNotificationLog(id, Length, Start);
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


                                    d.Notification_ID,
                                    d.Device_Name,
                                    d.Title,
                                    d.Description,
                                    d.SiteName,
                                    d.ActionCode,
                                    d.ActionType,
                                    d.DescAction,
                                    d.usertaken,
                                    d.statustext,
                                    d.fulldate.Value.ToShortDateString(),
                                    d.timecreated




                             };
            return Json(new
            {

                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltJson
            }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult GetDeviceBysite(string keywords,string site,int Start, int Length)
        {
            var id = Session["IDRole"].ToString();
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var res = user.GetDevicebySite(site,keywords,Length, Start);
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


                                    d.Device_Name,
                                    d.SiteName,
                                    d.Category_Name,
                                    d.Device_ID,
                                    d.Device_category_ID
                                    




                             };
            return Json(new
            {

                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltJson
            }, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult GetAllChart(string DeviceID)
        {
            var test = user.GetChart(DeviceID);
            List<ChartModel> lm = new List<ChartModel>();
            foreach(var res in test)
            {
                ChartModel mdl = new ChartModel();
                mdl.Date = res.Date.Value.ToString("yyyy-MM-dd"); 
                mdl.Detail_SensorName = res.Detail_SensorName;
                mdl.average_of_day = Convert.ToDecimal(res.average_of_day);
                mdl.lower = Convert.ToDecimal(res.lower);
                mdl.upper = Convert.ToDecimal(res.upper);
                lm.Add(mdl);
            }
           

          
            //var resutltJson = from d in test
            //                  select new string[]
            //                 {
            //                        d.Date.Value.ToShortDateString(),
            //                        d.Detail_SensorName,
            //                        d.average_of_day.ToString(),
            //                        d.lower.ToString(),
            //                        d.upper.ToString()


            //                 };
            return Json(new
            {

                Data = lm
            }, JsonRequestBehavior.AllowGet);
           // return Json(test, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult ReadImportedFiles()
        {

            try
            {
                var date = Convert.ToDateTime("2020-11-09");
                var date2 = Convert.ToDateTime("2020-11-09");
                List<string> reader = new List<string>();
                var  contents = Directory.GetFiles(@"D:\DeviceWebAPI\HartamaDeviceAPI\DeviceWebAPI\File");//System.IO.File.ReadAllText(Server.MapPath("D:/DeviceWebAPI/HartamaDeviceAPI/DeviceWebAPI/File/Log2020-11-03"));
                foreach(var x in contents)
                {
                    var tes = System.IO.File.GetCreationTime(@"" + x);
                    if (tes.Date>=date.Date && tes.Date<=date2.Date)
                    {
                        string contents2 = System.IO.File.ReadAllText(@"" + x);
                        reader.Add(contents2);
                    }
                   
                   // if()
                    
                }

                return Json(new { hasil = reader });

            }
            catch (Exception e)
            {

                return Json(new { hasil = e.Message });
            }

        }
        public ActionResult notifchart()
        {

            user.notifchart();

            return Json(new { result = "OK" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult NotificationContent(int Limit, int Offset, string Direction)
        {

            if ((Session["UserName"] == null) || (Session["IDSite"] == null)) { return RedirectToAction("Index", "Login"); }
            ViewBag.Notification = user.GetNotificationResult((Session["IDRole"]).ToString(), Limit, Offset).ToList();
            ViewBag.Direction = Direction;
            return View();
        }

        //public ActionResult UpdateNotification(string IDNotification)
        //{
        //    Navigation.UpdateStatusNotification(IDNotification);
        //    return Json("", JsonRequestBehavior.AllowGet);
        //}

        public ActionResult GetNavigationMenu()
        {

            try
            {
                var NavigationMenu = new NavigationMenuClass();
                var ret = "asdasd";//NavigationMenu.GetModuleNav();
                return Json(ret, JsonRequestBehavior.AllowGet);

            }
            catch (Exception err)
            {
                var ret = "Err|" + err.Message;
                return Json(ret, JsonRequestBehavior.AllowGet);
            }

        }
        //public ActionResult GetNotification(int Limit, int Offset)
        //{

        //    try
        //    {
        //        var ret = Navigation.GetNotification(Session["IDUser"].ToString(), Limit, Offset);
        //        var resutltJson = from d in ret
        //                          select new string[]
        //                     {
        //                            d.IDNotification,
        //                            d.NotificationMessage,
        //                            d.NotificationStatus,
        //                            d.NotificationType,
        //                            d.UnreadMsg.ToString(),
        //                            d.DateOfNotification.ToString()
        //                        };
        //        return Json(ret, JsonRequestBehavior.AllowGet);

        //    }
        //    catch (Exception err)
        //    {
        //        var ret = "Err|" + err.Message;
        //        return Json(ret, JsonRequestBehavior.AllowGet);
        //    }

        //}


        //public ActionResult GetGauge()
        //{

        //    try
        //    {
        //        var ret = Dashboard.GetDashboard(Session["IDRole"].ToString());
        //        return Json(ret, JsonRequestBehavior.AllowGet);

        //    }
        //    catch (Exception err)
        //    {
        //        var ret = "Err|" + err.Message;
        //        return Json(ret, JsonRequestBehavior.AllowGet);
        //    }

        //}
        public JsonResult GenerateModule()
        {
            try
            {
                GenerateMenuModel mdl = new GenerateMenuModel();
                mdl.IDSite = Session["IDsite"].ToString();
                mdl.IDRole = Session["IDRole"].ToString();
                mdl.IDLanguage = Session["CurrentUICulture"].ToString();
                var NavigationMenu = new NavigationMenuClass();

                var ret = NavigationMenu.GenerateModule(mdl);
                return Json(ret, JsonRequestBehavior.AllowGet);

            }
            catch (Exception err)
            {
                var ret = "Err|" + err.Message;
                return Json(ret, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public ActionResult GetFeatureMenu(String id)
        {

            try
            {
                var NavigationMenu = new NavigationMenuClass();
                var ret = "asdasd";//NavigationMenu.GetModuleFeaturesNav(id);
                return Json(ret, JsonRequestBehavior.AllowGet);

            }
            catch (Exception err)
            {
                var ret = "Err|" + err.Message;
                return Json(ret, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpGet]
        public ActionResult GetDataSite()
        {

            TSiteClass SiteClass = new TSiteClass();
            var res = SiteClass.SiteUserSelectByIDUser(Session["IDUser"].ToString());
            //var ret = NavigationMenu.GenerateModule(mdl);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ListOfLanguage()
        {
            try
            {
                var language = new LanguageClass();
                var ret = language.LanguageSelectAll().ToList();
                var res = language.LanguageSelectByID(Session["CurrentUICulture"].ToString()).FirstOrDefault();
                var cur = res.IDLanguage;
                return Json(ret, JsonRequestBehavior.AllowGet);
            }
            catch (Exception err)
            {
                var ret = "Err|" + err.Message;
                return Json(ret, JsonRequestBehavior.AllowGet);
            }
        }

        public void RunApp(string path)
        {
            Process app = new Process();
            app.StartInfo.FileName = @path;
            app.Start();
        }
    }
}