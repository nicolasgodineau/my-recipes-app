// types/notion.ts
export interface PageProperties {
    [key: string]: {
        id: string;
        type: string;
        title?: Array<{ text: { content: string } }>;
    };
}

export interface CustomPageResponse {
    id: string;
    properties: PageProperties;
}
