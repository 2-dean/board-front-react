import React from "react";
import styles from "./Tabs.module.css"; // ✅ CSS 모듈 임포트

export default function Tabs({ tabs, activeTab, onTabClick, onCloseTab }) {

    console.log("========TAB========")
    console.log(tabs)
    return (
        <div style={{ display: "flex", borderBottom: "1px solid #ccc", padding: "5px" }}>
            {tabs.map((tab) => (
                <div
                    key={tab.path}
                    className={`${styles.tab} ${activeTab === tab.path ? styles.active : ""}`} // ✅ 클래스 적용
                    onClick={() => onTabClick(tab.path)}
                >
                    {tab.name}
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
        </div>
    );
}
