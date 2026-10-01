"use client";

/**
 * ProductDemo — lightweight, in-portfolio "ad" clips for the Featured systems.
 *
 * No screenshots, no video files, no running the real apps. Each demo is a
 * faithful *stylized* mock of the system's real front-end (palette, type,
 * layout taken from the actual codebase) that auto-rotates through a few
 * captioned scenes inside a modal. Kiplo-style systems use the Kiplo design
 * language below; ViteSEO systems get their own styling when added.
 */

import { useCallback, useEffect, useState } from "react";
import {
  LuX,
  LuZap,
  LuCalendarDays,
  LuBoxes,
  LuUsers,
  LuHandshake,
  LuFolderKanban,
  LuCalculator,
  LuLayoutGrid,
  LuCalendarCheck,
  LuClock,
  LuPackage,
  LuTag,
  LuChevronLeft,
  LuChevronRight,
  LuTruck,
  LuClipboardList,
  LuTriangleAlert,
  LuLayoutDashboard,
  LuInbox,
  LuMapPin,
  LuTarget,
  LuSettings,
  LuSparkles,
  LuSend,
  LuArrowRight,
  LuBell,
  LuSearch,
} from "react-icons/lu";
import type { IconType } from "react-icons";

/* ── Kiplo design tokens (from kp-systems globals.css) ── */
const K = {
  paper: "#e6f1f6",
  card: "#ffffff",
  ink: "#111213",
  muted: "#4a4e51",
  border: "#d2d7d9",
  rule: "#c2c8cb",
  fill: "#d8e6ec",
  brand: "#f5501e",
  brandInk: "#b6320b",
  subtle: "#fde3d9",
  subtleInk: "#a92d0a",
  warning: "#d9a300",
  warnSubtle: "#fbf0d2",
  success: "#157f43",
  successSubtle: "#dcf1e5",
  danger: "#c81e3c",
  dangerSubtle: "#fbe3e7",
};

/* The Kiplo product rail (icon + whether it's the active product) */
const RAIL: { key: string; Icon: IconType }[] = [
  { key: "booking", Icon: LuCalendarDays },
  { key: "inventory", Icon: LuBoxes },
  { key: "hr", Icon: LuUsers },
  { key: "crm", Icon: LuHandshake },
  { key: "projects", Icon: LuFolderKanban },
  { key: "accounting", Icon: LuCalculator },
];

type Scene = { caption: string; render: (demo: Demo) => React.ReactNode };
type Demo = {
  wordmark: string;
  eyebrow: string;
  activeKey: string;
  nav: { label: string; Icon: IconType; active?: boolean }[];
  scenes: Scene[];
};

