// StarRatingSelector.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import StarIcon from "@components/StarIcon";
import { Button } from "@nextui-org/react";

const starRatings = [1, 2, 3];
const starRatingCodes: { [key: number]: string } = {
    1: "1etoile",
    2: "2etoiles",
    3: "3etoiles",
};

const StarRatingFilter = () => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    console.log("selectedRating:", selectedRating);

    const resetFilter = () => {
        setSelectedRating(null);
    };

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {starRatings.map((rating, index) => (
                <Button
                    key={index}
                    as={Link}
                    href={`/?classement=${starRatingCodes[rating]}`}
                    size="sm"
                    radius="full"
                    variant="shadow"
                    className={`${
                        selectedRating === rating
                            ? "bg-primary"
                            : "bg-primary/10"
                    } text-sm flex items-center gap-1`}
                    onClick={() => setSelectedRating(rating)}
                >
                    {Array.from({ length: rating }).map((_, i) => (
                        <StarIcon
                            key={i}
                            className={`${
                                selectedRating === rating
                                    ? "fill-background2/80"
                                    : "fill-primary"
                            } text-sm flex items-center gap-1`}
                        />
                    ))}
                </Button>
            ))}

            {/* Bouton "Reset" */}
            <Button
                as={Link}
                href="/"
                size="sm"
                radius="full"
                variant="shadow"
                className="bg-primary/10 text-primary text-sm"
                onClick={resetFilter}
            >
                Reset
            </Button>
        </div>
    );
};

export default StarRatingFilter;
