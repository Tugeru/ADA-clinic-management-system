### External Entities

- **E1 – Clinic In-Charge**  
  Single authenticated user who manages student records, clinic visits, medicine inventory, and reports via the web UI.

---

### Processes (Level 1 Only)

- **1.0 Authenticate User**  
  Verifies Clinic In-Charge credentials and issues an authentication token for protected actions.

- **2.0 Manage Students**  
  Creates, updates, archives, and retrieves student/patient profiles for later use in visits and reports.

- **3.0 Record Clinic Visits**  
  Logs clinic visits, including time-in/out, complaints, actions taken, dispensed medicines, and release details for students.

- **4.0 Manage Inventory**  
  Maintains medicine master data, records stock-in and stock adjustments, and tracks current stock statuses and alerts.

- **5.0 Generate Analytics & Dashboards**  
  Aggregates stored clinic and inventory data into summarized JSON outputs (metrics, tables, and chart-ready series) that power the dashboard and analytics views in the web UI.

---

### Data Stores

- **D1 – User Account**  
  `users` table: Clinic In-Charge credentials and profile (email, password_hash, full_name, status, timestamps).

- **D2 – Students**  
  `students` table: student/patient profiles (identity, grade/section, medical info, archive flag, timestamps).

- **D3 – Visits**  
  `visits` table: clinic visit records (student_id, logged_by_user_id, visit_date, time_in/out, complaint, action_taken, remarks, release details, timestamps).

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

- **E1 → 2.0**: **Student Management Commands**  
  (create/update/archive requests, search criteria).

- **2.0 → E1**: **Student List / Details**  
  (filtered student lists, profile details).

- **E1 → 3.0**: **Visit Submission**  
  (student_id, time_in/out, complaint, action_taken, remarks, release info, dispensed medicines).

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

- **2.0 Manage Students**
  - **2.0 → D2**: **Student Record Write**  
    - Inserts/updates/archives student profiles.  
  - **2.0 ← D2**: **Student Record Read**  
    - Retrieves student lists and individual profiles.

- **3.0 Record Clinic Visits**
  - **3.0 → D3**: **Visit Record Write**  
    - Creates and updates visit entries (time_in/out, complaint, action_taken, remarks, release details).  
  - **3.0 ← D3**: **Visit Record Read**  
    - Retrieves visit details for viewing or reporting.  
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
    - Reads students, visits, and dispensed medicines within a date range to compute utilization metrics, visit trends, and visit-type breakdowns.  
  - **5.0 ← D5, D6, D7**: **Inventory & Consumption Data**  
    - Reads batches, stock transactions, and medicine definitions/thresholds to compute medicine consumption, most-used medicines, and low‑stock/expiring‑stock indicators used in dashboards.
