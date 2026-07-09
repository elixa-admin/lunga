# LUNGA — Go-To-Market v2

**Version:** 2.0 · **Date:** 2026-07-09 · **Status:** Internal (not public)
**Goal:** Fastest route to first 100 paying customers (≈R100,000 ARR), lowest cost, maximum automation. Founder time: ≤3 hrs/week.

---

## 0. WHAT CHANGED FROM v1

v1 was sound but slow (6-month SEO compounding). v2 compresses the timeline by leading with **the fastest channel first** (community interception) while the slow channel (SEO) builds underneath, and by automating the content engine so the founder isn't the bottleneck. Pricing is now **R99/mo annual (R1,188/yr) / R129/mo monthly** (see PRICING_ANALYSIS.md).

---

## 1. THE THREE-CHANNEL STACK (ranked by speed-to-first-revenue)

| Channel | Speed to first R | Cost | Founder time | Automation |
|---|---|---|---|---|
| **A. Community interception** | Days | R0 | Low | Semi (alerting) |
| **B. SA directories + listings** | 1–2 weeks | R0 | One-time, low | Manual submit |
| **C. AI-automated content/SEO** | 8–16 weeks | R0 infra | Setup only | Fully automated |

Run all three concurrently. A funds the wait for C.

---

## 2. CHANNEL A — COMMUNITY INTERCEPTION (fastest)

**Why first:** The fastest money is intercepting someone at the *moment* of pain. Research already confirmed SA freelancers post the exact problem Lunga solves, in public, today.

