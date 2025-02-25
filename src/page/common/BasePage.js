import React from "react";

import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import "tabulator-tables/dist/css/tabulator.min.css";
import styles from "./BasePage.module.css";

export default function BasePage({ title, searchFields, gridConfig, layoutType }) {
    return (
        <div>
            <h1>{title}</h1>
            {/* ✅ 검색 바 */}
            {searchFields.length > 0 && <SearchBar fields={searchFields}/>}

            {/* ✅ 데이터 테이블 */}
            <div className={`${styles.gridContainer} ${styles[`layout-${layoutType}`]}`}>
                조회결과
                {gridConfig.length > 0 ? (
                    gridConfig.map((grid, index) => (
                        <DataTable key={index} columns={grid.columns} data={grid.data}/>
                    ))
                ) : (
                    <p>표시할 데이터가 없습니다.</p>
                )}
            </div>
        </div>
    );
}
