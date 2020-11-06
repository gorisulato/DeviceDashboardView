var PSensor = new function () {
    
    this.init = function () {

        PSensor.initSensorTable("");
        PSensor.InitCategoryTable();
        PSensor.InitMainTable();
        $("#sensorparamInformation").hide()
        

        $("#btnSaveRowsensorparam").on('click', function () {
            $("#mdlListDetail").val(JSON.stringify(arraysend))
            utility.CRUDCW("Form-sensorparam", "SENSORSENSOR", "mainparamMessage", "mdlListDetail");
            //PSensor.CRUD('Form-sensorparam', arraysend);
        })

        $("#btn-cat-searchSensor").on('click', function () {

            $("#ModalDataCategorySensor").show();
        })
        $("#CloseModalCategorySensor").on('click', function () {
            $("#ModalDataCategorySensor").hide();
        })

        $('#t-Category-Device').on('click', 'tbody tr', function () {

            $("#Form-sensorparam #Device_category_ID").val($(this).attr('IDCategory'))
            $("#Form-sensorparam #DeviceCategory").val($(this).find('td:eq(0)').text());
            $("#ModalDataCategorySensor").hide();


        });

        $("#btnAddParameter").on('click', function () {
            $("#sensorparamInformation").show()
         
            $("#Form-sensorparam #btnDeleteRowsensorparam").hide()
            $("#Form-sensorparam").attr("action", "/PSensorParameter/Create");
            $("#Form-sensorparam").attr("xxx", "Create");
            $("#btnAddParameter").hide()
        })
    }
    this.CRUD = function (form,formarray) {
        var url = $("#" + form).attr('action');
        var data = $("#" + form).serialize();
        $.ajax({
            url: url+"?mdl="+data+"&detail="+formarray,//FEED_URL,
            type: "POST",
            //data:data +"&"+arraysend,
            dataType: "json",
            success: function (data) {




            }
        })
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
    this.initSensorTable = function (id) {

        if (!$.fn.DataTable.isDataTable('#tsensorlist')) {
            var table = $('#tsensorlist').dataTable({
                "dom": 'r<"table-responsive responsive"t><"bottom"<"col-sm-6"i><"col-sm-6"p>><"clear">',
                "processing": false,
               
                "serverSide": true,
                "scrollCollapse": true,
                "scrollX": false,
                "autoWidth": false,
                "ordering": false,
                "pageLength": 20,
                "ajax": {
                    "type": "post",
                    "url": "../PSensorParameter/GetSensorDetail",
                    "data": function (d) {
                        d.id = id


                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                  
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('#tsensorlist tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#tsensorlist tbody tr:eq(0)').click();
                },

                "columnDefs": [

                                        {
                                            targets: 2, // 3rd column
                                            data: null,
                                            render: function (data, type, row, meta) {

                                                if (data[2] != "") {

                                                    checked = '';

                                                    //var button = '<input type = "text" class="form-control qty-print-barcode" name="' + aData[3] + '" id="' + aData[3] + '" />';
                                                    return '<input type=\"text\" class=\"textbox-datatable\" id=\"txtlower\-'+data[0]+'" value="' + data[2] + '">';


                                                }
                                            }

                                        },

                                          {
                                              targets: 3, // 3rd column
                                              data: null,
                                              render: function (data, type, row, meta) {

                                                  if (data[3] != "") {

                                                      checked = '';

                                                      //var button = '<input type = "text" class="form-control qty-print-barcode" name="' + aData[3] + '" id="' + aData[3] + '" />';
                                                      return '<input type=\"text\" class=\"textbox-datatable\" id=\"txtupper\-' + data[0] + '" value="' + data[3] + '">';


                                                  }
                                              }

                                          },
                ]




            });
        }
        else {
            $('#tsensorlist').DataTable().draw();
        }
    }

    this.InitMainTable = function () {


        if (!$.fn.DataTable.isDataTable('#SENSORSENSOR')) {
            var table = $('#SENSORSENSOR').dataTable({
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
                    "url": "../PSensorParameter/GetMainParam",
                    "data": function (d) {
                        d.keyword = $("#keywordmainparam").val()


                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IDCategory", aData[2]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('#SENSORSENSOR tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#SENSORSENSOR tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#SENSORSENSOR').DataTable().draw();
        }

    }
}