// app/[id]/page.tsx
import {
    getPage,
    getBlocks,
    extractHeading,
    extractTitle,
    extractUrl,
    extractToDo,
    extractParagraphs,
    extractBulletedList,
    extractNumberedList,
} from "@lib/notion";
import BackButton from "@components/BackButton";
import ParagraphsDisplay from "@components/ParagraphsDisplay";
import ToDoList from "@components/ToDoList";
import BulletedList from "@components/BulletedList";
import NumberedList from "@components/NumberedList";
import HeadingsDisplay from "@components/HeadingsDisplay";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);
    const blocks = await getBlocks(pageId);
    //console.log("blocks:", blocks[2].heading_1);

    /* Gestion du titre et de l'url de l'image */
    const title = extractTitle(page.properties.Nom);
    const files = extractUrl(page);

    /* Gestion des différents type de blocs pour l'affichage */
    const headings = extractHeading(blocks);
    console.log("headings:", headings[0].text);
    //const heading2 = extractHeading2(blocks);
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
                <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex flex-col flex-grow m-2 p-4 lg:flex-grow-0 rounded-xl bg-background2/10 boxShadow">
                        <div className="p-4 w-full rounded-xl innerBoxShadow max-sm:text-center">
                            <HeadingsDisplay
                                text={headings[0].text}
                                level="h2"
                            />
                        </div>
                        <ToDoList toDos={toDos} />
                    </div>
                    <img
                        alt={title}
                        className="h-92 w-92 max-w-80 self-center object-cover m-2 p-4 lg:object-contain rounded-xl boxShadow "
                        src={files}
                    />
                </div>
                <div className="flex flex-col flex-grow m-2 p-4 lg:flex-grow-0 rounded-xl bg-background2/10 boxShadow">
                    <div className="p-4 w-full rounded-xl innerBoxShadow max-sm:text-center">
                        <HeadingsDisplay text={headings[1].text} level="h2" />
                    </div>
                    {/* Affichage des paragraphes, listes à puces et listes numérotées seulement si au moins un est présent */}
                    {(paragraphs.length > 0 ||
                        bulletedListItems.length > 0 ||
                        numberedListItems.length > 0) && (
                        <>
                            {/* Affichage des paragraphes */}
                            <ParagraphsDisplay paragraphs={paragraphs} />

                            {/* Affichage des listes à puces */}
                            <BulletedList items={bulletedListItems} />

                            {/* Affichage des listes numérotées */}
                            <NumberedList items={numberedListItems} />
                        </>
                    )}
                </div>
            </main>
        </section>
    );
}
