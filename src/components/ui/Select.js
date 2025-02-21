import React from "react";

export function Select({ options, value, onChange, className = "" }) {
    return (
        <select value={value} onChange={onChange} className={`px-3 py-2 border rounded ${className}`}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
