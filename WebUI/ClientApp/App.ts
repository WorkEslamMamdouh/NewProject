﻿/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
enum ScreenModes {
    Query, Add, Edit, Start, DisableMenu
}
//By Muhammad Rajab 20-10-2020
//eslam 21 oct 2020
//eslam 25 oct 2020
//eslam 28 oct 2020
 //3zoz 28/10

const JsGridHeaderCenter: string = "JsGridHeaderCenter";
const TransparentButton: string = "TransparentButton";
////6-10-2020 
var Modules = {
    Home: "Home",
    SlsTrSales: "SlsTrSales",
    //Nationality: "Nationality",
    
};


var Keys = {
    Enter: "Enter"
};

function IsNullOrEmpty(value: string): boolean {
    if (value == null || value == "")
        return true;
    else
        return false;
}

function GetIndexByUseId(idValue: Number, BaseTableName: string, idFieldName: string, Condition: string): string {

    let result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    } else {
        let sys = new SystemTools;
        let result = "";
        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetIndexByUseId"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, Condition: Condition },
            success: (d) => {
                result = d;
            }
        });

        return result;
    }
}

function GetIndexByUseCode(idValue: string, BaseTableName: string, idFieldName: string, condition: string): string {
    let result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    } else {
        let result = Ajax.Call<string>({
            url: Url.Action("GetIndexByUseCode", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condition: condition }
        });
        return result;
    }
}

var SearchModulesNames = {
    cashCustomer: "cashCustomer",
    cashCustomerCategory: "cashCustomerCategory",
    categories: "categories",
    colours: "colours",
    CostCenter: "CostCenter",
    CustAdjType: "CustAdjType",
    customerInformation: "customerInformation",
    customers: "customers",
    groups: "groups",
    Icustomers: "Icustomers",
    items: "items",
    Items2: "Items2",
    marks: "marks",
    movements: "movements",
    nations: "nations",
    salesMan: "salesMan",
    TrReceipt: "TrReceipt",
    types: "types",
    uoms: "uoms",
    store: "store"
};

function Numeric(value: number): number {
    let result: number = 0;
    if (!isNaN(value)) {
        let strValue = value.toFixed(2);
        result = Number(strValue);// value;
    }
    return result;
}
function Fixed(value: number): number {
    return Number(value.toFixed(2));
}

interface JQuery {
    igGrid: any;
    igGridPaging: any;
    jsGrid: any;
    modal: any;
    waitMe: any;
    igGridFiltering: any;
    DataTable?: any;
    dataTable?: any;
}

interface JQueryStatic {
    event: any;
}

interface IIgGridColumn {
    key?: string;
    dataType?: string;
    headerText?: string;
    width?: string;
    template?: string;
    hidden?: boolean;
    filterable?: boolean;
}

interface datatableColumn {
    key?: string;
    dataType?: any;
    headerText?: string;
    width?: string;
    hidden?: boolean;
    data?: any;
    visible?: boolean;
    name?: string;
    title?: string;
    attr_Num?: any;
}

interface IJsGridColumn {
    
    name?: string;
    nameDesc?: string;
    type?: string;
    title?: string;
    width?: string;
    validate?: any;
    id?: string;
    attr_Num?: any;
    items?: any;
    valueField?: string;
    textField?: string;

    itemTemplate?: any;
    editTemplate?: any;
    insertTemplate?: any;
    headerTemplate?: any;

    css?: string;
    visible?: boolean;
    deleteButton?: boolean;
    cellRenderer?: any;
    formatter?: any,
}


namespace App {
    
    let branchCodeSelected: string = "";
    var LanguageButton: HTMLAnchorElement;

