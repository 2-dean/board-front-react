import React, { useState } from "react";
import Popup from "./Popup";
import styles from "./SearchBar.module.css"; // ✅ CSS 모듈 import

// 🔍 공통 검색 컴포넌트
export default function SearchBar({ fields }) {
    const [values, setValues] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    console.log(fields)
    return (
        <div className={styles["search-bar"]}> {/* ✅ CSS 적용 */}
            {fields.map((field) => (

                <div key={field.name} className={styles["search-field"]}>
                    {/* ✅ Label 추가 */}
                    <label className={styles["search-label"]} htmlFor={field.name}>
                        {field.label}
                    </label>

                    {field.type === "input" && (
                        <input
                            id={field.name} // ✅ label과 연결
                            name={field.name}
                            placeholder={field.placeholder}
                            value={values[field.name] || ""}
                            onChange={handleChange}
                        />
                    )}

                    {field.type === "select" && (
                        <select
                            id={field.name} // ✅ label과 연결
                            name={field.name}
                            value={values[field.name] || ""}
                            onChange={handleChange}
                        >
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}

                    {field.type === "radio" && (
                        <div>
                            {field.options.map((option) => (
                                <label key={option.value}>
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={option.value}
                                        checked={values[field.name] === option.value}
                                        onChange={handleChange}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )}

                    {field.type === "popup" && (
                        <>
                            <button onClick={() => setIsPopupOpen(true)}>
                                {field.buttonLabel}
                            </button>
                            {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
