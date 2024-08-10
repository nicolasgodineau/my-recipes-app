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

    // Filtrer les résultats pour s'assurer qu'ils sont tous des objets de page complets
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
