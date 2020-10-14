using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HartamaViewDashboard.Controllers
{
    public class CategoryController : Controller
    {
        CategoryClass cc = new CategoryClass();
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetCategory(string keyword, int Length, int Start)
        {
            

            try
            {


                var res = cc.GetCategory(keyword, Length, Start);
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
                                           d.Username,
                                           d.dateentry.Value.ToShortDateString(),
                                           d.userlastmaintenance,
                                           d.datelastmaintenance.ToShortDateString()=="1900-01-01"?"":d.datelastmaintenance.ToShortDateString(),
                                           d.Category_ID,

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
        public ActionResult GetSensorDetail(string id)
        {


            try
            {


                var res = cc.GetSensorDetail(id);
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
        public ActionResult Create(CategoryModel ins, string mdlListDetail)
        {
            List<SensorDetailModel> ListDetailSensor;
            JavaScriptSerializer jss = new JavaScriptSerializer();
            ListDetailSensor = jss.Deserialize<List<SensorDetailModel>>(mdlListDetail);
            string ret = "";
            string res = "";
            ins.UserEntry = Session["IDUser"].ToString();

            // ins.SiteCode = Session["IDSite"].ToString();
            if (ModelState.IsValid)
            {

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = cc.CategoryInsertorupdate(ins);
                    if (ret.Contains("ERR|"))
                    {
                        res = ret;
                    }
                    else
                    {
                        var hsl = "";
                        foreach (var sensor in ListDetailSensor)
                        {
                            
                            hsl = cc.createoreditsensorparamdetail(sensor.id,ret==null?ins.CategoryID:ret,sensor.valuelower,sensor.valueupper,Session["IDUser"].ToString());
                            if (hsl.Contains("Err|"))
                            {
                                res = hsl;
                            }
                            else
                            {
                                res = "1";
                            }
                        }
                    }

                }
                catch (Exception err)
                {
                    ret = err.Message;
                    return Json(new { result = ret });
                }
            }
            return Json(new { result = res });
        }

        [HttpPost]
        public ActionResult Delete(CategoryModel ins)
        {
            string ret = "";
            ins.UserEntry = Session["IDUser"].ToString();

            // ins.SiteCode = Session["IDSite"].ToString();
            if (ModelState.IsValid)
            {

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = cc.DeleteCategory(ins);

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