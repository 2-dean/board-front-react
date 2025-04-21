import BasePage from "./common/BasePage";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { createSample, removeSample } from '../reducer';
import IB_Preset from '../config/common';

/**

 */
export default function EmScreenAuth () {
    const dispatch = useDispatch();
    // 객체배열
    //var objSheetArray = [];
    var whereRetrieve = 0;
    var f_user_id = null;
    var f_auth_cd = null;
    var f_user_nm = null;
    var focusRetrieve = true;
    //페이지 정보
    const name = "EmScreenAuth";
    const title = "메뉴권한";
    const subTitle = "IBSheet8 은 새로운 렌더방식을 이용해, 대용량 데이터 조회/조작을 사용할 수 있습니다.";
    const menuIndex = 1;
    //api
    const retrieveUrl= "/react/bm/BmDrv/EmScreenAuthRetrieve.do"
    const saveUrl = "/react/bm/BmDrv/save.do"

    //검색조건 필드
    const searchFields = [
        { label: "기사", name: "drv_nm", type: "input", placeholder: "" }
        , { label: "사용", name: "use_yn", type: "radio", options: [
                { label: "전체", value: "" },
                { label: "Y", value: "Y", default: true}, //기본체크값
                { label: "N", value: "N" }
            ]
        }
        , { label: "삭제", name: "del_yn", type: "radio", options: [
                { label: "전체", value: "" },
                { label: "Y", value: "Y" },
                { label: "N", value: "N", default: true}
            ]
        }
    ];


    // 시트 옵션 설정
    const sheetConfigs = [
        {
        // 기본 기능 설정
            id: "sheet1",
            el: "sheetDiv1",
            options: {
                Cfg: {
                    SearchMode: 0 // FastLoad
                    , HeaderMerge: 1 //헤더 영역 머지 모드 선택
                    , HeaderCheck: 1
                    , FitWidth: true
                    //, ShowFilter: true
                    , InfoRowConfig: {
                        Visible: 1,
                        Space: "Top"
                    }
                },
                //왼쪽 No 컬럼
                LeftCols: [
                    {Header: 'No', Name: "SEQ", CanEdit: "0", Type: "Int", MinWidth: 50, Align: "Right"}
                    , { Header: '상태', Name: "STATUS",CanEdit: "0",Extend: IB_Preset.STATUS, MinWidth: 50,Align: "Center", Visible: 0}
                    , { Header: ' ',Name: "is_select", CanEdit: "1",Type: "Bool",MinWidth: 60, Align: "Center", Visible: 0, NoChanged: true,CanSort: 0, NoExcelDown: 1}
                ],
                Cols: [
                    {Header: "권한그룹", Name: "auth_cd", CanEdit: "0", Type: "Text", MinWidth: 100, Align: "Center"}
                    , {Header: "권한명", Name: "auth_nm", CanEdit: "0", Type: "Text", MinWidth: 100, Align: "Left"}
                    //, {Header: "권한유형",		Name: "auth_ty_cd",		CanEdit:"0",	Type: "Enum",				MinWidth: 80,	Align: "Center",	Visible: 1}
                    , {
                        Header: "요금제 유형",
                        Name: "rp_cd",
                        CanEdit: "0",
                        Type: "Text",
                        MinWidth: 80,
                        Align: "Center",
                        Visible: 0
                    }
                    , {Header: "수정자", Name: "upd_nm", CanEdit: "0", Type: "Text", MinWidth: 80, Align: "Center"}
                    , {
                        Header: "수정일시",
                        Name: "upd_dtm",
                        CanEdit: "0",
                        Extend: IB_Preset.YMDHMS,
                        MinWidth: 150,
                        Align: "Center"
                    }
                    , {Header: "등록자", Name: "reg_nm", CanEdit: "0", Type: "Text", MinWidth: 80, Align: "Center"}
                    , {
                        Header: "등록일시",
                        Name: "reg_dtm",
                        CanEdit: "0",
                        Extend: IB_Preset.YMDHMS,
                        MinWidth: 150,
                        Align: "Center"
                    }
                ],
                Events: {
                   /* onBeforeFocus:function (evtParam) {
                        return onBeforeFocus_IBSHEET01(evtParam);
                    },
                    onDataLoad:function(evtParam){
                        onDataLoad_IBSHEET01(evtParam);
                    },

                    */
                    onFocus : function(evtParam){
                        onFocus_IBSHEET01(evtParam);
                    },
                    /*
                    onSearchFinish: function(evtParam){

                    onSearchFinish_IBSHEET01(evtParam);
                    },
                    onAfterSave: function(evtParam){
                        onAfterSave_IBSHEET01(evtParam);
                    },

                    onShowHint: function(evtParam) {
                        switch(evtParam.col){
                            case "user_nm":
                                return evtParam.row.user_nm;
                            default:
                                break;
                        }
                    }

                     */
                }
            },
            data: []
        },
        {
            // 기본 기능 설정
            id: "sheet2",
            el: "sheetDiv2",
            options: {
                Cfg: {
                    SearchMode: 0 // FastLoad
                    , HeaderMerge: 1 //헤더 영역 머지 모드 선택
                    , HeaderCheck: 1
                    , FitWidth: true
                    //, ShowFilter: true
                    , HeaderSortMode: 1
                    , MainCol: "menu_nm"
                    , IgnoreFocused: true
                    , InfoRowConfig: {
                        Visible: 1,
                        Layout: {},
                        Space: "Top"
                    },
                },
                    Def:{
                        Row:{
                            CalcOrder: 'STATUS,r_auth_ynCanEdit,u_auth_ynCanEdit, STATUS,ed_auth_ynCanEdit,eu_auth_ynCanEdit'
                        }
                    } ,
                    //왼쪽 No 컬럼
                    LeftCols: [
                        {Header: 'No',			Name: "SEQ",		CanEdit: "0",	Type: "Int",				MinWidth: 50,	Align: "Right"}
                        , {Header: '상태',			Name: "STATUS",		CanEdit: "0",	Extend: IB_Preset.STATUS,	MinWidth: 50,	Align: "Center"}
                        , {Header: '',				Name: "is_select",	CanEdit: "1",	Type: "Bool",				MinWidth: 60,	Align: "Center",	Visible: 0,	NoChanged: true,	CanSort: 0,	NoExcelDown: 1}
                    ],
                    Cols: [
                        {Header: '메뉴코드',			Name: "menu_cd",	CanEdit:"0",	Type: "Text",				MinWidth: 100,	Align: "Center",        Visible: 0}
                        , {Header: "메뉴명",			Name: "menu_nm",	CanEdit:"0",	Type: "Text",				MinWidth: 240,	Align: "Center"}
                        , {Header: "권한그룹",			Name: "auth_cd",	CanEdit:"0",	Type: "Text",				MinWidth: 100,	Align: "Center",	Visible: 0}
                        , {Header: "관리자(히든)",		Name: "admin_yn",	CanEdit:"0",	Type: "Bool",				MinWidth: 70,	Align: "Center",	Visible: 0,	TrueValue: "Y",	FalseValue: "N"}
                        , {Header: "트리레벨",			Name: "menu_lvl",	CanEdit:"0",	Type: "Text",				MinWidth: 50,	Align: "Center",	Visible: 0}
                        , {Header: "대분류",			Name: "category",	CanEdit:"0",	Type: "Text",				MinWidth: 50,	Align: "Center",    Visible: 0}
                        , {Header: "메뉴ID",			Name: "menu_id",	CanEdit:"0",	Type: "Text",				MinWidth: 70,	Align: "Center",	Visible: 0}
                        , {Header: "조회",			    Name: "r_auth_yn",	CanEdit:"1",	Type: "Bool",				MinWidth: 70,	Align: "Center",	TrueValue: "Y",	FalseValue: "N",	CanEditFormula:"Row.admin_yn==1?0:1"}
                        , {Header: "수정",			    Name: "u_auth_yn",	CanEdit:"1",	Type: "Bool",				MinWidth: 70,	Align: "Center",	TrueValue: "Y",	FalseValue: "N",	CanEditFormula:"Row.admin_yn==1?0:1"}
                        , {Header: "엑셀다운로드",		Name: "ed_auth_yn",	CanEdit:"1",	Type: "Bool",				MinWidth: 70,	Align: "Center",	TrueValue: "Y",	FalseValue: "N",	CanEditFormula:"Row.admin_yn==1?0:1"}
                        , {Header: "엑셀업로드",		Name: "eu_auth_yn",	CanEdit:"1",	Type: "Bool",				MinWidth: 70,	Align: "Center",	TrueValue: "Y",	FalseValue: "N",	CanEditFormula:"Row.admin_yn==1?0:1"}
                        , {Header: "수정자",			Name: "upd_nm",		CanEdit:"0",	Type: "Text",				MinWidth: 80,	Align: "Center"}
                        , {Header: "수정일시",			Name: "upd_dtm",	CanEdit:"0",	Extend: IB_Preset.YMDHMS,	MinWidth: 150,	Align: "Center"}
                        , {Header: "등록자",			Name: "reg_nm",		CanEdit:"0",	Type: "Text",				MinWidth: 80,	Align: "Center"}
                        , {Header: "등록일시",			Name: "reg_dtm",	CanEdit:"0",	Extend: IB_Preset.YMDHMS,	MinWidth: 150,	Align: "Center"}
                    ] ,
                    Events: {}

            },
            data: []
        }

    ];

    // 시트객체 만들기(?)
    const optionsArray = sheetConfigs.map((config, index) => ({
        id: `IBSHEET0${index + 1}`,  // IBSHEET01, IBSHEET02, IBSHEET03 ... 형태
        el: `ibsheet0${index + 1}_div`,  // ibsheet01_div, ibsheet02_div ...
        options: config.options,
        data: []
    }));

    console.log("EMsCREENqUTH optionsArray : " );
    console.log(optionsArray);
    useEffect(() => {
        //console.log("[BmDrv] 마운트")
        // 그리드 여러개
        optionsArray.forEach(options => {
            dispatch(createSample(name, title, subTitle, options, menuIndex));
        });
        return () => {
            dispatch(removeSample());
            //console.log("[BmDrv] 언마운트")
        }
    }, []);

    //ibsheet 함수
    function onFocus_IBSHEET01(evtParam) {
        if (evtParam.row !== evtParam.orow && evtParam.sheet.getRowKind(evtParam.row) == 'Data' && focusRetrieve == true) {
            switch(whereRetrieve) {
                case 2:
                    doRetrieve_IBSHEET02(evtParam.row);
              //  case 3:
                //    doRetrieve_IBSHEET03(evtParam.row);
                //case 4:
                  //  doRetrieve_IBSHEET04(evtParam.row);

            }
        }
    }

    function doRetrieve_IBSHEET02(row){
        console.log(row)

     /*   f_user_id = IBSHEET01.getValue(row, "user_id");
        f_auth_cd = IBSHEET01.getValue(row, "auth_cd");
        f_user_nm = IBSHEET01.getValue(row, "user_nm");
        //데이터 조회 화면


        ib.comm.search({
            url: '/task/em/EmAuthMan/Detail/retrieve.do'
            , subparam: xgrid.doFormQueryStringEnc(document.form_filter)+"&user_id="+f_user_id+"&auth_cd="+f_auth_cd+"&whereRetrieve="+whereRetrieve
            , sheet:[IBSHEET02]
            , mapping:{IBSHEET02:"IBSHEET02"}
        });

      */
    }


    return (
        <>
            <BasePage searchFields={searchFields}
                      retrieveUrl={retrieveUrl}
                      saveUrl={saveUrl}
                      layoutType={`layout-2`}
            />
        </>
    );
}