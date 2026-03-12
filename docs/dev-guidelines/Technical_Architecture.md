# ADA Technical Architecture & Backend Documentation
*Web-Based Clinic Records and Medicine Inventory Management System (Single Role: Clinic In-Charge)*

## System Architecture Overview

### Frontend
- **Framework:** Next.js (React) — JavaScript
- **UI/Styling:** Tailwind CSS, shadcn/ui, Lucide React
- **State/Data:** TanStack Query (API data fetching & caching)
- **Notifications:** Sonner (toasts)
- **Charts (optional for reports dashboard):** Chart.js

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Validation:** express-validator (request validation)
- **Authentication:** JWT (access token), bcrypt (password hashing)
- **Logging (recommended):** pino or winston

### Database
- **DBMS:** PostgreSQL
- **ORM:** Prisma ORM (schema, migrations, typed queries)

### Hosting
- **Frontend:** Vercel (recommended) or Render static hosting
- **Backend API:** Render (recommended) or similar Node-compatible host
- **Database:** Neon PostgreSQL or Render PostgreSQL

---

## Backend Design

### Technology stack
- Node.js + Express for REST API
- PostgreSQL + Prisma for data persistence
- JWT + bcrypt for single-user authentication
- Express middleware for validation, error handling, and request logging

### Folder structure (proposed)
```text
ada-backend/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ config/
│  │  ├─ env.js
│  │  └─ cors.js
│  ├─ middleware/
│  │  ├─ auth.js
│  │  ├─ errorHandler.js
│  │  └─ validate.js
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.routes.js
│  │  │  ├─ auth.controller.js
│  │  │  └─ auth.service.js
│  │  ├─ students/
│  │  │  ├─ students.routes.js
│  │  │  ├─ students.controller.js
│  │  │  └─ students.service.js
│  │  ├─ visits/
│  │  │  ├─ visits.routes.js
│  │  │  ├─ visits.controller.js
│  │  │  └─ visits.service.js
│  │  ├─ inventory/
│  │  │  ├─ inventory.routes.js
│  │  │  ├─ inventory.controller.js
│  │  │  └─ inventory.service.js
│  │  ├─ reports/
│  │  │  ├─ reports.routes.js
│  │  │  ├─ reports.controller.js
│  │  │  └─ reports.service.js
│  ├─ utils/
│  │  ├─ dates.js
│  │  └─ pagination.js
│  └─ db/
│     └─ prismaClient.js
├─ package.json
└─ README.md
```

### API layer structure
- **Routes** define endpoints and apply middleware (auth, validation).
- **Controllers** translate HTTP requests into service calls and return responses.
- **Services** contain business logic and database interactions (Prisma).
- **Middleware** enforces authentication, validates input, and standardizes error handling.

### Authentication flow (single-user)
1. Clinic In-Charge logs in with email + password.
2. Backend verifies credentials (bcrypt compare).
3. Backend issues JWT access token (short expiry) and optional refresh token.
4. Frontend stores token securely (recommended: httpOnly cookie or secure storage strategy).
5. Protected endpoints require a valid JWT (Authorization: Bearer <token>).

---

## Data Flow Diagram (DFD)

### Context-Level DFD description
**External Entity:** Clinic In-Charge  
**System:** ADA System  
The Clinic In-Charge submits clinic visit details, student profile updates, and inventory transactions to the ADA system. The system stores and processes these inputs to produce searchable patient records, real-time inventory status, and generated reports that are returned to the Clinic In-Charge.

### Level 0 DFD description
**Process 1.0 – Authenticate User**
- Inputs: login credentials
- Outputs: authentication token/session
- Data Store: D1 User Account

**Process 2.0 – Manage Students**
- Inputs: create/update/archive student profiles
- Outputs: student profiles for viewing/search
- Data Store: D2 Students

**Process 3.0 – Record Clinic Visits**
- Inputs: visit details (time-in/out, complaint, action taken, dispensed medicine, release details)
- Outputs: saved visit record; updated inventory (if medicines dispensed)
- Data Stores: D3 Visits, D4 Visit Medicines, D5 Inventory Batches, D6 Stock Transactions

