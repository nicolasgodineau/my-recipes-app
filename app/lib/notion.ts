// lib/notion.ts
import { Client } from "@notionhq/client";
import {
    PageObjectResponse,
    QueryDatabaseResponse,
    BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import * as NotionTypes from "@types-app/notionTypes";
import { formatText } from "@components/blocks/FormattedText";
import { convertCodeToStars } from "@lib/utils";

// Initialiser le client Notion avec le token d'authentification
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const cache = new Map<string, PageObjectResponse[]>();

export async function getDatabase(
    databaseId: string,
    classement?: string,
    selectedKeyword?: string
): Promise<PageObjectResponse[]> {
    const cacheKey = `${databaseId}-${classement || "all"}-${
        selectedKeyword || "all"
    }`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey)!;
    }

    // Filtre par défaut pour le type "Salés"
    const filters: any[] = [
        {
            property: "Types",
            select: {
                equals: "Salés",
            },
        },
    ];

    // Ajouter un filtre si le classement est spécifié
    if (classement) {
        const stars = convertCodeToStars(classement);
        filters.push({
            property: "Classement",
            select: {
                equals: stars,
            },
        });
    }

    // Ajouter un filtre pour les mots-clés si un mot-clé est sélectionné
    if (selectedKeyword) {
        filters.push({
            property: "Mots_cles", // Assurez-vous que "MotsClés" est bien le nom de la propriété multi_select dans Notion
            multi_select: {
                contains: selectedKeyword,
            },
        });
    }

    // Combiner tous les filtres
    const filter: any = {
        and: filters,
    };

    const response: QueryDatabaseResponse = await notion.databases.query({
        database_id: databaseId,
        filter,
    });

    const pages = response.results.filter(
        (result): result is PageObjectResponse => "properties" in result
    );

    cache.set(cacheKey, pages);
    return pages;
}

// Fonction pour récupérer une page spécifique
export async function getPage(pageId: string): Promise<PageObjectResponse> {
    const response = await notion.pages.retrieve({ page_id: pageId });

    // Vérifier que la réponse contient la propriété 'properties'
    if ("properties" in response) {
        return response;
    }

    throw new Error("The retrieved page is not a full page object.");
}

// Fonction pour récupérer les blocs enfants d'un bloc donné
export async function getBlocks(
    blockId: string
): Promise<BlockObjectResponse[]> {
    const response = await notion.blocks.children.list({
        block_id: blockId,
    });

    // Filtrer les résultats pour ne conserver que les objets BlockObjectResponse
    const blocks: BlockObjectResponse[] = response.results.filter(
        (result): result is BlockObjectResponse => result.object === "block"
    );

    return blocks;
}

// Fonction pour extraire les blocs entre les heading_2
export const extractSections = (
    blocks: BlockObjectResponse[]
): NotionTypes.Section[] => {
    const sections: NotionTypes.Section[] = [];
    let currentSection: NotionTypes.Section | null = null;

    blocks.forEach((block) => {
        if (block.type === "heading_2") {
            // Quand on rencontre un nouveau heading_2, on crée une nouvelle section
            if (currentSection) {
                sections.push(currentSection);
            }
            currentSection = {
                heading: block.heading_2.rich_text
                    .map((text) => text.plain_text)
                    .join(""),
                blocks: [],
            };
        } else if (currentSection) {
            // Tant qu’on est dans une section, on y ajoute les blocs suivants
            currentSection.blocks.push(block);
        }
    });

    // Ne pas oublier d'ajouter la dernière section
    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
};

// Fonction pour extraire les titres de type "heading" des blocs Notion
export const extractHeading = (
    blocks: NotionTypes.NotionBlock[]
): NotionTypes.HeadingItem[] => {
    //console.log("blocks:", blocks);
    return blocks
        .filter(
            (
                block
            ): block is
                | NotionTypes.NotionHeading1
                | NotionTypes.NotionHeading2
                | NotionTypes.NotionHeading3 =>
                block.type === "heading_1" ||
                block.type === "heading_2" ||
                block.type === "heading_3"
        )
        .map((block) => {
            let text = "";

            if (block.type === "heading_1") {
                text = block.heading_1.rich_text[0]?.plain_text || "";
            } else if (block.type === "heading_2") {
                text = block.heading_2.rich_text[0]?.plain_text || "";
            } else if (block.type === "heading_3") {
                text = block.heading_3.rich_text[0]?.plain_text || "";
            }

            return {
                text,
                type: block.type,
            };
        })
        .filter((item) => item.text !== "");
};

