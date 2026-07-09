# LUNGA — Master Brand Spec (for DALL·E / GPT)

**Purpose:** Paste this entire document into GPT/DALL·E (or any image/brand AI) to get a logo, font recommendation, and brand visuals that match Lunga's identity. Self-contained — no project knowledge required on the model's side.

> **Copy everything below this line into your AI prompt.**

---

## PROJECT SPEC

**Name:** Lunga
**Pronunciation:** loo-ngah
**Etymology:** Nguni root *-lunga* — "to be right, correct, proper"; *ukulunga* = to put right, to mend, to fix.
**Meaning we lean on:** "Get your invoice right." The name itself encodes the promise.

**What the product is:**
A SARS-compliant invoicing tool for South African sole traders, freelancers, and micro-businesses (1–3 people). The user types their business + client details and downloads a PDF tax invoice that meets **Section 20 of the South African Value-Added Tax Act** (the 9 mandatory tax-invoice fields). Paid plans add a native **PayFast** payment link to each invoice so the user gets paid faster by Instant EFT or card.

**Nature of the business:**
- A solo-founder, automated, low-cost side-hustle turned real micro-SaaS
- 100% browser-based (no backend); customer data never leaves the device — a privacy + simplicity advantage
- Built specifically and only for South Africa (not a global tool localised for ZA)

**Target customer:**
South African sole traders with paying clients who invoice digitally: freelancers (design, writing, dev), consultants, private tutors, tradespeople with a smartphone, small agencies, therapists, photographers, caterers. NOT the offline informal sector. They are time-poor and price-sensitive but have revenue flowing.

**Pricing:** R99/month billed annually (R1,188/yr) or R129/month month-to-month. A 14-day free trial, no card. No permanent free plan. Position: cheaper than accounting software (Xero R5,400/yr, Sage R2,880/yr), deliberately not competing with free tools (Zoho Invoice) on price — competing on native PayFast + SARS-specificity + simplicity + privacy.

**The core differentiators (in priority order):**
1. **Native PayFast** — global invoicing tools can't do SA's default payment gateway natively. This is the monetisable wedge.
2. **SARS-specific compliance** — not generic "tax compliant"; hardcoded to the exact 9 Section 20 fields.
3. **Zero friction / privacy** — no signup, no server, data stays in the browser. In and out in 2 minutes.

---

## INTENTION & BRAND VOICE

**The single line:** *Invoices, set right.*

**Positioning statement:**
For the South African sole trader who needs to bill clients but doesn't need accounting software — Lunga is the SARS-compliant invoicing tool with built-in PayFast payment links, for R99 a month.

**Voice:** The capable friend who actually knows how SARS works. Direct, warm, confident, a little dry. Never corporate, never condescending, never cute. SA English naturally ("R99 a month", "EFT", "tax invoice", "vendor", "SARS"). Specific over vague (name Section 20, name the 9 fields).

