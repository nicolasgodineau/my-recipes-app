// app/[id]/page.tsx
import { getPage } from "@/app/lib/notion";
import { Metadata } from "next";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);

    const extractTitle = (property: any): string => {
        // Vérifie que la propriété est de type title et qu'elle a au moins un élément
        return property?.type === "title" && property.title.length > 0
            ? property.title[0]?.plain_text || "Sans titre"
            : "Sans titre";
    };

    const titre = extractTitle(page.properties.Nom);

    return (
        <div>
            <h1>Recipe page {page.id}</h1>

            <p>{titre}</p>
        </div>
    );
}
