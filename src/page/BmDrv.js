import BasePage from "./common/BasePage";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { createSample, removeSample } from '../reducer';
import IB_Preset from '../config/common';
import xgrid from "../config/xgrid"

export default function BmDrv() {
    const dispatch = useDispatch();
    // 객체배열
    var objSheetArray = [];

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
                        Visible: 1,
                        Layout: xgrid.getSheetLayout({
                            COUNT: { Visible: 1 },
                            SAPPEND: { Visible: 1, Callback: { Method: "doCallbackAddLine" } },
                            REMOVE: { Visible: 1 },
                            DOWNLOAD: { Visible: 0, HiddenCol: 1 },
                            UPLOAD: { Visible: 0, Uri: "/task/bm/BmDrv/retrieve.do" },
                            FILTER: { Visible: 1 },
                            PERSONALIZE: { Visible: 1 }
                        }),
                        Space: "Top"
                    }
                },
                LeftCols: [
                    { Header: "No", Name: "SEQ", Type: "Int", CanEdit: "0", MinWidth: 50, Align: "Right" },
                    { Header: "상태", Name: "STATUS", Extend: IB_Preset.STATUS, CanEdit: "0", MinWidth: 50, Align: "Center", NoExcelDown: 1 }
                ],
                Cols: [
                    { Header: "기사연락처", Name: "drv_tel_no", Type: "Text", CanEdit: "1", MinWidth: 120, Align: "Center", Required: 1, Size: "11", EditMask: "^\\d{0,11}$", ShowHint: 3, NoExcelDown: 1 }
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
