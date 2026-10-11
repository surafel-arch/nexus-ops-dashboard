# 03. Admissions Process Map

Status: design-only. Prepared 2026-10-11. No process below exists in code (see `02-capability-matrix.md`).

The source admission packets were not available (see `01-source-inventory.md`). Every field list below comes from public regulation, the existing dashboard data model, and standard home care practice. Each list must be reconciled with the real packets in Phase 0 before any build. Regulatory items carry an `R-` reference to `06-decision-register.md`, section B, which records whether each was verified against an official source.

## A. Shared definitions

### A1. Lifecycle

```
Referral ──► Pre-admission (processes 1 to 7) ──► Admission visit (8 to 11) ──► POC (12)
   │                                                                                │
   └──► Declined / Withdrawn (terminal, retained)                                   ▼
                                                    Readiness review (13) ──► Conversion (14)
                                                                                    │
                                                    Closeout (16) ◄── SOC scheduled and delivered (15)
```

One referral produces at most one client record. A returning person links to the existing client and gets a new episode. A referral never creates a second client.

### A2. Requirement state vocabulary

Every requirement in every process carries exactly one state. The workspace shows the state, the reason, and the evidence. A process is complete only when every applicable requirement is `complete` or validly `not_applicable`.

| State | Meaning | Must record |
|---|---|---|
| `not_started` | Nothing received or attempted. | Nothing. |
| `missing` | Required and expected, not received. | Date requested, from whom. |
| `in_review` | Received, awaiting reviewer decision. | Reviewer, received date, source document version. |
| `complete` | Reviewed and accepted. | Reviewer, date, evidence reference (document version, signature event, or verified data value). |
| `blocked` | Cannot proceed because another requirement is not complete. | The blocking requirement ID. |
| `declined` | The client or representative refused. | Who declined, their authority, what was offered, date, clinical or operational consequence. |
| `unavailable` | Exists in principle but cannot be obtained now (for example, practitioner unreachable, payer portal down). | Attempts with dates, next attempt, escalation owner. |
| `not_applicable` | The rule does not apply to this referral. | The rule ID, the fact that excludes it (for example, age 22), who decided. Never set by default. |
| `expired` | Was complete, the evidence has lapsed (for example, authorization end date passed). | Expiry date, replacement requirement. |
| `superseded` | Replaced by a newer version. | ID of the replacing record. |

Rules:
1. An uploaded template or a document title never sets `complete`. Only a reviewed, signed (where required) instance does.
2. `not_applicable` requires a rule reference. The system computes it where facts allow and a person confirms it.
3. `declined` is complete only for items the client may lawfully refuse. Declining a required consent to treatment blocks admission.

### A3. Three separate age flags

Computed from date of birth. Each flag has its own reference date and its own source of law. They are never combined into one "pediatric" boolean.

| Flag | Threshold | Source | Reference date | Controls |
|---|---|---|---|---|
| `is_minor` | under 18 | Va. Code 1-204 (R-10), subject to emancipation and other statutory exceptions | Every signature date and every consent event | Who may sign and exercise rights (process 7, 8) |
| `is_epsdt_age` | under 21 for Medicaid and FAMIS Plus, under 19 for FAMIS | Virginia DMAS EPSDT PDN manual (R-11) | Each service date and authorization period | Payer program and authorization route (process 3, 5) |
| `uses_pediatric_assessment` | Agency policy, threshold not yet set (D-07) | CMS S&C 04-45 allows agency-developed assessment for pediatric patients (R-03). The threshold age is an agency decision. | Assessment date | Which assessment instrument applies (process 9) |

Transitions: the system must flag clients who will cross 18, 19, or 21 within the current authorization or POC period. A client who turns 18 needs new signatures from themselves (or an adult guardian with a court order) from that date.

### A4. Signature and document-version record

A signed requirement is complete only with all of the following:

