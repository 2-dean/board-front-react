import {useNavigate} from "react-router";

const MainPage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <h1>main Page</h1>
            <span>안녕하세용 로그인하세요</span>
            <div>
                <button onClick={navigate("/login")}>로그인하기</button>
            </div>
        </div>
    );
}

export default MainPage;