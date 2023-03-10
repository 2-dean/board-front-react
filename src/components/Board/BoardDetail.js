import { useParams } from "react-router";
import { Api } from "../../api/axiosProvider";
import { useRef } from "react";

const BoardDetail = () => {
  console.log("============ [BoardDetail] ===============");
  const { boardIdx } = useParams();
  console.log("[ BoardDetail ] : " + boardIdx);
  const boardInfo = useRef();
  const comments = useRef();

  console.log("[ BoardDetail ] 0. /board/idx 요청 ===============");
  Api.get("/board/" + boardIdx)
    .then((response) => {
      console.log("[ BoardList ] 1. /board/idx 응답 옴");
      console.log(response);
      console.log(response.data);
      console.log(response.data.board);
      console.log(response.data.comment);

      boardInfo.current = response.data.board;
      comments.current = response.data.comment;

      console.log("===== [ boardAndComments 확인 ] =====");
      console.log("board");
      console.log(boardInfo.current);
      console.log("comments");
      console.log(comments.current);
    })
    .catch((error) => {
      console.log("[ BoardDetail ] /board/idx  error!!!");
      console.log(error);
    });

  return (
    <div>
      <h1>Board Detail</h1>
      <p>{boardIdx}</p>
      <table>
        <thead>
          <tr>
            <td>게시글번</td>
            <td>제목</td>
            <td>작성자</td>
            <td>작성일자</td>
          </tr>
        </thead>
        <tbody>
        {boardInfo.current ? console.log("boarInfo 들어옴") : console.log("boarInfo 로딩중ㅌㅋ")}
          <tr aria-rowspan={4} >
            <td>{boardInfo.current.idx}</td>
            <td>{boardInfo.current.title}</td>
            <td>{boardInfo.current.name}</td>
            <td>{boardInfo.current.saveDate}</td>
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
