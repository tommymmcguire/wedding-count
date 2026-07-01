# wedding-count

Wedding RSVP app. Guest list lives in a Google Sheet; RSVPs are written back to the same Sheet.
Deployed to Vercel (free tier) at `rsvp.<yourdomain>`, embedded into or linked from the
main Canva wedding site.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Google Sheets API v4 via a service account
- Zod for input validation
- No database — the Sheet is the source of truth

## Local setup

```bash
pnpm install
cp .env.local.example .env.local
# fill in .env.local
pnpm dev
```

App runs at `http://localhost:3000`.

Useful scripts:

- `pnpm dev` — start the dev server
- `pnpm build` — production build (also verifies types)
- `pnpm typecheck` — types only

## Google Sheet setup

Create a Google Sheet with **one tab** named `Guests` (or set `GOOGLE_SHEET_TAB` to
whatever you name it). Row 1 is a header row; row 2 onward is data. Columns, in order:

| Col | Header | Notes |
|-----|--------|-------|
| A | `household_id` | Any stable string (e.g. `smith-01`). Multiple guests share this. |
| B | `guest_name` | Full name of this specific guest. |
| C | `is_primary` | `TRUE` for one row per household (the anchor invitee). |
| D | `attending` | Left blank. App writes `TRUE` / `FALSE` on submit. |
| E | `rsvp_status` | Left blank. App writes on submit. |
| F | `rsvp_address_line1` | Left blank. App writes on submit. |
| G | `rsvp_address_line2` | Left blank. App writes on submit. |
| H | `rsvp_city` | Left blank. App writes on submit. |
| I | `rsvp_state` | Left blank. App writes on submit. |
| J | `rsvp_postal_code` | Left blank. App writes on submit. |
| K | `rsvp_country` | Left blank. App writes on submit. |
| L | `rsvp_note` | Left blank. App writes on submit. |
| M | `rsvp_submitted_at` | Left blank. App writes ISO 8601 timestamp on submit. |

Example (a 2-person household plus a solo invitee):

```
household_id | guest_name  | is_primary | attending | rsvp_status | ...
smith-01     | John Smith  | TRUE       |           |             |
smith-01     | Jane Smith  | FALSE      |           |             |
jones-01     | Bob Jones   | TRUE       |           |             |
```

To add more guests to a household, insert additional rows with the same
`household_id`. To add a new household, use a new `household_id`. Households can be any
size.

## Google Cloud setup (one time)

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a new project (e.g. "wedding-rsvp").
2. Enable the **Google Sheets API** — search for it, click Enable.
3. Go to **IAM & Admin → Service Accounts** and click **Create Service Account**.
   - Name: `wedding-rsvp-writer`. Grant no roles at the project level; permission is via the Sheet share.
4. Open the created service account → **Keys** → **Add Key → Create new key → JSON**. Download the file.
5. Open the JSON file. Copy these two fields:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
6. **Share the Google Sheet** with the `client_email` address as an **Editor**.
7. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/<THIS_PART>/edit` → `GOOGLE_SHEET_ID`.

### About the private key env var

The JSON file has real newlines. In `.env.local` and in Vercel's env var UI, keep the
literal `\n` characters — the app converts them at runtime. Example:

```
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
```

## Deploy to Vercel

1. Push the repo to GitHub.
2. In [vercel.com](https://vercel.com), click **Add New → Project**, pick the repo, keep the default framework (Next.js).
3. Add the three env vars in the Vercel project's Environment Variables section:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
   - (optional) `GOOGLE_SHEET_TAB` if your tab isn't named `Guests`
4. Click **Deploy**.

## Custom domain (Cloudflare DNS)

1. In the Vercel project → **Settings → Domains → Add** — enter `rsvp.yourdomain.com`.
2. Vercel will show a required DNS record. It's usually:
   - Type: `CNAME`
   - Name: `rsvp`
   - Value: `cname.vercel-dns.com`
3. In Cloudflare → your domain → **DNS → Records → Add Record** — enter exactly what Vercel provided.
   - **Set proxy status to DNS only (grey cloud).** Vercel manages TLS; if Cloudflare's proxy is on, cert issuance can fail.
4. Wait 1–5 minutes. Vercel will show a green checkmark and auto-issue a Let's Encrypt cert.

Your app is now live at `https://rsvp.yourdomain.com`.

## Embed in Canva

On your Canva Pro Website:

1. Add an **Embed** element to the RSVP page.
2. Paste `https://rsvp.yourdomain.com`.
3. Canva runs the URL through its embed service. Two possible outcomes:
   - **Live iframe:** the form appears inline. Done.
   - **Preview card:** Canva shows a link card, not a live form. In that case, delete the Embed element and replace it with a **Button** styled prominently ("RSVP Now") that links to `https://rsvp.yourdomain.com`.

Either way, guests stay on your top-level domain family (`yourdomain.com` and `rsvp.yourdomain.com`).

## How it works

- **Guest search** (`/`): guest types their name → `GET /api/guests?q=...` returns up to 5 matches from the Sheet (name-only, no address or status leaked).
- **Household form**: on match click → `GET /api/guests?household_id=...` returns the full household roster and any prior RSVP for pre-fill.
- **Submit**: `POST /api/rsvp` → server validates with Zod, then `updateHouseholdRsvp` batches writes for the whole household in one Sheets API call.
- **Caching**: guest list is cached in-memory for 60 seconds per Vercel function instance to keep read latency low and stay well under Sheets API rate limits. Cache is invalidated on every submit.

## Files

- [app/page.tsx](app/page.tsx) — top-level view state machine (search → form → submitted)
- [app/api/guests/route.ts](app/api/guests/route.ts) — autocomplete + household detail endpoint
- [app/api/rsvp/route.ts](app/api/rsvp/route.ts) — submission endpoint
- [lib/sheets.ts](lib/sheets.ts) — Google Sheets client, read/write, in-memory cache
- [lib/guests.ts](lib/guests.ts) — shared types, search logic, household assembly
- [components/GuestSearch.tsx](components/GuestSearch.tsx) — debounced type-ahead
- [components/RsvpForm.tsx](components/RsvpForm.tsx) — household roster + status + address + note
- [components/SubmittedCard.tsx](components/SubmittedCard.tsx) — post-submit confirmation

## Security notes

Guests identify themselves by typing their name — there's no invite code or password. Anyone with the URL can submit an RSVP as any guest on the list. This is a deliberate trade-off for wedding-scale use. If it becomes a problem, add a per-guest code column to the Sheet and require it as a query string parameter (`?code=xyz`) on the RSVP link.
