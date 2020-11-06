var TUser = new function () {
    var Array = [];
    var fileUpload = $("#userPictFile").get(0);
    var files2 = fileUpload.files;
    this.init = function () {
        TUser.InitSiteTable();
        TUser.InitRoleTable();
        TUser.InitUserDataTable();
        $('#Form-User #userinfo').hide();
        $('#UserInformation').hide();

        $("#btnAddUser").on('click',function(){
            $('#UserInformation').show();
            $('#Form-User #userinfo').hide();
            $("#Form-User #btnDeleteRow").hide()
            $("#Form-User").attr("action", "/TUser/Create");
            $("#Form-User").attr("xxx", "Create");
            $("#btnAddUser").hide()
            $("#Form-User")[0].reset();
            $("#UserPictContainer").attr('src', '')
            $("#Form-User #UserPicture").val('')
        })
        $("#userPictFile").on('change', function (evt) {
            Array=[]
            //console.log($("#TesFile").val())
            //$("#containerJancuk").attr('src', $("#TesFile").val())
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    $("#UserPictContainer").attr('src', fr.result)
                    $("#Form-User #UserPicture").val(fr.result)
                    //TUser.InsertPic(fr.result)
                }
                fr.readAsDataURL(files[0]);
                //console.log(files[0])
                
                //console.log($("#Form-User")[0])
                 fileUpload = $("#userPictFile").get(0);
                 files2 = fileUpload.files;
                //TUser.InsertPic(files2);

            }
        })
        $("#Form-User #btnSaveRow").on('click', function () {
            //console.log($("#UserPicturebyte").val())
            $('#UserInformation').hide();
            $("#btnAddUser").show()
            utility.CRUDCW("Form-User", "TUSERTUSER", "userMessage");
            //TUser.InsertUser(files2)

        })


        $("#btnSearchUserSite").on('click', function () {

            $('#UserSitetable').DataTable().draw();

        })

        $("#keywordUserSite").on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {

                $('#UserSitetable').DataTable().draw();
            }
        })
        $("#Form-User #btn-site-search").on('click', function () {

            $("#ModalDataUserSite").show();
            $("#keywordUserSite").val('');

        })

        $("#CloseModalUserSite").on('click', function () {
            $("#ModalDataUserSite").hide();
        });

        $('#UserSitetable').on('click', 'tbody tr', function () {
            $("#ModalDataUserSite").hide();
            $("#Form-User #UserSite").val($(this).find('td:eq(0)').text())
            $("#Form-User #IDSite").val($(this).attr('IDSite'))
        });


        $("#btnSearchUserRole").on('click', function () {

            $('#UserRoletable').DataTable().draw();

        })

        $("#keywordUserRole").on('keyup', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {

                $('#UserRoletable').DataTable().draw();
            }
        })

        $("#Form-User #btn-role-search").on('click', function () {

            $("#ModalDataUserRole").show();
            $("#keywordUserRole").val('');

        })

        $("#CloseModalUserRole").on('click', function () {
            $("#ModalDataUserRole").hide();
        });

        $('#UserRoletable').on('click', 'tbody tr', function () {
            $("#ModalDataUserRole").hide();
            $("#Form-User #IDRole").val($(this).find('td:eq(0)').text())
            $("#Form-User #UserRole").val($(this).find('td:eq(1)').text())
        });
        
        $("#btnLockUser").on('click', function () {

            $("#Form-User #Locked").val(true);
            $("#Form-User").attr("action", "/TUser/UpdateUserLocked");
            $("#Form-User").attr("xxx", "Edit");
            utility.CRUDCW("Form-User", "TUSERTUSER", "userMessage");

        });

        $("#btnUnLockUser").on('click', function () {

            $("#Form-User #Locked").val(false);
            $("#Form-User").attr("action", "/TUser/UpdateUserLocked");
            $("#Form-User").attr("xxx", "Edit");
            utility.CRUDCW("Form-User", "TUSERTUSER", "userMessage");

        });
        $("#Form-User #btnCancelRow").on('click', function () {

            $('#UserInformation').hide();
            $('#Form-User #userinfo').hide();
            $("#Form-User")[0].reset();
            $("#btnAddUser").show();
        })

        $('#TUSERTUSER').on('click', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {

                $("#Form-User #UserID").val($(this).attr("IdUser"));


            }
            else {
                $("#TUSERTUSER tr.row_selected").removeClass('row_selected');
                //$(this).removeClass('row_selected');
                $(this).addClass('row_selected');
                $("#Form-User #UserID").val($(this).attr("IdUser"));

            }

            if (($(this).find('td:eq(6)').text()) == "None") {
                $("#btnLockUser").attr('disabled', false);
                $("#btnUnLockUser").attr('disabled', true);
            }
            else {
                $("#btnLockUser").attr('disabled', true);
                $("#btnUnLockUser").attr('disabled', false);
            }
        });

        $('#TUSERTUSER').on('dblclick', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                $("#btnAddUser").hide()
                $("#Form-User #btnDeleteRowsite").show()
                $("#Form-User #UserID").val($(this).attr("IdUser"));
                $("#Form-User #UserCode").val($(this).attr("ucode"));
                $("#Form-User #EmployeeNO").val($(this).find('td:eq(0)').text());
                $("#Form-User #Fullname").val($(this).find('td:eq(3)').text());
                $("#Form-User #Username").val($(this).find('td:eq(1)').text());
                $("#Form-User #Email").val($(this).find('td:eq(4)').text());
                $("#Form-User #IDSite").val($(this).attr("idsite"));

                $("#Form-User #UserSite").val($(this).find('td:eq(2)').text());
                $("#Form-User #UserRole").val($(this).find('td:eq(5)').text());
                $("#Form-User #IDRole").val($(this).attr("idrole"));
                $("#Form-User #UserPicture").val($(this).attr("image"))
                $("#UserPictContainer").attr('src', "data:image/png;base64," + $(this).attr("image"))
                $("#UserInformation").show();
                $("#userinfo").show();
                // PBank.removehide();
                $("#Form-User").attr("action", "/TUser/Update");
                $("#Form-User").attr("xxx", "Edit");




            }
            else {
                $("#btnAddUser").hide()
                $("#Form-User #btnDeleteRowsite").show()
                $("#Form-User #UserID").val($(this).attr("IdUser"));
                $("#Form-User #UserCode").val($(this).attr("ucode"));
                $("#Form-User #EmployeeNO").val($(this).find('td:eq(0)').text());
                $("#Form-User #Fullname").val($(this).find('td:eq(3)').text());
                $("#Form-User #Username").val($(this).find('td:eq(1)').text());
                $("#Form-User #Email").val($(this).find('td:eq(4)').text());
                $("#Form-User #IDSite").val($(this).attr("idsite"));

                $("#Form-User #UserSite").val($(this).find('td:eq(2)').text());
                $("#Form-User #UserRole").val($(this).find('td:eq(5)').text());
                $("#Form-User #IDRole").val($(this).attr("idrole"));

                $("#Form-User #UserPicture").val($(this).attr("image"))
                $("#UserPictContainer").attr('src',"data:image/png;base64,"+ $(this).attr("image"))
                $("#UserInformation").show();
                $("#userinfo").show();
                // PBank.removehide();
                $("#Form-User").attr("action", "/TUser/Update");
                $("#Form-User").attr("xxx", "Edit");

            }
        });
    }

    this.InitSiteTable = function () {


        if (!$.fn.DataTable.isDataTable('#UserSitetable')) {
            var table = $('#UserSitetable').dataTable({
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
                        d.keyword = $("#keywordUserSite").val()


                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IDSite", aData[2]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('#t-Site-User tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#t-Site-User tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#UserSitetable').DataTable().draw();
        }

    }

    this.InitRoleTable = function () {


        if (!$.fn.DataTable.isDataTable('#UserRoletable')) {
            var table = $('#UserRoletable').dataTable({
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
                    "url": "../TUser/GetRole",
                    "data": function (d) {
                        d.keyword = $("#keywordUserRole").val()


                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    //$(nRow).attr("IDSite", aData[2]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('#t-Site-User tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#t-Site-User tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#UserRoletable').DataTable().draw();
        }

    }



    this.InitUserDataTable = function () {


        if (!$.fn.DataTable.isDataTable('#TUSERTUSER')) {
            var table = $('#TUSERTUSER').dataTable({
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
                    "url": "../TUser/GetUser",
                    "data": function (d) {
                        d.keyword = $("#keywordUser").val()


                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $(nRow).attr("IdUser", aData[7]);
                    $(nRow).attr("idsite", aData[8]);
                    $(nRow).attr("idrole", aData[9]);
                    $(nRow).attr("ucode", aData[10]);
                    $(nRow).attr("image", aData[11]);
                    return nRow;

                },

                "fnDrawCallback": function (oSettings, json) {
                    //$('#t-Site-User tbody tr:eq(0)').click();
                },

                "fnInitComplete": function (oSettings, json) {
                    // $('#t-Site-User tbody tr:eq(0)').click();
                },



            });
        }
        else {
            $('#TUSERTUSER').DataTable().draw();
        }

    }

    this.InsertUser = function (files) {
       
        var formdata = new FormData();
       
        formdata.append(files[0].name, files[0]);
       var data1= $("#Form-User").serialize();
        
        $.ajax({

            url: "/TUser/Create",
            data: data1 ,
            type: "POST",
           // datatype: 'json',
            //contentType: false,
            //processData: false,
            //async: false,
           
            success: function (Data) {
                
               
                //$("#UserPicturebyte").val(Data)



            },
            error: function (xhr, status) {
                //toastr.remove()

                //toastr.error("Transaction Has been Failed TO Post ");
            },
        })
    }

    this.InsertPic = function (files) {

        var formdata = new FormData();

        formdata.append(files[0].name, files[0]);
       

        $.ajax({

            url: "/TUser/Create",
            data: data1,
            type: "POST",
             datatype: 'json',
            contentType: false,
            processData: false,
            async: false,

            success: function (Data) {


                //$("#UserPicturebyte").val(Data)



            },
            error: function (xhr, status) {
                //toastr.remove()

                //toastr.error("Transaction Has been Failed TO Post ");
            },
        })
    }
}