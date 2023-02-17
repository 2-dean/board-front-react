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
                setLoginUser({
                    id: response.data.id,
                    name: response.data.name,
                    isLogin: true,
                })

                console.log("userApi end " );
            })
            .catch(function (error) {
                alert(error);
            });
    }, []);

}