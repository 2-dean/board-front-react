import {useRecoilState} from "recoil";
import {userState} from "../store/atom";
import {useNavigate} from "react-router";
import {LogoutApi} from "../api/LogoutApi";
import {UserApi} from "../api/UserApi";

const Mypage = () => {
    console.log("===================== MyPage =====================");
    const [loginUser, setLoginUser] = useRecoilState(userState);

    const navigate = useNavigate();


    console.log("[ MyPage ] user 정보 가져오기 요청 id : " + loginUser.id);
    UserApi(loginUser);
    console.log("[ MyPage ] loginUser ID: " + loginUser.id + ", NAME: " + loginUser.name + ", isLogin: " + loginUser.isLogin);

    const logout = (event) => {
        event.preventDefault();
        alert("logout 클릭");

        console.log("[ logoutAPI ] 요청");
        LogoutApi();

        console.log("[ navigate ] 실행")
        navigate("/");
    }

    const boards = (event) => {
        event.preventDefault();
        console.log("[ BoardPage ] 이동");
        navigate("/board");
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
