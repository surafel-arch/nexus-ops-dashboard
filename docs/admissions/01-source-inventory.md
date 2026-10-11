# 01. Admissions Source-File Inventory

Status: discovery, read-only. Prepared 2026-10-11 on branch `claude/eloquent-bohr-y0os5v`.
Scope: repository `surafel-arch/nexus-ops-dashboard` at commit `66fc532`.

## 1. Headline

The repository does not contain the admission files the request lists. It holds one application file and one empty README. There is no `assets/` folder, no `docs/` folder (before this work), no `AGENTS.md`, no architecture document, no admission packet, no form, no schema, no database, and no referral, intake, episode, assessment, order, plan-of-care, or document component.

Every requested source document below is therefore recorded as NOT FOUND. Nothing in this plan treats a missing file as reviewed.

## 2. Files present in the repository

| ID | Path | Size | SHA-256 | Introduced | Notes |
|---|---|---|---|---|---|
| SRC-01 | `nexus_ops_v3.html` | 167,070 bytes, 2,195 lines | `aab4c1a06df1723e9229d1016e0f031d6202b05c9b50ad8a539762e5947f36c0` | `51cd1bc` 2026-05-14 "Add files via upload" | Single-file browser app titled "Nexus Health Solutions". All code, styles, seed data, and logic in one file. Version label "v3" in filename, storage key `nexus_db_v4` in code. |
| SRC-02 | `README.md` | 1 byte (a newline) | n/a | `66fc532` 2026-05-14 | Empty. |

### Git history observations

| ID | Commit | Observation |
|---|---|---|
| H-01 | `13057a6` "npx plugins add vercel/vercel-plugin" | The commit replaced README with a byte-identical copy of `nexus_ops_v3.html` (same SHA-256). The commit message does not describe the change. |
| H-02 | `66fc532` "Update README.md" | Emptied the README. No documentation has ever existed in the repo. |
| H-03 | Branches | Only `main` and `claude/eloquent-bohr-y0os5v` exist on the remote. No other branch carries admission files. |
| H-04 | Visibility | The repository is PUBLIC. Any completed admission form, packet with patient data, or real client record committed here would be publicly exposed. See decision D-04. |

### Other repositories checked

| Repo | Result |
|---|---|
| `surafel-arch/Nexus-Entertainment` | Read through the GitHub API (root listing, `CLAUDE.md`, `README.md`, `docs/` listing). Its own `CLAUDE.md` states it "is fully separate from nexus-ops-dashboard and shares no code, data, or accounts with it". It is an AI video product. Excluded from this analysis. |
| `surafel-arch/NOP` | Not inspected. The session's request to attach it was denied by the permission system. It was pushed on 2026-05-14, the same day as this repo. It may hold the admission files. See decision D-01. |

## 3. Requested sources: presence check

| ID | Requested source | Expected location | Result | Impact |
|---|---|---|---|---|
| REQ-01 | Admission packet A | `assets/` | NOT FOUND | Cannot extract fields, versions, or signature blocks. |
| REQ-02 | Admission packet B | `assets/` | NOT FOUND | Cannot compare the two packets. |
| REQ-03 | Initial clinical assessment form | `assets/` | NOT FOUND | Process 9 is specified from regulation only. |
| REQ-04 | Client orientation handbook | `assets/` | NOT FOUND | Process 8 content list is unverified. |
| REQ-05 | Client orientation policy | `assets/` | NOT FOUND | Same. |
| REQ-06 | Notice of privacy practices and acknowledgment | `assets/` | NOT FOUND | Same. |
| REQ-07 | Consent for treatment | `assets/` | NOT FOUND | Same. |
| REQ-08 | Client rights and responsibilities | `assets/` | NOT FOUND | Same. |
| REQ-09 | Release of information / authorization to disclose | `assets/` | NOT FOUND | Same. |
| REQ-10 | Admission, authorization, SOC supporting files | `assets/` | NOT FOUND | Same. |
| REQ-11 | Pediatric supporting files | `assets/` | NOT FOUND | Pediatric applicability rules come from public sources only. |
| REQ-12 | `AGENTS.md` | repo root or subfolders | NOT FOUND | No repo-specific agent rules to follow. |
| REQ-13 | Architecture documents | `docs/` | NOT FOUND | No established clinical lifecycle or canonical sources of truth exist in writing. This plan proposes them. It does not "follow" them. |

## 4. Entities found inside SRC-01

All data lives in browser `localStorage` under key `nexus_db_v4` (SRC-01 lines 338 to 427). Seed records use 555 phone numbers and pattern Medicaid IDs (`MA123456789`), which suggests synthetic data. I could not confirm that no browser holds real data under this key.

