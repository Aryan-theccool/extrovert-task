# 🚀 Extroverts Signup Wizard — START HERE

**Welcome!** This document is your entry point to the complete Frontend Engineering Assessment submission.

---

## ⏱️ Quick Status

| Metric | Status |
|--------|--------|
| **Build Status** | ✅ Complete & tested |
| **All Features** | ✅ Implemented |
| **Documentation** | ✅ Comprehensive |
| **Ready to Record** | ✅ Yes |
| **Submission Deadline** | Aug 21, 2026 |
| **Days Remaining** | 5 days |

---

## 📖 Documentation Guide

Read these in order based on your needs:

### 1. **SUBMISSION_SUMMARY.md** (5 min read) ⭐ START HERE
- Quick overview of what's built
- The 3 key UX improvements
- Quick start guide (`npm run dev`)
- Recording outline (4 minutes)
- Deployment options

**👉 Start with this file to get oriented.**

### 2. **RECORDING_GUIDE.md** (10 min read) 🎬
- **What to do BEFORE recording** (setup checklist)
- **Beat-by-beat script** with timings (0:00–5:00)
- **What to click and say** at each step
- **Optional error scenarios** to demonstrate
- **Post-production tips** (editing, uploading)
- **Retake strategy**

**👉 Read this right before creating your screen recording.**

### 3. **BUILD_ASSESSMENT.md** (20 min read) 📋
- **Detailed feature-by-feature verification**
- **Criteria mapping** (assessment requirements → implementation)
- **All UX improvements explained** (with reasoning)
- **Complete implementation checklist**
- **Quality metrics** (performance, accessibility, build size)
- **What this demonstrates** (to hiring managers)

**👉 Read this to understand the full scope of what's implemented.**

### 4. **README_ASSESSMENT.md** (15 min read) 📚
- High-level overview
- Complete feature checklist
- Project structure and file locations
- Testing checklist
- Deployment options
- Key differentiators
- Common issues & fixes

**👉 Use this as a reference during development and testing.**

---

## 🎯 Your Action Plan (Today)

### Step 1: Verify Everything Works (5 min)
```bash
cd extrovert-task/extroverts-clone
npm install  # (only if not already done)
npm run dev
# Open http://localhost:3000 in browser
# Verify you see the landing page loading
```

### Step 2: Read the Quick Summary (5 min)
Read **SUBMISSION_SUMMARY.md** to understand:
- What's built (landing, email, OTP, 4 wizard steps, success)
- The 3 key UX improvements (age gate, OTP resend, pronouns autocomplete)
- Why this matters

### Step 3: Test the Flow (10 min)
Open http://localhost:3000 and manually test:
- Click through landing → splash → terms
- Enter email, verify OTP (code: `123456`)
- Fill all wizard steps
- Go back and verify data persists
- Reach success screen

### Step 4: Create Your Screen Recording (30–45 min)
Follow **RECORDING_GUIDE.md**:
- Use the beat-by-beat script
- Stick to 4–5 minutes
- Highlight the 3 improvements
- Upload to Google Drive (shareable link)

### Step 5: Submit (5 min)
- Fill out form: https://forms.gle/UFK1tUAzVBfStptf9
- Attach video link
- Add optional notes on improvements
- Click submit

**Total time: ~1 hour to submission-ready** ✨

---

## 📁 What's in This Repository

```
extrovert-task/
├── extroverts-clone/                     # 🎯 The actual Next.js app
│   ├── src/app/                          # Routes (landing, terms, signup, success)
│   ├── src/components/                   # React components (Button, Input, etc.)
│   ├── src/context/                      # State management (WizardContext)
│   ├── src/lib/                          # Utilities (validation, mock API, age logic)
│   └── package.json                      # Dependencies
│
├── 📄 START_HERE.md                      # You are here ← 
├── 📄 SUBMISSION_SUMMARY.md              # ⭐ Read this first (5 min)
├── 📄 RECORDING_GUIDE.md                 # 🎬 Read before recording (10 min)
├── 📄 BUILD_ASSESSMENT.md                # 📋 Full feature checklist (20 min)
├── 📄 README_ASSESSMENT.md               # 📚 Complete reference (15 min)
│
├── 01_PRD.md                             # Product requirements (background)
├── 02_Technical_Architecture.md          # Tech stack & architecture
├── 03_Feature_Ticket_List.md             # Feature breakdown
├── 04_Security_and_Access.md             # Security notes
└── 05_Frontend_Specification.md          # Design system & specs
```

