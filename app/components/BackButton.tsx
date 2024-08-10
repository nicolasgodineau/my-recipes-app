// app/components/BackButton.tsx
"use client"; // Indique que ce composant est un Client Component

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back(); // Retour à la page précédente
    };

    return <button onClick={handleBack}>Retour</button>;
};

export default BackButton;
