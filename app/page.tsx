// app/page.tsx
import { getDatabase } from "@/app/lib/notion";
import { GetServerSideProps } from "next";

export default async function Home() {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const database = await getDatabase(databaseId);

    return (
        <div>
            <h1>My Notion Database</h1>
            <ul>
                {database.map((page: any) => (
                    <li key={page.id}>
                        {page.properties.Nom.title[0]?.text.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}
