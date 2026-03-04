// ─────────────────────────────────────────────────────────────
// Real API service layer — calls the Express backend at /api
// ─────────────────────────────────────────────────────────────

import { http } from './axios';
import type {
  Patient, Visit, Medicine, StockMovement,
  PaginatedResponse, KPI,
} from './types';

// ─── Auth ───────────────────────────────────────────────────
export const authApi = {
  async login(email: string, password: string) {
    const { data } = await http.post('/auth/login', { email, password });
    return data as { token: string; user: { id: string; email: string; fullName: string } };
  },
};

// ─── Patients / Students ────────────────────────────────────
export const patientApi = {
  async getAll(params?: { search?: string; includeArchived?: boolean }): Promise<PaginatedResponse<Patient>> {
    const { data } = await http.get('/students', { params: { search: params?.search, includeArchived: params?.includeArchived } });
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return { data: items.map(mapStudent), total: items.length, page: 1, limit: items.length, totalPages: 1 };
  },

  async getById(id: string): Promise<Patient | undefined> {
    const { data } = await http.get(`/students/${id}`);
    return data ? mapStudent(data) : undefined;
  },

  async create(payload: any): Promise<Patient> {
    const { data } = await http.post('/students', studentPayload(payload));
    return mapStudent(data);
  },

  async update(id: string, payload: any): Promise<Patient> {
    const { data } = await http.patch(`/students/${id}`, studentPayload(payload));
    return mapStudent(data);
  },

  async archive(id: string): Promise<void> {
    await http.patch(`/students/${id}/archive`);
  },

  async delete(id: string): Promise<void> {
    await http.delete(`/students/${id}`);
  },

  async search(query: string): Promise<Patient[]> {
    const { data } = await http.get('/students', { params: { search: query } });
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return items.slice(0, 5).map(mapStudent);
  },
};

// ─── Visits ─────────────────────────────────────────────────
export const visitApi = {
  async getAll(params?: { search?: string; studentId?: string; startDate?: string; endDate?: string }): Promise<PaginatedResponse<Visit>> {
    const { data } = await http.get('/visits', { params });
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return { data: items.map(mapVisit), total: items.length, page: 1, limit: items.length, totalPages: 1 };
  },

  async getById(id: number | string): Promise<Visit | undefined> {
    const { data } = await http.get(`/visits/${id}`);
    return data ? mapVisit(data) : undefined;
  },

  async create(payload: any): Promise<Visit> {
    const { data } = await http.post('/visits', visitPayload(payload));
    return mapVisit(data);
  },

  async update(id: number | string, payload: any): Promise<Visit> {
    const { data } = await http.patch(`/visits/${id}`, {
      timeIn: payload.timeIn,
      timeOut: payload.timeOut,
      remarks: payload.remarks,
      temperature: payload.temperature,
      bloodPressure: payload.bloodPressure,
      heartRate: payload.heartRate,
      respiratoryRate: payload.respiratoryRate,
    });
    return mapVisit(data);
  },

  async getTodayCount(): Promise<number> {
    const { data } = await http.get('/visits', { params: { startDate: toDateStr(new Date()), endDate: toDateStr(new Date()) } });
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return items.length;
  },

  async delete(id: string): Promise<void> {
    await http.delete(`/visits/${id}`);
  },
};

