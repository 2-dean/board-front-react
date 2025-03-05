import BasePage from "./common/BasePage";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { createSample, removeSample } from '../reducer';
import IB_Preset from '../config/common';


export default function BmDrv() {
    const dispatch = useDispatch();

    //페이지 정보
    const name = "BmDrv";
    const title = "기사관리";
    const subTitle = "IBSheet8 은 새로운 렌더방식을 이용해, 대용량 데이터 조회/조작을 사용할 수 있습니다.";
    const menuIndex = 4;

    //api
    const retrieveUrl= "/react/bm/BmDrv/retrieve.do"
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
            id: "sheet1",
            el: "sheetDiv1",
            options: {
                Def: {
                    Col: { RelWidth: 1 }
                },
                Cfg: {
                    SearchMode: 0,
                    HeaderMerge: 1,
                    HeaderCheck: 1,
                    FitWidth: true,
                    ShowFilter: true,
                    InfoRowConfig: {
                        Visible: 1
                    }
                },
                LeftCols: [
                    { Header: "No", Name: "SEQ", Type: "Int", CanEdit: "0", MinWidth: 50, Align: "Right" },
                    { Header: "상태", Name: "STATUS", Extend: IB_Preset.STATUS, CanEdit: "0", MinWidth: 50, Align: "Center", NoExcelDown: 1 }
                ],
                Cols: [
                    {Header: "기사연락처",		Name: "drv_tel_no",				Type: "Text",				CanEdit: "1",	MinWidth: 120,	Align: "Center",	Required: 1,	Size: "11",		EditMask: "^\\d{0,11}$"	, ShowHint: 3, NoExcelDown: 1, }
                    /*엑셀다운로드용*/
                    , {Header: "기사연락처",		Name: "drv_tel_no_plain",		Type: "Text",				CanEdit: "0",	MinWidth: 120,	Align: "Center",	Visible: 0,		NoPersonalize: 1}
                    , {Header: "입사일",			Name: "join_date",				Extend: IB_Preset.YMD,		CanEdit: "1",	MinWidth: 120,	Align: "Center",	EditMask: "^\\d{0,8}$"}
                    , {Header: "비고",			Name: "rm",						Type: "Text",				CanEdit: "1",	MinWidth: 120,	Align: "Left",		Size: "200"}
                    , {Header: "사용",			Name: "use_yn",					Type: "Bool",				CanEdit: "1",	MinWidth: 80,	Align: "Center",	TrueValue: "Y",	FalseValue: "N"}
                    , {Header: "삭제",			Name: "del_yn",					Type: "Bool",				CanEdit: "0",	MinWidth: 80,	Align: "Center",	TrueValue: "Y",	FalseValue: "N"}
                    , {Header: "수정자",			Name: "upd_nm",					Type: "Text",				CanEdit: "0",	MinWidth: 80,	Align: "Center"}
                    , {Header: "수정일시",			Name: "upd_dtm",				Extend: IB_Preset.YMDHMS,	CanEdit: "0",	MinWidth: 150,	Align: "Center"}
                    , {Header: "등록자",			Name: "reg_nm",					Type: "Text",				CanEdit: "0",	MinWidth: 80,	Align: "Center"}
                    , {Header: "등록일시",			Name: "reg_dtm",				Extend: IB_Preset.YMDHMS,	CanEdit: "0",	MinWidth: 150,	Align: "Center"}
                    // Visible: 0
                    , {Header: '회사코드',			Name: "comp_cd",				Type: "Text",				CanEdit: "0",	MinWidth: 80,	Align: "Left",		Visible: 0,		NoPersonalize:1,	NoExcelDown: 1}
                    , {Header: "변경전 기사연락처",	Name: "org_tel_no",				Type: "Text",				CanEdit: "0",	MinWidth: 120,	Align: "Center",	Visible: 0,		NoPersonalize:1,	NoExcelDown: 1}
                ],
                Events: {}
            },
            data: []
        },
        /*
        {
            id: "sheet2",
            el: "sheetDiv2",
            options: {
                Cfg: {
                    SearchMode: 0,
                    CustomScroll: 1,
                    Style: "IBMR",
                    IgnoreFocused: true
                },
                Cols: [
                    { Header: "도서관명", Type: "Text", Name: "sName", Required: 1, MinWidth: 150 },
                    { Header: "도서관유형", Type: "Enum", Name: "sType", MinWidth: 100, CanEdit: 1, Enum: "|공공도서관|작은도서관", EnumKeys: "|1|2" }
                ],
                Events: {}
            },
            data: []
        }
        */
    ];

    const optionsArray = sheetConfigs.map((config, index) => ({
        id: `IBSHEET0${index + 1}`,  // IBSHEET01, IBSHEET02, IBSHEET03 ... 형태
        el: `ibsheet0${index + 1}_div`,  // ibsheet01_div, ibsheet02_div ...
        options: config.options,
        data: []
    }));

    console.log(optionsArray);

    useEffect(() => {
        //console.log("[BmDrv] 마운트")
        // 그리드 여러개 만들경우 . . .
        optionsArray.forEach(options => {
            dispatch(createSample(name, title, subTitle, options, menuIndex));
        });
        return () => {
            dispatch(removeSample());
            //console.log("[BmDrv] 언마운트")
        }
    }, []);



    return (
        <>
            <BasePage searchFields={searchFields}
                      retrieveUrl={retrieveUrl}
                      saveUrl={saveUrl}
            />
        </>
    );
}
