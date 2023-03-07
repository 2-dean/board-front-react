import {getCookie} from "../common/getAccessToken";
import axios from "axios";

const ACCESS_EXPIRATION_TIME = 1000 * 10;
//1000 * 10 * 60; 1시간
export const onLoginSuccess = (response) => {
    console.log("[onLoginSuccess 실행]-------")
    const token = response.headers.get('Authorization');

    console.log("Header access 토큰 :" + token);
    localStorage.setItem("token", token);
    console.log("accessToken localsStorage 저장");
    console.log("================[ 로그인 성공 ]================")

    setTimeout(onSilentRefresh, ACCESS_EXPIRATION_TIME);
}

export const onSilentRefresh = () => {
    console.log("[onSilentRefresh 실행 - access 재요청] ");
    const data = {
        refreshToken: getCookie("refreshToken")
    }

    axios.post("http://localhost:8080/login",data,
        {
            headers: {
                Authorization: localStorage.getItem('token'),
                refresh: getCookie("refreshToken"),
            },
        })
        .then(onLoginSuccess)
        .catch(error => {
            alert("onSilentRefresh err");
            console.log(error);
        })
}


 const onLogin = (user) => {
    axios.post("http://localhost:8080/login",
                    user,
            { withCredentials: true })
        .then((response) => {
            console.log(response);
            onLoginSuccess(response);
            //navigate("/board");

        }).catch((error) => {
            alert("로그인 정보를 확인하세요.");
            //console.log(error);
        });

}