// ─── Inventory ───────────────────────────────────────────────
export const inventoryApi = {
  async getAll(params?: { search?: string }): Promise<Medicine[]> {
    const { data } = await http.get('/medicines', { params });
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return items.map(mapMedicine);
  },

  async getLowStock(): Promise<Medicine[]> {
    const { data } = await http.get('/reports/low-stock');
    const items: any[] = Array.isArray(data) ? data : data.medicines ?? data.data ?? [];
    return items.map((m: any) => ({
      id: m.medicineId ?? m.id,
      name: m.name,
      sku: m.medicineId ?? m.id,
      category: 'Medicine',
      stock: m.totalStock ?? 0,
      threshold: m.reorderThreshold ?? 0,
      unit: 'pcs',
      expiry: 'N/A',
      status: 'low' as const,
    }));
  },

  async getAvailableForDispensing(): Promise<{ name: string; id: string; stock: number }[]> {
    const { data } = await http.get('/medicines');
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return items.filter((m: any) => m.totalStock > 0).map((m: any) => ({ id: m.id, name: m.name, stock: m.totalStock ?? 0 }));
  },

  async stockIn(payload: any): Promise<void> {
    await http.post('/inventory/stock-in', {
      medicineId: payload.medicineId,
      batchNumber: payload.batchNumber,
      expirationDate: payload.expirationDate,
      quantity: Number(payload.quantity),
    });
  },

  async createMedicine(payload: any): Promise<Medicine> {
    const { data } = await http.post('/medicines', {
      name: payload.name,
      description: payload.notes,
      purpose: payload.type,
      reorderThreshold: Number(payload.threshold) || 0,
    });
    return mapMedicine(data);
  },

  async getStockMovements(_params?: any): Promise<PaginatedResponse<StockMovement>> {
    // Use reports/consumption as a proxy
    const today = toDateStr(new Date());
    const sixtyAgo = toDateStr(new Date(Date.now() - 60 * 86400000));
    const { data } = await http.get('/reports/consumption', { params: { startDate: sixtyAgo, endDate: today } });
    return { data: data.medicines ?? [], total: 0, page: 1, limit: 20, totalPages: 1 };
  },

  // M-2: get single medicine with batches
  async getById(id: string): Promise<any> {
    const { data } = await http.get(`/medicines/${id}`);
    const totalStock = (data.batches ?? []).reduce((s: number, b: any) => s + b.quantityOnHand, 0);
    return { ...mapMedicine(data), batches: data.batches ?? [], totalStock };
  },

  // M-1: reduce stock by adjusting a specific batch
  async adjustStock(payload: { batchId: string; quantity: number; notes?: string }): Promise<void> {
    await http.post('/inventory/adjust', payload);
  },

  // M-2: archive medicine (set isActive = false)
  async archiveMedicine(id: string): Promise<void> {
    await http.patch(`/medicines/${id}`, { isActive: false });
  },

  // M-2: permanently delete medicine
  async deleteMedicine(id: string): Promise<void> {
    await http.delete(`/medicines/${id}`);
  },
};

// ─── Dashboard ───────────────────────────────────────────────
export const dashboardApi = {
  async getKPIs(): Promise<KPI[]> {
    const [visits, students, lowStock, medicines] = await Promise.all([
      http.get('/visits', { params: { startDate: toDateStr(new Date()), endDate: toDateStr(new Date()) } }),
      http.get('/students'),
      http.get('/reports/low-stock'),
      http.get('/medicines'),
    ]);
    const visitItems: any[] = Array.isArray(visits.data) ? visits.data : visits.data.data ?? [];
    const studentItems: any[] = Array.isArray(students.data) ? students.data : students.data.data ?? [];
    const lowItems: any[] = Array.isArray(lowStock.data) ? lowStock.data : lowStock.data.medicines ?? [];
    const medItems: any[] = Array.isArray(medicines.data) ? medicines.data : medicines.data.data ?? [];
    return [
      { title: "TODAY'S VISITS", value: String(visitItems.length), change: '', changeType: 'positive', changeText: 'today' },
      { title: 'ACTIVE STUDENTS', value: String(studentItems.filter((s: any) => !s.isArchived).length), change: '', changeType: 'positive', changeText: 'active' },
      { title: 'LOW STOCK ITEMS', value: String(lowItems.length), subtitle: 'Needs Attention', subtitleColor: 'text-orange-500', highlight: lowItems.length > 0 },
      { title: 'TOTAL MEDICINES', value: String(medItems.length), subtitle: 'In Catalog', subtitleColor: 'text-emerald-500' },
    ];
  },

  async getRecentVisits(): Promise<Visit[]> {
    const { data } = await http.get('/visits');
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return items.slice(0, 5).map(mapVisit);
  },

  async getChartData() {
    // Return empty structure — charts will show live data when available
    return { visitsByDayOfWeek: [], visitsByType: [], monthlyVisitTrend: [], topComplaints: [], mostUsedMedicines: [] };
  },
};

