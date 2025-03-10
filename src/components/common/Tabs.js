import React from "react";
import styles from "./Tabs.module.css";
import {activeTabState, tabsState} from "../../store/atom";
import {useRecoilValue} from "recoil"; // ✅ CSS 모듈 임포트

export default function Tabs({ onTabClick, onCloseTab, onCloseAllTabs }) {

    const tabs = useRecoilValue(tabsState)
    const activeTab = useRecoilValue(activeTabState)
    return (
        <div style={{display: "flex", borderBottom: "1px solid #ccc", padding: "5px"}}>
            {tabs.map((tab) => (
                <div
                    key={tab.path}
                    className={`${styles.tab} ${activeTab === tab.path ? styles.active : ""}`} // ✅ 클래스 적용
                    onClick={() => onTabClick(tab.path)}
                >
                    <span className={styles.tabName}>{tab.name}</span> {/* 🔹 이름과 X 버튼을 분리 */}
                    <button
                        className={styles.closeButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            onCloseTab(tab.path);
                        }}
                    >
                        ✖
                    </button>
                </div>
            ))}
            {/* 🔹 전체 닫기 버튼을 오른쪽으로 밀기 위한 Wrapper */}
            <div className={styles.closeAllWrapper}>
                <button className={styles.closeAllButton} onClick={onCloseAllTabs}>
                    ✖
                </button>
            </div>
        </div>
    );
}
