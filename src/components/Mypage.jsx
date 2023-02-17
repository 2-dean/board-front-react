import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {loginState, userState} from "../store/Atom";
import {useNavigate} from "react-router";
import {LogoutApi} from "../api/LogoutApi";
import {BoardsApi} from "../api/BoardsApi";
import {UserApi} from "../api/UserApi";
import {getCookie} from "./getAccessToken";

const Mypage = () => {
    console.log("MyPage===================================");
    const [loginUser, setLoginUser] = useRecoilState(userState);
    const userLogout = useResetRecoilState(userState);
    const navigate = useNavigate();
    const accessToken = getCookie("accessToken");

    // 로그인한 사용자 정보 가져오기 userState 에 사용자 정보 매핑

    console.log("user 정보 가져오기 요청 id : " + loginUser.id);
    setLoginUser({
        id: null,
        name: null,
        isLogin: false,
    })
    UserApi(loginUser);

    console.log("user : " + loginUser.id, + ", " + loginUser.isLogin +", " + loginUser.name)

    if(accessToken ===  undefined || loginUser.isLogin === false){
        alert("[Mypage] access token 없음 > 로그인하세요")
        // user 상태 초기화
        userLogout();
        navigate("/")
    } else {
        console.log("accessToken : " + accessToken);
    }


    const logout = (event) => {
        event.preventDefault();
        alert("logout 클릭");

        console.log("[ logoutAPI ] 요청");
        LogoutApi();

        console.log("[ userState ] 초기화");
        userLogout();

        console.log("[ navigate ] 실행")
        navigate("/");
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
            <p> [ {loginUser.name} ] 님, 안녕하세요!</p>
            <div>
            <button onClick={boards}>게시판</button>
            </div>
            <div>
                <button onClick={logout}>logout</button>
            </div>
        </>
    );

}

export default Mypage;
