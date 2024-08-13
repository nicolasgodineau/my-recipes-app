// components/ParagraphsDisplay.tsx
import React from "react";
import { JSDOM } from "jsdom";

// Importation correcte de createDOMPurify
import createDOMPurify from "isomorphic-dompurify";

// Création d'un DOM virtuel pour DOMPurify
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Définition des props pour le composant
interface ParagraphProps {
    formattedText: string;
}

interface ParagraphsDisplayProps {
    paragraphs: ParagraphProps[];
}

const ParagraphsDisplay: React.FC<ParagraphsDisplayProps> = ({
    paragraphs,
}) => {
    return (
        <>
            {paragraphs.length > 0 && (
                <ul className="pb-4">
                    {paragraphs.map((para, index) => (
                        <li key={index} className="my-2">
                            {/* Séparation des lignes et rendu avec formatage */}
                            {para.formattedText.split("\n").map((line, i) => {
                                // Nettoyage du HTML avec DOMPurify
                                const sanitizedHTML = DOMPurify.sanitize(line);

                                return (
                                    <p
                                        key={i}
                                        className="my-2"
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizedHTML,
                                        }}
                                    />
                                );
                            })}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ParagraphsDisplay;
