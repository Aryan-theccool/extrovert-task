"use client";

import React from "react";
import Logo from "@/components/ui/Logo";
import { HomeIcon, ChatIcon, CreateIcon, ProfileIcon } from "./NavIcons";

export type NavTab = "home" | "chats" | "create" | "profile";

interface EventCard {
  title: string;
  host: string;
  badge: string;
  badgeIcon: string;
  badgeColor: string;
  time: string;
  date: string;
  address: string;
  spotsLeft?: string;
  gradient: string;
}

const EVENTS: EventCard[] = [
  {
    title: "Parttyyy",
    host: "@bhanuhu",
    badge: "Dinner Event",
    badgeIcon: "🍽️",
    badgeColor: "#E8963C",
    time: "8:00 PM",
    date: "28/08/26",
    address: "Vijay Nagar, Indore, Madhya Pradesh, India",
    gradient: "linear-gradient(135deg,#B03A66,#8E2F55)",
  },
  {
    title: "Party jam",
    host: "@jatinraja",
    badge: "Music Jam",
    badgeIcon: "🎸",
    badgeColor: "#8B5CF6",
    time: "9:24 PM",
    date: "03/09/26",
    address: "HRC, IIM Indore, Indore, Madhya Pradesh, 453556, India",
    spotsLeft: "3 spots left!",
    gradient: "linear-gradient(135deg,#A63A8E,#7B2FF7)",
  },
];

interface Props {
  /** Guest = locked feed; member = signed-up view */
  member?: {
    name: string;
    tokens: number;
  } | null;
  onJoin: () => void;
  /** Which bottom-nav tab is highlighted. */
  activeTab?: NavTab;
  /** Called when a bottom-nav tab is tapped. Guests get the account gate. */
  onNavigate?: (tab: NavTab) => void;
}

/**
 * Home feed replicated from the reference app: logo header with badges,
 * YOUR CLUB card (Bronze), Honorary Vibe Tokens banner, event cards with
 * host, category chip, time/date/location fields and JOIN / VIEW FLYER.
 */
export default function HomeFeed({
  member = null,
  onJoin,
  activeTab = "home",
  onNavigate,
}: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Header */}
      <header className="flex items-center justify-between pt-6">
        <Logo size={36} />
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-neutral-700 px-3 py-1.5 text-sm font-semibold">
            💌 3
          </span>
          <span aria-hidden className="text-xl">🔔</span>
          <span aria-hidden className="text-xl">{member ? "💬" : "⭐"}</span>
        </div>
      </header>

      {/* Club card */}
      <section className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
          Your Club
        </p>
        <div className="mt-2 flex items-center justify-between rounded-lg border border-white/80 px-4 py-3.5">
          <span className="text-[17px] font-semibold">Bronze Club Member</span>
          <span aria-hidden className="text-xl" style={{ color: "#CD7F32" }}>
            ⬢
          </span>
        </div>
        <p className="mt-2.5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide">
          <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px]">🪙</span>
          {member
            ? `${member.name} has ${member.tokens} honorary vibe tokens!`
            : "You have 0 honorary vibe tokens!"}
        </p>
      </section>

      {/* Event cards */}
      <section className="mt-5 flex flex-col gap-5 pb-24">
        {EVENTS.map((ev) => (
          <article
            key={ev.title}
            className="overflow-hidden rounded-2xl bg-[#0E0E0E] p-3"
          >
            <div
              aria-hidden
              className="h-36 w-full rounded-xl"
              style={{ background: ev.gradient }}
            />
            <div className="px-1.5 pt-4">
              <h3 className="text-[22px] font-bold">{ev.title}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                Private Party
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[15px] font-semibold">{ev.host}</span>
                <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold text-white"
                  style={{ background: ev.badgeColor }}
                >
                  {ev.badgeIcon} {ev.badge}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-neutral-700">
                <div className="flex items-center justify-between border-r border-neutral-700 px-3.5 py-3.5 text-[15px]">
                  {ev.time} <span aria-hidden>🕐</span>
                </div>
                <div className="flex items-center justify-between px-3.5 py-3.5 text-[15px]">
                  {ev.date} <span aria-hidden>📅</span>
                </div>
                <div className="col-span-2 flex items-center justify-between border-t border-neutral-700 px-3.5 py-3.5 text-[15px]">
                  <span className="pr-2 leading-snug">{ev.address}</span>
                  <span aria-hidden>📍</span>
                </div>
              </div>

              <button
                onClick={onJoin}
                className="mt-4 h-[52px] w-full rounded-lg bg-white text-[15px] font-semibold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
              >
                {member ? "Join" : "View Flyer"}
              </button>
            </div>
            {ev.spotsLeft && (
              <div className="mt-3 rounded-md bg-[#A98156] py-1.5 text-center text-[13px] font-semibold text-black">
                {ev.spotsLeft}
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Bottom nav */}
      <nav
        aria-label="Main"
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-neutral-800 bg-black/95 px-6 py-2 backdrop-blur"
      >
        <div className="flex items-center justify-between">
          {(
            [
              { tab: "home", label: "Home", Icon: HomeIcon },
              { tab: "chats", label: "Chats", Icon: ChatIcon },
              { tab: "create", label: "Create", Icon: CreateIcon },
              { tab: "profile", label: "Profile", Icon: ProfileIcon },
            ] as { tab: NavTab; label: string; Icon: typeof HomeIcon }[]
          ).map(({ tab, label, Icon }) => (
            <button
              key={tab}
              type="button"
              aria-label={label}
              aria-current={activeTab === tab ? "page" : undefined}
              onClick={() => onNavigate?.(tab)}
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                activeTab === tab
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Icon className="h-[26px] w-[26px]" />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
