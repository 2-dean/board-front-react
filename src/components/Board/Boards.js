import {
  activePageState,
  boardListState,
  boardPageListState, modeState,
} from "../../store/Atom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import BoardList from "./BoardList";
import {useEffect} from "react";

const Boards = (props) => {
  console.log("================= Boards =====================");
  const [boards, setBoards] = useRecoilState(boardListState);
  const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);
  const activePage = useRecoilValue(activePageState);


  // 페이징 관련
  const itemsCountPerPage = 5;
  const beginBoard = (activePage - 1) * itemsCountPerPage;
  const endBoard = beginBoard + itemsCountPerPage;

  console.log("[ Boards ] boardPageList 확인");
  console.log(boardPageList);

  useEffect((pageCHa) => {

  },[])
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>글번호</td>
            <td>제목</td>
            <td>작성자</td>
            <td>시간</td>
          </tr>
        </thead>
        <tbody>
          {boardPageList.map((board) => (
            <BoardList
              key={board.idx}
              idx={board.idx}
              title={board.title}
              name={board.name}
              saveDate={board.saveDate}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>게시판 아래</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Boards;