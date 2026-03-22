# Data Dictionaries (DFD and ERD)

## DFD Data Dictionary (Level 1 only)

Notation:
- **Connection** uses `From → To` with `E1`, process IDs (`1.0`–`5.0`), and data stores (`D1`–`D7`) as defined in `DFD_LVL1.md`.
- **Types** are derived from the Prisma schema in `packages/db/prisma/schema.prisma` when unambiguous; otherwise they are described as `string/object/array`.

### External Entity ↔ Processes

#### Login Request
- **Connection:** `E1 → 1.0`
- **Data items:**
  - `email`
  - `password`
- **Types:** `email: string`, `password: string`
- **Description:** User submits credentials for authentication.
- **Associated data model:** `User` (`User.email`, `User.passwordHash` via verification)

#### Auth Response
- **Connection:** `1.0 → E1`
- **Data items:**
  - `auth token`
  - `basic user info`
- **Types:** `auth token: string`, `basic user info: object` (e.g., `id: UUID`, `full_name: string`)
- **Description:** Backend returns a JWT/access token and minimal user details after successful login.
- **Associated data model:** `User`

#### Patient Management Commands
- **Connection:** `E1 → 2.0`
- **Data items:**
  - patient create/update/archive requests
  - search criteria
- **Types:** `object` (patient profile fields + search fields)
- **Description:** Creates/updates/archives a patient record, or filters existing records for listing.
- **Associated data model:** `Student` (represents all patient types via `patient_type`)

#### Patient List / Details
- **Connection:** `2.0 → E1`
- **Data items:**
  - filtered patient list(s)
  - patient profile details (including patient type)
- **Types:** `array<object>`, each item containing patient fields
- **Description:** Returns patient records based on search/filter criteria.
- **Associated data model:** `Student`

#### Visit Submission
- **Connection:** `E1 → 3.0`
- **Data items:**
  - `patient record id`
  - `time_in`
  - `time_out` (optional)
  - `complaint`
  - `action_taken`
  - `remarks` (optional)
  - `release info` (optional group)
  - `dispensed medicines` list
- **Types:** `patient record id: UUID (string)`, `time_in: datetime`, `time_out: datetime?`, `complaint/action_taken: string`, `remarks: string?`, `release info: object?`, `dispensed medicines: array<object>`
- **Description:** Clinic In-Charge submits a visit record and optional dispensing lines.
- **Associated data model:** `Visit`, `VisitMedicine`

#### Visit Confirmation
- **Connection:** `3.0 → E1`
- **Data items:**
  - saved visit summary
  - optionally includes inventory impact
- **Types:** `object` (visit + possibly related dispensing/inventory info)
- **Description:** Confirms that the visit record (and related dispensing) was persisted.
- **Associated data model:** `Visit`, `VisitMedicine`, `InventoryBatch`, `StockTransaction`

#### Inventory Management Commands
- **Connection:** `E1 → 4.0`
- **Data items:**
  - create/update medicine (catalog)
  - stock-in instructions (additions only)
- **Types:** `object`
  - `medicine`: `name: string`, `description/purpose: string?`, `reorder_threshold: int`, `is_active: boolean`
  - `stock-in`: `medicine_id: UUID`, `batch_number: string?`, `expiration_date: date?`, `quantity: int`, `notes: string?`
- **Description:** Allows the Clinic In-Charge to maintain the medicine catalog and add stock to batches.
- **Associated data model:** `Medicine`, `InventoryBatch`, `StockTransaction`

#### Inventory Status & Alerts
- **Connection:** `4.0 → E1`
- **Data items:**
  - current stock snapshot
  - low-stock list
  - expiring batches
- **Types:** `object/array<object>` (derived from `InventoryBatch`, `Medicine`, and inventory transactions)
- **Description:** Returns current inventory levels and alert indicators for the dashboard/UI.
- **Associated data model:** `InventoryBatch`, `Medicine`, `StockTransaction`

#### Analytics Request
- **Connection:** `E1 → 5.0`
- **Data items:**
  - analytics/report type
  - date range
  - presets like `rangePreset`, `trendMonths`
  - other filters
- **Types:** `object`
  - `date range: object` (start/end dates)
  - `rangePreset: string`, `trendMonths/topMedicinesLimit: int?`
- **Description:** Requests analytics/dashboards for a selected period.
- **Associated data model:** `Student`, `Visit`, `VisitMedicine`, `InventoryBatch`, `StockTransaction`, `Medicine`

