var TAction = new function () {
    this.init = function (param) {
        $("#Form-Action #btnSaveRow").on("click", function () {

            $("#Form-Action").attr("action", "/Action/Create");
            $("#Form-Action").attr("xxx", "Create");
            utility.CRUDCW("Form-Action", "ACTIONACTION", "ActionMessage");
            $("#close-action").click();
        })
    
    }

    

}