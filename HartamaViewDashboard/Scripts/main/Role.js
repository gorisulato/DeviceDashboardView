
var Role = new function () {
    this.init = function (param) {

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
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
        $("#searchZ-box").show();

        //$("#successDiv").hide();

        if (param.history.Discontinue == '') {
            param.history.Discontinue = 'false'
        }

        // console.log(param.history.Discontinue)
        $("#Rolename").val(param.history.Keyword);
        $("#Discontinue-src").val(param.history.Discontinue);

        if (param.history.Discontinue == "true") {

            $('.i-checks').iCheck('check', function () {

                $("#Discontinue-src").val("true");

            });

        }
        var table = $('#ROLETROLE').dataTable({
            "dom": 't<"col-sm-6"i><"col-sm-6"p>',
            "processing": true,
            "serverSide": true,
            "iDisplayLength": 10,
            "scrollX": false,
            "autoWidth": false,

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var desc = aData[2];
                var id = aData[0];
                //var result = aData[1] + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '">';
                $('td:eq(0)', nRow).html(aData[1]);
                $('td:eq(1)', nRow).html(desc);
                if (aData[3] === 'True') {
                    var lbl = '<span class="label label-primary">' + aData[3] + '</span>';
                    //alert(label);
                }
                else {
                    var lbl = '<span class="label label-danger">' + aData[3] + '</span>';
                }
                $('td:eq(2)', nRow).html(lbl);
                //add by Irham 08-10-2015 for center
                $('td:eq(2)', nRow).addClass('set-center-item');
                //end
                $(nRow).attr('id', aData[0])
                $(nRow).attr('disc', aData[3])
                $(nRow).attr('userentry', aData[4]);
                $(nRow).attr('dateentry', aData[5]);
                $(nRow).attr('userlastmaintenance', aData[6]);
                $(nRow).attr('datelastmaintenance', aData[7]);

                return nRow;
            },
            "fnInitComplete": function (oSettings, json) {
                $('#ROLETROLE tbody tr:eq(0)').click();
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
                "url": "../Role/GetDataRole",
                "data": function (d) {
                    d.sEcho = "test";
                    d.keyword = $("#RoleNameSearch").val();
                    d.dis = $('#Discontinue-src').val();
                }
            }
        });

        $(".custom_table_scroll").wrap("<div class='custom_table_scroll_wrappper'></div>");

        $('#btn-role-Search').on('click', function () {
            var keyword = $("#Rolename").val();
            var discontinue = $('#Discontinue-src').val();
            $("#ROLETROLE").DataTable().search(
            keyword,
            false,
            true
            ).draw();

        })

        //Add By Irham 7-10-2015
        //Inisialiasi ArrowMove
        utility.ArrowMoveInit("#ROLETROLE", 0);
        //End Add By Irham
        $('#ROLETROLE').focus();
        //start add robby
        //for key enter in search textbox
        $('#Rolename').keypress(function (e) {
            if (e.which == 13) {
                $('#btn-role-Search').click();
                return false;    //<---- Add this line
            }
        });
        $('#ROLETROLE').on('click', 'tbody tr', function () {

            if ($(this).hasClass('row_selected')) {
                //$(this).removeClass('row_selected');
            }
            else {
                table.$('tr.row_selected').removeClass('row_selected');
                $(this).addClass('row_selected');
            }
        });

        $('#ROLETROLE').on('dblclick', 'tbody tr', function () {

            if ($(this).hasClass('row_selected')) {
                $("#Form-Role #IDRole").val($(this).attr('id'));
                $("#Form-Role #Rolename").val($(this).find('td:eq(0)').text());
                $("#Form-Role #RoleDesc").val($(this).find('td:eq(1)').text());
                $("#Form-Role #UserEntry").val($(this).attr('userentry'));
                $("#Form-Role #DateEntry").val($(this).attr('dateentry'));
                $("#Form-Role #UserLastMaintenance").val($(this).attr('userlastmaintenance'));
                $("#Form-Role #DateLastMaintenance").val($(this).attr('datelastmaintenance'));
                if ($(this).attr('disc') == "True") {
                    $("#Discontinue").iCheck("check");
                }
                $("#Form-Role #lbluserentry").show();
                $("#Form-Role #lbldateentry").show();
                $("#Form-Role #lbluserlastmaintenance").show();
                $("#Form-Role #lbldatelastmaitenance").show();
                $("#Form-Role").attr("action", "/Role/Edit");
                $("#Form-Role").attr("xxx", "Edit");
                $("#roleinformation").show()
                $("#btnAddRoleRow").show();
                $("#Form-Role #frm-DeleteRole-btn").show();
            }
            else {
                table.$('tr.row_selected').removeClass('row_selected');
                $(this).addClass('row_selected');
                $("#Form-Role #IDRole").val($(this).attr('id'));
                $("#Form-Role #Rolename").val($(this).find('td:eq(0)').text());
                $("#Form-Role #RoleDesc").val($(this).find('td:eq(1)').text());
                $("#Form-Role #UserEntry").val($(this).attr('userentry'));
                $("#Form-Role #DateEntry").val($(this).attr('dateentry'));
                $("#Form-Role #UserLastMaintenance").val($(this).attr('userlastmaintenance'));
                $("#Form-Role #DateLastMaintenance").val($(this).attr('datelastmaintenance'));
                if ($(this).attr('disc') == "True") {
                    $("#Discontinue").iCheck("check");
                }
                $("#Form-Role #lbluserentry").show();
                $("#Form-Role #lbldateentry").show();
                $("#Form-Role #lbluserlastmaintenance").show();
                $("#Form-Role #lbldatelastmaitenance").show();
                $("#Form-Role").attr("action", "/Role/Edit");
                $("#Form-Role").attr("xxx", "Edit");
                $("#roleinformation").show()
                $("#btnAddRoleRow").show();
                $("#Form-Role #frm-DeleteRole-btn").show();
            }
        });

        $("#btnAddRoleRow").click(function () {
            Role.Create();
        });

        /* inisialisasi ketika shortcut */
        $("#searchZ-box .dropdown-toggle").click(function (e) {
            // e.stopImmediatePropagation();
            if ($('#searchZ-box').hasClass('open')) {
                $('#searchZ-box').removeClass('open');
                $('#searchZ-box .dropdown-menu').hide();
                $('#ROLETROLE').focus();
            }
            else {
                $('#searchZ-box').addClass('open');
                $('#searchZ-box .dropdown-menu').show();
                $('#Rolename').focus();
            }
            return false;
        });
        $(document).click(function (e) {
            var target = e.target;

            if (!$(target).is('#searchZ-box .dropdown-menu') && !$(target).parents().is('#searchZ-box .dropdown-menu')) {
                $('#searchZ-box .dropdown-menu').hide();
                $('#searchZ-box').removeClass('open');
            }
        });
        $("#page-length").change(function () {
            $('#ROLETROLE').DataTable().page.len(this.value).draw();
        });

        //implementasi tab
        utility.initCheckbox()
        $("#roleinformation").hide();
        $("#Form-Role").validate({
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
            onblur: function (element) {
                var element_id = $(element).attr('id');
                if (this.settings.rules[element_id].onblur !== false) {
                    $(element).valid();
                }
            },
            ignore: ".ignore",
            rules: {
                Rolename: {
                    required: true,
                    minlength: 2,
                    maxlength: 200,
                },
                RoleDesc: {

                    maxlength: 500,
                }
            },
            messages: {
                Rolename: {
                    required: "Rolename Required.",
                    minlength: "Rolename Min 2 Character.",
                    maxlength: "Rolename Max 200 Character",

                },
                RoleDesc: {
                    maxlength: "Role Description Max 500 Character",
                }
            }
        });

        $("#frm-submitRole-btn").click(function () {
            if ($("#Form-Role").valid()) {
                utility.CRUDCW("Form-Role", "ROLETROLE", "MesssageRole");
                $("#roleinformation").hide();
                Role.clearfield();
            }
        });

        $("#frm-DeleteRole-btn").click(function () {
            $("#Form-Role").attr("action", "/Role/Delete");
            $("#Form-Role").attr("xxx", "Delete");
            utility.CRUDCW("Form-Role", "ROLETROLE", "MesssageRole");
            Role.clearfield();
            $("#roleinformation").hide();
        });

        $("#frm-cancelRole-btn").click(function () {
            $("#roleinformation").hide();
            $("#btnAddRoleRow").show();
            Role.clearfield();
            $("#Form-Role").validate().resetForm();
        })



        //
    }

    this.Create = function () {
        $("#Form-Role").attr("action", "/Role/Create");
        $("#Form-Role").attr("xxx", "Create");
        $("#roleinformation").show()
        $("#btnAddRoleRow").hide();
        $("#Form-Role #frm-DeleteRole-btn").hide();
        $("#Form-Role #lbluserentry").hide();
        $("#Form-Role #lbldateentry").hide();
        $("#Form-Role #lbluserlastmaintenance").hide();
        $("#Form-Role #lbldatelastmaintenance").hide();
    }

    this.Edit = function (param) {
        try {
            var id = $('.row_selected').find('.theID').val();

        }
        catch (r) {
            var id = '';
        }

        if (typeof id !== 'undefined') {
            var destination = '../Role/Edit?id=' + id + "&historyKeyword=" + $("#Rolename").val() + "&historyDiscontinue=" + $("#Discontinue-src").val();
            utility._loadMenu(destination);

        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }
    }
    this.Delete = function (param) {
        try {
            var id = $('.row_selected').find('.theID').val();

        }
        catch (r) {
            var id = 'undefined';
        }

        if (typeof id !== 'undefined') {
            var destination = '../Role/Delete?id=' + id + "&historyKeyword=" + $("#Rolename").val() + "&historyDiscontinue=" + $("#Discontinue-src").val();
            utility._loadModal(destination, 'modal-Render');

            $('#DeleteModal').modal('show');
        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }
    }
    this.clearfield = function (param) {

        $("#Form-Role #Rolename").val();
        $("#Form-Role #RoleDesc").val();
        $("#Form-Role #Discontinue").iCheck("uncheck");
    }
}

