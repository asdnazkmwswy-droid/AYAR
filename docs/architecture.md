# AYAR Architecture

## Product surfaces
- AYAR MASTER: platform owner console for merchants, plans, subscriptions, branches, support and audit.
- AYAR MERCHANT: merchant workspace for invoices, inventory, gold pricing, customers, suppliers, debts, cashbox, staff and reports.

## Stack
- Web: React, TypeScript, Vite, responsive PWA.
- API: Cloudflare Workers + Hono.
- Database: Cloudflare D1 (SQLite).
- Object storage: Cloudflare R2 (later, after account enablement and approval).

## Non-negotiable domain rules
1. Every merchant-owned record is scoped by merchant_id and authorized server-side.
2. Store IQD amounts as integer dinars (or a documented smaller integer unit if required).
3. Store weight as integer milligrams (1 mg = 0.001 g).
4. Snapshot the applicable gold price and calculation inputs on invoice posting.
5. Keep gold value, workmanship, stones, discounts and payments as separate values.
6. Inventory changes are append-only movements, not arbitrary balance overwrites.
7. Posted invoices are corrected by reversal/adjustment records, not destructive edits.
8. Financial posting and inventory movements must be transactional.
9. Add audit events for sensitive financial and administrative actions.

## Delivery sequence
1. Foundation and design system.
2. Identity, tenant boundaries and merchant setup.
3. Gold pricing, items and inventory ledger.
4. Sales, purchases, exchange invoices and payment posting.
5. Customer/supplier accounts, cashbox and reports.
6. MASTER controls, subscriptions, branches, staff and permissions.
7. Automated tests, backup restore drill and security review.

No production resources are provisioned or deployed by this repository bootstrap.
