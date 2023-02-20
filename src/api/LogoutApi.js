import {customAxios} from "./axiosProvider";

export function LogoutApi() {

    customAxios.post("/logout")
        .then(function (response) {
            console.log("LogoutApi 실행")
            console.log(response);
        })
        .catch(function (error) {
            alert(error);
        });
}