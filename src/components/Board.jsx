import { useRecoilValue } from "recoil";
import { loginState, userState } from "../store/Atom";

const BoardPage = () => {
    const isLogin= useRecoilValue(loginState);
    const loginUser = useRecoilValue(userState);

    //const navigate = useNavigate();


    console.log("[LoginPage] loginUser ID: " + loginUser.id + ", PW: " + loginUser.password + ", isLogin: " + loginUser.isLogin);


    return(
        <div>
            <h1>게시판 >> 로그인된 사용자만</h1>
            <table>
                <thead>
                <tr>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일자</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>가져올 제목 </td>
                    <td>가져올 작성자</td>
                    <td>가져올 작성일자</td>
                </tr>
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    );
}

export default BoardPage;