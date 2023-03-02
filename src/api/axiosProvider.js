import axios from "axios";
import {getCookie} from "../common/getAccessToken";
import {useRecoilState} from "recoil";
import {userState} from "../store/Atom";

export const Api = axios.create({
    baseURL: "http://localhost:8080", // 기본 서버 주소 입력
    withCredentials: true,
    headers: {
           Authorization: localStorage.getItem('token'),
        }
});


Api.interceptors.request.use(
    function (response) {
        return response;
    },
    async function (err) {
        const [loginUser, setLoginUser] = useRecoilState(userState);
        const originalConfig = err.config;

        if (err.response && err.response.status === 401) {
            //const refreshToken = originalConfig.headers["Authorization"];
            const refreshToken = getCookie("refreshToken");

            try {
                const data = await axios({
                    baseURL: "http://localhost:8080",
                    url: "/refresh",
                    method: "POST",
                    body: {
                        refreshToken: refreshToken,
                        id: loginUser.id
                    },
                });
                if (data) {
                    localStorage.setItem(
                        "token",
                        JSON.stringify(data.data, ["accessToken", "refreshToken"])
                    );
                    return await Api.request(originalConfig);
                }
            } catch (err) {
                console.log("토큰 갱신 에러");
            }
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }
);