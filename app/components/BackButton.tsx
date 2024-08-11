// app/components/BackButton.tsx
"use client"; // Indique que ce composant est un Client Component

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back(); // Retour à la page précédente
    };

    return (
        <button
            className="text-[#BA6749] bg-[#A5C7C6] font-semibold rounded-full py-1 px-36 text-center m-auto buttonShadow "
            onClick={handleBack}
        >
            Retour
        </button>
    );
};

export default BackButton;
