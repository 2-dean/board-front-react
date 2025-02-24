import React from "react";
import BasePage from "./common/BasePage";
import Grid from "../components/common/Grid";

export default function BmDrv() {
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "이름", accessor: "name" },
        { header: "나이", accessor: "age" },
    ];

    const data = [
        { id: 1, name: "신짱구", age: "5살" },
        { id: 2, name: "김철수", age: "5살" },
        { id: 3, name: "유리", age: "5살" },
    ];
    // ✅ BasePage에 gridConfig 전달
    const gridConfig = [{ columns, data }];

    const searchFields = [
        { label: "이름", name: "name", type: "input", placeholder: "이름 입력하세요" },
 
    ];
    return (
        <BasePage title="기사관리" searchFields={searchFields} gridConfig={gridConfig}>
            <div className="p-4">
                <h2 className="text-lg font-bold">잉?</h2>
                <Grid key={"test"} columns={columns} data={data} />
            </div>
        </BasePage>
    );
}
