import React, {useEffect, useState} from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {sidebarState, userState} from "../../store/Atom";
import styles from "./LeftMenu.module.css";
import Logo from "../layout/Logo";

const menuData = [
    { id: 1, name: "기준정보", path: "", menu_level: 1, sort_seq: 1 },
    { id: 3, name: "기사", path: "/bm/drv", menu_level: 2, sort_seq: 1, parent_id: 1 },
    { id: 4, name: "차량", path: "/bm/vhcl", menu_level: 2, sort_seq: 2, parent_id: 1 },
    { id: 2, name: "환경설정", path: "", menu_level: 1, sort_seq: 2 },
    { id: 5, name: "사용자", path: "/em/user", menu_level: 2, sort_seq: 1, parent_id: 2 },
    { id: 6, name: "권한", path: "", menu_level: 2, sort_seq: 2, parent_id: 2 },
    { id: 7, name: "권한그룹", path: "/em/auth-group", menu_level: 3, sort_seq: 1, parent_id: 6 },
    { id: 8, name: "메뉴권한", path: "/em/auth-menu", menu_level: 3, sort_seq: 2, parent_id: 6 },
];

// 🔹 트리 구조 생성 함수
const buildTree = (menuList, parentId = undefined) => {
    return menuList
        .filter((item) => item.parent_id === parentId)
        .map((item) => ({
            ...item,
            children: buildTree(menuList, item.id),
        }));
};

const treeMenu = buildTree(menuData);

const LeftMenu = ({ onMenuClick, onLogoClick, onLogout}) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useRecoilState(sidebarState);
    
    // ✅ 로그인 상태 관련
    const loginUser = useRecoilValue(userState);
    const loginUserReset = useResetRecoilState(userState);

 
    return (
        <div className={`${styles.sidebarContainer} ${collapsed ? styles.collapsed : ""}`}>
            {/* ✅ 사이드바 토글 버튼 */}
            <button className={`${styles.toggleButton} ${collapsed ? styles.collapsed : styles.expanded}`}
                    onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? "▶" : "◀"}
            </button>

            {/* 🔹 상단 로고 */}
            <div className={""}>
                <Logo small={collapsed} onClick={onLogoClick}/>
            </div>

            {/* ✅ 메뉴 렌더링 */}
            <Sidebar collapsed={collapsed} className={styles.sidebar} width={collapsed ? "40px" : "180px"}>
                <Menu className={styles.menu}>
                    {treeMenu.map((menu) =>
                        menu.children.length > 0 ? (
                            <SubMenu key={menu.id} label={<div className={styles.menuItem}><span className={styles.menuItemText}>{menu.name}</span></div>}>
                                {menu.children.map((child) =>
                                    child.children.length > 0 ? (
                                        <SubMenu key={child.id} label={<div className={styles.menuItem}><span className={styles.menuItemText}>{child.name}</span></div>}>
                                            {child.children.map((subChild) => (
                                                <MenuItem key={subChild.id} onClick={() => onMenuClick(subChild.name, subChild.path)}>
                                                    <div className={styles.menuItem}>
                                                        <span className={styles.menuItemText}>{subChild.name}</span>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </SubMenu>
                                    ) : (
                                        <MenuItem key={child.id} onClick={() => onMenuClick(child.name, child.path)}>
                                            <div className={styles.menuItem}>
                                                <span className={styles.menuItemText}>{child.name}</span>
                                            </div>
                                        </MenuItem>
                                    )
                                )}
                            </SubMenu>
                        ) : (
                            <MenuItem key={menu.id} onClick={() => onMenuClick(menu.name, menu.path)}>
                                <div className={styles.menuItem}>
                                    <span className={styles.menuItemText}>{menu.name}</span>
                                </div>
                            </MenuItem>
                        )
                    )}
                </Menu>
            </Sidebar>

            {/* 🔹 하단 로그아웃 버튼 */}
            <div className={styles.bottomContainer}>
                <button className={styles.logoutButton} onClick={onLogout}>
                    {collapsed ? "🔒" : "로그아웃"}
                </button>
            </div>
        </div>
    );
};

export default LeftMenu;
