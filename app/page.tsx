// app/page.tsx
import { getDatabase } from "@/app/lib/notion";
import Link from "next/link";

export default async function Home() {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const recipesList = await getDatabase(databaseId);

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
        <section className="flex flex-col items-center justify-center gap-12">
            <h1 className=" flex flex-col items-start p-2 py-10 text-primary max-sm:text-4xl leading-9 lg:text-5xl font-semibold">
                <span>
                    Create delicious&nbsp; {""}
                    <span className="bg-gradient-to-b from-[#C0E1C2] to-[#C0E1C2] inline-block text-transparent bg-clip-text">
                        recipes&nbsp;
                    </span>
                </span>
                <span>regardless of your cooking experience.</span>
            </h1>
            <div className="flex flex-row gap-9">
                {uniqueMotsClesList.length > 0 ? (
                    uniqueMotsClesList.map((motCle, index) => (
                        <div
                            key={index}
                            className="bg-[#C0E1C2] text-primary py-1 px-4 rounded-full shadow-lg shadow-primary/20"
                        >
                            {motCle}
                        </div>
                    ))
                ) : (
                    <li>Aucun mot clé disponible</li>
                )}
            </div>
            <div className=" grid gap-10 sm:grid-cols-1 lg:grid-cols-3 ">
                {recipesList.map((recipes: any) => {
                    const title =
                        recipes.properties?.Nom?.title[0]?.plain_text ||
                        "Titre de la recette";
                    const srcImg =
                        recipes.properties?.Photo?.files[0]?.file.url || "";

                    return (
                        <Link
                            key={recipes.id}
                            href={`/${recipes.id}`}
                            className="max-w-sm cursor-pointer"
                        >
                            <div className="h-96 flex flex-col p-4 bg-default-200/30 dark:bg-default-100/30 w-auto rounded-2xl bg-background2/10 boxShadow">
                                <img
                                    alt={title}
                                    className="h-3/4 w-auto object-cover rounded-xl shadow-lg shadow-black/15"
                                    src={srcImg}
                                />
                                <h1 className="text-xl font-medium mt-2 text-primary py-2">
                                    {title}
                                </h1>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
