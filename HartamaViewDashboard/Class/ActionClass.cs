using HartamaViewDashboard.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class ActionClass
    {
        Hartama_IOTEntities db=new Hartama_IOTEntities();
        public List<GetActionByDeviceID_Result> GetActionByDevice(string DeviceID)
        {
            var res = db.GetActionByDeviceID(DeviceID).ToList();
            return res;
        }
    }
}