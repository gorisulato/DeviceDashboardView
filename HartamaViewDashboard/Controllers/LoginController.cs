using HartamaViewDashboard.Class;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HartamaViewDashboard.Controllers
{
    public class LoginController : Controller
    {

        private TUserClass usr;
        LanguageClass language = new LanguageClass();
        TSiteClass SiteClass = new TSiteClass();
        OptionClass OptionClass = new OptionClass();
        
        TUserClass UserClass = new TUserClass();
        //LanguageClass language = new LanguageClass();
        // GET: Login
        public ActionResult Index()
        {
            string culture = "en-US";
            if (this.Session == null || this.Session["CurrentUICulture"] == null)
            {
                this.Session["CurrentUICulture"] = culture;
            }
            else
            {
                culture = Session["CurrentUICulture"].ToString();
            }

            var res = language.LanguageSelectByID(culture).FirstOrDefault();
            ViewData["Language"] = new SelectList(language.LanguageSelectAll().ToList(), "IDLanguage", "LanguageName", res.IDLanguage);

            return View();
        }

        [HttpGet]
        public ActionResult ChangeCulture(string culture)
        {
            Session["CurrentUICulture"] = culture;

            return RedirectToAction("Index", "Login");
        }

        [HttpGet]
        public ActionResult PickSite(string id)
        {
            RoleAccessClass roleAccess = new RoleAccessClass();
            string Role = System.Web.Helpers.Json.Encode(roleAccess.ModuleFeaturesSelectAll(Session["IDRole"].ToString(), id).ToList());
            Session.Add("IDSite", "");
            Session.Add("RoleAccess", "");
            //UserClass.UpdateTUserLastLogin(Session["IDUser"].ToString(), Session["IDSite"].ToString());
            //return Json(new { result = Session["IDSite"].ToString() }, JsonRequestBehavior.AllowGet);
            return RedirectToAction("Dashboard_1", "Dashboards");
        }
        [HttpGet]
        public ActionResult ChangeSite(string id)
        {
            Session.Add("IDSite", id);
            //UserClass.UpdateTUserLastLogin(Session["IDUser"].ToString(), Session["IDSite"].ToString());
            return Json(new { result = Session["IDSite"].ToString() }, JsonRequestBehavior.AllowGet);
            //return RedirectToAction("Dashboard_1", "Dashboards");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(AuthModel Auth)
        {
            usr = new TUserClass();
            var res = usr.TUserLogin(Auth).FirstOrDefault();
            //var stat = res.LoginAccept;

            //System.Web.HttpContext.Current.Session["userName"] = Auth.userName;
            if (res.LoginAccept == "OK")
            {
                Session.Add("UserCode", res.UserCode);
                Session.Add("IDUser", res.IDUser);
                Session.Add("Username", res.Username);
                Session.Add("Email", res.Email);
                Session.Add("IDRole", res.IDRole);
                Session.Add("RoleName", res.RoleName);
                Session.Add("IsLoggedOn", "True");
                Session.Add("UserPicture", res.UserPicture);
                Session.Add("IDSite", "1");
                //company
                Session.Add("CompanyName", OptionClass.getOptionsByName("CompanyName"));
                Session.Add("CompanyAddress", OptionClass.getOptionsByName("CompanyAddress"));
                Session.Add("CompanyPhone", OptionClass.getOptionsByName("CompanyPhone"));
                Session.Add("FakturBankAccountNumber", OptionClass.getOptionsByName("FakturBankAccountNumber"));

                //var Permission = usr.SelectAdditionalPermisions(res.IDUser).FirstOrDefault();

                //if (Permission != null)
                //{
                //    Session.Add("AllotToViewCostWO", Permission.AllotToViewCostWO);
                //    Session.Add("AllowAdjusment", Permission.AllowAdjusment);
                //    Session.Add("AllowAssignWO", Permission.AllowAssignWO);
                //    Session.Add("AllowCancelWO", Permission.AllowCancelWO);
                //    Session.Add("AllowCancelWR", Permission.AllowCancelWR);
                //    Session.Add("AllowChangeStatus", Permission.AllowChangeStatus);
                //    Session.Add("AllowCloseWO", Permission.AllowCloseWO);
                //    Session.Add("AllowMaterialIssueFromWO", Permission.AllowMaterialIssueFromWO);
                //    Session.Add("AllowMaterialReturnFromWO", Permission.AllowMaterialReturnFromWO);
                //    Session.Add("AllowPMGeneration", Permission.AllowPMGeneration);
                //    Session.Add("AllowReOpenWO", Permission.AllowReOpenWO);
                //    Session.Add("AllowToApprovedPR", Permission.AllowToApprovedPR);
                //    Session.Add("AllowToCancelPO", Permission.AllowToCancelPO);
                //    Session.Add("AllowToCancelPR", Permission.AllowToCancelPR);
                //    Session.Add("AllowToApprovedPR", Permission.AllowToApprovedPR);
                //    Session.Add("AllowToCreateGRN", Permission.AllowToCreateGRN);
                //    Session.Add("AllowToCreatePO", Permission.AllowToCreatePO);
                //    Session.Add("AllowToCreatePR", Permission.AllowToCreatePR);
                //    Session.Add("AllowToPrintPO", Permission.AllowToPrintPO);
                //    Session.Add("AllowToReopenPO", Permission.AllowToReopenPO);
                //    Session.Add("AllowToReopenPR", Permission.AllowToReopenPR);
                //    Session.Add("AloowToAuthorizedPO", Permission.AloowToAuthorizedPO);
                //    Session.Add("CanViewAssignWOOnly", Permission.CanViewAssignWOOnly);
                //    //add by robby
                //    Session.Add("AllowToChecklistGR", Permission.AllowToChecklistGR);
                //    Session.Add("AllowToClosePO", Permission.AllowToClosePO);
                //    Session.Add("AllowToCloseSO", Permission.AllowToCloseSO);
                //}
                //else
                //{
                //    Session.Add("AllotToViewCostWO", "False");
                //    Session.Add("AllowAdjusment", "False");
                //    Session.Add("AllowAssignWO", "False");
                //    Session.Add("AllowCancelWO", "False");
                //    Session.Add("AllowCancelWR", "False");
                //    Session.Add("AllowChangeStatus", "False");
                //    Session.Add("AllowCloseWO", "False");
                //    Session.Add("AllowMaterialIssueFromWO", "False");
                //    Session.Add("AllowMaterialReturnFromWO", "False");
                //    Session.Add("AllowPMGeneration", "False");
                //    Session.Add("AllowReOpenWO", "False");
                //    Session.Add("AllowToApprovedPR", "False");
                //    Session.Add("AllowToApprovedPR", "False");
                //    Session.Add("AllowToCancelPO", "False");
                //    Session.Add("AllowToCancelPR", "False");
                //    Session.Add("AllowToCreateGRN", "False");
                //    Session.Add("AllowToCreatePO", "False");
                //    Session.Add("AllowToCreatePR", "False");
                //    Session.Add("AllowToPrintPO", "False");
                //    Session.Add("AllowToReopenPO", "False");
                //    Session.Add("AllowToReopenPR", "False");
                //    Session.Add("AloowToAuthorizedPO", "False");
                //    Session.Add("CanViewAssignWOOnly", "False");
                //    Session.Add("AllowToChecklistGR", "False");
                //    Session.Add("AllowToClosePO", "False");
                //    Session.Add("AllowToCloseSO", "False");
                //}

                //Session.Add("IDSite","SIT1500001");
                //return RedirectToAction("Dashboard_1", "Dashboards");
                return Json(new { result = res.IDRole }, JsonRequestBehavior.AllowGet);

            }
            //MessageBox.Show("Invalid username or password");
            else
            {
                //ViewBag.Message = res.msg;
                //return RedirectToAction("Index", "Login");
                //var loginstatus = TranslateMessageClass.TranslateMassage(retu, Resources.Resource.UserLabelUsername);
                var ret = "Err|" + TranslateMessageClass.TranslateMessage(res.msg.Split('|')[0]); ;
                return Json(new { result = ret });

            }
        }
        public ActionResult GetDataSite()
        {


            var res = SiteClass.SiteUserSelectByIDUser(Session["IDUser"].ToString());
            //var ret = NavigationMenu.GenerateModule(mdl);

            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Logout()
        {
            Session.RemoveAll();
            return RedirectToAction("Index", "Login");
        }

      

        public JsonResult CekSession()
        {
            if (Session["UserName"] == null)
            {
                return Json(new { result = "KO" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { result = "OK" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}