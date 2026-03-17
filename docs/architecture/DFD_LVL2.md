### External Entity

- **E1 – Clinic In-Charge**  
  Uses the web UI to record clinic visits, manage inventory, and view analytics/dashboards.

---

### Processes (Level 2)

#### 3.0 Record Clinic Visits

- **3.1 Validate Visit Input**  
  Checks that required visit fields (student, time_in, complaint, action_taken, medicines list) are present and well‑formed.
- **3.2 Create/Update Visit Record**  
  Creates a new visit or updates an existing one with clinical details (time_in/out, complaint, action_taken, remarks, basic metadata).
- **3.3 Record Dispensed Medicines**  
  Stores the list of medicines dispensed during a visit, linked to the visit and (optionally) specific inventory batches.
- **3.4 Update Inventory From Visit**  
  Deducts stock for dispensed medicines, choosing batches and recording OUT transactions.
- **3.5 Save Release Details**  
  Captures and persists guardian release information (name, relationship, release_time) for the visit.

#### 4.0 Manage Inventory

- **4.1 Maintain Medicine Master Data**  
  Creates and updates medicine definitions (name, description/purpose, reorder_threshold, active status).
- **4.2 Process Stock-In**  
  Records incoming stock as inventory batches and corresponding IN transactions.
- **4.3 Process Stock Adjustment**  
  Applies manual corrections (loss, damage, count discrepancies) through ADJUST transactions and batch quantity updates.
- **4.4 Compute Stock Snapshot & Alerts**  
  Aggregates batch and transaction data with reorder thresholds to derive current stock snapshot, low‑stock, and expiring‑stock indicators.

#### 5.0 Generate Analytics & Dashboards

- **5.1 Accept Analytics Parameters**  
  Validates analytics/report type, date ranges, and presets (e.g., `rangePreset`, `trendMonths`, `topMedicinesLimit`) used by dashboard views.
- **5.2 Aggregate Clinic Activity**  
  Queries and aggregates student and visit data (plus dispensed medicines) to produce clinic utilization metrics, visit‑type breakdowns, and time‑series analytics.
- **5.3 Aggregate Inventory & Consumption**  
  Aggregates medicines, batches, and stock transactions to produce medicine consumption analytics and stock status metrics (e.g., low‑stock indicators, most‑used medicines).
- **5.4 Format Analytics Payload**  
  Combines aggregated results into structured JSON suitable for dashboards and analytics views (metrics cards, tables, and chart series).

---

### Data Stores (Reference from Level 1)

- **D2 – Students** (`students`)  
- **D3 – Visits** (`visits`)  
- **D4 – Visit Medicines** (`visit_medicines`)  
- **D5 – Inventory Batches** (`inventory_batches`)  
- **D6 – Stock Transactions** (`stock_transactions`)  
- **D7 – Medicines** (`medicines`)  

*(D1 User Account is not directly decomposed here since Level 2 focuses on 3.0, 4.0, 5.0.)*

---

### Data Flows (Level 2, Labelled)

#### 3.0 Record Clinic Visits

- **E1 → 3.1**: **Visit Input Payload**  
  (student_id, time_in, optional time_out, complaint, action_taken, remarks, release info, dispensed medicines list).
- **3.1 → 3.2**: **Validated Visit Data**  
  (cleaned/validated visit fields).
- **3.1 → E1**: **Visit Validation Errors**  
  (field‑level error messages, if invalid).

- **3.2 ↔ D3**:  
  - **3.2 → D3**: **Visit Record Write** (new or updated visit row).  
  - **3.2 ← D3**: **Existing Visit Record** (when updating).
- **3.2 → 3.3**: **Visit Identifier & Core Details**  
  (visit_id, student_id, visit_date, time_in/out, complaint, action_taken).

- **3.3 → D4**: **Dispensed Medicines Rows**  
  (visit_id, medicine_id, optional batch_id, quantity_dispensed).
