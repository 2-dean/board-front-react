import {customAxios} from "./axiosProvider";
import {userState} from "../store/Atom";
import {useRecoilState} from "recoil";
import {useEffect} from "react";


export function UserApi(props) {

    const [loginUser, setLoginUser] = useRecoilState(userState);

    useEffect(() => {
        customAxios.post("/users", props)
            .then(function (response) {
                console.log(response);
                setLoginUser(response.data)

                console.log("setLoginUser : " + loginUser);
            })
            .catch(function (error) {
                alert(error);
            });
    });

}