// types/notion.ts
export interface NotionText {
    text: {
        content: string;
    };
}

export interface NotionTitleProperty {
    type: "title";
    title: NotionText[];
}

export interface NotionPageProperties {
    Nom?: NotionTitleProperty;
    // Ajoute d'autres propriétés ici si nécessaire
}

export interface NotionPage {
    id: string;
    properties: NotionPageProperties;
}
