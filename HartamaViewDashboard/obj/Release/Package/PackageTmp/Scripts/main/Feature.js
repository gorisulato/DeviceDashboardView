var Feature = new function () {

    this.init = function (param) {
        $(".close").click(function () {
            $("#errorDiv").hide();
            $("#errorDivUpdate").hide();

        });
        //* Init Shortcut
        //shortcutPlugin.findShortcut("Edit", "#btnEditRow");
        //shortcutPlugin.findShortcut("Delete", "#btnDeleteRow");
        //shortcutPlugin.findShortcut("Add", "#btnAddRow");
        //shortcutPlugin.findShortcut("Move Up", "#btnUpRow");
        //shortcutPlugin.findShortcut("Move Down", "#btnDownRow");
        //shortcutPlugin.findShortcut("Duplicate", "#btnDuplicate");
        //shortcutPlugin.findShortcut("Move", "#btnMove");
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");

        //shortcutPlugin.findShortcutByParentElement("Edit", "#btnEditRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Delete", "#btnDeleteRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Add", "#btnAddRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Move Up", "#btnUpRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Move Down", "#btnDownRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Duplicate", "#btnDuplicate", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Move", "#btnMove", "#render-body");
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
            $('#btnMove').hide();
            $('#btnDuplicate').hide();
        }
        else {
            $('#btnEditRow').show();
            $('#btnMove').show();
            $('#btnDuplicate').show();
        };

        if (param.attribute.CanView == "False") {

            alert("Don't Allow");
            $('#body').hide();
        }
        else {
            $('#body').show();
        }
        //alert(utility.lastIDModule);

        //$("#successDiv").hide();
        $('.collapse-link').click(function () {
            var ibox = $("#box-content");//$(this).closest('div.ibox');
            var button = $(this).find('i');
            var content = ibox.find('div.ibox-content');
            content.slideToggle(200);
            button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
            ibox.toggleClass('').toggleClass('border-bottom');
            setTimeout(function () {
                ibox.resize();
                ibox.find('[id^=map-]').resize();
            }, 50);
        });

        $('#FEATURETMODULE').on('click', 'tbody tr ', function () {

            table.$('tr.row_selected').removeClass('row_selected');
            $(this).addClass('row_selected');
            $('#FEATURETMODULE tbody tr:eq(0) td input[type=radio]').prop('checked', true);;
            $("#Form-Feature #IDModule").val($(this).attr("idmodule"))
            $('#FEATURETMODULE tbody tr.row_selected td input[type=radio]').prop('checked', true);
            $("#FEATURETFEATURE").DataTable().draw();
            $(this).focus();
            $("#FeatureInformation").hide();
            Feature.clearfield();
        });

        var table = $('#FEATURETMODULE').dataTable({
            "dom": 't<i>',
            "processing": true,
            "serverSide": true,
            "ordering": false,
            "iDisplayLength": 50,
            "scrollX": false,
            "autoWidth": false,
            "scrollCollapse": true,
            "stateSave": true,
            "columnDefs": [
            {
                "targets": [0],
                "visible": true,

            }],
            "fnDrawCallback": function (oSettings, json) {

                $('#FEATURETMODULE tbody tr:eq(0)').addClass('row_selected');
                $('#FEATURETMODULE tbody tr:eq(0) td input[type=radio]').prop('checked', true);
                $("#IDModule").val($("#FEATURETMODULE tbody tr.row_selected").attr("idmodule"))
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var id = aData[0];
                // var FeaturesType = aData[3];
                var check = 'checked'
                //var result = ' <div class="radio i-checks"><label id="Radio-Check"> <input type="radio" value="option1" name="radio-Module"></label><input class="lastValue" type="hidden" name="0" value="0"> ' + aData[1] + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '"></div>';
                var result = ' <input type="radio" value="option1" name="radio-Module" ><label>&nbsp;</label><input class="lastValue" type="hidden" name="0" value="0"> ' + aData[1] + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '">';
                $(nRow).attr("idmodule", aData[0]);
                $('td:eq(0)', nRow).html(result);

                return nRow;
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
                "url": "../Feature/GetDataModule",
                "data": function (d) {
                    d.sEcho = "test";
                }
            },
            "fnInitComplete": function (oSettings, json) {

                if (utility.lastIDModule !== undefined) {
                    $('#FEATURETMODULE tbody tr:eq(0)').removeClass('row_selected')
                    $('#FEATURETMODULE tbody tr#' + utility.lastIDModule).addClass('row_selected');
                }
                $('#FEATURETMODULE tbody tr:eq(0)').addClass('row_selected');
                $('#FEATURETMODULE tbody tr:eq(0) td input[type=radio]').prop('checked', true);
                $("#IDModule").val($("#FEATURETMODULE tbody tr.row_selected").attr("idmodule"))
                var FeatureTable = $('#FEATURETFEATURE').dataTable({
                    "dom": 't<i>',
                    "processing": true,
                    "serverSide": true,
                    "ordering": false,
                    "iDisplayLength": 50,
                    "scrollX": false,
                    "autoWidth": false,
                    //"scrollY": "600px",
                    "scrollCollapse": true,
                    "stateSave": true,
                    "columnDefs": [
                    {
                        "targets": [2],
                        "visible": false,

                    }],
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        $(nRow).attr("idmodulefeature", aData[11]);
                        $(nRow).attr("ft", aData[3]);
                        $(nRow).attr("fa", aData[4]);
                        $(nRow).attr("pa", aData[5]);
                        $(nRow).attr("in", aData[6]);
                        $(nRow).attr("userentry", aData[7]);
                        $(nRow).attr("dateentry", aData[8]);
                        $(nRow).attr("userlastmaintenance", aData[9]);
                        $(nRow).attr("datelastmaintenance", aData[10]);
                        $(nRow).attr("idicon", aData[12]);
                        $(nRow).attr("idmodule", aData[13]);
                        $(nRow).attr("idfeature", aData[14]);
                        return nRow;
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
                    "fnDrawCallback": function (settings) {
                        //if ($("#hiddenIDFeature").val() !== "") {
                        //    $('#FEATURETFEATURE tbody tr#' + $("#hiddenIDFeature").val()).addClass('row_selected')

                        //}

                        //alert("OK");
                        var api = this.api();
                        var rows = api.rows({ page: 'current' }).nodes();
                        var last = null;

                        api.column(3, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                if (group == 'APP') {
                                    var grouping = 'Application'
                                }
                                else {
                                    var grouping = 'Report'
                                }
                                $(rows).eq(i).before(

                                    '<tr class="group" style="pointer-events: none;background: #FFF8DC;"><td colspan="5"><strong>' + grouping + '</strong></td></tr>'
                                );

                                last = group;
                            }
                        })
                        if ("" != $("#lastidfeature").val()) {
                            for (var i = 0; i < $("#FEATURETFEATURE tbody tr").length; i++) {
                                if ($("#FEATURETFEATURE tbody tr:eq(" + i + ")").attr('idfeature') == $("#lastidfeature").val()) {
                                    $("#FEATURETFEATURE tbody tr:eq(" + i + ")").addClass('row_selected');
                                    break;
                                } else {
                                    //console.log('')
                                }
                            }
                        }

                    },
                    "ajax": {
                        "url": "../Feature/GetDataFeatureByIDModule",
                        "data": function (d) {
                            d.sEcho = "test";
                            d.IDModule = $("#IDModule").val();
                        }
                    }

                });

                $(".custom_table_scroll").wrap("<div class='custom_table_scroll_wrappper'></div>");

                $('#FEATURETFEATURE').on('click', 'tbody tr', function () {
                    if ($(this).hasClass('row_selected')) {
                        //$(this).removeClass('row_selected');
                        //$("#hiddenIDFeature").val("")
                        $("#Form-Feature #IDModule").val($("#FEATURETMODULE tbody tr.row_selected").attr("idmodule"));

                    }
                    else {
                        FeatureTable.$('tr.row_selected').removeClass('row_selected');
                        $(this).addClass('row_selected');
                        $("#Form-Feature #IDModule").val($("#FEATURETMODULE tbody tr.row_selected").attr("idmodule"));

                    }
                    //$("#FEATURETFEATURE").DataTable().draw();
                    $(this).focus();
                });

                $('#FEATURETFEATURE').on('dblclick', 'tbody tr', function () {
                    if ($(this).hasClass('row_selected')) {
                        if ($("#FEATURETFEATURE tbody tr.row_selected td:eq(0)").text() != "Data Not Found") {
                            $("#Form-Feature #IDModule").val($(this).attr("idmodule"));
                            $("#Form-Feature #IDFeatures").val($(this).attr("idfeature"));
                            $("#Form-Feature #IDModuleFeatures").val($(this).attr("idmodulefeature"));
                            $("#Form-Feature #FeaturesCode").val($(this).find('td:eq(0)').text());
                            $("#Form-Feature #FeaturesName").val($(this).find('td:eq(1)').text());
                            $("#Form-Feature #FeaturesDesc").val($(this).find('td:eq(2)').text());
                            $("#Form-Feature #FeaturesType").val($(this).attr("ft"));
                            $("#Form-Feature #FeaturesAction").val($(this).attr("fa"));
                            $("#Form-Feature #PathApp").val($(this).attr("pa"));
                            $("#Form-Feature #IconClass").val($(this).attr("in"));
                            $("#Form-Feature #IDIcon").val($(this).attr("idicon"));
                            $("#Form-Feature #UserEntry").val($(this).attr("userentry"));
                            $("#Form-Feature #DateEntry").val($(this).attr("dateentry"));
                            $("#Form-Feature #UserLastMaintenance").val($(this).attr("userlastmaintenance"));
                            $("#Form-Feature #DateLastMaintenance").val($(this).attr("datelastmaintenance"));
                            $("#Form-Feature").attr("action", "/Feature/Edit");
                            $("#Form-Feature").attr("xxx", "Edit");
                            $("#Form-Feature #divuserentry").removeClass("hide");
                            $("#Form-Feature #divdateentry").removeClass("hide");
                            $("#Form-Feature #divuserlastmaintenance").removeClass("hide");
                            $("#Form-Feature #divdatelastmaintenance").removeClass("hide");
                            $("#Form-Feature #btnEditRow").show();
                            $("#Form-Feature #btnDeleteRow").show();
                            $("#Form-Feature #btnAddRow").hide();
                            $("#FeatureInformation").show();
                        }


                    }
                    else {
                        FeatureTable.$('tr.row_selected').removeClass('row_selected');
                        $(this).addClass('row_selected');
                        if ($("#FEATURETFEATURE tbody tr.row_selected td:eq(0)").text() != "Data Not Found") {
                            $("#Form-Feature #IDModule").val($(this).attr("idmodule"));
                            $("#Form-Feature #IDFeatures").val($(this).attr("idfeature"));
                            $("#Form-Feature #IDModuleFeatures").val($(this).attr("idmodulefeature"));
                            $("#Form-Feature #FeaturesCode").val($(this).find('td:eq(0)').text());
                            $("#Form-Feature #FeaturesName").val($(this).find('td:eq(1)').text());
                            $("#Form-Feature #FeaturesDesc").val($(this).find('td:eq(2)').text());
                            $("#Form-Feature #FeaturesType").val($(this).attr("ft"));
                            $("#Form-Feature #FeaturesAction").val($(this).attr("fa"));
                            $("#Form-Feature #PathApp").val($(this).attr("pa"));
                            $("#Form-Feature #IconClass").val($(this).attr("in"));
                            $("#Form-Feature #IDIcon").val($(this).attr("idicon"));
                            $("#Form-Feature #UserEntry").val($(this).attr("userentry"));
                            $("#Form-Feature #DateEntry").val($(this).attr("dateentry"));
                            $("#Form-Feature #UserLastMaintenance").val($(this).attr("userlastmaintenance"));
                            $("#Form-Feature #DateLastMaintenance").val($(this).attr("datelastmaintenance"));
                            $("#Form-Feature").attr("action", "/Feature/Edit");
                            $("#Form-Feature").attr("xxx", "Edit");
                            $("#Form-Feature #divuserentry").removeClass("hide");
                            $("#Form-Feature #divdateentry").removeClass("hide");
                            $("#Form-Feature #divuserlastmaintenance").removeClass("hide");
                            $("#Form-Feature #divdatelastmaintenance").removeClass("hide");
                            $("#Form-Feature #btnEditRow").show();
                            $("#Form-Feature #btnDeleteRow").show();
                            $("#Form-Feature #btnAddRow").hide();
                            $("#FeatureInformation").show();
                        }
                    }
                });



                if (utility.lastIDModule !== undefined) {
                    $('#FEATURETMODULE tbody tr#' + utility.lastIDModule).click();
                }
                $("#ModuleSelect").change(function () {
                    //$('#FEATURETFEATURE').DataTable().page.len(this.value).draw();
                    $('#FEATURETMODULE tbody tr#' + this.value).click();
                });


            }

        });
        /* start modal Module*/
        var ModuleModaltable = $('#FEATURETMODULEModal').dataTable({
            "dom": 't<"col-sm-6"i><"col-sm-6"p>',
            "processing": true,
            "serverSide": true,
            "ordering": false,
            "columnDefs": [
            {
                "targets": [0],
                "visible": true,

            }],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var id = aData[0];
                var result = aData[1] + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '">';
                $('td:eq(0)', nRow).html(result);
                $('td:eq(1)', nRow).html(aData[2]);
                return nRow;
            },

            "ajax": {
                "url": "../Feature/GetDataModalModule",
                "data": function (d) {
                    d.sEcho = "test";
                }
            }

        });
        // $(".custom_table_scroll").wrap("<div class='custom_table_scroll_wrappper'></div>");
        $('#FEATURETMODULEModal').on('click', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                $(this).removeClass('row_selected');
                //$('.i-checks div').removeClass('checked');

            }
            else {
                //ModuleModaltable.$('tr.row_selected').removeClass('row_selected');
                //ModuleModaltable.$('.i-checks div').removeClass('checked');
                ModuleModaltable.$('tr.row_selected').removeClass('row_selected');
                $(this).addClass('row_selected');

            }

        });

        $('#FEATURETMODULEModal').on('dblclick', 'tbody tr', function () {
            if ($('#ActModule').val() == 'move') {
                var id = $('#FEATURETFEATURE .row_selected').attr('idfeature');
                var idmodule = $(this).find('.theID').val();
                Feature.Move(idmodule, id);
            }
            else {
                //duplicate
                var id = $('#FEATURETFEATURE .row_selected').attr('idfeature');
                var idmodule = $(this).find('.theID').val();
                Feature.Duplicate(idmodule, id);
            }
        });

        $('#frm-lov-btn-src').on('click', function () {
            var keyword = $("#customSearch").val();
            $("#FEATURETMODULEModal").DataTable().search(
            keyword,
            false,
            true
            ).draw();

        }
       )

        $('#customSearch').keypress(function (e) {
            if (e.which == 13) {
                $('#frm-lov-btn-src').click();
                return false;
            }
        });

        //Arrow UP and Down

        utility.ArrowMoveInit("#FEATURETMODULE", 0);
        utility.ArrowMoveInit("#FEATURETFEATURE", 1);
        //ENd


        $("#btnMdlMove").on('click', function () {

            try {
                var id = $('#FEATURETFEATURE .row_selected').attr('idfeature');
                var idmodule = $('#FEATURETMODULEModal .row_selected').find('.theID').val();
            }
            catch (r) {
                var idmodule = 'undefined';
            }

            if (typeof idmodule !== 'undefined') {
                Feature.Move(idmodule, id);
            }
            else {
                toastr.remove();
                toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
            }

        });

        $("#btnMdlDuplicate").on('click', function () {

            try {
                var id = $('#FEATURETFEATURE .row_selected').attr('idfeature');
                var idmodule = $('#FEATURETMODULEModal .row_selected').find('.theID').val();
            }
            catch (r) {
                var idmodule = 'undefined';
            }

            if (typeof idmodule !== 'undefined') {
                Feature.Duplicate(idmodule, id);
            }
            else {
                toastr.remove();
                toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
            }

        });
        /* end modal Module*/


        $('#modal-Render').html("");







        $("#btnAddRow").click(function () {
            Feature.Create();
            //utility.lastid = $('#FEATURETMODULE tbody tr.row_selected').attr('id');
        });

        $("#btnEditRow").click(function () {
            $('#modal-Render-Edit').html("");
            Feature.Edit(param);
            //utility.lastid = $('#FEATURETMODULE tbody tr.row_selected').attr('id');
        });


        $("#btnDeleteRow").click(function () {
            $('#modal-Render').html("");
            Feature.Delete(param);
            //utility.lastid = $('#FEATURETMODULE tbody tr.row_selected').attr('id');

        });

        $("#btnMove").click(function () {
            try {

                var id = $('#FEATURETFEATURE .row_selected').attr('idfeature').val();
                var idmodule = $('#FEATURETMODULE .row_selected').attr('idmodule').val();
            }
            catch (r) {
                var id = 'undefined';
            }

            if (typeof id !== 'undefined') {
                $('#ModuleModal').modal('show');
                $('#btnMdlDuplicate').hide();
                $('#btnMdlMove').show();
                $('#ActModule').val('move');

            }
            else {
                toastr.remove();
                toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
            }

        });

        $("#btnDuplicate").click(function () {
            try {
                var id = $('#FEATURETFEATURE .row_selected').attr('idfeature').val();
                var idmodule = $('#FEATURETMODULE .row_selected').find('.theID').val();
            }
            catch (r) {
                var id = 'undefined';
            }

            if (typeof id !== 'undefined') {
                $('#ModuleModal').modal('show');
                $('#btnMdlDuplicate').show();
                $('#btnMdlMove').hide();
                $('#ActModule').val('duplicate');

            }
            else {
                toastr.remove();
                toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
            }

        });
        $("#btnDownRow").click(function () {
            Feature.UpdateSequence('DOWN', param);
        });
        $("#btnUpRow").click(function () {
            Feature.UpdateSequence('UP', param);

        });

        $("#FeatureInformation").hide();

        $('#closeModalIconFeature').click(function () {
            $('#LOV-Icon-Feature').modal('hide');
        })

        $("#Form-Feature #frm-lov-btn").click(function () {
            //alert('asdas');
            // $('#LOV-Icon').modal('show');
            utility.LoadLOVX('../Icon/GetLovFeature', 'modal-Render-icon-feature', 'Form-Feature#IDIcon#IconClass');

        });

        $("#btnFeatAddRow").click(function () {
            $("#FeatureInformation").hide();
            $("#Form-Feature #btnEditRow").hide();
            $("#Form-Feature #btnDeleteRow").hide();
            $("#IDModule").val($("#FEATURETMODULE tbody tr.row_selected").attr("idmodule"));
            //$("#btnSaveRow").show();
            //$("#btnCancelRow").show();
            //PAccount.clearfield();
            //PAccount.removereadonly();
            $("#Form-Feature #divuserentry").addClass("hide");
            $("#Form-Feature #divdateentry").addClass("hide");
            $("#Form-Feature #divuserlastmaintenance").addClass("hide");
            $("#Form-Feature #divdatelastmaintenance").addClass("hide");
            $("#Form-Feature").attr("action", "/Feature/Create");
            $("#Form-Feature").attr("xxx", "Create");
            $("#FeatureInformation").show();
        });

        $("#Form-Feature").validate({
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
                FeaturesCode: {
                    required: true,
                    minlength: 2,
                    maxlength: 20
                },
                FeaturesName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                FeaturesDesc: {
                    maxlength: 500
                },
                IconClass: {
                    required: true
                },
                PathApp: {
                    required: true,
                    minlength: 2,
                }
            },
            messages: {
                FeaturesCode: {
                    required: "Feature Code Required.",
                    minlength: "Feature Code Minimal 2 Charcter .",
                    maxlength: "Feature Code Maximal 20 Character .",
                },
                FeaturesName: {
                    required: "Feature Name Required.",
                    minlength: "Feature Name Minimum 20 Character .",
                    maxlength: "Feature Name Maximum 200 Character .",
                },
                FeaturesDesc: {
                    maxlength: "Feature Name Maximum 500 Character.",
                },
                IconClass: {
                    required: "Icon Required.",
                },
                PathApp: {
                    required: "Path Required.",
                    minlength: "Path Minimum 2 Character .",
                }
            }

        });

        $("#Form-Feature #btnSaveRow").click(function () {
            if ($("#Form-Feature").valid()) {
                utility.CRUDCW("Form-Feature", "FEATURETFEATURE", "FeatureMessage");
                $("#FeatureInformation").hide();
                Feature.clearfield();
                $('#FEATURETMODULE tbody tr#' + $("#Form-Feature #IDModule").val()).click();
            }
        });

        $("#Form-Feature #btnCancelRow").click(function () {
            $("#FeatureInformation").hide();
            Feature.clearfield();
        })

    }
    this.Move = function (IDModule, IDFeature) {

        $.ajax({
            type: "POST",
            url: '../Feature/FeatureMove?IDModule=' + IDModule + '&IDFeature=' + IDFeature,
            success: function (data) {
                url = '../Feature/Index';
                var msg = JSON.stringify(data.result);
                //alert(msg.split('|')[0]);
                if (msg.split('|')[0].substring(1) == 'Err') {
                    $("#errorMsgDiv").html(msg.split('|')[1]);
                    $("#errorDiv").show();


                } else {

                    $('#ModuleModal').modal('hide');

                    //utility._loadMenu(url, data.result);
                    $("#FEATURETFEATURE").DataTable().draw();
                    setTimeout(function () {
                        $("#successDiv").html(msg);
                        $("#successDiv").show();
                    }, 500);
                    setTimeout(function () {
                        $("#successDiv").hide("slow");
                    }, 4000);
                }
                //alert(JSON.stringify(data.result));
                //utility._loadMenu(url);
            },

            dataType: 'json'

        });
        return false;

    }
    this.Duplicate = function (IDModule, IDFeature) {
        $.ajax({
            type: "POST",
            url: '../Feature/FeatureDuplicate?IDModule=' + IDModule + '&IDFeature=' + IDFeature,
            success: function (data) {
                url = '../Feature/Index';
                var msg = JSON.stringify(data.result);
                //alert(msg.split('|')[0]);
                if (msg.split('|')[0].substring(1) == 'Err') {
                    $("#errorMsgDiv").html(msg.split('|')[1]);
                    $("#errorDiv").show();


                } else {

                    $('#ModuleModal').modal('hide');

                    //utility._loadMenu(url, data.result);
                    $("#FEATURETFEATURE").DataTable().draw();
                    setTimeout(function () {
                        $("#successDiv").html(msg);
                        $("#successDiv").show();
                    }, 500);
                    setTimeout(function () {
                        $("#successDiv").hide("slow");
                    }, 4000);
                }
                //alert(JSON.stringify(data.result));
                //utility._loadMenu(url);
            },

            dataType: 'json'

        });
        return false;

    }
    this.Create = function () {
        try {
            var id = $('#FEATURETMODULE .row_selected').find('.theID').val();

        }
        catch (r) {
            var id = 'undefined';
        }

        if (typeof id !== 'undefined') {
            utility._loadMenu("../Feature/Create/" + id);
        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }


    }
    this.Edit = function (param) {
        try {
            var id = $('#FEATURETFEATURE .row_selected').find('.theID').val();
            var idmodule = $('#FEATURETMODULE .row_selected').find('.theID').val();
        }
        catch (r) {
            var id = 'undefined';
        }

        if (typeof id !== 'undefined') {
            //var destination = '../Feature/Edit?IDFeature=' + id + '&IDModule=' + idmodule;
            //utility._loadModal(destination, 'modal-Render-Edit');
            //$('#EditModal').modal('show');
            $("#Form-Feature").attr("action", "/Feature/Edit");
            $("#Form-Feature").attr("xxx", "Edit");
            utility.CRUDCW("Form-Feature", "FEATURETFEATURE", "FeatureMessage");
            $("#FeatureInformation").hide();
            Feature.clearfield();
        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }


    }
    this.clearfield = function () {
        // ;
        $("#Form-Feature #IDFeatures").val("");
        $("#Form-Feature #IDModuleFeatures").val("");
        $("#Form-Feature #FeaturesCode").val("");
        $("#Form-Feature #FeaturesName").val("");
        $("#Form-Feature #FeaturesDesc").val("");
        $("#Form-Feature #FeaturesType").val("");
        $("#Form-Feature #FeaturesAction").val("");
        $("#Form-Feature #PathApp").val("");
        $("#Form-Feature #IconClass").val($(this).attr("in"));
        $("#Form-Feature #IDIcon").val("");
        $("#Form-Feature #UserEntry").val("");
        $("#Form-Feature #DateEntry").val("");
        $("#Form-Feature #UserLastMaintenance").val("");
        $("#Form-Feature #DateLastMaintenance").val("");
    }
    this.Delete = function (param) {
        try {
            var id = $('#FEATURETFEATURE .row_selected').attr('idfeature').val();
            var idmodule = $('#FEATURETMODULE .row_selected').find('.theID').val();
        }
        catch (r) {
            var id = '';
        }

        if (typeof id !== 'undefined') {
            //var destination = '../Feature/Delete?IDFeature=' + id + '&IDModule=' + idmodule;
            //utility._loadModal(destination, 'modal-Render');
            //$('#DeleteModal').modal('show');
            $("#Form-Feature").attr("action", "/Feature/Delete");
            $("#Form-Feature").attr("xxx", "Delete");
            utility.CRUDCW("Form-Feature", "FEATURETFEATURE", "FeatureMessage");
            $("#FeatureInformation").hide();
            Feature.clearfield();
        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }
    }
    this.UpdateSequence = function (direction, param) {
        try {

            var IDFeature = $('#FEATURETFEATURE tbody tr.row_selected').attr('idfeature');
            var FeatureType = $('#FEATURETFEATURE tbody tr.row_selected').attr('ft');
            var IDModule = $('#FEATURETFEATURE tbody tr.row_selected').attr('idmodule');
        }
        catch (r) {
            var IDFeature = 'undefined';
        }

        if (typeof IDFeature !== 'undefined') {
            var url = '../Feature/ModuleFeatureUpdateSequence';
            $.ajax({
                type: "POST",
                url: url,
                dataType: "html",
                data: "IDModule=" + IDModule + "&IDFeature=" + IDFeature + "&FeatureType=" + FeatureType + "&direction=" + direction,
                success: function (data) {
                    var msg = data.result;
                    if (parseInt(msg) > 0) {
                        var message = "Success Move Data";
                        utility.alert($("#FeatureMessage"), "success", message)
                        $("#lastidfeature").val(IDFeature)
                        $("#FEATURETFEATURE").DataTable().draw();


                    } else {
                        utility.alert($("#FeatureMessage"), "error", "Error Move Data")
                    }
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

    //* end Init Shortcut
}

var FeatureCreate = new function () {

    this.init = function (param) {
        utility.lastIDModule = $("#IDModule").val();
        //alert( $("#IDModule").val());
        $("#frm-cancel-btn").on('click', function () {
            utility._loadMenu('../Feature/Index');
            $('#FEATURETMODULE #' + utility.lastIDModule).click();
        });

        $("#frm-submit-btn").click(function () {
            if ($("#Form-Feature").valid()) {
                // FeatureInsertUpdateDelete._CRUD("Form-Feature", "INSERT", LastIDModule);
                utility._CRUD("Form-Feature", "INSERT");
            }
        });

        $("#frm-lov-btn").click(function () {
            //alert('asdas');
            // $('#LOV-Icon').modal('show');
            utility.LoadLOV('../Icon/GetLoV', 'modal-Render', 'Form-Feature#IDIcon#IconClass');

        });

        $(".close").click(function () {
            $("#errorDiv").hide();
        });

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        });

        $('input').on('ifChanged', function (event) {
            var val = $('#IsExternal').val();

            if (val == "false") {
                $('#IsExternal').val("true")
            }
            else {
                $('#IsExternal').val("false")
            }
        });
        $("#Form-Feature input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });
        $("#Form-Feature input:text, #Form-Feature textarea").first().focus();
        $("#Form-Feature").validate({
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
                FeaturesCode: {
                    required: true,
                    minlength: 2,
                    maxlength: 20
                },
                FeaturesName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                FeaturesDesc: {
                    maxlength: 500
                },
                IconClass: {
                    required: true
                },
                PathApp: {
                    required: true,
                    minlength: 2,
                }
            },
            messages: {
                FeaturesCode: {
                    required: param.attribute.FeaturesCode + " " + param.validation.required + ".",
                    minlength: param.attribute.FeaturesCode + " " + param.validation.minlength + " 2 .",
                    maxlength: param.attribute.FeaturesCode + " " + param.validation.maxlength + "20 .",
                },
                FeaturesName: {
                    required: param.attribute.FeaturesName + " " + param.validation.required + ".",
                    minlength: param.attribute.FeaturesName + " " + param.validation.minlength + "20 .",
                    maxlength: param.attribute.FeaturesName + " " + param.validation.maxlength + "200 .",
                },
                FeaturesDesc: {
                    maxlength: param.attribute.FeaturesDesc + " " + param.validation.maxlength + "00 .",
                },
                IconClass: {
                    required: param.attribute.IconClass + " " + param.validation.required + ".",
                },
                PathApp: {
                    required: param.attribute.PathApp + " " + param.validation.required + ".",
                    minlength: param.attribute.PathApp + " " + param.validation.minlength + "2 .",
                }
            }

        });

        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Save", "#frm-submit-btn", "#render-body");
    }

}

var FeatureEdit = new function () {


    this.init = function (param) {



        utility.lastIDModule = $("#IDModule").val();
        $("#Form-Feature #frm-cancel-btn").on('click', function () {
            $('#EditModal').modal('hide');
        });


        $("#Form-Feature #frm-submit-btn").click(function () {
            if ($("#Form-Feature").valid()) {
                utility._CRUD("Form-Feature", "UPDATE");
            }
        });

        $("#Form-Feature #frm-lov-btn").click(function () {
            utility.LoadLOV('../Icon/GetLoV', 'modal-Render', 'Form-Feature#IDIcon#IconClass');
            //$('#LOV-Icon').modal('show');
        });

        $(".close").click(function () {
            $("#errorDiv").hide();


        });

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        });

        $('input').on('ifChanged', function (event) {
            var val = $('#IsExternal').val();

            if (val == "false") {
                $('#IsExternal').val("true")
            }
            else {
                $('#IsExternal').val("false")
            }
        });

        $("#Form-Feature input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });
        $("#Form-Feature input:text, #Form-Feature textarea").first().focus();
        $("#Form-Feature").validate({
            errorPlacement: function (error, element) {
                error.insertAfter('#errorMsgDiv')
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
                FeaturesCode: {
                    required: true,
                    minlength: 2,
                    maxlength: 20
                },
                FeaturesName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                FeaturesDesc: {
                    maxlength: 500
                },
                IconClass: {
                    required: true
                },
                PathApp: {
                    required: true,
                    minlength: 2,
                }
            },
            messages: {
                FeaturesCode: {
                    required: param.attribute.FeaturesCode + " " + param.validation.required + ".",
                    minlength: param.attribute.FeaturesCode + " " + param.validation.minlength + " 2 .",
                    maxlength: param.attribute.FeaturesCode + " " + param.validation.maxlength + "20 .",
                },
                FeaturesName: {
                    required: param.attribute.FeaturesName + " " + param.validation.required + ".",
                    minlength: param.attribute.FeaturesName + " " + param.validation.minlength + "20 .",
                    maxlength: param.attribute.FeaturesName + " " + param.validation.maxlength + "200 .",
                },
                FeaturesDesc: {
                    maxlength: param.attribute.FeaturesDesc + " " + param.validation.maxlength + "00 .",
                },
                IconClass: {
                    required: param.attribute.IconClass + " " + param.validation.required + ".",
                },
                PathApp: {
                    required: param.attribute.PathApp + " " + param.validation.required + ".",
                    minlength: param.attribute.PathApp + " " + param.validation.minlength + "2 .",
                }
            }

        });
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Save", "#frm-submit-btn", "#render-body");
    }


    this.initIsExternal = function (IsExternal) {
        // alert(discontinue);
        if (IsExternal == "True" || IsExternal == "true") {
            //$(".icheckbox_square-green").addClass("checked");
            $('.icheckbox_square-green').iCheck('check');
            $('#IsExternal').val("true")
        }
        else {
            $(".icheckbox_square-green").removeClass("checked");
            $('#IsExternal').val("false")

        }


    }
}

var FeatureDelete = new function () {

    this.init = function () {
        var LastIDModule = $("#IDModule").val();
        $("#frm-cancel-btn").on('click', function () {
            $('#DeleteModal').modal('hide');
        });

        $("#frm-submit-btn").click(function () {
            if ($("#Form-Feature").valid()) {
                utility._CRUD("Form-Feature", "DELETE", LastIDModule);
            }
        });


        $(".close").click(function () {
            $("#errorDiv").hide();
        });

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        });

        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#DeleteModal");
        //shortcutPlugin.findShortcutByParentElement("Save", "#frm-submit-btn", "#DeleteModal");

    }
    this.initIsExternal = function (IsExternal) {
        // alert(discontinue);
        if (IsExternal == "True" || IsExternal == "true") {
            //$(".icheckbox_square-green").addClass("checked");
            $('.icheckbox_square-green').iCheck('check');
            $('#IsExternal').val("true")
        }
        else {
            $(".icheckbox_square-green").removeClass("checked");
            $('#IsExternal').val("false")

        }
    }

}

