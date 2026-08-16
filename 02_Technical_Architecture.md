# Technical Architecture Document
## Project: Extroverts — Signup Wizard Replication

---

### 1. Recommended tech stack (with reasoning)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** | File-based routing maps cleanly to splash → T&C → email → OTP → wizard steps as separate routes; TypeScript catches form-shape mistakes before runtime, which matters a lot when a wizard passes state across 6+ screens. |
| Styling | **Tailwind CSS** | Fast to hit exact spacing/color values from the reference screenshots; utility classes keep the dark, minimal aesthetic consistent without fighting a component library's defaults. |
| Fonts | **Poppins** (Google Fonts, self-hosted via `next/font`) | Matches the brief's asset requirement exactly; `next/font` avoids layout shift. |
| Form handling | **React Hook Form** | Uncontrolled-first performance, plays well with per-step validation and minimal re-renders across a multi-step wizard. |
| Validation | **Zod** (schema per step) | Declarative rules (email format, age ≥ 18, non-whitespace name, numeric-only phone) that double as documentation — easy to defend in an interview. |
| Wizard/global state | **React Context + `useReducer`** | No backend, no server state to sync — a lightweight reducer is enough to hold `{ email, otp, username, name, dob, pronouns, inviteCode, step }` and survive back/forward navigation without pulling in Redux/Zustand for a scoped assessment. |
| Toasts/alerts | **Sonner** | Minimal, themeable, matches dark UI easily for global error banners. |
| Animation | **Framer Motion** (optional/nice-to-have) | Smooth step transitions if time allows; skip if time-boxed. |
| Deployment | **Vercel** (or run locally for the recording) | Zero-config for Next.js; gives a shareable link if the submission form wants one, otherwise `npm run dev` is enough for the screen recording. |

### 2. Complete file & folder structure

```
extroverts-clone/
├── public/
│   └── assets/
│       ├── logo.svg
│       └── gradient-bg.png
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, font + theme provider
│   │   ├── page.tsx                   # Splash / landing screen
│   │   ├── terms/
│   │   │   └── page.tsx               # Terms & Conditions screen
│   │   ├── signup/
│   │   │   ├── layout.tsx             # Wraps all signup routes with WizardProvider
│   │   │   ├── email/page.tsx         # Enter email
│   │   │   ├── otp/page.tsx           # Enter OTP
│   │   │   ├── username/page.tsx      # Wizard step 1
│   │   │   ├── name/page.tsx          # Wizard step 2
│   │   │   ├── dob/page.tsx           # Wizard step 3
│   │   │   ├── pronouns/page.tsx      # Wizard step 4
│   │   │   ├── invite/page.tsx        # Optional bonus step
│   │   │   └── success/page.tsx       # Success / redirect screen
│   ├── components/
│   │   ├── ui/                        # Button, Input, OtpInput, Toast, Spinner, ProgressDots
│   │   ├── wizard/
│   │   │   ├── WizardShell.tsx        # Shared header ("GETTING READY"), back button, progress
│   │   │   └── StepTransition.tsx     # Optional animation wrapper
│   │   └── layout/
│   │       └── PhoneFrame.tsx         # Optional: constrains layout to a phone-like max-width for fidelity
│   ├── context/
│   │   └── WizardContext.tsx          # useReducer store: state, dispatch, step config
│   ├── lib/
│   │   ├── validation.ts              # Zod schemas per step
│   │   ├── mockApi.ts                 # Simulated network calls (delay + random failure option)
│   │   └── age.ts                     # DOB → age calculation helper
│   ├── types/
│   │   └── wizard.ts                  # WizardState, StepName types
│   └── styles/
│       └── globals.css                # Tailwind base + CSS variables for palette
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

### 3. Data model (in place of a database schema)

This is a frontend-only exercise with no real backend, so there is no persisted database. Instead, here is the **in-memory state shape** the wizard carries between screens — this is the equivalent artifact a backend developer would want to see:

**`WizardState` (held in React Context, plain English field-by-field):**

| Field | Type | Meaning |
|---|---|---|
| `email` | string | Entered on the email step, re-used to display "OTP sent to ___" |
| `otp` | string (6 digits) | Entered on the OTP step, cleared if user goes back to change email |
| `isVerified` | boolean | Set true after mock OTP verify succeeds; gates access to wizard steps |
| `username` | string | Wizard step 1 |
| `name` | string | Wizard step 2, locked (read-only) once submitted, matching source app copy |
| `dob` | { day, month, year } | Wizard step 3 raw input |
| `age` | number (derived) | Computed from `dob`, drives the 18+ validation gate |
| `pronouns` | string | Wizard step 4 |
| `inviteCode` | string \| null | Optional bonus step |
| `currentStep` | enum | Drives progress indicator and back/next logic |

If this were extended into a real product, `email`, `username`, `name`, `dob`, `pronouns` would map directly to a `users` table, with `otp` living in a short-lived, separate verification table/cache (never stored alongside the permanent user record).

### 4. Environment variables / configuration notes

Since the exercise is explicitly frontend-only with no real backend integration, no secrets are required. For realism/demo purposes, keep a small `.env.local` anyway so the mock layer reads like a real integration point:

```
NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS=1200     # simulated latency for OTP/submit spinners
NEXT_PUBLIC_MOCK_FAILURE_RATE=0.15         # e.g. 15% of mock submissions "fail" to demo error toasts
NEXT_PUBLIC_MIN_SIGNUP_AGE=18              # single source of truth for the age gate, not hardcoded in components
```

Note before building: since there's no real OTP provider, hardcode a fixed dev OTP (e.g. `123456`) in `mockApi.ts` so the flow is demoable and reproducible on camera without needing a real inbox.
