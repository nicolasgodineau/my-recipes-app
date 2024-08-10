// lib/notion.ts
import { Client } from "@notionhq/client";
import {
    PageObjectResponse,
    QueryDatabaseResponse,
    BlockObjectResponse,
    ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionPage } from "@/app/types/notion";

// Initialiser le client Notion avec le token d'authentification
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Fonction pour récupérer les pages d'une base de données
export async function getDatabase(
    databaseId: string
): Promise<PageObjectResponse[]> {
    const response: QueryDatabaseResponse = await notion.databases.query({
        database_id: databaseId,
    });

    const pages = response.results.filter(
        (result): result is PageObjectResponse => "properties" in result
    );
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

// lib/notion.ts
//
// Interface pour représenter le titre d'une propriété Notion
export interface NotionTitleProperty {
    type: "title";
    title: NotionText[];
}

// Interface pour représenter le texte dans les blocs Notion
export interface NotionText {
    plain_text: string;
}

// Interface de base pour les blocs Notion
export interface NotionBlock {
    type: string; // Type du bloc (ex: "heading_2", "paragraph", etc.)
    [key: string]: any; // Propriétés additionnelles spécifiques à chaque type de bloc
}

// Type pour un tableau de blocs Notion
export type NotionBlocks = NotionBlock[];

// Interface spécifique pour les blocs de type "heading_2"
export interface NotionHeading2 {
    type: "heading_2"; // Type du bloc
    heading_2: {
        rich_text: NotionText[]; // Liste des textes riches dans le bloc
    };
}

// Fonction pour extraire les titres de type "heading_2" des blocs Notion
export const extractHeading2 = (blocks: NotionBlock[]): string[] => {
    return (
        blocks
            // Filtrer les blocs pour ne conserver que ceux de type "heading_2"
            .filter(
                (block): block is NotionHeading2 => block.type === "heading_2"
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

// Interface pour représenter un fichier Notion
export interface NotionFile {
    url: string; // URL du fichier
}

// Interface pour représenter une propriété de type "files"
export interface NotionFiles {
    type: "files"; // Type de la propriété
    files: NotionFile[]; // Liste des fichiers
}

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
