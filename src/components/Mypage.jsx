import {useRecoilState, useRecoilValue} from "recoil";
import {loginState, userState} from "../store/Atom";
import { useNavigate } from "react-router";
import { LogoutApi } from "../api/LogoutApi";
import { BoardsApi } from "../api/BoardsApi";
import {UserApi} from "../api/UserApi";

const Mypage = () => {
    console.log("Mypage===================================");
    const [isLogin, setIsLogin]= useRecoilState(loginState);
    const loginUser = useRecoilValue(userState);
    const navigate = useNavigate();

    console.log("user 정보 가져오기 요청 id : " + loginUser)
    UserApi(loginUser);

    console.log("isLogin : " + isLogin);

    // Todo 로그인된 사용자 정보 가지고오기

    if(isLogin === false) {
        navigate("/");
    }

    const logout = (event) => {
        event.preventDefault();
        alert("logout 클릭");

        console.log("[ logoutAPI ] 요청");
        LogoutApi();

        console.log("[ navigate ] 실행")
        navigate("/");

        console.log("isLogin 변경 실행")
        setIsLogin(false);
        console.log("isLogin : " + isLogin);
    }

    const boards = (event) => {
        event.preventDefault();
        alert("게시판 가기");
        navigate("/board");

        console.log("[ BoardsApi ] 요청");
        BoardsApi();

    }

    return (
        <>
            <h1>MyPage</h1>
            <p>{}님, 안녕하세요!</p>
            <div>
            <button onClick={boards}>게시판 ㄱ</button>
            </div>
            <div>
                <button onClick={logout}>logout</button>
            </div>
        </>
    );

}

export default Mypage;
