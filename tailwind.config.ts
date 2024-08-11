import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#25614D", // Couleur principale pour le thème clair
                secondary: "#A8D4A3", // Couleur secondaire pour le thème clair
                darkPrimary: "#334155", // Couleur principale pour le thème sombre
                darkSecondary: "#e5e7eb", // Couleur secondaire pour le thème sombre
                background: "#EAE6DB",
                background2: "#F0F0F0",
                background3: "#EBEAD6",
                textColor: "#DDD",
            },
        },
    },
    plugins: [],
};
export default config;
