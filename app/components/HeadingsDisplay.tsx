// components/HeadingsDisplay.tsx
import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface HeadingProps {
    text: string;
    level: "h1" | "h2" | "h3";
}

const HeadingsDisplay: React.FC<HeadingProps> = ({ text, level }) => {
    if (!text) {
        return null; // ou afficher un message d'erreur
    }

    // Convertir les retours à la ligne en <br /> HTML
    const textWithBreaks = text.replace(/\n/g, "<br />");

    // Assurer que le HTML est sécurisé avant d'être injecté
    const sanitizedText = DOMPurify.sanitize(textWithBreaks);

    switch (level) {
        case "h1":
            return (
                <h1
                    className="text-4xl font-bold"
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            );
        case "h2":
            return (
                <h2
                    className="text-3xl font-semibold"
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            );
        case "h3":
            return (
                <h3
                    className="text-2xl font-medium"
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            );
        default:
            return null;
    }
};

export default HeadingsDisplay;
