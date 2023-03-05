import {useRecoilValue} from "recoil";
import {userState} from "../../store/Atom";
import {BrowserRouter} from "react-router-dom";

const Router = () => {
    const isLogin = useRecoilValue(userState).isLogin;

    return (
        <BrowserRouter>

        </BrowserRouter>
    );
}