"use client";
import React, { createContext, useContext, useState } from "react";

interface KeywordContextType {
    selectedKeyword: string | null;
    setSelectedKeyword: (keyword: string | null) => void;
    resetFilter: () => void;
}

const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

export const KeywordProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

    const resetFilter = () => {
        setSelectedKeyword(null);
    };

    return (
        <KeywordContext.Provider
            value={{ selectedKeyword, setSelectedKeyword, resetFilter }}
        >
            {children}
        </KeywordContext.Provider>
    );
};

export const useKeyword = () => {
    const context = useContext(KeywordContext);
    if (!context) {
        throw new Error("useKeyword must be used within a KeywordProvider");
    }
    return context;
};
