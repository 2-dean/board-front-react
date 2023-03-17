import { useRecoilState, useRecoilValue } from "recoil";
import {
  activePageState,
  boardListState,
  boardPageListState,
  modeState,
  userState,
} from "../store/Atom";

import classes from "./style/BoardPage.module.css";
import Boards from "../components/Board/Boards";
import Paging from "../components/Board/Paging";
import { Link } from "react-router-dom";

const BoardPage = () => {
  const loginUser = useRecoilValue(userState);
  const boards = useRecoilValue(boardListState);

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
      <Paging />
      <Link to={"/board/write"}>
        <p>글쓰기</p>
      </Link>
    </div>
  );
};

export default BoardPage;