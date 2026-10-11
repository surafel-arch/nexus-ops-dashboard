# 05. Admissions Integration Roadmap

Status: proposal. Prepared 2026-10-11. Phases are ordered by dependency. Each phase ends at a verification gate. A phase does not start until the previous gate passes, except where noted.

## Overview

| Phase | Name | Writes PHI? | Depends on | Gate |
|---|---|---|---|---|
| 0 | Sources and decisions | No | Nothing | G0 |
| 1 | Rules core with synthetic fixtures | No | G0 partial (D-02, D-07) | G1 |
| 2 | Read-only workspace, fixture mode | No | G1 | G2 |
| 3 | Platform foundation | Prepares for it | G0 (D-03) | G3 |
| 4 | Read model and live read-only workspace | Reads | G2, G3 | G4 |
| 5 | Write paths, process by process | Yes | G4 | G5 per process |
| 6 | Conversion, scheduling, closeout | Yes | G5 for P1 to P13 | G6 |
| 7 | Dashboard reconciliation | Yes | G6 | G7 |

Phase 1 and Phase 3 can run in parallel once their decisions close. Phase 1 never touches PHI, so it does not wait for the platform.

## Phase 0. Sources and decisions

Goal: replace assumptions with the agency's real documents and owner decisions.

| ID | Deliverable | Detail |
|---|---|---|
| P0-1 | Source files in a private location | Both admission packets, the initial assessment, handbook, policy, privacy, consent, rights, ROI, and supporting forms. Blank templates only. Not in this public repo (D-04). |
| P0-2 | File inventory completed | For each file: ID, title, form number, version or revision date printed on it, page count, SHA-256, source, owner. |
| P0-3 | Packet comparison | For each form that appears in a packet and standalone: same version? same text (diff extracted text)? same fields? same signature blocks? Record each difference in the decision register with a proposed canonical version. |
| P0-4 | Field extraction | For each form: every field, its type, required or optional, who fills it, who signs, and which process (P1 to P16) owns it. |
| P0-5 | Claim register | Every regulatory statement printed in the forms, each with an `R-` ID and a verification status against an official source. |
| P0-6 | Decisions D-01, D-02, D-03, D-04, D-07, D-08 closed | See `06-decision-register.md`. |

Gate G0:
- All files in P0-1 inventoried with hashes.
- Every form field mapped to a process or explicitly marked out of scope.
- D-02 (regulatory regime) and D-03 (platform) decided in writing by the owner.
- Confirmation that no completed form or real client data is in any public repo.

## Phase 1. Rules core with synthetic fixtures

Goal: build the hardest logic first, without PHI and without a platform.

| ID | Deliverable |
|---|---|
| P1-1 | Requirement state vocabulary as code (A2). |
| P1-2 | Age flag calculator with three separate flags and transition dates (A3), configurable thresholds. |
| P1-3 | Rule set as versioned data, each rule with source reference and verification status. |
| P1-4 | Readiness evaluator (workspace spec section 5). |
| P1-5 | Synthetic fixtures: at least one referral per age band (under 18, 18, 19 to 20, 21 and over), per payer route, and per exception state. |
| P1-6 | Unit tests for every acceptance criterion in `03-process-map.md` that the evaluator can decide. |

Gate G1:
- Tests pass and cover every rule in the rule set.
- Evaluator is deterministic (same inputs, same output, verified by test).
- A clinical reviewer (DON) signs off on the fixture outcomes in writing.

## Phase 2. Read-only workspace in fixture mode

| ID | Deliverable |
|---|---|
| P2-1 | Queue and referral detail screens (workspace spec section 4). |
| P2-2 | Mutation-proof tests (workspace spec section 7). |
| P2-3 | Accessibility check. |

Gate G2:
- Workspace acceptance criteria 1 to 6 pass.
- Mutation test passes.
- Owner and DON review the screens with fixtures.

## Phase 3. Platform foundation

Goal: a place where PHI can live. This is the largest phase and the main risk.

| ID | Deliverable |
|---|---|
| P3-1 | Server database with schema for A6 entities, migrations, and backups. |
| P3-2 | Authentication with individual accounts and MFA. |
| P3-3 | Role-based permissions enforced on the server. |
| P3-4 | Append-only audit store (A5) written by the server, not the browser. |
| P3-5 | Document storage with versions, SHA-256, retention policy, and access logging. |
| P3-6 | Output encoding throughout and subresource integrity or self-hosting for third-party scripts. |
| P3-7 | Business associate agreements with every vendor that will hold PHI (hosting, storage, e-signature) (D-21). |
| P3-8 | Security review and risk analysis record. |

Gate G3:
- No PHI enters until P3-2, P3-3, P3-4, P3-5, P3-7 are done and reviewed.
- Penetration-style tests for permission bypass and stored script injection pass.
- Restore from backup tested.

## Phase 4. Read model and live workspace

| ID | Deliverable |
|---|---|
| P4-1 | `ReferralBundle` read model from the server store. |
| P4-2 | Workspace switched to live mode for permitted roles, read-only database role. |

Gate G4: workspace acceptance criteria pass against a staging store with synthetic data. Mutation test passes in live mode.

## Phase 5. Write paths, one process at a time

Order: P1, P2, P3, P5, P7, P4, P6, P8, P9, P10, P11, P12, P13. P7 comes before P8 because signatures depend on authority. Each process ships its own data entry screen, permissions, audit, and acceptance tests from `03-process-map.md`.

Gate G5 (per process): its acceptance criteria pass, its audit events appear correctly, and the workspace shows its states without code changes to the workspace.

## Phase 6. Conversion, scheduling, closeout

| ID | Deliverable |
|---|---|
| P6-1 | Transactional referral conversion (P14) with idempotency and failure-injection tests. |
| P6-2 | SOC scheduling and handoff (P15), linked to existing staffing data. |
| P6-3 | Closeout and obligation register (P16), feeding the existing Alert Center. |

Gate G6: P14 failure-injection tests pass. No orphan or duplicate client in any test.

## Phase 7. Dashboard reconciliation

| ID | Deliverable |
|---|---|
| P7-1 | Remove `clients.paExpDate`, `clients.waiver`, `clients.statePlan`. Read from `Authorization` and `Coverage` (fixes X-01, X-02). |
| P7-2 | Rename hospital "admission" to "hospital stay" in UI and model (X-08). |
| P7-3 | Replace or remove the CSV import that reports success without importing (X-05). |
| P7-4 | Cascade or block client delete when child records exist (X-10). |
| P7-5 | Link workflows to a record ID. |

Gate G7: every dashboard metric reads from one owner per fact. Regression tests on alerts and scores pass.

## Recommended first implementation slice

After Gate G0 closes D-02 and D-07: Phase 1, items P1-1, P1-2, P1-5 (age band fixtures only), and the P3 and P7 rules of the evaluator.

Why this slice:
1. It needs no PHI, no platform, and no access to the real packets beyond the decisions.
2. It tests the riskiest logic in the request: three age thresholds from three sources, and the rule that a parent cannot sign for an adult.
3. Its output (rule set plus evaluator) is reused unchanged by every later phase.
4. It does not touch `nexus_ops_v3.html`, so it cannot break the running dashboard.

What it does not do: it does not produce a screen a user can use, and it does not make the dashboard safe for PHI. Phase 3 does that.
