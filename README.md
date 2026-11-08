# Next.js App Router Cache + Mantine Modal Repro

This repository is a minimal reproducible example (repro) demonstrating an interoperability bug between Next.js 16 (App Router) client-side caching and Mantine Modal exit animations.

## 🚀 Live Demo
**https://nextjs-mantine-cache-repro.vercel.app/**

## 🐛 The Bug
When a user triggers `router.push()` at the exact moment a Mantine Modal is closed, Next.js takes a frozen snapshot of the DOM *before* Mantine's exit animation completes and the Portal fully unmounts. 

When the user navigates back to the original page, Next.js restores this cached snapshot—leaving an invisible `<div class="mantine-Modal-overlay">` blocking all page interactivity.

## 🔄 Steps to Reproduce
1. Go to the root page (Dashboard).
2. Click **Open Modal**.
3. Click **Create Project & Navigate**.
   - *Under the hood, this fires `close()` and `router.push('/project-editor')` simultaneously.*
4. You are navigated to the `/project-editor` route.
5. Click **Go back to Dashboard** (this triggers a client-side back navigation restoring the cache).
6. Try to click the **Open Modal** button again.
7. **Result:** You cannot click the button. Inspect the DOM and you will see the `.mantine-Modal-overlay` is still present, blocking the page.

## 🔬 Investigation & Proof
This is fundamentally a race condition between UI unmount animations and Next.js's aggressive route caching. 

To prove this, if you modify `next.config.mjs` to disable the aggressive caching features:
```javascript
cacheComponents: false,
partialPrefetching: false,
```
The bug disappears entirely. Without the cache, Next.js is forced to reconstruct the React tree cleanly upon navigating back, rather than restoring the broken mid-animation snapshot.

## 🛠️ Workarounds
Currently, the ways to prevent this in a production application are:
1. Globally disable exit animations for Modals (`transitionProps: { exitDuration: 0 }`).
2. Add an artificial ~250ms `setTimeout` to delay `router.push()` until Mantine finishes its unmount cleanup.
3. Apply `styles={{ overlay: { display: opened ? 'block' : 'none' } }}` so the orphaned overlay is at least hidden.
4. Disable `cacheComponents` globally in Next.js.

## 💻 Environment
- **Next.js:** 16.4.5 (App Router)
- **Mantine:** ^9.7.5
- **React:** 19.3.0