import { useRecoilState, useRecoilValue } from "recoil";
import { activePageState, boardList, userState } from "../store/Atom";

import classes from "./style/BoardPage.module.css";
import Boards from "../components/Board/Boards";
import { Api } from "../api/axiosProvider";
import Paging from "../components/Board/Paging";

const BoardPage = () => {
  console.log("===================== BoardPage =====================");
  const [boards, setBoards] = useRecoilState(boardList);
  const activePage = useRecoilValue(activePageState);
  const loginUser = useRecoilValue(userState);

  console.log(
    "[ BoardPage ] 0. 로그인 사용자 정보확인 : \n\n " +
      "loginUser ID: " +
      loginUser.id +
      ", isLogin: " +
      loginUser.isLogin
  );
  console.log("[ boardPage ] 0. 페이지번호 : " + activePage);

  console.log(
    "[ BoardPage ] 1. localStorage 토큰확인 : " + localStorage.getItem("token")
  );

  console.log("[ BoardPage ] 2. BoardApi 요청");
  Api.get("/boards")
    .then((response) => {
      console.log("[ BoardPage ] 2. BoardApi 응답옴");
      console.log(response);
      console.log("[ BoardPage ] 2-1. 게시글 목록 확인");
      console.log(response.data); // 게시글 목록

      const boardListAll = response.data;
      const boardListCount = response.data.length; // 전체 게시글 갯수
      console.log("[ BoardPage ] 2-2. 게시글 전체 갯수 확인");
      console.log("[ BoardPage ] boardsCount : " + boardListCount);

      console.log("[ BoardPage ] 2-3. BoardList 전체 담기");
      setBoards(boardListAll);
    })
    .catch((error) => {
      console.log("[ BoardPage ] 2. error 발생");
      console.log(error);
      return alert("Axios error");
    });

  return (
    <div className={classes.container}>
      <h1>게시판</h1>
      <Boards />
      <div>
        <Paging />
      </div>
    </div>
  );
};

export default BoardPage;