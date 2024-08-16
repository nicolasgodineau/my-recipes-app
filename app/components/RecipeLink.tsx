import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import StarIcon from "./StarIcon";
import HeadingsDisplay from "./blocks/HeadingsDisplay";

interface Recipe {
    id: string;
    properties: {
        Nom?: {
            title?: {
                plain_text: string;
            }[];
        };
        Photo?: {
            files?: {
                file: {
                    url: string;
                };
            }[];
        };
        Classement?: {
            select?: {
                name: string;
            };
        };
        Mots_cles?: {
            type: string;
            multi_select?: {
                id: string;
                name: string;
                color: string;
            }[];
        };
    };
}

interface RecipeLinkProps {
    recipe: Recipe;
}

const RecipeLink: React.FC<RecipeLinkProps> = ({ recipe }) => {
    const title =
        recipe.properties?.Nom?.title?.[0]?.plain_text || "Titre de la recette";
    const srcImg = recipe.properties?.Photo?.files?.[0]?.file.url || "";
    const stars = recipe.properties?.Classement?.select?.name || "";
    // Accéder à tous les mots-clés
    const motsCles =
        recipe.properties?.Mots_cles?.type === "multi_select"
            ? recipe.properties.Mots_cles.multi_select?.map(
                  (option) => option.name
              ) || []
            : [];

    const starCount = stars.length / 2; // car les emojis compte pour 2 caractères

    return (
        <Button
            key={recipe.id}
            as={Link}
            href={`/${recipe.id}`}
            className="cursor-pointer h-96 w-72 max-sm:min-w-full p-4 rounded-2xl bg-background2/10 button-custom"
            style={{ display: "block", textAlign: "left", padding: "1rem" }}
        >
            <header className="h-2/4 w-auto rounded-2xl">
                <img
                    alt={title}
                    className="h-full w-full object-cover rounded-xl shadow-lg shadow-black/15"
                    src={srcImg}
                />
            </header>
            <main className="h-1/4">
                {" "}
                {/* titre de la recette */}
                <HeadingsDisplay text={title} level="h3" />
            </main>
            <footer className="h-1/4 flex flex-col justify-end gap-2">
                <div className="flex flex-row gap-2">
                    {motsCles.slice(0, 3).map((motCle, index) => (
                        <Chip
                            key={index}
                            size="lg"
                            radius="full"
                            variant="shadow"
                            className="bg-primary/10 text-primary px-3 py-1 text-sm "
                        >
                            {motCle}
                        </Chip>
                    ))}
                </div>
                <div className="h-6 flex gap-1">
                    {Array.from({ length: starCount }).map((_, i) => (
                        <StarIcon key={i} className="fill-primary" />
                    ))}
                </div>
            </footer>
        </Button>
    );
};

export default RecipeLink;