#### Dashboard Analytics Data
- **Connection:** `5.0 → E1`
- **Data items:**
  - clinic summary metrics
  - chart-ready series (time-series)
  - medicine usage rankings
  - low-stock/expiring lists
- **Types:** `object` with nested `array/object` series
- **Description:** Returns computed analytics payload for dashboard widgets and charts.
- **Associated data model:** Derived from `Student`, `Visit`, `VisitMedicine`, `InventoryBatch`, `StockTransaction`, `Medicine`

---

### Processes ↔ Data Stores (Level 1)

#### User Credentials & Profile Access
- **Connection:** `1.0 ↔ D1`
- **Data items:**
  - user record lookup by `email`
  - password verification against stored hash
  - optional login activity metadata update (`updated_at`/timestamps)
- **Types:** `email: string`, `passwordHash: string`, `timestamps: datetime`
- **Description:** Auth service reads the user account and verifies credentials.
- **Associated data model:** `User`

#### Patient Record Write
- **Connection:** `2.0 → D2`
- **Data items (patient profile fields):**
  - `full_name`
  - `patient_type`
  - classification-specific fields (grade/strand/section/schoolYear OR department/position)
  - medical and contact fields
  - `is_archived` (archive/unarchive)
  - timestamps (created/updated)
- **Types:** `object` (fields are `string?`, `date?`, `boolean`, and `timestamps`)
- **Description:** Inserts, updates, or archives a patient profile.
- **Associated data model:** `Student`

#### Patient Record Read
- **Connection:** `2.0 ← D2`
- **Data items:**
  - patient list(s)
  - individual patient profile (including `patient_type`)
- **Types:** `array<object>`, `object`
- **Description:** Retrieves patient records by filters/search criteria.
- **Associated data model:** `Student`

#### Visit Record Write
- **Connection:** `3.0 → D3`
- **Data items:**
  - `patient record id`
  - `time_in`
  - `time_out` (optional)
  - `complaint`
  - `action_taken`
  - `remarks` (optional)
  - release details: `released_to_name`, `released_to_relationship`, `release_time` (optional)
  - `logged_by_user_id` (assigned from authenticated user context)
- **Types:** `UUID`, `datetime`, `string`, `string?`, `datetime?`
- **Description:** Creates/updates the visit record for the selected patient.
- **Associated data model:** `Visit`

#### Visit Record Read
- **Connection:** `3.0 ← D3`
- **Data items:**
  - visit record details for viewing
  - visit record details for analytics
- **Types:** `object` / `array<object>`
- **Description:** Reads visit records from the database.
- **Associated data model:** `Visit`

#### Dispensed Medicines Recording
- **Connection:** `3.0 → D4`
- **Data items (dispensing lines):**
  - `visit_id`
  - `medicine_id`
  - `batch_id` (optional)
  - `quantity_dispensed`
- **Types:** `UUID`, `UUID`, `UUID?`, `int (>0)`
- **Description:** Stores the medicines dispensed during the visit.
- **Associated data model:** `VisitMedicine`

#### Batch Stock Access
- **Connection:** `3.0 ↔ D5`
- **Data items:**
  - available batch info: `batch_id`, `expiration_date`, `quantity_on_hand` (read)
  - updated `quantity_on_hand` after dispensing (write)
- **Types:** `UUID`, `date?`, `int`
- **Description:** Reads batch quantities/expiry and updates the batch quantity when medicines are dispensed.
- **Associated data model:** `InventoryBatch`

#### OUT Stock Transactions
- **Connection:** `3.0 → D6`
- **Data items:**
  - `batch_id`
  - `txn_type = OUT`
  - `quantity` (dispensed quantity)
  - `reference_visit_id` (links the stock-out to the visit)
  - optional `notes`
- **Types:** `UUID`, `enum`, `int`, `UUID?`, `string?`
- **Description:** Writes the inventory audit ledger entries for stock reductions caused by dispensing.
- **Associated data model:** `StockTransaction`

#### Medicine Master Data Access
- **Connection:** `4.0 ↔ D7`
- **Data items:**
  - medicine catalog fields: `name`, `description`, `purpose`, `reorder_threshold`, `is_active`
  - timestamps (created/updated)
- **Types:** `name: string`, `description/purpose: string?`, `reorder_threshold: int`, `is_active: boolean`, `timestamps: datetime`
- **Description:** Creates/updates medicine definitions and reads medicines for forms/lists.
- **Associated data model:** `Medicine`

