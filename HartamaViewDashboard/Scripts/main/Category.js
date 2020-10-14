var PCategory = new function () {
    var arraysend = []
    this.init = function () {

        PCategory.InitCategoryTable();
        PCategory.initSensorTable("");
        $("#CategoryInformation").hide()

        $("#tsensorlist").on('change', "input[type='text'] ", function (e) {
            //console.log(this.id)
            var splited = this.id.split('-');
            var value=splited[0]=='txtlower'?'lowerlimit':'upperlimit'
           
           // arraysend[splited[1]]=[this.value]
            
            if (arraysend.length == 0) {

                arraysend.push({ id: splited[1], valuelower: parseFloat($("#txtlower-" + splited[1]).val()), valueupper: parseFloat($("#txtupper-" + splited[1]).val()) })
            }
            else {

                let obj = arraysend.find(x => x.id === splited[1]);
                let index = arraysend.indexOf(obj);
                if (index > -1) {
                    
                    arraysend[index] = { id: splited[1], valuelower: parseFloat($("#txtlower-" + splited[1]).val()), valueupper: parseFloat($("#txtupper-" + splited[1]).val()) }
                }
                else {
                    arraysend.push({ id: splited[1], valuelower: parseFloat($("#txtlower-" + splited[1]).val()), valueupper: parseFloat($("#txtupper-" + splited[1]).val()) })
                }
                

            }
            console.log(arraysend)
            
        });

        $("#btnAddCategory").on('click', function () {

            $("#CategoryInformation").show()
            $("#Form-Category #userinfo").hide()
            $("#Form-Category #btnDeleteRowCategory").hide()
            $("#Form-Category").attr("action", "/Category/Create");
            $("#Form-Category").attr("xxx", "Create");
            $("#btnAddCategory").hide()
            arraysend = []
            $("#mdlListDetail").val('')
            $('#tsensorlist').DataTable().destroy();
            PCategory.initSensorTable('')
        })

        $("#Form-Category #btnCancelRowCategory").on('click', function () {
            PCategory.clearTxt()
            $("#CategoryInformation").hide()
            $("#Form-Category #userinfo").hide()
            $("#btnAddCategory").show()
            arraysend = []
            $("#mdlListDetail").val('')



        })

        $("#Form-Category #btnSaveRowCategory").click(function () {

            if ($("#Form-Category").valid()) {
                $("#mdlListDetail").val(JSON.stringify(arraysend))
                utility.CRUDCW("Form-Category", "CATEGORYCATEGORY", "CategoryMessage", "mdlListDetail");
                arraysend = []
                $("#mdlListDetail").val('')
                PCategory.clearTxt();
                $("#CategoryInformation").hide()
                $("#Form-Category #userinfo").hide();
                $("#btnAddCategory").show()


            }
        })

        $("#btnDeleteRowCategory").on('click', function () {

            $("#Form-Category").attr("action", "/Category/Delete");
            $("#Form-Category").attr("xxx", "Delete");
            utility.CRUDCW("Form-Category", "CATEGORYCATEGORY", "CategoryMessage");
            PCategory.clearTxt();
            arraysend = []
            $("#mdlListDetail").val('')
            $("#CategoryInformation").hide()
            $("#Form-Category #userinfo").hide();
            $("#btnAddCategory").show()
        })

        $("#btnSearchCategory").on('click', function () {

            $('#CATEGORYCATEGORY').DataTable().draw();
        })

        $('#CATEGORYCATEGORY').on('dblclick', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                $("#btnAddCategory").hide()
                $("#Form-Category #btnDeleteRowCategory").show()
                $("#Form-Category #CategoryID").val($(this).attr("IDCategory"));
                $("#Form-Category #CategoryName").val($(this).find('td:eq(0)').text());
                $("#Form-Category #CategoryDescription").val($(this).find('td:eq(1)').text());
                $("#Form-Category #UserEntry").val($(this).find('td:eq(2)').text());
                $("#Form-Category #DateEntry").val($(this).find('td:eq(3)').text());
                $("#Form-Category #UserLastMaintenance").val($(this).find('td:eq(4)').text());
                $("#Form-Category #DateLastMaintenance").val($(this).find('td:eq(5)').text());
                $('#tsensorlist').DataTable().destroy();
                PCategory.initSensorTable($(this).attr("IDCategory"))

                $("#CategoryInformation").show();
                $("#Form-Category #userinfo").show();
                // PBank.removehide();
                $("#Form-Category").attr("action", "/Category/Create");
                $("#Form-Category").attr("xxx", "Edit");




            }
            else {
                $("#btnAddCategory").hide()
                $("#Form-Category #btnDeleteRowCategory").show()
                $("#Form-Category #CategoryID").val($(this).attr("IDCategory"));
                $("#Form-Category #CategoryName").val($(this).find('td:eq(0)').text());
                $("#Form-Category #CategoryDescription").val($(this).find('td:eq(1)').text());
                $("#Form-Category #UserEntry").val($(this).find('td:eq(2)').text());
                $("#Form-Category #DateEntry").val($(this).find('td:eq(3)').text());
                $("#Form-Category #UserLastMaintenance").val($(this).find('td:eq(4)').text());
                $("#Form-Category #DateLastMaintenance").val($(this).find('td:eq(5)').text());
                $('#tsensorlist').DataTable().destroy();
                PCategory.initSensorTable($(this).attr("IDCategory"))
                $("#CategoryInformation").show();
                $("#Form-Category #userinfo").show();
                // PBank.removehide();
                $("#Form-Category").attr("action", "/Category/Create");
                $("#Form-Category").attr("xxx", "Edit");

                $("#CATEGORYCATEGORY tr.row_selected").removeClass('row_selected');
                $(this).addClass('row_selected');

            }
        });
        $('#CATEGORYCATEGORY').on('click', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {




            }
            else {
                $("#CATEGORYCATEGORY tr.row_selected").removeClass('row_selected');
                //$(this).removeClass('row_selected');
                $(this).addClass('row_selected');

            }
        });

        $("#keywordCategory").on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {

                $('#CATEGORYCATEGORY').DataTable().draw();
            }
        })
    }

    this.clearTxt = function () {
        $("#Form-Category")[0].reset()
        $("#Form-Category #CategoryID").val('')
    }
    this.InitCategoryTable = function () {

        if (!$.fn.DataTable.isDataTable('#CATEGORYCATEGORY')) {
            var table = $('#CATEGORYCATEGORY').dataTable({
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
                    "url": "../Category/GetCategory",
                    "data": function (d) {
                        d.keyword = $("#keywordCategory").val()


                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IDCategory", aData[6]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('#CATEGORYCATEGORY tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#CATEGORYCATEGORY tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#CATEGORYCATEGORY').DataTable().draw();
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
                    "url": "../Category/GetSensorDetail",
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
                                                    return '<input type=\"text\" class=\"textbox-datatable\" id=\"txtlower\-' + data[0] + '" value="' + data[2] + '">';


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
}