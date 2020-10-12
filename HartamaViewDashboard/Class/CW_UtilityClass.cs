using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class CW_UtilityClass
    {
        public SqlCommand command = new SqlCommand();
        public SqlConnection connection = new SqlConnection();
        public SqlDataReader dtreader;
        public SqlDataAdapter DA;
        public string _connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public SqlParameter param = new SqlParameter();
        public Boolean conn;
        public SqlDependency commanddependency;
        public Boolean OpenConnection()
        {
            if (!conn)
            {
                if (connection.State == ConnectionState.Open) { connection.Close(); }
                connection.ConnectionString = _connString;
                connection.Open();
                conn = true;
            }
            else
            {
                connection.Close();
                connection.ConnectionString = _connString;
                connection.Open();
                conn = true;
            }
            return conn;
        }

        public void CloseConnection()
        {
            if (conn)
            {
                connection.Close();

            }
        }

        public DataTable ToDataTable<T>(List<T> items)
        {

            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties

            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (PropertyInfo prop in Props)
            {

                //Setting column names as Property names

                dataTable.Columns.Add(prop.Name);

            }

            foreach (T item in items)
            {

                var values = new object[Props.Length];

                for (int i = 0; i < Props.Length; i++)
                {

                    //inserting property values to datatable rows

                    values[i] = Props[i].GetValue(item, null);

                }

                dataTable.Rows.Add(values);

            }

            //put a breakpoint here and check datatable

            return dataTable;

        }

        public string Excerpt(string longString, int delimiter = 30)
        {
            string shortened = ""; int i = 0;
            if (String.IsNullOrEmpty(longString) == false)
            {
                if (longString.Length > delimiter)
                {
                    foreach (var c in longString)
                    {
                        if (i < delimiter) shortened += c;
                        if (i == delimiter) shortened += "...";
                        i++;
                    }
                }
                else
                {
                    return longString;
                }
            }
            return shortened;
        }
    }
}