import { useState, useEffect } from 'react';
import {
  Eye, EyeOff, LogOut, Monitor, Save, X, Download,
  ShieldCheck, Building2, ScrollText, ChevronLeft, ChevronRight,
  Plus, Pencil, Archive, RotateCcw, PackagePlus, PackageMinus
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Label } from '../components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '../components/ui/dialog';
import { cn } from '../components/ui/utils';
import { useAuth } from '../lib/auth-context';
import { useClinicProfile, useUpdateClinicProfile, useAuditLog } from '../lib/hooks';
import { toast } from 'sonner';

// ─── Tab definitions ─────────────────────────────────────────
const tabs = [
  { id: 'account', label: 'Account & Security', icon: ShieldCheck },
  { id: 'clinic', label: 'Clinic Profile', icon: Building2 },
  { id: 'audit', label: 'Audit Log', icon: ScrollText },
] as const;

type TabId = typeof tabs[number]['id'];

// ═══════════════════════════════════════════════════════════════
// Main Settings Component
// ═══════════════════════════════════════════════════════════════
export function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>('account');

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your account, clinic profile, and view activity logs</p>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap rounded-t-lg transition-colors -mb-px border-b-2',
                activeTab === tab.id
                  ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              )}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'account' && <AccountSecurityTab />}
      {activeTab === 'clinic' && <ClinicProfileTab />}
      {activeTab === 'audit' && <AuditLogTab />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 1) Account & Security Tab
// ═══════════════════════════════════════════════════════════════
function AccountSecurityTab() {
  const { logout, user } = useAuth();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUpdating, setIsUpdating] = useState(false);

  const validatePassword = () => {
    const e: Record<string, string> = {};
    if (!currentPassword) e.currentPassword = 'Current password is required';
    if (newPassword.length < 8) e.newPassword = 'Password must be at least 8 characters';
    if (newPassword !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (!validatePassword()) return;
    setIsUpdating(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    setIsUpdating(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    toast.success('Password updated successfully');
  };

  const handleSignOut = () => {
    setShowSignOutModal(false);
    logout();
    toast.success('Signed out successfully');
  };

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Card A: Change Password */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
            <ShieldCheck size={18} className="text-teal-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Change Password</h3>
            <p className="text-xs text-slate-500">Update your account password to keep your account secure</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <Label className="text-sm font-medium text-slate-700">Current Password</Label>
            <div className="relative mt-1.5">
              <Input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => { setCurrentPassword(e.target.value); setErrors(prev => ({ ...prev, currentPassword: '' })); }}
                placeholder="Enter current password"
                className={cn('h-11 pr-10', errors.currentPassword && 'border-red-400 focus-visible:ring-red-200')}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-xs text-red-500 mt-1">{errors.currentPassword}</p>}
          </div>

          {/* New Password */}
          <div>
            <Label className="text-sm font-medium text-slate-700">New Password</Label>
            <div className="relative mt-1.5">
              <Input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setErrors(prev => ({ ...prev, newPassword: '' })); }}
                placeholder="Enter new password"
                className={cn('h-11 pr-10', errors.newPassword && 'border-red-400 focus-visible:ring-red-200')}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword
              ? <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
              : <p className="text-xs text-slate-400 mt-1">At least 8 characters</p>
            }
            {/* Strength indicator */}
            {newPassword.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={cn(
                        'h-1 flex-1 rounded-full',
                        newPassword.length >= i * 3
                          ? newPassword.length >= 12 ? 'bg-emerald-500' : newPassword.length >= 8 ? 'bg-amber-400' : 'bg-red-400'
                          : 'bg-slate-200'
                      )}
                    />
                  ))}
                </div>
                <span className={cn(
                  'text-[10px]',
                  newPassword.length >= 12 ? 'text-emerald-600' : newPassword.length >= 8 ? 'text-amber-600' : 'text-red-500'
                )}>
                  {newPassword.length >= 12 ? 'Strong' : newPassword.length >= 8 ? 'Fair' : 'Weak'}
                </span>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <Label className="text-sm font-medium text-slate-700">Confirm New Password</Label>
            <div className="relative mt-1.5">
              <Input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: '' })); }}
                placeholder="Re-enter new password"
                className={cn('h-11 pr-10', errors.confirmPassword && 'border-red-400 focus-visible:ring-red-200')}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t">
          <Button
            onClick={handleUpdatePassword}
            disabled={isUpdating || (!currentPassword && !newPassword && !confirmPassword)}
            className="bg-teal-600 hover:bg-teal-700 text-sm gap-2"
          >
            {isUpdating ? (
              <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ShieldCheck size={14} />
            )}
            Update Password
          </Button>
        </div>
      </Card>

      {/* Card B: Session Controls */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <Monitor size={18} className="text-slate-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Session Controls</h3>
            <p className="text-xs text-slate-500">Manage your active sessions and sign-out options</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Current Session</p>
              <p className="text-xs text-slate-500 mt-0.5">Logged in as <span className="font-medium text-slate-700">{user?.name || 'Clinic In-Charge'}</span> &middot; {user?.email}</p>
            </div>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-[10px]">Active</Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            className="gap-2 text-sm"
            onClick={() => setShowSignOutModal(true)}
          >
            <LogOut size={14} />
            Sign Out
          </Button>
          <Button variant="outline" className="gap-2 text-sm text-slate-500" disabled>
            <LogOut size={14} />
            Sign out of all sessions
          </Button>
        </div>
      </Card>

      {/* Sign-out Confirmation Modal */}
      <Dialog open={showSignOutModal} onOpenChange={setShowSignOutModal}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-2">
              <LogOut size={20} className="text-red-500" />
            </div>
            <DialogTitle className="text-center">Sign out?</DialogTitle>
            <DialogDescription className="text-center">
              You will need to log in again to access ADA.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
            <Button variant="ghost" onClick={() => setShowSignOutModal(false)} className="text-sm flex-1">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSignOut} className="gap-2 text-sm flex-1">
              <LogOut size={14} /> Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2) Clinic Profile Tab
