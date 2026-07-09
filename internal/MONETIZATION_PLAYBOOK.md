# LUNGA — Monetization & Paywall Playbook

**Version:** 1.0 · **Date:** 2026-07-09 · **Status:** Internal methodology (not public)

## 0. PROVENANCE & HONESTY LABEL

This playbook distils a practitioner synthesis of ~3,000 paywalls (a video transcript shared by the founder, 2026-07-09). **These are reported practitioner learnings, not peer-reviewed or independently verified results.** They are strong, testable hypotheses — not laws. Where they conflict with our own live conversion data once we have it, **our data wins.**

Treat every tactic below as a candidate experiment, not a guaranteed uplift. Quotes/examples in the source (Opel, Headspace, Blinkist, Outset, Moonly, Slopes, Tiptop) are anecdotal case studies from the transcript, not controlled trials.

---

## 1. CORE PRINCIPLES (adopted as best practice)

| # | Principle | How we apply it at Lunga |
|---|---|---|
| 1 | **A paywall is a flow, not a screen.** The decision spans touchpoints; the wall should feel like the natural next step, not an interruption. | Trigger the upgrade at moments of *realised value*, not only on trial expiry. |
| 2 | **Sell the outcome before asking for money.** (Opel: value-first raised trial signups 7%→17%.) | The invoice + PayFast link IS the outcome. Show a finished invoice before the wall. |
| 3 | **Reduce risk, not just friction.** "Cancel anytime", a visible trial timeline, a pre-trial-end reminder. | Add a Day-X-of-14 timeline to the trial banner; "No commitment. Cancel anytime." on the modal. |
| 4 | **Reframe the offer before redesigning it.** (Tiptop: same offer, new framing, 3× conversions.) | Lead with "Redeem your 14 days" (pay-ramp framing), not "Upgrade". |
| 5 | **Value framing + price anchoring.** Compare to something they already buy. | "R99/mo ≈ R3.30/day — less than a cappuccino"; "less than one month of Xero". |
| 6 | **Two options only.** Reduce cognitive load; hide others behind "view all". | We show exactly Annual + Monthly. (Already compliant.) |
| 7 | **Default to annual** (highest LTV); trial aligns to annual. | Annual is the pre-selected, recommended option. |
| 8 | **No universal best paywall — only better experiments.** | Build the wall config-driven so copy/price/trial-length are A/B-testable without surgery. |
| 9 | **Retention & LTV are the real metrics.** Build something worth paying for. | The PayFast link that actually gets them paid faster is our retention mechanism. |

## 2. TACTICS IMPLEMENTED NOW (high-confidence, on-brand)

- "No commitment. Cancel anytime." subtitle under the price.
- Right-chevron on the **Pay now →** CTA (appears in most winning walls per the source).
- Trial timeline in the banner: **Day X of 14** (the Blinkist fix — kills the "will I forget to cancel?" fear).
- Pay-ramp copy: "Redeem your 14 days" instead of "Upgrade now".
- Contextual trigger: surface the wall when a user enables a PayFast link or downloads an invoice post-expiry — at the moment of value, not randomly.
- Price-anchor line in the modal.
- Exit-intent fallback: monthly plan positioned as "Not ready to commit for a year?" (lower-commitment path).
- Config-driven wall (a small JS object) so we can experiment without code churn.

## 3. TACTICS EXPLICITLY REJECTED (off-brand or dark patterns)

The source itself is skeptical of these. They erode trust, which a compliance product cannot afford.

- **Spin-the-wheel / gamified discounts** — dropshipping energy; kills credibility for a SARS-compliance brand.
- **Fake urgency / countdown timers** — users are learning to disbelieve these; Apple began rejecting misleading patterns in early 2026 (per the transcript).
- **Aggressive last-minute discounts** — devalue the product; prefer a longer trial as a trust-preserving win-back.
- **Confusing free-trial toggles** — the Apple-rejected pattern. We use a clean 14-day trial, no toggle trickery.
- **17-screens-to-cancel dark patterns** (the ClassPass jab in the source) — we make cancellation one click. Trust > lock-in for a sole-trader audience.

## 4. STRATEGIC TRADEOFFS — FOUNDER DECISIONS (not silently implemented)

These are genuinely two-sided. I've taken the conservative default and flagged them for you.

### Decision A — Require a card to start the trial?
- **Source claim (Outset):** card-required dropped signups >50% but 5× conversion rate → net more paying customers; filters out non-serious users.
- **Our current state:** no-card trial (lower friction, lower infra).
- **Catch:** card-required only works with **live PayFast recurring billing (tokenisation)**, which isn't built yet and conflicts with a fast, low-friction launch.
- **Recommendation:** **launch no-card**; once PayFast recurring billing is live, **A/B test card-required**. If our data mirrors Outset's, switch. Logged, not decided unilaterally.

### Decision B — Trial available on annual plan only?
- **Source claim (Moonly):** restricting the trial to the annual plan aligns trial-takers with the highest-LTV plan.
- **Our current state:** trial gives full product; upgrade modal defaults to annual.
- **Recommendation:** keep full-product trial for now (simpler, fewer edge cases); test annual-only trial once we have conversion data. Logged.

### Decision C — Multi-page paywall flow?
- **Source claim:** multi-page walls "almost always" beat single-page — but the examples are mobile-app onboardings (health/wellness), where gradual information unfolding suits an emotional journey.
- **Our context:** a web compliance utility. Users want speed ("in and out in two minutes"). A multi-page wall likely adds unwanted friction here.
- **Recommendation:** keep a single clean modal for v1; revisit only if conversion data demands. Logged.

---

## 5. THE WALL WE'RE BUILDING (config-driven, A/B-ready)

A small config object drives the paywall so we can experiment without editing markup:

```js
const PAYWALL = {
  trialDays: 14,
  requireCardUpfront: false,      // Decision A — flips to true after live billing + a test
  annualOnlyTrial: false,          // Decision B
  flow: 'modal',                   // Decision C — 'multi' is a future variant
  plans: [
    { id:'annual',  price:99,  per:'/mo', billed:'R1,188/year', save:'Save R360/yr', recommended:true },
    { id:'monthly', price:129, per:'/mo', billed:'month-to-month', fallback:'Not ready to commit for a year?' },
  ],
  cta: { annual:'Pay now', monthly:'Pay now', chevron:true },
  reassurance: 'No commitment. Cancel anytime.',
  anchor: 'R3.30 a day — less than a cappuccino.',
  framing: 'Redeem your 14 days',   // pay-ramp language, not "Upgrade"
};
```

Change a value → new variant. No markup surgery. This is how we honour "only better experiments."

---

## 6. NORTH STAR

The transcript's best line: *"maybe the question isn't how do I get people to pay. It's how could I create something worth paying for."*

For Lunga that means: a SARS-ready invoice is table stakes; the thing worth paying for is **the PayFast link that gets a sole trader paid a week faster.** Retention comes from that outcome recurring every month, not from a clever wall.
