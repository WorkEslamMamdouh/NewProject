$(document).ready(function () {
    //debugger;
    Items.InitalizeComponent();
});
var Items;
(function (Items) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var compcode;
    var DetailsCat = new Array();
    var AccountType = 1;
    var MSG_ID;
    var Display_Type = new Array();
    var Details = new Array();
    var BilldDetail = new Array();
    var Model = new PRODUCT();
    var Display_ItemFamily = new Array();
    //var Details: Array<I_D_Category> = new Array<I_D_Category>();
    var btnNew_sub_Add_service;
    var btnsave;
    var btnAddDetails;
    var btnEdit;
    var btnShow;
    //var btnView: HTMLButtonElement;
    var CountGrid = 0;
    var compcode; //SharedSession.CurrentEnvironment.CompCode;
    var btnback;
    var catId;
    var catId_type_change;
    var ItemFamilyID_change;
    var flag_Assign = 0;
    var ItemFamilyID;
    var storeCode = 1;
    var Itm_DescA;
    var flag_Display = 0;
    var StocK = "All";
    var succ = false;
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
        drpPaymentType();
        $('#btnedite').on('click', function () {
            $('#btnsave').toggleClass("display_none");
            $('#btnback').toggleClass("display_none");
            $("#div_ContentData :input").removeAttr("disabled");
            $("#btnedite").toggleClass("display_none");
            $(".SelectDIS").attr("disabled", "disabled");
            if ($('#drpitem_family :selected').text() == "النوع") {
                $("#drpitem_family").attr("disabled", "disabled");
            }
            else {
                $("#drpitem_family").removeAttr("disabled");
            }
            $("#drp_G_Store").attr("disabled", "disabled");
            $("#drpPaymentType").attr("disabled", "disabled");
            $("#drpitem_family").attr("disabled", "disabled");
            $("#drp_StocK").attr("disabled", "disabled");
            $(".btnAddDetails").removeAttr("disabled");
            $("#Serial").removeAttr("disabled");
            $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign');
            $(".fa-minus-circle").removeClass("display_none");
        });
    }
    Items.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // 
        btnAddDetails = document.getElementById("btnAddDetails");
        btnEdit = document.getElementById("btnedite");
        btnsave = document.getElementById("btnsave");
        btnback = document.getElementById("btnback");
        btnShow = document.getElementById("btnShow");
        // Buton privialges for single record page
    }
    function InitalizeEvents() {
        debugger;
        $("#drpitem_family").attr("disabled", "disabled");
        //$("#drpPaymentType").attr("disabled", "disabled");
        btnAddDetails.onclick = AddNewRow; //
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnShow.onclick = btnShow_onclick;
        //btnShow.onkeyup = btnShow_onclick;
        $("#drp_G_Store").on('change', function () {
            $("#drpPaymentType").removeAttr("disabled");
            storeCode = $('#drp_G_Store').val();
        });
        $("#drpPaymentType").on('change', function () {
            if ($("#drpPaymentType").val() == "الفئة") {
                $("#div_Data").html('');
                $("#drpitem_family").attr("disabled", "disabled");
                $('#drpitem_family').prop("value", 0);
            }
            else {
                storeCode = $('#drp_G_Store').val();
                $("#drpitem_family").removeAttr("disabled");
                $('#drpitem_family').html("");
                catId = $('#drpPaymentType').val();
                ItemFamilyID = $('#drpitem_family').val();
            }
        });
        $("#drpitem_family").on('change', function () {
            //$('#drpitem_family').html("");
            ItemFamilyID = $('#drpitem_family').val();
            //btnback_onclick();
        });
    }
    function drpPaymentType() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: { CompCode: compcode },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    DetailsCat = result.Response;
                    DisplayProduct();
                }
            }
        });
    }
    function DisplayProduct() {
        debugger;
        for (var i = 0; i < DetailsCat.length; i++) {
            $("#drpPaymentType").append("<option value=" + DetailsCat[i].ID_CAT + " >" + DetailsCat[i].Name_CAT + "</option>");
        }
    }
    function btnShow_onclick() {
        ;
        debugger;
        catId = $('#drpPaymentType').val();
        if ($("#drpPaymentType").val() == "Null") {
            //MessageBox.Show(" يجب  اختيار الفئة", "خطأ");
            Display_All();
        }
        else {
            Display();
        }
        if (succ == true) {
            $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none');
            $(".fa-minus-circle").addClass("display_none");
            $("#btnedite").removeClass("display_none");
            $("#btnedite").removeAttr("disabled");
            $("#btnback").removeAttr("disabled");
            $("#btnsave").removeAttr("disabled");
            succ = false;
        }
    }
    function btnback_onclick() {
        if ($('#btnback').attr('class') != "btn btn-warning display_none") {
            $('#btnback').toggleClass("display_none");
        }
        if ($('#btnsave').attr('class') != "btn btn-success display_none") {
            $('#btnsave').toggleClass("display_none");
        }
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none');
        $(".fa-minus-circle").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        $("#btnback").removeAttr("disabled");
        $("#btnsave").removeAttr("disabled");
        CountGrid = 0;
        $("#div_Data").html("");
        $("#drpPaymentType").removeAttr("disabled");
        if ($('#btnback').attr('class') != "btn btn-warning display_none") {
            $('#btnback').toggleClass("display_none");
        }
        if ($('#btnsave').attr('class') != "btn btn-success display_none") {
            $('#btnsave').toggleClass("display_none");
        }
    }
    function AddNewRow() {
        var CanAdd = true;
        if (CountGrid > 0) {
            var LastRowNo = CountGrid - 1;
            CanAdd = Validation_Grid(LastRowNo);
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txtCode" + CountGrid).removeAttr("disabled");
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            //  $("#txtDescL" + CountGrid).removeAttr("disabled");
            $("#select_Type_Item" + CountGrid).removeAttr("disabled");
            $("#select_ItemFamily" + CountGrid).removeAttr("disabled");
            $("#txtUnitPrice" + CountGrid).removeAttr("disabled");
            $("#txtMinUnitPrice" + CountGrid).removeAttr("disabled");
            $("#txtOnhandQty" + CountGrid).removeAttr("disabled");
            $("#Serial" + CountGrid).removeAttr("disabled");
            //$("#txtAcount_Code" + CountGrid).removeAttr("disabled");
            // can delete new inserted record  without need for delete privilage
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            //$(".minus_btn").addClass("display_none");
            //debugger
            $("#select_Type_Item" + CountGrid).prop('value', Number($("#drpPaymentType").val()));
            $("#select_ItemFamily" + CountGrid).prop('value', Number($("#drpitem_family").val()));
            $("#txt_UOM" + CountGrid).prop('value', 1);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            CountGrid++;
        }
        $("#btnedite").addClass("display_none");
    }
    function BuildControls(cnt) {
        var html;
        // 
        html = '<div id="No_Row' + cnt + '" class="container-fluid ">' +
            '<div class="row">' +
            '<div class="col-lg-12">' +
            '<span id = "btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3 display_none" disabled = "disabled"> </span>' +
            '<div class=" "><input id="txtID' + cnt + '" type="text" class="form-control right2 display_none" disabled=""></div>' +
            '<div class="col-lg-1"><input id="txtCode' + cnt + '" type="text" class="form-control right2" disabled=""></div>' +
            '<div class="col-lg-3"><input id="txtDescA' + cnt + '" type="text" class="form-control right2" disabled=""></div> ' +
            '<div class="col-lg-2"><select id="select_Type_Item' + cnt + '" class="form-control" disabled=""></select></div> ' +
            '<div class="col-lg-1"><input id="txtOnhandQty' + cnt + '" type="text" disabled="" class="form-control right2 SelectDIS"></div> ' +
            '<div class="col-lg-1"><input id="txtUnitPrice' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '<div class="col-lg-1"><input id="txtMinUnitPrice' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '<div class="col-lg-1"><input id="Serial' + cnt + '" type="number" disabled="" class="form-control right2"></div> ' +
            '</div>' +
            '</div> ' +
            '<input id="txt_StatusFlag' + cnt + '" name=" " type="hidden" class="form-control" value=""> ' +
            '<input id="txt_ID' + cnt + '" name=" " type="hidden" class="form-control" value=""> ' +
            '</div> ';
        $("#div_Data").append(html);
        $('#select_Type_Item' + cnt).append('<option value="Null">أختر الفئه</option>');
        for (var i = 0; i < DetailsCat.length; i++) {
            $('#select_Type_Item' + cnt).append('<option value="' + DetailsCat[i].ID_CAT + '">' + DetailsCat[i].Name_CAT + '</option>');
        }
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
        $("#select_Type_Item" + cnt).on('change', function () {
            catId_type_change = $("#select_Type_Item" + cnt).val();
            $("#select_ItemFamily" + cnt).removeAttr("disabled");
            $('#select_ItemFamily' + cnt).html("");
            Display_I_ItemFamily_GRED();
            for (var i = 0; i < Display_ItemFamily.length; i++) {
                $('#select_ItemFamily' + cnt).append('<option value="' + Display_ItemFamily[i].ID_CAT + '">' + Display_ItemFamily[i].Name_CAT + '</option>');
            }
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#select_ItemFamily" + cnt).on('change', function () {
            ItemFamilyID_change = $("#select_ItemFamily" + cnt).val();
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtOnhandQty" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtUnitPrice" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtMinUnitPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            //debugger
            if ($("#txtUnitPrice" + cnt).val() == "" || $("#txtUnitPrice" + cnt).val() == 0) {
                MessageBox.Show('يجب أدخال سعر الصنف اوالاً', 'خطأ');
                $("#txtMinUnitPrice" + cnt).val(0);
            }
            else if (Number($("#txtMinUnitPrice" + cnt).val()) > Number($("#txtUnitPrice" + cnt).val())) {
                MessageBox.Show('يجب ان يكون أقل سعر اصغر من سعر الصنف', 'خطأ');
                $("#txtMinUnitPrice" + cnt).val($("#txtUnitPrice" + cnt).val() - 1);
            }
        });
        $("#txt_UOM" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        return;
    }
    function btnsave_onClick() {
        if (Validation_Grid(CountGrid - 1))
            Update();
        flag_Assign = 0;
    }
    function Display_I_ItemFamily_GRED() {
        //var StkDefCategory: Array<I_D_Category> = new Array<I_D_Category>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("StkDefItemType", "GetByCategory"),
            data: {
                CompCode: compcode, CatID: catId_type_change, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Display_ItemFamily = result.Response;
                }
            }
        });
    }
    function refresh() {
        $('#div_Data').html("");
        CountGrid = 0;
        ItemFamilyID = $('#drpitem_family').val();
        Display();
        flag_Assign = 0;
    }
    function Update() {
        Assign();
        if (Details.filter(function (x) { return x.PRODUCT_NAME == ""; }).length > 0) {
            MessageBox.Show(" يجب ادخال الوصف باعربي", "خطأ");
            return;
        }
        if (BilldDetail.filter(function (x) { return x.ID_CAT == null; }).length > 0) {
            MessageBox.Show(" يجب ادخال الفئه", "خطأ");
            return;
        }
        if (Details.filter(function (x) { return x.PRODUCT_PRICE == 0; }).length > 0) {
            MessageBox.Show(" يجب ادخال السعر", "خطأ");
            return;
        }
        if (Details.filter(function (x) { return x.MinUnitPrice == 0; }).length > 0) {
            MessageBox.Show(" يجب ادخال اقل سعر", "خطأ");
            return;
        }
        if (Details.filter(function (x) { return x.serial == "" || x.serial == null; }).length > 0) {
            MessageBox.Show(" يجب ادخال الكود", "خطأ");
            return;
        }
        BilldDetail[0].Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        BilldDetail[0].UserCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("StkDefItems", "Updatelist"),
            data: JSON.stringify(BilldDetail),
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    MessageBox.Show("تم الحفظ", "الحفظ");
                    btnback_onclick();
                    refresh();
                    flag_Assign = 0;
                }
                else {
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }
    function Assign() {
        //debugger;
        BilldDetail = new Array();
        var StatusFlag;
        for (var i = 0; i < CountGrid; i++) {
            Model = new PRODUCT();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            $("#txt_StatusFlag" + i).val("");
            //debugger
            if (StatusFlag == "i") {
                //debugger
                Model.StatusFlag = StatusFlag.toString();
                Model.PRODUCT_ID = 0;
                Model.PRODUCT_NAME = $("#txtDescA" + i).val();
                Model.ID_CAT = $('#select_ItemFamily' + i).val();
                Model.PRODUCT_QET = $("#txtOnhandQty" + i).val();
                Model.PRODUCT_PRICE = $('#txtUnitPrice' + i).val();
                Model.MinUnitPrice = $('#txtMinUnitPrice' + i).val();
                Model.serial = $("#Serial" + i).val();
                //if ($("#txtDescA" + i).val() == "") {
                //    Model.DescA = $("#txtDescL" + i).val();
                //    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                //}
                //else {
                //    Model.DescA = $("#txtDescA" + i).val();
                //}
                //if ($("#txtDescL" + i).val() == "") {
                //    Model.DescL = $("#txtDescA" + i).val();
                //    $("#txtDescL" + i).val($("#txtDescA" + i).val());
                //}
                //else {
                //    Model.DescL = $("#txtDescL" + i).val();
                //}
                BilldDetail.push(Model);
                flag_Assign = 1;
            }
            if (StatusFlag == "u") {
                //debugger
                var UpdatedDetail = Details.filter(function (x) { return x.PRODUCT_ID == $("#txtID" + i).val(); });
                Model.StatusFlag = StatusFlag.toString();
                Model.PRODUCT_ID = UpdatedDetail[0].PRODUCT_ID;
                Model.ID_CAT = $('#select_ItemFamily' + i).val();
                Model.PRODUCT_QET = $("#txtOnhandQty" + i).val();
                Model.PRODUCT_PRICE = $('#txtUnitPrice' + i).val();
                Model.MinUnitPrice = $('#txtMinUnitPrice' + i).val();
                Model.serial = $('#serial' + i).val();
                if ($("#txtDescA" + i).val() == "") {
                    Model.PRODUCT_NAME = $("#txtDescL" + i).val();
                    $("#txtDescA" + i).val($("#txtDescL" + i).val());
                }
                else {
                    Model.PRODUCT_NAME = $("#txtDescA" + i).val();
                }
                BilldDetail.push(Model);
                flag_Assign = 1;
            }
            if (StatusFlag == "d") {
                //debugger
                if ($("#txt_ID" + i).val() != "") {
                    var UpdatedDetail = Details.filter(function (x) { return x.PRODUCT_ID == $("#txtID" + i).val(); });
                    Model.StatusFlag = StatusFlag.toString();
                    Model.PRODUCT_ID = UpdatedDetail[0].PRODUCT_ID;
                    Model.ID_CAT = UpdatedDetail[0].ID_CAT;
                    Model.PRODUCT_NAME = UpdatedDetail[0].PRODUCT_NAME;
                    Model.PRODUCT_QET = UpdatedDetail[0].PRODUCT_QET;
                    Model.PRODUCT_PRICE = UpdatedDetail[0].PRODUCT_PRICE;
                    Model.PRODUCT_NAME = UpdatedDetail[0].PRODUCT_NAME;
                    Model.serial = UpdatedDetail[0].serial;
                    BilldDetail.push(Model);
                    flag_Assign = 1;
                }
            }
        }
    }
    function Display_All() {
        ItemFamilyID = 0;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll"),
            data: { CompCode: 1 },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    //debugger
                    Details = result.Response;
                    succ = true;
                    Details_All();
                }
            }
        });
    }
    function Details_All() {
        debugger;
        CountGrid = 0;
        $("#div_Data").html('');
        for (var i = 0; i < Details.length; i++) {
            BuildControls(CountGrid);
            $("#txtID" + i).val(Details[i].PRODUCT_ID);
            $("#txtCode" + i).val(i);
            $("#txtDescA" + i).val(Details[i].PRODUCT_NAME);
            //$("#select_Type_Item" + i).val(Details[i].ID_CAT);
            $("#txtOnhandQty" + i).val(Details[i].PRODUCT_QET);
            $("#txtUnitPrice" + i).val(Details[i].PRODUCT_PRICE);
            $("#txtMinUnitPrice" + i).val(Details[i].MinUnitPrice);
            $("#Serial" + i).val(Details[i].serial);
            $("#txt_StatusFlag" + i).val("");
            $('#select_Type_Item' + i).prop("value", Details[i].ID_CAT);
            CountGrid++;
        }
    }
    function Display() {
        //debugger
        var cate = $("#drpPaymentType").val();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll_Item_by_Cat"),
            data: {
                cat: cate
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details = result.Response;
                    succ = true;
                    DisplayGetItemStore();
                }
            }
        });
    }
    function DisplayGetItemStore() {
        CountGrid = 0;
        $("#div_Data").html('');
        for (var i = 0; i < Details.length; i++) {
            BuildControls(CountGrid);
            $("#txtID" + i).val(Details[i].PRODUCT_ID);
            $("#txtCode" + i).val(i);
            $("#txtDescA" + i).val(Details[i].PRODUCT_NAME);
            $("#select_Type_Item" + i).val(Details[i].ID_CAT);
            $("#txtOnhandQty" + i).val(Details[i].PRODUCT_QET);
            $("#txtUnitPrice" + i).val(Details[i].PRODUCT_PRICE);
            $("#txtMinUnitPrice" + i).val(Details[i].MinUnitPrice);
            $("#Serial" + i).val(Details[i].serial);
            $("#txt_StatusFlag" + i).val("");
            $('#select_Type_Item' + i).prop("value", catId);
            $('#select_ItemFamily' + i).prop("value", ItemFamilyID);
            CountGrid++;
        }
    }
    function DeleteRow(RecNo) {
        if (!SysSession.CurrentPrivileges.Remove)
            return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            if ($("#txtCode" + RecNo).val() == "") {
                Null_Fild(RecNo);
                $("#No_Row" + RecNo).attr("hidden", "true");
            }
            else {
                $("#No_Row" + RecNo).attr("hidden", "true");
            }
            $("#txt_StatusFlag" + RecNo).val("d");
            //$("#txtCode" + RecNo).val("");
            $("#txtCode" + RecNo).val("000");
            $("#txtUnitPrice" + RecNo).val("000");
            $("#txtMinUnitPrice" + RecNo).val("000");
        });
    }
    function Null_Fild(RecNo) {
        $("#txt_ID" + RecNo).val("");
        $("#txtCode" + RecNo).val("0");
        $("#txtDescA" + RecNo).val(0);
        // $("#txtDescL" + RecNo).val(0);
        $("#txtRefItemCode" + RecNo).val(0);
        $("#txtOnhandQty" + RecNo).val(0);
        $("#txtLastBarCodeSeq" + RecNo).val(0);
        $("#txtLastBarCodeSeq" + RecNo).val(0);
        $('#select_Type_Item' + RecNo).prop("selectedIndex", 0);
        $('#select_ItemFamily' + RecNo).prop("selectedIndex", 0);
        //$("#txt_StatusFlag" + RecNo).val("");
    }
    function Validation_Grid(rowcount) {
        if ($("#txtDescA" + rowcount).val() == "") {
            $("#txtDescA" + rowcount).val($("#txtDescA" + rowcount).val());
        }
        if (($("#txtCode" + rowcount).val() == "" || $("#txtDescA" + rowcount).val() == "") && $("#txt_StatusFlag" + rowcount).val() != "d") {
            MessageBox.Show(" ادخل كود و الوصف العربي ", "خطأ");
            return false;
        }
        if (($("#select_Type_Item" + rowcount).val() == "الفئة" || $("#select_ItemFamily" + rowcount).val() == "النوع" || $("#txt_UOM" + rowcount).val() == "وحدة القياس") && $("#txt_StatusFlag" + rowcount).val() != "d") {
            MessageBox.Show("اختار الفئة والنوع و وحدة القياس", "خطأ");
            return false;
        }
        if ($("#txtUnitPrice" + rowcount).val() == "") {
            MessageBox.Show("ادخل السعر", "خطأ");
            return false;
        }
        if ($("#txtMinUnitPrice" + rowcount).val() == "") {
            MessageBox.Show("ادخل اقل سعر", "خطأ");
            return false;
        }
        return true;
    }
    function Validate_code(rowno) {
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
})(Items || (Items = {}));
//# sourceMappingURL=Items.js.map