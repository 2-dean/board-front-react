import {customAxios} from "./axiosProvider";


// 지금 사용안함
export function LoginApi(props) {

    customAxios.post("/login", props)
        .then(function (response) {
            console.log("/login axios 시작");
            console.log(response);
        })
        .catch(function (error) {
            alert(error);
        });
}