    function AssignLoginInformation() {
        var Env = GetSystemEnvironment();
        if (DocumentActions.GetElementById<HTMLSpanElement>("infoSysName") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoSysName").innerText = Env.SystemCode;

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoSubSysName") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoSubSysName").innerText = Env.SubSystemCode;

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoCompanyName") != null) {
            if (Env.ScreenLanguage == "ar")
                DocumentActions.GetElementById<HTMLSpanElement>("infoCompanyName").innerText = Env.CompanyNameAr;
            else
                DocumentActions.GetElementById<HTMLSpanElement>("infoCompanyName").innerText = Env.CompanyName;
        }

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoCurrentYear") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoCurrentYear").innerText = Env.CurrentYear;

        if (DocumentActions.GetElementById<HTMLSpanElement>("infoUserCode") != null)
            DocumentActions.GetElementById<HTMLSpanElement>("infoUserCode").innerText = Env.UserCode;
    }

    export function Startup() {

        var Env = GetSystemEnvironment();

        try {
            let SpanUserName: HTMLSpanElement = DocumentActions.GetElementById<HTMLSpanElement>("SpanUserName");
            SpanUserName.innerText = Env.UserCode;
            SpanUserName.style.display = "block";
            SpanUserName.onclick = GetBranchs;

        } catch (e) {

        }

        var btnEditUserBranchs: HTMLButtonElement;
        try {
            btnEditUserBranchs = DocumentActions.GetElementById<HTMLButtonElement>("btnEditUserBranchs");
            btnEditUserBranchs.onclick = EnableBranchSelected;
        } catch (e) {

        }

        //var btnChangeBranch: HTMLButtonElement;
        //try {
        //    btnChangeBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnChangeBranch");
        //    btnChangeBranch.onclick = ChangeBranch;
        //} catch (e) {

        //}

        AssignLoginInformation();
        try {
            LanguageButton = DocumentActions.GetElementById<HTMLAnchorElement>("LanguageButton");
            LanguageButton.onclick = LanguageButton_Click;
        } catch (e) {

        }

        try {
            DocumentActions.GetElementById<HTMLInputElement>("btnChangePassword").onclick = () => {
                let oldPassword: string = DocumentActions.GetElementById<HTMLInputElement>("txtOldPassword").value;
                let newPassword: string = DocumentActions.GetElementById<HTMLInputElement>("txtNewPassword").value;
                ChangePassword(oldPassword, newPassword);
            };
        } catch (e) {

        }
        try {
            DocumentActions.GetElementById<HTMLSpanElement>("spnFav").onclick = () => {
                let sys: SystemTools = new SystemTools();
                //sys.SwitchUserFavorite();
            };
        } catch (e) {

        }

        AssignLoginInformation();
    }

    function LanguageButton_Click() {
        var SysSession = GetSystemSession();
         
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            SysSession.CurrentEnvironment.ScreenLanguage = "en";
            //SysSession.CurrentEnvironment.ScreenLanguage = "en";
            //SysSession.CurrentEnvironment.CompanyNameAr = "";
            //SysSession.CurrentEnvironment.CompanyName = "";
 
        }
        else { // Arabic Mode other mohaamed ragab
             
            SysSession.CurrentEnvironment.ScreenLanguage = "ar";
            //SysSession.CurrentEnvironment.ScreenLanguage = "ar";
            //SysSession.CurrentEnvironment.CompanyNameAr = "";
            //SysSession.CurrentEnvironment.CompanyName = "";

        }
        document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";

        //Ajax.CallAsync({
        //    url: Url.Action("SetScreenLang", "ClientTools"),
        //    data: { lang: SysSession.CurrentEnvironment.ScreenLanguage },
        //    success: (response) => { }
        //});


    }



    function AppendStyleSheet(fileName: string) {
        var lnk = document.createElement('link');
        lnk.href = "../css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        var $head = $("head");
        var $headlinklast = $head.find("link[rel='stylesheet']:first");
        $headlinklast.after(lnk);
        //document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName: string) {
        let href = "../css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }

}


function EnableBranchSelected() {
    let ddlBrachs: HTMLSelectElement = DocumentActions.GetElementById<HTMLSelectElement>("ddlBrachs");
    ddlBrachs.removeAttribute("disabled");
}

function GetBranchs( ) {
    var sys = new SystemTools();
    var Env = GetSystemEnvironment();
    let ddlBrachs: HTMLSelectElement = DocumentActions.GetElementById<HTMLSelectElement>("ddlBrachs");
    Ajax.Callsync({
        url: sys.apiUrl("SystemTools", "GetBranchsByUserCode"),
        data: { userCode:Env.UserCode, compCode: Env.CompCode },
        success: (response) => {
            let result = response as Array<GQ_GetUserBranch>;
            DocumentActions.FillCombo(result, ddlBrachs, "BRA_CODE", "BRA_DESCL");
        }
    });
}

class GQ_GetUserBranch {
    public USER_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public BRA_DESCL: string;
    public BRA_DESCE: string;
    public BRA_DESC: string;
    constructor() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESCL = "";
        this.BRA_DESCE = "";
        this.BRA_DESC = "";
    }
}

function InitalizeLayout() {
    //ControlsButtons.ModuleEffects();
}

function GetParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function ChangePassword(OldPassword: string, NewPassword: string) {
    var sys = new SystemTools();
    var Env = GetSystemEnvironment();
    let UserCode = Env.UserCode;
    $.ajax({
        url: sys.apiUrl("SystemTools", "ChangePassword"),
        data: { OldPassword: OldPassword, NewPassword: NewPassword, UserCode: UserCode },
        success: (response) => {
            let result = response as BaseResponse;
            if (result.IsSuccess == true) {
                alert("Password changed");
            }
            else {
                alert("Changing password failed");
            }
        }
    });
}

function CloseSearchBox() {
    $("#SearchBox").modal("hide");//.css("display", "none");
}
// mahroos
function NavigateToSearchResultKey(IndexNo: number, Navigate: () => void) {
//    CloseSearchBox();
//    SharedWork.PageIndex = IndexNo;
//    Navigate();
//    SharedWork.Render();
}
function NavigateToSearchResult(Navigate: () => void) {
//    CloseSearchBox();
//    let index = SearchGrid.SearchDataGrid.SelectedKey;
//    SharedWork.PageIndex = Number(index);
//    Navigate();
//    SharedWork.Render();
}

//var Url = {
//    Action: (actionName: string, controllerName: string) => ($.ajax({
//        url: $("#GetActionUrl").val(),
//        async: false,
//        data: { actionName: actionName, controllerName: controllerName }
//    }).responseJSON).result as string
//};

var Url = {
    Action: (actionName: string, controllerName: string) => (
        location.origin + "/" + controllerName + "/" + actionName
    )
};

var Ajax = {
    Call: <T>(settings: JQueryAjaxSettings): T => {
        try {
            let json = $.ajax({
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            let result = json.result as T;
            return result;
        } catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsync: <T>(settings: JQueryAjaxSettings) => {
        debugger
        //run_waitMe();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            cache: false,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(200); }
        })
    },
    Callsync: <T>(settings: JQueryAjaxSettings) => {

        //run_waitMe();
        $.ajax({

            type: settings.type,
            url: settings.url,
            data: settings.data,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            cache: false,
            async: false,
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);
            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(2500); }
        })
    }
};



function GetView(controllerName: string, ModuleCode: string) {
    //debugger;
    //HomeComponent.UserAcsses(ModuleCode);

    let json = Ajax.CallAsync({

        //type: "GET",
        url: "OpenView",
        data: { controllerName: controllerName, ModuleCode: ModuleCode },
        cache: true,
        async: true,
        success: function (response) {
            window.open(Url.Action(controllerName + "Index", controllerName), "_self");

            //$("#cont").html(response);
        }
    });
    //back to home 
    //SysSession.ModuleCode = "Home";
}
function OpenPartial(ModuleCode: string, DivName: string) {
     
    let jsonf = $.ajax({
        type: "GET", //HTTP POST Method
        url: "OpenView", // Controller/View 
        data: { ModuleCode: ModuleCode },
        cache: false,
        async: false,
        success: function (response) {
             
            $("#" + DivName).html(response);
        }
    }).responseJSON;
}



function run_waitMe() {
     
    $('.please_wait').waitMe({
        effect: "win8",
        text: `...Pleasewait`,
        color: '#fff',
        sizeW: '80px',
        sizeH: '80px',
        textPos: "horizontal"
    });

    $('.please_wait').waitMe({
        effect: "win8",
        text: `...Pleasewait`,
        color: '#fff',
        sizeW: '400',
        waitTime: '40000',
        sizeH: '400'
    });
}

