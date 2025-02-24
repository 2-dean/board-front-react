import React, {useEffect, useState} from "react";
import SearchBar from "../../components/common/SearchForm";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";

export default function BasePage({ title, searchFields, gridConfig }) {
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);

    // 🔹 columns 구조를 Tabulator 형식으로 변환하는 함수
    const convertColumns = (columns) => {
        return columns.map((col) => ({
            title: col.header, // ✅ "header" → "title"
            field: col.accessor, // ✅ "accessor" → "field"
        }));
    };

    // 🔹 useEffect로 데이터 로드
    useEffect(() => {
        if (gridConfig.length > 0) {
            console.log("데이터 로드됨:", gridConfig[0].data);
            setTableData(gridConfig[0].data);
            setTableColumns(convertColumns(gridConfig[0].columns)); // ✅ 컬럼 변환 적용
        }
    }, [gridConfig]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{title}</h1>

            {/* ✅ 검색 바 렌더링 */}
            {searchFields.length > 0 && (
                <SearchBar
                    fields={searchFields}
                    values={{}} // 기본값 (실제 검색 값 필요하면 변경)
                    onChange={() => {}} // 검색 값 변경 로직 필요
                    onSearch={() => {}} // 검색 기능 추가 필요
                />
            )}

            {/* ✅ Tabulator 적용 */}
            <div className="mt-4">
                {gridConfig.length > 0 ? (
                    gridConfig.map((grid, index) => (
                        <ReactTabulator
                            key={index}
                            columns={tableColumns} // ✅ 변환된 컬럼 적용
                            data={tableData} // ✅ useState에서 관리하는 데이터 적용
                            layout="fitColumns"
                            groupBy={grid.groupBy || null}
                            options={{
                                pagination: grid.pagination || false,
                                movableColumns: true,
                            }}
                        />
                    ))
                ) : (
                    <p>표시할 데이터가 없습니다.</p> // ✅ 데이터가 없을 때 예외 처리
                )}
            </div>
        </div>
    );
}
