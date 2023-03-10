import {
  activePageState,
  boardListState,
  boardPageListState,
} from "../../store/Atom";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardList from "./BoardList";
import { useEffect } from "react";
import { Api } from "../../api/axiosProvider";

const Boards = (props) => {
  console.log("================= Boards =====================");
  const [boards, setBoards] = useRecoilState(boardListState);
  const [boardPageList, setBoardPageList] = useRecoilState(boardPageListState);
  const activePage = useRecoilValue(activePageState);

  // 페이징 관련
  const itemsCountPerPage = 5;
  const beginBoard = (activePage - 1) * itemsCountPerPage;
  const endBoard = beginBoard + itemsCountPerPage;

  useEffect(() => {
    console.log("[ Boards ] 2. componentDidMount !");
    console.log("[ Boards ] activePage : " + activePage);
    console.log("[ Boards ] 3. BoardApi 요청");
    Api.get("/boards")
      .then((response) => {
        console.log("[ Boards ] 4. BoardApi 응답옴");
        console.log(response);
        console.log("[ Boards ] 5. 게시글 목록 확인");
        console.log(response.data); // 게시글 목록

        const boardListAll = response.data;
        const boardListCount = response.data.length; // 전체 게시글 갯수
        console.log("[ Boards ] 6. 게시글 전체 갯수 확인");
        console.log("[ Boards ] boardsCount : " + boardListCount);

        console.log("[ Boards ] 7. BoardList 전체 담기");
        setBoards(boardListAll);

        console.log("[ Boards ] 8. setBoardPageList 에 담기");
        console.log(
          "[ Boards ] begin - end : " + beginBoard + " ~ " + endBoard
        );
        console.log(
          "[ Boards ] boards.slice(beginBoard, endBoard) : " +
            boards.slice(beginBoard, endBoard)
        );
        setBoardPageList(boards.slice(beginBoard, endBoard));

        console.log("[ Boards ] 8. setBoardPageList 확인");
        console.log(boardPageList);
      })
      .catch((error) => {
        console.log("[ Boards ] 3. !!! error 발생");
        console.log(error);
        return alert("[ Boards ] Axios [ /boards ] 요청 error");
      });
  }, []);

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