$(document).ready(function () {
    AccDefVendor.InitalizeComponent();
});
var AccDefVendor;
(function (AccDefVendor) {
    // Arrays
    var AccountType = 2;
    var MSG_ID;
    var Details = new Array();
    var SearchDetails = new Array();
    var BilldIData = new Array();
    var ReportGrid = new JsGrid();
    var CashDetailsAr = new Array();
    var CashDetailsEn = new Array();
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var txt_Cust_Type;
    var txt_Category;
    var txt_tax;
    var txt_Grop;
    var ddlNationality;
    var txtVendorType_New;
    var btnback;
    var btnShow;
    var btnAdd;
    var btnEdit;
    var btnsave;
    var txt_CustomerCODE;
    var txt_NAME;
    var txt_ADDRESS;
    var txt_MOBILE;
    var txt_TEL;
    var txt_IDNo;
    var txt_WorkTel;
    var txt_note;
    var txt_VatNo;
    var txt_Debit;
    var txt_DebitFC;
    var txt_Openbalance;
    var txt_CreditLimit;
    var txt_balance;
    var txtResMobile;
    var txtResName;
    var searchbutmemreport;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var IsNew;
    var index;
    var Selecteditem;
    var CustomerIdUpdate = 0;
    var CustomerId;
    var sum_balance;
    var Debit;
    var Credit;
    var Valid = 0;
    var Update_claenData = 0;
    var indebtedness;
    var txt_ID_APP_Category;
    var txt_ID_APP_Group;
    var txt_indebtedness;
    var txt_ID_APP_Type;
    function InitalizeComponent() {
        //debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الموردين";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Supplier";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        GetSupplier();
        reference_Page();
    }
    AccDefVendor.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ////debugger;
        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category");
        //  btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        //  btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        //  btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
        //  btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        //  btnback = document.getElementById("btnback") as HTMLButtonElement;
        //  //textBoxes
        //  txt_CustomerCODE = document.getElementById("txt_CustomerCODE") as HTMLInputElement;
        //  txt_Cust_Type = document.getElementById("txt_Cust_Type") as HTMLSelectElement;
        //  txt_NAME = document.getElementById("txt_NAME") as HTMLInputElement;
        //  txt_Category = document.getElementById("txt_Category") as HTMLSelectElement;
        //  txt_ADDRESS = document.getElementById("txt_ADDRESS") as HTMLInputElement;
        //  txt_MOBILE = document.getElementById("txt_MOBILE") as HTMLInputElement;
        //  txt_TEL = document.getElementById("txt_TEL") as HTMLInputElement;
        //  txt_IDNo = document.getElementById("txt_IDNo") as HTMLInputElement;
        //  txt_WorkTel = document.getElementById("txt_WorkTel") as HTMLInputElement;
        //  txt_note = document.getElementById("txt_note") as HTMLInputElement;
        //  txt_tax = document.getElementById("txt_tax") as HTMLSelectElement;
        //  txt_Grop = document.getElementById("txt_Grop") as HTMLSelectElement;
        //  ddlNationality = document.getElementById("ddlNationality") as HTMLSelectElement;
        //  txtVendorType_New = document.getElementById("txtVendorType_New") as HTMLSelectElement;
        //  txt_VatNo = document.getElementById("txt_VatNo") as HTMLInputElement;
        //  txt_Debit = document.getElementById("txt_Debit") as HTMLInputElement;
        //  txt_DebitFC = document.getElementById("txt_DebitFC") as HTMLInputElement;
        //  txt_Openbalance = document.getElementById("txt_Openbalance") as HTMLInputElement;
        //  txt_CreditLimit = document.getElementById("txt_CreditLimit") as HTMLInputElement;
        //  txt_balance = document.getElementById("txt_balance") as HTMLInputElement;
        //txtResMobile = document.getElementById("txtResMobile") as HTMLInputElement;
        //  txtResName = document.getElementById("txtResName") as HTMLInputElement;
        //  searchbutmemreport = document.getElementById("searchbutmemreport") as HTMLInputElement;
    }
    function InitalizeEvents() {
        //debugger
        //btnShow.onclick = btnShow_onclick;
        //btnAdd.onclick = btnAdd_onclick;
        //btnsave.onclick = btnsave_onClick;
        //btnback.onclick = btnback_onclick;
        //btnEdit.onclick = btnEdit_onclick;
        //searchbutmemreport.onkeyup = _SearchBox_Change;
    }
    function reference_Page() {
        //if (!SysSession.CurrentPrivileges.EDIT) {
        //    $('#btnedite').attr('class', 'btn btn-primary display_none');
        //    $('#btnsave').attr('class', 'btn btn-success display_none');
        //    $('#btnback').attr('class', 'btn btn-success display_none');
        //}
        //if (!SysSession.CurrentPrivileges.AddNew) {
        //    $('#btnAdd').attr('class', 'btn btn-primary display_none');
        //}
    }
    function GetSupplier() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Supplier", "GetAll"),
            data: { CompCode: compcode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    displaysupplier();
                }
            }
        });
    }
    function displaysupplier() {
        debugger;
        for (var i = 0; i < Details.length; i++) {
            $('#txt_ID_APP_Category').append('<option data-ItemID="' + Details[i].Name_Supplier + '" value="' + Details[i].ID_Supplier + '">' + Details[i].Name_Supplier + '</option>');
        }
    }
    function btnEdit_onclick() {
        //IsNew = false;
        //removedisabled();
        //if (SysSession.CurrentPrivileges.EDIT) {
        //    $('#btnsave').toggleClass("display_none");
        //    $('#btnback').toggleClass("display_none");
        //    $("#div_ContentData :input").removeAttr("disabled");
        //    $("#btnedite").toggleClass("display_none");
        //    $("#txt_CustomerCODE").attr("disabled", "disabled");
        //    $("#txt_Debit").attr("disabled", "disabled");
        //    $("#txt_DebitFC").attr("disabled", "disabled");
        //    $("#txt_balance").attr("disabled", "disabled");
        //    $("#id_div_Add").attr("disabled", "disabled").off('click');
        //    var x1 = $("#id_div_Add").hasClass("disabledDiv");
        //    (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        //}
        //else {
        //    $('#btnsave').toggleClass("display_none");
        //    $('#btnback').toggleClass("display_none");
        //    $("#btnedite").toggleClass("display_none");
        //}
        //if (SysSession.CurrentPrivileges.AddNew) {
        //    $(".btnAddDetails").removeAttr("disabled");
        //    $('#btnAddDetails').toggleClass("display_none");
        //}
        //else {
        //    $(".btnAddDetails").attr("disabled", "disabled");
        //}
        //if (SysSession.CurrentPrivileges.Remove) {
        //    //debugger;
        //    $(".fa-minus-circle").removeClass("display_none");
        //}
        //else {
        //    $(".fa-minus-circle").addClass("display_none");
        //}
    }
    //onclick
    function btnAdd_onclick() {
        //IsNew = true;
        //EnableControls();
        //removedisabled();
        //$("#txt_Debit").attr("disabled", "disabled");
        //$("#txt_DebitFC").attr("disabled", "disabled");
        //$("#txt_balance").attr("disabled", "disabled");
        //$("#id_div_Add").attr("disabled", "disabled").off('click');
        //var x1 = $("#id_div_Add").hasClass("disabledDiv");
        //(x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");
        //reference_Page();
    }
    function btnsave_onClick() {
        //if (IsNew == true) {
        //    Validation();
        //    if (Valid == 1) {
        //    }
        //    else {
        //        Insert();
        //        Update_claenData = 0;
        //        btnback_onclick();
        //        Display();
        //        //$("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
        //    }
        //}
        //else {
        //    Validation();
        //    if (Valid == 1) {
        //    }
        //    else {
        //        Update();
        //        Update_claenData = 1;
        //        btnback_onclick();
        //        Display();
        //        //$("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
        //    }
        //}
    }
    function txt_disabled() {
        //debugger;
        //$("#txt_CustomerCODE").attr("disabled", "disabled");
        //$("#txt_Cust_Type").attr("disabled", "disabled");
        //$("#id_chkcustom6").attr("disabled", "disabled");
        //$("#txt_NAME").attr("disabled", "disabled");
        //$("#txt_Category").attr("disabled", "disabled");
        //$("#txt_Grop").attr("disabled", "disabled");
        //$("#txt_ADDRESS").attr("disabled", "disabled");
        //$("#txt_MOBILE").attr("disabled", "disabled");
        //$("#txt_TEL").attr("disabled", "disabled");
        //$("#txt_Email").attr("disabled", "disabled");
        //$("#txt_IDNo").attr("disabled", "disabled");
        //$("#txt_WorkTel").attr("disabled", "disabled");
        //$("#txt_note").attr("disabled", "disabled");
        //$("#txt_tax").attr("disabled", "disabled");
        //$("#txt_VatNo").attr("disabled", "disabled");
        //$("#txt_Debit").attr("disabled", "disabled");
        //$("#txt_DebitFC").attr("disabled", "disabled");
        //$("#txt_balance").attr("disabled", "disabled");
        //$("#txt_Openbalance").attr("disabled", "disabled");
        //$("#txt_CreditLimit").attr("disabled", "disabled");
        //$("#txtResName").attr("disabled", "disabled");
        //$("#txtResMobile").attr("disabled", "disabled");
        //$("#ddlNationality").attr("disabled", "disabled");
        //$("#txtVendorType_New").attr("disabled", "disabled");
    }
    function removedisabled() {
        //debugger;
        //$("#txt_CustomerCODE").removeAttr("disabled");
        //$("#txt_Cust_Type").removeAttr("disabled");
        //$("#id_chkcustom6").removeAttr("disabled");
        //$("#txt_NAME").removeAttr("disabled");
        //$("#txt_Category").removeAttr("disabled");
        //$("#txt_Grop").removeAttr("disabled");
        //$("#txt_ADDRESS").removeAttr("disabled");
        //$("#txt_MOBILE").removeAttr("disabled");
        //$("#txt_TEL").removeAttr("disabled");
        //$("#txt_Email").removeAttr("disabled");
        //$("#txt_IDNo").removeAttr("disabled");
        //$("#txt_WorkTel").removeAttr("disabled");
        //$("#txt_note").removeAttr("disabled");
        //$("#txt_tax").removeAttr("disabled");
        //$("#txt_VatNo").removeAttr("disabled");
        //$("#txt_Debit").removeAttr("disabled");
        //$("#txt_DebitFC").removeAttr("disabled");
        //$("#txt_balance").removeAttr("disabled");
        //$("#txt_Openbalance").removeAttr("disabled");
        //$("#txt_CreditLimit").removeAttr("disabled");
        //$("#txtResName").removeAttr("disabled");
        //$("#txtResMobile").removeAttr("disabled");
        //$("#ddlNationality").removeAttr("disabled");
        //$("#txtVendorType_New").removeAttr("disabled");
    }
    function Validation() {
        //if (IsNew == true) {
        //    if (CustomerFoundBefore() == false) {
        //        DisplayMassage("رقم المورد موجود من قبل ", "Contact Email Is Not Valid", MessageType.Worning);
        //        return Valid = 1;
        //    }
        //}
        //if (txt_CustomerCODE.value == "") {
        //    DisplayMassage("يجب ادخال رقم المورد", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if (txt_NAME.value == "") {
        //    DisplayMassage("يجب ادخال الاسم ", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if (txt_Cust_Type.selectedIndex == 0) {
        //    return DisplayMassage("يجب اختيار النوع ", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if (txt_Category.selectedIndex == 0) {
        //    DisplayMassage("يجب اختيار الفئة ", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if (txt_tax.selectedIndex == 0) {
        //    DisplayMassage("يجب اختيار نوع الضريبة ", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if (ddlNationality.selectedIndex == 0) {
        //    DisplayMassage("يجب اختيار الجنسيه ", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if (txtVendorType_New.selectedIndex == 0) {
        //    DisplayMassage("يجب اختيار نشاط المورد ", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if (txt_Grop.selectedIndex == 0) {
        //    DisplayMassage("يجب اختيار المجموعة ", "Contact Email Is Not Valid", MessageType.Worning);
        //    return Valid = 1;
        //}
        //if ($('#txt_Email').val() != '') {
        //    if (validate_email() == false) {
        //        DisplayMassage("يجب ادخال البريد الالكتروني صحيح ", "Contact Email Is Not Valid", MessageType.Worning);
        //        return Valid = 1;
        //    }
        //}
        //return Valid = 0;
    }
    function btnShow_onclick() {
        ////debugger;
        //if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    DisplayMassage("يجب اختيار واحد علي الاقل من (الفئه - المجموعة - النوع )", "At least one of the tracks must be selected prior to the show", MessageType.Worning);
        //}
        //else {
        //    Display();
        //    //$("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
        //}
    }
    function btnback_onclick() {
        //Selecteditem = Details.filter(x => x.ID_Supplier == Number(ReportGrid.SelectedKey));
        //if (Selecteditem.length == 0) {
        //    IsNew = true;
        //}
        //if (IsNew == true) {
        //    $('#btnAddDetails').toggleClass("display_none");
        //    $('#btnsave').toggleClass("display_none");
        //    $('#btnback').toggleClass("display_none");
        //    //$("#div_ContentData :input").attr("disabled", "true");
        //    $(".fa-minus-circle").addClass("display_none");
        //    $("#btnedite").removeClass("display_none");
        //    $("#btnedite").removeAttr("disabled");
        //    //$("#drpPaymentType").removeAttr("disabled");
        //    $("#drp_G_Store").removeAttr("disabled");
        //    txt_disabled();
        //    $("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
        //    $("#id_div_Add").attr("disabled", "");
        //    $("#id_div_Add").removeClass("disabledDiv");
        //}
        //else {
        //    $('#btnAddDetails').toggleClass("display_none");
        //    $('#btnsave').toggleClass("display_none");
        //    $('#btnback').toggleClass("display_none");
        //    //$("#div_ContentData :input").attr("disabled", "true");
        //    $(".fa-minus-circle").addClass("display_none");
        //    $("#btnedite").removeClass("display_none");
        //    $("#btnedite").removeAttr("disabled");
        //    //$("#drpPaymentType").removeAttr("disabled");
        //    $("#drp_G_Store").removeAttr("disabled");
        //    txt_disabled();
        //    //DriverDoubleClick();
        //    if (Update_claenData != 1) {
        //        back_Details();
        //    }
        //    Update_claenData = 0;
        //    $("#id_div_Add").attr("disabled", "");
        //    $("#id_div_Add").removeClass("disabledDiv");
        //}
    }
    function back_Details() {
        //Selecteditem = Details.filter(x => x.ID_Supplier == Number(ReportGrid.SelectedKey));
        //for (var item of Selecteditem) {
        //    //CustomerIdUpdate = item.VendorID;
        //    if (item.Isactive) { chkActive.checked = true; }
        //    else chkActive.checked = false;
        //}
        //DisplayData(Selecteditem);
        //reference_Page();
    }
    function DriverDoubleClick() {
        ////debugger
        //Selecteditem = Details.filter(x => x.ID_Supplier == Number(ReportGrid.SelectedKey));
        //for (var item of Selecteditem) {
        //    //CustomerIdUpdate = item.VendorID;
        //    if (item.Isactive) { chkActive.checked = true; }
        //    else chkActive.checked = false;
        //}
        //DisplayData(Selecteditem);
        //$('#btnedite').removeClass("display_none");
        //$('#btnsave').addClass("display_none");
        //$('#btnback').addClass("display_none");
        //$('#btnedite').removeAttr("disabled");
        //chkActive.disabled = true;
        //IsNew = false;
        //Update_claenData = 1;
        //btnback_onclick();
        //$('#btnsave').toggleClass("display_none");
        //$('#btnback').toggleClass("display_none");
        //reference_Page();
        //$("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
    }
    function DisplayData(Selecteditem) {
        //DocumentActions.RenderFromModel(Selecteditem[0]);
        //$('#txt_Category').prop("value", Selecteditem[0].CatID);
        ////debugger;
        //if (Selecteditem[0].IsCreditVendor == false) {
        //    $('#txt_Cust_Type').prop("value", 0);
        //    $('#div_Balance').removeClass("display_none");
        //}
        //else {
        //    $('#txt_Cust_Type').prop("value", 1);
        //    //$('#txt_Openbalance').addClass("display_none");
        //    $('#div_Balance').addClass("display_none");
        //}
        //$('#txt_Grop').prop("value", Selecteditem[0].GroupId);
        //$('#txt_tax').prop("value", Selecteditem[0].VATType);
        //$('#ddlNationality').prop("value", Selecteditem[0].NationalityID);
        //$('#txtVendorType_New').prop("value", Selecteditem[0].VendorType);
        ////alert(Selecteditem[0].NationalityID);
        //CustomerId = Selecteditem[0].VendorID;
        //Debit = Selecteditem[0].Debit;
        //Credit = Selecteditem[0].Credit
        //$('#txt_balance').val((Selecteditem[0].Openbalance + Selecteditem[0].Debit - Selecteditem[0].Credit));
    }
    function FillddlCashAdd() {
        //CashDetailsAr = ["أجل", "نقدي"];
        //CashDetailsEn = ["Cash", "Doubted"];
        //if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
        //    let option = document.createElement("option");
        //    option.value = null;
        //    option.text = "Select ...";
        //    //   ddlCash.options.add(option);
        //    txt_Cust_Type.options.add(option);
        //    for (let i = 0; i < CashDetailsEn.length; i++) {
        //        let newoption = document.createElement("option");
        //        newoption.value = i.toString();
        //        newoption.text = CashDetailsEn[i];
        //        //     ddlCash.options.add(newoption);
        //        txt_Cust_Type.options.add(newoption);
        //    }
        //}
        //else {
        //    let option = document.createElement("option");
        //    option.value = null;
        //    option.text = "النوع ...";
        //    //    ddlCash.options.add(option);
        //    txt_Cust_Type.options.add(option);
        //    for (let i = 0; i < CashDetailsAr.length; i++) {
        //        let newoption = document.createElement("option");
        //        newoption.value = i.toString();
        //        newoption.text = CashDetailsAr[i];
        //        //   ddlCash.options.add(newoption);
        //        txt_Cust_Type.options.add(newoption);
        //    }
        //}
    }
    function EnableControls() {
        //if (!SysSession.CurrentPrivileges.AddNew) return;
        //$("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
        //$('#btnsave').removeClass("display_none");
        //$('#btnback').removeClass("display_none");
        //$('#btnedite').addClass("display_none");
        //$('#txt_Category').prop("selectedIndex", 0);
        //$('#txt_Cust_Type').prop("selectedIndex", 0);
        //$('#ddlNationality').prop("selectedIndex", 0);
        //$('#txtVendorType_New').prop("selectedIndex", 0);
        //$('#txt_tax').prop("selectedIndex", 0);
        //$('#txt_Grop').prop("selectedIndex", 0);
        //$('#txt_Email').val("");
        //txt_CustomerCODE.value = "";
        //txt_NAME.value = "";
        //txt_ADDRESS.value = "";
        //txt_MOBILE.value = "";
        //txt_TEL.value = "";
        //txt_IDNo.value = "";
        //txt_WorkTel.value = "";
        //txt_note.value = "";
        //txt_VatNo.value = "";
        //txt_Debit.value = "";
        //txt_DebitFC.value = "";
        //txt_Openbalance.value = "";
        //txt_CreditLimit.value = "";
        //txt_balance.value = "";
        //txtResMobile.value = "";
        //txtResName.value = "";
        ////FillddlCashAdd();
    }
    function Display() {
        //debugger;
        //indebtedness = $('#txt_indebtedness').val();
        //var IsCredit_Type: number;
        //if ($('#txt_ID_APP_Type').val() == "Null") {
        //    IsCredit_Type = 2;
        //}
        //else {
        //    IsCredit_Type = Number($('#txt_ID_APP_Type').val());
        //}
        //var catid: number;
        //if ($('#txt_ID_APP_Category').val() == "Null") {
        //    catid = 0;
        //}
        //else {
        //    catid = Number($('#txt_ID_APP_Category').val());
        //}
        //var Groupid: number;
        //if ($('#txt_ID_APP_Group').val() == "Null") {
        //    Groupid = 0;
        //}
        //else {
        //    Groupid = Number($('#txt_ID_APP_Group').val());
        //}
        //var VendorType: number;
        //if ($('#txtVendorType').val() == "Null") {
        //    VendorType = 0;
        //}
        //else {
        //    VendorType = Number($('#txtVendorType').val());
        //}
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("AccDefVendor", "GetFiltered"),
        //    data: {
        //        CompCode: compcode, Catid: catid, Groupid: Groupid, CreditType: IsCredit_Type, VendorType: VendorType, BalType: indebtedness, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
        //    },
        //    success: (d) => {
        //        //debugger;
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            Details = result.Response as Array<Supplier>;
        //            //for (var i = 0; i < Details.length; i++) {
        //            //    Details[i].Isbalance = Number((Number(Details[i].Openbalance) - Number(Details[i].Debit) + Number(Details[i].Credit)).toFixed(2));
        //            //}
        //            //debugger
        //            InitializeGrid();
        //            ReportGrid.DataSource = Details;
        //            ReportGrid.Bind();
        //        }
        //    }
        //});
    }
    function filter_DataSource() {
        ////debugger
        //var IsCredit_Type;
        //if ($('#txt_ID_APP_Type').val() == 0) {
        //    IsCredit_Type = false;
        //}
        //else {
        //    IsCredit_Type = true;
        //}
        //if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details;
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val())
        //}
        //else if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details.filter(x => x.GroupId == $('#txt_ID_APP_Group').val())
        //}
        //else if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    BilldIData = Details.filter(x => x.IsCreditVendor == IsCredit_Type)
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() == "Null") {
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val() && x.GroupId == $('#txt_ID_APP_Group').val())
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() == "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val() && x.IsCreditVendor == IsCredit_Type)
        //}
        //else if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    BilldIData = Details.filter(x => x.GroupId == $('#txt_ID_APP_Group').val() && x.IsCreditVendor == IsCredit_Type)
        //}
        //else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() != "Null" && $('#txt_ID_APP_Type').val() != "Null") {
        //    //debugger
        //    BilldIData = Details.filter(x => x.CatID == $('#txt_ID_APP_Category').val() && x.GroupId == $('#txt_ID_APP_Group').val() && x.Isactive == $('#txt_ID_APP_Type').val())
        //}
        //filter_balance();
    }
    function _SearchBox_Change() {
        //////debugger;
        //if (searchbutmemreport.value != "") {
        //    let search: string = searchbutmemreport.value.toLowerCase();
        //    SearchDetails = Details.filter(x => x.NAMEA.toLowerCase().search(search) >= 0 || x.VendorCode.toString().search(search) >= 0
        //        || x.AddDedNo.toString().search(search) >= 0);
        //    ReportGrid.DataSource = SearchDetails;
        //    ReportGrid.Bind();
        //} else {
        //    ReportGrid.DataSource = Details;
        //    ReportGrid.Bind();
        //}
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        $("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "VendorID";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 10;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.OnItemEditing = function () { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "ID_Supplier", type: "text", width: "100px", visible: false },
            { title: "الاسم", name: "Name_Supplier", type: "text", width: "100px" },
            { title: "رقم الجوال", name: "phone", type: "text", width: "100px" },
            { title: "النوع", name: "Type_Supplier", type: "text", width: "100px" },
            { title: "ملاحظات", name: "Notes", type: "text", width: "100px" },
            { title: "مفعل", name: "Debit", type: "IS_Active", width: "100px" },
        ];
        ReportGrid.Bind();
    }
    function Assign() {
        //debugger;
        var IsCredit_Type;
        if ($('#txt_Cust_Type').val() == 0) {
            IsCredit_Type = false;
        }
        else {
            IsCredit_Type = true;
        }
        var Model = new Supplier();
        if (IsNew == true) {
            DocumentActions.AssignToModel(Model); //Insert Update
            Model.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
            Model.UserCode = SysSession.CurrentEnvironment.UserCode;
            Model.ID_Supplier = CustomerId;
            Model.Type_Supplier = $('#txtVendorType_New').val();
            Model.Name_Supplier = $('#txtResName').val();
            Model.phone = $('#txtResMobile').val();
        }
        else {
            //  DocumentActions.RenderFromModel(Model);//Display
            DocumentActions.AssignToModel(Model); //Insert Update 
            Model.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
            Model.UserCode = SysSession.CurrentEnvironment.UserCode;
            Model.ID_Supplier = CustomerId;
            Model.Type_Supplier = $('#txtVendorType_New').val();
            Model.Name_Supplier = $('#txtResName').val();
            Model.phone = $('#txtResMobile').val();
        }
    }
    function Insert() {
        //Assign();
        ////debugger
        //Ajax.Callsync({
        //    type: "POST",
        //    url: sys.apiUrl("AccDefVendor", "Insert"),
        //    data: JSON.stringify(Model),
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            DisplayMassage("تم الحفظ بنجاح", "Success", MessageType.Succeed);
        //            Valid = 0;
        //        } else {
        //            DisplayMassage("خطأء", "Error", MessageType.Error);
        //        }
        //    }
        //});
    }
    function Update() {
        //Assign();
        //Ajax.Callsync({
        //    type: "POST",
        //    url: sys.apiUrl("AccDefVendor", "Update"),
        //    data: JSON.stringify(Model),
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            DisplayMassage("تم التعديل بنجاح", "Success", MessageType.Succeed);
        //        } else {
        //            DisplayMassage("خطأء", "Error", MessageType.Error);
        //        }
        //    }
        //});
    }
})(AccDefVendor || (AccDefVendor = {}));
//# sourceMappingURL=Supplier.js.map