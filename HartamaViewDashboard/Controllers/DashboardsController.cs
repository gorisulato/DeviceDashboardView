using HartamaViewDashboard.Class;
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
        public ActionResult GetDeviceBysite()
        {
            if (Session["IDUser"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                var userid = Session["IDUser"].ToString();
                var dev = user.GetDevicebySite(userid);
                return Json(dev, JsonRequestBehavior.AllowGet);
            }
           
        }
        [HttpPost]
        public ActionResult GetAllChart(string DeviceID)
        {
            var test = user.GetChart(DeviceID);
            return Json(test, JsonRequestBehavior.AllowGet);
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