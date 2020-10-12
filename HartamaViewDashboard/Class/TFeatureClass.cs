using HartamaViewDashboard.DB;
using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class TFeatureClass
    {
        private Hartama_IOTEntities db = new Hartama_IOTEntities();

        CW_UtilityClass CWU = new CW_UtilityClass();
        List<TFeatureModel> ModelFeature = new List<TFeatureModel>();
        string sql = "";
        int ret = 0;
        public TFeatureClass()
        {


        }

        public List<TFeatureModel> GetDataFeatureByModule(int Start, int Length, string IDModule)
        {
            int TR = 0;
            if (CWU.OpenConnection())
            {

                sql = "SELECT count(*) FROM [dbo].[TModuleFeatures] a,  [dbo].[TFeatures] b join [dbo].[TIcon] c on b.[IDIcon] = c.[IDIcon] where a.[IDFeatures] = b.[IDFeatures] and a.[IDModule] = '" + IDModule + "'";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    TR = Convert.ToInt32(CWU.dtreader[0]);
                }
                CWU.dtreader.Close();
                sql = " SELECT a.[IDModuleFeatures] " +
                      "    ,a.[IDModule] " +
                      "    ,a.[IDFeatures] " +
                      "    ,b.[FeaturesCode] " +
                      "    ,b.[FeaturesName] " +
                      "    ,b.[FeaturesDesc] " +
                      "    ,b.[FeaturesType] " +
                      "    ,b.[FeaturesAction] " +
                      "    ,b.[IsExternal] " +
                      "    ,b.[PathApp] " +
                      "    ,a.[Sequence] " +
                      "    ,g.[Username] " +
                      "    ,a.[DateEntry] " +
                      "    ,h.[Username] " +
                      "    ,a.[DateLastMaintenance] " +
                      "    ,'10' as TotalRecords " +
                      "    ,c.IconName " +
                      "    ,c.IconClass " +
                      "    ,c.IDIcon " +
                      " FROM [dbo].[TModuleFeatures] a left JOIN [dbo].[TUser] g ON a.[UserEntry] = g.[IDUser] left JOIN [dbo].[TUser] h ON a.[UserLastMaintenance] = h.[IDUser],  [dbo].[TFeatures] b " +
                      " join [dbo].[TIcon] c on b.[IDIcon] = c.[IDIcon] " +
                      " where a.[IDFeatures] = b.[IDFeatures] " +
                      "   and a.[IDModule] = '" + IDModule + "' " +
                      " order by " +
                      " b.FeaturesType, a.Sequence OFFSET " + Start + " ROWS   FETCH NEXT " + Length + " ROWS ONLY;";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    var x = new TFeatureModel();

                    x.IDModuleFeatures = CWU.dtreader[0].ToString();
                    x.IDModule = CWU.dtreader[1].ToString();
                    x.IDFeatures = CWU.dtreader[2].ToString();
                    x.FeaturesCode = CWU.dtreader[3].ToString();
                    x.FeaturesName = CWU.dtreader[4].ToString();
                    x.FeaturesDesc = CWU.dtreader[5].ToString();
                    x.FeaturesType = CWU.dtreader[6].ToString();
                    x.FeaturesAction = CWU.dtreader[7].ToString();
                    x.IsExternal = Convert.ToBoolean(CWU.dtreader[8].ToString());
                    x.PathApp = CWU.dtreader[9].ToString();
                    x.Sequence = Convert.ToInt16(CWU.dtreader[10].ToString());
                    x.UserEntry = CWU.dtreader[11].ToString();
                    x.DateEntry = CWU.dtreader[12].ToString();
                    x.UserLastMaintenance = CWU.dtreader[13].ToString();
                    x.DateLastMaintenance = CWU.dtreader[14].ToString();
                    x.TotalRecord = Convert.ToInt32(CWU.dtreader[15]);
                    x.IconName = CWU.dtreader[16].ToString();
                    x.IconClass = CWU.dtreader[17].ToString();
                    x.IDIcon = CWU.dtreader[18].ToString();
                    ModelFeature.Add(x);
                }
            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return ModelFeature;
        }

        public String FeatureInsert(TFeatureModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTFeatureInsert(
                    mdl.IDModule,
                    mdl.FeaturesCode,
                    mdl.FeaturesName,
                    mdl.FeaturesDesc,
                    mdl.FeaturesType,
                    mdl.FeaturesAction,
                    mdl.IsExternal,
                    mdl.PathApp,
                    mdl.UserEntry,
                    Convert.ToDateTime(mdl.DateEntry),
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance),
                    mdl.IDIcon
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.FeatureLabelFeature, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.InnerException.Message;
            }

        }

        public String FeatureUpdate(TFeatureModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTFeatureUpdate(
                    mdl.IDFeatures,
                    mdl.FeaturesCode,
                    mdl.FeaturesName,
                    mdl.FeaturesDesc,
                    mdl.FeaturesType,
                    mdl.FeaturesAction,
                    mdl.IsExternal,
                    mdl.PathApp,
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance),
                    mdl.IDIcon
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.FeatureLabelFeature, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.InnerException.Message;
            }
        }


        public String FeatureDelete(TFeatureModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTFeatureDelete(
                    mdl.IDModule,
                    mdl.IDFeatures,
                    mdl.UserLastMaintenance,
                   Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    ret = res.Pesan;
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.Message;
            }

        }

        public String FeatureMove(string IDModule, string IDFeatures, TFeatureModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTFeatureMove(
                    IDFeatures,
                    IDModule,
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.FeatureLabelFeature, retSplit[1]);
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.InnerException.Message;
            }

        }

        public String FeatureDuplicate(TFeatureModel mdl)
        {
            try
            {

                string ret = "";
                var res = db.PTFeatureDuplicate(
                    mdl.IDModule,
                    mdl.IDFeatures,
                    mdl.UserEntry,
                    Convert.ToDateTime(mdl.DateEntry),
                    mdl.UserLastMaintenance,
                    Convert.ToDateTime(mdl.DateLastMaintenance)
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.FeatureLabelFeature, retSplit[1]);
                    //ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.InnerException.Message;
            }

        }
        public String FeatureUpdateSequence(TFeatureModel mdl, string Dir)
        {
            try
            {

                string ret = "";
                var res = db.PTFeatureUpdateSequence(
                    mdl.IDModule,
                    mdl.IDFeatures,
                    Dir,
                    mdl.FeaturesType
                    ).FirstOrDefault();
                if (res.Error == 0 || res.Error == null)
                {
                    var retSplit = res.Pesan.Split('|');
                    ret = TranslateMessageClass.TranslateMessage(retSplit[0], Resources.Resource.FeatureLabelFeature, retSplit[1]);
                    ret = "1";
                }
                else
                {
                    ret = "Err|" + res.Pesan;
                    ret = "0";
                }
                return ret;
            }
            catch (Exception err)
            {
                return "Err|" + err.InnerException.Message;
            }

        }

        public List<PTFeatureSelectByID_Result> FeatureSelectByID(string IDFeature)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTFeatureSelectByID(IDFeature).ToList();
            return res;
        }

        public List<PTFeatureSelectByIDModule_Result> FeatureSelectByIDModule(string IDModule)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTFeatureSelectByIDModule(IDModule).ToList();
            return res;
        }

        public List<PTFeatureSelectByIDFeatureIDModule_Result> FeatureSelectByIDFeatureIDModule(string IDFeature, string IDModule)
        {
            db = new Hartama_IOTEntities();
            var res = db.PTFeatureSelectByIDFeatureIDModule(IDFeature, IDModule).ToList();
            return res;
        }
    }
}