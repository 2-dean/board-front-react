import {Link} from "react-router-dom";


const Board = (props) => {

    console.log("게시글 줄");

    return (

       // <Link to={"/board/"+props.idx}>/**/
       <tr>

            <td>{props.idx}</td>
            <td>{props.title}</td>
            <td>{props.name}</td>
            <td>{props.saveDate}</td>

       </tr>
       // </Link>


);
};

export default Board;