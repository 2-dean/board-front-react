import React, {useEffect, useState} from "react";
import Popup from "./Popup";
import styles from "./SearchBar.module.css"; // ✅ CSS 모듈 import

// 🔍 공통 검색 컴포넌트
export default function SearchBar({ fields, values, setValues }) {
    /*
    values 상태를 SearchBar 내부에서 관리하지 않고 부모에서 전달받음
    setValues 함수도 부모에서 내려받아 값을 부모가 업데이트하도록 함
    * */
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 검색조건 변경시 값 저장
    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        // SearchBar가 렌더링될 때  default: true인 값을 자동으로 values에 설정함.
        const initialValues = { ...values };
        fields.forEach((field) => {
            if (field.type === "radio") {
                const defaultOption = field.options.find((option) => option.default);
                if (defaultOption && !values[field.name]) {
                    initialValues[field.name] = defaultOption.value;
                }
            }
        });
        setValues(initialValues);
    }, [fields, setValues]);


    return (
        <div className={styles["search-bar"]}>
            {fields.map((field) => (

                <div key={field.name} className={styles["search-field"]}>
                    {/* Label */}
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