// ─── Analytics ───────────────────────────────────────────────
export const analyticsApi = {
  async getUsageRankings(_period?: string) {
    return [];
  },

  async getConsumptionSummary(period?: string) {
    const endDate = toDateStr(new Date());
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
    const startDate = toDateStr(new Date(Date.now() - days * 86400000));
    const { data } = await http.get('/reports/consumption', { params: { startDate, endDate } });
    const items = (data.medicines ?? []) as any[];
    return {
      items: items.map((m: any) => ({
        id: m.medicineId,
        medicineName: m.name ?? 'Unknown',
        period: `Last ${days} days`,
        qtyUsed: m.totalDispensed ?? 0,
        status: (m.totalDispensed ?? 0) > 0 ? 'In Stock' : 'Low Stock',
        icon: '💊',
        iconColor: 'bg-teal-50 text-teal-600',
      })),
      trend: [],
      totalConsumption: items.reduce((s: number, m: any) => s + (m.totalDispensed ?? 0), 0),
      stockAlerts: 0,
      pendingOrders: 0,
    };
  },
};

// ─── Archive ─────────────────────────────────────────────────
export const archiveApi = {
  async getArchivedPatients(params?: any): Promise<PaginatedResponse<Patient>> {
    const { data } = await http.get('/students', { params: { includeArchived: true } });
    const items: any[] = (Array.isArray(data) ? data : data.data ?? []).filter((s: any) => s.isArchived);
    return { data: items.map(mapStudent), total: items.length, page: 1, limit: items.length, totalPages: 1 };
  },

  async getArchivedVisits(_params?: any): Promise<PaginatedResponse<any>> {
    return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  },

  async getArchivedMedicines(_params?: any): Promise<PaginatedResponse<any>> {
    return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  },

  async restorePatient(id: string): Promise<void> {
    await http.patch(`/students/${id}/archive`);
  },
};

// ─── Patient visits for profile ─────────────────────────────
export const patientVisitsApi = {
  async getByPatientId(patientId: string, _params?: any): Promise<PaginatedResponse<Visit>> {
    const { data } = await http.get('/visits', { params: { studentId: patientId } });
    const items: any[] = Array.isArray(data) ? data : data.data ?? [];
    return { data: items.map(mapVisit), total: items.length, page: 1, limit: items.length, totalPages: 1 };
  },
};

// ─── Clinic profile / audit log (local only) ─────────────────
export const clinicProfileApi = {
  async getProfile() { return { name: 'ADA Clinic', schoolCode: 'CSASHS' } as any; },
  async updateProfile(d: any) { return d as any; },
};
export const auditLogApi = {
  async getAuditLog(_p?: any): Promise<PaginatedResponse<any>> {
    return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
  },
};

// ─── Mappers ─────────────────────────────────────────────────
function mapStudent(s: any): Patient {
  // P-3: compute age from dateOfBirth
  let age: string | undefined;
  if (s.dateOfBirth) {
    const dob = new Date(s.dateOfBirth);
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) years--;
    age = `${years}`;
  }

  return {
    id: s.id,
    fullName: s.fullName,
    idNumber: s.id.slice(0, 8),
    type: (s.patientType as any) ?? 'Student',
    gradeLevel: s.gradeLevel ?? '',
    strand: s.strand ?? '',
    section: s.section ?? '',
    status: s.isArchived ? 'Archived' : 'Active',
    context: s.patientType === 'Student'
      ? `${s.gradeLevel ?? ''} - ${s.section ?? ''}`.trim() || '--'
      : s.department || s.position || '--',
    gender: s.gender,
    dateOfBirth: s.dateOfBirth?.slice(0, 10),
    age,
    // P-4: Emergency contact (persisted once schema migration runs)
    contactName: s.contactName,
    contactRelationship: s.contactRelationship,
    contactNumber: s.contactNumber,
    // department/position for Teacher/NTP
    department: s.department,
    position: s.position,
    // Preserve for edit form prefill
    knownMedicalConditions: s.knownMedicalConditions,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  } as any;
}

