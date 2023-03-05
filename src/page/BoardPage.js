import {useRecoilValue} from "recoil";
import {userState} from "../store/Atom";

import classes from './style/BoardPage.module.css'
import {getCookie} from "../common/getAccessToken";
import BoardList from "../components/Board/BoardList";
import {useState} from "react";

const BoardPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    // User 관련
    const loginUser = useRecoilValue(userState);
    // Token 관련
    const refreshToken = getCookie("refreshToken");

    console.log("===================== BoardPage =====================");
    console.log("[ BoardPage ] loginUser ID: " + loginUser.id + ", NAME: " + loginUser.name + ", isLogin: " + loginUser.isLogin);

    console.log("refreshToken :" + refreshToken);


    return(
        <div className={classes.container}>
            <h1>게시판</h1>
            <table>
                <thead>
                    <tr>
                        <td>글번호</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td>시간</td>
                    </tr>
                </thead>
                <tbody>
                    <BoardList />
                </tbody>
                <tfoot>
                <tr>
                   게시판 아래
                </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default BoardPage;