| Field | Purpose |
|---|---|
| `template_id`, `template_version` | Which form version was signed. |
| `instance_id` | The client-specific document. |
| `content_hash` | SHA-256 of the stored file or rendered content at the moment of signing. |
| `signer_person_id` | The person who signed. |
| `signer_capacity` | `self`, `parent`, `legal_guardian`, `health_care_agent`, `other_legal_representative`, `patient_selected_representative`, `agency_staff`, `practitioner`. |
| `authority_evidence_id` | Link to the authority record from process 7, required unless `signer_capacity = self` and the client is an adult with capacity. |
| `method` | `wet_scanned`, `electronic`, `verbal_documented` (only where a rule allows it). |
| `signed_at`, `received_at` | Signer time and agency receipt time. |
| `witness_person_id` | Only where policy requires it (D-09). |
| `language` | Language of the version signed (D-14). |

### A5. Audit event

Every create, update, state change, view of a sensitive record, export, and print writes one append-only event: `event_id`, `occurred_at` (server time), `actor_user_id` (authenticated), `actor_role`, `action`, `entity`, `entity_id`, `before`, `after`, `reason` (required for overrides, `not_applicable`, `declined`, and corrections), `source_document_version_id` where the change came from a document, `request_id`. The current `DB.audit` meets none of the identity, completeness, or immutability needs (see capability matrix).

### A6. Proposed canonical data owners

| Entity | Owns | Does not own | Exists today? |
|---|---|---|---|
| `Referral` | Source, received time, requested service, referral status, decision | Identity, coverage | No |
| `Person` | Legal name, DOB, sex, identifiers, contact | Clinical data | Partly, as `clients` |
| `Client` | Agency relationship to a Person, client number, status | Episodes | Partly, as `clients` |
| `Relationship` / `Representative` | Who acts for the client and under what authority | Signatures | No |
| `Coverage` | Payer, plan, member ID, program (State Plan, waiver type, EPSDT), eligibility dates | Authorizations | No. `medicaidId` sits on client. |
| `Authorization` | Auth number, service code, units or hours, start and end dates, status | Coverage | Partly. Must become sole owner of PA dates (X-01). |
| `Practitioner` | Name, NPI, license, state, verification | Orders | No |
| `Order` | Ordered services, frequency, practitioner, dates, authentication | POC | No |
| `Document` / `DocumentVersion` / `SignatureEvent` | Files, versions, hashes, signatures | Meaning of contents | No |
| `Assessment` | Instrument, version, findings, assessor, dates | Orders | No |
| `MedicationList`, `AllergyList`, `AdvanceDirective`, `EquipmentList` | Clinical lists at admission, with source and reconciliation | | No |
| `HomeSafetyAssessment`, `EmergencyPlan`, `CaregiverReadiness` | Environment and backup plans | | No |
| `PlanOfCare` | POC content, version, practitioner signature | Orders (references them) | No |
| `ReadinessReview` | Evaluator output snapshot and sign-off | Underlying data | No |
| `Episode` | Admission date, SOC date, service line, discharge | Client identity | No |
| `Visit` / `Shift` | Scheduled and actual care | | Partly, as `openShifts` |
| `AuditEvent` | Append-only log | | Partly, as `auditLog` |

## B. Roles

Roles in the current dropdown: Administrator, Executive, Director of Nursing, Staffing Coordinator, HR, Compliance Officer. Admissions needs three more: Intake Coordinator, Clinical Admissions RN, Authorization Specialist. Role names are proposals pending D-12.

## C. Processes

Each process lists: trigger and role, inputs, conditions, required fields and owner, review criteria and completion evidence, exception states, signatures and versions, audit, dependencies, acceptance criteria.

---

### P1. Referral receipt and tracking

- Trigger and role: a referral arrives (fax, phone, portal, email, hospital discharge planner, MCO care coordinator, DBHDS). Intake Coordinator.
- Inputs: referral document or call note, referral source contact, hospital discharge summary if any.
- Conditions: all service lines. Hospital discharge referrals start a 48-hour clock for the initial assessment visit if the agency operates under the HHA CoPs (R-01, D-02).
- Required fields and owner (`Referral`): referral ID, received timestamp, channel, source organization and contact, referred person name and DOB as stated, requested service and hours, payer as stated, ordering practitioner as stated, requested start date, urgency, hospital discharge date if any. Stated values remain "as stated" and never overwrite verified Person or Coverage data.
- Review criteria and evidence: minimum data set present (name, DOB, contact, requested service, source). Evidence is the stored referral document version.
- Exception states: `missing` minimum data with follow-up date. Referral statuses: `received`, `screening`, `pending_info`, `preliminarily_accepted`, `declined`, `withdrawn`, `converted`.
- Signatures and versions: none. The original referral file is stored as version 1 and is immutable.
- Audit: create, every status change with reason, every view by non-assigned staff.
- Dependencies: feeds P2 and P3. Response-time metrics feed the dashboard.
- Acceptance criteria:
  1. A referral can be recorded without creating a client.
  2. Every status change stores actor, time, and reason, and the history displays in order.
  3. A declined or withdrawn referral is retained, read-only, and searchable.
  4. Clock fields (received, discharge, requested SOC) display elapsed time against configured targets.

