# LUNGA — Brand Guide (v2 rehaul)

**Version:** 2.0 · **Date:** 2026-07-09 · **Status:** Internal reference
**Supersedes:** all earlier brand-guide drafts (V1 locked directive + the terracotta draft).
**Source of truth:** `app/assets/lunga.css`. Both pages inherit it.

---

## 1. BRAND IDEA
**WORK DONE → INVOICE SENT → PAID**

## 2. VISUAL TERRITORY
Editorial confidence + precise transactional software. One designed system — not a patchwork of borrowed SaaS patterns.

## 3. COLOUR SYSTEM — achromatic + ONE lime

| Token | Hex | Role |
|---|---|---|
| Ink | `#0F1011` | dominant brand/action colour: text, buttons, headings, links |
| Paper | `#FAFAF8` | page background |
| White | `#FFFFFF` | surfaces |
| **Lime** | `#CCFF00` | the single chromatic accent (fills, swatches) |
| Lime-mid | `#B9E600` | same hue, one readable step (accent *text* on white) |
| Lime-soft | `#F3FFD1` | soft tint surface (invoice pay box, badges) |
| Grey 50/100/200/400/600/800 | see tokens | neutral steps |
| Error / Error-bg / Error-line | `#D63C32` / `#FBEDE4` / `#F0CDBD` | error states |
| Warning | `#F0A020` | caution |

**Governance:** ONE lime family — no forest, no teal, no competing green. Ink-on-paper carries the whole product; lime earns its place as the single accent. Use lime-mid (not lime) where accent *text* must be readable on white.

**Deleted from the system (v1 legacy):** `--forest` / `--forest-dark` (were green, alias-removed), `#C1E600` (old logo swoosh), `#A6D000` (old signal-dark), the green focus ring (`rgba(15,107,79,.1)` → ink `rgba(15,16,17,.12)`).

## 4. TYPOGRAPHY

| Role | Typeface | Rule |
|---|---|---|
| **Display / emotional marketing** | Instrument Serif, weight 400 | Emotional statements ONLY — hero, pull-quote, final CTA. Nothing else. |
| **Everything else** (UI, headings, body, figures) | Hanken Grotesk | Weights 400/500/600/700. Tabular-nums on figures. |

**Serif is NOT used for:** FAQ, buttons, nav, forms, tables, routine section headings. Hanken Grotesk replaces the earlier Manrope/DM Sans choices (both read as "AI-generic").

**Type scale (8 fixed steps):** display 64 · h1 40 · h2 28 · h3 20 · lead 19 · body 16 · sm 14 · xs 12. The invoice preview now uses this scale — there is ONE type system, not two.

## 5. SPACING SCALE (new in v2)
`--s1`–`--s9` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. Every padding, margin, gap references a token. No magic numbers.

## 6. RADIUS (geometric, max 16)
sm 4 · md 8 · lg 12 · xl 16. (v1 had collide pairs 6/6/8/10/10/12 — collapsed to a clean scale.)

## 7. THE LOGO MARK (redesigned in v2)
**Mark:** a bold geometric **L** cut as negative space inside a tight ink square; the foot of the L terminates in a **lime notch** — the "done/paid" tick. Distinct silhouette, reads at 16px (favicon), works single-colour (drop the lime for the PDF footer).

Files: `assets/lunga-mark.svg` (favicon/app icon), `assets/lunga-logo.svg` (mark + "Lunga" wordmark lockup). Founder's uploaded PNG preserved at `assets/lunga-logo-uploaded.png` as source-of-truth reference.

The earlier "wordmark + swoosh" formula (a sans L with a two-point bezier underline) is retired — it was a generic startup-logo trope with no distinct silhouette.

## 8. DE-TROPED PATTERNS (v2 changes)
- Hero: removed the "highlighter swoosh under Paid faster" (Stripe/Linear trope). Lime now lives in the CTA + one pay-row, not decorative underlines.
- Pricing: calmer two-card layout (kept), no aggressive cost-comparison footer.
- FAQ: chevron disclosure replaces the `+`/`−` glyph accordion.
- Comparison table: kept (per founder call) but retokenised to lime-for-Yes / grey-for-all-else.
- Surfaces: whitespace → dividers → cards (cards are rare, not the default).

## 9. VOICE (unchanged)
Short. Direct. Human. Action-oriented. South African English.
**Banned:** seamlessly, empower, transform your workflow, unlock, leverage, effortlessly, powerful solution.
**Buttons use specific verbs:** Create invoice, Pay now, Download PDF, Save to browser, Add line item.

## 10. PRIMARY VISUAL
The invoice IS the primary product visual. No abstract illustrations replace it.

---

## Implementation status (verified 2026-07-09)
- [x] One unified token sheet; both pages inherit
- [x] One lime family only (no forest/legacy green) — source-audited
- [x] Hanken Grotesk throughout; serif only on emotional display — rendered-audited
- [x] Spacing scale in use across all 9 steps
- [x] Geometric radius scale
- [x] New logo mark with distinct silhouette
- [x] De-troped: hero swoosh gone, FAQ chevron, calmer pricing
- [x] All JS functionality preserved (trial, VAT, SARS Section 20, PDF, PayFast) — verified
