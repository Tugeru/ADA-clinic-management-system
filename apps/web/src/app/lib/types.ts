// ─────────────────────────────────────────────────────────────
// Prisma-like type definitions (mirrors schema.prisma models)
// ─────────────────────────────────────────────────────────────

export type PatientType = 'Student' | 'Teacher' | 'NTP';
export type PatientStatus = 'Active' | 'Archived';
export type Gender = 'Male' | 'Female' | 'Other';
export type DispositionType = 'Returned to Class' | 'Returned to Work' | 'Sent Home' | 'Sent to Hospital';
export type DispositionColor = 'green' | 'orange' | 'red';
/** `expiring` = stock OK but batch(es) within expiry warning window (see lowStockReport) */
/** `expired` = at least one batch has already expired */
export type InventoryStatus = 'good' | 'low' | 'critical' | 'expiring' | 'expired';

export interface ExpiryAlertBatch {
  batchId: string;
  batchNumber: string | null;
  expirationDate: string; // ISO
  quantityOnHand: number;
}
export type MovementType = 'IN' | 'OUT';
export type MedicineType = 'Tablet' | 'Capsule' | 'Liquid' | 'Injection' | 'Topical' | 'Effervescent' | 'Inhaler';
export type UserRole = 'ADMIN' | 'CLINIC_INCHARGE' | 'STAFF';

// ─── User / Auth ─────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  schoolCode: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ─── Patient ─────────────────────────────────────────────────
export interface Patient {
  id: string;
  idNumber: string;
  fullName: string;
  type: PatientType;
  gender: Gender;
  dateOfBirth?: string;
  context: string;       // Grade/Section or Department/Unit
  status: PatientStatus;
  age?: string;
  avatar?: string;

  // Student-specific
  gradeLevel?: string;
  section?: string;
  strand?: string;
  schoolYear?: string;

  // Teacher/NTP-specific
  department?: string;
  position?: string;

  // Emergency contact
  contactName?: string;
  contactRelationship?: string;
  contactNumber?: string;

  // Medical notes
  allergies?: string;
  conditions?: string;
  /** Combined medical conditions / allergies (API field; profile & visits) */
  knownMedicalConditions?: string;
  remarks?: string;

  dateArchived?: string;

  createdAt: string;
  updatedAt: string;
}

// Matches CreateStudentSchema / UpdateStudentSchema on the backend
export interface PatientFormData {
  fullName: string;
  gradeLevel?: string;
  section?: string;
  strand?: string;
  schoolYear?: string;
  dateOfBirth?: string;
  gender?: string;
  knownMedicalConditions?: string;
}

// ─── Reference Data ─────────────────────────────────────────
export interface ReferenceDataItem {
  id: string;
  category: string;
  value: string;
  label: string;
  parentValue?: string | null;
  sortOrder: number;
  isActive: boolean;
}

// ─── Visit ───────────────────────────────────────────────────
export interface Visit {
  id: number;
  date: string;
  timeIn: string;
  timeOut?: string;
  patientId: string;
  patientName: string;
  patientType: PatientType;
  complaint: string;
  assessment?: string;
  nurseRemarks?: string;
  disposition: DispositionType;
  dispositionColor: DispositionColor;
  medicines: DispensedMedicine[];

  // Vital signs
  temperature?: string;
  bloodPressure?: string;
  heartRate?: string;
  respiratoryRate?: string;

  // Release info
  releaseTime?: string;
  releasedTo?: string;
  releasedToRelationship?: string;
  authorizedBy?: string;
  advisory?: string;

  createdAt: string;
  updatedAt: string;
}

export interface DispensedMedicine {
  medicineId?: string;
  name: string;
  dosage?: string;
  quantity: number;
}

// Matches LogVisitSchema on the backend
export interface VisitFormData {
  patientId: string;
  /** YYYY-MM-DD — used with release time so it matches visit date (API refine) */
  visitDate?: string;
  timeIn: string;           // ISO 8601 datetime
  timeOut?: string;         // ISO 8601 datetime
  complaint: string;
  assessment?: string;      // maps to actionTaken in visitPayload()
  remarks?: string;
  // Vital signs
  temperature?: string;
  bloodPressure?: string;
  heartRate?: string;
  respiratoryRate?: string;
  medicines: { medicineId: string; quantity: number }[];
  disposition: DispositionType;
  guardianName?: string;
  relationship?: string;
  releaseTime?: string;
}