// Fonction pour extraire le titre d'une propriété de type "title"
export const extractTitle = (property: any): string => {
    // Vérifier que la propriété est de type "title" et qu'elle contient des éléments
    if (property?.type === "title" && property.title.length > 0) {
        // Extraire le texte du premier élément de "title"
        return property.title[0]?.plain_text || "Sans titre";
    }
    // Retourner "Sans titre" si la propriété n'est pas valide ou est vide
    return "Sans titre";
};

// Fonction pour extraire les URLs des fichiers d'une propriété "files"
export const extractUrl = (element: any): string => {
    // Vérifie si la propriété "Photo" existe et contient des fichiers
    const filesProperty = element.properties?.Photo?.files;

    if (filesProperty && filesProperty.length > 0) {
        const file = filesProperty[0];
        if (file?.type === "file") {
            return file.file.url; // Retourne l'URL du fichier
        }
    }
    return ""; // Retourne une chaîne vide si aucune URL n'est trouvée
};

// Fonction d'extraction pour les blocs "paragraph" avec mise en forme
export const extractParagraphs = (
    blocks: NotionTypes.NotionBlock[]
): { formattedText: string }[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionParagraph =>
                block.type === "paragraph"
        )
        .map((block) => ({
            // Concaténer tous les éléments rich_text avec mise en forme
            formattedText: block.paragraph.rich_text
                .map(formatText) // Utiliser la fonction formatText
                .join(""),
        }))
        .filter((item) => item.formattedText !== "");
};

// Fonction d'extraction pour les blocs "to_do" avec mise en forme
export const extractToDo = (
    blocks: NotionTypes.NotionBlock[]
): { text: string; checked: boolean }[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionToDo => block.type === "to_do"
        )
        .map((block) => ({
            text: block.to_do.rich_text.map(formatText).join(""), // Utiliser la fonction formatText
            checked: block.to_do.checked,
        }))
        .filter((item) => item.text !== "");
};

// Fonction d'extraction pour les blocs "bulleted_list_item" avec mise en forme
export const extractBulletedList = (
    blocks: NotionTypes.NotionBlock[]
): { formattedText: string }[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionBulletedList =>
                block.type === "bulleted_list_item"
        )
        .map((block) => {
            const formattedText = block.bulleted_list_item.rich_text
                .map(formatText)
                .join("");

            return { formattedText };
        })
        .filter((item) => item.formattedText !== "");
};

// Fonction d'extraction pour les blocs "numbered_list_item"
export const extractNumberedList = (
    blocks: NotionTypes.NotionBlock[]
): { formattedText: string }[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionNumberedList =>
                block.type === "numbered_list_item"
        )
        .map((block) => {
            const formattedText = block.numbered_list_item.rich_text
                .map(formatText)
                .join(""); // Concaténer les morceaux de texte formatés

            return { formattedText };
        })
        .filter((item) => item.formattedText !== "");
};

export function groupNumberedListItems(
    blocks: BlockObjectResponse[]
): { formattedText: string }[] {
    const groupedItems: { formattedText: string }[] = [];
    let currentList: { formattedText: string }[] = [];

    blocks.forEach((block) => {
        if (block.type === "numbered_list_item") {
            const formattedText = block.numbered_list_item.rich_text
                .map(formatText)
                .join("");

            // Ajouter chaque numbered_list_item au tableau final
            currentList.push({ formattedText });
        } else {
            // Si on tombe sur un bloc qui n'est pas un numbered_list_item, arrêter le groupe actuel
            if (currentList.length > 0) {
                groupedItems.push(...currentList);
                currentList = [];
            }
        }
    });

    // Ajouter les éléments restants du dernier groupe
    if (currentList.length > 0) {
        groupedItems.push(...currentList);
    }

    return groupedItems;
}

// Fonction pour extraire et filtrer les mots clés uniques
export function getUniqueMotsClesList(
    pages: NotionTypes.PageWithMultiSelect[]
): string[] {
    // Extraire tous les mots clés multi_select
    const motsClesList: string[] = pages.flatMap((recipe) => {
        if (recipe.properties.Mots_cles?.type === "multi_select") {
            const motsCles = recipe.properties.Mots_cles;
            // Extraire les noms des options multi_select
            return motsCles.multi_select.map((option) => option.name);
        } else {
            console.error(
                "Mots_cles n'est pas de type multi_select:",
                recipe.properties.Mots_cles
            );
            return []; // Retourne un tableau vide si ce n'est pas un multi_select
        }
    });

    // Filtrer les doublons en utilisant un Set
    return Array.from(new Set(motsClesList.filter((name) => name !== "")));
}
