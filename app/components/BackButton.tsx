"use client";

import { Button } from "@nextui-org/button";

export default function BackButton() {
    const handleGoBack = () => {
        window.history.back(); // Utilise l'historique du navigateur pour revenir à la page précédente
    };

    return (
        <Button
            size="md"
            radius="full"
            variant="solid"
            className="px-24 font-bold text-primary bg-background2/10 boxShadow2"
            onClick={handleGoBack}
        >
            Retour
        </Button>
    );
}
