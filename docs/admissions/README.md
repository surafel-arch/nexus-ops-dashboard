# Admissions: Discovery and Planning

Phase: read-only discovery. Prepared 2026-10-11. No application code, form, schema, database, or record was changed.

## Documents

| # | Document | Contents |
|---|---|---|
| 01 | [Source-file inventory](01-source-inventory.md) | What exists, what is missing, hashes, history, discrepancies |
| 02 | [Capability matrix](02-capability-matrix.md) | Implemented, scaffolded, design-only, unverified, with line references, plus the five known concerns |
| 03 | [Process map](03-process-map.md) | All 16 admissions processes, shared state vocabulary, age flags, signature and audit records, data owners |
| 04 | [Workspace spec](04-workspace-spec.md) | Read-only admissions workspace, evaluator contract, proof of read-only |
| 05 | [Integration roadmap](05-integration-roadmap.md) | Phases 0 to 7, gates, recommended first slice |
| 06 | [Decision register](06-decision-register.md) | 22 open decisions and 18 regulatory claims with verification status |

## Principal findings

1. The admission sources are not in this repository. No `assets/`, packets, forms, `AGENTS.md`, or architecture docs exist. The repository holds one 2,195-line HTML file and an empty README.
2. None of the 16 admissions processes is implemented. Six have partial scaffolding (authorizations, skills, open shifts, PA alerts). Ten have no code.
3. The current app cannot hold PHI: browser-only storage, no login, a role dropdown that enforces nothing, an audit log that records the dropdown text as the "user" and covers only some entities, and HTML output with no escaping.
4. A competing source of truth already exists: PA expiry and program flags live on both the client and the authorization, edited separately, read by different screens.
5. The import screen reports "Success" and claims automatic duplicate merging, and its handler writes nothing.
6. No date of birth exists, so no age rule can run. Public sources confirm three separate thresholds: 18 for legal authority in Virginia, 21 for Medicaid and FAMIS Plus EPSDT, and 19 for FAMIS.
7. The repository is public. Completed admission forms must never be committed here.

## Recommended first implementation slice

After decisions D-02 and D-07 close: the rules core with synthetic fixtures (roadmap Phase 1, items P1-1, P1-2, P1-5, plus the P3 and P7 evaluator rules). It needs no PHI and no platform, and it tests the age and authority logic that the rest depends on.
