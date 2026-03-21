import type { Metadata } from "next";
import { Amiri, Archivo, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/Navbar";

const amiri = Amiri({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const archivo = Archivo({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const roboto = Roboto({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Palisandr Furniture | Premium Quality Collection",
  description: "Discover handcrafted furniture from rosewood and mango wood. Elevate your living space with our premium collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${amiri.variable} ${archivo.variable} ${roboto.variable} h-full antialiased h-full`}
    >
      <body className="min-h-full flex flex-col font-text text-foreground bg-background">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
