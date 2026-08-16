"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import HomeFeed, { type NavTab } from "@/components/home/HomeFeed";
import ChatsView from "@/components/home/ChatsView";
import HostView from "@/components/home/HostView";
import ProfileView from "@/components/home/ProfileView";
import { HomeIcon, ChatIcon, CreateIcon, ProfileIcon } from "@/components/home/NavIcons";
import { useWizard } from "@/context/WizardContext";
import { computeAge } from "@/lib/age";

/**
 * Post-signup member app, matching the reference recordings:
 * - Home feed with "Signed up successfully" toast on arrival
 * - Chats tab (BEFORE-HOURS / AFTERPARTY neon screens)
 * - Create tab (HOST screen with themes + trending locations)
 * - Profile tab (pink initial header, club, superlatives, passes, log out)
 */
export default function SuccessPage() {
  const { state, dispatch, isStepAllowed } = useWizard();
  const router = useRouter();
  const [tab, setTab] = useState<NavTab>("home");
  const [toastVisible, setToastVisible] = useState(true);

  const allowed = isStepAllowed("success");
  const age = computeAge(state.dob);
  const firstName = (state.name || "You").split(" ")[0];

  useEffect(() => {
    if (!allowed) router.replace("/signup/email");
  }, [allowed, router]);

  useEffect(() => {
    const t = setTimeout(() => setToastVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!allowed) return null;

  const handleLogout = () => {
    dispatch({ type: "RESET" });
    toast.success("Logged out. See you at the next party!");
    router.push("/");
  };

  return (
    <main className="flex flex-1 flex-col">
      {tab === "home" && (
        <HomeFeed
          member={{ name: firstName, tokens: 0 }}
          onJoin={() => toast.success("You're on the list! See you at the party. 🎉")}
          activeTab="home"
          onNavigate={setTab}
        />
      )}
      {tab === "chats" && (
        <ChatsView onCreate={() => setTab("create")} />
      )}
      {tab === "create" && <HostView />}
      {tab === "profile" && (
        <ProfileView
          name={state.name}
          username={state.username}
          pronouns={state.pronouns}
          age={age}
          inviteCode={state.inviteCode}
          onLogout={handleLogout}
        />
      )}

      {/* Shared bottom nav for non-home tabs (HomeFeed renders its own) */}
      {tab !== "home" && (
        <nav
          aria-label="Main"
          className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-neutral-800 bg-black/95 px-6 py-2 backdrop-blur"
        >
          <div className="flex items-center justify-between">
            {(
              [
                { t: "home", label: "Home", Icon: HomeIcon },
                { t: "chats", label: "Chats", Icon: ChatIcon },
                { t: "create", label: "Create", Icon: CreateIcon },
                { t: "profile", label: "Profile", Icon: ProfileIcon },
              ] as { t: NavTab; label: string; Icon: typeof HomeIcon }[]
            ).map(({ t, label, Icon }) => (
              <button
                key={t}
                type="button"
                aria-label={label}
                aria-current={tab === t ? "page" : undefined}
                onClick={() => setTab(t)}
                className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                  tab === t ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <Icon className="h-[26px] w-[26px]" />
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* "Signed up successfully" toast, like the recording */}
      <div
        role="status"
        className={`fixed bottom-24 left-1/2 z-50 w-[calc(100%-40px)] max-w-[380px] -translate-x-1/2 transition-all duration-500 ${
          toastVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl border border-success/40 bg-[#0E1A12] px-4 py-3.5 shadow-2xl">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-success text-xs text-success">
            ✓
          </span>
          <span className="text-[15px] font-medium">Signed up successfully</span>
        </div>
      </div>
    </main>
  );
}
