# PHEPHA — Go-To-Market Plan

**Version:** 1.0 · **Date:** 2026-07-09
**Goal:** First 100 paying customers (R299 each = ~R29,900 revenue) with zero ad spend and zero cold outreach.
**Constraint honoured:** Inbound only. "Customers with a real need find it." No cold-calling, no door-to-door.

---

## 1. STRATEGY IN ONE LINE

**Own the search phrase "how do I invoice with a tax number in South Africa" and the variants around it — because real SA freelancers are already typing that, today, into Facebook groups and Google.**

---

## 2. EVIDENCE THAT DEMAND EXISTS (not assumption)

### 2.1 People are already asking, in public, in SA-specific communities
- **"Freelance South Africa"** Facebook group — members post: *"How to handle client request for invoice with tax number as a freelancer?"* ([source](https://www.facebook.com/groups/freelancesouthafrica/posts/2952691881560933/)) and *"What are the tax implications and requirements for a freelancer in South Africa?"* ([source](https://www.facebook.com/groups/freelancesouthafrica/posts/2872337856263003/)). Group purpose: "a platform to share tips, information and advice for freelancers." ([group](https://www.facebook.com/groups/freelancesouthafrica/))
- **"Tax Forum SA"** Facebook group — a freelancer posts needing to "invoice with a tax number" ([source](https://www.facebook.com/groups/taxforumsa/posts/9516658225096487/)); sole proprietors ask about provisional tax ([source](https://www.facebook.com/groups/taxforumsa/posts/9175345292561117/)).
- **r/PersonalFinanceZA** (Reddit) — active sole-proprietor-vs-Pty-Ltd discussions with invoicing/CIPC/SARS detail ([source](https://www.reddit.com/r/PersonalFinanceZA/comments/17sfbdw/sole_proprietor_or_pty_ltd/)).

These are **verbatim expressions of the exact problem Phepha solves.** That is the strongest possible demand signal.

### 2.2 Competitors have built SA-localised landing pages — proving commercial search demand
- **QuickBooks South Africa** runs a dedicated "Free Invoice Generator" ZA page ([source](https://quickbooks.intuit.com/za/invoicing-software/invoice-generator/)). QuickBooks only builds country-localised landing pages where there's monetisable search traffic.
- **Xero ZA** and **Inv24.co.za** run SA-localised invoice template pages.
- SEO case studies describe "invoice template" as a mega-keyword driving tens of thousands of monthly visits globally.

> **Inference (labelled):** Precise SA monthly search-volume numbers sit behind paid tools (Google Keyword Planner / Ahrefs / Semrush) and could not be fetched in this run. The existence of multiple SA-localised commercial landing pages is strong indirect evidence of demand, but **before spending on anything, run the free Google Trends comparison (geography: South Africa) for "invoice template", "tax invoice", "free invoice generator"** to confirm relative interest.

---

## 3. THE THREE INBOUND CHANNELS (ranked by effort:reward)

### Channel A — Content / SEO (primary, compounds, free) ★★★★★
**The core play.** Write the definitive, genuinely useful answers to the questions SA freelancers are already asking. Each article targets one high-intent search and funnels to the free generator.

**Priority articles (titles map to real search intent):**
1. *"How to invoice with a tax number in South Africa"* — directly answers the Tax Forum SA question. (Use the verified SARS Section 20 field list.)
2. *"What must be on a SARS tax invoice? (The 9 mandatory fields)"* — evergreen, high-authority.
3. *"Free SARS-compliant invoice template South Africa (PDF + generator)"* — captures the template hunters; the generator IS the payoff.
4. *"Invoice vs tax invoice vs quote — what's the difference in SA?"*
5. *"Do I need to charge VAT? The R1m (now R2.3m) threshold explained"* — uses the verified threshold change.
6. *"Sole proprietor vs Pty Ltd for invoicing — which do I need?"* — answers the r/PersonalFinanceZA thread.
7. *"Best invoicing option for SA freelancers 2026 (compared)"* — includes Phepha + the honest comparison table.

**Why it works for a solo operator:** Each article is a one-time ~2-hour write that ranks forever and requires zero ongoing maintenance. Compounding asset. No per-customer cost.

**SEO mechanics (no paid tools required):**
- Target the long-tail first ("SARS tax invoice template", not "invoice") — lower competition, higher intent.
- Internal-link every article to the generator with anchor text like "make your tax invoice free".
- Structure each article with the question as an H2 and a direct 40-word answer immediately under it (featured-snippet bait).

### Channel B — Community value-drop (free, fast, builds trust) ★★★★
**The fastest path to first 10 customers.** The founder is NOT cold-calling — but *answering an already-asked public question with a genuinely useful reply that happens to mention the tool* is inbound, not outbound. The person asked first.

**How (ethical, non-spammy):**
- Monitor the SA groups above for invoicing questions.
- Reply with a *real answer first* (the 9 Section 20 fields, the VAT threshold), THEN: "I actually built a free tool that does this automatically — phepha.co.za."
- Rule: the answer must be valuable standalone. The tool mention is a bonus, not the point. This is why it won't get flagged as spam.

**Why it converts:** You're intercepting someone at the exact moment of pain ("I need to invoice a client tomorrow and don't know what's required"). That's the highest-intent customer in the world.

### Channel C — Product-led virality / referral (free, passive) ★★★
Every free invoice carries a discreet footer: *"Made with Phepha — free SARS-compliant invoices."* Every PDF a sole trader sends to a client is seen by another business. A percentage click through. Zero effort, compounding.

**Referral mechanic (Phase 2):** "Refer 3 sole traders, get Pro free." Automated via a referral code in localStorage. Low priority for launch.

---

## 4. THE AUTOMATED CUSTOMER JOURNEY (zero manual intervention)

```
1. DISCOVER    Google search / blog article / FB-group reply  →  phepha.co.za
       ↓  (no human touch)
2. LAND        Landing page explains the gap; clear "free" + "R299 once" framing
       ↓
3. TRY         Free generator works instantly, no signup, no email gate
       ↓  (data stays in their browser — trust + speed)
4. VALUE       They download a real compliant PDF. Trust established.
       ↓
5. UPSell      They see the Pro upsell (PayFast link, branding). Real ROI shown.
       ↓  (no human touch)
6. PAY         Click "Get Pro R299" → PayFast checkout (Instant EFT/card, ~2% fee)
       ↓  (PayFast ITN webhook unlocks Pro — automated)
7. UNLOCK      Pro features activate in their browser instantly
       ↓
8. RETAIN      Footer on every invoice markets to their clients (Channel C)
```

**Founder time per customer: 0 minutes.** The only recurring work is writing content (Channel A), which the founder does once per article and which compounds.

---

## 5. PRICING-GATE IMPLEMENTATION (when deployed)

For the local preview, Pro unlock is simulated via a confirm dialog. **On deployment**, the real flow is:

1. Customer clicks "Get Pro — R299" → a PayFast "Pay Now" form POSTs to `https://www.payfast.co.za/eng/process` with `merchant_id`, `amount=299.00`, `item_name=Phepha Pro`.
2. PayFast hosts the checkout (Instant EFT / card / EFT). **No server needed for the payment itself.**
3. PayFast sends an **ITN (Instant Transaction Notification)** webhook to a `notify_url` on success.
4. *This is the one piece that needs a tiny server or serverless function* (Vercel/Netlify free tier): receive the ITN, verify the signature, and issue a signed unlock token.
5. Token stored in customer's browser → Pro unlocked.

**Decision logged:** For true zero-backend, a fallback is the PayFast **self-service "Payment Request" link** (generated in the dashboard, no code) + manual email of an unlock code. This keeps it 100% serverless but adds ~30 seconds of manual work per sale. Acceptable for first 50 sales; automate the ITN path once volume justifies it.

---

## 6. PATH TO FIRST 100 CUSTOMERS (realistic timeline)

| Milestone | Customers | Revenue | Primary channel | Time |
|---|---|---|---|---|
| **0–10** | 10 | R2,990 | Community value-drops (Channel B) — answer real questions in SA groups | Weeks 1–3 |
| **10–30** | 30 | R8,970 | + first 3 SEO articles ranking | Months 1–2 |
| **30–60** | 60 | R17,940 | SEO compounding + product-led footer (Channel C) kicks in | Months 2–4 |
| **60–100** | 100 | R29,900 | SEO library of 7+ articles; referral mechanic live | Months 4–6 |

**Assumptions (labelled):** Conversion rate from visitor-to-paid is inferred at ~1–2% (typical freemium SaaS range). At 1.5%, reaching 100 paid customers requires ~6,600 qualified visitors — achievable over ~6 months of compounding SEO for a low-competition SA-localised niche. These are estimates, not verified figures.

---

## 7. AUTOMATION STACK (keeps a solo founder solo)

| Function | Tool | Cost | Automation level |
|---|---|---|---|
| Hosting | Netlify/Vercel free tier | R0 | Auto-deploy from git push |
| Payment | PayFast | R0/mo + ~2% per sale | Fully automated |
| Pro unlock | PayFast ITN → serverless function | R0 (free tier) | Fully automated |
| Analytics | Plausible/Umami free tier or GA4 | R0 | Passive |
| Content publishing | Static site, git-based | R0 | Manual write, auto-publish |
| Customer support | Email (founder) | R0 | Minimal — product is self-explanatory |
| Email capture (Phase 2) | Buttondown / Mailchimp free tier | R0 | Automated |

**Total monthly fixed cost to run the business: R0.** Marginal cost per sale: ~R6 (PayFast fee on R299). Founder's recurring time: ~2–4 hrs/week writing content.

---

## 8. WHAT NOT TO DO (guardrails for the solo operator)

- ❌ **Don't run paid ads at launch.** Zero-cost acquisition is the whole model. Ads add complexity, tracking, and a CAC to optimise. Only consider once organic is proven.
- ❌ **Don't cold-DM.** Violates the founder's explicit constraint and burns trust in small SA communities.
- ❌ **Don't over-build.** The product is done. Resist adding features; spend the time on content.
- ❌ **Don't claim to be a lawyer/accountant.** "Compliant documents, not advice" — always.

---

## 9. HONEST RISKS TO THIS GTM

| Risk | Likelihood | Mitigation |
|---|---|---|
| SEO takes longer than 6 months to rank | Medium | Channel B (community) generates first revenue while SEO compounds — don't depend on SEO alone |
| Competitors (QuickBooks/Xero) outrank us on brand terms | High (expected) | Win long-tail + community, not head terms. Our wedge (compliant + PayFast + one-time) isn't what they sell. |
| Conversion rate below 1% | Low-Medium | The free tier still builds brand + footer virality even if paid conversion is slow |
| SA-specific search volume turns out small | Low (given competitor presence) | Validate free with Google Trends in week 1 before investing in 7 articles |

---

## 10. WEEK-1 ACTION CHECKLIST (what to actually do first)

1. ☐ Deploy to Netlify free tier (drag-and-drop the `app/` folder — zero config)
2. ☐ Buy `phepha.co.za` (~R100/year — the only required spend; outside the build guardrail, flagged for founder)
3. ☐ Register a free PayFast account; get merchant ID; wire the real "Get Pro" button
4. ☐ Run the free Google Trends check (ZA, last 12 months) for the 3 keywords — confirm before writing 7 articles
5. ☐ Join "Freelance South Africa" and "Tax Forum SA" Facebook groups; lurk, then answer 2 real questions with genuine value
6. ☐ Write article #1: *"How to invoice with a tax number in South Africa"* — publish on the site
7. ☐ Add the site to Google Search Console (free) to monitor inbound queries
