using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class ConvertClass
    {
        public string convert_date(DateTime? value)
        {
            string returndate = "";

            var CUI = HttpContext.Current.Session["CurrentUICulture"].ToString();

            returndate = value.HasValue ? value.Value.ToString(CultureInfo.CreateSpecificCulture(CUI).DateTimeFormat) : string.Empty;

            return returndate;
        }

        //public string convert_string_to_date(String value)
        //{
        //    string returndate = "";

        //    var CUI = HttpContext.Current.Session["CurrentUICulture"].ToString();

        //    returndate = value.HasValue ? value.Value.ToString(CultureInfo.CreateSpecificCulture(CUI).DateTimeFormat) : string.Empty;

        //    return returndate;
        //}

        public string convert_numeric(decimal? value)
        {
            string returnvalue = "";

            var CUI = HttpContext.Current.Session["CurrentUICulture"].ToString();

            returnvalue = value.HasValue ? value.Value.ToString("N", CultureInfo.CreateSpecificCulture(CUI)) : string.Empty;

            return returnvalue;
        }
    }
}