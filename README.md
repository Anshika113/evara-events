# Evara Events & Weddings

A **lead-generation website** for a wedding & events planner — built with React,
Vite, and Cloudflare Workers.

**Live:** https://evara-events.anshikami7890.workers.dev/

---

## What this is

| | |
|---|---|
| **Frontend** | React 18 + React Router 6 (Vite 5) |
| **Backend** | Cloudflare Worker (JavaScript) |
| **Database** | Cloudflare D1 (leads + newsletter subscribers) |
| **Hosting** | Cloudflare Workers — static assets and API in a single deploy |

The frontend and the API are served from the same origin, so there is no CORS
setup and no `VITE_API_URL` to configure. Static files are served straight from
Cloudflare's edge; the Worker only runs for `/api/*`.

### Pages (8)
Home · About · Services · **3 service pages** (`/services/weddings`, `/corporate`,
`/birthdays`) · Portfolio · Contact.
FAQ and Testimonials are **sections** — FAQ on Contact, Testimonials on Home.

### Features
- **Custom UI design** with scroll animations and an art-directed hero
- **Service-specific pages** — each service has its own detail page (overview,
  what's included, process, pricing, related services)
- **Advanced, filterable portfolio** with a full-screen **lightbox**
- **Testimonials** (Home section) and an **FAQ accordion** (Contact section)
- **Advanced enquiry form** — event type, date, guest count, budget, message →
  stored as leads in D1 (**lead capture**)
- **Newsletter sign-up** (lead capture) in the footer
- **WhatsApp lead CTAs** throughout
- **SEO** — meta + Open Graph, JSON-LD structured data, Search Console tag slot
- **Google Analytics** slot (commented snippet in `index.html` — add your ID)
- Image optimization (lazy-loaded photos with graceful fallback)

---

## Project structure

```
evara-events/
├─ wrangler.jsonc       Worker name, static-assets config, D1 binding
├─ schema.sql           D1 tables (leads, subscribers)
├─ worker/
│  └─ index.js          The API: /api/enquiry, /api/subscribe, /api/leads, /api/health
├─ backend/             Legacy FastAPI version — kept for reference, not deployed
│  ├─ app.py
│  └─ requirements.txt
└─ frontend/
   ├─ index.html        SEO, JSON-LD, GA + Search Console slots
   ├─ download-images.js  Optional: fetch stock photos into public/images
   ├─ public/images/    Drop your photos here (see images/README.md)
   └─ src/
      ├─ data.js        ⭐ All content — business, services, portfolio, FAQs
      ├─ api.js         Enquiry + subscribe helpers
      ├─ components/    Navbar · Footer · FloatingButtons · SmartImage · Lightbox · Reveal
      └─ pages/         Home · About · Services · ServiceDetail · Portfolio · Contact
```

---

## The API

Served by `worker/index.js` at the same origin as the site.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/enquiry` | Validate + store an event enquiry (lead) |
| `POST` | `/api/subscribe` | Newsletter sign-up |
| `GET`  | `/api/leads` | List captured leads (see below) |
| `GET`  | `/api/health` | Health check |

Successful writes return `201` with `{ ok, id, message }`. Validation failures
return `400` with `{ ok: false, errors: { field: "..." } }`, which the form renders
inline against the offending field.

`GET /api/leads` returns every captured lead — name, phone, event details — so it
is gated behind a bearer token when one is configured:

```bash
npx wrangler secret put ADMIN_TOKEN
```

With the secret set, the endpoint requires `Authorization: Bearer <token>`.
Without it, the endpoint is public — set it before go-live.

---

## Running locally

**Frontend only (fastest for UI work):**

```bash
cd frontend
npm install
npm run dev          # http://localhost:5174
```

Vite proxies `/api` to the backend — update the proxy target in `vite.config.js`
to `http://localhost:8787` and run `npx wrangler dev` in a second terminal.

**Full stack, closest to production:**

```bash
cd frontend && npm install && npm run build && cd ..
npx wrangler dev     # http://localhost:8787 — site + API against a local D1
```

Rebuild the frontend after each change in this mode. To seed the local database:

```bash
npx wrangler d1 execute evara-events --file=./schema.sql
```

(Omitting `--remote` targets the local dev copy.)

---

## Deploying

First time only — create the database and paste the printed `database_id` into
`wrangler.jsonc`:

```bash
npx wrangler login
npx wrangler d1 create evara-events
npx wrangler d1 execute evara-events --remote --file=./schema.sql
```

Every deploy after that:

```bash
cd frontend && npm run build && cd ..
npx wrangler deploy
```

Requires Wrangler 4.20+ — the `run_worker_first` array form in `wrangler.jsonc` is
ignored silently on older versions, which makes `/api/*` fall through to the SPA
and return HTML instead of JSON.

Verify:

```bash
curl https://evara-events.anshikami7890.workers.dev/api/health
npx wrangler d1 execute evara-events --remote \
  --command "SELECT id, name, phone, event_type, event_date FROM leads ORDER BY id DESC LIMIT 5"
```

`npx wrangler tail` streams live Worker logs if a form submission doesn't land.

---

## Customising

- **All content** (business info, services + detail pages, portfolio, testimonials,
  FAQs, form options) → **`frontend/src/data.js`**
- **Colours & fonts** → `:root` in **`frontend/src/styles.css`**
- **SEO / Analytics / Search Console** → **`frontend/index.html`** (replace the GA
  Measurement ID and the `google-site-verification` code, and update the JSON-LD)
- **Photos** → run `node download-images.js`, or drop files into
  `frontend/public/images/` per `images/README.md`

> Sample phone, WhatsApp, email, address and map are placeholders — update before
> go-live.

---

## Tech notes
- React 18 + React Router 6 (with a dynamic `/services/:slug` route), Vite 5
- Cloudflare Workers + D1; no server to run, no Python host required
- D1 is SQLite-compatible, so `schema.sql` matches the original `backend/leads.db`
- No paid services required to run or deploy (Workers and D1 free tiers) 
