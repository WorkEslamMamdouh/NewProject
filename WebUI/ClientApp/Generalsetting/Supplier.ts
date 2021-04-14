$(document).ready(() => {

    AccDefVendor.InitalizeComponent();
})

namespace AccDefVendor {
    // Arrays

    var AccountType: Number = 2;
    var MSG_ID: number;
    var Details: Array<Supplier> = new Array<Supplier>();
    var Display: Array<Supplier> = new Array<Supplier>();
    var SearchDetails: Array<Supplier> = new Array<Supplier>();
    var BilldIData: Array<Supplier> = new Array<Supplier>();
    var Model: Supplier = new Supplier();

    var ReportGrid: JsGrid = new JsGrid();
    var CashDetailsAr: Array<string> = new Array<string>();
    var CashDetailsEn: Array<string> = new Array<string>();

    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();



    var txt_Cust_Type: HTMLSelectElement;
    var txt_Category: HTMLSelectElement;
    var txt_tax: HTMLSelectElement;
    var txt_Grop: HTMLSelectElement;
    var ddlNationality: HTMLSelectElement;
    var txtVendorType_New: HTMLSelectElement;




    var btnback: HTMLButtonElement;
    var btnShow: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var btnsave: HTMLButtonElement;

    var txt_CustomerCODE: HTMLInputElement;

    var txt_NAME: HTMLInputElement;

    var txt_ADDRESS: HTMLInputElement;
    var txt_MOBILE: HTMLInputElement;
    var txt_TEL: HTMLInputElement;
    var txt_IDNo: HTMLInputElement;
    var txt_WorkTel: HTMLInputElement;
    var txt_note: HTMLInputElement;

    var txt_VatNo: HTMLInputElement;
    var txt_Debit: HTMLInputElement;
    var txt_DebitFC: HTMLInputElement;
    var txt_Openbalance: HTMLInputElement;
    var txt_CreditLimit: HTMLInputElement;
    var txt_balance: HTMLInputElement;
    var txtResMobile: HTMLInputElement;
    var txtResName: HTMLInputElement;


    var searchbutmemreport: HTMLInputElement;

    var compcode: Number;//SharedSession.CurrentEnvironment.CompCode;
    var IsNew;
    var index;
    var Selecteditem
    var CustomerIdUpdate: number = 0;

    var CustomerId;

    var sum_balance;

    var Debit;
    var Credit;
    var Valid = 0;

    var Update_claenData = 0;
    var indebtedness;


    var txt_ID_APP_Category: HTMLSelectElement;
    var txt_ID_APP_Group: HTMLSelectElement;
    var txt_indebtedness: HTMLSelectElement;
    var txt_ID_APP_Type: HTMLSelectElement;


    export function InitalizeComponent() {



        //debugger;
        if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
            document.getElementById('Screen_name').innerHTML = "الموردين";

        } else {
            document.getElementById('Screen_name').innerHTML = "Supplier";

        }

        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();


