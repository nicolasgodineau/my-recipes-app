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
    return (
        <>
            {paragraphs.length > 0 && (
                <ul className="pb-4">
                    {paragraphs.map((para, index) => (
                        <li key={index} className="my-2">
                            {para.formattedText.split("\n").map((line, i) => {
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
