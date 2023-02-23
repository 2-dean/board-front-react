import {useRecoilValue, useResetRecoilState} from "recoil";
import {boardList, userState} from "../store/Atom";
import {useNavigate} from "react-router";
import {useEffect} from "react";

import classes from '../style/BoardPage.module.css'
import {getCookie} from "../components/getAccessToken";
import {BoardsApi} from "../api/BoardsApi";
import BooardList from "../components/BooardList";
import {LoginApi} from "../api/LoginApi";

const BoardPage = () => {
    // User 관련
    const loginUser = useRecoilValue(userState);
    const userLogout = useResetRecoilState(userState);

    // Board 관련
    const board = useRecoilValue(boardList);

    // Token 관련
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    // Navigate
    const navigate = useNavigate();
    console.log("===================== BoardPage =====================");
    console.log("[ BoardPage ] loginUser ID: " + loginUser.id + ", NAME: " + loginUser.name + ", isLogin: " + loginUser.isLogin);

    if(accessToken === null && refreshToken != null){
        console.log("[ BoardPage ] LoginApi 요청>")
        LoginApi(loginUser);
    }
    useEffect(() => {
        // token 재요청
     /*   if(accessToken ===  null && refreshToken === null){
            alert("[ BoardPage ] access token 없음 > 로그인하세요")
            userLogout();
            navigate("/");
        }*/

    },[]);


    console.log("[ BoardPage ] BoardApi 요청>")
    BoardsApi();
    console.log("[ BoardPage ] BoardApi 끝>")

    return(
        <div className={classes.container}>
            <h1>게시판 >> 로그인된 사용자만</h1>
            <BooardList boards={board} />
        </div>
    );
}

export default BoardPage;