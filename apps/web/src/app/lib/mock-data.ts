// ─────────────────────────────────────────────────────────────
// Mock database (simulating PostgreSQL + Prisma seed data)
// ─────────────────────────────────────────────────────────────

import type { Patient, Visit, Medicine, User, StockMovement, MedicineUsageRanking, ConsumptionSummaryItem, ArchivedVisit, ArchivedMedicine, ClinicProfile, AuditLogEntry } from './types';

export const mockUser: User = {
  id: 'usr_001',
  email: 'clinic@csashs.edu.ph',
  name: 'Dr. Sarah L.',
  role: 'CLINIC_INCHARGE',
  schoolCode: 'CSASHS',
};

export const mockPatients: Patient[] = [
  { id: 'p1', idNumber: '2024-0056', fullName: 'Dela Cruz, Juan P.', type: 'Student', gender: 'Male', dateOfBirth: '2006-10-12', context: 'Grade 12 - STEM A', status: 'Active', age: '17 Years Old', gradeLevel: '12', section: 'STEM A', strand: 'STEM', contactName: 'Maria Dela Cruz', contactRelationship: 'Mother', contactNumber: '0917-123-4567', allergies: 'Peanuts, Shellfish', conditions: 'Asthma (Mild)', remarks: '', createdAt: '2023-06-01', updatedAt: '2024-01-15' },
  { id: 'p2', idNumber: 'EMP-2020-054', fullName: 'Reyes, Maria S.', type: 'Teacher', gender: 'Female', dateOfBirth: '1991-11-22', context: 'Science Department', status: 'Active', age: '34yo', department: 'Science Department', position: 'Senior Lecturer', contactName: 'Jose Reyes', contactRelationship: 'Spouse', contactNumber: '+63 917 888 1234', createdAt: '2020-08-15', updatedAt: '2024-02-01' },
  { id: 'p3', idNumber: 'CSH-2023-042', fullName: 'Lopez, Angelo M.', type: 'Student', gender: 'Male', dateOfBirth: '2009-03-08', context: 'Grade 11 - ABM B', status: 'Archived', age: '16yo', gradeLevel: '11', section: 'ABM B', contactName: 'Linda Lopez', contactRelationship: 'Mother', contactNumber: '+63 920 555 0000', dateArchived: 'Oct 12, 2023', createdAt: '2023-06-01', updatedAt: '2024-03-10' },
  { id: 'p4', idNumber: 'NTP-2021-012', fullName: 'Tan, Elena R.', type: 'NTP', gender: 'Female', dateOfBirth: '1980-07-19', context: 'Registrar Office', status: 'Active', age: '45yo', department: 'Registrar Office', position: 'Senior Clerk', contactName: 'Robert Tan', contactRelationship: 'Spouse', contactNumber: '+63 918 777 3210', createdAt: '2021-03-01', updatedAt: '2024-01-20' },
  { id: 'p5', idNumber: 'CSH-2023-105', fullName: 'Cruz, Kian D.', type: 'Student', gender: 'Male', dateOfBirth: '2007-12-03', context: 'Grade 12 - HUMSS C', status: 'Active', age: '18yo', gradeLevel: '12', section: 'HUMSS C', contactName: 'Anna Cruz', contactRelationship: 'Mother', contactNumber: '+63 919 000 1111', createdAt: '2023-06-15', updatedAt: '2024-02-28' },
  { id: 'p6', idNumber: 'EMP-2022-033', fullName: 'Santos, Rosa B.', type: 'Teacher', gender: 'Female', dateOfBirth: '1996-02-14', context: 'Math Department', status: 'Active', age: '29yo', department: 'Math Department', position: 'Math Teacher II', contactName: 'Pedro Santos', contactRelationship: 'Father', contactNumber: '+63 915 222 4444', createdAt: '2022-08-01', updatedAt: '2024-01-05' },
  { id: 'p7', idNumber: 'CSH-2024-011', fullName: 'Ramos, Miguel A.', type: 'Student', gender: 'Male', dateOfBirth: '2010-09-25', context: 'Grade 10 - Diamond', status: 'Active', age: '15yo', gradeLevel: '10', section: 'Diamond', contactName: 'Carmen Ramos', contactRelationship: 'Mother', contactNumber: '+63 912 666 8888', createdAt: '2024-06-01', updatedAt: '2024-06-01' },
  { id: 'p8', idNumber: 'NTP-2020-008', fullName: 'Garcia, Pedro J.', type: 'NTP', gender: 'Male', dateOfBirth: '1973-04-11', context: 'Maintenance Office', status: 'Active', age: '52yo', department: 'Maintenance Office', position: 'Maintenance Head', contactName: 'Sofia Garcia', contactRelationship: 'Spouse', contactNumber: '+63 916 333 5555', createdAt: '2020-01-10', updatedAt: '2024-02-15' },
];

