import { Link } from "react-router-dom";
import { useEffect } from "react";
import {Api} from "../../api/axiosProvider";
import BoardDetail from "./BoardDetail";
import {useNavigate} from "react-router";

const BoardList = (props) => {
  console.log("============ [BoardList] ===============");

  useEffect(() => {
    console.log("[ BoardList ] 게시글 번호 : " + props.idx);
  }, []);

    const navigator = useNavigate();
    let boardInfo;
    let comments;
    let boardAndComment = {};
    const getBoardAndComments = (boardIdx) => {
        console.log("[ BoardDetail ] 0. /board/boardIdx 요청 ===============");

        Api.get("/board/" + boardIdx)
            .then((response) => {
                console.log("[ BoardList ] 1. /board/idx 응답 옴");
                console.log(response);
                console.log(response.data);
                console.log(response.data.board);
                console.log(response.data.comment);

                boardInfo = response.data.board;
                comments = response.data.comment;

                console.log("===== [ boardAndComments 확인 ] =====");
                console.log("board");
                console.log(boardInfo);
                console.log("comments");
                console.log(comments);

                boardAndComment = {
                    boardInfo: boardInfo,
                    comments: comments
                }
            })
            .catch((error) => {
                console.log("[ BoardDetail ] /board/idx  error!!!");
                console.log(error);
            });

        navigator()

    }




    return (
    <tr>
      <td>{props.idx}</td>
      <td>
        {/*<Link to={`/board/${props.idx}`}>{props.title}</Link>*/}
        <Link onClick={getBoardAndComments} to={<BoardDetail boardAndComment={boardAndComment} />}>{props.title}</Link>
      </td>
      <td>{props.name}</td>
      <td>{props.saveDate}</td>
    </tr>
  );
};

export default BoardList;
