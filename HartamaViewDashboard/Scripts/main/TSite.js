var TSite = new function () {
    this.init = function (param) {
        $("#SiteInformation").hide();
        var table = $('#SITESITE').dataTable({
            "dom": 't<"col-sm-6"i><"col-sm-6"p>',
            "processing": true,
            "serverSide": true,
            "scrollX": false,
            "autoWidth": false,
            "iDisplayLength": 10,
            "scrollX": true,
            //"ordering": false,

            "ajax": {
                "type": "Post",
                "url": "../TSite/GetDataSite",
                "data": function (d) {
                    d.keyword = "",
                    d.discontinue = false
                }
            },

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $(nRow).attr("UserEntry", aData[4]);
                $(nRow).attr("DateEntry", aData[5]);
                $(nRow).attr("UserLastM", aData[6]);
                $(nRow).attr("DateLastM", aData[7]);
                $(nRow).attr("ID", aData[8]);
                return nRow;
            },
            "fnDrawCallback": function (oSettings, json) {
                $('#SITESITE tbody tr:eq(0)').click();
            },

            "fnInitComplete": function (oSettings, json) {
                // $("#TDepartment").focus();
                $('#SITESITE tbody tr:eq(0)').click();
            },
            "language": {
                "zeroRecords": param.attribute.ZeroResult,
                "info": param.attribute.Info + " _START_ " + param.attribute.To + " _END_ " + param.attribute.Of + " _TOTAL_ " + param.attribute.Entries,
                "infoEmpty": param.attribute.InfoEmpty,
                "paginate": {
                    "previous": param.attribute.Previous,
                    "next": param.attribute.Next,
                    "last": param.attribute.Last,
                    "first": param.attribute.First,

                }
            }
        });

        $("#Form-Site #btnSaveRowsite").click(function () {

            if ($("#Form-Site").valid()) {

                utility.CRUDCW("Form-Site", "SITESITE", "SiteMessage");
                TSite.clearField();
                TSite.cancelhide();
            }
        })

        $("#Form-Site #btnDeleteRowsite").click(function () {

            if ($("#Form-Site").valid()) {
                $("#Form-Site").attr("action", "/TSite/Delete");
                $("#Form-Site").attr("xxx", "Delete");
                utility.CRUDCW("Form-Site", "SITESITE", "SiteMessage");
                TSite.clearField();
                TSite.cancelhide();
            }
        })

        $("#btnSiteAddRow").on('click', function () {
            $("#Form-Site #DiscontinueSite").change();
            $("#SiteInformation").show();
            TSite.clearField();
            TSite.addhide();
            $("#Form-Site").attr("action", "/TSite/Create");
            $("#Form-Site").attr("xxx", "Create");
           

        });
        $("#Form-Site #btnCancelRowsite").on('click', function () {
            TSite.clearField();
            TSite.cancelhide();

        });



        $('#SITESITE').on('dblclick', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                $("#Form-Site #IDSite").val($(this).attr("ID"));
                $("#SiteInformation").show();
                TSite.showentry();
                TSite.calldatabyID();
               // PBank.removehide();
                $("#Form-Site").attr("action", "/TSite/Edit");
                $("#Form-Site").attr("xxx", "Edit");




            }
            else {
                $("#Form-Site #IDSite").val($(this).attr("ID"));
                $("#SiteInformation").show();
                TSite.showentry();
                TSite.calldatabyID();
                // PBank.removehide();
                $("#Form-Site").attr("action", "/TSite/Edit");
                $("#Form-Site").attr("xxx", "Edit");

            }
        });
        $('#SITESITE').on('click', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {




            }
            else {
                table.$('tr.row_selected').removeClass('row_selected');
                $(this).addClass('row_selected');

            }
        });
        $("#Form-Site #DiscontinueSite").on('change', function () {

            if ($("#Form-Site #DiscontinueSite").val() == "1") {

                $("#Form-Site #Discontinue").val(true);
            }
            else {
                $("#Form-Site #Discontinue").val(false);
            }

        });
    }

    this.calldatabyID = function () {
        $.ajax({
            url: "../TSite/GetSiteByID?idSite= " + $("#Form-Site #IDSite").val(),
            type: "GET",
            success: function (Data) {
                // console.log(Data.Data[0])
                ////console.log(Data)
                var ret = Data.Data[0];

                $("#Form-Site #IDSite").val(ret['IDSite']);
                $('#Form-Site #SiteName').val(ret['SiteName']);
                $('#Form-Site #Address').val(ret['Address']);
                $('#Form-Site #PostCode').val(ret['PostCode']);
                $("#Form-Site #TelephoneNo").val(ret['TelephoneNo']);
                $("#Form-Site #FaxNo").val(ret['FaxNo']);
                $("#Form-Site #Email").val(ret['Email']);
                $("#Form-Site #PICSite").val(ret['PICSite']);
                if (ret['Discontinue'] == true) {

                    $("#Form-Site #DiscontinueSite").val("1");
                    $("#Form-Site #Discontinue").val(true);
                }
                else {
                    $("#Form-Site #DiscontinueSite").val("2");
                    $("#Form-Site #Discontinue").val(false);
                }
              //  $("#Form-Site #Discontinue").val(true);
            
                $("#Form-Site #UserEntry").val(ret['UserEntry']);
                $("#Form-Site #DateEntry").val(ret['DateEntry']);
                $("#Form-Site #UserLastMaintenance").val(ret['UserLastMaintenance']);
                if (ret['DateLastMaintenance'] == "1900-01-01") {

                    $("#Form-Site #DateLastMaintenance").val('');
                }
                else {
                    $("#Form-Site #DateLastMaintenance").val(ret['DateLastMaintenance']);
                }
                
               
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
            }
        });
    }

    this.cancelhide = function () {
        $("#SiteInformation").hide();
    }
    this.addhide = function () {
        $("#Form-Site #btnDeleteRowsite").hide();
        $("#Form-Site #divuserentrysite").hide();
        $("#Form-Site #divdateentrysite").hide();
        $("#Form-Site #divuserlastmaintenancesite").hide();
        $("#Form-Site #divdatelastmaintenancesite").hide();
    }
    this.showentry = function () {
        $("#Form-Site #divuserentrysite").show();
        $("#Form-Site #divdateentrysite").show();
        $("#Form-Site #divuserlastmaintenancesite").show();
        $("#Form-Site #divdatelastmaintenancesite").show();
    }
    this.clearField = function () {
        $("#Form-Site #IDSite").val('');
        $('#Form-Site #SiteName').val('');
        $('#Form-Site #Address').val('');
        $('#Form-Site #PostCode').val('');
        $("#Form-Site #TelephoneNo").val('');
        $("#Form-Site #FaxNo").val('');
        $("#Form-Site #Email").val('');
        $("#Form-Site #PICSite").val(''); 
        $("#Form-Site #DiscontinueSite").val("2");
        $("#Form-Site #UserEntry").val('');
        $("#Form-Site #DateEntry").val('');
        $("#Form-Site #UserLastMaintenance").val('');
        $("#Form-Site #DateLastMaintenance").val('');
    }
   

}