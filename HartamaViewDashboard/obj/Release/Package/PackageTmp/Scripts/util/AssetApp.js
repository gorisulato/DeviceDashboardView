
/*!
 * util.js
 * 2015 author Irham Pratama
 */
jQuery.ajaxq = function (queue, options) {
    // Initialize storage for request queues if it's not initialized yet
    if (typeof document.ajaxq == "undefined") document.ajaxq = { q: {}, r: null };

    // Initialize current queue if it's not initialized yet
    if (typeof document.ajaxq.q[queue] == "undefined") document.ajaxq.q[queue] = [];

    if (typeof options != "undefined") // Request settings are given, enqueue the new request
    {
        // Copy the original options, because options.complete is going to be overridden

        var optionsCopy = {};
        for (var o in options) optionsCopy[o] = options[o];
        options = optionsCopy;

        // Override the original callback

        var originalCompleteCallback = options.complete;

        options.complete = function (request, status) {
            // Dequeue the current request
            document.ajaxq.q[queue].shift();
            document.ajaxq.r = null;

            // Run the original callback
            if (originalCompleteCallback) originalCompleteCallback(request, status);

            // Run the next request from the queue
            if (document.ajaxq.q[queue].length > 0) document.ajaxq.r = jQuery.ajax(document.ajaxq.q[queue][0]);
        };

        // Enqueue the request
        document.ajaxq.q[queue].push(options);

        // Also, if no request is currently running, start it
        if (document.ajaxq.q[queue].length == 1) document.ajaxq.r = jQuery.ajax(options);
    }
    else // No request settings are given, stop current request and clear the queue
    {
        if (document.ajaxq.r) {
            document.ajaxq.r.abort();
            document.ajaxq.r = null;
        }

        document.ajaxq.q[queue] = [];
    }
}

