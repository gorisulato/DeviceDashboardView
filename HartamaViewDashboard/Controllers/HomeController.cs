using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        

        public ActionResult Dashboard_1()
        {
            return View();

            //System.Web.HttpContext.Current.Session["user_name"] = "Administrator";

            //if ((Session["UserName"] == null) || (Session["IDSite"] == null)) { return RedirectToAction("Index", "Login"); }
            //try
            //{
            //    //var AutoLogout = new TAutoLogoutClass();
            //    //var res = AutoLogout.SelectAutoLogout().FirstOrDefault();
            //    //Session.Add("isAutoLogout", res.isAutoLogout);
            //    //Session.Add("Interval", res.IntervalAutoLogout);
            //    //ViewBag.UserName = Session["UserName"].ToString();
            //    //var res2 = Navigation.GetPasswordCriteria();
            //    //ViewBag.PC = res2.FirstOrDefault().PasswordCriteria;
            //    //ViewBag.RN = Session["RoleName"].ToString();

            //    return View();


            //}
            //catch (Exception err)
            //{
            //    var ret = "Err|" + err.Message;
            //    return RedirectToAction("Index", "Login");
            //}

        }
    }
}