### External Entities

- **E1 – Clinic In-Charge**  
  Single authenticated user who manages patient records (students, teachers, and non‑teaching personnel), clinic visits, medicine inventory, and analytics via the web UI.

---

### Processes (Level 1 Only)

- **1.0 Authenticate User**  
  Verifies Clinic In-Charge credentials and issues an authentication token for protected actions.

- **2.0 Manage Patients**  
  Creates, updates, archives, and retrieves patient profiles (students, teachers, and non‑teaching personnel) for later use in visits and analytics.

- **3.0 Record Clinic Visits**  
  Logs clinic visits, including time‑in/out, complaints, actions taken, dispensed medicines, and release details for patients (students, teachers, and non‑teaching personnel).

- **4.0 Manage Inventory**  
  Maintains medicine master data, records stock-in and stock adjustments, and tracks current stock statuses and alerts.

- **5.0 Generate Analytics & Dashboards**  
  Aggregates stored clinic and inventory data into summarized JSON outputs (metrics, tables, and chart-ready series) that power the dashboard and analytics views in the web UI.

---

### Data Stores

- **D1 – User Account**  
  `users` table: Clinic In-Charge credentials and profile (email, password_hash, full_name, status, timestamps).

- **D2 – Patients**  
  `students` table: patient profiles (students, teachers, and non‑teaching personnel), including identity, classification (e.g., patient type/role), grade/section where applicable, medical info, archive flag, timestamps.

- **D3 – Visits**  
  `visits` table: clinic visit records (patient reference id, logged_by_user_id, visit_date, time_in/out, complaint, action_taken, remarks, release details, timestamps).

- **D4 – Visit Medicines**  
  `visit_medicines` table: medicines dispensed per visit (visit_id, medicine_id, optional batch_id, quantity_dispensed, timestamps).

- **D5 – Inventory Batches**  
  `inventory_batches` table: batch-level stock (medicine_id, batch_number, expiration_date, quantity_on_hand, timestamps).

- **D6 – Stock Transactions**  
  `stock_transactions` table: inventory movements (batch_id, txn_type IN/OUT/ADJUST, quantity, optional reference_visit_id, notes, timestamps).

- **D7 – Medicines**  
  `medicines` table: medicine master data (name, description/purpose, reorder_threshold, is_active, timestamps).

---

### Data Flows (Labelled, High-Level)

#### Between External Entity and Processes

- **E1 → 1.0**: **Login Request**  
  (email, password).

- **1.0 → E1**: **Auth Response**  
  (auth token, basic user info).

- **E1 → 2.0**: **Patient Management Commands**  
  (create/update/archive requests, search criteria).

- **2.0 → E1**: **Patient List / Details**  
  (filtered patient lists, profile details including patient type).

- **E1 → 3.0**: **Visit Submission**  
  (patient record id, time_in/out, complaint, action_taken, remarks, release info, dispensed medicines).

- **3.0 → E1**: **Visit Confirmation**  
  (saved visit summary, optionally inventory impact).

- **E1 → 4.0**: **Inventory Management Commands**  
  (create/update medicine, stock‑in instructions, stock adjustment details).

- **4.0 → E1**: **Inventory Status & Alerts**  
  (current stock snapshot, low‑stock list, expiring batches).

- **E1 → 5.0**: **Analytics Request**  
  (analytics/report type, date range, presets like rangePreset/trendMonths, filters).

- **5.0 → E1**: **Dashboard Analytics Data**  
  (clinic summary metrics, time-series data for charts, medicine usage rankings, low‑stock/expiring‑stock lists).

#### Between Processes and Data Stores

- **1.0 Authenticate User**
  - **1.0 ↔ D1**: **User Credentials & Profile Access**  
    - Reads user record by email to verify password.  
    - May update activity/updated_at metadata.

- **2.0 Manage Patients**
  - **2.0 → D2**: **Patient Record Write**  
    - Inserts/updates/archives patient profiles (students, teachers, non‑teaching personnel).  
  - **2.0 ← D2**: **Patient Record Read**  
    - Retrieves patient lists and individual profiles, including their type/classification.

- **3.0 Record Clinic Visits**
  - **3.0 → D3**: **Visit Record Write**  
    - Creates and updates visit entries (time_in/out, complaint, action_taken, remarks, release details) linked to a patient record.  
  - **3.0 ← D3**: **Visit Record Read**  
    - Retrieves visit details for viewing or analytics.  
  - **3.0 → D4**: **Dispensed Medicines Recording**  
    - Stores medicines dispensed per visit (visit_medicines rows).  
  - **3.0 ↔ D5**: **Batch Stock Access**  
    - Reads batch quantities and expirations; updates quantity_on_hand when dispensing.  
  - **3.0 → D6**: **OUT Stock Transactions**  
    - Writes OUT transactions linked to visits and batches.

- **4.0 Manage Inventory**
  - **4.0 ↔ D7**: **Medicine Master Data Access**  
    - Creates/updates medicines; reads for lists and thresholds.  
  - **4.0 ↔ D5**: **Batch Stock Maintenance**  
    - Creates/updates inventory batches for stock‑in and adjustments; reads current quantities and expirations.  
  - **4.0 → D6**: **IN/ADJUST Stock Transactions**  
    - Records IN transactions for stock‑in events and ADJUST transactions for corrections or losses.

- **5.0 Generate Analytics & Dashboards**
  - **5.0 ← D2, D3, D4**: **Clinic Activity Data**  
    - Reads patients, visits, and dispensed medicines within a date range to compute utilization metrics, visit trends, and visit-type breakdowns.  
  - **5.0 ← D5, D6, D7**: **Inventory & Consumption Data**  
    - Reads batches, stock transactions, and medicine definitions/thresholds to compute medicine consumption, most-used medicines, and low‑stock/expiring‑stock indicators used in dashboards.