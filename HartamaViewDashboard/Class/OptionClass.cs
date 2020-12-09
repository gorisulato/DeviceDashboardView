using HartamaViewDashboard.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HartamaViewDashboard.Class
{
    public class OptionClass
    {
        CW_UtilityClass CWU = new CW_UtilityClass();
        List<OptionModel> ModelOption = new List<OptionModel>();



        string sql = "";
        string ret = "";
        int sqlaffectedrows = 0;
        #region "Option"
        //public string InsertOption(OptionModel mdl)
        //{
        //    if (CWU.OpenConnection())
        //    {
        //        CWU.command.Connection = CWU.connection;
        //        CWU.command.CommandType = System.Data.CommandType.Text;
        //        CWU.command.CommandText =
        //                " DECLARE " +
        //                " @MODUL nvarchar (3)," +
        //                " @SPREFIX nvarchar (10)," +
        //                " @NPANJANG INTEGER," +
        //                " @NOMORSERI nvarchar (15)," +
        //                " @Return nvarchar(MAX)," +
        //                " @ErrorNumber INTEGER," +
        //                " @encrypt varbinary(200) , " +
        //                " @passkey nvarchar (200);" +
        //                " SET @MODUL = 'SRT' " +
        //                " SET @SPREFIX = 'SRT' + RIGHT(CONVERT(nvarchar(4),YEAR(GETDATE()) ),2) + '/' + UPPER(convert(char(3), GETDATE(), 0)) + '/'" +
        //                " SET @NPANJANG = 15" +
        //                " SET @NOMORSERI = ''" +
        //                " EXEC [dbo].P_NumberSeri" +
        //                " @MODUL ," +
        //                " @SPREFIX  ," +
        //                " @NPANJANG ," +
        //                " @NOMORSERI OUTPUT ;" +
        //                " INSERT INTO TOption " +
        //                " (ReturnCode , ReturnDate             , PDivisionCode             , PCustomerCode              ,PCurrencyCode              ,Rate              ,Tax ,PSalesmanCode             ,VATType              ,VATPercentage              ,Discount1              ,Discount2              ,Discount3,InvoiceNo,TaxInvoiceNo, Description , UserEntry , DateEntry ,VATAccountCode) values " +
        //                " (@NOMORSERI ,convert(datetime,'" + mdl.ReturnDate + "',103),'" + mdl.PDivisionCode + "','" + mdl.PCustomerCode + "' ,'" + mdl.PCurrencyCode + "','" + mdl.Rate + "','" + mdl.Tax + "','" + mdl.PSalesmanCode + "','" + mdl.VATType + "','" + mdl.VATPercentage + "','" + mdl.Discount1 + "','" + mdl.Discount2 + "','" + mdl.Discount3 + "','" + mdl.InvoiceNo + "','" + mdl.TaxInvoiceNo + "','" + mdl.Description + "' , '" + mdl.UserEntry + "' , sysdatetime() ,'" + mdl.VATAccountCode + "')";
        //        try
        //        {
        //            sqlaffectedrows = CWU.command.ExecuteNonQuery();
        //            ret = sqlaffectedrows.ToString();
        //        }
        //        catch (SqlException e)
        //        {
        //            ret = e.Message.ToString();
        //        }
        //        finally
        //        {
        //            CWU.command.Connection.Close();
        //        }
        //    }
        //    return ret;
        //}
        public string UpdateOption(OptionModel mdl)
        {
            if (CWU.OpenConnection())
            {
                CWU.command.Connection = CWU.connection;
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = "UPDATE Options set OptionsName = '" + mdl.OptionsName + "' , " +
                                            " OptionsValue = '" + mdl.OptionsValue + "' " +
                                            " where OptionsID = '" + mdl.OptionsID + "'";
                try
                {
                    sqlaffectedrows = CWU.command.ExecuteNonQuery();
                    ret = sqlaffectedrows.ToString();
                }
                catch (SqlException e)
                {
                    ret = e.Message.ToString();
                }
                finally
                {
                    CWU.command.Connection.Close();
                }
            }
            return ret;
        }
        //public string DeleteOption(OptionModel mdl)
        //{
        //    if (CWU.OpenConnection())
        //    {
        //        CWU.command.Connection = CWU.connection;
        //        CWU.command.CommandType = System.Data.CommandType.Text;
        //        CWU.command.CommandText = "Delete TOption where TOptionID = '" + mdl.TOptionID + "'";
        //        try
        //        {
        //            sqlaffectedrows = CWU.command.ExecuteNonQuery();
        //            ret = sqlaffectedrows.ToString();
        //        }
        //        catch (SqlException e)
        //        {
        //            ret = e.Message.ToString();
        //        }
        //        finally
        //        {
        //            CWU.command.Connection.Close();
        //        }
        //    }
        //    return ret;
        //}
        public List<OptionModel> OptionSelect(int Start, int Length)
        {
            int TR = 0;

            if (CWU.OpenConnection())
            {

                sql = "select count(*) from Options as a where 1=1";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();

                while (CWU.dtreader.Read())
                {
                    TR = Convert.ToInt32(CWU.dtreader[0]);
                }
                CWU.dtreader.Close();


                sql = " SELECT " +
    "a.OptionsID," +
    "a.OptionsName," +
    "a.OptionsValue, '" + TR + "' FROM dbo.Options AS a " +
    " where 1=1" +
    " order by OptionsID  ASC OFFSET " + Start + " ROWS   FETCH NEXT " + Length + " ROWS ONLY;";



                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    var WM = new OptionModel();
                    WM.OptionsID = CWU.dtreader[0].ToString();
                    WM.OptionsName = CWU.dtreader[1].ToString();
                    WM.OptionsValue = CWU.dtreader[2].ToString();
                    WM.TotalRecords = Convert.ToInt32(CWU.dtreader[3]);
                    ModelOption.Add(WM);
                }
            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return ModelOption;
        }
        public List<OptionModel> OptionSelectbyid(string id)
        {
            int TR = 0;
            string _filterno = "";



            if (id != "")
            {
                _filterno = " AND a.OptionsID ='" + id + "'";
            }



            if (CWU.OpenConnection())
            {

                sql = " SELECT " +
    " a.OptionsID," +
    " a.OptionsName," +
    " a.OptionsValue , '" + TR + "' FROM dbo.Options AS a " +
    " where 1=1" + _filterno +
    " order by OptionsID  ASC";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    var WM = new OptionModel();
                    WM.OptionsID = CWU.dtreader[0].ToString();
                    WM.OptionsName = CWU.dtreader[1].ToString();
                    WM.OptionsValue = CWU.dtreader[2].ToString();
                    WM.TotalRecords = Convert.ToInt32(CWU.dtreader[3]);
                    ModelOption.Add(WM);
                }
            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return ModelOption;
        }
        #endregion
        public string getOptionsByName(string _OptionName)
        {
            string _value = "";
            if (CWU.OpenConnection())
            {

                sql = " SELECT " +
                    " a.OptionsValue " +
                    " From dbo.Options a " +
                " where a.optionsName  = '" + _OptionName + "'";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    _value = CWU.dtreader[0].ToString();
                }
            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return _value;
        }

        public string getOptionsByName2(string[] _OptionName)
        {
            string _value = "";
            if (CWU.OpenConnection())
            {

                sql = " SELECT " +
                    " a.OptionsValue " +
                    " From dbo.Options a " +
                " where a.optionsName  = '" + _OptionName + "'";
                CWU.command.CommandType = System.Data.CommandType.Text;
                CWU.command.CommandText = sql;
                CWU.command.Connection = CWU.connection;
                CWU.dtreader = CWU.command.ExecuteReader();
                while (CWU.dtreader.Read())
                {
                    _value = CWU.dtreader[0].ToString();
                }
            }
            CWU.dtreader.Close();
            CWU.command.Connection.Close();
            return _value;
        }
    }
}