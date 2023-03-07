import axios from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:8080", // 기본 서버 주소 입력
    withCredentials: true,
    headers: {
           Authorization: localStorage.getItem('token'),
        }
});

Api.defaults.withCredentials = true;

Api.interceptors.response.use((config) => {
    console.log("[ Axios - interceptors 실행]");
    console.log(config);

}, (error) => {
    console.log("[ Axios - error interceptors 실행 ]");
    console.log(error);
        if(error.status === 406) {
        console.log("[ACCESS 토큰 만료]=========")
        }
})
