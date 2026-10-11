# 04. Read-Only Admissions Workspace Specification

Status: proposal. Prepared 2026-10-11. Not built.

## 1. Purpose

Give admissions staff and the Director of Nursing one screen that shows, for each referral, where it stands in the 16 processes, what blocks it, and what evidence supports each "complete". The workspace changes nothing. Every edit happens in the owning process screens built in later phases.

## 2. Precondition you must accept first

A read-only view over no data is a demo, not a capability. Today there is no referral, document, assessment, or POC data anywhere (see `02-capability-matrix.md`). The workspace therefore runs in two modes:

| Mode | Data source | Allowed data | When |
|---|---|---|---|
| Fixture mode | Synthetic JSON fixtures checked into the repo | Fake people only. No real names, DOBs, or member IDs. | Phase 2 |
| Live mode | The server data store chosen under D-03 | PHI, behind authentication and role checks | Phase 4, only after Gate G3 |

Live mode must never read the current `localStorage` dataset (`nexus_db_v4`), because that store has no identity, permissions, or reliable audit.

## 3. Users and visibility

| Role | Sees | Hidden |
|---|---|---|
| Intake Coordinator | Queue, P1 to P5, P14 status | Clinical findings detail |
| Clinical Admissions RN | All processes for assigned referrals | Financial agreement amounts |
| Authorization Specialist | P3, P5, P12 hours, P15 hours | Clinical findings detail |
| Director of Nursing | Everything | Nothing |
| Compliance Officer | Everything, plus audit trail | Nothing |
| Staffing Coordinator | P4 staffing, P15 | Clinical detail beyond skills |
| Executive | Aggregate counts only | Person-level data |

Role names and visibility are proposals pending D-12.

## 4. Screens

### 4.1 Admissions queue

Columns: referral ID, received (elapsed time), client display name (role-dependent masking), age band, payer program, requested service and hours, current stage, blocking findings count, next deadline, owner.

Filters: stage, owner, payer program, age flag (`is_minor`, `is_epsdt_age`), has blocking findings, deadline within N days.

Sort: next deadline ascending by default.

### 4.2 Referral detail

Header: identity summary, the three age flags shown separately with their reference dates and next transition date, payer program, service line, readiness verdict from the evaluator.

Body: one row per process P1 to P16. Each row expands to its requirements. Each requirement shows:

- state chip from the A2 vocabulary in `03-process-map.md`
- reason text for `declined`, `unavailable`, `not_applicable`, `blocked`
- evidence link: document version (template ID and version, content hash, stored date), signature event (signer, capacity, authority link), or verified data value with verifier
- deadline and its rule reference (`R-` ID)
- verification status of the rule itself: verified, partially verified, unverified

Side panel: blocking findings, ordered by deadline.

Audit tab (Compliance Officer and DON only): the referral's audit events, newest first.

### 4.3 Empty and unknown values

| Situation | Display | Never display |
|---|---|---|
| Field never captured | "Not recorded" | blank, "None", "N/A" |
| Requirement validly excluded | "Not applicable" plus rule and reason | |
| Allergy list empty | "Missing" | "No known allergies" |
| Document title present, no stored file | "Metadata only, file not stored" | "Received" |
| Template uploaded, no signed instance | "Template on file, not signed" | "Complete" |

## 5. Readiness evaluator

A pure function, independent of the UI and storage.

```
evaluate(referralBundle, ruleSet, asOfDate) -> {
  evaluatorVersion,
  ruleSetVersion,
  asOfDate,
  ageFlags: { isMinor, isEpsdtAge, usesPediatricAssessment, nextTransitions[] },
  requirements: [{ id, processId, state, reason, evidenceRefs[], deadline, ruleRef, ruleVerification }],
  findings: [{ id, severity: blocking|warning|info, requirementId, message }],
  verdict: ready | not_ready | ready_with_exceptions
}
```

Properties:
1. Deterministic. No clock reads inside, `asOfDate` is an input.
2. No I/O.
3. Rule set is data with version and per-rule verification status, so unverified rules can run as warnings instead of blocking (D-02 decides).
4. Every finding names the requirement and rule that produced it.

## 6. Data contract (read model)

The workspace reads one `ReferralBundle` per referral: Referral, Person, Coverage[], Authorization[], Representative[], Practitioner[], Order[], DocumentInstance[] with versions and SignatureEvent[], Assessment[], clinical lists, safety records, PlanOfCare[], ReadinessReview[], AuditEvent[] (filtered by role). Field definitions follow section A6 of `03-process-map.md`.

## 7. How "read-only" is proven

The concern that screens labeled read-only contain write handlers is handled by tests, not labels.

1. The workspace module imports only the read model interface. It has no import path to any write function. A lint rule fails the build if it does.
2. A test renders every screen with fixtures, fires every click, change, and submit event in the DOM, and asserts the data store snapshot is byte-identical before and after.
3. A test asserts no network request with a method other than GET (or the store's read call) is made.
4. In live mode the server issues the workspace a read-only role. The database rejects writes from it.
5. No delete, edit, or "advance" buttons appear in the workspace. Each row may link to the owning process screen, which enforces its own permissions.

## 8. Accessibility and display

Keyboard navigation for the queue and detail rows, visible focus, state chips that use text and icon (not color alone), WCAG 2.2 AA contrast in light and dark themes. The current app uses a dark theme only.

## 9. Acceptance criteria

1. With the fixture set, every state in the A2 vocabulary appears at least once and renders with its required reason or evidence.
2. A fixture client aged 19 on Medicaid shows `is_minor = false` and `is_epsdt_age = true`, and a parent signature on a consent dated after the 18th birthday appears as a blocking finding.
3. A fixture document with a title and no stored file renders "Metadata only, file not stored" and its requirement is not complete.
4. The mutation test in section 7 passes.
5. Changing `asOfDate` in a fixture across an authorization end date changes that requirement to `expired` and the verdict to `not_ready`.
6. Each rule shown in the UI shows its verification status from the rule set.