function mapVisit(v: any): Visit {
  return {
    id: v.id,
    date: v.visitDate?.slice(0, 10) ?? (v.timeIn ? new Date(v.timeIn).toLocaleDateString('en-CA') : ''),
    timeIn: v.timeIn ? new Date(v.timeIn).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true }) : '',
    timeOut: v.timeOut ? new Date(v.timeOut).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true }) : '',
    patientId: v.studentId,
    patientName: v.student?.fullName ?? 'Unknown',
    patientType: v.student?.patientType ?? 'Student',
    complaint: v.complaint,
    assessment: v.actionTaken ?? v.assessment ?? '',
    nurseRemarks: v.remarks ?? '',
    // Vital signs
    temperature: v.temperature ?? '',
    bloodPressure: v.bloodPressure ?? '',
    heartRate: v.heartRate ?? '',
    respiratoryRate: v.respiratoryRate ?? '',
    // Disposition
    disposition: v.releasedToName ? `Released to ${v.releasedToName}` : 'Treated and Dismissed',
    dispositionColor: v.releasedToName ? 'orange' : 'green',
    // Release info
    releasedTo: v.releasedToName ?? '',
    releasedToRelationship: v.releasedToRelationship ?? '',
    releaseTime: v.releaseTime ? new Date(v.releaseTime).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true }) : '',
    // Medicines
    medicines: (v.visitMedicines ?? []).map((m: any) => ({
      name: m.medicine?.name ?? '',
      quantity: m.quantityDispensed,
    })),
    createdAt: v.createdAt,
    updatedAt: v.updatedAt,
  } as any;
}

function mapMedicine(m: any): Medicine {
  return {
    id: m.id,
    name: m.name,
    sku: m.id.slice(0, 8),
    category: m.purpose ?? 'General',
    stock: m.totalStock ?? m.batches?.reduce((s: number, b: any) => s + b.quantityOnHand, 0) ?? 0,
    threshold: m.reorderThreshold ?? 0,
    unit: 'pcs',
    expiry: m.batches?.[0]?.expirationDate?.slice(0, 10) ?? 'N/A',
    status: (m.isLowStock ? (m.totalStock === 0 ? 'critical' : 'low') : 'good') as any,
    notes: m.description,
  } as any;
}

function studentPayload(p: any) {
  return {
    fullName: p.fullName,
    patientType: p.patientType ?? 'Student',
    gradeLevel: p.gradeLevel || undefined,
    strand: p.strand || undefined,
    section: p.section || undefined,
    department: p.department || undefined,
    position: p.position || undefined,
    dateOfBirth: p.dateOfBirth || undefined,
    gender: p.gender || undefined,
    knownMedicalConditions: p.knownMedicalConditions || undefined,
    // P-4: Emergency contact
    contactName: p.contactName || undefined,
    contactRelationship: p.contactRelationship || undefined,
    contactNumber: p.contactNumber || undefined,
  };
}

function visitPayload(p: any) {
  return {
    studentId: p.patientId,
    timeIn: p.timeIn ?? new Date().toISOString(),
    timeOut: p.timeOut || undefined,
    complaint: p.complaint,
    actionTaken: p.assessment ?? p.actionTaken ?? '',
    remarks: p.remarks,
    // Vital signs
    temperature: p.temperature || undefined,
    bloodPressure: p.bloodPressure || undefined,
    heartRate: p.heartRate || undefined,
    respiratoryRate: p.respiratoryRate || undefined,
    medicines: (p.medicines ?? [])
      .filter((m: any) => m.medicineId || m.name)
      .map((m: any) => ({
        medicineId: m.medicineId,
        quantity: Number(m.quantity) || 1,
      })),
    release: p.guardianName ? {
      releasedToName: p.guardianName,
      releasedToRelationship: p.relationship || undefined,
      releaseTime: p.releaseTime
        ? (() => {
          // releaseTime is HH:MM — combine with today's date for ISO
          const today = new Date().toISOString().slice(0, 10);
          const dt = new Date(`${today}T${p.releaseTime}:00`);
          return isNaN(dt.getTime()) ? undefined : dt.toISOString();
        })()
        : undefined,
    } : undefined,
  };
}

function toDateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}