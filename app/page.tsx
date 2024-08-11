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

    console.log("Liste des mots clés uniques:", uniqueMotsClesList);

    return (
        <section className="flex flex-col items-center justify-center gap-4 md:py-10 boxBg">
            <h1 className=" flex flex-col items-start p-2 text-gray-800 max-sm:text-4xl leading-9 lg:text-5xl font-semibold">
                <span>
                    Create delicious&nbsp; {""}
                    <span className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] inline-block text-transparent bg-clip-text">
                        recipes&nbsp;
                    </span>
                </span>
                <span>regardless of your cooking experience.</span>
            </h1>
            <ul>
                {uniqueMotsClesList.length > 0 ? (
                    uniqueMotsClesList.map((motCle, index) => (
                        <li key={index} className="text-lg">
                            {motCle}
                        </li>
                    ))
                ) : (
                    <li>Aucun mot clé disponible</li>
                )}
            </ul>
            <div className=" grid gap-10 py-8 sm:grid-cols-1 lg:grid-cols-2 ">
                {recipesList.slice(0, 2).map((recipes: any) => {
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
                            <div className="flex flex-col p-4 bg-default-200/30 dark:bg-default-100/30 w-full h-auto rounded-2xl bg-primary boxShadow">
                                <img
                                    alt={title}
                                    className="h-full w-full object-cover rounded-xl shadow-lg shadow-black/15"
                                    height={200}
                                    src={srcImg}
                                    width="100%"
                                />
                                <h1 className="text-xl font-medium mt-2 text-[#595959] py-2">
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
