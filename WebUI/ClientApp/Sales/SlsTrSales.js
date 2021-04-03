/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
$(document).ready(function () {
    SlsTrSales.InitalizeComponent();
});
var SlsTrSales;
(function (SlsTrSales) {
    ////system varables
    var SysSession = GetSystemSession();
    var sys = new SystemTools();
    var FamilyDetails = new Array();
    ////debugger
    //var compcode: Number;
    //var vatType: number;
    //// var IControl: I_Control = new I_Control();
    //// Arrays
    //var CustDetails: Array<A_Rec_D_Customer> = new Array<A_Rec_D_Customer>();
    //var SalesmanDetails: Array<I_Sls_D_Salesman> = new Array<I_Sls_D_Salesman>();//
    //var CashDetailsAr: Array<string> = new Array<string>();
    //var CashDetailsEn: Array<string> = new Array<string>();
    //var CashboxDetails: Array<A_RecPay_D_CashBox> = new Array<A_RecPay_D_CashBox>();
    //var CategoryDetails: Array<I_D_Category> = new Array<I_D_Category>();
    //var storeDetails: Array<G_STORE> = new Array<G_STORE>();
    //var ItemDetails: Array<IQ_GetItemStoreInfo> = new Array<IQ_GetItemStoreInfo>();
    //var ItemDetails_New: Array<IQ_GetItemStoreInfo_New> = new Array<IQ_GetItemStoreInfo_New>();
    //var Item: I_Item = new I_Item();
    //var InvoiceStatisticDetails: Array<IQ_GetSlsInvoiceStatistic> = new Array<IQ_GetSlsInvoiceStatistic>();
    //var AD_VatTypeDetails: A_D_VAT_TYPE = new A_D_VAT_TYPE();
    ////Models
    //var MasterDetailModel: SlsInvoiceMasterDetails = new SlsInvoiceMasterDetails();
    //var InvoiceModel: I_Sls_TR_Invoice = new I_Sls_TR_Invoice();
    //var invoiceItemsModel: Array<I_Sls_TR_InvoiceItems> = new Array<I_Sls_TR_InvoiceItems>();
    //var invoiceItemSingleModel: I_Sls_TR_InvoiceItems = new I_Sls_TR_InvoiceItems();
    //// dropdownlists
    //var ddlCustomer: HTMLSelectElement;
    //var ddlSalesman: HTMLSelectElement;
    //var ddlCashType: HTMLSelectElement;
    //var ddlCashBox: HTMLSelectElement;
    //var ddlStore: HTMLSelectElement;
    ////buttons
    //var btnAddDetails: HTMLButtonElement;
    //var btnAdd: HTMLButtonElement;
    //var btnPrntPrice: HTMLButtonElement;
    //var btnPrint: HTMLButtonElement;
    //var btnSave: HTMLButtonElement;
    //var btnBack: HTMLButtonElement;
    ////Textboxes
    //var txtDate: HTMLInputElement;
    //var txtItemCount: HTMLInputElement;
    //var txtPackageCount: HTMLInputElement;
    //var txtTotal: HTMLInputElement;
    //var txtTax: HTMLInputElement;
    //var txtNet: HTMLInputElement;
    //var txtCommission: HTMLInputElement;
    //var txtCustomerName: HTMLInputElement;
    //var txtCustomerMobile: HTMLInputElement;
    //var txt_ApprovePass: HTMLInputElement;
    ////checkbox
    //var chkActive: HTMLInputElement;
    ////labels
    //var lblInvoiceNumber: HTMLLabelElement;
    //var lblMessage: HTMLLabelElement;
    ////global
    //var CountGrid = 0;
    //var CountItems: number = 0;
    //var PackageCount: number = 0;
    //var CountTotal: number = 0;
    //var TaxCount: number = 0;
    //var NetCount: number = 0;
    //var TypeFlag: boolean = false;
    //var storeID = 1;
    //var ddlType_change;
    //var VatPrc;
    //var invoiceID;
    //var Rersour;
    //var html;
    ////----------------------------------------------------------------Eslam------------
    //var Men_Sales_1: HTMLDivElement;
    //var Men_Sales_2: HTMLDivElement;
    //var btnChanege_1: HTMLButtonElement;
    //var btnChanege_2: HTMLButtonElement;
    //var btn_Add_Basket: HTMLButtonElement;
    //var btn_Edit_Basket: HTMLButtonElement;
    //var btn_Approveprice: HTMLButtonElement;
    //var btn_Exit_Approveprice: HTMLButtonElement;
    //var P = 0;
    //var ItemID;
    //var PRODUCT_price;
    //var PRODUCT_NAME = "Null";
    //var ItemFamilyID;
    //var IDPlus = 0;
    //var CatPlus = 0;
    //var zoom_select = 2.4;
    //var scro = 0;
    //var CChat: HTMLSpanElement;
    //var Total_Basket: HTMLSpanElement;
    //var ID_input = null;
    //var btn_cancel_Popu: HTMLButtonElement;
    //var btnminus_Quantity: HTMLButtonElement;
    //var btnplus_Quantity: HTMLButtonElement;
    //var btnminus_price: HTMLButtonElement;
    //var btnplus_price: HTMLButtonElement;
    //var All_item: HTMLButtonElement;
    //var Finsh_Order: HTMLButtonElement;
    //var Category_NAME;
    //var CatID;
    //var Num_Item;
    //var x;
    //var chat;
    //var Qet_X = 0;
    //var fouse;
    //var txtPrice: HTMLInputElement;
    //var txtTotal_Price: HTMLInputElement;
    //var txtTotAfterTax_Popu: HTMLInputElement;
    //var txtQuantity: HTMLInputElement;
    //var Qet_Product = 0;
    //var Name_Product;
    //var OnhandQty;
    //var MinUnitPrice;
    //var ValidationMinUnitPrice = 0;
    //var Validation_Insert = 0;
    //var price_Product = 0;
    //var price_One_Product = 0;
    //var Num_paragraph;
    //var New_ItemFamilyID;
    //var storeCode;
    //var Num_Add_List = 0;
    //var List: Array<I_Sls_TR_InvoiceItems> = new Array<I_Sls_TR_InvoiceItems>();
    //var List_MinUnitPrice: Array<I_Sls_TR_InvoiceItems> = new Array<I_Sls_TR_InvoiceItems>();
    //var Model: I_Sls_TR_InvoiceItems = new I_Sls_TR_InvoiceItems();
    //var ItemDetails_New: Array<IQ_GetItemStoreInfo_New> = new Array<IQ_GetItemStoreInfo_New>();
    //var Selecteditem: Array<IQ_GetItemStoreInfo_New> = new Array<IQ_GetItemStoreInfo_New>();
    //var div_menu = document.getElementById('thing');
    //var theThing = document.querySelector("#thing");
    //var container: HTMLDivElement = document.querySelector("#contentContainer") as HTMLDivElement;
    //var num_item_IN_Menu = 0;
    //var txtCommission_Basket: HTMLInputElement;
    ////----------------------------------------------------------------Eslam------------
    var class_input;
    var PRODUCT_NAME;
    var ItemFamilyID;
    var IDPlus = 0;
    function InitalizeComponent() {
        debugger;
        $('#cont').toggleClass('colapsdivcont');
        //$("body").toggleClass("mini-navbar");
        $('#sidebar').toggleClass('active');
        //Display_Category();
        Display_But();
    }
    SlsTrSales.InitalizeComponent = InitalizeComponent;
    //function InitalizeControls() {
    //    if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
    //        document.getElementById('Screen_name').innerHTML = "فواتير المبيعات";
    //    }
    //    else {
    //        document.getElementById('Screen_name').innerHTML = "Sales Invoices";
    //    }
    //    // Drop down lists
    //    ddlCustomer = document.getElementById("ddlCustomer") as HTMLSelectElement;
    //    ddlSalesman = document.getElementById("ddlSalesman") as HTMLSelectElement;
    //    ddlCashType = document.getElementById("ddlCashType") as HTMLSelectElement;
    //    ddlCashBox = document.getElementById("ddlCashBox") as HTMLSelectElement;//
    //    ddlStore = document.getElementById("ddlStore") as HTMLSelectElement;//
    //    //Buttons
    //    btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
    //    btnSave = document.getElementById("btnSave") as HTMLButtonElement;
    //    btnBack = document.getElementById("btnBack") as HTMLButtonElement;
    //    btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
    //    btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
    //    btnPrntPrice = document.getElementById("btnPrntPrice") as HTMLButtonElement;
    //    btn_Approveprice = document.getElementById("btn_Approveprice") as HTMLButtonElement;
    //    //textboxes
    //    txtDate = document.getElementById("txtDate") as HTMLInputElement;
    //    txtItemCount = document.getElementById("txtItemCount") as HTMLInputElement;
    //    txtPackageCount = document.getElementById("txtPackageCount") as HTMLInputElement;
    //    txtTotal = document.getElementById("txtTotal") as HTMLInputElement;
    //    txtTax = document.getElementById("txtTax") as HTMLInputElement;
    //    txtNet = document.getElementById("txtNet") as HTMLInputElement;
    //    txtCommission = document.getElementById("txtCommission") as HTMLInputElement;
    //    txtCustomerName = document.getElementById("txtCustomerName") as HTMLInputElement;
    //    txtCustomerMobile = document.getElementById("txtCustomerMobile") as HTMLInputElement;
    //    txt_ApprovePass = document.getElementById("txt_ApprovePass") as HTMLInputElement;
    //    //checkbox
    //    chkActive = document.getElementById("chkActive") as HTMLInputElement;
    //    //lables
    //    lblInvoiceNumber = document.getElementById("lblInvoiceNumber") as HTMLLabelElement;
    //    lblMessage = document.getElementById("lblMessage") as HTMLLabelElement;
    //    //------------------------------------------------------------------Eslam---------------------------
    //    btnChanege_1 = document.getElementById("btnChanege_1") as HTMLButtonElement;
    //    btnChanege_2 = document.getElementById("btnChanege_2") as HTMLButtonElement;
    //    btn_Add_Basket = document.getElementById("btn_Add_Basket") as HTMLButtonElement;
    //    btn_Edit_Basket = document.getElementById("btn_Edit_Basket") as HTMLButtonElement;
    //    btn_cancel_Popu = document.getElementById("btn_cancel_Popu") as HTMLButtonElement;
    //    Finsh_Order = document.getElementById("Finsh_Order") as HTMLButtonElement;
    //    btn_Exit_Approveprice = document.getElementById("btn_Exit_Approveprice") as HTMLButtonElement;
    //    Men_Sales_1 = document.getElementById("Men_Sales_1") as HTMLDivElement;
    //    Men_Sales_2 = document.getElementById("Men_Sales_2") as HTMLDivElement;
    //    btnminus_Quantity = document.getElementById("btnminus_Quantity") as HTMLButtonElement;
    //    btnplus_Quantity = document.getElementById("btnplus_Quantity") as HTMLButtonElement;
    //    btnminus_price = document.getElementById("btnminus_price") as HTMLButtonElement;
    //    btnplus_price = document.getElementById("btnplus_price") as HTMLButtonElement;
    //    All_item = document.getElementById("All_item") as HTMLButtonElement;
    //    CChat = document.getElementById("CChat") as HTMLSpanElement;
    //    Total_Basket = document.getElementById("Total_Basket") as HTMLSpanElement;
    //    Num_Item = document.getElementById('Num_Item');
    //    x = document.getElementById("x");
    //    chat = document.getElementById("chat");
    //    fouse = document.getElementById("fouse");
    //    txtPrice = document.getElementById('txtPrice') as HTMLInputElement;
    //    txtQuantity = document.getElementById('txtQuantity') as HTMLInputElement;
    //    txtTotal_Price = document.getElementById('txtTotal_Popu') as HTMLInputElement;
    //    txtTotAfterTax_Popu = document.getElementById('txtTotAfterTax_Popu') as HTMLInputElement;
    //    txtCommission_Basket = document.getElementById('txtCommission_Basket') as HTMLInputElement;
    //    //------------------------------------------------------------------Eslam---------------------------
    //}
    //function InitializeEvents() {
    //    btnSave.onclick = btnSave_onClick;
    //    btnAddDetails.onclick = AddNewRow;
    //    ddlCashType.onchange = ddlCashType_onchange;
    //    btnAdd.onclick = clear;
    //    chkActive.onclick = chkActive_CheckPrivilege;
    //    ddlCustomer.onchange = ddlCustomer_onchange;
    //    txtCommission.onchange = txtCommission_onchange;
    //    //  btnSave.onclick = ;
    //    //btnShow.onclick = btnShow_onclick;
    //    //btnEdit.onclick = btnEdit_onclick;
    //    btnBack.onclick = btnback_onclick;
    //    //-------------------------------------------------------------Eslam------------
    //    btnChanege_1.onclick = btnChanege_onclick;
    //    btnChanege_2.onclick = btnChanege_onclick;
    //    btn_cancel_Popu.onclick = cancel_Popu_onclick;
    //    Finsh_Order.onclick = Finsh_Order_onclick;
    //    btn_Approveprice.onclick = btn_Approveprice_onclick;
    //    btn_Exit_Approveprice.onclick = btn_Exit_Approveprice_onclick;
    //    //-------------------------------------------------------------Eslam------------
    //}
    ////------------------------------------------------------------EslamMamdouh-------------------------------------------------
    //function btnChanege_onclick() {
    //    ////debugger
    //    if (Men_Sales_1.getAttribute('style') == 'display: none;') {
    //        Men_Sales_1.setAttribute('class', 'col-lg-12 margingred  borderred animated zoomIn ');
    //        Men_Sales_1.setAttribute('style', '');
    //        Men_Sales_2.setAttribute('style', 'display: none;');
    //        $('#cont').removeClass('colapsdivcont');
    //        $("body").removeClass("mini-navbar");
    //        $('#sidebar').removeClass('active');
    //        display_none();
    //        Chanege_Mode_TO_Page_1();
    //    }
    //    else {
    //        if (!ValidationHeader_On_Chanege()) return;
    //        if (CountGrid > 0) { var LastRowNo = CountGrid - 1; if (!Validation_Grid(LastRowNo)) return; }
    //        if (CountGrid > 0) { Display_Page_2(); }
    //        Men_Sales_1.setAttribute('class', 'col-lg-12 margingred  borderred borderred animated zoomOut');
    //        Men_Sales_1.setAttribute('style', 'display: none;');
    //        Men_Sales_2.setAttribute('style', '');
    //        $('#cont').toggleClass('colapsdivcont');
    //        //$("body").toggleClass("mini-navbar");
    //        $('#sidebar').toggleClass('active');
    //        remove_display_none();
    //        GetAllItem();
    //        btnminus_Quantity.onclick = btnminus_Quantity_onclick;
    //        btnplus_Quantity.onclick = btnminus_Quantity_onclick;
    //        btnminus_price.onclick = btnminus_price_onclick;
    //        btnplus_price.onclick = btnminus_price_onclick;
    //        //Men_Sales_2.onclick = blur_but;
    //        All_item.onclick = GetAll_item_onclick;
    //        txtPrice.onkeyup = Total;
    //        txtQuantity.onkeyup = Total;
    //        btn_Add_Basket.onclick = But_Add_Popu;
    //        btn_Edit_Basket.onclick = Edit_ROW_IN_Basket;
    //        $('.compose-discard-bt').click(Remove_Item_in_Basket);
    //    }
    //}
    //function display_none() {
    //    $('#thing').toggleClass("display_none");
    //    $('#Men_popu').toggleClass("display_none");
    //    $('#Basket').toggleClass("display_none");
    //    $('#CChat').toggleClass("display_none");
    //    $("#Total_Basket").toggleClass("display_none");
    //    $("#chat").toggleClass("display_none");
    //    //$('#Basket').toggleClass("display_none "); 
    //    //$("#Basket").toggleClass("display_none");
    //}
    //function remove_display_none() {
    //    //var class_Popu =$('#Men_popu').attr('class');
    //    //if (class_Popu != 'popu animated zoomOutRight' && class_Popu != 'popu animated zoomOutUp')
    //    //{
    //    //}
    //    $('#thing').removeClass("display_none");
    //    $('#Men_popu').removeClass("display_none");
    //    $('#CChat').removeClass("display_none");
    //    $("#Total_Basket").removeClass("display_none");
    //    $("#chat").removeClass("display_none");
    //    $('#Basket').removeClass("display_none");
    //}
    //function ValidationHeader_On_Chanege() {
    //    //debugger
    //    if (ddlCustomer.selectedIndex == 0 && TypeFlag == false) {
    //        DisplayMassage(" برجاء اختيار العميل", "خطأ", MessageType.Worning)
    //        return false
    //    }
    //    else if (ddlSalesman.value == "null") {
    //        DisplayMassage(" برجاء اختيار المندوب", "خطأ", MessageType.Worning)
    //        return false
    //    }
    //    else if (ddlStore.value == "null") {
    //        DisplayMassage(" برجاء اختيار المخزن", "خطأ", MessageType.Worning)
    //        return false
    //    }
    //    else if (txtDate.value == "") {
    //        DisplayMassage(" برجاء ادخال التاريخ", "خطأ", MessageType.Worning)
    //        return false
    //    }
    //    return true;
    //}
    //--------------------------------------------------Display_Category--------------------------------
    //function Display_Category() {
    //    Ajax.Callsync({
    //        type: "Get",
    //        url: sys.apiUrl("StkDefCategory", "GetAll"),
    //        data: {
    //            CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
    //        },
    //        success: (d) => {
    //            ////////debugger;
    //            let result = d as BaseResponse;
    //            if (result.IsSuccess) {
    //                CategoryDetails = result.Response as Array<I_D_Category>;
    //                for (var i = 0; i < CategoryDetails.length; i++) {
    //                    Category_NAME = CategoryDetails[i].DescA;
    //                    CatID = CategoryDetails[i].CatID;
    //                    CatPlus = i;
    //                    Create_Category();
    //                }
    //            }
    //        }
    //    });
    //}
    //function Create_Category() {
    //    var test_Category = document.getElementById("button_Category" + CatPlus);
    //    if (test_Category == null) {
    //        var button_Category = document.createElement('button');
    //        button_Category.setAttribute('id', 'id' + CatPlus);
    //        button_Category.setAttribute('type', 'button');
    //        button_Category.setAttribute('data-CatID', CatID);
    //        button_Category.setAttribute('class', 'btn btn-info Style_Category');
    //        button_Category.setAttribute('value', Category_NAME);
    //        document.getElementById("div_Category").appendChild(button_Category);
    //        document.getElementById('id' + CatPlus + '').innerHTML = Category_NAME;
    //        $('#id' + CatPlus + '').click(Selecte_Category);
    //    }
    //}
    //function GetAll_item_onclick() {
    //    document.getElementById("uul").innerHTML = '';
    //    blur_but();
    //    DisplayItems(FamilyDetails);
    //}
    //function Selecte_Category() {
    //    blur_but();
    //    CatID = $(this).attr('data-CatID');
    //    var Category = FamilyDetails.filter(x => x.CatID == Number(CatID));
    //    document.getElementById("uul").innerHTML = '';
    //    DisplayItems(Category);
    //}
    //--------------------------------------------------Display_But--------------------------------
    //function GetAllItem() {
    //    Ajax.Callsync({
    //        type: "Get",
    //        url: sys.apiUrl("StkDefItems", "GetAllItem"),
    //        data: {
    //            CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
    //        },
    //        success: (d) => {
    //            let result = d as BaseResponse;
    //            if (result.IsSuccess) {
    //                ItemDetails = result.Response as Array<IQ_GetItemStoreInfo>;
    //            }
    //        }
    //    });
    //}
    function Display_But() {
        debugger;
        //let userCode = SysSession.CurrentEnvironment.UserCode;
        //Ajax.Callsync({
        //    type: "GET",
        //    url: sys.apiUrl("Login", "open_and_close_Login"),
        //    data: { UserName: userCode, password: '619', Open_Login: 0 },
        //    success: (d) => {
        //        debugger;
        //        var res = d;
        //        if (res.IsSuccess == true) {
        //            debugger
        //            var result = res.Response;
        //            window.open(Url.Action("LoginIndex", "Login"), "_self");
        //            localStorage.removeItem("Inv1_Login_Data");
        //            return;
        //        }
        //    }
        //});
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("Items", "GetAll"),
            data: { CompCode: 1 },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    FamilyDetails = result.Response;
                    DisplayItems(FamilyDetails);
                }
            }
        });
    }
    function DisplayItems(ItemList) {
        for (var i = 0; i < ItemList.length; i++) {
            if (ItemList[i].ID_CAT == 1) {
                class_input = "input_fruits";
            }
            else if (ItemList[i].ID_CAT == 2) {
                class_input = "input_greens";
            }
            else {
                class_input = "input_blue";
            }
            PRODUCT_NAME = ItemList[i].PRODUCT_NAME;
            ItemFamilyID = ItemList[i].PRODUCT_ID;
            IDPlus = i;
            AddBut();
        }
    }
    function AddBut() {
        ////debugger
        var test_input = document.getElementById("input" + IDPlus);
        if (test_input == null) {
            var ppp = document.createElement('li');
            ppp.setAttribute('id', 'li' + IDPlus);
            document.getElementById("uul").appendChild(ppp);
            var ul_ul = document.createElement('ul');
            ul_ul.setAttribute('id', 'ul_ul' + IDPlus);
            document.getElementById("li" + IDPlus + "").appendChild(ul_ul);
            var li_input = document.createElement('li');
            li_input.setAttribute('id', 'li_input' + IDPlus);
            document.getElementById("ul_ul" + IDPlus + "").appendChild(li_input);
            //var li_X = document.createElement('li');
            //li_X.setAttribute('id', 'li_div' + IDPlus);
            //document.getElementById("ul_ul" + IDPlus + "").appendChild(li_X);
            //var div_menu = document.createElement('div');
            //div_menu.setAttribute('id', 'div_menu' + IDPlus);
            //div_menu.setAttribute('style', 'display:none;');
            //div_menu.setAttribute('class', 'animated zoomin krkr');
            //document.getElementById("li_div" + IDPlus + "").appendChild(div_menu);
            //var ul_menu = document.createElement('ul');
            //ul_menu.setAttribute('id', 'ul_menu' + IDPlus);
            //document.getElementById("div_menu" + IDPlus + "").appendChild(ul_menu);
            var div = document.createElement('input');
            div.setAttribute('id', 'input' + IDPlus);
            div.setAttribute('id_QET', 'QET_' + IDPlus);
            div.setAttribute('type', 'button');
            div.setAttribute('value', PRODUCT_NAME);
            div.setAttribute('data-ItemFamilyID', ItemFamilyID);
            div.setAttribute('data-id_Menu', 'li_menu' + IDPlus);
            div.setAttribute('data-ul_menu', 'ul_menu' + IDPlus);
            div.setAttribute('data-div_menu', 'div_menu' + IDPlus);
            div.setAttribute('data-Name', PRODUCT_NAME);
            div.setAttribute('style', 'zoom:2.4;font-size: 8px;font-weight: bold;');
            div.setAttribute('class', 'Css_but chat-box-wrap shadow-reset ' + class_input + '');
            document.getElementById("li_input" + IDPlus + "").appendChild(div);
        }
        //$('#input' + IDPlus).click(Open_Menu);
    }
    function blur_but() {
        //if (ID_input != null) {
        //    ID_input.setAttribute('style', 'zoom:2.4;font-size: 8px;font-weight: bold;');
        //}
        //div_menu.setAttribute('style', 'display:none;');
        //$('#thing').removeClass("zoomIn");
        //$('#thing').removeClass("zoomIn");
        //$('#thing').toggleClass("zoom");
    }
    ////--------------------------------------------------Create_Menu--------------------------------
    //container.addEventListener('click', function (event) {
    //    var x = event.clientX;
    //    var y = event.clientY;
    //    y += $(document).scrollTop();
    //    // x = 1150
    //    // y = 461
    //    //alert(x);
    //    //alert(y);
    //    if (x < 1150 && y < 385) {
    //        if (num_item_IN_Menu == 8) {
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; height: 348px; ');
    //        }
    //        else if (num_item_IN_Menu == 6) {
    //            //alert(num_item_IN_Menu);
    //            y = y - 100;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //        else {
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //    }
    //    else if (x > 1150 && y < 385) {
    //        //right
    //        x = x - 200;
    //        if (num_item_IN_Menu == 6) {
    //            y = y - 50;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; height: 348px; ');
    //        }
    //        else if (num_item_IN_Menu == 8) {
    //            y = y - 50;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; height: 348px; ');
    //        }
    //        else {
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //    }
    //    else if (x < 1150 && y > 385) {
    //        //bottom
    //        //alert(num_item_IN_Menu);
    //        if (num_item_IN_Menu == 1) {
    //            y = y - 20;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //        else if (num_item_IN_Menu == 4) {
    //            y = y - 150;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //        else if (num_item_IN_Menu == 6) {
    //            y = y - 350;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; height: 348px; ');
    //        }
    //        else if (num_item_IN_Menu == 8) {
    //            y = y - 350;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; height: 348px; ');
    //        }
    //        else {
    //            y = y - 100;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //    }
    //    else if (x > 1150 && y > 385) {
    //        //right and bottom
    //        x = x - 200;
    //        //y = y - 100;
    //        if (num_item_IN_Menu == 1) {
    //            y = y - 20;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //        else if (num_item_IN_Menu == 4) {
    //            y = y - 150;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //        else if (num_item_IN_Menu == 6) {
    //            y = y - 350;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; height: 348px; ');
    //        }
    //        else if (num_item_IN_Menu == 8) {
    //            y = y - 350;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; height: 348px; ');
    //        }
    //        else {
    //            y = y - 100;
    //            var ball = document.querySelector("#thing");
    //            ball.setAttribute('style', 'position: absolute ; left:' + `${x}px` + '; top:' + `${y}px` + '; ');
    //        }
    //    }
    //})
    //function Open_Menu() {
    //    ////debugger
    //    storeCode = $("#ddlStore").val();
    //    blur_but();
    //    $('#thing').toggleClass("zoomIn");
    //    div_menu.setAttribute('style', 'display:block;');
    //    New_ItemFamilyID = $(this).attr('data-ItemFamilyID');
    //    Select_Item(New_ItemFamilyID);
    //    //var Selecteditem = ItemDetails.filter(x => x.ItemFamilyID == Number(ItemFamilyID) && x.StoreCode == storeCode);
    //    if (Selecteditem.length == 0) { this.setAttribute('value', 'Finish'); div_menu.setAttribute('style', 'display:none;'); }
    //    else if (Selecteditem.length == 1) {
    //        num_item_IN_Menu = 1;
    //    }
    //    else if (Selecteditem.length > 2 && Selecteditem.length < 5) {
    //        num_item_IN_Menu = 4;
    //    }
    //    //else if (Selecteditem.length == 6 ) {
    //    //    num_item_IN_Menu = 5;
    //    //}
    //    else if (Selecteditem.length >= 6 && Selecteditem.length <= 8) {
    //        num_item_IN_Menu = 6;
    //    }
    //    else if (Selecteditem.length > 8) {
    //        num_item_IN_Menu = 8;
    //    }
    //    else {
    //        num_item_IN_Menu = 0;
    //    }
    //    var ul_Menu = document.getElementById('ul_Menu');
    //    ul_Menu.innerHTML = '';
    //    ID_input = document.getElementById($(this).attr('id'));
    //    ID_input.setAttribute('style', 'zoom:2.4;font-size: 8px;font-weight: bold;background: linear-gradient(to right, #000000 0%, #000000 100%);color: wheat;');
    //    for (var i = 0; i < Selecteditem.length; i++) {
    //        var li_menu = document.createElement('li');
    //        li_menu.setAttribute('id', 'li_menu' + $(this).attr('data-ul_menu') + i);
    //        li_menu.setAttribute('class', 'st_border_li_inDiv');
    //        li_menu.setAttribute('data-pirce', Selecteditem[i].UnitPrice.toString());
    //        li_menu.setAttribute('data-Name', Selecteditem[i].Itm_DescA.toString());
    //        li_menu.setAttribute('data-ItemID', Selecteditem[i].ItemID.toString());
    //        li_menu.setAttribute('data-Qty', Selecteditem[i].OnhandQty.toString());
    //        li_menu.setAttribute('data-MinUnitPrice', Selecteditem[i].MinUnitPrice.toString());
    //        ul_Menu.appendChild(li_menu);
    //        var id_menu = document.getElementById('li_menu' + $(this).attr('data-ul_menu') + i);
    //        $('#' + 'li_menu' + $(this).attr('data-ul_menu') + i + '').click(click_Menu);
    //        id_menu.innerHTML = '' + Selecteditem[i].OnhandQty + '- ' + Selecteditem[i].Itm_DescA.toString();
    //    }
    //    //$('#thing').toggleClass("zoomIn");
    //}
    //function Select_Item(FamilyID: number) {
    //    Ajax.Callsync({
    //        type: "Get",
    //        url: sys.apiUrl("StkDefItemType", "GetItemByFamilyIdOrdered"),
    //        data: {
    //            familyid: FamilyID, storeid: storeCode, CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
    //        },
    //        success: (d) => {
    //            let result = d as BaseResponse;
    //            if (result.IsSuccess) {
    //                ItemDetails_New = result.Response as Array<IQ_GetItemStoreInfo_New>;
    //                //DisplayItems(FamilyDetails);
    //                Selecteditem = ItemDetails_New;
    //            }
    //        }
    //    });
    //}
    //function click_Menu() {
    //    btn_Add_Basket.setAttribute('style', 'display:block;');
    //    btn_Edit_Basket.setAttribute('style', 'display:none;');
    //    Name_Product = $(this).attr('data-Name');
    //    OnhandQty = $(this).attr('data-Qty');
    //    MinUnitPrice = $(this).attr('data-MinUnitPrice');
    //    $('#id_Labol').html('متاح (' + OnhandQty + ') من  ' + Name_Product + '');
    //    $('#Men_popu').attr('style', 'display:block;');
    //    $('#Men_popu').attr('class', 'popu animated zoomInLeft');
    //    $('#txtQuantity').val('1');
    //    $('#txtPrice').val($(this).attr('data-pirce'));
    //    ItemID = $(this).attr('data-itemid')
    //    PRODUCT_price = $(this).attr('data-pirce')
    //    $("#PopupDialog").modal("show");
    //    blur_but();
    //    Total();
    //}
    ////--------------------------------------------------Open_Popu--------------------------------
    //function btnminus_Quantity_onclick() {
    //    //debugger
    //    var type = $(this).attr('data-type');
    //    var input = $("#txtQuantity");
    //    var currentVal = parseFloat(input.val());
    //    if (!isNaN(currentVal)) {
    //        if (type == 'minus') {
    //            if (currentVal > Number(input.attr('min'))) {
    //                input.val((currentVal - 1)).change();
    //            }
    //            if (parseFloat(input.val()) == Number(input.attr('min'))) {
    //                $(this).val(input.attr('min'));
    //            }
    //        }
    //        else if (type == 'plus') {
    //            if (currentVal < Number(OnhandQty)) {
    //                if (currentVal < Number(input.attr('max'))) {
    //                    input.val((currentVal + 1)).change();
    //                }
    //                if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
    //                    $(this).val(input.attr('max'));
    //                }
    //            }
    //            else {
    //                MessageBox.Show("خطأ الكميه المتاحه (" + OnhandQty + ")", "خطأ");
    //            }
    //        }
    //    } else {
    //        input.val(1);
    //    }
    //    Total();
    //}
    //function btnminus_price_onclick() {
    //    var type = $(this).attr('data-type');
    //    var input = $("#txtPrice");
    //    var currentVal = parseFloat(input.val());
    //    if (!isNaN(currentVal)) {
    //        if (type == 'minus') {
    //            if (currentVal > Number(input.attr('min'))) {
    //                input.val((currentVal - 0.5)).change();
    //            }
    //            if (parseFloat(input.val()) == Number(input.attr('min'))) {
    //                $(this).val(input.attr('min'));
    //            }
    //        }
    //        else if (type == 'plus') {
    //            if (currentVal < Number(input.attr('max'))) {
    //                input.val((currentVal + 0.5)).change();
    //            }
    //            if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
    //                $(this).val(input.attr('max'));
    //            }
    //        }
    //    } else {
    //        input.val(1);
    //    }
    //    Total();
    //}
    //function cancel_Popu_onclick() {
    //    $("#PopupDialog").modal("hide");
    //    $('#Men_popu').attr('class', 'popu animated zoomOutUp');
    //}
    //function Total() {
    //    if (Number($("#txtQuantity").val()) <= OnhandQty) {
    //        var total = Number($("#txtPrice").val()) * Number($("#txtQuantity").val());
    //        $("#txtTotal_Popu").val(total);
    //        var vatAmount = Number(total) * VatPrc / 100;
    //        $("#txtTax_Popu").val(vatAmount);
    //        var totalAfterVat = Number(vatAmount) + Number(total);
    //        $("#txtTotAfterTax_Popu").val(totalAfterVat);
    //    }
    //    else {
    //        $("#txtQuantity").val(OnhandQty);
    //        MessageBox.Show("خطأ الكميه المتاحه (" + OnhandQty + ")", "خطأ");
    //        Total();
    //    }
    //}
    //function But_Add_Popu() {
    //    price_One_Product = parseFloat($("#txtPrice").val());
    //    price_Product = parseFloat(txtTotAfterTax_Popu.value);
    //    PRODUCT_price = parseFloat($("#txtPrice").val());
    //    Qet_Product = Number(txtQuantity.value);
    //    Add_ROW_IN_Basket();
    //    $("#PopupDialog").modal("hide");
    //    $('#Men_popu').attr('class', 'popu animated zoomOutRight');
    //}
    ////--------------------------------------------------Basket--------------------------------
    //function Edit_ROW_IN_Basket() {
    //    //debugger
    //    price_One_Product = parseFloat($("#txtPrice").val());
    //    price_Product = parseFloat(txtTotAfterTax_Popu.value);
    //    Qet_Product = Number(txtQuantity.value);
    //    var paragraph = document.getElementById('ppp' + Num_paragraph);
    //    var New_QET = Qet_Product;
    //    var New_price = price_Product;
    //    paragraph.setAttribute('data_QET_P', New_QET.toString());
    //    paragraph.setAttribute('data_total_price', New_price.toString());
    //    paragraph.innerHTML = '( ' + New_QET + ' )   ' + Name_Product + '  = ' + New_price + ' <a id="oioo' + Num_paragraph + '"  data-ID-Paragraph="' + Num_paragraph + '" href="#"  data-exit_id="exit' + Num_paragraph + '"  data-ip_div="comnt' + Num_paragraph + '" data-MinUnitPrice="' + MinUnitPrice + '" data-OnhandQty="' + OnhandQty + '" data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '"  data-Qet_Product="' + New_QET + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
    //    $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
    //    $('#Men_popu').attr('class', 'popu animated zoomOutRight');
    //    $("#PopupDialog").modal("hide");
    //    Total_Price();
    //}
    //function Add_ROW_IN_Basket() {
    //    ////debugger
    //    price_One_Product = parseFloat($("#txtPrice").val());
    //    price_Product = parseFloat(txtTotAfterTax_Popu.value);
    //    Qet_Product = Number(txtQuantity.value);
    //    var tttt = 1;
    //    if (P > -1) {
    //        for (var i = 1; i < P + 1; i++) {
    //            ////debugger
    //            var paragraph = document.getElementById('ppp' + i);
    //            if (paragraph == null) { } else {
    //                var Saerch = paragraph.getAttribute('data_Name_P');
    //                if (Saerch == Name_Product) {
    //                    ////debugger
    //                    var New_P = paragraph.getAttribute('data-New_P');
    //                    var QET_P = paragraph.getAttribute('data_QET_P');
    //                    var New_QET = Number(paragraph.getAttribute('data_QET_P')) + Qet_Product;
    //                    var price_P = paragraph.getAttribute('data_total_price');
    //                    var New_price = Number(price_Product) + parseFloat(price_P);
    //                    paragraph.setAttribute('data_QET_P', New_QET.toString());
    //                    paragraph.setAttribute('data_total_price', New_price.toString());
    //                    paragraph.innerHTML = '( ' + New_QET + ' )   ' + Name_Product + '  = ' + New_price + ' <a id="oioo' + New_P + '" href="#" data-ID-Paragraph="' + New_P + '"  data-exit_id="exit' + New_P + '"  data-ip_div="comnt' + New_P + '" data-MinUnitPrice="' + MinUnitPrice + '" data-OnhandQty="' + OnhandQty + '" data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '"  data-Qet_Product="' + New_QET + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
    //                    $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
    //                    tttt = 2;
    //                    break;
    //                }
    //            }
    //        }
    //    }
    //    if (tttt == 1) {
    //        ////debugger
    //        P += 1
    //        scro += 80;
    //        var Qet = 1;
    //        if (CChat.getAttribute('style') != "display: block") {
    //            var Ul_Div = document.createElement('ul');
    //            Ul_Div.setAttribute('id', 'Ul_Div');
    //            document.getElementById("mCSB_3_container").appendChild(Ul_Div);
    //        }
    //        var Li_Ul_Div = document.createElement('ul');
    //        Li_Ul_Div.setAttribute('id', 'Li_Ul_Div' + P);
    //        Li_Ul_Div.setAttribute('style', 'margin: 14px 0px 0px 0px;');
    //        document.getElementById("Ul_Div").appendChild(Li_Ul_Div);
    //        var li1_Div = document.createElement('li');
    //        li1_Div.setAttribute('id', 'li1_Div' + P);
    //        document.getElementById("Li_Ul_Div" + P).appendChild(li1_Div);
    //        var li2_Div = document.createElement('li');
    //        li2_Div.setAttribute('id', 'li2_Div' + P);
    //        document.getElementById("Li_Ul_Div" + P).appendChild(li2_Div);
    //        var divv = document.createElement('div');
    //        divv.setAttribute('class', 'author-chat');
    //        divv.setAttribute('id', 'div' + P);
    //        document.getElementById("li2_Div" + P).appendChild(divv);
    //        var ppp = document.createElement('p');
    //        ppp.setAttribute('id', 'ppp' + P);
    //        ppp.setAttribute('class', 'chat-box-wrap shadow-reset ');
    //        ppp.setAttribute('style', 'width: 96%;');
    //        ppp.setAttribute('data_Name_P', Name_Product);
    //        ppp.setAttribute('data_price_P', PRODUCT_price.toString());
    //        ppp.setAttribute('data_ItemId', ItemID.toString());
    //        ppp.setAttribute('data_ItemFamilyID', New_ItemFamilyID.toString());
    //        ppp.setAttribute('data_QET_P', Qet_Product.toString());
    //        ppp.setAttribute('data_total_price', price_Product.toString());
    //        ppp.setAttribute('data-New_P', P.toString());
    //        ppp.setAttribute('data-MinUnitPrice', MinUnitPrice);
    //        document.getElementById("div" + P).appendChild(ppp);
    //        var divvv = document.createElement('input');
    //        divvv.setAttribute('type', 'text');
    //        divvv.setAttribute('id', 'comnt' + P);
    //        divvv.setAttribute('class', 'author-chat alert alert-warning alert-st-three alert-st-bg2');
    //        divvv.setAttribute('style', 'display: none; margin: -43px 0px -25px 12px;float: left;height: 0px;width: 231px;font-size: 14px;padding: 14px;border-radius: 37px; position: relative;background-color: #a3a3a3;color: white;');
    //        document.getElementById("div" + P).appendChild(divvv);
    //        var exit_i = document.createElement('a');
    //        exit_i.setAttribute('id', 'exit' + P);
    //        exit_i.setAttribute('class', 'adminpro-icon adminpro-check-icon');
    //        exit_i.setAttribute('href', '#');
    //        exit_i.setAttribute('data-id_Nots', 'comnt' + P);
    //        exit_i.setAttribute('data-id_But_Nots', 'oioo' + P);
    //        exit_i.setAttribute('data-id_Pragraph', 'ppp' + P);
    //        exit_i.setAttribute('style', 'display:none;margin: -38px -39px 0px -192px;float: left;height: 0px;width: 231px;font-size: 21px;border-radius: 37px;position: relative;color: #2e617f; padding: 0px;');
    //        document.getElementById("div" + P).appendChild(exit_i);
    //        var li2_a = document.createElement('a');
    //        li2_a.setAttribute('id', 'a');
    //        li2_a.setAttribute('href', '#');
    //        li2_a.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInUp fa fa-remove class_ex_liest_chate');
    //        li2_a.setAttribute('data_Id_Ul', 'Li_Ul_Div' + P);
    //        li2_a.setAttribute('data_id_Pragraph', 'ppp' + P);
    //        li2_a.setAttribute('data-x_totel', $(this).attr('data-price'));
    //        li2_a.setAttribute('data-id_ppp', 'ppp' + P);
    //        document.getElementById("li1_Div" + P).appendChild(li2_a);
    //        document.getElementById('ppp' + P).innerHTML = '' + '( ' + Qet_Product + ' )   ' + Name_Product + '  = ' + price_Product + ' <a id="oioo' + P + '"  data-ID-Paragraph="' + P + '" href="#"  data-exit_id="exit' + P + '"  data-ip_div="comnt' + P + '"  data-MinUnitPrice="' + MinUnitPrice + '"  data-OnhandQty="' + OnhandQty + '"   data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '" data-Qet_Product="' + Qet_Product + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
    //        var mCSB_3_container = document.getElementById("mCSB_3_container");
    //        mCSB_3_container.setAttribute('style', 'position: relative; top: -' + scro + 'px; left: 0px;');
    //        CChat.setAttribute('style', 'display: block');
    //        $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
    //        //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
    //        Num_Item.setAttribute('data_New_QET', P);
    //        New_QET = P;
    //    }
    //    Total_Price();
    //    Qet_X = P;
    //    CChat.setAttribute('style', 'display: block;');
    //    Total_Basket.setAttribute('style', 'display: block;');
    //    var boll = chat.getAttribute('class');
    //    var hide = ("chat-box-wrap shadow-reset animated zoomInLeft collapse");
    //    if (hide == boll) { x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Qet_X + '</i>'; }
    //    else { x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Qet_X + '</i>'; }
    //    Num_Add_List += 1;
    //}
    //function Show_Basket() {
    //    var CChat = document.getElementById("CChat");
    //    x.setAttribute('class', '');
    //    CChat.setAttribute('class', 'Basket');
    //    CChat.setAttribute('aria-expanded', 'true');
    //    chat.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInLeft collapse in');
    //    chat.setAttribute('aria-expanded', 'true');
    //    chat.setAttribute('style', '');
    //}
    //function Hide_Basket() {
    //    //var CChat = document.getElementById("CChat");
    //    //x.setAttribute('class', '');
    //    //CChat.setAttribute('class', 'Basket');
    //    //CChat.setAttribute('aria-expanded', 'true');
    //    chat.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInLeft collapse');
    //    chat.setAttribute('style', 'width: 28%; border-radius: 16px; height: 0px;');
    //    chat.setAttribute('aria-expanded', 'false');
    //}
    //function Remove_Item_in_Basket() {
    //    ////debugger
    //    var liuu = document.getElementById("Ul_Div");
    //    document.getElementById("mCSB_3_container").removeChild(liuu);
    //    var Ul_Div = document.createElement('ul');
    //    Ul_Div.setAttribute('id', 'Ul_Div');
    //    document.getElementById("mCSB_3_container").appendChild(Ul_Div);
    //    P = 0;
    //    //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
    //    Num_Item.setAttribute('data_New_QET', P);
    //    x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + P + '</i>';
    //    if (P == 0) { CChat.setAttribute('style', 'display: none;'); Total_Basket.setAttribute('style', 'display: none;'); }
    //    var totalPirs = document.getElementById('All_Total_Basket');
    //    totalPirs.innerHTML = '0';
    //    totalPirs.setAttribute('All_Total', '0');
    //    Num_Add_List = 0;
    //    CountGrid = 0;
    //    ValidationMinUnitPrice = 0;
    //    Validation_Insert = 0;
    //    txtCommission_Basket.value = "0";
    //}
    //function click_Remove_Item_in_Basket() {
    //    var coment = document.getElementById($(this).attr('id'));
    //    var Edit_Id = coment.getAttribute('class');
    //    //debugger
    //    if (Edit_Id == "chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit") {
    //        //debugger
    //        Num_paragraph = $(this).attr('data-ID-Paragraph');
    //        click_Edit($(this).attr('data-name'), Number($(this).attr('data-price_one')), Number($(this).attr('data-qet_product')), Number($(this).attr('data-onhandqty')), Number($(this).attr('data-minunitprice')));
    //    }
    //    else {
    //        var id_Pragraph = document.getElementById($(this).attr('data_id_Pragraph'));
    //        if (id_Pragraph == null) {
    //        }
    //        else {
    //            P -= 1;
    //            CountGrid -= 1;
    //            //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
    //            Num_Item.setAttribute('data_New_QET', P);
    //            x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + P + '</i>';
    //            if (P == 0) { CChat.setAttribute('style', 'display: none;'); Total_Basket.setAttribute('style', 'display: none;'); }
    //            var id_ul = document.getElementById($(this).attr('data_Id_Ul'));
    //            document.getElementById("Ul_Div").removeChild(id_ul);
    //            Total_Price();
    //        }
    //    }
    //}
    //function Total_Price() {
    //    ////debugger
    //    var New_Total = 0;
    //    for (var i = 1; i <= P + 1; i++) {
    //        ////debugger
    //        var par = document.getElementById('ppp' + i);
    //        if (par != null) {
    //            var P_total = par.getAttribute('data_total_price');
    //            New_Total += parseFloat(P_total);
    //            Total_Basket.setAttribute('style', 'display: block;');
    //            document.getElementById('All_Total_Basket').innerHTML = "( " + Number(New_Total).toFixed(2).toString() + " )";
    //            document.getElementById('All_Total_Basket').setAttribute('All_Total', Number(New_Total).toFixed(2).toString());
    //        }
    //    }
    //}
    ////------------------------------------------------------Edit-----------------------------------
    //function click_Edit(New_Name: string, New_Pirce: number, new_Qet: number, New_OnhandQty: number, New_MinUnitPrice: number) {
    //    //debugger
    //    btn_Add_Basket.setAttribute('style', 'display:none;');
    //    btn_Edit_Basket.setAttribute('style', 'display:block;');
    //    Name_Product = New_Name;
    //    OnhandQty = New_OnhandQty;
    //    MinUnitPrice = New_MinUnitPrice;
    //    //$('#id_Labol').html('الكميه المتاحه (' + New_OnhandQty + ') من ( ' + New_Name + ' )');
    //    //$('#id_Labol').html('الكميه المتاحه (' + New_OnhandQty + ') من ( ' + New_Name + ' ) ');
    //    //$('#id_Labol').html(New_Name);
    //    $('#id_Labol').html('متاح (' + New_OnhandQty + ') من  ' + New_Name + '');
    //    $('#Men_popu').attr('style', 'display:block;');
    //    $('#Men_popu').attr('class', 'popu animated zoomInLeft');
    //    $('#txtQuantity').val(new_Qet);
    //    $('#txtPrice').val(New_Pirce);
    //    $("#PopupDialog").modal("show");
    //    Total();
    //}
    ////------------------------------------------------------Assign_Get_Data------------------------
    //function Chanege_Mode_TO_Page_1() {
    //    Assign_Get_Data();
    //    $("#div_Data").html('');
    //    Display_Page_1();
    //}
    //function Display_Page_1() {
    //    storeCode = $("#ddlStore").val();
    //    for (var i = 0; i < List.length; i++) {
    //        ////debugger
    //        let total = (List[i].SoldQty * List[i].Unitprice);
    //        CountGrid = i;
    //        BuildControls(CountGrid);
    //        $("#ddlFamily" + i).removeAttr('disabled');
    //        $("#ddlFamily" + i).prop("value", List[i].ItemFamilyID);
    //        //---------------------------------------------------------------------------------------------------------
    //        $("#ddlItem" + i).removeAttr('disabled');
    //        var selectedFamily = $("#ddlFamily" + i).val();
    //        var item = ItemDetails.filter(x => x.ItemFamilyID == Number(selectedFamily) && x.StoreCode == storeCode);
    //        $('#ddlItem' + i).empty();
    //        $('#ddlItem' + i).append('<option value="' + null + '">' + "اختر الصنف" + '</option>');
    //        for (var u = 0; u < item.length; u++) {
    //            $('#ddlItem' + i).append('<option data-MinUnitPrice="' + item[u].MinUnitPrice + '" data-OnhandQty="' + item[u].OnhandQty + '" value="' + item[u].ItemID + '">' + item[u].Itm_DescA + '</option>');
    //        }
    //        $("#ddlItem" + i).prop("value", List[i].ItemID);
    //        //---------------------------------------------------------------------------------------------------------
    //        //$("#txt_ID" + i).val(List[i].ItemFamilyID);
    //        //$("#txt_ID" + i).val(List[i].ItemID);
    //        $("#txtQuantity" + i).val(List[i].SoldQty);
    //        $("#txtPrice" + i).val(List[i].Unitprice);
    //        $("#txtTotal" + i).val(total);
    //        $("#txtTax" + i).val(List[i].VatAmount);
    //        $("#txtTotAfterTax" + i).val(List[i].NetAfterVat);
    //        $("#txt_StatusFlag" + i).val("");
    //        $("#btn_minus" + i).removeClass("display_none");
    //        $("#btn_minus" + i).removeAttr("disabled");
    //    }
    //    CountGrid += 1;
    //    ComputeTotals();
    //    txtItemCount.value = i.toString();
    //    CountItems = i;
    //    txtCommission.value = txtCommission_Basket.value;
    //}
    //function Assign_Get_Data() {
    //    var VatAmount = 0;
    //    List = new Array<I_Sls_TR_InvoiceItems>();
    //    List_MinUnitPrice = new Array<I_Sls_TR_InvoiceItems>();
    //    //var StatusFlag: String;
    //    //debugger;
    //    ////debugger
    //    for (var i = 1; i < Num_Add_List + 1; i++) {
    //        ////debugger
    //        var prgraph = document.getElementById("ppp" + i);
    //        if (prgraph != null) {
    //            Model = new I_Sls_TR_InvoiceItems();
    //            let Name_Item = prgraph.getAttribute("data_name_p");
    //            let Item_ID = Number(prgraph.getAttribute("data_itemid"));
    //            let ItemFamily_ID = Number(prgraph.getAttribute("data_itemfamilyid"));
    //            let Qty = Number(prgraph.getAttribute("data_qet_p"));
    //            let Price_Item = Number(prgraph.getAttribute("data_price_p"));
    //            let Total_Price = Number(prgraph.getAttribute("data_total_price"));
    //            let total = (Qty * Price_Item);
    //            let MinPrice = prgraph.getAttribute("data-minunitprice");
    //            let get_Price_on_seller = document.getElementById("oioo" + prgraph.getAttribute("data-new_p"));
    //            let Price_on_seller = get_Price_on_seller.getAttribute("data-price_one");
    //            Model.InvoiceItemID = 0;
    //            Model.ItemID = Number(Item_ID);
    //            Model.SoldQty = Number(Qty);
    //            Model.StockSoldQty = Number(Qty);
    //            Model.NetUnitPrice = Number(Price_Item);
    //            Model.Unitprice = Number(Price_on_seller);
    //            Model.VatPrc = VatPrc;//$("#txtTax" + i).val();
    //            Model.VatAmount = Number(total) * VatPrc / 100;
    //            Model.ItemTotal = Number(Qty) * Number(Price_Item);
    //            Model.NetAfterVat = Total_Price;
    //            Model.ItemFamilyID = ItemFamily_ID;
    //            Model.MinUnitPrice = Number(MinPrice);
    //            Model.Name_Item = Name_Item;
    //            Model.StatusFlag = "i";
    //            VatAmount += Number(total) * VatPrc / 100;
    //            List.push(Model);
    //            MasterDetailModel.I_Sls_TR_Invoice = InvoiceModel;
    //            MasterDetailModel.I_Sls_TR_InvoiceItems = List;
    //            if (ValidationMinUnitPrice == 1) {
    //                //debugger
    //                if (Number(Price_on_seller) < Number(MinPrice)) {
    //                    List_MinUnitPrice.push(Model);
    //                    Validation_Insert = 1;
    //                }
    //            }
    //        }
    //    }
    //    InvoiceModel.VatAmount = VatAmount;
    //    //console.log(List);
    //}
    //function Finsh_Order_onclick() {
    //    if (P != 0) {
    //        if (!SysSession.CurrentPrivileges.AddNew) return;
    //        if (!ValidationHeader_On_Chanege())
    //            return;
    //        ValidationMinUnitPrice = 1;
    //        Assign_Get_Data();
    //        MasterDetailModel.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
    //        MasterDetailModel.UserCode = SysSession.CurrentEnvironment.UserCode;
    //        if (Validation_Insert != 1) {
    //            Insert_Basket();
    //            Remove_Item_in_Basket();
    //            ValidationMinUnitPrice = 0;
    //            Validation_Insert = 0;
    //            btnChanege_onclick();
    //            $('#condtionbtn1').removeClass("col-lg-10");
    //            $('#condtionbtn1').addClass("col-lg-8");
    //            $('#condtionbtn2').removeClass("col-lg-2");
    //            $('#condtionbtn2').addClass("col-lg-4");
    //            $('#btnPrint').removeClass("display_none");
    //            $('#btnPrntPrice').removeClass("display_none");
    //            clear();
    //        }
    //        else {
    //            Open_poup_Pass();
    //        }
    //    }
    //    else {
    //        MessageBox.Show(" برجاء اختيار الاصناف", "خطأ");
    //    }
    //}
    //function Insert_Basket() {
    //    if (ddlCashType.value == "0") { InvoiceModel.IsCash = false; }
    //    else { InvoiceModel.IsCash = true; }
    //    if (chkActive.checked == true) { InvoiceModel.Status = 1; }
    //    else { InvoiceModel.Status = 0; }
    //    InvoiceModel.CustomerId = Number(ddlCustomer.value);
    //    InvoiceModel.SalesmanId = Number(ddlSalesman.value);
    //    InvoiceModel.StoreId = Number(ddlStore.value);
    //    InvoiceModel.TrDate = txtDate.value;
    //    InvoiceModel.NetAfterVat = NetCount;
    //    InvoiceModel.TotalAmount = Number($('#All_Total_Basket').attr('All_Total'));
    //    InvoiceModel.CustomerName = txtCustomerName.value;
    //    InvoiceModel.CustomerMobileNo = txtCustomerMobile.value;
    //    InvoiceModel.InvoiceID = 0;
    //    InvoiceModel.CompCode = Number(compcode);
    //    InvoiceModel.CreatedBy = SysSession.CurrentEnvironment.UserCode;
    //    InvoiceModel.CreatedAt = DateTimeFormat(Date().toString());
    //    InvoiceModel.VatType = vatType;
    //    InvoiceModel.CommitionAmount = Number(txtCommission_Basket.value);
    //    InvoiceModel.TrType = 0 //0 invoice 1 return
    //    InvoiceModel.SlsInvSrc = 1   // 1 from store 2 from van 
    //    InvoiceModel.SlsInvType = 1 //  retail 
    //    Ajax.Callsync({
    //        type: "POST",
    //        url: sys.apiUrl("SlsTrSales", "InsertInvoiceMasterDetail"),
    //        data: JSON.stringify(MasterDetailModel),
    //        success: (d) => {
    //            let result = d as BaseResponse;
    //            if (result.IsSuccess == true) {
    //                let res = result.Response as I_Sls_TR_Invoice;
    //                DisplayMassage(" تم اصدار  فاتورة رقم  " + res.TrNo + " ", "Succeed", MessageType.Succeed);
    //                $('#divCreationPanel').removeClass("display_none");
    //                $('#txtCreatedBy').prop("value", SysSession.CurrentEnvironment.UserCode);
    //                $('#txtCreatedAt').prop("value", DateTimeFormat(Date().toString()));
    //                Hide_Basket();
    //                //DisplayMassage("تم اصدار  فاتورة رقم " + res.TrNo, "تم");
    //            } else {
    //                MessageBox.Show("هناك خطـأ ", "خطاء");
    //            }
    //        }
    //    });
    //}
    //function Get_Data_From_Page1() {
    //    invoiceItemsModel = new Array<I_Sls_TR_InvoiceItems>();
    //    for (var i = 0; i < CountGrid; i++) {
    //        invoiceItemSingleModel = new I_Sls_TR_InvoiceItems();
    //        let New_Item = $("#ddlItem" + i);
    //        invoiceItemSingleModel.InvoiceItemID = 0;
    //        invoiceItemSingleModel.ItemID = $("#ddlItem" + i).val();
    //        invoiceItemSingleModel.ItemFamilyID = $("#ddlFamily" + i).val();
    //        invoiceItemSingleModel.SoldQty = $('#txtQuantity' + i).val();
    //        invoiceItemSingleModel.StockSoldQty = $('#txtQuantity' + i).val();
    //        invoiceItemSingleModel.NetUnitPrice = $("#txtPrice" + i).val();
    //        invoiceItemSingleModel.Unitprice = $("#txtPrice" + i).val();
    //        invoiceItemSingleModel.VatPrc = VatPrc;//$("#txtTax" + i).val();
    //        invoiceItemSingleModel.VatAmount = $("#txtTax" + i).val();
    //        invoiceItemSingleModel.ItemTotal = invoiceItemSingleModel.Unitprice * invoiceItemSingleModel.SoldQty;
    //        invoiceItemSingleModel.NetAfterVat = $("#txtTotAfterTax" + i).val();
    //        invoiceItemSingleModel.Name_ItemFamily = $("#ddlFamily" + i + " option:selected").text();
    //        invoiceItemSingleModel.Name_Item = $("#ddlItem" + i + " option:selected").text();
    //        invoiceItemSingleModel.OnhandQty = Number($('option:selected', New_Item).attr('data-OnhandQty'));
    //        invoiceItemSingleModel.MinUnitPrice = Number($('option:selected', New_Item).attr('data-MinUnitPrice'));
    //        invoiceItemSingleModel.StatusFlag = "i";
    //        invoiceItemsModel.push(invoiceItemSingleModel);
    //    }
    //    console.log(invoiceItemsModel);
    //}
    //function BuildBasket() {
    //    //storeCode = $("#ddlStore").val();
    //    P = 0;
    //    for (var i = 0; i < invoiceItemsModel.length; i++) {
    //        ////debugger
    //        Name_Product = invoiceItemsModel[i].Name_Item
    //        price_One_Product = invoiceItemsModel[i].Unitprice;
    //        price_Product = invoiceItemsModel[i].NetAfterVat;
    //        PRODUCT_price = invoiceItemsModel[i].Unitprice;
    //        Qet_Product = invoiceItemsModel[i].SoldQty;
    //        ItemID = invoiceItemsModel[i].ItemID;
    //        New_ItemFamilyID = invoiceItemsModel[i].ItemFamilyID;
    //        OnhandQty = invoiceItemsModel[i].OnhandQty;
    //        MinUnitPrice = invoiceItemsModel[i].MinUnitPrice;
    //        //Qet_Product = Number(txtQuantity.value);
    //        //PRODUCT_price = parseFloat($("#txtPrice").val());
    //        if (Name_Product != "") {
    //            P += 1
    //            scro += 80;
    //            var Qet = 1;
    //            if (CChat.getAttribute('style') != "display: block") {
    //                var Ul_Div = document.createElement('ul');
    //                Ul_Div.setAttribute('id', 'Ul_Div');
    //                document.getElementById("mCSB_3_container").appendChild(Ul_Div);
    //            }
    //            var Li_Ul_Div = document.createElement('ul');
    //            Li_Ul_Div.setAttribute('id', 'Li_Ul_Div' + P);
    //            Li_Ul_Div.setAttribute('style', 'margin: 14px 0px 0px 0px;');
    //            document.getElementById("Ul_Div").appendChild(Li_Ul_Div);
    //            var li1_Div = document.createElement('li');
    //            li1_Div.setAttribute('id', 'li1_Div' + P);
    //            document.getElementById("Li_Ul_Div" + P).appendChild(li1_Div);
    //            var li2_Div = document.createElement('li');
    //            li2_Div.setAttribute('id', 'li2_Div' + P);
    //            document.getElementById("Li_Ul_Div" + P).appendChild(li2_Div);
    //            var divv = document.createElement('div');
    //            divv.setAttribute('class', 'author-chat');
    //            divv.setAttribute('id', 'div' + P);
    //            document.getElementById("li2_Div" + P).appendChild(divv);
    //            var ppp = document.createElement('p');
    //            ppp.setAttribute('id', 'ppp' + P);
    //            ppp.setAttribute('class', 'chat-box-wrap shadow-reset ');
    //            ppp.setAttribute('style', 'width: 96%;');
    //            ppp.setAttribute('data_Name_P', Name_Product);
    //            ppp.setAttribute('data_price_P', PRODUCT_price.toString());
    //            ppp.setAttribute('data_ItemId', ItemID.toString());
    //            ppp.setAttribute('data_ItemFamilyID', New_ItemFamilyID.toString());
    //            ppp.setAttribute('data_QET_P', Qet_Product.toString());
    //            ppp.setAttribute('data_total_price', price_Product.toString());
    //            ppp.setAttribute('data-New_P', P.toString());
    //            ppp.setAttribute('data-MinUnitPrice', MinUnitPrice);
    //            document.getElementById("div" + P).appendChild(ppp);
    //            var divvv = document.createElement('input');
    //            divvv.setAttribute('type', 'text');
    //            divvv.setAttribute('id', 'comnt' + P);
    //            divvv.setAttribute('class', 'author-chat alert alert-warning alert-st-three alert-st-bg2');
    //            divvv.setAttribute('style', 'display: none; margin: -43px 0px -25px 12px;float: left;height: 0px;width: 231px;font-size: 14px;padding: 14px;border-radius: 37px; position: relative;background-color: #a3a3a3;color: white;');
    //            document.getElementById("div" + P).appendChild(divvv);
    //            var exit_i = document.createElement('a');
    //            exit_i.setAttribute('id', 'exit' + P);
    //            exit_i.setAttribute('class', 'adminpro-icon adminpro-check-icon');
    //            exit_i.setAttribute('href', '#');
    //            exit_i.setAttribute('data-id_Nots', 'comnt' + P);
    //            exit_i.setAttribute('data-id_But_Nots', 'oioo' + P);
    //            exit_i.setAttribute('data-id_Pragraph', 'ppp' + P);
    //            exit_i.setAttribute('style', 'display:none;margin: -38px -39px 0px -192px;float: left;height: 0px;width: 231px;font-size: 21px;border-radius: 37px;position: relative;color: #2e617f; padding: 0px;');
    //            document.getElementById("div" + P).appendChild(exit_i);
    //            var li2_a = document.createElement('a');
    //            li2_a.setAttribute('id', 'a');
    //            li2_a.setAttribute('href', '#');
    //            li2_a.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInUp fa fa-remove class_ex_liest_chate');
    //            li2_a.setAttribute('data_Id_Ul', 'Li_Ul_Div' + P);
    //            li2_a.setAttribute('data_id_Pragraph', 'ppp' + P);
    //            li2_a.setAttribute('data-x_totel', $(this).attr('data-price'));
    //            li2_a.setAttribute('data-id_ppp', 'ppp' + P);
    //            document.getElementById("li1_Div" + P).appendChild(li2_a);
    //            document.getElementById('ppp' + P).innerHTML = '' + '( ' + Qet_Product + ' )   ' + Name_Product + '  = ' + price_Product + ' <a id="oioo' + P + '"  data-ID-Paragraph="' + P + '" href="#"  data-exit_id="exit' + P + '"  data-ip_div="comnt' + P + '" data-MinUnitPrice="' + MinUnitPrice + '" data-OnhandQty="' + OnhandQty + '" data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '" data-Qet_Product="' + Qet_Product + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
    //            var mCSB_3_container = document.getElementById("mCSB_3_container");
    //            mCSB_3_container.setAttribute('style', 'position: relative; top: -' + scro + 'px; left: 0px;');
    //            CChat.setAttribute('style', 'display: block');
    //            $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
    //            //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
    //            Num_Item.setAttribute('data_New_QET', P);
    //            Num_Add_List = P;
    //        }
    //    }
    //    Total_Price();
    //    Qet_X = P;
    //    //CChat.setAttribute('style', 'display: block;');
    //    //Total_Basket.setAttribute('style', 'display: block;');
    //    var boll = chat.getAttribute('class');
    //    var hide = ("chat-box-wrap shadow-reset animated zoomInLeft collapse");
    //    if (hide == boll) { x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Qet_X + '</i>'; }
    //    else { x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Qet_X + '</i>'; }
    //    Num_Add_List += 1;
    //}
    //function Display_Page_2() {
    //    Get_Data_From_Page1();
    //    //Remove_Item_in_Basket();
    //    document.getElementById("mCSB_3_container").innerHTML = "";
    //    P = 0;
    //    //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
    //    Num_Item.setAttribute('data_New_QET', P);
    //    x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + P + '</i>';
    //    if (P == 0) { CChat.setAttribute('style', 'display: none;'); Total_Basket.setAttribute('style', 'display: none;'); }
    //    var totalPirs = document.getElementById('All_Total_Basket');
    //    totalPirs.innerHTML = '0';
    //    Num_Add_List = 0;
    //    BuildBasket();
    //    txtCommission_Basket.value = txtCommission.value; 
    //}
    ////------------------------------------------------------Poup_Pass------------------------
    //function Open_poup_Pass() {
    //    $('#popu_Passowrd').attr('style', 'display:block;');
    //    $('#popu_Passowrd').attr('class', 'popu animated zoomInLeft');
    //    txt_ApprovePass.value = "";
    //    $("#Popup_Passowrd").modal("show");
    //    var Ul_List = document.getElementById('Ul_List_MinUnitPrice');
    //    Ul_List.innerHTML = '';
    //    for (var i = 0; i < List_MinUnitPrice.length; i++) {
    //        var li_List_MinUnitPrice = document.createElement('li');
    //        li_List_MinUnitPrice.setAttribute('id', 'li_List_MinUnitPrice' + i);
    //        li_List_MinUnitPrice.setAttribute('class', 'st_border_li_List_MinUnitPrice');
    //        Ul_List.appendChild(li_List_MinUnitPrice);
    //        var id_List = document.getElementById('li_List_MinUnitPrice' + i);
    //        id_List.innerHTML = '-( ' + List_MinUnitPrice[i].Name_Item + ' ) السعر (' + List_MinUnitPrice[i].Unitprice + ') الحد (0' + List_MinUnitPrice[i].MinUnitPrice + '0)';
    //    }
    //}
    //function btn_Approveprice_onclick() {
    //    //debugger;
    //    if (Men_Sales_2.getAttribute('style') == 'display: none;') {
    //        if (txt_ApprovePass.value == SysSession.CurrentEnvironment.I_Control[0].ExceedMinPricePassword) {
    //            Insert();
    //            $('#popu_Passowrd').attr('style', 'display:none;');
    //            $('#popu_Passowrd').attr('class', 'popu animated zoomOut');
    //            txt_ApprovePass.value = "";
    //            $("#Popup_Passowrd").modal("hide");
    //            $('#condtionbtn1').removeClass("col-lg-10");
    //            $('#condtionbtn1').addClass("col-lg-8");
    //            $('#condtionbtn2').removeClass("col-lg-2");
    //            $('#condtionbtn2').addClass("col-lg-4");
    //            $('#btnPrint').removeClass("display_none");
    //            $('#btnPrntPrice').removeClass("display_none");
    //            clear();
    //        }
    //        else {
    //            MessageBox.Show("لايمكن اعتماد الفاتورة", "خطأ");
    //            txt_ApprovePass.value = "";
    //        }
    //    }
    //    else {
    //        if (txt_ApprovePass.value == SysSession.CurrentEnvironment.I_Control[0].ExceedMinPricePassword) {
    //            Insert_Basket();
    //            Remove_Item_in_Basket();
    //            ValidationMinUnitPrice = 0;
    //            Validation_Insert = 0;
    //            txtCommission_Basket.value = "0";
    //            $('#popu_Passowrd').attr('style', 'display:none;');
    //            $('#popu_Passowrd').attr('class', 'popu animated zoomOut');
    //            txt_ApprovePass.value = "";
    //            $("#Popup_Passowrd").modal("hide");
    //            btnChanege_onclick();
    //            $('#condtionbtn1').removeClass("col-lg-10");
    //            $('#condtionbtn1').addClass("col-lg-8");
    //            $('#condtionbtn2').removeClass("col-lg-2");
    //            $('#condtionbtn2').addClass("col-lg-4");
    //            $('#btnPrint').removeClass("display_none");
    //            $('#btnPrntPrice').removeClass("display_none");
    //            clear();
    //        }
    //        else {
    //            MessageBox.Show("لايمكن اعتماد الفاتورة", "خطأ");
    //            txt_ApprovePass.value = "";
    //        }
    //    }
    //}
    //function btn_Exit_Approveprice_onclick() {
    //    $('#popu_Passowrd').attr('style', 'display:none;');
    //    $('#popu_Passowrd').attr('class', 'popu animated zoomOut');
    //    txt_ApprovePass.value = "";
    //    $("#Popup_Passowrd").modal("hide");
    //    Validation_Insert = 0;
    //}
})(SlsTrSales || (SlsTrSales = {}));
//# sourceMappingURL=SlsTrSales.js.map