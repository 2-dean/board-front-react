import {Button} from "../ui/Button";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {userState} from "../../store/Atom";
import {useNavigate} from "react-router";
import {Api} from "../../api/axiosProvider";


const LogoutArea = ()=> {
    //로그인 사용자 관련
    const loginUser = useRecoilValue(userState);
    const loginUserReset = useResetRecoilState(userState);
    // 페이지 이동
    const navigate = useNavigate();

    const logout = async (event) => {
        event.preventDefault();

        alert("logout 클릭");
        console.log("[ MainNavigation ] logout ===============>");

        console.log("[ MainNavigation ] 1. LogoutApi 호출");

        try {
            await Api.post("/session/Login/actionLogin.do").then((response) => {
                console.log("[ MainNavigation ] 2. LogoutApi 응답옴");
                console.log(response);

                console.log("[ MainNavigation ] 3. localStorage AccessToken 삭제");
                localStorage.removeItem("token");

                console.log("[ MainNavigation ] 4. Recoil  초기화");
                loginUserReset();

                console.log(
                    "\n================ [로그아웃 결과 확인] ====================="
                );
                console.log(
                    "[ MainNavigation ] 5. accessToken : " + localStorage.getItem("token")
                );
                //console.log("[ MainNavigation ] 6. refreshToken :" + refreshToken);
                console.log(
                    "[ MainNavigation ] 7. loginUser ID: " +
                    loginUser.id +
                    ", isLogin: " +
                    loginUser.isLogin
                );


                navigate("/")

            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="sidebar-footer">
            <button  onClick={logout}>로그아웃</button>
        </div>
    );


};

export default LogoutArea