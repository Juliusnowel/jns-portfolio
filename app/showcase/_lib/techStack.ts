import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiLaravel,
  SiPython,
  SiWordpress,
  SiMysql,
  SiTailwindcss,
  SiGreensock,
} from "react-icons/si";

export type TechLogo = {
  id: string;
  label: string;
  Icon: IconType;
  color: string;
  /** Omit on mobile when true */
  desktopOnly?: boolean;
};

/** Curated stack logos — recognizable brand marks */
export const techLogos: TechLogo[] = [
  { id: "js", label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { id: "ts", label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { id: "react", label: "React", Icon: SiReact, color: "#61DAFB" },
  { id: "next", label: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { id: "php", label: "PHP", Icon: SiPhp, color: "#777BB4" },
  { id: "laravel", label: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { id: "python", label: "Python", Icon: SiPython, color: "#3776AB" },
  { id: "wp", label: "WordPress", Icon: SiWordpress, color: "#21759B" },
  { id: "mysql", label: "MySQL", Icon: SiMysql, color: "#4479A1", desktopOnly: true },
  { id: "tw", label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", desktopOnly: true },
  { id: "gsap", label: "GSAP", Icon: SiGreensock, color: "#88CE02", desktopOnly: true },
];

export const codeSnippets = [
  {
    id: "snip-bug",
    title: "debug.ts",
    lines: [
      { t: "const hi = items.length;", c: "ink" },
      { t: "while (lo <= hi) {", c: "bug" },
      { t: "  // off-by-one",
        c: "muted",
      },
    ],
  },
  {
    id: "snip-plan",
    title: "decide.ts",
    lines: [
      { t: "if (tradeoff.clarity) {", c: "ink" },
      { t: "  return ship();", c: "accent" },
      { t: "}", c: "ink" },
    ],
    desktopOnly: true,
  },
] as const;
