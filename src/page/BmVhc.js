import React from "react";
import BasePage from "./common/BasePage";
import Grid from "../components/common/Grid";

export default function BmVhc() {
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "차량명", accessor: "name" },
        { header: "타입", accessor: "type" },
    ];

    const data = [
        { id: 1, name: "소나타", type: "세단" },
        { id: 2, name: "싼타페", type: "SUV" },
        { id: 3, name: "모닝", type: "경차" },
    ];
    // ✅ BasePage에 gridConfig 전달
    const gridConfig = [{ columns, data }];

    const searchFields = [
        { label: "차량명", name: "name", type: "input", placeholder: "차량명을 입력하세요" },
        {
            label: "타입",
            name: "type",
            type: "select",
            options: [
                { label: "전체", value: "" },  // ✅ 선택 안 함 옵션 추가
                { label: "세단", value: "세단" },
                { label: "SUV", value: "SUV" },
                { label: "경차", value: "경차" }
            ]
        },
    ];
    return (
        <BasePage title="차량 관리" searchFields={searchFields} gridConfig={gridConfig}>
            <div className="p-4">
                <h2 className="text-lg font-bold">차량 목록</h2>
                <Grid key={"test"} columns={columns} data={data} />
            </div>
        </BasePage>
    );
}
