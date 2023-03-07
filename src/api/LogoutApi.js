import {Api} from "./axiosProvider";
import {useResetRecoilState} from "recoil";
import {userState} from "../store/Atom";

export function LogoutApi() {
    const userLogout = useResetRecoilState(userState);
    Api.post("/logout")
        .then((response) => {
            console.log("[ /logout API 요청 ]===========")
            console.log(response);

            console.log("[ userState ] 초기화");

            userLogout();
        })
        .catch((error) => {
            alert(error);
        });

}