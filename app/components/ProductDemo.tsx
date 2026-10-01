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

type Scene = { caption: string; render: () => React.ReactNode };
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
        render: () => <SlotfloOverview />,
      },
      {
        caption:
          "Timezone-aware calendar (month / week / day) with row-locking that prevents double-booking.",
        render: () => <SlotfloCalendar />,
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
        render: () => <StockfloOverview />,
      },
      {
        caption:
          "Catalog with per-item cost, price, and live on-hand quantity — backed by a transactional stock ledger.",
        render: () => <StockfloItems />,
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
                  <KiploShell demo={demo}>{s.render()}</KiploShell>
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