### P2. Identity verification and duplicate review

- Trigger and role: referral enters `screening`. Intake Coordinator.
- Inputs: referral, identity documents if provided, payer eligibility response.
- Conditions: all.
- Required fields and owner (`Person`): legal first, middle, last name, DOB, sex as recorded by payer, address, phone, Medicaid or member ID (on `Coverage`, not Person), prior client number if any.
- Review criteria and evidence: system proposes candidate matches by name plus DOB, member ID, phone, and address. A person confirms one outcome: `new_person`, `existing_person` (link), or `needs_review`. Medicaid ID alone is not a sufficient match key, because IDs can change and private-pay clients have none (D-05).
- Exception states: `needs_review` blocks P14. `unavailable` when DOB cannot be confirmed.
- Signatures and versions: none.
- Audit: each match decision with candidates shown and the chosen outcome. Merges require a second reviewer and are reversible by audit trail.
- Dependencies: blocks P3 age flags and P14 conversion.
- Acceptance criteria:
  1. Creating a referral for a person whose name and DOB match an existing Person shows the candidate before any client can be created.
  2. Conversion is impossible while the match decision is `needs_review`.
  3. A returning client gets a new episode on the existing client record, never a second client.

### P3. Service-line, age, and payer classification

- Trigger and role: identity confirmed. Intake Coordinator, confirmed by Clinical Admissions RN.
- Inputs: Person DOB, requested service, coverage as stated.
- Conditions: service lines in current data are private duty nursing at 12, 16, or 24 hours (RN or LPN) and aide services (HHA, CNA). Payer programs seen: State Plan and waiver (1687). Other payers are unverified (D-02).
- Required fields: service line, discipline(s), requested hours, payer program, the three age flags from A3 with computed values and next transition date.
- Review criteria and evidence: computed flags shown with DOB source. Payer program confirmed in P5.
- Exception states: `blocked` until DOB confirmed. `in_review` for any client within 90 days of an age transition (threshold is a proposal).
- Signatures and versions: none.
- Audit: classification set and each change.
- Dependencies: drives which requirements apply in P5, P7, P8, P9.
- Acceptance criteria:
  1. A 17-year-old Medicaid client shows `is_minor = true`, `is_epsdt_age = true`.
  2. A 19-year-old Medicaid client shows `is_minor = false`, `is_epsdt_age = true`, and signature requirements route to the client or an adult guardian, not a parent.
  3. A 20-year-old FAMIS (not FAMIS Plus) client shows `is_epsdt_age = false` once the FAMIS under-19 rule is confirmed (R-11).
  4. The pediatric assessment flag reads from a configurable policy value, not a hard-coded 21.

### P4. Agency capability and preliminary acceptance

- Trigger and role: P3 done. Clinical Admissions RN recommends, Director of Nursing decides (D-12).
- Inputs: required skills (Vent, Trach, G-Tube, Peds, Med Mgmt, Personal Care are the current vocabulary), hours, location, start date, staff roster with skills and credentials, current open shifts.
- Conditions: all.
- Required fields: required skills, service area check, staffing feasibility (named candidate staff or "none"), decision (`accept_pending`, `decline`), reason code, decided by, decided at.
- Review criteria and evidence: each required skill has at least one active, credentialed staff member with current credentials and capacity. The dashboard's coverage and burnout data inform this but do not decide it.
- Exception states: `declined` by agency with reason. `unavailable` staffing with re-review date.
- Signatures and versions: decision recorded by authenticated reviewer. No client signature.
- Audit: decision and reason. Declines must be reportable by reason for non-discrimination review.
- Dependencies: P1 status. Feeds P15.
- Acceptance criteria:
  1. A decision cannot be saved without a reason code.
  2. A referral requiring "Vent" shows the count of active, vent-skilled staff whose credentials are current on the requested start date.
  3. An expired credential excludes that staff member from the feasibility count.

