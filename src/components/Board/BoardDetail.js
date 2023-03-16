import { useParams } from "react-router";

const BoardDetail = (props) => {
  console.log("============ [BoardDetail] ===============");
  const { boardIdx } = useParams();
  console.log("[ BoardDetail ] boardAndComment : " + props.boardAndComment);
console.log("[ BoardDetail ] boardInfo : " + props.boardAndComment.boardInfo);
console.log("[ BoardDetail ] comments : " + props.boardAndComment.comments);

const boardInfo =  props.boardAndComment.boardInfo;
  return (
    <div>
      <h1>Board Detail</h1>
      <p>{boardIdx}</p>
      <table>
        <thead>
          <tr>
            <td>게시글번호</td>
            <td>제목</td>
            <td>작성자</td>
            <td>작성일자</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{boardInfo.idx}</td>
            <td>{boardInfo.title}</td>
            <td>{boardInfo.name}</td>
            <td>{boardInfo.saveDate}</td>*/}
          </tr>
          <tr>
            {/*
            <td>{boardInfo.current.content}</td>
*/}
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
