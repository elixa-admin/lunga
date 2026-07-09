# LUNGA — Deployment Guide

**Time required:** ~2 hours total (spread across domain verification wait time)
**Total cost:** ~R75 (domain only)

---

## STEP 1: Register your domain (10 min)

1. Go to [domains.co.za](https://www.domains.co.za/domain-registration) or [afrihost.com](https://www.afrihost.com/domain-names)
2. Search: `lunga.co.za`
3. If available → register (~R75/year). If taken → try `lunga.app` or `uselunga.co.za`
4. Complete checkout with your details
5. You'll receive a domain management email within ~30 minutes

---

## STEP 2: Deploy the site to Cloudflare Pages (15 min, free)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → sign up (free)
2. Click "Create a project" → "Upload assets"
3. Drag the entire `app/` folder from this project into the upload area
4. Name the project: `lunga`
5. Click "Deploy"
6. You now have a live site at `lunga.pages.dev`

### Connect your custom domain:
7. In Cloudflare Pages → "Custom domains" → "Set up a custom domain"
8. Enter: `lunga.co.za`
9. Cloudflare will give you DNS records to add → go to your domain registrar (domains.co.za / Afrihost)
10. In your domain control panel → DNS settings → add:
    - **CNAME record:** `www` → `lunga.pages.dev`
    - **A record:** `@` → Cloudflare's Pages IP (shown in the dashboard)
11. Wait ~15 minutes for DNS propagation → site is live at `lunga.co.za`

---

## STEP 3: Register PayFast (15 min + 1 day verification)

1. Go to [payfast.io](https://payfast.io) → "Sign Up"
2. Select "Business" account
3. Fill in your business details (use your domain name)
4. Submit for verification (~1 business day)
5. Once approved → go to **Settings → Integration**
6. Copy your:
    - **Merchant ID** (e.g., `12345678`)
    - **Merchant Key** (e.g., `abcdef123456`)
7. Set a **Passphrase** (Settings → Security → Passphrase) — any secure string
8. Note these three values — you'll need them in Step 4

---

## STEP 4: Deploy the backend to Cloudflare Workers (15 min, free)

1. Install Node.js on your computer (if not already): [nodejs.org](https://nodejs.org)
2. Open terminal:
   ```bash
   cd projects/phepha/backend
   npm install
   npx wrangler login    # Opens browser to authenticate
   ```

3. Create the KV storage:
   ```bash
   npx wrangler kv:namespace create LUNGA_KV
   ```
   Copy the `id` it returns → paste into `wrangler.toml` (replace `your-kv-namespace-id-here`)

4. Set your PayFast secrets:
   ```bash
   npx wrangler secret put PAYFAST_MERCHANT_ID
   # Paste your merchant ID, press Enter

   npx wrangler secret put PAYFAST_MERCHANT_KEY
   # Paste your merchant key, press Enter

   npx wrangler secret put PAYFAST_PASSPHRASE
   # Paste your passphrase, press Enter

   npx wrangler secret put UNLOCK_SECRET
   # Type a random string (e.g., use: openssl rand -hex 32)
   
   npx wrangler secret put ITN_URL
   # Type: https://lunga.co.za/api/itn
   ```

5. Deploy:
   ```bash
   npx wrangler deploy
   ```
   Your backend is now live at `lunga-backend.your-subdomain.workers.dev`

6. In Cloudflare Pages → Settings → Environment variables → add:
   - `WORKER_URL` = `https://lunga-backend.your-subdomain.workers.dev`

7. In PayFast → Settings → Integration → set **Notify URL** to:
   ```
   https://lunga-backend.your-subdomain.workers.dev/api/itn
   ```

---

## STEP 5: Wire the frontend to the real backend (10 min)

In `app/app.html`, find the `simulatePay()` function and replace it with:

```javascript
async function simulatePay(){
  const plan = document.querySelector('.plan-opt.sel')?.dataset.plan || 'annual';
  const reference = 'lunga-' + Date.now();
  
  // Call backend to generate PayFast checkout
  const res = await fetch(WORKER_URL + '/api/generate-checkout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({plan, reference})
  });
  const {url, params} = await res.json();
  
  // Build and submit the PayFast form (redirects to PayFast checkout)
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  Object.entries(params).forEach(([k,v]) => {
    const input = document.createElement('input');
    input.type = 'hidden'; input.name = k; input.value = v;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}
```

Add this at the top of the `<script>`:
```javascript
const WORKER_URL = 'https://lunga-backend.your-subdomain.workers.dev'; // your Cloudflare Worker URL
```

---

## STEP 6: Submit to Google (5 min, free)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → `lunga.co.za`
3. Verify (DNS TXT record — Cloudflare Pages dashboard shows you how)
4. Submit sitemap → `https://lunga.co.za/sitemap.xml`
5. Done. Google will index within 1-3 days.

---

## STEP 7: Set up marketing automation (30 min, free)

1. **Email capture:** Create a free [Buttondown](https://buttondown.email) account → add the lead-capture form (from `marketing/AUTOMATION_PACK.md`) to the landing page footer
2. **Google Alerts:** Go to [google.com/alerts](https://google.com/alerts) → set up the 6 alert queries from the automation pack
3. **Directory submissions:** Spend 2 hours one Saturday submitting to the 15 directories listed in `marketing/AUTOMATION_PACK.md`

---

## STEP 8: Write your first SEO article (2 hours)

Create `app/blog/best-invoicing-software-south-africa.html` with:
- Title: "Best Invoicing Software South Africa 2026"
- 1,500 words comparing the options (including Lunga)
- Internal links to the generator
- Push to Cloudflare → auto-deploys

---

## POST-LAUNCH CHECKLIST

| # | Item | Done |
|---|---|---|
| 1 | Domain registered and DNS resolving | ☐ |
| 2 | Site live at lunga.co.za | ☐ |
| 3 | PayFast account verified | ☐ |
| 4 | Backend deployed and ITN endpoint responding | ☐ |
| 5 | Test payment: make a R1 test payment through PayFast sandbox | ☐ |
| 6 | Google Search Console verified + sitemap submitted | ☐ |
| 7 | First community post (r/PersonalFinanceZA or FB group) | ☐ |
| 8 | First directory submission (Google Business Profile) | ☐ |
| 9 | First SEO article published | ☐ |
| 10 | Google Alerts set up | ☐ |

**You are now live and generating inbound leads.**

---

## TROUBLESHOOTING

| Problem | Fix |
|---|---|
| Site not loading | DNS propagation can take 1-24 hours. Check at whatsmydns.net |
| PayFast ITN not arriving | Check the notify URL is correct and publicly accessible |
| Payment works but unlock doesn't | Check the ITN handler logs in Cloudflare Workers dashboard |
| PDF not downloading | Ensure jsPDF is loading (check browser console for errors) |
| Trial not expiring | Check browser timezone — trial uses UTC midnight |