### P5. Eligibility, coverage, and authorization

- Trigger and role: preliminary acceptance. Authorization Specialist.
- Inputs: payer eligibility response, MCO or DMAS or DBHDS authorization, DMAS-62 for EPSDT PDN (R-11), case manager contact.
- Conditions: Virginia EPSDT PDN authorization routes differ by program: MCO for most managed care members, DBHDS for CL and FIS waiver members, DMAS or contractor for some cases (R-11, verified against a 2022 manual, currency unverified). Physician reassessment every 6 months for EPSDT PDN (R-11).
- Required fields: `Coverage` (payer, plan, member ID, program, effective and end dates, verification date and method). `Authorization` (number, payer, service code, units or hours, start, end, status, case manager). The current fields `libertyEnd`, `dcccActive`, `epofFaxed`, `epofReceived` stay unmapped until D-08 defines them.
- Review criteria and evidence: eligibility verified on or after a configured lookback before SOC. Authorization covers the planned SOC date and the planned hours.
- Exception states: `missing` authorization blocks SOC unless an approved policy allows otherwise. `expired` when end date passes. `unavailable` when the payer cannot respond.
- Signatures and versions: none from client. The authorization letter or portal record is stored as a document version.
- Audit: each eligibility check result, each authorization change.
- Dependencies: P3 program. Blocks P13 and P15. Feeds PA expiry alerts, which must read `Authorization` only (fixes X-01).
- Acceptance criteria:
  1. PA end date exists in exactly one place. Alerts, profile, reports, and scores all read it from `Authorization`.
  2. Planned hours above authorized hours raise a blocking finding.
  3. An EPSDT PDN authorization without a DMAS-62 document version on file shows `missing` for that requirement.

### P6. Practitioner verification and order review

- Trigger and role: order received. Clinical Admissions RN.
- Inputs: signed order or referral order, practitioner identity.
- Conditions: which practitioner types may order these services in Virginia is unverified (D-10). Under the HHA CoPs, orders come from a physician or allowed practitioner (R-06).
- Required fields: `Practitioner` (name, NPI, license number, license state, license status and verification date, exclusion check date). `Order` (services, discipline, frequency and hours, duration, diagnoses, start date, practitioner, signature status, verbal order details if verbal).
- Review criteria and evidence: license active on order date. Order services match the referral and the authorization. Verbal orders documented with date, time, and receiver, then authenticated by the practitioner within the agency's set time limit (R-06, D-10).
- Exception states: `unavailable` practitioner with attempts log. `missing` signature. `blocked` if license verification fails.
- Signatures and versions: practitioner signature on the order. Verbal order record signed by the receiving nurse.
- Audit: verification lookups, order receipt, authentication.
- Dependencies: feeds P12. Blocks P13.
- Acceptance criteria:
  1. An order from a practitioner with no verification record cannot be marked `complete`.
  2. An unsigned verbal order older than the configured limit appears as a blocking finding.
  3. A mismatch between ordered hours and authorized hours appears on both P5 and P6.

### P7. Guardian or representative authority

- Trigger and role: P3 sets `is_minor`, or the referral names a representative, or the client may lack capacity. Clinical Admissions RN, Compliance Officer for disputes.
- Inputs: birth certificate or other parentage evidence where policy requires, custody orders, guardianship or conservatorship orders, advance medical directive naming an agent, power of attorney.
- Conditions:
  - Under 18: a parent generally acts as personal representative where state law gives authority (R-09). Exceptions: emancipation, court orders, custody limits, abuse or endangerment concerns (R-09).
  - 18 and over: the client signs for themselves unless a court order or valid directive shows otherwise (R-05, R-10). A parent of an adult has no automatic authority.
  - Under the HHA CoPs, a court-appointed representative exercises rights where a court has found incapacity (R-05).
