using HartamaViewDashboard.DB;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult ReportLog()
        {
            
            
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            var x = db.Options.Where(y => y.OptionsName == "SiteURL").FirstOrDefault();
            var logo= db.Options.Where(y => y.OptionsName == "LogoArray").FirstOrDefault();
            ViewBag.paramfile = x.OptionsValue;
            ViewBag.Logo = logo.OptionsValue;
            return View();

        }
        
        [HttpPost]
        public ActionResult writeReport(DateTime datestart, DateTime dateend,string filepath)
        {
          
            string ret = "";
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            if (ModelState.IsValid)
            {

                try
                {


                    var ss = db.InsertToLogTemp(filepath, Session["IDUser"].ToString(), datestart, dateend);




                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = "error" });
                }
            }
            return Json(new { result = "OK" });
        }
    }
}