/* ── Shared Kiplo app-shell frame (icon rail + nav panel + content) ── */
function KiploShell({
  demo,
  children,
}: {
  demo: Demo;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-full w-full overflow-hidden text-[11px]"
      style={{ background: K.paper, color: K.ink }}
    >
      {/* Icon rail */}
      <div
        className="hidden w-11 shrink-0 flex-col items-center sm:flex"
        style={{ background: K.card, borderRight: `1px solid ${K.border}` }}
      >
        <div
          className="flex h-11 w-full items-center justify-center"
          style={{ borderBottom: `1px solid ${K.border}` }}
        >
          <span
            className="flex h-6 w-6 items-center justify-center"
            style={{ background: K.brand }}
          >
            <LuZap className="h-3.5 w-3.5 text-white" />
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5 py-2">
          {RAIL.map(({ key, Icon }) => {
            const active = key === demo.activeKey;
            return (
              <span
                key={key}
                className="relative flex h-7 w-7 items-center justify-center"
                style={{
                  background: active ? K.brand : "transparent",
                  color: active ? "#fff" : K.muted,
                }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1 bottom-1 w-0.5"
                    style={{ background: K.brandInk }}
                  />
                )}
                <Icon className="h-4 w-4" />
              </span>
            );
          })}
        </div>
      </div>

      {/* Context / nav panel */}
      <div
        className="hidden w-40 shrink-0 flex-col md:flex"
        style={{ background: K.card, borderRight: `1px solid ${K.border}` }}
      >
        <div
          className="flex h-11 flex-col justify-center px-3"
          style={{ borderBottom: `1px solid ${K.border}` }}
        >
          <span
            className="text-[8px] font-bold uppercase"
            style={{ color: K.muted, letterSpacing: "0.14em" }}
          >
            {demo.eyebrow}
          </span>
          <span
            className="text-[15px] font-black uppercase leading-none"
            style={{ color: K.ink, fontFamily: "Archivo, Inter, sans-serif" }}
          >
            {demo.wordmark}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 p-2">
          {demo.nav.map((n) => (
            <span
              key={n.label}
              className="relative flex items-center gap-2 px-2 py-1.5"
              style={{
                background: n.active ? K.subtle : "transparent",
                color: n.active ? K.brandInk : K.ink,
                fontWeight: n.active ? 600 : 500,
              }}
            >
              {n.active && (
                <span
                  className="absolute left-0 top-1 bottom-1 w-0.5"
                  style={{ background: K.brandInk }}
                />
              )}
              <n.Icon className="h-[14px] w-[14px]" />
              <span>{n.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 overflow-hidden p-4">{children}</div>
    </div>
  );
}

/* ── Small shared primitives ── */
function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="pb-3" style={{ borderBottom: `1px solid ${K.rule}` }}>
      <span
        className="text-[9px] font-semibold uppercase"
        style={{ color: K.muted, letterSpacing: "0.14em" }}
      >
        {eyebrow}
      </span>
      <h4 className="text-[17px] font-semibold leading-tight" style={{ color: K.ink }}>
        {title}
      </h4>
      <p style={{ color: K.muted }}>{subtitle}</p>
    </div>
  );
}

function StatusPill({ kind }: { kind: "confirmed" | "pending" | "completed" | "noshow" }) {
  const map = {
    confirmed: { bg: K.subtle, fg: K.subtleInk, label: "Confirmed" },
    pending: { bg: K.warnSubtle, fg: "#8a6500", label: "Pending" },
    completed: { bg: K.fill, fg: K.muted, label: "Completed" },
    noshow: { bg: K.dangerSubtle, fg: K.danger, label: "No-show" },
  }[kind];
  return (
    <span
      className="shrink-0 px-1.5 py-0.5 text-[9px] font-semibold"
      style={{ background: map.bg, color: map.fg }}
    >
      {map.label}
    </span>
  );
}

/* ── Slotflo (Booking) scenes ── */
const AGENDA = [
  { t: "09:00", s: "Facial Treatment", w: "Maria Santos · Dr. Cruz", k: "confirmed" as const },
  { t: "10:30", s: "Botox Consult", w: "Jenny Lao · Dr. Reyes", k: "pending" as const },
  { t: "13:00", s: "Laser Session", w: "Paolo Uy · Dr. Cruz", k: "confirmed" as const },
  { t: "15:00", s: "Chemical Peel", w: "Rhea Tan · Dr. Lim", k: "noshow" as const },
];

function KpiStrip({ items }: { items: { label: string; value: string; note: string }[] }) {
  return (
    <div
      className="mt-4 grid grid-cols-2 sm:grid-cols-4"
      style={{ borderTop: `1px solid ${K.rule}`, borderBottom: `1px solid ${K.rule}` }}
    >
      {items.map((it, i) => (
        <div
          key={it.label}
          className="px-3 py-2.5"
          style={{ borderLeft: i === 0 ? undefined : `1px solid ${K.rule}` }}
        >
          <div className="text-[9px] uppercase" style={{ color: K.muted, letterSpacing: "0.08em" }}>
            {it.label}
          </div>
          <div
            className="text-[18px] font-semibold tabular-nums leading-tight"
            style={{ color: K.ink }}
          >
            {it.value}
          </div>
          <div className="text-[9px]" style={{ color: K.muted }}>
            {it.note}
          </div>
        </div>
      ))}
    </div>
  );
}

function SlotfloOverview() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader eyebrow="Booking" title="Overview" subtitle="What's on today, and what needs you" />
      <div className="mt-3 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] font-semibold uppercase" style={{ color: K.muted, letterSpacing: "0.12em" }}>
              Today
            </span>
            <span className="text-[9px]" style={{ color: K.muted }}>
              4 scheduled
            </span>
          </div>
          <div className="mt-1" style={{ borderTop: `1px solid ${K.rule}` }}>
            {AGENDA.map((r) => (
              <div
                key={r.t}
                className="flex items-center gap-3 py-2"
                style={{ borderBottom: `1px solid ${K.rule}` }}
              >
                <span className="w-10 shrink-0 font-semibold tabular-nums" style={{ color: K.ink }}>
                  {r.t}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium" style={{ color: K.ink }}>
                    {r.s}
                  </div>
                  <div className="truncate text-[9px]" style={{ color: K.muted }}>
                    {r.w}
                  </div>
                </div>
                <StatusPill kind={r.k} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[9px] font-semibold uppercase" style={{ color: K.muted, letterSpacing: "0.12em" }}>
            Needs action
          </span>
          <div
            className="mt-1 flex items-center justify-between px-2.5 py-2"
            style={{ border: `1px solid ${K.brand}`, background: K.subtle }}
          >
            <span style={{ color: K.subtleInk }}>Pending approvals</span>
            <span className="font-semibold tabular-nums" style={{ color: K.subtleInk }}>
              3
            </span>
          </div>
          {["Jenny Lao · Botox · 2h", "Mark Yu · Facial · 5h"].map((x) => (
            <div key={x} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${K.rule}`, color: K.ink }}>
              <span className="truncate">{x}</span>
            </div>
          ))}
          <div className="mt-1 text-[9px] font-semibold" style={{ color: K.brandInk }}>
            Review requests ↗
          </div>
        </div>
      </div>
      <KpiStrip
        items={[
          { label: "Today", value: "4", note: "confirmed & pending" },
          { label: "Upcoming", value: "12", note: "still to come" },
          { label: "All bookings", value: "128", note: "every status" },
          { label: "No-show rate", value: "6%", note: "last 30 days" },
        ]}
      />
    </div>
  );
}

const CAL_DOTS: Record<number, "confirmed" | "pending" | "noshow"> = {
  3: "confirmed",
  7: "pending",
  12: "confirmed",
  15: "noshow",
  18: "confirmed",
  22: "pending",
  26: "confirmed",
};
const DOT_COLOR = { confirmed: K.brand, pending: K.warning, noshow: K.danger };

function SlotfloCalendar() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2); // start offset
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-2" style={{ borderBottom: `1px solid ${K.rule}` }}>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1" style={{ color: K.muted }}>
            <LuChevronLeft className="h-3.5 w-3.5" />
            <span className="px-1.5 py-0.5" style={{ border: `1px solid ${K.border}` }}>
              Today
            </span>
            <LuChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className="text-[13px] font-semibold" style={{ color: K.ink }}>
            October 2026
          </span>
        </div>
        <div className="flex" style={{ border: `1px solid ${K.border}` }}>
          {["Month", "Week", "Day"].map((v, i) => (
            <span
              key={v}
              className="px-2 py-0.5 text-[9px]"
              style={{
                background: i === 0 ? K.brand : "transparent",
                color: i === 0 ? "#fff" : K.muted,
                borderLeft: i === 0 ? undefined : `1px solid ${K.border}`,
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>
      {/* weekday header */}
      <div className="mt-2 grid grid-cols-7" style={{ background: K.fill }}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="py-1 text-center text-[8px] font-bold uppercase" style={{ color: K.muted }}>
            {d}
          </div>
        ))}
      </div>
      {/* grid */}
      <div className="grid flex-1 grid-cols-7" style={{ borderLeft: `1px solid ${K.border}`, borderTop: `1px solid ${K.border}` }}>
        {days.map((d) => {
          const inMonth = d >= 1 && d <= 31;
          const isToday = d === 15;
          const ev = CAL_DOTS[d];
          return (
            <div
              key={d}
              className="min-h-[2.1rem] p-1"
              style={{
                borderRight: `1px solid ${K.border}`,
                borderBottom: `1px solid ${K.border}`,
                background: inMonth ? K.card : K.fill,
              }}
            >
              <span
                className="flex h-3.5 w-3.5 items-center justify-center text-[8px] tabular-nums"
                style={
                  isToday
                    ? { background: K.brand, color: "#fff", borderRadius: "999px" }
                    : { color: inMonth ? K.ink : K.muted }
                }
              >
                {inMonth ? d : ""}
              </span>
              {ev && (
                <span className="mt-0.5 flex items-center gap-0.5">
                  <span className="h-1 w-1 rounded-full" style={{ background: DOT_COLOR[ev] }} />
                  <span className="truncate text-[7px]" style={{ color: K.muted }}>
                    booking
                  </span>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Stockflo (Inventory) scenes ── */
function StockChip({ out }: { out?: boolean }) {
  return (
    <span
      className="shrink-0 px-1.5 py-0.5 text-[9px] font-semibold"
      style={
        out
          ? { border: `1px solid ${K.brand}`, background: K.subtle, color: K.brandInk }
          : { border: `1px solid ${K.rule}`, color: K.muted }
      }
    >
      {out ? "Out of stock" : "Low"}
    </span>
  );
}

function StatCard({
  label,
  value,
  note,
  highlight,
}: {
  label: string;
  value: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="relative p-3"
      style={{
        border: `1px solid ${highlight ? K.brand : K.border}`,
        background: highlight ? K.subtle : K.card,
      }}
    >
      <span className="absolute left-0 top-2 bottom-2 w-0.5" style={{ background: highlight ? K.brand : K.border }} />
      <div className="pl-1.5">
        <div className="text-[9px] uppercase" style={{ color: K.muted, letterSpacing: "0.06em" }}>
          {label}
        </div>
        <div className="text-[18px] font-semibold tabular-nums leading-tight" style={{ color: highlight ? K.subtleInk : K.ink }}>
          {value}
        </div>
        <div className="text-[9px]" style={{ color: K.muted }}>
          {note}
        </div>
      </div>
    </div>
  );
}

const STOCK_LOW = [
  { q: "0", name: "Collagen Mask", sub: "CM-050 · reorder at 15", out: true },
  { q: "0", name: "Retinol Cream", sub: "RC-030 · reorder at 10", out: true },
  { q: "12", name: "Hydrating Serum", sub: "HS-200 · reorder at 20", out: false },
  { q: "8", name: "Vitamin C Drops", sub: "VC-110 · reorder at 15", out: false },
];

function StockfloOverview() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader eyebrow="Inventory" title="Inventory Overview" subtitle="Stock health at a glance" />
      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] font-semibold uppercase" style={{ color: K.muted, letterSpacing: "0.12em" }}>
              Stock
            </span>
            <span className="text-[9px]" style={{ color: K.muted }}>
              4 items below reorder point
            </span>
          </div>
          <div className="mt-1" style={{ borderTop: `1px solid ${K.rule}` }}>
            {STOCK_LOW.map((r) => (
              <div key={r.name} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${K.rule}` }}>
                <span className="w-7 shrink-0 font-semibold tabular-nums" style={{ color: K.ink }}>
                  {r.q}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium" style={{ color: K.brandInk }}>
                    {r.name}
                  </div>
                  <div className="truncate text-[9px]" style={{ color: K.muted }}>
                    {r.sub}
                  </div>
                </div>
                <StockChip out={r.out} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[9px] font-semibold uppercase" style={{ color: K.muted, letterSpacing: "0.12em" }}>
            Alerts
          </span>
          <div className="mt-1" style={{ borderTop: `1px solid ${K.rule}` }}>
            {[
              { l: "Expiring soon", n: "batches ≤ 30 days", v: "14" },
              { l: "Open POs", n: "ordered & partial", v: "3" },
              { l: "To reorder", n: "below reorder point", v: "5" },
            ].map((p) => (
              <div key={p.l} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${K.rule}` }}>
                <div className="min-w-0">
                  <div className="truncate font-medium" style={{ color: K.ink }}>
                    {p.l}
                  </div>
                  <div className="truncate text-[9px]" style={{ color: K.muted }}>
                    {p.n}
                  </div>
                </div>
                <span className="flex items-center gap-1 font-semibold tabular-nums" style={{ color: K.ink }}>
                  {p.v}
                  <span style={{ color: K.brandInk }}>↗</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-[9px] font-semibold uppercase" style={{ color: K.muted, letterSpacing: "0.12em" }}>
          At a glance
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <StatCard label="Total items" value="342" note="in catalog" />
          <StatCard label="Low stock" value="5" note="below reorder" highlight />
          <StatCard label="Out of stock" value="2" note="nothing on hand" highlight />
          <StatCard label="Expiring (30d)" value="14" note="batches nearing" />
          <StatCard label="Stock value" value="₱412,800" note="at cost, on hand" />
          <StatCard label="Open POs" value="3" note="ordered & partial" />
        </div>
      </div>
    </div>
  );
}

const ITEMS = [
  { name: "Hydrating Serum", sub: "HS-200 · Skincare", cost: "₱180", price: "₱450", qty: "12", tag: "low" as const },
  { name: "Collagen Mask", sub: "CM-050 · Treatment", cost: "₱90", price: "₱250", qty: "0", tag: "out" as const },
  { name: "Facial Cleanser", sub: "FC-010 · Skincare", cost: "₱120", price: "₱300", qty: "86", tag: null },
  { name: "Sunscreen SPF50", sub: "SS-050 · Skincare", cost: "₱160", price: "₱420", qty: "54", tag: null },
  { name: "Vitamin C Drops", sub: "VC-110 · Serum", cost: "₱210", price: "₱560", qty: "8", tag: "low" as const },
];

function StockfloItems() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader eyebrow="Catalog" title="Items" subtitle="Everything you track in inventory" />
      <div className="mt-3 overflow-hidden" style={{ border: `1px solid ${K.border}`, background: K.card }}>
        <div className="grid grid-cols-[2fr_0.8fr_0.8fr_0.9fr] px-3 py-2 text-[9px] font-medium uppercase" style={{ background: K.fill, color: K.muted, letterSpacing: "0.06em" }}>
          <span>Item</span>
          <span className="text-right">Cost</span>
          <span className="text-right">Price</span>
          <span className="text-right">On hand</span>
        </div>
        {ITEMS.map((it) => (
          <div key={it.name} className="grid grid-cols-[2fr_0.8fr_0.8fr_0.9fr] items-center px-3 py-2" style={{ borderTop: `1px solid ${K.border}` }}>
            <div className="min-w-0">
              <div className="truncate font-medium" style={{ color: K.ink }}>
                {it.name}
              </div>
              <div className="truncate text-[9px]" style={{ color: K.muted }}>
                {it.sub}
              </div>
            </div>
            <span className="text-right tabular-nums" style={{ color: K.ink }}>{it.cost}</span>
            <span className="text-right tabular-nums" style={{ color: K.ink }}>{it.price}</span>
            <span className="flex items-center justify-end gap-1.5 tabular-nums" style={{ color: K.ink }}>
              <span className="font-semibold">{it.qty}</span>
              {it.tag && <StockChip out={it.tag === "out"} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ViteSEO (teal) design tokens (from vs-platform) ── */
const V = {
  page: "#fafafe",
  card: "#ffffff",
  ink: "#111827",
  muted: "#6b7280",
  border: "#e5e7ea",
  subtle: "#f0f0f0",
  teal: "#4fdbd7",
  tealInk: "#19414b",
  tealSubtle: "#e4faf9",
  tealStrong: "#0f7a78",
  sidebar: "#141414",
  sidebarText: "#a0aec0",
  sidebarAccent: "#262626",
  danger: "#ef4444",
  warning: "#f5a623",
  info: "#3b82f6",
};

/* ViteSEO dark-sidebar + topbar shell */
function ViteShell({
  demo,
  brandIcon,
  activeLabel,
  children,
}: {
  demo: Demo;
  brandIcon: IconType;
  activeLabel: string;
  children: React.ReactNode;
}) {
  const Brand = brandIcon;
  return (
    <div className="flex h-full w-full overflow-hidden text-[11px]" style={{ background: V.page, color: V.ink }}>
      <div className="hidden w-40 shrink-0 flex-col md:flex" style={{ background: V.sidebar }}>
        <div className="flex h-12 items-center gap-2 px-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: V.teal }}>
            <Brand className="h-4 w-4" style={{ color: V.tealInk }} />
          </span>
          <span className="text-[14px] font-extrabold text-white">{demo.wordmark}</span>
        </div>
        <div className="px-3 pb-1 pt-2 text-[8px] font-semibold uppercase" style={{ color: V.sidebarText, letterSpacing: "0.14em" }}>
          Workspace
        </div>
        <div className="flex flex-col gap-0.5 px-2">
          {demo.nav.map((n) => {
            const active = n.label === activeLabel;
            return (
              <span
                key={n.label}
                className="relative flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                style={{ background: active ? V.sidebarAccent : "transparent", color: active ? "#fff" : V.sidebarText }}
              >
                {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r" style={{ background: V.teal }} />}
                <n.Icon className="h-[15px] w-[15px]" />
                <span style={{ fontWeight: active ? 600 : 500 }}>{n.label}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-9 shrink-0 items-center justify-between px-3" style={{ background: V.card, borderBottom: `1px solid ${V.border}` }}>
          <div className="flex items-center gap-1.5 rounded-lg px-2 py-0.5" style={{ border: `1px solid ${V.border}`, color: V.muted }}>
            <LuSearch className="h-3 w-3" />
            <span className="text-[9px]">Search…</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: V.muted }}>
            <LuBell className="h-3.5 w-3.5" />
            <LuLayoutGrid className="h-3.5 w-3.5" />
            <span className="h-5 w-5 rounded-full" style={{ background: V.tealSubtle, border: `1px solid ${V.teal}` }} />
          </div>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden p-3" style={{ background: V.page }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Zerem (CRM) scenes ── */
function ChannelPill({ ch }: { ch: "Messenger" | "Instagram" }) {
  const m = ch === "Messenger" ? { bg: "#eff6ff", fg: "#1d4ed8" } : { bg: "#fdf2f8", fg: "#be185d" };
  return (
    <span className="rounded-full px-1.5 py-0.5 text-[8px] font-medium" style={{ background: m.bg, color: m.fg }}>
      {ch}
    </span>
  );
}

const CONVOS = [
  { ch: "Messenger" as const, name: "Maria Santos", prev: "Available ba kayo for facial this Saturday?", t: "2m" },
  { ch: "Instagram" as const, name: "@jennylao", prev: "How much po yung botox consult?", t: "18m" },
  { ch: "Messenger" as const, name: "Paolo Uy", prev: "Thanks! See you at 1pm.", t: "1h" },
];

function ZeremInbox() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          {["All", "Messenger", "Instagram"].map((f, i) => (
            <span
              key={f}
              className="rounded-full px-2 py-0.5 text-[9px]"
              style={
                i === 0
                  ? { border: `1px solid ${V.teal}`, background: V.tealSubtle, color: V.tealStrong }
                  : { border: `1px solid ${V.border}`, color: V.muted }
              }
            >
              {f}
            </span>
          ))}
        </div>
        <span className="text-[9px]" style={{ color: V.muted }}>
          3 conversations
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[12rem_1fr]">
        <div className="hidden flex-col overflow-hidden rounded-xl lg:flex" style={{ border: `1px solid ${V.border}`, background: V.card }}>
          {CONVOS.map((c, i) => (
            <div key={c.name} className="px-2.5 py-2" style={{ borderBottom: `1px solid ${V.subtle}`, background: i === 0 ? V.tealSubtle : "transparent" }}>
              <div className="flex items-center justify-between">
                <ChannelPill ch={c.ch} />
                <span className="text-[8px]" style={{ color: V.muted }}>{c.t}</span>
              </div>
              <div className="mt-1 truncate text-[10px] font-medium" style={{ color: V.ink }}>{c.name}</div>
              <div className="truncate text-[9px]" style={{ color: V.muted }}>{c.prev}</div>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl" style={{ border: `1px solid ${V.border}`, background: V.card }}>
          <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: `1px solid ${V.subtle}` }}>
            <div className="flex items-center gap-2">
              <ChannelPill ch="Messenger" />
              <span className="text-[9px]" style={{ color: V.muted }}>4 messages</span>
            </div>
            <span className="rounded-lg px-2 py-0.5 text-[9px]" style={{ border: `1px solid ${V.border}`, color: V.ink }}>Link lead</span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 overflow-hidden p-2.5">
            <div className="max-w-[80%] self-start rounded-xl px-2.5 py-1.5 text-[10px]" style={{ background: "#f3f4f6", color: V.ink }}>
              Available ba kayo for facial this Saturday?
            </div>
            <div className="max-w-[80%] self-end rounded-xl px-2.5 py-1.5 text-[10px]" style={{ background: V.tealSubtle, border: `1px solid ${V.teal}`, color: V.tealInk }}>
              Hi Maria! Yes — 2pm and 4pm are open. Which works for you?
            </div>
            <div className="self-end text-[8px]" style={{ color: V.muted }}>Us · Sent</div>
          </div>
          <div className="px-2.5 py-2" style={{ borderTop: `1px solid ${V.subtle}` }}>
            <div className="rounded-lg px-2 py-1.5 text-[9px]" style={{ border: `1px solid ${V.border}`, color: V.muted }}>Write a reply…</div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-lg px-2 py-1 text-[9px]" style={{ border: `1px solid ${V.teal}`, color: V.tealStrong }}>
                <LuSparkles className="h-3 w-3" /> Draft with AI
              </span>
              <span className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[9px] font-semibold" style={{ background: V.teal, color: V.tealInk }}>
                <LuSend className="h-3 w-3" /> Send
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViteKpi({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl p-2.5" style={{ border: `1px solid ${V.border}`, background: V.card }}>
      <span className="absolute left-0 right-0 top-0 h-0.5" style={{ background: V.teal }} />
      <div className="text-[8px] uppercase" style={{ color: V.muted, letterSpacing: "0.08em" }}>{label}</div>
      <div className="text-[18px] font-extrabold tabular-nums leading-tight" style={{ color: V.ink }}>{value}</div>
      <div className="text-[8px]" style={{ color: V.muted }}>{note}</div>
    </div>
  );
}

const LEADS = [
  { biz: "Glow Derma Clinic", who: "Maria Santos", pr: "High", prc: V.danger, st: "Interested" },
  { biz: "Bloom Salon & Spa", who: "Rea Villamor", pr: "Medium", prc: V.warning, st: "Call-back" },
  { biz: "Seda Hotel BGC", who: "Arnel Dizon", pr: "High", prc: V.danger, st: "Awaiting" },
  { biz: "Summit Media", who: "Karen Lao", pr: "Low", prc: V.info, st: "Interested" },
];

function ViteDashboard() {
  return (
    <div className="flex h-full flex-col gap-3">
      <h4 className="text-[15px] font-extrabold" style={{ color: V.ink }}>Dashboard</h4>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ViteKpi label="New leads" value="42" note="this week" />
        <ViteKpi label="Follow-ups" value="18" note="due today" />
        <ViteKpi label="Conversion" value="24%" note="last 30 days" />
        <ViteKpi label="Pipeline" value="₱1.2M" note="open value" />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-xl" style={{ border: `1px solid ${V.border}`, background: V.card }}>
        <div className="grid grid-cols-[1.6fr_1fr_0.8fr_0.9fr] px-3 py-1.5 text-[8px] font-semibold uppercase" style={{ background: "#f9fafb", color: V.muted, letterSpacing: "0.08em" }}>
          <span>Business</span>
          <span>Contact</span>
          <span>Priority</span>
          <span>Status</span>
        </div>
        {LEADS.map((l) => (
          <div key={l.biz} className="grid grid-cols-[1.6fr_1fr_0.8fr_0.9fr] items-center px-3 py-1.5" style={{ borderTop: `1px solid ${V.subtle}` }}>
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="h-5 w-5 shrink-0 rounded-full" style={{ background: "#eef2f7" }} />
              <span className="truncate text-[10px] font-medium" style={{ color: V.ink }}>{l.biz}</span>
            </div>
            <span className="truncate text-[9px]" style={{ color: V.muted }}>{l.who}</span>
            <span className="flex items-center gap-1 text-[9px]" style={{ color: V.ink }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.prc }} />
              {l.pr}
            </span>
            <span className="justify-self-start rounded-full px-1.5 py-0.5 text-[8px] font-medium" style={{ background: V.tealSubtle, color: V.tealStrong }}>
              {l.st}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SYSTEMS = [
  { name: "TeamOra", sub: "HRIS", desc: "People, attendance, payroll & company records.", Icon: LuUsers },
  { name: "Zerem", sub: "CRM", desc: "Leads, follow-ups, clients & sales performance.", Icon: LuHandshake },
  { name: "Sprintly", sub: "Projects", desc: "Workspaces, boards, tasks & team planning.", Icon: LuFolderKanban },
];

function ViteLauncher() {
  return (
    <div className="flex h-full flex-col overflow-hidden p-4" style={{ background: V.page, color: V.ink }}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: V.teal }}>
          <LuZap className="h-4 w-4" style={{ color: V.tealInk }} />
        </span>
        <span className="text-[15px] font-bold">Vite SEO Systems</span>
      </div>
      <div className="mt-4">
        <div className="text-[18px] font-bold" style={{ color: V.ink }}>Good afternoon, Julius.</div>
        <div className="text-[10px]" style={{ color: V.muted }}>Choose a system to get started.</div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {SYSTEMS.map((s) => (
          <div key={s.name} className="rounded-2xl p-3" style={{ border: `1px solid ${V.border}`, background: V.card }}>
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: V.tealSubtle, color: V.tealInk }}>
                <s.Icon className="h-4 w-4" />
              </span>
              <LuArrowRight className="h-3.5 w-3.5" style={{ color: V.muted }} />
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-[13px] font-bold" style={{ color: V.ink }}>{s.name}</span>
              <span className="text-[8px] font-semibold uppercase" style={{ color: V.muted, letterSpacing: "0.1em" }}>{s.sub}</span>
            </div>
            <div className="mt-1 text-[9px]" style={{ color: V.muted }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Demo registry ── */
const DEMOS: Record<string, Demo> = {
  booking: {
    wordmark: "Slotflo",
    eyebrow: "Booking",
    activeKey: "booking",
    nav: [
      { label: "Overview", Icon: LuLayoutGrid, active: true },
      { label: "Bookings", Icon: LuCalendarCheck },
      { label: "Calendar", Icon: LuCalendarDays },
      { label: "Customers", Icon: LuUsers },
      { label: "Waitlist", Icon: LuClock },
      { label: "Packages", Icon: LuPackage },
      { label: "Services", Icon: LuTag },
    ],
    scenes: [
      {
        caption:
          "Appointment booking — today's agenda, pending approvals, and no-show rate at a glance.",
        render: (demo) => (
          <KiploShell demo={demo}>
            <SlotfloOverview />
          </KiploShell>
        ),
      },
      {
        caption:
          "Timezone-aware calendar (month / week / day) with row-locking that prevents double-booking.",
        render: (demo) => (
          <KiploShell demo={demo}>
            <SlotfloCalendar />
          </KiploShell>
        ),
      },
    ],
  },
  inventory: {
    wordmark: "Stockflo",
    eyebrow: "Inventory",
    activeKey: "inventory",
    nav: [
      { label: "Overview", Icon: LuLayoutGrid, active: true },
      { label: "Items", Icon: LuBoxes },
      { label: "Low Stock", Icon: LuTriangleAlert },
      { label: "Reorder", Icon: LuPackage },
      { label: "Expiring", Icon: LuCalendarDays },
      { label: "Suppliers", Icon: LuTruck },
      { label: "Purchase Orders", Icon: LuClipboardList },
    ],
    scenes: [
      {
        caption:
          "Inventory health — items below reorder point, expiry & PO alerts, and stock value at a glance.",
        render: (demo) => (
          <KiploShell demo={demo}>
            <StockfloOverview />
          </KiploShell>
        ),
      },
      {
        caption:
          "Catalog with per-item cost, price, and live on-hand quantity — backed by a transactional stock ledger.",
        render: (demo) => (
          <KiploShell demo={demo}>
            <StockfloItems />
          </KiploShell>
        ),
      },
    ],
  },
  crm: {
    wordmark: "Zerem",
    eyebrow: "CRM",
    activeKey: "crm",
    nav: [
      { label: "Dashboard", Icon: LuLayoutDashboard },
      { label: "Leads", Icon: LuUsers },
      { label: "Inbox", Icon: LuInbox },
      { label: "Nearby Clients", Icon: LuMapPin },
      { label: "Reports", Icon: LuTarget },
      { label: "Settings", Icon: LuSettings },
    ],
    scenes: [
      {
        caption:
          "Meta Messenger/Instagram inbox — an LLM drafts the reply (Draft with AI), a human reviews before it sends.",
        render: (demo) => (
          <ViteShell demo={demo} brandIcon={LuHandshake} activeLabel="Inbox">
            <ZeremInbox />
          </ViteShell>
        ),
      },
      {
        caption:
          "CRM dashboard — lead priority, conversion, and pipeline across the team.",
        render: (demo) => (
          <ViteShell demo={demo} brandIcon={LuHandshake} activeLabel="Dashboard">
            <ViteDashboard />
          </ViteShell>
        ),
      },
    ],
  },
  platform: {
    wordmark: "Vite SEO",
    eyebrow: "Platform",
    activeKey: "platform",
    nav: [
      { label: "Dashboard", Icon: LuLayoutDashboard },
      { label: "People", Icon: LuUsers },
      { label: "Clients", Icon: LuHandshake },
      { label: "Projects", Icon: LuFolderKanban },
      { label: "Settings", Icon: LuSettings },
    ],
    scenes: [
      {
        caption:
          "One login → the launcher: TeamOra (HRIS), Zerem (CRM), Sprintly (Projects) in one multi-tenant platform.",
        render: () => <ViteLauncher />,
      },
      {
        caption:
          "A single shared shell and sign-in across all three systems, org-scoped per tenant.",
        render: (demo) => (
          <ViteShell demo={demo} brandIcon={LuZap} activeLabel="Dashboard">
            <ViteDashboard />
          </ViteShell>
        ),
      },
    ],
  },
};

/* ── The modal ── */
export function ProductDemoModal({
  productKey,
  title,
  onClose,
}: {
  productKey: string | null;
  title: string;
  onClose: () => void;
}) {
  const demo = productKey ? DEMOS[productKey] : null;
  const [scene, setScene] = useState(0);

  // reset to first scene whenever a new product opens
  useEffect(() => {
    setScene(0);
  }, [productKey]);

  // close on Escape
  useEffect(() => {
    if (!productKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [productKey, onClose]);

  // auto-rotate scenes (ad-like)
  useEffect(() => {
    if (!demo || demo.scenes.length < 2) return;
    const id = window.setInterval(() => {
      setScene((s) => (s + 1) % demo.scenes.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [demo]);

  if (!productKey) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} demo`}
    >
      {/* backdrop */}
      <button
        aria-label="Close demo"
        onClick={onClose}
        className="absolute inset-0 bg-[#111213]/70 backdrop-blur-sm"
      />

      {/* panel */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col border-[3px] border-[#111213] bg-[var(--page-bg)] shadow-[var(--shadow-md)]">
        {/* header */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-color)] px-4 py-2.5">
          <div className="min-w-0">
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent-ink)]">
              [ Demo preview ]
            </p>
            <h3 className="truncate text-base font-bold text-[var(--text-primary)]">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 border border-[#111213] p-1.5 text-[#111213] transition-colors hover:bg-[var(--accent)]"
          >
            <LuX className="h-4 w-4" />
          </button>
        </div>

        {demo ? (
          <>
            {/* mock screen */}
            <div className="relative h-[20rem] w-full overflow-hidden border-b border-[var(--border-color)] sm:h-[24rem]">
              {demo.scenes.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-500 ease-out"
                  style={{ opacity: i === scene ? 1 : 0, pointerEvents: i === scene ? "auto" : "none" }}
                  aria-hidden={i !== scene}
                >
                  {s.render(demo)}
                </div>
              ))}
              {/* stylized tag */}
              <span className="absolute right-2 top-2 z-10 bg-[#111213] px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white">
                Stylized preview
              </span>
            </div>

            {/* caption + controls */}
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="min-w-0 flex-1 text-sm text-[var(--text-secondary)]">
                {demo.scenes[scene].caption}
              </p>
              <div className="flex shrink-0 items-center gap-1.5">
                {demo.scenes.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Scene ${i + 1}`}
                    onClick={() => setScene(i)}
                    className="h-2 w-2 rounded-full transition-colors"
                    style={{ background: i === scene ? "var(--accent)" : "var(--border-color)" }}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-[16rem] flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Demo coming soon
            </p>
            <p className="max-w-sm text-sm text-[var(--text-secondary)]">
              A short stylized walkthrough of this system is on the way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
