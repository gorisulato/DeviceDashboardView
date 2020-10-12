
var Module = new function () {
    jQuery.validator.addMethod("alphanumeric", function (value, element) {
        return this.optional(element) || /([0-9a-zA-Z\s])$/.test(value);
    }, "Please Fill only alpha numeric character.");
    this.init = function (param) {
        $("#Modinformation").hide();
        $("#btnModAddRow").click(function () {
            $("#Form-Module #btnEditRow").hide();
            $("#Form-Module #btnDeleteRow").hide();
            //$("#btnSaveRow").show();
            //$("#btnCancelRow").show();
            //PAccount.clearfield();
            //PAccount.removereadonly();
            $("#Form-Module #divuserentry").addClass("hide");
            $("#Form-Module #divdateentry").addClass("hide");
            $("#Form-Module #divuserlastmaintenance").addClass("hide");
            $("#Form-Module #divdatelastmaintenance").addClass("hide");
            $("#Form-Module").attr("action", "/Module/Create");
            $("#Form-Module").attr("xxx", "Create");
            $("#Modinformation").show();
        })

        $('#closeModal').click(function () {
            $('#LOV-Icon').modal('hide');
        })
        $("#Form-Module #frm-lov-btn").click(function () {
            utility.LoadLOV('../Icon/GetLoV', 'modal-Render-Icon-Module', 'Form-Module#IDIconModule#IconName');
            //$('#LOV-Icon').modal('show');
        });

        $("#Form-Module").validate({
            onfocusout: function (element) {
                var element_id = $(element).attr('id');
                if (this.settings.rules[element_id].onfocusout !== false) {
                    $(element).valid();
                }
            },
            onkeypress: function (element) {
                var element_id = $(element).attr('id');
                if (this.settings.rules[element_id].onkeypress !== false) {
                    $(element).valid();
                }
            },
            rules: {
                ModuleCode: {
                    required: true,
                    minlength: 2,
                    maxlength: 20,
                    alphanumeric: true
                },
                ModuleName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100,
                    alphanumeric: true
                },
                IconName: {
                    required: true
                },
                ModuleDesc: {
                    maxlength: 500,
                    alphanumeric: true
                }
            },
            messages: {
                ModuleCode: {
                    required:  "Module Code Required",
                    minlength: "Module Code Minimum 2 Character",
                    maxlength: "Module Code Maximum 20 Character.",
                    //alphanumeric: "Fill only alpha numeric character"
                },
                ModuleName: {
                    required: "Module Name Required",
                    minlength: "Module Name Minimum 2 Character",
                    maxlength: "Module Name Maximum 100 Character.",
                    // alphanumeric: "Fill only alpha numeric character"
                },
                IconName: {
                    required: "Icon Name Required."
                },
                ModuleDesc: {
                    maxlength: " Module Description Maximum 500 Character.",
                    //alphanumeric: "Fill only alpha numeric character"
                }

            }

        });

        if (param.attribute.CanDelete == "False") {


            $('#btnDeleteRow').hide();
        }
        else {

            $('#btnDeleteRow').show();
        };
        if (param.attribute.CanSave == "False") {

            $('#btnAddRow').hide();
        }
        else {
            $('#btnAddRow').show();
        };
        if (param.attribute.CanEdit == "False") {

            $('#btnEditRow').hide();
        }
        else {
            $('#btnEditRow').show();
        };

        if (param.attribute.CanView == "False") {

            alert("Don't Allow");
            $('#body').hide();
        }
        else {
            $('#body').show();
        }
        //$("#successDiv").hide();
        var table = $('#MODULETMODULE').dataTable({
            "dom": 't<"col-sm-6"i><"col-sm-6"p>',
            "processing": true,
            "serverSide": true,
            "ordering": false,
            //"iDisplayLength": 50,
            "scrollX": false,
            "autoWidth": false,
            // "scrollY": "500px",
            //keys: true,
            "scrollCollapse": true,
            "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": true,

            }],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var imgLink = aData[4];  //posisi data path image
                var imgTag = imgLink + ' <i class="fa ' + imgLink + '"></i>';
                var id = aData[0];
                var result = aData[1] + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '">';
                if (aData[5] == 'Unicode') {
                    imgLink = aData[4];
                    imgTag = ' <i class="fa ' + imgLink + '"></i>';
                }
                else {
                    imgLink = aData[4];
                    imgTag = "<img src='" + imgLink + "'  alt='image'> ";
                }
                $(nRow).attr("id", aData[0]);/*Add attribute id for each tr to filled hiddenID based on selected tr and get its ID . edited by Egi Apriandi 25-08-2015*/
                $('td:eq(0)', nRow).html(result);
                $('td:eq(1)', nRow).html(aData[2]);
                $('td:eq(2)', nRow).html(aData[3]);
                $('td:eq(3)', nRow).html(aData[6] + " " + imgTag);
                $(nRow).attr("idicon", aData[7]);/*Add attribute id for each tr to filled hiddenID based on selected tr and get its ID . edited by Egi Apriandi 25-08-2015*/
                $(nRow).attr("typeicon", aData[5]);
                $(nRow).attr("valicon", aData[4]);
                $(nRow).attr("userentry", aData[8]);
                $(nRow).attr("dateentry", aData[9]);
                $(nRow).attr("userlastmaintenance", aData[10]);
                $(nRow).attr("datelastmaintenance", aData[11]);
                $(nRow).attr("sequence", aData[12]);

                return nRow;
            },
                "fnInitComplete": function (oSettings, json) {
                    $('#MODULETMODULE tbody tr:eq(0)').click();
                    $('#MODULETMODULE').focus();
                //utility.lastid = $('#MODULETMODULE tbody tr.row_selected').attr('id');

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
            },
            "ajax": {
                "url": "../Module/GetDataModule",
                "data": function (d) {
                    d.sEcho = "test";
                }
            },
            "fnDrawCallback": function () {/*Add Property drawCallback in datatable used for initiate rowselected class when update sequence method called */

                if ("" != $("#lastidmodule").val()) {
                    for (var i = 0; i < $("#MODULETMODULE tbody tr").length; i++) {
                        if ($("#MODULETMODULE tbody tr:eq(" + i + ")").attr('id') == $("#lastidmodule").val()) {
                            $("#MODULETMODULE tbody tr:eq(" + i + ")").addClass('row_selected');
                            break;
                        }
                    }
                } else {
                    $('#MODULETMODULE tbody tr:eq(0)').click();
                }
            }
        });

        $(".custom_table_scroll").wrap("<div class='custom_table_scroll_wrappper'></div>");

        $('#modal-Render').html("");

        $("#page-length").change(function () {
            $('#MODULETMODULE').DataTable().page.len(this.value).draw();
        });
        //Add by Irham 07-10-2015
        //Inisialiasi Arrow Move
        utility.ArrowMoveInit("#MODULETMODULE", 0);
        //End Add By Irham

        $('#MODULETMODULE').on('click', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                $("#Form-Module #IDModule").val($(this).attr("id"));
                $("#Form-Module").validate().resetForm();
                //$(this).removeClass('row_selected');
                //$("#hiddenID").val("");//Add initial state of hiddenID with empty string when class row_selected is removed edited by Egi Apriandi 25-08-2015
            }
            else {
                table.$('tr.row_selected').removeClass('row_selected');
                $(this).addClass('row_selected');
                $("#Form-Module").validate().resetForm();
                $("#Form-Module #IDModule").val($(this).attr("id"));
                $("#hiddenID").val(this.id);//Add initial state of hiddenID with ID of tr when class row_selected is added edited by Egi Apriandi 25-08-2015
            }
        });

        $('#MODULETMODULE').on('dblclick', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                $("#Form-Module #IDModule").val($(this).attr("id"));
                $("#Form-Module #Sequence").val($(this).attr("sequence"));
                $("#Form-Module #ModuleCode").val($(this).find('td:eq(0)').text());
                $("#Form-Module #ModuleName").val($(this).find('td:eq(1)').text());
                $("#Form-Module #ModuleDesc").val($(this).find('td:eq(2)').text());
                $("#Form-Module #IDIconModule").val($(this).attr("idicon"));
                $("#Form-Module #UserEntry").val($(this).attr("userentry"));
                $("#Form-Module #DateEntry").val($(this).attr("dateentry"));
                $("#Form-Module #UserLastMaintenance").val($(this).attr("userlastmaintenance"));
                $("#Form-Module #DateLastMaintenance").val($(this).attr("datelastmaintenance"));
                $("#Form-Module #IconName").val($(this).find('td:eq(3)').text());
                $("#Form-Module").attr("action", "/Module/Edit");
                $("#Form-Module").attr("xxx", "Edit");
                $("#Form-Module #divuserentry").removeClass("hide");
                $("#Form-Module #divdateentry").removeClass("hide");
                $("#Form-Module #divuserlastmaintenance").removeClass("hide");
                $("#Form-Module #divdatelastmaintenance").removeClass("hide");
                $("#Form-Module #btnEditRow").show();
                $("#Form-Module #btnDeleteRow").show();
                $("#Form-Module #btnAddRow").hide();
                $("#Modinformation").show();
            }
            else {
                table.$('tr.row_selected').removeClass('row_selected');
                $(this).addClass('row_selected');
                $("#Form-Module #IDModule").val($(this).attr("id"));
                $("#Form-Module #Sequence").val($(this).attr("sequence"));
                $("#Form-Module #ModuleCode").val($(this).find('td:eq(0)').text());
                $("#Form-Module #ModuleName").val($(this).find('td:eq(1)').text());
                $("#Form-Module #ModuleDesc").val($(this).find('td:eq(2)').text());
                $("#Form-Module #IDIconModule").val($(this).attr("idicon"));
                $("#Form-Module #UserEntry").val($(this).attr("userentry"));
                $("#Form-Module #DateEntry").val($(this).attr("dateentry"));
                $("#Form-Module #UserLastMaintenance").val($(this).attr("userlastmaintenance"));
                $("#Form-Module #DateLastMaintenance").val($(this).attr("datelastmaintenance"));
                $("#Form-Module #IconName").val($(this).find('td:eq(3)').text());
                $("#Form-Module").attr("action", "/Module/Edit");
                $("#Form-Module").attr("xxx", "Edit");
                $("#Form-Module #divuserentry").removeClass("hide");
                $("#Form-Module #divdateentry").removeClass("hide");
                $("#Form-Module #divuserlastmaintenance").removeClass("hide");
                $("#Form-Module #divdatelastmaintenance").removeClass("hide");
                $("#Form-Module #btnEditRow").show();
                $("#Form-Module #btnDeleteRow").show();
                $("#Form-Module #btnAddRow").hide();
                $("#Modinformation").show();
            }
        });
        $("#btnModuleDownRow").click(function () {
            Module.UpdateSequence('DOWN', param);
        });
        $("#btnModuleUpRow").click(function () {
            Module.UpdateSequence('UP', param);

        });

        $("#Form-Module #btnSaveRow").click(function () {
            if ($("#Form-Module").valid()) {
                utility.CRUDCW("Form-Module", "MODULETMODULE", "ModuleMessage");
                Module.clearfield();
                $("#Modinformation").hide();

            }
        });
        $("#Form-Module #btnDeleteRow").click(function () {
            if ($("#Form-Module").valid()) {
                $("#Form-Module").attr("action", "/Module/Delete");
                $("#Form-Module").attr("xxx", "Delete");
                utility.CRUDCW("Form-Module", "MODULETMODULE", "ModuleMessage");
                Module.clearfield();
                $("#Modinformation").hide();
            }
        });

        $("#Form-Module #btnCancelRow").click(function () {
            Module.clearfield();
            $("#Modinformation").hide();
        })
        //* Init Shortcut
        //shortcutPlugin.findShortcut("Edit", "#btnEditRow");
        //shortcutPlugin.findShortcut("Delete", "#btnDeleteRow");
        //shortcutPlugin.findShortcut("Add", "#btnAddRow");
        //shortcutPlugin.findShortcut("Move Up", "#btnUpRow");
        //shortcutPlugin.findShortcut("Move Down", "#btnDownRow");
        //shortcutPlugin.findShortcutByParentElement("Delete", "#btnDeleteRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Add", "#btnAddRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Move Up", "#btnUpRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Move Down", "#btnDownRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Edit", "#btnEditRow", "#render-body");
        //* end Init Shortcut


    }

    $(".close").click(function () {
        $("#errorDiv").hide();
        $("#errorDivUpdate").hide();

    });

    this.clearfield = function () {
        $("#Form-Module #IDModule").val("");
        $("#Form-Module #ModuleCode").val("");
        $("#Form-Module #ModuleName").val("");
        $("#Form-Module #ModuleDesc").val("");
        $("#Form-Module #IDIcon").val("");
        $("#Form-Module #UserEntry").val("");
        $("#Form-Module #DateEntry").val("");
        $("#Form-Module #UserLastMaintenance").val("");
        $("#Form-Module #DateLastMaintenance").val($(""));
        $("#Form-Module #IconName").val("");
    }
    this.Create = function () {
        utility._loadMenu("../Module/Create");

    }

    this.Edit = function (param) {
        try {
            var id = $('.row_selected').find('.theID').val();

        }
        catch (r) {
            var id = '';
        }

        if (typeof id !== 'undefined') {
            var destination = '../Module/Edit/' + id;
            utility._loadMenu(destination);

              }
        else {
            //alert('Pick one data')
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }
    }

    this.Delete = function (param) {
       try {
            var id = $('.row_selected').find('.theID').val();

        }
        catch (r) {
            var id = '';
        }

        if (typeof id !== 'undefined') {
            var destination = '../Module/Delete/' + id;
            utility._loadModal(destination, 'modal-Render');

            $('#DeleteModal').modal('show');
        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }
    }

    this.UpdateSequence = function (direction, param) {
        try {
            var id = $("#MODULETMODULE tbody tr.row_selected").attr('id');

        }
        catch (r) {
            var id = '';
        }
        if /*(typeof id !== 'undefined') edited by Egi Apriandi 25-08-2015*/(id !=="") {
            var url = '../Module/ModuleUpdateSequence';
            $.ajax({
                type: "POST",
                url: url,
                dataType: "html",
                data :"IDModule="+ id +"&direction=" + direction           ,
                success: function (data) {
                    var msg = data.result;
                    if (parseInt(msg) > 0) {
                        var message = "Success Move Data";
                        utility.alert($("#ModuleMessage"), "success", message)
                        $("#MODULETMODULE").DataTable().draw();
                        $("#lastidmodule").val(id)

                    } else {
                        utility.alert($("#ModuleMessage"), "error", "Error Move Data")
                    }
                    //alert(JSON.stringify(data.result));
                    //utility._loadMenu(url);
                },

                dataType: 'json'

            });
        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }


        return false;
    }
}
var ModuleCreate = new function () {
    this.init = function (param) {
        $("#frm-cancel-btn").on('click', function () {
            utility._loadMenu('../Module/Index');
        });

        $("#frm-submit-btn").click(function () {
            if ($("#Form-Module").valid()){
                utility._CRUD("Form-Module", "INSERT");
            }
        });
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        $("#frm-lov-btn").click(function () {
            utility.LoadLOV('../Icon/GetLoV', 'modal-Render', 'Form-AssetLocation#IDIcon#IconName');
            //$('#LOV-Icon').modal('show');
        });

        $(".close").click(function () {
            $("#errorDiv").hide();
        });

        $("#Form-Module input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });
        $("#Form-Module input:text").first().focus();
        $("#Form-Module").validate({

            errorPlacement: function (error, element) {
                error.appendTo('#errorMsgDiv');
            },
            onfocusout: false,
            onkeyup: false,
            invalidHandler: function (event, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {

                    $("#errorDiv").show();
                } else {
                    $("#errorDiv").hide();
                }
            },
            rules: {
                ModuleCode: {
                    required: true,
                    minlength: 2,
                    maxlength: 20,
                    alphanumeric:true
                },
                ModuleName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100,
                   alphanumeric: true
                },
                IconName: {
                    required: true
                },
                ModuleDesc: {
                    maxlength: 500,
                   alphanumeric: true
                }
            },
            messages: {
                ModuleCode: {
                    required: param.attribute.moduleCode+" "+param.validation.required+".",
                    minlength: param.attribute.moduleCode+" "+param.validation.minLength+" 2.",
                    maxlength: param.attribute.moduleCode+" "+param.validation.maxLength+" 20.",
                    //alphanumeric: "Fill only alpha numeric character"
                },
                ModuleName: {
                    required: param.attribute.moduleName + " " + param.validation.required + ".",
                    minlength: param.attribute.moduleName + " " + param.validation.minLength + " 2.",
                    maxlength: param.attribute.moduleName + " " + param.validation.maxLength + " 100.",
                   // alphanumeric: "Fill only alpha numeric character"
                },
                IconName: {
                    required: param.attribute.icon + " " + param.validation.required + "."
                },
                ModuleDesc: {
                    maxlength: param.attribute.moduleDesc + " " + param.validation.maxLength + " 500.",
                    //alphanumeric: "Fill only alpha numeric character"
                }

            }

        });
        /*Init Shortcut*/
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Save", "#frm-submit-btn", "#render-body");
        /*End Init Shortcut*/
    }
}
var ModuleEdit = new function () {
    this.init = function (param) {
        $("#frm-cancel-btn").on('click', function () {
            utility._loadMenu('../Module/Index');
        });
        $("#frm-submit-btn").click(function () {
            if ($("#Form-Module").valid()) {
                utility._CRUD("Form-Module", "UPDATE");
            }
        });

        $("#frm-lov-btn").click(function () {
            utility.LoadLOV('../Icon/GetLoV', 'modal-Render', 'Form-Module#IDIcon#IconName')
            $('LOV-Icon').modal('show');
        });

        $(".close").click(function () {
            $("#errorDiv").hide();
        });

        $("#Form-Module input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });
        $("#Form-Module input:text, #Form-Module textarea").first().focus();
        $("#Form-Module").validate({
            errorPlacement: function (error, element) {
                error.appendTo('#errorMsgDiv')
            },
            onfocusout: false,
            onkeyup: false,
            invalidHandler: function (event, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {

                    $("#errorDiv").show();
                } else {
                    $("#errorDiv").hide();
                }
            },
            rules: {
                ModuleCode: {
                    required: true,
                    minlength: 2,
                    maxlength: 20,
                    alphanumeric: true
                },
                ModuleName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100,
                    alphanumeric: true
                },
                IconName: {
                    required: true
                },
                ModuleDesc: {
                    maxlength: 500,
                    alphanumeric: true
                }
            },
            messages: {
                ModuleCode: {
                    required: param.attribute.moduleCode + " " + param.validation.required + ".",
                    minlength: param.attribute.moduleCode + " " + param.validation.minLength + " 2.",
                    maxlength: param.attribute.moduleCode + " " + param.validation.maxLength + " 20.",
                    //alphanumeric: "Fill only alpha numeric character"
                },
                ModuleName: {
                    required: param.attribute.moduleName + " " + param.validation.required + ".",
                    minlength: param.attribute.moduleName + " " + param.validation.minLength + " 2.",
                    maxlength: param.attribute.moduleName + " " + param.validation.maxLength + " 100.",
                    // alphanumeric: "Fill only alpha numeric character"
                },
                IconName: {
                    required: param.attribute.icon + " " + param.validation.required + "."
                },
                ModuleDesc: {
                    maxlength: param.attribute.moduleDesc + " " + param.validation.maxLength + " 500.",
                    //alphanumeric: "Fill only alpha numeric character"
                }

            }

        });
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Save", "#frm-submit-btn", "#render-body");
    }


}
var ModuleDelete = new function () {
    this.init = function () {
        $("#frm-cancel-btn").on('click', function () {
            $('#modal-Render').html("");
            $('#DeleteModal').modal('hide');

        });
        $("#frm-submit-btn").click(function () {
            if ($("#Form-Module").valid()) {
                utility._CRUD("Form-Module", "DELETE");
                //$('#DeleteModal').modal('hide');
            }
        });
    }
    //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#DeleteModal");
    //shortcutPlugin.findShortcutByParentElement("Save", "#frm-submit-btn", "#DeleteModal");
    $(".close").click(function () {
        $("#errorDiv").hide();
    });

}