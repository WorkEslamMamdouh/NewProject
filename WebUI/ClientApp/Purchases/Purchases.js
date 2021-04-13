$(document).ready(function () {
    ////debugger;
    Purchases.InitalizeComponent();
});
var Purchases;
(function (Purchases) {
    //system varables
    var AccType = 3; //نوع الحساب
    //var SysSession: SystemSession = GetSystemSession();
    var compcode;
    //var sys: SystemTools = new SystemTools();
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    //Arrays     
    var UserDetails = new Array();
    var CustomerDetails = new Array();
    var Get_IQ_Purchases_Master = new Array();
    var SearchDetails = new Array();
    var Selected_Data = new Array();
    var AllGetStokMasterDetail = new Array();
    var FamilyDetails = new Array();
    var ItemFamilyDetails = new Array();
    var ItemBaesdFamilyDetails = new Array();
    var OperationItemModel = new Array();
    var OperationItemSingleModel = new Stok_ORDER_DELIVERY();
    var SlsMasterDetils = new SlsMasterDetails();
    //var GetAllVendorDetails: Array<A_Pay_D_Vendor> = new Array<A_Pay_D_Vendor>();
    //var SellerDetails: Array<I_Sls_D_Salesman> = new Array<I_Sls_D_Salesman>();
    //var NationalityDetails: Array<G_Nationality> = new Array<G_Nationality>();
    //var Cashbox_DescA: Array<A_RecPay_D_CashBox> = new Array<A_RecPay_D_CashBox>();
    //var CashboxDetails: Array<A_RecPay_D_CashBox> = new Array<A_RecPay_D_CashBox>();
    //var StateDetailsAr: Array<string> = new Array<string>();
    //var StateDetailsEn: Array<string> = new Array<string>();
    //var DepositDetailsModel: Array<I_TR_OperationDeposit> = new Array<I_TR_OperationDeposit>();
    //var DepositsingleModel: I_TR_OperationDeposit = new I_TR_OperationDeposit();
    //var chargesDetailsModel: Array<I_TR_OperationCharges> = new Array<I_TR_OperationCharges>();
    //var chargesingleModel: I_TR_OperationCharges = new I_TR_OperationCharges();
    //var Model_I_TR_Operation: I_TR_Operation = new I_TR_Operation();
    //var VatTypeData: Array<A_D_VAT_TYPE> = new Array<A_D_VAT_TYPE>();
    //var AddonsData: Array<I_Pur_D_Charges> = new Array<I_Pur_D_Charges>();
    //var Details_Acount: Array<A_ACCOUNT> = new Array<A_ACCOUNT>();
    //DropDownlist
    var ddlStateType;
    var ddlSalesman;
    var ddlCustomerMaster;
    var ddlVendor;
    var ddlUserMaster;
    var id_divGridDetails;
    // giedView
    var divMasterGrid = new JsGrid();
    //Textboxes
    var txtFromDate;
    var txtToDate;
    var txtdateopening;
    var txtDateHeader;
    var txtNationality;
    //buttons 
    var btnPresent;
    var btnClose;
    var btnOpen;
    var btnView_load;
    var btnExpenses;
    var btnShow;
    var btnadd;
    var btnUpdate;
    var btnSave;
    var btnBack;
    //new
    var txtClose_Adjustment;
    var txtClose_SalesManCommition;
    var txtClose_CompanyCommitionPrc;
    var txtTruckNumber;
    var txtPaperPurchaseValue;
    var txtPortName;
    var btnAddDetails;
    var btnAddDetailsCharge;
    var btnAddDetailslebel;
    var searchbutmemreport;
    //flags 
    var CountGrid = -1;
    var CountItems = 0;
    function InitalizeComponent() {
        debugger;
        InitalizeControls();
        IntializeEvents();
        FillddlUserMaster();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
        FillddlFamily();
        GetAllIItem();
    }
    Purchases.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "سجل الفواتير";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Sales Invoices";
        }
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        ddlUserMaster = document.getElementById("ddlUserMaster");
        ddlCustomerMaster = document.getElementById("ddlCustomerMaster");
        searchbutmemreport = document.getElementById("searchbutmemreport");
        btnShow = document.getElementById("btnShow");
        btnUpdate = document.getElementById("btnUpdate");
        btnBack = document.getElementById("btnBack");
        btnSave = document.getElementById("btnSave");
    }
    function IntializeEvents() {
        searchbutmemreport.onkeydown = _SearchBox_Change;
        searchbutmemreport.onkeyup = _SearchBox_Change;
        btnShow.onclick = btnShow_onclick;
        btnUpdate.onclick = Update_onclick;
        btnBack.onclick = btnBack_onclick;
        btnSave.onclick = btnSave_onclick;
    }
    function GetDate() {
        debugger;
        var today = new Date();
        var dd = today.getDate().toString();
        var ReturnedDate;
        var mm = (today.getMonth() + 1).toString();
        var yyyy = today.getFullYear();
        if (Number(dd) < 10) {
            dd = ('0' + dd);
        }
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        ReturnedDate = yyyy + '-' + mm + '-' + dd;
        return ReturnedDate;
    }
    function FillddlUserMaster() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Login", "GetAllUser"),
            data: {},
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    UserDetails = result.Response;
                    debugger;
                    DocumentActions.FillCombowithdefult(UserDetails, ddlUserMaster, "ID_User", "UserName", "اختار البائع");
                }
            }
        });
    }
    function btnShow_onclick() {
        $('#divMasterGridiv').removeClass('display_none');
        $("#rowData").addClass("display_none");
        $("#divTotalSatistics").addClass("display_none");
        Display();
    }
    function Display() {
        debugger;
        var startdt = DateFormatDataBes(txtFromDate.value).toString();
        var enddt = DateFormatDataBes(txtToDate.value).toString();
        var CustomerId = 0;
        var ID_User = 0;
        if (ddlUserMaster.value != "null") {
            ID_User = Number(ddlUserMaster.value.toString());
        }
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("ReviewSales", "GetAll_IQ_IQ_Purchases_Master"),
            data: { startDate: startdt, endDate: enddt, CustomerId: 0, ID_User: ID_User },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Get_IQ_Purchases_Master = result.Response;
                    debugger;
                    for (var i = 0; i < Get_IQ_Purchases_Master.length; i++) {
                        Get_IQ_Purchases_Master[i].Tr_Date = DateFormat(Get_IQ_Purchases_Master[i].Tr_Date);
                    }
                    InitializeGrid();
                    divMasterGrid.DataSource = Get_IQ_Purchases_Master;
                    divMasterGrid.Bind();
                }
            }
        });
    }
    function _SearchBox_Change() {
        //  k//debugger;
        debugger;
        if (searchbutmemreport.value != "") {
            var search_1 = searchbutmemreport.value.toLowerCase();
            SearchDetails = Get_IQ_Purchases_Master.filter(function (x) { return x.TrNo.toString().search(search_1) >= 0 || x.Name_Supplier.toLowerCase().search(search_1) >= 0; } /*|| x.PortName.toLowerCase().search(search) >= 0*/);
            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        }
        else {
            divMasterGrid.DataSource = Get_IQ_Purchases_Master;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        //$("#divMasterGrid").attr("style", "");
        var res = GetResourceList("");
        divMasterGrid.ElementName = "divMasterGrid";
        divMasterGrid.Paging = true;
        divMasterGrid.PageSize = 10;
        divMasterGrid.Sorting = true;
        divMasterGrid.InsertionMode = JsGridInsertionMode.Binding;
        divMasterGrid.Editing = false;
        divMasterGrid.Inserting = false;
        divMasterGrid.SelectedIndex = 1;
        divMasterGrid.OnRowDoubleClicked = MasterGridDoubleClick;
        divMasterGrid.PrimaryKey = "ID_ORDER_Delivery";
        divMasterGrid.Columns = [
            { title: "ID", name: "ID_ORDER_Delivery", type: "text", width: "2%", visible: false },
            { title: "رقم الفاتوره", name: "ID_ORDER_Delivery", type: "text", width: "10%" },
            { title: " التاريخ  ", name: "Date", type: "text", width: "12%" },
            { title: "المورد", name: "EMPLOYEE_NAME", type: "text", width: "20%" },
            { title: "النوع", name: "CUSTOMER_NAME", type: "text", width: "20%" },
            { title: "اجمالي الفاتوره", name: "Total_All", type: "text", width: "16%" },
            { title: " المسداد", name: "Paid_Up", type: "text", width: "17%", css: "classfont" },
            { title: "المطلوب سداده", name: "To_be_Paid", type: "text", width: "17%", css: "classfont" },
            {
                title: "سداد نقدي ", css: "ColumPadding", name: "Paid_Up", width: "14%",
                itemTemplate: function (s, item) {
                    var txt = CreateElement("number", "form-control", " ", " ", "", " ");
                    txt.id = "txtcash";
                    //txt.name = SlsInvoiceListModel.indexOf(item).toString();
                    //SlsInvoiceListModel = Grid.DataSource;
                    txt.style.height = "25px";
                    txt.style.width = "70px";
                    txt.onchange = function (e) {
                        //item.CashPaidAmount = Number(txt.value);
                        //CashTot = 0;
                        //for (let i = 0; i < PurReceiveStatisticsDetails.length; i++) {
                        //    CashTot += PurReceiveStatisticsDetails[i].CashPaidAmount;
                        //}
                        //txtCashTot.value = CashTot.toFixed(2).toString();
                    };
                    txt.value = '0';
                    //    txt.disabled = StatusFlag;
                    //if (item.CashPaidAmount != null) {
                    //    txt.value = item.CashPaidAmount.toString();
                    //}
                    //if (ddlStateType.value != "null") {
                    //    var status = Number(ddlStateType.value.toString());
                    //    if (status == 0) {
                    //        txt.disabled = false;
                    //    }
                    //    else if (status == 2 || status == 1) {
                    //        txt.disabled = true;
                    //    }
                    //}
                    return txt;
                }
            }
        ];
    }
    function MasterGridDoubleClick() {
        Selected_Data = new Array();
        Selected_Data = Get_IQ_Purchases_Master.filter(function (x) { return x.TrNo == Number(divMasterGrid.SelectedKey); });
        $("#rowData").removeClass("display_none");
        $("#divTotalSatistics").removeClass("display_none");
        DisplayData(Selected_Data);
    }
    function DisplayData(Selected_Data) {
        debugger;
        DocumentActions.RenderFromModel(Selected_Data[0]);
        BindGetOperationItemsGridData(Selected_Data[0].TrNo);
    }
    function BindGetOperationItemsGridData(ID_ORDER) {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("ReviewSales", "IQ_ReviewSalesItemInfo"),
            data: { ID_ORDER: ID_ORDER },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AllGetStokMasterDetail = result.Response;
                    $("#div_Data").html('');
                    for (var i = 0; i < AllGetStokMasterDetail.length; i++) {
                        BuildControls(i);
                        Disbly_BuildControls(i, AllGetStokMasterDetail);
                        CountGrid = i;
                    }
                    $("#txtItemCount").val(CountGrid + 1);
                }
            }
        });
    }
    function FillddlFamily() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: {
                CompCode: 1
            },
            success: function (d) {
                //////debugger;
                var result = d;
                if (result.IsSuccess) {
                    FamilyDetails = result.Response;
                }
            }
        });
    }
    function GetAllIItem() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Items", "GetAll"),
            data: {
                CompCode: 1
            },
            success: function (d) {
                ////////debugger;
                var result = d;
                if (result.IsSuccess) {
                    ItemFamilyDetails = result.Response;
                }
            }
        });
    }
    function FillddlItems(ItemFamilyID) {
        debugger;
        ItemBaesdFamilyDetails = ItemFamilyDetails.filter(function (x) { return x.ID_CAT == ItemFamilyID; });
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("StkDefItems", "GetAll"),//(int CompCode,int ItemFamilyID,int storeCode, string UserCode, string Token)
        //    data: {
        //        CompCode: compcode, ItemFamilyID: ItemFamilyID, storeCode: storeCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
        //    },
        //    success: (d) => {
        //        //////debugger;
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            ItemBaesdFamilyDetails = result.Response as Array<PRODUCT>;
        //        }
        //    }
        //});
    }
    function BuildControls(cnt) {
        var html;
        html = '<div id= "No_Row' + cnt + '" class="container-fluid style_border" > <div class="" > <div class="col-lg-12" > ' +
            '<div class="col-lg-1"style="left: -4%!important;">' +
            '<span id="btn_minus' + cnt + '" class="fa fa-minus-circle fontitm3 display_none" style="font-size: 28px;"></span></div>' +
            '<div class="col-lg-2"style="left:1%!important">' +
            '<select id="ddlFamily' + cnt + '" class="form-control" disabled  ><option value="null">اختر</option></select></div>' +
            '<div class="col-lg-2"style="left: 1%;">' +
            '<select id="ddlItem' + cnt + '" class="form-control" disabled  ><option  value="null">اختر</option></select></div>' +
            '<div class="col-lg-2" style=""><input id="txtPrice' + cnt + '" type="number" disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style=""><input id="txtQuantity' + cnt + '" type="number" disabled class="form-control right2"   value="0"/></div>' +
            '<div class="col-lg-1" style=""><input id="txtReturn' + cnt + '" type="number" disabled class="form-control right2"   value=""/></div>' +
            '<div class="col-lg-2" style=""><input id="txtTotal' + cnt + '" type="number" disabled class="form-control right2"   value="0"/></div>' +
            '</div></div></div>' +
            '<input id="txt_StatusFlag' + cnt + '" name = " " type = "hidden" class="form-control"/><input id="txt_ID' + cnt + '" name = " " type = "hidden" class="form-control" /><input id="PRODUCT_ID' + cnt + '" name = " " type = "hidden" class="form-control" />';
        $("#div_Data").append(html);
        debugger;
        $('.btn-number1' + cnt).click(function (e) {
            e.preventDefault();
            var fieldName = $(this).attr('data-field');
            var type = $(this).attr('data-type');
            var input = $("input[name='" + fieldName + "']");
            var currentVal = parseFloat(input.val());
            if (!isNaN(currentVal)) {
                if (type == 'minus') {
                    if (currentVal > Number(input.attr('min'))) {
                        input.val((currentVal - 1)).change();
                    }
                    if (parseFloat(input.val()) == Number(input.attr('min'))) {
                        $(this).val(input.attr('min'));
                    }
                }
                else if (type == 'plus') {
                    if (currentVal < Number(input.attr('max'))) {
                        input.val((currentVal + 1)).change();
                    }
                    if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
                        $(this).val(input.attr('max'));
                    }
                }
            }
            else {
                input.val(1);
            }
        });
        $('.input-number1' + cnt).focusin(function () {
            $(this).data('oldValue', $(this).val());
        });
        $('.input-number1' + cnt).change(function () {
            var minValue = parseInt($(this).attr('min'));
            var maxValue = parseInt($(this).attr('max'));
            var valueCurrent = parseInt($(this).val());
            var name = $(this).attr('name');
            if (valueCurrent >= minValue) {
                $(".btn-number1[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
            }
            else {
                alert('Sorry, the minimum value was reached');
                $(this).val($(this).data('oldValue'));
            }
            if (valueCurrent <= maxValue) {
                $(".btn-number1[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
            }
            else {
                alert('Sorry, the maximum value was reached');
                $(this).val($(this).data('oldValue'));
            }
        });
        $('.input-number1' + cnt).keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        //script
        //script
        $('.btn-number2' + cnt).click(function (e) {
            e.preventDefault();
            var fieldName = $(this).attr('data-field');
            var type = $(this).attr('data-type');
            var input = $("input[name='" + fieldName + "']");
            var currentVal = parseFloat(input.val());
            if (!isNaN(currentVal)) {
                if (type == 'minus') {
                    if (currentVal > Number(input.attr('min'))) {
                        input.val((currentVal - 1)).change();
                    }
                    if (parseFloat(input.val()) == Number(input.attr('min'))) {
                        $(this).val(input.attr('min'));
                    }
                }
                else if (type == 'plus') {
                    if (currentVal < Number(input.attr('max'))) {
                        input.val((currentVal + 1)).change();
                    }
                    if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
                        $(this).val(input.attr('max'));
                    }
                }
            }
            else {
                input.val(1);
            }
        });
        $('.input-number2' + cnt).focusin(function () {
            $(this).data('oldValue', $(this).val());
        });
        $('.input-number2' + cnt).change(function () {
            var minValue = parseInt($(this).attr('min'));
            var maxValue = parseInt($(this).attr('max'));
            var valueCurrent = parseInt($(this).val());
            var name = $(this).attr('name');
            if (valueCurrent >= minValue) {
                $(".btn-number2[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
            }
            else {
                alert('Sorry, the minimum value was reached');
                $(this).val($(this).data('oldValue'));
            }
            if (valueCurrent <= maxValue) {
                $(".btn-number2[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
            }
            else {
                alert('Sorry, the maximum value was reached');
                $(this).val($(this).data('oldValue'));
            }
        });
        $('.input-number2' + cnt).keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        //script
        //fill dropdownlist
        debugger;
        var drop = '#ddlFamily' + cnt;
        $('#ddlFamily' + cnt).empty();
        $('#ddlFamily' + cnt).append('<option value="' + null + '">' + "اختر النوع" + '</option>');
        for (var i = 0; i < FamilyDetails.length; i++) {
            $('#ddlFamily' + cnt).append('<option value="' + FamilyDetails[i].ID_CAT + '">' + FamilyDetails[i].Name_CAT + '</option>');
        }
        $('#ddlFamily' + cnt).change(function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            debugger;
            if ($('#ddlFamily' + cnt).val() != "null") {
                $('#ddlItem' + cnt).empty();
                $('#ddlItem' + cnt).append('<option value="' + null + '">' + "اختر الصنف" + '</option>');
                FillddlItems(Number($('#ddlFamily' + cnt).val()));
                for (var i = 0; i < ItemBaesdFamilyDetails.length; i++) {
                    $('#ddlItem' + cnt).append('<option data-PRODUCT_PRICE="' + ItemBaesdFamilyDetails[i].PRODUCT_PRICE + '"  data-MinUnitPrice="' + ItemBaesdFamilyDetails[i].MinUnitPrice + '" data-OnhandQty="' + ItemBaesdFamilyDetails[i].PRODUCT_QET + '" value="' + ItemBaesdFamilyDetails[i].PRODUCT_ID + '">' + ItemBaesdFamilyDetails[i].PRODUCT_NAME + '</option>');
                }
            }
            else {
                alert("يجب اختيار النوع");
                $('#ddlFamily' + cnt).val("null");
            }
            $("#txtQuantity" + cnt).val('0');
            $("#txtPrice" + cnt).val('0');
            $("#txtTotal" + cnt).val('0');
            ComputeTotals();
        });
        var dropddlItem = '#ddlItem' + cnt;
        $('#ddlItem' + cnt).change(function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            if ($('#ddlItem' + cnt).val() == "null") {
                $("#txtQuantity" + cnt).val("1");
                $("#txtPrice" + cnt).val("1");
                $("#txtTotal" + cnt).val("0");
                $("#txtTax" + cnt).val("0");
                $("#txtTotAfterTax" + cnt).val("0");
            }
            else {
                var selectedItem = $(dropddlItem + ' option:selected').attr('value');
                var selectedFamily = $(drop + ' option:selected').attr('value');
                var itemID = Number(selectedItem);
                var FamilyID = Number(selectedFamily);
                // var NumberSelect = ItemBaesdFamilyDetails.filter(s => s.ItemID == itemID);
                debugger;
                var res = false;
                res = checkRepeatedItems(itemID, FamilyID);
                if (res == true) {
                    $("#ddlItem" + cnt).val("null");
                    $("#txtPrice" + cnt).val("1");
                    MessageBox.Show('( لايمكن تكرار نفس الاصناف علي الفاتورة )', '(Error)');
                }
                else {
                    var Price = $('option:selected', $("#ddlItem" + cnt)).attr('data-PRODUCT_PRICE');
                    $("#txtQuantity" + cnt).val(1);
                    $("#txtPrice" + cnt).val(Price);
                    var txtQuantityValue = $("#txtQuantity" + cnt).val();
                    var txtPriceValue = $("#txtPrice" + cnt).val();
                    if ($("#txtPrice" + cnt).val() == 0) {
                        var total = Number(txtQuantityValue) * 1;
                        $("#txtTotal" + cnt).val(total);
                    }
                    else {
                        var total = Number(txtQuantityValue) * Number(txtPriceValue);
                        $("#txtTotal" + cnt).val(total);
                    }
                }
            }
            ComputeTotals();
            //
        });
        // text change
        $("#txtQuantity" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtPrice" + cnt).val();
            if ($("#txtPrice" + cnt).val() != 0) {
                var total = (Number(txtQuantityValue) * Number(txtPriceValue)) /* - (Number(txtQuantityReturnValue) *0)*/;
                $("#txtTotal" + cnt).val(total);
            }
            $("#txtAvailableQty" + cnt).val(Number($("#txtQuantity" + cnt).val()) - Number($("#txtSoldQty" + cnt).val()) - Number($("#txtScrapQty" + cnt).val()));
            if (Number($("#txtQuantity" + cnt).val()) < 0) {
                $("#txtQuantity" + cnt).val('0');
            }
            ComputeTotals();
        });
        $("#txtPrice" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            var txtQuantityValue = $("#txtQuantity" + cnt).val();
            var txtPriceValue = $("#txtPrice" + cnt).val();
            if ($("#txtPrice" + cnt).val() != 0) {
                var total = (Number(txtQuantityValue) * Number(txtPriceValue)) /* - (Number(txtQuantityReturnValue) *0)*/;
                $("#txtTotal" + cnt).val(total);
            }
            if (Number($("#txtPrice" + cnt).val()) < 0) {
                $("#txtPrice" + cnt).val('0');
            }
            $("#txtAvailableQty" + cnt).val(Number($("#txtQuantity" + cnt).val()) - Number($("#txtSoldQty" + cnt).val()) - Number($("#txtScrapQty" + cnt).val()));
            //$("#txtMinPrice" + cnt).val($("#txtPrice" + cnt).val() - 1);
            ComputeTotals();
        });
        $("#txtReturn" + cnt).on('keyup', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            var Return = $("#txtReturn" + cnt).val();
            var txtQuantityValue = $("#txtQuantity" + cnt).attr("Quantity");
            if (Number(Return) < 0) {
                $("#txtReturn" + cnt).val(0);
                $("#txtQuantity" + cnt).val($("#txtQuantity" + cnt).attr("Quantity"));
                txtQuantityValue = $("#txtQuantity" + cnt).val();
                var txtPriceValue = $("#txtPrice" + cnt).val();
                if ($("#txtPrice" + cnt).val() != 0) {
                    var total = (Number(txtQuantityValue) * Number(txtPriceValue)) /* - (Number(txtQuantityReturnValue) *0)*/;
                    $("#txtTotal" + cnt).val(total);
                }
                if (Number($("#txtPrice" + cnt).val()) < 0) {
                    $("#txtPrice" + cnt).val('0');
                }
            }
            if (Number(Return) > Number(txtQuantityValue)) {
                $("#txtReturn" + cnt).val($("#txtQuantity" + cnt).attr("Quantity"));
                $("#txtQuantity" + cnt).val(0);
                txtQuantityValue = $("#txtQuantity" + cnt).val();
                var txtPriceValue = $("#txtPrice" + cnt).val();
                if ($("#txtPrice" + cnt).val() != 0) {
                    var total = (Number(txtQuantityValue) * Number(txtPriceValue)) /* - (Number(txtQuantityReturnValue) *0)*/;
                    $("#txtTotal" + cnt).val(total);
                }
                if (Number($("#txtPrice" + cnt).val()) < 0) {
                    $("#txtPrice" + cnt).val('0');
                }
            }
            else {
                Return = $("#txtReturn" + cnt).val();
                txtQuantityValue = $("#txtQuantity" + cnt).attr("Quantity");
                $("#txtQuantity" + cnt).val(Number(txtQuantityValue) - Number(Return));
                txtQuantityValue = $("#txtQuantity" + cnt).val();
                if (Number(txtQuantityValue) <= 0) {
                    $("#txt_StatusFlag" + cnt).val("d");
                }
                else {
                    $("#txt_StatusFlag" + cnt).val("u");
                }
                var txtPriceValue = $("#txtPrice" + cnt).val();
                if ($("#txtPrice" + cnt).val() != 0) {
                    var total = (Number(txtQuantityValue) * Number(txtPriceValue)) /* - (Number(txtQuantityReturnValue) *0)*/;
                    $("#txtTotal" + cnt).val(total);
                }
                if (Number($("#txtPrice" + cnt).val()) < 0) {
                    $("#txtPrice" + cnt).val('0');
                }
            }
            if ($("#txtReturn" + cnt).val() == 0 || $("#txtReturn" + cnt).val() == '') {
                $("#txt_StatusFlag" + cnt).val("");
            }
            if ($("#txtQuantity" + cnt).val() == 0 || $("#txtQuantity" + cnt).val() == '') {
                $("#txt_StatusFlag" + cnt).val("d");
            }
            ComputeTotals();
        });
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        return;
    }
    function Disbly_BuildControls(cnt, AllGetStokItemInfo) {
        debugger;
        $("#btnAddDetails").addClass("display_none");
        $("#btn_minus" + cnt).addClass("display_none");
        $("#txt_StatusFlag" + cnt).val("");
        var FamilyID = Number(AllGetStokItemInfo[cnt].ID_CAT);
        $("#ddlFamily" + cnt).prop("value", FamilyID);
        FillddlItems(Number($('#ddlFamily' + cnt).val()));
        for (var i = 0; i < ItemBaesdFamilyDetails.length; i++) {
            $('#ddlItem' + cnt).append('<option data-PRODUCT_PRICE="' + ItemBaesdFamilyDetails[i].PRODUCT_PRICE + '" data-MinUnitPrice="' + ItemBaesdFamilyDetails[i].MinUnitPrice + '" data-OnhandQty="' + ItemBaesdFamilyDetails[i].PRODUCT_QET + '" value="' + ItemBaesdFamilyDetails[i].PRODUCT_ID + '">' + ItemBaesdFamilyDetails[i].PRODUCT_NAME + '</option>');
        }
        var itemcode = AllGetStokItemInfo[cnt].PRODUCT_ID;
        $("#txt_ID" + cnt).prop("value", AllGetStokItemInfo[cnt].ID_DELIVERY);
        $("#ddlItem" + cnt).prop("value", itemcode.toString());
        $('#PRODUCT_ID' + cnt).val(AllGetStokItemInfo[cnt].PRODUCT_ID);
        $("#txtQuantity" + cnt).prop("value", ((AllGetStokItemInfo[cnt].Quantity_sell == null || undefined) ? 0 : AllGetStokItemInfo[cnt].Quantity_sell));
        $("#txtQuantity" + cnt).attr("Quantity", ((AllGetStokItemInfo[cnt].Quantity_sell == null || undefined) ? 0 : AllGetStokItemInfo[cnt].Quantity_sell));
        $("#txtPrice" + cnt).prop("value", (AllGetStokItemInfo[cnt].price_One_part == null || undefined) ? 0 : AllGetStokItemInfo[cnt].price_One_part.toFixed(2));
        var Total = (Number(AllGetStokItemInfo[cnt].Quantity_sell) * Number(AllGetStokItemInfo[cnt].price_One_part));
        $("#txtTotal" + cnt).prop("value", (Total).toFixed(2));
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
    }
    function AddNewRow() {
        debugger;
        if (!SysSession.CurrentPrivileges.AddNew)
            return;
        var CanAdd = true;
        if (CountGrid > -1) {
            for (var i = 0; i <= CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            CountGrid += 1;
            CountItems = CountItems + 1;
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            $("#txtFamilyType").val(CountItems); //In Insert mode
            $("#ddlFamily" + CountGrid).removeAttr("disabled");
            $("#ddlItem" + CountGrid).removeAttr("disabled");
            $("#txtQuantity" + CountGrid).removeAttr("disabled");
            $("#txtPrice" + CountGrid).removeAttr("disabled");
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
        }
    }
    function DeleteRow(RecNo) {
        if (!SysSession.CurrentPrivileges.Remove)
            return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            //////debugger;
            $("#txt_StatusFlag" + RecNo).val("d");
            CountItems = CountItems - 1;
            ComputeTotals();
            $("#ddlFamily" + RecNo).val("1");
            $("#ddlItem" + RecNo).val("2");
            $("#txtQuantity" + RecNo).val("1");
            $("#txtPrice" + RecNo).val("1");
            $("#txtQuantityReturnValue" + RecNo).val("0");
            $("#txtAddons" + RecNo).val("0");
            $("#txtTotAddons" + RecNo).val("0");
            $("#txtTax" + RecNo).val("0");
            $("#No_Row" + RecNo).attr("hidden", "true");
            $("#txtCode" + RecNo).val("000");
        });
    }
    function checkRepeatedItems(itemValue, familyValue) {
        debugger;
        var items = Number(CountGrid); //Error
        var flag = false;
        for (var i = 0; i < items; i++) {
            if (Number($("#ddlItem" + i).val()) == itemValue && Number($("#ddlFamily" + i).val()) == familyValue) {
                flag = true;
            }
        }
        return flag;
    }
    function ComputeTotals() {
        var CountTotal = 0;
        for (var i = 0; i < CountGrid + 1; i++) {
            var flagvalue = $("#txt_StatusFlag" + i).val();
            if (flagvalue != "d") {
                CountTotal += Number($("#txtTotal" + i).val());
                CountTotal = Number(CountTotal.toFixed(2).toString());
            }
        }
        $("#txtItemCount").val(CountGrid + 1);
        $("#txtTotal").val(CountTotal);
    }
    function Validation_Grid(rowcount) {
        //else
        debugger;
        if ($("#ddlFamily" + rowcount).val() == "النوع" && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال النوع", "خطأ");
            return false;
        }
        else if (($("#ddlItem" + rowcount).val() == "null" || $("#ddlItem" + rowcount).val() == "الصنف") && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال الصنف", "خطأ");
            return false;
        }
        else if (($("#txtQuantity" + rowcount).val() == "" || $("#txtQuantity" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال الكمية", "خطأ");
            return false;
        }
        else if (($("#txtPrice" + rowcount).val() == "" || $("#txtPrice" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {
            MessageBox.Show(" برجاءادخال السعر", "خطأ");
            return false;
        }
        return true;
    }
    ////-----------------------------------------------------------------------------------------------------------------------
    ////----------------------------------------------------- Div_items-------------------------------------------------------
    function Assign() {
        debugger;
        SlsMasterDetils = new SlsMasterDetails();
        var StatusFlag;
        SlsMasterDetils.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        SlsMasterDetils.UserCode = SysSession.CurrentEnvironment.UserCode;
        for (var i = 0; i <= CountGrid + 1; i++) {
            OperationItemSingleModel = new Stok_ORDER_DELIVERY();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            $("#txt_StatusFlag" + i).val("");
            if (StatusFlag == "i") {
            }
            if (StatusFlag == "u") {
                var OperationItemID = $("#txt_ID" + i).val();
                OperationItemSingleModel.StatusFlag = StatusFlag.toString();
                OperationItemSingleModel.ID_DELIVERY = OperationItemID;
                OperationItemSingleModel.Name_Product_sell = $("#ddlItem" + i + " option:selected").text();
                OperationItemSingleModel.PRODUCT_ID = $('#PRODUCT_ID' + i).val();
                OperationItemSingleModel.price_One_part = $("#txtPrice" + i).val();
                OperationItemSingleModel.Quantity_sell = $('#txtQuantity' + i).val();
                OperationItemSingleModel.Total_Price_One_Part = $("#txtTotal" + i).val();
                OperationItemSingleModel.UserCode = SysSession.CurrentEnvironment.UserCode;
                OperationItemSingleModel.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
                SlsMasterDetils.I_Sls_TR_InvoiceItems.push(OperationItemSingleModel);
            }
            if (StatusFlag == "d") {
                if ($("#ReciveDetailsID" + i).val() != "") {
                    var OperationItemID = $("#txt_ID" + i).val();
                    OperationItemSingleModel.StatusFlag = StatusFlag.toString();
                    OperationItemSingleModel.ID_DELIVERY = OperationItemID;
                    OperationItemSingleModel.PRODUCT_ID = $('#PRODUCT_ID' + i).val();
                    OperationItemSingleModel.UserCode = SysSession.CurrentEnvironment.UserCode;
                    OperationItemSingleModel.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
                    SlsMasterDetils.I_Sls_TR_InvoiceItems.push(OperationItemSingleModel);
                }
            }
        }
        SlsMasterDetils.I_Sls_TR_Invoice.Total_All = $('#txtTotal').val();
        SlsMasterDetils.I_Sls_TR_Invoice.ID_ORDER_Delivery = $('#txtNumber').val();
    }
    function Update() {
        debugger;
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("ReviewSales", "Insert_Processes"),
            data: JSON.stringify(SlsMasterDetils),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    MessageBox.Show("تم المرتجع بنجاح", "تم");
                    $("#DivHederMaster").removeClass("disabledDiv");
                    btnUpdate.classList.remove("display_none");
                    btnSave.classList.add("display_none");
                    btnBack.classList.add("display_none");
                    Display();
                    Selected_Data = new Array();
                    Selected_Data = Get_IQ_Purchases_Master.filter(function (x) { return x.TrNo == SlsMasterDetils.I_Sls_TR_Invoice.ID_ORDER_Delivery; });
                    if (Selected_Data.length == 0) {
                        $("#rowData").addClass("display_none");
                        $("#divTotalSatistics").addClass("display_none");
                    }
                    else {
                        $("#rowData").removeClass("display_none");
                        $("#divTotalSatistics").removeClass("display_none");
                        DisplayData(Selected_Data);
                    }
                }
                else {
                    MessageBox.Show("خطأء", "خطأء");
                }
            }
        });
    }
    ////-----------------------------------------------------------------------------------------------------------------------
    ////-------------------------------------------------------button---Save and Back and Eidt--------------------------------------
    function Update_onclick() {
        btnUpdate.classList.add("display_none");
        btnSave.classList.remove("display_none");
        btnBack.classList.remove("display_none");
        $("#DivShow").removeClass("disabledDiv");
        //$("#DivHederMaster").attr("disabled", "disabled").off('click');
        $("#DivHederMaster").addClass("disabledDiv");
        $(".fontitm3").removeClass("display_none");
        remove_disabled_Grid_Controls();
    }
    function btnBack_onclick() {
        $("#DivHederMaster").removeClass("disabledDiv");
        $("#btnAddDetails").addClass("display_none");
        btnUpdate.classList.remove("display_none");
        btnSave.classList.add("display_none");
        btnBack.classList.add("display_none");
        $("#div_Data").html('');
        CountGrid = -1;
        for (var i = 0; i < AllGetStokMasterDetail.length; i++) {
            BuildControls(i);
            Disbly_BuildControls(i, AllGetStokMasterDetail);
            CountGrid = i;
        }
        ComputeTotals();
    }
    function btnSave_onclick() {
        //alert('ok');
        debugger;
        Assign();
        Update();
    }
    function remove_disabled_Grid_Controls() {
        for (var i = 0; i < CountGrid + 1; i++) {
            //$("#ddlFamily" + i).removeAttr("disabled");
            //$("#ddlItem" + i).removeAttr("disabled");
            //$("#txtQuantity" + i).removeAttr("disabled");
            //$("#txtPrice" + i).removeAttr("disabled");
            $("#txtReturn" + i).removeAttr("disabled");
        }
    }
    function disabled_Grid_Controls() {
        for (var i = 0; i < CountGrid + 1; i++) {
            $("#ddlFamily" + i).attr("disabled", "disabled");
            $("#ddlItem" + i).attr("disabled", "disabled");
            $("#txtQuantity" + i).attr("disabled", "disabled");
            $("#txtPrice" + i).attr("disabled", "disabled");
            $("#txtMinPrice" + i).attr("disabled", "disabled");
            $("#txtScrapQty" + i).attr("disabled", "disabled");
        }
    }
})(Purchases || (Purchases = {}));
//# sourceMappingURL=Purchases.js.map