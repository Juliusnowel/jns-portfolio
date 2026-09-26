import type { Metadata } from "next";
import { Archivo, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeSync from "./components/theme-sync";

// Kiplo-family type: Archivo for display/headings, Inter for body.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julius Nowel B. Santiago | Technical Lead & Full-Stack Developer",
  description:
    "Portfolio of Julius Nowel B. Santiago, a technical lead and full-stack developer who guides delivery and builds websites, internal business systems, and deployment workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
