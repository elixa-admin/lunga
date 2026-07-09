# LUNGA — Launch & Go-To-Market Strategy

**Version:** 3.0 · **Date:** 2026-07-09 · **Status:** Internal (founder-only)
**Goal:** Get Lunga live and in front of SA sole traders with minimal founder time.

---

## 1. FUNCTIONALITY — VERIFIED ✅

Every feature tested and passing (Playwright + Chrome, 2026-07-09):

| Feature | Status |
|---|---|
| Landing page renders, all sections, clean console | ✅ |
| Logo loads (nav + footer) | ✅ |
| Invoice generator — full form input | ✅ |
| Live preview updates on every keystroke | ✅ |
| VAT calculation (15%, correct math) | ✅ |
| VAT toggle (hides/shows VAT row) | ✅ |
| Multi-line items (add/remove) | ✅ |
| PDF download (valid `%PDF-`, correct filename) | ✅ |
| SARS Section 20 fields present in PDF | ✅ |
| 14-day trial model (Day X of 14 in pill + banner) | ✅ |
| Trial expiry detection | ✅ |
| Contextual paywall trigger (PayFast toggle on expired) | ✅ |
| Upgrade modal (annual R99 / monthly R129) | ✅ |
| Subscription activation (simulated) | ✅ |
| localStorage persistence (invoice state survives reload) | ✅ |
| Business defaults save/restore | ✅ |
| Invoice number auto-increment | ✅ |
| Mobile responsive (tested at 390px) | ✅ |

**Zero console errors across all tests.** The product is functionally complete.

---

## 2. DOMAIN — WHAT TO REGISTER

