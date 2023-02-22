import {useRecoilValue, useResetRecoilState} from "recoil";
import {boardList, userState} from "../store/Atom";
import {useNavigate} from "react-router";
import {useEffect} from "react";

import classes from '../style/BoardPage.module.css'
import {getCookie} from "../components/getAccessToken";
import {BoardsApi} from "../api/BoardsApi";
import BooardList from "../components/BooardList";

const BoardPage = () => {
    const loginUser = useRecoilValue(userState);
    const userLogout = useResetRecoilState(userState);
    const board = useRecoilValue(boardList);
    const navigate = useNavigate();
    const accessToken = getCookie("accessToken");


    console.log("===================== BoardPage =====================");
    console.log("[ BoardPage ] loginUser ID: " + loginUser.id + ", NAME: " + loginUser.name + ", isLogin: " + loginUser.isLogin);

    useEffect(() => {
        if(accessToken ===  null){
            alert("[ BoardPage ] access token 없음 > 로그인하세요")
            userLogout();
            navigate("/");
        }

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