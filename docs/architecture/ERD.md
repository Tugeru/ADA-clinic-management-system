# Entity-Relationship Diagram (ERD)

**Authoritative source:** [packages/db/prisma/schema.prisma](../../packages/db/prisma/schema.prisma) (PostgreSQL; table names via `@@map`).

This document matches the real schema only—no invented tables or columns.

---

## 1) Entities and primary keys

| Entity (model)   | DB table             | PK          |
| ---------------- | -------------------- | ----------- |
| ReferenceData    | `reference_data`     | `id` (UUID) |
| User             | `users`              | `id` (UUID) |
| Student          | `students`           | `id` (UUID) |
| Medicine         | `medicines`          | `id` (UUID) |
| InventoryBatch   | `inventory_batches`  | `id` (UUID) |
| StockTransaction | `stock_transactions` | `id` (UUID) |
| Visit            | `visits`             | `id` (UUID) |
| VisitMedicine    | `visit_medicines`    | `id` (UUID) |
| AuditLog         | `audit_logs`         | `id` (UUID) |

**Standalone:** `reference_data` has no foreign keys to other entities (lookup values for grades, strands, sections, school years, etc.).

---

## 2) Relationships and cardinality

| Relationship | Cardinality | FK / notes |
| ------------ | ----------- | ---------- |
| User → Visit | 1 : M | `visits.logged_by_user_id` → `users.id` (required) |
| User → AuditLog | 1 : M | `audit_logs.user_id` → `users.id` (required) |
| Student → Visit | 1 : M | `visits.student_id` → `students.id` (required). Domain: row may be Student / Teacher / NTP via `patient_type`. |
| Medicine → InventoryBatch | 1 : M | `inventory_batches.medicine_id` → `medicines.id` (required). Unique `(medicine_id, batch_number, expiration_date)`. |
| InventoryBatch → StockTransaction | 1 : M | `stock_transactions.batch_id` → `inventory_batches.id` (required) |
| Visit → StockTransaction | 1 : M (optional link) | `stock_transactions.reference_visit_id` → `visits.id` (**nullable**). Not every transaction references a visit. |
| Visit ↔ Medicine | M : M | Via **visit_medicines**: `visit_id` (required, cascade delete), `medicine_id` (required). |
| InventoryBatch → VisitMedicine | 1 : M | `visit_medicines.batch_id` → `inventory_batches.id` (**nullable**). |

No 1:1 relationships are modeled.

---

## 3) Optional vs required foreign keys

| From table           | FK column            | To table            | Required |
| -------------------- | -------------------- | ------------------- | -------- |
| `visits`             | `student_id`         | `students`          | Yes      |
| `visits`             | `logged_by_user_id`  | `users`             | Yes      |
| `audit_logs`         | `user_id`            | `users`             | Yes      |
| `inventory_batches`  | `medicine_id`        | `medicines`         | Yes      |
| `stock_transactions` | `batch_id`           | `inventory_batches` | Yes      |
| `stock_transactions` | `reference_visit_id` | `visits`            | **No**   |
| `visit_medicines`    | `visit_id`           | `visits`            | Yes      |
| `visit_medicines`    | `medicine_id`        | `medicines`         | Yes      |
| `visit_medicines`    | `batch_id`           | `inventory_batches` | **No**   |

---

## 4) Naming vs domain language

- **`students`:** Table/model name implies students only; `patient_type` distinguishes Student / Teacher / NTP. On diagrams you may label the entity **Patient** with note “stored in `students`.”
- **`visits.student_id`:** Column name is historical; value is the **patient** record id.
- **`visits.disposition`:** Enum `Disposition` on Visit; include when listing Visit attributes on a detailed ERD.

---

## 5) Mermaid erDiagram

Entity IDs use underscores (no spaces). `reference_data` is omitted from edges (isolated).

```mermaid
erDiagram
  reference_data {
    uuid id PK
    string category
    string value
    string label
  }

  users {
    uuid id PK
    string email UK
  }

  students {
    uuid id PK
    string patient_type
  }

  visits {
    uuid id PK
    uuid student_id FK
    uuid logged_by_user_id FK
  }

  medicines {
    uuid id PK
    string name UK
  }

  inventory_batches {
    uuid id PK
    uuid medicine_id FK
  }

  stock_transactions {
    uuid id PK
    uuid batch_id FK
    uuid reference_visit_id FK_optional
  }

  visit_medicines {
    uuid id PK
    uuid visit_id FK
    uuid medicine_id FK
    uuid batch_id FK_optional
  }

  audit_logs {
    uuid id PK
    timestamptz created_at
    uuid user_id FK
  }

  users ||--o{ visits : "logs"
  users ||--o{ audit_logs : "audits"
  students ||--o{ visits : "patient_of"
  medicines ||--o{ inventory_batches : "batches"
  inventory_batches ||--o{ stock_transactions : "txn"
  visits ||--o{ stock_transactions : "ref_visit_optional"
  visits ||--o{ visit_medicines : "lines"
  medicines ||--o{ visit_medicines : "lines"
  inventory_batches ||--o{ visit_medicines : "batch_optional"
```

---

## 6) Checklist for drawing (e.g. draw.io)

- [ ] Eight entities (or seven if omitting standalone `reference_data`).
- [ ] PK `id` (UUID) on each entity.
- [ ] User → Visit (1:M, required).
- [ ] Student → Visit (1:M, required); note patient types via `patient_type`.
- [ ] Medicine → InventoryBatch (1:M); note composite unique on batch.
- [ ] InventoryBatch → StockTransaction (1:M).
- [ ] Visit → StockTransaction: optional `reference_visit_id` (0..* from Visit).
- [ ] Visit — VisitMedicine — Medicine (M:M junction); optional batch on line.
- [ ] Do not add entities or columns absent from `schema.prisma`.