var RoleCreate = new function () {

    this.init = function (param) {
        var historyURL = "historyKeyword=" + param.history.Keyword + "&historyDiscontinue=" + param.history.Discontinue;
        $("#ftr-name").click(function (e) {
            utility._loadMenu('../Role/Index?' + historyURL);
            e.stopImmediatePropagation();
        })
        $("#frm-cancel-btn").on('click', function () {
            utility._loadMenu('../Role/Index?' + historyURL);
        });

        $('.wrapper-content').click(function (e) {
            //console.log($(this).attr('class'));
            if (openTooltips == true) {
                RoleToolTips.tooltipsHide();
                //console.log($('#Rolename').tooltipster('enable'));
            }
        });

        $('.active-tooltips').click(function () {
            //alert(openTooltips);

            //$(document).keypress(function (e) {
            //    RoleToolTips.tooltipsHide();
            //});



            if (openTooltips == false) {
                RoleToolTips.tooltipsOpen();


            }
            else {
                RoleToolTips.tooltipsHide();

            }
            ////$('#Rolename').tooltipster('disable');
            //// $('#RoleDesc').tooltipster('disable');
            //$(".active-tooltips").attr('class', 'deactive-tooltips');
            //$('.deactive-tooltips').click(function () {
            //    alert("wasu");
            //    $('#Rolename').tooltipster('disable');
            //    $('#RoleDesc').tooltipster('disable');
            //    //$('#Rolename').tooltipster('disable');
            //    // $('#RoleDesc').tooltipster('disable');
            //    $(".deactive-tooltips").attr('class', 'active-tooltips');
            //    //RoleCreate.tooltipsInit();
            //});

        });



        $("#frm-submit-btn").click(function () {
            if ($("#Form-Role").valid()) {
                utility._CRUD("Form-Role", "INSERT", historyURL);
            }
        });

        $(".close").click(function () {
            $("#errorDiv").hide();
        });

        $("#Form-Role input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });

        $("#Form-Role input:text, #Form-Role textarea").first().focus();
        $("#Form-Role").validate({
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
                Rolename: {
                    required: true,
                    minlength: 2,
                    maxlength: 200,
                },
                RoleDesc: {

                    maxlength: 500,
                }
            },
            messages: {
                Rolename: {
                    required: param.attribute.Rolename + " " + param.validation.required + ".",
                    minlength: param.attribute.Rolename + " " + param.validation.minLength + " 2.",
                    maxlength: param.attribute.Rolename + " " + param.validation.maxLength + " 200",

                },
                RoleDesc: {
                    maxlength: param.attribute.Rolename + " " + param.validation.maxLength + " 500",
                }
            }
        });
        /*Init Shortcut*/
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#Form-Role");
        //shortcutPlugin.findShortcutByParentElement("Yes", "#frm-submit-btn", "#Form-Role");
        /*End Init Shortcut*/
    }


}

