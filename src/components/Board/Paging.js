import Pagination from "react-js-pagination";
import { useRecoilState } from "recoil";
import {
  activePageState,
  boardListState,
  boardPageListState,
} from "../../store/Atom";
import {useEffect} from "react";
import {Api} from "../../api/axiosProvider";



const Paging = () => {
  // const [pageContent, setPageContent] = useRecoilState(pageInfo);
  console.log("================= Paging =================");
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [boards, setBoards] = useRecoilState(boardListState);
  const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);

  // 한 페이지랑 보여줄 아이템 갯수
  const itemsCountPerPage = 5;
  const beginBoard = (activePage - 1) * itemsCountPerPage;
  const endBoard = beginBoard + itemsCountPerPage;
  //const endBoard = beginBoard + (itemsCountPerPage - 1);

  console.log("[ Paging ] 0. 총 게시글 수: " + boards.length);
  console.log(
    "[ Paging ] 1. beginBoard : " + beginBoard + ", endBoard : " + endBoard
  );

  useEffect(() => {
    console.log("[ Paging ] 2. componentDidMount !");
    console.log("[ Paging ] 3. BoardApi 요청");

    Api.get("/boards")
        .then((response) => {
          console.log("[ Paging ] 4. BoardApi 응답옴");
          console.log(response);
          console.log("[ Paging ] 5. 게시글 목록 확인");
          console.log(response.data); // 게시글 목록

          const boardListAll = response.data;
          const boardListCount = response.data.length; // 전체 게시글 갯수
          console.log("[ Paging ] 6. 게시글 전체 갯수 확인");
          console.log("[ Paging ] boardsCount : " + boardListCount);

            console.log("[ Paging ] 7. BoardList 전체 담기 >> 확인");
            setBoards(boardListAll);
            console.log(boards);

            console.log("[ Paging ] beginBoard, endBoard 확인 : " + beginBoard + ", " + endBoard);

            pageChangeHandler(activePage);
        })
        .catch((error) => {
          console.log("[ Paging ] 4. !!! error 발생");
          console.log(error);
          return alert("[ Paging ] Axios [ /boards ] 요청 error");
        });

    return () => {
      console.log("[ Paging ] --- 컴포넌트 사라짐");
    };
  }, []);



 const pageChangeHandler = (activePage) => {
    setActivePage(activePage);
    console.log(
      "[ Paging - pageChangeHandler ] 4. 페이지 변경! [ 페이지 : " +
        activePage +
        " ] Recoil 에 반영"
    );
    console.log(
      "[ Paging - pageChangeHandler ] 5. 페이지당 보일 게시글 번호 확인 \n " +
        " \t\t\t\t beginBoard : " +
        beginBoard +
        ", endBoard : " +
        endBoard
    );
    console.log(
      "[ Paging - pageChangeHandler ] 6. [ 페이지 : " +
        activePage +
        " ] 해당 게시글 boardPageList 에 담기"
    );
    setBoardPageList(boards.slice(beginBoard, endBoard));

    console.log(
      "[ Paging - pageChangeHandler ] 페이지에 보일 게시글들 확인 ======================="
    );
    console.log(boardPageList);
  };

  return (
    <div>
      <Pagination
        activePage={activePage} // 현재 페이지
        itemsCountPerPage={itemsCountPerPage} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={boards.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={pageChangeHandler}
      />
    </div>
  );
};
export default Paging;