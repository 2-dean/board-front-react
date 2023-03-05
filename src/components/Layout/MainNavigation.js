import {Link} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {tokenState, userState} from "../../store/Atom";
import {LogoutApi} from "../../api/LogoutApi";
import {getCookie} from "../../common/getAccessToken";

const MainNavigation = () => {
    const loginUser = useRecoilValue(userState);
    const loginUserReset = useResetRecoilState(userState);
    const [token, setToken] = useRecoilState(tokenState);
    const refreshToken = getCookie("refreshToken");


    const logout = (event) => {
        event.preventDefault();
        alert("logout 클릭");
        console.log("logout===============>")

        setToken(null);
        localStorage.removeItem("token");
        console.log("[ logout ] refreshToken :" + refreshToken);
        console.log("[ logout ] localStorage token : " + localStorage.getItem("token"))
        loginUserReset();
        console.log("[ logout ] loginUser : " + loginUser);
        LogoutApi();
    }


    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>Home</div>
            </Link>
            <nav>
                <ul>
                    {!loginUser.isLogin &&
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    }
                   {/* {loginUser.isLogin && (
                        <li>
                            <Link to="/my-page">My Page</Link>
                        </li>
                    )}*/}
                    {loginUser.isLogin &&
                        <li>
                            <Link to="/board">Board</Link>
                        </li>
                    }
                    {loginUser.isLogin &&
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );

};

export default  MainNavigation;