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
                primary: "#ecf0f3", // Couleur principale pour le thème clair
                secondary: "#334155", // Couleur secondaire pour le thème clair
                darkPrimary: "#334155", // Couleur principale pour le thème sombre
                darkSecondary: "#e5e7eb", // Couleur secondaire pour le thème sombre
            },
        },
    },
    plugins: [],
};
export default config;
