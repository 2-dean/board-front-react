import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useRecoilState, useResetRecoilState} from "recoil";
import {activeTabState, sidebarState, tabsState, userState} from "../../store/atom";
import LeftMenu from "../common/LeftMenu";
import Tabs from "../common/Tabs";
import {Api} from "../../api/axiosProvider";


const Layout = () => {
    {/*
        - handle~ : 이벤트 핸들러 함수 정의
        - on~ : props로 자식 컴포넌트에 이벤트 핸들러 전달
    */}

    //로그인 사용자 관련
    const [loginUser] = useRecoilState(userState);
    const loginUserReset = useResetRecoilState(userState);

    //탭 관련
    const [tabs, setTabs] = useRecoilState(tabsState);
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);
    const navigate = useNavigate();

    // ✅ 앱 로드 시 대시보드로 이동
    useEffect(() => {
        navigate("/dashboard");
    }, []);

    useEffect(() => {
        //console.log("[Layout] Outlet이 렌더링하는 컴포넌트:", activeTab);
        if (activeTab) {
            navigate(activeTab);
        }
    }, [activeTab]);

    const [collapsed] = useRecoilState(sidebarState); // ✅ 사이드바 상태 가져오기
    // 🔹 메뉴 클릭 시 탭 추가 및 활성화
    const handleMenuClick = (name, path) => {
        const menuItem = { name, path };

        setTabs((prevTabs) => {
            if (!prevTabs.some((tab) => tab.path === path)) {
                return [...prevTabs, menuItem];
            }
            return prevTabs; // 중복 방지
        });

        setActiveTab(path);
        navigate(path);
    };


    // 🔹 탭 클릭 시 해당 페이지 이동
    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    // 🔹 탭 닫기
    const handleCloseTab = (path) => {
        setTabs((prevTabs) => prevTabs.filter((tab) => tab.path !== path));

        if (activeTab === path) {
            const remainingTabs = tabs.filter((tab) => tab.path !== path);
            if (remainingTabs.length > 0) {
                setActiveTab(remainingTabs[remainingTabs.length - 1].path);
                navigate(remainingTabs[remainingTabs.length - 1].path);
            } else {
                setActiveTab("/"); // 대시보드 탭까지 닫았을경우
                navigate("/"); // 아무 화면없음
            }
        }
    };
    // 🔹 전체 탭 닫기
    const handleCloseAllTab = () => {
        setTabs([]);
        setActiveTab("/"); // 대시보드 탭까지 닫았을경우
    };
    // ** 상단 로고 클릭
    const handleLogoClick = () => {
        setTabs((prevTabs) => {
            // 대시보드 탭이 없으면 추가
            if (!prevTabs.some((tab) => tab.path === "/dashboard")) {
                return [...prevTabs, { name: "대시보드", path: "/dashboard" }];
            }
            return prevTabs;
        });

        setActiveTab("/dashboard");
        // 현재 경로가 대시보드가 아니면 이동
        if (activeTab !== "/dashboard") {
            navigate("/dashboard");
        }
    };


    // 🔹 로그아웃 함수
    const handleLogout = async () => {

        console.log("logout ===============>");
        console.log("1. LogoutApi 호출");
        try {
            await Api.post("/session/Login/actionLogin.do").then((response) => {
                //console.log("2. LogoutApi 응답옴");
                console.log(response);
                //console.log("3. localStorage AccessToken 삭제");
                localStorage.removeItem("token");
                console.log("4. Recoil userState  초기화");
                loginUserReset();
                console.log( "================ [로그아웃 결과 확인] =====================");
                console.log( "5. accessToken : " + localStorage.getItem("token"));
                let refreshToken = localStorage.getItem("token");
                console.log("6. refreshToken :" + refreshToken);
                console.log("7. loginUser ID: " + loginUser.id + ", isLogin: " + loginUser.isLogin);

                //로그인페이지로 이동
                navigate("/");

            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div style={{ display: "flex", height: "100vh" }}>

                {/* ✅ 사이드바 크기를 동적으로 변경  접힘 : 40px */}
                <LeftMenu onMenuClick={handleMenuClick} onLogoClick={handleLogoClick} onLogout={handleLogout} />

                {/* ✅ Outlet이 사이드바 크기에 맞게 자동 조절 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: collapsed ? "50px" : "60px", height: "100vh", transition: "margin-left 0.3s ease-in-out"}}>
                    {loginUser.id !== null && tabs.length > 0 && (
                        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} onCloseTab={handleCloseTab}  onCloseAllTabs={handleCloseAllTab}/>
                    )}
                    <div style={{ flex: 1 }}>
                        <Outlet />
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default Layout;
