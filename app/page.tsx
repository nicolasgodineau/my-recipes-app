// app/page.tsx
import { getDatabase } from "@lib/notion";
import RecipeLink from "@components/RecipeLink";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import StarIcon from "./components/StarIcon";

const starRatings = [1, 2, 3];
const starRatingCodes: { [key: number]: string } = {
    1: "1etoile",
    2: "2etoiles",
    3: "3etoiles",
};

// Fonction pour obtenir la valeur de classement à partir de l'URL
const getClassName = (encodedClass: string | null): string => {
    if (!encodedClass) return ""; // Retourne une chaîne vide si `encodedClass` est null ou vide
    try {
        return decodeURIComponent(encodedClass);
    } catch {
        return ""; // Retourne une chaîne vide en cas d'erreur de décodage
    }
};

export default async function Home({
    searchParams,
}: {
    searchParams: { classement?: string | null };
}) {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const classement = getClassName(searchParams.classement ?? null);
    const recipesList = await getDatabase(databaseId, classement);

    // Fonction pour extraire les noms des mots clés (ne marche pas dans le fichier lib)
    const motsClesList: string[] = recipesList.flatMap((recipe) => {
        if (recipe.properties.Mots_cles?.type === "multi_select") {
            const motsCles = recipe.properties.Mots_cles;
            // Extraire les noms des options multi_select
            return motsCles.multi_select.map((option) => option.name);
        } else {
            console.error(
                "Mots_cles n'est pas de type multi_select:",
                recipe.properties.Mots_cles
            );
            return []; // Retourne un tableau vide si ce n'est pas un multi_select
        }
    });

    // Filtrer les doublons en utilisant un Set
    const uniqueMotsClesList = Array.from(
        new Set(motsClesList.filter((name) => name !== ""))
    );

    return (
        <section className="w-full px-4">
            <header>
                <h1 className="flex flex-col items-start px-4 py-10 text-primary text-4xl leading-9 lg:text-5xl font-bold">
                    <span>
                        Créez de délicieuses&nbsp; {""}
                        <span className="bg-gradient-to-b from-[#C0E1C2] to-[#C0E1C2] inline-block text-transparent bg-clip-text">
                            recettes&nbsp;
                        </span>
                    </span>
                    <span>quelle que soit votre expérience en cuisine.</span>
                </h1>
            </header>
            <div></div>
            <main className="w-full flex flex-col gap-8 pt-4 items-center justify-center ">
                <div className="max-w-5xl flex flex-col items-center flex-wrap gap-4">
                    <div className="flex flex-row flex-wrap gap-2">
                        {/* Création des liens de filtrage avec les étoiles */}
                        {starRatings.map((rating, index) => (
                            <Button
                                key={index}
                                as={Link}
                                href={`/?classement=${starRatingCodes[rating]}`}
                                size="sm"
                                radius="full"
                                variant="shadow"
                                className="bg-primary/10 text-primary text-sm flex items-center gap-1"
                            >
                                {Array.from({ length: rating }).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className="fill-primary"
                                    />
                                ))}
                            </Button>
                        ))}

                        <Button
                            as={Link}
                            href="/"
                            size="sm"
                            radius="full"
                            variant="shadow"
                            className="bg-primary/10 text-primary text-sm "
                        >
                            Reset
                        </Button>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2">
                        {uniqueMotsClesList.map((motCle, index) => (
                            <Button
                                key={index}
                                size="sm"
                                radius="full"
                                variant="shadow"
                                className="bg-primary/10 text-primary text-sm "
                            >
                                {motCle}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="grid gap-10 sm:grid-cols-1 lg:grid-cols-3 ">
                    {recipesList.map((recipe) => (
                        <RecipeLink key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </main>
        </section>
    );
}
