// lib/notion.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getDatabase(databaseId: string) {
    const response = await notion.databases.query({ database_id: databaseId });
    return response.results;
}

export async function getPage(pageId: string) {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
}

export async function getBlocks(blockId: string) {
    const response = await notion.blocks.children.list({ block_id: blockId });
    return response.results;
}
