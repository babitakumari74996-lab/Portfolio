# SHIPMODE portfolio

A React + Vite portfolio with React Three Fiber, Drei, GSAP ScrollTrigger, Framer Motion, and Tailwind CSS.

## Deploy

Run `npm install` and `npm run build`, then deploy the `dist` directory to Vercel or Netlify. The existing Vite configuration emits a self-contained HTML build.

## Before publishing for a client

- Replace the contact destinations in `CONTACT` at the top of `src/App.tsx` with the actual Fiverr gig, email address, WhatsApp number, and social profiles.
- No screenshot files were present in the project workspace. The three previews automatically try `public/projects/gupta-furniture.png`, `public/projects/omex-exclusive.png`, and `public/projects/neonsutra.png` first. Add the supplied screenshots at those paths before publishing. Until then, the cards fall back to live captures of the exact project URLs.
- Replace the explicitly labeled sample testimonials with verified client reviews and confirm the displayed experience and achievement numbers.
- The contact form opens a prefilled email in the visitor's mail app. Connect a form endpoint if server-side submissions are needed.

WebGL scenes are mounted only when near the viewport and render at a maximum DPR of 1.5. Reduced-motion preferences disable continuous scene motion and desktop scroll pinning.