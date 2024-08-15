// components/StarRatingFilter.tsx
"use client";
import Link from "next/link";
import StarIcon from "@components/StarIcon";
import { Button } from "@nextui-org/react";
import { useStarRating } from "@context/StarRatingContext";

const starRatings = [1, 2, 3];
const starRatingCodes: { [key: number]: string } = {
    1: "1etoile",
    2: "2etoiles",
    3: "3etoiles",
};

const StarRatingFilter = () => {
    const { selectedRating, setSelectedRating } = useStarRating();

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {starRatings.map((rating) => (
                <Button
                    key={rating}
                    as={Link}
                    href={`/?classement=${starRatingCodes[rating]}`}
                    size="sm"
                    radius="full"
                    variant="shadow"
                    className={`${
                        selectedRating === rating
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary"
                    } text-sm flex items-center gap-1`}
                    onClick={() => setSelectedRating(rating)}
                >
                    {Array.from({ length: rating }).map((_, i) => (
                        <StarIcon
                            key={i}
                            className={`${
                                selectedRating === rating
                                    ? "fill-white"
                                    : "fill-primary"
                            }`}
                        />
                    ))}
                </Button>
            ))}
        </div>
    );
};

export default StarRatingFilter;
