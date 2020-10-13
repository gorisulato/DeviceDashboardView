using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
        public ActionResult Create(CategoryModel ins)
        {
            string ret = "";
            ins.UserEntry = Session["IDUser"].ToString();

            // ins.SiteCode = Session["IDSite"].ToString();
            if (ModelState.IsValid)
            {

                try
                {
                    // ret = EMC.EmployeeInsert(ins, IsActive);
                    ret = cc.CategoryInsertorupdate(ins);

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