// app/page.tsx
import { getDatabase } from "@/app/lib/notion";
import { GetServerSideProps } from "next";
import Link from "next/link";

export default async function Home() {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const recipesList = await getDatabase(databaseId);
    console.log("database:", recipesList);

    return (
        <section className="flex flex-col items-center justify-center gap-4 md:py-10 boxBg">
            <h1 className="max-w-xl flex flex-col items-start p-2 text-gray-800 max-sm:text-4xl leading-9 lg:text-5xl font-semibold">
                <span>
                    Create delicious&nbsp; {""}
                    <span className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] inline-block text-transparent bg-clip-text">
                        recipes&nbsp;
                    </span>
                </span>
                <span>regardless of your cooking experience.</span>
            </h1>
            <div className=" grid gap-10 py-8 sm:grid-cols-1 lg:grid-cols-2 ">
                {recipesList.slice(0, 2).map((recipes: any) => (
                    <Link
                        key={recipes.id}
                        href={`/${recipes.id}`}
                        className="max-w-sm cursor-pointer"
                    >
                        <img
                            src={recipes.properties?.Photo?.files[0]?.file.url}
                            alt={recipes.properties.Nom.title[0]?.text.content}
                        />
                        {recipes.properties.Nom.title[0]?.text.content}
                    </Link>
                ))}
            </div>
        </section>
    );
}
