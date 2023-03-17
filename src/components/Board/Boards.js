import { boardListState, boardPageListState } from "../../store/Atom";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

const Boards = (props) => {
  console.log("================= Boards =====================");
  const boards = useRecoilValue(boardListState);
  const boardPageList = useRecoilValue(boardPageListState);

  console.log("[ Boards ] boards 확인");
  console.log(boards);

  console.log("[ Boards ] boardPageList 확인");
  console.log(boardPageList);

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
            <tr key={board.idx}>
              <td>{board.idx}</td>
              <td>
                <Link to={`/board/${board.idx}`}>{board.title}</Link>
              </td>
              <td>{board.name}</td>
              <td>{board.saveDate}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>게시판 아래</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Boards;