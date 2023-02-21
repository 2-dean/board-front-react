import {useRecoilValue} from "recoil";
import {userState} from "../store/Atom";
import {useNavigate} from "react-router";
import {useEffect} from "react";

import classes from '../style/BoardPage.module.css'

const BoardPage = () => {
    const loginUser = useRecoilValue(userState);
    const boardList = useRecoilValue(boardList);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Board 컴포넌트 나타남")
        if(loginUser.isLogin === false) {
            alert("로그인 정보가 없습니다. 로그인 페이지로 이동")
            navigate("/login");
        }
    }, []); // 한번만
    console.log("[LoginPage] loginUser ID: " + loginUser.id + ", NAME: " + loginUser.name + ", isLogin: " + loginUser.isLogin);

    return(
        <div className={classes.container}>
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