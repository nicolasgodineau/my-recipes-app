// useStarRating.ts
import { useState } from "react";

const useStarRating = () => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleClick = (rating: number) => {
        setSelectedRating(rating);
    };

    return { selectedRating, handleClick };
};

export default useStarRating;
