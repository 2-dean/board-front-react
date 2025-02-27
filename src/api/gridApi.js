/* 그리드 조회용 공통 api 가 될 예정 */

import { Api } from "./axiosProvider";

/** 차량 목록 조회 API */
export function gridApi(url, params = {}) { // *params = {} : params가 전달되지 않음 (기본값 {} 사용)
    return Api.get(url, { params })
        .then((response) => {
            console.log("API 응답:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("[API ERROR]", error);
            throw error;
        });
}