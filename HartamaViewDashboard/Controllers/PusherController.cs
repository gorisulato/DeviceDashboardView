using PusherServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class PusherController : Controller
    {
        // GET: Pusher
        public ActionResult Index()
        {
            return View();
        }
        public class ModelTest
        {
            public string Mcadress { get; set; }
            public decimal value { get; set; }
            public string DeviceID { get; set; }

        }

        [HttpPost]
        public async Task<ActionResult> HelloWorld()
        {
            var options = new PusherOptions
            {
                Cluster = "ap1",
                Encrypted = true
            };
            ModelTest mdl = new ModelTest();
            List<ModelTest> result2 = new List<ModelTest>();
            mdl.Mcadress = "1234";
            mdl.DeviceID = "DEV001";
            mdl.value = 2;
            result2.Add(mdl);

            var pusher = new Pusher(
              "1099541",
              "4d57b796a305ad74611d",
              "1033ace6b885d1937090",
              options);

            var result = await pusher.TriggerAsync(
              "Dashboard-device",
              "my-event",
              new { message = result2 });

            return new HttpStatusCodeResult((int)HttpStatusCode.OK);
        }
    }
}