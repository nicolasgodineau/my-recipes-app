import type { Metadata } from "next";
import "./globals.css";
import { StarRatingProvider } from "@context/StarRatingContext";
import { KeywordProvider } from "@context/KeywordContext";

export const metadata: Metadata = {
    title: "Recettes",
    description:
        "Réalisez de délicieuses recettes, quel que soit votre niveau en cuisine.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StarRatingProvider>
            <KeywordProvider>
                <html lang="en">
                    <body className="min-h-screen bg-background2 font-sans antialiased text-textColor">
                        <main className="max-w-5xl m-auto pb-10">
                            {children}
                        </main>
                    </body>
                </html>
            </KeywordProvider>
        </StarRatingProvider>
    );
}
