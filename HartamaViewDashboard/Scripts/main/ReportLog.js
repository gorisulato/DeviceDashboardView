var ReportLog = new function () {
    arrayDevice = []
    
    this.init = function () {

        var arraynamedevice = [];
        
        $('#PeriodeAwal').datepicker({
            dateFormat: 'dd MM yyyy hh:mm:ss',
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true
        }).datepicker("setDate", 'now');

        $('#PeriodeAkhir').datepicker({
            dateFormat: 'dd MM yyyy',
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
            var device = "";
            for (var x = 0; x < arraynamedevice.length; x++) {
                //console.log(arrayDevice[x].id)
                if (x == 0) {
                    device = arraynamedevice[x].name
                }
                else {
                    device = device + ", " + arraynamedevice[x].name
                }

            }
            $("#DevieNameReportLog").val(device)
        })

        $("#DeviceListReportLog").on('change', "input[type='checkbox'] ", function (e) {
        
            
            var splited = this.id.split('-');
           
            if (this.checked) {
                var findID = arrayDevice.findIndex(find => find.id == splited[1]);
                if (findID == -1) {

                    arrayDevice.push({ id: splited[1] })
                    
                }
                var FindName = arraynamedevice.findIndex(find => find.name == this.name);
                if (FindName == -1) {

                    
                    arraynamedevice.push({ name: this.name })
                }

            }

            else {
                var findID = arrayDevice.findIndex(find => find.id == splited[1]);
                if (findID != -1) {
                    arrayDevice.splice(findID, 1)
                    
                }
                var FindName = arraynamedevice.findIndex(find => find.name == this.name);
                if (FindName == -1) {


                    arraynamedevice.splice(FindName, 1)
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
                arraynamedevice = [];
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
           
            //console.log(device)
            ReportLog.requestFilePath(device)
           
        })
    }

    this.requestFilePath = function (device) {
        $.ajax({

            url: window.paramdo.filepath + "/api/DeviceData/ReadFilePath",

            type: "POST",
            dataType: "json",

            success: function (Data) {

                console.log(Data)
                ReportLog.populateReportData(device,Data.Result[0])

            },
            error: function (xhr, status) {
                //toastr.remove()

                //toastr.error("Transaction Has been Failed TO Post ");
            },
        })
    }

   

    this.populateReportData = function (device,filedata) {
        //console.log($('#PeriodeAkhir').datepicker({ dateFormat: 'dd-mm-yy' }).val())
        $.ajax({
            type: "POST",
            url: '/Report/writeReport?datestart=' + $('#PeriodeAwal').val() + '&dateend=' + $('#PeriodeAkhir').val() + "&filepath="+filedata,

            processData: false,
            datatype: "json",
            success: function (result) {
              

               


            },
            complete: function () {
                var logo = $('#RPT_LogoName').val();
                // alert('complete')
                var awal = $('#PeriodeAwal').val() + ' ' + $('#PeriodeAwalTime').val()
                var akhir = $('#PeriodeAkhir').val() + ' ' + $('#PeriodeAkhirTime').val()
                $('#frameReportLog').attr('src', "/WebForm/ReeportMaster.aspx?param=ReportLog" + "," + $('#SiteReportLog').val() + "," + awal + "," + akhir + "," + device+","+logo);
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
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
               
               
                for (var x = 0; x < result.length; x++) {

                    arrayDevice.push({ id: result[x][3] })
                    $("#chck-" + result[x][3]).attr("checked", true)
                    $("#chck-" + result[x][3]).change()
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
                                     return '<input type = "checkbox" class="form-control amount-satuan" name="' + data[0] + '" id="' + "chck-" + data[3] + '" />';

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