| Entity | Seed count | Fields relevant to admissions | Code reference |
|---|---|---|---|
| `clients` | 5 | `firstName`, `lastName`, `medicaidId`, `coordinatorId`, `authType`, `paExpDate`, `waiver`, `statePlan`, `skills`, `nursesAssigned`, `notes`. No DOB, address, sex, guardian, diagnosis, physician, payer other than Medicaid, language, or status. | 351 to 355, 1680 to 1700 |
| `authorizations` | 5 | `clientId`, `agency`, `cmContact`, `cmPhone`, `paExpDate`, `medicaidExp`, `libertyEnd`, `dcccActive`, `epofFaxed`, `epofReceived`, `waiver`, `statePlan`, `notes`. No authorization number, units, hours, start date, payer, or service code. | 378 to 384, 1750 to 1771 |
| `employees` | 6 | `role` (RN, LPN, HHA, CNA), `skills`, `status`. | 342 to 349 |
| `credentials` | 7 | `type`, `issueDate`, `expiryDate`, `document` (free-text filename). | 400 to 408, 1799 to 1816 |
| `openShifts` | 5 | `date`, `clientId`, `shift`, `type`, `status`, `missedVisit`. | 371 to 377 |
| `hospitalEvents` | 2 | `admissionDate` (hospital admission, not agency admission), `dischargeDate`, `status`. | 391 to 394, 1842 to 1862 |
| `workflows` | 0 | Four fixed templates. None for admission. | 1513 to 1517, 2150 |
| `auditLog` | 0 | `action`, `entity`, `recordId`, `changes`, `user`, `ts`. | 514 to 517 |
| `importHistory` | 0 | Import log entries. | 2175 |

## 5. Discrepancies found

| ID | Discrepancy | Evidence | Risk |
|---|---|---|---|
| X-01 | PA expiry stored twice. `clients.paExpDate` and `authorizations.paExpDate` are edited by separate forms and never synchronized. Alerts and stability scores read the client copy. The Authorizations view and PA report read the authorization copy. | 485, 440, 1685, 1696, 1217, 1755, 1767 | Two screens can show different expiry dates for the same client. A competing source of truth already exists. |
| X-02 | Waiver and State Plan flags stored twice, on client and on authorization. | 351, 379, 1687, 1758 | Same as X-01. |
| X-03 | Case manager stored twice: `authorizations.cmContact` and `hospitalEvents.caseManager`. | 379 to 383, 392 to 393 | Divergence on edit. |
| X-04 | Client profile shows only the first authorization found for a client. | 1974 | A client with two authorizations shows an arbitrary one. |
| X-05 | Import screen says "Duplicates are merged automatically" and logs `imported = records`, `status: 'Success'`. `processImport` writes no records and performs no duplicate detection. | 1555, 2170 to 2181 | Users can believe data was imported when nothing changed. Same defect class as "screens labeled read-only that write". |
| X-06 | Import drop zone says "Drop CSV or Excel file", the code rejects anything except `.csv`. | 1533, 2161 | Minor UI claim mismatch. |
| X-07 | Employee form field id is `coordinatorId`, stored property is `coordinator`. Client uses `coordinatorId`. | 1662, 1673, 351 | Naming inconsistency that will leak into any shared model. |
| X-08 | "Admission" in this app means hospital admission. | 1186, 1844 to 1860 | Term collision with agency admissions. See D-18. |
| X-09 | Logging a hospital event sets `hospitalActive = true`. Editing it to "Discharged" never clears the flag. | 1859 to 1860 | Return-home date, which can trigger a new initial assessment, is not reliable. |
| X-10 | Deleting a client removes only the client row. Authorizations, callouts, shifts, hospital events, incidents, and OT rows keep the dangling `clientId`. | 1908 to 1913 | Orphaned records, and the UI renders them as "Unknown" or a dash placeholder. |
| X-11 | Seed dates are in 2025. On 2026-10-11 every seeded PA and Medicaid expiry is in the past. | 351 to 355, 378 to 384 | Demo data shows every client as expired. Not an admissions defect, but it hides real alert behavior. |
| X-12 | `credentials.document` is a text box for a filename. No file is stored, previewed, extracted, or signed. | 1804, 1812 | Confirms the "metadata does not prove a file" concern for this codebase. |

## 6. Duplicate and version analysis of admission sources

Not possible. No admission source exists in the repository. The comparison method to apply once the files arrive is in `05-integration-roadmap.md`, Phase 0, deliverable P0-3.
