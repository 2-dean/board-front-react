import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../store/Atom";
import Logo from "./Logo";
import LeftMenu from "../common/LeftMenu";
import LogoutArea from "./LogoutArea";
import Tabs from "../common/Tabs";


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
        console.log("탭닫음 ", path)
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

    const handleLogoClick = () => {
        console.log('로고클릭')
        setTabs((prevTabs) => {
            // 대시보드 탭이 없으면 추가
            if (!prevTabs.some((tab) => tab.path === "/dashboard")) {
                return [...prevTabs, { name: "대시보드", path: "/dashboard" }];
            }
            return prevTabs;
        });

        setActiveTab("/dashboard");
        console.log('로고클릭2');
        // 현재 경로가 대시보드가 아니면 이동
        if (activeTab !== "/dashboard") {
            navigate("/dashboard");
        }
        console.log('로고클릭3')
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
