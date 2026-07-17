import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./showcase.css";

/**
 * Showcase-only fonts. Loaded here so the main site layout stays untouched.
 * `display: "swap"` + size-adjust via CSS variables keeps CLS low.
 */
const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-showcase-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-showcase-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Showcase | Julius Nowel",
  description:
    "A scroll experience — building, debugging, deciding. Selected work and capabilities.",
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
