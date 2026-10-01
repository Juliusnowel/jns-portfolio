"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useState, useEffect, useRef, type MouseEvent } from "react";
import { useThemeMode } from "./hooks/useThemeMode";
import { Reveal, CountUp, ScrambleText } from "./components/motion";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  // Immersive parallax alternate home (route: /showcase)
  { label: "Experience", href: "/showcase" },
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
    title: "AI Customer-Engagement (CRM)",
    tags: ["Laravel", "Next.js", "OpenRouter / LLM", "Meta API"],
    description:
      "AI layer for a CRM: Meta Messenger/Instagram conversations drafted and auto-replied by an LLM, with safety guardrails and human handoff. Built, pending Meta app review.",
    image: "/project_image_bg/crm-ai.png",
    href: "/projects",
    size: "featured",
    imagePosition: "object-top",
    imageInset: "px-2",
  },
  {
    title: "Appointment-Booking SaaS",
    tags: ["Laravel", "Next.js", "Multi-tenant"],
    description:
      "Multi-tenant appointment-booking platform: timezone-aware availability, row-locking against double-booking, prepaid package credits, and public self-booking. ~97 tests, pre-launch.",
    image: "/project_image_bg/booking.png",
    href: "/projects",
    size: "secondary",
    imagePosition: "object-top",
    imageInset: "px-2",
  },
  {
    title: "Inventory Management SaaS",
    tags: ["Laravel", "Next.js", "Multi-tenant"],
    description:
      "Multi-tenant inventory system: transactional stock-movement ledger, FEFO batch/expiry tracking, moving-average valuation, and purchase & sales orders. ~37 tests, pre-launch.",
    image: "/project_image_bg/inventory.png",
    href: "/projects",
    size: "featured",
    imagePosition: "object-top",
    imageInset: "px-2",
  },
  {
    title: "ViteSEO Systems — Unified Platform",
    tags: ["Laravel", "Next.js", "Multi-tenant", "Tech Lead"],
    description:
      "As technical lead, unified three standalone systems (HRIS/CRM/PMS) into one multi-tenant platform; owned integration & release and built the access-lifecycle test-first.",
    image: "/project_image_bg/viteseo-systems.png",
    href: "/projects",
    size: "secondary",
    imagePosition: "object-top",
    imageInset: "px-2",
  },
] as const;

