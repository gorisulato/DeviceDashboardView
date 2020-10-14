var PDevice = new function () {

    this.init = function () {
        PDevice.InitCategoryTable();
        PDevice.InitSiteTable();
        PDevice.initTableDevices();
        $("#DeviceInformation").hide()


        $("#btnAddDevice").on('click', function () {

            $("#DeviceInformation").show()
            $("#userinfo").hide();
            $("#Form-Device #btnDeleteRowsite").hide()
            $("#Form-Device").attr("action", "/Device/Create");
            $("#Form-Device").attr("xxx", "Create");
            $("#btnAddDevice").hide()
        })

        $("#Form-Device #btnCancelRowsite").on('click', function () {

            PDevice.cleartxt();
            $("#DeviceInformation").hide()
            $("#userinfo").hide();
            $("#btnAddDevice").show()

        })

        $("#Form-Device #btnDeleteRowsite").click(function () {

            if ($("#Form-Device").valid()) {
                $("#Form-Device").attr("action", "/Device/Delete");
                $("#Form-Device").attr("xxx", "Delete");
                utility.CRUDCW("Form-Device", "DEVICEDEVICE", "deviceMessage");
                PDevice.cleartxt();
                $("#DeviceInformation").hide()
                $("#userinfo").hide();
                $("#btnAddDevice").show()
            }
        })

        $("#Form-Device #btnSaveRowsite").click(function () {

            if ($("#Form-Device").valid()) {

                utility.CRUDCW("Form-Device", "DEVICEDEVICE", "deviceMessage");
                PDevice.cleartxt();
                $("#DeviceInformation").hide()
                $("#userinfo").hide();
                $("#DeviceInformation").hide()
                $("#userinfo").hide();
                $("#btnAddDevice").show()

                
            }
        })


        $("#btn-cat-search").on('click', function () {

            $("#ModalDataCategory").show();
        })
        $("#CloseModalCategory").on('click', function () {
            $("#ModalDataCategory").hide();
        })

        $('#t-Category-Device').on('click', 'tbody tr', function () {

            $("#Form-Device #Device_category_ID").val($(this).attr('IDCategory'))
            $("#Form-Device #DeviceCategory").val($(this).find('td:eq(0)').text());
            $("#ModalDataCategory").hide();
        




        });

        $("#frm-btn-site").on('click', function () {

            $("#ModalDataSite").show();
        })
        $("#CloseModalSite").on('click', function () {
            $("#ModalDataSite").hide();
        })

        

        $('#t-Site-Device').on('click', 'tbody tr', function () {

            $("#Form-Device #Device_Site_ID").val($(this).attr('IDSite'))
            $("#Form-Device #DeviceSite").val($(this).find('td:eq(0)').text());
            $("#ModalDataSite").hide();





        });

        $('#DEVICEDEVICE').on('dblclick', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                $("#btnAddDevice").hide()
                $("#Form-Device #btnDeleteRowsite").show()
                $("#Form-Device #Device_ID").val($(this).attr("IDDevice"));
                $("#Form-Device #Device_Site_ID").val($(this).attr("IDSite"));
                $("#Form-Device #Device_category_ID").val($(this).attr("IDCategory"));
                $("#Form-Device #UserEntry").val($(this).attr("userentry"));
                $("#Form-Device #DateEntry").val($(this).attr("dateentry"));
                $("#Form-Device #UserLastMaintenance").val($(this).attr("usermaintenance"));
                $("#Form-Device #DateLastMaintenance").val($(this).attr("datemaintenance"));

                $("#Form-Device #Device_Name").val($(this).find('td:eq(0)').text());
                $("#Form-Device #DeviceCategory").val($(this).find('td:eq(2)').text());
                $("#Form-Device #DeviceSite").val($(this).find('td:eq(1)').text());
                $("#Form-Device #MacAddress1").val($(this).find('td:eq(4)').text());
                $("#Form-Device #MacAddress2").val($(this).find('td:eq(5)').text());
                $("#Form-Device #MacAddress3").val($(this).find('td:eq(6)').text());
                $("#Form-Device #Device_Description").val($(this).find('td:eq(3)').text());

                $("#DeviceInformation").show();
                $("#userinfo").show();
                // PBank.removehide();
                $("#Form-Device").attr("action", "/Device/Edit");
                $("#Form-Device").attr("xxx", "Edit");




            }
            else {
                $("#btnAddDevice").hide()
                $("#Form-Device #btnDeleteRowsite").show()
                $("#Form-Device #Device_ID").val($(this).attr("IDDevice"));
                $("#Form-Device #Device_Site_ID").val($(this).attr("IDSite"));
                $("#Form-Device #Device_category_ID").val($(this).attr("IDCategory"));
                $("#Form-Device #UserEntry").val($(this).attr("userentry"));
                $("#Form-Device #DateEntry").val($(this).attr("dateentry"));
                $("#Form-Device #UserLastMaintenance").val($(this).attr("usermaintenance"));
                $("#Form-Device #DateLastMaintenance").val($(this).attr("datemaintenance"));

                $("#Form-Device #Device_Name").val($(this).find('td:eq(0)').text());
                $("#Form-Device #DeviceCategory").val($(this).find('td:eq(2)').text());
                $("#Form-Device #DeviceSite").val($(this).find('td:eq(1)').text());
                $("#Form-Device #MacAddress1").val($(this).find('td:eq(4)').text());
                $("#Form-Device #MacAddress2").val($(this).find('td:eq(5)').text());
                $("#Form-Device #MacAddress3").val($(this).find('td:eq(6)').text());
                $("#Form-Device #Device_Description").val($(this).find('td:eq(3)').text());

                $("#DeviceInformation").show();
                $("#userinfo").show();
                // PBank.removehide();
                $("#Form-Device").attr("action", "/Device/Edit");
                $("#Form-Device").attr("xxx", "Edit");

            }
        });
        $('#DEVICEDEVICE').on('click', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {




            }
            else {
                $("#DEVICEDEVICE tr.row_selected").removeClass('row_selected');
                //$(this).removeClass('row_selected');
                $(this).addClass('row_selected');

            }
        });
    }

    this.cleartxt = function () {
        $("#Form-Device #Device_ID").val("");
        $("#Form-Device #Device_Site_ID").val("");
        $("#Form-Device #Device_category_ID").val("");
        $("#Form-Device #UserEntry").val("");
        $("#Form-Device #DateEntry").val("");
        $("#Form-Device #UserLastMaintenance").val("");
        $("#Form-Device #DateLastMaintenance").val("");

        $("#Form-Device #Device_Name").val("");
        $("#Form-Device #DeviceCategory").val("");
        $("#Form-Device #DeviceSite").val("");
        $("#Form-Device #MacAddress1").val("");
        $("#Form-Device #MacAddress2").val("");
        $("#Form-Device #MacAddress3").val("");
        $("#Form-Device #Device_Description").val("");
    }

    this.InitCategoryTable = function () {

   
            if (!$.fn.DataTable.isDataTable('#t-Category-Device')) {
                var table = $('#t-Category-Device').dataTable({
                    "dom": 'r<"table-responsive responsive"t><"bottom"<"col-sm-6"i><"col-sm-6"p>><"clear">',
                    "processing": false,
                    "ordering": false,
                    "serverSide": true,
                    "scrollCollapse": true,
                    "scrollX": false,
                    "autoWidth": false,
                    "ordering": false,
                    "pageLength": 5,
                    "ajax": {
                        "type": "post",
                        "url": "../Device/GetCategoryOfDevices",
                        "data": function (d) {
                            d.keyword = $("#keywordmodalcategory").val()


                        }
                    },
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        $(nRow).attr("IDCategory", aData[2]);
                        return nRow;

                    },

                    "fnDrawCallback": function (oSettings, json) {
                        //$('#t-Category-Device tbody tr:eq(0)').click();
                    },

                    "fnInitComplete": function (oSettings, json) {
                        // $('#t-Category-Device tbody tr:eq(0)').click();
                    },



                });
            }
            else {
                $('#t-Category-Device').DataTable().draw();
            }
        
    }


    this.InitSiteTable = function () {


        if (!$.fn.DataTable.isDataTable('#t-Site-Device')) {
            var table = $('#t-Site-Device').dataTable({
                "dom": 'r<"table-responsive responsive"t><"bottom"<"col-sm-6"i><"col-sm-6"p>><"clear">',
                "processing": false,
                "ordering": false,
                "serverSide": true,
                "scrollCollapse": true,
                "scrollX": false,
                "autoWidth": false,
                "ordering": false,
                "pageLength": 5,
                "ajax": {
                    "type": "post",
                    "url": "../Device/GetSite",
                    "data": function (d) {
                        d.keyword = $("#keywordmodalsite").val()


                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IDSite", aData[2]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('#t-Site-Device tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#t-Site-Device tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#t-Site-Device').DataTable().draw();
        }

    }

    this.initTableDevices = function () {
        console.log('masuk')
        if (!$.fn.DataTable.isDataTable('#DEVICEDEVICE')) {
            var table = $('#DEVICEDEVICE').dataTable({
                "dom": 'r<"table-responsive responsive"t><"bottom"<"col-sm-6"i><"col-sm-6"p>><"clear">',
                "processing": false,
                "ordering": false,
                "serverSide": true,
                "scrollCollapse": true,
                "scrollX": false,
                "autoWidth": false,
                "ordering": false,
                "pageLength": 5,
                "ajax": {
                    "type": "post",
                    "url": "../Device/GetRegisteredDevice",
                    "data": function (d) {
                        
                        d.keyword=""

                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IDDevice", aData[7]);
                    $(nRow).attr("IDSite", aData[8]);
                    $(nRow).attr("IDCategory", aData[9]);
                    $(nRow).attr("userentry", aData[10]);
                    $(nRow).attr("dateentry", aData[11]);
                    $(nRow).attr("usermaintenance", aData[12]);
                    $(nRow).attr("datemaintenance", aData[13]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('DEVICEDEVICE tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('DEVICEDEVICE tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#DEVICEDEVICE').DataTable().draw();
        }

    }
}