import React, {useEffect, useState} from "react";
import BasePage from "./common/BasePage";
import {createSample, removeSample} from "../reducer";
import {useDispatch} from "react-redux";
import IB_Preset from '../config/common';


export default function BmVhc() {
    /* 검색 조건, 그리드 데이터, CRUD 핸들러를 정의 */
    //searchFields: 검색 조건을 정의 (input, select, radio, popup 등)
    //gridConfig: 테이블 데이터 및 컬럼 정보 설정
    //BasePage를 사용하여 검색 바 & 데이터 테이블을 렌더링

    const dispatch = useDispatch();

    //페이지 정보
    const name = "BmVhcl";
    const title = "차량관리";
    const subTitle = "IBSheet8 은 새로운 렌더방식을 이용해, 대용량 데이터 조회/조작을 사용할 수 있습니다.";
    const menuIndex = 2;
    //api
    const retrieveUrl= "/react/bm/BmDrv/retrieve.do"
    const saveUrl = "/react/bm/BmDrv/save.do"
    // 🔹 검색 필드 정의
    const searchFields = [
        { label: "차량번호", name: "vehicleNumber", type: "input", placeholder: "차량번호 입력" },
        { label: "차량상태", name: "status", type: "select", options: [
                { label: "전체", value: "" },
                { label: "운행중", value: "active" },
                { label: "정비중", value: "maintenance" }
            ]},
        { label: "종류", name: "fuelType", type: "radio", options: [
                { label: "가솔린", value: "gasoline" },
                { label: "디젤", value: "diesel" },
                { label: "전기", value: "electric" }
            ]},
        { label: "기사", name: "owner", type: "popup", buttonLabel: "소유자 검색" }
    ];

    // 🔹 그리드 설정
    const sheetConfigs = [
        {

            options: {
            Cfg:{
                SearchMode: 0 // FastLoad
                , HeaderMerge: 3 //헤더 영역 머지 모드 선택
                , HeaderCheck: 1
                , FitWidth: true
                , InfoRowConfig: {
                    Visible: 1,
                    Space: "Top"
                }
            },
            LeftCols: [
                {Header: ["No","No"],								Name: "SEQ",					Type: "Int",				CanEdit: "0",	MinWidth: 50,	Align: "Right"}
                , {Header: ["상태","상태"],							Name: "STATUS",					Extend: IB_Preset.STATUS,	CanEdit: "0",	MinWidth: 50,	Align: "Center"}
                , {Header: [" "," "],								Name: "is_select",				Type: "Bool",				CanEdit: "1",	MinWidth: 50,	Align: "Center",	NoChanged: true,	CanSort: 0,	NoExcelDown: 1}
                , {Header: ["차량", "코드"],					    Name: "vhcl_cd",				Type: "Text",				CanEdit: "0",	MinWidth: 100,	Align: "Center",	Size: "30"}
                , {Header: ["차량", "차량번호"],					Name: "vhcl_no",				Type: "Text",				CanEdit: "1",	MinWidth: 120,	Align: "Center",	Required: 1,		Size: "50"/*ResultMask:"^([가-힣]{2}[0-9]{2}[가-힣]{1}[0-9]{4})|([0-9]{3}[가-힣]{1}[0-9]{4})$" */}
                , {Header: ["운송사","코드"],						Name: "trncmp_cd",				Type: "Text",				CanEdit: "0",	MinWidth: 100,	Align: "Center",	Size: "30"}
                , {Header: ["운송사","운송사명"],					Name: "trncmp_nm",				Type: "Text",				CanEdit: "0",	MinWidth: 100,	Align: "Left",		Button: "/images/ibsheet/popup.png",Required: 1}

            ],
            Cols: [
                {Header: ["소속센터","코드"],						Name: "center_cd",				Type: "Text",				CanEdit: "0",	MinWidth: 120,	Align: "Center"}
                , {Header: ["소속센터","센터명"],					Name: "center_nm",				Type: "Text",				CanEdit: "0",	MinWidth: 100,	Align: "Left",		Required:1,			Button: "/images/ibsheet/popup.png"}
                , {Header: ["차종","차종"],							Name: "vhcl_type_cd",			Type: "Enum",				CanEdit: "1",	MinWidth: 100,	Align: "Center"}
                , {Header: ["톤수","톤수"],							Name: "ton_cd",					Type: "Enum",				CanEdit: "1",	MinWidth: 100,	Align: "Center"}
                , {Header: ["차량계약구분", "차량계약구분"], 		Name: "vhcl_cont_cd",			Type: "Enum",				CanEdit: "1",	MinWidth: 120,	Align: "Center",	Required: 1}
                , {Header: ["품목온도구분","품목온도구분"],			Name: "vhcl_temp_cd",			Type: "Enum",				CanEdit: "1",	MinWidth: 120,	Align: "Center"}
                , {Header: ["최대적재기준","박스"],					Name: "max_load_box",			Type: "Int",				CanEdit: "1",	MinWidth: 80,	Align: "Right",		Size: "10"}
                , {Header: ["최대적재기준","부피(CBM)"],			Name: "max_load_cbm",			Type: "Float",				CanEdit: "1",	MinWidth: 80,	Align: "Right",		Size: "10",		Format:"#,##0.00"}
                , {Header: ["최대적재기준","중량(kg)"],				Name: "max_load_wgt",			Type: "Int",				CanEdit: "1",	MinWidth: 80,	Align: "Right",		Size: "10"}
                , {Header: ["최대적재기준","금액"],					Name: "max_load_amt",			Type: "Int",				CanEdit: "1",	MinWidth: 80,	Align: "Right",		Size: "10"}
                , {Header: ["기사","코드"],							Name: "drv_cd",					Type: "Text",				CanEdit: "0",	MinWidth: 100,	Align: "Center"}
                /*엑셀 다운로드용 : _plain*/
                , {Header: ["기사","기사명"],						Name: "drv_nm",				Type: "Text",				CanEdit: "1",	MinWidth: 100,	Align: "Center",		ShowHint: 3,	Button: "/images/ibsheet/popup.png"}
                , {Header: ["기사","기사명_원본"],					Name: "drv_nm_plain",			Type: "Text",				CanEdit: "0",	MinWidth: 100,	Align: "Center",		Visible: 0,		NoPersonalize: 1}

                , {Header: ["기사","연락처"],						Name: "drv_tel_no",				Type: "Text",				CanEdit: "0",	MinWidth: 120,	Align: "Center",	ShowHint: 3,	Size: "11"}
                , {Header: ["기사","연락처_원본"],					Name: "drv_tel_no_plain",		Type: "Text",				CanEdit: "0",	MinWidth: 120,	Align: "Center",	Visible: 0,		NoPersonalize: 1}
                , {Header: ["비고","비고"],							Name: "rm",						Type: "Text",				CanEdit: "1",	MinWidth: 100,	Align: "Left",		Size: "100"}
                , {Header: ["사용","사용"],							Name: "use_yn",					Type: "Bool",				CanEdit: "1",	MinWidth: 80,	Align: "Center",	TrueValue: "Y",	FalseValue: "N"}
                , {Header: ["삭제여부","삭제여부"],					Name: "del_yn",					Type: "Bool",				CanEdit: "0",	MinWidth: 80,	Align: "Center"	,	TrueValue: "Y",	FalseValue: "N"}
                , {Header: ["수정자","수정자"],						Name: "upd_nm",					Type: "Text",				CanEdit: "0",	MinWidth: 80,	Align: "Center"}
                , {Header: ["수정일시","수정일시"],					Name: "upd_dtm",				Extend: IB_Preset.YMDHMS,	CanEdit: "0",	MinWidth: 150,	Align: "Center"}
                , {Header: ["등록자","등록자"],						Name: "reg_nm",					Type: "Text",				CanEdit: "0",	MinWidth: 80,	Align: "Center"}
                , {Header: ["등록일시","등록일시"],					Name: "reg_dtm",				Extend: IB_Preset.YMDHMS,	CanEdit: "0",	MinWidth: 150,	Align: "Center"}
            ] ,
            Events: {}

            }
        }
    ];
    const optionsArray = sheetConfigs.map((config, index) => ({
        id: `IBSHEET0${index + 1}`,  // IBSHEET01, IBSHEET02, IBSHEET03 ... 형태
        el: `ibsheet0${index + 1}_div`,  // ibsheet01_div, ibsheet02_div ...
        options: config.options,
        data: []
    }));
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
