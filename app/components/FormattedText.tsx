// components/FormattedText.tsx
import { NotionText } from "@types-app/notionTypes"; // Assure-toi que le chemin est correct
import DOMPurify from "dompurify";

// Fonction utilitaire pour formater le texte avec les annotations
export const formatText = (richText: NotionText): string => {
    let text = richText.plain_text;
    if (richText.annotations.bold) {
        text = `<strong>${text}</strong>`;
    }
    if (richText.annotations.italic) {
        text = `<em>${text}</em>`;
    }
    if (richText.annotations.strikethrough) {
        text = `<s>${text}</s>`;
    }
    if (richText.annotations.underline) {
        text = `<u>${text}</u>`;
    }
    if (richText.annotations.code) {
        text = `<code>${text}</code>`;
    }
    return text;
};

// Fonction utilitaire pour nettoyer le HTML
export const cleanHTML = (html: string): string => {
    return DOMPurify.sanitize(html);
};
