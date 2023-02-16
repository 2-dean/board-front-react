import {customAxios} from "./axiosProvider";

export function LogoutApi() {

    customAxios.post("/logout")
        .then(function (response) {
            console.log(response);
            alert(response);
        })
        .catch(function (error) {
            alert(error);
        });
}