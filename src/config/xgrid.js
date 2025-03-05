/**
 *
 * @type {{doRemoveLine(): void, doDownloadExcel(): void, doAppendLine(): void}}
 */
// IIFE -> ES6 방식으로 변경

// ❌ 외부에서 접근 못하도록 export 없음 (private 변수처럼 사용)
const CALLBACKWAY = {
    PREV: "Previous",
    NEXT: "Next",
    NONE: "None"
};

// 값이 변경될 수 있으므로 let 사용
let _gridEtcData = null;

const privateMethod = function (message) {
    //alert(message);
    console.log("[privateMethod] : ", message);
};
const onGetFormElementName = function(obj) {
    if (obj.name != "") {
        return obj.name;
    } else if (obj.id != "") {
        return obj.id;
    } else {
        return "";
    }
};

const doCallbackWay = function(callback){
    var obj = new Object();
    if (callback !== undefined){
        if (callback["Method"] !== undefined){
            if (callback["Method"] != ''){
                obj.Method = callback["Method"];
                obj.Type = (callback["Prev"] !== undefined) ? (callback["Prev"]==1 ? CALLBACKWAY.PREV : CALLBACKWAY.NEXT) : CALLBACKWAY.NEXT;
            }
            else{
                obj.Type = CALLBACKWAY.NONE;
            }
        }
        else{
            obj.Type = CALLBACKWAY.NONE;
        }
    }
    return obj;
};
/*
const doSheetOnClickValue= function(callback, clickMethod){
    var callbackWay = doCallbackWay(callback);
    switch(callbackWay.Type){
        case CALLBACKWAY.PREV:
            return callbackWay.Method+"(Sheet);" + clickMethod;
        case CALLBACKWAY.NEXT:
            return clickMethod.replace(';', '')+"?(" + callbackWay.Method+"(Sheet)):''"; //20240528
        //return clickMethod + callbackWay.Method+"(Sheet);";
        default:
            return clickMethod;
    }
};
 */
var doSheetOnClickValue = function (callback, clickMethod) {
    var callbackWay = doCallbackWay(callback);
/*
    switch (callbackWay.Type) {
        case CALLBACKWAY.PREV:
            return () => {
                callbackWay.Method(Sheet);
                clickMethod(Sheet);
            };
        case CALLBACKWAY.NEXT:
            return () => {
                if (clickMethod(Sheet)) {
                    callbackWay.Method(Sheet);
                }
            };
        default:
            return clickMethod;
    }

 */
};


const doSheetMAppendInput = function() {
    var obj = new Object();
    obj.Value = `<div style="width:120px;"><input id="addRowCnt1" style="height:17px;width:120px;" onkeydown="xgrid.doAppendLines(Sheet)" onblur="xgrid.doRefreshInfoRow(Sheet)" type="text" placeholder="추가할 행 수(최대 99)" oninput="this.value = this.value.replace(/[^0-9.]/g, '');" maxlength="2"></div>`;
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 140;
    obj.Visible = false;
    return obj;
};
const doSheetMAppendRow = function(layoutButton) {
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-append-row-multi.png' title='멀티 행추가'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;
   // obj.OnClick = doSheetOnClickValue(layoutButton["Callback"], () => xgrid.doRemoveLine(Sheet));
    return obj;
};
const doSheetSAppendRow = function(layoutButton) {
    console.log(">>> 행추가 버튼 클릭")
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-append-row.png' title='행추가'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;
    obj.OnClick = doSheetOnClickValue(layoutButton["Callback"], "xgrid.doAppendLine(Sheet);");
    return obj;
};
const doSheetRemoveRow = function(layoutButton) {
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-remove-row.png' title='행삭제'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;
    obj.OnClick = doSheetOnClickValue(layoutButton["Callback"], "xgrid.doRemoveLine(Sheet);");
    return obj;
};
const doSheetPersonalize = function(layoutButton) {
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-personalize.png' title='개인화'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;
    obj.OnClick = doSheetOnClickValue(layoutButton["Callback"], "doPersonalLayerOpen(Sheet);");
    return obj;
};
const doSheetDownExcel = function(layoutButton) {
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-download-excel.png' title='엑셀다운로드'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;

    var titleIdx = (layoutButton["TitleIndex"]===undefined) ? 0 : Number(layoutButton["TitleIndex"])-1;
    var hiddenCol = (layoutButton["HiddenCol"]===undefined) ? 0 : layoutButton["HiddenCol"];

    if (layoutButton["Confirm"]!==undefined){
        obj.OnClick = doSheetOnClickValue(layoutButton, 'xgrid.doPreProcessDownloadExcel("'+layoutButton["Confirm"]["Uri"]+'", Sheet, '+titleIdx+', true,'+hiddenCol+');');
    }
    else{
        obj.OnClick = doSheetOnClickValue(layoutButton, 'xgrid.doDownloadExcel(Sheet, document.title+"_"+$(".title-a").eq('+titleIdx+').text(), false,'+hiddenCol+' );');
    }
    return obj;
};
const doSheetUpExcel = function(layoutButton) {
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-upload-excel.png' title='엑셀업로드'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;
    obj.OnClick = doSheetOnClickValue(layoutButton["Callback"], 'xgrid.doPreProcessUploadExcel("'+layoutButton["Uri"]+'", Sheet, true);');

    return obj;
};

