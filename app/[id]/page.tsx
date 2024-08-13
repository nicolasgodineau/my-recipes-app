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
import ParagraphsDisplay from "../components/ParagraphsDisplay";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);
    //console.log("page:", page);
    const blocks = await getBlocks(pageId);
    //console.log("blocks:", blocks[26].paragraph.rich_text);

    /* Gestion du titre et de l'url de l'image */
    const title = extractTitle(page.properties.Nom);
    const files = extractUrl(page);

    /* Gestion des différents type de blocs pour l'affichage */
    const heading2 = extractHeading2(blocks);
    const toDos = extractToDo(blocks);
    const paragraphs = extractParagraphs(blocks);
    const bulletedListItems = extractBulletedList(blocks);
    const numberedListItems = extractNumberedList(blocks);

    return (
        <section className=" text-primary px-4 pb-12 lg:px-8">
            <header className="flex flex-col items-center justify-center">
                <BackButton />

                <h1 className="text-4xl font-bold text-left py-10">{title}</h1>
            </header>
            <main className="">
                <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col flex-grow m-2 p-4 lg:flex-grow-0 rounded-xl bg-background2/10 boxShadow">
                        <div className="p-4 w-full rounded-xl innerBoxShadow max-sm:text-center">
                            <h2 className="text-3xl font-semibold">
                                {heading2[0]}
                            </h2>
                        </div>
                        {toDos.length > 0 && (
                            <ul className="list-disc px-8 pb-4">
                                {toDos.map((todo, index) => (
                                    <li key={index} className=" my-2">
                                        {todo.text}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="h-92 w-92 md:max-w-96 m-auto lg:m-0 lg:flex-grow rounded-xl boxShadow shadow-black/15">
                        <img
                            alt={title}
                            className="h-full w-full object-cover lg:object-contain rounded-xl"
                            src={files}
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-grow m-2 p-4 lg:flex-grow-0 rounded-xl bg-background2/10 boxShadow">
                    <div className="p-4 w-full rounded-xl innerBoxShadow max-sm:text-center">
                        <h2 className="text-3xl font-semibold">
                            {heading2[1]}
                        </h2>
                    </div>
                    {/* Affichage des paragraphes, listes à puces et listes numérotées seulement si au moins un est présent */}
                    {(paragraphs.length > 0 ||
                        bulletedListItems.length > 0 ||
                        numberedListItems.length > 0) && (
                        <>
                            {/* Affichage des paragraphes */}
                            <ParagraphsDisplay paragraphs={paragraphs} />

                            {/* Affichage des listes à puces */}
                            {bulletedListItems.length > 0 && (
                                <ul className="list-disc pl-5 mt-8">
                                    {bulletedListItems.map((item, index) => (
                                        <li key={index} className="mb-2">
                                            {item.split("\n").map((line, i) => (
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

                            {/* Affichage des listes numérotées */}
                            {numberedListItems.length > 0 && (
                                <ol className="list-decimal pl-5 mt-8">
                                    {numberedListItems.map((item, index) => (
                                        <li key={index} className="mb-2">
                                            {item.split("\n").map((line, i) => (
                                                <p
                                                    key={i}
                                                    className="mb-1 pl-2"
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </>
                    )}
                </div>
            </main>
        </section>
    );
}
