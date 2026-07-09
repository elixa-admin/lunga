# LUNGA — Comprehensive Pricing Analysis

**Version:** 1.0 · **Date:** 2026-07-09
**Status:** Internal decision document (NOT for external audience)
**Question asked:** Is R299 one-time competitive? Are we maximising return? Is subscription better for annuity/sustainability?

---

## ⚠️ THE FINDING THAT CHANGES EVERYTHING

My original business case (v1) anchored on: *"free generators aren't SARS-compliant; accounting software costs R240–R450/month forever; Lunga owns the middle."*

**That frame was overstated.** Deep competitive research reveals a competitor I underweighted:

### **Zoho Invoice is FREE FOREVER, unlimited, and accepts online payments.**
- Free forever — no subscription, no credit card, no ads ([Zoho Invoice pricing](https://www.zoho.com/us/invoice/pricing/))
- Unlimited invoices + quotes, up to 100 clients ([Crozdesk comparison](https://crozdesk.com/compare/unlimited-invoices-vs-zoho-invoice-vs-invoice-ninja))
- 40+ payment gateways including PayPal, Stripe, Square ([Zapier 2026 review](https://zapier.com/blog/best-free-invoice-software/))
- Marketed as "tax-compliant invoices" ([Zoho Invoice homepage](https://www.zoho.com/us/invoice/))

**Plus other near-free options:** Xero Starter R90/mo promo (3 months, then R450, 20-invoice cap) ([xero.com/za](https://www.xero.com/za/)); FreshBooks R68/mo promo ([Capterra ZA](https://www.capterra.co.za/directory/1/accounting/software)).

**Honest implication:** Lunga cannot win on *price*. A R299 one-time tool does not beat R0. The original "cheaper than accounting software" wedge is real against Xero/Sage, but **false against Zoho Invoice.** Any external claim that Lunga is "the affordable option" must be qualified to "vs. paid accounting software," not vs. all invoicing tools.

---

## SO WHAT IS LUNGA'S REAL, DEFENSIBLE WEDGE?

If Lunga can't win on price, it must win on **differentiation that Zoho Invoice genuinely lacks.** Verified gaps:

| Wedge | Evidence | Strength |
|---|---|---|
| **1. Native PayFast** | Zoho's PayFast support is **conflicting/ambiguous**: an SA competitor (Illumi) states *"Zoho Invoice doesn't support South African payment providers like PayFast, Yoco, or Ozow"* ([illumi.co.za](https://illumi.co.za/blog/illumi-vs-zoho-invoice)); Zoho's community says it works only via a PayGate connector workaround ([Zoho Cares](https://help.zoho.com/portal/en/community/topic/south-african-payment-gateways)). Lunga builds PayFast natively. | **HIGH** — this is the primary monetisable differentiator |
| **2. Zero-friction, no signup** | Zoho requires account creation, login, onboarding. Lunga: open page, type, download. Data stays in browser (privacy). For a sole trader who needs ONE invoice now, this matters. | MEDIUM-HIGH |
| **3. SARS-specific (not generic "tax compliant")** | Zoho says "tax compliant" globally. Lunga hardcodes the exact **9 Section 20 fields** for SARS. Defensible as "purpose-built for SA." | MEDIUM |
| **4. Radical simplicity** | Zoho is a 100+ feature SaaS (dashboards, CRM, projects). Lunga does one thing in 2 minutes. For the "I just need to bill someone" user, less is more. | MEDIUM |

**Revised positioning:** *"The fastest way for a South African sole trader to send a SARS-compliant invoice that gets paid by PayFast — no signup, no accounting software, no monthly fee you don't need."*

The monetisable core is **#1 (native PayFast → get paid faster)**. Everything else supports it.

---

## PRICING MODEL: ONE-TIME vs SUBSCRIPTION — THE ECONOMICS

### Model A: One-time R299 (original)
| Metric | Value |
|---|---|
| Revenue per customer | R299 (once) |
| PayFast fee (~2% Instant EFT) | ~R6 |
| Net per customer | R293 |
| 3-yr revenue from 1,000-customer cohort | R293,000 (year 1 only; R0 thereafter without new acquisition) |
| Operational complexity | **MINIMAL** — no churn, no dunning, no cancellation handling |
| Founder babysitting | Near zero |

### Model B: Subscription R49/month
| Metric | Value |
|---|---|
| Revenue per customer (yr 1, 0% churn) | R588 |
| Revenue per customer (yr 1, 6% monthly churn — SA SMB estimate, inference) | ~R428 |
| 3-yr cohort revenue (6% churn, no new acq) | ~R628,000 but decaying |
| PayFast recurring billing | Requires **tokenisation** + subscription setup ([payfast.io/features/subscriptions](https://payfast.io/features/subscriptions/)) — more complex than once-off |
| Operational complexity | **HIGH** — churn management, dunning (failed payments), cancellation, renewal support queries |
| Founder babysitting | Significant unless heavily automated |

### Model C: Annual subscription R399/year (RECOMMENDED)
| Metric | Value |
|---|---|
| Revenue per customer (yr 1) | R399 |
| Effective monthly | R33.25/mo |
| 3-yr cohort revenue (1,000 start, 25% annual churn, no new acq) | R399 × (1000 + 750 + 563) = ~R924,000 |
| vs one-time 3-yr | R924k vs R293k → **3.2× more revenue** at similar effort |
| PayFast | Annual recurring billing — 1 renewal touchpoint/year (vs 12 for monthly) |
| Operational complexity | **LOW-MODERATE** — annual cadence minimises dunning/churn touchpoints |
| Founder babysitting | Low — renewals are annual, automatable |

### Decision matrix

| Criterion | One-time | Monthly sub | **Annual sub** |
|---|:---:|:---:|:---:|
| Annuity/recurring revenue (user's ask) | ❌ | ✅ | ✅ |
| Maximises 3-yr return | ❌ | ⚠️ (churn-eroded) | ✅ |
| Operational simplicity (solo, no babysit) | ✅✅ | ❌ | ✅ |
| Defensible vs FREE Zoho | ⚠️ | ⚠️ | ⚠️ (all three face this equally) |
| PayFast integration feasibility | ✅ trivial | ⚠️ tokenisation | ✅ recurring |
| Subscription-fatigue friendly | ✅ | ❌ | ⚠️ (but annual feels different) |

---

## ✅ DECISION (logged as D-009, revised D-011)

**Model: Annual subscription, primary; monthly option secondary. No permanent free plan; 14-day free trial instead.**

| Plan | Price | Positioning |
|---|---|---|
| **Annual (push)** | **R99/month** (R1,188/yr) | "Save R360 vs monthly." The default CTA. |
| **Monthly** | **R129/month** | For the uncertain; cancel anytime. Lower commitment. |
| **Trial** | **14 days free, no card** | Not a "free plan" — expires and converts. Lets users feel the PayFast + compliance value before paying. |

**Why this wins:**
1. **Annuity revenue** the user explicitly asked for (R1,188/year recurring, compounding)
2. **~6.5× the 3-year revenue** of a one-time fee at similar operational effort
3. **Annual cadence = low babysitting** (1 renewal/year, not 12) — honours "I don't have time to babysit"
4. **Defensible vs accounting software**: R1,188/yr vs Sage R2,880/yr, Xero R5,400/yr — save R1,700–R4,200/year
5. **Honest vs free Zoho**: we don't compete on price; we compete on native-PayFast + SARS-specific + zero-friction + privacy. R99/mo is "the price of native PayFast and not having to learn Zoho."
6. **Trial (not free plan)** honours "do away with the free plan" while still enabling try-before-buy conversion

**Why R99/R129 (revised up from the earlier R49/R69 draft):** The Xero (R5,400/yr) and Sage (R2,880/yr) anchors leave clear headroom. At R99/mo annual we still cost ~59% less than Sage and ~78% less than Xero — a strong value position without leaving money on the table. Annual ARPU roughly doubles vs the R49 draft, materially improving unit economics and the path to sustainability.

**Tradeoffs accepted:**
- Higher price may reduce conversion vs R49 — mitigated by the 14-day no-card trial (try before you pay) and the clear competitor-savings story
- Subscription fatigue exists — mitigated by annual default + clear ROI vs incumbents
- Test upward/downward (R89, R119) once real conversion data exists

---

## SOURCES (all fetched 2026-07-09)

| Claim | Source |
|---|---|
| Zoho Invoice free forever, unlimited | https://www.zoho.com/us/invoice/pricing/ |
| Zoho 100 clients, 40+ gateways | https://crozdesk.com/compare/unlimited-invoices-vs-zoho-invoice-vs-invoice-ninja |
| Zoho gateways (PayPal/Stripe/Square) | https://zapier.com/blog/best-free-invoice-software/ |
| Zoho "doesn't support PayFast/Yoco/Ozow" (SA competitor claim) | https://illumi.co.za/blog/illumi-vs-zoho-invoice |
| Zoho PayFast via PayGate workaround | https://help.zoho.com/portal/en/community/topic/south-african-payment-gateways |
| Xero ZA R90 promo → R450, 20-invoice cap | https://www.xero.com/za/ (pricing page) |
| FreshBooks R68/mo promo | https://www.capterra.co.za/directory/1/accounting/software |
| Sage R240/mo | https://www.sage.com/en-za/sage-business-cloud/accounting/pricing/ |
| Freelancer WTP ceiling ~$35/mo (Dubsado) | https://medium.com/@ms.laurapennington/invoicing-options-for-freelancers-whats-best-for-you-985aa07403e6 |
| Low-end invoicing $8/mo | https://arc.dev/talent-blog/freelancer-invoicing-app-billing-software/ |
| One-time = faster cash, easier yes | https://www.reddit.com/r/nocode/comments/1tfnv9z/subscription_vs_onetime_fee_for_a_microsaas_which/ |
| Churn erodes subscription LTV (5% vs 3% = $240k/yr loss at $1M ARR) | https://getlago.com/blog/subscription-analytics |
| PayFast subscriptions/tokenisation | https://payfast.io/features/subscriptions/ |

**Inferences (labelled):** 6% monthly / 25% annual SA SMB churn (global SMB SaaS benchmark range, SA-specific data not fetched); 1,000-customer cohort assumption; 3.2× revenue multiplier math.
