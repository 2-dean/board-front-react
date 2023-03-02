import {Api} from "./axiosProvider";
import {userState} from "../store/Atom";
import {useRecoilState} from "recoil";
import {useEffect} from "react";


export function UserApi(props) {

    const [loginUser, setLoginUser] = useRecoilState(userState);

    useEffect(() => {
        Api.post("/users", props)
            .then(function (response) {
                console.log("[ Axios - UserApi ] (로그인 상태 설정) 시작");
                console.log(response);

                // 로그인 상태로 설정
                setLoginUser({
                    id: response.data.id,
                    password: response.data.password,
                    name: response.data.name,
                    isLogin: true,
                })

                console.log("[ Axios - UserApi ] 끝");
            })
            .catch(function (error) {
                alert(error);
            });
    }, []);

}