// app/[id]/page.tsx
import { getPage } from "@/app/lib/notion";
import { Metadata } from "next";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);

    const extractTitle = (property: any): string => {
        // Assurer que la propriété est de type title
        if (property?.type === "title" && property.title.length > 0) {
            console.log("property:", property);
            return property.title[0]?.plain_text || "Sans titre";
        }
        return "Sans titre";
    };

    return (
        <div>
            <h1>Recipe page {page.id}</h1>

            <p>{extractTitle(page.properties.Nom)}</p>
        </div>
    );
}
