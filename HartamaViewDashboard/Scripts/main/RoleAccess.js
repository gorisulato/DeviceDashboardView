var RoleAccess = new function () {
    this.init = function (param) {
        $("#hiddenIDRole").show();
        var HVisible = null;
        var IDFeatureAccess = null;
        var Action = null;
        var Visible = null;
        var View = null;
        var New = null;
        var Edit = null;
        var Delete = null;
        var Print = null;
        var IDModuleFeatures = null;
        var BindVisible = $('#Form-RoleAccess input[name="BindVisible"]');
        var BindIDFeatureAccess = $('#Form-RoleAccess input[name="BindIDFeatureAccess"]');
        var BindAction = $('#Form-RoleAccess input[name="BindAction"]');
        var BindView = $('#Form-RoleAccess input[name="BindView"]');
        var BindNew = $('#Form-RoleAccess input[name="BindNew"]');
        var BindEdit = $('#Form-RoleAccess input[name="BindEdit"]');
        var BindDelete = $('#Form-RoleAccess input[name="BindDelete"]');
        var BindPrint = $('#Form-RoleAccess input[name="BindPrintable"]');
        var BindIDModuleFeatures = $('#Form-RoleAccess input[name="BindIDModuleFeatures"]');
        $("#successDivRole").hide();
        var tableRole = $('#TRole1').dataTable({
            "dom": 't',
            "processing": true,
            "serverSide": true,
            "ordering": false,
            "iDisplayLength": 10,
            "scrollX": false,
            "autoWidth": false,
            "columnDefs": [
            {
                "targets": [0],
                "visible": false
            }],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $(nRow).attr('id', aData[0]);
                var result = ' <input type="radio" value="option1" name="radio-Module1" ><label>&nbsp;</label> ' + aData[1];
                $('td:eq(0)', nRow).html(result);
                return nRow;
            },
            "ajax": {
                "url": "../RoleAccess/GetDataRole",
                "data": function (d) {
                    d.sEcho = "test";
                }
            },
            "fnInitComplete": function () {
                $("#TRole1 tbody tr:eq(0)").addClass('row_selected');

                $("#TRole1 tbody tr:eq(0) td input[type=radio]").prop('checked', true);
                var id = $("#TRole1 tbody tr:eq(0)").attr('id');
                $("#TRole1").focus();
                $("#TRole1 tbody tr:eq(0)").click();
                $("#hiddenID").val(id);
                $("#hiddenIDRole").val(id);
                var table = $('#TModuleFeatures1').dataTable({
                    "dom": 'ti',
                    "processing": true,
                    "serverSide": true,
                    "info": false,
                    "ordering": false,
                    "iDisplayLength": 50,
                    "scrollCollapse": true,
                    "scrollX": false,
                    "autoWidth": false,
                    "bpaginate": false,
                    "columnDefs": [
                    {
                        "targets": [0],
                        "visible": false
                    },
                    {
                        "targets": [1],
                        "visible": false
                    },
                    {
                        "targets": [2],
                        "visible": false
                    }
                    ],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        var checkedVisible = "";
                        var checkedView = "";
                        var checkedNew = "";
                        var checkedEdit = "";
                        var checkedDelete = "";
                        var checkedPrintable = "";
                        if (aData[12] == "True") { checkedVisible = "checked" } else { checkedVisible = "unchecked" }
                        if (aData[13] == "True") { checkedView = "checked" } else { checkedView = "unchecked" }
                        if (aData[14] == "True") { checkedNew = "checked" } else { checkedNew = "unchecked" }
                        if (aData[15] == "True") { checkedEdit = "checked" } else { checkedEdit = "unchecked" }
                        if (aData[16] == "True") { checkedDelete = "checked" } else { checkedDelete = "unchecked" }
                        if (aData[17] == "True") { checkedPrintable = "checked" } else { checkedPrintable = "unchecked" }
                        var modul = aData[1].replace(/\s+/g, '');
                        var classRow = modul + " hidden";
                        var checkbox = "<input type='checkbox'/>";
                        $(nRow).attr('id', aData[0]);
                        $(nRow).attr('class', classRow);
                        $('td:eq(0)', nRow).html(aData[3]);
                        $('td:eq(1)', nRow).html(aData[4]);
                        $('td:eq(2)', nRow).html("<input type='hidden' name='IDModuleFeatures' value='" + aData[0] + "'/><input type='hidden' name='IDFeatureAccess' value='" + aData[18] + "'/><input type='hidden' name='Action' value='null'/><input type='checkbox'  name='check" + aData[5] + "' id='" + aData[11] + "' " + checkedVisible + "/><label>&nbsp;</label>");
                        //add by Irham 08-10-2015 for center 
                        $('td:eq(2)', nRow).addClass('set-center-item');
                        //end
                        $('td:eq(3)', nRow).html("<input type='checkbox'  name='check" + aData[6] + "' id='" + aData[11] + aData[6] + "' " + checkedView + "/><label>&nbsp;</label>");
                        //add by Irham 08-10-2015 for center 
                        $('td:eq(3)', nRow).addClass('set-center-item');
                        //end
                        $('td:eq(4)', nRow).html("<input type='checkbox'  name='check" + aData[7] + "' id='" + aData[11] + aData[7] + "' " + checkedNew + "/><label>&nbsp;</label>");
                        //add by Irham 08-10-2015 for center 
                        $('td:eq(4)', nRow).addClass('set-center-item');
                        //end
                        $('td:eq(5)', nRow).html("<input type='checkbox'  name='check" + aData[8] + "' id='" + aData[11] + aData[8] + "' " + checkedEdit + "/><label>&nbsp;</label>");
                        //add by Irham 08-10-2015 for center 
                        $('td:eq(5)', nRow).addClass('set-center-item');
                        //end
                        $('td:eq(6)', nRow).html("<input type='checkbox'  name='check" + aData[9] + "' id='" + aData[11] + aData[9] + "' " + checkedDelete + "/><label>&nbsp;</label>");
                        //add by Irham 08-10-2015 for center 
                        $('td:eq(6)', nRow).addClass('set-center-item');
                        //end
                        $('td:eq(7)', nRow).html("<input type='checkbox'  name='check" + aData[10] + "' id='" + aData[11] + aData[10] + "' " + checkedPrintable + "/><label>&nbsp;</label>");
                        //add by Irham 08-10-2015 for center 
                        $('td:eq(7)', nRow).addClass('set-center-item');
                        //end

                        return nRow;
                    },
                    "drawCallback": function (settings) {
                        var api = this.api();
                        var rows = api.rows({ page: 'current' }).nodes();
                        var last = null;

                        api.column(1, { page: 'current' }).data().each(function (group, i) {

                            var newgroup = group.replace(/\s+/g, '');
                            if (last !== group) {
                                $(rows).eq(i).before(


                                    '<tr class="group parent" id="' + newgroup + '"><td colspan="8" ><h5><strong>+ ' + group + ' +</h5></strong></td></tr>'
                                );
                                last = group;
                            }

                        });
                        api.column(2, { page: 'current' }).data().each(function (group, i) {
                            var featureType = group.split(" ")[0];
                            if (last !== group) {
                                $(rows).eq(i).before(
                                    '<tr class="group ' + group + ' hidden" style="pointer-events: none; background: #FFF8DC;"><td colspan="8"><strong>' + featureType + '</strong></td></tr>'
                                );

                                last = group;

                            }
                        });
                    },
                    "ajax": {
                        "url": "../RoleAccess/GetDataModuleFeatures",
                        "type": "POST",
                        "data": function (d) {
                            d.sEcho = "test";
                            d.IDRole = $("#hiddenIDRole").val();
                        }

                    },
                    "fnInitComplete": function () {



                    }


                })
                //Add By Irham 7-10-2015 
                //Inisialiasi ArrowMove
                utility.ArrowMoveInit("#TRole1", 0);
                utility.ArrowMoveInit("#TModuleFeatures1", 1);
                //End Add By Irham

                $("#TRole1").focus();
                $('#TRole1').on('click', 'tbody tr', function () {

                    tableRole.$('tr.row_selected').removeClass('row_selected');
                    $(this).addClass('row_selected');
                    $("#hiddenIDRole").val(this.id);
                    $("#hiddenID").val(this.id);
                    $('tr.row_selected td input[type=radio]').prop('checked', true);
                    $("#RoleSelect").val(this.id);
                    $("#TModuleFeatures1").DataTable().draw();
                });

                $("#RoleSelect").change(function () {
                    //$('#TFeature').DataTable().page.len(this.value).draw();

                    $('#TRole1 tbody tr#' + this.value).click();
                });

                $('#Form-RoleAccess').on('click', 'input[type="checkbox"]', function () {
                    IDFeatureAccess = $('#Form-RoleAccess input[name="IDFeatureAccess"]');
                    Action = $('#Form-RoleAccess input[name="Action"]');
                    Visible = $('#Form-RoleAccess input[name="checkVisible"]');
                    View = $('#Form-RoleAccess input[name="checkview"]');
                    New = $('#Form-RoleAccess input[name="checkNew"]');
                    Edit = $('#Form-RoleAccess input[name="checkEdit"]');
                    Delete = $('#Form-RoleAccess input[name="checkDelete"]');
                    Print = $('#Form-RoleAccess input[name="checkPrintable"]');
                    IDModuleFeatures = $('#Form-RoleAccess input[name="IDModuleFeatures"]');
                    var attribut = $('#Form-RoleAccess input[name="' + this.name + '"]');
                    var id = this.id;
                    var target = this.name.substr(5);
                    var HRandom = $('#Form-RoleAccess input[name="' + target + '"]')
                    var found = searchElement(attribut, id);
                    if (this.name == "checkVisible") {
                        if (this.checked == true) {
                            View[found].checked = true;
                            New[found].checked = true;
                            Edit[found].checked = true;
                            Delete[found].checked = true;
                            Print[found].checked = true;
                            if (IDFeatureAccess[found].value == "null") {
                                Action[found].value = "Insert";
                            }
                            else {
                                Action[found].value = "Update";
                            }
                        }
                        else {
                            View[found].checked = false;
                            New[found].checked = false;
                            Edit[found].checked = false;
                            Delete[found].checked = false;
                            Print[found].checked = false;
                            if (IDFeatureAccess[found].value !== "null") {
                                Action[found].value = "Delete";
                            } else {
                                Action[found].value = "null";
                            }

                        }
                    }
                    else {
                        if (this.checked == true) {
                            Visible[found].checked = true;
                            if (IDFeatureAccess[found].value == "null") {
                                Action[found].value = "Insert";
                            }
                            else {
                                Action[found].value = "Update";
                            }
                        }
                        else {
                            if (IDFeatureAccess[found].value == "null") {
                                Action[found].value = "Insert";
                            }
                            else {
                                Action[found].value = "Update";
                            }
                            if (View[found].checked == false && New[found].checked == false && Edit[found].checked == false && Delete[found].checked == false && Print[found].checked == false) {
                                Visible[found].checked = false;
                                if (IDFeatureAccess[found].value !== "null") {
                                    Action[found].value = "Delete";
                                }
                                else {
                                    Action[found].value = "null";
                                }
                            }
                        }
                    }


                })
                $('#selectAll').click(function () {
                    var checkVisible = $('#Form-RoleAccess input[name="checkVisible"]');
                    for (var i = 0; i < checkVisible.length; i++) {
                        if (checkVisible[i].checked == false) {
                            checkVisible[i].click();
                        }
                        else {
                            checkVisible[i].click();
                            checkVisible[i].click();
                        }
                    }
                })
                $('#unselectAll').click(function () {
                    var checkVisible = $('#Form-RoleAccess input[name="checkVisible"]');
                    for (var i = 0; i < checkVisible.length; i++) {
                        if (checkVisible[i].checked == true) {
                            checkVisible[i].click();
                        }
                        else {
                            checkVisible[i].click();
                            checkVisible[i].click();
                        }
                    }
                })

                $('#modal-Render').html("");

                $('#TModuleFeatures1').on('click', 'tbody tr', function () {
                    var id = "." + this.id;
                    if (!$(this).hasClass('group')) {
                        if (!$(this).hasClass('row_selected')) {


                            table.$('tr.row_selected').removeClass('row_selected');
                            $(this).addClass('row_selected');
                            $//("#TModuleFeatures1").find(id).removeClass('hidden');

                        }
                    }
                    else {
                        if (!$(TModuleFeatures1).find(id).hasClass('hidden')) {
                            $("#TModuleFeatures1").find(id).addClass('hidden');
                        }
                        else {
                            $("#TModuleFeatures1").find(id).removeClass('hidden');

                        }

                    }
                });
                $("#save").click(function () {
                    var ValidateAction = $('#Form-RoleAccess input[name="Action"]');
                    var Allow = "false";
                    for (var i = 0; i < ValidateAction.length; i++) {
                        if (ValidateAction[i].value == "Insert" || ValidateAction[i].value == "Update" || ValidateAction[i].value == "Delete") {
                            Allow = "true";
                            break;
                        }
                    }
                    if (Allow == "true") {

                        BindElement(Action);

                        var data = $('#Form-RoleAccess').serialize();
                        console.log(data)
                        $.ajax({
                            type: "POST",
                            url: "/RoleAccess/Save",
                            data: data,
                            success: function (data) {

                                BindVisible.val("");
                                BindIDFeatureAccess.val("");
                                BindAction.val("");
                                BindView.val("");
                                BindNew.val("");
                                BindEdit.val("");
                                BindDelete.val("");
                                BindPrint.val("");
                                BindIDModuleFeatures.val("");
                                var msg = JSON.stringify(data.result);
                                var now = new Date();
                                var date = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear()
                                if (msg.split('|')[0].substring(1) != '1') {

                                    $("#successDivRole").html(msg);
                                    $("#successDivRole").show();
                                } else {

                                    $("#TModuleFeatures1").DataTable().draw();
                                    setTimeout(function () {
                                        $("#successDivRole").html("Succes Update Data  " + date);
                                        $("#successDivRole").show();
                                    }, 500);
                                    setTimeout(function () {
                                        $("#successDivRole").hide("slow");
                                    }, 4000);
                                }

                            },

                            dataType: 'json'


                        });
                    }
                    else {
                        toastr.remove();
                        toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
                    }

                });

            }
        });
        $(".custom_table_scroll").wrap("<div class='custom_table_scroll_wrappper'></div>");
        var searchElement = function (element, id) {
            var found = 0;
            for (var i = 0; i < element.length; i++) {
                if (id == element[i].id) {
                    found = i;
                    break;
                }
            }
            return found;
        }

        var BindElement = function (element, id) {
            for (var i = 0; i < element.length; i++) {
                if (element[i].value !== "null") {
                    BindAction.val(BindAction.val() + Action[i].value + ",");
                    BindDelete.val(BindDelete.val() + Delete[i].checked + ",");
                    BindVisible.val(BindVisible.val() + Visible[i].checked + ",");
                    BindView.val(BindView.val() + View[i].checked + ",");
                    BindEdit.val(BindEdit.val() + Edit[i].checked + ",");
                    BindNew.val(BindNew.val() + New[i].checked + ",");
                    BindPrint.val(BindPrint.val() + Print[i].checked + ",");
                    BindIDFeatureAccess.val(BindIDFeatureAccess.val() + IDFeatureAccess[i].value + ",");
                    BindIDModuleFeatures.val(BindIDModuleFeatures.val() + IDModuleFeatures[i].value + ",");
                }

            }

        }




        $("#cancel").click(function () {

            $("#TModuleFeatures1").DataTable().draw();

        });




        /*Init shortcut */
        //shortcutPlugin.findShortcut("Save", "#save");
        //shortcutPlugin.findShortcut("Cancel", "#cancel");
        //shortcutPlugin.findShortcut("Unselect All", "#unselectAll");
        //shortcutPlugin.findShortcut("Select all", "#selectAll");

        //shortcutPlugin.findShortcutByParentElement("Save", "#save", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#cancel", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Unselect All", "#unselectAll", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Select al", "#selectAll", "#render-body");
        /* end Init Shortcut */






    }

}