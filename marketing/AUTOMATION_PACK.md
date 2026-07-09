# LUNGA — Marketing Automation Pack

**Goal:** Fastest path to first 100 paying customers, minimal founder time.

---

## 1. LEAD CAPTURE (automated, on the site)

Add this to the landing page footer — a simple email capture that costs nothing:

```html
<!-- Add before the footer closing </div> -->
<div class="lead-capture" style="text-align:center;padding:var(--s5) 0;">
  <p style="color:#A89E8E;font-size:14px;margin-bottom:12px;">Get notified when we launch new features</p>
  <form action="https://buttondown.email/api/emails/embed-subscribe/lunga" method="post" target="popupwindow" 
        onsubmit="window.open('https://buttondown.email/lunga', 'popupwindow'); return true;"
        style="display:flex;gap:8px;max-width:320px;margin:0 auto;">
    <input type="email" name="email" placeholder="you@example.co.za" 
           style="flex:1;padding:10px 14px;border:1px solid #3A342C;border-radius:6px;background:#1A1A0E;color:#fff;font-size:14px;" required>
    <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
  </form>
</div>
```

**Service:** [Buttondown](https://buttondown.email) — free up to 100 subscribers, no branding, simple API.

---

## 2. EMAIL SEQUENCE (auto-sent on trial signup)

| Day | Subject | Content |
|---|---|---|
| **Day 1** | Welcome to Lunga | "You're on Day 1 of 14. Here's how to create your first invoice in 2 minutes." + link to app |
| **Day 5** | Did you know? | "Lunga handles all 9 Section 20 fields automatically. Here's what that means for your next audit." |
| **Day 10** | You're almost there | "4 days left on your trial. Here's what you get when you subscribe — and the R360 you save by choosing annual." |
| **Day 13** | Last day tomorrow | "Tomorrow your trial ends. Don't lose your saved invoices — subscribe now from R99/month." |
| **Day 14** | Trial ended | "Your trial has ended. Click here to reactivate and keep your data." |

**Tool:** Buttondown free tier (automated sequences from R0).

---

## 3. COMMUNITY TEMPLATES (copy-paste, for inbound interception)

### Template A: r/PersonalFinanceZA / Facebook groups

> **Title:** Free SARS-compliant invoice generator for SA freelancers
>
> Hey — I kept getting asked by clients for a "tax invoice with a VAT number" and realised most free invoice tools don't actually include the mandatory Section 20 fields. So I built [Lunga](https://lunga.co.za) — it auto-includes all 9 required fields, calculates 15% VAT, and adds a PayFast/EFT/card payment link so you get paid faster.
>
> It's R99/month (or R129 month-to-month) with a 14-day free trial, no card. Everything stays in your browser — no server, no signup wall.
>
> Happy to answer any questions.

### Template B: Answering "what invoicing software do you use?" threads

> I use [Lunga](https://lunga.co.za) — built specifically for SA sole traders. The key thing for me is it auto-includes all 9 Section 20 fields (the words "Tax Invoice", both VAT numbers, the 15% split, etc.), so I don't have to worry about whether my invoice would pass a SARS audit. It also generates a PayFast payment link on each invoice, so my clients pay by EFT or card without me chasing.
>
> R99/month for the annual plan. No accounting software bloat.

### Template C: Twitter/X post

> Built a thing: tax-compliant invoices with PayFast built in, for SA sole traders.
> Quote → Invoice → Get paid — immediately.
> 14-day free trial, no card.
> 🇿🇦 lunga.co.za

---

## 4. DIRECTORY SUBMISSION LIST (one weekend, R0)

Submit to each of these (free, permanent SEO backlinks):

| # | Directory | URL |
|---|---|---|
| 1 | Google Business Profile | google.com/business |
| 2 |nichemarket | nichemarket.co.za |
| 3 | Brabys | brabys.com |
| 4 | Yellow Pages ZA | yellowpages.co.za |
| 5 | ZA Local Search | zalocalsearch.co.za |
| 6 | SA Business Direct | sabusinessdirect.co.za |
| 7 | Entrepedia ZA | entrepedia.co.za |
| 8 | ZA Online Directory | zaonlinedirectory.co.za |
| 9 | SA Services | saservices.co.za |
| 10 | Ananzi | ananzi.co.za |
| 11 | ZA Directory | zadirectory.co.za |
| 12 | Hotfrog ZA | hotfrog.co.za |
| 13 | Cylex ZA | cylex.co.za |
| 14 | Tupalo ZA | tupalo.co.za |
| 15 | BizNis Africa | biznisafrica.com |

**For each:** Business name = "Lunga", category = "Software / Business Services", URL = lunga.co.za, description = "Tax-compliant invoicing with integrated payments for sole traders."

---

## 5. GOOGLE ALERTS (set once, passive monitoring)

Set up at [google.com/alerts](https://google.com/alerts):

| Alert query | Purpose |
|---|---|
| `"invoice software" "South Africa"` | Catch SA-specific invoicing questions |
| `"SARS" "invoice" "freelancer"` | Catch compliance questions |
| `"how do I invoice" "South Africa"` | Catch how-to searches |
| `"tax invoice" "template"` | Catch template hunters |
| `site:reddit.com "invoicing" "South Africa"` | Catch Reddit threads |
| `site:facebook.com "invoice" "freelancer" "South Africa"` | Catch FB group posts |

When an alert fires: use Template A or B above to answer genuinely + mention Lunga.

---

## 6. CONTENT PUBLICATION SCHEDULE

| Week | Article | Keyword target |
|---|---|---|
| 1 | "Best invoicing software South Africa 2026" | best invoicing software South Africa |
| 2 | "SARS compliant invoice: what you need to know" | SARS compliant invoice |
| 3 | "Free invoice template South Africa" | free invoice template South Africa |
| 4 | "Invoice vs quote vs tax invoice" | invoice vs quote |
| 5 | "VAT for sole traders explained" | VAT for sole traders |
| 6 | "Sole proprietor vs Pty Ltd" | sole proprietor vs pty ltd |
| 7 | "How to get paid faster with payment links" | get paid faster invoicing |

**Publishing method:** Add as `blog/[slug].html` in the `app/` folder → deploy via Cloudflare Pages (auto-redeploys on git push). Each article links to the generator with anchor text like "create your tax invoice free."

---

## 7. PAID ADS (Phase 2, only after organic proves)

Only consider once you have ≥50 organic signups and conversion data.

| Platform | Budget | Target | Why |
|---|---|---|---|
| Google Ads | R500/mo | "invoice software South Africa" | Highest intent |
| Facebook Ads | R300/mo | SA freelancers, sole traders | Audience targeting |
| Reddit Ads | R200/mo | r/PersonalFinanceZA | Already proven audience |

**Total Phase 2 ad budget: R1,000/month.** Only spend what organic revenue covers.
