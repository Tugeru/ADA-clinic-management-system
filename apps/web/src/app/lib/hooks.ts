// ─────────────────────────────────────────────────────────────
// TanStack Query hooks for data fetching
// ─────────────────────────────────────────────────────────────

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientApi, visitApi, inventoryApi, dashboardApi, analyticsApi, archiveApi, patientVisitsApi, clinicProfileApi, auditLogApi } from './api';
import type { PatientFormData, VisitFormData, StockInFormData, MedicineFormData, ClinicProfile, AuditAction, AuditEntity } from './types';

// ─── Query Keys ──────────────────────────────────────────────
export const queryKeys = {
  patients: {
    all: ['patients'] as const,
    list: (params?: Record<string, string>) => ['patients', 'list', params] as const,
    detail: (id: string) => ['patients', 'detail', id] as const,
    search: (q: string) => ['patients', 'search', q] as const,
    visits: (id: string, params?: Record<string, any>) => ['patients', 'visits', id, params] as const,
  },
  visits: {
    all: ['visits'] as const,
    list: (params?: Record<string, string>) => ['visits', 'list', params] as const,
    detail: (id: string) => ['visits', 'detail', id] as const,
    todayCount: ['visits', 'todayCount'] as const,
  },
  inventory: {
    all: ['inventory'] as const,
    list: (params?: Record<string, string>) => ['inventory', 'list', params] as const,
    detail: (id: string) => ['inventory', 'detail', id] as const,
    lowStock: ['inventory', 'lowStock'] as const,
    dispensable: ['inventory', 'dispensable'] as const,
    movements: (params?: Record<string, any>) => ['inventory', 'movements', params] as const,
  },
  dashboard: {
    kpis: ['dashboard', 'kpis'] as const,
    recentVisits: ['dashboard', 'recentVisits'] as const,
    charts: ['dashboard', 'charts'] as const,
  },
  analytics: {
    usageRankings: (period?: string) => ['analytics', 'usageRankings', period] as const,
    consumptionSummary: (period?: string) => ['analytics', 'consumptionSummary', period] as const,
  },
  archive: {
    patients: (params?: Record<string, any>) => ['archive', 'patients', params] as const,
    visits: (params?: Record<string, any>) => ['archive', 'visits', params] as const,
    medicines: (params?: Record<string, any>) => ['archive', 'medicines', params] as const,
  },
  settings: {
    clinicProfile: ['settings', 'clinicProfile'] as const,
    auditLog: (params?: Record<string, any>) => ['settings', 'auditLog', params] as const,
  },
};

// ─── Patient Hooks ───────────────────────────────────────────
export function usePatients(params?: { search?: string; type?: string; status?: string }) {
  return useQuery({
    queryKey: queryKeys.patients.list(params as any),
    queryFn: () => patientApi.getAll(params),
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => patientApi.getById(id),
    enabled: !!id,
  });
}

export function usePatientSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.patients.search(query),
    queryFn: () => patientApi.search(query),
    enabled: query.length > 1,
  });
}

export function useCreatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PatientFormData) => patientApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.patients.all });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.kpis });
    },
  });
}

export function useUpdatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PatientFormData> }) => patientApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.patients.all });
    },
  });
}

export function useArchivePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => patientApi.archive(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.patients.all });
      qc.invalidateQueries({ queryKey: queryKeys.archive.patients() });
    },
  });
}

export function useDeletePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => patientApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.patients.all });
    },
  });
}

export function usePatientVisits(patientId: string, params?: { search?: string; page?: number }) {
  return useQuery({
    queryKey: queryKeys.patients.visits(patientId, params),
    queryFn: () => patientVisitsApi.getByPatientId(patientId, params),
    enabled: !!patientId,
  });
}

// ─── Visit Hooks ─────────────────────────────────────────────
export function useVisits(params?: { search?: string; type?: string; disposition?: string; period?: string }) {
  return useQuery({
    queryKey: queryKeys.visits.list(params as any),
    queryFn: () => visitApi.getAll(params),
  });
}

export function useVisit(id: string) {
  return useQuery({
    queryKey: queryKeys.visits.detail(id),
    queryFn: () => visitApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateVisit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: VisitFormData) => visitApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.visits.all });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.kpis });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.recentVisits });
    },
  });
}

export function useDeleteVisit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => visitApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.visits.all });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.kpis });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.recentVisits });
    },
  });
}

export function useUpdateVisit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { timeOut?: string; remarks?: string } }) =>
      visitApi.update(id, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: queryKeys.visits.all });
      qc.invalidateQueries({ queryKey: queryKeys.visits.detail(variables.id) });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.recentVisits });
    },
  });
}

