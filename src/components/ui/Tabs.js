import React from "react";

export function Tabs({ children, value, onValueChange }) {
    return <div>{children}</div>;
}

export function TabsList({ children }) {
    return <div className="flex border-b">{children}</div>;
}

export function TabsTrigger({ value, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 border-b-2 border-transparent hover:border-blue-500"
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children }) {
    return <div className="p-4">{children}</div>;
}
