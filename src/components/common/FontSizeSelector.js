import React, { useState } from "react";

const FontSizeSelector: React.FC = () => {
    const [fontSize, setFontSize] = useState("보통");
    /* 추후에 사용자 설정값으로 변경*/
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span>글꼴크기</span>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                <option>아주작게</option>
                <option>작게</option>
                <option>보통</option>
                <option>크게</option>
            </select>
        </div>
    );
};

export default FontSizeSelector;
