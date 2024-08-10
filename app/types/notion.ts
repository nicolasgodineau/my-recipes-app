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

// Interface pour représenter un fichier Notion
export interface NotionFile {
    url: string; // URL du fichier
}

// Interface pour représenter une propriété de type "files"
export interface NotionFiles {
    type: "files"; // Type de la propriété
    files: NotionFile[]; // Liste des fichiers
}

// Interface pour un bloc de type todo
export interface NotionToDo {
    type: "to_do";
    to_do: {
        rich_text: NotionText[];
        checked: boolean;
    };
}

// Interface pour un bloc de type paragraphe
export interface NotionParagraph {
    type: "paragraph";
    paragraph: {
        rich_text: NotionText[];
    };
}

// Interface pour représenter une option dans une propriété multi_select
export interface MultiSelectOption {
    id: string; // ID de l'option
    name: string; // Nom de l'option
    color: string; // Couleur de l'option (facultatif)
}

// Interface pour représenter une propriété de type "multi_select"
export interface MultiSelectProperty {
    type: "multi_select"; // Type de la propriété
    multi_select: {
        options: MultiSelectOption[]; // Liste des options multi_select
    };
}

// Interface pour représenter une page avec une propriété multi_select
export interface PageWithMultiSelect {
    properties: {
        Mots_cles: MultiSelectProperty; // Propriété multi_select
    };
}
