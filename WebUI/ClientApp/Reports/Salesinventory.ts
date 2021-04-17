
$(document).ready(() => {
    ////debugger;
    Salesinventory.InitalizeComponent();
})

namespace Salesinventory {

    var AccType = 3;
    var compcode: Number;
    var SysSession: SystemSession = GetSystemSession();
    var sys: SystemTools = new SystemTools();
    //Arrays     
    var UserDetails: Array<LoginPage> = new Array<LoginPage>();
    var CustomerDetails: Array<CUSTOMER> = new Array<CUSTOMER>();

    var Get_IQ_The_Gard: Array<The_Gard> = new Array<The_Gard>();
    var SearchDetails: Array<The_Gard> = new Array<The_Gard>();
    var Selected_Data: Array<The_Gard> = new Array<The_Gard>();
    var AllGetStokMasterDetail: Array<ReviewSalesItemInfo> = new Array<ReviewSalesItemInfo>();
    var FamilyDetails: Array<CATEGRES> = new Array<CATEGRES>();
    var ItemFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var ItemBaesdFamilyDetails: Array<PRODUCT> = new Array<PRODUCT>();
    var OperationItemModel: Array<Stok_ORDER_DELIVERY> = new Array<Stok_ORDER_DELIVERY>();
    var OperationItemSingleModel: Stok_ORDER_DELIVERY = new Stok_ORDER_DELIVERY();

    var SlsMasterDetils: SlsMasterDetails = new SlsMasterDetails();


    var ddlStateType: HTMLSelectElement;
    var ddlSalesman: HTMLSelectElement;
    var ddlCustomerMaster: HTMLSelectElement;
    var ddlVendor: HTMLSelectElement;
    var ddlUserMaster: HTMLSelectElement;

    var id_divGridDetails: HTMLDivElement;

    // giedView
    var divMasterGrid: JsGrid = new JsGrid();
    //Textboxes
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var txtdateopening: HTMLInputElement;
    var txtDateHeader: HTMLInputElement;
    var txtNationality: HTMLSelectElement;
    //buttons 
    var btnPresent: HTMLButtonElement;
    var btnClose: HTMLButtonElement;
    var btnOpen: HTMLButtonElement;
    var btnView_load: HTMLButtonElement;
    var btnExpenses: HTMLButtonElement;
    var btnShow: HTMLButtonElement;
    var btnadd: HTMLButtonElement;

    var btnUpdate: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnBack: HTMLButtonElement;


    //new
    var txtClose_Adjustment: HTMLInputElement;
    var txtClose_SalesManCommition: HTMLInputElement;
    var txtClose_CompanyCommitionPrc: HTMLInputElement;
    var txtTruckNumber: HTMLInputElement;
    var txtPaperPurchaseValue: HTMLInputElement;
    var txtPortName: HTMLInputElement;
    var btnAddDetails: HTMLButtonElement;
    var btnAddDetailsCharge: HTMLButtonElement;
    var btnAddDetailslebel: HTMLButtonElement;
    var searchbutmemreport: HTMLInputElement;

    //flags 
    var CountGrid = -1;
    var CountItems = 0;

