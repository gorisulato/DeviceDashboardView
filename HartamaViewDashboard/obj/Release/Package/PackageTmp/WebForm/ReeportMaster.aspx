<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReeportMaster.aspx.cs" Inherits="HartamaViewDashboard.WebForm.ReeportMaster" %>


<%@ Register assembly="CrystalDecisions.Web, Version=13.0.4000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" namespace="CrystalDecisions.Web" tagprefix="CR" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <CR:CrystalReportViewer ID="CRVMaster" runat="server" AutoDataBind="true" EnableDatabaseLogonPrompt="False" EnableDrillDown="False" HasDrilldownTabs="False" HasDrillUpButton="False" OnInit="CRVMaster_Init" ToolPanelView="None" />
    
    </div>
    </form>
</body>
</html>
