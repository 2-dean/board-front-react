import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { boardState } from "../../store/Atom";

const BoardDetail = () => {
  console.log("============ [BoardDetail] ===============");
  const params = useParams();
  const board = useRecoilValue(boardState);
  console.log("[ BoardDetail ] boardAndComment 데이터 : " + board);
  return (
    <div>
      <h1>Board Detail</h1>
      <p>{params.boardIdx}</p>
      <table>
        <thead>
          <tr>
            <td>{board.idx}</td>
            <td>{board.title}</td>
            <td>{board.name}</td>
            <td>{board.saveDate}</td>
            {/* <td>IDX</td>
            <td>board.title</td>
            <td>board.name</td>
            <td>board.saveDate</td>*/}
          </tr>
        </thead>
        <tbody>
          <tr aria-rowspan={4}>
            <td>board.content</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>아래 댓글창ㅋ</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default BoardDetail;