    export function InitalizeComponent() {

        debugger


        InitalizeControls();
        FillddlUserMaster();
        txtFromDate.value = GetDate();
        txtToDate.value = GetDate();
        IntializeEvents();

    }
    function InitalizeControls() {
        debugger

        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "جرد المبيعات";

        }
        else {
            document.getElementById('Screen_name').innerHTML = "Salesinventory";
        }


        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        //Drop Downlists

        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        ddlUserMaster = document.getElementById("ddlUserMaster") as HTMLSelectElement;
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;

    }
    function IntializeEvents() {

        btnShow.onclick = btnShow_onclick;
        //searchbutmemreport.onkeydown = _SearchBox_Change;
        //searchbutmemreport.onkeyup = _SearchBox_Change;
    }
    function GetDate() {
        debugger
        var today: Date = new Date();
        var dd: string = today.getDate().toString();
        var ReturnedDate: string;
        var mm: string = (today.getMonth() + 1).toString();
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
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Login", "GetAllUser"),
            data: {},
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    UserDetails = result.Response as Array<LoginPage>;
                    debugger

                    DocumentActions.FillCombowithdefult(UserDetails, ddlUserMaster, "UserName", "UserName", "اختار البائع");


                }
            }
        });
    }
    function FillddlCustomerMaster() {
        debugger
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Customer", "GetAll"),
            data: { CompCode: 1 },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CustomerDetails = result.Response as Array<CUSTOMER>;
                    debugger

                    DocumentActions.FillCombowithdefult(CustomerDetails, ddlCustomerMaster, "CUSTOMER_ID", "CUSTOMER_NAME", "اختار العميل");


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
        debugger
        var startdt = DateFormatDataBes(txtFromDate.value).toString();
        var enddt = DateFormatDataBes(txtToDate.value).toString();
        var ID_User ;


        
        //if (ddlCustomerMaster.value != "null") { CustomerId = Number(ddlCustomerMaster.value.toString()); }

        ID_User = ddlUserMaster.value == "null" ? 'All User' : ddlUserMaster.value;
        

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Inventory", "GetAll"),
            data: { EMPLOYEE_NAME: ID_User, FromDate: startdt, ToDate: enddt },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Get_IQ_The_Gard = result.Response as Array<The_Gard>;

                    InitializeGrid();
                    divMasterGrid.DataSource = Get_IQ_The_Gard;
                    divMasterGrid.Bind();
                }
            }
        });
    }
    function _SearchBox_Change() {
        //  k//debugger;
        debugger
        if (searchbutmemreport.value != "") {



            let search: string = searchbutmemreport.value.toLowerCase();
            SearchDetails = Get_IQ_The_Gard.filter(x => x.id_Num.toString().search(search) >= 0 || x.PRODUCT_NAME.toLowerCase().search(search) >= 0 || x.Shift_User.toLowerCase().search(search) >= 0 /*|| x.PortName.toLowerCase().search(search) >= 0*/);

            divMasterGrid.DataSource = SearchDetails;
            divMasterGrid.Bind();
        } else {
            divMasterGrid.DataSource = Get_IQ_The_Gard;
            divMasterGrid.Bind();
        }
    }
    function InitializeGrid() {
        //$("#divMasterGrid").attr("style", "");
        let res: any = GetResourceList("");
        divMasterGrid.ElementName = "divMasterGrid";
        divMasterGrid.Paging = true;
        divMasterGrid.PageSize = 10;
        divMasterGrid.Sorting = true;
        divMasterGrid.InsertionMode = JsGridInsertionMode.Binding;
        divMasterGrid.Editing = false;
        divMasterGrid.Inserting = false;
        divMasterGrid.SelectedIndex = 1;
        //divMasterGrid.OnRowDoubleClicked = ;
        divMasterGrid.PrimaryKey = "ID_ORDER_Delivery";
        divMasterGrid.Columns = [
            { title: "ID", name: "id_Num", type: "text", width: "2%", visible: false },
            { title: "رقم", name: "id_Num", type: "text", width: "10%" },
            { title: "اسم المنتج", name: "PRODUCT_NAME", type: "text", width: "12%" },
            { title: "سعر الشراء", name: "PRODUCT_Purchasing_price", type: "text", width: "20%" },
            { title: "سعر البيع", name: "PRODUCT_PRICE", type: "text", width: "20%" },
            { title: "الكميه", name: "PRODUCT_Qut", type: "text", width: "16%" },
            { title: "اجمالى", name: "Total_Price_One_Part", type: "text", width: "16%" },
            { title: "عجز", name: "Shortage", type: "text", width: "16%" },
            { title: "نسبة البيع", name: "Task", type: "text", width: "16%" },
            { title: "تاريخ", name: "Day_Date", type: "text", width: "16%" },
            { title: "المستخدم", name: "Shift_User", type: "text", width: "16%" },


        ];

    }
    //function DisplayData(Selected_Data: Array<The_Gard>) {
    //   debugger
    //alert(Selected_Data[0].TrDate);
    //console.log(Selected_Data[0].TrDate);
    //CountGrid = 0;
    //CountGridCharge = 0;
    //DocumentActions.RenderFromModel(Selected_Data[0]);
    //BindGetOperationItemsGridData(Selected_Data[0].ID_ORDER_Delivery);

    //var trDate: string = DateFormat(Selected_Data[0].TrDate);
    //$('#txtDate').val(trDate);

    //$('#txtClearanceDate').val(DateFormat(Selected_Data[0].ClearanceDate));
    //$('#txtdateopening').val(DateFormat(Selected_Data[0].OpenAt));
    //$('#ddlVendor').prop("value", Selected_Data[0].VendorID);
    //$('#txtNationality').prop("value", Selected_Data[0].NationalityID);
    //if (Selected_Data[0].SalesmanId != 0) {
    //    $('#ddlSalesman option[value=' + Selected_Data[0].SalesmanId + ']').prop('selected', 'selected').change();
    //}
    //else {
    //    $('#ddlSalesman option[value=null]').prop('selected', 'selected').change();
    //}
    //$('#div_Master').removeClass('disabledDiv');
    //$("#div_Master").attr("disabled", "disabled").off('click');
    //$("#div_Master").addClass("disabledDiv");

    //$('#txtStatus').val(Selected_Data[0].Status_DescA);

    //Status = Selected_Data[0].Status;


    //OperationID = Selected_Data[0].OperationID;

    //var Close_TrDate: string = DateFormat(Selected_Data[0].Close_TrDate);
    //$('#txtClose_TrDate').val(Close_TrDate);

    //Calculation_Close();

    //$('#Close_TotalSalesCredit').text(Selected_Data[0].Close_TotalSalesCredit);
    //$('#Close_TotalSalesCreditVAT').text(Selected_Data[0].Close_TotalSalesCreditVAT);
    //var AfterTotalSalesCreditVAT = Number(Selected_Data[0].Close_TotalSalesCredit) + Number(Selected_Data[0].Close_TotalSalesCreditVAT);
    //$('#Close_AfterTotalSalesCreditVAT').text(AfterTotalSalesCreditVAT);

    //$('#Close_TotalSalesCash').text(Selected_Data[0].Close_TotalSalesCash);
    //$('#Close_TotalSalesCashVAT').text(Selected_Data[0].Close_TotalSalesCashVAT);
    //var AfterTotalSalesCashVAT = Number(Selected_Data[0].Close_TotalSalesCash) + Number(Selected_Data[0].Close_TotalSalesCashVAT);
    //$('#Close_AfterTotalSalesCashVAT').text(AfterTotalSalesCashVAT);

    //$('#Close_AllTotalSale').text(Number(Selected_Data[0].Close_TotalSalesCash) + Number(Selected_Data[0].Close_TotalSalesCredit));
    //$('#Close_AllTotalSaleVAT').text(Number(Selected_Data[0].Close_TotalSalesCashVAT) + Number(Selected_Data[0].Close_TotalSalesCreditVAT));
    //$('#Close_AllAfterTotalSaleVAT').text(Number(AfterTotalSalesCreditVAT) + Number(AfterTotalSalesCashVAT));

    //$('#lab_Close_CashOnhand').text(Number(Selected_Data[0].Close_CashOnhand));
    //$('#lab_Close_CashOnBank').text(Number(Selected_Data[0].Close_CashOnBank));

    //showdiv();

    //$('#divlepRentdata_1').removeClass('showdiv');
    //$('#spanlepRentdata_1').toggleClass('fa-caret-left');
    //$('#spanlepRentdata_1').toggleClass('fa-caret-down');

    //$('#divlepRentdata_2').removeClass('showdiv');
    //$('#spanlepRentdata_2').toggleClass('fa-caret-left');
    //$('#spanlepRentdata_2').toggleClass('fa-caret-down');

    //$('#divlepRentdata_3').removeClass('showdiv');
    //$('#spanlepRentdata_3').toggleClass('fa-caret-left');
    //$('#spanlepRentdata_3').toggleClass('fa-caret-down');

    //$('#lepRentdata').removeClass('showdiv');
    //$('#spanlepRentdata_4').toggleClass('fa-caret-left');
    //$('#spanlepRentdata_4').toggleClass('fa-caret-down');



    //}
    //function BindGetOperationItemsGridData(ID_ORDER: number) {
    //    debugger
    //    Ajax.Callsync({
    //        type: "Get",
    //        url: sys.apiUrl("ReviewSales", "IQ_ReviewSalesItemInfo"),
    //        data: { ID_ORDER: ID_ORDER },
    //        success: (d) => {
    //            let result = d as BaseResponse;
    //            if (result.IsSuccess) {
    //                AllGetStokMasterDetail = result.Response as Array<ReviewSalesItemInfo>;

    //                $("#div_Data").html('');
    //                for (var i = 0; i < AllGetStokMasterDetail.length; i++) {

    //                    BuildControls(i);
    //                    Disbly_BuildControls(i, AllGetStokMasterDetail);
    //                    CountGrid = i;
    //                }

    //                $("#txtItemCount").val(CountGrid + 1);





    //            }
    //        }
    //    });
    //}



    //function FillddlFamily() {
    //    Ajax.Callsync({
    //        type: "Get",
    //        url: sys.apiUrl("Category", "GetAll"),
    //        data: {
    //            CompCode: 1
    //        },
    //        success: (d) => {
    //            //////debugger;
    //            let result = d as BaseResponse;
    //            if (result.IsSuccess) {
    //                FamilyDetails = result.Response as Array<CATEGRES>;
    //            }
    //        }
    //    });
    //}
    //function GetAllIItem() {
    //    debugger
    //    Ajax.Callsync({
    //        type: "Get",
    //        url: sys.apiUrl("Items", "GetAll"),//(int CompCode,int ItemFamilyID,int storeCode, string UserCode, string Token)
    //        data: {
    //            CompCode: 1
    //        },
    //        success: (d) => {
    //            ////////debugger;
    //            let result = d as BaseResponse;
    //            if (result.IsSuccess) {

    //                ItemFamilyDetails = result.Response as Array<PRODUCT>;

    //            }
    //        }
    //    });
    //}
    //function FillddlItems(ItemFamilyID: number) {
    //    debugger
    //    ItemBaesdFamilyDetails = ItemFamilyDetails.filter(x => x.ID_CAT == ItemFamilyID);
    //    //Ajax.Callsync({
    //    //    type: "Get",
    //    //    url: sys.apiUrl("StkDefItems", "GetAll"),//(int CompCode,int ItemFamilyID,int storeCode, string UserCode, string Token)
    //    //    data: {
    //    //        CompCode: compcode, ItemFamilyID: ItemFamilyID, storeCode: storeCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
    //    //    },
    //    //    success: (d) => {
    //    //        //////debugger;
    //    //        let result = d as BaseResponse;
    //    //        if (result.IsSuccess) {

    //    //            ItemBaesdFamilyDetails = result.Response as Array<PRODUCT>;
    //    //        }
    //    //    }
    //    //});
    //}



    //function Validation_Grid(rowcount: number) {
    //    //else
    //    debugger
    //    if ($("#ddlFamily" + rowcount).val() == "النوع" && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

    //        MessageBox.Show(" برجاءادخال النوع", "خطأ");

    //        return false
    //    }
    //    else if (($("#ddlItem" + rowcount).val() == "null" || $("#ddlItem" + rowcount).val() == "الصنف") && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

    //        MessageBox.Show(" برجاءادخال الصنف", "خطأ");
    //        return false
    //    }
    //    else if (($("#txtQuantity" + rowcount).val() == "" || $("#txtQuantity" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

    //        MessageBox.Show(" برجاءادخال الكمية", "خطأ");

    //        return false
    //    }
    //    else if (($("#txtPrice" + rowcount).val() == "" || $("#txtPrice" + rowcount).val() == 0) && ($("#txt_StatusFlag" + rowcount).val() != 'd')) {

    //        MessageBox.Show(" برجاءادخال السعر", "خطأ");

    //        return false
    //    }


    //    return true;

    //}





}