// ─── Inventory ───────────────────────────────────────────────
export interface Medicine {
  id: number;
  name: string;
  sku?: string;
  category: string;
  type?: MedicineType;
  dosage?: string;
  stock: number;
  /** Stock quantity relevant to the badge shown on dashboard "Stock & Expiry Alerts". */
  alertStock?: number;
  threshold: number;
  unit: string;
  expiry: string;
  status: InventoryStatus;
  supplier?: string;
  notes?: string;
  hasExpiringSoon?: boolean;
  // Batch-level buckets used by the dashboard "Stock & Expiry Alerts" card.
  expiredBatches?: ExpiryAlertBatch[];
  expiringTodayBatches?: ExpiryAlertBatch[];
  expiringSoonBatches?: ExpiryAlertBatch[];
  isArchived?: boolean;
  dateArchived?: string;
  archivedBy?: string;
}

export interface StockMovement {
  id: string;
  date: string;
  medicineId: string;
  medicineName: string;
  medicineSku?: string;
  medicineType?: string;
  batchNumber?: string | null;
  movementType: MovementType;
  qtyIn?: number;
  qtyOut?: number;
  reference: string;
  notes?: string | null;
  initials: string;
  initialsColor: string;
}

// Matches StockInSchema on the backend
export interface StockInFormData {
  medicineId: string;     // UUID string
  quantity: number;
  batchNumber?: string;
  expirationDate: string; // YYYY-MM-DD
}

export interface MedicineFormData {
  name: string;
  unit: string;
  dosage: string;
  type: MedicineType | '';
  threshold: number;
  notes?: string;
}

// ─── Analytics ───────────────────────────────────────────────
export interface MedicineUsageRanking {
  rank: number;
  name: string;
  description: string;
  qtyDispensed: number;
  percentOfTotal: number;
}

export interface ConsumptionSummaryItem {
  id: number;
  medicineName: string;
  period: string;
  qtyUsed: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  icon: string;
  iconColor: string;
}

// ─── Archive ─────────────────────────────────────────────────
export interface ArchivedVisit {
  id: number;
  visitDate: string;
  patientName: string;
  patientInitials: string;
  initialsColor: string;
  type: 'Existing' | 'New' | 'Emergency';
  complaint: string;
  disposition: string;
  dispositionColor: string;
  dateArchived: string;
}

export interface ArchivedMedicine {
  id: number;
  name: string;
  medId: string;
  form: string;
  dosage: string;
  lastStock: number;
  dateArchived: string;
  archivedBy: string;
  icon: string;
  iconColor: string;
}

// ─── Settings / Clinic Profile ───────────────────────────────
export interface ClinicProfile {
  clinicName: string;
  schoolName: string;
  contactNumber?: string;
  address?: string;
  inChargeName?: string;
}

// ─── Audit Log ───────────────────────────────────────────────
export type AuditAction = 'Create' | 'Edit' | 'Archive' | 'Restore' | 'Stock-in' | 'Stock-out';
export type AuditEntity = 'Patient' | 'Visit' | 'Medicine';

export interface AuditLogEntry {
  id: number;
  timestamp: string;
  action: AuditAction;
  entity: AuditEntity;
  recordIdentifier: string;
  performedBy: string;
}

// ─── Dashboard KPI ───────────────────────────────────────────
export interface KPI {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  changeText?: string;
  subtitle?: string;
  subtitleColor?: string;
  highlight?: boolean;
}

// ─── Dashboard Analytics ─────────────────────────────────────
export interface WeeklyVisitPoint {
  date: string;
  label: string;
  count: number;
}

export interface VisitTypeBreakdownItem {
  type: 'Student' | 'Teacher' | 'NTP';
  count: number;
  percent: number;
}

export interface MonthlyVisitTrendPoint {
  monthKey: string;
  label: string;
  count: number;
}

export interface MostUsedMedicineItem {
  rank: number;
  medicineId: string;
  name: string;
  description: string;
  qtyDispensed: number;
  percentOfTotal: number;
}

export interface DashboardAnalyticsResponse {
  weeklyVisits: {
    dateRange: { startDate: string; endDate: string };
    points: WeeklyVisitPoint[];
  };
  visitsByType: {
    dateRange: { startDate: string; endDate: string };
    total: number;
    items: VisitTypeBreakdownItem[];
  };
  monthlyVisitTrend: {
    dateRange: { startDate: string; endDate: string };
    months: number;
    points: MonthlyVisitTrendPoint[];
  };
  mostUsedMedicines: {
    dateRange: { startDate: string; endDate: string };
    totalDispensedUnits: number;
    items: MostUsedMedicineItem[];
  };
}

export interface DashboardAnalyticsParams {
  rangePreset?: '30d' | '90d' | '180d' | '365d';
  trendMonths?: 6 | 12;
  topMedicinesLimit?: number;
}

// ─── API Response ────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}