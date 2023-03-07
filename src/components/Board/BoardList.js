import { Link } from "react-router-dom";

const BoardList = (props) => {
  console.log("게시글 줄");

  return (
    <tr>
      <td>{props.idx}</td>
      <td>
        <Link to={"/boards/" + props.idx}>{props.title}</Link>
      </td>
      <td>{props.name}</td>
      <td>{props.saveDate}</td>
    </tr>
  );
};

export default BoardList;
