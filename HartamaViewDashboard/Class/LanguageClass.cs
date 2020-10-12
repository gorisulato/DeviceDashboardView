using HartamaViewDashboard.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class LanguageClass
    {
        DB.Hartama_IOTEntities db = new Hartama_IOTEntities();

        public List<PTLanguageSelectAll_Result> LanguageSelectAll()
        {
            var result = db.PTLanguageSelectAll().ToList();
            return result;
        }
        public List<PTLanguageSelectByID_Result> LanguageSelectByID(string id)
        {
            var result = db.PTLanguageSelectByID(id).ToList();
            return result;
        }
        public List<PTFeatureLanguageSelect_Result> FeaturesLanguageSelectByKeyword(string IDLanguage, string keyword, string orderby, string direction, int limit, int offset)
        {
            var res = db.PTFeatureLanguageSelect(IDLanguage, keyword, orderby, direction, limit, offset).ToList();
            return res;

        }
        public List<PTModuleLanguageSelect_Result> ModuleLanguageSelectByKeyword(string IDLanguage, string keyword, string orderby, string direction, int limit, int offset)
        {
            var res = db.PTModuleLanguageSelect(IDLanguage, keyword, orderby, direction, limit, offset).ToList();
            return res;

        }
        public List<PTShortcutLanguageSelect_Result> ShortcutLanguageSelectByKeyword(string IDLanguage, string keyword, string orderby, string direction, int limit, int offset)
        {
            var res = db.PTShortcutLanguageSelect(IDLanguage, keyword, orderby, direction, limit, offset).ToList();
            return res;

        }

        //public String FeaturesLanguageUpdate(FeaturesLanguageModel mdl)
        //{
        //    try
        //    {

        //        string ret = "";
        //        var res = db.PTFeaturesLanguageEdit(
        //            mdl.IDLanguage,
        //            mdl.IDFeatures,
        //            mdl.LanguageText,
        //            mdl.Action,
        //            mdl.UserEntry,
        //            mdl.DateEntry,
        //            mdl.UserLastMaintenance,
        //            mdl.DateLastMaintenance
        //            ).FirstOrDefault();
        //        if (res.Error == 0 || res.Error == null)
        //        {
        //            var retSplit = res.Pesan.Split('|');
        //            ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LanguageLabelLanguageText, retSplit[1]);

        //        }
        //        else
        //        {
        //            ret = "Err|" + res.Pesan;
        //        }
        //        return ret;
        //    }
        //    catch (Exception err)
        //    {
        //        return "Err|" + err.InnerException.Message;
        //    }

        //}

        //public String ModuleLanguageUpdate(TModuleLanguageModel mdl)
        //{
        //    try
        //    {

        //        string ret = "";
        //        var res = db.PTModuleLanguageEdit(
        //            mdl.IDLanguage,
        //            mdl.IDModule,
        //            mdl.LanguageText,
        //            mdl.Action,
        //            mdl.UserEntry,
        //            mdl.DateEntry,
        //            mdl.UserLastMaintenance,
        //            mdl.DateLastMaintenance
        //            ).FirstOrDefault();
        //        if (res.Error == 0 || res.Error == null)
        //        {
        //            var retSplit = res.Pesan.Split('|');
        //            ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LanguageLabelLanguageText, retSplit[1]);

        //        }
        //        else
        //        {
        //            ret = "Err|" + res.Pesan;
        //        }
        //        return ret;
        //    }
        //    catch (Exception err)
        //    {
        //        return "Err|" + err.InnerException.Message;
        //    }

        //}

        //public string shortcutlanguageupdate(ShortcutLanguageModel mdl)
        //{
        //    try
        //    {

        //        string ret = "";
        //        var res = db.PTShortcutLanguageEdit(
        //            mdl.IDLanguage,
        //           mdl.IDShortcut,
        //            mdl.ShortcutName,
        //            mdl.ShortcutInfo,
        //            mdl.Action,
        //            mdl.UserEntry,
        //           mdl.DateEntry,
        //            mdl.UserLastMaintenance,
        //            mdl.DateLastMaintenance
        //            ).FirstOrDefault();
        //        if (res.Error == 0 || res.Error == null)
        //        {
        //            var retSplit = res.Pesan.Split('|');
        //            ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.LanguageLabelLanguageText, retSplit[1]);

        //        }
        //        else
        //        {
        //            ret = "err|" + res.Pesan;
        //        }
        //        return ret;
        //    }
        //    catch (Exception err)
        //    {
        //        return "Err|" + err.InnerException.Message;
        //    }

        //}
    }
}