$(document).ready(function () {
    USERS.InitalizeComponent();
});
var USERS;
(function (USERS) {
    // Arrays
    var AccountType = 2;
    var MSG_ID;
    var chack_USER_CODE = new Array();
    var Details = new Array();
    var Display = new Array();
    var SearchDetails = new Array();
    var BilldIData = new Array();
    var Model = new G_USERS();
    var UserDetails = new Array();
    var ReportGrid = new JsGrid();
    var CashDetailsAr = new Array();
    var CashDetailsEn = new Array();
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var ddlUserMaster;
    var btnback;
    var btnShow;
    var btnAdd;
    var btnEdit;
    var btnsave;
    var searchbutmemreport;
    var txtUSER_CODE;
    var chk_IsActive;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var IsNew = false;
    var index;
    var Selecteditem = new Array();
    var CustomerIdUpdate = 0;
    var CustomerId;
    var sum_balance;
    var Debit;
    var Credit;
    var Valid = 0;
    var Update_claenData = 0;
    var txt_ID_APP_Category;
    function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الاعدادات";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "sitinge";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        FillddlUserMaster();
        Display_All();
    }
    USERS.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnEdit = document.getElementById("btnedite");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        ddlUserMaster = document.getElementById("ddlUserMaster");
        searchbutmemreport = document.getElementById("searchbutmemreport");
        txtUSER_CODE = document.getElementById("txtUSER_CODE");
        chk_IsActive = document.getElementById("chk_IsActive");
    }
    function InitalizeEvents() {
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
        searchbutmemreport.onkeyup = _SearchBox_Change;
        txtUSER_CODE.onchange = chack_USER;
    }
    function FillddlUserMaster() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetAllUser"),
            data: {},
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    debugger;
                    DocumentActions.FillCombowithdefult(Details, ddlUserMaster, "USER_CODE", "USER_CODE", "اختار المستخدم");
                }
            }
        });
    }
    function Display_All() {
        //debugger;
        var USER_CODE = ddlUserMaster.value;
        var Active = $('#txt_Active').val();
        if (USER_CODE != 'null' && Active == 2) {
            Display = Details.filter(function (s) { return s.USER_CODE == USER_CODE; });
        }
        if (USER_CODE != 'null' && Active != 2) {
            Display = Details.filter(function (s) { return s.USER_CODE == USER_CODE && s.USER_ACTIVE == Active; });
        }
        if (USER_CODE == 'null' && Active != 2) {
            Display = Details.filter(function (s) { return s.USER_ACTIVE == Active; });
        }
        if (USER_CODE == 'null' && Active == 2) {
            Display = Details;
        }
        for (var i = 0; i < Display.length; i++) {
            Display[i].USER_ACTIVE_Name = Display[i].USER_ACTIVE == false ? 'غير فعال' : 'فعال';
        }
        InitializeGrid();
        ReportGrid.DataSource = Display;
        ReportGrid.Bind();
    }
    function _SearchBox_Change() {
        debugger;
        if (searchbutmemreport.value != "") {
            var search_1 = searchbutmemreport.value.toLowerCase();
            SearchDetails = Display.filter(function (x) { return x.USER_CODE.toLowerCase().search(search_1) >= 0; });
            ReportGrid.DataSource = SearchDetails;
            ReportGrid.Bind();
        }
        else {
            ReportGrid.DataSource = Display;
            ReportGrid.Bind();
        }
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        $("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "USER_CODE";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 10;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.OnItemEditing = function () { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "USER_CODE", type: "text", width: "100px", visible: false },
            { title: "اسم الموظف", name: "USER_NAME", type: "text", width: "100px" },
            { title: "رقم الجوال", name: "Mobile", type: "text", width: "100px" },
            { title: "النوع", name: "JobTitle", type: "text", width: "100px" },
            { title: "مفعل", name: "USER_ACTIVE_Name", type: "textdd", width: "100px" },
        ];
        ReportGrid.Bind();
    }
    function DriverDoubleClick() {
        ////debugger
        Selecteditem = Details.filter(function (s) { return s.USER_CODE == ReportGrid.SelectedKey; });
        DocumentActions.RenderFromModel(Selecteditem[0]);
        $('#btnedite').removeClass("display_none");
        $('#btnsave').addClass("display_none");
        $('#btnback').addClass("display_none");
        $('#btnedite').removeAttr("disabled");
        if (Selecteditem[0].USER_ACTIVE == true) {
            chk_IsActive.checked = true;
        }
        else {
            chk_IsActive.checked = false;
        }
        $("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
    }
    function btnEdit_onclick() {
        IsNew = false;
        removedisabled();
        $('#btnsave').toggleClass("display_none");
        $('#btnback').toggleClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").toggleClass("display_none");
        $("#txt_ID_Supplier").attr("disabled", "disabled");
        $("#id_div_Add").attr("disabled", "disabled").off('click');
        var x1 = $("#id_div_Add").hasClass("disabledDiv");
        (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        $(".btnAddDetails").removeAttr("disabled");
        $('#btnAddDetails').toggleClass("display_none");
        $(".fa-minus-circle").removeClass("display_none");
    }
    function btnAdd_onclick() {
        debugger;
        IsNew = true;
        EnableControls();
        removedisabled();
        $("#id_div_Add").attr("disabled", "disabled").off('click');
        var x1 = $("#id_div_Add").hasClass("disabledDiv");
        (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        //reference_Page();
    }
    function reference_Page() {
        $('#btnedite').attr('class', 'btn btn-primary display_none');
        $('#btnsave').attr('class', 'btn btn-success display_none');
        $('#btnback').attr('class', 'btn btn-success display_none');
        $('#btnAdd').attr('class', 'btn btn-primary display_none');
    }
    function btnsave_onClick() {
        debugger;
        if (IsNew == true) {
            Validation();
            if (Valid == 1) {
            }
            else {
                Insert();
            }
        }
        else {
            Validation();
            if (Valid == 1) {
            }
            else {
                Update();
            }
        }
    }
    function chack_USER() {
        if ($('#txtUSER_CODE').val() != "") {
            chack_USER_CODE = Details.filter(function (s) { return s.USER_CODE == $('#txtUSER_CODE').val(); });
            if (Selecteditem[0].USER_CODE != chack_USER_CODE[0].USER_CODE) {
                if (chack_USER_CODE.length > 0) {
                    MessageBox.Show("لا يمكن تكرار أسم المستخدم", " ");
                    $('#txtUSER_CODE').val('');
                }
            }
        }
    }
    function Validation() {
        if ($('#txtUSER_NAME').val() == "") {
            MessageBox.Show("يجب ادخال اسم الموظف ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        if ($('#txtDepartmentName').val() == "") {
            MessageBox.Show("يجب ادخال القسم ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        if ($('#txtJobTitle').val() == "") {
            MessageBox.Show("يجب ادخال  الوظيفة ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        if ($('#txtMobile').val() == "") {
            MessageBox.Show("يجب ادخال الموبيل ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        if ($('#txtUSER_CODE').val() == "") {
            MessageBox.Show("يجب ادخال  إسم المستخدم   ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        if ($('#txtUSER_PASSWORD').val() == "") {
            MessageBox.Show("يجب ادخال كلمة السر   ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        return Valid = 0;
    }
    function btnShow_onclick() {
        Display_All();
    }
    function btnback_onclick() {
        Selecteditem = Details.filter(function (x) { return x.USER_CODE == ReportGrid.SelectedKey; });
        if (Selecteditem.length == 0) {
            IsNew = true;
        }
        if (IsNew == true) {
            $('#btnAddDetails').toggleClass("display_none");
            $('#btnsave').toggleClass("display_none");
            $('#btnback').toggleClass("display_none");
            $(".fa-minus-circle").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            $("#btnedite").removeAttr("disabled");
            txt_disabled();
            if (Valid != 2) {
                $("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
                $("#id_div_Add").attr("disabled", "");
                $("#id_div_Add").removeClass("disabledDiv");
            }
        }
        else {
            $('#btnAddDetails').toggleClass("display_none");
            $('#btnsave').toggleClass("display_none");
            $('#btnback').toggleClass("display_none");
            $(".fa-minus-circle").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            $("#btnedite").removeAttr("disabled");
            txt_disabled();
            Update_claenData = 0;
            $("#id_div_Add").attr("disabled", "");
            $("#id_div_Add").removeClass("disabledDiv");
            DriverDoubleClick();
        }
    }
    function EnableControls() {
        debugger;
        $("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
        $('#btnsave').removeClass("display_none");
        $('#btnback').removeClass("display_none");
        $('#btnedite').attr('class', 'btn btn-primary display_none');
        chk_IsActive.checked = false;
        $("#txtUSER_NAME").val("");
        $("#txtDepartmentName").val("");
        $("#txtJobTitle").val("");
        $("#txtMobile").val("");
        $("#txtAddress").val("");
        $("#txtUSER_CODE").val("");
        $("#txtUSER_PASSWORD").val("");
        $("#txtUSER_PASSWORD_confirm").val("");
    }
    function txt_disabled() {
        $("#txtUSER_NAME").attr("disabled", "disabled");
        $("#txtDepartmentName").attr("disabled", "disabled");
        $("#chk_IsActive").attr("disabled", "disabled");
        $("#txtJobTitle").attr("disabled", "disabled");
        $("#txtMobile").attr("disabled", "disabled");
        $("#txtAddress").attr("disabled", "disabled");
        $("#txtUSER_CODE").attr("disabled", "disabled");
        $("#txtUSER_PASSWORD").attr("disabled", "disabled");
        $("#txtUSER_PASSWORD_confirm").attr("disabled", "disabled");
    }
    function removedisabled() {
        //debugger;
        $("#txtUSER_NAME").removeAttr("disabled");
        $("#txtDepartmentName").removeAttr("disabled");
        $("#chk_IsActive").removeAttr("disabled");
        $("#txtJobTitle").removeAttr("disabled");
        $("#txtMobile").removeAttr("disabled");
        $("#txtAddress").removeAttr("disabled");
        $("#txtUSER_CODE").removeAttr("disabled");
        $("#txtUSER_PASSWORD").removeAttr("disabled");
        $("#txtUSER_PASSWORD_confirm").removeAttr("disabled");
    }
    function Assign() {
        debugger;
        Model = new G_USERS();
        if (IsNew == true) {
            DocumentActions.AssignToModel(Model); //Insert Update
            if (chk_IsActive.checked) {
                Model.USER_ACTIVE = true;
            }
            else {
                Model.USER_ACTIVE = false;
            }
            Model.CompCode = 1;
            Model.Tokenid = 'HGFD-EV+xyuNsKkkH9SJrgL6XgROioRT8GfXE48AZcSVHN+256IG5apvYig==';
        }
        else {
            DocumentActions.AssignToModel(Model); //Insert Update
            if (chk_IsActive.checked) {
                Model.USER_ACTIVE = true;
            }
            else {
                Model.USER_ACTIVE = false;
            }
            Model.USER_CODE = Selecteditem[0].USER_CODE;
            Model.CompCode = 1;
            Model.Tokenid = 'HGFD-EV+xyuNsKkkH9SJrgL6XgROioRT8GfXE48AZcSVHN+256IG5apvYig==';
        }
    }
    function Insert() {
        Assign();
        debugger;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("G_USERS", "Insert_USER"),
            data: JSON.stringify(Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    MessageBox.Show("تم الحفظ بنجاح", "Success");
                    Update_claenData = 0;
                    FillddlUserMaster();
                    Display_All();
                    Valid = 2;
                    btnback_onclick();
                }
                else {
                    MessageBox.Show("خطأء", "Error");
                }
            }
        });
    }
    function Update() {
        Assign();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("G_USERS", "Update_USER"),
            data: JSON.stringify(Model),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    MessageBox.Show("تم التعديل بنجاح", "Success");
                    Update_claenData = 1;
                    FillddlUserMaster();
                    Display_All();
                    btnback_onclick();
                    $("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
                    Valid = 2;
                }
                else {
                    MessageBox.Show("خطأء", "Error");
                }
            }
        });
    }
})(USERS || (USERS = {}));
//# sourceMappingURL=USERS.js.map