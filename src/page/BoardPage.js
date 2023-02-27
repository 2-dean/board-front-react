import {useRecoilValue, useResetRecoilState} from "recoil";
import {boardList, userState} from "../store/Atom";
import {useNavigate} from "react-router";
import {useEffect} from "react";

import classes from './style/BoardPage.module.css'
import {getCookie} from "../common/getAccessToken";
import {BoardsApi} from "../api/BoardsApi";
import BooardList from "../components/Board/BooardList";
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

    console.log("accessToken :" + accessToken);
    console.log("refreshToken :" + refreshToken);


    useEffect(() => {
             //access 재발급
        if(accessToken === null && refreshToken != null){
            alert("accessToken 재요청")
            console.log("[ BoardPage ] LoginApi (access재)요청>")
            LoginApi(loginUser);
        }

        if(accessToken ===  null && refreshToken === null){
            alert("[ BoardPage ] access token 없음 > 로그인하세요")
            userLogout();
            navigate("/");
        }

    }, []);


    //TODO accessToken 재요청과 동시에 이뤄지는 것 같음 !!
    console.log("[ BoardPage ] BoardApi 요청>")
    BoardsApi();

    return(
        <div className={classes.container}>
            <h1>게시판</h1>
            <BooardList boards={board} />
        </div>
    );
}

export default BoardPage;