export const mockVisits: Visit[] = [
  { id: 1, date: '2026-03-01', timeIn: '08:15 AM', timeOut: '09:00 AM', patientId: 'p1', patientName: 'Dela Cruz, Juan P.', patientType: 'Student', complaint: 'Severe headache and slight dizziness after PE class', assessment: 'Patient reported throbbing headache rated 8/10. Vitals taken (BP: 110/70, Temp: 36.8°C). Rested for 45 mins. Administered Paracetamol.', nurseRemarks: 'Student was pale upon arrival. Condition improved after rest but headache persisted.', disposition: 'Sent Home', dispositionColor: 'orange', medicines: [{ name: 'Paracetamol 500mg', quantity: 1, dosage: '1 tab' }], temperature: '36.8', bloodPressure: '110/70', heartRate: '82', releaseTime: '09:05 AM', releasedTo: 'Maria Dela Cruz', releasedToRelationship: 'Mother', authorizedBy: 'Dr. Sarah L.', advisory: 'Monitor temperature every 4 hours. Return if symptoms worsen.', createdAt: '2026-03-01', updatedAt: '2026-03-01' },
  { id: 2, date: '2026-03-01', timeIn: '09:30 AM', timeOut: '09:50 AM', patientId: 'p2', patientName: 'Reyes, Maria S.', patientType: 'Teacher', complaint: 'Blood pressure checkup requested', assessment: 'Routine BP monitoring. Results normal: 120/80. No medication required.', nurseRemarks: 'Teacher came for routine BP check. All vitals within normal range.', disposition: 'Returned to Work', dispositionColor: 'green', medicines: [], bloodPressure: '120/80', heartRate: '72', createdAt: '2026-03-01', updatedAt: '2026-03-01' },
  { id: 3, date: '2026-03-01', timeIn: '10:45 AM', timeOut: '11:30 AM', patientId: 'p7', patientName: 'Ramos, Miguel A.', patientType: 'Student', complaint: 'High fever (39.5°C) and chills during class', assessment: 'Temperature measured at 39.5°C. Given Paracetamol. Parent contacted for pickup.', nurseRemarks: 'Student was shivering upon arrival. Fever did not respond quickly.', disposition: 'Sent Home', dispositionColor: 'orange', medicines: [{ name: 'Paracetamol 500mg', quantity: 1, dosage: '1 tab' }], temperature: '39.5', bloodPressure: '100/65', heartRate: '95', releaseTime: '11:30 AM', releasedTo: 'Carmen Ramos', releasedToRelationship: 'Mother', authorizedBy: 'Dr. Sarah L.', advisory: 'If fever persists beyond 24 hours, seek medical attention.', createdAt: '2026-03-01', updatedAt: '2026-03-01' },
  { id: 4, date: '2026-02-28', timeIn: '01:15 PM', timeOut: '01:35 PM', patientId: 'p5', patientName: 'Cruz, Kian D.', patientType: 'Student', complaint: 'Minor abrasion on left knee from sports', assessment: 'Wound cleaned with antiseptic. Applied sterile bandage. No signs of infection.', nurseRemarks: 'Student active and alert. Minor scrape only.', disposition: 'Returned to Class', dispositionColor: 'green', medicines: [{ name: 'Betadine Solution', quantity: 1, dosage: 'Topical' }], createdAt: '2026-02-28', updatedAt: '2026-02-28' },
  { id: 5, date: '2026-02-28', timeIn: '02:30 PM', timeOut: '02:45 PM', patientId: 'p8', patientName: 'Garcia, Pedro J.', patientType: 'NTP', complaint: 'Requesting paracetamol for toothache', assessment: 'Administered 500mg Paracetamol for pain. Advised to see a dentist.', nurseRemarks: 'No swelling observed. Pain localized to lower left molar.', disposition: 'Returned to Work', dispositionColor: 'green', medicines: [{ name: 'Paracetamol 500mg', quantity: 1, dosage: '1 tab' }], createdAt: '2026-02-28', updatedAt: '2026-02-28' },
  { id: 6, date: '2026-02-27', timeIn: '11:00 AM', timeOut: '11:45 AM', patientId: 'p7', patientName: 'Ramos, Miguel A.', patientType: 'Student', complaint: 'Allergic reaction — difficulty breathing', assessment: 'Administered emergency protocol. Called emergency services. Parents notified.', nurseRemarks: 'Student ate peanut-containing food. Epipen was NOT available. Ambulance called.', disposition: 'Sent to Hospital', dispositionColor: 'red', medicines: [{ name: 'Cetirizine 10mg', quantity: 1, dosage: '1 tab' }], temperature: '37.2', bloodPressure: '90/60', heartRate: '110', createdAt: '2026-02-27', updatedAt: '2026-02-27' },
];