**What the brand must feel like:** Trustworthy and precise (it's a financial/compliance product), but warm and human (the audience is a person, not an enterprise). Distinctly South African without being kitsch or stereotyped. Considered, not flashy. Premium at an affordable price.

**What the brand must NOT feel like:** Generic global SaaS template; "AI-generated"; playful/quirky; emoji-heavy; cold corporate; stock-photo-grid; purple/indigo/gold-SaaS cliché.

---

## CURRENT VISUAL DIRECTION (v2 rehaul — 2026-07-09)

**Concept:** "Editorial Invoice." The product makes documents — so the whole brand is set like a precisely typeset financial broadsheet. Achromatic ink-on-paper with ONE lime accent. One designed system, not a patchwork of borrowed SaaS patterns.

**Palette (achromatic + ONE lime — no competing green):**
- Ink (near-black): `#0F1011` — the dominant brand/action colour. Text, buttons, headings, links, focus ring.
- Paper: `#FAFAF8` — page background.
- White: `#FFFFFF` — surfaces.
- **Lime `#CCFF00`** — the single chromatic accent (fills, swatches, the logo notch). Used sparingly.
- Lime-mid `#B9E600` — same hue, one readable step (for accent *text* on white).
- Lime-soft `#F3FFD1` — soft tint surface (invoice pay box, badges).
- Greys 50/100/200/400/600/800 — neutral steps.
- Error `#D63C32` (+ bg `#FBEDE4`, line `#F0CDBD`); Warning `#F0A020`.

**Why these:** Ink-on-paper with one lime is deliberately NOT the indigo/violet/gold/teal default of every invoicing SaaS. The lime earns attention precisely because nothing competes with it. **No forest green, no teal** — those were retired (they clashed with the lime).

**Type:**
- **Instrument Serif**, weight 400 — emotional display statements ONLY (hero headline, pull-quote, final CTA). Nothing else.
- **Hanken Grotesk** — everything else (UI, all headings, body, figures). Weights 400/500/600/700. Tabular-nums on figures.
- Type scale (8 fixed steps): display 64 · h1 40 · h2 28 · h3 20 · lead 19 · body 16 · sm 14 · xs 12. Used everywhere including the invoice preview.
- **No serif on** FAQ, buttons, nav, forms, tables, routine headings. No gradient text.

**Spacing:** a 9-step scale (4/8/12/16/24/32/48/64/96). No magic numbers.

**Radius:** geometric — 4 / 8 / 12 / 16. Max 16.

**Logo (redesigned in v2):** a bold geometric **"L"** cut as negative space inside a tight ink square; the foot of the L terminates in a **lime notch** (the "done/paid" tick). Distinct silhouette, reads at 16px, works single-colour. Wordmark "Lunga" in Hanken Grotesk beside it. The old "wordmark + swoosh" formula is retired.

---

## WHAT I NEED FROM YOU (GPT/DALL·E)

### 1. Font recommendation
Recommend a final headline typeface + body typeface pairing (and a mono if needed) that best serves this brief. Constraints:
- Must be available on Google Fonts or free/open (bootstrapped, no licensing budget).
- Headline serif should feel editorial, confident, slightly warm — not corporate (not Georgia/Times default), not too quirky. Consider how it renders SA Rand figures if used for prices.
- Body sans must be supremely legible at small sizes and pair well with the chosen serif.
- Justify the pairing against alternatives (2–3 options with a clear winner).
- Give exact font weights and a refreshed fixed size scale.

### 2. Logo
Generate a **vector-style, flat logo** for "Lunga". Requirements:
- A wordmark "Lunga" + a simple mark/symbol that can be used alone as a favicon/app icon.
- The mark should conceptually evoke: a document/invoice, OR the letter "L", OR "putting something right" (a check/completion), OR a folded paper sheet — ideally combining two of these. The current concept (an "L" formed as a folded paper sheet with a terracotta dot as the "paid/done" mark) is a starting reference but you may improve it.
- Colours: ink `#1A1714` + terracotta `#B5482A` (+ ivory background if needed). No gradients, no 3D, no photorealism.
- Style: clean, geometric-but-warm, confident line work (1.5–2px stroke weight), works at 16px favicon and full size. South-African-modern, not generic-tech.
- Must be legible in single colour (black on white / white on black) for invoices.
- Deliver: the mark, the wordmark, and the lockup (mark + wordmark side by side).

### 3. Supporting brand visuals
Suggest/generate: a simple icon set style (we currently use 1.6px stroke line icons — confirm or propose better), a document/invoice card treatment, and 2–3 hero/section visual concepts that fit "editorial invoice" without using stock photos or flat-people illustrations.

---

## DELIVERABLE FORMAT
For fonts: family names + weights + exact size scale + pairing rationale.
For logo: describe each variant precisely enough to regenerate, or output SVG if able.
Keep everything consistent with the palette and voice above. If you'd change the palette, justify it — but the default is to keep ink/bone/terracotta.

> **End of paste.**
