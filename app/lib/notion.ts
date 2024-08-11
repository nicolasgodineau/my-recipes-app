// lib/notion.ts
import { Client } from "@notionhq/client";
import {
    PageObjectResponse,
    QueryDatabaseResponse,
    BlockObjectResponse,
    ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import * as NotionTypes from "@/app/types/notion";

// Initialiser le client Notion avec le token d'authentification
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const cache = new Map<string, PageObjectResponse[]>();

export async function getDatabase(
    databaseId: string,
    classement?: string
): Promise<PageObjectResponse[]> {
    const cacheKey = `${databaseId}-${classement || "all"}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey)!;
    }

    const filter: any = {
        property: "Types",
        select: {
            equals: "Salés",
        },
    };

    if (classement) {
        filter.property = "Classement";
        filter.select = {
            equals: classement,
        };
    }

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

// Fonction pour extraire les titres de type "heading_2" des blocs Notion
export const extractHeading2 = (
    blocks: NotionTypes.NotionBlock[]
): string[] => {
    return (
        blocks
            // Filtrer les blocs pour ne conserver que ceux de type "heading_2"
            .filter(
                (block): block is NotionTypes.NotionHeading2 =>
                    block.type === "heading_2"
            )
            // Extraire le texte riche du bloc et récupérer le plain_text
            .map((block) => block.heading_2.rich_text[0]?.plain_text)
            // Filtrer les valeurs falsy pour ne conserver que les chaînes de caractères non vides
            .filter(Boolean)
    );
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

// Fonction d'extraction pour les blocs "to_do"
export const extractToDo = (
    blocks: NotionTypes.NotionBlock[]
): { text: string; checked: boolean }[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionToDo => block.type === "to_do"
        )
        .map((block) => ({
            text: block.to_do.rich_text[0]?.plain_text || "",
            checked: block.to_do.checked,
        }))
        .filter((item) => item.text !== "");
};

// Fonction d'extraction pour les blocs "bulleted_list_item"
export const extractBulletedList = (
    blocks: NotionTypes.NotionBlock[]
): string[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionBulletedList =>
                block.type === "bulleted_list_item"
        )
        .map((block) => block.bulleted_list_item.rich_text[0]?.plain_text || "")
        .filter((text) => text !== "");
};

// Fonction d'extraction pour les blocs "numbered_list_item"
export const extractNumberedList = (
    blocks: NotionTypes.NotionBlock[]
): string[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionNumberedList =>
                block.type === "numbered_list_item"
        )
        .map((block) => block.numbered_list_item.rich_text[0]?.plain_text || "")
        .filter((text) => text !== "");
};

// Fonction d'extraction pour les blocs "paragraph"
export const extractParagraphs = (
    blocks: NotionTypes.NotionBlock[]
): { text: string }[] => {
    return blocks
        .filter(
            (block): block is NotionTypes.NotionParagraph =>
                block.type === "paragraph"
        )
        .map((block) => ({
            // Concaténer tous les éléments rich_text pour former le texte complet du paragraphe
            text:
                block.paragraph.rich_text
                    .map((richText) => richText.plain_text)
                    .join("") || "",
        }))
        .filter((item) => item.text !== "");
};

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
