/*공통버튼*/
import React from "react";


const CommonButtons= ({ onSearch, onReset, onSave }) => {

    return (
        <div style={{ display: "flex", gap: "5px" }}>
            <button title="새로고침" onClick={ onReset }>🔄</button>
            <button title="검색" onClick={ onSearch }>🔍</button>
            <button title="저장"  onClick={ onSave }>💾</button>
        </div>
    );
};

export default CommonButtons;
