import {getCookie} from "../common/getAccessToken";
import {Api} from "./axiosProvider";
import {AxiosRequestConfig} from "axios";

// 잔여시간 계산
const calcuateRemainingTime = (expireTime) => {
    console.log("[ calcuateRemainingTime ] exprieTime : " + expireTime)
    const currentTime = new Date().getTime(); // 현재시간
    //const addExpireTime = new Date(expireTime).getTime(); //현재시간 + 만료시간

    console.log("[ calcuateRemainingTime ] 현재시간 : " + currentTime);
   // console.log("[ calcuateRemainingTime ] 만료시간 : " + addExpireTime);

    const remainingTime = expireTime - currentTime;
    console.log("[ calcuateRemainingTime ] remainingTime : " + remainingTime);

    return remainingTime;
}

// 토큰 잔여시간
const retrieveStoredToken = (token, expireTime) => {
    const remainingTime = calcuateRemainingTime(expireTime);

    if (remainingTime <= 0) {
        console.log("[ retrieveStoredToken() 실행 ] ====> accessToken 만료")

        localStorage.removeItem("token");
        localStorage.removeItem("expireTime");

        return null;
    }
    console.log("[ retrieveStoredToken() 실행 ] ====> accessToken 유효")
    return token; // 남은시간이 있어서 토큰이 유효하다면 저장된 토큰 리턴
}


const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {

    const accessToken = localStorage.getItem("token");
    const expireTime = localStorage.getItem("expireTime");
    const refreshToken = getCookie("refreshToken");

    if (retrieveStoredToken(accessToken, expireTime) === null && refreshToken) {
        console.log("accessToken 만료 >>  refresh 토큰 발급")

        let body = {
            refreshToken: refreshToken
        };

        const data = await Api.post("/refresh", body);
        console.log("refresh 요청")
        console.log(data);
        // localStorage.setItem("token", res.)

    }
}

const refreshErrorHandler =  (error) => {

    console.log(error);
    return Promise.reject(error);
}


export { refresh };



