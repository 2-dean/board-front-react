import React from "react";
import SearchBar from "../../components/common/SearchForm";
import Grid from "../../components/common/Grid";

/**
 *
 *
 * @param title
 * @param searchFields
 * @param gridConfig
 * @returns {JSX.Element}
 * @constructor
 *
 *  추천하는 구조 개선 방향
 * 페이지 레이아웃을 위한 BasePage.js 컴포넌트 추가
 *
 * 각 페이지에서 중복되는 검색 + 그리드 UI를 하나의 공통 컴포넌트로 분리
 * 페이지에서 props로 검색 필터 & 그리드 설정만 넘기도록 개선
 * 각 페이지는 BasePage를 확장하여 사용
 *
 * 개별적인 ***Page.js는 BasePage를 재사용하면서 특정 API 호출 로직만 정의
 */
export default function BasePage({ title, searchFields, gridConfig }) {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{title}</h1>
            <SearchBar fields={searchFields} />
            <div className="mt-4">
                {gridConfig.map((grid, index) => (
                    <Grid key={index} columns={grid.columns} data={grid.data} />
                ))}
            </div>
        </div>
    );
}
