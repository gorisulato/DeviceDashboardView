var PSensor = new function () {
    var arraysend =[]
    this.init = function () {

        PSensor.initSensorTable("");

        $("#tsensorlist").on('change', "input[type='text'] ", function (e) {
            console.log(this.id)
            var splited = this.id.split('-');
            var value=splited[0]=='txtlower'?'lowerlimit':'upperlimit'
            arraysend.push([value, splited[1], this.value])
            console.log(arraysend)
        });
    }

    this.initSensorTable = function (id) {

        if (!$.fn.DataTable.isDataTable('#tsensorlist')) {
            var table = $('#tsensorlist').dataTable({
                "dom": 'r<"table-responsive responsive"t><"bottom"<"col-sm-6"i><"col-sm-6"p>><"clear">',
                "processing": false,
                "ordering": false,
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
}