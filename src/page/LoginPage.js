import classes from "../style/style/LoginPage.module.css";
import LoginForm from "../components/User/LoginForm";
import {useRecoilValue} from "recoil";
import {userState} from "../store/Atom";
import Dashboard from "./Dashboard";

const LoginPage = () => {
    console.log("===================== LoginPage =====================");
    const loginUser = useRecoilValue(userState);
    console.log("loginUser ",loginUser)
        return (
            <>
            {loginUser.id !== null ?
            <section className={classes.login}>
                <Dashboard/>
            </section> : (
                <section className={classes.login}>
                    <LoginForm/>
                </section>
            )}
            </>
        );

}

export default LoginPage;
