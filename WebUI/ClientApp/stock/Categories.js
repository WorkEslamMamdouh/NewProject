$(document).ready(function () {
    //debugger;
    Categories.InitalizeComponent();
});
var Categories;
(function (Categories) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var compcode;
    var CountGrid = 0;
    var btnback;
    var btnNew_sub_Add_service;
    var btnsave;
    var btnAddDetails;
    var btnEdit;
    var MSG_ID;
    var Details = new Array();
    var Model = new CATEGRES();
    function InitalizeComponent() {
        debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = " فئات الأصناف";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Item Category";
        }
        //debugger;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        Display();
    }
    Categories.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //debugger;
        btnAddDetails = document.getElementById("btnAddDetails");
        btnEdit = document.getElementById("btnedite");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        // Buton privialges for single record page
    }
    function InitalizeEvents() {
        //debugger;
        btnAddDetails.onclick = AddNewRow; //
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
    }
    function Update() {
        debugger;
        Assign();
        debugger;
        if (Details.filter(function (x) { return x.Name_CAT == ""; }).length > 0) {
            MessageBox.Show(" يجب ادخال الوصف باعربي", "خطأ");
            return;
        }
        Details[0].Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        Details[0].UserCode = SysSession.CurrentEnvironment.UserCode;
        debugger;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("StkDefCategory", "UpdateLst"),
            data: JSON.stringify(Details),
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    MessageBox.Show("تم الحفظ", "الحفظ");
                    btnback_onclick();
                    //BilldItemFamily = Details.filter(x => x.CatID == 0)
                    refresh();
                }
                else {
                    debugger;
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function refresh() {
        $('#div_Data').html("");
        CountGrid = 0;
        Display();
    }
    function Assign() {
        var StatusFlag;
        for (var i = 0; i < CountGrid; i++) {
            Model = new CATEGRES();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            $("#txt_StatusFlag" + i).val("");
            debugger;
            if (StatusFlag == "i") {
                Model.StatusFlag = StatusFlag.toString();
                ;
                Model.ID_CAT = 0;
                if ($("#txtDescA" + i).val() == "") {
                    Model.Name_CAT = $("#txtDescL" + i).val();
                    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                }
                else {
                    Model.Name_CAT = $("#txtDescA" + i).val();
                }
                Details.push(Model);
            }
            if (StatusFlag == "u") {
                var UpdatedDetail = Details.filter(function (x) { return x.ID_CAT == $("#txt_ID" + i).val(); });
                UpdatedDetail[0].StatusFlag = StatusFlag.toString();
                if ($("#txtDescA" + i).val() == "") {
                    UpdatedDetail[0].Name_CAT = $("#txtDescL" + i).val();
                    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                }
                else {
                    UpdatedDetail[0].Name_CAT = $("#txtDescA" + i).val();
                }
                $("#txt_StatusFlag" + i).val("");
            }
            if (StatusFlag == "d") {
                if ($("#txt_ID" + i).val() != "") {
                    var UpdatedDetail = Details.filter(function (x) { return x.ID_CAT == $("#txt_ID" + i).val(); });
                    UpdatedDetail[0].StatusFlag = StatusFlag.toString();
                    $("#txtCode" + i).val("");
                    $("#txt_StatusFlag" + i).val("");
                }
            }
        }
    }
    function AddNewRow() {
        //debugger
        var CanAdd = true;
        if (CountGrid > 0) {
            var LastRowNo = CountGrid - 1;
            CanAdd = Validation_Grid(LastRowNo);
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            //$("#txtCode" + CountGrid).removeAttr("disabled");
            $("#txtCode" + CountGrid).val(CountGrid + 1);
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            $("#txtDescL" + CountGrid).removeAttr("disabled");
            // can delete new inserted record  without need for delete privilage
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            //$(".minus_btn").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            CountGrid++;
        }
        $("#btnedite").addClass("display_none");
    }
    function btnEdit_onclick() {
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $(".btnAddDetails").removeAttr("disabled");
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign');
        for (var i = 0; i < CountGrid; i++) {
            $("#txtCode" + i).attr("disabled", "disabled");
        }
        $(".minus_btn").removeClass("display_none");
    }
    function btnback_onclick() {
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none');
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").attr("disabled", "true");
        $(".minus_btn").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        $("#btnback").removeAttr("disabled");
        $("#btnsave").removeAttr("disabled");
        CountGrid = 0;
        $("#div_Data").html("");
        Display();
    }
    function btnsave_onClick() {
        //debugger;
        if (Validation_Grid(CountGrid - 1))
            Update();
    }
    function BuildControls(cnt) {
        var html;
        debugger;
        html = '<div id="No_Row' + cnt + '" class="col-lg-12" ><div class="col-lg-12"><span id="btn_minus' + cnt + '" class="glyphicon glyphicon-remove-sign fontitm3  minus_btn"></span><div class="col-lg-1 style_pading"> <input id="txtCode' + cnt + '" type= "text" class="form-control right2 " disabled="disabled"/></div><div class="col-lg-4 style_pading"> <input id="txtDescA' + cnt + '" type= "text" class="form-control right3" disabled="disabled"/></div><div class="col-lg-4 style_pading"> <input id = "txt_StatusFlag' + cnt + '" name = " " type = "hidden" disabled class="form-control"/></div><div class="col-lg-12"> <input id = "txt_ID' + cnt + '" name = " " type = "hidden" class="form-control"/></div></div></div>';
        $("#div_Data").append(html);
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#txtCode" + cnt).on('change', function () {
            Validate_code(cnt);
        });
        $("#txtDescA" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtDescL" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#btn_minus" + cnt).addClass("display_none");
        $("#btn_minus" + cnt).attr("disabled", "disabled");
        return;
    }
    function DeleteRow(RecNo) {
        //if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            debugger;
            $("#No_Row" + RecNo).attr("hidden", "true");
            $("#txt_StatusFlag" + RecNo).val("d");
            //$("#txtCode" + RecNo).val("");
            $("#txtCode" + RecNo).val("000");
        });
    }
    function Display() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: { CompCode: compcode },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    DisplayStkDefCategory();
                }
            }
        });
    }
    function DisplayStkDefCategory() {
        debugger;
        for (var i = 0; i < Details.length; i++) {
            BuildControls(CountGrid);
            CountGrid++;
            $("#txt_ID" + i).val(Details[i].ID_CAT);
            $("#txtCode" + i).val(i + 1);
            $("#txtDescA" + i).val(Details[i].Name_CAT);
            $("#txt_StatusFlag" + i).val("");
        }
    }
    function Validation_Grid(rowcount) {
        if ($("#txtDescA" + rowcount).val() == "") {
            $("#txtDescA" + rowcount).val($("#txtDescL" + rowcount).val());
        }
        if ($("#txtDescL" + rowcount).val() == "") {
            $("#txtDescL" + rowcount).val($("#txtDescL" + rowcount).val());
        }
        if (($("#txtCode" + rowcount).val() == "" || $("#txtDescA" + rowcount).val() == "")
            && $("#txt_StatusFlag" + rowcount).val() != "d") {
            MessageBox.Show("ادخل كود و الوصف العربي", "خطأ");
            return false;
        }
        return true;
    }
    function Validate_code(rowno) {
        debugger;
        for (var i = 0; i < CountGrid; i++) {
            if (i != rowno) {
                if ($("#txt_StatusFlag" + i).val() == "d") {
                    return true;
                }
                else {
                    if ($("#txtCode" + rowno).val() == $("#txtCode" + i).val()) {
                        var Code = $("#txtCode" + rowno).val();
                        $("#txtCode" + rowno).val("");
                        WorningMessage("لا يمكن تكرار رقم الكود " + Code, "code cannot br repeated?", "تحذير", "worning", function () {
                            $("#txtCode" + rowno).val("");
                            return false;
                        });
                    }
                }
            }
        }
        if ($("#txt_StatusFlag" + rowno).val() != "i")
            $("#txt_StatusFlag" + rowno).val("u");
        return true;
    }
})(Categories || (Categories = {}));
//# sourceMappingURL=Categories.js.map