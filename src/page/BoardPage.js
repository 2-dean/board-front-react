import { useRecoilState, useRecoilValue } from "recoil";
import { activePageState, userState } from "../store/Atom";

import classes from "./style/BoardPage.module.css";
import Boards from "../components/Board/Boards";
import Paging from "../components/Board/Paging";
import { Suspense } from "react";
import {BoardsApi} from "../api/BoardsApi";

const BoardPage = () => {
  const loginUser = useRecoilValue(userState);
  const activePage = useRecoilState(activePageState);
  console.log("===================== BoardPage =====================");
  console.log(
    "[ BoardPage ] 0. 로그인 사용자 정보확인 : \n\n " +
      "loginUser ID: " +
      loginUser.id +
      ", isLogin: " +
      loginUser.isLogin
  );

  console.log(
    "[ BoardPage ] 1. localStorage 토큰확인 : " + localStorage.getItem("token")
  );

  return (
    <div className={classes.container}>
      <h1>게시판</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Boards resource={BoardsApi} />
      </Suspense>
      <div>
        <Paging />
      </div>
    </div>
  );
};

export default BoardPage;