var RoleEdit = new function () {

    this.init = function (param) {
        var historyURL = "historyKeyword=" + param.history.Keyword + "&historyDiscontinue=" + param.history.Discontinue;
        $("#ftr-name").click(function (e) {
            utility._loadMenu('../Role/Index?' + historyURL);
            e.stopImmediatePropagation();
        });
        $("#frm-cancel-btn").on('click', function () {
            utility._loadMenu('../Role/Index?' + historyURL);
        });
        //shortcutPlugin.findShortcut("Yes", "#frm-submit-btn");
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        $("#frm-submit-btn").click(function () {
            if ($("#Form-Role").valid()) {
                utility._CRUD("Form-Role", "UPDATE", historyURL);
            }
        });

        $(".close").click(function () {
            $("#errorDiv").hide();
        });
        $("#Form-Role input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });
        $("#Form-Role input:text, #Form-Role textarea").first().focus();
        $("#Form-Role").validate({
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
                Rolename: {
                    required: true,
                    minlength: 2
                }
            },
            messages: {
                Rolename: {
                    required: param.attribute.Rolename + " " + param.validation.required + ".",
                    minlength: param.attribute.Rolename + " " + param.validation.minLength + " 2.",
                }
            }

        });

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        });

        $('input').on('ifChanged', function (event) {
            var val = $('#Discontinue').val();

            if (val == "false") {
                $('#Discontinue').val("true")
            }
            else {
                $('#Discontinue').val("false")
            }
        });
        /*Init Shortcut*/
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#Form-Role");
        //shortcutPlugin.findShortcutByParentElement("Yes", "#frm-submit-btn", "#Form-Role");
        /*End Init Shortcut*/
    }

    this.initDiscontinue = function (discontinue) {
        // alert(discontinue);
        if (discontinue == "True" || discontinue == "true") {
            //$(".icheckbox_square-green").addClass("checked");
            $('.icheckbox_square-green').iCheck('check');
            $('#Discontinue').val("true")
        }
        else {
            $(".icheckbox_square-green").removeClass("checked");
            $('#Discontinue').val("false")

        }


    }
}

