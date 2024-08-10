// app/[id]/page.tsx
import { getPage } from "@/app/lib/notion";
import { Metadata } from "next";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);
    console.log("page:", page);

    return (
        <div>
            <h1>Recipe page {page.id}</h1>
        </div>
    );
}
