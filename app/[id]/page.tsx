// app/[id]/page.tsx
import {
    getPage,
    getBlocks,
    extractHeading2,
    extractTitle,
} from "@/app/lib/notion";
import { Metadata } from "next";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);

    const blocks = await getBlocks(pageId);

    console.log("Page Blocks:", blocks);

    const heading2 = extractHeading2(blocks);

    const title = extractTitle(page.properties.Nom);

    return (
        <div>
            <h1>Recipe page</h1>

            <p>{title}</p>
            <h2>{heading2[0]}</h2>
        </div>
    );
}
