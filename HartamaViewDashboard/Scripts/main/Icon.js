var IconLOV = new function () {
    this.init = function (param) {


        var table = $('#TIconLov').dataTable({
            "dom": 't<"col-sm-6"i><"col-sm-6"p>',
            "processing": true,
            "serverSide": true,
            "scrollX": false,
            "autoWidth": false,
            "iDisplayLength": 10,
            "scrollX": true,
            //"ordering": false,

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var imgLink = '';  //posisi data path image
                var imgTag = '';
                var imgClass = '';
                var id = aData[0];
                var result = aData[1] ;

                if (aData[2] == 'Unicode') {
                    imgLink = aData[5];
                    imgTag = ' <i class="fa ' + imgLink + '"></i>';
                    imgClass = imgLink;
                }
                else {
                    imgLink = aData[1];
                    imgTag = "<img src='" + aData[6] + "'  alt='image'> ";
                    imgClass = aData[6];
                }
                $('td:eq(0)', nRow).html(result);
                $('td:eq(1)', nRow).html(imgLink + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '"><input type="hidden" class="typeIcon" value="' + aData[2] + '"><input type="hidden" class="classIcon" value="' + imgClass + '">');
                $('td:eq(2)', nRow).html(imgTag);
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
                "url": "../Icon/GetDataIconLov",
                "data": function (d) {
                    d.sEcho = "test";
                }
            }
        });

        $('#frm-lov-btn-src').on('click', function () {
            var keyword = $("#customSearch").val();
            $("#TIconLov").DataTable().search(
            keyword,
            false,
            true
            ).draw();

        }
         )

        $('#customSearch').keypress(function (e) {
            if (e.which == 13) {
                $('#frm-lov-btn-src').click();
                return false;    //<---- Add this line
            }
        });

        $('#TIconLov').on('click', 'tbody tr', function () {
            //console.log($(this))
            if (!$(this).find('td').hasClass('dataTables_empty')) {
                if ($(this).hasClass('TIconLov tbody tr.row_selected')) {
                    $(this).removeClass('TIconLov tbody tr.row_selected');
                }
                else {
                    table.$('TIconLov tbody tr.row_selected').removeClass('TIconLov tbody tr.row_selected');
                    $(this).addClass('TIconLov tbody tr.row_selected');
                }
                var d = document.getElementsByClassName("TIconLov tbody tr.row_selected");
                var ret = $(this).find('.theID').val() + '#' + d[0].cells[0].innerHTML.trim() + '#' + $(this).find('.typeIcon').val() + '#' + $(this).find('.classIcon').val();
                var parameter = $('.parameterForReturn').val();
                utility._returnLOV(parameter, ret);
                $('#closeModal').click();
            }

        });

    }
}

var IconLOVFeature = new function () {
    this.init = function (param) {


        var table = $('#TIconLovFeature').dataTable({
            "dom": 't<"col-sm-6"i><"col-sm-6"p>',
            "processing": true,
            "serverSide": true,
            "scrollX": false,
            "autoWidth": false,
            "iDisplayLength": 10,
            "scrollX": true,
            //"ordering": false,

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var imgLink = '';  //posisi data path image
                var imgTag = '';
                var imgClass = '';
                var id = aData[0];
                var result = aData[1];

                if (aData[2] == 'Unicode') {
                    imgLink = aData[5];
                    imgTag = ' <i class="fa ' + imgLink + '"></i>';
                    imgClass = imgLink;
                }
                else {
                    imgLink = aData[1];
                    imgTag = "<img src='" + aData[6] + "'  alt='image'> ";
                    imgClass = aData[6];
                }
                $('td:eq(0)', nRow).html(result);
                $('td:eq(1)', nRow).html(imgLink + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '"><input type="hidden" class="typeIcon" value="' + aData[2] + '"><input type="hidden" class="classIcon" value="' + imgClass + '">');
                $('td:eq(2)', nRow).html(imgTag);
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
                "url": "../Icon/GetDataIconLov",
                "data": function (d) {
                    d.sEcho = "test";
                }
            }
        });

        $('#frm-lov-btn-src-feature').on('click', function () {
            var keyword = $("#customSearchFeature").val();
            $("#TIconLovFeature").DataTable().search(
            keyword,
            false,
            true
            ).draw();

        }
         )

        $('#customSearchFeature').keypress(function (e) {
            if (e.which == 13) {
                $('#frm-lov-btn-src-feature').click();
                return false;    //<---- Add this line
            }
        });

        $('#TIconLovFeature').on('click', 'tbody tr', function () {
            //console.log($(this))
            if (!$(this).find('td').hasClass('dataTables_empty')) {
                if ($(this).hasClass('TIconLovFeature tbody tr.row_selected')) {
                    $(this).removeClass('TIconLovFeature tbody tr.row_selected');
                }
                else {
                    table.$('TIconLovFeature tbody tr.row_selected').removeClass('TIconLovFeature tbody tr.row_selected');
                    $(this).addClass('TIconLovFeature tbody tr.row_selected');
                }
                var d = document.getElementsByClassName("TIconLovFeature tbody tr.row_selected");
                var ret = $(this).find('.theID').val() + '#' + d[0].cells[0].innerHTML.trim() + '#' + $(this).find('.typeIcon').val() + '#' + $(this).find('.classIcon').val();
                var parameter = $('.parameterForReturnX').val();
                utility._returnLOV(parameter, ret);
                $('#closeModalIconFeature').click();
            }

        });

    }
}


