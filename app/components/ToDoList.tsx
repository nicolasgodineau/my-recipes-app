// components/ToDoList.tsx
import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface ToDoItemProps {
    text: string;
    checked: boolean;
}

interface ToDoListProps {
    toDos: ToDoItemProps[];
}

const ToDoList: React.FC<ToDoListProps> = ({ toDos }) => {
    if (toDos.length === 0) return null; // Ne rien afficher si aucune donnée

    return (
        <ul className="list-disc px-8 pb-4">
            {toDos.map((todo, index) => {
                // Convertir les retours à la ligne en <br /> HTML
                const textWithBreaks = todo.text.replace(/\n/g, "<br />");

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
                        {/* Afficher la case à cocher si nécessaire */}
                        {/*                         <input
                            type="checkbox"
                            checked={todo.checked}
                            readOnly
                            className="ml-2"
                        /> */}
                    </li>
                );
            })}
        </ul>
    );
};

export default ToDoList;
