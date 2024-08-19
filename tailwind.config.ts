import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#25614D", // Couleur principale pour le thème clair
                secondary: "#0b1e18", // Couleur secondaire pour le thème clair
                darkPrimary: "#334155", // Couleur principale pour le thème sombre
                darkSecondary: "#e5e7eb", // Couleur secondaire pour le thème sombre
                background: "#EAE6DB",
                background2: "#F0F0F0",
                background3: "#EBEAD6",
                textColor: "#DDD",
            },
        },
    },
    plugins: [nextui()],
};
export default config;