const doSheetCollapseTree = function(layoutButton) {
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-collapse-tree.png' title='전체(트리) 축소'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;
    obj.OnClick = doSheetOnClickValue(layoutButton["Callback"], "xgrid.doCollapseTree(Sheet);");
    return obj;
};


const doSheetExpandTree = function(layoutButton) {
    var obj = new Object();
    obj.Value = "<img src='/images/common/ic-expand-tree.png' title='전체(트리) 확장'>";
    obj.Type = "Button";
    obj.RelWidth = 0;
    obj.Width = 20;
    obj.OnClick = doSheetOnClickValue(layoutButton["Callback"], "xgrid.doExpandTree(Sheet);");
    return obj;
};

//   xgrid.* 로 외부에서 접근 가능한 영역
const xgrid = {
    publicMethod1: function (text) {
        privateMethod(text);
    },


    doSetGridEtcData: function(etc){
        _gridEtcData = etc;
    },

    doToggleFilter:function(objSheet){
        if (objSheet.Filtered == 1){
            objSheet.clearFilter();
            objSheet.hideFilterRow();
        }
        else{
            objSheet.showFilterRow();
        }
    },

    //행추가
    doAppendLine:function(objSheet){
        console.log("###############doAppendLine objSheet start");
        console.log(objSheet);
        console.log("###############doAppendLine objSheet end ");
        var retVal = true;

        //20240528 엑셀 업로드후엔 ENUM 정보가 사라지는 문제가 발생한다. 엑셀 업로드후 append가 가능하도록 하기 위해서
        if (objSheet.HasLoadedExcelData == 1 && _gridEtcData != null){
            objSheet.etc = _gridEtcData;
            _gridEtcData = null;
        }

        if (objSheet.etc === undefined){
            alert('데이터 조회후 입력이 가능합니다.');
            retVal = false;
        }else{
            objSheet.addRow({"next":objSheet.getNextRow(objSheet.getFocusedRow()), "init":objSheet.etc.Enums});
        }

        return retVal;
    },

    //추가 행수 입력창 보여주기
    showAddRowCnt:function(objSheet) {
        var retVal = true;

        if (objSheet.etc === undefined){
            alert('데이터 조회후 입력이 가능합니다.');
            retVal = false;
        } else {
            var addRowCnt = "addRowCnt" + objSheet.id.charAt(objSheet.id.length - 1);

            if(!objSheet.InfoRow.CustomCells1Visible){
                objSheet.InfoRow.CustomCells1Visible = true;
                objSheet.refreshRow(objSheet.InfoRow);
              // $(`#${addRowCnt}`).focus();
            } else {
                objSheet.InfoRow.CustomCells1Visible = false;
                objSheet.refreshRow(objSheet.InfoRow);
            }
        }
        return retVal;
    },


    //여러행 추가
    doAppendLines:function(objSheet) {
/*
        if(event.keyCode == 13){
            var addRowCnt = "addRowCnt" + objSheet.id.charAt(objSheet.id.length - 1);
            var cnt = $(`#${addRowCnt}`).val();

            if(cnt > 0){

                for(var i=0;i<cnt;i++){
                    objSheet.addRow({"next":objSheet.getFocusedRow(), "init":objSheet.etc.Enums, "focus": false , "render":false});
                }
              //  $(`#${addRowCnt}`).blur();

                objSheet.calculate();
                objSheet.renderBody();
                //objSheet.addRows({"count":cnt, "next":objSheet.getFocusedRow()});
            } else {
                objSheet.showMessageTime('1~99 사이의 숫자를 입력하세요.', 800);
            }
        }

 */
    },

    //인포행 새로고침
    doRefreshInfoRow:function(objSheet) {
        objSheet.InfoRow.CustomCells1Visible = false;
        objSheet.refreshRow(objSheet.InfoRow);
    },

    //행삭제
    doRemoveLine:function(objSheet){

        //20230112 DB저장안된행은 바로 삭제되게 변경
        var chkRows = objSheet.getRowsByChecked("is_select");

        if (chkRows && chkRows.length == 0) {
            objSheet.showMessageTime('삭제할 행을 선택하세요.', 800);
        } else {
            var rows = chkRows.filter(function(value){ return value.Added != 1 })
            var addRows = chkRows.filter(function(value){ return value.Added == 1 })
            var i = 0;

            while(i < rows.length){

                rows[i].is_delete = 1;
                rows[i].is_select = 0;
                rows[i].CanEdit = 0;
                objSheet.deleteRow(rows[i]);

                i++;
            }
            objSheet.removeRows(addRows);
        }

        /*
        var delCnt = 0;

        var row = objSheet.getFirstRow();
        while(row){
            var choice = row["IS_SELECT"];

            if(choice == '1'){
                row['IS_DELETE'] = 1;
                row['IS_SELECT'] = 0;
                row["CanEdit"] = 0;
                objSheet.deleteRow(row);  //DelCheck 타입이 없으므로 직접 구현해줘야 함.
                objSheet.refreshRow(row); //행에 수정사항 화면 반영

                delCnt++;
            }
            //다음행 (없으면 null 리턴);
            row = objSheet.getNextRow(row);
        }


        if(delCnt == 0){
            alert('삭제할 행을 선택하세요.');
        }
        */

    },

    doCallbackDownloadExcel:function(sheetId, name, isAuth){
        xgrid.doDownloadExcel(eval(sheetId), name, isAuth);
    },
    /*

            doPreProcessDownloadExcel:function(url, objSheet, titleIdx, isAuth){
                if (isAuth){
                    var pwd = window.prompt('엑셀 다운로드를 위해서 인증이 필요합니다\n로그인 암호를 입력하세요');
                    if (pwd != null){
                        setTimeout(function() {
                            $.ajax({
                                type: 'POST'
                                , url: '/session/Login/checkPwd.do'
                                , async: false
                                , data: {
                                    pwd: pwd
                                    , menu_cd: _menuCd
                                }
                                , dataType: 'json'
                                , success: function(result) {
                                    if (result.code == 0){
                                        xgrid.doPreProcessDownloadExcelEx(url, objSheet, titleIdx, isAuth);
                                    }
                                    else{
                                        alert('잘못된 암호입니다')
                                    }
                                }
                                , error: function(request, status, error) {
                                    alert("AJAX 오류("+error+")");
                                }
                            });
                        }, 200);
                    }
                }
                else{
                    xgrid.doPreProcessDownloadExcelEx(url, objSheet, titleIdx);
                }
            },
    */
/*
    doPreProcessDownloadExcelEx:function(url, objSheet, titleIdx, isAuth){
       // var title = document.title+'_'+$('.title-a').eq(titleIdx).text();
        if (objSheet.etc === undefined){
            ib.comm.search({
                url: url
                , subparam: xgrid.doFormQueryStringEnc(document.form_filter, objSheet)+"&noselect=1&callback=doCallbackDownloadExcel('"+objSheet.id+"','"+title+"',"+(isAuth?1:0)+")"
                , sheet: [objSheet]
                , mapping: {objSheet: objSheet.id}
            });


        }
        else{
            xgrid.doDownloadExcel(objSheet, title, isAuth);
        }
    },
*/
    //엑셀다운로드
    doDownloadExcel:function(objSheet, name, isAuth, isHiddenCol, titleIdx){

        var colArr = isHiddenCol ? "" : "Visible";

        var noExcelDown =  objSheet.getCols("NoExcelDown"); // 엑셀다운로드 안되는 행 찾기

        if(noExcelDown.length > 0){ // 있다면
//				var excelDown =  objSheet.getCols("Visible");
            var excelDown =  objSheet.getCols("");			// Visible: 0인 컬럼도 NoExcelDown 포함되도록 수정 (24.06.18)
            var visibleexcelDown =  objSheet.getCols("Visible");
            for(var i = 0; i < excelDown.length; i++) {
                noExcelDown.forEach(function(item1){
                    if(excelDown[i] !=undefined)
                    {
                        if (excelDown[i] === item1 // NoExcelDown인것
                            ||(
                                visibleexcelDown.indexOf(excelDown[i])== -1
                                &&excelDown[i].indexOf('_plain') == -1
                            )// 보이지 않는 컬럼이고 plain이 포함되지 않은 컬럼
                            ||(excelDown[i].indexOf('_plain') != -1&&
                                visibleexcelDown.indexOf(excelDown[i].replace('_plain','')) == -1))
                            // 메인컬럼이보이지 않고 plain컬럼인 것
                        {
                            excelDown.splice(i, 1);
                            i--;
                        }
                    }
                });
            }


            colArr = excelDown.join('|');
        }

        //인증후 다운로드
        if (isAuth){
            colArr = objSheet.getCols().join('|');
        }

        // 날짜 얻기
        var date = new Date();

        var yyyy = date.getFullYear();
        var mm = Number(date.getMonth() + 1);
        var dd = Number(date.getDate());
        var hh = Number(date.getHours());
        var MM = Number(date.getMinutes());
        var ss = Number(date.getSeconds());

        var c_mm = mm > 9 ? mm : "0" + mm;
        var c_dd = dd > 9 ? dd : "0" + dd;
        var c_hh = hh > 9 ? hh : "0" + hh;
        var c_MM = MM > 9 ? MM : "0" + MM;
        var c_ss = ss > 9 ? ss : "0" + ss;

        mm = c_mm.toString();
        dd = c_dd.toString();
        hh = c_hh.toString();
        MM = c_MM.toString();
        ss = c_ss.toString();

        var toDay = "_" + yyyy + mm + dd + hh + MM + ss;

        //
        var loc_name = '';

        //if (objSheet.getTotalRowCount() > 0){

        if(name == undefined ){
            loc_name = "TMS_"+objSheet.id;
        }else{
            loc_name = name + toDay;
        }

        var param = {
            id:objSheet.id
            , name:loc_name
            , downCols: colArr
        };
        //ib.comm.downExcel(param);

        //}
        //else{
        //	alert('데이터 조회 결과가 있어야 엑셀다운이 가능합니다.');
        //}
    },


    //엑셀업로드(직접 호출로 사용하지 않음)
    doUploadExcel:function(sheetId){
        var param = {
            id: sheetId
            , Mode: "HeaderMatch"
        };
      //  ib.comm.loadExcel(param);
    },


    doCallbackUploadExcel : function(sheetId) {
        xgrid.doUploadExcel(sheetId);
    },

/*
    doPreProcessUploadExcel : function(url, objSheet) {
        ib.comm.search({
            url: url
            , subparam: xgrid.doFormQueryStringEnc(document.form_filter, objSheet)+"&noselect=1&callback=doCallbackUploadExcel('"+objSheet.id+"')"
            , sheet: [objSheet]
            , mapping: {objSheet: objSheet.id}
        });
    },
*/

    doIsLeaveQuestion: function (objSheetArray, message) {

        var isModified = false;
        var gridNm = "";

        for (var i=0 ; i<objSheetArray.length ; i++){
            //Return Value
            //number : 수정된 내용이 있으면 1, 없으면 0
            //메뉴얼에는 0 또는 1만 리턴 된다더니, 변경이 없는데 2가 리턴되는 경우가 있더라. 젠장 20230106 진성욱
            //if (objSheetArray[i].hasChangedData()){
            if (objSheetArray[i].hasChangedData()==1){
                gridNm = (i==0) ? "첫번째" : ((i==1) ? "두번째" : ((i==2) ? "세번째" : ((i==3) ? "네번째" : "UNKNOWN" )));
                isModified = true;
                break;
            }
        }

        if (isModified){
            /*
            if (confirm("[" + gridNm + "]그리드에 변경된 내용이 있습니다. ["+message+"]하겠습니까?")){
                return true;
            }
             */
        }
        else{
            return true;
        }

        return false;
    },


    doIsSaveQuestion: function (objSheetArray, message) {

        var isModified = false;

        for (var i=0 ; i<objSheetArray.length ; i++){
            if (objSheetArray[i].hasChangedData()){
                isModified = true;
                break;
            }
        }

        if (isModified){
            /*if (confirm("변경된 내용을 ["+message+"] 할까요?")){
                return true;
            }

             */
        }
        else{
            alert("변경된 내용이 없습니다.");
        }

        return false;
    },


    //트리축소
    doCollapseTree: function(objSheet) {
        objSheet.showTreeLevel(1);
    },

    //트리확장
    doExpandTree: function(objSheet) {
        objSheet.showTreeLevel(3);
    },


    doGetSaveString: function(objSheet) {
        return JSON.stringify(objSheet.getSaveJson({saveMode:2}));
    },


    doFormQueryStringEnc: function(form, objSheet, etc, focusKeyCol) {

        if (typeof form != "object" || form.tagName != "FORM") {
            alert("FormQueryStringEnc 함수의 form 인자는 FORM 태그가 아닙니다.");
            return "";
        }


        //if (checkRequired == null) checkRequired = false;

        var name = new Array(form.elements.length);
        var value = new Array(form.elements.length);
        var j = 0;
        var plain_text = "";

        //사용가능한 컨트롤을 배열로 생성한다.
        var len = form.elements.length;
        for (var i = 0; i < len; i++) {
            var prev_j = j;
            switch (form.elements[i].type) {
                case "button":
                case "reset":
                case "submit":
                    break;
                case "radio":
                case "checkbox":
                    if (form.elements[i].checked == true) {
                        name[j] = onGetFormElementName(form.elements[i]);
                        value[j] = form.elements[i].value;
                        j++;
                    }
                    break;
                case "select-one":
                    name[j] = onGetFormElementName(form.elements[i]);
                    var ind = form.elements[i].selectedIndex;
                    if (ind >= 0) {

                        value[j] = form.elements[i].options[ind].value;

                    } else {
                        value[j] = "";
                    }
                    j++;
                    break;
                case "select-multiple":
                    name[j] = onGetFormElementName(form.elements[i]);
                    var llen = form.elements[i].length;
                    var increased = 0;
                    for (var k = 0; k < llen; k++) {
                        if (form.elements[i].options[k].selected) {
                            name[j] = onGetFormElementName(form.elements[i]);

                            value[j] = form.elements[i].options[k].value;

                            j++;
                            increased++;
                        }
                    }
                    if (increased > 0) {
                        j--;
                    } else {
                        value[j] = "";
                    }
                    j++;
                    break;
                default:

                    name[j] = onGetFormElementName(form.elements[i]);
                    value[j] = form.elements[i].value;

                    //20170904 진성욱
                    if (name[j] == 'deli_dy' || name[j] == 'delivery_date'){
                        value[j] = value[j].replace(/-/gi, "");
                    }

                    j++;

            }
            /*
            if (checkRequired) {
                //html 컨트롤 태그에 required속성을 설정하면 필수입력을 확인할 수 있다.
                //<input type="text" name="txtName" required="이름">
                if (onGetFormRequiredChk(form.elements[i]) && prev_j != j && value[prev_j] == "") {
                    if (form.elements[i].getAttribute("required") == "") {
                        alert('"' + onGetFormElementName(form.elements[i]) + '"' + "은(는) 필수입력 항목입니다.");
                    } else {
                        alert('"' + form.elements[i].getAttribute("required") + '"' + "은(는) 필수입력 항목입니다.");
                    }
                    //컨트롤이 숨겨져 있을수도 있으므로 에러 감싼다.
                    try {
                        form.elements[i].focus();
                    } catch (ee) {;
                    }

                    return;
                }
            }
            */
        }

        //QueryString을 조합한다.
        for (var i = 0; i < j; i++) {
            if (name[i] != '') plain_text += encodeURIComponent(name[i]) + "=" + encodeURIComponent(value[i]) + "&";
        }

        //마지막에 &를 없애기 위함
        if (plain_text != "") plain_text = plain_text.substr(0, plain_text.length - 1);

        if (objSheet !== undefined && objSheet != null){
            //저장 호출
            if (etc === undefined || etc == null){

                var rows = objSheet.getRowsByStatus("Added,Changed");
                var v = "";

                if (rows.length > 0){
                    v = objSheet.getValue(rows[0], focusKeyCol);
                }
                else{
                    if (objSheet.getFocusedRow() !== undefined && focusKeyCol !== undefined){
                        v = objSheet.getValue(objSheet.getFocusedRow(), focusKeyCol);
                    }
                }
                plain_text += "&"+ objSheet.id+"_focus_key_col="+focusKeyCol;
                plain_text += "&"+ objSheet.id+"_focus_key_val="+encodeURIComponent(v);
            }
            //저장후 조회 호출
            else{
                plain_text += "&"+objSheet.id+"_focus_key_col="+(eval("etc."+objSheet.id + "_focus_key_col"));
                plain_text += "&"+objSheet.id+"_focus_key_val="+(eval("etc."+objSheet.id + "_focus_key_val"));
            }
        }


        return plain_text;
    },


    //필수입력값 체크
    doIsHaveToNullValue : function(objSheetArray){

        var isExistNull = false;

        for (var i=0 ; i<objSheetArray.length ; i++){
            var isChangeColor = false;
            var objSheet = objSheetArray[i];
            //var gridNm = (i==0) ? "첫번째" : ((i==1) ? "두번째" : ((i==2) ? "세번째" : ((i==3) ? "네번째" : "UNKNOWN" )));

            var requiredCols = objSheet.getCols("Required");
            var rows = objSheet.getDataRows();

            for(var c=0; c<requiredCols.length; c++){
                for(var r=0; r<rows.length; r++){
                    if (rows[r].STATUS == 'I' || rows[r].STATUS == 'U'){//추가, 수정만
                        if (objSheet.getValue(rows[r], requiredCols[c]) == null
                            || objSheet.getValue(rows[r], requiredCols[c]) == ''
                            || String(objSheet.getValue(rows[r], requiredCols[c])).trim().length == 0
                        ){

                            objSheet.setAttribute(rows[r], requiredCols[c] ,"Color","#FF9999", 0);
                            isChangeColor = true;

                            isExistNull = true;
                        }
                    }
                }
            }

            if (isChangeColor){
                objSheet.rerender();
            }

        }

        if (isExistNull){
            alert('필수 입력 값이 공백입니다');
        }
        //return false;
        return isExistNull;
    },


    doSetFilterEnum : function(objSheet){
        //if (objSheet.ShowFilter || objSheet.ShowFilter==1){
        var vCol = objSheet.getCols("Visible");
        if (objSheet.etc !== undefined && objSheet.etc.Enums !== undefined){
            for(var i=0;i<vCol.length;i++){
                var enumKeys = eval("objSheet.etc.Enums."+vCol[i]+"EnumKeys");
                if (enumKeys !== undefined){
                    //objSheet.setAttribute(objSheet.getRowByIndex(0) , vCol[i] , "EnumKeys" , eval("objSheet.etc.Enums."+vCol[i]+"EnumKeys"));
                    //objSheet.setAttribute(objSheet.getRowByIndex(0) , vCol[i] , "Enum" , eval("objSheet.etc.Enums."+vCol[i]+"Enum"));
                    objSheet.setAttribute(null , vCol[i] , "EnumKeys" , eval("objSheet.etc.Enums."+vCol[i]+"EnumKeys"));
                    objSheet.setAttribute(null , vCol[i] , "Enum" , eval("objSheet.etc.Enums."+vCol[i]+"Enum"));
                }
            }
        }
        //}
    },

    doFocusRow : function(objSheet){
        if (eval('objSheet.etc') !== undefined){
            var focusKeyCol = eval('objSheet.etc.'+objSheet.id+"_focus_key_col");
            var focusKeyVal = eval('objSheet.etc.'+objSheet.id+"_focus_key_val");

            var firstRow = objSheet.getFirstRow();
            var findRow = objSheet.findText(focusKeyCol, focusKeyVal, firstRow, -1, 1);
            setTimeout(function(){
                objSheet.focus(findRow);
                objSheet.selectRow(findRow, 1);
            }, 100);

            return findRow!=null ? findRow : objSheet.getFirstRow();
        }
        else{
            return objSheet.getFirstRow();
        }
    },


    doPostSearch : function(objSheet){
        //조회후 필터에 enum값 설정
        xgrid.doSetFilterEnum(objSheet);

        //조회후 지정한 로우로 focus
        var focusRow = xgrid.doFocusRow(objSheet);

        if (objSheet.etc !== undefined && objSheet.etc.Callback != ''){
            eval("xgrid."+objSheet.etc.Callback.replace(/&#39;/g, "'"));
        }

        return focusRow;
    },


    //중복체크
    doDupCheck : function(objSheet, url, keyName) {
        if (objSheet.getRowsByStatus("Added").length == 0) { // 입력 데이터가 없으면
            return true;
        }

        var fnDupCallback = function(dupRow, seq) {
            objSheet.focus({row:dupRow});
            alert(seq + '번째 줄에 중복값이 있습니다.');
        };

        if(keyName.indexOf("|")>-1)keyName = keyName.split("|").join(",");
        var dupRows = objSheet.getRowsByDup(keyName);


        if (dupRows.length>0) { // 중복 데이터가 존재하면
            const dupRow = dupRows[0];  // ✅ 중복된 첫 번째 행을 dupRow로 저장
            fnDupCallback(dupRow, dupRow['SEQ']);
            return false;
        }

        var result = false;

        var keyNames = keyName.split('|');
/*
        common.doAjax(url, {
            save_data : $.map(objSheet.getRowsByStatus("Added"), function(row, index) {
                var rowData = row;

                return keyNames.reduce(function(total, key) {
                    total.push(rowData[key]);

                    return total;
                }, [ row, rowData.SEQ ]).join(':');
            }).join('|')
        }, function(resData, textStatus, jqXHR) {
            resData = resData.XDataMap;
            switch (resData.RESULT_CODE) {
                case '0': // 정상
                    return result = true;
                case '1': // 중복
                    fnDupCallback(objSheet.getRowByIndex(resData.IDX), resData.SEQ);

                    return result = false;
                default:
                    break;
            }
        }, {
            async : false,
            blockEl : window
        });
*/
        return result;
    },

    getSheetLayout :function(layoutButtonSet){
        console.log("-----------------------------------------getSheetLayout---------")
        console.log("layoutButtonSet ", layoutButtonSet)
        var layout = new Array();

        if (layoutButtonSet.COUNT!==undefined && layoutButtonSet.COUNT["Visible"]==1){
            layout.push("Count");
        };

        if (layoutButtonSet.MAPPEND!==undefined && layoutButtonSet.MAPPEND["Visible"]==1){
            layout.push(doSheetMAppendInput());
            layout.push(doSheetMAppendRow(layoutButtonSet.MAPPEND));
        };

        if (layoutButtonSet.SAPPEND!==undefined && layoutButtonSet.SAPPEND["Visible"]==1){
            layout.push(doSheetSAppendRow(layoutButtonSet.SAPPEND));
        };

        if (layoutButtonSet.TREESAPPEND!==undefined && layoutButtonSet.TREESAPPEND["Visible"]==1){
          //  layout.push(doSheetTreeSAppendRow(layoutButtonSet.TREESAPPEND));
        };

        if (layoutButtonSet.TREECAPPEND!==undefined && layoutButtonSet.TREECAPPEND["Visible"]==1){
            //layout.push(doSheetTreeCAppendRow(layoutButtonSet.TREECAPPEND));
        };

        if (layoutButtonSet.REMOVE!==undefined && layoutButtonSet.REMOVE["Visible"]==1){
            layout.push(doSheetRemoveRow(layoutButtonSet.REMOVE));
        };

        if (layoutButtonSet.COLLAPSETREE!==undefined && layoutButtonSet.COLLAPSETREE["Visible"]==1){
            layout.push(doSheetCollapseTree(layoutButtonSet.COLLAPSETREE));
        };

        if (layoutButtonSet.EXPANDTREE!==undefined && layoutButtonSet.EXPANDTREE["Visible"]==1){
            layout.push(doSheetExpandTree(layoutButtonSet.EXPANDTREE));
        };

        if (layoutButtonSet.DOWNLOAD!==undefined && layoutButtonSet.DOWNLOAD["Visible"]==1){
            layout.push(doSheetDownExcel(layoutButtonSet.DOWNLOAD));
        };

        if (layoutButtonSet.UPLOAD!==undefined && layoutButtonSet.UPLOAD["Visible"]==1){
            layout.push(doSheetUpExcel(layoutButtonSet.UPLOAD));
        };

        if (layoutButtonSet.FILTER!==undefined && layoutButtonSet.FILTER["Visible"]==1){
          //  layout.push(doSheetFilter(layoutButtonSet.FILTER));
        };

        if (layoutButtonSet.PERSONALIZE!==undefined && layoutButtonSet.PERSONALIZE["Visible"]==1){
            layout.push(doSheetPersonalize(layoutButtonSet.PERSONALIZE));
        };

        return layout;
    }


};

export default xgrid;