#### Batch Stock Maintenance (additions only)
- **Connection:** `4.0 ↔ D5`
- **Data items:**
  - batch creation/increase: `medicine_id`, `batch_number`, `expiration_date`, and resulting `quantity_on_hand`
- **Types:** `UUID`, `string?`, `date?`, `int`
- **Description:** Stock-in only. Adds quantities to inventory batches (no manual decrement from this process).
- **Associated data model:** `InventoryBatch`

#### IN Stock Transactions
- **Connection:** `4.0 → D6`
- **Data items:**
  - `batch_id`
  - `txn_type = IN`
  - `quantity` added
  - optional `reference_visit_id` (typically null for stock-in)
  - optional `notes`
- **Types:** `UUID`, `enum`, `int`, `UUID?`, `string?`
- **Description:** Writes stock-in ledger entries for inventory additions.
- **Associated data model:** `StockTransaction`

#### Clinic Activity Data
- **Connection:** `5.0 ← D2, D3, D4`
- **Data items:**
  - patient data (including `patient_type`)
  - visit records within a date range
  - dispensed medicine lines per visit within the date range
- **Types:** `array<object>` grouped by time and/or patient classification
- **Description:** Source data used to compute utilization metrics, trends, and breakdowns.
- **Associated data model:** `Student`, `Visit`, `VisitMedicine`

#### Inventory & Consumption Data
- **Connection:** `5.0 ← D5, D6, D7`
- **Data items:**
  - batch stock levels and expiration data (`quantity_on_hand`, `expiration_date`)
  - stock transaction ledger within the date range (**IN** from stock-in and **OUT** from visit dispensing)
  - medicine definitions and reorder thresholds
- **Types:** `array<object>` grouped by medicine/batch/time
- **Description:** Source data used to compute consumption analytics and low-stock/expiring indicators.
- **Associated data model:** `InventoryBatch`, `StockTransaction`, `Medicine`

---

## ERD Data Dictionary (Full attributes)

Naming note:
- The UI/DFD uses the term **Patients**, but the database entity is `Student` stored in the `students` table. Different patient types are distinguished by `patient_type` (e.g., Student / Teacher / NTP).

### Enums

#### TransactionType (`stock_transactions.txn_type`)
- `IN`
- `OUT`
- `ADJUST`

#### Disposition (`visits.disposition`)
- `RETURNED_TO_CLASS`
- `RETURNED_TO_WORK`
- `SENT_HOME`
- `SENT_TO_HOSPITAL`

---

### ReferenceData (`reference_data`)
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `category` | `category` | String | No | part of unique(cat,value) |
| `value` | `value` | String | No | part of unique(cat,value) |
| `label` | `label` | String | No | display label |
| `parentValue` | `parent_value` | String | Yes | nullable |
| `sortOrder` | `sort_order` | Int | No | default 0 |
| `isActive` | `is_active` | Boolean | No | default true |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |
| `updatedAt` | `updated_at` | DateTime (timestamptz) | No | `@updatedAt` |

**Table map:** `@@map("reference_data")`  
**Unique constraint:** `@@unique([category, value])`

---

### User (`users`)
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `email` | `email` | String | No | Unique |
| `passwordHash` | `password_hash` | String | No | hashed password storage |
| `fullName` | `full_name` | String | No | user display name |
| `isActive` | `is_active` | Boolean | No | default true |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |
| `updatedAt` | `updated_at` | DateTime (timestamptz) | No | `@updatedAt` |

**Table map:** `@@map("users")`

---

### Student (`students`)  *(Patient profiles)*
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `fullName` | `full_name` | String | No | patient name |
| `patientType` | `patient_type` | String | No | default `"Student"`; distinguishes Student/Teacher/NTP |
| `gradeLevel` | `grade_level` | String | Yes | nullable |
| `strand` | `strand` | String | Yes | nullable |
| `section` | `section` | String | Yes | nullable |
| `schoolYear` | `school_year` | String | Yes | nullable |
| `department` | `department` | String | Yes | nullable (Teacher/NTP) |
| `position` | `position` | String | Yes | nullable (Teacher/NTP) |
| `dateOfBirth` | `date_of_birth` | Date | Yes | `@db.Date` nullable |
| `gender` | `gender` | String | Yes | nullable |
| `knownMedicalConditions` | `known_medical_conditions` | String | Yes | nullable |
| `contactName` | `contact_name` | String | Yes | nullable |
| `contactRelationship` | `contact_relationship` | String | Yes | nullable |
| `contactNumber` | `contact_number` | String | Yes | nullable |
| `isArchived` | `is_archived` | Boolean | No | default false |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |
| `updatedAt` | `updated_at` | DateTime (timestamptz) | No | `@updatedAt` |