// ═══════════════════════════════════════════════════════════════
function ClinicProfileTab() {
  const { data: profile, isLoading } = useClinicProfile();
  const updateMutation = useUpdateClinicProfile();

  const [clinicName, setClinicName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [inChargeName, setInChargeName] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setClinicName(profile.clinicName);
      setSchoolName(profile.schoolName);
      setContactNumber(profile.contactNumber || '');
      setAddress(profile.address || '');
      setInChargeName(profile.inChargeName || '');
    }
  }, [profile]);

  const handleFieldChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setIsDirty(true);
  };

  const handleCancel = () => {
    if (profile) {
      setClinicName(profile.clinicName);
      setSchoolName(profile.schoolName);
      setContactNumber(profile.contactNumber || '');
      setAddress(profile.address || '');
      setInChargeName(profile.inChargeName || '');
      setIsDirty(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ clinicName, schoolName, contactNumber, address, inChargeName });
      setIsDirty(false);
      toast.success('Clinic profile saved');
    } catch {
      toast.error('Failed to save profile');
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 max-w-2xl space-y-5">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
      </Card>
    );
  }

  return (
    <div className="max-w-2xl">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <Building2 size={18} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Clinic Information</h3>
            <p className="text-xs text-slate-500">Update your clinic details and contact information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Clinic Name <span className="text-red-500">*</span>
            </Label>
            <Input value={clinicName} onChange={handleFieldChange(setClinicName)} className="mt-1.5 h-11" />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700">
              School Name <span className="text-red-500">*</span>
            </Label>
            <Input value={schoolName} onChange={handleFieldChange(setSchoolName)} className="mt-1.5 h-11" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Clinic Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
              </Label>
              <Input value={contactNumber} onChange={handleFieldChange(setContactNumber)} placeholder="e.g. (082) 123-4567" className="mt-1.5 h-11" />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">
                Clinic In-Charge Name <span className="text-slate-400 font-normal">(Optional)</span>
              </Label>
              <Input value={inChargeName} onChange={handleFieldChange(setInChargeName)} placeholder="e.g. Dr. Sarah L." className="mt-1.5 h-11" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700">
              Address <span className="text-slate-400 font-normal">(Optional)</span>
            </Label>
            <Input value={address} onChange={handleFieldChange(setAddress)} placeholder="Full clinic address" className="mt-1.5 h-11" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="ghost" onClick={handleCancel} disabled={!isDirty} className="text-sm">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isDirty || !clinicName || !schoolName || updateMutation.isPending}
            className="bg-teal-600 hover:bg-teal-700 gap-2 text-sm"
          >
            {updateMutation.isPending ? (
              <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3) Audit Log Tab
// ═══════════════════════════════════════════════════════════════
const actionTypes = ['All Actions', 'Create', 'Edit', 'Archive', 'Restore', 'Stock-in', 'Stock-out'];
const entityTypes = ['All Entities', 'Patient', 'Visit', 'Medicine'];

const actionBadgeConfig: Record<string, { className: string; icon: React.ReactNode }> = {
  Create: { className: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <Plus size={10} /> },
  Edit: { className: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Pencil size={10} /> },
  Archive: { className: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Archive size={10} /> },
  Restore: { className: 'bg-violet-50 text-violet-700 border-violet-200', icon: <RotateCcw size={10} /> },
  'Stock-in': { className: 'bg-teal-50 text-teal-700 border-teal-200', icon: <PackagePlus size={10} /> },
  'Stock-out': { className: 'bg-rose-50 text-rose-700 border-rose-200', icon: <PackageMinus size={10} /> },
};

function AuditLogTab() {
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [entityFilter, setEntityFilter] = useState('All Entities');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAuditLog({
    action: actionFilter !== 'All Actions' ? actionFilter : undefined,
    entity: entityFilter !== 'All Entities' ? entityFilter : undefined,
    page,
  });

  const entries = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const handleExport = () => {
    toast.info('Preparing export...');
    setTimeout(() => toast.success('Export ready — CSV downloaded'), 1500);
  };

  const clearFilters = () => {
    setActionFilter('All Actions');
    setEntityFilter('All Entities');
    setPage(1);
  };

  const hasFilters = actionFilter !== 'All Actions' || entityFilter !== 'All Entities';

  return (
    <div className="space-y-4">
      {/* Filters Card */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs font-medium text-slate-500 mb-1.5 block">Action Type</Label>
              <Select value={actionFilter} onValueChange={(v) => { setActionFilter(v); setPage(1); }}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map(a => <SelectItem key={a} value={a} className="text-xs">{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-500 mb-1.5 block">Entity Type</Label>
              <Select value={entityFilter} onValueChange={(v) => { setEntityFilter(v); setPage(1); }}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {entityTypes.map(e => <SelectItem key={e} value={e} className="text-xs">{e}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-slate-500 h-9">
                  <X size={12} className="mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 text-xs h-9 whitespace-nowrap">
            <Download size={13} /> Export CSV
          </Button>
        </div>
      </Card>

      {/* Audit Table Card */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 w-28" />
              </div>
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <ScrollText size={22} className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-600">No activity recorded yet.</p>
            <p className="text-xs text-slate-400 mt-1">Audit entries will appear here as actions are performed.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80">
                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-[180px]">Timestamp</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-[120px]">Action</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-[100px]">Entity</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Record Identifier</TableHead>
                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-[140px]">Performed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => {
                    const badge = actionBadgeConfig[entry.action];
                    return (
                      <TableRow key={entry.id} className="hover:bg-slate-50/50">
                        <TableCell className="text-xs text-slate-500 font-mono">{entry.timestamp}</TableCell>
                        <TableCell>
                          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border', badge?.className)}>
                            {badge?.icon}
                            {entry.action}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px] font-medium">
                            {entry.entity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-slate-700 max-w-[280px] truncate">{entry.recordIdentifier}</TableCell>
                        <TableCell className="text-xs text-slate-500">{entry.performedBy}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="md:hidden divide-y">
              {entries.map((entry) => {
                const badge = actionBadgeConfig[entry.action];
                return (
                  <div key={entry.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border', badge?.className)}>
                        {badge?.icon}
                        {entry.action}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">{entry.entity}</Badge>
                    </div>
                    <p className="text-xs text-slate-700">{entry.recordIdentifier}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono">{entry.timestamp}</span>
                      <span>{entry.performedBy}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Pagination */}
        {entries.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50/50">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium">{entries.length}</span> of <span className="font-medium">{total}</span> entries
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(p => (
                <Button
                  key={p}
                  variant={p === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(p)}
                  className={cn('h-7 w-7 p-0 text-xs', p === page && 'bg-teal-600 hover:bg-teal-700')}
                >
                  {p}
                </Button>
              ))}
              {totalPages > 3 && <span className="text-xs text-slate-400 px-1">...</span>}
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="h-7 w-7 p-0"
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}