- Required fields: `Representative` (person, relationship, authority type, authority document version, scope, limits, effective and end dates, verified by, verified on).
- Review criteria and evidence: an authority type that requires a document has a stored version reviewed by a named staff member. Scope covers the decisions in this admission (consent, privacy, financial).
- Exception states: `missing` authority document blocks every signature that depends on it. `in_review` for conflicting claims (for example, two parents with a custody order).
- Signatures and versions: the authority document is stored and versioned. It is not itself signed by the agency.
- Audit: each authority record, review, and change. Each use of authority on a signature links to it (A4).
- Dependencies: blocks P8 signatures. Re-runs automatically on the 18th birthday.
- Acceptance criteria:
  1. A signature by a `parent` on a client aged 18 or over on the signature date is rejected.
  2. A signature by a `legal_guardian` with no reviewed authority document is rejected.
  3. Turning 18 marks all ongoing consents signed by a parent as needing re-execution and lists them.

### P8. Orientation, consents, privacy, rights, financial agreement, and disclosures

- Trigger and role: initial visit scheduled. Clinical Admissions RN delivers, Intake Coordinator tracks.
- Inputs: current template versions of each form (unavailable today, REQ-04 to REQ-09).
- Conditions and requirement set (each one a separate requirement with its own state):

| Req | Item | Timing anchor | Source status |
|---|---|---|---|
| 8.1 | Notice of rights and responsibilities, plus transfer and discharge policies | At initial evaluation visit, before care (HHA CoP). Upon admission (Va. HCO). | R-04 verified, R-12 partial |
| 8.2 | Signature confirming receipt of rights notice | Same visit | R-04 verified |
| 8.3 | Verbal notice of rights in preferred language | By end of second skilled visit | R-04 verified |
| 8.4 | Written notice to a patient-selected representative | Within 4 business days of initial evaluation visit | R-04 verified |
| 8.5 | Administrator contact for complaints | Same visit | R-04 verified |
| 8.6 | OASIS privacy notice | Same visit, only where OASIS applies | R-04 verified, applicability D-02 |
| 8.7 | Notice of Privacy Practices, with good-faith acknowledgment | By first service delivery | R-08 verified, acknowledgment rule status unverified |
| 8.8 | Advance directive information and agency policy | Before coming under care | R-07 verified |
| 8.9 | Consent to treatment | Before care | Content unverified (REQ-07) |
| 8.10 | Financial disclosure: what payer covers and what client may owe | Before care | R-12 partial |
| 8.11 | Release of information authorizations, one per recipient and purpose | When disclosure is needed | R-16 unverified |
| 8.12 | Orientation handbook delivered | Agency policy | REQ-04 unverified |

- Required fields: one `Document` instance per item, linked to template version, with A4 signature record where signed.
- Review criteria and evidence: a stored, signed instance of the current template version, signed by someone with authority from P7. Delivery-only items need a delivery record (who, when, method, language).
- Exception states: `declined` is allowed for 8.7 acknowledgment (record the good-faith effort), 8.8 (client may decline to execute a directive), 8.11. `declined` on 8.9 blocks admission. `unavailable` for a representative who cannot attend, with a dated plan.
- Signatures and versions: A4 for every signed item. A template version change after signing does not invalidate the signature but must be flagged for policy review.
- Audit: delivery, signature, refusal, and every view or download of signed documents.
- Dependencies: P7. Blocks P13. Feeds P16 (re-acknowledgment when templates change).
- Acceptance criteria:
  1. Uploading a blank template never marks any 8.x requirement complete.
  2. A signed document with no `content_hash` or no stored file cannot be marked complete.
  3. 8.3 shows a due date computed from the second skilled visit and turns `missing` if that visit completes without it.
  4. 8.4 shows a due date of four business days after the initial evaluation visit.

### P9. Initial clinical assessment