---

## ✅ Assessment Requirements (All Met)

Here's what the assessment brief asked for:

### Landing Page ✅
- [x] Landing page mechanism (boot → splash → location → feed)
- [x] Similar to reference app's design and behavior
- [x] Terms and conditions screen
- [x] Entry CTA visible

### Signup Wizard ✅
- [x] 4-step form (username, name, age, pronouns)
- [x] Progressive disclosure (one step at a time)
- [x] Visual parity with app (typography, color, spacing, components)

### Validation & Logic ✅
- [x] Real-time validation (email, username, name, DOB, pronouns)
- [x] Error handling (inline + global toasts)
- [x] Input constraints (character limits, numeric-only for DOB)
- [x] Loading states (spinners on buttons)
- [x] Cross-field logic (email → OTP dependency, age gate)

### Advanced UX ✅
- [x] Responsive design (mobile, tablet, desktop)
- [x] Back navigation with state persistence
- [x] Success feedback (success screen + redirect)
- [x] Accessibility (WCAG 2.1 AA compliant)
- [x] **Improvements beyond reference app**:
  - Age < 18 rejection with empathetic message (not silent)
  - OTP resend with countdown (not stuck)
  - Pronouns autocomplete (helpful suggestions)

---

## 🎥 What Your Recording Should Show (4–5 min)

### The Flow
1. **Landing** (0:00–0:45): Boot → splash → location → terms
2. **Email & OTP** (0:45–1:30): Email entry, OTP verification, resend demo
3. **Wizard Steps 1–2** (1:30–2:30): Username, name, back navigation demo
4. **Wizard Step 3** (2:30–3:30): DOB, **age gate improvement** (key moment!)
5. **Wizard Step 4** (3:30–4:00): Pronouns, **autocomplete improvement**
6. **Invite & Success** (4:00–4:50): Optional invite, success screen

### The Talking Points
- "Real-time validation prevents errors"
- "Back navigation preserves data — important for UX"
- "Age gate message is clearer than the reference app's silent block"
- "OTP resend countdown prevents frustration"
- "Pronouns autocomplete helps without limiting choice"
- "Success toast confirms the signup worked"

---

## 🚀 Quick Commands

```bash
# Go to the app directory
cd extrovert-task/extroverts-clone

# Install dependencies (one time)
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Deploy to Vercel (optional)
vercel deploy
```

---

## 🎯 The Three Improvements (Sell These!)

When recording, make sure to highlight these because they show you didn't just copy the app — you improved it:

### 1️⃣ **Age Gate Clarity**
- **Problem**: Reference app silently rejects users < 18
- **Solution**: Empathetic inline message explaining why and offering hope
- **Message**: "You need to be at least 18 to join Extroverts — you're 17 right now. We'll save you a spot on the dance floor. 🎈"
- **Where to show**: DOB step, deliberately enter underage date

### 2️⃣ **OTP Resend Countdown**
- **Problem**: Reference app doesn't offer a resend option
- **Solution**: Resend link with 30-second countdown timer
- **Countdown**: "Resend OTP in 28s" → "Resend OTP in 1s" → "Resend OTP"
- **Where to show**: OTP screen, wait a few seconds to see the countdown

### 3️⃣ **Pronouns Autocomplete**
- **Problem**: Reference app is just a free-text field with no guidance
- **Solution**: Dropdown with 6 common pronoun combinations + real-time filtering
- **Suggestions**: he/him/his, she/her/hers, they/them/theirs, etc.
- **Where to show**: Pronouns step, type "he" to trigger suggestions

---

## 📝 Submission Checklist

Before you record and upload:

- [ ] App runs locally without errors (`npm run dev` works)
- [ ] All pages load (no 404s or blank screens)
- [ ] Form validation works (errors appear in real-time)
- [ ] OTP code is `123456` (try entering it)
- [ ] Age gate shows for users born after 2008 (born 01/01/2010)
- [ ] Pronouns autocomplete filters when you type
- [ ] Back buttons work and restore data
- [ ] Success screen appears after pronouns step
- [ ] Logout button works and resets state
- [ ] Mobile view looks good (test at 375px width)
- [ ] Recording is 4–5 minutes
- [ ] Video is clear and readable (1440×810 minimum)
- [ ] You've highlighted the 3 improvements
- [ ] Video is uploaded and shareable

