/**
 * LUNGA — Cloudflare Workers entry point
 * Deploy this file to Cloudflare Workers (free tier).
 * Set the secrets below via: wrangler secret put PAYFAST_MERCHANT_ID
 */

import { LungaBackend } from './src/itn-handler.js';

export default {
  async fetch(request, env, ctx) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const handler = new LungaBackend({
      PAYFAST_MERCHANT_ID: env.PAYFAST_MERCHANT_ID,
      PAYFAST_MERCHANT_KEY: env.PAYFAST_MERCHANT_KEY,
      PAYFAST_PASSPHRASE: env.PAYFAST_PASSPHRASE,
      UNLOCK_SECRET: env.UNLOCK_SECRET,
      ITN_URL: env.ITN_URL,
      PAYFAST_SANDBOX: env.PAYFAST_SANDBOX || 'false',
      KV: env.LUNGA_KV, // Cloudflare KV namespace binding
    });

    return handler.handle(request);
  },
};
