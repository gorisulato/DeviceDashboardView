
var Login = new function () {


     this.init = function (param) {
         $('#site-body').hide();
         $("#userName").focus();
         //console.log(param.attribute.errornosite);
        myDivObj = document.getElementById("alert");
        if (myDivObj) {
            if (myDivObj.innerHTML != '') {
                $('.alert').show();
            }
            else {
                $('.alert').hide();
            }
        } else {
            alert("Alien Found");
        };
        $("#SelectCulture").change(function () {
            document.location = "../Login/ChangeCulture?culture=" + this.value;
        })

        $("#FormLogin").validate({
            //errorPlacement: function (error, element) {
            //    error.insertAfter('#errorMsgDiv')
            //},
            onfocusout: false,
            onkeyup: false,
            //invalidHandler: function (event, validator) {
            //    var errors = validator.numberOfInvalids();
            //    if (errors) {

            //        $("#errorDiv").show();
            //    } else {
            //        $("#errorDiv").hide();
            //    }
            //},
            rules: {
                userName: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                },
                password: {
                    required: true,
                    minlength: 2,
                    maxlength: 100
                }
            },
            messages: {
                ModuleCode: {
                    required: "User Name  Is Required ." + "<div id='clearfix'></div>",
                },
                IconClass: {
                    required: "Password Is Required ." + "<div id='clearfix'></div>",

                }
            }

        });
        $("#LoginSubmit").submit(function () {
            return false
        })
        $("#FormLogin input:text").keypress(function (e) {
            if (e.which == 13) {
                $('#LoginSubmit').click();
                return false;    //<---- Add this line
            }
        });
        $("#LoginSubmit").click(function () {

            if ($("#FormLogin").valid()) {

                var url = $('#FormLogin').attr('action');
                var data = $('#FormLogin').serialize();
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: function (data) {
                    url = url.split('/')[1];
                    url = url + '/index'

                    var msg = JSON.stringify(data.result);
                    //alert(JSON.stringify(data.result));
                    if (msg.split('|')[0].substring(1) == 'Err') {
                        $("#alert").html(msg.split('|')[1]);
                        $("#alert").show();
                        //console.log("error");

                    } else {
                        //console.log(msg);
                        window.location.href = "../";
                        //Login.GetDataSite(param);
                    }
                },

                dataType: 'json'

            });


            //$('#TSiteUser').on('dblclick', 'tbody tr', function () {
            //    //$.ajax({
            //    //    "url": "../Login/PickSite/"+this.id,
            //    //    "data": function (d) {
            //    //        d.id = this.id;
            //    //    }
            //    //})
            //    document.location = "../Login/PickSite/" + this.id

            // });

            return false;
            }

        });

        this.GetDataSite =  function (param) {
            $.ajax({
                url: "/Login/GetDataSite",
                type: "GET",
                dataType: "html",
                success: function (data) {
                    //console.log(data)
                    var site = $('#site');
                    var list = '';
                    //alert(JSON.stringify(data));
                    result = jQuery.parseJSON(data);
                    if (result.length == 1) {
                        document.location = "../Login/PickSite/" + result[0].SiteCode;

                    }
                    else {
                        if (result.length == 0)
                        {
                            $("#alert").html(param.attribute.errornosite);
                            $("#alert").show();
                        }
                        else {
                        $('#login').hide();
                        $('#site-body').show();
                        for (var k in result) {
                            var image = result[k].SiteLogo !== null ? "<img src='data:image/png;base64," + result[k].SiteLogo + "' class='img-circle' alt='image'>" : '<img class="img-circle" alt="image" src="../Images/icon/building.jpg">';
                            list = list + "<div class='wizard-login-site' id='" + result[k].SiteCode + "'>"+
                                image+
                                "<h3>" + result[k].SiteName + "</h3> </div>"
                        }
                        site.append(list);

                        if (jQuery('.wizard-login-site').length >= 5) {
                            jQuery('.wizad-login').slimScroll({
                                height: '50vh',
                                railOpacity: 0.4,
                                wheelStep: 10,
                                alwaysVisible: true
                            });
                        }

                        $('.wizard-login-site').dblclick(function () {
                            document.location = "../Login/PickSite/" + this.id
                        })

                        $(document).keydown(function (e) {
                            if (e.which == 13) {
                                $('#SiteSubmit').click();
                                return false;    //<---- Add this line
                            }
                            if (e.which == 38) {
                                var idx = $("div .row_selected").index();
                                var nextidx = idx - 1;
                                if (idx !== 0) {

                                    $("div .wizard-login-site:eq(" + nextidx + ")").addClass('row_selected');
                                    $("div .wizard-login-site:eq(" + idx + ")").removeClass('row_selected');
                                }

                            }
                            if (e.which == 40) {
                                var idx = $("div .row_selected").index();
                                var nextidx = idx + 1;
                                if ($("div .wizard-login-site:eq(" + nextidx + ")").length) {
                                    $("div .wizard-login-site:eq(" + nextidx + ")").addClass('row_selected');
                                    $("div .wizard-login-site:eq(" + idx + ")").removeClass('row_selected');
                                }

                                //alert($("div .row_selected").index());
                                return false;    //<---- Add this line
                            }

                        });
                        $("div .wizard-login-site:eq( 0 )").addClass('row_selected');
                        $('.wizard-login-site').on('click', function () {
                            if ($(this).hasClass('row_selected')) {
                                $(this).removeClass('row_selected');

                            }
                            else {
                                $('.wizard-login-site').removeClass('row_selected');
                                $(this).addClass('row_selected');

                            }
                            //$("#TFeature").DataTable().draw();
                        });
                        $("#SiteSubmit").click(function () {
                            try {
                                var id = $('.row_selected').attr('id');

                            }
                            catch (r) {
                                var id = 'undefined';
                            }

                            if (typeof id !== 'undefined') {
                                //alert(id);
                                document.location = "../Login/PickSite/" + id
                            }
                            else {
                                toastr.remove();
                                toastr.warning(param.attribute.PickOneData, param.attribute.Warning);
                            }
                        })

                        }

                    }


                }

            })

        }
    }
}