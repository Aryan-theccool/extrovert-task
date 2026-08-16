# Feature Ticket List
## Project: Extroverts — Signup Wizard Replication

Each ticket below is written so it can be pasted directly into an AI coding tool (Claude, Cursor, etc.) as a build prompt.

---

### TICKET 1 — Landing / Splash Screen
**Description**: Build the entry screen — black background, centered "E" wordmark/logo, gradient blob graphic near the bottom, tagline "AN APP ONLY FOR EXTROVERTS", small italic warning line, and a primary "LOADING"/"GET STARTED" CTA button that navigates to the Terms & Conditions screen.
**Acceptance criteria**:
- Pixel-close match to reference screenshot (logo placement, gradient position, type scale).
- CTA button is keyboard-accessible and has a visible focus state.
- Fully responsive from 360px to desktop widths without the gradient graphic distorting.
**Dependencies**: None — first screen in the app.
**Priority**: Must-have

---

### TICKET 2 — Terms & Conditions Screen
**Description**: Build a T&C screen with scrollable legal-style placeholder text, a checkbox "I agree to the Terms & Conditions", and a Continue button that stays disabled until the checkbox is checked.
**Acceptance criteria**:
- Continue button is disabled (visually and functionally) until checkbox is checked.
- Checkbox state and disabled-button logic are covered by at least one interaction test or manual QA note.
- Screen is scrollable independently of the fixed CTA button on small viewports.
**Dependencies**: Ticket 1 (navigated from landing screen).
**Priority**: Must-have

---

### TICKET 3 — Wizard State Management (Context + Reducer)
**Description**: Implement `WizardContext` using `useReducer` to hold `email, otp, isVerified, username, name, dob, age, pronouns, inviteCode, currentStep`. Expose `dispatch` actions for `SET_FIELD`, `NEXT_STEP`, `PREV_STEP`, `RESET`. Wrap all `/signup/*` routes in this provider.
**Acceptance criteria**:
- Navigating back a step (browser back or in-app Back button) does not clear previously entered field values.
- State persists across all wizard route changes within a single session.
- A single source of truth exists — no duplicated local state for the same field in more than one component.
**Dependencies**: None — foundational, should be built early.
**Priority**: Must-have

---

### TICKET 4 — Email Entry Step
**Description**: Build the "Enter your email" screen with a labeled input, a "Proceed" button, and a "subscribe to newsletter" checkbox (optional, non-blocking). Validate email format in real time (on blur and on change after first blur).
**Acceptance criteria**:
- Invalid email shows an inline error message beneath the field, in the app's error color.
- Proceed button is disabled while the field is empty or invalid.
- Valid submission triggers a mock async call (loading spinner on the button) before navigating to the OTP screen.
- Whitespace-only input is rejected as invalid.
**Dependencies**: Ticket 3 (wizard state).
**Priority**: Must-have

---

### TICKET 5 — OTP Verification Step
**Description**: Build a 6-box OTP input with auto-advance-to-next-box on digit entry, auto-focus-previous on backspace, paste support (pasting a 6-digit string fills all boxes), a "Resend OTP" link with a 30-second countdown before it re-enables, "Verify" and "Go Back" buttons, and helper text showing the email OTP was sent to.
**Acceptance criteria**:
- Only numeric input accepted per box; non-numeric keystrokes are ignored.
- Resend link is disabled and shows a live countdown immediately after the screen loads and after each resend.
- Entering the correct mock OTP (`123456`) and clicking Verify navigates to the Username step; incorrect OTP shows an inline error and clears the boxes.
- "Go Back" returns to the Email step with the previously entered email still populated.
**Dependencies**: Ticket 3, Ticket 4.
**Priority**: Must-have

---

### TICKET 6 — Wizard Shell (Shared Header, Progress, Back Button)
**Description**: Build a shared layout component used by all 4 "GETTING READY" wizard steps — includes the small "GETTING READY" label, a progress indicator (dots or bar showing step X of 4), and a consistent Back button behavior.
**Acceptance criteria**:
- Progress indicator accurately reflects current step across Username → Name → DOB → Pronouns.
- Back button is present on every step except Username's back target (which returns to OTP) and behaves consistently.
- Shell is reused (not re-implemented) by all four step pages — verified by shared component import, not copy-pasted markup.
**Dependencies**: Ticket 3.
**Priority**: Must-have

---

### TICKET 7 — Username Step
**Description**: Build "Create a username that fits your vibe!" with a single input, helper subtext, Back button, and Continue/loading state.
**Acceptance criteria**:
- Enforces a max character limit and disallows leading/trailing whitespace-only values.
- Shows a loading spinner on the primary button during the mock submit before advancing.
- Value persists in wizard state and is visible if the user navigates back to this step later.
**Dependencies**: Ticket 5, Ticket 6.
**Priority**: Must-have

---

### TICKET 8 — Name Step
**Description**: Build the `"Name, please, for the party check!"` screen with a name input and the subtext noting the name is shown to other members and cannot be changed later.
**Acceptance criteria**:
- Field rejects empty and whitespace-only submissions with a clear inline error.
- Character limit enforced (e.g. 40 chars) with a live counter or hard stop.
- Field value is locked/read-only if the user has already advanced past this step once (matches source app behavior), OR this is called out as an intentional deviation in the recording if not implemented.
**Dependencies**: Ticket 6.
**Priority**: Must-have

