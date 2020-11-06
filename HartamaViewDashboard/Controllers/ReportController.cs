using HartamaViewDashboard.DB;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult ReportLog()
        {
            return View();
        }
        [HttpPost]
        public ActionResult writeReport(string datestart, string enddate)
        {
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            string ret = "";
            //ins.UserEntry = Session["IDUser"].ToString();

            // ins.SiteCode = Session["IDSite"].ToString();
            if (ModelState.IsValid)
            {

                try
                {
                    var date1 = Convert.ToDateTime(datestart);
                    var date2 = Convert.ToDateTime(enddate);
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = db.InsertToLogTemp(date1,date2, "D:/DeviceWebAPI/HartamaDeviceAPI/DeviceWebAPI/File/Log").ToString();

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
