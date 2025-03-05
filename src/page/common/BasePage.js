import React, {useEffect, useState} from "react";

import styles from "./BasePage.module.css";

import SearchBar from "../../components/common/SearchBar";
import FontSizeSelector from "../../components/common/FontSizeSelector";
import CommonButtons from "../../components/common/CommonButtons";
import IBSheet8 from "../../components/ibhseet/SheetCreate";

import {useSelector} from "react-redux";
import {gridApi} from "../../api/gridApi";


export default function BasePage({searchFields, layoutType, retrieveUrl, saveUrl}) {
    //console.log("=====================[BASE PAGE]=====================")
    const title = useSelector((state) => state.title);
    const subTitle = useSelector((state) => state.subTitle);
    const name = useSelector((state) => state.name);
    const sheet = useSelector((state) => state.sheet);
    //console.log("=====================================================")

    const [values, setValues] = useState({}); // 🔍 검색 조건 상태
    //const [gridData, setGridData] = useState([]); // 그리드에 넣을 데이터
    const handleSearch = async () => {
        try {
            // ✅ API 데이터 가져오기
            const responseData = await gridApi(retrieveUrl, values);
            //console.log("API 응답 데이터:", responseData.IBSHEET01.Data);

            const processedData = Array.isArray(responseData.IBSHEET01?.Data) ? responseData.IBSHEET01.Data : [];

            // ✅ 상태 업데이트 (데이터 저장)
            //setGridData(processedData);
            sheet[sheet.length - 1].loadSearchData(processedData)
        } catch (error) {
            //console.error("데이터 불러오기 오류:", error);
        }
    };

    // ✅ 초기화 버튼 클릭 핸들러
    const handleReset = () => {
        //시트, 검색조건 초기화
    };

    // ✅ 저장 버튼 클릭 핸들러
    const handleSave = () => {};


    return (
        <div>
            {/* ✅ 타이틀 + 버튼 그룹 */}
            <div className={styles.titleBar}>
                <div className={styles.titleText}>{title}</div>
                {/* 공용 버튼 그룹 (글꼴 크기, 검색, 저장 등) */}
                <div className={styles.buttonGroup}>
                    <FontSizeSelector />
                    {/* ✅ 버튼 이벤트 핸들러 전달 */}
                    <CommonButtons
                        onSearch={handleSearch}
                        onReset={handleReset}
                        onSave={handleSave}
                    />
                </div>
            </div>


            {/* ✅ 검색 바 */}
            <div className={styles.searchBar}>
                {searchFields.length > 0 && <SearchBar fields={searchFields} values={values} setValues={setValues} />}
            </div>
            {/* ✅  IBSheet8 렌더링 */}
            <div className={`${styles.gridContainer} ${styles[`layout-${layoutType}`]}`}>
                {sheet && <IBSheet8 />}
            </div>
        </div>
    );
}
