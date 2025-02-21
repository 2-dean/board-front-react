import React from "react";

export default function Grid({ columns, data }) {
    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                <tr>
                    {columns.map((col, index) => (
                        <th key={index} className="px-4 py-2 border text-left">
                            {col.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border">
                        {columns.map((col, colIndex) => (
                            <td key={colIndex} className="px-4 py-2 border">
                                {row[col.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
