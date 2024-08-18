// app/[id]/page.tsx
import {
    getPage,
    getBlocks,
    extractTitle,
    extractUrl,
    extractSections,
} from "@lib/notion";
import BackButton from "@components/BackButton";
import HeadingsDisplay from "@/app/components/blocks/HeadingsDisplay";
import InformationRecipeDisplay from "../components/InformationRecipeDisplay";

export default async function Page({ params }: { params: { id: string } }) {
    const pageId = params.id;
    const page = await getPage(pageId);
    const blocks = await getBlocks(pageId);
    // console.log("blocks:", blocks[17].numbered_list_item.rich_text[0].text);

    /* Gestion des blocks apres les H2 */
    const sections = extractSections(blocks);

    /* Gestion du titre et de l'url de l'image */
    const title = extractTitle(page.properties.Nom);
    const files = extractUrl(page);

    return (
        <section className=" text-primary px-4 pb-12 lg:px-8">
            <header className="flex flex-col items-center justify-center">
                <BackButton />

                <h1 className="text-4xl font-bold text-left py-10">{title}</h1>
            </header>
            <main className="">
                <div className="flex flex-col-reverse lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex flex-col flex-grow m-2 p-4 lg:flex-grow-0 rounded-xl bg-background2/10 boxShadow">
                        {/* zone ingrédients */}
                        <div className="p-4 w-full max-sm:text-center">
                            <HeadingsDisplay
                                text={sections[0].heading}
                                level="h2"
                            />
                        </div>
                        <InformationRecipeDisplay text={sections[0].blocks} />
                    </div>
                    <img
                        alt={title}
                        className="h-92 w-92 max-w-80 self-center object-cover m-2 p-4 lg:object-contain rounded-xl boxShadow "
                        src={files}
                    />
                </div>
                <div className="flex flex-col flex-grow m-2 p-4 lg:flex-grow-0 rounded-xl bg-background2/10 boxShadow">
                    {/* zone préparation */}
                    <div className="p-4 w-full max-sm:text-center">
                        <HeadingsDisplay
                            text={sections[1].heading}
                            level="h2"
                        />
                    </div>
                    <InformationRecipeDisplay text={sections[1].blocks} />
                </div>
            </main>
        </section>
    );
}
