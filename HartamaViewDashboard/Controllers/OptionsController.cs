using HartamaViewDashboard.Class;
using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class OptionsController : Controller
    {
        OptionClass opt = new OptionClass();
        
        // GET: Options
        public ActionResult Index()
        {
            ViewBag.Role = Session["IDRole"];
            return View();
            
        }

        [HttpGet]
        public ActionResult GetOptionValue()
        {
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            List<OptionModel> opt = new List<OptionModel>();
            try
            {

                var ret = (from option in db.Options.Where(x => x.OptionsName == "SiteURL" || x.OptionsName == "CompanyAddress" || x.OptionsName == "CompanyName" || x.OptionsName == "CompanyPhone"||x.OptionsName== "LogoArray") select new {  option.OptionsName, option.OptionsValue }).ToList();
                
                for(var x = 0; x < ret.Count; x++)
                {
                    OptionModel optm = new OptionModel();
                    if(ret[x].OptionsName== "LogoArray")
                    {
                        
                        var image = Path.Combine(Server.MapPath("~/Images/"), ret[x].OptionsValue);
                        byte[] imgdata = System.IO.File.ReadAllBytes(image);

                        optm.OptionsName = ret[x].OptionsName;
                        optm.OptionsValue = Convert.ToBase64String(imgdata);

                    }
                    else
                    {
                        optm.OptionsName = ret[x].OptionsName;
                        optm.OptionsValue = ret[x].OptionsValue;
                    }
                    
                    opt.Add(optm);

                }

            }
            catch (Exception ex)
            {

                return Json(new { result = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { result = opt }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateOptions(OptionModel2 optm)
        {
            Hartama_IOTEntities db = new Hartama_IOTEntities();
            try
            {

                if(optm.CompanyName!=null || optm.CompanyName != "")
                {
                    var ret = db.Options.Where(x => x.OptionsName == "CompanyName").FirstOrDefault();
                    OptionModel o = new OptionModel();
                    o.OptionsID = ret.OptionsID.ToString();
                    o.OptionsName = ret.OptionsName;
                    o.OptionsValue = optm.CompanyName;
                    var exe = opt.UpdateOption(o);
                }

                if (optm.CompanyAddress != null || optm.CompanyAddress != "")
                {
                    var ret = db.Options.Where(x => x.OptionsName == "CompanyAddress").FirstOrDefault();
                    OptionModel o = new OptionModel();
                    o.OptionsID = ret.OptionsID.ToString();
                    o.OptionsName = ret.OptionsName;
                    o.OptionsValue = optm.CompanyAddress;
                    var exe = opt.UpdateOption(o);
                }

                if (optm.CompanyPhone != null || optm.CompanyPhone != "")
                {
                    var ret = db.Options.Where(x => x.OptionsName == "CompanyPhone").FirstOrDefault();
                    OptionModel o = new OptionModel();
                    o.OptionsID = ret.OptionsID.ToString();
                    o.OptionsName = ret.OptionsName;
                    o.OptionsValue = optm.CompanyPhone;
                    var exe = opt.UpdateOption(o);
                }

                if (optm.ApiUri != null || optm.ApiUri != "")
                {
                    var ret = db.Options.Where(x => x.OptionsName == "SiteURL").FirstOrDefault();
                    OptionModel o = new OptionModel();
                    o.OptionsID = ret.OptionsID.ToString();
                    o.OptionsName = ret.OptionsName;
                    o.OptionsValue = optm.ApiUri;
                    var exe = opt.UpdateOption(o);
                }

            }
            catch (Exception e)
            {

                return Json(new { result = e.Message });
            }
            return Json(new { result = "" });
        }

        [HttpPost]
        public ActionResult UploadImage(string Company)
        {
            Hartama_IOTEntities db = new Hartama_IOTEntities();
           // var ret;
            try
            {
                foreach (string file in Request.Files)
                {
                    var fileContent = Request.Files[file];
                    if (fileContent != null && fileContent.ContentLength > 0)
                    {
                        // get a stream
                        var stream = fileContent.InputStream;
                        // and optionally write the file to disk
                        var fileName = Path.GetFileName(fileContent.FileName);
                        var z =fileName.Split('.')[1];

                        var path = Path.Combine(Server.MapPath("~/Images/"), Company.Remove(' ')+"."+z);
                        using (var fileStream = System.IO.File.Create(path))
                        {

                            stream.CopyTo(fileStream);

                        }

                        var ret = db.Options.Where(x => x.OptionsName == "LogoArray").FirstOrDefault();
                        OptionModel optm = new OptionModel();
                        optm.OptionsID = ret.OptionsID.ToString();
                        optm.OptionsName = ret.OptionsName;
                        optm.OptionsValue = Company + "." + z;




                        var exe = opt.UpdateOption(optm);

                    }
                }

              




            }
            catch (Exception e)
            {
                return Json(new { result = e.Message });
            }


            return Json(new { result = "Success Upload Image"});
        }
    }
   
}