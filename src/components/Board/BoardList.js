import { Link } from "react-router-dom";
import { useEffect } from "react";

const BoardList = (props) => {
  console.log("============ [BoardList] ===============");

  useEffect(() => {
    console.log("[ BoardList ] 게시글 번호 : " + props.idx);
  }, []);

  return (
    <tr>
      <td>{props.idx}</td>
      <td>
        <Link to={`/board/${props.idx}`}>{props.title}</Link>
      </td>
      <td>{props.name}</td>
      <td>{props.saveDate}</td>
    </tr>
  );
};

export default BoardList;
