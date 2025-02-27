/**
 * @namespace ib
 */

/**
 * ib 공통 API
 * @namespace   comm
 * @memberof    ib
 */

var ib = ib || {};
(function() {
    (function(ib) {
        ib.comm = (function() {
            var _progressCount = 0,
            	cc = {},
                cu = {};
            
            return {
                /**
                 * module initialize
                 * @memberOf   ib.comm#
                 * @method     init
                 * @private
                 * @returns    {object}         ib.comm object
                 */
                init: function() {
                    cc = this;
                    
                    // cond 객체 초기화 처리
                    if (typeof top.window._popupCond === "undefined") {
                        top.window._popupCond = {};
                    }
                    
                    // create module shotcut
                    if (typeof ib.util !== "undefined") {
                        cu = ib.util;
                    }

                    return this;
                },
                /**
                 * ibsheet 생성 함수
                 * @memberOf   ib.comm#
                 * @method     createIBSheet
                 * @public
                 * @param		{object}    obj						시트를 생성할 div 객체 (혹은 div 객체 id)
                 * @param		{string}    sheetid                 설정 옵션 객체
                 * @param		{string}    width                   시트 너비 
                 * @param		{string}    height                  시트 높이
                 */
                createIBSheet:function(obj,sheetid,width,height){
                	// locale 처리
                    // Grids.Locale = "";
                    // Grids.Config = _sheetCFG; //ibsheet_config.js 에 위치
                    // Grids.Msg = _sheetMSG; //ibsheet_config.js 에 위치
                    
                    if(typeof obj === "string"){
                    	obj = document.getElementById(obj);
                    }

                    // width, height 적용
                    obj.style.width = width;
                    obj.style.height = height;

                    // IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>', obj.id, sheetid);
                    window[sheetid].id = sheetid;
                    window[sheetid].EL = obj.id; //20190326 리사이즈 속도 개선을 위해 추가. 다른 곳에서 사용
                },
                
                IBS_InitSheet:function(sheet,init){
                	var sheetid = sheet.id;
                    
                    var hasDummyCheck = false;
                    //컬럼 기능
                    for(var c=0;c<init.Cols.length;c++){
                        if(init.Cols[c].TreeCol){
                            init.Cfg.MainCol = init.Cols[c].Name;
                        }
                        if(init.Cols[c]["LagacyType"]){

                            if(init.Cols[c]["LagacyType"] == "Status"){
                                if(!init.Def){
                                    init.Def = {};
                                    init.Def.Row = {};
                                    init.Def.Row.CalcOrder = init.Cols[c].Name;
                                }else{
                                    if(init.Def.Row){
                                        if(init.Def.Row.CalcOrder){
                                            init.Def.Row.CalcOrder = init.Def.Row.CalcOrder+","+init.Cols[c].Name
                                        }else{
                                            init.Def.Row.CalcOrder = init.Cols[c].Name;    
                                        }
                                    }else{
                                        init.Def.Row = {};
                                        init.Def.Row.CalcOrder = init.Cols[c].Name;
                                    }
                                }
                            }else if(init.Cols[c].Type == "DummyCheck"){
                                init.Cols[c]["LagacyType"] = init.Cols[c].Type;
                                init.Cols[c].Type = "Bool";
                                init.Cols[c].NoChanged = true;
                
                                init.Cols[c].Header = {
                                    Value: init.Cols[c]["Header"],
                                    HeaderCheck: true
                                }
                               hasDummyCheck = true;
                            }
                        } 
                        
                    }
                    
                    sheet = IBSheet.create({
                        el: sheet.EL,
                        id: sheet.id,
                        options: init
                    });
        
                    window[sheetid].EtcData = {};

                	
                    
                    //COLUMN HIDE/CANCEL만 ACTION MENU에 추가       			
                    // window[sheetid].SetHeaderActionMenu("컬럼 감추기|컬럼 보이기","_ibColHidden|ColHiddenReset");
                    // window[sheetid].SetCountPosition(3);
                    // window[sheetid].SetCountFormat("필터:FILTEREDCOUNT 건 / 전체:SEARCHROWS 건");
                    
                    //window[sheetid].SetCountFormat("전체 조회 수:SEARCHROWS 건 / 필터행 수:FILTEREDCOUNT 건");
                	//이벤트 공통 처리..
                    // cc._triggerSearchEndEvent(window[sheetid]);//조회 후 공통 처리
                    // cc._triggerSaveEndEvent(window[sheetid]);//저장 후 공통처리
                    // cc._triggerDownFinishEvent(window[sheetid]);//엑셀 다운 후 이벤트
                    // cc._triggerLoadExcelEvent(window[sheetid]);//엑셀 업로드 후 이벤트
                    // cc._triggerOnLoadFileSelectEvent(window[sheetid]);//파일 다이얼로그 선택 후 이벤트
                    // cc._triggerOnSelectMenuEvent(window[sheetid]);//컨텍스트 메뉴 이벤트
                    // //cc._trigger_OnResizeEvent(window[sheetid]);//컨텍스트 메뉴 이벤트
                    // cc._triggerOnMouseDown(window[sheetid]);//마우스가 눌려졌을 때 이벤트   
                    //cc._triggerOnFilterEnd(window[sheetid]);//필터
                },
                
                /**
                 * ibsheet 조회 함수
                 * @memberOf   ib.comm#
                 * @method     search
                 * @public
                 * @param		{object}	param                   설정 옵션 객체
                 * @param		{string}	param.sheet 			시트 이름(string or object) (여러개 인 경우 배열로 넣을 것) 
                 * @param 		{string}	param.url				조회 url
                 * @param		{string}	subparam				조회 조건 querystring형태 (ex: name=chris&sa_id=98132&age=45)
                 * @param 		{boolean}	param.append			기존 데이터에 신규데이터를 append할지 여부
                 * @param 		{boolean}	param.sync				조회시 동기 조회 사용여부 (이 기능 사용시 대기이미지는 표시되지 않음)
                 * @param 		{object}	param.mapping			조회 json 내에 데이터 명과 시트와 이름 관계 (ex  mapping:{mySheet:"DataName",mySheet2:"Data2"} )
                 * @param    	{object}	param.loadOpt    	    조회시 LoadSearchData()함수에 추가하고자 하는 옵션이 있는 경우 넣는다.
                 * @param   	{function}	param.ajaxCallBack		서버에서 받은 응답이 LoadSearchData()함수에 들어가기 직전에 발생한다.
                 */
                search:function(param){
                	
                	if(param.sheet!=null){
                		var opt = {}
                		,loadOpt = {}
                		,sheets = [];	
                		
                    //ibleaders shkim 20171103 add		
                    if(param["loadOpt"]){
                		loadOpt = param["loadOpt"];
                    }

                    if (!loadOpt) {
                        loadOpt = {};
                    }
                		
	        		if(!cu.isArray(param.sheet)){
	              	   sheets.push(param.sheet);
	                 }else{
	              	   sheets = param.sheet;
	                 }
	
					if(cu._isEmpty(param.url)){
						cc.messageBox("COE0006");
						return;
					}else{
						opt.url = param.url;
						opt.blockEl = param.blockEl;
					}
					
					//해당 폼에서 조회조건 추출
					if(param.subparam){
						opt.data = param.subparam;	
					}
					
					//기존데이터에 append 여부 (default: false)
					if(param.append){
						loadOpt["Append"] = param.append;
					}
					
					//조회방식 동기/비동기 여부 (default : 비동기)
					// if(param.sync){
					// 	opt["async"] = !(param.sync);
					// 	loadOpt["Sync"] = param.sync;
					// }
					
					if(typeof(param.mapping)!=="undefined"){
						opt["mapping"] = param.mapping;
					}
					opt.callback = function(response){
						for(var i=0;i<sheets.length;i++){
							var grid;
							//시트객체
							if(typeof sheets[i] === "string"){
								grid = window[sheets[i]];
							}else{
								grid = sheets[i];
							}
							//grid.SetWaitImageVisible(false);
							if(typeof opt.mapping === "undefined"){
								if(typeof response[grid.id] !== "undefined"){
									if(param["ajaxCallBack"]) param["ajaxCallBack"](response[grid.id]);
									grid.loadSearchData(response[grid.id],loadOpt["Append"]);	
								}	
							}else{
								if(typeof response[  opt.mapping[grid.id] ] !== "undefined"){
									if(param["ajaxCallBack"]) param["ajaxCallBack"](response[opt.mapping[grid.id]]);
									grid.loadSearchData(response[opt.mapping[grid.id]],loadOpt["Append"]);	
								}else if(typeof response[  grid.id ] !== "undefined"){
									if(param["ajaxCallBack"]) param["ajaxCallBack"](response[  grid.id ]);
									grid.loadSearchData(response[  grid.id ],loadOpt["Append"]);
								}
							}
						}
					};
					
					cc.ajax(opt);
                			
                	}else if(param.chart!=null){
                		var opt = {};
                		opt.url = param.url;
                		opt.data = param.subparam;
                		opt.callback = function(response){
                			var chartid = param.chart;
                			window[chartid].loadSearchData(response,{append: true});	
                		}
                		cc.ajax(opt);
                	}else{
                		cc.messageBox("COE0006");
                	}
                },
                
                valid:function(param){
                	
                	var opt = {},
                	    loadOpt = {},
                		sheets = [];
                		
                	//ibleaders shkim 20171103 add		
                    if(param["loadOpt"]){
                    	loadOpt = param["loadOpt"];
                    }
                    
                	if(!cu.isArray(param.sheet)){
                 	   sheets.push(param.sheet);
                    }else{
                 	   sheets = param.sheet;
                    }
                	
                	if(typeof param.url === "undefined" || typeof param.sheet === "undefined" ){                		
                		cc.messageBox("COE0006");
                		for(var i=0;i<sheets.length;i++){
							var grid;
							//시트객체
							if(typeof sheets[i] === "string"){
								grid = window[sheets[i]];
							}else{
								grid = sheets[i];
							}							
//							grid.HideProcessDlg();
                		}
                		return;
                	}

                	opt.url = param.url;
                	opt.blockEl = param.blockEl;

                	//각시트의 수정된 내용과 각컬럼의 SaveName을 담는다.
                	var rtn = cc.getSaveString(param.sheet,"",param.col,param.allSave);


                	//수정한 내용이 없거나 keyfield error 인 경우 저장을 중단한다.
                	if(typeof rtn === "number"){
                		if(rtn == -2){
                			for(var i=0;i<sheets.length;i++){
    							var grid;
    							//시트객체
    							if(typeof sheets[i] === "string"){
    								grid = window[sheets[i]];
    							}else{
    								grid = sheets[i];
    							}							
//    	                		grid.HideProcessDlg();
                    		}
                			
                			cc.messageBox("COI0013");                		
	                	    return;
                	    }
                	}                	
       
                	
                	if(typeof(param.mapping)!=="undefined"){
						opt["mapping"] = param.mapping;
					}
                	
                	//시트에서 수정한 내용
                	opt.data = rtn.saveString;
                	
                	//subparam을 통해 전달 받은 내용
                	if(param.subparam){
						opt.data = opt.data + "&" + param.subparam;	
					}
                	opt.callback = function(response){

                		for(var i=0;i<sheets.length;i++){
							var grid;
							//시트객체
							if(typeof sheets[i] === "string"){
								grid = window[sheets[i]];
							}else{
								grid = sheets[i];
							}
							// grid.SetWaitImageVisible(false);
							if(typeof opt.mapping === "undefined"){
								if(typeof response[grid.id] !== "undefined"){
									if(param["ajaxCallBack"]) param["ajaxCallBack"](response[grid.id]);
									grid.loadSearchData(response[grid.id],loadOpt["Append"]);	
								}	
							}else{
								
								if(typeof response[  opt.mapping[grid.id] ] !== "undefined"){						
									if(param["ajaxCallBack"]){
										param["ajaxCallBack"](response[opt.mapping[grid.id]]);
									}
						
									grid.loadSearchData(response[opt.mapping[grid.id]],loadOpt["Append"]);
									
								}else if(typeof response[  grid.id ] !== "undefined"){
									if(param["ajaxCallBack"]) {
										param["ajaxCallBack"](response[  grid.id ]);
									}
									grid.loadSearchData(response[  grid.id ],loadOpt["Append"]);
								}
							}
						}
                	}
                	cc.ajax(opt);
                },
                
                
                /**
                 * ibsheet 조회 함수
                 * @memberOf   ib.comm#
                 * @method     searchPaging
                 * @public
                 * @param		{object}    param                   설정 옵션 객체
                 * @param		{string}	param.sheet 			시트 이름(string or object) (여러개 인 경우 배열로 넣을 것) 
                 * @param 		{string}	param.url				조회 url
                 * @param		{string}	subparam				조회 조건 querystring형태 (ex: name=chris&sa_id=98132&age=45)
                 * 
                 * @param 		{boolean}	param.sync				조회시 동기 조회 사용여부 (이 기능 사용시 대기이미지는 표시되지 않음)
                 */
                searchPaging:function(param){
                	var _sheet;
                	if(param.sheet==null){ 
                		cc.messageBox("COE0006");
                		return;
                	}else{
                		_sheet = param.sheet;
                	}
                	
                	var opt = {};
                		
	        		if(cu.isArray(param.sheet)){
	        			cc.messageBox("COW0022");
	        			return; 
	                }
	
					if(cu._isEmpty(param.url)){
						cc.messageBox("COE0006");
						return;
					}else{
						opt.url = param.url;
					}
					
					//해당 폼에서 조회조건 추출
					if(param.subparam){
						opt.Param = param.subparam;	
					}
					
					_sheet.DoSearchPaging({"url":opt.url,"param":opt.Param,"method":"POST"});
                },
                
                
                
                

                /**
                 * ibsheet 저장 함수
                 * @memberOf   ib.comm#
                 * @method     save
                 * @public
                 * @param		{object}    param                   		설정 옵션 객체
                 * @param		{object}	param.sheet						시트 이름 혹은 시트 객체  (여러개 인 경우 모두 넣을 것) 
                 * @param		{string}	param.url						저장 url
                 * @param		{string}	[param.subparam]				저장시 전달할 querystring
                 * @param		{boolean}	[param.sync]					동기화 여부 (defalut:false)
                 * @param		{boolean}	[param.quest]					저장하시겠습니까? 컨펌 여부. (default:true)
                 * @param		{int}		[param.col]						특정 컬럼 기준 저장(checkbox 컬럼을 지정하면 체크된 데이터만 전송)
                 * @param		{int}		[param.allSave]					전체데이터 저장 여부(default:0)
                 */
                save:function(param){
                	
                	var opt = {},
                		sheets = [];
                	
                	if(!cu.isArray(param.sheet)){
                 	   sheets.push(param.sheet);
                    }else{
                 	   sheets = param.sheet;
                    }
                	
                	if(typeof param.url === "undefined" || typeof param.sheet === "undefined" ){
                		cc.messageBox("COE0006");
                		return;
                	}

                	opt.url = param.url;
                	opt.blockEl = param.blockEl;

                	//각시트의 수정된 내용과 각컬럼의 SaveName을 담는다.
                	var rtn = cc.getSaveString(param.sheet,"",param.col,param.allSave);


                	//수정한 내용이 없거나 keyfield error 인 경우 저장을 중단한다.
                	if(typeof rtn === "number"){
                		if(rtn == -2) cc.messageBox("COI0000");
	                	return;
                	}
                	
                	/* 저장시 메세지 묻지 않고 바로 처리되도록 아래 로직 주석 처리함
                	 * 2017-06-30 by 아이비리더스
                	 */
                	/*
                	if(typeof param.quest === "undefined" || param.quest){
                		if(typeof param.col === "undefined"){
                			if (!cc.messageBox("COI0005" , [rtn.insCnt, rtn.updCnt, rtn.delCnt] , "CONFIRM")) {
    	                		return;
    	                	}	
                		}else{
                			if (!cc.messageBox("COI0012" , rtn.chkCnt , "CONFIRM")) {
    	                		return;
    	                	}
                		}
                	}
                	*/
                	
                	if(typeof(param.mapping)!=="undefined"){
						opt["mapping"] = param.mapping;
					}
                	
                	//시트에서 수정한 내용
                	opt.data = rtn.saveString;
                	
                	//subparam을 통해 전달 받은 내용
                	if(param.subparam){
						opt.data = opt.data + "&" + param.subparam;	
					}
                	opt.callback = function(response){

                		for(var i=0;i<sheets.length;i++){
                			var grid = (typeof sheets[i] === "string")?window[sheets[i]]:sheets[i];
                			
                			if(typeof opt.mapping === "undefined"){
								if(typeof response[grid.id] !== "undefined"){
                                    // if( response[grid.id].Result.Code > -1){
                                        // grid.acceptChangedData();
                                        grid.applySaveResult(response[grid.id].IO.Result
                                            ,response[grid.id].Message
                                            ,response[grid.id]);
                                    // }
								}	
							}else{
								if(typeof response[  opt.mapping[grid.id] ] !== "undefined"){
                                    // if( response[opt.mapping[grid.id]].Result.Code > -1){
                                        // grid.acceptChangedData();
                                        grid.applySaveResult(response[opt.mapping[grid.id]].IO.Result
                                            ,response[opt.mapping[grid.id]].Message
                                            ,response[opt.mapping[grid.id]]
                                            );
                                    // }
								}else if(typeof response[  grid.id ] !== "undefined"){
                                    // if( response[  grid.id ].Result.Code > -1){
                                        // grid.acceptChangedData();
                                        grid.applySaveResult(response[  grid.id ].IO.Result
                                            ,response[  grid.id ].Message
                                            ,response[  grid.id ]);
                                    // }
								}
							}
                			
                			
                		}
                	}
                	cc.ajax(opt);
                },


                /**
                 * IBSheet의 내용을 xlsx 파일로 export 한다.
                 * @memberOf    ib.comm#
                 * @method      down2excel
                 * @public
                 * @param       {object}       opt                                          생성 옵션 객체
                 * @param       {array}        opt.id                                       엑셀로 다운로드 받을 IBSheet id, 여러개인 경우 배열로
                 * @param       {string}       opt.name	                                    다운받을 파일명
                 * @param       {string}       opt.sheetname	                            다운받을 worksheet 명, 여러개인 경우 배열로
                 * @param       {string}       opt.title		                            타이틀 , 여러개인 경우 배열로
                 * @param       {string}       opt.mode                                     0: 모든 컬럼 다운로드,1(default):상태컬럼,Seq,DelCheck 컬럼 제외하고 다운로드
                 * @param       {string}       opt.skipcols                                 다운 받지 않을 컬럼(다운 받고 싶지 않은 컬럼의 인덱스(혹은 SaveName)를 구분자 "|"로 연결한 스트링)
                 * @param       {string}       opt.rows                                     다운 받을 행(다운 받고자 하는 행의 인덱스를 구분자 "|"로 연결한 스트링,설정이 없으면 모든 행이 다운로드 된다.)
                 */
                downExcel : function(opt) {

					var opts = [];
					if (!cu.isArray(opt)) {
						opts.push(opt);
					} else {
						opts = opt;
					}					
					if (typeof opt === "undefined"					
							|| typeof opts[0]["id"] === "undefined") {
						cc.messageBox("COE0006");
						return;
					}

					
					
					// IBQueue.Init();
                    
                    // IBQueue.AddItem({
                    //     method: cc.showBlockUI,
                    //     context: window.ib.comm
                    // });

                    // IBQueue.AddItem({
                    //     method: cc._downExcel,
                    //     context: window.ib.comm,
                    //     params: [opts]
                    // });
                    
                    // IBQueue.Start();
                    
                    setTimeout(function(){window.ib.comm.showBlockUI();},1);
                    setTimeout(function(){window.ib.comm._downExcel(opts);},1);

                },
				_downExcel:function(opts){
						var firstGrid;
						if(typeof(opts[0]["id"])==="string"){
							firstGrid = window[opts[0]["id"]];
						}else{
							firstGrid = opts[0]["id"];			
						}
						//버퍼링 시작
						firstGrid.down2ExcelBuffer(1);
						
						for (var i = 0; i < opts.length; i++) {
							
							var singleOpt = opts[i];
							
							var grid;
							if(typeof(singleOpt.id)==="string"){
								grid = window[singleOpt.id];
							}else{
								grid = singleOpt.id;
							}
							//엑셀 다운로드 관련 기본 옵션
							var params = {
								
							};
							
							params["downCols"] = opts[0]["downCols"]; //20230329 진성욱
							params.merge = "1"; //20230306 김완섭 헤더머지
							
							//엑셀 파일명 설정
							if (typeof singleOpt.name === "undefined") {
								params["fileName"] = "DOWNLOADED_"
										+ cu.getToday("ymd", "-") + ".xlsx";
							} else {
								params["fileName"] = singleOpt.name + ".xlsx";
							}
							
							//worksheet 이름
							if (typeof singleOpt.sheetname === "undefined") {
								var d = (new Date()).toLocaleString();
								params["sheetName"] = d.substring(0, d.indexOf("일"));
							} else {
								params["sheetName"] = singleOpt.sheetname;
							}
							
							//DownCols에서 param.skipcols  의 컬럼을 제외시킴
							if (typeof singleOpt.skipcols === "undefined") {
								if (params.downCols == "") {
									delete params["downCols"];
								}
							} else {
								var skipcolsArr = singleOpt.skipcols.split("|");
								for (var x = 0; x < skipcolsArr.length; x++) {
									if (isNaN(skipcolsArr[x])) {
                                        //var colIndex = grid.SaveNameCol(skipcolsArr[x]);
                                        var colIndex = grid.getColIndex(skipcolsArr[x])-1;
										skipcolsArr[x] = colIndex+"";
									}
								}
								var downcolsArr = params.downCols.split("|");
								// 차집합
								params.downCols = ($(downcolsArr).not(skipcolsArr).get()).join("|");
							}//skpcols end

							//특정 행만 내리는 경우 downrows
							if (typeof singleOpt.rows !== "undefined") {
								params.downRows = singleOpt.rows;
							}else{
								params.downRows = "Visible";
							}

							//excel 내 타이틀 설정
							if (typeof singleOpt.title !== "undefined") {
								params.titleText = singleOpt.title;
								var lr = 1;
								if (typeof params.downCols === "undefined"
										|| params.downCols == "") {
									lr = grid.getColIndex ( grid.getLastCol() ) -1;
								} else {
									lr = params.downCols.split("|").length;
								}
								params.userMerge = "0,0,1," + lr;
							}
							
							//20240409 추가 진성욱
							params.checkBoxOnValue = 'Y';
							params.checkBoxOffValue = 'N';
					
							//대기 이미지를 없앤다.
							//grid.SetWaitImageVisible(0);
//							grid.ExportMode = "2";
							grid.down2Excel(params);	
						}//end for
						//버퍼링 종료, 다운로드 시작!
						window[opts[0]["id"]].down2ExcelBuffer(0);
				},
				 /**
                 * 엑셀 파일을 읽어 시트에 로드한다.
                 * @memberOf    ib.comm#
                 * @method      loadexcel
                 * @public
                 * @param       {object}        opt                                             생성 옵션 객체
                 * @param       {string}        opt.id                                         	엑셀로 다운로드 받을 IBSheet id
                 * @param       {string}        opt.mode	                                    엑셀파일과 메핑 규칙
                 * @param       {string}        opt.startRow	                                엑셀 파일 안에 읽어들일 시작행
                 * @param       {string}        opt.endRow		                                엑셀 파일 안에 읽어들일 마지막행
                 */
                loadExcel: function(opt) {
                	if(typeof opt === "undefined"){
                		cc.messageBox("COE0006");
                		return;
                	}
                	
                	var opts = [];
					if (!cu.isArray(opt)) {
						opts.push(opt);
					} else {
						opts = opt;
					}
					
					
					var firstGrid;
					if(typeof opts[0]["id"] === "string"){
						firstGrid = window[opts[0]["id"]];
					}else{
						firstGrid = opts[0]["id"];
					}
					firstGrid.loadExcelBuffer(true)
					//console.log('test:'+opts[0]["id"]);
					
					for(var o=0;o<opts.length;o++){
						var grid;
						if(typeof opts[o]["id"] === "string"){
							grid = window[opts[o]["id"]];
						}else{
							grid = opts[o]["id"];
						}
						var params = $.extend({"Mode":"HeaderMatch"}, opts[o]);
	                	
	                	if(typeof opts[o].mode !== "undefined"){
	                		params["mode"] = opts[o].mode;
	                	}
	                	
	                	if(typeof opts[o].sheetname !=="undefined"){
	                		params["workSheetName"] = opts[o].sheetname;
	                	}
	                	
	                	if(typeof opts[o].startRow !== "undefined"){
	                		params["startRow"] = opts[o].startRow; 
	                	}
	                	//default 값 삭제 HeaderMatch 이용 및 startRow,EndRow 필요할때 필수 입력,
	                	/*
	                	else{
	                		//첫행에 타이틀이 있다고 가정해서 두번째 행부터 읽어들이자.
	                		params["StartRow"] = 2;
	                	}
	                	*/
	                	if(typeof opts[o].endRow !== "undefined"){
	                		params["endRow"] = opts[o].endRow; 
	                	}
	                	//grid.SetWaitImageVisible(0);
	                	//console.log(params);
	                	//alert('params:'+JSON.stringify(params))
	                	grid.loadExcel(params);
					}
                	firstGrid.loadExcelBuffer(false);
                },

                /*
                 * ibsheet 의 저장할 데이터를 추출하는 함수
                 * @memberOf   ib.comm#
                 * @method     getSaveString
                 * @public
                 * @param		{array}		sheet				추출할 시트  이름 혹은 객체 (여러개 인 경우 배열로)
                 * @param		{string}	[deli]				전달할 문자열 구분자 (default: "‡")
                 * @param		{int}		[col]				저장대상 컬럼 index 혹은 SaveName 
                 * @param		{int}		[allSave]			전체저장 여부 1 or 0 (default:0[false])
                 * 
                 * @returns     {object}	rtn
                 * @returns     {string}	rtn.saveString		시트에서 추출한 저장 querystring
                 * @returns     {int}		rtn.insCnt			입력행수
                 * @returns     {int}		rtn.updCnt			수정행수
                 * @returns     {int}		rtn.delCnt			삭제행수
                 * @returns     {int}		rtn.chkCnt			선택행수
                 */
                getSaveString:function(sheet,deli,col,allSave){
                   
                   var opt = {} //default 값
                   		,saveString = ""
                   		,saveNames = ""
                   		,sheets = []
                   		,rtn = {}
                   		,ins = 0
                   		,upd = 0
                   		,del = 0
                   		,chk = 0;
                   if(!cu.isArray(sheet)){
                	   sheets.push(sheet);
                   }else{
                	   sheets = sheet;
                   }
                   
                   if(typeof deli !== "string"||deli == ""){
                	   deli = "‡";
                   }
                   
                   //각시트의 수정된 내용과 각컬럼의 SaveName을 담는다.
                   for(var i=0;i<sheets.length;i++){
                	   
                	   var grid = (typeof sheets[i] === "string")?window[sheets[i]]:sheets[i];
                	   
                	   var tempStr = "";
                	   
                	   //전체저장 여부
                	   if(typeof allSave !== "undefined" && allSave == 1){
                    	   opt = {"prefix":grid.id+"_","queryMode":2,"delim":deli,"saveMode":0};
                	   }else{
                    	   opt = {"prefix":grid.id+"_","queryMode":2,"delim":deli};
                    	   
                    	   if(typeof col !== "undefined"){
                    		   opt.Col = col;
                    		   chk += grid.getRowsByChecked(col).length;
                    	   }else{
                    		   //입력,수정,삭제 건수 확인
                        	   ins += grid.getRowsByStatus("Added").length;
                        	   upd += grid.getRowsByStatus("Changed").length;
                        	   del += grid.getRowsByStatus("Deleted").length;
                    	   }
                	   }
                	   
                	   tempStr =  grid.getSaveString(opt);
                	   
                	   //console.log("tempStr:"+tempStr);
                	   
                	   //KeyField에러 인 경우..
                	   if(tempStr.indexOf("RequiredError")>-1) return -1;
                	   
                	   
                	   if(saveString!=""){
                		   saveString += "&"+tempStr;
                	   }else{
                		   saveString = tempStr;
                	   }
                	   //IBSheet 각 컬럼에 대한 SAVENAME 전달
                	   saveNames +=  "&"+grid.id+"_SAVENAME="+grid.getCols().join("|");
                   }
                   
                   //저장할 데이터가 전혀 없는 경우
                   if(saveString == "") return -2;
                   
                   rtn.saveString = saveString+saveNames;
                   rtn.insCnt = ins;
                   rtn.updCnt = upd;
                   rtn.delCnt = del;
                   rtn.chkCnt = chk;
                   
                   return rtn;
                },
                
                /**
                 * ajax 기본 모듈
                 * @memberOf   ib.comm#
                 * @method     ajax
                 * @private
                 * @param      {object}     opt                     설정 옵션
                 * @param      {string}     [opt.url = '/xxx/xxx.do']     서버 요청 방법
                 * @param      {string}     [opt.type = 'POST']     서버 요청 방법
                 *
                 * | Enum | Description       |
                 * |------|-------------------|
                 * | GET  | GET 방식          |
                 * | POST | POST 방식         |
                 *
                 * @param      {boolean}    [opt.blockUI = true]    blockUI 사용여부
                 * @param      {boolean}    [opt.async = true]      비동기 요청 여부
                 * @param      {object}     [opt.data]              전달할 param 객체
                 * @param      {function}   [opt.callback]          callback function
                 */
                ajax: function(opt) {
                    var blockUI = true,
                        blockEl = null,
                        paramData = null; 
                        headers = {  // 공통으로 가야하는 값에 대한 설정
                            // "Content-Type":"application/json; charset=UTF-8",
                            // "Accept":"application/json, text/javascript, */*; q=0.01"
                            "X-Requested-With": "XMLHttpRequest"
                        };

                    // TODO : valid arguments
                    if (typeof opt === "undefined") {
                        opt = {};
                    }

                    paramData = opt.data;
                    
                    // blockUI 사용 여부
                    blockUI = (typeof opt.blockUI === "undefined") ? true : !!opt.blockUI;
                    blockEl = opt.blockEl;

                    $.ajax({
                        type: opt.type || 'POST',
                        async: (opt.async === false ? false : true),
                        processData: false,
                        dataType: 'json',
//                        contentType: "application/json",
                        data: paramData,
                        url: opt.url,
                        beforeSend: function() {
                            // blockUI : open
                            if (blockUI) {
                            	if (opt.blockEl && $.blockUI) {
                            		$(opt.blockEl).block();
                            	} else {
                            		cc.showBlockUI();
                            	}                                
                            }
                        },
                        headers: headers,
                        success: function(response) {  // 서버에서 내려오는 데이타 형식에 맞춰서 수정
                        	
                            try {
                                if (typeof opt.callback === "function") {
                                    opt.callback(response);
                                }
                            } catch (e) {
                                console.error(e);
                                cc.messageBox("COE0005");
                            }
                        },
                        error: function(data, status, err) {
                        	  try {
                        		  if(err != ''){
                        			  cc.alert(status + " : " + err);
                        		  }
                                  if (typeof opt.callback === "function") {
                                      opt.callback(status);
                                  }
                              } catch (e) {
                                  console.error(e);
                                  cc.messageBox("COE0005");
                              }
                        },
                        complete: function() {
                        	if (opt.blockEl && $.blockUI) {
                        		$(opt.blockEl).unblock();
                        	} else {
                        		cc.hideBlockUI();
                        	}
                        }
                    });
                },
                
                /**
                 * popup dialog 의 컨테이너 객체를 생성 한다.
                 * @memberOf   ib.comm#
                 * @method     _createPopupContainer
                 * @private
                 * @param      {string}     type        팝업 종류
                 */
                _createPopupContainer: function(type) {
                    var context = $(top.document),
                        container,
                        btnArea,
                        btnHtml = [],
                        frame;

                    type = type || "default";

                    if (typeof btnDisplay === "undefined") {
                        btnDisplay = false;
                    }

                    if (context.find("#" + type + "-popup-").length <= 0) {
                        container = document.createElement("div");
                        container.id = type + "-popup-dialog";
                        container.style.cssText = "display:none;overflow:hidden;";

                        frame = document.createElement("iframe");
                        frame.id = type + "-popup-frame";
                        frame.style.cssText = "border:none;";

                        btnArea = document.createElement("div");
                        $(btnArea).css("display", "none");

                        btnHtml.push("<button type='button' class='txt_btn' id=\"" + type + "-popup-ok\"></button>");
                        btnHtml.push("<button type='button' class='txt_btn' id=\"" + type + "-popup-cancel\"></button>");
                        $(btnArea).html(btnHtml.join(""));

                        container.appendChild(btnArea);
                        container.appendChild(frame);
                        context.find("body").append(container);
                    }
                },


                /**
                 * popup 활성시 부모창에 대한 layer 관리 한다.
                 * @memberOf   ib.comm#
                 * @method     _progressPopup
                 * @private
                 * @param      {boolean}     부모창 layer 출력 여부
                 */
                _progressPopup: function(flag) {
                    // 프로그래스 이미지가 담긴 HTML구조 생성
                    var prgImg = '<div class="ib-progressPopup"></div>';

                    if (flag == true) {
                        // 상위 Document 에 append
                        if ($(top.document.body).find(".ib-progressPopup").length == 0) {
                            $(top.document.body).append(prgImg);
                        }
                    } else {
                        // 로딩끝나면 지움
                        $(top.document.body).children('.ib-progressPopup').remove();
                    }
                },
                
                /**
                 * progress layer 관리 한다.
                 * @memberOf   ib.comm#
                 * @method     _progress
                 * @private
                 * @param      {boolean}     progress 출력 여부
                 */
                _progress: function(flag) {
                    // 프로그래스 이미지가 담긴 HTML구조 생성
                    var prgImg = '<div class="ib-progress"><span></span></div>';

                    if (flag == true) {
                        // 상위 Document 에 append
                        if ($(top.document.body).find(".ib-progress").length == 0) {
                            $(top.document.body).append(prgImg);
                        }
                    } else {
                        // 로딩끝나면 지움
                        $(top.document.body).children('.ib-progress').remove();
                    }
                },
                
                /**
                 * progress layer 활성화 한다 .
                 * @memberOf   ib.comm#
                 * @method     showBlockUI
                 * @private
                 */
                showBlockUI: function() {
                    _progressCount++;
                    this._progress(true);
                },

                /**
                 * progress layer 비활성화 한다 .
                 * @memberOf   ib.comm#
                 * @method     hideBlockUI
                 * @private
                 */
                hideBlockUI: function() {
                    _progressCount--;

                    if (_progressCount <= 0) {
                        setTimeout(function() {
                            ib.comm._progress(false);
                            _progressCount = 0;
                        }, 100);

                    }
                },
                /**
                 * 메시지를 출력 한다. ( alert , confirm , 사용자 지정)
                 * @memberOf   ib.comm#
                 * @method     messageBox
                 * @public
                 * @param      {string}      code     메시지 코드
                 * @param      {array}      msg       코드에서 가져온 메시지에 치환할 메시지
                 * @param      {string}     [type = ALERT]   ALERT , CONFIRM , 사용자 지정
                 * @example
                 * ```
                 *  $("#alertBox").click(function() {
                 *      ib.comm.messageBox("" , "테스트 ");
                 *      ib.comm.messageBox("COW1001" , "테스트 ");
                 *  });
                 *
                 *  $("#confirmBox").click(function() {
                 *      if ( ib.comm.messageBox( "" , "테스트 " , "CONFIRM") ){
                 *          ib.comm.messageBox("COW1001 " , "테스트" , "CONFIRM");
                 *      }
                 *  });
                 * ```
                 */
                messageBox: function(code, msg, type) {
                    var retMsg;

                    if (msgCode[code] === undefined) {
                        retMsg = msg;
                    } else {
                        retMsg = msgCode[code];

                        if (cu.isArray(msg)) {
                            for (i = 0, len = msg.length; i < len; i++) {
                                retMsg = retMsg.split('{' + i + '}').join(msg[i]);
                            }
                        } else {
                            retMsg = retMsg.split('{0}').join(msg);
                        }
                    }

                    if (type === undefined) type = "ALERT";

                    if (type === "MSGBOX") {

                    } else if (type === "CONFIRM") {
                        return this.confirm(retMsg);
                    } else {
                        this.alert(retMsg);
                    }
                },
                /**
                 * alert 메시지를 출력 한다. (system alert 을 그대로 사용 한다.)
                 * @memberOf   ib.comm#
                 * @method     alert
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 */
                alert: function(msg) {
                    alert(msg);
                },

                /**
                 * alert 메시지를 출력 한다. (system confirm 을 그대로 사용 한다.)
                 * @memberOf   ib.comm#
                 * @method     confirm
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 * @returns    {boolean}            confirm 반환 값
                 */
                confirm: function(msg) {
                    var res = false;
                    res = confirm(msg);

                    return res;
                },

                
                /**
                 * popup dialog 를 출력 한다.
                 * @memberOf   ib.comm#
                 * @method     showPopup
                 * @public
                 * @param      {object}     opt                         설정 옵션 객체
                 * @param      {string}     opt.url                     팝업 URL
                 * @param      {string}     [opt.width = "m"]           팝업 다이얼로그 너비 종류
                 *
                 * | Enum | Description         |
                 * |------|---------------------|
                 * | s    | small size (500px)  |
                 * | m    | medium size (800px) |
                 * | l    | large size (1000px) |
                 *
                 * @param      {number}     [opt.height = 500]          팝업 다이얼로그 높이
                 * @param      {number}     [opt.title = ""]            헤더 타이틀
                 * @param      {number}     [opt.type = "default"]      팝업 다이얼로그 타입 (팝업 ID)
                 * @param      {object}     [opt.cond]                  팝업에 전달한 내용의 json 객체
                 * @param      {string}     [opt.resFuncName]           팝업에서 데이터를 받아서 처리할 함수명
                 */
                showPopup: function(opt) {
                    var context = $(top.document),
                        type = opt.type || "default",
                        topWindow = $(top.window).get(0),
                        $ok = null,
                        $cancel = null,
                        $dialog = null,
                        popFrame = null,
                        widthType = "m",
                        width = 800,
                        widthList = {
                            "S": 500,
                            "M": 900,
                            "L": 1000
                        };

                    topWindow._openPopupList = topWindow._openPopupList || {};

                    // 너비 사이즈 처리
                    widthType = ((opt.width || "m") + "").toUpperCase();
                    width = widthList[widthType] || widthList["M"];

                    // type 중복 체크
                    while (topWindow._openPopupList[type]) {
                        type = type + "-dup";
                    }

                    // check container
                    cc._createPopupContainer(type);

                    $ok = context.find("#" + type + "-popup-ok");
                    $cancel = context.find("#" + type + "-popup-cancel");
                    $dialog = context.find("#" + type + "-popup-dialog");

                    $ok.unbind("click");
                    $cancel.unbind("click");

                    $ok.on("click", function() {
                        $dialog.dialog("close");
                    });

                    $cancel.on("click", function() {
                        $dialog.dialog("close");
                    });

                    $dialog.dialog({
                        autoOpen: false,
                        resizable: ((typeof opt.resizable === "undefined") ? true : !!opt.resizable),
                        modal: (opt.modal === false ? false : true),
                        width: width,
                        height: (opt.height || 500),
                        hideCloseButton: false,
                        title: opt.title || "",
                        // position: {my: "center", at: "center", of: $(top.window)},
                        open: function(event, ui) {
                            var popContainer = context.find("#" + type + "-popup-dialog"),
                                height = popContainer.dialog("option", "height"),
                                width = popContainer.dialog("option", "width"),
                                $btnClose = context.find(".ui-dialog-titlebar-close");

                            
                            // 헤더의 닫기버튼 사용안하기
                            // context.find(".ui-dialog-titlebar-close").css("visibility", "hidden");

                            // 헤더의 닫기버튼 css 설정
//                            $btnClose.removeClass("ui-button ui-corner-all ui-widget").addClass("popup-dialog-icon-close");
//                            $btnClose.children().remove();
                            $btnClose.blur();

                            popFrame = context.find("#" + type + "-popup-frame");

                            popFrame.attr("src", opt.url);
                            popFrame.css("height", height);
                            popFrame.css("width", width);

                            // cond 설정 처리
                            opt.cond = opt.cond || {};
                            $.extend(true, opt.cond, {
                                "popupType" : type,
                                "multiSelect": opt.multiSelect || false,
                                "resFuncName": opt.resFuncName || "",
                                "opener": window
                            });

                            top.window._popupCond[type] = opt.cond;
                        },
                        close: function(event, ui) {
                            delete topWindow._openPopupList[type];
                            popFrame.unbind("load");
                            $dialog.remove();

                            cu.setElemFocus($("#" + opt.focusNext));
                        }
                    });

                    topWindow._openPopupList[type] = 1;

                    $dialog.dialog("option", "position", {
                        my : 'cetner',
                        at : 'center',
                        of: $(top.window)
                    });

                    $dialog.dialog("open");

                    return false;
                },

                /**
                 * 팝업을 닫는다
                 * @memberOf   ib.comm#
                 * @method     closePopup
                 * @public
                 * @param      {string}     type        팝업 타입명 (팝업 ID)
                 */
                closePopup: function(type) {
                    $(parent.document).find("#" + type + "-popup-ok").click();
                },

                /**
                 * 팝업에 전달된 param 를 확인 한다.
                 * @memberOf   ib.comm#
                 * @method     getPopupParam
                 * @public
                 * @param      {string}     type        팝업 타입명 (팝업 ID)
                 * @returns    {object}     result
                 * @returns    {object}     result.{cond}           사용자가 전달한 param 정보
                 * @returns    {string}     result.popupType        팝업 타입명 (팝업 ID)
                 * @returns    {boolean}    result.multiSelect      멀티선택 여부
                 * @returns    {object}     result.resFuncName      결과를 처리할 function 명
                 * @returns    {object}     result.opener           opener 의 window 객체
                 */
                getPopupParam: function(type) {
                    var res = {},
                        popupCond = top.window._popupCond;

                    if (typeof popupCond !== "undefined") {
                        res = popupCond[type];
                    }

                    return res;
                },
                
                
                
               

                /**
                 * Json 객체의 데이터를 form 에 로드 한다.
                 * @memberOf   ib.comm#
                 * @method     loadForm
                 * @public
                 * @param      {string}     target    form id 또는 form object
                 * @param      {object}     data      대상 json 객체
                 * @param      {string}     formPreFix      form 안에 element 이름 앞에 붙는 글자.
                 */
                loadForm: function(form, data,formPreFix) {
                    cc._loadForm(form, data,formPreFix);
                },
                
                
                
                
                /**
                 * 조회 결과를 form에 로드한다.
                 * @memberOf   ib.comm#
                 * @method     _loadForm
                 * @private
                 * @param      {string}     target    		form id 또는 form object
                 * @param      {object}     data      		form 에 로드할 json data
                 * @param      {string}     formPreFix      form 안에 element 이름 앞에 붙는 글자.
                 */
                _loadForm: function(form, data,formPreFix) {
                	
                    var formName = "",
                        prop = "",
                        elem = null,
                        elemType = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }
                    if(typeof formPreFix === "undefined"){
                    	formPreFix = "";
                    }

                    formName = form.attr("name");

                    // 단일 데이터가 아닌 경우에는 첫번째 객체로 로드 한다.
                    if (data.length > 0) {
                        data = data[0];
                    }

                    for (prop in data) {
                        elem = null;
                        
                        try {
                            elem = document[formName][formPreFix+prop];
                            if (elem == null || typeof elem === "undefined") {
                                elem = document.getElementById(formPreFix+prop);
                            }

                            if (elem == null || typeof elem == "undefined") {
                                continue;
                            }
                            if (elem == null ||typeof(elem["type"]) == "undefined"){
                            	continue;
                            }
                        } catch (e) {
                            //alert(e.message);
                        }
                        
                        elemType = (elem.type);

                        if (typeof elemType == "undefined" && elem.length > 0) {
                            elemType = elem[0].type;
                        }

                        switch (elemType) {
                            //case undefined:
                            case "button":
                            case "reset":
                            case "submit":
                                break;
                            case "select-one":
                                elem.value = data[prop];
                                break;
                            case "radio":
                            case "checkbox":
                                if (data[prop] == "Y" || data[prop] === true) {
                                    elem.checked = true;
                                } else {
                                    elem.checked = false;
                                }
                                elem.value = data[prop];

                                break;
                            default:
                                if (elem.length === 2) {
                                    $("#" + elem[0].getAttribute('id')).val(data[prop]);
                                } else {
                                    if(elem.getAttribute('data-mask-type') === 'rangePoint'){
                                        $(elem).val(data[prop]).blur();
                                    } else {
                                        
                                        if( elem.getAttribute("class") === "ckeditor"){
                                            CKEDITOR.instances[elem.getAttribute("id")].setData(data[prop]);
                                        } else {
                                            $(elem).val(data[prop]);
                                        }
                                    }

                                }
                                break;
                        }
                    }
                },
                
                /**
                 * form 의 id 또는 name 추출
                 * @memberOf   ib.comm#
                 * @method     _getFormProperty
                 * @private
                 * @param      {object}     target    form id 또는 form object
                 * @returns    {string}               target에 id 
                 */
                
                _getFormProperty: function(form) {
                    var prop = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    //prop = form.attr("data-ref");

                    if (typeof prop === "undefined" || prop === "") {
                        prop = form.attr("id") || form.getAttribute("id") ;
                    }fo

                    return prop;
                },


                /**
                 * form 데이터를 json 형태로 만들어 준다.
                 * @memberOf   ib.comm#
                 * @method     _formToJson
                 * @private
                 * @param      {object}     form     form id 또는 name
                 */
                _formToJson: function(form) {
                    var res = {},
                        resVal = {},
                        allElem,
                        mcId = "",
                        strDataRef,
                        elemType = "",
                        elemId = "",
                        elemNm = "",
                        elemVal = "",
                        reqFlag = true,
                        reqTitle = "",
                        maskType = "",
                        cssClass = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    formName = form.attr("name");
                    allElem = document[formName];
                    $.each(allElem, function() {

                        elemType = $(this).attr("type");
                        elemId = $(this).attr("id");
                        elemNm = $(this).attr("name");
                        reqTitle = $(this).attr("data-req-title");
                        maskType = $(this).attr("data-mask-type");
                        cssClass = $(this).attr("class");
                        
                        
                        if ($(this).attr("data-mask-type")) {
                            elemVal = $(this).IBMaskEdit('value');
                        } else if ((this.name).indexOf("_code") > 0) {
                            mcId = this.name.replace("_code", "");

                            if ($("#" + mcId).attr("data-multicombo")) {
                                elemId = mcId;
                                elemVal = $("#" + mcId).IBMultiCombo("selectedCode");
                            }
                        } else if (cssClass === "ckeditor") {
                            elemVal = CKEDITOR.instances[elemId].getData();
                        } else {
                            elemVal = $("#" + elemId).val();
                        }

                        if( ! reqTitle ) reqTitle = elemNm;
                        switch (elemType) {
                            //case undefined:
                            case "button":
                            case "reset":
                            case "submit":
                                break;
                            case "select-one":
                                if( $("#" + elemId).prop('required')){
                                    if(elemVal == ""){
                                        cc.messageBox("COW1001" , reqTitle);
                                        this.focus();
                                        reqFlag = false;
                                        return false;
                                    } else {
                                        resVal[elemId] = elemVal;
                                    }
                                } else {
                                    resVal[elemId] = elemVal;
                                }

                                break;

                            case "radio":
                                if ($("input[id=" + elemId + "]").is(":checked") === true) {
                                    if (typeof resVal[elemNm] === "undefined") {
                                        resVal[elemNm] = [].concat([this.value]).join("|");
                                    } else {
                                        if( resVal[elemNm] === ""){
                                            resVal[elemNm]  = [].concat([this.value]).join("|");
                                        } else {
                                            resVal[elemNm] = resVal[elemNm].split("|").concat([this.value]).join("|");
                                        }
                                    }
                                } else {
                                    if (typeof resVal[elemNm] === "undefined") {
                                        resVal[elemNm] = "";
                                    }
                                }
                                break;

                            case "checkbox":
                                if ($("input[id="+elemId+"]").is(":checked") === true) {
                                    resVal[elemId] = "Y";
                                } else {
                                    resVal[elemId] = "N";
                                }

                                // if ($("input[id=" + elemId + "]").is(":checked") === true) {
                                //     if (typeof resVal[elemNm] === "undefined") {
                                //         resVal[elemNm] = [].concat([this.value]).join("|");
                                //     } else {
                                //         if( resVal[elemNm] === ""){
                                //             resVal[elemNm]  = [].concat([this.value]).join("|");
                                //         } else {
                                //             resVal[elemNm] = resVal[elemNm].split("|").concat([this.value]).join("|");
                                //         }
                                //     }
                                // } else {
                                //     if (typeof resVal[elemNm] === "undefined") {
                                //         resVal[elemNm] = "";
                                //     }
                                // }
                                break;
                            default:
                                if( $("#" + elemId).prop('required')){
                                    if( $("#" + elemId).val() == ""){
                                        cc.messageBox("COW1001" , reqTitle);
                                        this.focus();
                                        reqFlag = false;
                                        return false;
                                    } else {
                                        resVal[elemId] = elemVal;
                                    }
                                } else {
                                    if (typeof elemId !== "undefined") {
                                        resVal[elemId] = elemVal;
                                    }
                                }
                                break;
                        }
                    });

                    if(! reqFlag) return false;
                    strDataRef = cc._getFormProperty(form);
                    res[strDataRef] = resVal;

                    return res;
                },

                /**
                 * form 데이터를 json 객체로 구성하여 반환한다.
                 * @memberOf   ib.comm#
                 * @method     formToJson
                 * @public
                 * @param      {object}     form     form id 또는 name
                 */
                formToJson: function(form) {
                    var res = cc._formToJson(form);

                    return res;
                },
                
                /**
                 * IBSheet7 버전에서 제공하는 달력 팝업을 사용하기 위한 공통 함수
                 * <p>
                 * <b>반드시 IBLeaders에서 제공한 ibsheet.js 파일을 페이지 내에 include해야만 사용이 가능하다.</b> 
                 * @param startTarget 날짜 입력 대상 Object name
                 * @param sep 날짜 구분자(ex. /, -)
                 * @param endTarget  end date name
                 * @param term  end date name  month , year , day, week
                 */
                IBShowCalendar: function(target, sep, format, target2, valid) {
                	var opt ={};
                	var dateObj = target;
                	var dateObj2 = target2;
                	if(!sep) sep = "";
            		opt = {
                    		startObj : target ,
                			sep : sep
                	}

                	var val = document.getElementById(dateObj).value;
                	if(dateObj2 != undefined) {
						//날짜 validate에 사용할 변수
                		var beforeValue = document.getElementById(dateObj2).value;
					}
                	
            		
            		var formatObj = "";
            		
            		if(format == "YMD"){
            			formatObj = "yyyy"+sep+"MM"+sep+"dd"; 
            		}else if (format == "YM"){
            		 	formatObj = "yyyy"+sep+"MM"; 
            		} else {
						formatObj = "yyyy"; 
					}
            		
                    var obj = {Date:val, Format: formatObj, Buttons: 5, Buttons2: true}
                    var pos = {Tag:dateObj};
                	IBSheet.showCalendar(obj,pos,function(pickdate){
                        document.getElementById(dateObj).value = IBSheet.dateToString(pickdate,formatObj);

                        if(valid != undefined){
							var chkDate1 = new Date (document.getElementById(dateObj).value);
							var chkDate2 = new Date (document.getElementById(dateObj2).value);

							switch (valid) {
								case "FROM":
									if (chkDate2 < chkDate1) {
										document.getElementById(dateObj).value = beforeValue;
									}
									break;
								case "TO":
									if (chkDate1 < chkDate2) {
										document.getElementById(dateObj).value = beforeValue;
									}
									break;
							}

						}else if(dateObj2 != undefined){
							document.getElementById(dateObj2).value = IBSheet.dateToString(pickdate,formatObj);
						}
                    });
                },
                // ibDateCallback: function(date, opt) {
                // 	$("#"+opt.startObj).val(date);
                // },
                /**
                 * 내부함수 시트 내에서 HIDDEN컬럼과,상태컬럼,SEQ컬럼,DelCheck 컬럼을 제외한 나머지 컬럼의 SaveName을 리턴한다.
                 * @memberOf    ib.comm#
                 * @method      _makeHiddenSkipCol
                 * @public
                 * @param       {object}        sopt                      	ibsheet 객체
                 */
                _makeHiddenSkipCol:function(sobj){
                	var cols = sobj.getCols();
                	var colsArr = new Array();
                	for(var i=0;i<cols.length;i++){
                        var colName = sobj.getAttribute({col:cols[i],attr:"Name"});
                        var colVisible = sobj.getAttribute({col:cols[i],attr:"Visible"});
                		//Hidden이 아니면 넣는다.
                		if(1==colVisible && colName!="SEQ"&& colName!="CRUD"&& colName!="IS_DELETE"){
                			colsArr.push(i);
                		}
                	}
                	return colsArr.join("|");
                },
                /*
                 * 조회 종료 후 이벤트 오버라이드
                 */
                _triggerSearchEndEvent: function(grid) {
                    var id = grid.id,
                    userEvent = window[id + "_OnSearchEnd"];

                    window[id + "_OnSearchEnd"] = function(code,msg,StCode, StMsg, Response) {
                     	try{
                            /*
                             * 조회 종료 후 Footer행 추가
                             */	
                     		/*
                			var totalRows, fontColor, message, fstKeyName, sndKeyName = "";
                			var colCount = window[id].LastCol();
                			var frozenCols = window[id].GetFrozenCol();
                			var hiddenCount = 0;

                			//정상조회이면 BLACK, 아니면 RED
                			if(code == 0) fontColor = "black";
                			else fontColor = "red";
                			
                			totalRows = window[id].GetTotalRows()+"건"+" ";
                			message   = " "+msg;
                			
                			//첫번째 컬럼이 Hidden일때만 확인한다.
                			if(window[id].GetColHidden(0)){
                				for(var i=0; i<=colCount; i++){
                					console.log("hiddenCount:"+hiddenCount);
                					//첫번째 컬럼이 Hidden컬럼이 아닐때까지 확인
                					if(!window[id].GetColHidden(i)){
                						//saveName
                						//틀고정이 있으면
                						if(frozenCols > 0){
                							//console.log('FrozenCol:'+frozenCols);
                							fstKeyName = window[id].ColSaveName(i);
                							sndKeyName = window[id].ColSaveName(Number(window[id].GetFrozenCol()));
                							
                							//console.log("sndKeyName:"+sndKeyName);
                							colCount = colCount-(window[id].GetFrozenCol()-1);
                						}
                						//틀고정이 없으면
                						else{
                							console.log('FrozenCol Not Found!!');
                							fstKeyName = window[id].ColSaveName(i);
                							sndKeyName = window[id].ColSaveName(i+1);
                							
                    						colCount -= i;
                						}
                						
                						break;
                					}else{
                        				//숨김컬럼 카운트
                    					hiddenCount++;
                					}
                				}
            					
                			}else{                				
        						if(frozenCols > 0){
                    				fstKeyName = window[id].ColSaveName(0);
        							sndKeyName = window[id].ColSaveName(window[id].GetFrozenCol());
        							colCount = colCount-(window[id].GetFrozenCol()-1);
        							
    
        						} else{
                       				//saveName
                    				fstKeyName = window[id].ColSaveName(0);
                    				sndKeyName = window[id].ColSaveName(1);
        						}
                			}
                			
                			var fstOpt1 = fstKeyName + "#FontColor";
                			var fstOpt2 = fstKeyName + "#Align";
                			var sndOpt1 = sndKeyName + "#ColSpan";
                			var sndOpt2 = sndKeyName + "#FontColor";
                			var sndOpt3 = sndKeyName + "#Align";

                			var footerOptions= {}; 

                			footerOptions[fstKeyName] = totalRows
                			
                			if(frozenCols > 0){
                				footerOptions[fstKeyName+"#ColSpan"] = frozenCols-hiddenCount;				
                			}
                			
                			footerOptions[fstOpt1] = fontColor;
                			footerOptions[fstOpt2] = "Right";
                			footerOptions[sndKeyName] = message;
                			
            				footerOptions[sndOpt1] = colCount;
                			
                			footerOptions[sndOpt2] = fontColor;
                			footerOptions[sndOpt3] = "Left";

                			//json string 문자열 확인
                			//console.log(JSON.stringify(footerOptions));
                			
                			window[id].ShowFooterRow([
                				footerOptions
                			]);
                			*/
                            /*
                             * 조회 종료 후 Footer행 추가 끝
                             */		
                     		
                     		if(!cu.isEmpty(msg) && code < 0){
                     			cc.messageBox("",msg);
                     		}
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(code,msg,StCode, StMsg, Response);
                        }                        
                    }
                },
                /*
                 * 저장 종료후 이벤트 오버라이드
                 */
                _triggerSaveEndEvent: function(grid) {
                    var id = grid.id,
                    userEvent = window[id + "_OnSaveEnd"];

                    window[id + "_OnSaveEnd"] = function(code,msg,StCode, StMsg, Response) {
                     	try{
                     		
                            /*
                             * 저장 완료 후 Footer행 추가
                             */
                     		/*
                     		var totalRows, fontColor, message, fstKeyName, sndKeyName = "";
                			var colCount = window[id].LastCol();
                			var frozenCols = window[id].GetFrozenCol();
                			var hiddenCount = 0;

                			//정상조회이면 BLACK, 아니면 RED
                			if(code == 0) fontColor = "black";
                			else fontColor = "red";
                			
                			totalRows = window[id].GetTotalRows()+"건"+" ";
                			message   = " "+msg;
                			
                			//첫번째 컬럼이 Hidden일때만 확인한다.
                			if(window[id].GetColHidden(0)){
                				for(var i=0; i<=colCount; i++){
                					//console.log("hiddenCount:"+hiddenCount);
                					//첫번째 컬럼이 Hidden컬럼이 아닐때까지 확인
                					if(!window[id].GetColHidden(i)){
                						//saveName
                						//틀고정이 있으면
                						if(frozenCols > 0){
                							console.log('FrozenCol:'+frozenCols);
                							fstKeyName = window[id].ColSaveName(i);
                							sndKeyName = window[id].ColSaveName(Number(window[id].GetFrozenCol()));
                							
                							//console.log("sndKeyName:"+sndKeyName);
                							colCount = colCount-(window[id].GetFrozenCol()-1);
                						}
                						//틀고정이 없으면
                						else{
                							console.log('FrozenCol Not Found!!');
                							fstKeyName = window[id].ColSaveName(i);
                							sndKeyName = window[id].ColSaveName(i+1);
                							
                    						colCount -= i;
                						}
                						
                						break;
                					}else{
                        				//숨김컬럼 카운트
                    					hiddenCount++;
                					}
                				}
            					
                			}else{                				
        						if(frozenCols > 0){
                    				fstKeyName = window[id].ColSaveName(0);
        							sndKeyName = window[id].ColSaveName(window[id].GetFrozenCol());
        							colCount = colCount-(window[id].GetFrozenCol()-1);
        							
    
        						} else{
                       				//saveName
                    				fstKeyName = window[id].ColSaveName(0);
                    				sndKeyName = window[id].ColSaveName(1);
        						}
                			}
                			
                			var fstOpt1 = fstKeyName + "#FontColor";
                			var fstOpt2 = fstKeyName + "#Align";
                			var sndOpt1 = sndKeyName + "#ColSpan";
                			var sndOpt2 = sndKeyName + "#FontColor";
                			var sndOpt3 = sndKeyName + "#Align";

                			var footerOptions= {}; 

                			footerOptions[fstKeyName] = totalRows
                			
                			if(frozenCols > 0){
                				footerOptions[fstKeyName+"#ColSpan"] = frozenCols-hiddenCount;				
                			}
                			
                			footerOptions[fstOpt1] = fontColor;
                			footerOptions[fstOpt2] = "Right";
                			footerOptions[sndKeyName] = message;
                			
            				footerOptions[sndOpt1] = colCount;
                			
                			footerOptions[sndOpt2] = fontColor;
                			footerOptions[sndOpt3] = "Left";

                			//json string 문자열 확인
                			//console.log(JSON.stringify(footerOptions));
                			
                			window[id].ShowFooterRow([
                				footerOptions
                			]);
                			
                     		*/
                            /*
                             * 저장 완료 후 Footer행 추가 끝
                             */
                			
                     		if(!cu.isEmpty(msg)&&code<0){
                     			cc.messageBox("",msg);
                     		}
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(code,msg,StCode, StMsg, Response);
                        }                        
                    }
                },
                /*
                 * excel export 종료 이벤트
                 */
                _triggerDownFinishEvent: function(grid) {
                    var id = grid.id,
                    message = "",
                    userEvent = window[id + "_OnDownFinish"];

                    window[id + "_OnDownFinish"] = function(downloadType, result) {
                     	try{
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(downloadType, result);
                        }                        
                    }
                },
                
                /*
                 * excel import 종료 이벤트
                 */
                _triggerLoadExcelEvent: function(grid) {
                    var id = grid.id,
                    message = "",
                    userEvent = window[id + "_OnLoadExcel"];

                    window[id + "_OnLoadExcel"] = function(result, code, msg) {
                     	try{
                     		cc.hideBlockUI();
                     		grid.SetWaitImageVisible(1);
                     	}catch(e){}
                        if (typeof userEvent === "function") {
                            userEvent(result, code, msg);
                        }                        
                    }
                },
                _triggerOnLoadFileSelectEvent: function(grid) {
                    var id = grid.id,
                        message = "",
                        userEvent = window[id + "_OnLoadFileSelect"];

                    window[id + "_OnLoadFileSelect"] = function(frm, filename) {
                        cc.showBlockUI();

                        if (typeof userEvent === "function") {
                            userEvent(frm, filename);
                        }                        
                    }
                },
                _triggerOnSelectMenuEvent: function(grid) {
                    var id = grid.id,
                        message = "",
                        userEvent = window[id + "_OnSelectMenu"];
                    
                	window[id+"_OnSelectMenu"] = function(Text,Code){
                		if(Code == "ColHiddenReset"){               	    	
                	    	for(var i=0; i< window[id].S_ColHidden.length; i++){
                	    		colArr = window[id].S_ColHidden[i].Col;
                	    		//컬럼숨김정보 반영
                	    		window[id].SetColHidden(colArr, window[id].S_ColHidden[i].Hidden);
                	    	}
                		}
                		
                		cc.showBlockUI();
                		
	                    if (typeof userEvent === "function") {
	                        userEvent(Text,Code);
	                    }
                	}
                },
                _trigger_OnResizeEvent: function(grid) {
                    var id = grid.id,
                        message = "",
                        userEvent = window[id + "_OnResize"];
                    
                	window[id+"_OnResize"] = function(Width, Height){
                		
            		    //컬럼리사이징
            	    	if(window[id].S_PERSONAL_MODE){
            	    		window[id].S_PERSONAL_MODE = false;
            	    	}else{
            	    		window[id].FitColWidth();
            	    	}
                		
                		cc.showBlockUI();
                		
	                    if (typeof userEvent === "function") {
	                        userEvent(Width, Height);
	                    }
                	}
                },
				/**
				 * 마우스가 눌려졌을 때 이벤트 재정의
				 *
				 * @author HKH
				 * @param grid
				 *            {Object} IBSheet Object
				 */
                _triggerOnMouseDown: function(grid) {
                	var id = grid.id,
                	message = "",
                	userEvent = window[id + "_OnMouseDown"];

                	window[id+"_OnMouseDown"] = function(Width, Height){
                		if (window['_OPENED_CONTEXT_MENU']) { // 열려있는 context menu가 존재하면
                			$(window['_OPENED_CONTEXT_MENU']).contextMenu('close'); // context menu close
                		}

                		if (typeof userEvent === "function") {
                			userEvent(Width, Height);
                		}
                	}
                }
            };
        })().init();

        $(document).ready(function() {

        });
    })(ib);
})();