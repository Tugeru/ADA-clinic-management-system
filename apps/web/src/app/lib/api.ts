// ─────────────────────────────────────────────────────────────
// Mock API service layer (simulates Express.js + Prisma ORM)
// Replace with real fetch calls to your Express backend in production
// ─────────────────────────────────────────────────────────────

import type { Patient, Visit, Medicine, PatientFormData, VisitFormData, PaginatedResponse, KPI, StockMovement, StockInFormData, MedicineFormData as MedFormData, MedicineUsageRanking, ConsumptionSummaryItem, ArchivedVisit, ArchivedMedicine, ClinicProfile, AuditLogEntry, AuditAction, AuditEntity } from './types';
import { mockPatients, mockVisits, mockMedicines, visitsByDayOfWeek, visitsByType, monthlyVisitTrend, topComplaints, mostUsedMedicines, mockStockMovements, mockUsageRankings, mockConsumptionSummary, consumptionTrend, mockArchivedVisits, mockArchivedMedicines, mockPatientVisits, mockClinicProfile, mockAuditLog } from './mock-data';

// Simulated network delay
const delay = (ms: number = 300) => new Promise(r => setTimeout(r, ms));

// ─── Auth API (simulates JWT auth endpoints) ─────────────────
export const authApi = {
  async login(email: string, password: string) {
    await delay(500);
    // Mock: any credentials work
    return {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-jwt-token',
      user: {
        id: 'usr_001',
        email,
        name: 'Dr. Sarah L.',
        role: 'CLINIC_INCHARGE' as const,
        schoolCode: 'CSASHS',
      },
    };
  },
  async getCurrentUser(token: string) {
    await delay(200);
    return {
      id: 'usr_001',
      email: 'clinic@csashs.edu.ph',
      name: 'Dr. Sarah L.',
      role: 'CLINIC_INCHARGE' as const,
      schoolCode: 'CSASHS',
    };
  },
};