- **3.3 → 3.4**: **Dispensed Medicines Summary**  
  (per‑visit list of medicines and quantities, with resolved medicine_ids/batch_ids).

- **3.4 ← D5**: **Available Batch Stock**  
  (batches for each medicine: batch_id, expiration_date, quantity_on_hand).  
- **3.4 → D5**: **Updated Batch Quantities**  
  (new quantity_on_hand after deduction per batch).  
- **3.4 → D6**: **OUT Stock Transactions**  
  (batch_id, quantity, txn_type=OUT, reference_visit_id, timestamps).

- **3.5 → D3**: **Release Details Update**  
  (released_to_name, released_to_relationship, release_time for given visit_id).

- **3.2, 3.3, 3.4, 3.5 → E1**: **Visit Save Confirmation**  
  (final visit summary including clinical details, dispensed medicines, and any inventory impact).

#### 4.0 Manage Inventory

- **E1 → 4.1**: **Medicine Master Data Command**  
  (create/update medicine: name, description/purpose, reorder_threshold, is_active).
- **4.1 ↔ D7**:  
  - **4.1 → D7**: **Medicine Definition Write** (insert/update).  
  - **4.1 ← D7**: **Medicine Definition Read** (for lists/forms).

- **E1 → 4.2**: **Stock‑In Instruction**  
  (medicine_id, batch_number, expiration_date, quantity, notes).
- **4.2 → D5**: **Batch Creation/Update**  
  (new inventory_batch or updated quantity_on_hand).  
- **4.2 → D6**: **IN Stock Transaction**  
  (batch_id, quantity, txn_type=IN, notes).

- **E1 → 4.3**: **Stock Adjustment Request**  
  (batch_id or medicine reference, adjustment quantity, reason/notes).
- **4.3 ← D5**: **Current Batch Quantity**  
  (existing quantity_on_hand for referenced batch).  
- **4.3 → D5**: **Adjusted Batch Quantity**  
  (new quantity_on_hand reflecting adjustment).  
- **4.3 → D6**: **ADJUST Stock Transaction**  
  (batch_id, quantity, txn_type=ADJUST, notes).

- **4.4 ← D5, D6, D7**: **Raw Stock & Threshold Data**  
  (batch quantities/expirations, transactions, medicine thresholds/status).  
- **4.4 → E1**: **Stock Snapshot & Alerts**  
  (per‑medicine stock levels, low‑stock flags, expiring batches list).

#### 5.0 Generate Analytics & Dashboards

- **E1 → 5.1**: **Analytics Parameters**  
  (analytics/report_type, date_range, `rangePreset`, `trendMonths`, `topMedicinesLimit`, other filters).
- **5.1 → 5.2**: **Validated Clinic Analytics Parameters**  
  (normalized dates and options relevant to clinic activity).
- **5.1 → 5.3**: **Validated Inventory Analytics Parameters**  
  (normalized dates and options relevant to inventory/consumption).

- **5.2 ← D2, D3, D4**: **Clinic Source Data**  
  (students, visits, dispensed medicines within the target period).  
- **5.2 → 5.4**: **Clinic Activity Aggregates**  
  (weekly visits, visits by type, monthly trends, per‑student or per‑grade stats, and related time‑series analytics).

- **5.3 ← D5, D6, D7**: **Inventory & Transaction Data**  
  (medicine definitions, batch stock, IN/OUT/ADJUST transactions).  
- **5.3 → 5.4**: **Inventory & Consumption Aggregates**  
  (medicine consumption totals, most used medicines, low‑stock metrics, expiring‑stock indicators).

- **5.4 → E1**: **Analytics Data Payload**  
  (structured JSON containing clinic summary metrics, consumption analytics, low‑stock/expiring‑stock lists, and dashboard sections such as `weeklyVisits`, `visitsByType`, `monthlyVisitTrend`, `mostUsedMedicines`).