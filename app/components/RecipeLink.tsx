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
        <Link
            key={recipe.id}
            href={`/${recipe.id}`}
            className="cursor-pointer h-96 m-2 p-4 rounded-2xl bg-background2/10 boxShadow"
        >
            <header className="h-2/4 w-auto rounded-2xl boxShadow">
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
            <footer className="h-1/4 flex flex-col justify-end gap-2">
                <div className="flex flex-row gap-2">
                    {/* Affiche les mots-clés */}
                    {motsCles.slice(0, 3).map((motCle, index) => (
                        <span
                            key={index}
                            className=" bg-gray-200 text-primary rounded-full px-3 py-1 text-sm font-semibold shadow"
                        >
                            {motCle}
                        </span>
                    ))}
                </div>
                <div className="h-6 flex gap-2">
                    {Array.from({ length: starCount }).map((_, i) => (
                        <svg
                            key={i}
                            className="h-6 w-6 fill-primary"
                            viewBox="0 0 47.94 47.94"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <path
                                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                                  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                                  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                                  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                                  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                                  C22.602,0.567,25.338,0.567,26.285,2.486z"
                            />
                        </svg>
                    ))}
                </div>
            </footer>
        </Link>
    );
};

export default RecipeLink;
