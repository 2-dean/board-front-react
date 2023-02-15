import {customAxios} from "./axiosConfig";


// 지금 사용안함
export function LoginApi(props) {

    customAxios.post("/login", props)
        .then(function (response) {
            console.log(response);
            // access token 있으면 로그인 상태 바꿔주기
            alert(response);
        })
        .catch(function (error) {
            alert(error);
        });
}