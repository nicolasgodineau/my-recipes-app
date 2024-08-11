// app/[id]/page.tsx
import {
    getPage,
    getBlocks,
    extractHeading2,
    extractTitle,
    extractUrl,
    extractToDo,
    extractParagraphs,
    extractBulletedList,
    extractNumberedList,
} from "@/app/lib/notion";
import BackButton from "../components/BackButton";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);
    const blocks = await getBlocks(pageId);

    /* Gestion du titre et de l'url de l'image */
    const title = extractTitle(page.properties.Nom);
    const files = extractUrl(page);

    /* Gestion des différents type de blocs pour l'affichage */
    const heading2 = extractHeading2(blocks);
    const toDos = extractToDo(blocks);
    console.log("toDos:", toDos);
    const paragraphs = extractParagraphs(blocks);
    const bulletedListItems = extractBulletedList(blocks);
    const numberedListItems = extractNumberedList(blocks);

    return (
        <div className="flex flex-col gap-10 min-h-screen p-4 text-primary">
            <BackButton />

            <h1 className="text-4xl font-bold mb-4 text-primary">{title}</h1>
            <img
                alt={title}
                className="h-52 w-auto object-cover rounded-xl shadow-lg shadow-black/15"
                height={200}
                src={files}
                width="100%"
            />
            <div className="flex flex-col px-4 py-8 rounded-xl bg-background2/10 boxShadow">
                <div className="p-4 rounded-xl innerBoxShadow max-sm:text-center">
                    <h2 className="text-3xl font-semibold">{heading2[0]}</h2>
                </div>
                {toDos.length > 0 && (
                    <div className="mt-8">
                        <ul>
                            {toDos.map((todo, index) => (
                                <li key={index} className=" mb-2 pl-2">
                                    {todo.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex flex-col px-4 py-8 rounded-xl bg-background2/10 boxShadow">
                <div className="p-4 rounded-xl innerBoxShadow max-sm:text-center">
                    <h2 className="text-3xl font-semibold">{heading2[1]}</h2>
                </div>
                {(paragraphs.length > 0 || numberedListItems.length > 0) && (
                    <div className="mt-8">
                        {/* Affichage des paragraphes */}
                        {paragraphs.length > 0 && (
                            <ul className="flex flex-col gap-3">
                                {paragraphs.map((para, index) => (
                                    <li key={index} className="mb-2">
                                        {para.text
                                            .split("\n")
                                            .map((line, i) => (
                                                <p
                                                    key={i}
                                                    className="mb-1 pl-2"
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {numberedListItems.length > 0 && (
                            <ol className="list-decimal pl-5">
                                {numberedListItems.map((item, index) => (
                                    <li key={index} className="mb-2">
                                        {item.split("\n").map((line, i) => (
                                            <span key={i} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
