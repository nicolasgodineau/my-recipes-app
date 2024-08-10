// app/[id]/page.tsx
import {
    getPage,
    getBlocks,
    extractHeading2,
    extractTitle,
    extractUrl,
} from "@/app/lib/notion";
import BackButton from "../components/BackButton";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);

    const blocks = await getBlocks(pageId);

    const files = extractUrl(page);

    const heading2 = extractHeading2(blocks);

    const title = extractTitle(page.properties.Nom);

    return (
        <div className="flex flex-col gap-10 min-h-screen p-4 ">
            <BackButton />

            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <img
                alt={title}
                className="h-52 w-auto object-cover rounded-xl shadow-lg shadow-black/15"
                height={200}
                src={files}
                width="100%"
            />
            <div className="p-6 rounded-xl innerBoxShadow max-sm:text-center">
                <h2 className="text-3xl font-semibold">{heading2[0]}</h2>
            </div>

            <div className="p-6 rounded-xl innerBoxShadow max-sm:text-center">
                <h2 className="text-3xl font-semibold">{heading2[1]}</h2>
            </div>
        </div>
    );
}