export const mockMedicines: Medicine[] = [
  { id: 1, name: 'Paracetamol 500mg', sku: 'SKU-2022', category: 'Analgesic', type: 'Tablet', dosage: '500mg', stock: 45, threshold: 100, unit: 'pcs', expiry: '2027-06-15', status: 'low' },
  { id: 2, name: 'Ibuprofen 200mg', sku: 'SKU-1004', category: 'Anti-inflammatory', type: 'Tablet', dosage: '200mg', stock: 30, threshold: 50, unit: 'pcs', expiry: '2027-03-20', status: 'low' },
  { id: 3, name: 'Amoxicillin 500mg', sku: 'SKU-9921', category: 'Antibiotic', type: 'Capsule', dosage: '500mg', stock: 12, threshold: 50, unit: 'caps', expiry: '2026-12-01', status: 'critical' },
  { id: 4, name: 'Cetirizine 10mg', sku: 'SKU-3301', category: 'Antihistamine', type: 'Tablet', dosage: '10mg', stock: 120, threshold: 30, unit: 'tabs', expiry: '2027-09-10', status: 'good' },
  { id: 5, name: 'Bandages Large', sku: 'SKU-5501', category: 'Supplies', stock: 15, threshold: 20, unit: 'rolls', expiry: 'N/A', status: 'low' },
  { id: 6, name: 'Alcohol Swabs', sku: 'SKU-5502', category: 'Supplies', stock: 200, threshold: 50, unit: 'pcs', expiry: '2028-01-15', status: 'good' },
  { id: 7, name: 'Betadine Solution', sku: 'SKU-7701', category: 'Antiseptic', type: 'Topical', dosage: '10%', stock: 8, threshold: 10, unit: 'bottles', expiry: '2026-08-20', status: 'critical' },
  { id: 8, name: 'Sumatriptan 50mg', sku: 'SKU-8801', category: 'Migraine', type: 'Tablet', dosage: '50mg', stock: 15, threshold: 20, unit: 'tabs', expiry: '2027-04-30', status: 'low' },
  { id: 9, name: 'Mefenamic Acid 500mg', sku: 'SKU-9901', category: 'Analgesic', type: 'Capsule', dosage: '500mg', stock: 60, threshold: 40, unit: 'caps', expiry: '2027-11-01', status: 'good' },
  { id: 10, name: 'Salbutamol Inhaler', sku: 'SKU-1010', category: 'Respiratory', type: 'Inhaler', dosage: '100mcg', stock: 5, threshold: 8, unit: 'pcs', expiry: '2027-02-28', status: 'critical' },
];

