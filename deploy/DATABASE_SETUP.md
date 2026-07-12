# LUNGA — Database & Auth Setup (Supabase)

**What this adds:** User accounts, saved business profiles, logo upload, client database, invoice history. Multi-tenant — each subscriber's data is private and isolated.

**Cost: R0** (Supabase free tier: 500MB DB, 1GB file storage, 50K users)

---

## Step 1: Create a Supabase project (5 min)

1. Go to [supabase.com](https://supabase.com) → **Start your project** (free)
2. Name it: `lunga`
3. Set a database password (save it)
4. Choose the closest region (eu-central for SA)
5. Wait ~2 minutes for provisioning

## Step 2: Run the database schema (2 min)

1. In your Supabase dashboard → **SQL Editor**
2. Click **New query**
3. Open `backend/schema.sql` from this project
4. Copy the entire contents → paste into the SQL editor
5. Click **Run**
6. You should see "Success. No rows returned." — the tables, policies, and triggers are now active.

## Step 3: Get your API credentials (1 min)

1. Go to **Project Settings → API**
2. Copy:
   - **Project URL** (e.g., `https://abcdefghijklm.supabase.co`)
   - **anon public key** (a long string starting with `eyJ...`)

## Step 4: Paste credentials into the config (1 min)

Open `app/assets/supabase-config.js` and replace:

```javascript
const SUPABASE_URL = 'https://YOUR-PROJECT-ID.supabase.co';  // ← your URL
const SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY';              // ← your anon key
```

## Step 5: Deploy (push to git)

```bash
cd projects/phepha
git add -A
git commit -m "Enable Supabase auth + database"
git push
```

GitHub Pages auto-deploys. The login page is at `lunga/login.html`.

---

## What the database gives you

| Feature | How it works |
|---|---|
| **User accounts** | Supabase Auth handles signup, login, password reset, email verification |
| **Business profile** | Saved to `profiles` table — never asks for details again after first setup |
| **Logo upload** | File goes to Supabase Storage (`logos` bucket), URL saved in profile |
| **Client database** | `clients` table — each subscriber saves their recurring customers |
| **Invoice history** | `invoices` table — every invoice is saved, can be re-opened or duplicated |
| **Saved line items** | `saved_items` table — reusable items for quick invoicing |
| **Invoice numbering** | Auto-increments per subscriber, stored in `profiles.next_invoice_num` |
| **Tenant isolation** | Row Level Security (RLS) — each user only sees their own rows, enforced at database level |

## How RLS keeps customers separate

Every table has a `user_id` column linked to Supabase Auth. RLS policies enforce:
- User A can only SELECT/INSERT/UPDATE/DELETE rows where `user_id = auth.uid()` (themselves)
- User B's data is invisible to User A, at the database level — not just in the UI
- This is the gold-standard pattern for multi-tenant SaaS, per [Supabase's B2B SaaS docs](https://supabase.com/solutions/b2b-saas)

## Files created

```
backend/schema.sql              ← run this in Supabase SQL editor
app/assets/supabase-config.js   ← paste your credentials here
app/assets/lunga-data.js        ← auth + data management module
app/login.html                  ← signup / login page
```

## Going live checklist

| # | Item | Done |
|---|---|---|
| 1 | Supabase project created | ☐ |
| 2 | schema.sql run successfully | ☐ |
| 3 | Credentials pasted into supabase-config.js | ☐ |
| 4 | Pushed to git → live on GitHub Pages | ☐ |
| 5 | Test signup at lunga/login.html | ☐ |
| 6 | Test login → app loads with saved profile | ☐ |
| 7 | Upload a test logo | ☐ |
| 8 | Save a test client | ☐ |
| 9 | Create and save a test invoice | ☐ |
| 10 | Log out → log back in → data persists | ☐ |
