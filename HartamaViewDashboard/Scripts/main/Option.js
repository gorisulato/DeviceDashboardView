var Option = new function () {
    var Array = [];
    var fileUpload = $("#compLogo").get(0);
    var files2 = fileUpload.files;
    this.init = function () {
        Option.hideapi();
        Option.GetDataOptions()
        $("#compLogo").on('change', function (evt) {
            Array = []
            //console.log($("#TesFile").val())
            //$("#containerJancuk").attr('src', $("#TesFile").val())
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    $("#compLogoContainer").attr('src', fr.result)
                    $("#Form-User #UserPicture").val(fr.result)
                    //TUser.InsertPic(fr.result)
                }
                fr.readAsDataURL(files[0]);
                //console.log(files[0])

                //console.log($("#Form-User")[0])
                fileUpload = $("#compLogo").get(0);
                files2 = tgt.files;
                //TUser.InsertPic(files2);
                console.log(tgt.files)
            }
        })
    }

    $('#Form-Option #btnSaveRowsite').on('click', function () {

        Option.UploadImage();
        $("#Form-Option").attr("action", "/Options/UpdateOptions");
        $("#Form-Option").attr("xxx", "UpdateOptions");
        utility.CRUDCW("Form-Option", "TUSERTUSER", "userMessage");

    })

    this.GetDataOptions = function () {
        $.ajax({
            url: "../Options/GetOptionValue",
            type: "GET",
            success: function (Data) {
                 console.log(Data)
                //////console.log(Data)
                //var ret = Data.Data[0];
                 var srcimage = document.getElementById('compLogoContainer').getAttribute('src')
                console.log(srcimage)
                 for (var x = 0; x < Data.result.length; x++) {

                     if (Data.result[x].OptionsName == "SiteURL") {
                         $("#Form-Option #ApiUri").val(Data.result[x].OptionsValue)
                     }
                     if (Data.result[x].OptionsName == "CompanyName") {
                         $("#Form-Option #CompanyName").val(Data.result[x].OptionsValue)
                     }
                     if (Data.result[x].OptionsName == "CompanyAddress") {
                         $("#Form-Option #CompanyAddress").val(Data.result[x].OptionsValue)
                     }
                     if (Data.result[x].OptionsName == "CompanyPhone") {
                         $("#Form-Option #CompanyPhone").val(Data.result[x].OptionsValue)
                     }
                     if (Data.result[x].OptionsName == "LogoArray") {
                        // $("#Form-Option #compLogoContainer").attr('src', srcimage + Data.result[x].OptionsValue)
                         $("#compLogoContainer").attr('src', "data:image/png;base64," + Data.result[x].OptionsValue)
                     }
                     
                 }

                //$("#Form-Site #IDSite").val(ret['IDSite']);
                //$('#Form-Site #SiteName').val(ret['SiteName']);
                //$('#Form-Site #Address').val(ret['Address']);
                //$('#Form-Site #PostCode').val(ret['PostCode']);
                //$("#Form-Site #TelephoneNo").val(ret['TelephoneNo']);
                //$("#Form-Site #FaxNo").val(ret['FaxNo']);
                //$("#Form-Site #Email").val(ret['Email']);
                //$("#Form-Site #PICSite").val(ret['PICSite']);
                //if (ret['Discontinue'] == true) {

                //    $("#Form-Site #DiscontinueSite").val("1");
                //    $("#Form-Site #Discontinue").val(true);
                //}
                //else {
                //    $("#Form-Site #DiscontinueSite").val("2");
                //    $("#Form-Site #Discontinue").val(false);
                //}
                ////  $("#Form-Site #Discontinue").val(true);

                //$("#Form-Site #UserEntry").val(ret['UserEntry']);
                //$("#Form-Site #DateEntry").val(ret['DateEntry']);
                //$("#Form-Site #UserLastMaintenance").val(ret['UserLastMaintenance']);
                //if (ret['DateLastMaintenance'] == "1900-01-01") {

                //    $("#Form-Site #DateLastMaintenance").val('');
                //}
                //else {
                //    $("#Form-Site #DateLastMaintenance").val(ret['DateLastMaintenance']);
                //}


            },
            error: function (xhr, status) {
                alert("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
            }
        });
    }

    this.hideapi = function () {
        if ($('#Form-Option #RoleID').val() == 'ROL1500001') {

            $('#Form-Option #API').show();
        }
        else {
            $('#Form-Option #API').hide();
        }
    }

    this.UploadImage = function () {
        var files = files2;
        console.log(files)
        //var myID = codesite; //uncomment this to make sure the ajax URL works
        //if (files.length > 0) {
        //    if (window.FormData !== undefined) {
                var data = new FormData();
                for (var x = 0; x < files.length; x++) {
                    data.append("file" + x, files[x]);
                }

                $.ajax({
                    type: "POST",
                    url: '/Options/UploadImage?Company=Pertamina',
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {

                    },
                    error: function (xhr, status, p3, p4) {
                        var err = "Error " + " " + status + " " + p3 + " " + p4;
                        if (xhr.responseText && xhr.responseText[0] == "{")
                            err = JSON.parse(xhr.responseText).Message;

                    }
                });
            //} else {
            //    alert("This browser doesn't support HTML5 file uploads!");
            //}
        }
    
}