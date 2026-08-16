# Screen Recording Guide — Extroverts Signup Wizard

**Goal**: Create a clear, professional 4–5 minute screen recording that demonstrates all assessment requirements.

---

## Before You Record

### Environment Setup
1. **Start the app locally**:
   ```bash
   cd extrovert-task/extroverts-clone
   npm run dev
   # Wait for: "ready - started server on 0.0.0.0:3000, url: http://localhost:3000"
   ```

2. **Open in browser** (fullscreen or resizable):
   - Chrome, Firefox, or Edge preferred
   - Zoom to 100% (Ctrl+0 on Windows, Cmd+0 on Mac)
   - Screen resolution: 1440×810 or higher (readable text)

3. **Choose recording software**:
   - **Windows 11**: Built-in "Snip & Sketch" → "Record" (Win+Shift+R)
   - **Windows 10**: Xbox Game Bar (Win+G) → Capture
   - **Mac**: QuickTime Player (Cmd+Space → QuickTime)
   - **Cross-platform**: OBS Studio (free, powerful)

4. **Recording settings**:
   - Resolution: 1440×810 or 1920×1080
   - Frame rate: 30 FPS (smoother on video players)
   - Codec: H.264 (compatibility)
   - Audio: optional (narration not required, but a plus)

### Browser State
- Clear cookies/cache (optional, but ensures fresh state)
- Disable notifications (turn off desktop notifications)
- Close other tabs (cleaner recording)

---

## Script — 4 Minute Version

Below is a beat-by-beat walkthrough. Timing is approximate; adjust based on clicking/typing speed.

### **ACT 1: Landing & Terms (0:00–0:45)**

**Setup**: Open http://localhost:3000 in fullscreen

**Beat 1a: Boot Screen (0:00–0:10)**
- Page loads
- **Say (if narrating)**: "The app starts with a minimal boot screen..."
- Wait for ~1.3 seconds (watch the E· logo animate)
- You'll see the pink/purple gradient circle with the serif E· logo

**Beat 1b: Splash Screen (0:10–0:25)**
- E· logo animates (fade-up)
- Full screen with aurora background image (or solid gradient fallback)
- Heading: "AN APP ONLY FOR EXTROVERTS"
- Warning text: "Warning: Entering may lead to spontaneous dancing and unsolicited high-fives!"
- Click **CONTINUE** button
- **Say**: "This splash screen sets the vibe — fun, inclusive, a bit cheeky."

**Beat 1c: Location Permission Screen (0:25–0:35)**
- Loading animation: "Trying to fetch your location..."
- Two buttons: "Enable Location" and "Skip for now"
- Click **Skip for now** (improvement demo: show that skipping is possible)
- **Say**: "Here's an improvement we made — users can skip location access if they want."

**Beat 1d: Guest Home Feed Preview (0:35–0:42)**
- Black home feed background
- Event cards (locked, grayed out) with "Sign up to join" overlay
- Click a **Join** button or any event action
- "You need an account" bottom sheet slides up

**Beat 1e: Modal → Terms (0:42–0:45)**
- Bottom sheet shows: "You need an account" + CTA text + "Get Started" button
- Click **Get Started**
- Redirects to `/terms`

**Beat 1f: Terms & Conditions (0:45+)**
- "By using this app, you're agreeing..." manifesto
- Purple-highlighted keywords ("party", "terms and conditions")
- Click **ACCEPT** button
- **Say (optional)**: "Terms are clear and brand-aligned."

---

### **ACT 2: Email & OTP Entry (0:45–1:30)**

**Beat 2a: Email Step (0:45–1:00)**
- Redirected to `/signup/email`
- Logo top-left, "GETTING READY" top-right, progress dots (1/4)
- Heading: "Enter your email"
- Email input field, checkbox for newsletter opt-in, **PROCEED** button
- Type an email: `demo@extroverts.app` (or any valid email)
- **Clear the field** → error message appears immediately: "Email is required."
- **Type 3 characters** → error updates: "That doesn't look like a valid email address."
- **Type the full email** → error disappears, button becomes enabled
- **Say**: "Real-time validation — errors appear as you type and disappear when corrected."
- Click **PROCEED**
- Show loading spinner on button (~1.2 seconds)

**Beat 2b: OTP Notification (1:00–1:05)**
- OTP screen loads (`/signup/otp`)
- Look for the **OTP notification** (simulated inbox tooltip at the top)
- It should show something like: "📧 OTP: 123456" or similar
- **Say (optional)**: "We show a mock OTP code in a notification, simulating a real email/SMS arrival."