**Where (verified to exist):**
- "Tax Forum SA" Facebook group — a freelancer literally asked ["how to invoice with a tax number"](https://www.facebook.com/groups/taxforumsa/posts/9516658225096487/)
- "Freelance South Africa" group — ["how to handle a client request for an invoice with a tax number"](https://www.facebook.com/groups/freelancesouthafrica/posts/2952691881560933/)
- r/PersonalFinanceZA — [sole-proprietor invoicing discussions](https://www.reddit.com/r/PersonalFinanceZA/comments/17sfbdw/sole_proprietor_or_pty_ltd/)

**The rule (this is inbound, not spam):** Reply with a *genuinely useful answer first* (name the 9 Section 20 fields, the VAT threshold), then: "I built a free tool that does this automatically — lunga.co.za." The answer must be valuable standalone. One mention, never repeated in the same group.

**Automation (low-code, R0):** Set a free **Google Alert** + **Facebook group notification** for: *"invoice" "tax number" "South Africa"*, *"SARS tax invoice" "freelancer"*, *"how do I invoice"*. These surface the interception opportunities to you in ≤1 hour of them being posted. Founder time: ~20 min/day scanning, replying.

**Realistic yield:** First 5–15 customers in weeks 1–3. High-intent, high-conversion.

---

## 3. CHANNEL B — SA DIRECTORY SUBMISSIONS (one-time, compounds)

**Why:** Free, permanent, low-effort SEO backlinks from SA-local domains. Boosts Channel C.

**Verified free SA directories:** 42 listed at [nichemarket](https://www.nichemarket.co.za/blog/nichemarket-advice/list-south-african-business-directory); 100+ high-DA ZA listings catalogued (4 SEO Help 2026 list). Plus the essentials: Google Business Profile, Bing Places.

**Action (one weekend, ~3 hours):** Submit Lunga to the top ~15 SA directories. One-time. Then forget it.

**Automation:** None needed — one-time manual submit. Optionally use [BrightLocal](https://www.brightlocal.com/citation-builder/business-listings/) (~$2/site) to scale, but free manual covers the high-value ones.

---

## 4. CHANNEL C — THE AI-AUTOMATED CONTENT ENGINE (the long-term moat)

This is where "I don't have time to babysit" is solved. The goal: an autonomous pipeline that researches, drafts, and publishes SEO content with the founder only reviewing/approving.

### 4.1 The pipeline (n8n/Make + LLM, all free tiers)

```
[Trigger: weekly schedule]
   ↓
[Node 1: Keyword monitor] — Google Search Console "new queries" + free keyword tools
   ↓
[Node 2: Research] — Tavily API (key already in .env) fetches top-ranking pages + SARS sources
   ↓
[Node 3: Draft] — Claude/LLM writes a 1,200-word article grounded ONLY in fetched sources
   ↓
[Node 4: Fact-check gate] — LLM re-reads draft vs sources; flags any un-sourced claim
   ↓
[Node 5: Human review] — Slack/email: "Draft ready: [title]. Approve / edit / reject."
   ↓  (founder: ≤10 min/article, approve-only)
[Node 6: Publish] — pushes Markdown to the static site, auto-deploys
```

**Tooling (verified free/available):**
- Orchestrator: **n8n** (self-host free / n8n.cloud free tier) or **Make.com** (1,000 ops/mo free) — [n8n workflow templates](https://n8n.io/workflows), [Make templates](https://www.make.com/en/templates)
- Research: **Tavily** (key already in our .env — fair game)
- Draft + fact-check: the LLM already in use
- Publish: static-site git push → Netlify/Vercel auto-deploy (R0)
- Reference architecture: ["Automate SEO content without a marketing team (2026)"](https://planetarylabour.com/articles/automate-seo-content)

### 4.2 Why this isn't "AI slop"
The pipeline's value is the **fact-check gate (Node 4)**: every claim must trace to a fetched URL (the same evidence standard we used for this build). A compliance product cannot publish invented stats. If the gate flags an un-sourced claim, it goes to human review. This is the difference between automated content and trustworthy content.

### 4.3 Priority article queue (maps to verified search intent)
1. *"How to invoice with a tax number in South Africa"* — answers the Tax Forum SA verbatim question
2. *"What must be on a SARS tax invoice? The 9 mandatory fields"* — evergreen authority piece
3. *"Free SARS-compliant invoice template South Africa"* — the generator IS the payoff
4. *"Invoice vs tax invoice vs quote — what's the difference?"*
5. *"Do I need to charge VAT? The threshold explained"* (R1m → R2.3m from 1 Apr 2026)
6. *"Sole proprietor vs Pty Ltd for invoicing"*
7. *"Best invoicing option for SA freelancers 2026"* — includes the honest comparison table

**Cadence:** 1 article/week, fully drafted by the pipeline, ≤10 min founder review. After 12 weeks = 12 evergreen assets compounding forever.

---

## 5. THE FULLY-AUTOMATED CUSTOMER JOURNEY (zero manual touch)

```
DISCOVER   →  Google search / article / FB-group reply  →  lunga.co.za
LAND       →  Landing page; clear "R99/mo, 14-day free trial"
TRIAL      →  App opens, no card; full features; 14-day timer (localStorage)
VALUE      →  Real compliant PDF in 2 min; trust established
PAY        →  Trial ends → modal → PayFast checkout (R1,188/yr or R129/mo)
UNLOCK     →  PayFast ITN webhook → serverless fn → subscription active
RETAIN     →  Every invoice footer markets to the client's clients (viral)
```

**Founder time per customer: 0 minutes.** Recurring founder time: only content approval (≤10 min/wk) + community scanning (~20 min/day, optional).

---

## 6. REALISTIC TIMELINE TO R100,000 ARR

| Phase | Customers | ARR | Channel | Time |
|---|---|---|---|---|
| **0–15** | 15 | ~R18,000 | A (community) | Weeks 1–4 |
| **15–40** | 40 | ~R47,000 | A + B (directories) | Months 1–3 |
| **40–100** | 100 | ~R100,000+ | A + B + C (SEO compounding) | Months 3–6 |

*(Inference: ~1.5% visitor→paid conversion; ARR assumes annual-plan-weighted ARPU ≈R1,000. Validate with real data post-launch.)*

---

## 7. AUTOMATION STACK (total monthly fixed cost: R0)

| Function | Tool | Cost |
|---|---|---|
| Hosting | Netlify/Vercel free tier | R0 |
| Payment + subscriptions | PayFast (tokenisation) | R0/mo + ~2–3.5% per sale |
| Pro unlock webhook | Serverless fn (free tier) | R0 |
| Analytics | Plausible self-host / GA4 | R0 |
| Content engine | n8n/Make + Tavily + LLM | R0 (free tiers) |
| Community alerts | Google Alerts | R0 |
| Email capture (Phase 2) | Buttondown free tier | R0 |
| Support | Email (founder) | R0 |

---

## 8. WHAT NOT TO DO
- ❌ Paid ads at launch (zero-cost acquisition is the model; adds CAC complexity)
- ❌ Cold DMs (violates the inbound principle; burns trust in small communities)
- ❌ Publishing AI content without the fact-check gate (a compliance brand dies on one invented stat)
- ❌ Over-building features (product is done; spend time on content)

---

## 9. WEEK-1 ACTION CHECKLIST
1. ☐ Deploy to Netlify; point lunga.co.za
2. ☐ Register PayFast; get merchant ID; wire real "Continue to PayFast" + ITN webhook
3. ☐ Set Google Alerts for the 3 interception queries; join the 2 FB groups (lurk first)
4. ☐ Submit to top 15 SA directories (one weekend)
5. ☐ Build the n8n content pipeline (Nodes 1–6); queue article #1
6. ☐ Add GA4 + Google Search Console (free)

---

## SOURCES (fetched 2026-07-09)
- Community demand: https://www.facebook.com/groups/taxforumsa/posts/9516658225096487/ ; https://www.facebook.com/groups/freelancesouthafrica/posts/2952691881560933/ ; https://www.reddit.com/r/PersonalFinanceZA/comments/17sfbdw/
- SA directories: https://www.nichemarket.co.za/blog/nichemarket-advice/list-south-african-business-directory
- AI content automation: https://planetarylabour.com/articles/automate-seo-content ; https://n8n.io/workflows ; https://www.make.com/en/templates
- BrightLocal citations: https://www.brightlocal.com/citation-builder/business-listings/