- Trigger and role: accepted referral with order. Clinical Admissions RN (R-01).
- Inputs: referral clinical data, discharge summary, order, the agency assessment instrument (REQ-03 unavailable).
- Conditions: under the HHA CoPs, initial assessment within 48 hours of referral or return home, or on the ordered SOC date. Comprehensive assessment within 5 calendar days after SOC (R-01, R-02). Pediatric patients may use an agency-developed instrument (R-03). Whether these CoPs apply depends on D-02. Hospital return after an inpatient stay (current `hospitalEvents`) may restart this requirement.
- Required fields: `Assessment` (instrument ID and version, type (initial, comprehensive, or resumption), assessor, visit date and time, findings, homebound status where relevant, skills required, risk scores).
- Review criteria and evidence: completed instrument version signed by the assessing RN within the deadline.
- Exception states: `unavailable` client not home (attempt log). `blocked` without order. `expired` if SOC slips past validity window (policy D-11).
- Signatures and versions: assessor signature. Instrument version recorded.
- Audit: creation, edits after signature (late entries flagged), deadline status.
- Dependencies: P6. Feeds P10, P11, P12.
- Acceptance criteria:
  1. Assessment deadline displays and turns red at the configured threshold.
  2. The instrument chosen matches the `uses_pediatric_assessment` flag on the assessment date.
  3. Edits after signature create a new version with the reason.

### P10. Medication reconciliation, allergies, advance directives, equipment

- Trigger and role: during P9. Clinical Admissions RN.
- Inputs: discharge medication list, pharmacy labels, client or caregiver report, practitioner orders, DME supplier info.
- Conditions: all. Drug regimen review is part of the comprehensive assessment under the HHA CoPs (R-02, partially verified).
- Required fields: medications (name, dose, route, frequency, source, prescriber, discrepancy and resolution), allergies (agent, reaction, severity, or explicit "no known allergies" with source), advance directive (exists yes/no/unknown, type, copy on file, agent), equipment (ventilator, trach supplies, feeding pump, suction, oxygen with supplier, model, settings where ordered, backup).
- Review criteria and evidence: each discrepancy resolved with the practitioner. Allergies never blank: blank is `missing`, not "none".
- Exception states: `unavailable` practitioner for discrepancy, `declined` directive.
- Signatures and versions: RN signature on reconciliation. Directive copy stored as document version.
- Audit: each list version.
- Dependencies: P9. Feeds P12 and P15 handoff.
- Acceptance criteria:
  1. An empty allergy list cannot be saved as complete. Only an explicit NKA entry with a source can.
  2. An unresolved medication discrepancy blocks P13.
  3. Ventilator-dependent clients show equipment and backup power fields as required.

### P11. Home safety, emergency preparedness, caregiver readiness

- Trigger and role: during P9. Clinical Admissions RN.
- Inputs: home visit observations, caregiver interview.
- Conditions: all. Ventilator and trach clients need power backup and utility notification items (policy, unverified).
- Required fields: home safety findings and actions, emergency plan (contacts, evacuation, power outage plan, priority level), trained caregiver(s) for hours without nursing, caregiver competency checks for each skill.
- Review criteria and evidence: signed checklist. Caregiver competencies demonstrated, not only discussed.
- Exception states: `declined` modifications with risk documented, `unavailable` caregiver with plan.
- Signatures and versions: RN and caregiver signatures on competency records.
- Audit: standard.
- Dependencies: feeds P12 and P15.
- Acceptance criteria:
  1. A 12 or 16 hour client without a trained caregiver for uncovered hours shows a blocking finding.
  2. Emergency priority level is required for ventilator-dependent clients.

### P12. Plan-of-care preparation and approval

- Trigger and role: P9 to P11 complete. Clinical Admissions RN drafts, practitioner signs.
- Inputs: orders, assessment, medication list, safety findings, authorization.
- Conditions: under the HHA CoPs the POC is individualized, signed by a physician or allowed practitioner, includes listed elements, and all orders including verbal orders appear in it (R-06). The meaning of "ePOF" in the current data must be resolved before mapping (D-08).
- Required fields: `PlanOfCare` (version, effective dates, diagnoses, services and frequency, hours by discipline, goals, interventions, medications reference, equipment, safety measures, advance directive reference, practitioner, sent date, signed date).
- Review criteria and evidence: POC services and hours fall inside the authorization. Practitioner signature stored.
- Exception states: `in_review` sent unsigned, `missing` signature past policy limit.
- Signatures and versions: practitioner signature. Each change is a new version.
- Audit: each version, send, receipt, and signature.
- Dependencies: P5, P6, P9 to P11. Blocks P13 (or allows SOC on verbal orders where policy allows, D-19).
- Acceptance criteria:
  1. POC hours above authorized hours block approval.
  2. A signed POC is immutable. Edits create a new version.

### P13. Final admissions readiness review

