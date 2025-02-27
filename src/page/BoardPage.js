import { useRecoilState, useRecoilValue } from "recoil";
import {
  activePageState,
  boardListState,
  boardPageListState,
  modeState,
  userState,
} from "../store/atom";

//import classes from "../style/style/BoardPage.module.css";
import Boards from "../components/board/Boards";
import Paging from "../components/board/Paging";
import { Link } from "react-router-dom";
import {useEffect} from "react";

const BoardPage = () => {
  const loginUser = useRecoilValue(userState);
  const boards = useRecoilValue(boardListState);
    useEffect(() => {
        console.log("[BoardPage] 렌더링됨");
    }, []);

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
    <div>
      <h1>게시판</h1>
      <Paging />
      <Link to={"/board/write"}>
        <p>글쓰기</p>
      </Link>
    </div>
  );
};

export default BoardPage;