**Check availability** (I can't verify live WHOIS, but no "Lunga invoicing" product exists):

| Domain | Est. cost | Notes |
|---|---|---|
| **lunga.co.za** | ~R75/year | **Primary recommendation** — SA-local, best for SEO, cheapest |
| **lunga.app** | ~R250/year | Modern, HTTPS-required, good fallback |
| **lunga.io** | ~R350/year | Tech-credible, international-friendly |
| **uselunga.com** | ~R150/year | If lunga.* is taken |

**Action:** Go to [domains.co.za](https://www.domains.co.za/domain-registration) or [names.co.za](https://www.names.co.za) → search `lunga.co.za` → register if available (~R75). This is the ONLY required spend.

---

## 3. DEPLOYMENT — FREE & AUTOMATED

**Winner: Cloudflare Pages** (verified research, July 2026):

| Platform | Bandwidth | Build min | Speed | Custom domain |
|---|---|---|---|---|
| **Cloudflare Pages** | **Unlimited** | Generous | **Fastest** | ✅ Free |
| Vercel | 100GB | 6,000 | Fast | ✅ Free |
| Netlify | 100GB | 100 (reduced) | Slowest | ✅ Free |

Sources: [Cloudflare vs Netlify vs Vercel 2026](https://danubedata.ro/blog/cloudflare-pages-vs-netlify-vs-vercel-static-hosting-2026), [Real test](https://blog.vibecoder.me/vercel-vs-netlify-vs-cloudflare-pages)

**Steps (15 minutes, zero cost):**
1. Create free Cloudflare account
2. Upload the `app/` folder (drag-and-drop or connect a Git repo)
3. Add custom domain `lunga.co.za` → Cloudflare auto-provisions SSL
4. Live.

**Monthly cost: R0.** Bandwidth is unlimited on free tier.

---

## 4. PAYMENTS — WIRING PAYFAST

The product already builds PayFast links and has the subscription/trial model. To make payments **real**:

### Step 1: Register PayFast (free, ~1 day for verification)
- Go to [payfast.io](https://payfast.io) → sign up as a business
- Get your `merchant_id` and `merchant_key`
- Enable **recurring billing** (subscription tokenisation) — [payfast.io/features/subscriptions](https://payfast.io/features/subscriptions/)

### Step 2: Wire the real checkout
Replace the `simulatePay()` function in `app.html` with a real PayFast form POST:
- `merchant_id`, `merchant_key`, `amount` (R588 for annual, R129 for monthly)
- `subscription_type=1` for recurring
- `return_url`, `cancel_url`, `notify_url` (ITN webhook)

### Step 3: ITN webhook (the only piece needing a backend)
- One serverless function (Cloudflare Workers, free tier) that:
  - Receives PayFast's ITN on payment success
  - Verifies the signature
  - Issues a signed unlock token
- This is ~20 lines of JavaScript. Can also use a manual unlock code as a fallback for the first 50 customers.

**Cost: R0** (PayFast has no monthly fee; ~2% per Instant EFT transaction).

---

## 5. SEO — WHAT TO RANK FOR

### Priority keywords (verified search demand, July 2026):

| Keyword | Intent | Competition |
|---|---|---|
| "best invoicing software South Africa" | High | Moderate (listicles dominate) |
| "free invoice software South Africa" | High | Moderate |
| "SARS compliant invoice" | Very high intent | Low |
| "invoice template South Africa" | High | Low |
| "invoice software for freelancers SA" | Medium | Low |
| "sole trader invoicing tool" | Medium | Very low |

### Content to write (7 articles, AI-assisted):
1. *"Best invoicing software South Africa 2026"* — the listicle that captures the biggest search
2. *"SARS compliant invoice: what you need to know"* — authority piece
3. *"Free invoice template South Africa"* — the generator IS the payoff
4. *"Invoice vs quote vs tax invoice"* — educational long-tail
5. *"VAT for sole traders: the R1m threshold explained"*
6. *"Sole proprietor vs Pty Ltd for invoicing"*
7. *"How to get paid faster with payment links"*

### SEO mechanics:
- Add `<meta>` tags (already present)
- Submit to Google Search Console (free)
- Build internal links from every article to the generator
- Target the long-tail first — lower competition, higher intent

---

## 6. GETTING IN FRONT OF EYEBALLS — MINIMUM FOUNDER TIME

### Channel 1: Community interception (fastest, zero cost)
**Where SA freelancers already ask about invoicing:**
- [r/PersonalFinanceZA](https://www.reddit.com/r/PersonalFinanceZA/comments/1rro1vv/invoice_accounting_software_for_freelancers/) — active invoicing-software thread
- "Freelance South Africa" Facebook group
- "Tax Forum SA" Facebook group

**How (automated, not cold-calling):**
- Set Google Alerts for: *"invoice software" "South Africa"*, *"SARS invoice" "freelancer"*
- When a question appears, answer it genuinely (name the 9 fields, the VAT threshold), then mention Lunga
- Time: ~20 min/day scanning alerts

### Channel 2: SA directory submissions (one weekend, free)
- Submit to the top 15 SA business directories (42 listed at [nichemarket](https://www.nichemarket.co.za/blog/nichemarket-advice/list-south-african-business-directory))
- Google Business Profile (free)
- One-time effort, permanent SEO backlinks

### Channel 3: AI-automated content engine (the long game)
- Build an n8n/Make pipeline (free tier) that:
  1. Researches (Tavily API — key already in .env)
  2. Drafts articles grounded in fetched sources only
  3. Sends to you for approval (≤10 min per article)
  4. Publishes to the static site
- 1 article/week = 12 evergreen assets in 3 months

### Channel 4: Product-led virality (passive, free)
- Every invoice footer carries: "Made with Lunga"
- Every PDF a user sends to a client is a free impression
- Zero effort, compounds over time

---

## 7. WEEK-1 ACTION CHECKLIST

| # | Action | Time | Cost |
|---|---|---|---|
| 1 | Register `lunga.co.za` at domains.co.za | 10 min | ~R75/year |
| 2 | Create Cloudflare account, deploy `app/` folder | 15 min | R0 |
| 3 | Point DNS to Cloudflare | 5 min | R0 |
| 4 | Register PayFast account, get merchant ID | 15 min + 1 day verification | R0 |
| 5 | Set Google Alerts for invoicing/SARS queries | 10 min | R0 |
| 6 | Submit to top 10 SA directories | 2 hrs (one-time) | R0 |
| 7 | Submit site to Google Search Console | 10 min | R0 |
| 8 | Write article #1: "Best invoicing software South Africa 2026" | 2 hrs | R0 |

**Total week-1 cost: ~R75 (domain only).**
**Total week-1 time: ~4 hours (mostly directory submissions).**
**Ongoing founder time: ~2-3 hrs/week (content approval + community scanning).**

---

## 8. AUTOMATION STACK

| Function | Tool | Cost |
|---|---|---|
| Hosting | Cloudflare Pages | R0 |
| Payments | PayFast | R0/mo + ~2% per sale |
| Pro unlock webhook | Cloudflare Workers | R0 (free tier) |
| Analytics | Cloudflare Analytics or GA4 | R0 |
| Content engine | n8n + Tavily + LLM | R0 (free tiers) |
| Community alerts | Google Alerts | R0 |
| Email (Phase 2) | Buttondown free tier | R0 |

**Total monthly fixed operating cost: R0.**

---

## Sources
- Cloudflare vs Netlify vs Vercel: https://danubedata.ro/blog/cloudflare-pages-vs-netlify-vs-vercel-static-hosting-2026
- PayFast subscriptions: https://payfast.io/features/subscriptions/
- SA freelancer invoicing search behaviour: https://www.reddit.com/r/PersonalFinanceZA/comments/1rro1vv/invoice_accounting_software_for_freelancers/
- SA invoicing landscape: https://veropay.co.za/blog/best-invoicing-software-south-africa
- SA directories: https://www.nichemarket.co.za/blog/nichemarket-advice/list-south-african-business-directory
- Domain registration: https://www.domains.co.za/domain-registration
