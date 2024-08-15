// components/ParagraphsDisplay.tsx
import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface ParagraphProps {
    formattedText: string;
}

interface ParagraphsDisplayProps {
    paragraphs: ParagraphProps[];
}

const ParagraphsDisplay: React.FC<ParagraphsDisplayProps> = ({
    paragraphs,
}) => {
    if (paragraphs.length === 0) return null; // Ne rien afficher si aucune donnée

    return (
        <ul className="pb-4">
            {paragraphs.map((para, index) => {
                // Convertir les retours à la ligne en <br /> HTML
                const textWithBreaks = para.formattedText.replace(
                    /\n/g,
                    "<br />"
                );

                // Assurer que le HTML est sécurisé avant d'être injecté
                const sanitizedHTML = DOMPurify.sanitize(textWithBreaks);

                return (
                    <li key={index} className="my-2">
                        <p
                            className="my-2"
                            dangerouslySetInnerHTML={{
                                __html: sanitizedHTML,
                            }}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ParagraphsDisplay;
