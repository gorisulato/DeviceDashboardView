using HartamaViewDashboard.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class PSensorParameterClass
    {
        Hartama_IOTEntities db;
        public List<GETSENSORDetail_Result> GetSensorList(string id)
        {
            db = new Hartama_IOTEntities();
            var res = db.GETSENSORDetail(id).ToList();
            return res;

        }
    }
}