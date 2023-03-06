import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {activePageState, boardList, boardPageListState, userState} from "../store/Atom";

import classes from './style/BoardPage.module.css'
import {getCookie} from "../common/getAccessToken";
import BoardList from "../components/Board/BoardList";
import {useEffect} from "react";
import {Api} from "../api/axiosProvider";
import Paging from "../components/Board/Paging";

const BoardPage = () => {

    const [boards, setBoards] = useRecoilState(boardList);
    const activePage= useRecoilValue(activePageState);
    const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);
    const itemsCountPerPage = 5;
    console.log("현재 페이지 번호 : " + activePage);
    // User 관련
    const loginUser = useRecoilValue(userState);

    const beginBoard = (activePage - 1)  * itemsCountPerPage;
    const endBoard = beginBoard + (itemsCountPerPage);

    console.log("===================== BoardPage =====================");

    console.log("[ BoardPage ] loginUser ID: " + loginUser.id + ", NAME: " + loginUser.name + ", isLogin: " + loginUser.isLogin);
    let boardListCount = 0;

    console.log("BoardApi 요청>>>>>>>")
    useEffect(() => {
        Api.get("/boards")
            .then((response) => {
                console.log("[ Axios - BoardsApi ] 시작");
                console.log(response);
                console.log(response.data); // 게시글 목록

                const boardListAll = response.data;
                boardListCount = response.data.length; // 전체 게시글 갯수
                console.log("boardsCount:" + boardListCount);

                console.log("[ Axios - BoardsApi ] 데이터 목록에 담기");
                setBoards(boardListAll);
            })
            .catch((error) => {
                console.log("[ Axios - BoardsApi ] error 발생");
                console.log(error)
                return  alert("Axios error");
            });
    }, [])

    console.log("[boardPage] 처음 열림페이지번호 : " + activePage);




    return(
        <div className={classes.container}>
            <h1>게시판</h1>
            <BoardList />
            <div>
                <Paging totaItemCount={boardListCount}/>
            </div>
        </div>

    );
}

export default BoardPage;