import React, {useEffect, useRef, useState} from "react";
import {ReactTabulator} from "react-tabulator";

import styles from "./DataTable.module.css"
import loader from "@ibsheet/loader";

export default function DataTable({ title, options, data }) {
    //console.log("📌 DataTable columns:", columns);
    //console.log("📌 DataTable data:", data);

    let sheetId = "";
    const sheetEl = 'sheetContainer';

//    const { data, options } = SheetSampleData[0]; // ✅ IBSheet 데이터 및 옵션 설정

    useEffect(() => {
       // const { data, options } = SheetSampleData[0]; // 시트 정보
        loader.createSheet({
            el: sheetEl,
            options,
            data
        }).then(sheet => {
            // 주의사항: 해당 구간에서 데이터 조회를 하면 안됩니다.
            sheetId = sheet.id;
            console.log('created sheet', sheetId);
        });
        return () => {
            loader.removeSheet(sheetId);
        };
    }, []);

    return (
        <>
            <div className={styles.gridTitle}>
                {title}
            </div>

            <div className={styles.dataGrid}>
                {/*    <ReactTabulator
                    columns={columns}
                    data={data}
                    layout="fitColumns"
                    options={{
                        movableColumns: true,
                        pagination: false
                    }}
                    tableRef={tableRef}  // ✅ tableRef 속성 사용!
                />*/}
                {/* ✅ IBSheet를 렌더링할 컨테이너 */}
                <div id={sheetEl}></div>
            </div>
        </>
    );
}