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

    // Convertir en minuscule et mettre la première lettre en majuscule
    let formattedText =
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    // Convertir les retours à la ligne en <br /> HTML
    const textWithBreaks = formattedText.replace(/\n/g, "<br />");

    // Assurer que le HTML est sécurisé avant d'être injecté
    const sanitizedText = DOMPurify.sanitize(textWithBreaks);

    switch (level) {
        case "h1":
            return (
                <h1
                    className="text-4xl font-bold text-left py-10"
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            );
        case "h2":
            return (
                <h2
                    className="text-3xl font-semibold sm:text-center lg:text-left py-4"
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            );
        case "h3":
            return (
                <h3
                    className="text-xl font-medium text-primary pt-4 max-w-full"
                    style={{ whiteSpace: "normal", maxWidth: "100%" }}
                    dangerouslySetInnerHTML={{ __html: sanitizedText }}
                />
            );
        default:
            return null;
    }
};

export default HeadingsDisplay;
