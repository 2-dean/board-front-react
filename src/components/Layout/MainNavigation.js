import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {boardListState, boardPageListState, userState} from "../../store/Atom";
import { getCookie } from "../../common/getAccessToken";
import { Api } from "../../api/axiosProvider";

const MainNavigation = () => {
  //로그인 사용자 관련
  const loginUser = useRecoilValue(userState);
  const loginUserReset = useResetRecoilState(userState);

  // 불러온 게시글 초기화용
  const boardPageListReset = useResetRecoilState(boardPageListState);
  const boardListReset = useResetRecoilState(boardListState);

  const boardPageList = useRecoilValue(boardPageListState);
  const boardList = useRecoilValue(boardListState);

  // Cookie 의 refreshToken 확인용
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
        localStorage.removeItem("token");

        console.log("[ MainNavigation ] 4. Recoil  초기화");
        loginUserReset();
        boardPageListReset();
        boardListReset();
        console.log(
          "\n================ [로그아웃 결과 확인] ====================="
        );
        console.log(
          "[ MainNavigation ] 5. accessToken : " + localStorage.getItem("token")
        );
        console.log("[ MainNavigation ] 6. refreshToken :" + refreshToken);
        console.log(
          "[ MainNavigation ] 7. loginUser ID: " +
            loginUser.id +
            ", isLogin: " +
            loginUser.isLogin
        );
        console.log("[ MainNavigation ] 8. boardList : " + boardList);
        console.log("[ MainNavigation ] 9. boardPageList : " + boardPageList);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
