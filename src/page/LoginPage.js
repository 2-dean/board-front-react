import classes from "./style/LoginPage.module.css";
import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
    console.log("===================== LoginPage =====================");

        return (
            <section className={classes.login}>
               <LoginForm />
            </section>
        );
    }

    export default LoginPage;
