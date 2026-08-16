# Security and Access Document
## Project: Extroverts — Signup Wizard Replication

Written in plain English. Note upfront: this build is a **frontend-only assessment exercise** — there is no real backend, database, or live authentication provider. Everything below describes (a) what the mock layer should behave like today, and (b) what would need to be true if this became a real product tomorrow, so the reasoning holds up if asked about it in a technical discussion.

---

### 1. Authentication method

**What fits this use case**: passwordless, email-based OTP (one-time password) login — exactly what the reference app uses (its OTP emails are sent via Appwrite's auth service, based on the reference email screenshot). This is the right fit because:
- The target audience is signing up quickly on a social/event app — a password to remember is friction the product doesn't need.
- Email + OTP gives a lightweight identity check without collecting a password to store and protect.

**In this build**: OTP is fully mocked. A fixed code (e.g. `123456`) is "correct" for demo purposes; no real email is sent. This is stated clearly in the recording so it's not mistaken for a real integration.

**If this became a real product**: use a managed auth provider (Appwrite, Supabase Auth, or Firebase Auth) rather than hand-rolling OTP generation/storage — hand-rolled OTP systems are a common source of early-stage security bugs (predictable codes, no rate limiting, no expiry).

---

### 2. User roles — what each can and cannot do

| Role | Can do | Cannot do |
|---|---|---|
| **Guest (not signed up)** | Browse the public home feed, view event details, view T&C | Join an event, create an event, see other members' profiles, complete the wizard |
| **Pending (email entered, OTP not yet verified)** | Retry/resend OTP, go back and change email | Access any wizard step past OTP, access home feed features that require an account |
| **Verified, wizard incomplete** (has passed OTP but not finished Username/Name/DOB/Pronouns) | Continue the wizard from wherever they left off | Reach the success screen or home/club view; cannot be treated as a "full member" |
| **Full member** (wizard complete) | Full home feed access, join events, see club status, earn tokens (as simulated) | Nothing restricted at this tier for the scope of this exercise |

Role transitions are **linear and one-directional** in this flow — a user cannot skip from Guest straight to Full Member; each gate (OTP → wizard steps) must be passed in order. The `WizardContext` `currentStep` value is the source of truth for what a user is allowed to access; each route should check that prior steps are complete before rendering, and redirect back to the correct step if not (e.g. someone manually typing `/signup/pronouns` in the URL before verifying OTP should be redirected to `/signup/email`).

---

### 3. Row-level security rules (explained in plain English)

There is no real database in this build, but here is what the rule set would look like if the mock `WizardState` became real Postgres/Appwrite tables — useful to have ready if asked "how would this scale":

- **`users` table**: a user can only read and update their *own* row. No user can query or modify another user's `email`, `dob`, `pronouns`, etc. This is the standard "row belongs to you" rule.
- **`otp_codes` table** (kept separate from `users`): a code is only valid for the email it was issued to, expires after a short window (e.g. 10 minutes), and is deleted/invalidated immediately after a successful verify — so it can't be reused or guessed indefinitely.
- **`events` / `superlatives` / `invites` tables** (out of scope for this build, but implied by the app): a user should be able to read public event data but only write to rows they created or were explicitly invited into.
- **Age data (`dob`)** should be treated as sensitive: readable only by the owning user and by server-side logic that needs to compute eligibility — never exposed to other users or the public feed.

---

### 4. Error handling guide for all major failure points

| Failure point | What the user sees | Why it matters |
|---|---|---|
| Invalid email format | Inline error under the field, submit disabled | Prevents wasted "OTP sent" round-trips |
| Email submit network failure (simulated) | Global toast: "Something went wrong, please try again" + button re-enables | User isn't left staring at a stuck spinner |
| Wrong OTP entered | Inline error, boxes clear, focus returns to first box | Matches app conventions; avoids user re-typing over stale digits |
| OTP expired (simulated after a timeout) | Inline message prompting Resend, Verify button disabled until a fresh code is requested | Prevents confusion about why a previously-valid-looking code fails |
| Resend tapped before cooldown ends | Button stays disabled with visible countdown, no request sent | Basic abuse/rate-limit hygiene, even mocked |
| Empty/whitespace-only Username, Name, or Pronouns | Inline error, Next/Continue disabled | Prevents garbage profile data |
| Age < 18 on DOB step | Clear inline block, cannot proceed, no silent pass-through | This is the explicit gap identified in the source app — treated as a hard requirement here |
| Invalid DOB (e.g. day 32, future date) | Inline error on the specific sub-field (day/month/year) | Precise feedback beats a generic "invalid date" message |
| Invalid/unknown invite code (optional step) | Non-blocking warning, user can still proceed | Optional field shouldn't hard-block onboarding |
| Direct URL access to a wizard step out of order | Redirect to the correct step (see Section 2) | Prevents incomplete/invalid state from reaching the success screen |
| Browser refresh mid-wizard | Since state is in-memory only, user is returned to the start with a brief note — call this out explicitly as a known limitation of the mock, not hidden | Sets correct expectations rather than pretending persistence exists |

---

### 5. Edge cases to handle before "launch" (i.e. before recording the demo)

- User pastes a 6-digit string into the first OTP box — should distribute across all 6 boxes, not just the first.
- User pastes an email with leading/trailing spaces — trim before validating.
- User's DOB makes them turn 18 *today* — age calculation must account for exact birthday, not just year difference.
- User double-clicks/taps a submit button rapidly — button must be disabled the instant the first click registers, not after the async call starts.
- User navigates back from Pronouns all the way to Email — all intermediate values (Username, Name, DOB) must still be intact if they navigate forward again.
- Very long input (e.g. a 200-character username) — enforce a max length rather than letting layout break.
- Emoji-only or symbol-only Name/Pronouns entry — decide and document whether this is allowed (recommend: allow letters/spaces/basic punctuation only, reject pure symbol/emoji strings).
- Resize the browser mid-wizard (rotate a device, resize a window) — layout must not lose entered values or break.
