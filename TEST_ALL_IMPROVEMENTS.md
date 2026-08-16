# ✅ Test All Improvements — Quick Checklist

**Before recording your video, test each improvement locally.**

---

## Setup
```bash
cd extrovert-task/extroverts-clone
npm run dev
# Open http://localhost:3000 in browser
```

---

## Improvement #1: Email Already Exists Check

### Test Steps
1. Click landing page → Continue → Terms → Accept
2. Enter email: **demo@extroverts.app**
3. Click **Proceed**
4. ❌ **Expected**: See error: "This email is already registered. Did you mean to log in?"
5. ✅ **If you see this error** → Improvement #1 works!

### Demo Emails to Try
```
john@example.com        → Already registered
demo@extroverts.app     → Already registered
existing@test.com       → Already registered
your-email@gmail.com    → Not registered, proceeds normally
```

---

## Improvement #2: Contextual Error Messages

### Test Steps
1. Complete email → OTP (code: 123456) → Username screen
2. Enter username: **admin**
3. Click **Next**
4. ❌ **Expected**: See specific error: "This username is already taken. Try adding numbers or underscores."
5. ✅ **If you see this specific message** → Improvement #2 works!

### Other Error Triggers
```
Username "fail"  → "Username verification failed. Please try a different one."
Name "fail"      → "Name validation failed. Please use only letters and spaces."
```

---

## Improvement #3: Success Animations

### Test Steps
1. Complete entire signup flow
2. When you reach success screen, watch the success toast
3. ✅ **Expected animations**:
   - Checkmark (✓) bounces in with pop animation (~0.6s)
   - Toast message slides up and fades in smoothly (~0.5s)
4. ✅ **If you see smooth animations** → Improvement #3 works!

### What to Look For
- Checkmark is NOT instant (it bounces)
- Toast slides UP from bottom (not just appears)
- Both animations are smooth and polished

---

## Improvement #4: Profile Review Screen

### Test Steps
1. Complete signup until you reach **Pronouns** screen
2. Enter pronouns (e.g., "he/him/his")
3. Click **Next**
4. ✅ **Expected**: You land on a NEW screen: "Review your profile"
5. This screen shows:
   ```
   Email:     demo@extroverts.app
   Username:  (your username)
   Name:      (your name)
   Age:       (computed age)
   Pronouns:  he/him/his
   ```
6. ✅ **If you see all this data** → Improvement #4 works!

