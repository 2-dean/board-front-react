import {useRecoilValue} from "recoil";
import {boardList, userState} from "../store/Atom";
import {useNavigate} from "react-router";

import classes from './style/BoardPage.module.css'
import {getCookie} from "../common/getAccessToken";
import BoardList from "../components/Board/BoardList";
import {BoardsApi} from "../api/BoardsApi";
import {useEffect, useState} from "react";

const BoardPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    // User 관련
    const loginUser = useRecoilValue(userState);

    // BoardList
    const boards = useRecoilValue(boardList);

    // Token 관련
    const refreshToken = getCookie("refreshToken");

    console.log("===================== BoardPage =====================");
    console.log("[ BoardPage ] loginUser ID: " + loginUser.id + ", NAME: " + loginUser.name + ", isLogin: " + loginUser.isLogin);

    console.log("refreshToken :" + refreshToken);

    BoardsApi();
  /* useEffect(() => {
        BoardsApi();
    },[]);
*/
    console.log("boards :>>>>>>>>>> ")
    console.log(boards)
    return(
        <div className={classes.container}>
            <h1>게시판</h1>
            <BoardList boards={boards} />
        </div>
    );
}

export default BoardPage;