**Process 4.0 – Manage Inventory**
- Inputs: stock-in, stock adjustments, reorder thresholds, medicine catalog updates
- Outputs: current stock status, low-stock/expiring indicators
- Data Stores: D5 Inventory Batches, D6 Stock Transactions, D7 Medicines

**Process 5.0 – Generate Reports**
- Inputs: date range and report type
- Outputs: clinic summary report, consumption report, low-stock report
- Data Stores (read): D2 Students, D3 Visits, D4 Visit Medicines, D5 Inventory Batches, D6 Stock Transactions, D7 Medicines

---

## Entity Relationship Diagram (ERD)

### Entities
- **User**
- **Student**
- **Visit**
- **Medicine**
- **InventoryBatch**
- **StockTransaction**
- **VisitMedicine** (junction table for medicines dispensed per visit)

### Relationships
- **User (1) → (M) Visit**: One Clinic In-Charge logs many visits.
- **Student (1) → (M) Visit**: One student can have many visits.
- **Medicine (1) → (M) InventoryBatch**: One medicine can have multiple batches.
- **InventoryBatch (1) → (M) StockTransaction**: A batch has many stock transactions.
- **Visit (1) → (M) VisitMedicine**: One visit can dispense multiple medicines.
- **Medicine (1) → (M) VisitMedicine**: One medicine can be dispensed across many visits.

### Cardinality summary
- User:Visit = 1:M  
- Student:Visit = 1:M  
- Medicine:InventoryBatch = 1:M  
- InventoryBatch:StockTransaction = 1:M  
- Visit:VisitMedicine = 1:M  
- Medicine:VisitMedicine = 1:M  

---

## Database Schema

### Tables and key fields
| Table | Purpose | Key Fields |
|---|---|---|
| users | Single authenticated Clinic In-Charge account | id (PK), email (UNIQUE), password_hash |
| students | Student/patient profiles | id (PK), full_name, grade_level, section, is_archived |
| visits | Clinic visit records | id (PK), student_id (FK), time_in, time_out, complaint |
| medicines | Medicine catalog/master list | id (PK), name (UNIQUE), reorder_threshold |
| inventory_batches | Batch-level inventory tracking | id (PK), medicine_id (FK), expiration_date, quantity_on_hand |
| stock_transactions | Inventory audit trail | id (PK), batch_id (FK), txn_type, quantity |
| visit_medicines | Dispensed medicines per visit | id (PK), visit_id (FK), medicine_id (FK), quantity_dispensed |

