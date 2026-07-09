/**
 * LUNGA — PayFast ITN webhook handler
 * 
 * Receives PayFast Instant Transaction Notifications, verifies the signature,
 * and activates the subscriber's plan.
 * 
 * Deployable on: Cloudflare Workers (free), Netlify Functions, or cPanel Node.js
 * 
 * Flow:
 * 1. User pays via PayFast checkout on the frontend
 * 2. PayFast sends an ITN POST to this endpoint (/api/itn)
 * 3. We verify the signature against our merchant passphrase
 * 4. We store the subscription record (Cloudflare KV or JSON file)
 * 5. We return a signed unlock token the frontend uses to activate Pro
 */

// ---- For Cloudflare Workers ----
// export default {
//   async fetch(request, env) {
//     const handler = new LungaBackend(env);
//     return handler.handle(request);
//   }
// };
//
// ---- For Node.js / cPanel / Netlify ----
// const http = require('http');
// const server = http.createServer((req, res) => { ... });

const crypto = require('crypto');

class LungaBackend {
  constructor(env = {}) {
    this.PAYFAST_MERCHANT_ID = env.PAYFAST_MERCHANT_ID || process.env.PAYFAST_MERCHANT_ID || '';
    this.PAYFAST_MERCHANT_KEY = env.PAYFAST_MERCHANT_KEY || process.env.PAYFAST_MERCHANT_KEY || '';
    this.PAYFAST_PASSPHRASE = env.PAYFAST_PASSPHRASE || process.env.PAYFAST_PASSPHRASE || '';
    this.UNLOCK_SECRET = env.UNLOCK_SECRET || process.env.UNLOCK_SECRET || 'change-this-to-a-random-string';
    this.ITN_URL = env.ITN_URL || process.env.ITN_URL || ''; // e.g. https://lunga.co.za/api/itn
    this.PAYFAST_SANDBOX = (env.PAYFAST_SANDBOX || process.env.PAYFAST_SANDBOX || 'false') === 'true';
    // In production: use Cloudflare KV, D1, or a database. For now: in-memory (replace).
    this.db = env.KV || globalThis.__lunga_db || (globalThis.__lunga_db = new Map());
  }

  async handle(request) {
    const url = new URL(request.url);
    
    // ---- Routes ----
    if (url.pathname === '/api/health') {
      return this.json({ status: 'ok', time: Date.now() });
    }
    
    if (url.pathname === '/api/itn' && request.method === 'POST') {
      return this.handleITN(request);
    }
    
    if (url.pathname === '/api/verify-subscription' && request.method === 'GET') {
      return this.verifySubscription(request, url);
    }
    
    if (url.pathname === '/api/generate-checkout' && request.method === 'POST') {
      return this.generateCheckout(request);
    }

    return this.json({ error: 'Not found' }, 404);
  }

