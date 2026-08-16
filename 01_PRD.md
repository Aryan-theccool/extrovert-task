# Product Requirements Document
## Project: Extroverts — Signup Wizard Replication (Frontend Assessment)

---

### 1. What the app does
A front-end-only web replication of the "Extroverts" mobile app's onboarding flow. It reproduces the landing screen, terms & conditions screen, and the full account-creation wizard (email → OTP → username → name → date of birth → pronouns → optional invite code), matching the source app's visual design and interaction behavior while improving specific UX gaps identified during research (weak age-verification feedback, plain OTP entry, no resend affordance clarity).

### 2. Who it is for
- Primary: the hiring team evaluating this as a technical assessment submission.
- Secondary (in-universe): a prospective "Extroverts" user signing up to join real-world social events.

### 3. What problem it solves
- **For the assessment**: proves the ability to reverse-engineer an existing product's UI/UX from reference material and rebuild it with production-grade frontend engineering — state management, validation, accessibility, and responsive behavior — not just static visuals.
- **For the in-universe product**: gets a new user from "interested visitor" to "verified, profile-complete member" with minimal friction, using progressive disclosure so no single screen feels overwhelming.

### 4. Core features

| Feature | Classification |
|---|---|
| Landing / splash screen (logo, tagline, entry CTA) | Must-have |
| Terms & Conditions screen (accept-to-continue) | Must-have |
| Email entry + real-time validation | Must-have |
| OTP verification (6-digit, resend timer) | Must-have |
| Wizard state management (persists across steps, survives back navigation) | Must-have |
| Step 1 — Username | Must-have |
| Step 2 — Name | Must-have |
| Step 3 — Date of Birth (with age/18+ validation) | Must-have |
| Step 4 — Pronouns | Must-have |
| Progress indicator across the 4 steps | Must-have |
| Loading states on all async-simulated actions | Must-have |
| Global error banner / toast for simulated failures | Must-have |
| Success screen after wizard completion | Must-have |
| Responsive layout (mobile / tablet / desktop) | Must-have |
| Optional invite-code step | Should-have |
| Location-permission screen (post-signup) | Should-have |
| Animated screen transitions between wizard steps | Nice-to-have |
| Dark/light theme toggle | Nice-to-have |
| Home feed preview (event cards) behind the "you need an account" gate | Nice-to-have |

### 5. User flow — start to finish

1. User lands on splash screen → taps entry CTA.
2. (Nice-to-have) Browses a locked home feed, taps "Join" on an event → sees "You need an account" prompt.
3. User accepts Terms & Conditions.
4. Enters email → clicks Proceed → real-time format validation.
5. Redirected to OTP screen → enters 6-digit code (auto-advance between boxes) → Verify (or Resend after timer expires, or Go Back to fix email).
6. **Wizard Step 1 – Username**: enters a unique-feeling handle.
7. **Wizard Step 2 – Name**: enters display name (locked after this point per app copy).
8. **Wizard Step 3 – Date of Birth**: opens DD/MM/YYYY sheet; if computed age < 18, blocks progression with a clear inline message instead of the original app's silent behavior.
9. **Wizard Step 4 – Pronouns**: free-text/autocomplete field.
10. (Should-have) Optional invite code screen — skippable.
11. (Should-have) Location permission screen.
12. Success screen → redirect to home/club view (Bronze Club Member state, 0 tokens).

Back navigation at every wizard step must restore previously entered values (no data loss).

### 6. What the MVP looks like
The minimum submittable version covers: splash → T&C → email → OTP → the 4 wizard steps → success screen, all fully validated, responsive, with loading/error states, deployed or runnable locally, and screen-recorded per submission instructions. Invite code, location screen, and home feed preview are explicitly optional polish, added only if time allows after the MVP is solid.

### 7. How success will be measured
- **Visual fidelity**: side-by-side similarity to the source app's screens (typography, color, spacing, component shape).
- **Functional completeness**: every validation rule and interaction listed in the assessment brief is present and demonstrable in the recording.
- **Improvement quality**: at least 2–3 concrete, well-reasoned UX improvements are implemented and callable-out on camera (age validation clarity, OTP resend affordance, etc.).
- **Code quality**: clean component structure, sensible state management, no dead code, explainable in a follow-up technical discussion.
- **Recording clarity**: under 5 minutes, covers happy path, validation errors, loading states, and back-navigation.

### 8. What we are deliberately NOT building in v1
- Any real backend, database, or authentication provider (OTP/email verification is fully mocked with `setTimeout`).
- Real SMS/email delivery.
- Real geolocation-based content (the location screen is a UI-only mock).
- Persistent storage across page reloads (in-memory state only, per assessment's "frontend only" scope).
- Payment, event creation/hosting flows, chat, or any post-onboarding feature — onboarding wizard is the entire scope.
- Native mobile builds — web only, responsive.
