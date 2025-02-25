import React, {useState} from "react";
import BasePage from "./common/BasePage";

export default function BmVhc() {
    /* 검색 조건, 그리드 데이터, CRUD 핸들러를 정의 */
    //searchFields: 검색 조건을 정의 (input, select, radio, popup 등)
    //gridConfig: 테이블 데이터 및 컬럼 정보 설정
    //BasePage를 사용하여 검색 바 & 데이터 테이블을 렌더링
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
    const gridConfig = [
        {
            columns: [
                { header: "차량번호", accessor: "vehicleNumber" },
                { header: "차량 상태", accessor: "status" },
                { header: "연료 종류", accessor: "fuelType" }
            ],
            data: [
                { vehicleNumber: "123가4567", status: "운행중", fuelType: "가솔린" },
                { vehicleNumber: "456나7890", status: "정비중", fuelType: "디젤" }
            ],
            pagination: true
        },
        {
            columns: [
                { header: "감자", accessor: "vehicleNumber" },
                { header: "고구마", accessor: "status" },
                { header: "대파", accessor: "fuelType" }
            ],
            data: [
                { vehicleNumber: "123가4567", status: "운행중", fuelType: "가솔린" },
                { vehicleNumber: "456나7890", status: "정비중", fuelType: "디젤" }
            ],
            pagination: true
        }
    ];

    return (
        <BasePage title="차량 관리" searchFields={searchFields} gridConfig={gridConfig} layoutType="2" />
    );
}