### Review Screen Features
- [x] Shows all 5 fields (email, username, name, age, pronouns)
- [x] Info is read-only (can't edit here)
- [x] Shows warning: "Your name CANNOT be changed after this point"
- [x] Two buttons: "Confirm & Continue" and "Edit Profile"
- [x] "Edit Profile" takes you back to pronouns (data persists)
- [x] "Confirm & Continue" goes to invite screen

---

## Improvement #5: Skeleton Loading Components

### Test Steps
1. Open browser DevTools (F12)
2. Go to Inspector/Elements
3. Search for component file: `src/components/ui/Skeleton.tsx`
4. ✅ **Expected**: File exists with three skeleton components:
   ```typescript
   export function InputSkeleton() { ... }
   export function TextSkeleton() { ... }
   export function CardSkeleton() { ... }
   ```
5. ✅ **If file exists with these components** → Improvement #5 works!

### Why This Matters
- Skeleton loaders are built and ready
- Can be used for loading states in the future
- Shows professional development practices

---

## Original Improvements (Verify Still Working)

### Improvement #1: Age Gate Clarity
1. Go to DOB step
2. Enter birthdate: **01/01/2010** (makes age 14)
3. ✅ **Expected**: See message: "You need to be at least 18 to join Extroverts — you're 14 right now. We'll save you a spot on the dance floor. 🎈"
4. ✅ **If you see this message** → Still working!

### Improvement #2: OTP Resend Countdown
1. Reach OTP screen
2. ✅ **Expected**: See "Resend OTP" link
3. Wait a few seconds
4. ✅ **Expected**: See countdown: "Resend OTP in 28s" → "Resend OTP in 1s" → "Resend OTP"
5. ✅ **If countdown works** → Still working!

### Improvement #3: Pronouns Autocomplete
1. Reach Pronouns screen
2. Type: **he**
3. ✅ **Expected**: Dropdown appears with:
   - he/him/his
   - he/they
4. Click "he/him/his" to select
5. ✅ **If dropdown works** → Still working!

---

## Complete Test Flow (Record This!)

```
1. Landing page
   └─ Boot screen (E· logo) → Splash → Location → Terms

2. Email & OTP
   └─ Email: demo@test.com (not pre-registered, so proceeds)
   └─ OTP: 123456

3. Wizard Steps
   └─ Username: demo_user_123
   └─ Name: John Doe
   └─ DOB: 15/05/1995 (age 29 — triggers success)
   └─ Pronouns: he/him/his

4. NEW: Review Screen ⭐
   └─ Verify all fields shown
   └─ Click "Confirm & Continue"

5. Invite & Success
   └─ Invite: Skip empty
   └─ Success: Watch animations! ⭐

Total: ~5 minutes
```

---

## Quick Verification (5 min)

Run this in order:

```bash
✅ npm run build
   Expected: 0 errors, builds successfully

✅ npm run dev
   Expected: App starts on http://localhost:3000

✅ Test each improvement (see above)
   Expected: All 8 improvements work smoothly

✅ Test complete flow end-to-end
   Expected: No breaks, smooth UX

✅ Check file size
   Expected: Still ~90.7 kB (no bloat added)
```

---

## Video Recording Moments

When recording, make sure to capture these key moments:

1. **Email exists error** (0:45–1:00)
   - Enter demo@extroverts.app
   - Show error message
   - Say: "Email validation checks if account exists"

2. **Contextual error** (1:40–1:50)
   - Enter username "admin"
   - Show specific error
   - Say: "Different errors for different problems"

3. **Success animation** (4:00–4:15)
   - Complete signup
   - Watch checkmark bounce in
   - Watch toast slide up
   - Say: "Smooth animations make success feel rewarding"

4. **Review screen** (3:45–4:00)
   - Show all 5 fields
   - Highlight "name locked" warning
   - Say: "Users review their data before confirming"

---

## Troubleshooting

### Issue: Email doesn't show error
- **Solution**: Make sure you're using exactly `demo@extroverts.app` or `john@example.com`
- **Check**: `src/lib/mockApi.ts` has `REGISTERED_EMAILS` list
- **Fallback**: Try `john@example.com` instead

### Issue: Username "admin" doesn't show specific error
- **Solution**: Make sure you're on the username step
- **Check**: `src/lib/mockApi.ts` has admin check in `submitProfileField()`
- **Fallback**: Try "fail" instead (always triggers error)

### Issue: Review screen doesn't appear
- **Solution**: Make sure you completed pronouns step
- **Check**: File `src/app/signup/review/page.tsx` exists
- **Check**: `src/app/signup/pronouns/page.tsx` routes to `/signup/review`
- **Rebuild**: Run `npm run build` again

### Issue: Success animations don't appear smooth
- **Solution**: Check that animations are in `src/styles/globals.css`
- **Check**: `src/app/signup/success/page.tsx` has `animate-slide-up-fade` and `animate-bounce-pop` classes
- **Browser**: Try clearing cache (Ctrl+Shift+Delete) and refresh

---

## Final Checklist Before Recording

- [x] All 8 improvements work locally
- [x] Email validation works (try demo@extroverts.app)
- [x] Contextual errors work (try username "admin")
- [x] Success animations are smooth (watch closely!)
- [x] Review screen shows all fields
- [x] Back navigation still preserves data
- [x] Age gate message still shows for under-18
- [x] OTP resend countdown still works
- [x] Pronouns autocomplete still works
- [x] Build succeeds with 0 errors
- [x] All pages load (no 404s)
- [x] Mobile layout looks good (test at 375px)

---

## Ready to Record? ✅

If all improvements work, you're ready!

```bash
npm run build  # Final check
npm run dev    # Start dev server
# Open browser → Record your 4–5 min video
```

**Show all improvements in your recording — they're what make this submission stand out!** 🌟

