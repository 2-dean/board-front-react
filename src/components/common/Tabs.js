import React from "react";

export default function Tabs({ tabs, activeTab, onTabClick, onCloseTab }) {

    console.log("TABSTABSTABSTABSTABSTABSTABSTABS")
    return (
        <div style={{ display: "flex", borderBottom: "1px solid #ccc", padding: "5px" }}>
            {tabs.map((tab) => (
                <div
                    key={tab.path}
                    style={{
                        padding: "10px",
                        marginRight: "5px",
                        cursor: "pointer",
                        backgroundColor: activeTab === tab.path ? "#ddd" : "#f9f9f9",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={() => onTabClick(tab.path)}
                >
                    {tab.name}
                    <button
                        style={{
                            marginLeft: "8px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); // 탭 클릭 방지
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
