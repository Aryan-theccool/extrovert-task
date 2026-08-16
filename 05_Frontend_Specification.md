# Frontend Specification Document
## Project: Extroverts — Signup Wizard Replication

---

### 1. Design system

#### Color palette
Derived from the reference app screenshots (dark, high-contrast, one accent gradient):

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#000000` | Primary app background |
| `--bg-elevated` | `#141414` | Cards, input fields, bottom sheets |
| `--bg-elevated-2` | `#1F1F1F` | Hover/active states on elevated surfaces |
| `--text-primary` | `#FFFFFF` | Headings, primary body text |
| `--text-secondary` | `#A3A3A3` | Helper text, subtext under headings |
| `--text-muted` | `#6B6B6B` | Placeholder text, disabled labels |
| `--border-default` | `#2A2A2A` | Input borders, dividers |
| `--accent-primary` | `#E91E8C` | Primary buttons, active states, badges (pink from gradient/club badges) |
| `--accent-gradient-start` | `#FF4E9A` | Gradient card backgrounds (event cards) |
| `--accent-gradient-end` | `#7B2FF7` | Gradient card backgrounds, splash blob |
| `--success` | `#22C55E` | Success screen accents, valid-field state |
| `--error` | `#EF4444` | Inline error text, error toast, invalid-field borders |
| `--warning` | `#F5A623` | "0 Honorary Vibe Tokens" style banners, non-blocking warnings |
| `--club-bronze` | `#CD7F32` | Club tier badge |

#### Typography
- **Font family**: Poppins (400 regular, 500 medium, 600 semibold, 700 bold), loaded via `next/font/google`.
- **Scale**:
  - Display / splash tagline: 28px / 700 / -0.02em tracking
  - Screen heading (e.g. "Create a username that fits your vibe!"): 22px / 600
  - Body / helper subtext: 14px / 400 / `--text-secondary`
  - Input label (uppercase, small caps style as seen in app, e.g. "USERNAME"): 11px / 600 / letter-spacing 0.08em
  - Button label: 15px / 600
  - Error/helper microcopy: 12px / 400

#### Component styles

**Buttons**
- Primary: full-width, `--text-primary` background with `--bg-base` text (inverted, matches app's white-fill buttons), 8px corner radius, 48px height, disabled state at 40% opacity with no pointer events.
- Secondary/Back: full-width, transparent background, 1px `--border-default` border, `--text-primary` text.
- Loading state: label replaced or accompanied by a small spinner, button remains at full width/height (no layout shift), disabled during load.

**Inputs**
- Dark elevated background (`--bg-elevated`), 1px `--border-default` border, 8px radius, 48px height, 16px horizontal padding.
- Label sits above the field, uppercase micro-label style.
- Focus state: border color shifts to `--accent-primary`.
- Error state: border color shifts to `--error`, inline message in `--error` appears directly below.
- OTP boxes: 6 individual square inputs (44x44px), centered text, auto-advance focus, same border/focus treatment as standard inputs.

**Cards** (event cards on the home feed)
- 12px corner radius, gradient or image background, dark scrim overlay for text legibility, badge chips (e.g. "Music Jam", "Dinner Event") in pill shape with small icon, 8px padding, semi-transparent `--bg-elevated` info panel anchored to the bottom of the card.

**Modals / bottom sheets**
- Slide up from bottom (mobile) or centered overlay (desktop), `--bg-elevated` background, 16px top corner radius, drag handle bar at top (matches "DATE OF BIRTH" sheet and "YOU NEED AN ACCOUNT" modal from reference), dismissible via a close icon or tapping the scrim.

#### Spacing & layout rules
- Base spacing unit: 4px. Standard gaps: 8 / 12 / 16 / 24 / 32px.
- Screen horizontal padding: 20px on mobile, capped content width of 420px centered on tablet/desktop (so the app doesn't stretch into an ugly wide layout on large screens — mimic a phone-frame feel).
- Consistent bottom-anchored primary CTA pattern: primary/secondary button pair pinned near the bottom of the viewport on every wizard step, matching the reference app's Next/Back placement.
- Progress indicator (dots or thin bar) placed directly under the top header/logo area, above the screen heading.

---

### 2. API & integration spec

This build is **frontend-only** — every "service" below is mocked locally (in `lib/mockApi.ts`) rather than actually called. This spec documents what each mock stands in for, so the integration points are clear and swappable later.

| Service (mocked) | What it does | Simulated "endpoint" | Data sent | Expected response |
|---|---|---|---|---|
| **Auth / OTP provider** (stands in for Appwrite Auth, as seen in the reference app's OTP email) | Sends a one-time code to the entered email and verifies it | `POST /mock/auth/send-otp`, `POST /mock/auth/verify-otp` | `{ email }` → send; `{ email, code }` → verify | Send: `{ success: true }` after `NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS`. Verify: `{ success: true }` if code === `123456`, else `{ success: false, error: "Invalid code" }` |
| **Profile submission** (stands in for a `PATCH /users/:id` on a real backend) | Persists username/name/dob/pronouns as the user completes each wizard step | `PATCH /mock/profile` | Whichever field the current step collects | `{ success: true }`, or randomly `{ success: false }` per `NEXT_PUBLIC_MOCK_FAILURE_RATE` to demo the error toast |
| **Geolocation** (real browser API, not mocked) | Requests the user's location on the post-signup "Enable Location" screen | Browser `navigator.geolocation.getCurrentPosition()` | N/A (browser-native permission prompt) | Coordinates on allow; a handled rejection on deny — either way, the user proceeds to the home view |
| **Invite code validation** (mocked) | Checks an optional invite code on the bonus step | `POST /mock/invite/validate` | `{ code }` | `{ valid: true }` for any non-empty string of the expected format in this mock; otherwise `{ valid: false }` shown as a non-blocking warning |
| **Font delivery** | Loads Poppins | Google Fonts via `next/font/google` (build-time, self-hosted output) | N/A | Font files bundled at build time, no runtime request |

**Note for the recording/write-up**: explicitly state that Auth, Profile, and Invite are mocked network calls with artificial delay/failure rates, and that Geolocation is the one real browser API integration in the build. This transparency is itself a positive signal — it shows you understand the boundary between "looks real" and "is real" rather than implying a fake backend is functioning.
