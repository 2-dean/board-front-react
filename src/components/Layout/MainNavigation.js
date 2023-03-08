import {Link} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {tokenState, userState} from "../../store/Atom";
import {getCookie} from "../../common/getAccessToken";
import {Api} from "../../api/axiosProvider";

const MainNavigation = () => {
  const loginUser = useRecoilValue(userState);
  const loginUserReset = useResetRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const refreshToken = getCookie("refreshToken");



  const logout = async (event) => {
        event.preventDefault();
        alert("logout 클릭");
        console.log("[ MainNavigation ] logout ===============>");

          console.log("[ MainNavigation ] 1. LogoutApi 호출");
          try {
              await Api.post("/logout").then((response) => {
                  console.log("[ MainNavigation ] 2. LogoutApi 응답옴");
                  console.log(response);

                  console.log("[ MainNavigation ] 3. localStorage AccessToken 삭제");
                  setToken(null);
                  localStorage.removeItem("token");

                  console.log("[ MainNavigation ] 4. Recoil userState 초기화");
                  loginUserReset();

                  console.log("\n================[로그아웃 결과 확인]=====================")
                  console.log("[ MainNavigation ] localStorage AccessToken : " + localStorage.getItem("token"));
                  console.log("[ MainNavigation ] refreshToken :" + refreshToken);
                  console.log("[ MainNavigation ] loginUser ID: " + loginUser.id + ", isLogin: " +  loginUser.isLogin);
              })
          } catch (error) {
              console.log(error);
          }
    };

   /* Api.post("/logout")
        .then((response) => {
          console.log("[ LogoutApi ] 2. /logout API 응답 옴 ");
          console.log(response);
        })
        .catch((error) => {
          alert("[ LogoutApi ERROR ]\n" + error);
        });*/



  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>ElasticWorks 2dean</div>
      </Link>
      <nav>
        <ul>
          {!loginUser.isLogin && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {loginUser.isLogin && (
            <li>
              <Link to="/boards">Board</Link>
            </li>
          )}
          {loginUser.isLogin && (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