  // ---- PayFast ITN handler ----
  async handleITN(request) {
    try {
      const formData = await request.formData();
      const params = Object.fromEntries(formData.entries());

      // Step 1: Verify the signature
      const expectedSig = this.generateSignature(params);
      if (params.signature !== expectedSig) {
        console.error('ITN signature mismatch', { received: params.signature, expected: expectedSig });
        return this.json({ error: 'Invalid signature' }, 400);
      }

      // Step 2: Verify with PayFast server (confirm the payment is real)
      const verifyResponse = await fetch(
        this.PAYFAST_SANDBOX ? 'https://sandbox.payfast.co.za/eng/query/validate' : 'https://www.payfast.co.za/eng/query/validate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(params).toString(),
        }
      );
      const verifyText = await verifyResponse.text();
      if (!verifyText.includes('VALID')) {
        console.error('PayFast server validation failed', verifyText);
        return this.json({ error: 'Server validation failed' }, 400);
      }

      // Step 3: Extract subscription details
      const paymentId = params.pf_payment_id;
      const mPaymentId = params.m_payment_id; // our reference (email or session ID)
      const amount = parseFloat(params.amount_gross);
      const status = params.payment_status; // 'COMPLETE' for successful
      const token = params.token; // recurring billing token

      if (status !== 'COMPLETE') {
        console.log('Payment not complete:', status);
        return this.json({ status: 'ignored', reason: status });
      }

      // Step 4: Determine plan from amount
      const plan = amount >= 1188 ? 'annual' : 'monthly';

      // Step 5: Store subscription record
      const subscription = {
        id: paymentId,
        reference: mPaymentId,
        plan,
        status: 'active',
        amount,
        token, // PayFast recurring token for future billing
        activatedAt: Date.now(),
      };
      await this.db.put(mPaymentId, JSON.stringify(subscription));

      // Step 6: Generate unlock token for the frontend
      const unlockToken = this.generateUnlockToken(mPaymentId, plan);

      console.log('Subscription activated:', { reference: mPaymentId, plan, paymentId });

      return this.json({ status: 'activated', unlockToken });

    } catch (error) {
      console.error('ITN handling error:', error);
      return this.json({ error: 'Internal error' }, 500);
    }
  }

  // ---- Generate PayFast checkout form data ----
  async generateCheckout(request) {
    try {
      const body = await request.json();
      const { plan, reference } = body;

      const amount = plan === 'annual' ? 1188.00 : 129.00;
      const itemName = plan === 'annual' ? 'Lunga — Annual Subscription (R99/mo, billed yearly)' : 'Lunga — Monthly Subscription';

      const params = {
        merchant_id: this.PAYFAST_MERCHANT_ID,
        merchant_key: this.PAYFAST_MERCHANT_KEY,
        return_url: `${this.baseUrl(request)}/?payment=success`,
        cancel_url: `${this.baseUrl(request)}/?payment=cancelled`,
        notify_url: this.ITN_URL,
        m_payment_id: reference,
        amount: amount.toFixed(2),
        item_name: itemName,
      };

      // Add subscription fields if recurring
      if (plan === 'annual') {
        params.subscription_type = '1'; // recurring
        params.frequency = '6';          // monthly
        params.cycles = '12';            // 12 months
        params.billing_date = new Date().toISOString().slice(0, 10);
      } else {
        params.subscription_type = '1';
        params.frequency = '6';
        params.cycles = '0'; // indefinite
        params.billing_date = new Date().toISOString().slice(0, 10);
      }

      params.signature = this.generateSignature(params);

      const payfastUrl = this.PAYFAST_SANDBOX
        ? 'https://sandbox.payfast.co.za/eng/process'
        : 'https://www.payfast.co.za/eng/process';

      return this.json({ url: payfastUrl, params });
    } catch (error) {
      console.error('Checkout generation error:', error);
      return this.json({ error: 'Failed to generate checkout' }, 500);
    }
  }

  // ---- Verify a subscription (frontend calls this to check status) ----
  async verifySubscription(request, url) {
    const reference = url.searchParams.get('reference');
    const token = url.searchParams.get('token');

    if (!reference) {
      return this.json({ error: 'Missing reference' }, 400);
    }

    // Verify unlock token
    if (token) {
      const valid = this.verifyUnlockToken(reference, token);
      if (!valid) {
        return this.json({ status: 'invalid_token' }, 403);
      }
    }

    const raw = await this.db.get(reference);
    if (!raw) {
      return this.json({ status: 'not_found' });
    }

    const subscription = JSON.parse(raw);
    return this.json({ status: subscription.status, plan: subscription.plan });
  }

  // ---- Signature generation (PayFast spec) ----
  generateSignature(params) {
    // Remove signature and empty values, sort by key
    const sorted = Object.entries(params)
      .filter(([k, v]) => k !== 'signature' && v !== '' && v !== undefined && v !== null)
      .sort(([a], [b]) => a.localeCompare(b));

    // Build the query string
    let queryString = sorted.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');

    // Append passphrase if set
    if (this.PAYFAST_PASSPHRASE) {
      queryString += `&passphrase=${encodeURIComponent(this.PAYFAST_PASSPHRASE)}`;
    }

    return crypto.createHash('md5').update(queryString).digest('hex');
  }

  // ---- Unlock token (HMAC) ----
  generateUnlockToken(reference, plan) {
    const payload = `${reference}:${plan}:${Math.floor(Date.now() / 86400000)}`; // day-precision
    return crypto.createHmac('sha256', this.UNLOCK_SECRET).update(payload).digest('hex');
  }

  verifyUnlockToken(reference, token) {
    // Accept tokens from today or yesterday (timezone tolerance)
    const today = Math.floor(Date.now() / 86400000);
    for (const day of [today, today - 1]) {
      const payload = `${reference}:${day}`;
      const expected = crypto.createHmac('sha256', this.UNLOCK_SECRET).update(payload).digest('hex');
      if (token === expected) return true;
    }
    return false;
  }

  // ---- Helpers ----
  baseUrl(request) {
    const proto = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'lunga.co.za';
    return `${proto}://${host}`;
  }

  json(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

// ---- Export for Node.js ----
module.exports = { LungaBackend };