---

### TICKET 9 — Date of Birth Step + Age Validation
**Description**: Build "How many years have you been partying?" which opens a DD / MM / YYYY input sheet. On submit, compute age from DOB and block progression with a clear, friendly inline message if age < 18. This is an explicit improvement over the source app, which does not clearly surface this validation.
**Acceptance criteria**:
- DD/MM/YYYY inputs accept only valid numeric ranges (day 1–31, month 1–12, year within a sane range).
- Age is computed correctly accounting for whether the birthday has occurred yet this year, not just year subtraction.
- Age < 18 shows a clear, non-dismissible-by-accident inline error and does NOT allow proceeding.
- Valid, 18+ DOB proceeds to the Pronouns step.
**Dependencies**: Ticket 6.
**Priority**: Must-have

---

### TICKET 10 — Pronouns Step
**Description**: Build "Which pronouns feel right for you?" with a text input that offers lightweight autocomplete/suggestions (e.g. he/him/his, she/her/hers, they/them/theirs) but still allows free text entry.
**Acceptance criteria**:
- Suggestions appear as the user types and are selectable via click/tap or keyboard.
- Free-text entry outside the suggestion list is still accepted and saved.
- Next button is disabled on empty/whitespace-only input.
**Dependencies**: Ticket 6.
**Priority**: Must-have

---

### TICKET 11 — Success / Completion Screen
**Description**: Build the final screen shown once all wizard steps are complete — confirmation state and redirect (or CTA) into a "home" view showing club status (e.g. "Bronze Club Member", "0 Honorary Vibe Tokens").
**Acceptance criteria**:
- Only reachable once all required steps (email verified, username, name, DOB/age valid, pronouns) are complete — direct URL access without state redirects back to signup start.
- Displays a clear success message/animation, distinct from any error state styling.
**Dependencies**: Tickets 7–10.
**Priority**: Must-have

---

### TICKET 12 — Global Error/Loading System
**Description**: Implement a shared toast/banner system (e.g. via Sonner) for global failures (simulated network errors), and a shared Spinner/Button-loading pattern reused across every async step to prevent duplicate submissions.
**Acceptance criteria**:
- All primary buttons that trigger a mock async action disable themselves and show a spinner for the duration of `NEXT_PUBLIC_MOCK_NETWORK_DELAY_MS`.
- Simulated random failure (per `NEXT_PUBLIC_MOCK_FAILURE_RATE`) shows a global toast with a retry-friendly message instead of silently failing.
- No component implements its own bespoke loading/error UI — all route through the shared system.
**Dependencies**: Ticket 3.
**Priority**: Must-have

---

### TICKET 13 — Responsive Layout Pass
**Description**: Audit and adjust every screen for mobile (360–480px), tablet (768px), and desktop (1024px+) breakpoints, including centering the phone-style UI within a wider viewport on desktop rather than stretching it edge-to-edge.
**Acceptance criteria**:
- No horizontal scroll or overlapping elements at any of the three target widths.
- Touch targets (buttons, OTP boxes, checkboxes) meet a minimum 44x44px tap area on mobile.
- Desktop view does not look like a naively stretched mobile screen — a constrained, centered card layout is used.
**Dependencies**: All prior UI tickets.
**Priority**: Must-have

---

### TICKET 14 — Optional Invite Code Step
**Description**: Build the bonus screen with the stylized manifesto-style copy block and an optional invite code field, skippable via Next even if empty.
**Acceptance criteria**:
- Field is clearly marked optional in the UI copy.
- Invalid-format invite codes (if entered) show a non-blocking warning, not a hard error, since the field is optional.
**Dependencies**: Ticket 10.
**Priority**: Should-have

---

### TICKET 15 — Location Permission Screen
**Description**: Build the "TRYING TO FETCH YOUR LOCATION..." screen with an "Enable Location" CTA, using the browser Geolocation API (or a mock) to simulate the permission request shown after signup completes.
**Acceptance criteria**:
- Requesting/granted/denied states are all visually distinct.
- Denying location does not block the user from reaching the home/success view.
**Dependencies**: Ticket 11.
**Priority**: Should-have

---

### TICKET 16 — Step Transition Animations
**Description**: Add subtle slide/fade transitions between wizard steps using Framer Motion, matching the snappy feel of a native app.
**Acceptance criteria**:
- Transitions run under 300ms and do not block input during the animation.
- Back navigation animates in the opposite direction of forward navigation.
**Dependencies**: Tickets 6–10.
**Priority**: Nice-to-have

---

### TICKET 17 — Locked Home Feed Preview
**Description**: Build a browsable-but-gated home feed (event cards, club status header) shown before signup, with a "You need an account" modal triggered on any interactive action (e.g. tapping Join).
**Acceptance criteria**:
- Feed is visible and scrollable without an account.
- Any write-style interaction (Join, Create) opens the gating modal instead of proceeding.
**Dependencies**: Ticket 1.
**Priority**: Nice-to-have