var RoleDelete = new function () {

    this.init = function (param) {
        var historyURL = "historyKeyword=" + param.history.Keyword + "&historyDiscontinue=" + param.history.Discontinue;
        $("#frm-cancel-btn").on('click', function () {
            $('#modal-Render').html("");
            $('#DeleteModal').modal('hide');

        });
        $("#frm-submit-btn").click(function () {
            if ($("#Form-Role").valid()) {
                utility._CRUD("Form-Role", "DELETE", historyURL);
                //$('#DeleteModal').modal('hide');

            }
        });
        $('#checkDiscontinue').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });



        /*Init Shortcut*/
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#DeleteModal");
        //shortcutPlugin.findShortcutByParentElement("Yes", "#frm-submit-btn", "#DeleteModal");
        /*End Init Shortcut*/
    }
    $(".close").click(function () {
        $("#errorDiv").hide();
    });

    this.initDiscontinue = function (discontinue) {
        //alert(discontinue);
        if (discontinue == "True" || discontinue == "true") {
            //$(".icheckbox_square-green").addClass("checked");
            $('#checkDiscontinue').iCheck('check');
            $('#Discontinue').val("true")
        }
        else {
            $("#checkDiscontinue").removeClass("checked");
            $('#Discontinue').val("false")

        }
    }
}

var RoleToolTips = new function () {

    this.tooltipsHide = function () {
        $('#Rolename').tooltipster('hide');
        $('#RoleDesc').tooltipster('hide');
        $('#frm-submit-btn').tooltipster('hide');
        $('#Rolename').tooltipster('disable');
        $('#RoleDesc').tooltipster('disable');
        //$('#frm-submit-btn').tooltipster('disable');
        openTooltips = false

    }

    this.tooltipsOpen = function () {
        $('#Rolename').tooltipster('enable');
        $('#RoleDesc').tooltipster('enable');
        $('#frm-submit-btn').tooltipster('enable');
        $('#Rolename').tooltipster('show');
        $('#RoleDesc').tooltipster('show');
        //$('#frm-submit-btn').tooltipster('show');
        openTooltips = true

    }

    this.tooltipsInit = function (param) {
        $('#Rolename').tooltipster({
            content: $('<img class="img-circle" src="/Images/profile_small.jpg" alt="image"><strong>' + param.val.TooltipsRolenameInput + '</strong>'),
            autoClose: false,
            triger: 'click'
        });
        $('#RoleDesc').tooltipster({
            content: $('<strong>' + param.val.TooltipsRoleDescInput + '  <a href="http://www.google.com" target="_blank">click here</a> </strong>'),
            position: 'right',
            autoClose: false,
            contentAsHTML: true,
            interactive: true
        });
        //$('#frm-submit-btn').tooltipster({
        //    content: $('<strong>' + param.val.TooltipsButtonSave + ' </strong>'),
        //    position: 'bottom',
        //    autoClose: false
        //});
        $('#Rolename').tooltipster('disable');
        $('#RoleDesc').tooltipster('disable');
        // $('#frm-submit-btn').tooltipster('disable');
    }
}
var openTooltips = false;