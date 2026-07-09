# PHEPHA — Build Log

**Started:** 2026-07-09
**Builder:** Autonomous (Claude Code role)
**Repo:** `projects/phepha/` (local only, no publish)

This log records every material decision made during the build, with reasoning. Per the founder's directive: "answer the questions yourself with research and reasoning, then log the question, your answer and why."

---

## DECISION LOG

### D-014 — Visual rehaul to one unified system (v2)
**Question:** The site reads as amateur — rehaul theme, logo, colours, fonts, sizes?
**Answer:** Full rehaul to one coherent system, per approved plan.
**Diagnosis (from a 20-point design audit):** the problem wasn't missing craft — it was (1) **pattern saturation** (highlighter swoosh, cloned two-card pricing, "we beat them" table, +/- FAQ — all recognised SaaS tropes); (2) **three different greens** (#CCFF00 signal, #A6D000 signal-dark, #C1E600 logo); (3) **dead legacy tokens** (--forest aliased to ink but still naming a green; a forest-green focus ring on a non-green brand; a "Manrope" comment above Hanken Grotesk); (4) **no spacing system + two parallel type systems** (invoice preview minted 14 ad-hoc sizes ignoring the --fs-* scale); (5) **logo mark had no silhouette** (sans L + swoosh).
**Two founder decisions (locked):** keep lime but unify it; redesign the mark, keep the wordmark.
**Changes applied:**
- **Token sheet rewritten (`lunga.css`):** ONE lime (#CCFF00 + #B9E600 readable step + #F3FFD1 soft). Deleted --forest/--forest-dark entirely. Ink focus ring replaces green. Added a spacing scale (--s1…--s9). Geometric radius scale (4/8/12/16). Honest comments.
- **Logo mark redrawn:** bold geometric L in negative space inside an ink square, foot terminating in a lime notch (the "paid" tick). Real silhouette; reads at 16px; single-colour variant for PDF. Wordmark kept. Founder PNG preserved.
- **Landing page de-troped:** hero highlighter swoosh removed; lime lives only in CTA + pay-row + checkmarks/yes. FAQ +/− glyph → chevron disclosure. Pricing footer (competitor cost comparison) removed. Section headlines reworded to be self-standing, not relative to rivals. Comparison table kept (founder call) but retokenised (lime Yes / grey all-else, no orange/red).
- **Generator retokenised:** invoice preview's 14 ad-hoc font sizes remapped onto the --fs-* scale. Error tints tokenised. Paywall, trial pills, plan picker all retokenised. All JS preserved.
- **PDF generation:** colour calls updated to unified lime/ink (no #C1E600, no forest RGB).
- **Internal docs:** BRAND_GUIDE rewritten to v2; MASTER_PROMPT_SPEC updated for future DALL·E runs.
**Verified:** source-audit (zero forest/legacy green; one lime family); rendered colour audit (ink-dominant, lime only on checkmarks/yes); type audit (Hanken throughout, serif display-only); functional re-test (trial pill Day 1/14, VAT R7,820 correct, valid PDF, clean console).
**What I did NOT change:** approved copy, section order, pricing (R99/R129), trial/paywall tactics, all JS functionality.
**Status:** DECIDED & IMPLEMENTED.

### D-013 — Monetization playbook adopted; paywall tactics implemented
**Question:** Incorporate the paywall-conversion guidance (founder-supplied transcript of ~3,000-paywall study) as best practice?
**Answer:** Yes — adopted as a *methodology* (testable hypotheses, not law), with discipline. Full reasoning + tactics + 3 founder-decision tradeoffs in `internal/MONETIZATION_PLAYBOOK.md`.
**Applied to the product (high-confidence, on-brand tactics):**
- Trial banner shows **Day X of 14** + "we'll remind you before day 14" (Blinkist-style risk reduction; kills the "will I forget to cancel?" fear)
- Modal reframed from "Upgrade" → **"Redeem your 14 days"** (pay-ramp language, not a wall)
- **"No commitment. Cancel anytime."** reassurance under the CTA
- Price anchor: **"R3.30 a day — less than a cappuccino"** + monthly fallback line "Not ready to commit for a year?"
- **Right-chevron** on the Pay now → button
- **Contextual trigger**: an expired-trial user enabling a PayFast link now opens the wall at the moment of value (not randomly)
**Rejected (off-brand / dark patterns):** spin-the-wheel, fake countdowns, aggressive last-minute discounts, confusing trial toggles, hard-to-cancel flows. A compliance brand cannot afford the trust cost.
**Founder decisions flagged (NOT silently implemented — genuinely two-sided):**
- **Decision A:** require card to start trial? (Outset case: >50% signup drop, 5× conversion). *Default: no-card for launch; A/B test once live PayFast recurring billing exists.*
- **Decision B:** trial on annual plan only? (Moonly case). *Default: full-product trial; test later.*
- **Decision C:** multi-page paywall? *Default: single modal (our users want speed, not an emotional journey).*
**Honesty label:** the transcript's claims are practitioner anecdotes, not verified. Our own live conversion data, once we have it, supersedes them.
**Status:** DECIDED & IMPLEMENTED (tactics); A/B/C remain open for founder.

### D-012 — LOCKED Brand System V1 implemented (design authority directive)
**Question:** Implement the locked Lunga V1 visual identity?
**Answer:** Yes — implemented verbatim. This supersedes my earlier brand-guide drafts (terracotta/serif-everywhere). The directive came from the design authority and is mandatory.
**Key changes applied:**
- **Palette:** Forest `#0F6B4F` primary; Signal lime `#CCFF00` as a ~3% accent device (not a theme); ink/paper/grey neutrals. Terracotta removed entirely.
- **Type:** Instrument Serif restricted to *emotional display statements only* (sparingly); **Manrope** for all UI/headings/body/figures (tabular-nums). This directly corrects the serif-overuse that read as patchwork. Verified: only 2 serif headings, 8 Manrope headings.
- **Shared tokens:** single `assets/lunga.css` is the source of truth; both pages inherit the same grammar (no per-section restyling).
- **Surfaces:** whitespace → dividers → cards (in priority order). Removed the default 3-card "why" grid; replaced with a vertical divider list. Standalone icons, never in coloured boxes.
- **Radius:** locked scale (btn/input 6, card 8, panel 10, preview 10, modal 12; max 12).
- **Annotation device:** one fluorescent lime hand-drawn underline per viewport (hero: "Paid faster").
- **Buttons:** verb-specific (Create invoice, Pay now, Download PDF, Send invoice, Add client) — purged Submit/Proceed/Continue.
- **Banned copy:** purged (seamlessly, empower, unlock, leverage, etc.) — verified clean.
- **Removed backdrop-blur** on navs to avoid any glassmorphism read.
**Functionality preserved:** trial model, VAT calc, SARS Section 20 fields, PDF generation, PayFast link logic — all verified working post-refactor.
**Status:** DECIDED & IMPLEMENTED.

### D-011 — Price increase: R99/mo annual / R129/mo monthly
**Question:** Raise pricing from the R49/R69 draft?
**Answer:** Yes. **Annual R99/mo (R1,188/yr)**, **Monthly R129/mo**. (Revises the price figures in D-009; the *model* — annual-primary subscription, trial, no free plan — is unchanged.)
**Why:** The Xero (R5,400/yr) and Sage (R2,880/yr) anchors leave clear headroom. At R99/mo annual we still cost ~59% less than Sage and ~78% less than Xero — strong value without leaving money on the table. Annual ARPU roughly doubles vs the R49 draft, materially improving unit economics and the path to a sustainable annuity (founder's explicit ask).
**Derived figures recomputed:** annual total R1,188; annual-vs-monthly saving R360/yr; competitor savings R1,700–R4,200/yr; GTM ARR target ~R100,000 at 100 customers.
**Tradeoff:** Higher price may slightly reduce conversion vs R49 — mitigated by the 14-day no-card trial and the competitor-savings story. A/B test (R89/R119) once real data exists.
**Applied:** site-wide (landing, app modal, confirm dialog, meta description, FAQ) + internal docs (PRICING_ANALYSIS, GO_TO_MARKET_V2, MASTER_PROMPT_SPEC). Public site verified clean of old prices.
**Status:** DECIDED.

### D-010 — Remove free plan; trial + paid-only
**Question:** Keep the free plan?
**Answer:** No. Replace with a **14-day free trial (no card)** → converts to paid. No permanent free tier.
**Why:** Founder directive: "do away with the free plan, we're ultimately looking to make money." A trial still enables try-before-buy (critical for conversion) without giving away the core monetisable features (PayFast, saved clients) indefinitely. Aligns with the subscription model (D-009).
**Status:** DECIDED.

### D-009 — Pricing model: annual subscription (primary) + monthly
**Question:** One-time R299 or subscription? Maximise return + annuity?
**Answer:** **Annual subscription R399/year (primary CTA), R49/month (secondary option), 14-day trial (no card).** Drop one-time.
**Why:** Comprehensive analysis (see docs/PRICING_ANALYSIS.md) shows:
1. Critical finding: **Zoho Invoice is free forever, unlimited** — Lunga cannot win on price vs free. The R299 one-time "cheaper than accounting software" wedge was true vs Sage/Xero but FALSE vs Zoho.
2. Annual subscription yields ~3.2× the 3-year revenue of one-time (R924k vs R293k on a 1,000-customer cohort), satisfying the founder's annuity/return ask.
3. Annual cadence (1 renewal/yr) keeps babysitting low — honours "I don't have time to babysit."
4. Real wedge shifts to **native PayFast + SARS-specific + zero-friction + privacy**, not price.
5. R399/yr still saves the user R2,400–R5,000/yr vs Sage/Xero.
**Tradeoff:** More complex than one-time (PayFast recurring vs single). Mitigated by annual cadence + PayFast's subscription/tokenisation feature (payfast.io/features/subscriptions).
**Status:** DECIDED. Supersedes D-004.

### D-008 — RENAME: "Phepha" → "Lunga"
**Question:** Rename the business to Lunga?
**Answer:** Yes. Site-wide rename to **Lunga** (from the Nguni root *-lunga* = "right, correct, proper"; *ukulunga* = to put right / amend).
**Why:** Stronger brand for a compliance product — the promise is literally "get your invoice right." Tagline becomes "Invoices, done right." Warmer and more human than Phepha; a familiar SA given name. The rename will be applied as part of the v2 visual redesign (no point renaming files that are about to be rebuilt). Folder stays `projects/phepha/` for now to avoid churn mid-build; the *brand* is Lunga.
**Pronunciation:** loo-ngah.
**Status:** DECIDED. Supersedes D-001.

### D-001 — Company name: "Phepha" *(SUPERSEDED by D-008)*
**Question:** What do we call the company?
**Answer:** **Phepha** (from isiXhosa/isiZulu "phepha" = paper / document).
**Why:** The product produces documents (invoices, quotes, receipts). "Phepha" is a real, widely-understood South African word for "paper," instantly meaningful to SA users across languages. It's short, brandable, two syllables, easy to spell and type into a URL bar. It signals local authenticity without being parochial. Domain check: phepha.co.za / phepha.app likely available (inference — cannot verify live DNS without a lookup tool, but the word is uncommon as a brand).
**Tradeoff:** Non-English speakers who don't know the word may not connect it to invoicing immediately — mitigated by a clear tagline.
**Status:** DECIDED.

### D-002 — Product: SARS-compliant invoicing tool for SA sole traders
**Question:** What exactly are we building?
**Answer:** A self-serve web tool where a South African sole trader / freelancer / micro-business owner enters their business + client + line-item details and downloads a branded PDF tax invoice or quote that is **SARS-compliant** (meets the VAT Act Section 20 mandatory fields) and embeds a **PayFast payment link** so they get paid faster.
**Why:** Validated gap — free generators aren't SARS-compliant; real accounting software (Xero/Sage/QuickBooks) is overkill + expensive for a sole trader. The wedge is the *combination*: compliant + PayFast + cheap + ZAR + SA-localised. Full reasoning in BUSINESS_CASE.md.
**Status:** DECIDED.

### D-003 — Tech stack: 100% client-side static site
**Question:** How do we keep runtime cost at zero and stay deployable free on Netlify/Vercel?
**Answer:** Pure HTML/CSS/JS. No backend, no database, no server functions. PDF generation client-side via jsPDF + html2canvas (vendored locally). Form state in localStorage. No API calls at runtime.
**Why:** (a) Zero hosting cost on free tier. (b) No per-customer server cost. (c) Works on slow SA connections (no round-trips). (d) No data privacy concerns — customer data never leaves their browser. (e) Offline-capable via service worker (future). Available API keys (Anthropic, Tavily) are for the *build/research phase only*, not the product.
**Status:** DECIDED.

### D-004 — Pricing: freemium, one-time paid tier
**Question:** How do we price it?
**Answer:** Free tier (unbranded basic invoices/quotes). Paid "Pro" tier: **R299 once** for lifetime access to: branding (logo + colours), PayFast payment links, recurring invoice templates, receipt generator, and unlimited saved clients. No subscription.
**Why:** (a) One-time fee converts higher than subscription for a side-hustle audience skeptical of recurring billing (validated in research — "subscription fatigue" was a dominant theme). (b) R299 is the price of a decent dinner in SA — low friction, perceived fair for a business tool. (c) No subscription = no billing infrastructure, no churn management, no dunning — keeps the solo operation automated and simple. (d) Competitor anchor: a single Xero subscription is R400+/mo forever; we're R299 total.
**Tradeoff:** Lower LTV than subscription; we'll add a "Phepha+" subscription later (annual compliance reminders, document updates) once base revenue flows. For launch, simplicity wins.
**Status:** DECIDED.

### D-005 — Payment collection: PayFast
**Question:** How does the customer pay us, automatically?
**Answer:** PayFast (payfast.io). Self-service payment link generated in the PayFast dashboard; embedded as a checkout button on the pricing page. Supports Instant EFT (2% fee), cards (3.5% + R2), and EFT.
**Why:** (a) Native to SA, no setup fee, no monthly fee. (b) Settles to a SA bank account in 2 business days. (c) Self-service payment links require no coding — fits the no-server constraint. (d) Validated in research: PayFast is the "default choice for most SA businesses."
**Tradeoff:** Subscription billing via PayFast is immature — but since we chose one-time pricing (D-004), this doesn't matter for launch.
**Status:** DECIDED.

### D-006 — Target customer: SA sole traders with paying clients
**Question:** Who is the customer?
**Answer:** South African sole traders, freelancers, consultants, tutors, tradespeople, and micro-businesses (1-3 people) who invoice clients and are online.
**Why:** (a) If you invoice, you're digital by definition — sidesteps the informal-sector connectivity problem the founder flagged. (b) They have revenue (clients pay them) → can afford R299. (c) They feel the pain of late payment directly → strong motivation for the PayFast payment-link feature. (d) Underserved by enterprise accounting software.
**Status:** DECIDED.

### D-007 — Positioning against competitors
**Question:** How do we position vs. free generators and vs. accounting software?
**Answer:** "SARS-compliant invoices and quotes, with payment links, for the price of a dinner. No subscription. No accounting degree required." We are explicitly NOT accounting software — we are the document tool between "I need to bill someone" and "I need full bookkeeping."
**Why:** Free generators fail on compliance; accounting software fails on price + complexity. We own the middle. See BUSINESS_CASE.md competitive matrix.
**Status:** DECIDED.

---

## SELF-ANSWERED QUESTIONS (no founder input needed)

### Q-001 — Should I use the Anthropic/Tavily API keys in the product?
**Logged answer:** No. The product is client-side static. Keys are for build-time research only. Keeps runtime cost zero and avoids exposing keys in client code. *Reason: guardrail — no new spend; keys are fair game but I choose not to spend them at runtime.*

### Q-002 — Should I deploy to verify?
**Logged answer:** No — guardrail says publish nothing, local preview only. I'll run a local static server (python3 -m http.server) and verify in browser locally.

### Q-003 — How do I verify SA search demand without a paid SEO tool?
**Logged answer:** Use Google's free public "related searches" and autocomplete via web search, plus the existence of "top invoice template SA" listicle articles (which only exist because there's search demand). Label inferences as inferences.

---

## VERIFICATION RESULTS (2026-07-09)

Per AGENTS.md: "Verify before reporting success." All checks run in a real browser engine (Playwright + Google Chrome headless) against the live local server on port 3010.

| Check | Result |
|---|---|
| Landing page renders, correct `<title>` | ✅ PASS |
| H1 hero copy correct | ✅ PASS |
| CTA button present | ✅ PASS |
| 9-item compliance checklist renders | ✅ PASS (9 items) |
| Pricing comparison table renders | ✅ PASS |
| Generator: form accepts input | ✅ PASS |
| Generator: live preview updates on input | ✅ PASS |
| Preview shows "TAX INVOICE" | ✅ PASS |
| Preview shows supplier name + VAT | ✅ PASS |
| **PDF download works** | ✅ PASS — `Tax-Invoice-INV-0042.pdf`, 8563 bytes, valid `%PDF-` header |
| VAT math correct | ✅ PASS — R6,800 × 1.15 = R7,820 |
| Mobile responsive (390px) | ✅ PASS |
| Console errors | ✅ NONE |
| All 9 Section 20 fields present in PDF | ✅ PASS (verified via Node + jsPDF, compress:false) |

**Verdict: VERIFIED.** Product works end-to-end. Local preview live at http://localhost:3010.

---

## CUT / DEFERRED ITEMS

Per guardrail: "if a phase stalls, ship the strong 80%, note what got cut."

| Item | Status | Reason |
|---|---|---|
| Real PayFast live payment | DEFERRED | Guardrail: publish nothing, local preview only. Demo unlock (confirm dialog) substitutes. Deployment steps in README §Deploy. |
| Pro: custom logo upload | CUT from v1 | Adds file-handling + logo-to-PDF complexity. R299 value is carried by PayFast links + branding colour. Add in v1.1 if requested. |
| Pro: saved clients/items library | DEFERRED | localStorage already persists the current invoice; a multi-client library is a v1.1 feature. Free tier + current persistence covers the core job. |
| Recurring invoice templates | DEFERRED | Listed as a Pro feature on the site; not yet wired. Build after first 30 customers signal demand. |
| Receipt generator | DEFERRED | Document type "Receipt" exists in the generator; dedicated receipt UI is a v1.1 nicety. |
| SEO blog articles | NOT BUILT | Out of scope for "build the product"; the GTM plan (docs/GO_TO_MARKET.md) specifies the 7 articles to write. |
| Serverless ITN handler | NOT BUILT | Needs deployment (out of guardrail). Specified in GTM §5. Fallback: manual unlock code (documented). |
| Backend / database | NEVER | By design. Static site = R0 cost + privacy. |

**What shipped (the strong 80%):** a complete, verified, working SARS-compliant invoice + quote generator with live preview, PDF download, brand identity, marketing site, business case, and go-to-market plan. The cuts are all "more features" or "deployment-time" items — the core product and its commercial case are intact.
