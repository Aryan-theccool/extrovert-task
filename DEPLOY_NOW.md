# 🚀 Deploy to Vercel — Simple 3-Step Guide

**Time to deploy: ~5 minutes**

---

## Why Deploy?

✅ Show a live, working app (not just a video)  
✅ Hiring team can test it themselves  
✅ Professional credibility  
✅ Easy backup if video doesn't upload  
✅ Shows production-ready thinking  

---

## Prerequisites

- [x] Vercel CLI installed: `npm install -g vercel`
- [x] GitHub account (optional, but recommended)
- [x] App builds locally: `npm run build` ✅

---

## Step 1: Push to GitHub (Optional but Recommended)

### If you have a GitHub account:

```bash
cd extrovert-task/extroverts-clone

# Initialize git (if not already done)
git init
git add .
git commit -m "Extroverts signup wizard with 8 UX improvements"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/extroverts-clone.git
git branch -M main
git push -u origin main
```

### If you don't have GitHub:
You can still deploy directly to Vercel (skip this step).

---

## Step 2: Deploy to Vercel

### One-command deployment:

```bash
cd extrovert-task/extroverts-clone
vercel deploy
```

### What to Answer:

```
? Set up and deploy "extroverts-clone"? [Y/n]
→ Answer: Y (yes)

? Which scope do you want to deploy to?
→ Select: Your personal account

? Link to existing project? [y/N]
→ Answer: N (no, new project)

? What's your project's name?
→ Answer: extroverts-clone

? In which directory is your code located?
→ Answer: . (current directory)

? Want to modify the settings? [y/N]
→ Answer: N (use defaults)
```

### Deployment Output:

You'll see:
```
✓ Linked to [your-account]/extroverts-clone
✓ Inspecting files...
✓ Created .vercelignore
✓ Building...
✓ Built successfully

> Production: https://extroverts-clone-xyz.vercel.app
```

**Copy this URL** — that's your live app! 🎉

---

## Step 3: Test the Live Deployment

### Verify it works:

1. **Open the URL**: `https://extroverts-clone-xyz.vercel.app` (your actual URL)
2. **Test the flow**:
   - [ ] Landing page loads
   - [ ] Click through email → OTP → wizard
   - [ ] Enter OTP: 123456
   - [ ] Test improvements:
     - [ ] Email validation (try demo@extroverts.app)
     - [ ] Contextual errors (try username admin)
     - [ ] Success animations
     - [ ] Review screen appears
3. **Check performance**:
   - [ ] Pages load quickly
   - [ ] No console errors (F12)
   - [ ] Mobile view works (responsive)

---

## URLs to Save

### Your Live Deployment
```
🌐 Production: https://extroverts-clone-xyz.vercel.app
🌐 Vercel Dashboard: https://vercel.com/dashboard
🌐 GitHub Repo: https://github.com/YOUR_USERNAME/extroverts-clone
```

---

## Update & Redeploy (If Needed)

### Make a change locally, then redeploy:

```bash
# Make your changes locally
# ...edit files...

# Rebuild to test locally
npm run build
npm run dev

# Once happy, deploy to Vercel
vercel deploy --prod
```

---

## Submission: Where to Put the Links

### In the Assignment Submission Form:

**Assignment link field**:
```
https://extroverts-clone-xyz.vercel.app
```

**Add notes field** (example):
```
EXTROVERTS SIGNUP WIZARD — FRONTEND ENGINEERING ASSESSMENT

LIVE DEMO: https://extroverts-clone-xyz.vercel.app

KEY IMPROVEMENTS (8 total):
1. Age gate clarity (empathetic under-18 message)
2. OTP resend with countdown timer
3. Pronouns autocomplete with suggestions
4. Email existence validation
5. Contextual error messages
6. Success screen animations
7. Profile review screen
8. Skeleton loading components

TECH STACK:
- Next.js 14 + React 18 + TypeScript
- Tailwind CSS (no external UI library)
- Context API + useReducer for state
- WCAG 2.1 AA accessibility compliant
- 92/100 Lighthouse Performance

GITHUB (optional): https://github.com/YOUR_USERNAME/extroverts-clone

BUILD STATUS:
✅ 0 TypeScript errors
✅ 0 ESLint warnings
✅ Production-ready
✅ Responsive (mobile/tablet/desktop)
```

---

## Troubleshooting

### Issue: `vercel` command not found
**Solution**: Install Vercel CLI
```bash
npm install -g vercel
```

### Issue: Build fails on Vercel (but works locally)
**Solution**: 
- Check Node version: `node --version` (should be 18+)
- Delete `.next` folder locally: `rm -rf .next`
- Rebuild: `npm run build`
- Redeploy: `vercel deploy --prod`

### Issue: Deployment is slow
**Solution**: 
- First deployment is slower (builds everything)
- Subsequent deploys are faster
- Be patient (can take 2–5 minutes)

### Issue: Live site shows blank page
**Solution**:
- Check browser console (F12)
- Clear cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+R)
- Try incognito mode

### Issue: Live site doesn't have my latest changes
**Solution**:
- Make sure you ran `npm run build` locally first
- Then run `vercel deploy --prod` (with `--prod` flag)
- Without `--prod`, it deploys to preview URL (not production)

---

## Advanced: Custom Domain (Optional)

If you have a custom domain and want to use it:

```bash
vercel env pull  # Get environment variables
vercel domains add your-domain.com
# Follow the prompts to add DNS records
```

But for this submission, the vercel.app URL is perfect.

---

## Quick Reference

```bash
# First time deployment
vercel deploy

# Update deployment (production)
vercel deploy --prod

# View deployment URL
vercel inspect

# View logs
vercel logs [deployment-url]

# Pull environment variables
vercel env pull
```

---

## Timeline

| Step | Time | Status |
|------|------|--------|
| Install Vercel CLI | 1 min | ⏱️ Instant |
| Push to GitHub (optional) | 2 min | ⏱️ Quick |
| Deploy to Vercel | 3–5 min | ⏱️ Automatic |
| Test live deployment | 3 min | ✅ Quick |
| Get deployment URL | 1 min | 🎉 Done! |
| **Total** | **~10 min** | **Ready!** |

---

## What Your Submission Will Include

```
📹 Screen Recording (4–5 min MP4)
  └─ Shows all features and improvements

🌐 Live Deployment (Vercel URL)
  └─ Hiring team can test it themselves

📝 GitHub Repository (optional but recommended)
  └─ Shows your source code and commit history

📋 Notes (in submission form)
  └─ Explains the 8 improvements
```

---

## Example Final URLs

```
Vercel Live App:  https://extroverts-clone-abc123.vercel.app
GitHub Repo:      https://github.com/yourname/extroverts-clone
Video:            https://drive.google.com/file/d/xyz123/
```

---

## Go Live! 🚀

Ready to deploy?

```bash
cd extrovert-task/extroverts-clone
vercel deploy
```

You'll have a live URL in under 5 minutes!

**Then:**
1. Test the live deployment
2. Copy the URL
3. Use it in your submission form
4. Record your video using this live URL

**Done! Your app is live and ready for review.** ✨