**Beat 2c: OTP Input — Error Case (1:05–1:15)**
- 6 discrete input boxes, centered
- Type **wrong code** (e.g., "111111") → error message appears below: "That code doesn't match. Give it another shot."
- Show the **Resend OTP** link on the right with countdown (e.g., "Resend OTP in 25s")
- **Say**: "Resend is available — after a 30-second cooldown, users can request a fresh code. This is an improvement over the original app."
- Clear the boxes and type **correct OTP**: `123456`

**Beat 2d: OTP Success (1:15–1:30)**
- Error message disappears
- Click **VERIFY**
- Show loading spinner (~1.2 seconds)
- Redirected to `/signup/username` (wizard step 1)

---

### **ACT 3: Wizard Steps 1–2 (1:30–2:30)**

**Beat 3a: Username Step (1:30–1:50)**
- Logo, "GETTING READY", progress dots (1/4, first dot filled)
- Heading: "Create a username that fits your vibe!"
- Username input, hint text, character counter (0/20), **NEXT** and **BACK** buttons
- Type **too short** (e.g., "ab") → error: "Username needs at least 3 characters."
- Type a few more chars: "abc" → error disappears
- Type **full username**: "demo_user_123" (13/20 shown in counter)
- **Say**: "Character counter and real-time validation. Username can contain letters, numbers, dots, and underscores."
- Click **NEXT**
- Show loading spinner

**Beat 3b: Name Step (1:50–2:10)**
- Logo, "GETTING READY", progress dots (2/4, two dots filled)
- Heading: '"Name, please, for the party check!"'
- Name input, hint text, character counter
- Type name: "John Doe"
- **Say**: "This name is locked after submission — we show that clearly in the hint text."
- Click **NEXT**
- Show loading spinner

**Beat 3c: Back Navigation & State Persistence (2:10–2:20)**
- After success, you'd go to DOB step, but **click BACK** instead
- Redirected back to name step
- **Show that "John Doe" is still in the input** (state persisted!)
- **Say**: "Back navigation works — your data isn't lost. This is important for user trust."
- Click **NEXT** again to continue

**Beat 3d: Name Step Again (2:20–2:30)**
- Click **NEXT**
- Show loading spinner
- Redirected to `/signup/dob`

---

### **ACT 4: Wizard Step 3 — Date of Birth with Age Gate (2:30–3:30)**

**Beat 4a: DOB Screen Introduction (2:30–2:45)**
- Progress dots (3/4)
- Heading: "How many years have you been partying?"
- "Age" field (button, not input) that says "Tap to enter your date of birth"
- Hint text: "We need your age to verify you're eligible..."
- Click the Age field
- Bottom sheet slides up: "DATE OF BIRTH" with three input boxes (DD / MM / YYYY)

**Beat 4b: Invalid Date Error (2:45–3:00)**
- Type **invalid date**: Day=31, Month=02 → click **PROCEED**
- **Error message**: "That date doesn't exist — double-check it."
- **Say**: "We reject impossible dates. February 31st doesn't exist."

**Beat 4c: Underage Scenario (3:00–3:15)** — **KEY IMPROVEMENT TO SHOWCASE**
- Clear and type **underage date**: Day=01, Month=01, Year=2010
- Click **PROCEED**
- **Sheet shows success message**: "That makes you 14 — you must be 18+ to join."
- Main screen shows **red alert message** (below the age field):
  - "You need to be at least 18 to join Extroverts — you're 14 right now. We'll save you a spot on the dance floor. 🎈"
- **Say**: "Here's a key improvement — the original app silently rejected young users. We show an empathetic, clear message instead. The user understands why they can't proceed, and we keep their experience positive."
- **Next button is disabled** (grayed out)

**Beat 4d: Correct Age & Proceed (3:15–3:30)**
- Click the Age field again to re-open the sheet
- Clear and type **valid adult date**: Day=15, Month=05, Year=1995
- Sheet shows: "29 years of partying — looking good. ✓"
- Main screen no longer shows the error alert
- Close the sheet (click PROCEED or X button)
- **Say**: "Now we're 29 — all good."
- Click **NEXT**
- Show loading spinner

---

### **ACT 5: Wizard Step 4 — Pronouns with Autocomplete (3:30–4:00)**

**Beat 5a: Pronouns Screen (3:30–3:45)**
- Progress dots (4/4, all filled)
- Heading: "Which pronouns feel right for you?"
- Pronouns input, hint: "Select the pronouns that feel right for you."
- Type "he" into the input

**Beat 5b: Autocomplete Dropdown** — **IMPROVEMENT TO SHOWCASE**
- **Dropdown appears** with suggestions:
  - "he/him/his"
  - "he/they"
  - (others filtered based on typing)
- **Say**: "We provide pronoun suggestions — common combinations appear in a dropdown. Users can click to select or type custom pronouns. It's helpful without being restrictive."
- Click **"he/him/his"** to select
- Dropdown closes, input now shows "he/him/his"

