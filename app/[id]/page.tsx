// app/[id]/page.tsx
import { getPage, getBlocks } from "@/app/lib/notion";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const pageId = params.id;
    const page = await getPage(pageId);

    const title =
        page.properties.Nom?.title?.[0]?.text?.content || "Page Notion";

    return {
        title,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);
    const blocks = await getBlocks(pageId);

    const title =
        page.properties.Nom?.title?.[0]?.text?.content || "Sans titre";

    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}