- Trigger and role: all prior processes reach a terminal state. Director of Nursing signs off.
- Inputs: evaluator output across P1 to P12.
- Conditions: all.
- Required fields: `ReadinessReview` (evaluator version, snapshot of every requirement state, findings, decision `ready`, `not_ready`, `ready_with_exceptions`, approver, time, exception justifications).
- Review criteria and evidence: zero blocking findings, or each one covered by an authorized exception with reason.
- Exception states: `not_ready` returns to the failing process.
- Signatures and versions: approver sign-off, evaluator version recorded.
- Audit: snapshot stored, so later reviewers see what the approver saw.
- Dependencies: everything above. Gates P14.
- Acceptance criteria:
  1. The evaluator is a pure function: same inputs give the same output, with a test suite.
  2. The snapshot is stored and cannot change after sign-off.
  3. An exception cannot be recorded by the same person who requested it (D-19).

### P14. Referral-to-client and episode handoff

- Trigger and role: readiness `ready`. Intake Coordinator.
- Inputs: confirmed Person, Coverage, Authorization, Representative records, readiness snapshot.
- Conditions: all.
- Required fields: `Client` (new or existing per P2), `Episode` (admission date, planned SOC date, service line, referral ID), links from Coverage and Authorization to Client.
- Review criteria and evidence: one transaction. Either every record and link exists, or none does.
- Exception states: `conversion_incomplete` only if a saga design is chosen, with the next step and retry key stored.
- Signatures and versions: none.
- Audit: one conversion event listing every record created or linked.
- Dependencies: P13. Feeds P15.
- Acceptance criteria:
  1. Injected failure after the client insert leaves no client and no link (transaction), or leaves the referral in `conversion_incomplete` with a resumable step (saga). It never leaves an unlinked client.
  2. Running conversion twice for the same referral produces one client and one episode (idempotency key = referral ID).
  3. Conversion of a referral linked to an existing Person creates a new episode on the existing client.

### P15. Start-of-care scheduling and staff handoff

- Trigger and role: conversion done. Staffing Coordinator.
- Inputs: POC hours, required skills, staff roster, credentials, authorization dates.
- Conditions: EVV may apply to some services (R-15, PDN applicability unverified, D-17).
- Required fields: SOC visit (date, time, assigned staff, discipline), recurring schedule, handoff packet (POC version, medication list version, allergies, equipment, emergency plan, caregiver contacts, special instructions).
- Review criteria and evidence: assigned staff have every required skill and current credentials on each scheduled date. Schedule stays within authorized hours and dates.
- Exception states: `unavailable` staffing creates open shifts (existing `openShifts` entity can carry this).
- Signatures and versions: staff acknowledgment of handoff packet version.
- Audit: schedule creation, assignment, acknowledgment.
- Dependencies: P12, P14. Feeds existing staffing, callout, and OT views.
- Acceptance criteria:
  1. Assigning a staff member whose credential expires before a scheduled date raises a finding.
  2. Scheduled hours above authorized hours for any week raise a blocking finding.
  3. The handoff packet references specific versions, so later edits do not silently change what staff acknowledged.

### P16. Admission closeout and ongoing-care obligations

- Trigger and role: SOC visit delivered. Clinical Admissions RN closes, Compliance Officer audits.
- Inputs: SOC visit record, outstanding items.
- Conditions: carry-forward obligations include comprehensive assessment deadline (R-02), verbal rights notice by second skilled visit (R-04), representative notice in 4 business days (R-04), practitioner signature on verbal orders (R-06), EPSDT 6-month reassessment (R-11), authorization renewal before end date, age transitions (A3), template re-acknowledgment.
- Required fields: closeout checklist, obligation register entries (type, due date, owner, linked requirement).
- Review criteria and evidence: every open item converted to a dated obligation with an owner.
- Exception states: `missing` obligations past due raise alerts in the existing Alert Center.
- Signatures and versions: closeout sign-off.
- Audit: closeout and each obligation status change.
- Dependencies: feeds the existing alerts and workflow features. The PA renewal workflow should attach to an `Authorization` ID instead of free text.
- Acceptance criteria:
  1. Closeout is impossible while any carry-forward item lacks a due date and owner.
  2. Each obligation appears in the Alert Center at its configured lead time.
