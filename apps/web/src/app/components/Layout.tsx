import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard, Users, Stethoscope, Package, BarChart3,
  Archive, Settings, Menu, Search, ChevronDown, Calendar, LogOut
} from 'lucide-react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetTitle } from './ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from './ui/dropdown-menu';
import { useAuth } from '../lib/auth-context';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Patients', path: '/patients', icon: Users },
  { name: 'Visits', path: '/visits', icon: Stethoscope },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Archive', path: '/archive', icon: Archive },
  { name: 'Settings', path: '/settings', icon: Settings },
];

function NavItem({ item, onClick }: { item: typeof navItems[0]; onClick?: () => void }) {
  const location = useLocation();
  const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all font-medium",
        isActive
          ? "bg-teal-600 text-white shadow-sm shadow-teal-200"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <item.icon size={18} />
      {item.name}
    </NavLink>
  );
}

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <>
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center text-white">
          <span className="text-lg font-black">+</span>
        </div>
        <div>
          <h1 className="text-base font-black leading-tight text-slate-800 tracking-tight">ADA</h1>
          <p className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">Clinic Manager</p>
        </div>
      </div>
      <Separator />
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} onClick={onItemClick} />
        ))}
      </nav>
      <Separator />
      <div className="p-4 text-center">
        <p className="text-[10px] text-slate-400">v1.0.0 &middot; &copy; 2026 ADA System</p>
      </div>
    </>
  );
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    if (location.pathname.startsWith('/patients')) return 'Patient Records';
    if (location.pathname.startsWith('/visits')) return 'Visits & Consultations';
    if (location.pathname.startsWith('/inventory')) return 'Inventory';
    if (location.pathname.startsWith('/analytics')) return 'Analytics';
    if (location.pathname.startsWith('/archive')) return 'Archive';
    if (location.pathname.startsWith('/settings')) return 'Settings';
    return 'ADA Clinic';
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[230px] lg:w-[240px] flex-col bg-white border-r border-slate-200 fixed h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[260px] flex flex-col">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarContent onItemClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 md:pl-[230px] lg:pl-[240px]">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-14 px-4 md:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden flex-shrink-0"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </Button>

            <h2 className="text-sm font-bold text-slate-800 hidden md:block whitespace-nowrap">
              {getPageTitle()}
            </h2>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 ml-3 whitespace-nowrap">
              <Calendar size={12} />
              {today}
            </div>

            {/* Global Search */}
            <div className="flex-1 max-w-sm ml-auto relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search patients, medicine..."
                className="pl-8 h-8 text-sm bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-auto p-1.5 hover:bg-slate-50">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-[10px] font-bold">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'CI'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-slate-800 leading-none">{user?.name || 'Clinic In-Charge'}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">{user?.role?.replace('_', ' ')}</p>
                </div>
                <ChevronDown size={12} className="text-slate-400 hidden lg:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-muted-foreground font-normal">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600">
                <LogOut size={14} />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}