var RequiredClassName = " required";
var RequiredElements: Array<HTMLElement> = new Array<HTMLElement>();
var exchangeElements: Array<HTMLInputElement> = new Array<HTMLInputElement>();
var DocumentActions = {

    SetRequiredElements: (...elements: Array<HTMLElement>): void => {
        RequiredElements = new Array<HTMLElement>();
        for (var element of elements) {
            //element.className += RequiredClassName;
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: (ArElement: HTMLInputElement, EnElement: HTMLInputElement) => {
        exchangeElements = new Array<HTMLInputElement>();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: (): boolean => {
        //let result: boolean = false;
        let bools: Array<boolean> = new Array<boolean>();

        let elements = RequiredElements;// Array.prototype.slice.call(document.getElementsByClassName("required")) as Array<HTMLElement>;
        for (var element of elements) {
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if ((element as HTMLInputElement).type == "check") {
                        if ((element as HTMLInputElement).checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if ((element as HTMLInputElement).value == "") {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    break;

                case "SELECT":
                    if ((element as HTMLSelectElement).value == "") {
                        bools.push(false);
                        element.style.borderColor = "red";
                    }
                    else {
                        bools.push(true);
                        element.style.borderColor = "";
                    }
                    break;


                default:
            }
        }

        if (exchangeElements.length > 0) {
            if (exchangeElements[0].value == "" && exchangeElements[1].value == "") {
                bools.push(false);
                exchangeElements[0].style.borderColor = "orange";
                exchangeElements[1].style.borderColor = "orange";
            }
            else {
                bools.push(true);
                exchangeElements[0].style.borderColor = "";
                exchangeElements[1].style.borderColor = "";
            }
        }
        let count = bools.filter(f => f == false).length;
        if (count > 0)
            return false;
        else
            return true;
    },

    RenderFromModel: (dataSource: any): void => {
        try {

            let properties = Object.getOwnPropertyNames(dataSource);
            for (var property of properties) {
                let element = document.getElementsByName(property)[0] as HTMLInputElement;
                if (element == null)
                    continue;
                if (property == "CreatedAt" || property == "UpdatedAt") {

                    if (String(dataSource[property]).indexOf("Date") > -1) {
                        element.value = DateTimeFormat(dataSource[property]);
                    }
                    else {
                        element.value = dataSource[property];
                    }
                    continue;
                }

                if (property == "CreatedBy" || property == "UpdatedBy") {
                    let value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property]
                    } catch (e) {

                    }
                    finally {
                        continue;
                    }

                }
                if (element.type == "checkbox")
                    element.checked = <boolean>(dataSource[property]);
                else if (element.type == "date") {
                    element.value = dataSource[property];
                }
                else
                    element.value = dataSource[property];

            }
        } catch (e) {

        }
    },
    AssignToModel: <T>(model: T): T => {
        let properties = Object.getOwnPropertyNames(model);
        for (var property of properties) {
            let element = document.getElementsByName(property)[0] as HTMLInputElement;
            if (element != null) {
                if (element.type == "checkbox")
                    model[property] = element.checked;
                else
                    model[property] = element.value;
            }
        }
        return model;
    },
    FillComboSingular: (dataSource: Array<any>, combo: HTMLSelectElement) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i: number = 0; i < dataSource.length; i++) {
                //let code = dataSource[i][i];
                //let name = dataSource[i][dataSource[i]];
                combo.add(new Option(dataSource[i], i.toString()));
            }
        }

    },

    FillCombo: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                combo.add(new Option(name, code));
            }
        }

    },
    FillComboFirstvalue: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, Name: any, Code: any) => {
        if (combo != null) {
             
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Name, Code));

            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];

                combo.add(new Option(name, code));
                if (name == Name && code == Code) {
                    combo.remove(i + 1);
                }
            }
        }

    },


    FillCombowithdefultAndEmptyChoice: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any, EmptyChoiceName: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];

                combo.add(new Option(name, code));

            }

            //add empty
            combo.add(new Option(EmptyChoiceName, "-1"));

        }
    },

    FillCombowithdefult: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];
                //var x = true;
                //if (x==true) {
                //    $("#name").attr('id', id);
                   
                //}
                //let test = 

                
                combo.add(new Option(name, code));
                //

                

                 
            }
             
        }
    },
    FillComboWithEmpty: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        for (let i: number = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (let i: number = 0; i < dataSource.length; i++) {
            let code = dataSource[i][codeField];
            let name = dataSource[i][textField];
            combo.add(new Option(name, code));
        }
    },

    GetElementById: <T extends HTMLElement>(id: string): T => {
        let element: T = document.getElementById(id) as T;
        return element;
    },
    CreateElement: <T extends HTMLElement>(id: string) => {
        let element: T = document.createElement(id) as T;
        return element;
    }
};

function DateFormatddmmyyyy(dateForm: string): string {
    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(ConvertTDate(dateForm).toString());
        }

        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();

        var startDate = year + "-" + month + "-" + day;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormat((new Date()).toString());
    }
}

function DateFormat(dateForm: string): string {
     
    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();

        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + month + "-" + day;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormat((new Date()).toString());
    }
}

function DateFormatRep(dateForm: string): string {

    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();

        //The specified value "'2018-01-15'" does not conform to the required format, "dd/MM/yyyy".
        var startDate = day + "/" + month + "/" + year;


        return startDate;
    } catch (e) {
        return DateFormatRep((new Date()).toString());
    }
}


