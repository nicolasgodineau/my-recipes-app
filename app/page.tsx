// app/page.tsx
import { getDatabase } from "@lib/notion";
import RecipeLink from "@components/RecipeLink";
import FilterRecipe from "./components/FilterRecipe";

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
    searchParams: { keyword?: string | null; classement?: string | null };
}) {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const classement = getClassName(searchParams.classement ?? null);
    const selectedKeyword = searchParams.keyword ?? undefined;
    // Récupérer toutes les recettes pour obtenir tous les mots-clés
    const allRecipes = await getDatabase(databaseId, classement);

    // Extraire tous les mots-clés (indépendant du filtre)
    const motsClesList: string[] = allRecipes.flatMap((recipe) => {
        if (recipe.properties.Mots_cles?.type === "multi_select") {
            return recipe.properties.Mots_cles.multi_select.map(
                (option) => option.name
            );
        }
        return [];
    });

    // Filtrer les doublons en utilisant un Set
    const uniqueMotsClesList = Array.from(
        new Set(motsClesList.filter((name) => name !== ""))
    );

    // Appliquer le filtre sur les recettes en fonction du mot-clé sélectionné
    const filteredRecipes = selectedKeyword
        ? allRecipes.filter((recipe) => {
              const motsClesProperty = recipe.properties.Mots_cles;
              if (motsClesProperty?.type === "multi_select") {
                  return motsClesProperty.multi_select.some(
                      (option: { name: string }) =>
                          option.name === selectedKeyword
                  );
              }
              return false;
          })
        : allRecipes;

    return (
        <section className="w-full px-4">
            <header>
                <h1 className="flex flex-col items-start px-4 py-10 text-primary text-4xl leading-9 lg:text-5xl font-bold">
                    <span>
                        Créez des&nbsp; {""}
                        <span className="bg-[#74b378] text-6xl  inline-block text-transparent bg-clip-text">
                            recettes délicieuses&nbsp;
                        </span>
                    </span>
                    <span>quel que soit votre expérience en cuisine.</span>
                </h1>
            </header>
            <div></div>
            <main className="w-full flex flex-col gap-8 pt-4 items-center justify-center ">
                <FilterRecipe uniqueMotsClesList={uniqueMotsClesList} />
                <div className="w-full grid place-items-center gap-10 sm:grid-cols-1 lg:grid-cols-3 ">
                    {filteredRecipes.map((recipe) => (
                        <RecipeLink key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </main>
        </section>
    );
}
