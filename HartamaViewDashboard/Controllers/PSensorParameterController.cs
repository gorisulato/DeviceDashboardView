using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;

namespace HartamaViewDashboard.Controllers
{
    public class PSensorParameterController : Controller
    {
        // GET: PSensorParameter
        PSensorParameterClass pc = new PSensorParameterClass();
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetSensorDetail(string id, int Length, int Start)
        {


            try
            {


                var res = pc.GetSensorList(id);
                int? TotalRecords;
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
                                           d.ID_Detail_Group_Sensor,
                                           d.Detail_SensorName,
                                           d.lowerlimit.ToString(),
                                           d.upperlimit.ToString(),
                                          
                                 };
                return Json(new
                {

                    iTotalRecords = TotalRecords,
                    iTotalDisplayRecords = TotalRecords,
                    aaData = resutltJson
                }, JsonRequestBehavior.AllowGet);


            }


            catch (Exception err)
            {
                return Content(err.ToString());
            }
        }

        [HttpPost]
        public string test(string[] test)
        {

            XElement ds = new XElement("Sensors");

            for(int x = 0; x < test.Length; x++)
            {

                var splited = test[x].Split(',');
               
              
              
                    ds.SetElementValue(splited[0], splited[1]);
                
                    
                
            }
            
           
           
            return ds.ToString();
        }
    }
}