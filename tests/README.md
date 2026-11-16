# Test strategy

- Unit tests: integer money/weight validation and invoice calculations.
- Integration tests: tenant isolation, invoice posting/reversal and inventory ledger consistency.
- Security tests: reject cross-merchant record access even when IDs are known.
- Migration tests: apply migrations to a fresh D1-compatible SQLite database.
- Backup drill: restore a backup and verify row counts and financial invariants.

No production data belongs in test fixtures.