        GetSupplier();

       






    }

    function InitalizeControls() {
        ////debugger;


        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category") as HTMLSelectElement;

          btnShow = document.getElementById("btnShow") as HTMLButtonElement;
          btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
          btnEdit = document.getElementById("btnedite") as HTMLButtonElement;
          btnsave = document.getElementById("btnsave") as HTMLButtonElement;
          btnback = document.getElementById("btnback") as HTMLButtonElement;



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


        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnEdit.onclick = btnEdit_onclick;
        //searchbutmemreport.onkeyup = _SearchBox_Change;

    }

    function GetSupplier() {
        debugger

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Supplier", "GetAll"),
            data: { CompCode: compcode },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Details = result.Response as Array<Supplier>;

                    displaysupplier();
                }
            }
        });

    }
    function displaysupplier() {
        debugger

        $('#txt_ID_APP_Category').html('');
        $('#txt_ID_APP_Category').append(' <option value="Null">اختر المورد</option>');
        for (var i = 0; i < Details.length; i++) {

            $('#txt_ID_APP_Category').append('<option data-ItemID="' + Details[i].Name_Supplier + '" value="' + Details[i].ID_Supplier + '">' + Details[i].Name_Supplier + '</option>');


        }



    }


    function Display_All() {
        //debugger;
      
        var ID_Supplier = $('#txt_ID_APP_Category').val();

        if (ID_Supplier != 'Null') {

            Display = Details.filter(s => s.ID_Supplier == ID_Supplier);
        }
        else {
            Display = Details;
        }


        for (var i = 0; i < Display.length; i++) {

            Display[i].IS_Active_Name = Display[i].IS_Active == false ? 'غير فعال' : 'فعال';
        }

        InitializeGrid();
        ReportGrid.DataSource = Display;
        ReportGrid.Bind();



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
    //onclick
    function btnAdd_onclick() {
        IsNew = true;
        EnableControls();
        removedisabled();
                          

       $("#id_div_Add").attr("disabled", "disabled").off('click');
       var x1 = $("#id_div_Add").hasClass("disabledDiv");

       (x1 == true) ? $("#id_div_Add").removeClass("disabledDiv") : $("#id_div_Add").addClass("disabledDiv");

        reference_Page();

    }
    function reference_Page() {

        $('#btnedite').attr('class', 'btn btn-primary display_none');
        $('#btnsave').attr('class', 'btn btn-success display_none');
        $('#btnback').attr('class', 'btn btn-success display_none'); 
        $('#btnAdd').attr('class', 'btn btn-primary display_none');

    }

    function btnsave_onClick() {

        if (IsNew == true) {

            Validation();
            if (Valid == 1) {

            }
            else {
                Insert();
                Update_claenData = 0;
                btnback_onclick();
                Display_All();
                //$("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
            }
        }
        else {


            Validation();
            if (Valid == 1) {

            }
            else {
                Update();
                Update_claenData = 1;
                btnback_onclick();
                Display_All();
                //$("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
            }

        }

    }




    function txt_disabled() {
        //debugger;

        $("#txt_Type_Supplier").attr("disabled", "disabled");
        $("#txt_ID_Supplier").attr("disabled", "disabled");
        $("#txt_NAME").attr("disabled", "disabled");
        $("#txt_IS_Active").attr("disabled", "disabled");
        $("#txt_phone").attr("disabled", "disabled");
        $("#txt_Notes").attr("disabled", "disabled");
       
    }

    function removedisabled() {
        //debugger;

        $("#txt_Type_Supplier").removeAttr("disabled");
        $("#txt_ID_Supplier").removeAttr("disabled");
        $("#txt_NAME").removeAttr("disabled");
        $("#txt_IS_Active").removeAttr("disabled");
        $("#txt_phone").removeAttr("disabled");
        $("#txt_Notes").removeAttr("disabled");      
       


    }
    function CustomerFoundBefore() {
        var res: boolean = true;
        var code = $('#txt_ID_Supplier').val();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Supplier", "GetAll_Item_by_Cat"),
            data: {code: code},
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.Response == 0) {
                    res = true;
                }
                else
                    res = false;
            }
        });
        return res;
    }


    function Validation() {

        if (IsNew == true) {
            if (CustomerFoundBefore() == false) {
                MessageBox.Show("رقم المورد موجود من قبل ", "Contact Email Is Not Valid");

                return Valid = 1;
            }
        }

        if ($('#txt_Type_Supplier').val() == "") {
            MessageBox.Show("يجب ادخال رقم المورد", "Contact Email Is Not Valid");
            return Valid = 1;
        }

        if ($('#txt_NAME').val() == "") {

            MessageBox.Show("يجب ادخال اسم المورد ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
        if ($('#txt_phone').val()  == 0) {
            MessageBox.Show("يجب ادخال الهاتف ", "Contact Email Is Not Valid");
            return Valid = 1;
        }
       
      

        return Valid = 0;
    }

    function btnShow_onclick() {
        Display_All();
    }

    function btnback_onclick() {

        Selecteditem = Details.filter(x => x.ID_Supplier == Number(ReportGrid.SelectedKey));
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
            $("#Div_control").attr("style", "height: 281px;margin-bottom: 19px;margin-top: 20px;display: none;");
            $("#id_div_Add").attr("disabled", "");
            $("#id_div_Add").removeClass("disabledDiv");      
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

        }
        DriverDoubleClick();
    }   

    function DriverDoubleClick() {

        ////debugger
        Selecteditem = Details.filter(s => s.ID_Supplier == Number(ReportGrid.SelectedKey));  

        DocumentActions.RenderFromModel(Selecteditem[0]);  
        $('#btnedite').removeClass("display_none");
        $('#btnsave').addClass("display_none");
        $('#btnback').addClass("display_none");
        $('#btnedite').removeAttr("disabled");    
        $('#txt_IS_Active').prop("value", Selecteditem[0].IS_Active == false ? 0:1);    
        $("#Div_control").attr("style", "height: 389px;margin-bottom: 19px;margin-top: 20px;");
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

       if (searchbutmemreport.value != "") {
           let search: string = searchbutmemreport.value.toLowerCase();
           SearchDetails = Details.filter(x => x.Name_Supplier.toLowerCase().search(search) >= 0 || x.ID_Supplier.toString().search(search) >= 0);


           ReportGrid.DataSource = SearchDetails;
           ReportGrid.Bind();
       } else {
           ReportGrid.DataSource = Details;
           ReportGrid.Bind();
       }
    }

    function InitializeGrid() {


        let res: any = GetResourceList("");
        $("#id_ReportGrid").attr("style", "");
        ReportGrid.OnRowDoubleClicked = DriverDoubleClick;
        ReportGrid.ElementName = "ReportGrid";
        ReportGrid.PrimaryKey = "ID_Supplier";
        ReportGrid.Paging = true;
        ReportGrid.PageSize = 10;
        ReportGrid.Sorting = true;
        ReportGrid.InsertionMode = JsGridInsertionMode.Binding;
        ReportGrid.Editing = false;
        ReportGrid.Inserting = false;
        ReportGrid.SelectedIndex = 1;
        ReportGrid.OnItemEditing = () => { };
        ReportGrid.Columns = [
            { title: "الرقم", name: "ID_Supplier", type: "text", width: "100px", visible: false },
            { title: "الاسم", name: "Name_Supplier", type: "text", width: "100px" },
            { title: "رقم الجوال", name: "phone", type: "text", width: "100px" },
            { title: "النوع", name: "Type_Supplier", type: "text", width: "100px" },
            { title: "ملاحظات", name: "Notes", type: "text", width: "100px" },
            { title: "مفعل", name: "IS_Active_Name", type: "textdd", width: "100px" },


        ];
        ReportGrid.Bind();
    }

    function Assign() {

        debugger;    
        DocumentActions.AssignToModel(Model);//Insert Update    
            Model.ID_Supplier = $('#txt_ID_Supplier').val();
            Model.Type_Supplier = $('#txt_Type_Supplier').val();
            Model.Name_Supplier = $('#txt_NAME').val();
            Model.IS_Active = $('#txt_IS_Active').val() == '1' ? true : false;
            Model.phone = $('#txt_phone').val();
            Model.Notes = $('#txt_Notes').val();   
    }

    function Insert() {
        Assign();
        debugger
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Supplier", "Insert"),
            data: JSON.stringify(Model),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                     MessageBox.Show("تم الحفظ بنجاح", "Success");
                    Valid = 0;
                } else {
                     MessageBox.Show("خطأء", "Error");
                }
            }
        });
    }

    function Update() {
        Assign();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Supplier", "Update"),
            data: JSON.stringify(Model),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    MessageBox.Show("تم التعديل بنجاح", "Success");
                    GetSupplier();
                    displaysupplier();
                    Display_All();
                } else {
                    MessageBox.Show("خطأء", "Error");
                }   
            }
        });

    }


}