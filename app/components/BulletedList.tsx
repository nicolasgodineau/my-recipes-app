// components/BulletedList.tsx
import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface BulletedListItemProps {
    formattedText: string;
}

interface BulletedListProps {
    items: BulletedListItemProps[];
}

const BulletedList: React.FC<BulletedListProps> = ({ items }) => {
    if (items.length === 0) return null; // Ne rien afficher si aucune donnée

    return (
        <ul className="list-disc pl-5 mt-8">
            {items.map((item, index) => {
                // Convertir les retours à la ligne en <br /> HTML
                const textWithBreaks = item.formattedText.replace(
                    /\n/g,
                    "<br />"
                );

                // Assurer que le HTML est sécurisé avant d'être injecté
                const sanitizedHTML = DOMPurify.sanitize(textWithBreaks);

                return (
                    <li key={index} className="mb-2">
                        <div
                            className="mb-1 pl-2"
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

export default BulletedList;