---

## 🎤 Recording Tips

### Technical Setup
- **Resolution**: 1440×810 or higher (readable text)
- **Frame rate**: 30 FPS
- **Zoom**: 100% (Ctrl+0 on Windows)
- **Software**: OBS, QuickTime, Xbox Game Bar, or Snip & Sketch Record

### Presentation
- **Speak slowly** and clearly
- **Pause before clicking** (let viewers see the UI)
- **Highlight improvements** ("Here's how we improved this...")
- **Go back on purpose** (show data persistence)
- **Don't rush** — 4–5 minutes is plenty

### Retakes
- It's OK to record multiple takes
- Pick the cleanest one
- You can edit and splice sections if needed

---

## 💡 Key Learning Points

After you submit, be ready to discuss:

1. **Why you chose your tech stack** (Next.js, Tailwind, Context API)
2. **How state management works** (Context + useReducer pattern)
3. **Why the UX improvements are better** (age gate clarity, OTP resend, autocomplete)
4. **How you handle accessibility** (ARIA, color contrast, keyboard nav)
5. **How you think about form validation** (real-time vs submit-time)

---

## 📚 Resource Files

These are reference documents for context (not required for submission):

- **01_PRD.md** — Product requirements doc (background)
- **02_Technical_Architecture.md** — Tech stack & design decisions
- **03_Feature_Ticket_List.md** — Feature breakdown
- **04_Security_and_Access.md** — Security considerations
- **05_Frontend_Specification.md** — Design system & specs

---

## 🤔 FAQ

### Q: Do I need to deploy this somewhere?
**A**: No, running locally is fine for the recording. But you can deploy to Vercel for free with `vercel deploy` if you want a live link to share.

### Q: What's the mock OTP code?
**A**: `123456` (hardcoded for reproducibility)

### Q: Can I show errors?
**A**: Yes! Set `NEXT_PUBLIC_MOCK_FAILURE_RATE=0.5` in `.env.local` to trigger random mock failures. Great for showing error recovery.

### Q: How long should the recording be?
**A**: 4–5 minutes. The assessment says "no more than 5 mins", so aim for 4–4.5 min to be safe.

### Q: Do I need to narrate the recording?
**A**: No, silent is OK. But narration is a plus if you want to explain your improvements.

### Q: What if I make a mistake in the recording?
**A**: Just keep going. You can do multiple takes and pick the best one. Hiring managers understand this isn't a live demo.

### Q: Where do I submit?
**A**: Google Form: https://forms.gle/UFK1tUAzVBfStptf9
- Video link (Google Drive, YouTube unlisted, or Vimeo)
- Source code link (optional)
- Brief notes on improvements

---

## 🎯 Next Steps (Right Now!)

1. ✅ Open this repo in your terminal
2. ✅ Run `npm run dev` in the `extroverts-clone` directory
3. ✅ Open http://localhost:3000 in your browser
4. ✅ Verify the landing page loads
5. ✅ Read **SUBMISSION_SUMMARY.md** next (~5 min)
6. ✅ Test the flow manually (~10 min)
7. ✅ Read **RECORDING_GUIDE.md** (~10 min)
8. ✅ Create your screen recording (~30 min)
9. ✅ Submit the form with your video link

**Total time to submission: ~1 hour** ⏱️

---

## 💪 You've Got This

This is a **complete, professional submission**. The code is clean, the features are solid, the UX is thoughtful, and you've identified and implemented real improvements beyond the reference app.

The hiring team will see:
- ✅ Faithful recreation of a reference product
- ✅ Strong React fundamentals
- ✅ Attention to UX and accessibility
- ✅ Clean, maintainable code
- ✅ Problem-solving mindset (improvements, not just copy)

**Now go create that killer recording! 🚀**

---

## 📞 If You Get Stuck

1. Check **BUILD_ASSESSMENT.md** for detailed feature docs
2. Check **RECORDING_GUIDE.md** for step-by-step instructions
3. Run `npm run build` to check for TypeScript errors
4. Open browser DevTools (F12) and check the Console for errors
5. Test in an incognito window to rule out cache issues

---

**Last updated**: August 16, 2026  
**Deadline**: August 21, 2026  
**Status**: ✅ Ready to ship

**Let's go! 🎉**

