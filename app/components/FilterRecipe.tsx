"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import StarRatingSelector from "./StarRatingSelector";
import { Button } from "@nextui-org/react";
import { useStarRating } from "@context/StarRatingContext";
import KeywordSelector from "./KeywordsSelector";

// Définition du type des props
type FilterRecipeProps = {
    uniqueMotsClesList: string[];
};

const FilterRecipe: React.FC<FilterRecipeProps> = ({ uniqueMotsClesList }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        if (contentRef.current) {
            if (isOpen) {
                // Fermeture
                contentRef.current.style.maxHeight = "0px";
            } else {
                // Ouverture
                contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
            }
        }
        setIsOpen(!isOpen);
    };

    const { resetFilter } = useStarRating();

    return (
        <div className="w-full flex flex-col items-center flex-wrap rounded-2xl bg-background2/10 boxShadow2">
            {/* Titre de l'accordéon avec un bouton NextUI */}
            <Button
                onPress={toggleAccordion}
                size="sm"
                variant="light"
                radius="md"
                className="w-full text-primary font-bold text-lg"
            >
                {isOpen ? "Masquer les filtres" : "Afficher les filtres"}
            </Button>
            {/* Contenu de l'accordéon */}
            <div
                ref={contentRef}
                className="w-full max-h-0 overflow-hidden transition-[max-height] duration-500 ease-in-out"
            >
                <div className="w-full flex flex-col items-center flex-wrap gap-4 py-4">
                    <div className="flex flex-row flex-wrap gap-2">
                        {/* Filtrage avec les étoiles */}
                        <StarRatingSelector />
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 mt-4">
                        <KeywordSelector keywords={uniqueMotsClesList} />
                        {/* {uniqueMotsClesList.map((motCle, index) => (
                            <Button
                                key={index}
                                size="sm"
                                radius="full"
                                variant="shadow"
                                className="bg-primary/10 text-primary text-sm"
                            >
                                {motCle}
                            </Button>
                        ))} */}
                    </div>
                    {/* Bouton "Reset" */}
                    <Button
                        as={Link}
                        href="/"
                        size="sm"
                        radius="full"
                        variant="ghost"
                        color="primary"
                        className="bg-primary/10 text-primary text-sm mt-4"
                        onPress={resetFilter}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FilterRecipe;
