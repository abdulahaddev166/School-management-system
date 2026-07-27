import React, { useState } from 'react';
import { NavigationItem, UserRole } from '../types';
import { isNavAllowed } from '../utils/rbac';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Briefcase,
  BookOpen,
  ClipboardCheck,
  Award,
  CreditCard,
  Banknote,
  UserCheck,
  Megaphone,
  BarChart3,
  Settings,
  Sparkles,
  User,
  Bus,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  School,
  Camera,
  X
} from 'lucide-react';

interface SidebarProps {
  currentNav: NavigationItem;
  onNavigate: (nav: NavigationItem) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  schoolName: string;
  userRole?: UserRole;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface MenuItem {
  id: NavigationItem;
  label: string;
  icon: React.ElementType;
  children?: { id: NavigationItem; label: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onNavigate,
  collapsed,
  onToggleCollapse,
  schoolName,
  userRole = 'admin',
  mobileOpen = false,
  onCloseMobile
}) => {
  // Track open state for expandable accordion items
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    students: true,
    teachers: true,
    academics: true,
    transport: true
  });

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleItemClick = (navId: NavigationItem) => {
    onNavigate(navId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const menuGroups: { title?: string; items: MenuItem[] }[] = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'ACADEMICS & STAFF',
      items: [
        {
          id: 'all-students',
          label: 'Students',
          icon: GraduationCap,
          children: [
            { id: 'all-students', label: 'All Students' },
            { id: 'add-student', label: 'Add Student' },
            { id: 'admissions', label: 'Admissions' }
          ]
        },
        {
          id: 'all-teachers',
          label: 'Teachers',
          icon: Users,
          children: [
            { id: 'all-teachers', label: 'All Teachers' },
            { id: 'departments', label: 'Departments' }
          ]
        },
        {
          id: 'classes',
          label: 'Academics',
          icon: BookOpen,
          children: [
            { id: 'classes', label: 'Classes' },
            { id: 'subjects', label: 'Subjects' },
            { id: 'timetable', label: 'Timetable' },
            { id: 'homework', label: 'Homework' }
          ]
        },
        {
          id: 'support-staff',
          label: 'Support Staff',
          icon: Briefcase
        }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
        { id: 'examination', label: 'Examination', icon: Award },
        { id: 'accounts', label: 'Accounts', icon: CreditCard },
        { id: 'fees', label: 'Fees', icon: CreditCard },
        { id: 'transport', label: 'Transport', icon: Bus },
        { id: 'activities', label: 'Activities', icon: Camera },
        { id: 'parents', label: 'Parents', icon: UserCheck },
        { id: 'notice-board', label: 'Notice Board', icon: Megaphone }
      ]
    },
    {
      title: 'ANALYTICS & SYSTEM',
      items: [
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'subscription', label: 'Subscription', icon: Sparkles },
        { id: 'profile', label: 'Profile', icon: User }
      ]
    }
  ];

  // Dynamically filter menu items based on logged-in userRole
  const visibleMenuGroups = menuGroups
    .map((group) => {
      const items = group.items
        .map((item) => {
          if (item.children && item.children.length > 0) {
            const allowedChildren = item.children.filter((child) =>
              isNavAllowed(child.id, userRole)
            );
            if (allowedChildren.length === 0) return null;
            return {
              ...item,
              children: allowedChildren
            };
          }
          if (isNavAllowed(item.id, userRole)) {
            return item;
          }
          return null;
        })
        .filter((item): item is MenuItem => item !== null);

      return {
        ...group,
        items
      };
    })
    .filter((group) => group.items.length > 0);

  const isChildActive = (children?: { id: NavigationItem }[]) => {
    return children?.some((child) => child.id === currentNav);
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-xs transition-opacity duration-200"
        />
      )}

      <aside
        className={`bg-white border-r border-gray-200 flex flex-col justify-between select-none transition-all duration-200 ease-in-out shrink-0 fixed inset-y-0 left-0 z-40 h-full lg:sticky lg:top-0 lg:h-screen lg:z-30 lg:shadow-none ${
          mobileOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}`}
      >
        {/* Top Header & Logo */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="h-16 px-4 flex items-center justify-between border-b border-gray-100 shrink-0">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#2C633E] flex items-center justify-center text-white shrink-0 shadow-sm">
                <School className="w-5 h-5" />
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="truncate">
                  <h1 className="font-bold text-gray-900 text-base tracking-tight truncate leading-tight">
                    {schoolName}
                  </h1>
                  <span className="text-[10px] font-bold text-[#2C633E] bg-[#EAF2EC] px-1.5 py-0.5 rounded uppercase tracking-wider inline-block mt-0.5">
                    {userRole} Portal
                  </span>
                </div>
              )}
            </div>
            {/* Desktop collapse toggle or Mobile Close button */}
            <div className="flex items-center space-x-1">
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              {!collapsed && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:block p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Section */}
          <div className="p-3 space-y-6">
            {visibleMenuGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {group.title && (!collapsed || mobileOpen) && (
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {group.title}
                  </div>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = item.children && item.children.length > 0;
                    const key = item.label.toLowerCase();
                    const isExpanded = openSubmenus[key];
                    const isActive = currentNav === item.id || isChildActive(item.children);

                    if (hasChildren && (!collapsed || mobileOpen)) {
                      return (
                        <div key={item.id} className="space-y-0.5">
                          <button
                            onClick={() => toggleSubmenu(key)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium cursor-pointer select-none transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C633E]/30 ${
                              isActive
                                ? 'text-[#2C633E] bg-[#EAF2EC] font-semibold border border-[#2C633E]/15 shadow-2xs'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 active:bg-gray-200/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon
                                className={`w-4 h-4 shrink-0 transition-colors ${
                                  isActive ? 'text-[#2C633E]' : 'text-gray-400 group-hover:text-gray-600'
                                }`}
                              />
                              <span>{item.label}</span>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                            )}
                          </button>

                          {/* Accordion Children */}
                          {isExpanded && (
                            <div className="pl-9 pr-1 py-1 space-y-1 border-l-2 border-gray-100 ml-4">
                              {item.children?.map((child) => {
                                const isChildSelected = currentNav === child.id;
                                return (
                                  <button
                                    key={child.id}
                                    onClick={() => handleItemClick(child.id)}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer select-none transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C633E]/30 ${
                                      isChildSelected
                                        ? 'text-[#2C633E] bg-[#EAF2EC] font-semibold border border-[#2C633E]/10'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/70 active:bg-gray-200/50'
                                    }`}
                                  >
                                    {child.label}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Single Menu Item or Collapsed view
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (hasChildren && item.children) {
                            handleItemClick(item.children[0].id);
                          } else {
                            handleItemClick(item.id);
                          }
                        }}
                        title={collapsed ? item.label : undefined}
                        className={`w-full flex items-center ${
                          collapsed && !mobileOpen ? 'justify-center px-2' : 'justify-between px-3'
                        } py-2 rounded-xl text-sm font-medium cursor-pointer select-none transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C633E]/30 ${
                          isActive
                            ? 'text-[#2C633E] bg-[#EAF2EC] font-semibold border border-[#2C633E]/15 shadow-2xs'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 active:bg-gray-200/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-[#2C633E]' : 'text-gray-400'
                            }`}
                          />
                          {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Subscription Badge & Collapse Toggle */}
        <div className="p-3 border-t border-gray-100 shrink-0 space-y-2">
          {(!collapsed || mobileOpen) && userRole === 'admin' && (
            <div className="bg-[#F8F9FC] border border-gray-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs font-semibold text-gray-900">Growth Plan</p>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">840 / 1,200 Students</p>
              </div>
              <button
                onClick={() => handleItemClick('subscription')}
                className="text-xs font-semibold text-[#2C633E] hover:underline"
              >
                Upgrade
              </button>
            </div>
          )}

          {(!collapsed || mobileOpen) && userRole !== 'admin' && (
            <div className="bg-[#F8F9FC] border border-gray-200 rounded-xl p-3">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <p className="text-xs font-semibold text-gray-900 capitalize">{userRole} Session Active</p>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">Role-based access active</p>
            </div>
          )}

          {collapsed && !mobileOpen && (
            <button
              onClick={onToggleCollapse}
              className="w-full py-2 flex justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              title="Expand sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
