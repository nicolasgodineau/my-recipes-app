"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        router.back(); // Retour à la page précédente
    };

    return (
        <Button
            size="md"
            radius="full"
            variant="solid"
            className="px-24 font-bold text-primary bg-background2/10 boxShadow2"
            onClick={handleBack}
        >
            Retour
        </Button>
    );
}
