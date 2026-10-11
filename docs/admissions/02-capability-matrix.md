# 02. Admissions Capability Matrix

Status: discovery, read-only. Prepared 2026-10-11. Evidence: `nexus_ops_v3.html` (SRC-01) at commit `66fc532`. Line numbers refer to that file.

## Classification rules

| Class | Meaning | Evidence required |
|---|---|---|
| IMPLEMENTED | Code exists, runs in the browser, and performs the function end to end for the data it holds. | A code path that reads and writes the data, cited by line. |
| SCAFFOLDED | UI or data structure exists but does not perform the function, or performs a misleading subset. | Code that shows the gap. |
| DESIGN-ONLY | Described in these planning docs, no code exists. | None in code. |
| UNVERIFIED | Claimed in the request or in a file I could not access. Not proven either way. | Missing source. |

"Implemented" here never means production ready. The whole app stores data in one browser's `localStorage` with no login. See section 3.

## 1. Admissions capabilities

| # | Capability | Class | Evidence | Gap |
|---|---|---|---|---|
| 1 | Referral receipt and tracking | DESIGN-ONLY | No referral entity, view, or form. Search for "referral" returns zero matches. | Entire entity and queue. |
| 2 | Identity verification and duplicate review | DESIGN-ONLY | Client form requires only first, last, Medicaid ID (1694). No DOB. No match check on create (1698). Import claims auto-merge on Medicaid ID but code does nothing (1555, 2170). | Identity master, match rules, review queue. |
| 3 | Service-line, age, and payer classification | SCAFFOLDED | `authType` has three hour values (1685). `waiver` and `statePlan` checkboxes (1687). No DOB, so no age. No payer entity. | DOB, payer and plan, service line, three separate age flags. |
| 4 | Agency capability and preliminary acceptance | SCAFFOLDED | `clients.skills` and `employees.skills` exist (351, 343). Coverage risk computed in Intelligence view. No accept/decline decision record. | Capability match, decision, reason codes. |
| 5 | Eligibility, coverage, and authorization | SCAFFOLDED | `authorizations` CRUD works (1750 to 1771). Expiry buckets and alerts work against dates (1227 to 1230, 485). No authorization number, units, payer, start date, or eligibility check. PA date duplicated on client (X-01). | Coverage entity, authorization detail, single owner. |
| 6 | Practitioner verification and order review | DESIGN-ONLY | No practitioner or order entity. `credentials` covers agency staff only. | Practitioner, order, verification. |
| 7 | Guardian or representative authority | DESIGN-ONLY | No representative, relationship, or authority field. | Entire capability. |
| 8 | Orientation, consents, privacy, rights, financial agreement, disclosures | DESIGN-ONLY | No document, consent, or acknowledgment entity. | Entire capability. |
| 9 | Initial clinical assessment | DESIGN-ONLY | No assessment entity. | Entire capability. |
| 10 | Medication reconciliation, allergies, directives, equipment | DESIGN-ONLY | `skills` lists tasks like "G-Tube" and "Vent" (351). No medication, allergy, directive, or equipment data. | Entire capability. |
| 11 | Home safety, emergency preparedness, caregiver readiness | DESIGN-ONLY | None. | Entire capability. |
| 12 | Plan-of-care preparation and approval | SCAFFOLDED | Authorization has `epofFaxed` and `epofReceived` dates (1757). The meaning of "ePOF" is not defined in code (D-08). No POC content, signature, or version. | POC entity, approval, signature. |
| 13 | Final admissions readiness review | DESIGN-ONLY | None. | Evaluator and sign-off. |
| 14 | Referral-to-client and episode handoff | DESIGN-ONLY | No referral and no episode. Client creation is a direct form (1698). | Transactional conversion. |
| 15 | Start-of-care scheduling and staff handoff | SCAFFOLDED | `openShifts` can be logged per client (1727 to 1747). `nursesAssigned` array on client (351). No SOC date, no visit, no skill-to-order check. | SOC visit, handoff packet. |
| 16 | Admission closeout and ongoing-care obligations | SCAFFOLDED | PA renewal alerts and an "Authorization Renewal" workflow template (1515). Workflow is a step counter with no linkage to a client or authorization (2134, 2152). | Obligation register, linkage. |

## 2. Cross-cutting capabilities

