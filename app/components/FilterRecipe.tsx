"use client";

import React, { useRef } from "react";
import Link from "next/link";
import StarRatingSelector from "./StarRatingSelector";
import { Button } from "@nextui-org/react";
import { useStarRating } from "@context/StarRatingContext";

// Définition du type des props
type FilterRecipeProps = {
    uniqueMotsClesList: string[];
};

const FilterRecipe: React.FC<FilterRecipeProps> = ({ uniqueMotsClesList }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (contentRef.current) {
            if (e.target.checked) {
                // Ouverture
                contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
            } else {
                // Fermeture
                contentRef.current.style.maxHeight = "0px";
            }
        }
    };
    const { resetFilter } = useStarRating();

    return (
        <div className="w-full flex flex-col items-center flex-wrap p-2 rounded-2xl bg-background2/10 boxShadow">
            {/* Titre de l'accordéon */}
            <label
                htmlFor="accordion-toggle"
                className="w-full text-center cursor-pointer"
            >
                <p className="text-lg text-primary font-bold">Filter</p>
            </label>
            {/* Checkbox masqué pour gérer l'état */}
            <input
                type="checkbox"
                id="accordion-toggle"
                className="hidden peer"
                onChange={toggleAccordion}
            />
            {/* Contenu de l'accordéon */}
            <div
                ref={contentRef}
                className="w-full max-h-0 overflow-hidden transition-[max-height] duration-500 ease-in-out"
            >
                <div className="flex flex-row flex-wrap gap-2">
                    {/* Filtrage avec les étoiles */}
                    <StarRatingSelector />
                </div>
                <div className="flex flex-row flex-wrap gap-2 mt-4">
                    {uniqueMotsClesList.map((motCle, index) => (
                        <Button
                            key={index}
                            size="sm"
                            radius="full"
                            variant="shadow"
                            className="bg-primary/10 text-primary text-sm"
                        >
                            {motCle}
                        </Button>
                    ))}
                </div>
                {/* Bouton "Reset" */}
                <Button
                    as={Link}
                    href="/"
                    size="sm"
                    radius="full"
                    variant="shadow"
                    className="bg-primary/10 text-primary text-sm mt-4"
                    onClick={resetFilter}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default FilterRecipe;
