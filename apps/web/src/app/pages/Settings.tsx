import { useState, useEffect } from 'react';
import {
  Eye, EyeOff, LogOut, Monitor, Save, X, Download,
  ShieldCheck, Building2, ScrollText, ChevronLeft, ChevronRight,
  Plus, Pencil, Archive, RotateCcw, PackagePlus, PackageMinus,
  GraduationCap, Trash2, Check, Users,
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
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from '../components/ui/alert-dialog';
import { cn } from '../components/ui/utils';
import { useAuth } from '../lib/auth-context';
import { useClinicProfile, useUpdateClinicProfile, useAuditLog, useReferenceData, useCreateReferenceData, useUpdateReferenceData, useDeleteReferenceData, useUsers, useCreateUser, useResetUserPassword, useSetUserActive, useDeleteUser, useChangeMyPassword } from '../lib/hooks';
import { toast } from 'sonner';
import type { ReferenceDataItem, UserAccount } from '../lib/types';
import { downloadCsvExport } from '../lib/exportDownload';

// ─── Tab definitions ─────────────────────────────────────────
const tabs = [
  { id: 'account', label: 'Account & Security', icon: ShieldCheck },
  { id: 'users', label: 'User Accounts', icon: Users },
  { id: 'clinic', label: 'Clinic Profile', icon: Building2 },
  { id: 'reference', label: 'Academic Fields', icon: GraduationCap },
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
      {activeTab === 'users' && <UserAccountsTab />}
      {activeTab === 'clinic' && <ClinicProfileTab />}
      {activeTab === 'reference' && <ReferenceDataTab />}
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
  const changeMyPassword = useChangeMyPassword();

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
    try {
      await changeMyPassword.mutateAsync({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
      toast.success('Password updated successfully');
    } catch (err: any) {
      const status = err?.response?.status;
      const msg =
        status === 401
          ? 'Current password is incorrect.'
          : err?.response?.data?.error ?? 'Failed to update password';
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = () => {
    setShowSignOutModal(false);
    void logout();
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
// User Accounts Tab
// ═══════════════════════════════════════════════════════════════
function UserAccountsTab() {
  const { user } = useAuth();
  const { data: users, isLoading, error } = useUsers();
  const createMutation = useCreateUser();
  const resetPasswordMutation = useResetUserPassword();
  const setActiveMutation = useSetUserActive();
  const deleteUserMutation = useDeleteUser();

  const [createOpen, setCreateOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState<{ id: string; email: string } | null>(null);
  const [toggleOpen, setToggleOpen] = useState<{ id: string; email: string; nextActive: boolean } | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [canManageUsers, setCanManageUsers] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showCreateConfirmPassword, setShowCreateConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const isForbidden = (error as any)?.response?.status === 403;

  const resetCreateForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCanManageUsers(false);
    setShowCreatePassword(false);
    setShowCreateConfirmPassword(false);
  };

  const resetResetForm = () => {
    setNewPassword('');
    setConfirmNewPassword('');
    setShowNewPassword(false);
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '—';
    }
  };

  const handleCreate = async () => {
    if (!fullName.trim()) return toast.error('Full name is required.');
    if (!email.trim()) return toast.error('Email is required.');
    if (password.length < 8) return toast.error('Password must be at least 8 characters.');
    if (password !== confirmPassword) return toast.error('Passwords do not match.');
    try {
      await createMutation.mutateAsync({ fullName: fullName.trim(), email: email.trim(), password, canManageUsers });
      toast.success('Account created.');
      setCreateOpen(false);
      resetCreateForm();
    } catch (err: any) {
      const status = err?.response?.status;
      const msg =
        status === 409 ? 'Email already in use.' :
        err?.response?.data?.error ?? 'Failed to create account.';
      toast.error(msg);
    }
  };

  const handleResetPassword = async () => {
    if (!resetOpen) return;
    if (newPassword.length < 8) return toast.error('Password must be at least 8 characters.');
    if (newPassword !== confirmNewPassword) return toast.error('Passwords do not match.');
    try {
      await resetPasswordMutation.mutateAsync({ userId: resetOpen.id, newPassword });
      toast.success(`Password reset for ${resetOpen.email}.`);
      setResetOpen(null);
      resetResetForm();
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? 'Failed to reset password.');
    }
  };

  const handleToggleStatus = async () => {
    if (!toggleOpen) return;
    try {
      await setActiveMutation.mutateAsync({ userId: toggleOpen.id, isActive: toggleOpen.nextActive });
      toast.success(toggleOpen.nextActive ? 'Account activated.' : 'Account deactivated.');
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? 'Failed to update account status.');
    } finally {
      setToggleOpen(null);
    }
  };

  const [deleteOpen, setDeleteOpen] = useState<{ id: string; email: string } | null>(null);

  const handleDeleteUser = async () => {
    if (!deleteOpen) return;
    try {
      await deleteUserMutation.mutateAsync(deleteOpen.id);
      toast.success('Account deleted.');
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? 'Failed to delete account.');
    } finally {
      setDeleteOpen(null);
    }
  };

  if (isForbidden) {
    return (
      <Card className="p-6">
        <p className="text-sm font-semibold text-slate-800">User Accounts</p>
        <p className="text-xs text-slate-500 mt-1">You don’t have permission to manage accounts.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Dialog open={createOpen} onOpenChange={(open: boolean) => { setCreateOpen(open); if (!open) resetCreateForm(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>Add a new Clinic In‑Charge account.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-slate-600">Full Name</Label>
              <Input value={fullName} onChange={(e: { target: { value: string } }) => setFullName(e.target.value)} className="h-10 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-slate-600">Email</Label>
              <Input value={email} onChange={(e: { target: { value: string } }) => setEmail(e.target.value)} className="h-10 mt-1" />
            </div>
            <div>
              <Label className="text-xs text-slate-600">Initial Password</Label>
              <div className="relative mt-1">
                <Input
                  type={showCreatePassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: { target: { value: string } }) => setPassword(e.target.value)}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCreatePassword((v: boolean) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCreatePassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">At least 8 characters.</p>
            </div>
            <div>
              <Label className="text-xs text-slate-600">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  type={showCreateConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e: { target: { value: string } }) => setConfirmPassword(e.target.value)}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCreateConfirmPassword((v: boolean) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCreateConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Input
                id="can-manage-users"
                type="checkbox"
                checked={canManageUsers}
                onChange={(e: any) => setCanManageUsers(!!e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="can-manage-users" className="text-xs text-slate-600">
                Can manage users
              </Label>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!resetOpen} onOpenChange={(open: boolean) => { if (!open) { setResetOpen(null); resetResetForm(); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Set a new password for <span className="font-medium text-slate-700">{resetOpen?.email}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-slate-600">New Password</Label>
              <div className="relative mt-1">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e: { target: { value: string } }) => setNewPassword(e.target.value)}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v: boolean) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">At least 8 characters.</p>
            </div>
            <div>
              <Label className="text-xs text-slate-600">Confirm New Password</Label>
              <Input
                type={showNewPassword ? 'text' : 'password'}
                value={confirmNewPassword}
                onChange={(e: { target: { value: string } }) => setConfirmNewPassword(e.target.value)}
                className="h-10 mt-1"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setResetOpen(null)}>Cancel</Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleResetPassword} disabled={resetPasswordMutation.isPending}>
              {resetPasswordMutation.isPending ? 'Saving...' : 'Reset Password'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toggleOpen} onOpenChange={(open) => { if (!open) setToggleOpen(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{toggleOpen?.nextActive ? 'Activate Account?' : 'Deactivate Account?'}</AlertDialogTitle>
            <AlertDialogDescription>
              {toggleOpen?.nextActive
                ? <>Activate <span className="font-semibold text-slate-700">{toggleOpen?.email}</span>?</>
                : <>Deactivate <span className="font-semibold text-slate-700">{toggleOpen?.email}</span>? They will not be able to log in.</>
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleToggleStatus}
              className={toggleOpen?.nextActive ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}
              disabled={setActiveMutation.isPending}
            >
              {setActiveMutation.isPending ? 'Saving...' : (toggleOpen?.nextActive ? 'Activate' : 'Deactivate')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteOpen} onOpenChange={(open) => { if (!open) setDeleteOpen(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account?</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete <span className="font-semibold text-slate-700">{deleteOpen?.email}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">User Accounts</h3>
            <p className="text-xs text-slate-500 mt-1">Create accounts and manage access to ADA.</p>
          </div>
          <Button size="sm" className="h-8 text-xs bg-teal-600 hover:bg-teal-700 gap-1" onClick={() => setCreateOpen(true)}>
            <Plus size={12} /> Add Account
          </Button>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : !users?.length ? (
            <p className="text-xs text-slate-400 text-center py-10">No user accounts found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Full Name</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Email</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-center">Status</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9">Created</TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-9 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u: UserAccount) => (
                  <TableRow key={u.id} className={cn(!u.isActive && 'opacity-60')}>
                    <TableCell className="text-xs font-semibold text-slate-800 py-3">{u.fullName}</TableCell>
                    <TableCell className="text-xs text-slate-600 py-3">{u.email}</TableCell>
                    <TableCell className="text-center py-3">
                      <Badge variant="outline" className={cn('text-[9px]',
                        u.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                      )}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 py-3">{formatDate(u.createdAt)}</TableCell>
                    <TableCell className="text-right py-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setResetOpen({ id: u.id, email: u.email })}
                        >
                          Reset password
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn('h-7 text-xs', u.isActive ? 'text-red-600 hover:text-red-700' : 'text-teal-600 hover:text-teal-700')}
                          onClick={() => setToggleOpen({ id: u.id, email: u.email, nextActive: !u.isActive })}
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-red-600 hover:text-red-700"
                          disabled={u.id === user?.id}
                          onClick={() => setDeleteOpen({ id: u.id, email: u.email })}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
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
// 3) Reference Data Tab
// ═══════════════════════════════════════════════════════════════
const refCategories = [
  { id: 'GRADE_LEVEL', label: 'Grade Levels', hasParent: false },
  { id: 'STRAND', label: 'Strands', hasParent: false },
  { id: 'SECTION', label: 'Sections', hasParent: true, parentCategory: 'GRADE_LEVEL', parentLabel: 'Grade Level' },
  { id: 'SCHOOL_YEAR', label: 'School Years', hasParent: false },
] as const;

function ReferenceDataTab() {
  const [activeCategory, setActiveCategory] = useState<string>('GRADE_LEVEL');

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
            <GraduationCap size={18} className="text-teal-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Academic Fields</h3>
            <p className="text-xs text-slate-500">Manage the lookup values used in student registration and filters</p>
          </div>
        </div>

        <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
          {refCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
                activeCategory === cat.id
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Card>

      <RefCategoryPanel
        key={activeCategory}
        category={activeCategory}
        config={refCategories.find((c) => c.id === activeCategory)!}
      />
    </div>
  );
}

function RefCategoryPanel({ category, config }: { category: string; config: typeof refCategories[number] }) {
  const { data: items = [], isLoading } = useReferenceData(category);
  const { data: parentItems = [] } = useReferenceData(
    config.hasParent ? (config as any).parentCategory : '',
  );
  const createMutation = useCreateReferenceData();
  const updateMutation = useUpdateReferenceData();
  const deleteMutation = useDeleteReferenceData();

  const [showAdd, setShowAdd] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newParent, setNewParent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editSort, setEditSort] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');

  const handleAdd = async () => {
    if (!newValue.trim() || !newLabel.trim()) return;
    if (config.hasParent && !newParent) {
      toast.error(`Please select a ${(config as any).parentLabel}`);
      return;
    }
    try {
      await createMutation.mutateAsync({
        category,
        value: newValue.trim(),
        label: newLabel.trim(),
        parentValue: config.hasParent ? newParent : undefined,
        sortOrder: items.length + 1,
      });
      setNewValue('');
      setNewLabel('');
      setNewParent('');
      setShowAdd(false);
      toast.success('Entry added');
    } catch (err: any) {
      const msg = err?.response?.data?.errors?.[0]?.message ?? err?.response?.data?.error ?? 'Failed to add entry';
      toast.error(msg);
    }
  };

  const handleStartEdit = (item: ReferenceDataItem) => {
    setEditingId(item.id);
    setEditLabel(item.label);
    setEditSort(item.sortOrder);
  };

  const handleSaveEdit = async (item: ReferenceDataItem) => {
    try {
      await updateMutation.mutateAsync({
        id: item.id,
        data: { label: editLabel.trim(), sortOrder: editSort },
      });
      setEditingId(null);
      toast.success('Entry updated');
    } catch {
      toast.error('Failed to update entry');
    }
  };

  const handleToggleActive = async (item: ReferenceDataItem) => {
    try {
      await updateMutation.mutateAsync({
        id: item.id,
        data: { isActive: !item.isActive },
      });
      toast.success(item.isActive ? 'Entry deactivated' : 'Entry activated');
    } catch {
      toast.error('Failed to toggle status');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success(`${deleteName} deleted`);
    } catch {
      toast.error('Failed to delete entry');
    } finally {
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-5 space-y-3">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
      </Card>
    );
  }

  return (
    <>
      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete <span className="font-semibold text-slate-700">{deleteName}</span>?
              This cannot be undone. Existing patient records using this value will not be affected,
              but it will no longer appear in dropdown options.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="overflow-hidden">
        <div className="px-4 py-3 border-b bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs text-slate-500">{items.length} entries</p>
          <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-700 gap-1" onClick={() => setShowAdd(true)}>
            <Plus size={12} /> Add Entry
          </Button>
        </div>

        {showAdd && (
          <div className="px-4 py-3 border-b bg-teal-50/30 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Input
                value={newValue}
                onChange={(e) => { setNewValue(e.target.value); if (!editingId) setNewLabel(e.target.value); }}
                placeholder="Value (stored)"
                className="h-8 text-xs"
              />
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Label (displayed)"
                className="h-8 text-xs"
              />
              {config.hasParent ? (
                <Select value={newParent} onValueChange={setNewParent}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder={(config as any).parentLabel} /></SelectTrigger>
                  <SelectContent>
                    {parentItems.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              ) : (
                <div />
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => { setShowAdd(false); setNewValue(''); setNewLabel(''); setNewParent(''); }}>
                Cancel
              </Button>
              <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-700" onClick={handleAdd} disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80">
              <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-8 pl-4">Value</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-8">Label</TableHead>
              {config.hasParent && (
                <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-8">{(config as any).parentLabel}</TableHead>
              )}
              <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-8 w-16">Order</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-8 w-20">Status</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-slate-500 h-8 text-right pr-4 w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={config.hasParent ? 6 : 5} className="text-center py-8 text-xs text-slate-400">
                  No entries yet. Click "Add Entry" to create one.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className={cn(!item.isActive && 'opacity-50')}>
                  <TableCell className="text-xs font-mono text-slate-700 pl-4 py-2">{item.value}</TableCell>
                  <TableCell className="text-xs text-slate-600 py-2">
                    {editingId === item.id ? (
                      <Input value={editLabel} onChange={(e) => setEditLabel(e.target.value)} className="h-7 text-xs w-full max-w-[180px]" />
                    ) : item.label}
                  </TableCell>
                  {config.hasParent && (
                    <TableCell className="text-xs text-slate-500 py-2">{item.parentValue || '--'}</TableCell>
                  )}
                  <TableCell className="text-xs text-slate-500 py-2">
                    {editingId === item.id ? (
                      <Input type="number" value={editSort} onChange={(e) => setEditSort(Number(e.target.value))} className="h-7 text-xs w-14" />
                    ) : item.sortOrder}
                  </TableCell>
                  <TableCell className="py-2">
                    <button onClick={() => handleToggleActive(item)} className="cursor-pointer">
                      <Badge variant="outline" className={cn("text-[9px]",
                        item.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                      )}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell className="text-right pr-4 py-2">
                    <div className="flex items-center justify-end gap-1">
                      {editingId === item.id ? (
                        <>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEditingId(null)}>
                            <X size={12} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-teal-600" onClick={() => handleSaveEdit(item)}>
                            <Check size={12} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleStartEdit(item)}>
                            <Pencil size={11} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-700" onClick={() => { setDeleteId(item.id); setDeleteName(item.label); }}>
                            <Trash2 size={11} />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// 4) Audit Log Tab
// ═══════════════════════════════════════════════════════════════
const actionTypes = [
  'All Actions',
  'Create',
  'Delete',
  'Edit',
  'Archive',
  'Restore',
  'Stock-in',
  'Stock-out',
  'Activate',
  'Deactivate',
  'Reset-password',
  'Change-password',
];
const entityTypes = ['All Entities', 'Patient', 'Visit', 'Medicine', 'User'];

const actionBadgeConfig: Record<string, { className: string; icon: React.ReactNode }> = {
  Create: { className: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <Plus size={10} /> },
  Delete: { className: 'bg-red-50 text-red-700 border-red-200', icon: <Trash2 size={10} /> },
  Edit: { className: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Pencil size={10} /> },
  Archive: { className: 'bg-orange-50 text-orange-700 border-orange-200', icon: <Archive size={10} /> },
  Restore: { className: 'bg-violet-50 text-violet-700 border-violet-200', icon: <RotateCcw size={10} /> },
  'Stock-in': { className: 'bg-teal-50 text-teal-700 border-teal-200', icon: <PackagePlus size={10} /> },
  'Stock-out': { className: 'bg-rose-50 text-rose-700 border-rose-200', icon: <PackageMinus size={10} /> },
  Activate: { className: 'bg-teal-50 text-teal-700 border-teal-200', icon: <Check size={10} /> },
  Deactivate: { className: 'bg-red-50 text-red-700 border-red-200', icon: <X size={10} /> },
  'Reset-password': { className: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Pencil size={10} /> },
  'Change-password': { className: 'bg-slate-50 text-slate-700 border-slate-200', icon: <Pencil size={10} /> },
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

  const handleExport = async () => {
    const params = {
      action: actionFilter !== 'All Actions' ? actionFilter : undefined,
      entity: entityFilter !== 'All Entities' ? entityFilter : undefined,
    };

    try {
      toast.info('Preparing export...');
      await downloadCsvExport('/export/audit-log.csv', params, 'ada_audit_log.csv');
      toast.success('Audit log CSV downloaded');
    } catch {
      toast.error('Failed to export audit log CSV');
    }
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