const kiploProducts = [
  {
    title: "NFC Digital Business-Card Platform",
    status: "Live",
    description:
      "Account-based NFC digital business cards — multi-section profiles, themes, per-link analytics, and admin-controlled tiers.",
    href: "https://tap.kiplosolutions.com/",
  },
  {
    title: "Photo Booth Software",
    status: "Pre-launch",
    description:
      "Event photo-booth software with a custom flipbook engine — the full capture-to-print/share flow.",
    href: null,
  },
  {
    title: "Kiplo Website",
    status: "Live",
    description:
      "The brand/studio site for Kiplo — where the products live.",
    href: "https://kiplosolutions.com/",
  },
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
    title: "Plugins & Internal Tools",
    description: "Custom MU-plugins, store locators, CSV importers, SEO tools, and internal business tools that cut manual work.",
    icon: "🔌",
  },
  {
    title: "Full-Stack Apps & Systems",
    description: "End-to-end builds with Laravel, Vue, React Native, and Python — from database design to internal business systems.",
    icon: "🛠",
  },
  {
    title: "Deployment & Performance",
    description: "Server and hosting setup, migrations, CI/CD workflows, Core Web Vitals audits, and measurable speed improvements.",
    icon: "⚡",
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

  // Featured-projects hover preview: a semi-big image that follows the cursor
  // and swaps as you move between rows (pointer devices only).
  const [projHover, setProjHover] = useState<number | null>(null);
  const [projPos, setProjPos] = useState({ x: 0, y: 0 });
  const handleProjMove = (event: MouseEvent<HTMLUListElement>) =>
    setProjPos({ x: event.clientX, y: event.clientY });

  // Hero portrait: still cutout by default, plays the video on hover.
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const playHeroVideo = () => {
    const v = heroVideoRef.current;
    if (v) void v.play().catch(() => {});
  };
  const stopHeroVideo = () => {
    const v = heroVideoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Token-driven: the CSS variables handle light/dark, so these are the same in
  // both modes. Only the ring subtly differs so the header reads on either bg.
  const themeClass = {
    background: "bg-[var(--page-bg)]",
    surface: "bg-[var(--surface-bg)]",
    border: "border-[var(--border-color)]",
    textPrimary: "text-[var(--text-primary)]",
    textSecondary: "text-[var(--text-secondary)]",
    textMuted: "text-[var(--text-muted)]",
    headerGlass: "bg-[var(--header-glass)]",
    navRing: isDark ? "ring-white/10" : "ring-black/5",
    cardTone: "bg-[var(--surface-solid)]",
    imagePanel: "bg-[var(--surface-solid)]",
  };

  const outlinedCtaClass =
    "border-[var(--outline-btn-border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent-ink)]";

  return (
    <div
      id="home"
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${themeClass.background} ${themeClass.textPrimary}`}
    >

      <header className="sticky top-0 z-50 pt-3">
        <div className={`mx-auto w-full ${pageGutter}`}>
          <div
            className={`flex h-16 w-full items-center justify-between rounded-[3px] border backdrop-blur-2xl transition-colors duration-500 ${themeClass.border} ${themeClass.headerGlass} ${sectionContentInset}`}
          >
            <a
              href="#home"
              className="font-display text-lg font-extrabold tracking-tight text-[var(--accent-ink)]"
            >
              Julius Nowel
            </a>

            <div className="flex items-center gap-3 sm:gap-4">
              <nav className="hidden items-center gap-8 md:flex lg:gap-10">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative font-medium transition-all duration-300 hover:text-[var(--accent-ink)] ${
                      link.label === activeLinkLabel
                        ? "px-2.5 py-1 text-[var(--accent-ink)] after:absolute after:-bottom-1.5 after:left-2.5 after:h-0.5 after:w-[calc(100%-1.25rem)] after:rounded-full after:bg-[var(--accent)]"
                        : `${themeClass.textSecondary} px-2.5 py-1 after:absolute after:-bottom-1.5 after:left-2.5 after:h-px after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-[calc(100%-1.25rem)]`
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
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${themeClass.border} ${themeClass.surface}`}
              >
                <span className="text-2xl">{isDark ? "☀" : "☾"}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 md:hidden ${themeClass.border} ${themeClass.surface}`}
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
            className={`absolute right-4 top-20 w-56 rounded-[3px] border p-4 backdrop-blur-2xl ${themeClass.border} bg-[var(--surface-solid)] shadow-[var(--shadow-md)]`}
          >
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-[3px] px-4 py-2.5 font-medium transition-colors duration-200 ${
                      link.label === activeLinkLabel
                        ? "bg-[var(--accent-soft)] text-[var(--accent-ink)]"
                        : `${themeClass.textSecondary} hover:text-[var(--accent-ink)]`
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

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
            <div className="animate-fade-up">
              <p
                className={`font-semibold uppercase tracking-[0.2em] text-[var(--accent-ink)] ${typeScale.caption}`}
              >
                Hello, I&apos;m
              </p>
              <h1 className={`mt-3 font-bold leading-tight ${typeScale.h1}`}>
                Julius Nowel B. Santiago
              </h1>
              <h2
                className={`mt-5 lg:max-w-xl font-semibold leading-snug text-[var(--accent-ink)] ${typeScale.h2}`}
              >
                Technical Lead &amp; Full-Stack Developer
              </h2>
              <p className="mt-3 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)] sm:text-[0.95rem]">
                Building AI-powered products — LLM APIs, agents &amp; automation
              </p>
              <p
                className={`mt-5 lg:max-w-2xl leading-[1.65] ${themeClass.textSecondary} ${typeScale.body}`}
              >
                I lead and build production-grade, multi-tenant SaaS end-to-end
                (Laravel + Next.js) — appointment-booking and inventory
                platforms — and I build AI into products: an LLM-powered
                customer-engagement layer that drafts and automates replies with
                the right guardrails and human handoff.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/Julius_Nowel_Santiago_Resume_2026.pdf"
                  download
                  className={`inline-flex w-full items-center justify-center rounded-[3px] bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--on-accent)] transition-colors duration-200 hover:bg-[var(--accent-hover)] sm:w-auto ${typeScale.link}`}
                >
                  Download CV
                </a>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center rounded-[3px] border px-6 py-3 font-semibold transition-colors duration-200 ${outlinedCtaClass} ${typeScale.link}`}
                >
                 Let’s Talk
                </Link>
              </div>
            </div>

            <div className="animate-fade-up-delay w-full justify-self-center sm:w-auto lg:justify-self-end">
              {/* Layered Kiplo composition — orange brand block, near-black frame,
                  and a black tag with white text. */}
              <div className="relative mx-auto w-[17rem] sm:w-[21rem] lg:w-[25rem] xl:w-[27rem]">
                {/* Orange brand block, offset behind. */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 h-full w-full bg-[var(--accent)] sm:-bottom-4 sm:-right-4"
                />
                {/* Portrait frame — transparent cutout over the orange block,
                    near-black border. On hover the video plays over the same
                    orange, so the still comes to life. */}
                <div
                  onMouseEnter={playHeroVideo}
                  onMouseLeave={stopHeroVideo}
                  className="group relative aspect-[688/1024] overflow-hidden border-[3px] border-[#111213] bg-[#ff5a28]"
                >
                  <Image
                    src="/jns-cutout.png"
                    alt="Julius Nowel B. Santiago"
                    fill
                    priority
                    sizes="(min-width: 1280px) 27rem, (min-width: 1024px) 25rem, (min-width: 640px) 21rem, 17rem"
                    className="select-none object-cover object-top"
                  />
                  <video
                    ref={heroVideoRef}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-top opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  >
                    <source src="/jns-hero-transp.mp4" type="video/mp4" />
                  </video>
                </div>
                {/* Black tag, white text, orange mark — overlapping the frame. */}
                <div className="absolute -left-3 bottom-6 flex items-center gap-2 bg-[#111213] px-3 py-2 shadow-[var(--shadow-md)] sm:-left-4">
                  <span aria-hidden="true" className="h-2 w-2 bg-[var(--accent)]" />
                  <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white">
                    Pasig, PH
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`relative mt-2 py-8 sm:py-10 lg:py-12 ${sectionContentInset}`}
        >
          <div className="mb-6 border-b border-[var(--line-strong)] pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">[ Tech Stack ]</p>
            <h3 className={`mt-2 ${typeScale.h3}`}>Tools I build with</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Core technologies I use for custom development and production-ready builds.
            </p>
          </div>

          <div
            className={`relative overflow-hidden rounded-[3px] border py-4 sm:py-5 ${themeClass.border}`}
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
                  className="mx-1.5 inline-flex shrink-0 items-center gap-3 rounded-[3px] px-4 py-2.5"
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

        {/* Featured Projects — editorial index rows */}
        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="flex items-end justify-between gap-4 border-b border-[var(--line-strong)] pb-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">
                [ Featured Projects ]
              </p>
              <h3 className={`mt-2 ${typeScale.h3}`}>Selected product &amp; platform work</h3>
            </div>
            <Link
              href="/projects"
              className={`hidden shrink-0 whitespace-nowrap border-b-2 border-[var(--accent)] pb-0.5 font-semibold text-[var(--accent-ink)] transition-colors hover:text-[var(--accent)] sm:inline-block ${typeScale.link}`}
            >
              All projects →
            </Link>
          </div>

          <ul
            className="relative"
            onMouseMove={handleProjMove}
            onMouseLeave={() => setProjHover(null)}
          >
            {featuredProjects.map((project, i) => (
              <Reveal key={project.title} as="li" delay={i * 80} className="border-b border-[var(--border-color)]">
                <a
                  href={project.href}
                  aria-label={`View ${project.title}`}
                  onMouseEnter={() => setProjHover(i)}
                  className="group flex flex-col gap-3 py-5 transition-colors duration-200 hover:bg-[var(--accent-soft)] lg:flex-row lg:items-center lg:gap-6 lg:py-7"
                >
                  {/* Placeholder preview on mobile/tablet — screenshots land in Phase 2 */}
                  <div className="relative flex h-44 w-full shrink-0 items-center justify-center overflow-hidden border border-[#111213] bg-[var(--accent)] p-4 sm:h-52 lg:hidden">
                    <span className="text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#111213]">
                      {project.title}
                    </span>
                  </div>
                  <span className="hidden shrink-0 font-mono text-sm tabular-nums text-[var(--text-muted)] lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[1.4rem] font-bold leading-tight transition-colors group-hover:text-[var(--accent-ink)] sm:text-[1.6rem] lg:text-[1.75rem]">
                      {project.title}
                    </h4>
                    <p className={`mt-1 line-clamp-2 max-w-2xl text-sm ${themeClass.textSecondary}`}>
                      {project.description}
                    </p>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {project.tags.join(" · ")}
                    </p>
                  </div>
                  <span className="shrink-0 self-start font-semibold text-[var(--accent-ink)] transition-transform duration-200 group-hover:translate-x-0.5 lg:self-center lg:pl-4">
                    <span className="hidden sm:inline">Visit </span>↗
                  </span>
                </a>
              </Reveal>
            ))}

            {/* Cursor-following image preview (desktop pointer only) */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed z-40 hidden lg:block"
              style={{
                left: projPos.x,
                top: projPos.y,
                transform: `translate(28px, -50%) scale(${projHover !== null ? 1 : 0.9})`,
                opacity: projHover !== null ? 1 : 0,
                transition: "opacity 200ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div className="w-[22rem] overflow-hidden border border-[var(--accent)] bg-white shadow-[var(--shadow-md)]">
                <div className="relative flex aspect-[16/10] items-center justify-center bg-[var(--accent)] p-5">
                  <span className="text-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#111213]">
                    {projHover !== null ? featuredProjects[projHover].title : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-[#d2d7d9] px-3 py-2">
                  <span className="truncate text-sm font-bold text-[#111213]">
                    {projHover !== null ? featuredProjects[projHover].title : ""}
                  </span>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-[#b6320b]">
                    View ↗
                  </span>
                </div>
              </div>
            </div>
          </ul>

          <Link
            href="/projects"
            className={`mt-6 inline-block border-b-2 border-[var(--accent)] pb-0.5 font-semibold text-[var(--accent-ink)] transition-colors hover:text-[var(--accent)] sm:hidden ${typeScale.link}`}
          >
            All projects →
          </Link>
        </section>

        {/* Independent Products — Kiplo (personal product brand) */}
        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="flex items-end justify-between gap-4 border-b border-[var(--line-strong)] pb-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">
                [ Independent Products ]
              </p>
              <h3 className={`mt-2 ${typeScale.h3}`}>Kiplo — products I design &amp; build</h3>
              <p className={`mt-2 max-w-2xl text-sm ${themeClass.textSecondary}`}>
                My own product brand — not a client, not a job. Things I ship end-to-end.
              </p>
            </div>
            <Link
              href="/projects"
              className={`hidden shrink-0 whitespace-nowrap border-b-2 border-[var(--accent)] pb-0.5 font-semibold text-[var(--accent-ink)] transition-colors hover:text-[var(--accent)] sm:inline-block ${typeScale.link}`}
            >
              See all →
            </Link>
          </div>

          <div className="mt-8 grid gap-px border border-[var(--border-color)] bg-[var(--border-color)] sm:grid-cols-3">
            {kiploProducts.map((product, i) => {
              const cardClass =
                "group relative flex h-full flex-col bg-[var(--page-bg)] p-6 transition-colors duration-200 hover:bg-[var(--accent-soft)] sm:p-7";
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${
                        product.status === "Live"
                          ? "text-[var(--accent-ink)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      {product.status}
                    </span>
                    {product.href ? (
                      <span
                        aria-hidden="true"
                        className="font-semibold text-[var(--accent-ink)] transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    ) : null}
                  </div>
                  <h4 className="mt-5 text-[1.15rem] font-bold leading-snug sm:text-[1.25rem]">
                    {product.title}
                  </h4>
                  <p className={`mt-1.5 text-sm ${themeClass.textSecondary}`}>
                    {product.description}
                  </p>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                </>
              );
              return (
                <Reveal key={product.title} direction="left" delay={i * 90} className="h-full">
                  {product.href ? (
                    <a href={product.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Certifications — hairline credential grid */}
        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="border-b border-[var(--line-strong)] pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">
              [ Certifications ]
            </p>
            <h3 className={`mt-2 ${typeScale.h3}`}>Awards &amp; recognition</h3>
          </div>

          <div className="mt-8 grid gap-px border border-[var(--border-color)] bg-[var(--border-color)] sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} direction="left" delay={i * 110} className="h-full">
                <article className="group relative h-full overflow-hidden bg-[var(--page-bg)] p-6 transition-colors duration-200 hover:bg-[var(--accent-soft)] sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-sm tabular-nums text-[var(--text-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[var(--accent-ink)]">
                      {cert.issued}
                    </span>
                  </div>
                  <h4 className="mt-5 text-[1.15rem] font-bold leading-snug sm:text-[1.25rem]">
                    {cert.title}
                  </h4>
                  <p className={`mt-1.5 text-sm ${themeClass.textSecondary}`}>{cert.issuer}</p>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Results / Achievements */}
        <section className={`relative py-12 sm:py-14 lg:py-16 ${sectionContentInset}`}>
          <div className="mb-10 border-b border-[var(--line-strong)] pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">[ Results &amp; Impact ]</p>
            <h3 className={`mt-2 ${typeScale.h3}`}>What the work adds up to</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Measurable outcomes from real projects and client work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {achievements.map((item, i) => {
              const numeric = /^\d/.test(item.value);
              return (
                <Reveal
                  key={item.label}
                  delay={i * 90}
                  as="article"
                  className={`relative overflow-hidden rounded-[3px] border border-t-[3px] border-t-[var(--accent)] p-5 sm:p-6 ${
                    isDark
                      ? "border-[var(--border-color)] bg-[var(--surface-bg)]"
                      : "border-[var(--border-color)] bg-[var(--surface-solid)] shadow-[var(--shadow-sm)]"
                  }`}
                >
                  {numeric ? (
                    <CountUp
                      value={item.value}
                      className="block text-3xl font-bold tracking-tight text-[var(--accent-ink)] sm:text-4xl"
                    />
                  ) : (
                    <ScrambleText
                      value={item.value}
                      className="block text-xl font-bold tracking-tight text-[var(--accent-ink)] sm:text-2xl"
                    />
                  )}
                  <p className={`mt-3 font-semibold ${typeScale.link}`}>{item.label}</p>
                  <p className={`mt-1 text-sm ${themeClass.textMuted}`}>{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Services */}
        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="mb-8 border-b border-[var(--line-strong)] pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">[ What I Offer ]</p>
            <h3 className={`mt-2 ${typeScale.h3}`}>How I can help</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Practical development services grounded in real project experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {services.map((service, index) => (
              <Reveal
                key={service.title}
                delay={(index % 2) * 110}
                as="article"
                className={`group relative overflow-hidden rounded-[3px] border p-6 transition-colors duration-300 sm:p-7 ${
                  isDark
                    ? "border-[var(--border-color)] bg-[var(--surface-bg)] hover:bg-[var(--surface-solid)]"
                    : "border-[var(--border-color)] bg-[var(--surface-solid)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-bold tabular-nums text-[var(--accent-ink)]">
                    0{index + 1}
                  </span>
                  <h4 className={`font-semibold ${typeScale.link}`}>{service.title}</h4>
                </div>
                <p className={`mt-3 leading-relaxed pl-8 ${themeClass.textSecondary} text-sm sm:text-base`}>
                  {service.description}
                </p>
              </Reveal>
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
                      className={`relative overflow-hidden rounded-[3px] ${cardSizeClass} ${offsetClass} ${
                        isDark
                          ? "bg-[var(--surface-bg)] border border-[var(--border-color)]"
                          : "bg-[var(--surface-solid)] border border-[var(--border-color)] shadow-[var(--shadow-sm)]"
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
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">[ About ]</p>
              <h3 className={`mt-2 font-semibold ${typeScale.h2}`}>About Me</h3>
              <p className={`mt-4 leading-[1.7] ${themeClass.textSecondary} ${typeScale.body}`}>
                I work as a technical lead and full-stack developer — guiding a
                small team while staying hands-on across websites, internal
                business systems, and deployment. My work spans custom
                WordPress, Laravel, Vue, React Native, and Python, along with
                the day-to-day technical decisions that keep delivery on track.
              </p>
              <Link
                href="/about"
                className={`mt-7 inline-flex items-center rounded-[3px] border px-5 py-2.5 font-semibold transition-all duration-300 ${outlinedCtaClass} ${typeScale.link}`}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`relative py-10 sm:py-12 lg:py-14 ${sectionContentInset}`}>
          <div className="mb-10 border-b border-[var(--line-strong)] pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-ink)]">[ Testimonials ]</p>
            <h3 className={`mt-2 ${typeScale.h3}`}>What people say</h3>
            <p className={`mt-2 ${themeClass.textSecondary} ${typeScale.link}`}>
              Feedback from clients and collaborators I&apos;ve worked with.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 110}
                as="article"
                className={`relative overflow-hidden rounded-[3px] border p-6 sm:p-7 ${
                  isDark
                    ? "border-[var(--border-color)] bg-[var(--surface-bg)]"
                    : "border-[var(--border-color)] bg-[var(--surface-solid)] shadow-[var(--shadow-sm)]"
                }`}
              >
                <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-[var(--accent)]" />
                <p className={`leading-[1.7] ${themeClass.textSecondary} text-sm sm:text-base`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5">
                  <p className={`font-semibold ${typeScale.link}`}>{t.name}</p>
                  <p className={`mt-0.5 text-sm ${themeClass.textMuted}`}>{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact CTA — a confident solid-orange brand block */}
        <section className={`relative py-8 sm:py-10 ${sectionContentInset}`}>
          <div className="relative overflow-hidden rounded-[3px] bg-[var(--accent)] py-12 text-center sm:py-14">
            <div className="relative">
              <p className="font-semibold uppercase tracking-[0.2em] text-[#4a3529]">
                Have a project in mind?
              </p>
              <h3 className={`mt-3 font-bold text-[var(--on-accent)] ${typeScale.h3}`}>
                Let&apos;s Build Your Next Project Together
              </h3>
              <p className={`mx-auto mt-3 max-w-2xl text-[#4a3529] ${typeScale.link}`}>
                I&apos;m available for full stack builds, custom WordPress, internal tools, and technical lead or team collaboration roles. Let&apos;s talk about what you need.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={`inline-flex items-center rounded-[3px] bg-white px-6 py-2.5 font-semibold text-[var(--accent-ink)] transition-colors duration-200 hover:bg-[#f2ede6] ${typeScale.link}`}
                >
                  Start a Conversation
                </Link>
                <a
                  href="mailto:juliusnowels@gmail.com"
                  className={`inline-flex items-center rounded-[3px] border border-[#2b2118]/35 px-6 py-2.5 font-semibold text-[var(--on-accent)] transition-all duration-300 hover:border-[#2b2118]/65 ${typeScale.link}`}
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
                className={`font-bold text-[var(--accent-ink)] ${typeScale.h3}`}
              >
                Julius Nowel
              </p>
              <p
                className={`mt-3 leading-[1.6] ${themeClass.textSecondary} ${typeScale.body}`}
              >
                Technical lead and full-stack developer focused on web apps,
                internal business systems, and maintainable, well-deployed code.
              </p>
            </div>

            <div className="grid gap-x-14 gap-y-8 text-center sm:grid-cols-2 sm:text-left lg:justify-self-end">
              <div id="about">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-ink)]">Quick Links</p>
                <ul className="mt-3 space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`transition-colors duration-300 hover:text-[var(--accent-ink)] ${themeClass.textSecondary} ${typeScale.link}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="projects">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-ink)]">Connect</p>
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
                        className={`transition-colors duration-300 hover:text-[var(--accent-ink)] ${themeClass.textSecondary} ${typeScale.link}`}
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
