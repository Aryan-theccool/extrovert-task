# Extroverts — Signup Wizard Replication

Frontend-only web replication of the **Extroverts** mobile app's onboarding flow, built for the Frontend Engineering Assessment. Covers the landing screen, Terms & Conditions, email + OTP verification, the 4-step "Getting Ready" wizard (Username → Name → Date of Birth → Pronouns), an optional invite-code step, and a success screen.

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

**Demo OTP:** `123456` (mocked — no real email is sent).

## Stack

- **Next.js 14 (App Router) + TypeScript** — each screen is a route; the wizard state lives in a shared provider
- **Tailwind CSS** — design tokens from the reference app (dark palette, pink/violet accent gradient)
- **Poppins** via `@fontsource/poppins` (self-hosted, no runtime font request)
- **Sonner** — global error/success toasts
- **React Context + `useReducer`** — single source of truth for all wizard fields

## What's mocked vs. real

| Layer | Status |
|---|---|
| OTP send/verify | Mocked (`lib/mockApi.ts`, fixed code `123456`, 1.2s simulated latency) |
| Profile submission | Mocked, with a **15% random failure rate** to demo the global error toast + retry |
| Invite code validation | Mocked (`6–10 alphanumeric` format check) |
| Geolocation | **Real** browser API on the success screen |

Tunables live in `.env.local`: `NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS`, `NEXT_PUBLIC_MOCK_FAILURE_RATE`, `NEXT_PUBLIC_MIN_SIGNUP_AGE`.

## Validation & UX behaviors implemented

- Real-time email validation (on-change after first blur), trims pasted whitespace
- 6-box OTP input: numeric-only, auto-advance, backspace-focus-previous, **full-code paste distributes across boxes**, resend link with live 30s countdown, wrong code clears boxes + inline error
- Username/Name/Pronouns: character limits with live counters, whitespace-only rejection, emoji/symbol-only names rejected
- Name field **locks (read-only) after first submission**, matching the source app's "can't be changed later" copy
- DOB: numeric-only DD/MM/YYYY with auto-advance, impossible dates rejected (e.g. 31/02), future dates rejected, exact age math (turning 18 *today* passes)
- All submit buttons: spinner + disabled during mock network call (double-click safe), no layout shift
- Simulated failures surface as global toasts with the button re-enabled for retry
- Back navigation at every step restores previously entered values (no data loss)
- Direct URL access to an out-of-order step redirects back to `/signup/email`
- Fully responsive: phone-frame layout capped at 420px, centered on tablet/desktop

## Intentional improvements over the source app

1. **Age gate is loud, not silent** — under-18 DOB shows a clear inline block with the computed age, instead of the source app's silent behavior.
2. **OTP screen upgraded** — 6 discrete boxes with paste support and a visible resend countdown, instead of a plain single input.
3. **Precise DOB errors** — the exact broken sub-field (day/month/year range, impossible date, future date) is called out rather than a generic "invalid date".
4. **Invite code is honestly optional** — invalid codes warn without blocking, with an explicit "continue without a code" escape hatch.
5. **Accessibility** — labeled inputs, `role="alert"` on errors, `aria-busy` on loading buttons, keyboard-navigable OTP boxes and pronoun suggestions, visible focus rings.

## Suggested 5-minute recording script

1. Splash → T&C (show Continue disabled until checkbox) — 30s
2. Email: invalid format inline error, then valid submit with spinner — 40s
3. OTP: wrong code (boxes clear), paste `123456`, mention resend countdown — 50s
4. Username/Name: whitespace + limit errors, note the name lock, trigger a random failure toast and retry — 70s
5. DOB: enter an under-18 date to show the age block, then a valid date — 40s
6. Pronouns: suggestions + free text → invite (invalid code warning, skip) → success + club card, hit browser Back to show values persisted — 50s
