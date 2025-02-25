import React from "react";

export default function Popup({ onClose }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2>소유자 검색</h2>
                <p>여기에 검색 로직 추가</p>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}
