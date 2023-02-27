import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {userAuthState, userState} from "../../store/Atom";
import {LogoutApi} from "../../api/LogoutApi";
import {useNavigate} from "react-router";

const MainNavigation = () => {
    const loginUser = useRecoilValue(userState);
    const userLogout = useResetRecoilState(userState);

    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        alert("logout 클릭");

        console.log("[ logoutAPI ] 요청");
        LogoutApi();

        console.log("[ userState ] 초기화");
        userLogout();

        console.log("[ navigate ] 실행")
        //navigate("/");
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
                    {loginUser.isLogin && (
                        <li>
                            <Link to="/my-page">My Page</Link>
                        </li>
                    )}
                    {loginUser.isLogin &&
                        <li>
                            <Link to="/Board">Board</Link>
                        </li>
                    }
                    {loginUser.isLogin &&
                        <li>
                            <Link to="/" onClick={logout}>Logout</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );

};

export default  MainNavigation;