var ReportLog = new function () {
    arrayDevice=[]
    this.init = function () {
        $('#PeriodeAwal').datepicker({
            format: 'dd MM yyyy',
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true
        }).datepicker("setDate", 'now');

        $('#PeriodeAkhir').datepicker({
            format: 'dd MM yyyy',
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true
        }).datepicker("setDate", 'now');
        $('#PeriodeAkhir').datepicker("hide")
        $('#PeriodeAwal').datepicker("hide")

        ReportLog.PopulateSite();

        $("#frm-btn-DeviceReportLog").on('click', function () {

            $("#ModalDataDeviceReportLog").show();
        })

        $("#CloseModalDeviceReportLog").on('click', function () {
            $("#ModalDataDeviceReportLog").hide();
        })

        $("#DeviceListReportLog").on('change', "input[type='checkbox'] ", function (e) {
        
            
            var splited = this.id.split('-');
            
            if (this.checked) {
                var findID = arrayDevice.findIndex(find => find.id == splited[1]);
                if (findID == -1) {

                    arrayDevice.push({ id: splited[1] })
                }
               

            }

            else {
                var findID = arrayDevice.findIndex(find => find.id == splited[1]);
                if (findID != -1) {
                    arrayDevice.splice(findID, 1)
                }


            }
          
           
        })

        $("#SelectAll").on('change', function (e) {
           
            if (this.checked) {
                ReportLog.getAllDevices()
            }
            else {

                for (var x = 0; x < arrayDevice.length; x++) {
                    $("#chck-" + arrayDevice[x].id).attr("checked", false)
                }
                arrayDevice = [];
            }
        })

        $("#btnSubmitReportLog").on("click", function () {
            var device = "";
            for (var x = 0; x < arrayDevice.length; x++) {
                //console.log(arrayDevice[x].id)
                if (x == 0) {
                    device=arrayDevice[x].id
                }
                else {
                    device = device+"|"+arrayDevice[x].id
                }

            }
            $('#frameReportLog').attr('src', "/WebForm/ReeportMaster.aspx?param=ReportLog" + "," + $('#SiteReportLog').val() + "," + $('#PeriodeAwal').val() + "," + $('#PeriodeAkhir').val() + "," + device);
            //console.log(device)
           // ReportLog.populateReportData(device)
           
        })
    }

    this.populateReportData = function (device) {
        //console.log($('#PeriodeAkhir').datepicker({ dateFormat: 'dd-mm-yy' }).val())
        $.ajax({

            url: "/Report/writeReport?datestart=" + $('#PeriodeAwal').val() + "&enddate=" + $('#PeriodeAkhir').val(),

            type: "POST",
            dataType: "html",

            success: function (Data) {
             
                



            },
            error: function (xhr, status) {
                //toastr.remove()

                //toastr.error("Transaction Has been Failed TO Post ");
            },
        })
    }
    this.getAllDevices = function () {
        $.ajax({

            url: "/Dashboards/GetDeviceBysite?site=" + $('#SiteReportLog').val() + "&keywords=" + $("#keywordDeviceListReportLog").val() + "&Length=1000&Start=0", 

            type: "POST",
            dataType: "html",
          
            success: function (Data) {
                arrayDevice=[]
                var ret = JSON.parse(Data);
                var result= ret.aaData
               
                console.log(result)
                for (var x = 0; x < result.length; x++) {

                    arrayDevice.push({ id: result[x][3] })
                    $("#chck-" + result[x][3]).attr("checked", true)
                }




            },
            error: function (xhr, status) {
                //toastr.remove()

                //toastr.error("Transaction Has been Failed TO Post ");
            },
        })
    }
    this.GetDevices = function () {
        if (!$.fn.DataTable.isDataTable('#DeviceListReportLog')) {
            var table = $('#DeviceListReportLog').dataTable({
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
                    "url": "../Dashboards/GetDeviceBysite",
                    "data": function (d) {
                        d.keywords = $("#keywordDeviceListReportLog").val(),
                        d.site = $('#SiteReportLog').val()


                    },
                    "error": function (e) {
                        console.log(e)
                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IDDevice", aData[3]);
                    $(nRow).attr("IDCategory", aData[4]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    $('#DeviceListReportLog tbody tr:eq(0)').click();
                    for (var i = 0; i < arrayDevice.length; i++) {

                        var id = arrayDevice[i].id;
                      
                        $("#chck-" + id).attr("checked", true)
                    

                    }
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#DeviceListReportLog tbody tr:eq(0)').click();
                },
                "columnDefs": [
                         {
                             targets: 3,
                             data: null,
                             render: function (data, type, row, meta) {

                                 if (data[0] != "") {
                                     return '<input type = "checkbox" class="form-control amount-satuan" name="' + data[3] + '" id="' + "chck-" + data[3] + '" />';

                                 }
                             }
                         }




                ]




            });
        }
        else {
            $('#DeviceListReportLog').DataTable().draw();
        }
    }

     this.PopulateSite = function() {
        $.ajax({ 

            url: "/Dashboards/GetSiteByRole",

            type: "POST",
            dataType: "html",
            success: function (Data) {
                //console.log(ret)
                var ret = JSON.parse(Data);

                console.log(ret.Data.length)
                $('#SiteReportLog').empty()

                for (var i = 0; i < ret.Data.length ; i++) {

                    //var x = document.getElementById("AksesorisHadiah");
                    //var option = document.createElement("option");
                    //option.text = Data[0];


                    $('#SiteReportLog').append($('<option></option>').val(ret.Data[i][0]).html(ret.Data[i][1]))
                }
                if (ret.Data.length > 1) {
                    $('#SiteReportLog').prepend($('<option></option>').val("ALL").html("All SIte"))
                    document.getElementById("SiteReportLog").value = "ALL";
                } else {
                    document.getElementById("SiteReportLog").value = ret.Data[0][0];
                }


                ReportLog.GetDevices();

               


            },
            error: function (xhr, status) {
                //toastr.remove()

                //toastr.error("Transaction Has been Failed TO Post ");
            },
        })
    }
}