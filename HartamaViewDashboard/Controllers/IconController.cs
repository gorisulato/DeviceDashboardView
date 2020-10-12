using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class IconController : Controller
    {
        private TIconClass Icon;
        ConvertClass ConvertDate = new ConvertClass();
        FeatureeRoleClass FR = new FeatureeRoleClass();
        [HttpGet]
        public ActionResult Index()
        {
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyisDefault = Request["historyisDefault"];
            string baseUrl = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("action");
            var rd = System.Web.HttpContext.Current.Request.RequestContext.RouteData.GetRequiredString("Controller");
            var pt = "/" + rd + "/" + baseUrl;
            var rl = Session["IDRole"].ToString();


            var RoelAc = FR.RoleAccess(pt, rl);
            ViewBag.Role = RoelAc.FirstOrDefault();
            return View();
        }

        public ActionResult GetDataIcon(string sEcho, int Start, int Length, string isDefault, string keyword)
        {
            if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var filter = Convert.ToString(Request["search[value]"]);
            var orderby = Convert.ToString(Request["order[0][column]"]);
            var dir = Convert.ToString(Request["order[0][dir]"]);
            var TIconClass = new TIconClass();
            bool? InputIsDefault;

            if (isDefault == "true" || isDefault == null)
            {

                InputIsDefault = true;
            }
            else
            {
                InputIsDefault = false;

            }
            var res = TIconClass.IconSelectByKeywordIsDefault(orderby, dir, keyword, InputIsDefault, Length, Start);
            Int32? TotalRecords;
            if (res.Count() > 0)
            {
                TotalRecords = res.FirstOrDefault().TotalRecords;
            }
            else
            {
                TotalRecords = 0;
            }
            var resutltnya = from d in res
                             select new string[]
                             {
                                    d.IDIcon,
                                    d.IconName,
                                    d.IconType,
                                    d.IconCategory,
                                    d.IconDesc,
                                    d.IconClass,
                                    d.IconPath,
                                    d.IsDefault.ToString()

                                };
            return Json(new
            {
                sEcho = sEcho,
                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltnya
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetLov()
        {
            return View();
        }

        public ActionResult GetLovFeature()
        {
            return View();
        }

        public ActionResult Create()
        {
            var IconType = new SelectList(new[]
                                        {
                                            new { ID = "Unicode", Name = "Unicode" },
                                            new { ID = "Image", Name = "Image" },

                                        },
                                           "ID", "Name", "Unicode");
            ViewData["Icon Type"] = IconType;
            var IconCategory = new SelectList(new[]
                                        {
                                            new { ID = "TextEditor", Name = "TextEditor" },
                                            new { ID = "Brand", Name = "Brand" },
                                            new { ID = "Currency", Name = "Currency" },
                                        },
                                           "ID", "Name", "TextEditor");
            ViewData["Icon Category"] = IconCategory;
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyisDefault = Request["historyisDefault"];
            return View();
        }

        [HttpPost]
        public ActionResult Create(TIconModel mdl)
        {
            foreach (var fileKey in Request.Files.AllKeys)
            {
                var file = Request.Files[fileKey];
                int number = 0;
                string random = "";
                bool upload = false;
                try
                {
                    if (file != null)
                    {
                        var fileName = Path.GetFileNameWithoutExtension(file.FileName);
                        var extension = Path.GetExtension(file.FileName);
                        Random randomNumber = new Random();
                        while (upload == false)
                        {
                            for (var i = 0; i <= 5; i++)
                            {
                                number = randomNumber.Next(0, 9);
                                random += number.ToString();
                            }
                            var path = Path.Combine(Server.MapPath("~/Images/AssetImage"), fileName + random + extension);
                            if (!System.IO.File.Exists(path))
                            {
                                mdl.IconPath = "../Images/AssetImage/" + fileName + random + extension;
                                file.SaveAs(path);
                                upload = true;
                            }
                        }
                    }
                }
                catch (Exception)
                {
                    return Json(new { Message = "Error in saving file" });
                }
            }
            mdl.UserEntry = Session["IDUser"].ToString();
            mdl.DateEntry = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);

            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Icon = new TIconClass();
                    ret = Icon.IconInsert(mdl);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
            }
            else
            {

                return View(mdl);
            }
        }
        [HttpGet]
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Icon = new TIconClass();
            var res = Icon.IconSelectById(id).FirstOrDefault();

            if (res == null)
            {
                return HttpNotFound();
            }
            TIconModel mdl = new TIconModel();
            mdl.IDIcon = res.IDIcon;
            mdl.IconName = res.IconName;
            mdl.IconDesc = res.IconDesc;
            mdl.IconClass = res.IconClass;
            mdl.IconPath = res.IconPath;
            mdl.IconCategory = res.IconCategory;
            mdl.IconType = res.IconType;
            mdl.IsDefault = res.IsDefault;
            mdl.UserEntry = res.UserEntry;
            mdl.DateEntry = ConvertDate.convert_date(res.DateEntry);
            mdl.UserLastMaintenance = res.UserLastMaintenance;
            mdl.DateLastMaintenance = ConvertDate.convert_date(res.DateLastMaintenance);
            var IconType = new SelectList(new[]
                                        {
                                            new { ID = "Unicode", Name = "Unicode" },
                                            new { ID = "Image", Name = "Image" },

                                        },
                                          "ID", "Name", mdl.IconType);
            ViewData["Icon Type"] = IconType;
            var IconCategory = new SelectList(new[]
                                        {
                                            new { ID = "TextEditor", Name = "TextEditor" },
                                            new { ID = "Brand", Name = "Brand" },
                                            new { ID = "Currency", Name = "Currency" },
                                        },
                                           "ID", "Name", mdl.IconCategory);
            ViewData["Icon Category"] = IconCategory;
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyisDefault = Request["historyisDefault"];
            return View(mdl);
        }

        [HttpPost]
        public ActionResult Edit(TIconModel mdl)
        {
            var CUI = Session["CurrentUICulture"].ToString();
            DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
            mdl.DateEntry = DateEntry.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            int number = 0;
            string random = "";
            bool upload = false;
            foreach (var fileKey in Request.Files.AllKeys)
            {
                var file = Request.Files[fileKey];

                try
                {
                    if (file != null)
                    {
                        var fileName = Path.GetFileNameWithoutExtension(file.FileName);
                        var extension = Path.GetExtension(file.FileName);
                        Random randomNumber = new Random();
                        while (upload == false)
                        {
                            for (var i = 0; i <= 5; i++)
                            {
                                number = randomNumber.Next(0, 9);
                                random += number.ToString();
                            }
                            var path = Path.Combine(Server.MapPath("~/Images/AssetImage"), fileName + random + extension);
                            if (!System.IO.File.Exists(path))
                            {
                                mdl.IconPath = "../Images/AssetImage/" + fileName + random + extension;
                                file.SaveAs(path);
                                upload = true;
                            }
                        }
                    }
                }
                catch (Exception)
                {
                    return Json(new { Message = "Error in saving file" });
                }
            }
            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Icon = new TIconClass();
                    ret = Icon.IconUpdate(mdl);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
            }
            else
            {

                return View(mdl);
            }
        }


        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Icon = new TIconClass();
            var res = Icon.IconSelectById(id).FirstOrDefault();

            if (res == null)
            {
                return HttpNotFound();
            }
            TIconModel mdl = new TIconModel();
            mdl.IDIcon = res.IDIcon;
            mdl.IconName = res.IconName;
            mdl.IconDesc = res.IconDesc;
            mdl.IconClass = res.IconClass;
            mdl.IconPath = res.IconPath;
            mdl.IconCategory = res.IconCategory;
            mdl.IconType = res.IconType;
            mdl.IsDefault = res.IsDefault;
            mdl.UserEntry = res.UserEntry;
            mdl.DateEntry = ConvertDate.convert_date(res.DateEntry);
            mdl.UserLastMaintenance = res.UserLastMaintenance;
            mdl.DateLastMaintenance = ConvertDate.convert_date(res.DateLastMaintenance);
            var IconType = new SelectList(new[]
                                        {
                                            new { ID = "Unicode", Name = "Unicode" },
                                            new { ID = "Image", Name = "Image" },

                                        },
                                          "ID", "Name", mdl.IconType);
            ViewData["Icon Type"] = IconType;
            var IconCategory = new SelectList(new[]
                                        {
                                            new { ID = "TextEditor", Name = "TextEditor" },
                                            new { ID = "Brand", Name = "Brand" },
                                            new { ID = "Currency", Name = "Currency" },
                                        },
                                           "ID", "Name", mdl.IconCategory);
            ViewData["Icon Category"] = IconCategory;
            ViewBag.historyKeyword = Request["historyKeyword"];
            ViewBag.historyisDefault = Request["historyisDefault"];
            return View(mdl);
        }

        [HttpPost]
        public ActionResult Delete(TIconModel mdl)
        {
            var CUI = Session["CurrentUICulture"].ToString();
            DateTime DateEntry = Convert.ToDateTime(mdl.DateEntry, CultureInfo.CreateSpecificCulture(CUI));
            mdl.DateEntry = DateEntry.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            mdl.UserLastMaintenance = Session["IDUser"].ToString();
            mdl.DateLastMaintenance = DateTime.Now.ToString(CultureInfo.CreateSpecificCulture("en-US").DateTimeFormat);
            if (ModelState.IsValid)
            {
                string ret = "";
                try
                {
                    Icon = new TIconClass();
                    ret = Icon.IconDelete(mdl);
                    return Json(new { result = ret });
                }
                catch (Exception err)
                {
                    ret = "Err|" + err.Message;
                    return Json(new { result = ret });
                }
            }
            else
            {

                return View(mdl);
            }
        }
        public void RemoveFile(string path)
        {
            string fullPath = Request.MapPath(path);
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
        }
        public ActionResult GetDataIconLov(string sEcho, int Start, int Length)
        {
            //if (Session["UserName"] == null) { return RedirectToAction("Index", "Login"); }
            var filter = Convert.ToString(Request["search[value]"]);
            var orderby = Convert.ToString(Request["order[0][column]"]);
            var dir = Convert.ToString(Request["order[0][dir]"]);
            var TIconClass = new TIconClass();
            var res = TIconClass.IconSelectLov(orderby, dir, filter, Length, Start);
            Int32? TotalRecords;
            if (res.Count() > 0)
            {
                TotalRecords = res.FirstOrDefault().TotalRecords;
            }
            else
            {
                TotalRecords = 0;
            }
            var resutltnya = from d in res
                             select new string[]
                             {
                                    d.IDIcon,
                                    d.IconName,
                                    d.IconType,
                                    d.IconCategory,
                                    d.IconDesc,
                                    d.IconClass,
                                    d.IconPath


                                };
            return Json(new
            {
                sEcho = sEcho,
                iTotalRecords = TotalRecords,
                iTotalDisplayRecords = TotalRecords,
                aaData = resutltnya
            }, JsonRequestBehavior.AllowGet);
        }
    }
}