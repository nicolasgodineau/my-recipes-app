// context/StarRatingContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface StarRatingContextType {
    selectedRating: number | null;
    setSelectedRating: (rating: number | null) => void;
    resetFilter: () => void;
}

const StarRatingContext = createContext<StarRatingContextType | undefined>(
    undefined
);

export const StarRatingProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const resetFilter = () => {
        setSelectedRating(null);
    };

    return (
        <StarRatingContext.Provider
            value={{ selectedRating, setSelectedRating, resetFilter }}
        >
            {children}
        </StarRatingContext.Provider>
    );
};

export const useStarRating = () => {
    const context = useContext(StarRatingContext);
    if (!context) {
        throw new Error(
            "useStarRating must be used within a StarRatingProvider"
        );
    }
    return context;
};
