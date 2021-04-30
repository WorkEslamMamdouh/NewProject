$(document).ready(function () {
    ////debugger;
    Income_expenses.InitalizeComponent();
});
var Income_expenses;
(function (Income_expenses) {
    function InitalizeComponent() {
        debugger;
        InitalizeControls();
        //FillddlUserMaster();
        //txtFromDate.value = GetDate();
        //txtToDate.value = GetDate();
        IntializeEvents();
    }
    Income_expenses.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        debugger;
        //if (SysSession.CurrentEnvironment.ScreenLanguage = "ar") {
        //    document.getElementById('Screen_name').innerHTML = "جرد المبيعات";
        //}
        //else {
        //    document.getElementById('Screen_name').innerHTML = "Salesinventory";
        //}
        //CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        ////Drop Downlists
        //txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        //txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        //ddlUserMaster = document.getElementById("ddlUserMaster") as HTMLSelectElement;
        //btnShow = document.getElementById("btnShow") as HTMLButtonElement;
    }
    function IntializeEvents() {
        //btnShow.onclick = btnShow_onclick;
        //searchbutmemreport.onkeydown = _SearchBox_Change;
        //searchbutmemreport.onkeyup = _SearchBox_Change;
    }
    function GetDate() {
        //debugger
        //var today: Date = new Date();
        //var dd: string = today.getDate().toString();
        //var ReturnedDate: string;
        //var mm: string = (today.getMonth() + 1).toString();
        //var yyyy = today.getFullYear();
        //if (Number(dd) < 10) {
        //    dd = ('0' + dd);
        //}
        //if (Number(mm) < 10) {
        //    mm = ('0' + mm);
        //}
        //ReturnedDate = yyyy + '-' + mm + '-' + dd;
        //return ReturnedDate;
    }
    function FillddlUserMaster() {
        //debugger
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("G_USERS", "GetAllUser"),
        //    data: {},
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            UserDetails = result.Response as Array<G_USERS>;
        //            debugger
        //            DocumentActions.FillCombowithdefult(UserDetails, ddlUserMaster, "USER_CODE", "USER_CODE", "اختار البائع");
        //        }
        //    }
        //});
    }
})(Income_expenses || (Income_expenses = {}));
//# sourceMappingURL=Income_expenses.js.map