// Dashboard analytics data
export const visitsByDayOfWeek = [
  { day: 'Mon', visits: 38 },
  { day: 'Tue', visits: 42 },
  { day: 'Wed', visits: 35 },
  { day: 'Thu', visits: 48 },
  { day: 'Fri', visits: 31 },
];

export const visitsByType = [
  { type: 'Student', count: 156, color: '#3b82f6' },
  { type: 'Teacher', count: 42, color: '#8b5cf6' },
  { type: 'NTP', count: 18, color: '#f97316' },
];

export const monthlyVisitTrend = [
  { month: 'Sep', visits: 180 },
  { month: 'Oct', visits: 210 },
  { month: 'Nov', visits: 195 },
  { month: 'Dec', visits: 120 },
  { month: 'Jan', visits: 225 },
  { month: 'Feb', visits: 248 },
  { month: 'Mar', visits: 42 },
];

export const topComplaints = [
  { complaint: 'Headache', count: 68 },
  { complaint: 'Fever', count: 52 },
  { complaint: 'Stomach Pain', count: 41 },
  { complaint: 'Minor Cuts', count: 35 },
  { complaint: 'BP Checkup', count: 28 },
];

export const mostUsedMedicines = [
  { name: 'Paracetamol', units: 245, percent: 100 },
  { name: 'Ibuprofen', units: 180, percent: 73 },
  { name: 'Cetirizine', units: 120, percent: 49 },
  { name: 'Alcohol Swabs', units: 95, percent: 39 },
  { name: 'Mefenamic Acid', units: 72, percent: 29 },
];

// ─── Stock Movement Ledger Data ──────────────────────────────
export const mockStockMovements: StockMovement[] = [
  { id: 1, date: 'Oct 27, 2023', medicineId: 3, medicineName: 'Amoxicillin 500mg', medicineSku: '#SKU-9921', medicineType: 'Capsule', movementType: 'IN', qtyIn: 500, reference: 'PO #4023', initials: 'AM', initialsColor: 'bg-amber-100 text-amber-700' },
  { id: 2, date: 'Oct 26, 2023', medicineId: 2, medicineName: 'Ibuprofen 200mg', medicineSku: '#SKU-1004', medicineType: 'Tablet', movementType: 'OUT', qtyOut: 30, reference: 'Visit #1024', initials: 'IB', initialsColor: 'bg-purple-100 text-purple-700' },
  { id: 3, date: 'Oct 26, 2023', medicineId: 1, medicineName: 'Paracetamol 500mg', medicineSku: '#SKU-2022', medicineType: 'Tablet', movementType: 'OUT', qtyOut: 15, reference: 'Visit #1025', initials: 'PA', initialsColor: 'bg-blue-100 text-blue-700' },
  { id: 4, date: 'Oct 25, 2023', medicineId: 11, medicineName: 'Ciprofloxacin 500mg', medicineSku: '#SKU-8821', medicineType: 'Tablet', movementType: 'IN', qtyIn: 1000, reference: 'PO #4021', initials: 'CI', initialsColor: 'bg-green-100 text-green-700' },
  { id: 5, date: 'Oct 24, 2023', medicineId: 12, medicineName: 'Vitamin C 1000mg', medicineSku: '#SKU-1120', medicineType: 'Effervescent', movementType: 'OUT', qtyOut: 5, reference: 'Adjustment', initials: 'VC', initialsColor: 'bg-rose-100 text-rose-700' },
  { id: 6, date: 'Oct 23, 2023', medicineId: 1, medicineName: 'Paracetamol 500mg', medicineSku: '#SKU-2022', medicineType: 'Tablet', movementType: 'IN', qtyIn: 200, reference: 'PO #4020', initials: 'PA', initialsColor: 'bg-blue-100 text-blue-700' },
  { id: 7, date: 'Oct 22, 2023', medicineId: 4, medicineName: 'Cetirizine 10mg', medicineSku: '#SKU-3301', medicineType: 'Tablet', movementType: 'OUT', qtyOut: 10, reference: 'Visit #1020', initials: 'CE', initialsColor: 'bg-teal-100 text-teal-700' },
];

