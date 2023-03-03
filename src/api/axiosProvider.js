import axios from "axios";
import {refresh} from "./Refresh";

export const Api = axios.create({
    baseURL: "http://localhost:8080", // 기본 서버 주소 입력
    withCredentials: true,
    headers: {
           Authorization: localStorage.getItem('token'),
        }
});

Api.interceptors.request.use(refresh);

