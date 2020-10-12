using HartamaViewDashboard.Class;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class ChartByDeviceIDController : Controller
    {
        // GET: ChartByDeviceID
        ChartByDeviceIDClass ci = new ChartByDeviceIDClass();
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetChartbyDeviceID(string id)
        {
            
            var test = ci.GetChartbyID(id);
            return Json(test, JsonRequestBehavior.AllowGet);
        }



        public ActionResult notifchart()
        {

            ci.notifchartdetail();

            return Json(new { result = "OK" }, JsonRequestBehavior.AllowGet);
        }
    }
}