// ─── Medicine Usage Ranking Data ─────────────────────────────
export const mockUsageRankings: MedicineUsageRanking[] = [
  { rank: 1, name: 'Paracetamol', description: '500mg Tablets', qtyDispensed: 450, percentOfTotal: 15 },
  { rank: 2, name: 'Amoxicillin', description: '250mg Capsules', qtyDispensed: 120, percentOfTotal: 8 },
  { rank: 3, name: 'Ibuprofen', description: '400mg Tablets', qtyDispensed: 98, percentOfTotal: 6 },
  { rank: 4, name: 'Cetirizine', description: '10mg Tablets', qtyDispensed: 85, percentOfTotal: 5 },
  { rank: 5, name: 'Aspirin', description: '81mg Low Dose', qtyDispensed: 60, percentOfTotal: 3 },
  { rank: 6, name: 'Loratadine', description: '10mg Tablets', qtyDispensed: 45, percentOfTotal: 2.5 },
];

// ─── Consumption Summary Data ────────────────────────────────
export const mockConsumptionSummary: ConsumptionSummaryItem[] = [
  { id: 1, medicineName: 'Amoxicillin 500mg', period: 'Oct 2024', qtyUsed: 1240, status: 'In Stock', icon: '💊', iconColor: 'bg-blue-100' },
  { id: 2, medicineName: 'Ibuprofen 400mg', period: 'Oct 2024', qtyUsed: 850, status: 'In Stock', icon: '💉', iconColor: 'bg-amber-100' },
  { id: 3, medicineName: 'Paracetamol 500mg', period: 'Oct 2024', qtyUsed: 2100, status: 'Low Stock', icon: '🏥', iconColor: 'bg-red-100' },
  { id: 4, medicineName: 'Cetirizine 10mg', period: 'Oct 2024', qtyUsed: 320, status: 'In Stock', icon: '💊', iconColor: 'bg-green-100' },
  { id: 5, medicineName: 'Mefenamic Acid 500mg', period: 'Oct 2024', qtyUsed: 450, status: 'In Stock', icon: '💊', iconColor: 'bg-purple-100' },
];

export const consumptionTrend = [
  { month: 'May', units: 1200 },
  { month: 'Jun', units: 1350 },
  { month: 'Jul', units: 1100 },
  { month: 'Aug', units: 1450 },
  { month: 'Sep', units: 1700 },
  { month: 'Oct', units: 2450 },
];

// ─── Archived Visits Data ────────────────────────────────────
export const mockArchivedVisits: ArchivedVisit[] = [
  { id: 1, visitDate: 'Oct 20, 2023', patientName: 'Philip R. Hanson', patientInitials: 'PH', initialsColor: 'bg-teal-100 text-teal-700', type: 'Existing', complaint: 'Seasonal allergies, ...', disposition: 'Returned', dispositionColor: 'text-emerald-600', dateArchived: 'Oct 21, 2023' },
  { id: 2, visitDate: 'Oct 19, 2023', patientName: 'Andy Zane B, Egut', patientInitials: 'AE', initialsColor: 'bg-blue-100 text-blue-700', type: 'New', complaint: 'Acute abdominal pain', disposition: 'Sent Home', dispositionColor: 'text-orange-600', dateArchived: 'Oct 22, 2023' },
  { id: 3, visitDate: 'Oct 18, 2023', patientName: 'Abbegail D. Abebon', patientInitials: 'AA', initialsColor: 'bg-purple-100 text-purple-700', type: 'Existing', complaint: 'Routine checkup, blo...', disposition: 'Returned', dispositionColor: 'text-emerald-600', dateArchived: 'Oct 18, 2023' },
  { id: 4, visitDate: 'Oct 15, 2023', patientName: 'Harry R. Osborne', patientInitials: 'HO', initialsColor: 'bg-amber-100 text-amber-700', type: 'Emergency', complaint: 'Fractured wrist', disposition: 'Transferred', dispositionColor: 'text-blue-600', dateArchived: 'Oct 16, 2023' },
  { id: 5, visitDate: 'Oct 12, 2023', patientName: 'Hans D. Sander', patientInitials: 'HS', initialsColor: 'bg-slate-200 text-slate-700', type: 'Existing', complaint: 'Shoulder dislocation,...', disposition: 'Sent Home', dispositionColor: 'text-orange-600', dateArchived: 'Oct 13, 2023' },
  { id: 6, visitDate: 'Oct 10, 2023', patientName: 'Sarah F. Green', patientInitials: 'SG', initialsColor: 'bg-rose-100 text-rose-700', type: 'New', complaint: 'Migraine, severe sen...', disposition: 'Returned', dispositionColor: 'text-emerald-600', dateArchived: 'Oct 10, 2023' },
];

