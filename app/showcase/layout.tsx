import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./showcase.css";

/**
 * Showcase fonts — the site's Kiplo type: Archivo (bold display) + Inter (body).
 * `display: "swap"` keeps CLS low.
 */
const display = Archivo({
  weight: ["500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-showcase-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-showcase-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Showcase | Julius Nowel",
  description:
    "Julius Nowel B. Santiago — technical lead and full-stack developer. A scroll experience through selected work and capabilities: building, debugging, deciding.",
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${sans.variable} showcase-root min-h-screen`}>
      {children}
    </div>
  );
}
