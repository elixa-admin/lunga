# Phepha 🇿🇦

### SARS-compliant invoices that get you paid.

A self-serve, browser-based tool that produces **SARS Section 20–compliant tax invoices and quotes** for South African sole traders — branded, with an embedded PayFast payment link — for a **one-time fee of R299**. No subscription. No backend.

**Status:** Local preview, verified working. Not deployed (per build guardrail).

---

## What's in this folder

```
projects/phepha/
├── README.md                  ← you are here
├── docs/
│   ├── BUSINESS_CASE.md       ← the problem, market, proof it works (every claim sourced)
│   ├── GO_TO_MARKET.md        ← how to get the first 100 customers, inbound-only
│   ├── BRAND_GUIDE.md         ← name, colours, typography, voice
│   └── BUILD_LOG.md           ← every decision made, with reasoning
└── app/                       ← the product (the thing you run)
    ├── index.html             ← marketing / landing page
    ├── generator.html         ← the invoice/quote generator (the actual product)
    ├── assets/
    │   ├── phepha-mark.svg    ← logo mark
    │   └── phepha-logo.svg    ← logo lockup
    └── vendor/
        └── jspdf.umd.min.js   ← PDF library (vendored, no CDN)
```

---

## Run it locally (verification ports per AGENTS.md: 3002 / 3010 / 8080)

```bash
cd projects/phepha/app
python3 -m http.server 3010
```

Then open:
- **Landing page:** http://localhost:3010/index.html
- **Generator (the product):** http://localhost:3010/generator.html

No build step. No dependencies to install. No API keys needed at runtime. It's a static site.

---

## How to use the generator

1. Open `generator.html`.
2. Type your business name, VAT number (if registered), and address (saved in your browser — never sent anywhere).
3. Add your client and line items. VAT (15%) calculates itself.
4. Watch the live preview on the right — it's a real SARS-compliant tax invoice.
5. Click **Download PDF**. You get a branded, compliant PDF.

**To try Pro features** (PayFast links): scroll to the "Unlock Pro" box → click "Pay R299 with PayFast (demo)" → confirm. (Local preview only — no real payment.)

---

## Why it's SARS-compliant

Every generated tax invoice includes all **9 mandatory fields** required by **Section 20 of the Value-Added Tax Act, 1991**:

1. The words "Tax Invoice"
2. Supplier name, address & VAT number
3. Recipient name, address & VAT number
4. Serial number & date of issue
5. Description of goods/services
6. Quantity
7. Value excluding VAT
8. VAT amount & rate (15%)
9. Total including VAT

**Verification evidence** (PDF generation tested, all fields confirmed present):
- Landing page renders ✅ (Playwright + Chrome, clean console)
- Generator live preview renders ✅
- PDF download works ✅ (`Tax-Invoice-INV-0042.pdf`, valid `%PDF-`, 8563 bytes)
- All 9 Section 20 fields present in generated PDF ✅
- VAT math correct (R6,800 × 1.15 = R7,820) ✅
- Mobile responsive (390px) ✅

Full sources for every compliance + market claim: see `docs/BUSINESS_CASE.md` § 8.

---

## Deploy (when you're ready to go live)

This is a static site — deploy is drag-and-drop:

1. Go to **netlify.com/drop** (free, no account needed for a one-off) **or** connect the folder to a Netlify/Vercel git repo.
2. Drag the `app/` folder. Done. Live in ~10 seconds on a `*.netlify.app` URL.
3. Point `phepha.co.za` at it (DNS, ~R100/year domain).

**To enable real payments:** register at payfast.io → get your `merchant_id` → replace the demo ID in `generator.html` (search for `10000100`) → set up the ITN webhook per `docs/GO_TO_MARKET.md` §5.

---

## The business in one paragraph

Phepha is a SARS-compliant invoicing tool for South African sole traders. Free generators aren't SARS-compliant (they miss Section 20 fields); accounting software is overkill and costs R240–R450/month forever. Phepha owns the middle: compliant + PayFast payment links + one-time R299 + ZAR + SA-localised. Zero hosting cost (static site), zero per-customer cost, ~R6 PayFast fee per sale. Revenue target: first 100 customers = ~R29,900, acquired via inbound SEO + community (no cold outreach). See `docs/BUSINESS_CASE.md` for the proof and `docs/GO_TO_MARKET.md` for the plan.