function DateTimeFormat(dateForm: string): string {
    try {

        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();


        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute; //+ ":" + Second;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormat((new Date()).toString());
    }
}

function ConvertToDate(date: string): Date {
    try {

        let x = date.split(" ");
        let dt = x[0].split("/");
        let tm = x[1].split(":");
        let st = x[2];


        let day = dt[0];
        let month = dt[1];
        let year = dt[2];

        var hour = tm[0];
        let Minute = tm[1];
        let Second = tm[2];


        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute + ":" + Second;
        let form_date = new Date(startDate);
        return form_date;
    } catch (e) {
        return (GetCurrentDate());
    }
}
function DateTimeFormatWithoutT(dateForm: string): string {
    try {

        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();


        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        let form_date = new Date(startDate);
        return form_date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    } catch (e) {
        return DateFormat(new Date().toString());
    }
}


function ConvertTDate(date: string): Date {

    try {

        let x = date.split(" ");
        let dt = x[0].split("/");


        let day = dt[0];
        let month = dt[1];
        let year = dt[2];


        var startDate = year + "-" + month + "-" + day;
        let form_date = new Date(startDate);
        return form_date;
    } catch (e) {
        return (GetCurrentDate());
    }
}

function ClearGrid<T>(_Grid: JsGrid = new JsGrid(), arr: Array<T>) {

    arr = new Array();
    _Grid.DataSource = arr;
    _Grid.Bind();
}



function HeaderTemplate(headerTitle: string, element: HTMLElement): HTMLTableElement {
    debugger
    let tbl = DocumentActions.CreateElement<HTMLTableElement>("table");
    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    headerTr.innerHTML = "<td style='text-align:center;' >" + headerTitle + "</td>";

    let cellTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    let cell = DocumentActions.CreateElement<HTMLTableCellElement>("td");
    cell.style.textAlign = "center";
    cell.setAttribute("Eslam", "democlass");
    cell.appendChild(element);
    cellTr.appendChild(cell);

    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);

    return tbl;
}
//eslam 25 oct 2020
function HeaderTemplate_ThreeElements(headerTitle: string, element_1: HTMLElement, element_2: HTMLElement): HTMLTableElement {
    debugger
    let tbl = DocumentActions.CreateElement<HTMLTableElement>("table");

    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";
 
    let cellTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    let cell = DocumentActions.CreateElement<HTMLTableCellElement>("td");
    
    cell.style.textAlign = "center";
    cell.appendChild(element_1);
    cell.appendChild(element_2);
    cellTr.appendChild(cell);


    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);

    return tbl;
}
class Resources {
    key: string;
    value: string;
}


function CreateElement(typeElement: string, className: string, defaultValue: string, minValue: string, id: string, step: string): HTMLInputElement {
    typeElement = typeElement.toLocaleLowerCase();
    let element = DocumentActions.CreateElement<HTMLInputElement>("input");
    element.className = className;
    element.id = "h_" + id;
    element.type = typeElement;
    element.value = defaultValue;
    element.min = minValue;
    element.step = step;
    return element;
}
//eslam 25 oct 2020
function CreateLabelElement(defaultValue: string, id: string): HTMLElement {
    let element = DocumentActions.CreateElement<HTMLElement>("label");
    element.style.textAlign = "center";
    element.id = id;
    element.innerText = defaultValue;
    return element;
}


function SetSearchControlName(id: string) {
    $("#SearchControlName").val(id);
}

class CodeDesciptionModel {
    public Code: string;
    public Description: string;
}

function WorningMessage(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning", OnOk?: () => void) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {

        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            focus();
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            focus();
            break;
    }
}

