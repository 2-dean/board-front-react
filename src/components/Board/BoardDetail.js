import { useParams } from "react-router";
import {Api} from "../../api/axiosProvider";

const BoardDetail = () => {
    console.log("============ [BoardDetail] ===============");
  const params = useParams();

  Api.get("/board/"+params.boardIdx)
      .then((response) => {
          console.log("============ [/board/boardIdx 요청] ===============");
          console.log(response);
      })
      .catch((error) => {
          console.log(error);
      })

  return (
    <div>
      <h1>Board Detail</h1>
      <p>{params.boardIdx}</p>
    </div>
  );
};
export default BoardDetail;
