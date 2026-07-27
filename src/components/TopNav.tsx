import React, { useState } from 'react';
import { NavigationItem, UserSession } from '../types';
import { isNavAllowed } from '../utils/rbac';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  UserPlus,
  Receipt,
  Megaphone,
  CheckCircle2,
  Calendar,
  User,
  Settings,
  Sparkles,
  LogOut,
  X,
  Menu
} from 'lucide-react';

interface TopNavProps {
  onNavigate: (nav: NavigationItem) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  schoolName: string;
  currentUser?: UserSession | null;
  onLogout?: () => void;
  onToggleMobileSidebar?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onNavigate,
  searchQuery,
  onSearchChange,
  schoolName,
  currentUser,
  onLogout,
  onToggleMobileSidebar
}) => {
  const [showQuickAction, setShowQuickAction] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const role = currentUser?.role || 'admin';

  const notifications = [
    {
      id: 1,
      title: 'Fee Payment Received',
      desc: 'Alexander Wright paid $1,250 for Tuition Fee.',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: 'New Admission Request',
      desc: 'Isabella Martinez submitted Grade 9 application.',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      title: 'Attendance Report Ready',
      desc: 'Daily attendance logs compiled.',
      time: '3h ago',
      unread: false
    }
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-20 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
      {/* Search Input & Mobile Menu Toggle */}
      <div className="flex items-center space-x-2 flex-1 max-w-md min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative w-full min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students, teachers, classes..."
            className="w-full pl-9 sm:pl-10 pr-8 sm:pr-9 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
        {/* Term Badge Pill */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs font-medium text-gray-700">
          <Calendar className="w-3.5 h-3.5 text-[#2C633E]" />
          <span>AY 2026 - 2027</span>
          <span className="text-gray-300">•</span>
          <span className="text-[#2C633E] font-semibold">Fall Term</span>
        </div>

        {/* Quick Action Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowQuickAction(!showQuickAction);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Action</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>

          {showQuickAction && (
            <div className="absolute right-0 mt-2 w-52 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Quick Shortcuts
              </div>
              {isNavAllowed('add-student', role) && (
                <button
                  onClick={() => {
                    onNavigate('add-student');
                    setShowQuickAction(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-emerald-600" />
                  <span>Add New Student</span>
                </button>
              )}
              {isNavAllowed('accounts', role) && (
                <button
                  onClick={() => {
                    onNavigate('accounts');
                    setShowQuickAction(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-amber-600" />
                  <span>Accounts & Payroll</span>
                </button>
              )}
              {isNavAllowed('fees', role) && (
                <button
                  onClick={() => {
                    onNavigate('fees');
                    setShowQuickAction(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-amber-600" />
                  <span>My Fees & Invoices</span>
                </button>
              )}
              {isNavAllowed('salary', role) && (
                <button
                  onClick={() => {
                    onNavigate('salary');
                    setShowQuickAction(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  <span>My Salary Details</span>
                </button>
              )}
              {isNavAllowed('notice-board', role) && (
                <button
                  onClick={() => {
                    onNavigate('notice-board');
                    setShowQuickAction(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <Megaphone className="w-4 h-4 text-blue-600" />
                  <span>{role === 'admin' ? 'Publish Notice' : 'Notice Board'}</span>
                </button>
              )}
              {isNavAllowed('attendance', role) && (
                <button
                  onClick={() => {
                    onNavigate('attendance');
                    setShowQuickAction(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>{role === 'student' ? 'My Attendance' : 'Mark Attendance'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowQuickAction(false);
              setShowProfileMenu(false);
            }}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2C633E] ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-40">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-900">Notifications</h3>
                <span className="text-[10px] font-semibold text-[#2C633E] bg-[#EAF2EC] px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-semibold text-gray-900">{n.title}</p>
                      <span className="text-[10px] text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100 text-center">
                <button
                  onClick={() => {
                    onNavigate('notice-board');
                    setShowNotifications(false);
                  }}
                  className="text-xs font-medium text-[#2C633E] hover:underline"
                >
                  View Notice Board
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowQuickAction(false);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2.5 p-1 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
              alt={`${currentUser?.name || 'User'} Avatar`}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-gray-100"
            />
            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-semibold text-gray-900 leading-tight">{currentUser?.name || 'Sarah Jenkins'}</p>
              <p className="text-[10px] text-gray-500 capitalize">{currentUser?.title || `${role} User`}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900">{currentUser?.name || 'Sarah Jenkins'}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'admin@school.com'}</p>
                <span className="inline-block mt-1 text-[10px] font-bold text-[#2C633E] bg-[#EAF2EC] px-2 py-0.5 rounded-full capitalize">
                  {role} Role
                </span>
              </div>
              <button
                onClick={() => {
                  onNavigate('profile');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-gray-400" />
                <span>My Profile</span>
              </button>
              {isNavAllowed('settings', role) && (
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span>School Settings</span>
                </button>
              )}
              {isNavAllowed('subscription', role) && (
                <button
                  onClick={() => {
                    onNavigate('subscription');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#EAF2EC] hover:text-[#2C633E] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#2C633E]" />
                  <span>Subscription Plan</span>
                </button>
              )}
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  if (onLogout) onLogout();
                }}
                className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
