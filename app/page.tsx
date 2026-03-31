"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useState, useEffect, type MouseEvent } from "react";
import { useThemeMode } from "./hooks/useThemeMode";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const quickLinks = navigationLinks;

const socialLinks = [
  { label: "Email", href: "mailto:juliusnowels@gmail.com" },
  { label: "GitHub", href: "https://github.com/Juliusnowel" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/julius-nowel-santiago-74923b292/",
  },
];

const techStackItems = [
  { name: "WordPress", icon: "/logos/wordpress.png" },
  { name: "PHP", icon: "/logos/php.png" },
  { name: "Laravel", icon: "/logos/laravel.png" },
  { name: "JavaScript", icon: "/logos/javascript.svg" },
  { name: "Vue", icon: "/logos/vue.png" },
  { name: "React Native", icon: "/logos/react-native.svg" },
  { name: "Expo", icon: "/logos/expo.svg" },
  { name: "Python", icon: "/logos/python.svg" },
  { name: "MySQL", icon: "/logos/mysql.webp" },
];

const aboutVisualCards = [
  { icon: "/logos/wordpress.png", label: "WordPress", size: "small" },
  { icon: "/logos/laravel.png", label: "Laravel", size: "tall" },
  { icon: "/logos/vue.png", label: "Vue", size: "large" },
  { icon: "/logos/python.svg", label: "Python", size: "medium" },
] as const;

const featuredProjects = [
  {
    title: "Allegiant Air Tickets",
    tags: ["WordPress", "PHP", "Custom Build"],
    description:
      "One and only developer for this client website task, delivered with a custom child-theme implementation.",
    image: "/project_image_bg/allegiants.webp",
    href: "https://allegiantairtickets.com/",
    size: "secondary",
    imagePosition: "object-center",
    imageInset: "px-6",
  },
  {
    title: "Viteseo",
    tags: ["WordPress", "PHP", "JavaScript"],
    description:
      "One and only developer for the company website, using a child-theme approach and custom business-focused implementations.",
    image: "/project_image_bg/viteseo.png",
    href: "https://viteseo.ph/",
    size: "featured",
    imagePosition: "object-center",
    imageInset: "px-2",
  },
  {
    title: "Creceri",
    tags: ["WordPress", "Maintenance", "Child Theme"],
    description:
      "Handled maintenance and iterative updates with a child-theme workflow to keep the website stable and easy to improve.",
    image: "/project_image_bg/creceri.png",
    href: "https://creceri.com/",
    size: "secondary",
    imagePosition: "object-center",
    imageInset: "px-6",
  },
  {
    title: "Noyona Cosmetics",
    tags: ["WordPress", "WooCommerce", "Child Theme"],
    description:
      "One and only developer for the WooCommerce website, focused on practical ecommerce structure and maintainable customizations.",
    image: "/project_image_bg/noyona.webp",
    href: "https://noyonacosmetics.com/",
    size: "featured",
    imagePosition: "object-center",
    imageInset: "px-6",
  },
] as const;

const featuredProjectRows = [
  [
    { index: 0, colSpan: "lg:col-span-7" },
    { index: 1, colSpan: "lg:col-span-5" },
  ],
  [
    { index: 2, colSpan: "lg:col-span-5" },
    { index: 3, colSpan: "lg:col-span-7" },
  ],
] as const;

type Certification = {
  id: number;
  title: string;
  issuer: string;
  issued: string;
  image: string;
  href: string;
};

const certifications: Certification[] = [
  {
    id: 1,
    title: "GDG Cloud Manila x AI Pilipinas – Participant",
    issuer: "International Women’s Day 2026",
    issued: "2026",
    image: "/logos/award.png",
    href: "#",
  },
  {
    id: 2,
    title: "Champion – Programming Competition",
    issuer: "University Award",
    issued: "3rd Year",
    image: "/logos/award.png",
    href: "#",
  },
  {
    id: 3,
    title: "Web Design Award",
    issuer: "University Recognition",
    issued: "2nd Year",
    image: "/logos/award.png",
    href: "#",
  },
  {
    id: 4,
    title: "Web Design Award",
    issuer: "University Recognition",
    issued: "3rd Year",
    image: "/logos/award.png",
    href: "#",
  },
];

