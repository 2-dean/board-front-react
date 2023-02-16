import axios from "axios";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const getCookie = (name: String) => {
    return cookies.get(name);
}

export const customAxios: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080", // 기본 서버 주소 입력
    withCredentials: true,

});
