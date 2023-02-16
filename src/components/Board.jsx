import {useRecoilState} from "recoil";
import {loginState, userState} from "../store/Atom";
import {useNavigate} from "react-router";

const BoardPage = () => {
    const [isLogin, setIsLogin]= useRecoilState(loginState);
    const [loginUser, setLoginUser] = useRecoilState(userState);

    const navigate = useNavigate();

    console.log("isLogin : " + isLogin);
    console.log("[LoginPage] loginUser ID: " + loginUser.id + ", PW: " + loginUser.password + ", isLogin: " + loginUser.isLogin);


    return(
        <div>
            <h1>게시판 >> 로그인된 사용자만</h1>
            <table>
                <tr>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일자</td>
                </tr>
                <tr>
                    <td>가져올 제목 </td>
                    <td>가져올 작성자</td>
                    <td>가져올 작성일자</td>
                </tr>
            </table>
        </div>
    );
}

export default BoardPage;