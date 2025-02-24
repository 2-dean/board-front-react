import React from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";


// 🔍 공통 검색 컴포넌트
export default function SearchForm({ fields, values, onChange, onSearch }) {
    console.log("SearchForm fields:", fields);  // ✅ fields 값 확인
    return (
        <div className="p-4 border-b flex flex-wrap gap-4">
            {fields.map((field) => (
                <div key={field.name}>  {/* ✅ key 추가 */}
                    {field.type === "input" && (
                        <Input
                            name={field.name}
                            placeholder={field.placeholder}
                            value={values[field.name] || ""}
                            onChange={onChange}
                            className="w-40"
                        />
                    )}
                    {field.type === "select" && (
                        <Select
                            name={field.name}
                            value={values[field.name] || ""}
                            onChange={onChange}
                            className="w-40"
                        >
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>  {/* ✅ key 추가 */}
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    )}
                </div>
            ))}
            <Button onClick={onSearch}>검색</Button>
        </div>
    );
}
