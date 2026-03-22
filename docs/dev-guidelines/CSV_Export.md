# CSV export (operational data)

Authenticated `GET` endpoints under `/api/export` return `text/csv; charset=utf-8` with a UTF-8 BOM for Excel.

## Endpoints

| Path | Query params |
|------|----------------|
| `/api/export/patients.csv` | `scope=active\|archived\|all`, optional `search` |
| `/api/export/visits.csv` | Optional `startDate`, `endDate` (YYYY-MM-DD); if omitted, defaults to last 30 days. Optional `studentId`, `includeArchived` |
| `/api/export/medicines.csv` | `includeInactive`, `detail=summary\|batches` |
| `/api/export/stock-movements.csv` | **Required** `startDate`, `endDate`; optional `medicineId`, `type=IN\|OUT\|ADJUST\|ALL` (max 50k rows) |
| `/api/export/visit-medicines.csv` | Same as visits (dispensed lines per visit) |

## Rate limiting

Export routes use `express-rate-limit` (40 requests per minute per IP). Adjust in `apps/api/src/routes/export.routes.ts` if needed.

## PII

Patient exports may include `known_medical_conditions` and emergency contact fields. Review retention policy before sharing files outside the clinic.