var Icon = new function () {
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
        var historyURL = "historyKeyword=" + param.history.Keyword + "&historyisDefault=" + param.history.isDefault;
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        //$("#successDiv").hide();
        if (param.history.isDefault == '') {
            param.history.isDefault = 'false'
        }

        // console.log(param.history.Discontinue)
        $("#customSearch").val(param.history.Keyword);
        $("#IsDefault-src").val(param.history.isDefault);

        if (param.history.isDefault == "true") {

            $('.i-checks').iCheck('check', function () {

                $("#IsDefault-src").val("true");

            });

        }
        var table = $('#TIcon').dataTable({
            "dom": 't<"col-sm-6"i><"col-sm-6"p>',
            "processing": true,
            "serverSide": true,
            //"iDisplayLength": 10,
            "scrollX": false,
            "autoWidth": false,

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                var id = aData[0];
                var result = aData[1] + '<input id="' + id + '" type="hidden" class="theID" value="' + id + '" name="' + id + '">';

                //alert(aData[6]);
                if (aData[7] === 'True') {
                    var lbl = '<span class="label label-primary">' + aData[7] + '</span>';
                    //alert(label);
                }
                else {
                    var lbl = '<span class="label label-danger">' + aData[7] + '</span>';
                }

                if (aData[2] == "Image") {
                    if (aData[6] == null || aData[6] == "") {
                        var imgTag = "";
                    } else
                    {
                        var imgTag = "<img src='" + aData[6] + "' >";
                    }

                }
                else {

                    var imgTag = ' <i class="fa ' + aData[5] + '"></i>';
                }
                $('td:eq(0)', nRow).html(result);
                $('td:eq(1)', nRow).html(aData[2]);
                $('td:eq(2)', nRow).html(aData[3])
                $('td:eq(3)', nRow).html(aData[4])
                $('td:eq(4)', nRow).html(aData[5])
                $('td:eq(5)', nRow).html(lbl);
                //add by Irham 08-10-2015 for center
                $('td:eq(5)', nRow).addClass('set-center-item');
                //end
                $('td:eq(6)', nRow).html(imgTag);
                //add by Irham 08-10-2015 for center
                $('td:eq(6)', nRow).addClass('set-center-item');
                //end
                return nRow;
            },
            "fnInitComplete": function (oSettings, json) {
                $('#TIcon tbody tr:eq(0)').click();
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
                "url": "../Icon/GetDataIcon",
                "data": function (d) {
                    d.sEcho = "test";
                    d.IsDefault = $('#IsDefault-src').val();
                    d.keyword = $("#customSearch").val();
                }
            }
        });

        $(".custom_table_scroll").wrap("<div class='custom_table_scroll_wrappper'></div>");

        $('#frm-lov-btn-src').on('click', function () {
            var keyword = $("#customSearch").val();
            $("#TIcon").DataTable().search(
            keyword,
            false,
            true
            ).draw();

        }
         )

        $('input').on('ifChanged', function (event) {
            var val = $('#IsDefault-src').val();

            if (val == "false") {
                $('#IsDefault-src').val("true")
            }
            else {
                $('#IsDefault-src').val("false")
            }
        });

        $('#customSearch').keypress(function (e) {
            if (e.which == 13) {
                $('#frm-lov-btn-src').click();
                return false;    //<---- Add this line
            }
        });

        //Add By Irham 7-10-2015
        //Inisialiasi ArrowMove
        utility.ArrowMoveInit("#TIcon", 0);
        //End Add By Irham
        $('#TIcon').focus();
        $('#TIcon').on('click', 'tbody tr', function () {
            if ($(this).hasClass('row_selected')) {
                //$(this).removeClass('row_selected');
            }
            else {
                table.$('tr.row_selected').removeClass('row_selected');
                $(this).addClass('row_selected');
            }
        });
        $("#btnAddRow").click(function () {
            Icon.Create();
        });

        $("#btnEditRow").click(function () {
            Icon.Edit(param);
        });


        $("#btnDeleteRow").click(function () {
            $('#modal-Render').html("");
            Icon.Delete(param);

        });

        $("#page-length").change(function () {
            $('#TIcon').DataTable().page.len(this.value).draw();
        });

        /* inisialisasi ketika shortcu */
        $("#searchZ-box .dropdown-toggle").click(function (e) {
            // e.stopImmediatePropagation();
            if ($('#searchZ-box').hasClass('open')) {
                $('#searchZ-box').removeClass('open');
                $('#searchZ-box .dropdown-menu').hide();
                $('#TIcon').focus();
            }
            else {
                $('#searchZ-box').addClass('open');
                $('#searchZ-box .dropdown-menu').show();
                $('#customSearch').focus();
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
        //$('.dropdown').on('shown.bs.dropdown', function () {
        //    $('#SiteName').focus();
        //})

        //$('.dropdown').on('hide.bs.dropdown', function () {
        //    $("#TSite").focus();
        //})
        /* End inisialisasi ketika shortcu */
        //* Init Shortcut
        //shortcutPlugin.findShortcut("Search", "#searchZ-box .dropdown-toggle");
        //shortcutPlugin.findShortcut("Add", "#btnAddRow");
        //shortcutPlugin.findShortcut("Edit", "#btnEditRow");
        //shortcutPlugin.findShortcut("Delete", "#btnDeleteRow");
        //shortcutPlugin.findShortcut("Yes", "#frm-submit-btn");
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");

        //shortcutPlugin.findShortcutByParentElement("Delete", "#btnDeleteRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Add", "#btnAddRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Edit", "#btnEditRow", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Search", "#searchZ-box .dropdown-toggle", "#render-body");


        //* End Init Shortcut

    }
    this.Create = function () {
        var destination = "../Icon/Create?historyKeyword=" + $("#customSearch").val() + "&historyisDefault=" + $('#IsDefault-src').val();
        utility._loadModal(destination, 'modal-Render-Create');
        $('#CreateModal').modal('show');
    }

    this.Edit = function (param) {

        try {
            var id = $('.row_selected').find('.theID').val();

        }
        catch (r) {
            var id = '';
        }

        if (typeof id !== 'undefined') {
            var destination = '../Icon/Edit?id=' + id + "&historyKeyword=" + $("#customSearch").val() + "&historyisDefault=" + $('#IsDefault-src').val();
            utility._loadModal(destination, 'modal-Render-Edit');
            $('#EditModal').modal('show');
        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }
    }
    this.Delete = function (param) {
        var isDefault = $('.row_selected').find('span').html();
        try {
            var id = $('.row_selected').find('.theID').val();

        }
        catch (r) {
            var id = 'undefined';
        }

        if (typeof id !== 'undefined') {
            if (isDefault !== "True") {
                var destination = '../Icon/Delete?id=' + id + "&historyKeyword=" + $("#customSearch").val() + "&historyisDefault=" + $('#IsDefault-src').val();
                utility._loadModal(destination, 'modal-Render');
                $('#DeleteModal').modal('show');
            }
            else {
                toastr.remove();
                toastr.warning(param.attribute.CannotDelete, param.attribute.Warning);
            }

        }
        else {
            toastr.remove();
            toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
        }
    }

}

var IconCreate = new function () {
    this.init = function (param) {
        var historyURL = "historyKeyword=" + param.history.Keyword + "&historyisDefault=" + param.history.isDefault;
        $(".icp-auto").iconpicker();

        $(document).on('click', '.action-placement', function (e) {
            $('.action-placement').removeClass('active');
            $(this).addClass('active');
            $('.icp-opts').data('iconpicker').updatePlacement($(this).text());
            e.preventDefault();
            return false;
        });
        $('.iconpicker-items').click(function () {
            $('.action-placement').removeClass('active');
        })
        if ($("#IconType").val() == "Unicode") {

            $("#Image-Icon").hide();
            $("#Unicode-Icon").show();
        }
        else {
            $("#Image-Icon").show();
            $("#Unicode-Icon").hide();
        }

        $("#frm-cancel-btn").on('click', function () {
            utility._loadMenu('../Icon/Index?'+historyURL);
        });

        //$("#frm-submit-btn").click(function () {
        //    if ($("#Form-Icon").valid()) {
        //        utility._CRUD("Form-Icon", "INSERT");
        //    }
        //});

        $(".close").click(function () {
            $("#errorDiv").hide();
        });


        $("#IconType").change(function () {
            if (this.value == "Unicode") {
                $("#Image-Icon").hide();
                $("#Unicode-Icon").show();
            }
            else {
                $("#Image-Icon").show();
                $("#Unicode-Icon").hide();
            }

        })

        $("#Form-Icon input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });
        $("#Form-Icon input:text, #Form-Icon textarea").first().focus();
        $("#Form-Icon").validate({
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
                IconName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                IconDesc: {
                    maxlength: 200
                }
            },
            messages: {
                IconName: {
                    required: param.attribute.IconName + " " + param.validation.required + ".",
                    minlength: param.attribute.IconName + " " + param.validation.minLength + " 2.",
                    maxlength: param.attribute.IconName + " " + param.validation.maxLength + " 20.",
                },

                IconDesc: {
                    maxlength: param.attribute.IconDesc + " " + param.validation.maxLength + " 200."
                }
            }

        });
        var maxImageWidth = 32,
            maxImageHeight = 32;
        var myDropzone = new Dropzone("#IconPath", {

            url: "../Icon/Create",
            autoProcessQueue: false,
            clickable: true,
            addRemoveLinks: true,
            dictDefaultMessage: "Upload File Here",
            maxFilesize: 10,
            maxFiles: 1,
            acceptedFiles: "image/*",
            //paramName:"SiteLogo",
            init: function () {
                var upload = false;
                var submitButton = document.querySelector("#frm-submit-btn")
                this.on("thumbnail", function (file) {
                    // Do the dimension checks you want to do
                    if (file.width > maxImageWidth || file.height > maxImageHeight) {
                        file.rejectDimensions()
                    }
                    else {
                        file.acceptDimensions();
                    }
                });
                this.on("addedfile", function (file) {
                    upload = true;
                });
                submitButton.addEventListener("click", function (e) {
                    if (upload == true) {
                        if ($("#Form-Icon").valid()) {
                            myDropzone.processQueue();
                        }
                    }
                    else {
                        if ($("#Form-Icon").valid()) {
                            utility._CRUD("Form-Icon", "ADD", historyURL, "TIcon", "MessageIcon");
                        }
                    }
                });
                this.on("sending", function (file, xhr, formData) {
                    var x = $('#Form-Icon input[type="hidden"]');
                    formData.append("__RequestVerificationToken", x[0].value);
                    formData.append("IconName", $("#IconName").val());
                    formData.append("IconType", $("#IconType").val());
                    formData.append("IconClass", $("#IconClass").val());
                    formData.append("IconDesc", $("#IconDesc").val());
                    formData.append("IconCategory", $("#IconCategory").val());
                });
                this.on('success', function (file, json) {
                    $('#CreateModal').modal('hide');

                });
            },
            accept: function (file, done) {
                file.acceptDimensions = done;
                file.rejectDimensions = function () { done("Invalid dimension."); };
                // Of course you could also just put the `done` function in the file
                // and call it either with or without error in the `thumbnail` event
                // callback, but I think that this is cleaner.
            }
        });

        /*Init Shortcut*/
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Yes", "#frm-submit-btn", "#render-body");
        /*End Init Shortcut*/


    }

}

var IconEdit = new function () {
    this.FileSize = 0;
    this.FileName = "";
    this.init = function (logo, param) {
        var lastIcon = $("#IconPath").val();
        var historyURL = "historyKeyword=" + param.history.Keyword + "&historyisDefault=" + param.history.isDefault;
        if (logo !== "") {
            var xhr = $.ajax({
                type: "HEAD",
                url: logo,
                success: function (msg) {
                    IconEdit.FileSize = xhr.getResponseHeader('Content-Length');
                    IconEdit.FileName = xhr.getResponseHeader('Content-Disposition');
                    //alert(xhr.getResponseHeader('Content-Length') + ' bytes');
                }
            });
        }

        $(".icp-auto").iconpicker();

        $(document).on('click', '.action-placement', function (e) {
            $('.action-placement').removeClass('active');
            $(this).addClass('active');
            $('.icp-opts').data('iconpicker').updatePlacement($(this).text());
            e.preventDefault();
            return false;
        });

        $('.iconpicker-items').click(function () {
            $('.action-placement').removeClass('active');
        })
        if ($("#IconType").val() == "Unicode") {

            $("#Image-Icon").hide();
            $("#Unicode-Icon").show();
        }
        else {
            $("#Image-Icon").show();
            $("#Unicode-Icon").hide();
        }

        $("#IconType").change(function () {
            if (this.value == "Unicode") {
                $("#Image-Icon").hide();
                $("#Unicode-Icon").show();
            }
            else {
                $("#Image-Icon").show();
                $("#Unicode-Icon").hide();
            }

        })
        $("#frm-cancel-btn").on('click', function () {
            utility._loadMenu('../Icon/Index?'+historyURL);
        });

        //$("#frm-submit-btn").click(function () {
        //    if ($("#Form-Icon").valid()) {
        //        utility._CRUD("Form-Icon", "UPDATE");
        //    }
        //});

        $(".close").click(function () {
            $("#errorDiv").hide();
        });



        $("#Form-Icon input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#frm-submit-btn').click();
                return false;    //<---- Add this line
            }
        });
        $("#Form-Icon input:text, #Form-Icon textarea").first().focus();
        $("#Form-Icon").validate({
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
                IconName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                //IconClass: {
                //    required: true,
                //    minlength: 2,
                //    maxlength: 100
                //},
                IconDesc: {
                    maxlength: 200
                }
            },
            messages: {
                messages: {
                    IconName: {
                        required: param.attribute.IconName + " " + param.validation.required + ".",
                        minlength: param.attribute.IconName + " " + param.validation.minLength + " 2.",
                        maxlength: param.attribute.IconName + " " + param.validation.maxLength + " 20.",
                    },

                    IconDesc: {
                        maxlength: param.attribute.IconDesc + " " + param.validation.maxLength + " 200."
                    }
                }
            }

        });


        setTimeout(function () {


            var maxImageWidth = 32,
                maxImageHeight = 32;
            var myDropzone = new Dropzone("#IconPath-Upload", {

                url: "../Icon/Edit",
                autoProcessQueue: false,
                clickable: true,
                addRemoveLinks: true,
                dictDefaultMessage: "Upload File Here",
                maxFilesize: 10,
                maxFiles: 1,
                acceptedFiles: "image/*",
                //paramName:"SiteLogo",
                init: function () {
                    var upload = false;
                    var submitButton = document.querySelector("#frm-submit-btn")
                    this.on("thumbnail", function (file) {
                        // Do the dimension checks you want to do
                        if (file.width > maxImageWidth || file.height > maxImageHeight) {
                            file.rejectDimensions()
                        }
                        else {
                            file.acceptDimensions();
                        }
                    });
                    var mockFile = null;
                    if (logo !== "") {

                        mockFile = { name: logo, size: IconEdit.FileSize };
                        this.options.addedfile.call(this, mockFile);
                        this.options.thumbnail.call(this, mockFile, logo);
                        this.emit("complete", mockFile);
                    }

                    this.on("addedfile", function (file) {
                        if (mockFile !== null) {
                            myDropzone.removeFile(mockFile);
                            mockFile = null;
                        }
                        upload = true;
                    });
                    this.on("removedfile", function (file) {

                        $("#IconPath").val("");

                    });
                    submitButton.addEventListener("click", function (e) {
                        if (upload == true) {
                            if ($("#Form-Icon").valid()) {
                                myDropzone.processQueue();
                            }
                        }
                        else {
                            if ($("#Form-Icon").valid()) {
                                utility._CRUD("Form-Icon", "UPDATE", historyURL, "TIcon", "MessageIcon");

                                if ($("#IconPath").val() !== lastIcon) {
                                    RemoveFile(lastIcon);
                                }
                            }
                        }
                    });
                    this.on("sending", function (file, xhr, formData) {
                        var x = $('#Form-Icon input[type="hidden"]');
                        formData.append("__RequestVerificationToken", x[0].value);
                        formData.append("IconName", $("#IconName").val());
                        formData.append("IconType", $("#IconType").val());
                        formData.append("IconClass", $("#IconClass").val());
                        formData.append("IconDesc", $("#IconDesc").val());
                        formData.append("IconCategory", $("#IconCategory").val());
                        formData.append("IDIcon", $("#IDIcon").val());
                        formData.append("IsDefault", $("#IsDefault").val());
                    });
                    this.on('success', function (file, json) {
                        $('#EditModal').modal('hide');

                    });
                },
                accept: function (file, done) {
                    file.acceptDimensions = done;
                    file.rejectDimensions = function () { done("Invalid dimension."); };
                    // Of course you could also just put the `done` function in the file
                    // and call it either with or without error in the `thumbnail` event
                    // callback, but I think that this is cleaner.
                }
            });
        }, 100);
        /*Init Shortcut*/
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#render-body");
        //shortcutPlugin.findShortcutByParentElement("Yes", "#frm-submit-btn", "#render-body");
        /*End Init Shortcut*/
    }

}
var IconDelete = new function () {
    this.init = function (param) {
        var historyURL = "historyKeyword=" + param.history.Keyword + "&historyisDefault=" + param.history.isDefault;
        $("#frm-cancel-btn").on('click', function () {
            $('#modal-Render').html("");
            $('#DeleteModal').modal('hide');

        });
        $("#frm-submit-btn").click(function () {
            if ($("#Form-Icon").valid()) {
                $.ajax({
                    url: "../Icon/RemoveFile?path=" + $("#IconPath").val(),
                    type: "GET",
                    dataType: "html",
                    error: function (xhr, status) {
                        alert("Sorry, there was a problem!");
                    }
                });
                $("#IconPath").val("");
                utility._CRUD("Form-Icon", "DELETE",historyURL);

 //               $('#DeleteModal').modal('hide');
            }
        });
        if ($("#IconType").val() == "Unicode") {

            $("#Image-Icon").hide();
            $("#Unicode-Icon").show();
        }
        else {
            $("#Image-Icon").show();
            $("#Unicode-Icon").hide();
        }
        $(".close").click(function () {
            $("#errorDiv").hide();
        });
        /*Init Shortcut*/
        //shortcutPlugin.findShortcut("Save", "#frm-submit-btn");
        //shortcutPlugin.findShortcut("Cancel", "#frm-cancel-btn");
        //shortcutPlugin.findShortcutByParentElement("Cancel", "#frm-cancel-btn", "#DeleteModal");
        //shortcutPlugin.findShortcutByParentElement("Yes", "#frm-submit-btn", "#DeleteModal");
        /*End Init Shortcut*/
    }



}

 function RemoveFile (path) {

    $.ajax({
        url: "../Icon/RemoveFile?path=" + path,
        type: "GET",
        dataType: "html",
        error: function (xhr, status) {
            alert("Sorry, there was a problem!");
        }
    });

}