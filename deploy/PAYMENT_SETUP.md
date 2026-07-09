# LUNGA — Payment Integration Setup Guide

**Status:** PayFast integration is BUILT and LIVE (sandbox mode).
**Your next step:** Register at PayFast, get credentials, paste them into one file.

---

## What's already done ✅

1. **PayFast checkout module** (`app/assets/payfast.js`) — generates correctly-signed PayFast checkout forms
2. **Payment success page** (`app/payment-success.html`) — catches the user after PayFast, activates their subscription
3. **Generator wired** — `app.html` now redirects to real PayFast checkout (sandbox mode)
4. **Verified on live site** — signature generation, form building, subscription activation all confirmed working at [elixa-admin.github.io/lunga](https://elixa-admin.github.io/lunga/)

The site is currently running in **sandbox mode** (PayFast's test credentials). Users can go through the entire payment flow in the sandbox — no real money moves. When you're ready to go live, you switch one line.

---

## What YOU need to do (4 steps, ~30 minutes + 1 day verification)

### Step 1: Register at PayFast (15 min)

1. Go to [payfast.io](https://payfast.io) → click **Sign Up**
2. Select **Business** account type
3. Fill in:
   - Business name: **Lunga** (or your registered business name)
   - Website: `https://elixa-admin.github.io/lunga/` (or your future domain)
   - Business description: "Tax-compliant invoicing software for sole traders"
   - Your ID document and proof of address (standard FICA)
4. Submit for verification — PayFast reviews within **1 business day**

### Step 2: Get your credentials (2 min, after approval)

1. Log in to your PayFast dashboard
2. Go to **Settings → Integration**
3. Copy these three values:

```
Merchant ID:  _________ (e.g., 12345678)
Merchant Key: _________ (e.g., abcdef123456)
```

4. Go to **Settings → Security → Passphrase**
5. Set a passphrase (any secure string — write it down):
```
Passphrase:    _________ (e.g., Lunga2026Secure!)
```

### Step 3: Paste credentials into payfast.js (2 min)

Open `app/assets/payfast.js` in any text editor. Find the config block at the top (lines 14-20):

```javascript
const PAYFAST_CONFIG = {
  mode: 'sandbox',           // ← CHANGE TO: 'live'
  
  merchant_id: '10000100',   // ← REPLACE with your Merchant ID
  merchant_key: '46f0cd694581a', // ← REPLACE with your Merchant Key
  passphrase: '',            // ← ADD your passphrase
  
  return_url: ...,           // leave as-is (auto-detects)
  cancel_url: ...,           // leave as-is
  notify_url: '',            // ← ADD after worker deploy (Step 4 below)
};
```

Save the file. That's it — you're live with real payments.

### Step 4 (optional but recommended): Deploy the ITN webhook

The ITN webhook is how PayFast *confirms* the payment on their end. Without it, the payment still works — the user still gets redirected to the success page — but you won't have a server-side record.

To deploy the webhook (free, Cloudflare Workers):

```bash
cd projects/phepha/backend
npm install
npx wrangler login          # browser opens, create free account
npx wrangler kv:namespace create LUNGA_KV   # creates storage
# Copy the ID it returns, paste into wrangler.toml

npx wrangler secret put PAYFAST_MERCHANT_ID    # paste your ID
npx wrangler secret put PAYFAST_MERCHANT_KEY   # paste your key  
npx wrangler secret put PAYFAST_PASSPHRASE     # paste your passphrase
npx wrangler secret put UNLOCK_SECRET          # type a random string

npx wrangler deploy
# Note the URL it gives you, e.g., https://lunga-backend.xxx.workers.dev
```

Then paste that URL + `/api/itn` into:
1. `payfast.js` → `notify_url: 'https://lunga-backend.xxx.workers.dev/api/itn'`
2. PayFast dashboard → Settings → Integration → **Notify URL**

### Step 5: Set up recurring billing (enables subscriptions)

In your PayFast dashboard:
1. Go to **Settings → Integration**
2. Enable **Recurring Billing** (subscription tokenisation)
3. This is what allows Lunga to charge R99/month automatically

Per [payfast.io/features/subscriptions](https://payfast.io/features/subscriptions/) — recurring billing is included on all business accounts at no extra cost.

---

## Payment flow — how it works for the user

```
1. User's trial expires → paywall modal appears
2. User picks Annual or Monthly → clicks "Pay now →"
3. Redirected to PayFast's secure hosted checkout page
4. User pays by Instant EFT / card / Zapper
5. PayFast redirects back to lunga/payment-success.html?payment_status=COMPLETE
6. payment-success.html reads the params → activates subscription in localStorage
7. User is now "Active" — all features unlocked
8. (Background) PayFast sends ITN webhook to your Worker → stored for record-keeping
```

**Total time from "Pay now" to "Active": ~30 seconds.**
**Founder involvement: zero (fully automated).**

---

## Testing in sandbox mode (current state)

The site is ALREADY in sandbox mode. You can test the full flow right now:

1. Go to [elixa-admin.github.io/lunga/app.html](https://elixa-admin.github.io/lunga/app.html)
2. Expire the trial (open browser console → run):
   ```javascript
   localStorage.setItem('lunga_sub_v1', JSON.stringify({status:'trial',start:Date.now()-16*86400000}))
   ```
3. Reload the page
4. Try to download a PDF → paywall opens
5. Click "Pay now" → redirects to PayFast sandbox
6. PayFast sandbox accepts test payments (no real card needed)

---

## Cost structure

| Item | Cost |
|---|---|
| PayFast account | R0/month (no monthly fee) |
| PayFast transaction fee | ~2% (Instant EFT) or 3.5% + R2 (card) |
| Per R99/mo annual sale (R1,188) | ~R24 fee → you keep R1,164 |
| Per R129/mo monthly sale | ~R6 fee → you keep R123 |
| Cloudflare Worker (ITN handler) | R0 (free tier: 100,000 requests/day) |
| Cloudflare KV storage | R0 (free tier: 100,000 reads/day) |

**Net margin per sale: ~97-98%.** No fixed monthly costs.