const achievements = [
  {
    value: "Automation",
    label: "Tools & Systems",
    description: "Scraping tools and Make.com workflows to reduce manual work",
  },
  {
    value: "4+",
    label: "Production Websites",
    description: "End-to-end builds across business, ecommerce, and community platforms",
  },
  {
    value: "5+",
    label: "Custom SEO Plugins",
    description: "Used in real production workflows by SEO teams",
  },
  {
    value: "2",
    label: "Active Maintenances",
    description: "Ongoing support for client websites and inherited projects",
  }
];

const services = [
  {
    title: "Custom WordPress Development",
    description: "Child-theme builds, custom post types, advanced theme architecture, and production-ready WordPress sites tailored to your business.",
    icon: "🌐",
  },
  {
    title: "Plugin Development",
    description: "Custom MU-plugins and standard plugins for store locators, CSV importers, SEO tools, and internal workflow automation.",
    icon: "🔌",
  },
  {
    title: "Performance Optimization",
    description: "Core Web Vitals audits, image optimization pipelines, caching strategies, and measurable speed improvements.",
    icon: "⚡",
  },
  {
    title: "Full Stack Applications",
    description: "End-to-end solutions with Laravel, Vue, React Native, and Python — from database design to deployment.",
    icon: "🛠",
  },
];

const testimonials = [
  {
    quote: "Julius is highly reliable and easy to work with. He handles tasks professionally, communicates clearly, and collaborates well across teams.",
    name: "John Ray Villanera",
    role: "Web Designer",
  },
  {
    quote: "He has a solid foundation in web development and learns quickly. His analytical thinking and consistency show strong potential for building real-world systems.",
    name: "Alvin Fernandez Dela Cruz",
    role: "Senior Software Developer (Mentor)",
  },
  {
    quote: "Strong not only in coding and problem-solving, but also in communication and teamwork. He approaches issues with a practical mindset and delivers solutions effectively.",
    name: "Joshua Ellis Enore",
    role: "Software Engineer & Full Stack Developer",
  },
];

const activeLinkLabel = "Home";
const pageGutter = "px-4 sm:px-6 lg:px-10";
const sectionContentInset = "px-6 sm:px-10 lg:px-12";
const typeScale = {
  h1: "text-[clamp(2.25rem,5vw,3.4375rem)]",
  h2: "text-[clamp(1.75rem,3.2vw,2.25rem)]",
  h3: "text-[clamp(1.25rem,2.4vw,1.5rem)]",
  body: "text-[clamp(1.125rem,1.7vw,1.25rem)]",
  link: "text-[clamp(1rem,1.35vw,1.125rem)]",
  caption: "text-[clamp(1rem,1.25vw,1.125rem)]",
};



