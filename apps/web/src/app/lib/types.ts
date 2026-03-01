// ─────────────────────────────────────────────────────────────
// Prisma-like type definitions (mirrors schema.prisma models)
// ─────────────────────────────────────────────────────────────

export type PatientType = 'Student' | 'Teacher' | 'NTP';
export type PatientStatus = 'Active' | 'Archived';
export type Gender = 'Male' | 'Female' | 'Other';
export type DispositionType = 'Returned to Class' | 'Returned to Work' | 'Sent Home' | 'Sent to Hospital';
export type DispositionColor = 'green' | 'orange' | 'red';
export type InventoryStatus = 'good' | 'low' | 'critical';
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
  remarks?: string;

  dateArchived?: string;

  createdAt: string;
  updatedAt: string;
}

export interface PatientFormData {
  idNumber: string;
  idType?: string;
  fullName: string;
  type: PatientType;
  gender?: Gender;
  dateOfBirth?: string;
  gradeLevel?: string;
  section?: string;
  strand?: string;
  department?: string;
  position?: string;
  contactName?: string;
  contactRelationship?: string;
  contactNumber?: string;
  allergies?: string;
  conditions?: string;
  remarks?: string;
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
  name: string;
  dosage?: string;
  quantity: number;
}

export interface VisitFormData {
  patientId: string;
  date: string;
  timeIn: string;
  timeOut?: string;
  complaint: string;
  assessment?: string;
  remarks?: string;
  temperature?: string;
  bloodPressure?: string;
  heartRate?: string;
  medicines: DispensedMedicine[];
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
  threshold: number;
  unit: string;
  expiry: string;
  status: InventoryStatus;
  supplier?: string;
  notes?: string;
  isArchived?: boolean;
  dateArchived?: string;
  archivedBy?: string;
}

export interface StockMovement {
  id: number;
  date: string;
  medicineId: number;
  medicineName: string;
  medicineSku?: string;
  medicineType?: string;
  movementType: MovementType;
  qtyIn?: number;
  qtyOut?: number;
  reference: string;
  initials: string;
  initialsColor: string;
}

export interface StockInFormData {
  medicineId: number;
  quantity: number;
  dateReceived: string;
  supplier?: string;
  expiryDate?: string;
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