// components/NumberedListDisplay.tsx
import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface NumberedListItemProps {
    formattedText: string;
}

interface NumberedListDisplayProps {
    items: NumberedListItemProps[];
}

const NumberedListDisplay: React.FC<NumberedListDisplayProps> = ({ items }) => {
    if (items.length === 0) return null; // Ne rien afficher si aucune donnée

    return (
        <ol className="list-decimal px-8 pb-4">
            {items.map((item, index) => {
                // Convertir les retours à la ligne en <br /> HTML
                const textWithBreaks = item.formattedText.replace(
                    /\n/g,
                    "<br />"
                );

                // Assurer que le HTML est sécurisé avant d'être injecté
                const sanitizedText = DOMPurify.sanitize(textWithBreaks);

                return (
                    <li key={index} className="my-2">
                        {/* Afficher le texte formaté avec des retours à la ligne */}
                        <span
                            dangerouslySetInnerHTML={{
                                __html: sanitizedText,
                            }}
                        />
                    </li>
                );
            })}
        </ol>
    );
};

export default NumberedListDisplay;
