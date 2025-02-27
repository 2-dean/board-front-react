import { useParams } from "react-router";
import { Api } from "../../api/axiosProvider";
import { useRecoilState } from "recoil";
import {
  boardState,
  commentListState,
  commentPageListState,
} from "../../store/atom";
import {useEffect, useState} from "react";

const BoardDetail = (props) => {
  console.log("============ [BoardDetail] ===============");
    // url 값 가져오기
    const { boardIdx } = useParams();
    console.log("[ BoardDetail ] boardIdx : " + boardIdx);


  // 게시글과 댓글
  const [board, setBoard] = useRecoilState(boardState);
  const [commentList, setCommentList] = useRecoilState(commentListState);
  const [commentPageList, setCommentPageList] = useRecoilState(commentPageListState)
    const [imgSrc, setImgSrc] = useState('');

    useEffect(()=>{
        console.log("[ BoardDetail ] boardIdx : " + boardIdx)
        console.log("[ BoardDetail ] 0. /board/boardIdx 요청 ===============");
        Api.get("/board/" + boardIdx)
            .then((response) => {
                console.log("[ BoardList ] 1. /board/idx 응답 옴");
                console.log(response);
                console.log(response.data);
                console.log(response.data.board);
                console.log(response.data.comment);

                const boardInfo = response.data.board;
                const comments = response.data.comment;

                console.log("[ BoardDetail ] boardAndComments 확인 ] =====");
                console.log("board");
                console.log(boardInfo);
                console.log("comments");
                console.log(comments);

                console.log("[ BoardDetail ] board / Comments Recoil 에 담기 =====");
                setBoard(boardInfo);
                setCommentList(comments);
            })
            .catch((error) => {
                console.log("[ BoardDetail ] /board/idx  error!!!");
                console.log(error);
            });



    },[])




  return (
    <div>
      <h1>Board Detail</h1>
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
            <td>{board.idx}</td>
            <td>{board.title}</td>
            <td>{board.name}</td>
            <td>{board.saveDate}</td>
          </tr>
          <tr>
              <td colSpan={4}><img src={board.savePath}  alt={board.oriFileName}/></td>
          </tr>
          <tr>
            <td colSpan={4}>{board.content}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>아래 댓글창ㅋ</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default BoardDetail;