| Capability | Class | Evidence | Gap |
|---|---|---|---|
| Data persistence | SCAFFOLDED | `localStorage.setItem` of the whole dataset, errors swallowed (419). One browser, one user. Clearing site data erases everything. | Server database. |
| Authentication | DESIGN-ONLY | None. A role dropdown sets `STATE.role` (299 to 302, 1615). Nothing reads `STATE.role`. | Real identity. |
| Authorization (permissions) | DESIGN-ONLY | No permission checks anywhere. Every role can edit and delete every record. | Role-based access. |
| Audit trail | SCAFFOLDED | `DB.audit` (514 to 517) is called only for employee create/update, client create/update, and generic delete (1674, 1675, 1697, 1698, 1911). Authorizations, shifts, incidents, credentials, complaints, hospital events, OT, workflows, and alert status changes are not audited. `user` is the dropdown text, not a person. Log is capped at 500 entries, editable in browser storage, and has no viewer. | Append-only, server-side, identity-bound audit. |
| Document storage | DESIGN-ONLY | No file storage. `credentials.document` is a typed filename (1804). | Storage, versions, preview, extraction, signatures. |
| Signature capture | DESIGN-ONLY | None. | Entire capability. |
| CSV import | SCAFFOLDED, MISLEADING | Preview works (2159 to 2169). `processImport` records "Success" and writes nothing (2170 to 2181). | Real import or removal of the claim. |
| CSV export | IMPLEMENTED | `exportCSV` builds and downloads CSV with quoting (2107 to 2129). PHI leaves the system with no audit entry. | Audit export events. |
| Expiry alerts | IMPLEMENTED | `generateAlerts` for PA, credentials, callouts, OT, missed visits, incidents (481 to 511). | Uses duplicated client PA date. |
| Workflows | SCAFFOLDED | Step counter with fixed templates. Not linked to a record. Completes on reaching last step without checks (2137 to 2140). | Linked, evidence-gated workflow. |
| Output encoding | DEFECT | All views build HTML with template strings and assign `innerHTML` with no escaping (for example 2001 renders `cl.notes`, 615 renders textarea value, 617 puts value inside an attribute). Stored text containing markup will execute. | Escape on output before any PHI or external input enters. |
| Third-party scripts | RISK | Chart.js from cdnjs and Tabler icons from jsDelivr load with no integrity attribute (7 to 8). A compromised CDN file could read all `localStorage` data. | SRI hashes or self-hosting before PHI. |

## 3. What this means

1. Of the 16 admissions processes, 0 are implemented, 6 are scaffolded at most, and 10 have no code.
2. The platform cannot hold PHI as built. No login, no permission enforcement, client-side storage, unescaped output, and no reliable audit. Any admissions feature built on this file inherits all five problems. See D-03.
3. The parts worth reusing are concepts, not code: the alert thresholds, the PA renewal steps, the skill vocabulary (Vent, Trach, G-Tube, Peds, Med Mgmt), and the coordinator model.

## 4. The five known concerns, checked against this repository

| Concern | Result here | Evidence | Carry-forward requirement |
|---|---|---|---|
| Intake screens say "read-only" but contain write handlers | NOT REPRODUCIBLE. No intake screen and no "read-only" label exist. The same defect class exists: the Import screen claims an outcome its handler does not perform (X-05). Also every list view mixes view and edit/delete buttons in one row (for example 1005 to 1008). | 1555, 2170 to 2181, 1005 to 1008 | A read-only module must contain zero write calls, proven by a test (see `04-workspace-spec.md`, section 7). |
| Referral conversion creates client, coverage, and referral linkage sequentially, partial failure | NOT REPRODUCIBLE. No referral or coverage entity and no conversion code. The underlying risk exists in a different form: client and authorization are created by separate forms with no shared transaction, and client delete orphans child rows (X-10). | 1698, 1769, 1908 to 1913 | Conversion must be one transaction or an idempotent, resumable saga. Acceptance tests in process 14. |
| Document registry metadata does not prove file storage, preview, extraction, or signature capture | CONFIRMED in kind. `credentials.document` is a filename string with no file behind it. No document registry exists. | 1804, 1812 | A requirement counts as met only when a stored file version, its hash, and a signature event exist (process 8). |
| Admission packets and standalone forms may overlap or disagree | CANNOT ASSESS. No packets or forms in the repo. | Inventory REQ-01 to REQ-11 | Phase 0 comparison method, roadmap P0-3. |
| Guardian authority under 18 and pediatric applicability under 21 are separate | CANNOT APPLY. No DOB field exists, so no age rule can run. Public sources confirm the two thresholds come from different law, and add a third (FAMIS under 19). | 1683 to 1688, `06-decision-register.md` R-09 to R-11 | Three separate computed flags, each with its own reference date (process 3 and 7). |
