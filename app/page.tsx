"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useState, type MouseEvent } from "react";
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
        surface: "bg-white/75",
        border: "border-slate-200",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-700",
        textMuted: "text-slate-500",
        headerGlass: "bg-white/60",
        navRing: "ring-black/10",
        cardTone: "bg-white/70",
        imagePanel: "bg-white/80",
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
    : "border-slate-600 text-slate-800 hover:border-slate-900 hover:text-slate-900";

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
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-violet-500/12 blur-[0.5px] ${
          size === "featured"
            ? "translate-x-[8px] translate-y-[8px]"
            : "translate-x-[5px] translate-y-[5px]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-blue-500/10 blur-[1px] ${
          size === "featured"
            ? "translate-x-[14px] translate-y-[14px]"
            : "translate-x-[10px] translate-y-[10px]"
        }`}
      />

      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_40px_rgba(10,14,28,0.32)]">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-contain py-2 ${imageInset} ${imagePosition}`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            size === "featured"
              ? "bg-gradient-to-t from-black/82 via-black/30 to-black/5 group-hover:from-black/74"
              : "bg-gradient-to-t from-black/76 via-black/24 to-black/8 group-hover:from-black/68"
          }`}
        />

        <div className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/35 text-lg text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
                className="rounded-md bg-black/45 px-2.5 py-1 text-sm font-medium text-zinc-100 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-2 max-h-0 max-w-[95%] overflow-hidden text-base leading-relaxed text-zinc-200 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
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
            </div>
          </div>
        </div>
      </header>

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
                className={`mt-5 max-w-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text font-semibold leading-snug text-transparent ${typeScale.h2}`}
              >
                Building custom WordPress solutions, business tools, and full
                stack web applications
              </h2>
              <p
                className={`mt-5 max-w-xl leading-[1.65] lg:max-w-2xl ${themeClass.textSecondary} ${typeScale.body}`}
              >
                I currently work as a Full Stack WordPress Developer, building
                websites with a child-theme approach and developing custom
                plugins for practical business needs. I also bring hands-on
                experience with Laravel, Vue, React Native, and Python for
                end-to-end solution delivery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/cv-placeholder.pdf"
                  className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(99,102,241,0.42)] ${typeScale.link}`}
                >
                  Download CV
                </a>
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
          {/* <div className="mb-5 sm:mb-6">
            <h3 className={`font-semibold ${typeScale.h3}`}>Tech Stack</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Core technologies I use for custom development and production-ready builds.
            </p>
          </div> */}

          <div
            className={`relative overflow-hidden rounded-2xl border py-4 sm:py-5 ${themeClass.border}`}
          >
            <Marquee
              autoFill
              pauseOnHover={false}
              speed={30}
              gradient
              gradientWidth={96}
              gradientColor={isDark ? "rgb(9, 9, 11)" : "rgb(248, 250, 252)"}
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
              className={`rounded-xl border px-4 py-2 font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass} ${typeScale.link}`}
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

        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {aboutVisualCards.map((card, index) => {
                const cardSizeClass =
                  card.size === "small"
                    ? "h-[205px]"
                    : card.size === "tall"
                      ? "h-[245px]"
                      : card.size === "large"
                        ? "h-[205px]"
                        : "h-[190px]";

                const offsetClass =
                  card.label === "Vue"
                    ? "-translate-y-10"
                    : index % 2 === 0
                      ? "translate-y-0"
                      : "translate-y-6";

                return (
                  <article
                    key={card.label}
                    className={`relative overflow-hidden rounded-2xl border ${themeClass.surface} ${cardSizeClass} ${offsetClass} ${
                      isDark
                        ? "border-white/20 ring-1 ring-violet-400/20"
                        : "border-slate-300 ring-1 ring-violet-300/35"
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-transparent" />
                    <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4">
                      <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                        <Image
                          src={card.icon}
                          alt={`${card.label} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className={`text-center font-medium ${typeScale.link}`}>
                        {card.label}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div>
              <h3 className={`font-semibold ${typeScale.h3}`}>About Me</h3>
              <p className={`mt-3 leading-[1.65] ${themeClass.textSecondary} ${typeScale.body}`}>
                I currently work as a Full Stack WordPress Developer building
                custom child-theme implementations, plugin-based solutions, and
                practical tools for business workflows. My background also
                includes Laravel, Vue, React Native, and Python across web and
                mobile projects.
              </p>
              <Link
                href="/about"
                className={`mt-6 inline-flex items-center rounded-xl border px-5 py-2.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass} ${typeScale.link}`}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className={`relative py-8 sm:py-10 ${sectionContentInset}`}>
          <div
            className={`relative overflow-hidden border-y rounded-xl ${themeClass.border} py-10 text-center sm:py-12`}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/12 to-blue-500/10" />
            <div className="pointer-events-none absolute -left-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative">
              <p className={`font-semibold uppercase tracking-[0.2em] ${themeClass.textMuted}`}>
                Ready to Collaborate?
              </p>
              <h3 className={`mt-3 font-semibold ${typeScale.h3}`}>
                Let&apos;s Build Practical Solutions Together
              </h3>
              <p className={`mx-auto mt-3 max-w-2xl ${themeClass.textSecondary} ${typeScale.link}`}>
                Open to full stack and WordPress-focused opportunities where I
                can contribute to real product and business goals.
              </p>
              <Link
                href="/contact"
                className={`mt-6 inline-flex items-center rounded-xl border px-5 py-2.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 ${outlinedCtaClass} ${typeScale.link}`}
              >
                Contact Me
              </Link>
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
            <div>
              <p
                className={`bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text font-bold text-transparent ${typeScale.h3}`}
              >
                Julius Nowel
              </p>
              <p
                className={`mt-3 max-w-sm leading-[1.6] ${themeClass.textSecondary} ${typeScale.body}`}
              >
                Full Stack Developer focused on custom WordPress engineering,
                practical business tools, and maintainable web applications.
              </p>
            </div>

            <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:justify-self-end">
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
