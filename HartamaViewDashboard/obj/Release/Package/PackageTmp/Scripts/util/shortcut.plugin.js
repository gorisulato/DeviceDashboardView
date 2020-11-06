var ShortcutParam = [];
var shortcutPlugin = new function () {


this.ShortcutMainInit = function () {

    $.ajax({
        url: "/Shortcut/GetDataShortcut",
        type: "GET",
        dataType: "html",
        success: function (data) {
            $(document).ready(function () {
                result = jQuery.parseJSON(data);

                ShortcutParam = result;


            });
        },
        error: function (xhr, status) {
            alert("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {

        }
    })
}
//this.InitShorctcut = function (shortcut, shortcutname, ElementId) {
//    $(document).unbind('keydown', shortcut);
//    $(document).bind('keydown', shortcut, function assets(e) {

//        $(ElementId).click();
//        return false;

//    });


//}

this.findShortcut = function (searchVal,ElementId) {
    //var results = [];
    $.each(ShortcutParam, function (i, e) { // i is element index. e is element as text.
        if (ShortcutParam[i].ShortcutName == searchVal) {
            //console.log("ada " + ShortcutParam[i].ShortcutName + " " + searchVal + "  " + ElementId + " " + ShortcutParam[i].Shortcut + " " + i);
            $(document).off('keyup', ShortcutParam[i].Shortcut);
            $(ElementId).attr('data-toggle', "tooltip").attr("data-placement", "top").attr("title", ShortcutParam[i].ShortcutInfo + " " + ShortcutParam[i].Shortcut);;
            //shortcutPlugin.InitShorctcut(ShortcutParam[i].Shortcut, ShortcutParam[i].ShortcutName, ElementId)


        }

    });

}

this.findShortcutByParentElement = function (searchVal, ElementId, ParentID) {
    //var results = [];
    $.each(ShortcutParam, function (i, e) { // i is element index. e is element as text.
        if (ShortcutParam[i].ShortcutName == searchVal) {
            //console.log("ada by parent " + ShortcutParam[i].ShortcutName + " " + searchVal + "  " + ElementId + " " + ShortcutParam[i].Shortcut + " " + i );
            $(ParentID).off('keyup', ShortcutParam[i].Shortcut );
            $(ElementId).attr('data-toggle', "tooltip").attr("data-placement", "top").attr("title", ShortcutParam[i].ShortcutInfo + " " + ShortcutParam[i].Shortcut);;
            //shortcutPlugin.InitShorctcutByParentElement(ShortcutParam[i].Shortcut, ShortcutParam[i].ShortcutName, ElementId, ParentID)


        }

    });

}

this.InitShorctcut =  function (shortcut, shortcutname, ElementId) {
    $(document).bind('keydown', shortcut, function assets(e) {
        return false;

    });
    $(document).bind('keypress', shortcut, function assets(e) {
        return false;

    });

    $(document).bind('keyup', shortcut, function assets(e) {

        $(ElementId).click();
        e.stopImmediatePropagation();

        return false;

    });
}
this.InitShorctcutByParentElement =  function (shortcut, shortcutname, ElementId, ParentID) {
    $(ParentID).bind('keydown', shortcut, function assets(e) {

        return false;

    });
    $(ParentID).bind('keypress', shortcut, function assets(e) {

        return false;

    });

    //$(ParentID).on("unbind", function () { console.log("unbind");})
    $(ParentID + " select, " + ParentID + " input[type=number], " + ParentID + " input[type=text], " + ParentID + " input[type=password], " + ParentID + " textarea, " + ParentID + " table," + ParentID + " textarea").bind('keypress', shortcut, function (e) {
        //alert("asdasd");

        return false;
    });
    $(ParentID + " select, " + ParentID + " input[type=number], " + ParentID + " input[type=text], " + ParentID + " input[type=password], " + ParentID + " textarea, " + ParentID + " table," + ParentID + " textarea").bind('keydown', shortcut, function (e) {
        //alert("asdasd");

        return false;
    });
    $(ParentID + " select, " + ParentID + " input[type=number], " + ParentID + " input[type=text], " + ParentID + " input[type=password], " + ParentID + " textarea , " + ParentID + " table," + ParentID + " textarea").bind('keyup', shortcut, function (e) {
        //alert("asdasd");
        //console.log(ParentID + " input[type=number], " + ParentID + " input[type=text], " + ParentID + " input[type=password], " + ParentID + " textarea , "+ ParentID + " table");
        $(ElementId).click();

        e.stopImmediatePropagation();
        //e.stopImmediatePropagation(function () {
        //    alert("asas");
        //});
        return false;
    });
    $(ParentID).bind('keyup', shortcut, function assets(e) {

        //alert("asdasd");
        //console.log("asdasdqweqw");

        $(ElementId).click();
        e.stopImmediatePropagation();
        //e.stopImmediatePropagation(function () {
        //    alert("asas");
        //});

        return false;

    });
}

}

