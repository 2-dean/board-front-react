import {customAxios} from "./axiosProvider";

export function LogoutApi() {

    customAxios.post("/logout")
        .then((response) => {
            console.log("[ /logout API 요청 ]===========")
            console.log(response);
        })
        .catch((error) => {
            alert(error);
        });

}