var utility = new function () {

    this.session = false;

    this.formatDate = "";

    this.pickOneData = "";

    this.warning = "";

    this.decimalSeparator = "";

    this.thousandSeparator = "";

    this.Info = "";

    this.Page = "";

    this.Of = "";

    this.ZeroResult = "";

    this.InfoEmpty = "";

    this.Previous = "";

    this.Next = "";

    this.Last = "";

    this.First = "";

    this.To = "";

    this.Entries = "";
    $.validator.addMethod('character', function (value, element, param) {
        return value == '' || value.match(/^[A-Za-z\\-s]+$/);
    }, 'Letters only please');

    $.validator.addMethod('curr', function (value, element, param) {
        return value == '' || value.match(/^[0-9]+\.[0-9]{2}$|[0-9]+\.[0-9]{2}[^0-9]/);
    }, 'Letters only please');

    $.validator.addMethod('numeric', function (value, element, param) {
        return value == '' || value.match(/^[0-9\\-s]+$/);
    }, '');

    $.validator.addMethod('lessthan', function (value, element, param) {
        var i = parseInt(value);
        var j = parseInt($(param).val());
        return i >= j;
    }, "less than");

    $.validator.addMethod("greaterThanDate", function (value, element, params) {

        if (!/Invalid|NaN/.test(new Date(value))) {
            return new Date(value) > new Date($(params).val());
        }

        return isNaN(value) && isNaN($(params).val())
            || (Number(value) > Number($(params).val()));
    }, 'Must be greater than Start Date.');


    $.validator.addMethod('alphanumeric', function (value, element, param) {
        return value == '' || value.match(/^[a-zA-Z0-9]+$/);
    }, 'Letters and Number Only, Spesial Character not allowed');

    $.validator.addMethod('alphanumericspecial', function (value, element, param) {
        return value == '' || value.match(/^[A-Za-z0-9./#&+-\\-s]*$/);
    }, 'Space Not Allowed');


    $.fn.dataTableExt.oApi.fnStandingRedraw = function (oSettings) {
        //redraw to account for filtering and sorting
        // concept here is that (for client side) there is a row got inserted at the end (for an add)
        // or when a record was modified it could be in the middle of the table
        // that is probably not supposed to be there - due to filtering / sorting
        // so we need to re process filtering and sorting
        // BUT - if it is server side - then this should be handled by the server - so skip this step
        if (oSettings.oFeatures.serverSide === false) {
            var before = oSettings._iDisplayStart;
            oSettings.oApi._fnReDraw(oSettings);
            //iDisplayStart has been reset to zero - so lets change it back
            oSettings._iDisplayStart = before;
            oSettings.oApi._fnCalculateEnd(oSettings);
        }

        //draw the 'current' page
        oSettings.oApi._fnDraw(oSettings);
    };


    this.LOV = function (ID, data, IsServerSide, query, column, isSiteDependency) {
        var result = data,
            isEmpty = false,
             container = $("#" + ID),
             table = $('.lov-table', container),
             button = $('.lov-button', container),
             search = $('.lov-search', container),
             content = $('.lov-content', container),
             id = $('.lov-value', container),
             text = $('.lov-text', container),
             close = $('.close-lov', container),
             lovType = container.attr('data-lov-type');
        if ($.isEmptyObject(result)) {
            result = [["", "", "", "", "", "", "", "", "", "", "", ""]];
            isEmpty = true;
        }
        content.hide();
        if (IsServerSide !== "True") {

            table.dataTable({
                "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                "paging": true,
                "data": result,
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.length) { $(nRow).attr("id", aData[aData.length - 1]); return nRow; } else { alert(); }


                },
                "fnDrawCallback": function () {

                },
                "fnInitComplete": function (oSettings, json) {
                    if (isEmpty) {
                        table.DataTable().clear().draw();
                    }
                },

            });
        } else {
            $.ajax({
                url: "../LOV/Get",
                type: "POST",
                data: JSON.stringify(
                            {
                                'columnData': column,
                                'query': query[0],
                                'isSiteDependency': isSiteDependency,
                                //'Start': parseInt(table.page.info().start),
                                //'Length' : parseInt()
                            }
                            ),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if ($.isEmptyObject(data.aaData)) {
                        data.aaData = [["", "", "", "", "", "", "", "", "", "", "", ""]];
                        isEmpty = true;
                    } else {
                        isEmpty = false;
                    }
                    table.dataTable({
                        "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                        "paging": true,
                        "data": data.aaData,
                        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                            $(nRow).attr("id", aData[aData.length - 1]);
                            return nRow;

                        },
                        "fnDrawCallback": function () {

                        },
                        "fnInitComplete": function (oSettings, json) {
                            if (id.val() !== "") {
                                $('tbody tr[id="' + id.val() + '"]', table).click();
                            }
                            if (isEmpty) {
                                table.DataTable().clear().draw();
                            }
                        },

                    });
                },
                error: function (xhr, status) {
                    alert("Sorry, there was a problem!");
                },
                complete: function (xhr, status) {
                }
            });

        }


        switch (lovType) {
            case "multiple":
                var selectedContainer = $("#" + ID + "_multi-lov"),
                    selectedContent = $('.chosen-choices', selectedContainer);
                table.on('click', 'tbody tr', function () {
                    var value = this.id;
                    var textShow = $("tbody tr[id='" + value + "'] td:eq(0)", table).html();
                    if (!$(this).hasClass('row_selected')) {
                        $(this).addClass('row_selected');

                        if (typeof value !== 'undefined') {
                            selectedContent.append(" <li class='search-choice lov-multiple-selected'>" +
                                                        "<span>" + textShow + "</span>" +
                                                        "<a class='search-choice-close delete-lov-multiple' data-option-array-index='" + value + "'></a>" +
                                                     "</li>");
                            $(".delete-lov-multiple", selectedContainer).unbind('click');
                            $(".delete-lov-multiple", selectedContainer).click(function () {
                                $(this).parents('.lov-multiple-selected').remove();
                                selectedContainer.trigger("lov_multiple_change");
                            })
                            selectedContainer.trigger("lov_multiple_change");
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        $('[data-option-array-index="' + value + '"]', selectedContainer).parents('.lov-multiple-selected').remove();
                        selectedContainer.trigger("lov_multiple_change");
                    }
                });

                selectedContainer.on('lov_multiple_change', function () {
                    id.val('');
                    $(".lov-multiple-selected", $(this)).each(function (i, e) {
                        if ($(".lov-multiple-selected", selectedContainer).length - 1 > i) {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'" + ",");
                        } else {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'");
                        }
                    })
                })
                break;
            default:
                table.on('click', 'tbody tr', function () {
                    if (!$(this).hasClass('row_selected')) {
                        $('tbody tr.row_selected', table).removeClass('row_selected');
                        $(this).addClass('row_selected');
                        var value = $("tbody tr.row_selected", table).attr('id');
                        var textShow = $("tbody tr.row_selected td:eq(0)", table).html();
                        if (typeof value !== 'undefined') {
                            id.val(value).change();
                            text.val(textShow).change();
                            content.hide();
                            content.removeClass('open');
                        }
                        else {
                            id.val('').change();
                            text.val('').change();
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        id.val('').change();
                        text.val('').change();
                    }
                });
                break;
        }

        button.click(function () {
            content.toggleClass('open');
            if (content.hasClass('open')) {
                var height = button.position().top + button.height() + 10;
                var left = button.position().left - content.width();
                content.css({ 'top': height, "left": left });
                content.show();
                if (IsServerSide == "True") {
                    table.DataTable().destroy();
                    $.ajax({
                        url: "../LOV/Get",
                        type: "POST",
                        data: JSON.stringify(
                                    {
                                        'columnData': column,
                                        'query': query[0],
                                        'isSiteDependency': isSiteDependency
                                    }
                                    ),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (data) {
                            if ($.isEmptyObject(data.aaData)) {
                                data.aaData = [["", "", "", "", "", "", "", "", "", "", "", ""]];
                                isEmpty = true;
                            } else {
                                isEmpty = false;
                            }
                            table.dataTable({
                                "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                                "paging": true,
                                "data": data.aaData,
                                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                    $(nRow).attr("id", aData[aData.length - 1]);
                                    return nRow;

                                },
                                "fnDrawCallback": function () {

                                },
                                "fnInitComplete": function (oSettings, json) {
                                    if (isEmpty) {
                                        table.DataTable().clear().draw();
                                    }
                                },

                            });
                        },
                        error: function (xhr, status) {
                            alert("Sorry, there was a problem!");
                        },
                        complete: function (xhr, status) {
                        }
                    });
                }
            }
            else {
                content.hide();
            }
        });

        close.click(function () {
            content.hide();
            content.removeClass('open');
        });
        if (IsServerSide !== "True") {
            if (id.val() !== "") {
                $('tbody tr[id="' + id.val() + '"]', table).click();
            }
        }


    }

    this.LOVCustom = function (ID, data, IsServerSide, query, column, isSiteDependency, columnDependency) {
        var result = data,
            isEmpty = false,
             container = $("#" + ID),
             table = $('.lov-table', container),
             button = $('.lov-button', container),
             search = $('.lov-search', container),
             content = $('.lov-content', container),
             id = $('.lov-value', container),
             text = $('.lov-text', container),
             close = $('.close-lov', container),
             lovType = container.attr('data-lov-type');
        if ($.isEmptyObject(result)) {
            result = [["", "", "", "", "", "", "", "", "", "", "", ""]];
            isEmpty = true;
        }
        content.hide();
        if (IsServerSide !== "True") {

            table.dataTable({
                "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                "paging": true,
                "data": result,
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.length) { $(nRow).attr("id", aData[aData.length - 1]); return nRow; } else { alert(); }


                },
                "fnDrawCallback": function () {

                },
                "fnInitComplete": function (oSettings, json) {
                    if (isEmpty) {
                        table.DataTable().clear().draw();
                    }
                },

            });
        } else {

            for (var i in columnDependency) {

                var dependency = $(columnDependency[0][1]);
                //console.log(dependency.val());
                dependency.change(function () {
                    columnDependency[0][1] = this.value;
                })
                //columnDependency[0][1] = dependency.val();

            }
            $.ajax({
                url: "../LOV/GetCustom",
                type: "POST",
                data: JSON.stringify(
                            {
                                'columnData': column,
                                'query': query[0],
                                'isSiteDependency': isSiteDependency,
                                'columnDependency': columnDependency,
                            }
                            ),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if ($.isEmptyObject(data.aaData)) {
                        data.aaData = [["", "", "", "", "", "", "", "", "", "", "", ""]];
                        isEmpty = true;
                    } else {
                        isEmpty = false;
                    }
                    table.dataTable({
                        "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                        "paging": true,
                        "data": data.aaData,
                        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                            $(nRow).attr("id", aData[aData.length - 1]);
                            return nRow;

                        },
                        "fnDrawCallback": function () {

                        },
                        "fnInitComplete": function (oSettings, json) {
                            if (id.val() !== "") {
                                $('tbody tr[id="' + id.val() + '"]', table).click();
                            }
                            if (isEmpty) {
                                table.DataTable().clear().draw();
                            }
                        },

                    });
                },
                error: function (xhr, status) {
                    alert("Sorry, there was a problem!");
                },
                complete: function (xhr, status) {
                }
            });

        }


        switch (lovType) {
            case "multiple":
                var selectedContainer = $("#" + ID + "_multi-lov"),
                    selectedContent = $('.chosen-choices', selectedContainer);
                table.on('click', 'tbody tr', function () {
                    var value = this.id;
                    var textShow = $("tbody tr[id='" + value + "'] td:eq(0)", table).html();
                    if (!$(this).hasClass('row_selected')) {
                        $(this).addClass('row_selected');

                        if (typeof value !== 'undefined') {
                            selectedContent.append(" <li class='search-choice lov-multiple-selected'>" +
                                                        "<span>" + textShow + "</span>" +
                                                        "<a class='search-choice-close delete-lov-multiple' data-option-array-index='" + value + "'></a>" +
                                                     "</li>");
                            $(".delete-lov-multiple", selectedContainer).unbind('click');
                            $(".delete-lov-multiple", selectedContainer).click(function () {
                                $(this).parents('.lov-multiple-selected').remove();
                                selectedContainer.trigger("lov_multiple_change");
                            })
                            selectedContainer.trigger("lov_multiple_change");
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        $('[data-option-array-index="' + value + '"]', selectedContainer).parents('.lov-multiple-selected').remove();
                        selectedContainer.trigger("lov_multiple_change");
                    }
                });

                selectedContainer.on('lov_multiple_change', function () {
                    id.val('');
                    $(".lov-multiple-selected", $(this)).each(function (i, e) {
                        if ($(".lov-multiple-selected", selectedContainer).length - 1 > i) {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'" + ",");
                        } else {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'");
                        }
                    })
                })
                break;
            default:
                table.on('click', 'tbody tr', function () {
                    if (!$(this).hasClass('row_selected')) {
                        $('tbody tr.row_selected', table).removeClass('row_selected');
                        $(this).addClass('row_selected');
                        var value = $("tbody tr.row_selected", table).attr('id');
                        var textShow = $("tbody tr.row_selected td:eq(0)", table).html();
                        if (typeof value !== 'undefined') {
                            id.val(value).change();
                            text.val(textShow).change();
                            content.hide();
                            content.removeClass('open');
                        }
                        else {
                            id.val('').change();
                            text.val('').change();
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        id.val('').change();
                        text.val('').change();
                    }
                });
                break;
        }

        button.click(function () {
            content.toggleClass('open');
            if (content.hasClass('open')) {
                var height = button.position().top + button.height() + 10;
                var left = button.position().left - content.width();
                content.css({ 'top': height, "left": left });
                content.show();
                if (IsServerSide == "True") {
                    table.DataTable().destroy();
                    for (var i in columnDependency) {

                        var dependency = $(columnDependency[0][1]);
                        //console.log(dependency.val());
                        dependency.change(function () {
                            columnDependency[0][1] = this.value;
                        })
                        dependency.change();
                        //columnDependency[0][1] = dependency.val();

                    }
                    $.ajax({
                        url: "../LOV/GetCustom",
                        type: "POST",
                        data: JSON.stringify(
                                    {
                                        'columnData': column,
                                        'query': query[0],
                                        'isSiteDependency': isSiteDependency,
                                        'columnDependency': columnDependency,
                                    }
                                    ),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (data) {
                            if ($.isEmptyObject(data.aaData)) {
                                data.aaData = [["", "", "", "", "", "", "", "", "", "", "", ""]];
                                isEmpty = true;
                            } else {
                                isEmpty = false;
                            }
                            table.dataTable({
                                "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                                "paging": true,
                                "data": data.aaData,
                                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                    $(nRow).attr("id", aData[aData.length - 1]);
                                    return nRow;

                                },
                                "fnDrawCallback": function () {

                                },
                                "fnInitComplete": function (oSettings, json) {
                                    if (isEmpty) {
                                        table.DataTable().clear().draw();
                                    }
                                },

                            });
                        },
                        error: function (xhr, status) {
                            alert("Sorry, there was a problem!");
                        },
                        complete: function (xhr, status) {
                        }
                    });
                }
            }
            else {
                content.hide();
            }
        });

        close.click(function () {
            content.hide();
            content.removeClass('open');
        });
        if (IsServerSide !== "True") {
            if (id.val() !== "") {
                $('tbody tr[id="' + id.val() + '"]', table).click();
            }
        }


    }

    this.LOVS = function (ID, query, column, columnDependency) {
        var
             container = $("#" + ID),
             isEmpty = false,
             table = $('.lov-table', container),
             button = $('.lov-button', container),
             search = $('.lov-search', container),
             content = $('.lov-content', container),
             id = $('.lov-value', container),
             text = $('.lov-text', container),
             close = $('.close-lov', container),
             lovType = container.attr('data-lov-type');

        content.hide();

        switch (lovType) {
            case "multiple":
                var selectedContainer = $("#" + ID + "_multi-lov"),
                    selectedContent = $('.chosen-choices', selectedContainer);
                table.on('click', 'tbody tr', function () {
                    var value = this.id;
                    var textShow = $("tbody tr[id='" + value + "'] td:eq(0)", table).html();
                    if (!$(this).hasClass('row_selected')) {
                        $(this).addClass('row_selected');

                        if (typeof value !== 'undefined') {
                            selectedContent.append(" <li class='search-choice lov-multiple-selected'>" +
                                                        "<span>" + textShow + "</span>" +
                                                        "<a class='search-choice-close delete-lov-multiple' data-option-array-index='" + value + "'></a>" +
                                                     "</li>");
                            $(".delete-lov-multiple", selectedContainer).unbind('click');
                            $(".delete-lov-multiple", selectedContainer).click(function () {
                                $(this).parents('.lov-multiple-selected').remove();
                                selectedContainer.trigger("lov_multiple_change");
                            })
                            selectedContainer.trigger("lov_multiple_change");
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        $('[data-option-array-index="' + value + '"]', selectedContainer).parents('.lov-multiple-selected').remove();
                        selectedContainer.trigger("lov_multiple_change");
                    }
                });

                selectedContainer.on('lov_multiple_change', function () {
                    id.val('');
                    $(".lov-multiple-selected", $(this)).each(function (i, e) {
                        if ($(".lov-multiple-selected", selectedContainer).length - 1 > i) {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'" + ",");
                        } else {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'");
                        }
                    })
                })
                break;
            default:
                table.on('click', 'tbody tr', function () {
                    if (!$(this).hasClass('row_selected')) {
                        $('tbody tr.row_selected', table).removeClass('row_selected');
                        $(this).addClass('row_selected');
                        var value = $("tbody tr.row_selected", table).attr('id');
                        var textShow = $("tbody tr.row_selected td:eq(0)", table).html();
                        if (typeof value !== 'undefined') {
                            id.val(value).change();
                            text.val(textShow).change();
                            content.hide();
                            content.removeClass('open');
                        }
                        else {
                            id.val('').change();
                            text.val('').change();
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        id.val('').change();
                        text.val('').change();
                    }
                });
                break;
        }
        for (var i in columnDependency) {
            var dependency = $(columnDependency[i][1]);
            dependency.change(function () {
                columnDependency[i][1] = this.value;
            })
            columnDependency[i][1] = dependency.val();

        }
        $.ajax({
            url: "../LOV/Gets",
            type: "POST",
            data: JSON.stringify(
                        {
                            'columnData': column,
                            'query': query[0],
                            'columnDependency': columnDependency,
                            'selected': lovType !== "multiple" ? id.val() : ""
                        }
                        ),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if ($.isEmptyObject(data.aaData)) {
                    data.aaData = [["", "", "", "", "", "", "", "", "", "", "", ""]];
                    isEmpty = true;
                } else {
                    isEmpty = false;
                }
                table.dataTable({
                    "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                    "paging": true,
                    "data": data.aaData,
                    "ordering": false,
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        $(nRow).attr("id", aData[aData.length - 1]);
                        return nRow;

                    },
                    "fnDrawCallback": function () {

                    },
                    "fnInitComplete": function (oSettings, json) {
                        if (id.val() !== "" && lovType !== "multiple") {
                            $('tbody tr[id="' + id.val() + '"]', table).click();
                        }
                        if (isEmpty) {
                            table.DataTable().clear().draw();
                        }
                    },

                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
            }
        });

        button.click(function () {
            content.toggleClass('open');
            if (content.hasClass('open')) {
                var height = button.position().top + button.height() + 10;
                var left = button.position().left - content.width();
                content.css({ 'top': height, "left": left });
                content.show();
                if ($.fn.DataTable.isDataTable(table)) {
                    table.DataTable().destroy();
                }

                $.ajax({
                    url: "../LOV/Gets",
                    type: "POST",
                    data: JSON.stringify(
                                {
                                    'columnData': column,
                                    'query': query[0],
                                    'columnDependency': columnDependency,
                                    'selected': lovType !== "multiple" ? id.val() : ""
                                }
                                ),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        if ($.isEmptyObject(data.aaData)) {
                            data.aaData = [["", "", "", "", "", "", "", "", "", "", "", ""]];
                            isEmpty = true;
                        } else {
                            isEmpty = false;
                        }
                        table.dataTable({
                            "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                            "paging": true,
                            "data": data.aaData,
                            "ordering": false,
                            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                $(nRow).attr("id", aData[aData.length - 1]);
                                return nRow;

                            },
                            "fnDrawCallback": function () {

                            },
                            "fnInitComplete": function (oSettings, json) {
                                if (id.val() !== "" && lovType !== "multiple") {
                                    $('tbody tr[id="' + id.val() + '"]', table).addClass('row_selected');
                                }
                                if (isEmpty) {
                                    table.DataTable().clear().draw();
                                }
                            },

                        });
                    },
                    error: function (xhr, status) {
                        alert("Sorry, there was a problem!");
                    },
                    complete: function (xhr, status) {
                    }
                });
            }
            else {
                content.hide();
            }
        });

        close.click(function () {
            content.hide();
            content.removeClass('open');
        });
    }
    this.LOVWR = function (ID, data, IsServerSide, query, column, isSiteDependency) {
        var result = data,
             container = $("#" + ID),
             isEmpty = false,
             table = $('.lov-table', container),
             button = $('.lov-button', container),
             search = $('.lov-search', container),
             content = $('.lov-content', container),
             id = $('.lov-value', container),
             text = $('.lov-text', container),
             close = $('.close-lov', container),
             lovType = container.attr('data-lov-type');
        if ($.isEmptyObject(result)) {
            result = [["", "", "", "", "", "", "", "", "", "", "", ""]];
            isEmpty = true;

        }
        content.hide();
        if (IsServerSide !== "True") {
            table.dataTable({
                "dom": '<"row dt--custom-style"<"col-sm-12"l><"col-sm-12"f><"col-sm-12"t><"col-sm-12"p><"col-sm-12"i>>',
                "paging": true,
                "data": result,
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.length) { $(nRow).attr("id", aData[aData.length - 1]); return nRow; } else { alert(); }


                },
                "fnDrawCallback": function () {

                },
                "fnInitComplete": function (oSettings, json) {
                    if (isEmpty) {
                        table.DataTable().clear().draw();
                    }
                },

            });
        } else {
            $.ajax({
                url: "../LOV/GetWR",
                type: "POST",
                data: JSON.stringify(
                            {
                                'columnData': column,
                                'query': query[0],
                                'isSiteDependency': isSiteDependency
                            }
                            ),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if ($.isEmptyObject(data.aaData)) {
                        data.aaData = [["", "", "", "", "", "", "", "", "", "", "", ""]];
                        isEmpty = true;
                    } else {
                        isEmpty = false;
                    }
                    table.dataTable({
                        "paging": true,
                        "data": data.aaData,
                        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                            $(nRow).attr("id", aData[aData.length - 1]);
                            return nRow;

                        },
                        "fnDrawCallback": function () {

                        },
                        "fnInitComplete": function (oSettings, json) {
                            if (isEmpty) {
                                table.DataTable().clear().draw();
                            }
                        },

                    });
                },
                error: function (xhr, status) {
                    alert("Sorry, there was a problem!");
                },
                complete: function (xhr, status) {
                }
            });

        }


        switch (lovType) {
            case "multiple":
                var selectedContainer = $("#" + ID + "_multi-lov"),
                    selectedContent = $('.chosen-choices', selectedContainer);
                table.on('click', 'tbody tr', function () {
                    var value = this.id;
                    var textShow = $("tbody tr[id='" + value + "'] td:eq(0)", table).html();
                    if (!$(this).hasClass('row_selected')) {
                        $(this).addClass('row_selected');

                        if (typeof value !== 'undefined') {
                            selectedContent.append(" <li class='search-choice lov-multiple-selected'>" +
                                                        "<span>" + textShow + "</span>" +
                                                        "<a class='search-choice-close delete-lov-multiple' data-option-array-index='" + value + "'></a>" +
                                                     "</li>");
                            $(".delete-lov-multiple", selectedContainer).unbind('click');
                            $(".delete-lov-multiple", selectedContainer).click(function () {
                                $(this).parents('.lov-multiple-selected').remove();
                                selectedContainer.trigger("lov_multiple_change");
                            })
                            selectedContainer.trigger("lov_multiple_change");
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        $('[data-option-array-index="' + value + '"]', selectedContainer).parents('.lov-multiple-selected').remove();
                        selectedContainer.trigger("lov_multiple_change");
                    }
                });

                selectedContainer.on('lov_multiple_change', function () {
                    id.val('');
                    $(".lov-multiple-selected", $(this)).each(function (i, e) {
                        if ($(".lov-multiple-selected", selectedContainer).length - 1 > i) {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'" + ",");
                        } else {
                            id.val(id.val() + "'" + $('.delete-lov-multiple', $(this)).attr('data-option-array-index') + "'");
                        }
                    })
                })
                break;
            default:
                table.on('click', 'tbody tr', function () {
                    if (!$(this).hasClass('row_selected')) {
                        $('tbody tr.row_selected', table).removeClass('row_selected');
                        $(this).addClass('row_selected');
                        var value = $("tbody tr.row_selected", table).attr('id');
                        var textShow = $("tbody tr.row_selected td:eq(0)", table).html();
                        if (typeof value !== 'undefined') {
                            id.val(value).change();
                            text.val(textShow).change();
                            content.hide();
                            content.removeClass('open');
                        }
                        else {
                            id.val('').change();
                            text.val('').change();
                        }
                    } else {
                        $(this).removeClass('row_selected');
                        id.val('').change();
                        text.val('').change();
                    }
                });
                break;
        }

        button.click(function () {
            content.toggleClass('open');
            if (content.hasClass('open')) {
                var height = button.position().top + button.height() + 10;
                var left = button.position().left - content.width();
                content.css({ 'top': height, "left": left });
                content.show();
                if (IsServerSide == "True") {
                    table.DataTable().destroy();
                    $.ajax({
                        url: "../LOV/Get",
                        type: "POST",
                        data: JSON.stringify(
                                    {
                                        'columnData': column,
                                        'query': query[0],
                                        'isSiteDependency': isSiteDependency
                                    }
                                    ),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (data) {
                            table.dataTable({
                                "paging": true,
                                "data": data.aaData,
                                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                    $(nRow).attr("id", aData[aData.length - 1]);
                                    return nRow;

                                },
                                "fnDrawCallback": function () {

                                },
                                "fnInitComplete": function (oSettings, json) {

                                },

                            });
                        },
                        error: function (xhr, status) {
                            alert("Sorry, there was a problem!");
                        },
                        complete: function (xhr, status) {
                        }
                    });
                }
            }
            else {
                content.hide();
            }
        });

        close.click(function () {
            content.hide();
            content.removeClass('open');
        });

        if (id.val() !== "") {
            $('tbody tr[id="' + id.val() + '"]', table).click();
        }


    }
    this.LOVSelected = function () {
        $('.lov-table').each(function () {
            var _this = this;
            var value = $('.lov-value', $(_this).parents('.lov-container')).val();
            if (value !== "") {
                $('tbody tr[id="' + value + '"]', $(_this)).click();
                $('tbody tr[id="' + value + '"]', $(_this)).click();
            }
        });
    }
    this.LOVEmpty = function (ID) {
        if ($("#" + ID).attr('data-lov-type') !== 'multiple') {
            var value = $('.lov-value', $('#' + ID)).val();
            if (value !== "") {
                $('tbody tr[id="' + value + '"]', $('.lov-table', $('#' + ID))).click();
            }
        } else {
            $(".delete-lov-multiple", $("#" + ID + "_multi-lov")).each(function () {
                $(this).click();
            })
            $('tbody tr.row_selected', $('.lov-table', $('#' + ID))).each(function () {
                $(this).click();
            });
        }

    }
    this.Tab = function (ID) {
        var TabContainer = $("#" + ID),
            TabLink = $('li .tab-anchor', TabContainer),
            ContentID,
            isLoaded,
            Controller;
        TabLink.click(function () {
            var _this = this;
            isLoaded = $(_this).attr('data-is-loaded');

            if (isLoaded == "false") {
                ContentID = $(_this).attr('data-content-id');
                Controller = $(_this).attr('data-controller');
                $("#" + ContentID).load(Controller, function () {
                    $(_this).attr('data-is-loaded', 'true');
                });
            }

        });
        $('li:eq(0) .tab-anchor', TabContainer).click();
    }
    this.init = function (param) {
        $("#changepassword").click(function () {
            $('#ChangePasswordModal').modal('show');
        });



        $("#btn-cancelChangePassword").click(function () {
            $('#ChangePasswordModal').modal('hide');
        });

        $("#btn-changepassword").click(function () {
            if ($("#Form-UpdatePassword").valid()) {
                $.ajaxq("CRUD", {
                    type: "POST",
                    url: $("#Form-UpdatePassword").attr('action'),
                    data: $("#Form-UpdatePassword").serialize(),
                    success: function (data) {
                        var msg = data.result;
                        if (msg == "OK") {
                            $("#Form-UpdatePassword #errorDiv").html("Update Password Success");
                            $("#Form-UpdatePassword #errorMsgDiv").show();
                            setTimeout(function () {
                                $("#Form-UpdatePassword #errorMsgDiv").hide("slow");
                            }, 4000);
                            //document.location = "../Login/Logout/"
                            $("#Form-UpdatePassword")[0].reset()
                            $('#ChangePasswordModal').modal('hide');

                        } else {
                            $("#Form-UpdatePassword #errorDiv").html("Update Password Failed");
                            $("#Form-UpdatePassword #errorMsgDiv").show();
                            setTimeout(function () {
                                $("#Form-UpdatePassword #errorMsgDiv").hide("slow");
                            }, 4000);
                        }
                        //$("#Form-UpdatePassword")[0].reset()
                        //$('#ChangePasswordModal').modal('hide');
                    },
                    dataType: 'json'
                });
            }

        });


        if ($("#PasswordCriteria").val() == "Character") {
            $("#Form-UpdatePassword").validate({
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
                    Password: {
                        required: true,

                        character: true,
                    },
                },
                messages: {

                    Password: {
                        required: "Password Required",
                        character: "Password Error Combination ",
                    }
                }

            });
        }


        //validation for password policy numeric
        if ($("#PasswordCriteria").val() == "Numeric") {
            $("#Form-UpdatePassword").validate({
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

                    Password: {
                        required: true,

                        numeric: true
                    }

                },
                messages: {

                    Password: {
                        required: "Password Required",
                        numeric: "Password Error Combination ",
                    },

                }

            });
        }
        //

        //validation for Aplha Numeric
        if ($("#PasswordCriteria").val() == "Alpha Numeric") {
            $("#Form-UpdatePassword").validate({
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
                    Password: {
                        required: true,
                        alphanumeric: true,
                    },
                },
                messages: {

                    Password: {
                        required: "Password Required",
                        alphanumeric: "Password Error Combination ",

                    }
                }

            });
        }
        //
        //validation for alpha numeric and spesial character
        if ($("#PasswordCriteria").val() == "Alpha Numeric + Special Charac") {
            $("#Form-UpdatePassword").validate({
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
                    Password: {
                        required: true,
                        alphanumericspecial: true,
                    }

                },
                messages: {

                    Password: {
                        required: "Password Required",
                        alphanumericspecial: "Password Error Combination ",
                    }
                }

            });
        }
        //

        utility.pickOneData = param.attribute.AlertPickOneData;
        utility.warning = param.attribute.LabelWarning;
        utility.decimalSeparator = param.attribute.Decimal;
        utility.thousandSeparator = param.attribute.Thousand;
        utility.Info = param.attribute.Info;
        utility.Page = param.attribute.Page;
        utility.Of = param.attribute.Of;
        utility.ZeroResult = param.attribute.ZeroResult;
        utility.InfoEmpty = param.attribute.InfoEmpty;
        utility.Previous = param.attribute.Previous;
        utility.Next = param.attribute.Next;
        utility.Last = param.attribute.Last;
        utility.First = param.attribute.First;
        utility.To = param.attribute.To;
        utility.Entries = param.attribute.Entries;
        utility.formatDate = utility.getFormatDate(param.attribute.DateSeparator, param.attribute.FormatDate);
        utility.notificationLoadMore();
        utility.notificationReadAll();

        $("#NotificationButton").click(function () {
            utility.updateNotification();
        });

        $(document).click(function (e) {
            var target = e.target;
            if (!$(target).is('#searchZ-box .dropdown-menu') && !$(target).parents().is('#searchZ-box .dropdown-menu') && !$(target).parents().is('.datepicker') && !$(target).is('td') && !$(target).is('td span')) {
                $('#searchZ-box .dropdown-menu').hide();
                $('#searchZ-box').removeClass('open');
            }
        });
    }
    this.updateNotification = function () {
        $("#AssetNotificationContent li[data-status='UnRead']").each(function () {
            var _this = this;
            var id = this.id;
            $.ajax({
                url: "../Dashboards/UpdateNotification?IDNotification=" + this.id,
                type: "GET",
                success: function (data) {
                    $(_this).attr('data-status', "Read");
                    $("#TNotification tbody tr[id='" + id + "']").attr('data-status', "Read");
                    $("#TotalAssetNotification").html(parseInt($("#TotalAssetNotification").html()) - 1)
                },
                error: function (xhr, status) {
                    alert("Sorry, there was a problem!");
                },
                complete: function (xhr, status) {
                }
            });
        });
    }
    this.updateNotificationIndex = function () {
        //$("#TNotification tbody tr[data-status='UnRead']").each(function () {
        //    var _this = this;
        //    var id = this.id;
        //    $.ajax({
        //        url: "../Dashboards/UpdateNotification?IDNotification=" + this.id,
        //        type: "GET",
        //        success: function (data) {
        //            $(_this).attr('data-status', "Read");
        //            $("#AssetNotificationContent li[id='" + id + "']").attr('data-status', "Read");
        //            $("#TotalAssetNotification").html(parseInt($("#TotalAssetNotification").html()) - 1)
        //        },
        //        error: function (xhr, status) {
        //            alert("Sorry, there was a problem!");
        //        },
        //        complete: function (xhr, status) {
        //        }
        //    });
        //});
    }
    this.ajaxRequest = function (url, before, success) {
        $.ajax({
            type: "POST",
            url: url,
            beforeSend: function () {
                before();
            },
            success: function (data) {
                success(data);
            },

            dataType: 'json'

        });
    }
    this.initCheckbox = function () {
        $('.checkbox-model').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
        $('.checkbox-model').on('ifChanged', function (event) {
            var val = this.checked;
            $(this).val(val);
        });
        $(".checkbox-model").each(function () {
            if (this.value == "true") {
                $(this).iCheck("check");
            } else {
                this.value = false;
            }
        });
    }
    this.initMultipleSelect = function () {
        $('.multiple-select:not(.chosen-initialized)').chosen();
        $('.multiple-select:not(.chosen-initialized)').chosen().on('chosen:ready', function () {
            $(this).addClass('chosen-initialized');
        });
        $('.multiple-select:not(.chosen-initialized)[multiple="multiple"]').each(function () {
            var name = $(this).attr('name') + "__";
            $(this).parent().append("<input type='hidden' name='" + name + "' id='" + name + "'>");
            $(this).chosen().change(function (e, params) {
                var values = $(this).chosen().val()
                $("#" + name).val('');
                for (var i in values) {
                    if (values.length - 1 > i) {
                        $("#" + name).val($("#" + name).val() + "'" + values[i] + "'" + ',')
                    } else {
                        $("#" + name).val($("#" + name).val() + "'" + values[i] + "'")
                    }
                }
            });
        });
    }
    this.updateCheckbox = function () {
        $(".checkbox-model").each(function () {
            if (this.value == "true") {
                $(this).iCheck("check");
            } else {
                $(this).iCheck("uncheck");
                this.value = false;
            }
        });
    }
    this.initRadio = function () {
        $('.radio-model').iCheck({
            radioClass: 'iradio_square-green',
            handle: 'radio'
        });
        ////$(".radio-model").each(function () {
        //    if (this.value == "true") {
        //        $(this).iCheck("check");
        //    } else {
        //        this.value = false;
        //    }
        //});
    }
    this.initNumeric = function () {
        $('.numeric-model').autoNumeric('init', { aSep: utility.thousandSeparator, aDec: utility.decimalSeparator, mDec: '18', vMax: '9999999999999999999', aPad: false });
    }
    this.initInteger = function () {
        $('.integer-model').autoNumeric('init', { aSep: "", aDec: utility.decimalSeparator, mDec: '0', vMax: '999999999999999999' });
    }
    this.initDate = function () {

        $('.date-model').each(function () {

            var _this = this;
            //$(_this).wrap("<div class='date-format'></div>");
            //$(_this).parent('div').append('<span class="hidden js-format"></span>');
            //$(_this).parent('div').find('.js-format').html($(_this).val());
            //if ($(_this).val() !== "" && typeof $(_this).val() !== 'undefined') {
            //    date = new Date($(_this).val());
            //    $(_this).val(date.format("dd/mm/yyyy"));
            //}
            //if (!$(_this).hasClass('calendar-disable')) {
            $(_this).datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: "dd/mm/yyyy",
            });
            //$(_this).inputmask("dd/mm/yyyy");
            //$(_this).datepicker().on("changeDate", function (e) {
            //    var _this = this;
            //    if (!$.isEmptyObject(e.dates)) {
            //        $(_this).parent('div').find('.js-format').html(e.date.format("yyyy-mm-dd"));
            //    } else {
            //        $(_this).parent('div').find('.js-format').html('');
            //    }


            //});
            //}

        })
        //var form = $('.date-model').closest('form');
    }
    this.initDateTime = function () {

        $('.datetime-model').each(function () {
            var _this = this;
            $(this).datetimepicker({ language: 'en', pickSeconds: false });
            $('input', $(this)).click(function () {
                $('span', $(_this)).click();
            })
        })

    }
    this.getFormatDate = function (separator, FormatDate) {
        var x = FormatDate.split(separator);
        var formatDate = "";
        for (i = 0; i < 3; i++) {
            if (x[i].length !== 2 && x[i][0] !== 'y') {
                formatDate += x[i][0] + x[i][0] + separator;
            } else if (x[i][0] == 'y' && x[i].length !== 4) {
                formatDate += x[i][0] + x[i][0] + x[i][0] + x[i][0] + separator;
            } else {
                formatDate += x[i] + separator;
            }

        }
        formatDate = formatDate.slice(separator, -1);
        return formatDate;
    }
    this.searchInArray = function (array, keyword) {

        var found = false;
        for (i = 0, length = array.length; i < length; i++) {
            found = jQuery.inArray(keyword, array[i])
            if (found >= 0) {
                found = i;
                break;
            }
        }
        return found;
    }
    this.getIndexTable = function (table, keyword) {
        var data = [];
        switch (typeof table) {
            case "object":
                data = table.DataTable().rows().data();
                break;
            case "string":
                data = $("#" + table).DataTable().rows().data();
                break;
            default:
                data = [];
                break;

        }
        var index = utility.searchInArray(data, keyword);
        if (index !== false && index !== -1) {
            return data[index];
        } else {
            return false;
        }
    }
    this.CRUDTable = function (table, type, form) {
        var idTable = "";
        var data = [];
        var dataTable = [];
        var dataAdditional = [];
        var formData = $("#" + form).serializeArray();
        var index = false;
        switch (typeof table) {
            case "object":
                data = table.DataTable();
                idTable = table.attr('id');
                break;
            case "string":
                data = $("#" + table).DataTable();
                idTable = table;
                break;
            default:
                data = [];
                break;
        }
        var searchIndex = function (idTable, keyword) {
            var column = $("#" + idTable + " thead tr th");
            var result = false;
            column.each(function (index) {

                if ($(this).attr('data-form') == keyword) {
                    result = index;
                }
            })
            return result;
        }
        for (i = 0, length = formData.length; i < length; i++) {
            index = searchIndex(idTable, formData[i].name);
            dataTable[i] = "";
            if (index === false) {
                dataAdditional.push(formData[i].value);
            }
            else {
                dataTable[index] = formData[i].value;

            }

        }
        Array.prototype.push.apply(dataTable, dataAdditional);
        dataTable.push('DTID' + utility.generateIDTable(idTable));
        switch (type) {
            case "CREATE":
                data.row.add(dataTable).draw();
                break;
            case "EDIT":
                data.row('.row_selected').remove();
                data.row.add(dataTable).draw();
                break;
            case "DELETE":
                data.row('.row_selected').remove().draw();
                break;
        }

    }

    this.generateIDTable = function (table) {

        var idTable = [];
        if ($("#" + table + " tbody tr").length == 1 && typeof $("#" + table + " tbody tr:eq(0)").attr("id") == "undefined") {
            idTable[0] = 0;
        } else {
            $("#" + table + " tbody tr").each(function (index) {
                idTable[index] = parseInt(this.id.split('DTID')[1]);
            })
        }
        var id = Math.max.apply(Math, idTable);
        return parseInt(id) + 1
    }
    this.loadDataLOV = function (param) {

        for (var item in param) {
            if (param[item] !== "") {
                var idTable = $("#" + item).closest("div").parent().children().find("table").attr("id");
                $("#" + idTable + " tbody tr#" + param[item]).click();

            }
        }
    }
    this.TableloadForm = function (table, form) {
        var value = utility.getIndexTable(table, $('#' + table + ' tbody tr.row_selected').attr("id"));
        for (i = 0, length = value.length; i < length; i++) {
            id = $('#' + table + ' thead tr th:eq(' + i + ')').attr('data-form');
            if (id !== "" && typeof id !== 'undefined') {
                $("#" + form + " #" + id).val(value[i]);
            }
        }
    }

    this.loadXMLDoc = function (destination) {
        //alert(destination);
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("render-body").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", destination, true);
        xmlhttp.send();
    }

    this.loadDetail = function (destination) {
        //alert(destination);
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("render-body").innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", destination, true);
        xmlhttp.send();
    }
    this._loadTabManufacture = function (destination, id_tab) {
        $.ajax({
            url: destination,
            type: "GET",
            dataType: "html",
            success: function (data) {
                $(document).ready(function () {
                    $('#' + id_tab).html(data);
                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                $('#' + id_tab).slideDown('slow')
            }
        });
    }
    this.LoadLOV = function (destination, idLov, parameter) {
        $.ajaxq('LOV', {
            url: destination,
            type: "GET",
            dataType: "html",
            success: function (data) {
                $(document).ready(function () {
                    $('#' + idLov).html(data);


                    var parameterForReturn = '<input id="' + parameter + '" type="hidden" class="parameterForReturn" value="' + parameter + '" name="' + parameter + '">';
                    $('#' + idLov).append(parameterForReturn);
                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            }
        });
    }

    this.LoadLOVX = function (destination, idLov, parameter) {
        $.ajaxq('LOV', {
            url: destination,
            type: "GET",
            dataType: "html",
            success: function (data) {
                $(document).ready(function () {
                    $('#' + idLov).html(data);

                    //console.log(idLov);
                    var parameterForReturnX = '<input id="' + parameter + '" type="hidden" class="parameterForReturnX" value="' + parameter + '" name="' + parameter + '">';
                    $('#' + idLov).append(parameterForReturnX);
                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            }
        });
    }

    this._loadModal = function (destination, idModal) {
        //console.log(document.activeElement);
        $.ajax({
            url: destination,
            type: "GET",
            dataType: "html",
            cache: false,
            processData: false,
            success: function (data) {
                $(document).ready(function () {
                    $('#' + idModal).html(data);
                    $('.modal').on('hidden.bs.modal', function () {
                        $("table:eq(0)").focus();
                        //alert("asdas");

                    });


                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            }
        });
    }

    this._returnLOV = function (parameter, ret) {
        //alert(parameter);
        //$('#' + parameter.split('#')[1]).val(ret.split('#')[0]);
        //$('#' + parameter.split('#')[2]).val(ret.split('#')[1]);
        var a = ret.split("#"), i;

        for (i = 0; i < a.length; i++) {
            $('#' + parameter.split('#')[i + 1]).val(ret.split('#')[i]);
            //console.log(parameter.split('#')[i + 1] + " = " + ret.split('#')[i])
        }

    }

    this.__CRUD = function CRUD_(nameform, callback) {
        var url = $('#' + nameform).attr('action');
        var data = new FormData($('#' + nameform)[0]);
        $.ajaxq('CRUD', {
            type: "POST",
            url: url + "?_=" + Math.random() * Math.random(),
            data: data,
            async: false,
            history: history,
            success: function (data) {
                callback(data);
            },
            cache: false,
            contentType: false,
            processData: false
            //dataType: 'json'
        });
        return false;
    }

    this._CRUD = function CRUD_(nameform, act, history, table, append) {


        var url = $('#' + nameform).attr('action');
        var data = $('#' + nameform).serialize();
        $.ajaxq('CRUD', {
            type: "POST",
            url: url + "?_=" + Math.random() * Math.random(),
            cache: false,
            processData: false,
            data: data,
            history: history,
            success: function (data) {

                url = url.split('/')[1];
                url = url + '/index?' + history
                var msg = JSON.stringify(data.result);
                //alert(msg.split('|')[0]);
                if (msg.split('|')[0].substring(1) == 'Err') {
                    $("#errorMsgDiv").html(msg.split('|')[1]);
                    $("#errorDiv").show();
                    $("#errorDivManufacturer").show();


                } else {
                    //if (act == 'DELETE') {
                    //    $('#DeleteModal').modal('hide');
                    //    // $('#EditModal').modal('hide');
                    //} else if (act == 'LOCKED') {
                    //    $('#LockedModal').modal('hide');
                    //} else if (act == 'UNLOCKED') {
                    //    $('#UnlockedModal').modal('hide');
                    //} else if (act == 'RESET') {
                    //    $('#ResetPasswordModal').modal('hide');
                    //}
                    var message = "";
                    if (act == "LOCKED") {
                        message = "Success Locked Data"
                    } else if (act == "UNLOCKED") {
                        message = "Success Unlocked Data"
                    } else if (act == "RESET") {
                        message = "Succes Reset Password Data"
                    } else if (act == "UPDATE") {
                        message = "Success Update Data"
                    } else if (act == "ADD") {
                        message = "Success Add Data"
                    }
                    //$(".modal").modal('hide');
                    if (table != "") {
                        $("#" + table).DataTable().draw();
                    }
                    if (append != "") {
                        utility.alert($("#" + append), "success", message)
                    }

                    //utility._loadMenu(url, data.result);

                    //setTimeout(function () {
                    //    //console.log(msg)
                    //    $("#successDiv").html(msg);
                    //    $("#successDiv").show();
                    //}, 500);
                    //setTimeout(function () {
                    //    $("#successDiv").hide("slow");
                    //}, 4000);
                }
                //alert(JSON.stringify(data.result));
                //utility._loadMenu(url);
            },

            dataType: 'json'
        });
        return false;
    }

    this.CRUDCW = function (form, table, append, form2) {
        var url = $("#" + form).attr('action');
        var data = $("#" + form).serialize();
        var data2 = $("#" + form2).serialize();
        var method = $("#" + form).attr('xxx');
        //console.log(data);
        //console.log(url);
        var message = "";
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        if (typeof form2 !== "undefined") {
            $.ajaxq("CRUD", {
                type: "POST",
                url: url,
                data: data + "&" + data2,
                success: function (data) {
                    var msg = data.result;
                    if (parseInt(msg) > 0) {
                        console.log()
                        if (method == "Create") {
                            message = "Success Add Data " + utc;
                        } else if (method == "Edit") {
                            message = "Success Edit Data " + utc;
                        } else if (method == "Delete") {
                            message = "Success Delete Data " + utc;
                        } else {
                            message = "Success " + method + " Data " + utc;
                        }
                        // alert(message)
                        //$("#" + form + " #successMsgDiv").html(message);
                        //$("#" + form + " #successDiv").show();
                        utility.alert($("#" + append), "success", message)
                        if (table != "") {
                            $("#" + table).DataTable().draw();
                        }

                        return parseInt(msg);

                        //setTimeout(function () {
                        //    $("#" + form + " #successDiv").hide("slow");
                        //}, 4000);

                    } else {
                        //$("#" + form + " #errorMsgDiv").html("Error");
                        //$("#" + form + " #errorDiv").show();
                        //setTimeout(function () {
                        //    $("#" + form + " #errorDiv").hide("slow");
                        //}, 4000);
                        utility.alert($("#" + append), "error", msg)
                        return 0;
                    }
                },
                dataType: 'json'
            });
        } else {
            $.ajaxq("CRUD", {
                type: "POST",
                url: url,
                data: data,
                success: function (data) {
                    var msg = data.result;
                    if (parseInt(msg) > 0) {
                        if (method == "Create") {
                            message = "Success Add Data " + utc;
                        } else if (method == "Edit") {
                            message = "Success Edit Data " + utc;
                        } else if (method == "Delete") {
                            message = "Success Delete Data " + utc;
                        } else {
                            message = "Success " + method + " Data " + utc;
                        }
                        utility.alert($("#" + append), "success", message)
                        if (table != "") {
                            $("#" + table).DataTable().draw();
                        }

                        //setTimeout(function () {
                        //    $("#" + form + " #successDiv").hide("slow");
                        //}, 4000);

                    } else {
                        //$("#" + form + " #errorMsgDiv").html("Error");
                        //$("#" + form + " #errorDiv").show();
                        //setTimeout(function () {
                        //    $("#" + form + " #errorDiv").hide("slow");
                        //}, 4000);
                        utility.alert($("#" + append), "error", msg)
                    }
                },
                dataType: 'json'
            });
        }
        return false;
    }

    //digunanakan untuk merubah isi dalam tab panel
    this._loadTab = function (destination, id_tab) {
        $.ajax({
            url: destination,
            type: "GET",
            dataType: "html",
            success: function (data) {
                $(document).ready(function () {
                    $('#' + id_tab).html(data);
                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                $('#' + id_tab).slideDown('slow')
            }
        });
    }

    //digunakan untuk load menu saat klik sidebar menu
    this._loadMenu = function (destination, callback) {
        
        //add by irham 2015-09-29 for cek session

        utility.cekSession();
        var r = $.Deferred();
        //add by irham 2015-09-29 to set feature name base on database
        var featurename = $("ol li#ftr-name").text();
        //alert(featurename);
        setTimeout(function () {
            //$(".btn").unbind();
            if (utility.session === true) {
                $.ajax({
                    url: destination,
                    type: "GET",
                    dataType: "html",
                    featurename: featurename,
                    success: function (data) {
                        $('#ftr-name a').unbind('click');
                        $(document).ready(function () {
                            $('#render-body').html(data);
                            if (typeof callback == 'function') {
                                callback();
                            }
                            utility.initAjax();
                        });
                    },
                    error: function (xhr, status) {
                        alert("Sorry, there was a problem!");
                    },
                    complete: function (xhr, status) {
                        $('#render-body').slideDown('slow');


                    }
                }).done(function () {
                    //$(".btn").bind();
                    //OnloadFunction();
                    r.resolve();
                    //if ($("ol li#ftr-name a").length) {
                    //    $('ol li#ftr-name a').html(featurename);
                    //    $('ol li#ftr-name a').removeAttr("onclick").removeAttr('href');
                    //}
                    //else {
                    //    $('ol li#ftr-name').html("<strong>" + featurename + "</strong>");
                    //}
                    $('.page-heading h2').html(featurename);
                    Dropzone.autoDiscover = false;
                    $('body').tooltip({
                        selector: "[data-toggle=tooltip]",
                        container: "body"
                    });
                    $('.tooltip').remove();
                });
            }
        }, 200);
        return r;
    }

    this.clickmenu = function (selector) {
        $("#" + selector).bind("click", function () {
            TableName = selector.replace(/-+/g, '').toUpperCase();
            if (TableName == "FEATURE") {
                $("#" + TableName + "T" + TableName).DataTable().draw();
                $("#" + TableName + "TMODULE").DataTable().draw();
            } else {
                $("#" + TableName + "T" + TableName).DataTable().draw();
            }

        })
    }

    this.clicktab = function (selector) {
        $("#render-body ul #li-" + str.toUpperCase()).bind("click", function () {
            $("#render-body .main-content #tabs-" + selector + " ul li.IFS").each(function () {
                if ($(this).hasClass("active")) {
                    $("#render-body .main-content #tab" + selector.toUpperCase()).removeClass("active")
                    $("#render-body .main-content #tab-" + selector.toUpperCase()).removeClass("active")
                } else {
                    $("#render-body .main-content #tab" + selector.toUpperCase()).addClass("active")
                    $("#render-body .main-content #tab-" + selector.toUpperCase()).addClass("active")
                }
            })
        })
    }

    this.closetab = function (selector) {
        $("#close-" + selector).bind("click", function () {
            if ($(this).parents('li').next().length) {
                $(this).parents('li').next().tab('show');
                var a = $(this).parents('li').next().find('a').attr('href');
                $(a).addClass('active')
                $(this).parents('li').remove('li');
                $('#tabs-' + selector).remove();
            } else if ($(this).parents('li').prev().length) {
                $(this).parents('li').remove('li');
                $('#tabs-' + selector).remove();
                $('a', $('#render-body ul li')).prev().tab('show');
            } else {
                $(this).parents('li').remove('li');
                $('#tabs-' + selector).remove();
            }

        });
    }

    this._loadMenuList = function (destination, featurename) {
        utility.cekSession();
        setTimeout(function () {
            if (utility.session === true) {
                str = featurename.replace(/\s+/g, '-').toLowerCase();
                //console.log(str)
                if ($("#render-body ul li #" + str).length > 0) {
                    $("#render-body ul li #" + str).click();
                } else {
                    $.ajax({
                        url: destination,
                        type: "GET",
                        dataType: "html",
                        featurename: featurename,
                        cache: "false",
                        success: function (data) {
                            $(document).ready(function () {
                                $("#render-body ul>li.main-li-tab.active ").removeClass("active");
                                $("#render-body .tab-pane.main-tab-pane.active").removeClass("active");
                                $("#render-body ul.main-tab").append('<li class="active main-li-tab" id="li-' + str.toUpperCase() + '"><a id = "' + str + '" data-toggle="tab" area-expanded="true" href="#tabs-' + str + '">' + featurename + '</a><a class = "close-tab-btn" id="close-' + str + '">x</a></li>');
                                $("#render-body .main-content").append('<div class="tab-pane active main-tab-pane" id="tabs-' + str + '">' + data + '</div>');
                                utility.clickmenu(str);
                                //utility.clicktab(str);
                                utility.closetab(str);
                                utility.initAjax();
                                document.title = "I O T | " + featurename;
                            });
                        },
                        error: function (xhr, status) {

                            alert("Sorry, there was a problem!");
                        },
                        complete: function (xhr, status) {
                            $('#render-body').slideDown('slow');
                            window_width = $(window).width();
                            if (window_width < 801) {

                                $('.mobile-menu-clicked').removeClass('fadeIn').addClass('fadeOut');
                                setTimeout(function () {
                                    $('.mobile-menu-clicked').addClass('hide');
                                }, 400);
                                //
                                if (!$('.mobile-menu-clicked').hasClass('hide')) {
                                    $("body").toggleClass("mini-navbar");
                                    SmoothlyMenu();
                                }

                            }

                        }
                    }).done(function () {
                        // $(".btn").bind();
                        //OnloadFunction();
                        //add by irham 2015-09-29 to set feature name base on database
                        //$('ol li#ftr-name').html("<strong>" + featurename + "</strong>");
                        //$('.page-heading h2').html(featurename);
                        //Dropzone.autoDiscover = false;
                        $('body').tooltip({
                            selector: "[data-toggle=tooltip]",
                            container: "body"
                        });
                        $('.tooltip').remove();
                    });
                }
            }
        }, 200);

    }
    this.__loadMenuList = function (destination, featurename, callback) {
        utility.cekSession();
        //alert(utility.session);

        setTimeout(function () {
            //$(".btn").unbind();
            if (utility.session === true) {
                //alert(utility.session);

                $.ajax({
                    url: destination,
                    type: "GET",
                    dataType: "html",
                    featurename: featurename,
                    chace: "false",
                    success: function (data) {
                        $(document).ready(function () {
                            $('#render-body').html(data);
                            utility.initAjax();
                            document.title = "I O T | " + featurename;
                        });
                    },
                    error: function (xhr, status) {
                        alert("Sorry, there was a problem!");
                    },
                    complete: function (xhr, status) {
                        $('#render-body').slideDown('slow');
                        window_width = $(window).width();
                        if (window_width < 801) {

                            $('.mobile-menu-clicked').removeClass('fadeIn').addClass('fadeOut');
                            setTimeout(function () {
                                $('.mobile-menu-clicked').addClass('hide');
                            }, 400);
                            //
                            if (!$('.mobile-menu-clicked').hasClass('hide')) {
                                $("body").toggleClass("mini-navbar");
                                SmoothlyMenu();
                            }

                        }

                    }
                }).done(function () {
                    // $(".btn").bind();
                    //OnloadFunction();
                    //add by irham 2015-09-29 to set feature name base on database
                    //$('ol li#ftr-name').html("<strong>" + featurename + "</strong>");
                    $('.page-heading h2').html(featurename);
                    Dropzone.autoDiscover = false;
                    $('body').tooltip({
                        selector: "[data-toggle=tooltip]",
                        container: "body"
                    });
                    $('.tooltip').remove();
                    callback();
                });


            }
        }, 200);

    }
    //generate menu from json

    this.GenerateNavigationMenu = function (param) {
        //alert(destination);
        utility.session = true;
        $.ajax({
            url: "/Dashboards/GenerateModule",
            type: "GET",
            dataType: "html",
            success: function (data) {
                //$(document).ready(function () {
                var menu = $('#side-menu');
                // $('#menuElement').html(data);
                result = jQuery.parseJSON(data);
                //for (var k in result) {
                //    //console.log(k, result[k]);
                //    var menuList = '<li id="NavMenu-' + result[k].IDModule + '" class=""><a href="#"><i class="fa fa-diamond"></i><span class="nav-label">' + result[k].ModuleName + '</span><span class="fa arrow"></span></a></li>';
                //    getMenuItem(result[k].IDModule);
                //    menu.append(menuList);
                //}
                var menuList = '';
                var lastModule = '';
                var lastTypeFeatures = '';
                var tutupUlTipeApp = false;
                var level2sudahdibuka = false;

                for (var k in result) {

                    if (tutupUlTipeApp == true && level2sudahdibuka == true && result[k].ParentID != lastModule && result[k].FeaturesType != lastTypeFeatures) {
                        menuList = menuList + '</ul>';
                        //alert(menuList);
                        level2sudahdibuka = false;

                    }

                    if (tutupUlTipeApp == true && lastTypeFeatures == 'RPT' && result[k].FeaturesType != lastTypeFeatures) { menuList = menuList + '</ul>' }

                    //tutup tipe app atau report
                    if (result[k].FeaturesType != lastTypeFeatures && lastTypeFeatures != '') { menuList = menuList + '</ul>' }
                    //

                    if (result[k].ParentID !== null) {
                        if (result[k].FeaturesType != lastTypeFeatures) {
                            //if (lastTypeFeatures != '') { menuList = menuList + '</li></ul>'; }

                            if (result[k].FeaturesType == 'APP') {
                                //console.log(result[k].FeaturesType + "-" + result[k].FeaturesName);
                                menuList = menuList + '<ul class="nav nav-second-level "><li><a href="#"><i class="fa fa-desktop"></i> ' + param.attribute.App + '<span class="fa arrow"></span></a>';
                                level2sudahdibuka = true;
                                lastTypeFeatures = result[k].FeaturesType;
                                //buka ul untuk tipe aplikasi
                                menuList = menuList + '<ul class="nav nav-third-level">'
                                tutupUlTipeApp = true;
                            }

                            if (result[k].FeaturesType == 'RPT') {
                                //if (tutupUlTipeApp == true) { menuList = menuList + '</ul>' }
                                if (level2sudahdibuka != true) {
                                    menuList = menuList + '<ul class="nav nav-second-level"><li><a href="#"><i class="fa fa-file-archive-o"></i> ' + param.attribute.Rpt + '<span class="fa arrow"></span></a>';
                                    level2sudahdibuka = true;
                                }
                                else {

                                    menuList = menuList + '<li><a href="#"><i class="fa fa-file-archive-o"></i>' + param.attribute.Rpt + '<span class="fa arrow"></span></a>';
                                }
                                lastTypeFeatures = result[k].FeaturesType;
                                menuList = menuList + '<ul class="nav nav-third-level">'
                                tutupUlTipeApp = true;
                            }


                        }
                        var urlny = '"' + result[k].PathApp + '"';
                        var icon = result[k].icon;
                        var iconType = result[k].IconType;
                        if (iconType == 'Unicode') {
                            if (icon == null || icon == "") {
                                icon = '<i class="fa fa-bars"></i>';
                            }
                            else {
                                icon = '<i class="fa ' + icon + '"></i>';
                            }
                        }
                        else {
                            icon = '<span class="image-menu"><img src="' + icon + '"  height="14" width="14"></span>&nbsp;&nbsp;';
                        }
                        //icon = "";
                        var featurename = '"' + result[k].FeaturesName + '"';
                        if (result[k].PathApp != '#') {

                            if (result[k].IsExternal) {
                                urlny = urlny.replace(/\\/g, '\\\\')
                                if (result[k].FeaturesAction == 'URL') {
                                    menuList = menuList + "<li><a href='#' onclick='window.open(" + urlny + ")'>" + icon + " " + result[k].FeaturesName + "</a></li>";
                                }
                                else {
                                    menuList = menuList + "<li><a href='#' onclick='utility.runapp(" + urlny + ")'>" + icon + " " + result[k].FeaturesName + "</a></li>";
                                }

                            }
                            else {
                                //console.log(result[k].IsExternal);
                                //menuList = menuList + "<li><a href='#' onclick='utility._loadMenuList(" + urlny + "," + featurename + ")'>" + icon + " " + result[k].FeaturesName + "</a></li>";
                                menuList = menuList + "<li><a href='#" + result[k].PathApp + "#" + result[k].FeaturesName + "' onclick='utility._loadMenuList(" + urlny + "," + featurename + ")'>" + icon + " " + result[k].FeaturesName + "</a></li>";
                            }


                        }
                        else {
                            //if (result[k].FeaturesName !==''){
                            menuList = menuList + "<li><a href='#'>" + icon + " " + result[k].FeaturesName + "</a></li>";
                            //}
                        }
                    }

                    if (result[k].ParentID == null && result[k].IDFeatures != lastModule) {
                        lastTypeFeatures = "";
                        if (lastModule != '' && result[k].ParentID == null) { menuList = menuList + '</li>'; }
                        //if (lastTypeFeatures != '') { menuList = menuList + '</ul>'; }
                        //menuList = menuList + '<li id="NavMenu-' + result[k].IDFeatures + '" class=""><a href="#"><i class="fa fa-diamond"></i><span class="nav-label">' + result[k].FeaturesName + '</span><span class="fa arrow"></span></a>';
                        var icon = result[k].icon;
                        var iconType = result[k].IconType;
                        //console.log(icon);

                        if (iconType == 'Unicode') {
                            if (icon == null || icon == "") {
                                icon = "fa-bars";
                            }
                            menuList = menuList + '<li class=""><a href="#"><i class="fa ' + icon + '"></i><span class="nav-label">' + result[k].FeaturesName + '</span><span class="fa arrow"></span></a>';
                        }
                        else {
                            menuList = menuList + '<li class=""><a href="#"><span class="image-menu"><img src="' + icon + '"></span><span class="nav-label">&nbsp;&nbsp;' + result[k].FeaturesName + '</span><span class="fa arrow"></span></a>';
                        }
                        lastModule = result[k].IDFeatures;

                    }

                    //start level 2


                    //menuList = '<li id="NavMenu-' + result[k].IDModule + '" class=""><a href="#"><i class="fa fa-diamond"></i><span class="nav-label">' + result[k].ModuleName + '</span><span class="fa arrow"></span></a></li>';
                    //getMenuItem(result[k].IDModule);
                    //console.log(menuList);
                }
                menu.append(menuList);
                //alert(menuList);
                // });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                $('#side-menu').metisMenu();

            }
        }).done(function () {
            //$('#side-menu').metisMenu();
        });
    }

    this.getMenuItem = function (itemData) {
        $.ajax({
            url: "/Dashboards/GetFeatureMenu/" + itemData,

            type: "GET",
            dataType: "html",
            success: function (data) {
                $(document).ready(function () {
                    var menu = $('#NavMenu-' + itemData);

                    // $('#menuElement').html(data);
                    result = jQuery.parseJSON(data);
                    // alert(result);
                    if (result != '') {
                        var menulist = '<ul class="nav nav-second-level">';
                        for (var k in result) {
                            //console.log(menu);
                            //console.log(k, result[k]);
                            //var menuList = '<li id="NavMenu-' + result[k].IDModule + '"><a href="#"><i class="fa fa-th-large"></i><span class="nav-label">' + result[k].ModuleName + '</span><span class="fa arrow"></span></a></li>';
                            menulist = menulist + '<li>';
                            menulist = menulist + '<a href="#">Dashboard v.1</a>';
                            menulist = menulist + '</li>';

                        }
                        menulist = menulist + '</ul>';
                        menu.append(menulist);
                    }
                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                $('#side-menu').metisMenu();
            }
        }).done(function () {
            $("#menu").metisMenu();

        });
    };

    this.ListOfSite = function (currentSite) {
        $.ajax({
            url: "/Dashboards/GetDataSite",
            type: "GET",
            dataType: "html",
            success: function (data) {
                $(document).ready(function () {
                    result = jQuery.parseJSON(data);
                    var dom = $("#tab-1");
                    var list = "";
                    for (var k in result) {
                        if (currentSite == result[k].IDSite) {
                            //list = list + "<div class='wizard-login-site' id='" + result[k].IDSite + "'><img src='/Images/AssetImage/" + result[k].SiteLogo + "' class='img-circle' alt='image'> <h3>" + result[k].SiteName + "</h3> </div>"
                        }
                        else {
                            list = list + "<div class='wizard-login-site' id='" + result[k].IDSite + "'><img src='/Images/AssetImage/" + result[k].SiteLogo + "' class='img-circle' alt='image'> <h3>" + result[k].SiteName + "</h3> </div>"
                        }

                    }
                    dom.append(list);
                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {

                $('.wizard-login-site').click(function () {

                    var id = this.id;
                    $('#PickSiteModal').modal('show');
                    //

                    $("#frm-changesite-btn").click(function () {

                        document.location = "../Login/PickSite/" + id
                    });


                    $("#frm-cancel-btn").click(function () {
                        $('#PickSiteModal').modal('hide');
                    });

                })

            }
        })
    }

    this.ListOfLanguage = function (currentLanguage) {
        $.ajax({
            url: "/Dashboards/ListOfLanguage",
            type: "GET",
            dataType: "html",
            success: function (data) {
                $(document).ready(function () {
                    result = jQuery.parseJSON(data);
                    var dom = $("#ListOfLanguage");
                    var language = "";
                    for (var i in result) {
                        if (currentLanguage == result[i].IDLanguage) {
                            language += "<li class='active'><a href='#'>" + result[i].LanguageName + "</a></li>";
                        }
                        else {
                            var IDLanguage = result[i].IDLanguage;
                            language += "<li ><a href='#' onclick=utility.ChangeLanguage('" + IDLanguage + "')>" + result[i].LanguageName + "</a></li>";
                        }

                    }
                    dom.html(language);
                });
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                //$('#side-menu').metisMenu();
            }
        })
    }
    this.getNotification = function (limit, offset, type) {

        $.ajax({
            url: "/Dashboards/GetNotification?Limit=" + parseInt(limit) + "&Offset=" + parseInt(offset),
            type: "GET",
            dataType: "html",
            success: function (data) {
                var notif = $.parseJSON(data),
                    content = '',
                    day,
                    time,
                    dateNotification,
                    dateNow = new Date(),
                    timeFormat;
                if (notif.length) {
                    $("#NotificationLoadMore").removeAttr('disabled');
                    if (type !== 'load-more') {
                        $('#AssetNotificationContent li:not(.read-more)').remove();
                    }
                    for (var i in notif) {
                        dateNotification = new Date(notif[i].DateOfNotification.match(/\d+/)[0] * 1);
                        day = Math.round((dateNow - dateNotification) / (1000 * 60 * 60 * 24));
                        time = Math.round((dateNow - dateNotification) / (1000 * 60 * 60));
                        timeFormat = utility.formatAMPM(dateNotification);
                        content += '<li id="' + notif[i].IDNotification + '" data-status="' + notif[i].NotificationStatus + '">' +
                                    '<div class="dropdown-messages-box">' +
                                        '<a href="#" class="pull-left">' +
                                            '<img alt="image" class="img-circle" src="../Images/a7.jpg">' +
                                        '</a>' +
                                        '<div class="media-body">' +
                                            '<small class="pull-right">' + time + 'h ago</small>' +
                                            '<strong>' + notif[i].NotificationMessage + '</strong>.<br>' +
                                            '<small class="text-muted">' + day + ' days ago at ' + timeFormat + ' - ' + dateNotification.getDate() + '/' + dateNotification.getMonth() + '/' + dateNotification.getFullYear() + '</small>' +
                                        '</div>' +
                                    '</div>' +
                                '</li>' +
                                '<li class="divider"></li>';
                    }

                    $('#AssetNotificationContent').prepend(content);
                    $('#TotalAssetNotification').html(notif[i].UnreadMsg);
                    $('#TotalAssetNotification').attr('data-total-unread', notif[i].UnreadMsg);
                    $('#TotalAssetNotification').attr('data-total-records', notif[i].TotalRecords);

                    $("#NotificationLoadMore").attr('data-offset', parseInt($("#NotificationLoadMore").attr('data-offset')) + notif.length)
                    if (parseInt($("#NotificationLoadMore").attr('data-offset')) >= parseInt(notif[i].TotalRecords)) {
                        $("#NotificationLoadMore").attr('disabled', 'disabled');
                    }
                    if (type == 'load-more') {
                        utility.updateNotification();
                    }
                }
            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                //$('#side-menu').metisMenu();
            }
        })

    }

    this.getGauge = function () {
        var gauges = $.parseJSON($("#dashboardGauge").attr('data-dashboard'));
        var output = '';
        var dashboards = [];

        $("#SiteCode").change(function () {
            $.ajax({
                url: "/Login/PickSite?id=" + this.value,
                type: "GET",
                dataType: "html",
                success: function (data) {
                    //var j = $.parseJSON(data);
                },
                error: function (xhr, status) {
                    alert("Sorry, there was a problem!");
                },
                complete: function (xhr, status) {
                    utility._loadMenu("../Dashboards/Home?SiteCode=" + $("#SiteCode").val());
                }
            })
        });
        for (var i in gauges) {
            var canvases = [];
            switch (gauges[i].DashboardType) {
                case "1":
                    for (var j in gauges[i].Dashboard) {

                        $("#gauge-" + i).append(
                                        '<div class="col-lg-12">' +
                                                '<div class="ibox-title"><h2> Work Type ' + gauges[i].Dashboard[j].WorkTypeDescription + '</h2></div>' +
                                                '<div id="gauge-' + i + '-' + j + '" class="gauge"></div>' +
                                                '<div class="gauge-value">' +
                                                    '<h4>Target Value</h4>' +
                                                    '<h2 class="gauge-percent">' + gauges[i].TargetValue + '</h2>' +
                                                    '<h4>Current Value</h4>' +
                                                    '<h2 class="gauge-percent">' + gauges[i].Dashboard[j].TotalRecords + '</h2>' +
                                                    '<h4>Variance</h4>' +
                                                    '<h2 class="gauge-percent">' + (gauges[i].Dashboard[j].TotalRecords - gauges[i].TargetValue) + '</h2>' +
                                                '</div>' +
                                                '<div class="gauge-description">' +
                                                '<p class="gauge-description--title">Description</p>' +
                                                '<p>' + gauges[i].WidgetDesc + '</p>' +
                                                '</div>' +
                                        '</div>');
                        var gaugeObj = new JustGage({
                            id: "gauge-" + i + '-' + j,
                            value: gauges[i].Dashboard[j].TotalRecords,
                            min: gauges[i].StartValue,
                            max: gauges[i].EndValue,
                            decimals: 0,
                            gaugeWidthScale: 1,
                            customSectors: [{
                                color: "green",
                                hi: gauges[i].EndValue - gauges[i].CriticalValue
                            }, {
                                color: "yellow",
                                hi: gauges[i].CriticalValue
                            }, {
                                color: "red",
                                hi: gauges[i].AlertValue
                            }],
                            counter: true
                        });
                    }
                    break;
                case "3":
                case "2":
                    var labels = [];
                    var data = [];
                    var dataOpen = [];
                    var dataClose = [];
                    var dataCompleted = [];
                    var dataQ1 = [];
                    var dataQ2 = [];
                    var dataQ3 = [];
                    var dataQ4 = [];
                    var Proactive = [0, 0, 0, 0];
                    var Request = [0, 0, 0, 0];
                    if (gauges[i].QueryType == 'TypeStatus' || gauges[i].QueryType == 'Type') {
                        $("#gauge-" + i).append(
                            '<canvas id="barchart-worktype-' + i + '" height="140"></canvas>'
                        );
                        canvases.push("barchart-worktype-" + i);
                    }
                    if (gauges[i].QueryType == 'TypeStatus' || gauges[i].QueryType == 'Status') {
                        $("#gauge-" + i).append(
                            '<canvas id="barchart-workstatus-' + i + '" height="140"></canvas>'
                        );
                        canvases.push("barchart-workstatus-" + i);
                    }
                    if (gauges[i].QueryType == 'Request') {
                        $("#gauge-" + i).append(
                            '<canvas id="barchart-Request-' + i + '" height="140"></canvas>'
                        );
                        canvases.push("barchart-Request-" + i);
                    }
                    if (gauges[i].QueryType == 'TriSmester') {
                        $("#gauge-" + i).append(
                            '<canvas id="barchart-TriSmester-' + i + '" height="140"></canvas>'
                        );
                        canvases.push("barchart-TriSmester-" + i);
                    }
                    for (var j in gauges[i].Dashboard) {
                        labels.push(gauges[i].QueryType !== 'Request' ? gauges[i].Dashboard[j].WorkTypeDescription : gauges[i].Dashboard[j].WorkPriorityDescription);
                        data.push(gauges[i].Dashboard[j].TotalRecords);
                        if (gauges[i].QueryType == 'TypeStatus' || gauges[i].QueryType == 'Status') {
                            var WorkStatus = gauges[i].Dashboard[j].WorkStatus != '' ? $.parseJSON(gauges[i].Dashboard[j].WorkStatus) : [];
                            switch (WorkStatus.length) {
                                case 1:
                                    switch (WorkStatus[0].WorkStatusID) {
                                        case '1':
                                            dataOpen.push(WorkStatus[0].Total);
                                            dataClose.push(0);
                                            dataCompleted.push(0);
                                            break;
                                        case '2':
                                            dataClose.push(WorkStatus[0].Total);
                                            dataOpen.push(0);
                                            dataCompleted.push(0);
                                            break;
                                        case '7':
                                            dataCompleted.push(WorkStatus[0].Total);
                                            dataOpen.push(0);
                                            dataClose.push(0);
                                            break;
                                    }

                                    break;
                                case 2:
                                    dataOpen.push(WorkStatus[0].Total);
                                    switch (WorkStatus[1].WorkStatusID) {
                                        case '2':
                                            dataClose.push(WorkStatus[1].Total);
                                            dataCompleted.push(0);
                                            break;
                                        case '7':
                                            dataCompleted.push(WorkStatus[1].Total);
                                            dataClose.push(0);
                                            break;
                                    }
                                    break;
                                case 3:
                                    dataOpen.push(WorkStatus[0].Total);
                                    dataClose.push(WorkStatus[1].Total);
                                    dataCompleted.push(WorkStatus[2].Total);
                                    break;
                                default:
                                    dataClose.push(0);
                                    dataOpen.push(0);
                                    dataCompleted.push(0);
                                    break;
                            }
                        }
                        if (gauges[i].QueryType == 'TriSmester') {
                            Proactive = [parseInt($("#Tgauge-" + i + " tbody tr:eq(0) td:eq(2)").text()), parseInt($("#Tgauge-" + i + " tbody tr:eq(0) td:eq(3)").text()), parseInt($("#Tgauge-" + i + " tbody tr:eq(0) td:eq(4)").text()), parseInt($("#Tgauge-" + i + " tbody tr:eq(0) td:eq(5)").text())]
                            Request = [parseInt($("#Tgauge-" + i + " tbody tr:eq(1) td:eq(2)").text()), parseInt($("#Tgauge-" + i + " tbody tr:eq(1) td:eq(3)").text()), parseInt($("#Tgauge-" + i + " tbody tr:eq(1) td:eq(4)").text()), parseInt($("#Tgauge-" + i + " tbody tr:eq(1) td:eq(5)").text())]

                        }
                    }
                    if (gauges[i].QueryType == 'TypeStatus' || gauges[i].QueryType == 'Type') {
                        var barDataWorkType = {
                            labels: labels,
                            datasets: [
                                {
                                    label: "Work Type",
                                    backgroundColor: "rgba(26,179,148,0.5)",
                                    borderColor: "rgba(26,179,148,0.8)",
                                    pointHoverBackgroundColor: "rgba(26,179,148,0.75)",
                                    pointHoverBorderColor: "rgba(26,179,148,1)",
                                    data: data
                                },

                            ]
                        };
                    }
                    if (gauges[i].QueryType == 'Request') {
                        var barDataRequest = {
                            labels: labels,
                            datasets: [
                                {
                                    label: "Work Priority",
                                    backgroundColor: "rgba(26,179,148,0.5)",
                                    borderColor: "rgba(26,179,148,0.8)",
                                    pointHoverBackgroundColor: "rgba(26,179,148,0.75)",
                                    pointHoverBorderColor: "rgba(26,179,148,1)",
                                    data: data
                                },

                            ]
                        };
                    }
                    if (gauges[i].QueryType == 'TriSmester') {
                        var barDataTriSmester = {
                            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                            datasets: [
                                {
                                    label: "Pro-Active",
                                    backgroundColor: "rgba(26,179,148,0.5)",
                                    borderColor: "rgba(26,179,148,0.8)",
                                    pointHoverBackgroundColor: "rgba(26,179,148,0.75)",
                                    pointHoverBorderColor: "rgba(26,179,148,1)",
                                    data: Proactive
                                },
                                {
                                    label: "Request",
                                    backgroundColor: "#ffcc00",
                                    borderColor: "#ffcc00",
                                    pointHoverBackgroundColor: "#ffe680",
                                    pointHoverBorderColor: "#ffe680",
                                    data: Request
                                },

                            ]
                        };
                    }
                    if (gauges[i].QueryType == 'TypeStatus' || gauges[i].QueryType == 'Status') {
                        var barDataWorkStatus = {
                            labels: labels,
                            datasets: [
                                {
                                    label: "Open",
                                    backgroundColor: "#00ff80",
                                    borderColor: "#00ff80",
                                    pointHoverBackgroundColor: "#66ffb3",
                                    pointHoverBorderColor: "#66ffb3",
                                    data: dataOpen
                                },
                                {
                                    label: "Close",
                                    backgroundColor: "#ff4d4d",
                                    borderColor: "#ff4d4d",
                                    pointHoverBackgroundColor: "#ff9999",
                                    pointHoverBorderColor: "#ff9999",
                                    data: dataClose
                                },
                                {
                                    label: "Completed",
                                    backgroundColor: "#ffcc00",
                                    borderColor: "#ffcc00",
                                    pointHoverBackgroundColor: "#ffe680",
                                    pointHoverBorderColor: "#ffe680",
                                    data: dataCompleted
                                }
                            ]
                        };
                    }
                    var typeBar = gauges[i].DashboardType == "2" ? 'bar' : 'horizontalBar';
                    if (gauges[i].QueryType == 'TypeStatus' || gauges[i].QueryType == 'Type') {
                        var ctx = document.getElementById("barchart-worktype-" + i).getContext("2d");
                        var myNewChart = new Chart(ctx, {
                            type: typeBar,
                            data: barDataWorkType,
                        });
                    }
                    if (gauges[i].QueryType == 'TypeStatus' || gauges[i].QueryType == 'Status') {
                        var ctx2 = document.getElementById("barchart-workstatus-" + i).getContext("2d");
                        var myNewChart2 = new Chart(ctx2, {
                            type: typeBar,
                            data: barDataWorkStatus,
                        });
                    }
                    if (gauges[i].QueryType == 'Request') {
                        var ctx2 = document.getElementById("barchart-Request-" + i).getContext("2d");
                        var myNewChart2 = new Chart(ctx2, {
                            type: typeBar,
                            data: barDataRequest,
                        });
                    }
                    if (gauges[i].QueryType == 'TriSmester') {
                        var ctx2 = document.getElementById("barchart-TriSmester-" + i).getContext("2d");
                        var myNewChart2 = new Chart(ctx2, {
                            type: typeBar,
                            data: barDataTriSmester,
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });
                    }
                    break;
            }
            dashboards[i] = canvases;
        }
        $('#ButtonExportDashboard').click(function () {
            var pdf = new jsPDF('l', 'pt', 'A4')
            , source = $('#dashboardGauge')[0]
            , specialElementHandlers = {
                '#editor': function (element, renderer) {
                    return true
                }
            },
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            for (var i in dashboards) {
                pdf.setFontSize(18)
                pdf.text(gauges[i].WidgetName, 40, 40)
                pdf.setFontSize(8);
                var columns = [];
                var rows = [];
                $('thead tr:eq(0) td', $('#Tgauge-' + i)).each(function () {
                    columns.push($(this).text());
                });
                $('tbody tr', $('#Tgauge-' + i)).each(function () {
                    var row = [];
                    $('td', $(this)).each(function () {
                        row.push($(this).text());
                    })
                    rows.push(row);
                });


                pdf.autoTable(columns, rows, {
                    margin: { top: 60, left: 40 },
                    theme: 'grid',
                    tableWidth: 'auto',
                    headerStyles: {
                        cellPadding: 5, // a number, array or object (see margin below)
                        fontSize: 10,
                        font: "helvetica", // helvetica, times, courier
                        lineColor: 200,
                        lineWidth: 1,
                        fontStyle: 'normal', // normal, bold, italic, bolditalic
                        overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                        fillColor: false, // false for transparent or a color as described below
                        textColor: 20,
                        halign: 'center', // left, center, right
                        valign: 'middle', // top, middle, bottom
                        columnWidth: 'auto' // 'auto', 'wrap' or a number
                    },
                    drawRow: function (cell, data) {
                    },
                    drawHeaderRow: function (row, data) {
                    },
                    addPageContent: function (data) {
                        for (var j in dashboards[i]) {
                            var canvas = document.getElementById(dashboards[i][j]);
                            var ctx = canvas.getContext('2d');
                            var imgData = canvas.toDataURL();
                            pdf.addImage(imgData, 'JPEG', 40, data.table.height + 70);
                        }
                    }
                });
                //pdf.fromHTML(
                //    $('thead tr td', $('#Tgauge-' + i)).html()
                //    , margins.left // x coord
                //    , margins.top // y coord
                //    , {
                //        'width': margins.width // max width of content on PDF
                //        , 'elementHandlers': specialElementHandlers
                //      }
                //);
                pdf.addPage();
            }



            pdf.save('sample-file.pdf');
        });
    }

    this.notificationLoadMore = function () {

        //$("#NotificationLoadMore").click(function (e) {
        //    e.preventDefault();
        //    e.stopPropagation();
        //    utility.getNotification(parseInt($(this).attr('data-limit')), parseInt($(this).attr('data-offset')), 'load-more');
        //});

    }
    this.notificationReadAll = function () {

        //$("#NotificationReadAll").click(function (e) {
        //    utility._loadMenu("../Dashboards/ReadAllNotification", "Notification");
        //});

    }

    this.routineGetNotification = function () {

       // setInterval(utility.getNotification(), 10000);

    }

    this.formatAMPM = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    this.ChangeLanguage = function (IDLanguage) {
        utility._loadModal("/Language/ConfirmationChangeLanguage?IDLanguage=" + IDLanguage, "modal-Render-lang");
        $("#ChangeLanguageModal").modal("show");
    }
    //disable F5

    //add robby
    this.ChangePassword = function () {


    }
    this.UserLogout = function () {

        $("#user-logout").on("click", function () {
            $('#LogoutModal').modal('show');
            $("#frm-submit-btn-logout").click(function () {
                document.location = "../Login/Logout/"
            });
            $("#frm-cancel-btn-logout").click(function () {
                $('#LogoutModal').modal('hide');
            });

        });

    }
    this.loadWindow = function (link) {
        var popup = {
            width: 600,
            height: 450
        };
        popup.top = screen.height / 2 - popup.height / 2;
        popup.left = screen.width / 2 - popup.width / 2;
        window.open(link, 'targetWindow', "\n toolbar=no,\n location=no,\n status=no,\n menubar=no,\n scrollbars=yes,\n resizable=yes,\n left=" + popup.left + ",\n top=" + popup.top + ",\n  width=" + popup.width + ",\n height=" + popup.height + "\n ");
    }

    this.cekSession = function () {
        //var x = "";
        $.ajax({
            url: "../Login/CekSession/",
            type: "GET",
            dataType: "html",
            success: function (data) {
                res = jQuery.parseJSON(data);
                //console.log(res.result);
                x = res.result;
                if (res.result !== "OK") {
                    //
                    //return false;
                    utility.session = false;
                    //sleep(200);
                    document.location = "../Login/Logout/"
                }
                else {
                    //return true;
                    utility.session = true;
                }


            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            }

        });
        return utility.session;
        //
    }
    function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };

    this.runapp = function runcmd(path) {
        //alert(path);
        //var res = path.replace("" , "\\");
        $.ajax({
            url: "../Dashboards/RunApp?path=" + path,
            type: "GET",
            dataType: "html",
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            }
        });
    }

    this.ArrowMoveInit = function (idtable, index) {
        $(idtable).attr('tabindex', index);
        $(idtable).focusout(function () {
            //console.log(idtable + " lost");
        })

        $(idtable).keyup(function (e) {
            //console.log(index);
            e.preventDefault();
            var SlctRow = $(idtable + " tbody tr.row_selected");
            var NextPage = $(idtable + "_next");
            var PrevPage = $(idtable + "_previous");
            //


            if (e.which == 38) {
                //Up Button

                if (!SlctRow.prev().hasClass("group") && !SlctRow.prev().hasClass("dataTables_empty")) {
                    if (SlctRow.prev().length) {
                        //console.log(SlctRow.prev().index());
                        SlctRow.prev().click();

                    }
                    else {
                        if (NextPage.length) {
                            PrevPage.click();
                            $(idtable + ' tbody tr').last().click();
                            $(idtable).on('xhr.dt', function () {

                                setTimeout(function () {
                                    //console.log(idtable + "draw Prev");
                                    $(idtable + ' tbody tr').last().click();
                                }, 200)

                            });

                        }

                    }
                }

                if (SlctRow.prev().hasClass("group")) {
                    if (SlctRow.prev().hasClass("parent")) {
                        SlctRow.prev().click();
                        SlctRow.prev().prev().prev().click();
                    }
                    else {
                        SlctRow.prev().prev().click();
                        SlctRow.prev().prev().prev().click();
                    }

                }

                return false;
            }
            if (e.which == 40) {
                //down Button
                if (!SlctRow.next().hasClass("group") && !SlctRow.prev().hasClass("dataTables_empty")) {
                    if (SlctRow.next().length) {
                        SlctRow.next().click();
                        //console.log(SlctRow.next().index());
                    }
                    else {
                        if (NextPage.length) {
                            NextPage.click();
                            //SlctRow.next().click();
                            $(idtable + ' tbody tr').first().click();
                            $(idtable).on('xhr.dt', function () {
                                setTimeout(function () {
                                    //console.log(idtable + "draw Next");
                                    $(idtable + ' tbody tr').first().click();
                                }, 200)
                            });
                        }

                    }
                }

                if (SlctRow.next().hasClass("group")) {
                    if (SlctRow.next().hasClass("parent")) {
                        SlctRow.next().click();
                        SlctRow.next().next().next().click();
                    }
                    else {
                        SlctRow.next().next().click();
                    }

                }
                return false;
            }
            if (e.which == 39) {
                //Right Arrow

                NextTableFocus = index + 1;
                //console.log("TF = " + index);
                //console.log("NTF = " + NextTableFocus);
                //console.log(
                //       $('table[tabindex=' + NextTableFocus + ']').prop('id')
                //                            );
                if ($('table[tabindex=' + NextTableFocus + ']').length) {
                    $('table[tabindex=' + index + ']').blur();
                    $('table[tabindex=' + NextTableFocus + ']').focus();
                    var NextTableID = $('table[tabindex=' + NextTableFocus + ']').prop('id');
                    //console.log('ada row selected = ' + $('#' + NextTableID + ' tbody tr.row_selected').length);
                    if (!$('#' + NextTableID + ' tbody tr.row_selected').length) {
                        //console.log($('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0) td').hasClass("dataTables_empty"));
                        if (!$('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0) td').hasClass("dataTables_empty")) {
                            if ($('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').hasClass('group')) {
                                if ($('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').hasClass("parent")) {
                                    $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').click();
                                    $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(2)').click();
                                }
                                else {
                                    $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(1)').click();
                                }

                            }
                            else {
                                if ($('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').hasClass("parent")) {
                                    $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').click();
                                    $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(2)').click();
                                }
                                else {
                                    $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').click();
                                }


                            }
                        }


                    }


                }


                //$('#Feature tbody tr:eq(0)').click();

                return false;
            }
            if (e.which == 37) {
                //Left Arrow

                NextTableFocus = index - 1;
                //console.log("TF = " + index);
                //console.log("NTF = " + NextTableFocus);

                //console.log(
                //       $('table[tabindex=' + NextTableFocus + ']').prop('id')
                //                            );

                if ($('table[tabindex=' + NextTableFocus + ']').length) {
                    $('table[tabindex=' + index + ']').blur();
                    $('table[tabindex=' + NextTableFocus + ']').focus();
                    if ($('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').hasClass('group')) {
                        $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(1)').click();
                    }
                    else {
                        // alert($('table[tabindex=' + NextTableFocus + '] tbody tr.selected_row').length);
                        if (!$('table[tabindex=' + NextTableFocus + '] tbody tr.row_selected').length) {
                            if (!$('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0) td').hasClass("dataTables_empty")) {
                                if ($('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').hasClass('group')) {
                                    $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(1)').click();
                                }
                                else {
                                    if (SlctRow.next().hasClass("parent")) {
                                        $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').click();
                                        $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(2)').click();
                                    }
                                    else {
                                        $('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').click();
                                    }


                                }
                            }
                        }

                    }
                }

                //$('table[tabindex=' + NextTableFocus + '] tbody tr:eq(0)').click();
                //$('#Feature tbody tr:eq(0)').click();

                return false;
            }
        });


        $(idtable).focus(function () {
            //console.log(idtable + " Focus");
            //if (!$(idtable + ' tbody tr:eq(0) td').hasClass("dataTables_empty")) {
            //    if ($(idtable + ' tbody tr:eq(0)').hasClass('group')) {
            //        $(idtable + ' tbody tr:eq(1)').click();
            //    }
            //    else {
            //        $(idtable  + ' tbody tr:eq(0)').click();
            //    }
            //}

        })



    }
    this.initAjax = function () {

        $('.modal').on('hide.bs.modal', function (e) {
            //alert(utility.xhrPool.length);
            //$.ajaxq("loadModal");
            $.ajaxq("CRUD");

        })

    }

    // adit 23-10-2015 function for mobile data pagination
    this.mobile_data_table_paginate = function (e) {
        window_width = $(window).width();
        if (window_width < 480 && window_width > 320) {
            $('.dataTables_paginate').each(function () {
                var data_table_prev = $(this).find('.next').prev('.active'),
                    data_table_prev_prev = $(this).find('.next').prev().prev('.active');
                $(this).find('.active').prev().addClass('prev_selected');
                $(this).find('li').removeClass('disabled');
                if (data_table_prev_prev.length) {
                    $(this).find('.active').prev().prev().addClass('prev_selected');
                }
                if (data_table_prev.length) {
                    $(this).find('.active').prev().prev().addClass('prev_selected');
                    $(this).find('.active').prev().prev().prev().addClass('prev_selected');
                }
            });
        }

    }/* end mobile_data_table_paginate*/

    // adit 4-12-2015 function for mobile drop down
    this.mobile_search_dropdown = function (e) {
        if ($('#page-wrapper').height() < 880) {
            $('#page-wrapper').css("min-height", 880 + "px");
        } else {
            $('#page-wrapper').css("min-height", $(window).height() + "px");

        }
    }/* end mobile_search_dropdown*/
    /*Add By Irham 30-10-2015 */
    /* Google Map API */
    var map;
    var Position;
    this.setCurrentPosition = function (position) {
        utility.Position = { lat: position.coords.latitude, lng: position.coords.longitude }
    }



    //if (google.loader.ClientLocation) {
    //    utility.Position = { lat: google.loader.ClientLocation.latitude, lng: google.loader.ClientLocation.longitude };
    //}
    this.initMap = function (pos) {
        //alert(pos);
        utility.map = new google.maps.Map(document.getElementById('googleMap'), {
            center: pos,
            zoom: 16,
            cache: false
        });

    }
    var marker;
    var markers = [];
    this.addMarker = function (config) {
        //console.log(config);
        utility.marker = new google.maps.Marker(config);
        //utility.markers.push(utility.marker);
    }
    this.deleteMarkers = function () {
        utility.markers[0].setMap(null);
        //utility.marker.setMap(null);
    }
    this.alert = function (selector, type, message) {
        switch (type) {
            case "error":
                type = "danger";
                break;
            case "success":
                type = "success";
                break;
            default:
                type = "success";
                break;
        }
        selector.empty();
        selector.prepend('<div class="alert-container alert alert-' + type + ' alert-dismissable">' +
                            '<button class="close-alert close" type="button" data-ng-hide="alert" aria-hidden="true">×</button>' +
                            '<div class="alert-content">' + message + '</div>' +
                        '</div>');
        if (type == "error") {
            $('.alert-container', selector).show();
        } else {
            setTimeout(function () {
                //console.log(msg)
                $('.alert-container', selector).show();
            }, 500);
            setTimeout(function () {
                $('.alert-container', selector).hide("slow");
            }, 4000);
        }
        $('.close-alert', selector).unbind('click');
        $('.close-alert', selector).click(function () {
            $(this).parents('.alert-container').remove();
        })
    }



    /* end Google Map API*/
}





if ((document.baseURI.match(/#/g) || []).length) {
    var url = document.baseURI;
    url = url.split("#");
    //alert((document.baseURI.match(/#/g) || []).length);
    if (url[1].length) {
        utility._loadMenuList(url[1], url[2].replace(/%20/g, " "));
    } else {
        utility._loadMenuList("/Dashboards/Home", "Home")
    }


} else {
    utility._loadMenuList("/Dashboards/Home", "Home")
}

/// <reference path="http://code.jquery.com/jquery-1.4.1-vsdoc.js" />
/*
* Print Element Plugin 1.2
*
* Copyright (c) 2010 Erik Zaadi
*
* Inspired by PrintArea (http://plugins.jquery.com/project/PrintArea) and
* http://stackoverflow.com/questions/472951/how-do-i-print-an-iframe-from-javascript-in-safari-chrome
*
*  Home Page : http://projects.erikzaadi/jQueryPlugins/jQuery.printElement
*  Issues (bug reporting) : http://github.com/erikzaadi/jQueryPlugins/issues/labels/printElement
*  jQuery plugin page : http://plugins.jquery.com/project/printElement
*
*  Thanks to David B (http://github.com/ungenio) and icgJohn (http://www.blogger.com/profile/11881116857076484100)
*  For their great contributions!
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*   Note, Iframe Printing is not supported in Opera and Chrome 3.0, a popup window will be shown instead
*/
; (function (window, undefined) {
    var document = window["document"];
    var $ = window["jQuery"];
    $.fn["printElement"] = function (options) {
        var mainOptions = $.extend({}, $.fn["printElement"]["defaults"], options);
        //iframe mode is not supported for opera and chrome 3.0 (it prints the entire page).
        //http://www.google.com/support/forum/p/Webmasters/thread?tid=2cb0f08dce8821c3&hl=en
        if (mainOptions["printMode"] == 'iframe') {
            if ($.browser.opera || (/chrome/.test(navigator.userAgent.toLowerCase())))
                mainOptions["printMode"] = 'popup';
        }
        //Remove previously printed iframe if exists
        $("[id^='printElement_']").remove();

        return this.each(function () {
            //Support Metadata Plug-in if available
            var opts = $.meta ? $.extend({}, mainOptions, $(this).data()) : mainOptions;
            _printElement($(this), opts);
        });
    };
    $.fn["printElement"]["defaults"] = {
        "printMode": 'iframe', //Usage : iframe / popup
        "pageTitle": '', //Print Page Title
        "overrideElementCSS": null,
        /* Can be one of the following 3 options:
        * 1 : boolean (pass true for stripping all css linked)
        * 2 : array of $.fn.printElement.cssElement (s)
        * 3 : array of strings with paths to alternate css files (optimized for print)
        */
        "printBodyOptions": {
            "styleToAdd": 'padding:10px;margin:10px;', //style attributes to add to the body of print document
            "classNameToAdd": '' //css class to add to the body of print document
        },
        "leaveOpen": false, // in case of popup, leave the print page open or not
        "iframeElementOptions": {
            "styleToAdd": 'border:none;position:absolute;width:0px;height:0px;bottom:0px;left:0px;', //style attributes to add to the iframe element
            "classNameToAdd": '' //css class to add to the iframe element
        }
    };
    $.fn["printElement"]["cssElement"] = {
        "href": '',
        "media": ''
    };
    function _printElement(element, opts) {
        //Create markup to be printed
        var html = _getMarkup(element, opts);

        var popupOrIframe = null;
        var documentToWriteTo = null;
        if (opts["printMode"].toLowerCase() == 'popup') {
            popupOrIframe = window.open('about:blank', 'printElementWindow', 'width=650,height=440,scrollbars=yes');
            documentToWriteTo = popupOrIframe.document;
        }
        else {
            //The random ID is to overcome a safari bug http://www.cjboco.com.sharedcopy.com/post.cfm/442dc92cd1c0ca10a5c35210b8166882.html
            var printElementID = "printElement_" + (Math.round(Math.random() * 99999)).toString();
            //Native creation of the element is faster..
            var iframe = document.createElement('IFRAME');
            $(iframe).attr({
                style: opts["iframeElementOptions"]["styleToAdd"],
                id: printElementID,
                className: opts["iframeElementOptions"]["classNameToAdd"],
                frameBorder: 0,
                scrolling: 'no',
                src: 'about:blank'
            });
            document.body.appendChild(iframe);
            documentToWriteTo = (iframe.contentWindow || iframe.contentDocument);
            if (documentToWriteTo.document)
                documentToWriteTo = documentToWriteTo.document;
            iframe = document.frames ? document.frames[printElementID] : document.getElementById(printElementID);
            popupOrIframe = iframe.contentWindow || iframe;
        }
        focus();
        documentToWriteTo.open();
        documentToWriteTo.write(html);
        documentToWriteTo.close();
        _callPrint(popupOrIframe);
    };

    function _callPrint(element) {
        if (element && element["printPage"])
            element["printPage"]();
        else
            setTimeout(function () {
                _callPrint(element);
            }, 50);
    }

    function _getElementHTMLIncludingFormElements(element) {
        var $element = $(element);
        //Radiobuttons and checkboxes
        $(":checked", $element).each(function () {
            this.setAttribute('checked', 'checked');
        });
        //simple text inputs
        $("input[type='text']", $element).each(function () {
            this.setAttribute('value', $(this).val());
        });
        $("select", $element).each(function () {
            var $select = $(this);
            $("option", $select).each(function () {
                if ($select.val() == $(this).val())
                    this.setAttribute('selected', 'selected');
            });
        });
        $("textarea", $element).each(function () {
            //Thanks http://blog.ekini.net/2009/02/24/jquery-getting-the-latest-textvalue-inside-a-textarea/
            var value = $(this).attr('value');
            //fix for issue 7 (http://plugins.jquery.com/node/13503 and http://github.com/erikzaadi/jQueryPlugins/issues#issue/7)
            if ($.browser.mozilla && this.firstChild)
                this.firstChild.textContent = value;
            else
                this.innerHTML = value;
        });
        //http://dbj.org/dbj/?p=91
        var elementHtml = $('<div></div>').append($element.clone()).html();
        return elementHtml;
    }

    function _getBaseHref() {
        var port = (window.location.port) ? ':' + window.location.port : '';
        return window.location.protocol + '//' + window.location.hostname + port + window.location.pathname;
    }

    function _getMarkup(element, opts) {
        var $element = $(element);
        var elementHtml = _getElementHTMLIncludingFormElements(element);

        var html = new Array();
        html.push('<html><head><title>' + opts["pageTitle"] + '</title>');
        if (opts["overrideElementCSS"]) {
            if (opts["overrideElementCSS"].length > 0) {
                for (var x = 0; x < opts["overrideElementCSS"].length; x++) {
                    var current = opts["overrideElementCSS"][x];
                    if (typeof (current) == 'string')
                        html.push('<link type="text/css" rel="stylesheet" href="' + current + '" >');
                    else
                        html.push('<link type="text/css" rel="stylesheet" href="' + current["href"] + '" media="' + current["media"] + '" >');
                }
            }
        }
        else {
            $("link", document).filter(function () {
                return $(this).attr("rel").toLowerCase() == "stylesheet";
            }).each(function () {
                html.push('<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" media="' + $(this).attr('media') + '" >');
            });
        }
        //Ensure that relative links work
        html.push('<base href="' + _getBaseHref() + '" />');
        html.push('</head><body style="' + opts["printBodyOptions"]["styleToAdd"] + '" class="' + opts["printBodyOptions"]["classNameToAdd"] + '">');
        html.push('<div class="' + $element.attr('class') + '">' + elementHtml + '</div>');
        html.push('<script type="text/javascript">function printPage(){focus();print();' + ((!$.browser.opera && !opts["leaveOpen"] && opts["printMode"].toLowerCase() == 'popup') ? 'close();' : '') + '}</script>');
        html.push('</body></html>');

        return html.join('');
    };
})(window);

var Notification = new function () {
    this.init = function () {
        //$("#NextNotification").attr('data-offset', 2);
        //$("#PrevNotification").attr('data-offset', 0);
        $("#NotificationRefresh").click(function () {
            utility._loadMenu("../Dashboards/ReadAllNotification", "Notification");
        })
        $("#NextNotification").click(function () {
            $('#NotificationContent').load("../Dashboards/NotificationContent?Limit=" + parseInt($(this).attr('data-limit')) + "&Offset=" + parseInt($(this).attr('data-offset')) + "&Direction=Next")
        });
        $("#PrevNotification").click(function () {
            $('#NotificationContent').load("../Dashboards/NotificationContent?Limit=" + parseInt($(this).attr('data-limit')) + "&Offset=" + parseInt($(this).attr('data-offset')) + "&Direction=Prev")
        });
    }
}
//$(function () {
//    // Declare a proxy to reference the hub.
//    var notifications = $.connection.messagesHub;
//    console.log(notifications)
//    //debugger;
//    // Create a function that the hub can call to broadcast messages.
//    notifications.client.updateMessages = function () {
//        alert()
//        utility.getNotification(2,0);

//    };
//    // Start the connection.
//    $.connection.hub.start().done(function () {
//        utility.getNotification(2,0);
//    }).fail(function (e) {
//        alert(e);
//    });
//});