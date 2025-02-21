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

    return (
        <BasePage title="차량 관리">
            <div className="p-4">
                <h2 className="text-lg font-bold">차량 목록</h2>
                <Grid columns={columns} data={data} />
            </div>
        </BasePage>
    );
}