**Beat 5c: Submit Pronouns (3:45–4:00)**
- Click **NEXT**
- Show loading spinner

---

### **ACT 6: Invite Code & Success (4:00–5:00)**

**Beat 6a: Invite Code Step (4:00–4:20)**
- Manifesto is displayed (purple-highlighted key words like "PARTY", "KINDNESS", etc.)
- "Enter invite code (optional)" input
- **Leave blank** (skipping is optional)
- Click **SIGN UP**
- Show loading spinner

**Beat 6b: Success Screen (4:20–4:50)**
- Redirected to `/signup/success`
- "Signed up successfully" **toast notification** slides in from top (green with ✓ checkmark)
- **Say**: "Success toast confirms the signup is complete."
- Toast auto-dismisses after 4 seconds
- Home feed is now **unlocked** (no longer locked/grayed out)
- Event cards are clickable, show details

**Beat 6c: Explore Member Experience (4:50–5:00)** (optional, if time)
- Click **Profile** tab (bottom nav)
- Show user profile:
  - Name: "John"
  - Username: "@demo_user_123"
  - Pronouns: "he/him/his"
  - Age: "29"
  - Club: "Bronze Club Member"
  - Tokens: "0"
- **Say (optional)**: "Member profile shows all the data we collected, nicely formatted."
- Click **Log Out** button
- **Toast**: "Logged out. See you at the next party!"
- Redirected back to landing page
- **Say (final)**: "That's the full flow — signup to member experience, with all validation and improvements along the way."

---

## Optional: Demonstrating Error Handling (Bonus, +1 min)

**If you have time**, add a brief error scenario:

1. **Stop the dev server** (Ctrl+C)
2. **Edit `.env.local`**:
   ```
   NEXT_PUBLIC_MOCK_FAILURE_RATE=0.5
   ```
3. **Restart dev server** (`npm run dev`)
4. **Re-run a wizard step** (e.g., username):
   - Type a username and click **NEXT**
   - ~50% chance: global error toast appears: "Something went wrong. Please try again."
   - **Say**: "Our mock API can simulate failures. Users see a clear error message and can retry."
   - Click **BACK** and try again
   - This time it should succeed (50% chance)

---

## Post-Production Tips

### Editing (Optional)
- **Trim silence** at the beginning/end
- **Add captions** for key steps (e.g., "Age validation - new improvement!")
- **Add background music** (royalty-free, low volume, optional)
- **Speed up** boring parts like spinners (1.5x speed on 1.2s load times)

### Upload
- **Format**: MP4 (H.264)
- **Resolution**: 1440×810 minimum
- **Duration**: 4–5 minutes
- **Platform**: Google Drive, YouTube (unlisted), or Vimeo

### Naming
- `extroverts-demo-[date].mp4`
- Example: `extroverts-demo-2026-08-16.mp4`

---

## Checklist Before Recording

- [ ] App is running locally (`npm run dev` works)
- [ ] Browser zoom is 100% (Ctrl+0)
- [ ] `.env.local` has `NEXT_PUBLIC_MOCK_FAILURE_RATE=0` (no random failures)
- [ ] Recording software is ready (OBS, QuickTime, Xbox Game Bar, etc.)
- [ ] Screen resolution is 1440x810 or higher
- [ ] No distracting notifications or background apps
- [ ] Mock OTP is `123456` (verify in `lib/mockApi.ts`)
- [ ] All browser tabs except localhost:3000 are closed
- [ ] You have ~6 minutes of free time (allows for retakes)

---

## Retake Strategy

**It's OK to have multiple takes.** Don't stress about perfection:

1. **Record multiple full runs** (4–6 minutes each)
2. **Watch them back** and pick the cleanest one
3. **If you stumble mid-recording**, just keep going — it's easier to edit/retake that section than to start over
4. **Use editing software** to splice together the best parts if needed

---

## Final Tips

1. **Speak slowly** and clearly if narrating
2. **Pause briefly** before clicking to show the UI (let viewers see the screen)
3. **Highlight improvements** during recording (age gate message, OTP resend, pronouns dropdown)
4. **Go slowly through the DOB age gate** — this is a key improvement, so make sure viewers see the error message and understand the UX enhancement
5. **Show back navigation** — it's important that data persists when going backward
6. **Don't rush** — 4–5 minutes is plenty of time; being clear and methodical is better than fast

---

## Submission

Once you have your final recording:

1. **Upload to Google Drive** (right-click → Share → Change to "Anyone with the link")
2. **Copy the shareable link** (not the edit link)
3. **Fill out the Google Form**: https://forms.gle/UFK1tUAzVBfStptf9
   - Video link
   - GitHub repo (optional)
   - Brief notes on improvements
4. **Submit before Aug 21, 2026**

---

**Good luck! You've got this. 🎉**

