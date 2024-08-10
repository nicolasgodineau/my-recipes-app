import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en">
            <body className="min-h-screen bg-primary font-sans antialiased">
                {" "}
                <main className="container mx-auto max-w-7xl p-2 lg:p-6 flex-grow">
                    {children}
                </main>
            </body>
        </html>
    );
}