var FeatureInsertUpdateDelete = new function () {

    this._CRUD = function CRUD_(nameform, act, LastIDModule) {
        var url = $('#' + nameform).attr('action');
        var data = $('#' + nameform).serialize();
        //FeatureInsertUpdateDelete.lastidmodule =
        //alert(lastidmodule);
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            //lastidmodule : lastidmodule,
            success: function (data) {
                url = url.split('/')[1];
                url = url + '/index'
                var msg = JSON.stringify(data.result);
                //alert(msg.split('|')[0]);
                if (msg.split('|')[0].substring(1) == 'Err') {
                    $("#errorMsgDiv").html(msg.split('|')[1]);
                    $("#errorDiv").show();


                } else {
                    if (act == 'DELETE') {
                        $('#DeleteModal').modal('hide');
                        // $('#EditModal').modal('hide');
                    } else if (act == 'LOCKED') {
                        $('#LockedModal').modal('hide');
                    } else if (act == 'UNLOCKED') {
                        $('#UnlockedModal').modal('hide');
                    } else if (act == 'RESET') {
                        $('#ResetPasswordModal').modal('hide');
                    }

                    utility._loadMenu(url, data.result);
                    setTimeout(function () {
                        $("#successDiv").html(msg);
                        $("#successDiv").show();
                        //alert(utility.lastid);
                        $('#FEATURETMODULE #' + LastIDModule).click();
                    }, 500);
                    setTimeout(function () {
                        $("#successDiv").hide("slow");
                    }, 4000);
                }
                //alert(JSON.stringify(data.result));
                //utility._loadMenu(url);
            },

            dataType: 'json'

        });
        return false;
    }
}