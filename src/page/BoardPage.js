import {useRecoilState, useRecoilValue} from "recoil";
import {activePageState, boardList, boardPageListState, userState} from "../store/Atom";

import classes from "./style/BoardPage.module.css";
import Boards from "../components/Board/Boards";
import Paging from "../components/Board/Paging";
import {Api} from "../api/axiosProvider";
import {useEffect} from "react";

const BoardPage = () => {
  console.log("===================== BoardPage =====================");

  const activePage = useRecoilValue(activePageState);
  const loginUser = useRecoilValue(userState);
    const [boards, setBoards] = useRecoilState(boardList);
    const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);

    const itemsCountPerPage = 5;
    const beginBoard = (activePage - 1)  * itemsCountPerPage;
    const endBoard = beginBoard + (itemsCountPerPage);
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

  useEffect(()=> {
      console.log("[ boardPage ] 2. componentDidMount !");
      console.log("[ boardPage ] 2. BoardApi 요청");
      Api.get("/boards")
          .then((response) => {
              console.log("[ boardPage ] 3. BoardApi 응답옴");
              console.log(response);
              console.log("[ boardPage ] 4 게시글 목록 확인");
              console.log(response.data); // 게시글 목록

              const boardListAll = response.data;
              const boardListCount = response.data.length; // 전체 게시글 갯수
              console.log("[ boardPage ] 5. 게시글 전체 갯수 확인");
              console.log("[ boardPage ] boardsCount : " + boardListCount);

              console.log("[ boardPage ] 6. BoardList 전체 담기");
              setBoards(boardListAll);

              console.log("[ boardPage ] 7. board 전체 담은거 확인")
              console.log(boards);

              console.log("[ boardPage ] 8. 1페이지 boardPageList 에 담기");
              setBoardPageList(boards.slice(beginBoard, endBoard));

              console.log("[ boardPage ] 9. 1  페이지 게시글 확인")
              console.log(boardPageList);
          })
          .catch((error) => {
              console.log("[ boardPage ] 3. !!! error 발생");
              console.log(error);
              return alert("[ boardPage ] Axios [ /boards ] 요청 error");
          });
  }, [])



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