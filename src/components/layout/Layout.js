import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../store/Atom";
import Logo from "./Logo";
import LeftMenu from "../common/LeftMenu";
import LogoutArea from "./LogoutArea";
import Tabs from "../common/Tabs";
import RequireAuth from "../common/RequireAuth"; // ✅ 추가: 탭 컴포넌트

const Layout = () => {
    const [loginUser] = useRecoilState(userState);
    console.log("[Layout] loginUser :: ", loginUser);

    const [tabs, setTabs] = useState([{ name: "대시보드", path: "/dashboard" }]); // ✅ 대시보드 기본 탭 추가
    const [activeTab, setActiveTab] = useState("/dashboard"); // ✅ 초기 활성 탭을 대시보드로 설정
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard"); // ✅ 앱 로드 시 대시보드로 이동
    }, []);

    // 🔹 메뉴 클릭 시 탭 추가 및 활성화
    const handleMenuClick = (menuItem) => {
        setTabs((prevTabs) => {
            if (prevTabs.some((tab) => tab.path === menuItem.path)) {
                return prevTabs;
            }
            return [...prevTabs, menuItem];
        });

        setActiveTab(menuItem.path);
        navigate(menuItem.path);
    };

    // 🔹 탭 클릭 시 해당 페이지 이동
    const handleTabClick = (path) => {
        setActiveTab(path);
        navigate(path);
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
                setActiveTab("/dashboard"); // ✅ 기본 탭(대시보드)로 이동
                navigate("/dashboard");
            }
        }
    };

    // 🔹 로고 클릭 시 대시보드 활성화
    const handleLogoClick = () => {
        if (!tabs.some((tab) => tab.path === "/dashboard")) {
            setTabs((prevTabs) => [...prevTabs, { name: "대시보드", path: "/dashboard" }]);
        }
        setActiveTab("/dashboard");
        navigate("/dashboard");
    };

    return (
        <Fragment>
            <div style={{ display: "flex", height: "100vh" }}>

                {loginUser.id !== null && (
                    <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
                        <Logo onClick={handleLogoClick} /> {/* ✅ 로고 클릭 시 대시보드 이동 */}
                        <LeftMenu onMenuClick={handleMenuClick} />
                        <LogoutArea />
                    </div>
                )}

                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {loginUser.id !== null && tabs.length > 0 && (
                        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} onCloseTab={handleCloseTab} />
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
