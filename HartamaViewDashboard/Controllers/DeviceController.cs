using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class DeviceController : Controller
    {
        // GET: Device
        DeviceModel dm=new DeviceModel();
        FeatureeRoleClass FR = new FeatureeRoleClass();
        DeviceClass dc = new DeviceClass();
        public ActionResult Index()
        {
            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();
            return View();
        }

        [HttpPost]
        public ActionResult GetCategoryOfDevices(string keyword, int Length, int Start)
        {
            string IDUser = Session["IDUser"].ToString();

            try
            {

               
                var res = dc.GetDeviceCategory(keyword, Length, Start);
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
                                           d.Category_Name,
                                           d.Category_Description,
                                           d.Category_ID
                                          
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
        public ActionResult GetSite(string keyword, int Length, int Start)
        {
            string IDUser = Session["IDUser"].ToString();

            try
            {


                var res = dc.GetSite(keyword, Length, Start);
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
                                     d.SiteName,
                                           d.Address,
                                           d.IDSite

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
        public ActionResult GetRegisteredDevice(string keyword, int Length, int Start)
        {
            string IDUser = Session["IDUser"].ToString();

            try
            {


                var res = dc.GetDevice(IDUser,keyword, Length, Start);
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
                                     
                                           d.Device_Name,
                                           d.SiteName,
                                           d.Category_Name,
                                           d.Device_Description,
                                           d.mac1,
                                           d.mac2,
                                           d.mac3,
                                           d.Device_ID,
                                           d.Device_Site_ID,
                                           d.Device_category_ID,
                                           d.Username,
                                           d.dateentry.Value.ToShortDateString(),
                                           d.userlastmaintenance,
                                           d.datelastmaintenance.ToShortDateString()=="1900-01-01"?"":d.datelastmaintenance.ToShortDateString()

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
        public ActionResult Create(DeviceModel ins)
        {
            string ret = "";
            ins.UserEntry = Session["IDUser"].ToString();

            // ins.SiteCode = Session["IDSite"].ToString();
            if (ModelState.IsValid)
            {

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = dc.DeviceInsert(ins);

                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            }
            return Json(new { result = ret });
        }

        [HttpPost]
        public ActionResult Edit(DeviceModel ins)
        {
            string ret = "";
            ins.UserLastMaintenance = Session["IDUser"].ToString();

            // ins.SiteCode = Session["IDSite"].ToString();
            if (ModelState.IsValid)
            {

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = dc.DeviceUpdate(ins);

                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            }
            return Json(new { result = ret });
        }

        [HttpPost]
        public ActionResult Delete(DeviceModel id)
        {
            string ret = "";
            
            if (ModelState.IsValid)
            {

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = dc.DeviceDelete(id);

                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            }
            return Json(new { result = ret });
        }
    }
}