// ─── Inventory Hooks ─────────────────────────────────────────
export function useInventory(search?: string) {
  return useQuery({
    queryKey: queryKeys.inventory.list(search ? { search } : undefined),
    queryFn: () => inventoryApi.getAll({ search }),
  });
}

export function useLowStock() {
  return useQuery({
    queryKey: queryKeys.inventory.lowStock,
    queryFn: () => inventoryApi.getLowStock(),
  });
}

export function useDispensableMedicines() {
  return useQuery({
    queryKey: queryKeys.inventory.dispensable,
    queryFn: () => inventoryApi.getAvailableForDispensing(),
  });
}

export function useStockMovements(params?: { period?: string; medicine?: string; type?: string }) {
  return useQuery({
    queryKey: queryKeys.inventory.movements(params as any),
    queryFn: () => inventoryApi.getStockMovements(params),
  });
}

export function useStockIn() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: StockInFormData) => inventoryApi.stockIn(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.inventory.all });
    },
  });
}

export function useCreateMedicine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: MedicineFormData) => inventoryApi.createMedicine(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.inventory.all });
    },
  });
}

// M-2: get a single medicine (with batches) by id
export function useMedicine(id: string) {
  return useQuery({
    queryKey: queryKeys.inventory.detail(id),
    queryFn: () => inventoryApi.getById(id),
    enabled: !!id,
  });
}

// M-1: adjust (reduce) stock for a specific batch
export function useAdjustStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { batchId: string; quantity: number; notes?: string }) =>
      inventoryApi.adjustStock(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.inventory.all });
    },
  });
}

// M-2: archive a medicine (set isActive = false)
export function useArchiveMedicine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryApi.archiveMedicine(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.inventory.all });
    },
  });
}

// M-2: permanently delete a medicine
export function useDeleteMedicine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryApi.deleteMedicine(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.inventory.all });
    },
  });
}

// ─── Dashboard Hooks ─────────────────────────────────────────
export function useDashboardKPIs() {
  return useQuery({
    queryKey: queryKeys.dashboard.kpis,
    queryFn: () => dashboardApi.getKPIs(),
  });
}

export function useRecentVisits() {
  return useQuery({
    queryKey: queryKeys.dashboard.recentVisits,
    queryFn: () => dashboardApi.getRecentVisits(),
  });
}

export function useDashboardCharts() {
  return useQuery({
    queryKey: queryKeys.dashboard.charts,
    queryFn: () => dashboardApi.getChartData(),
  });
}

// ─── Analytics Hooks ─────────────────────────────────────────
export function useUsageRankings(period?: string) {
  return useQuery({
    queryKey: queryKeys.analytics.usageRankings(period),
    queryFn: () => analyticsApi.getUsageRankings(period),
  });
}

export function useConsumptionSummary(period?: string) {
  return useQuery({
    queryKey: queryKeys.analytics.consumptionSummary(period),
    queryFn: () => analyticsApi.getConsumptionSummary(period),
  });
}

// ─── Archive Hooks ───────────────────────────────────────────
export function useArchivedPatients(params?: { search?: string; type?: string; page?: number }) {
  return useQuery({
    queryKey: queryKeys.archive.patients(params),
    queryFn: () => archiveApi.getArchivedPatients(params),
  });
}

export function useArchivedVisits(params?: { search?: string; type?: string; disposition?: string; page?: number }) {
  return useQuery({
    queryKey: queryKeys.archive.visits(params),
    queryFn: () => archiveApi.getArchivedVisits(params),
  });
}

export function useArchivedMedicines(params?: { search?: string; type?: string; page?: number }) {
  return useQuery({
    queryKey: queryKeys.archive.medicines(params),
    queryFn: () => archiveApi.getArchivedMedicines(params),
  });
}

export function useRestorePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => archiveApi.restorePatient(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.archive.patients() });
      qc.invalidateQueries({ queryKey: queryKeys.patients.all });
    },
  });
}

// ─── Settings Hooks ──────────────────────────────────────────
export function useClinicProfile() {
  return useQuery({
    queryKey: queryKeys.settings.clinicProfile,
    queryFn: () => clinicProfileApi.getProfile(),
  });
}

export function useUpdateClinicProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ClinicProfile>) => clinicProfileApi.updateProfile(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.clinicProfile });
    },
  });
}

export function useAuditLog(params?: { action?: string; entity?: string; page?: number }) {
  return useQuery({
    queryKey: queryKeys.settings.auditLog(params),
    queryFn: () => auditLogApi.getAuditLog(params as any),
  });
}