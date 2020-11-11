var Dashboard2 = new function (param) {
    var GapChart = 0;
    this.init = function () {
        GapChart = parseInt($("#GapDashboard").val())
        Dashboard2.InitDevice();
        $("#frm-btn-DeviceDashboard").on('click', function () {

            $("#ModalDataDeviceDashboard").show();

        })

        $("#CloseModalDeviceDashboard").on('click', function () {

            $("#ModalDataDeviceDashboard").hide();

        })

        $('#t-DeviceDashboards').on('click', 'tbody tr', function () {

            $("#DeviceIDDashboard").val($(this).attr('IDDevice'))
            $("#DeviceNameDashborad").val($(this).find('td:eq(0)').text());
            $("#ModalDataDeviceDashboard").hide();
            //paramdo.arraychartdetail=[]
            //Dashboard2.GetChart($(this).attr('IDDevice'))
        });

        $("#keywordmodalDeviceDashboards").on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {

                $('#t-DeviceDashboards').DataTable().draw();
            }

        })

        $("#btnSearchDeviceDashboards").on('click', function () {

            $('#t-DeviceDashboards').DataTable().draw();
        })


        //Pusher.logToConsole = true;

        //var pusher = new Pusher('4d57b796a305ad74611d', {
        //    cluster: 'ap1'
        //});

        ////var channel = pusher.subscribe('Dashboard-device');
        ////channel.bind('my-event', function (data) {
        ////    console.log(ret);
        ////    console.log(ret[0].DeviceID)
        ////    var deviceid = ret[0].DeviceID

        ////    if (deviceid == $("#DeviceIDDashboard").val()) {

        ////        if (document.getElementById("chart-detail" + ret[0].SensorName) == null) {
        ////            a = ' <div class="chart-container-detail animated fadeInRight">'
        ////                    + ' <h1 id="warning-chart' + ret[0].DeviceID + '" class="warning-blink-detail ' + warning + ' ">Warning!!!</h1>'
        ////                    + '<h1 class="title-chart">' + ret[0].SensorName + '</h1> ' +
        ////                    '<div id="chart-detail' + ret[0].SensorName + '" > ' +

        ////                    '</div>' +
        ////            ' </div>';
        ////            $("#content-chart-detail").append(a);

        ////            var color = [""]
        ////            Dashboard2.GenerateChartDetail(ret[0].SensorName, ret[0].lower, ret[0].upper, ret[0].Value)
        ////        }
        ////        else {
        ////            Dashboard2.UpdateChart(ret[0].SensorName, ret[0].lower, ret[0].upper, ret[0].Value)
        ////        }
        ////    }
        ////});

       
        

        //setInterval(function () {
        //    var connection;
        //    var host = "ws://103.195.90.72:9096";

        //    connection = new WebSocket(host);

        //    connection.onmessage = function (message) {
        //        var ret = JSON.parse(message.data);
        //        //var simpleStatus = window.JSON.parse(message.data);
        //        //startAnimation(simpleStatus.User, simpleStatus.Status);
        //        console.log(message)
        //        var deviceid = ret[0].DeviceID

        //        if (deviceid == $("#DeviceIDDashboard").val()) {

        //            if (document.getElementById("chart-detail" + ret[0].SensorName) == null) {
        //                a = ' <div class="chart-container-detail animated fadeInRight">'
        //                       // + ' <h1 id="warning-chart' + ret[0].DeviceID + '" class="warning-blink-detail ' + warning + ' ">Warning!!!</h1>'
        //                        + '<h1 class="title-chart">' + ret[0].SensorName + '</h1> ' +
        //                        '<div id="chart-detail' + ret[0].SensorName + '" > ' +

        //                        '</div>' +
        //                ' </div>';
        //                $("#content-chart-detail").append(a);

        //                var color = [""]
        //                Dashboard2.GenerateChartDetail(ret[0].SensorName, ret[0].lower, ret[0].upper, ret[0].Value)
        //            }
        //            else {
        //                Dashboard2.UpdateChart(ret[0].SensorName, ret[0].lower, ret[0].upper, ret[0].Value)
        //            }
        //        }
        //    }
        //}, 60000);

        Dashboard2.connectws();
    }

    this.connectws = function () {
        var connection;
        var host = "ws://103.195.90.72:9096";

        connection = new WebSocket(host);
        connection.onopen = function () {
           console.log("its Connected Have fun")
        };
        connection.onmessage = function (message) {
            var ret = JSON.parse(message.data);
            //var simpleStatus = window.JSON.parse(message.data);
            //startAnimation(simpleStatus.User, simpleStatus.Status);
            console.log(message)
            var deviceid = ret[0].DeviceID

            if (deviceid == $("#DeviceIDDashboard").val()) {

                if (document.getElementById("chart-detail" + ret[0].SensorName) == null) {
                    a = ' <div class="chart-container-detail animated fadeInRight">'
                           // + ' <h1 id="warning-chart' + ret[0].DeviceID + '" class="warning-blink-detail ' + warning + ' ">Warning!!!</h1>'
                            + '<h1 class="title-chart">' + ret[0].SensorName + '</h1> ' +
                            '<div id="chart-detail' + ret[0].SensorName + '" > ' +

                            '</div>' +
                    ' </div>';
                    $("#content-chart-detail").append(a);

                    var color = [""]
                    Dashboard2.GenerateChartDetail(ret[0].SensorName, ret[0].lower, ret[0].upper, ret[0].Value)
                }
                else {
                    Dashboard2.UpdateChart(ret[0].SensorName, ret[0].lower, ret[0].upper, ret[0].Value)
                }
            }
        }

        connection.onclose = function (e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(function () {
                Dashboard2.connectws();
            }, 1000);
        };

        connection.onerror = function (err) {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            ws.close();
        };
    }

    this.UpdateChart = function (Sensorname,lower,upper,valuecurrent) {
		
        var chart = paramdo.arraychartdetail

        for (var x = 0; x < chart.length; x++) {

            if (chart[x].id == Sensorname) {
                var chartobj = chart[x].obj
                chartobj.load({

                    columns: [
                         ['Upper', upper],
                         [Sensorname, valuecurrent],
                         ['Lower', lower]
                    ]
                });
            }
        }
    }

    this.GenerateChartDetail = function (Sensorname,lower,upper,valuecurrent) {
       // console.log(Sensorname, lower, upper, valuecurrent)
        var chart = c3.generate({
            bindto: "#chart-detail" + Sensorname,
            data: {
                columns: [
                     ['Upper', upper],
                     [Sensorname, valuecurrent],
                     ['Lower', lower]
                   
                    
                ],
                type: 'gauge',
         
            },
            gauge: {
                label: {
                    format: function (value, ratio) {
                        return value;
                    },
                    show: true // to turn off the min/max labels.
                },
               // min: datajson.lower, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
                max: upper + 100, // 100 is default
                //    units: ' %',
                //    width: 39 // for adjusting arc thickness
            },
            color: {
                pattern: ['#c86b85', '#878ecd', '#5CC8B2']
                //pattern: ['#F4E1E7', '#E5E8F4', '#E1F2EF'], // the three color levels for the percentage values.
                //threshold: {
                //    //            unit: 'value', // percentage is default
                //    //            max: 200, // 100 is default
                //    values: [10, 40, 60]
                //}
            },
            size: {
                height: 180
            }
        });

        

        paramdo.arraychartdetail.push({ id: Sensorname, obj: chart });
    }


    this.setIntervalforchart = function (id) {

        setInterval(function () {
            //alert(id)
            Dashboard2.GetChart()
        }, GapChart);
    }


    this.UpdateChartFromNotif = function () {

        Dashboard2.GetChart($("#DeviceIDDashboard").val())
    }
    this.GetChart = function (id) {

        $.ajax({
            url: "../ChartByDeviceID/GetChartbyDeviceID?id=" + id,//FEED_URL,
            type: "POST",
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data.length > 0) {
                    //console.log(data)
                    for (var x = 0 ; x < data.length; x++) {
                        var countNotif = parseInt(data[x].Warning);
                        var warning = countNotif == 0 ? "warning-chart-detail-hidden" : "warning-chart-detail-show";

                        if (document.getElementById("chart-detail" + data[x].Title) == null) {
                            a = ' <div class="chart-container-detail animated fadeInRight">'
                                    + ' <h1 id="warning-chart' + data[x].device_id + '" class="warning-blink-detail ' + warning + ' ">Warning!!!</h1>'
                                    + '<h1 class="title-chart">' + data[x].Title + '</h1> ' +
                                    '<div id="chart-detail' + data[x].Title + '" > ' +

                                    '</div>' +
                            ' </div>';
                            $("#content-chart-detail").append(a);

                            var color =[""]
                            Dashboard2.GenerateChartDetail(data[x])
                        }

                        else {
                            Dashboard2.UpdateChart(data[x])
                        }
                    }
                    Dashboard2.setIntervalforchart(id)
                }
                else {

                }


            }
        })
        
    }

    this.InitDevice = function () {


        if (!$.fn.DataTable.isDataTable('#t-DeviceDashboards')) {
            var table = $('#t-DeviceDashboards').dataTable({
                "dom": 'r<"table-responsive responsive"t><"row"<"col-sm-6"i><"col-sm-6"p>><"clear">',
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
                        d.keyword = $("#keywordmodalDeviceDashboards").val()
                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IDDevice", aData[7]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                   // $('#t-DeviceDashboards tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    $('#t-DeviceDashboards tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#t-DeviceDashboards').DataTable().draw();
        }

    }
}