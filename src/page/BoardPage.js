import { useRecoilState, useRecoilValue } from "recoil";
import {activePageState, boardListState, boardPageListState, boardState, userState} from "../store/Atom";

import classes from "./style/BoardPage.module.css";
import Boards from "../components/Board/Boards";
import Paging from "../components/Board/Paging";
import {Api} from "../api/axiosProvider";
import {useEffect} from "react";

const BoardPage = () => {
  const loginUser = useRecoilValue(userState);
  const [boards, setBoards] = useRecoilState(boardListState);
  const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);
    const [activePage, setActivePage] = useRecoilState(activePageState);

    const itemsCountPerPage = 5;
    const beginBoard = (activePage - 1) * itemsCountPerPage;
    const endBoard = beginBoard + itemsCountPerPage;

  console.log("===================== BoardPage =====================");
  console.log(
    "[ BoardPage ] 1. 로그인 사용자 정보확인 : \n " +
      "loginUser ID: " +
      loginUser.id +
      ", isLogin: " +
      loginUser.isLogin
  );


  console.log("[ BoardPage ] boardList : " + boards);
  return (
    <div className={classes.container}>
      <h1>게시판</h1>
        <Boards />
      <div>
        <Paging  />
      </div>
    </div>
  );
};

export default BoardPage;