export default function Home() {
  const { isDark, toggleTheme } = useThemeMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [certIndex, setCertIndex] = useState(0);
  const certCount = certifications.length;
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(true);

    // auto hide after 2 seconds
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const prevCert = () => setCertIndex((i) => (i - 1 + certCount) % certCount);
  const nextCert = () => setCertIndex((i) => (i + 1) % certCount);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const [heroTilt, setHeroTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
  });
  const handleHeroMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 14;

    setHeroTilt({
      rotateX,
      rotateY,
      scale: 1.015,
      transition: "transform 90ms linear",
    });
  };

  const resetHeroTilt = () => {
    setHeroTilt({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
    });
  };

  const themeClass = isDark
    ? {
        background: "bg-zinc-950",
        surface: "bg-zinc-900/55",
        border: "border-zinc-800",
        textPrimary: "text-zinc-100",
        textSecondary: "text-zinc-300",
        textMuted: "text-zinc-400",
        headerGlass: "bg-zinc-900/45",
        navRing: "ring-white/10",
        cardTone: "bg-zinc-900/55",
        imagePanel: "bg-zinc-900/60",
      }
    : {
        background: "bg-slate-50",
        surface: "bg-white",
        border: "border-slate-200",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-600",
        textMuted: "text-slate-500",
        headerGlass: "bg-white/80",
        navRing: "ring-black/8",
        cardTone: "bg-white",
        imagePanel: "bg-white",
      };

  const deviceFx = isDark
    ? {
        outerGlow:
          "bg-gradient-to-br from-blue-500/45 via-violet-500/30 to-transparent blur-2xl",
        baseGlow:
          "bg-gradient-to-r from-blue-500/30 via-violet-500/35 to-blue-500/30 blur-xl",
        baseShadow: "bg-black/55 blur-md",
        frameShadow: "shadow-[0_26px_52px_rgba(10,14,28,0.45)]",
        keyboardShadow: "shadow-[0_16px_36px_rgba(0,0,0,0.45)]",
        mouseShadow: "shadow-[0_12px_24px_rgba(0,0,0,0.42)]",
      }
    : {
        outerGlow:
          "bg-gradient-to-br from-blue-500/22 via-violet-500/16 to-transparent blur-2xl",
        baseGlow:
          "bg-gradient-to-r from-blue-400/14 via-violet-400/16 to-blue-400/14 blur-lg",
        baseShadow: "bg-slate-500/20 blur-sm",
        frameShadow: "shadow-[0_10px_26px_rgba(15,23,42,0.18)]",
        keyboardShadow: "shadow-[0_8px_20px_rgba(15,23,42,0.16)]",
        mouseShadow: "shadow-[0_6px_16px_rgba(15,23,42,0.14)]",
      };

  const outlinedCtaClass = isDark
    ? "border-white/60 text-zinc-100 hover:border-white/90 hover:text-white"
    : "border-slate-300 text-slate-800 hover:border-slate-500 hover:text-slate-900";

  const ProjectCard = ({
    title,
    tags,
    description,
    image,
    href,
    size,
    imagePosition,
    imageInset,
  }: {
    title: string;
    tags: readonly string[];
    description: string;
    image: string;
    href: string;
    size: "featured" | "secondary";
    imagePosition: string;
    imageInset: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${title}`}
      className="group relative block h-[360px] cursor-pointer"
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl blur-[0.5px] ${
          isDark ? "bg-violet-500/12" : "bg-slate-900/5"
        } ${
          size === "featured"
            ? "translate-x-[8px] translate-y-[8px]"
            : "translate-x-[5px] translate-y-[5px]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl blur-[1px] ${
          isDark ? "bg-blue-500/10" : "bg-transparent"
        } ${
          size === "featured"
            ? "translate-x-[14px] translate-y-[14px]"
            : "translate-x-[10px] translate-y-[10px]"
        }`}
      />

      <div className={`relative h-full overflow-hidden rounded-2xl border ${
        isDark
          ? "border-white/10 shadow-[0_16px_40px_rgba(10,14,28,0.32)]"
          : "border-slate-300 bg-slate-200/60 shadow-[0_4px_24px_rgba(15,23,42,0.10)]"
      }`}>
        <Image
          src={image}
          alt={title}
          fill
          className={`object-contain py-2 ${imageInset} ${imagePosition}`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark
              ? size === "featured"
                ? "bg-gradient-to-t from-black/82 via-black/30 to-black/5 group-hover:from-black/74"
                : "bg-gradient-to-t from-black/76 via-black/24 to-black/8 group-hover:from-black/68"
              : "bg-gradient-to-t from-black/75 via-black/25 to-transparent group-hover:from-black/65"
          }`}
        />

        <div className={`absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border text-lg backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
          isDark
            ? "border-white/25 bg-black/35 text-white"
            : "border-black/10 bg-black/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        }`}>
          ↗
        </div>

        <div className="absolute bottom-4 left-4 right-4 transition-transform duration-300 group-hover:-translate-y-6">
          <h4
            className="text-[1.35rem] font-semibold text-white"
          >
            {title}
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-md px-2.5 py-1 text-sm font-medium backdrop-blur-sm ${
                  isDark
                    ? "bg-black/45 text-zinc-100"
                    : "bg-black/30 text-white"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className={`mt-2 max-h-0 max-w-[95%] overflow-hidden text-base leading-relaxed opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100 ${
            isDark ? "text-zinc-200" : "text-zinc-100"
          }`}>
            {description}
          </p>
        </div>
      </div>
    </a>
  );

  return (
    <div
      id="home"
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${themeClass.background} ${themeClass.textPrimary}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/35 via-violet-500/25 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-violet-500/25 via-indigo-500/20 to-transparent blur-3xl" />
        <div className="absolute bottom-8 left-1/3 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-transparent blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 pt-3">
        <div className={`mx-auto w-full ${pageGutter}`}>
          <div
            className={`flex h-16 w-full items-center justify-between rounded-2xl border shadow-[0_10px_28px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-colors duration-500 ${themeClass.border} ${themeClass.headerGlass} ring-1 ${themeClass.navRing} ${sectionContentInset}`}
          >
            <a
              href="#home"
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-lg font-extrabold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.35)] transition-transform duration-300 hover:scale-[1.02]"
            >
              Julius Nowel
            </a>

            <div className="flex items-center gap-3 sm:gap-4">
              <nav className="hidden items-center gap-8 md:flex lg:gap-10">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative font-medium transition-all duration-300 hover:text-violet-500 ${
                      link.label === activeLinkLabel
                        ? "px-2.5 py-1 text-violet-700 after:absolute after:-bottom-1.5 after:left-2.5 after:h-0.5 after:w-[calc(100%-1.25rem)] after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-violet-500"
                        : `${themeClass.textSecondary} px-2.5 py-1 after:absolute after:-bottom-1.5 after:left-2.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-violet-500 after:transition-all after:duration-300 hover:after:w-[calc(100%-1.25rem)]`
                    }`}
                    aria-current={link.label === activeLinkLabel ? "page" : undefined}
                  >
                    <span className={typeScale.link}>{link.label}</span>
                  </Link>
                ))}
              </nav>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 ${themeClass.border} ${themeClass.surface}`}
              >
                <span className="text-2xl">{isDark ? "☀" : "☾"}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 md:hidden ${themeClass.border} ${themeClass.surface}`}
              >
                <span className="text-xl leading-none">{mobileMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav
            className={`absolute right-4 top-20 w-56 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl ${themeClass.border} ${isDark ? "bg-zinc-900/95" : "bg-white shadow-[0_8px_32px_rgba(15,23,42,0.1)]"}`}
          >
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-xl px-4 py-2.5 font-medium transition-colors duration-200 ${
                      link.label === activeLinkLabel
                        ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-violet-500"
                        : `${themeClass.textSecondary} hover:text-violet-500`
                    } ${typeScale.link}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <main className={`relative mx-auto w-full pb-16 pt-9 sm:pt-12 lg:pb-20 ${pageGutter}`}>
        <section
          className={`relative rounded-[2rem] py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}
        >
          <div className="pointer-events-none absolute -top-24 right-2 h-56 w-56 rounded-full bg-gradient-to-br from-violet-500/25 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
            <div className="animate-fade-up">
              <p
                className={`font-semibold tracking-wide ${themeClass.textMuted} ${typeScale.caption}`}
              >
                Hello, I&apos;m
              </p>
              <h1 className={`mt-3 font-bold leading-tight ${typeScale.h1}`}>
                Julius Nowel B. Santiago
              </h1>
              <h2
                className={`mt-5 lg:max-w-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text font-semibold leading-snug text-transparent ${typeScale.h2}`}
              >
                Building custom WordPress solutions, business tools, and full
                stack web applications
              </h2>
              <p
                className={`mt-5 lg:max-w-2xl leading-[1.65] ${themeClass.textSecondary} ${typeScale.body}`}
              >
                I currently work as a Full Stack WordPress Developer, building
                websites with a child-theme approach and developing custom
                plugins for practical business needs. I also bring hands-on
                experience with Laravel, Vue, React Native, and Python for
                end-to-end solution delivery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* <a
                  href="/julius-santiago-cv.pdf"
                  download
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(99,102,241,0.42)]"
                >
                  Download CV
                </a> */}
                <div className="relative inline-block w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="group inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(99,102,241,0.42)] cursor-not-allowed opacity-80 sm:w-auto"
                  >
                    Download CV
                  </button>

                  {/* Tooltip */}
                  <div
                    className={`
                      pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max -translate-x-1/2 rounded-md bg-black/80 px-3 py-1.5 text-xs text-white
                      transition-all duration-200
                      ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
                      group-hover:opacity-100 group-hover:translate-y-0
                    `}
                  >
                    CV not available yet — still being updated
                  </div>
                </div>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(99,102,241,0.16)] ${outlinedCtaClass} ${typeScale.link}`}
                >
                 Let’s Talk
                </Link>
              </div>
            </div>

            <div className="animate-fade-up-delay justify-self-center lg:justify-self-end">
              <div
                className="relative w-full max-w-[38rem] xl:max-w-[40rem]"
                style={{ perspective: "2200px" }}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={resetHeroTilt}
              >
                <div className={`absolute -inset-10 rounded-[3rem] ${deviceFx.outerGlow}`} />
                <div className={`absolute inset-x-8 -bottom-20 h-14 rounded-full ${deviceFx.baseGlow}`} />
                <div className={`absolute inset-x-14 -bottom-12 h-6 rounded-full ${deviceFx.baseShadow}`} />

                <div
                  className="relative"
                  style={{
                    transform: `rotateX(${heroTilt.rotateX + 2}deg) rotateY(${heroTilt.rotateY - 10}deg) scale(${heroTilt.scale})`,
                    transition: heroTilt.transition,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`relative rounded-[1.65rem] border border-white/15 bg-gradient-to-b from-zinc-700/80 via-zinc-800/65 to-zinc-900/70 p-3 ${deviceFx.frameShadow} ${themeClass.cardTone}`}
                    style={{ transform: "translateZ(34px) rotateX(-2deg)" }}
                  >
                    <div className="relative overflow-hidden rounded-[1.05rem] border border-white/15 bg-black">
                      <Image
                        src="/Julius.webp"
                        alt="Julius Nowel B. Santiago portrait"
                        width={1280}
                        height={800}
                        priority
                        className="aspect-[16/10] w-full object-cover object-[50%_18%] transition-transform duration-700 hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/15" />
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-full h-3 w-[16%] -translate-x-1/2 rounded-b-md bg-zinc-300/70" />
                  </div>

                  <div
                    className="pointer-events-none absolute left-[105%] top-full w-[102%] -translate-x-1/2"
                    style={{
                      transform: "translateX(-50%) translateY(6px) rotateX(74deg) translateZ(-20px)",
                      transformOrigin: "top",
                    }}
                  >
                    <div className="flex items-end gap-3">
                      <div className={`flex-[0_0_84%] rounded-b-[1.25rem] rounded-t-[0.6rem] border border-white/25 bg-gradient-to-b from-zinc-300/80 via-zinc-200/45 to-zinc-700/30 px-7 pt-3.5 pb-4.5 ${deviceFx.keyboardShadow}`}>
                        <div
                          className="h-14 rounded-md opacity-70"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(to right, rgba(20,24,38,0.55) 0, rgba(20,24,38,0.55) 18px, rgba(255,255,255,0.08) 18px, rgba(255,255,255,0.08) 20px), repeating-linear-gradient(to bottom, rgba(18,22,35,0.65) 0, rgba(18,22,35,0.65) 12px, rgba(255,255,255,0.08) 12px, rgba(255,255,255,0.08) 14px)",
                          }}
                        />
                        <div className="mx-auto mt-2.5 h-2.5 w-[22%] rounded-full bg-zinc-900/45" />
                      </div>
                      <div className={`relative h-24 w-12 rounded-[999px] border border-white/30 bg-gradient-to-b from-zinc-300/90 via-zinc-200/50 to-zinc-700/40 ${deviceFx.mouseShadow}`}>
                        <div className="absolute inset-x-3 top-1.5 h-2.5 rounded-full bg-white/25 blur-[1px]" />
                        <div className="absolute left-1/2 top-[51%] h-4 w-[1.5px] -translate-x-1/2 rounded-full bg-zinc-800/60" />
                        <div className="absolute left-1/2 top-[24%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-zinc-900/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`relative mt-2 py-8 sm:py-10 lg:py-12 ${sectionContentInset}`}
        >
          <div className="mb-4">
            <h3 className={`font-semibold ${typeScale.h3}`}>Tech Stack</h3>
            <p className={`${themeClass.textSecondary} ${typeScale.link}`}>
              Core technologies I use for custom development and production-ready builds.
            </p>
          </div>

          <div
            className={`relative overflow-hidden rounded-2xl border py-4 sm:py-5 ${themeClass.border}`}
          >
            <Marquee
              autoFill
              pauseOnHover={false}
              speed={30}
              gradient
              gradientWidth={96}
              gradientColor={isDark ? "rgb(9, 9, 11)" : "rgb(241, 245, 249)"}
              className="pointer-events-none select-none"
            >
              {techStackItems.map((tech) => (
                <article
                  key={tech.name}
                  className="mx-1.5 inline-flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5"
                >
                  <div className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10">
                    <Image
                      src={tech.icon}
                      alt={`${tech.name} logo`}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <p className={`font-medium ${typeScale.link}`}>{tech.name}</p>
                </article>
              ))}
            </Marquee>
          </div>
        </section>

        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={`font-semibold ${typeScale.h3}`}>Featured Projects</h3>
              <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
                Projects that reflect my work in custom WordPress development, internal tools, and full stack applications.
              </p>
            </div>
            <Link
              href="/projects"
              className={`shrink-0 whitespace-nowrap rounded-xl border px-4 py-2 font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass} ${typeScale.link}`}
            >
              Browse More →
            </Link>
          </div>

          <div className="mt-8 space-y-8">
            {featuredProjectRows.map((row, rowIndex) => (
              <div key={`featured-row-${rowIndex}`} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {row.map((cell) => {
                  const project = featuredProjects[cell.index];
                  return (
                    <div key={project.title} className={cell.colSpan}>
                      <ProjectCard
                        title={project.title}
                        tags={project.tags}
                        description={project.description}
                        image={project.image}
                        href={project.href}
                        size={project.size}
                        imagePosition={project.imagePosition}
                        imageInset={project.imageInset}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        <section className="relative py-6 sm:py-8 lg:py-10">
          <div className={sectionContentInset}>
            <h3 className={`font-semibold ${typeScale.h3}`}>Certifications</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Credentials that back my development practice.
            </p>
          </div>

          {(() => {
            const activeCert = certifications[certIndex];
            const leftIndex = (certIndex - 1 + certCount) % certCount;
            const rightIndex = (certIndex + 1) % certCount;
            const leftCert = certifications[leftIndex];
            const rightCert = certifications[rightIndex];

            const sideCard = (cert: Certification, onClick: () => void) => (
              <button
                type="button"
                onClick={onClick}
                className={`w-full rounded-xl px-5 py-5 text-left transition-all duration-500 hover:scale-[1.02] sm:px-6 sm:py-6 ${
                  isDark ? "bg-zinc-900/30 hover:bg-zinc-900/50" : "bg-white/80 hover:bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
                    <Image src={cert.image} alt={`${cert.title} certificate`} fill className="object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className={`truncate font-medium ${themeClass.textSecondary} ${typeScale.link}`}>
                      {cert.issuer}
                    </p>
                    <p className={`mt-0.5 text-sm ${themeClass.textMuted}`}>
                      {cert.issued}
                    </p>
                  </div>
                </div>
              </button>
            );

            return (
              <>
                {/* Desktop: 3-zone staged layout (lg+) */}
                <div className={`mt-6 hidden items-center gap-6 lg:grid ${sectionContentInset}`} style={{ gridTemplateColumns: "1fr 2.4fr 1fr" }}>
                  <div>
                    {sideCard(leftCert, prevCert)}
                  </div>

                  <div
                    className={`rounded-2xl px-10 py-8 transition-all duration-500 ${
                      isDark
                        ? "bg-zinc-900/40 border border-zinc-800/60 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
                        : "bg-white border border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
                    }`}
                  >
                    <div className="flex items-center gap-7">
                      <div className="relative h-20 w-20 shrink-0">
                        <Image src={activeCert.image} alt={`${activeCert.title} certificate`} fill className="object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-semibold leading-snug ${typeScale.h2}`}>
                          {activeCert.title}
                        </p>
                        <p className={`mt-2 font-medium ${themeClass.textSecondary} ${typeScale.body}`}>
                          {activeCert.issuer}
                        </p>
                        <div className="mt-3 flex flex-col items-start gap-3">
                          <p className={`text-sm ${themeClass.textMuted}`}>
                            {activeCert.issued}
                          </p>

                          {/* <a
                            href={activeCert.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center rounded-xl border px-4 py-1.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass}`}
                          >
                            View Certificate ↗
                          </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {sideCard(rightCert, nextCert)}
                  </div>
                </div>

                {/* Tablet/Mobile: single featured card (below lg) */}
                <div className={`mt-6 lg:hidden ${sectionContentInset}`}>
                  <div
                    className={`rounded-2xl px-5 py-5 transition-all duration-500 sm:px-8 sm:py-7 ${
                      isDark
                        ? "bg-zinc-900/40 border border-zinc-800/60 shadow-[0_10px_32px_rgba(0,0,0,0.25)]"
                        : "bg-white border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
                    }`}
                  >
                    <div className="flex items-center gap-5 sm:gap-6">
                      <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
                        <Image src={activeCert.image} alt={`${activeCert.title} certificate`} fill className="object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-semibold leading-snug ${typeScale.h3}`}>
                          {activeCert.title}
                        </p>
                        <p className={`mt-1 font-medium ${themeClass.textSecondary} ${typeScale.link}`}>
                          {activeCert.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <p className={`text-sm ${themeClass.textMuted}`}>
                        {activeCert.issued}
                      </p>
                      <a
                        href={activeCert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center rounded-xl border px-4 py-1.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass}`}
                      >
                        View Certificate ↗
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevCert}
              aria-label="Previous certificate"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 ${themeClass.border} ${themeClass.surface}`}
            >
              <span className="text-lg">←</span>
            </button>

            <div className="flex gap-1.5">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCertIndex(index)}
                  aria-label={`Go to certificate ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === certIndex
                      ? "w-6 bg-gradient-to-r from-blue-500 to-violet-500"
                      : `w-1.5 ${isDark ? "bg-zinc-600" : "bg-slate-300"}`
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextCert}
              aria-label="Next certificate"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 ${themeClass.border} ${themeClass.surface}`}
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </section>

        {/* Results / Achievements */}
        <section className={`relative py-12 sm:py-14 lg:py-16 ${sectionContentInset}`}>
          <div className="mb-10">
            <h3 className={`font-semibold ${typeScale.h3}`}>Results & Impact</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Measurable outcomes from real projects and client work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {achievements.map((item) => (
              <article
                key={item.label}
                className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
                  isDark
                    ? "border-zinc-800/70 bg-zinc-900/40"
                    : "border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
                }`}
              >
                <p className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  {item.value}
                </p>
                <p className={`mt-3 font-semibold ${typeScale.link}`}>{item.label}</p>
                <p className={`mt-1 text-sm ${themeClass.textMuted}`}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="mb-8">
            <h3 className={`font-semibold ${typeScale.h3}`}>What I Offer</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Practical development services grounded in real project experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {services.map((service, index) => (
              <article
                key={service.title}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${
                  isDark
                    ? "border-zinc-800/70 bg-zinc-900/40 hover:bg-zinc-900/55"
                    : "border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.07)]"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className={`text-lg font-bold tabular-nums ${themeClass.textMuted}`}>
                    0{index + 1}
                  </span>
                  <h4 className={`font-semibold ${typeScale.link}`}>{service.title}</h4>
                </div>
                <p className={`mt-3 leading-relaxed pl-8 ${themeClass.textSecondary} text-sm sm:text-base`}>
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* About Me */}
        <section className={`relative py-12 sm:py-14 lg:py-16 ${sectionContentInset}`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              {/* <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeClass.textMuted}`}>
                Core Stack
              </p> */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                {aboutVisualCards.map((card, index) => {
                  const cardSizeClass =
                    card.size === "small"
                      ? "h-[190px]"
                      : card.size === "tall"
                        ? "h-[230px]"
                        : card.size === "large"
                          ? "h-[190px]"
                          : "h-[175px]";

                  const offsetClass =
                    card.label === "Vue"
                      ? "-translate-y-8"
                      : index % 2 === 0
                        ? "translate-y-0"
                        : "translate-y-5";

                  return (
                    <article
                      key={card.label}
                      className={`relative overflow-hidden rounded-xl ${cardSizeClass} ${offsetClass} ${
                        isDark
                          ? "bg-zinc-900/45 border border-zinc-800/60"
                          : "bg-white border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
                      }`}
                    >
                      <div className="relative flex h-full flex-col items-center justify-center gap-2.5 p-4">
                        <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                          <Image
                            src={card.icon}
                            alt={`${card.label} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className={`text-center text-sm font-medium ${themeClass.textMuted}`}>
                          {card.label}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className={`font-semibold ${typeScale.h2}`}>About Me</h3>
              <p className={`mt-4 leading-[1.7] ${themeClass.textSecondary} ${typeScale.body}`}>
                I currently work as a Full Stack WordPress Developer building
                custom child-theme implementations, plugin-based solutions, and
                practical tools for business workflows. My background also
                includes Laravel, Vue, React Native, and Python across web and
                mobile projects.
              </p>
              <Link
                href="/about"
                className={`mt-7 inline-flex items-center rounded-xl border px-5 py-2.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass} ${typeScale.link}`}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="mb-10">
            <h3 className={`font-semibold ${typeScale.h3}`}>What People Say</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Feedback from clients and collaborators I&apos;ve worked with.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 ${
                  isDark
                    ? "border-zinc-800/70 bg-zinc-900/40"
                    : "border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
                }`}
              >
                <div className={`absolute left-0 top-6 bottom-6 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-violet-500 ${
                  isDark ? "opacity-40" : "opacity-30"
                }`} />
                <p className={`leading-[1.7] ${themeClass.textSecondary} text-sm sm:text-base`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5">
                  <p className={`font-semibold ${typeScale.link}`}>{t.name}</p>
                  <p className={`mt-0.5 text-sm ${themeClass.textMuted}`}>{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className={`relative py-8 sm:py-10 ${sectionContentInset}`}>
          <div
            className={`relative overflow-hidden rounded-xl border ${themeClass.border} py-10 text-center sm:py-12`}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/12 to-blue-500/10" />
            <div className="pointer-events-none absolute -left-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative">
              <p className={`font-semibold uppercase tracking-[0.2em] ${themeClass.textMuted}`}>
                Have a project in mind?
              </p>
              <h3 className={`mt-3 font-semibold ${typeScale.h3}`}>
                Let&apos;s Build Your Next Project Together
              </h3>
              <p className={`mx-auto mt-3 max-w-2xl ${themeClass.textSecondary} ${typeScale.link}`}>
                I&apos;m available for WordPress development, custom plugins, full stack builds, and team collaboration. Let&apos;s talk about what you need.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={`inline-flex items-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(99,102,241,0.35)] ${typeScale.link}`}
                >
                  Start a Conversation
                </Link>
                <a
                  href="mailto:juliusnowels@gmail.com"
                  className={`inline-flex items-center rounded-xl border px-6 py-2.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass} ${typeScale.link}`}
                >
                  Email Me Directly
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`relative border-t transition-colors duration-500 ${themeClass.border}`}
      >
        <div className={`mx-auto w-full ${pageGutter}`}>
          <div
            className={`grid w-full gap-8 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start ${sectionContentInset}`}
          >
            <div className="text-center sm:text-left">
              <p
                className={`bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text font-bold text-transparent ${typeScale.h3}`}
              >
                Julius Nowel
              </p>
              <p
                className={`mt-3 leading-[1.6] ${themeClass.textSecondary} ${typeScale.body}`}
              >
                Full Stack Developer focused on custom WordPress engineering,
                practical business tools, and maintainable web applications.
              </p>
            </div>

            <div className="grid gap-x-14 gap-y-8 text-center sm:grid-cols-2 sm:text-left lg:justify-self-end">
              <div id="about">
                <p className={`font-semibold ${typeScale.h3}`}>Quick Links</p>
                <ul className="mt-3 space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`transition-colors duration-300 hover:text-violet-500 ${themeClass.textSecondary} ${typeScale.link}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="projects">
                <p className={`font-semibold ${typeScale.h3}`}>Connect</p>
                <ul className="mt-3 space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`transition-colors duration-300 hover:text-violet-500 ${themeClass.textSecondary} ${typeScale.link}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          id="contact"
          className={`border-t px-6 py-4 text-center ${themeClass.border} ${themeClass.textMuted} ${typeScale.caption}`}
        >
          © {new Date().getFullYear()} Julius Nowel B. Santiago. All rights
          reserved.
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.7s ease-out both;
        }

        .animate-fade-up-delay {
          animation: fadeUp 0.9s ease-out both;
          animation-delay: 0.12s;
        }

        :global(.rfm-marquee-container),
        :global(.rfm-marquee),
        :global(.rfm-initial-child-container) {
          overflow-y: hidden !important;
          scrollbar-width: none;
        }

        :global(.rfm-marquee-container::-webkit-scrollbar),
        :global(.rfm-marquee::-webkit-scrollbar),
        :global(.rfm-initial-child-container::-webkit-scrollbar) {
          display: none;
        }

      `}</style>
    </div>
  );
}
