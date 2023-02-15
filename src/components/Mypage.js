import { useRecoilState } from "recoil";
import { loginState } from "../store/Atom";
import {useNavigate} from "react-router";



const Mypage = () => {
    console.log("Mypage===================================");
    const [isLogin, setIsLogin]= useRecoilState(loginState);
    const navigate = useNavigate();

    console.log("isLogin : " + isLogin);

    return (
        <>
            <h1>MyPage</h1>
            <p>{}님, 안녕하세요!</p>
            <button onClick={() => navigate("/")}>logout</button>
        </>
    );
}
export default Mypage;
