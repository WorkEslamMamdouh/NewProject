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
    var CategoryDetails = new Array();
    var MasterDetailModel = new SlsInvoiceMasterDetails();
    var InvoiceModel = new ORDER_Master();
    var List = new Array();
    var List_MinUnitPrice = new Array();
    var Model = new Stok_ORDER_DELIVERY();
    var div_menu = document.getElementById('thing');
    var theThing = document.querySelector("#thing");
    var container = document.querySelector("#contentContainer");
    var txtPrice;
    var txtTotal_Price;
    var txtTotAfterTax_Popu;
    var txtQuantity;
    var CChat;
    var Total_Basket;
    var ID_input = null;
    var btn_cancel_Popu;
    var btnminus_Quantity;
    var btnplus_Quantity;
    var btnminus_price;
    var btnplus_price;
    var All_item;
    var Finsh_Order;
    var txt_ApprovePass;
    var btn_Add_Basket;
    var btn_Edit_Basket;
    var btn_Approveprice;
    var btn_Exit_Approveprice;
    var Num_Qty = 0;
    var P = 0;
    var ItemID;
    var PRODUCT_price;
    var PRODUCT_NAME = "Null";
    var Qty = 0;
    var PRICE = 0;
    var ItemFamilyID;
    var IDPlus = 0;
    var zoom_select = 2.4;
    var scro = 0;
    var Num_Item;
    var x;
    var chat;
    var Qet_X = 0;
    var fouse;
    var Qet_Product = 0;
    var Name_Product;
    var OnhandQty;
    var MinUnitPrice;
    var ValidationMinUnitPrice = 0;
    var Validation_Insert = 0;
    var price_Product = 0;
    var price_One_Product = 0;
    var Num_paragraph;
    var New_ItemFamilyID;
    var storeCode;
    var Num_Add_List = 0;
    var num_item_IN_Menu = 0;
    var CatPlus = 0;
    var CatID;
    var Category_NAME;
    var class_input;
    var ItemFamilyID;
    var IDPlus = 0;
    //-------------------------------------------------------Customr-----------------------
    var Insert_But_Cust;
    var CUST_NAME;
    var CUST_ADDRES;
    var CUST_ADDRES_2;
    var CUST_Phone;
    var But_Cutomr;
    var div_cutomr;
    var hid_div_Customr;
    var update_div_cust;
    var cust_search_phone;
    var idCust;
    var fouse;
    var Num_Order;
    var Success;
    function InitalizeComponent() {
        debugger;
        $('#cont').toggleClass('colapsdivcont');
        $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').addClass('display_none');
        InitalizeControls();
        InitializeEvents();
        Display_Category();
        Display_But();
    }
    SlsTrSales.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "فواتير المبيعات";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Sales Invoices";
        }
        All_item = document.getElementById("All_item");
        btn_Add_Basket = document.getElementById("btn_Add_Basket");
        btn_Edit_Basket = document.getElementById("btn_Edit_Basket");
        btn_cancel_Popu = document.getElementById("btn_cancel_Popu");
        Finsh_Order = document.getElementById("Finsh_Order");
        btn_Exit_Approveprice = document.getElementById("btn_Exit_Approveprice");
        btnminus_Quantity = document.getElementById("btnminus_Quantity");
        btnplus_Quantity = document.getElementById("btnplus_Quantity");
        btnminus_price = document.getElementById("btnminus_price");
        btnplus_price = document.getElementById("btnplus_price");
        btn_Approveprice = document.getElementById("btn_Approveprice");
        CChat = document.getElementById("CChat");
        Total_Basket = document.getElementById("Total_Basket");
        Num_Item = document.getElementById('Num_Item');
        x = document.getElementById("x");
        chat = document.getElementById("chat");
        fouse = document.getElementById("fouse");
        txtPrice = document.getElementById('txtPrice');
        txtQuantity = document.getElementById('txtQuantity');
        txtTotal_Price = document.getElementById('txtTotal_Popu');
        txtTotAfterTax_Popu = document.getElementById('txtTotAfterTax_Popu');
        txt_ApprovePass = document.getElementById('txt_ApprovePass');
        //-------------------------------------------------------Customr-----------------------
        Insert_But_Cust = document.getElementById("Insert_But_Cust");
        CUST_NAME = document.getElementById("CUST_NAME");
        CUST_ADDRES = document.getElementById("CUST_ADDRES");
        CUST_ADDRES_2 = document.getElementById("CUST_ADDRES_2");
        CUST_Phone = document.getElementById("CUST_Phone");
        But_Cutomr = document.getElementById("But_Cutomr");
        div_cutomr = document.getElementById("div_cutomr");
        hid_div_Customr = document.getElementById("hid_div_Customr");
        update_div_cust = document.getElementById("update_div_cust");
        cust_search_phone = document.getElementById("cust_search_phone");
        idCust = document.getElementById("idCust");
        fouse = document.getElementById("fouse");
    }
    function InitializeEvents() {
        All_item.onclick = GetAll_item_onclick;
        btn_cancel_Popu.onclick = cancel_Popu_onclick;
        Finsh_Order.onclick = Finsh_Order_onclick;
        btn_Approveprice.onclick = btn_Approveprice_onclick;
        btn_Exit_Approveprice.onclick = btn_Exit_Approveprice_onclick;
        btnminus_Quantity.onclick = btnminus_Quantity_onclick;
        btnplus_Quantity.onclick = btnminus_Quantity_onclick;
        btnminus_price.onclick = btnminus_price_onclick;
        btnplus_price.onclick = btnminus_price_onclick;
        txtPrice.onkeyup = Total;
        txtQuantity.onkeyup = Total;
        btn_Add_Basket.onclick = But_Add_Popu;
        btn_Edit_Basket.onclick = Edit_ROW_IN_Basket;
        $('.compose-discard-bt').click(Remove_Item_in_Basket);
        //-------------------------------------------------------Customr-----------------------
        Insert_But_Cust.onclick = add_cust;
        But_Cutomr.onclick = show_Cutomr;
        hid_div_Customr.onclick = hide_Custm;
        update_div_cust.onclick = update_cust;
        cust_search_phone.onkeyup = get_cust;
    }
    //--------------------------------------------------Display_Category--------------------------------
    function Display_Category() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Category", "GetAll"),
            data: { CompCode: 1 },
            success: function (d) {
                ////////debugger;
                var result = d;
                if (result.IsSuccess) {
                    CategoryDetails = result.Response;
                    for (var i = 0; i < CategoryDetails.length; i++) {
                        Category_NAME = CategoryDetails[i].Name_CAT;
                        CatID = CategoryDetails[i].ID_CAT;
                        CatPlus = i;
                        Create_Category();
                    }
                }
            }
        });
    }
    function Create_Category() {
        var test_Category = document.getElementById("button_Category" + CatPlus);
        if (test_Category == null) {
            var button_Category = document.createElement('button');
            button_Category.setAttribute('id', 'id' + CatPlus);
            button_Category.setAttribute('type', 'button');
            button_Category.setAttribute('data-CatID', CatID);
            button_Category.setAttribute('class', 'btn btn-info Style_Category');
            button_Category.setAttribute('value', Category_NAME);
            document.getElementById("div_Category").appendChild(button_Category);
            document.getElementById('id' + CatPlus + '').innerHTML = Category_NAME;
            $('#id' + CatPlus + '').click(Selecte_Category);
        }
    }
    function GetAll_item_onclick() {
        debugger;
        document.getElementById("uul").innerHTML = '';
        blur_but();
        DisplayItems(FamilyDetails);
    }
    function Selecte_Category() {
        blur_but();
        CatID = $(this).attr('data-CatID');
        var Category = FamilyDetails.filter(function (x) { return x.ID_CAT == Number(CatID); });
        document.getElementById("uul").innerHTML = '';
        DisplayItems(Category);
    }
    //--------------------------------------------------Display_But--------------------------------
    function Display_But() {
        debugger;
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
        debugger;
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
            Qty = ItemList[i].PRODUCT_QET;
            PRICE = ItemList[i].PRODUCT_PRICE;
            MinUnitPrice = ItemList[i].PRODUCT_Purchasing_price;
            ItemID = ItemList[i].PRODUCT_ID;
            IDPlus = i;
            AddBut();
        }
    }
    function AddBut() {
        debugger;
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
            div.setAttribute('data-itemid', ItemID);
            div.setAttribute('data-id_Menu', 'li_menu' + IDPlus);
            div.setAttribute('data-ul_menu', 'ul_menu' + IDPlus);
            div.setAttribute('data-div_menu', 'div_menu' + IDPlus);
            div.setAttribute('data-Name', PRODUCT_NAME);
            div.setAttribute('data-Qty', Qty.toString());
            div.setAttribute('data-pirce', PRICE.toString());
            div.setAttribute('data-MinUnitPrice', MinUnitPrice);
            div.setAttribute('style', 'zoom:2.4;font-size: 8px;font-weight: bold;');
            div.setAttribute('class', 'Css_but chat-box-wrap shadow-reset ' + class_input + '');
            document.getElementById("li_input" + IDPlus + "").appendChild(div);
        }
        $('#input' + IDPlus).click(click_but);
        $('#input' + IDPlus).blur(blur_but);
        $('#input' + IDPlus).keyup(mousemove_but);
        $('#input' + IDPlus).mousemove(mousemove_but);
        $('#input' + IDPlus).mouseleave(mouseleave_but);
    }
    function blur_but() {
    }
    function mousemove_but() {
        if (this.getAttribute('data-Qty') > 0) {
            //this.setAttribute('style', 'background-color: #00ffe23d; zoom:' + zoom_select + ';');
            //this.setAttribute('class', 'Css_but chat-box-wrap shadow-reset  animated pulse');
            this.setAttribute('value', '( ' + this.getAttribute('data-pirce') + ' )' + 'ج');
        }
        else {
            //this.setAttribute('style', 'zoom:' + zoom_select + ';background-color: #c80202db;');
            //this.setAttribute('class', 'Css_but chat-box-wrap shadow-reset  animated pulse');
            this.setAttribute('value', 'Finish');
        }
        //this.focus();
    }
    function mouseleave_but() {
        this.setAttribute('value', this.getAttribute('data-Name'));
    }
    function click_but() {
        btn_Add_Basket.setAttribute('style', 'display:block;');
        btn_Edit_Basket.setAttribute('style', 'display:none;');
        Name_Product = $(this).attr('data-Name');
        OnhandQty = $(this).attr('data-Qty');
        MinUnitPrice = $(this).attr('data-MinUnitPrice');
        for (var i = 0; i < Num_Add_List + 1; i++) {
            var prgraph = document.getElementById("ppp" + i);
            if (prgraph != null) {
                var Name_Item = prgraph.getAttribute("data_name_p");
                var Qty_1 = Number(prgraph.getAttribute("data_qet_p"));
                if (Name_Item == Name_Product) {
                    OnhandQty = OnhandQty - Qty_1;
                }
            }
        }
        if (OnhandQty <= 0) {
            $(this).val('Finish');
        }
        else {
            $('#id_Labol').html('متاح (' + OnhandQty + ') من  ' + Name_Product + '');
            $('#Men_popu').attr('style', 'display:block;');
            $('#Men_popu').attr('class', 'popu animated zoomInLeft');
            $('#txtQuantity').val('1');
            $('#txtPrice').val($(this).attr('data-pirce'));
            ItemID = $(this).attr('data-itemid');
            PRODUCT_price = $(this).attr('data-pirce');
            $("#PopupDialog").modal("show");
            blur_but();
            Total();
        }
    }
    ////--------------------------------------------------Create_Menu--------------------------------    
    ////--------------------------------------------------Open_Popu--------------------------------
    function btnminus_Quantity_onclick() {
        //debugger
        var type = $(this).attr('data-type');
        var input = $("#txtQuantity");
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
                if (currentVal < Number(OnhandQty)) {
                    if (currentVal < Number(input.attr('max'))) {
                        input.val((currentVal + 1)).change();
                    }
                    if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
                        $(this).val(input.attr('max'));
                    }
                }
                else {
                    MessageBox.Show("خطأ الكميه المتاحه (" + OnhandQty + ")", "خطأ");
                }
            }
        }
        else {
            input.val(1);
        }
        Total();
    }
    function btnminus_price_onclick() {
        var type = $(this).attr('data-type');
        var input = $("#txtPrice");
        var currentVal = parseFloat(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                if (currentVal > Number(input.attr('min'))) {
                    input.val((currentVal - 0.5)).change();
                }
                if (parseFloat(input.val()) == Number(input.attr('min'))) {
                    $(this).val(input.attr('min'));
                }
            }
            else if (type == 'plus') {
                if (currentVal < Number(input.attr('max'))) {
                    input.val((currentVal + 0.5)).change();
                }
                if (parseFloat(input.val()) == parseFloat(input.attr('max'))) {
                    $(this).val(input.attr('max'));
                }
            }
        }
        else {
            input.val(1);
        }
        Total();
    }
    function cancel_Popu_onclick() {
        $("#PopupDialog").modal("hide");
        $('#Men_popu').attr('class', 'popu animated zoomOutUp');
    }
    function Total() {
        if (Number($("#txtQuantity").val()) <= OnhandQty) {
            var total = Number($("#txtPrice").val()) * Number($("#txtQuantity").val());
            $("#txtTotal_Popu").val(total);
        }
        else {
            $("#txtQuantity").val(OnhandQty);
            MessageBox.Show("خطأ الكميه المتاحه (" + OnhandQty + ")", "خطأ");
            Total();
        }
    }
    function But_Add_Popu() {
        debugger;
        price_One_Product = parseFloat($("#txtPrice").val());
        price_Product = parseFloat($("#txtPrice").val());
        PRODUCT_price = parseFloat($("#txtPrice").val());
        Qet_Product = Number(txtQuantity.value);
        Add_ROW_IN_Basket();
        $("#PopupDialog").modal("hide");
        $('#Men_popu').attr('class', 'popu animated zoomOutRight');
    }
    ////--------------------------------------------------Basket--------------------------------
    function Edit_ROW_IN_Basket() {
        //debugger
        price_One_Product = parseFloat($("#txtPrice").val());
        price_Product = parseFloat($("#txtPrice").val());
        Qet_Product = Number(txtQuantity.value);
        var paragraph = document.getElementById('ppp' + Num_paragraph);
        var New_QET = Qet_Product;
        var New_price = price_Product;
        paragraph.setAttribute('data_QET_P', New_QET.toString());
        paragraph.setAttribute('data_total_price', New_price.toString());
        paragraph.innerHTML = '( ' + New_QET + ' )   ' + Name_Product + '  = ' + New_price + ' <a id="oioo' + Num_paragraph + '"  data-ID-Paragraph="' + Num_paragraph + '" href="#"  data-exit_id="exit' + Num_paragraph + '"  data-ip_div="comnt' + Num_paragraph + '" data-MinUnitPrice="' + MinUnitPrice + '" data-OnhandQty="' + OnhandQty + '" data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '"  data-Qet_Product="' + New_QET + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
        $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
        $('#Men_popu').attr('class', 'popu animated zoomOutRight');
        $("#PopupDialog").modal("hide");
        Total_Price();
    }
    function Add_ROW_IN_Basket() {
        debugger;
        price_One_Product = parseFloat($("#txtPrice").val());
        price_Product = parseFloat($("#txtPrice").val());
        Qet_Product = Number(txtQuantity.value);
        var tttt = 1;
        if (P > -1) {
            for (var i = 1; i < P + 1; i++) {
                debugger;
                var paragraph = document.getElementById('ppp' + i);
                if (paragraph == null) { }
                else {
                    var Saerch = paragraph.getAttribute('data_Name_P');
                    if (Saerch == Name_Product) {
                        debugger;
                        var New_P = paragraph.getAttribute('data-New_P');
                        var QET_P = paragraph.getAttribute('data_QET_P');
                        var New_QET = Number(paragraph.getAttribute('data_QET_P')) + Qet_Product;
                        var price_P = paragraph.getAttribute('data_total_price');
                        var New_price = Number(price_Product) + parseFloat(price_P);
                        paragraph.setAttribute('data_QET_P', New_QET.toString());
                        paragraph.setAttribute('data_total_price', New_price.toString());
                        paragraph.innerHTML = '( ' + New_QET + ' )   ' + Name_Product + '  = ' + New_price + ' <a id="oioo' + New_P + '" href="#" data-ID-Paragraph="' + New_P + '"  data-exit_id="exit' + New_P + '"  data-ip_div="comnt' + New_P + '" data-MinUnitPrice="' + MinUnitPrice + '" data-OnhandQty="' + OnhandQty + '" data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '"  data-Qet_Product="' + New_QET + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
                        $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
                        tttt = 2;
                        break;
                    }
                }
            }
        }
        if (tttt == 1) {
            debugger;
            P += 1;
            scro += 80;
            var Qet = 1;
            if (CChat.getAttribute('style') != "display: block") {
                if (document.getElementById("mCSB_3_container").innerHTML == '') {
                    var Ul_Div = document.createElement('ul');
                    Ul_Div.setAttribute('id', 'Ul_Div');
                    document.getElementById("mCSB_3_container").appendChild(Ul_Div);
                }
            }
            var Li_Ul_Div = document.createElement('ul');
            Li_Ul_Div.setAttribute('id', 'Li_Ul_Div' + P);
            Li_Ul_Div.setAttribute('style', 'margin: 14px 0px 0px 0px;');
            document.getElementById("Ul_Div").appendChild(Li_Ul_Div);
            var li1_Div = document.createElement('li');
            li1_Div.setAttribute('id', 'li1_Div' + P);
            document.getElementById("Li_Ul_Div" + P).appendChild(li1_Div);
            var li2_Div = document.createElement('li');
            li2_Div.setAttribute('id', 'li2_Div' + P);
            document.getElementById("Li_Ul_Div" + P).appendChild(li2_Div);
            var divv = document.createElement('div');
            divv.setAttribute('class', 'author-chat');
            divv.setAttribute('id', 'div' + P);
            document.getElementById("li2_Div" + P).appendChild(divv);
            var ppp = document.createElement('p');
            ppp.setAttribute('id', 'ppp' + P);
            ppp.setAttribute('class', 'chat-box-wrap shadow-reset ');
            ppp.setAttribute('style', 'width: 96%;');
            ppp.setAttribute('data_Name_P', Name_Product);
            ppp.setAttribute('data_price_P', PRODUCT_price.toString());
            ppp.setAttribute('data_ItemId', ItemID.toString());
            //ppp.setAttribute('data_ItemFamilyID', New_ItemFamilyID.toString());
            ppp.setAttribute('data_QET_P', Qet_Product.toString());
            ppp.setAttribute('data_total_price', price_Product.toString());
            ppp.setAttribute('data-New_P', P.toString());
            ppp.setAttribute('data-MinUnitPrice', MinUnitPrice);
            document.getElementById("div" + P).appendChild(ppp);
            var divvv = document.createElement('input');
            divvv.setAttribute('type', 'text');
            divvv.setAttribute('id', 'comnt' + P);
            divvv.setAttribute('class', 'author-chat alert alert-warning alert-st-three alert-st-bg2');
            divvv.setAttribute('style', 'display: none; margin: -43px 0px -25px 12px;float: left;height: 0px;width: 231px;font-size: 14px;padding: 14px;border-radius: 37px; position: relative;background-color: #a3a3a3;color: white;');
            document.getElementById("div" + P).appendChild(divvv);
            var exit_i = document.createElement('a');
            exit_i.setAttribute('id', 'exit' + P);
            exit_i.setAttribute('class', 'adminpro-icon adminpro-check-icon');
            exit_i.setAttribute('href', '#');
            exit_i.setAttribute('data-id_Nots', 'comnt' + P);
            exit_i.setAttribute('data-id_But_Nots', 'oioo' + P);
            exit_i.setAttribute('data-id_Pragraph', 'ppp' + P);
            exit_i.setAttribute('style', 'display:none;margin: -38px -39px 0px -192px;float: left;height: 0px;width: 231px;font-size: 21px;border-radius: 37px;position: relative;color: #2e617f; padding: 0px;');
            document.getElementById("div" + P).appendChild(exit_i);
            var li2_a = document.createElement('a');
            li2_a.setAttribute('id', 'a');
            li2_a.setAttribute('href', '#');
            li2_a.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInUp fa fa-remove class_ex_liest_chate');
            li2_a.setAttribute('data_Id_Ul', 'Li_Ul_Div' + P);
            li2_a.setAttribute('data_id_Pragraph', 'ppp' + P);
            li2_a.setAttribute('data-x_totel', $(this).attr('data-price'));
            li2_a.setAttribute('data-id_ppp', 'ppp' + P);
            document.getElementById("li1_Div" + P).appendChild(li2_a);
            document.getElementById('ppp' + P).innerHTML = '' + '( ' + Qet_Product + ' )   ' + Name_Product + '  = ' + price_Product + ' <a id="oioo' + P + '"  data-ID-Paragraph="' + P + '" href="#"  data-exit_id="exit' + P + '"  data-ip_div="comnt' + P + '"  data-MinUnitPrice="' + MinUnitPrice + '"  data-OnhandQty="' + OnhandQty + '"   data-Name="' + Name_Product + '" data-price_One="' + price_One_Product + '" data-Qet_Product="' + Qet_Product + '" class="chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit"         style="font-size: 13px;padding: 4px;border-radius: 20px;color: #fdff61;margin: 0px 10px 0px 0px;"           ></a> ';
            var mCSB_3_container = document.getElementById("mCSB_3_container");
            //mCSB_3_container.setAttribute('style', 'position: relative; top: -' + scro + 'px; left: 0px;');
            CChat.setAttribute('style', 'display: block');
            $('#Ul_Div li a').click(click_Remove_Item_in_Basket);
            //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
            Num_Item.setAttribute('data_New_QET', P);
            New_QET = P;
            Num_Qty += 1;
        }
        Total_Price();
        Qet_X = P;
        CChat.setAttribute('style', 'display: block;');
        Total_Basket.setAttribute('style', 'display: block;');
        var boll = chat.getAttribute('class');
        var hide = ("chat-box-wrap shadow-reset animated zoomInLeft collapse");
        if (hide == boll) {
            x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Num_Qty + '</i>';
        }
        else {
            x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Num_Qty + '</i>';
        }
        Num_Add_List += 1;
    }
    function Show_Basket() {
        var CChat = document.getElementById("CChat");
        x.setAttribute('class', '');
        CChat.setAttribute('class', 'Basket');
        CChat.setAttribute('aria-expanded', 'true');
        chat.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInLeft collapse in');
        chat.setAttribute('aria-expanded', 'true');
        chat.setAttribute('style', '');
    }
    function Hide_Basket() {
        //var CChat = document.getElementById("CChat");
        //x.setAttribute('class', '');
        //CChat.setAttribute('class', 'Basket');
        //CChat.setAttribute('aria-expanded', 'true');
        chat.setAttribute('class', 'chat-box-wrap shadow-reset animated zoomInLeft collapse');
        chat.setAttribute('style', 'width: 28%; border-radius: 16px; height: 0px;');
        chat.setAttribute('aria-expanded', 'false');
    }
    function Remove_Item_in_Basket() {
        ////debugger
        var liuu = document.getElementById("Ul_Div");
        document.getElementById("mCSB_3_container").removeChild(liuu);
        var Ul_Div = document.createElement('ul');
        Ul_Div.setAttribute('id', 'Ul_Div');
        document.getElementById("mCSB_3_container").appendChild(Ul_Div);
        P = 0;
        Num_Qty = 0;
        //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
        Num_Item.setAttribute('data_New_QET', P);
        x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + P + '</i>';
        if (P == 0) {
            CChat.setAttribute('style', 'display: none;');
            Total_Basket.setAttribute('style', 'display: none;');
        }
        var totalPirs = document.getElementById('All_Total_Basket');
        totalPirs.innerHTML = '0';
        totalPirs.setAttribute('All_Total', '0');
        Num_Add_List = 0;
        ValidationMinUnitPrice = 0;
        Validation_Insert = 0;
    }
    function click_Remove_Item_in_Basket() {
        var coment = document.getElementById($(this).attr('id'));
        var Edit_Id = coment.getAttribute('class');
        //debugger
        if (Edit_Id == "chat-box-wrap shadow-reset animated zoomInLeft fa big-icon fa-edit") {
            //debugger
            Num_paragraph = $(this).attr('data-ID-Paragraph');
            click_Edit($(this).attr('data-name'), Number($(this).attr('data-price_one')), Number($(this).attr('data-qet_product')), Number($(this).attr('data-onhandqty')), Number($(this).attr('data-minunitprice')));
        }
        else {
            var id_Pragraph = document.getElementById($(this).attr('data_id_Pragraph'));
            if (id_Pragraph == null) {
            }
            else {
                Num_Qty -= 1;
                //Num_Item.innerHTML = "عدد الاصناف ( " + P + " )";
                Num_Item.setAttribute('data_New_QET', Num_Qty);
                x.innerHTML = '<i id="remo" class="fa" style="margin-top: 0px;font-size: 21px;">' + Num_Qty + '</i>';
                if (P == 0) {
                    CChat.setAttribute('style', 'display: none;');
                    Total_Basket.setAttribute('style', 'display: none;');
                }
                var id_ul = document.getElementById($(this).attr('data_Id_Ul'));
                document.getElementById("Ul_Div").removeChild(id_ul);
                Total_Price();
            }
        }
    }
    function Total_Price() {
        ////debugger
        var New_Total = 0;
        for (var i = 1; i <= P + 1; i++) {
            ////debugger
            var par = document.getElementById('ppp' + i);
            if (par != null) {
                var P_total = par.getAttribute('data_total_price');
                New_Total += parseFloat(P_total);
                Total_Basket.setAttribute('style', 'display: block;');
                document.getElementById('All_Total_Basket').innerHTML = "( " + Number(New_Total).toFixed(2).toString() + " )";
                document.getElementById('All_Total_Basket').setAttribute('All_Total', Number(New_Total).toFixed(2).toString());
            }
        }
    }
    ////------------------------------------------------------Edit-----------------------------------
    function click_Edit(New_Name, New_Pirce, new_Qet, New_OnhandQty, New_MinUnitPrice) {
        //debugger
        btn_Add_Basket.setAttribute('style', 'display:none;');
        btn_Edit_Basket.setAttribute('style', 'display:block;');
        Name_Product = New_Name;
        OnhandQty = New_OnhandQty;
        MinUnitPrice = New_MinUnitPrice;
        //$('#id_Labol').html('الكميه المتاحه (' + New_OnhandQty + ') من ( ' + New_Name + ' )');
        //$('#id_Labol').html('الكميه المتاحه (' + New_OnhandQty + ') من ( ' + New_Name + ' ) ');
        //$('#id_Labol').html(New_Name);
        $('#id_Labol').html('متاح (' + New_OnhandQty + ') من  ' + New_Name + '');
        $('#Men_popu').attr('style', 'display:block;');
        $('#Men_popu').attr('class', 'popu animated zoomInLeft');
        $('#txtQuantity').val(new_Qet);
        $('#txtPrice').val(New_Pirce);
        $("#PopupDialog").modal("show");
        Total();
    }
    ////------------------------------------------------------Assign_Get_Data------------------------      
    function Assign_Get_Data() {
        List = new Array();
        List_MinUnitPrice = new Array();
        InvoiceModel.UserName = SysSession.CurrentEnvironment.UserCode;
        InvoiceModel.Namber_Order_Delivery = 1;
        InvoiceModel.Total_All = Number($('#All_Total_Basket').attr('All_Total'));
        InvoiceModel.Date_Order_Delivery = DateTimeFormat(Date().toString());
        InvoiceModel.Tax = 0;
        InvoiceModel.CUSTOMER_ID = 9;
        InvoiceModel.type_order = 'Delivery';
        InvoiceModel.Confirmation = true;
        for (var i = 1; i < Num_Add_List + 1; i++) {
            var prgraph = document.getElementById("ppp" + i);
            if (prgraph != null) {
                Model = new Stok_ORDER_DELIVERY();
                var Name_Item = prgraph.getAttribute("data_name_p");
                var Item_ID = Number(prgraph.getAttribute("data_itemid"));
                var ItemFamily_ID = Number(prgraph.getAttribute("data_itemfamilyid"));
                var Qty_2 = Number(prgraph.getAttribute("data_qet_p"));
                var Price_Item = Number(prgraph.getAttribute("data_price_p"));
                var Total_Price_1 = Number(prgraph.getAttribute("data_total_price"));
                var MinPrice = prgraph.getAttribute("data-minunitprice");
                var get_Price_on_seller = document.getElementById("oioo" + prgraph.getAttribute("data-new_p"));
                var Price_on_seller = get_Price_on_seller.getAttribute("data-price_one");
                Model.ID_DELIVERY = 0;
                Model.Name_Product_sell = Name_Item;
                Model.Quantity_sell = Number(Qty_2);
                Model.price_One_part = Number(Price_Item);
                Model.Total_Price_One_Part = Number(Total_Price_1);
                Model.Notes_Order = MinPrice;
                Model.FK_ORDER_Delivery = 0;
                List.push(Model);
                MasterDetailModel.I_Sls_TR_Invoice = InvoiceModel;
                MasterDetailModel.I_Sls_TR_InvoiceItems = List;
                if (ValidationMinUnitPrice == 1) {
                    if (Number(Price_on_seller) < Number(MinPrice)) {
                        List_MinUnitPrice.push(Model);
                        Validation_Insert = 1;
                    }
                }
            }
        }
    }
    function Finsh_Order_onclick() {
        if (P != 0) {
            //if (!SysSession.CurrentPrivileges.AddNew) return;
            //if (!ValidationHeader_On_Chanege()) return;
            ValidationMinUnitPrice = 1;
            Assign_Get_Data();
            if (Validation_Insert != 1) {
                Insert_Basket();
                if (Success == true) {
                    Remove_Item_in_Basket();
                    ValidationMinUnitPrice = 0;
                    Validation_Insert = 0;
                    FamilyDetails = new Array();
                    $('#uul').html('');
                    Display_But();
                }
            }
            else {
                Open_poup_Pass();
            }
        }
        else {
            MessageBox.Show(" برجاء اختيار الاصناف", "خطأ");
        }
    }
    function Insert_Basket() {
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("SlsTrSales", "InsertInvoiceMasterDetail"),
            data: JSON.stringify(MasterDetailModel),
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    var res = result.Response;
                    MessageBox.Show(" تم اصدار  فاتورة رقم  " + res + " ", "تم");
                    Success = true;
                    Hide_Basket();
                }
                else {
                    Success = false;
                    MessageBox.Show("هناك خطـأ ", "خطاء");
                }
            }
        });
    }
    ////------------------------------------------------------Poup_Pass------------------------
    function Open_poup_Pass() {
        $('#popu_Passowrd').attr('style', 'display:block;');
        $('#popu_Passowrd').attr('class', 'popu animated zoomInLeft');
        txt_ApprovePass.value = "";
        $("#Popup_Passowrd").modal("show");
        var Ul_List = document.getElementById('Ul_List_MinUnitPrice');
        Ul_List.innerHTML = '';
        for (var i = 0; i < List_MinUnitPrice.length; i++) {
            var li_List_MinUnitPrice = document.createElement('li');
            li_List_MinUnitPrice.setAttribute('id', 'li_List_MinUnitPrice' + i);
            li_List_MinUnitPrice.setAttribute('class', 'st_border_li_List_MinUnitPrice');
            Ul_List.appendChild(li_List_MinUnitPrice);
            var id_List = document.getElementById('li_List_MinUnitPrice' + i);
            id_List.innerHTML = '-( ' + List_MinUnitPrice[i].Name_Product_sell + ' ) السعر (' + List_MinUnitPrice[i].price_One_part + ') الحد ( ' + List_MinUnitPrice[i].Notes_Order + ' )';
        }
    }
    function btn_Approveprice_onclick() {
        //debugger;
        if (txt_ApprovePass.value == '1234') {
            Insert_Basket();
            if (Success == true) {
                Remove_Item_in_Basket();
                ValidationMinUnitPrice = 0;
                Validation_Insert = 0;
                FamilyDetails = new Array();
                $('#uul').html('');
                Display_But();
                $('#popu_Passowrd').attr('style', 'display:none;');
                $('#popu_Passowrd').attr('class', 'popu animated zoomOut');
                txt_ApprovePass.value = "";
                $("#Popup_Passowrd").modal("hide");
            }
        }
        else {
            MessageBox.Show("لايمكن اعتماد الفاتورة", "خطأ");
            txt_ApprovePass.value = "";
        }
    }
    function btn_Exit_Approveprice_onclick() {
        $('#popu_Passowrd').attr('style', 'display:none;');
        $('#popu_Passowrd').attr('class', 'popu animated zoomOut');
        txt_ApprovePass.value = "";
        $("#Popup_Passowrd").modal("hide");
        Validation_Insert = 0;
    }
    //-------------------------------------------------------Customr-----------------------
    function show_Cutomr() {
        debugger;
        document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset animated zoomIn collapse in castmr animated shake');
        document.getElementById("div_cutomr").setAttribute('aria-expanded', 'true');
        document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: 356px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #4386da; border - radius: 50px;');
        cust_search_phone.focus();
    }
    function hide_Custm() {
        //ElWassem.Reservation_CUSTOMER();
        if (idCust.value == "0" || idCust.value == "") {
            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: 356px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #4386da; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');
            CUST_NAME.value = "";
            CUST_ADDRES.value = "";
            CUST_ADDRES_2.value = "";
            CUST_Phone.value = "";
            cust_search_phone.value = "";
            idCust.value = "";
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset animated zoomOut collapse  castmr ');
            document.getElementById("div_cutomr").setAttribute('aria-expanded', 'true');
            document.getElementById("But_Cutomr").setAttribute('style', 'bottom: 40px;right: 25px;height: 40px;width: 40px;background:-moz-linear-gradient(left,rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1) 100%);background:-webkit-gradient(left top,right top,color-stop(0%,rgba(255,127,77,1)),color-stop(100 %, rgba(255, 80, 10, 1)));background:-o-linear-gradient(left, rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1)100%);background:linear-gradient(to right, #03a9f412 0%, #337ab7 100%);z-index: 999;line-height: 40px;text-align:center;border-radius:50%;cursor:pointer;color: #fff;font-size: 30px; ');
        }
        else {
            debugger;
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset animated zoomOut collapse  castmr ');
            document.getElementById("div_cutomr").setAttribute('aria-expanded', 'true');
            document.getElementById("But_Cutomr").setAttribute('style', 'bottom: 40px;right: 25px;height: 40px;width: 40px;background:-moz-linear-gradient(left,rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1) 100%);background:-webkit-gradient(left top,right top,color-stop(0%,rgba(255,127,77,1)),color-stop(100 %, rgba(255, 80, 10, 1)));background:-o-linear-gradient(left, rgba(255, 127, 77, 1)0%,rgba(255, 80, 10, 1)100%);background:linear-gradient(to right, #03a9f412 0%, #22e000 100%);z-index: 999;line-height: 40px;text-align:center;border-radius:50%;cursor:pointer;color: #fff;font-size: 30px;margin-right: 359px;');
        }
        //fouse.focus();
    }
    function add_cust() {
        debugger;
        if (CUST_NAME.value == "" || CUST_Phone.value == "") {
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr ');
            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: 356px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #c12a2a; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr animated shake');
            idCust.value = "0";
        }
        else {
        }
    }
    function update_cust() {
        debugger;
        if (CUST_NAME.value == "" || CUST_Phone.value == "") {
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr ');
            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: 356px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #c12a2a; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr animated shake');
            idCust.value = "0";
        }
        else {
        }
    }
    function get_cust() {
        debugger;
        if (cust_search_phone.value == "") {
            CUST_NAME.value = "";
            CUST_ADDRES.value = "";
            CUST_ADDRES_2.value = "";
            CUST_Phone.value = "";
            idCust.value = "";
            document.getElementById("div_cutomr").setAttribute('style', 'position: fixed;height: 414px;width: 689px;background: linear - gradient(to right, rgb(22, 58, 71) 0%, #457198 100%);bottom: 90px;right: 356px;top: 91px;transition: all .4s ease 0s;z - index: 999;border: 23px solid #4386da; border - radius: 50px;');
            document.getElementById("div_cutomr").setAttribute('class', 'chat-box-wrap shadow-reset collapse in castmr');
        }
        else {
        }
    }
})(SlsTrSales || (SlsTrSales = {}));
//# sourceMappingURL=SlsTrSales.js.map