var ReadAllNotif = new function () {
    this.init = function () {
        ReadAllNotif.initDatatable();

    }

   
   this.initDatatable = function () {
    var table = $('#NOTIFICATIONNOTIFICATION').dataTable({
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
            "url": "../Dashboards/GetDataNotificationLog"
           
        },

        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            return nRow;
        },
        "fnDrawCallback": function (oSettings, json) {
            $('#NOTIFICATIONNOTIFICATION tbody tr:eq(0)').click();
        },

        "fnInitComplete": function (oSettings, json) {
            // $("#TDepartment").focus();
            $('#NOTIFICATIONNOTIFICATION tbody tr:eq(0)').click();
        }
    });
}

}

