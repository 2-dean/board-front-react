/*
XMap = function(){
  this.map = new Object();
 };
 XMap.prototype = {
     put : function(key, value){
         this.map[key] = value;
     },
     get : function(key){
         return this.map[key];
     },
     containsKey : function(key){
      return key in this.map;
     },
     containsValue : function(value){
      for(var prop in this.map){
       if(this.map[prop] == value) return true;
      }
      return false;
     },
     isEmpty : function(key){
      return (this.size() == 0);
     },
     clear : function(){
      for(var prop in this.map){
       delete this.map[prop];
      }
     },
     remove : function(key){
      delete this.map[key];
     },
     keys : function(){
         var keys = new Array();
         for(var prop in this.map){
             keys.push(prop);
         }
         return keys;
     },
     values : function(){
      var values = new Array();
         for(var prop in this.map){
          values.push(this.map[prop]);
         }
         return values;
     },
     size : function(){
       var count = 0;
       for (var prop in this.map) {
         count++;
       }
       return count;
     }
 };
*/
var xcommon = (function () {


	var privateMethod = function (message) {
		//alert(message);
	};


	var onSetBGColorInput = function(obj) {
		var v = $('#'+obj.id).val();
		if (v.indexOf('|')>=0){
			$('#'+obj.id).css('background-color', '#e1edfa');
		}
		else{
			$('#'+obj.id).css('background-color', 'white');
		}
	};


	return {

		publicMethod1: function (text) {
			privateMethod(text);
		},


		publicMethod1: function (text) {
			privateMethod(text);
		},


		doMapPanorama: function(latt, lngt) {
			var popupWin = window.open(
					  "/map/naver/NaverMapPanorama/init.do?&latt="+latt+"&lngt="+lngt
					, "PANORAMA_POPUP"
					, "width=500, height=400, resizable=1, location=0, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, copyhistory=0"
				);
			popupWin.focus();
		},


		//doReturnLookup: function(valueObj, returnValue, textObj, returnText) {
		//	$('#'+valueObj.id).val(returnValue).trigger('change');
		//	$('#'+textObj.id).val(returnText);
		//	onSetBGColorInput(valueObj);
		//},

		doChangeInput: function(obj) {
			/*
			var upperArr = ['owr_cd', 'stop_cd', 'vhcl_cd', 'center_cd', 'shipcom_cd'];
			var lookupItemLen = (obj.value).split('|').length;

			if (lookupItemLen > 1){
				onSetBGColorInput(obj);
			}
			*/

			onSetBGColorInput(obj);
			var upperArr = ['owr_cd', 'stop_cd', 'vhcl_cd', 'center_cd', 'shipcom_cd'];
			if (upperArr.includes(obj.id)){
				$('#'+obj.id).val($('#'+obj.id).val().toUpperCase());
			}

		},

		doLookupPopup: function(onjCd, objNm, qid, param) {
		},



		doEnterKeyInput: function(e, objCode, objDesc, qid, multiYn) {
			if (event.keyCode == 13){
				if(objCode.value == ''){
					return;
				}
				$.ajax({
				  	type: 'POST'
				     , url: '/popup/LookupPopup/keydown/retrieve.do'
				     , async : false
				     , data: "qid="+ qid +"&"+objCode.id+"="+objCode.value
				     , dataType: 'json'
				     , success: function(data) {
				    	 var code = '';
				    	 var desc = '';
				    	 $.each(data.result, function(index){
				    		 code += data.result[index].VALUE+"|";
				    		 desc += data.result[index].TEXT+",";
				    		 if (multiYn == '0') {
				    			 return false;
				    		 }
				    	});

						if (desc.length > 0){
							code = code.substring(0, code.length-1);
							desc = desc.substring(0, desc.length-1);
						}

				    	objCode.value = code;
				    	objDesc.value = desc;

				    	//onKeyUp="field.value.toUpperCase()"

				    	$(objCode).trigger('change');
				       }
				     , error:function(request,status,error){
				     }
				});
			}
			else{
				objDesc.value = '';
			}

			var newValue = objCode.value.toUpperCase();

			if (objCode.value != newValue) { // 대문자 값과 다르면
				objCode.value = newValue;
			}

			onSetBGColorInput(objCode.id);
		},


		doLookupKeydownCommon: function(event, objCd, objNm, qId, title, columns, options, menuCd, isMulti) {

			if (event.keyCode == 13){ //엔터키

				//단일 선택의 경우 '|' 문자 제거
				if (isMulti == '0'){
					//objCd.value = objCd.value.replace(/\|/gi, "+");
					var idx = objCd.value.indexOf('|');
					if (idx >= 0){
						objCd.value = objCd.value.substr(0, idx);
					}
				}

				var lookupItemLen = (objCd.value).split('|').length;

				$.ajax({
				  	type: 'POST'
				     , url: '/popup/LookupPopup/retrieve.do'
				     , async : false
				     , data: "qid=" + qId + "&lookup_txt=" + objCd.value + "&options=" + options //+ "&title=" + title + "&is_multi=" + isMulti
				     , dataType: 'json'
				     , success: function(result) {

				    	 var data = result.IBSHEETLOOKUP.Data;

				    	 if (lookupItemLen == 0){
				    		 //팝업
				    		 xcommon.doOpenLookupCommon(objCd, objNm, objCd.value, qId, title, columns, options, menuCd, isMulti);
				    	 }
				    	 else if (lookupItemLen == 1){
					    	 if (data.length == 1){
								objCd.value = data[0].value;
								objNm.value = data[0].text;
					    	 }
					    	 else{
					    		 //팝업
					    		 xcommon.doOpenLookupCommon(objCd, objNm, objCd.value, qId, title, columns, options, menuCd, isMulti);
					    	 }
				    	 }
				    	 else {
				    		 if (isMulti == '1'){
				    			 if (lookupItemLen == data.length){

				    				 var value = '';
				    				 var text = '';

							    	 $.each(data, function(idx){
							    		 value += data[idx].value+"|";
							    		 text += data[idx].text+",";
							    	 });

							    	 value = value.substring(0, value.length-1);
							    	 text = text.substring(0, text.length-1);

									objCd.value = value;
									objNm.value = text;
				    			 }
				    			 else{
				    				 //팝업
				    				 xcommon.doOpenLookupCommon(objCd, objNm, objCd.value, qId, title, columns, options, menuCd, isMulti);
				    			 }
				    		 }
				    		 else{
				    			 //팝업
				    			 xcommon.doOpenLookupCommon(objCd, objNm, objCd.value, qId, title, columns, options, menuCd, isMulti);
				    		 }
				    	 }

						 $(objCd).trigger('change');
				     }
				     , error:function(request,status,error){
				     }
				});
			}
			else{
				objNm.value = '';
			}
	    },


	    doGetLookupColumnCommon: function(value, text, etc) {
			var column = new Object();
			column.VALUE = value; //"화주코드";
			column.TEXT = text; //"화주명";
			column.ETC = etc; // 20240426 진성욱 1)null: 컬럼 표현되지 않음 2)undefine: etc로표현됨 3)값이있을경우: 해당컬럼표현  //"화주유형"
			return JSON.stringify(column);
	    },


	    doGetLookupOptionCommon: function(selected, addCols, filter, callback) {
			var option = new Object();
			option.CALLER_TYPE = "INPUT";
			option.SELECTED = selected;
			option.ADD_COLS = addCols;
			option.FILTER = filter;
			option.CALLBACK = callback;
	  		return JSON.stringify(option);
	  	},


	    doGetLookupOptionCommonSheet: function(row, sheetId, valueCol, textCol, addCols, filter, callback, allowInit) {
			var option = new Object();
			option.CALLER_TYPE = "SHEET";
			option.SELECTED = eval(sheetId).getValue(row, valueCol);
			option.SHEET_ID =  sheetId;
			option.ROW_ID = row.id;
			option.VALUE_COL = valueCol;
			option.TEXT_COL = textCol;
			option.ADD_COLS = addCols;
			option.FILTER = filter;
			option.CALLBACK = callback;
			//option.ALLOW_INIT = allowInit;

			/*
			20250117 진성욱
			초기화 버튼에서 콜백메소드를 호출할 경우를 위해 추가
			호출방법 '{"1":"doCallbackChangeCenterZone"}'
			호출화면 : XPASS 우편번호별센터권역관리 화면 참고 (230라인)
			권혁태대리 요구 사항 반영
			 */
			
			try{
				var allowObj = JSON.parse(allowInit);
				option.ALLOW_INIT = allowObj;
			}
			catch{
				option.ALLOW_INIT = allowInit;
			}

	  		return JSON.stringify(option);
		},


		doOpenLookupCommon: function(objValue, objText, lookupTxt, qId, title, columns, options, menuCd, isMulti, sheet, row) {

			//Data Row만 처리
			if(sheet !== undefined && sheet != null && sheet.getRowKind(row) != "Data") {
				return;
			}

			var $form = $('<form></form>');
			$form.appendTo('body');
			$form.attr("method", "POST");

			//20240423 진성욱 폼이를을 넘김
			var optionJson = JSON.parse(options);
			if (optionJson.CALLER_TYPE == "INPUT"){
				var formTag = objValue.closest("form");
				if (formTag !== undefined){
					var objForm =  $("<input type='hidden' name='form_name' value='"+ formTag.name +"'>");
					$form.append(objForm);
				}
			}

			if (objValue != null){
				var objValueIdInput =  $("<input type='hidden' name='obj_value_id' value='"+ objValue.id +"'>");
				$form.append(objValueIdInput);
			}

			if (objText != null){
				var objTextIdInput =  $("<input type='hidden' name='obj_text_id' value='"+ objText.id +"'>");
				$form.append(objTextIdInput);
			}

			if (lookupTxt != null){
				var lookupTxtInput =  $("<input type='hidden' name='lookup_txt' value='"+ lookupTxt +"'>");
				$form.append(lookupTxtInput);
			}

			if (title != null){
				var titleInput =  $("<input type='hidden' name='title' value='"+ title +"'>");
				$form.append(titleInput);
			}

			if (qId != null){
				var qidInput =  $("<input type='hidden' name='qid' value='"+ qId +"'>");
				$form.append(qidInput);
			}

			if (columns != null){
				var columnsInput =  $("<input type='hidden' name='columns' value='"+ columns +"'>");
				$form.append(columnsInput);
			}

			if (options != null){
				var optionsInput =  $("<input type='hidden' name='options' value='"+ options +"'>");
				$form.append(optionsInput);
			}

			if (menuCd != null){
				var menuCdInput =  $("<input type='hidden' name='menu_cd' value='"+ menuCd +"'>");
				$form.append(menuCdInput);
			}

			if (isMulti != null){
				var isMultiInput =  $("<input type='hidden' name='is_multi' value='"+ isMulti +"'>");
				$form.append(isMultiInput);
			}

			var popupWidth = 600;
			var popupHeight = 500;
			var popupX = (window.screen.width / 2) - (popupWidth / 2);
			var popupY= (window.screen.height / 2) - (popupHeight / 2);

			var popupId = "LOOKUP_POPUP";
			var popupWin = window.open(
					  ""
					, popupId
					, "width="+popupWidth+", height="+popupHeight+", left=" + popupX + ", top=" + popupY + ", resizable=1, location=0, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, copyhistory=0"
				);

			$form.attr("target", popupId);
			$form.attr("action","/popup/LookupPopup/init.do");
			$form.submit();

			popupWin.focus();
		},


		doCallbackCommonMsg: function(msg) {
			alert(msg);
		},


		doOpenPopup : function(id, title, url, width, height, param, callback){
			var popupWidth = width;
			var popupHeight = height;
			var popupX = (window.screen.width / 2) - (popupWidth / 2);
			var popupY= (window.screen.height / 2) - (popupHeight / 2);

			var popupWin = window.open(
					  ""
					, id
					, "width="+popupWidth+", height="+popupHeight+", left=" + popupX + ", top=" + popupY + ", resizable=0, location=0, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, copyhistory=0"
				);

			var $form = $('<form></form>');
			$form.appendTo('body');
			$form.attr("method", "POST");

			$form.append($('<input type="hidden" name="title" value="' + title + '">'));
			for(var key in param) {
				$form.append($('<input type="hidden" name="' + key + '" value="' + param[key] + '">'));
			}

			if (callback !== undefined && callback != null && callback != ''){
				$form.append($('<input type="hidden" name="callback" value="' + callback + '">'));
			}

			$form.attr("target", id);
			$form.attr("action", url);
			$form.submit();

			popupWin.focus();
			return popupWin;
		},


		doAjax : function(url, reqData, callbacks, options) {
			if (typeof callbacks === 'function') {
				callbacks = {
					success : callbacks
				};
			}
			if (!$.isPlainObject(options)) {
				options = options ? {
					blockEl : options
				} : {};
			}

			return $.ajax($.extend({
				cache : false,
				dataType : 'html',
				type : 'POST',
				traditional : true
			}, options, {
				url : url,
				data : reqData,
				beforeSend : function(jqHXR, settings) {
					if (options.blockEl && $.blockUI) { // block 대상이 존재하면
						$(options.blockEl).block(options.blockEl != window ? {
							message : ''
						} : {});
					}

					if (callbacks.beforeSend) { // callback이 존재하면
						callbacks.beforeSend(jqHXR, settings);
					}
				},
				success : function(resData, textStatus, jqXHR) {
					if (options.blockEl && $.blockUI) { // block 대상이 존재하면
						$(options.blockEl).unblock();
					}

					if (callbacks.success) { // callback이 존재하면
						if (jqXHR.getResponseHeader('content-type').indexOf('json') != -1) { // JSON 응답이면
							try {
								resData = JSON.parse(resData);
							} catch (e) {
							}
						}

						callbacks.success(resData, textStatus, jqXHR, reqData);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					if (options.blockEl && $.blockUI) { // block 대상이 존재하면
						$(options.blockEl).unblock();
					}

					/*log('status : ' + jqXHR.status);
					log('responseText : ' + jqXHR.responseText);
					log('errorThrown : ' + errorThrown);*/

					if (callbacks.error) { // callback이 존재하면
						callbacks.error(jqXHR, textStatus, errorThrown);
					} else {
						alert('오류가 발생했습니다.');
					}
				},
				complete : function(jqHXR, textStatus) {
					if (callbacks.complete) { // callback이 존재하면
						callbacks.complete(jqHXR, textStatus);
					}
				}
			}));
		},


		/**
		 * 날짜 유효성체크
		 */
		checkDate : function(strDate ,valid ,strDate2){
			if(strDate==''){
				return ''
			}

		 var arrDate
		 var chkDate

		 if (strDate.indexOf("-") != -1)
		 {
		  arrDate = strDate.split("-")
		 }
		 else
		 {
		  if (strDate.indexOf("/") != -1)
		  {
		   arrDate = strDate.split("/")
		  }
		  else
		  {
		   if (strDate.length == 8)
		   {
		    arrDate = strDate.substring(0,4)+"/"+strDate.substring(4,6)+"/"+strDate.substring(6,8)
		    arrDate = arrDate.split("/")
		   }
		   else
		   {
			alert('올바른 날짜 형식이 아닙니다.');
		    return ''
		   }
		  }
		 }
		 if (arrDate.length != 3)
		 {
			 alert('올바른 날짜 형식이 아닙니다.');
		  return ''
		 }
		 if (arrDate[0].length != 4 || arrDate[1].length != 2 || arrDate[2].length != 2)
		 {
			 alert('올바른 날짜 형식이 아닙니다.');
		  return ''
		 }
		 chkDate = new Date(arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2]);

		 if (isNaN(chkDate) == true || arrDate[1] != chkDate.getMonth() + 1 || arrDate[2] != chkDate.getDate())
		 {
			 alert('올바른 날짜 형식이 아닙니다.');
		  return '';
		 }

		// 날짜 validation 체크
		if(valid != undefined) {

			var strDateT = new Date(chkDate);
			var chkDate2 = new Date(document.getElementById(strDate2).value);

			switch (valid) {
				case "FROM":
					if (chkDate2 < strDateT) {
						return document.getElementById(strDate2).value;
					}
					break;
				case "TO":
					if (strDateT < chkDate2) {
						return document.getElementById(strDate2).value;
					}
					break;
			}
		}

		 return arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2];
		},

		/**
		 * 날짜 유효성체크(월별)
		 * 유효성체크 월별 함수 생성 - 2022.04.06 김완섭
		 */
		checkMonth : function(strDate ,valid ,strDate2){
			if(strDate==''){
				return ''
			}
			var arrDate
			var chkDate

			if (strDate.indexOf("-") != -1)
			{
				arrDate = strDate.split("-")
			}
			else
			{
				if (strDate.indexOf("/") != -1)
				{
					arrDate = strDate.split("/")
				}
				else
				{
					if (strDate.length == 6)
					{
						arrDate = strDate.substring(0,4)+"/"+strDate.substring(4,6)
						arrDate = arrDate.split("/")
					}
					else
					{
						alert('올바른 날짜 형식이 아닙니다.');
						return ''
					}
				}
			}
			if (arrDate.length != 2)
			{
				alert('올바른 날짜 형식이 아닙니다.');
				return ''
			}
			if (arrDate[0].length != 4 || arrDate[1].length != 2)
			{
				alert('올바른 날짜 형식이 아닙니다.');
				return ''
			}
			chkDate = new Date(arrDate[0] + "/" + arrDate[1]);

			if (isNaN(chkDate) == true || arrDate[1] != chkDate.getMonth() + 1)
			{
				alert('올바른 날짜 형식이 아닙니다.');
				return '';
			}

			// 날짜 validation 체크
			if(valid != undefined) {
				var strDateT = new Date(chkDate);
				var chkDate2 = new Date(document.getElementById(strDate2).value);

				switch (valid) {
					case "FROM":
						if (chkDate2 < strDateT) {
							return document.getElementById(strDate2).value;
						}
						break;
					case "TO":
						if (strDateT < chkDate2) {
							return document.getElementById(strDate2).value;
						}
						break;
				}
			}
			return arrDate[0] + "-" + arrDate[1];
		},

		doBlockScreen : function(flag){
			if(flag) {
				// 화면의 높이와 너비를 변수로 만듭니다.
			    var maskHeight = $(document).height();
			    var maskWidth = $(window).width();

			    // 마스크의 높이와 너비를 화면의 높이와 너비 변수로 설정합니다.
			    $('.block_mask').css({'width':maskWidth, 'height':maskHeight});
			    $('.block_mask').fadeTo("fast", 0.5);
			}
			else {
				$('.block_mask').hide();
			}
		},

		doCommonMsg : function(msg, result){
			if (result.code == '0'){
				alert(msg + "이(가) 처리되었습니다");
			}
			else{
				alert(msg + " 진행 중 오류가 발생했습니다.\n[" + result.msg + "]");
			}
		},

		doShowErrorAfterSave : function(title, sheet, menuCd, etc){
			if (etc.ProcessRowSeq !== undefined && etc.ProcessRowSeq != null){
				var keys = Object.keys(etc.ProcessRowSeq);
				for(var i=0 ; i<keys.length ; i++){
					sheet.getRowByIndex(etc.ProcessRowSeq[keys[i]]).STATUS = '';
				}
				sheet.rerender();
			}

			if (etc.ErrorRowSeq !== undefined && etc.ErrorRowSeq != null){
				var popupHandle =
					xcommon.doOpenPopup(
						  "ERROR_POPUP"
						, title //팝업 제목
						, "/popup/ErrorPopup/init.do"
						, 800 //width
						, 500 //height
					 	, {
						  	  menu_cd : menuCd
						  	, sheet_id : sheet.id
						  	, err_msg : (JSON.stringify(etc.ErrorRowSeq)).replace(/"/g, '&quot;')
					   	  }
					   	, null //callback 메소드
					);

				popupHandle.focus();
			}
		},


		//오류 메시지에 대한 focusing
		doCallbackFocusError : function(sheet, rowSeq){
			var row = sheet.getRowByIndex(rowSeq);
			sheet.focus(row);
		},


		//주소 마스킹
		doMaskAddr : function(addr){
			var regex = addr.match(/\d+/g);
			return addr.replace(regex, "*");
		},


		//전화번호 마스킹
		doMaskName : function(nm){
			if (nm.length <= 2) {
				return nm.replace(nm.substring(0, 1), "*");
			}

			return (nm[0] + "*".repeat(nm.substring(1, nm.length - 1).length) + nm[nm.length - 1]);
		},


		//전화번호 마스킹
		doMaskPhone : function(phone) {
			if (phone != null && phone != ''){
	  			const values = phone.split("-");
				if (values.length == 1){
					if (phone.length > 7){
						return phone.substr(0, 3) + "****" + phone.substr(7, phone.length);
					}
					else{
						return phone;
					}
				}
				else if (values.length > 1){
					values[1] = "*".repeat(values[1].length);
					return values.join("-");
				}
				else{
					return phone;
				}
			}
			else{
				return "";
			}
		},


		setSheetInfo : function(sheetObj) {

			$.ajax({
				type: 'POST'
			  , url: '/task/cm/CmPersonal/save.do'
			  , async: false
			  , data: {
						  action_cd: 'S'
						, menu_cd: _menuCd
			            , sheet_id: sheetObj.id
						, info: sheetObj.getCurrentInfo()
				 	 	}
			  , dataType: 'json'
			  , success: function(result) {
					if (result.code != 0){
						alert(result.msg);
					}
				}
			  , error: function(request, status, error) {
				  alert("AJAX 오류("+error+")");
				}
			});
		},


		initSheetInfo : function(sheetObj) {

			$.ajax({
				type: 'POST'
			  , url: '/task/cm/CmPersonal/save.do'
			  , async: false
			  , data: {
						  action_cd: 'D'
						, menu_cd: _menuCd
			            , sheet_id: sheetObj.id
				 	 	}
			  , dataType: 'json'
			  , success: function(result) {
					if (result.code != 0){
						alert(result.msg);
					}
					sheetObj.reload();
				}
			  , error: function(request, status, error) {
				  alert("AJAX 오류("+error+")");
				}
			});
		},

		getSheetInfo : function(sheetObj) {
			//console.log(sheetObj.id, _menuCd);
			//console.log(sheetObj.getCurrentInfo());

			$.ajax({
				type: 'POST'
			  , url: '/task/cm/CmPersonal/retrieve.do'
			  , async: false
			  , data: {   menu_cd: _menuCd
			            , sheet_id: sheetObj.id
						, info: sheetObj.getCurrentInfo()
				 	 	}
			  , dataType: 'json'
			  , success: function(result) {
					if (result.code != 0){
						alert(result.msg);
					}
					else{
						if (result.msg.length > 0){
							sheetObj.setCurrentInfo(result.msg.replace(/&quot;/g, '"'));
						}
					}
				}
			  , error: function(request, status, error) {
				  alert("AJAX 오류("+error+")");
				}
			});

		}

	};
})();