### PostgreSQL-compatible schema (DDL)
```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  full_name       TEXT NOT NULL,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE students (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name               TEXT NOT NULL,
  grade_level             TEXT,
  section                 TEXT,
  date_of_birth           DATE,
  gender                  TEXT,
  known_medical_conditions TEXT,
  is_archived             BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE medicines (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL UNIQUE,
  description       TEXT,
  purpose           TEXT,
  reorder_threshold INTEGER NOT NULL DEFAULT 0 CHECK (reorder_threshold >= 0),
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE inventory_batches (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id      UUID NOT NULL REFERENCES medicines(id),
  batch_number     TEXT,
  expiration_date  DATE,
  quantity_on_hand INTEGER NOT NULL DEFAULT 0 CHECK (quantity_on_hand >= 0),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_batch UNIQUE (medicine_id, batch_number, expiration_date)
);

CREATE TABLE visits (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id              UUID NOT NULL REFERENCES students(id),
  logged_by_user_id       UUID NOT NULL REFERENCES users(id),
  visit_date              DATE NOT NULL DEFAULT CURRENT_DATE,
  time_in                 TIMESTAMPTZ NOT NULL,
  time_out                TIMESTAMPTZ,
  complaint               TEXT NOT NULL,
  action_taken            TEXT NOT NULL,
  remarks                 TEXT,
  released_to_name        TEXT,
  released_to_relationship TEXT,
  release_time            TIMESTAMPTZ,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE visit_medicines (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id            UUID NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  medicine_id         UUID NOT NULL REFERENCES medicines(id),
  batch_id            UUID REFERENCES inventory_batches(id),
  quantity_dispensed  INTEGER NOT NULL CHECK (quantity_dispensed > 0),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stock_transactions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id           UUID NOT NULL REFERENCES inventory_batches(id),
  txn_type           TEXT NOT NULL CHECK (txn_type IN ('IN','OUT','ADJUST')),
  quantity           INTEGER NOT NULL CHECK (quantity > 0),
  reference_visit_id UUID REFERENCES visits(id),
  notes              TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Constraints and rules (implementation notes)
- All inventory changes must be recorded in `stock_transactions` for auditability.
- Stock deduction for dispensing should be performed within a database transaction to ensure atomic updates.
- If a batch is not specified during dispensing, the backend should apply a deterministic policy (recommended: FEFO—earliest-expiring batch first).

---

## Security Design

### Authentication
- Require login for all protected routes.
- Use JWT access tokens; apply expiry and rotation strategy as needed.
- Expose `POST /api/auth/logout` for the frontend to end the current session; in the MVP this is a stateless endpoint that relies on the client discarding the JWT.

### Password hashing
- Hash passwords using bcrypt.
- Store only `password_hash`, never plaintext.

### Access control
- Single-user system (Clinic In-Charge only). All non-auth routes are disabled.
- Protect all API routes with auth middleware except `/api/auth/login` (and optional initial setup endpoint).

### Data protection considerations
- Enforce HTTPS in production.
- Avoid logging sensitive medical details in application logs.
- Limit database access to trusted service accounts and ensure backups are access-controlled.

---

## API Endpoints (RESTful Design)

### Endpoint list (overview)
| Module | Method | Endpoint | Description |
|---|---:|---|---|
| Auth | POST | /api/auth/login | Authenticate user and return token |
| Auth | POST | /api/auth/logout | Logout/invalidate session (optional) |
| Students | GET | /api/students | List/search students |
| Students | POST | /api/students | Create student |
| Students | GET | /api/students/:id | Get student details |
| Students | PATCH | /api/students/:id | Update student |
| Students | PATCH | /api/students/:id/archive | Archive/unarchive student |
| Visits | GET | /api/visits | List visits (filters: date range, student) |
| Visits | POST | /api/visits | Create visit (optional dispensed medicines) |
| Visits | GET | /api/visits/:id | Get visit details |
| Visits | PATCH | /api/visits/:id | Update visit (e.g., time_out, remarks) |
| Inventory | GET | /api/medicines | List medicines + stock snapshot |
| Inventory | POST | /api/medicines | Create medicine |
| Inventory | PATCH | /api/medicines/:id | Update medicine details |
| Inventory | POST | /api/inventory/stock-in | Add stock to a batch |
| Inventory | POST | /api/inventory/adjust | Adjust stock (audit) |
| Reports | GET | /api/reports/clinic-summary | Clinic visits summary by date range |
| Reports | GET | /api/reports/consumption | Medicine consumption by date range |
| Reports | GET | /api/reports/low-stock | Low-stock and expiring stock list |

### Request/response format examples

#### POST /api/auth/login
```json
{
  "email": "clinic@example.com",
  "password": "your_password"
}
```
```json
{
  "token": "jwt_access_token",
  "user": {
    "id": "uuid",
    "full_name": "Clinic In-Charge",
    "email": "clinic@example.com"
  }
}
```

#### POST /api/visits (with medicines dispensed)
```json
{
  "student_id": "uuid",
  "time_in": "2026-03-02T08:15:00+08:00",
  "complaint": "Headache",
  "action_taken": "Provided rest and dispensed medicine",
  "remarks": "Advised hydration",
  "medicines": [
    { "medicine_id": "uuid", "batch_id": "uuid", "quantity": 1 }
  ],
  "release": {
    "released_to_name": "Juan Dela Cruz",
    "released_to_relationship": "Father",
    "release_time": "2026-03-02T09:05:00+08:00"
  }
}
```
```json
{
  "visit_id": "uuid",
  "message": "Visit recorded successfully",
  "inventory_updates": [
    { "medicine_id": "uuid", "batch_id": "uuid", "quantity_deducted": 1 }
  ]
}
```
