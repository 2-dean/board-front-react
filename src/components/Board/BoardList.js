import { Link } from "react-router-dom";
import {Api} from "../../api/axiosProvider";
import {useNavigate} from "react-router";

const BoardList = (props) => {
    console.log("============ [BoardList] ===============");

    let boardOne;
    const navigate= useNavigate();

    console.log("[BoardList] 0. /board/idx 요청 ===============");

        const boardAndComment = async () => {
            await Api.get("/board/" + props.idx)
                .then((response) => {
                    console.log("[ BoardList ] 1. /board/idx 응답 옴")
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.Board);
                    console.log(response.data.Comment);
                    const getBoard = response.data.Board;

                    console.log("[ BoardList ] 2. recoil 에 저장")
                    boardOne = {
                        idx: getBoard.idx,
                        title: getBoard.title,
                        content: getBoard.content,
                        name: getBoard.name,
                        saveDate: getBoard.saveDate,
                    };
                    console.log("[ BoardList ] 3. recoil 에 저장한 값 확인")
                    console.log("boardOne : " + boardOne);

                })
                .catch((error) => {
                    console.log("[ BoardDetail ] /board/idx  error!!!")
                    console.log(error);
                });
        }


  return (
    <tr>
      <td>{props.idx}</td>
      <td>
        <Link to={"/board/"+props.idx}>{props.title}</Link>
      </td>
      <td>{props.name}</td>
      <td>{props.saveDate}</td>
    </tr>
  );
};

export default BoardList;