**Table map:** `@@map("students")`

---

### Medicine (`medicines`)
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `name` | `name` | String | No | Unique |
| `description` | `description` | String | Yes | nullable |
| `purpose` | `purpose` | String | Yes | nullable |
| `reorderThreshold` | `reorder_threshold` | Int | No | default 0 |
| `isActive` | `is_active` | Boolean | No | default true |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |
| `updatedAt` | `updated_at` | DateTime (timestamptz) | No | `@updatedAt` |

**Table map:** `@@map("medicines")`

---

### InventoryBatch (`inventory_batches`)
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `medicineId` | `medicine_id` | String (UUID) | No | FK → `Medicine.id` |
| `batchNumber` | `batch_number` | String | Yes | nullable |
| `expirationDate` | `expiration_date` | Date | Yes | `@db.Date` nullable |
| `quantityOnHand` | `quantity_on_hand` | Int | No | default 0 |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |
| `updatedAt` | `updated_at` | DateTime (timestamptz) | No | `@updatedAt` |

**Table map:** `@@map("inventory_batches")`  
**Unique constraint:** `@@unique([medicineId, batchNumber, expirationDate], name: "uq_batch")`

---

### StockTransaction (`stock_transactions`)
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `batchId` | `batch_id` | String (UUID) | No | FK → `InventoryBatch.id` |
| `txnType` | `txn_type` | TransactionType | No | enum (`IN`/`OUT`/`ADJUST`) |
| `quantity` | `quantity` | Int | No | inventory movement quantity |
| `referenceVisitId` | `reference_visit_id` | String (UUID) | Yes | nullable FK → `Visit.id` |
| `notes` | `notes` | String | Yes | nullable |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |

**Table map:** `@@map("stock_transactions")`

---

### Visit (`visits`)
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `studentId` | `student_id` | String (UUID) | No | FK → `Student.id` (patient id) |
| `loggedByUserId` | `logged_by_user_id` | String (UUID) | No | FK → `User.id` |
| `visitDate` | `visit_date` | Date | No | `@db.Date`, default now() |
| `timeIn` | `time_in` | DateTime (timestamptz) | No | required |
| `timeOut` | `time_out` | DateTime (timestamptz) | Yes | nullable |
| `complaint` | `complaint` | String | No | required |
| `actionTaken` | `action_taken` | String | No | required |
| `disposition` | `disposition` | Disposition | No | default `RETURNED_TO_CLASS` |
| `remarks` | `remarks` | String | Yes | nullable |
| `isArchived` | `is_archived` | Boolean | No | default false |
| `temperature` | `temperature` | String | Yes | nullable |
| `bloodPressure` | `blood_pressure` | String | Yes | nullable |
| `heartRate` | `heart_rate` | String | Yes | nullable |
| `respiratoryRate` | `respiratory_rate` | String | Yes | nullable |
| `releasedToName` | `released_to_name` | String | Yes | nullable |
| `releasedToRelationship` | `released_to_relationship` | String | Yes | nullable |
| `releaseTime` | `release_time` | DateTime (timestamptz) | Yes | nullable |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |
| `updatedAt` | `updated_at` | DateTime (timestamptz) | No | `@updatedAt` |

**Table map:** `@@map("visits")`

---

### VisitMedicine (`visit_medicines`)
| Prisma field | DB column | Type | Optional | Notes |
|---|---|---|---|---|
| `id` | `id` | String (UUID) | No | PK |
| `visitId` | `visit_id` | String (UUID) | No | FK → `Visit.id` (cascade delete) |
| `medicineId` | `medicine_id` | String (UUID) | No | FK → `Medicine.id` |
| `batchId` | `batch_id` | String (UUID) | Yes | nullable FK → `InventoryBatch.id` |
| `quantityDispensed` | `quantity_dispensed` | Int | No | required |
| `createdAt` | `created_at` | DateTime (timestamptz) | No | default now() |

**Table map:** `@@map("visit_medicines")`

