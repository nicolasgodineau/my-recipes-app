import React from "react";
import Link from "next/link";

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

    return (
        <Link
            key={recipe.id}
            href={`/${recipe.id}`}
            className="cursor-pointer h-96 m-2 p-4 rounded-2xl bg-background2/10 boxShadow"
        >
            <header className="h-3/5 w-auto rounded-2xl boxShadow">
                <img
                    alt={title}
                    className="h-full w-full object-cover rounded-xl boxShadow shadow-black/15"
                    src={srcImg}
                />
            </header>
            <main className="h-1/4">
                <h1 className="text-xl font-medium text-primary pt-4">
                    {title}
                </h1>
            </main>
            <footer className="h-1/6 flex flex-col justify-end">
                <h2>{stars}</h2>
            </footer>
        </Link>
    );
};

export default RecipeLink;