// ─── Archived Medicines Data ─────────────────────────────────
export const mockArchivedMedicines: ArchivedMedicine[] = [
  { id: 1, name: 'Amoxicillin Trihydrate', medId: '#MED-29381', form: 'Capsule', dosage: '500mg', lastStock: 0, dateArchived: 'Oct 20, 2023', archivedBy: 'Admin', icon: '💊', iconColor: 'bg-rose-100' },
  { id: 2, name: 'Cough Syrup (Pediatric)', medId: '#MED-10293', form: 'Liquid', dosage: '120ml', lastStock: 12, dateArchived: 'Oct 15, 2023', archivedBy: 'System', icon: '🧴', iconColor: 'bg-blue-100' },
  { id: 3, name: 'Insulin Glargine', medId: '#MED-55921', form: 'Injection', dosage: '10ml Vial', lastStock: 3, dateArchived: 'Sep 28, 2023', archivedBy: 'Dr. Jenkins', icon: '💉', iconColor: 'bg-purple-100' },
  { id: 4, name: 'Paracetamol (Generic)', medId: '#MED-11234', form: 'Tablet', dosage: '500mg', lastStock: 0, dateArchived: 'Sep 12, 2023', archivedBy: 'Admin', icon: '💊', iconColor: 'bg-rose-100' },
  { id: 5, name: 'Betadine Ointment', medId: '#MED-88392', form: 'Topical', dosage: '20g Tube', lastStock: 5, dateArchived: 'Aug 05, 2023', archivedBy: 'System', icon: '🧴', iconColor: 'bg-amber-100' },
];

// ─── Patient Visit History (for patient profile) ─────────────
export const mockPatientVisits = [
  { id: 101, date: 'Oct 24, 2023', complaint: 'Severe Migraine', complaintColor: 'bg-red-500', timeIn: '08:30 AM', timeOut: '09:15 AM', disposition: 'Returned to Class', dispositionColor: 'bg-emerald-100 text-emerald-700' },
  { id: 102, date: 'Sep 12, 2023', complaint: 'Stomach Ache', complaintColor: 'bg-amber-500', timeIn: '10:15 AM', timeOut: '11:00 AM', disposition: 'Sent Home', dispositionColor: 'bg-orange-100 text-orange-700' },
  { id: 103, date: 'Aug 05, 2023', complaint: 'Minor Cut/Abrasion', complaintColor: 'bg-slate-400', timeIn: '01:20 PM', timeOut: '01:45 PM', disposition: 'Returned to Class', dispositionColor: 'bg-emerald-100 text-emerald-700' },
  { id: 104, date: 'Jul 18, 2023', complaint: 'Fever (38.5°C)', complaintColor: 'bg-red-500', timeIn: '09:00 AM', timeOut: '10:30 AM', disposition: 'Hospital Referral', dispositionColor: 'bg-red-100 text-red-700' },
  { id: 105, date: 'Jun 02, 2023', complaint: 'Annual Checkup', complaintColor: 'bg-slate-400', timeIn: '08:00 AM', timeOut: '08:45 AM', disposition: 'Completed', dispositionColor: 'bg-slate-100 text-slate-700' },
];

