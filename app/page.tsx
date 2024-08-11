// app/page.tsx
import { getDatabase, extractKeywords } from "@/app/lib/notion";

import Link from "next/link";

export default async function Home() {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const recipesList = await getDatabase(databaseId);

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