// ─── Patient API ─────────────────────────────────────────────
export const patientApi = {
  async getAll(params?: { search?: string; type?: string; status?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Patient>> {
    await delay();
    let filtered = [...mockPatients];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(p => p.fullName.toLowerCase().includes(s) || p.idNumber.toLowerCase().includes(s));
    }
    if (params?.type && params.type !== 'All Types') {
      filtered = filtered.filter(p => p.type === params.type);
    }
    if (params?.status && params.status !== 'All Statuses') {
      filtered = filtered.filter(p => p.status === params.status);
    }
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    return {
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  async getById(id: string): Promise<Patient | undefined> {
    await delay(200);
    return mockPatients.find(p => p.id === id || p.idNumber === id);
  },

  async create(data: PatientFormData): Promise<Patient> {
    await delay(400);
    const newPatient: Patient = {
      id: `p${mockPatients.length + 1}`,
      ...data,
      status: 'Active',
      context: data.type === 'Student' ? `${data.gradeLevel} - ${data.section}` : `${data.department}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockPatients.push(newPatient);
    return newPatient;
  },

  async update(id: string, data: Partial<PatientFormData>): Promise<Patient> {
    await delay(400);
    const idx = mockPatients.findIndex(p => p.id === id);
    if (idx !== -1) {
      mockPatients[idx] = { ...mockPatients[idx], ...data, updatedAt: new Date().toISOString() };
      return mockPatients[idx];
    }
    throw new Error('Patient not found');
  },

  async archive(id: string): Promise<void> {
    await delay(300);
    const idx = mockPatients.findIndex(p => p.id === id);
    if (idx !== -1) mockPatients[idx].status = 'Archived';
  },

  async search(query: string): Promise<Patient[]> {
    await delay(150);
    const s = query.toLowerCase();
    return mockPatients.filter(p => p.status === 'Active' && (p.fullName.toLowerCase().includes(s) || p.idNumber.toLowerCase().includes(s))).slice(0, 5);
  },
};

// ─── Visit API ───────────────────────────────────────────────
export const visitApi = {
  async getAll(params?: { search?: string; type?: string; disposition?: string; period?: string }): Promise<PaginatedResponse<Visit>> {
    await delay();
    let filtered = [...mockVisits];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(v => v.patientName.toLowerCase().includes(s));
    }
    if (params?.type && params.type !== 'All Types') {
      filtered = filtered.filter(v => v.patientType === params.type);
    }
    if (params?.disposition && params.disposition !== 'All Dispositions') {
      filtered = filtered.filter(v => v.disposition.includes(params.disposition!));
    }
    return { data: filtered, total: filtered.length, page: 1, limit: 20, totalPages: 1 };
  },

  async getById(id: number): Promise<Visit | undefined> {
    await delay(200);
    return mockVisits.find(v => v.id === id);
  },

  async create(data: VisitFormData): Promise<Visit> {
    await delay(500);
    const patient = mockPatients.find(p => p.id === data.patientId);
    const newVisit: Visit = {
      id: mockVisits.length + 1,
      date: data.date,
      timeIn: data.timeIn,
      timeOut: data.timeOut,
      patientId: data.patientId,
      patientName: patient?.fullName || 'Unknown',
      patientType: patient?.type || 'Student',
      complaint: data.complaint,
      assessment: data.assessment,
      disposition: data.disposition,
      dispositionColor: data.disposition.includes('Sent Home') ? 'orange' : data.disposition.includes('Hospital') ? 'red' : 'green',
      medicines: data.medicines,
      temperature: data.temperature,
      bloodPressure: data.bloodPressure,
      heartRate: data.heartRate,
      releaseTime: data.releaseTime,
      releasedTo: data.guardianName,
      releasedToRelationship: data.relationship,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockVisits.unshift(newVisit);
    return newVisit;
  },

  async update(id: number, data: Partial<VisitFormData>): Promise<Visit> {
    await delay(400);
    const idx = mockVisits.findIndex(v => v.id === id);
    if (idx !== -1) {
      mockVisits[idx] = { ...mockVisits[idx], ...data, updatedAt: new Date().toISOString() } as Visit;
      return mockVisits[idx];
    }
    throw new Error('Visit not found');
  },

  async getTodayCount(): Promise<number> {
    await delay(100);
    return mockVisits.filter(v => v.date === '2026-03-01').length;
  },
};

// ─── Inventory API ───────────────────────────────────────────
export const inventoryApi = {
  async getAll(params?: { search?: string }): Promise<Medicine[]> {
    await delay();
    let filtered = [...mockMedicines];
    if (params?.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(m => m.name.toLowerCase().includes(s));
    }
    return filtered;
  },

  async getLowStock(): Promise<Medicine[]> {
    await delay(150);
    return mockMedicines.filter(m => m.status === 'low' || m.status === 'critical');
  },

  async getAvailableForDispensing(): Promise<{ name: string; stock: number }[]> {
    await delay(100);
    return mockMedicines.filter(m => m.stock > 0).map(m => ({ name: m.name, stock: m.stock }));
  },

  async stockIn(data: StockInFormData): Promise<void> {
    await delay(400);
    const med = mockMedicines.find(m => m.id === data.medicineId);
    if (med) {
      med.stock += data.quantity;
      if (med.stock >= med.threshold) med.status = 'good';
      else if (med.stock >= med.threshold * 0.5) med.status = 'low';
    }
  },

  async createMedicine(data: MedFormData): Promise<Medicine> {
    await delay(400);
    const newMed: Medicine = {
      id: mockMedicines.length + 1,
      name: data.name,
      sku: `SKU-${Math.floor(Math.random() * 10000)}`,
      category: data.type || 'General',
      type: data.type || undefined,
      dosage: data.dosage,
      stock: 0,
      threshold: data.threshold,
      unit: data.unit,
      expiry: 'N/A',
      status: 'critical',
      notes: data.notes,
    };
    mockMedicines.push(newMed);
    return newMed;
  },

  async getStockMovements(params?: { period?: string; medicine?: string; type?: string }): Promise<PaginatedResponse<StockMovement>> {
    await delay();
    let filtered = [...mockStockMovements];
    if (params?.type && params.type !== 'All') {
      filtered = filtered.filter(m => m.movementType === params.type);
    }
    if (params?.medicine && params.medicine !== 'All') {
      filtered = filtered.filter(m => m.medicineName.toLowerCase().includes(params.medicine!.toLowerCase()));
    }
    return { data: filtered, total: 97, page: 1, limit: 10, totalPages: 8 };
  },
};

// ─── Dashboard / Analytics API ───────────────────────────────
export const dashboardApi = {
  async getKPIs(): Promise<KPI[]> {
    await delay(200);
    const todayVisits = mockVisits.filter(v => v.date === '2026-03-01').length;
    const activePatients = mockPatients.filter(p => p.status === 'Active').length;
    const lowStockCount = mockMedicines.filter(m => m.status !== 'good').length;
    return [
      { title: "TODAY'S VISITS", value: String(todayVisits), change: '+5%', changeType: 'positive', changeText: 'vs yesterday' },
      { title: 'ACTIVE PATIENTS', value: String(activePatients), change: '+12%', changeType: 'positive', changeText: 'vs last month' },
      { title: 'LOW STOCK ITEMS', value: String(lowStockCount), subtitle: 'Needs Attention', subtitleColor: 'text-orange-500', highlight: true },
      { title: 'TOTAL MEDICINES', value: String(mockMedicines.length), subtitle: 'Inventory Healthy', subtitleColor: 'text-emerald-500' },
    ];
  },

  async getRecentVisits(): Promise<Visit[]> {
    await delay(200);
    return mockVisits.slice(0, 4);
  },

  async getChartData() {
    await delay(300);
    return { visitsByDayOfWeek, visitsByType, monthlyVisitTrend, topComplaints, mostUsedMedicines };
  },
};

// ─── Analytics API ───────────────────────────────────────────
export const analyticsApi = {
  async getUsageRankings(period?: string): Promise<MedicineUsageRanking[]> {
    await delay(300);
    return mockUsageRankings;
  },

  async getConsumptionSummary(period?: string): Promise<{ items: ConsumptionSummaryItem[]; trend: typeof consumptionTrend; totalConsumption: number; stockAlerts: number; pendingOrders: number }> {
    await delay(300);
    return {
      items: mockConsumptionSummary,
      trend: consumptionTrend,
      totalConsumption: 4520,
      stockAlerts: 12,
      pendingOrders: 5,
    };
  },
};

// ─── Archive API ─────────────────────────────────────────────
export const archiveApi = {
  async getArchivedPatients(params?: { search?: string; type?: string; page?: number }): Promise<PaginatedResponse<Patient>> {
    await delay();
    const archived = mockPatients.filter(p => p.status === 'Archived');
    return { data: archived, total: 142, page: 1, limit: 5, totalPages: 29 };
  },

  async getArchivedVisits(params?: { search?: string; type?: string; disposition?: string; page?: number }): Promise<PaginatedResponse<ArchivedVisit>> {
    await delay();
    return { data: mockArchivedVisits, total: 42, page: 1, limit: 6, totalPages: 7 };
  },

  async getArchivedMedicines(params?: { search?: string; type?: string; page?: number }): Promise<PaginatedResponse<ArchivedMedicine>> {
    await delay();
    return { data: mockArchivedMedicines, total: 24, page: 1, limit: 5, totalPages: 5 };
  },

  async restorePatient(id: string): Promise<void> {
    await delay(300);
    const idx = mockPatients.findIndex(p => p.id === id);
    if (idx !== -1) mockPatients[idx].status = 'Active';
  },
};

// ─── Patient Visits API (for profile) ────────────────────────
export const patientVisitsApi = {
  async getByPatientId(patientId: string, params?: { search?: string; page?: number }): Promise<PaginatedResponse<typeof mockPatientVisits[0]>> {
    await delay(300);
    return { data: mockPatientVisits, total: 12, page: 1, limit: 5, totalPages: 3 };
  },
};

// ─── Clinic Profile API ──────────────────────────────────────
export const clinicProfileApi = {
  async getProfile(): Promise<ClinicProfile> {
    await delay(200);
    return { ...mockClinicProfile };
  },

  async updateProfile(data: Partial<ClinicProfile>): Promise<ClinicProfile> {
    await delay(400);
    Object.assign(mockClinicProfile, data);
    return { ...mockClinicProfile };
  },
};

// ─── Audit Log API ───────────────────────────────────────────
export const auditLogApi = {
  async getAuditLog(params?: { action?: AuditAction; entity?: AuditEntity; page?: number; limit?: number }): Promise<PaginatedResponse<AuditLogEntry>> {
    await delay();
    let filtered = [...mockAuditLog];
    if (params?.action && params.action !== 'All Actions') {
      filtered = filtered.filter(a => a.action === params.action);
    }
    if (params?.entity && params.entity !== 'All Entities') {
      filtered = filtered.filter(a => a.entity === params.entity);
    }
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    return {
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },
};