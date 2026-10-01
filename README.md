# Efoil London

The website and shop for Efoil London: London's only e-foil destination (Queen Mother Reservoir, Datchet) and the UK's largest authorised LIFT eFoil retailer.

Next.js 16 (App Router) · Tailwind CSS 4 · Motion · Lenis · Supabase (`e_foil` schema).

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: video hero, the reservoir, lessons, LIFT5/LIFTX, locations, tech, testimonials, shop |
| `/lessons` | All four lessons, how booking works, requirements, FAQs |
| `/london` | Queen Mother Reservoir and the Hayling Island centre |
| `/lift5`, `/liftx` | Product-line pages: studio films, colourways, packages, official LIFT film |
| `/shop`, `/shop/[slug]` | Catalogue (eFoils, lessons, wings, accessories) and product pages |
| `/used` | Used Not Abused: sold listings and the buy/sell enquiry form |
| `/what-is-an-efoil`, `/about`, `/contact` | Explainer, story and team, contact and enquiries |
| `/checkout` | Bag checkout (lessons and kit) |
| `/terms`, `/privacy` | Legal pages |

Old Squarespace URLs (for example `/lift-efoils-lift5` or `/shop-efoil-wings/p/...`) permanently redirect to the new pages (see `next.config.ts`).

## Content and data

- **Products** live in Supabase in `e_foil.products`. Edit prices, copy, badges or `active` (to hide a product) in the Supabase table editor, and the site updates within about 5 minutes. `src/data/catalog.ts` holds the same catalogue as a fallback in case the database is unreachable.
- **Orders** (`e_foil.orders`), **enquiries** (`e_foil.enquiries`) and **newsletter sign-ups** (`e_foil.newsletter_signups`) are written by the site. Visitors can insert rows but can't read them back (RLS). Check new rows in the Supabase dashboard.
- Checkout re-prices every item on the server from the catalogue, so a tampered basket can't change prices.
- **Card payments** are optional. Set `STRIPE_SECRET_KEY` (in Vercel environment variables) and checkout offers "Pay by card" via Stripe Checkout. Without it, orders are reserved and the team arranges payment.
- Business details, opening hours and the "London's only e-foil destination" claim are in `src/lib/site.ts`. Editorial copy (testimonials, team, FAQs, tech, locations) is in `src/data/content.ts`.

## Media

- Videos: `public/video/<name>-720.mp4` (mobile and tiles) and `<name>-1080.mp4` (full-bleed on large screens), each with a `<name>.jpg` poster. They are registered in `src/lib/media.ts`. Videos load lazily, pause off-screen, and are skipped for reduced-motion and data-saver users.
- To add a new loop: `ffmpeg -i in.mp4 -an -vf "scale=1280:720,format=yuv420p" -c:v libx264 -preset slow -crf 27 -movflags +faststart public/video/new-720.mp4`, then add it to `src/lib/media.ts`.
- Images: `public/images/photos` (editorial), `public/images/shop/<slug>` (product shots, per colour), `public/brand` (logos, rider mark sprite).

## GitHub Pages demo

A static demo is published to GitHub Pages on every push to `main` (`.github/workflows/pages.yml`). It's for showing the design only: forms and checkout show a "demo preview" message instead of submitting, and search engines are told not to index it.

The demo mode is switched on with `GITHUB_PAGES=true` (see `next.config.ts`): static export under the repo sub-path, a stub in place of the server actions (`src/demo/actions.ts`), and `scripts/prepare-pages.mjs` to make the export servable by static hosting. The normal build, used for the live site on Vercel, is unaffected.

## Scripts

```bash
npm run dev     # local development
npm run build   # production build
npm run lint    # ESLint
```
