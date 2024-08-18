"use client";
import Link from "next/link";
import { KeywordSelectorProps } from "@types-app/notionTypes";

import { Button } from "@nextui-org/react";
import { useKeyword } from "@context/KeywordContext";

const KeywordSelector: React.FC<KeywordSelectorProps> = ({ keywords }) => {
    const { selectedKeyword, setSelectedKeyword } = useKeyword();

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {keywords.map((keyword) => (
                <Button
                    key={keyword}
                    as={Link}
                    href={`/?keyword=${keyword}`}
                    size="sm"
                    radius="full"
                    variant="shadow"
                    className={`${
                        selectedKeyword === keyword
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary"
                    } text-sm flex items-center gap-1`}
                    onClick={() => setSelectedKeyword(keyword)}
                >
                    {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                </Button>
            ))}
        </div>
    );
};

export default KeywordSelector;
