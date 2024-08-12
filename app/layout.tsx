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
            <body className="max-w-5xl m-auto bg-background2 font-sans antialiased text-textColor">
                <main className="">{children}</main>
            </body>
        </html>
    );
}
