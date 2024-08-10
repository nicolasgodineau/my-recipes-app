// app/[id]/page.tsx
import { getPage } from "@/app/lib/notion";
import { Metadata } from "next";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);

    return (
        <div>
            <h1>Recipe page</h1>
        </div>
    );
}
