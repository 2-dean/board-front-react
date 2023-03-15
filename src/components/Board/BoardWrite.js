import {useRef} from "react";
import {Api} from "../../api/axiosProvider";

const BoardWrite = () => {
    const inputRef = useRef();

    console.log("[ BoardWrite ] 실행 ")
    const userImageSubmitHandler = () => {
        alert("제출");
        console.log("userIdCardSubmitHandler 실행");

        Api.post("/boards/new")
            .then((response) => {
                console.log("/boards/new 응답 옴");
                console.log(response)
            })
    }

    return (
        <>
        <h2>BoardWritePage</h2>


            <div>미리보기영역</div>
            <form encType="multipart/form-data">
                <input type="text" name="title" placeholder="제목"/>
                <textarea name="content" placeholder="내용"/>
                <input type="text" name="name" placeholder="작성자"/>
                <input type="file" name="file"/>
            <button onClick={userImageSubmitHandler}>제출하기</button>
            </form>

        </>
    );
};


export default BoardWrite;