function ConfirmMessage(msg_Ar: string = "تمت عملية الحفظ  بنجاح", msg_En: string = "Data Saved Successfully", tit_ar: string = "تأكيد", tit_en: string = "Confirm", OnOk?: () => void) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            break;
    }
}
function ConfirmMessagee(msg_Ar: string = "تمت عملية الحفظ  بنجاح", msg_En: string = "Data Saved Successfully", tit_ar: string = "تأكيد", tit_en: string = "Confirm", OnOk?: () => number) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            return 1;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            return 1;
    }

}
function WorningMessageDailog(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning", OnOk?: () => void, OnCancel?: () => void) {
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Ask(msg_Ar, tit_ar, OnOk, OnCancel);
            break;
        case "en":
            MessageBox.Ask(msg_En, tit_en, OnOk, OnCancel);
            break;
    }
}
//function MessageDailog(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning") {
//     
//    switch (SysSession.CurrentEnvironment.ScreenLanguage) {
//        case "ar":
//            MessageBox.MSgBox(msg_Ar, tit_ar);
//            break;
//        case "en":
//            MessageBox.MSgBox(msg_En, tit_en);
//            break;
//    }
//}
function AddDate(prd: Number, Sdate: Date, count: number): Date {

    let Tdate: Date;
    Tdate = Sdate; //new Date();
    switch (prd) {
        case 1: //hours

            Tdate.setHours(Sdate.getHours() + count);
            break;
        case 2: //Days
            Tdate.setDate(Sdate.getDate() + (count - 1));
            break;
        case 3: //week
            Tdate.setDate(Sdate.getDate() + ((7 * count) - 1));
            break;
        case 4: //month
            // Loop from cur month with Qty * Prd times 
            Tdate = Sdate;
            Tdate.setMonth(Tdate.getMonth() + count);
            Tdate.setDate(Tdate.getDate() + - 1);
            break;
        case 5: //year
            // add 365 or 366 days 
            Tdate = Sdate;
            Tdate.setFullYear(Tdate.getFullYear() + count);
            Tdate.setDate(Tdate.getDate() + - 1);
            break;
    }
    return Tdate;
}


function GetResourceByName(Sourcekey: string): string {
    var result: string = "";
    Ajax.Callsync({
        url: Url.Action("GetResourceByName", "ClientTools"),
        data: { key: Sourcekey },
        success: (d) => {
            result = d.result as string;
        }
    });
    return result;
}

function GetResourceList(Sourcekey: string): any {
     
    //var result = Ajax.Call<any>({
    //    url: Url.Action("GetResourceNames", "ClientTools"),
    //    data: { _prefix: Sourcekey },
    //    success: (d) => {
             
    //        result = JSON.parse(d.result) as any;
    //    }
    //});
    return 0;
}

function GetCurrentDate(): Date {
   //  
    let ses = GetSystemSession(); 
    let kControl = ses.CurrentEnvironment.I_Control;
    if (kControl != undefined) {
        var now = new Date;
        var utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        utc.setHours(utc.getHours() + kControl.UserTimeZoneUTCDiff);
        return utc;
    }
    else {
        return (new Date());
    }
}

function CreateDropdownList<T>(arr: Array<T>, Name_Ar: string, Name_En: string, Key: string, IsSelectNull: Boolean = false): HTMLSelectElement {
    var Env = GetSystemEnvironment();
    let element = document.createElement("select") as HTMLSelectElement;
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(" ", "null"));
    switch (Env.Language) {
        case "ar":
            for (var item of arr) {
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var item of arr) {
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}
//eslam elassal 20 oct 2020 => CreateDropdownListWithDefaultValue(K_D_ExpensesDataSource, "DescA", "DescE", "ExpenseID", "اختر",true);s
function CreateDropdownListWithDefaultValue<T>(arr: Array<T>, Name_Ar: string, Name_En: string, Key: string, DefaultVal: string, IsSelectNull: Boolean = false): HTMLSelectElement {
    var Env = GetSystemEnvironment();
    let element = document.createElement("select") as HTMLSelectElement;
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(DefaultVal, "null"));
    switch (Env.Language) {
        case "ar":
            for (var item of arr) {
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var item of arr) {
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}


//function CreateListMaleFemale(): HTMLSelectElement {
//    var offDay = [
//        {
//            Name_Ar: "ولد",
//            Name_En: "Male",
//            Id: 1
//        },
//        {
//            Name_Ar: "بنت",
//            Name_En: "Female",
//            Id: 0
//        },
//    ];
//    let element = document.createElement("select") as HTMLSelectElement;
//    element.className = "form-control input-sm";
//    switch (SharedWork.Session.Language) {
//        case "ar":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_Ar, item.Id.toString()));
//            }
//            break;
//        case "en":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_En, item.Id.toString()));
//            }
//            break;
//    }
//    return element;
//}

function OpenPopUp(moduleCode: string, PopupBody: string, PopupDialog: string) {
      
    let json = $.ajax({

        type: "GET",
        url: "OpenView",
        data: { ModuleCode: moduleCode },
        cache: false,
        async: false,
        success: function (response) {
             $("#" + PopupBody).html(response);
            //$("#PopupDialog").modal("show");
            $("#" + PopupDialog).modal('show');
            $("#" + PopupDialog).modal({
                refresh: true
            });

            //var val = $("#rpTitle").text();
            //$("#TitleSpanRep").html(val);
        }
    });

}

