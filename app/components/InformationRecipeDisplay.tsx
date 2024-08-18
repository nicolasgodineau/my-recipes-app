import React from "react";

import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import {
    extractHeading,
    extractToDo,
    extractParagraphs,
    extractBulletedList,
    groupNumberedListItems,
} from "@lib/notion";

import HeadingsDisplay from "@/app/components/blocks/HeadingsDisplay";
import ParagraphsDisplay from "@/app/components/blocks/ParagraphsDisplay";
import ToDoList from "@/app/components/blocks/ToDoList";
import BulletedList from "@/app/components/blocks/BulletedList";
import NumberedList from "@/app/components/blocks/NumberedList";

const InformationRecipeDisplay: React.FC<{
    text: BlockObjectResponse[];
}> = ({ text }) => {
    /* permet d'afficher tous le groupe groupedNumberedListItems une seule fois, pas à chaque tours...  */
    let hasRenderedNumberedList = false;

    return (
        <div className="recipe-section">
            <div className="content-container">
                {text.map((block) => {
                    switch (block.type) {
                        case "heading_3":
                            const heading = extractHeading([block]);
                            if (heading.length > 0) {
                                return (
                                    <HeadingsDisplay
                                        key={block.id}
                                        text={heading[0].text}
                                        level="h3"
                                    />
                                );
                            }
                            break;
                        case "paragraph":
                            const paragraph = extractParagraphs([block]);
                            if (paragraph.length > 0) {
                                return (
                                    <ParagraphsDisplay
                                        key={block.id}
                                        paragraphs={paragraph}
                                    />
                                );
                            }
                            break;
                        case "to_do":
                            const toDo = extractToDo([block]);
                            if (toDo.length > 0) {
                                return <ToDoList key={block.id} toDos={toDo} />;
                            }
                            break;
                        case "bulleted_list_item":
                            const bulletedList = extractBulletedList([block]);
                            if (bulletedList.length > 0) {
                                return (
                                    <BulletedList
                                        key={block.id}
                                        items={bulletedList}
                                    />
                                );
                            }
                            break;
                        case "numbered_list_item":
                            const groupedNumberedListItems =
                                groupNumberedListItems(text);
                            if (
                                !hasRenderedNumberedList &&
                                groupedNumberedListItems.length > 0
                            ) {
                                hasRenderedNumberedList = true; // Marquez comme rendu
                                return (
                                    <NumberedList
                                        key={block.id}
                                        items={groupedNumberedListItems}
                                    />
                                );
                            }
                            break;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default InformationRecipeDisplay;