// ─── Clinic Profile Data ─────────────────────────────────────
export let mockClinicProfile: ClinicProfile = {
  clinicName: 'Cabantian SHS Clinic',
  schoolName: 'Cabantian Stand Alone Senior High School',
  contactNumber: '(082) 123-4567',
  address: 'Purok 5, Cabantian, Davao City, Davao del Sur 8000',
  inChargeName: 'Dr. Sarah L.',
};

// ─── Audit Log Data ──────────────────────────────────────────
export const mockAuditLog: AuditLogEntry[] = [
  { id: 1, timestamp: '2026-03-01 08:32:14', action: 'Create', entity: 'Visit', recordIdentifier: 'Dela Cruz, Juan P. – Visit #1', performedBy: 'Clinic In-Charge' },
  { id: 2, timestamp: '2026-03-01 08:15:02', action: 'Stock-out', entity: 'Medicine', recordIdentifier: 'Paracetamol 500mg (−1 tab)', performedBy: 'Clinic In-Charge' },
  { id: 3, timestamp: '2026-03-01 09:50:30', action: 'Create', entity: 'Visit', recordIdentifier: 'Reyes, Maria S. – Visit #2', performedBy: 'Clinic In-Charge' },
  { id: 4, timestamp: '2026-02-28 14:20:10', action: 'Edit', entity: 'Patient', recordIdentifier: 'Cruz, Kian D. – Updated contact info', performedBy: 'Clinic In-Charge' },
  { id: 5, timestamp: '2026-02-28 13:35:45', action: 'Create', entity: 'Visit', recordIdentifier: 'Cruz, Kian D. – Visit #4', performedBy: 'Clinic In-Charge' },
  { id: 6, timestamp: '2026-02-27 11:45:00', action: 'Stock-in', entity: 'Medicine', recordIdentifier: 'Amoxicillin 500mg (+500 caps) – PO #4023', performedBy: 'Clinic In-Charge' },
  { id: 7, timestamp: '2026-02-27 11:00:30', action: 'Create', entity: 'Visit', recordIdentifier: 'Ramos, Miguel A. – Visit #6 (Emergency)', performedBy: 'Clinic In-Charge' },
  { id: 8, timestamp: '2026-02-26 09:10:00', action: 'Archive', entity: 'Patient', recordIdentifier: 'Lopez, Angelo M.', performedBy: 'Clinic In-Charge' },
  { id: 9, timestamp: '2026-02-25 15:30:22', action: 'Create', entity: 'Patient', recordIdentifier: 'Ramos, Miguel A. – New Student', performedBy: 'Clinic In-Charge' },
  { id: 10, timestamp: '2026-02-25 10:05:11', action: 'Stock-in', entity: 'Medicine', recordIdentifier: 'Ciprofloxacin 500mg (+1000 tabs) – PO #4021', performedBy: 'Clinic In-Charge' },
  { id: 11, timestamp: '2026-02-24 08:45:00', action: 'Edit', entity: 'Medicine', recordIdentifier: 'Betadine Solution – Updated threshold', performedBy: 'Clinic In-Charge' },
  { id: 12, timestamp: '2026-02-23 16:20:33', action: 'Restore', entity: 'Patient', recordIdentifier: 'Santos, Rosa B.', performedBy: 'Clinic In-Charge' },
  { id: 13, timestamp: '2026-02-22 11:15:00', action: 'Stock-out', entity: 'Medicine', recordIdentifier: 'Cetirizine 10mg (−10 tabs) – Visit #1020', performedBy: 'Clinic In-Charge' },
  { id: 14, timestamp: '2026-02-21 09:00:00', action: 'Archive', entity: 'Medicine', recordIdentifier: 'Amoxicillin Trihydrate – Expired', performedBy: 'Clinic In-Charge' },
  { id: 15, timestamp: '2026-02-20 14:30:00', action: 'Create', entity: 'Patient', recordIdentifier: 'Garcia, Pedro J. – New NTP', performedBy: 'Clinic In-Charge' },
];