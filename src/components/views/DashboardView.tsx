import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Student, Teacher, FeeInvoice, Notice, NavigationItem, UserSession } from '../../types';
import {
  Users,
  GraduationCap,
  DollarSign,
  ClipboardCheck,
  UserPlus,
  Receipt,
  Megaphone,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  FileText,
  CreditCard,
  Banknote,
  Calendar,
  AlertCircle,
  Briefcase,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

interface DashboardViewProps {
  students: Student[];
  teachers: Teacher[];
  invoices: FeeInvoice[];
  notices: Notice[];
  onNavigate: (nav: NavigationItem) => void;
  schoolName: string;
  currentUser?: UserSession | null;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  teachers,
  invoices,
  notices,
  onNavigate,
  schoolName,
  currentUser
}) => {
  const [selectedStatIndex, setSelectedStatIndex] = useState<number | null>(0);
  const role = currentUser?.role || 'admin';

  // Derived Admin / General Data
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const activeTeachers = teachers.filter((t) => t.status === 'Active').length;

  const totalCollected = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingAmount = invoices
    .filter((inv) => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingAdmissions = students.filter((s) => s.status === 'Pending');

  // Role-Specific Welcome Titles and Subtitles
  const getHeaderInfo = () => {
    switch (role) {
      case 'accountant':
        return {
          badge: 'Finance Portal',
          date: 'Fiscal Year 2026',
          title: `Welcome back! Here's today's financial overview.`,
          subtitle: `Financial & payroll snapshot for ${schoolName}. Monitor fee collections, pending invoices, and employee salaries.`
        };
      case 'teacher':
        return {
          badge: 'Faculty Portal',
          date: 'Fall Semester 2026',
          title: `Welcome back, ${currentUser?.name || 'Faculty'}! Here's today's teaching overview.`,
          subtitle: `Class and teaching activity summary for ${schoolName}. Manage your classes, attendance, homework, and view salary.`
        };
      case 'student':
        return {
          badge: 'Student Portal',
          date: 'Academic Year 2026',
          title: `Welcome back, ${currentUser?.name || 'Student'}! Let's continue your learning journey.`,
          subtitle: `Your personal academic progress and schedule at ${schoolName}. Check your attendance, homework, exams, and fees.`
        };
      case 'parent':
        return {
          badge: 'Parent Portal',
          date: 'Academic Year 2026',
          title: `Welcome, ${currentUser?.name || 'Parent'}! Here's your child's latest school updates.`,
          subtitle: `Monitoring Alex Johnson (Grade 10 - Sec A) at ${schoolName}. View attendance, academic progress, homework, and fees.`
        };
      case 'admin':
      default:
        return {
          badge: 'Fall Semester 2026',
          date: 'Saturday, July 25, 2026',
          title: `Welcome back to ${schoolName} Dashboard`,
          subtitle: (
            <>
              Here is your daily administrative snapshot. You have{' '}
              <span className="font-semibold text-gray-800">{pendingAdmissions.length} new admission requests</span> and{' '}
              <span className="font-semibold text-gray-800">${pendingAmount.toLocaleString()} pending fee invoices</span>.
            </>
          )
        };
    }
  };

  const headerInfo = getHeaderInfo();

  // Role-Specific Stat Cards
  const getStatCards = () => {
    switch (role) {
      case 'accountant':
        return [
          {
            title: 'Total Fee Collection',
            icon: DollarSign,
            iconBg: 'bg-emerald-50 text-emerald-600',
            value: `$${totalCollected.toLocaleString()}`,
            badgeText: 'Paid',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: `${invoices.filter((i) => i.status === 'Paid').length} invoices fully cleared`
          },
          {
            title: 'Pending Fees',
            icon: CreditCard,
            iconBg: 'bg-amber-50 text-amber-600',
            value: `$${pendingAmount.toLocaleString()}`,
            badgeText: 'Pending',
            badgeBg: 'text-amber-600 bg-amber-50',
            subtext: `${invoices.filter((i) => i.status !== 'Paid').length} unpaid invoices outstanding`
          },
          {
            title: 'Monthly Payroll',
            icon: Banknote,
            iconBg: 'bg-blue-50 text-blue-600',
            value: '$42,500',
            badgeText: 'Active',
            badgeBg: 'text-blue-600 bg-blue-50',
            subtext: '18 active staff & teachers enrolled'
          },
          {
            title: 'Payroll Processed',
            icon: ShieldCheck,
            iconBg: 'bg-[#EAF2EC] text-[#2C633E]',
            value: '90% Paid',
            badgeText: 'On Track',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: '$4,250 pending final disbursement'
          }
        ];

      case 'teacher':
        return [
          {
            title: 'My Classes',
            icon: BookOpen,
            iconBg: 'bg-[#EAF2EC] text-[#2C633E]',
            value: '3 Classes',
            badgeText: 'Active',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: 'Grade 10-A, Grade 10-B, Grade 9-A'
          },
          {
            title: 'My Students',
            icon: Users,
            iconBg: 'bg-blue-50 text-blue-600',
            value: '85 Students',
            badgeText: 'Enrolled',
            badgeBg: 'text-blue-600 bg-blue-50',
            subtext: 'Across 3 active teaching sections'
          },
          {
            title: "Today's Attendance",
            icon: ClipboardCheck,
            iconBg: 'bg-emerald-50 text-emerald-600',
            value: '98.2%',
            badgeText: 'Normal',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: '83 / 85 present in morning sessions'
          },
          {
            title: 'Pending Homework',
            icon: FileText,
            iconBg: 'bg-amber-50 text-amber-600',
            value: '4 Tasks',
            badgeText: 'Action',
            badgeBg: 'text-amber-600 bg-amber-50',
            subtext: '2 assignments pending review'
          }
        ];

      case 'student':
        return [
          {
            title: 'Attendance Rate',
            icon: ClipboardCheck,
            iconBg: 'bg-[#EAF2EC] text-[#2C633E]',
            value: '96.5%',
            badgeText: 'Excellent',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: '2 absences recorded this semester'
          },
          {
            title: 'Pending Homework',
            icon: CheckSquare,
            iconBg: 'bg-amber-50 text-amber-600',
            value: '3 Tasks',
            badgeText: 'Due Soon',
            badgeBg: 'text-amber-600 bg-amber-50',
            subtext: 'Math Algebra II due tomorrow'
          },
          {
            title: 'Academic Grade',
            icon: Award,
            iconBg: 'bg-blue-50 text-blue-600',
            value: '3.85 GPA',
            badgeText: 'Grade A',
            badgeBg: 'text-blue-600 bg-blue-50',
            subtext: 'Honors roll student Grade 10-A'
          },
          {
            title: 'Fee Status',
            icon: CreditCard,
            iconBg: 'bg-emerald-50 text-emerald-600',
            value: 'Paid',
            badgeText: 'Cleared',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: '$0.00 outstanding balance'
          }
        ];

      case 'parent':
        return [
          {
            title: "Child's Attendance",
            icon: ClipboardCheck,
            iconBg: 'bg-[#EAF2EC] text-[#2C633E]',
            value: '96.5%',
            badgeText: 'Alex Johnson',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: 'Grade 10 - Section A'
          },
          {
            title: 'Fee Statement',
            icon: CreditCard,
            iconBg: 'bg-emerald-50 text-emerald-600',
            value: '$0 Balance',
            badgeText: 'Paid In Full',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: 'Term 1 Tuition fully settled'
          },
          {
            title: 'Upcoming Exams',
            icon: Calendar,
            iconBg: 'bg-blue-50 text-blue-600',
            value: '2 Exams',
            badgeText: 'August 2026',
            badgeBg: 'text-blue-600 bg-blue-50',
            subtext: 'Mid-Term Math & Physics'
          },
          {
            title: 'Pending Homework',
            icon: FileText,
            iconBg: 'bg-amber-50 text-amber-600',
            value: '3 Pending',
            badgeText: 'On Track',
            badgeBg: 'text-amber-600 bg-amber-50',
            subtext: '1 assignment due tomorrow'
          }
        ];

      case 'admin':
      default:
        return [
          {
            title: 'Total Students',
            icon: GraduationCap,
            iconBg: 'bg-[#EAF2EC] text-[#2C633E]',
            value: `${students.length}`,
            badgeText: '+12%',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: `${activeStudents} enrolled in active classes`
          },
          {
            title: 'Teaching Staff',
            icon: Users,
            iconBg: 'bg-emerald-50 text-emerald-600',
            value: `${teachers.length}`,
            badgeText: 'Active',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: `${activeTeachers} on duty today across 5 departments`
          },
          {
            title: 'Fees Collected',
            icon: DollarSign,
            iconBg: 'bg-amber-50 text-amber-600',
            value: `$${totalCollected.toLocaleString()}`,
            badgeText: 'Paid',
            badgeBg: 'text-blue-600 bg-blue-50',
            subtext: `$${pendingAmount.toLocaleString()} pending this term`
          },
          {
            title: "Today's Attendance",
            icon: ClipboardCheck,
            iconBg: 'bg-[#EAF2EC] text-[#2C633E]',
            value: '96.4%',
            badgeText: 'Normal',
            badgeBg: 'text-emerald-600 bg-emerald-50',
            subtext: '270 / 280 present in morning assembly'
          }
        ];
    }
  };

  const statCards = getStatCards();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF2EC] text-[#2C633E]">
              {headerInfo.badge}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 font-medium">{headerInfo.date}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-2 tracking-tight">
            {headerInfo.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            {headerInfo.subtitle}
          </p>
        </div>

        {/* Quick Action Buttons (Role-based) */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {role === 'admin' && (
            <>
              <button
                onClick={() => onNavigate('add-student')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
              <button
                onClick={() => onNavigate('accounts')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Receipt className="w-4 h-4 text-gray-500" />
                <span>Accounts & Fees</span>
              </button>
              <button
                onClick={() => onNavigate('notice-board')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Megaphone className="w-4 h-4 text-gray-500" />
                <span>Post Notice</span>
              </button>
            </>
          )}

          {role === 'accountant' && (
            <>
              <button
                onClick={() => onNavigate('accounts')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                <span>Collect Fees</span>
              </button>
              <button
                onClick={() => onNavigate('accounts')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Banknote className="w-4 h-4 text-gray-500" />
                <span>Process Payroll</span>
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-gray-500" />
                <span>Finance Reports</span>
              </button>
            </>
          )}

          {role === 'teacher' && (
            <>
              <button
                onClick={() => onNavigate('attendance')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Mark Attendance</span>
              </button>
              <button
                onClick={() => onNavigate('homework')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-gray-500" />
                <span>Add Homework</span>
              </button>
              <button
                onClick={() => onNavigate('accounts')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Banknote className="w-4 h-4 text-gray-500" />
                <span>My Salary</span>
              </button>
            </>
          )}

          {role === 'student' && (
            <>
              <button
                onClick={() => onNavigate('homework')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <CheckSquare className="w-4 h-4" />
                <span>View Homework</span>
              </button>
              <button
                onClick={() => onNavigate('timetable')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Timetable</span>
              </button>
              <button
                onClick={() => onNavigate('fees')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span>Fee Statement</span>
              </button>
            </>
          )}

          {role === 'parent' && (
            <>
              <button
                onClick={() => onNavigate('attendance')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Child Attendance</span>
              </button>
              <button
                onClick={() => onNavigate('examination')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Award className="w-4 h-4 text-gray-500" />
                <span>Report Card</span>
              </button>
              <button
                onClick={() => onNavigate('fees')}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span>View Fees</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          const isSelected = selectedStatIndex === idx;
          return (
            <motion.div
              key={card.title}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: idx * 0.05 }}
              onClick={() => setSelectedStatIndex(idx)}
              className={`rounded-2xl p-5 transition-colors duration-200 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-[#2C633E] via-[#245334] to-[#183823] text-white border border-[#183823] shadow-xl shadow-[#2C633E]/20'
                  : 'bg-white text-gray-900 border border-gray-200 hostinger-shadow hostinger-shadow-hover'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {card.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                    isSelected ? 'bg-white/20 text-white backdrop-blur-xs' : card.iconBg
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline space-x-2">
                  <span className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {card.value}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-md flex items-center ${
                      isSelected ? 'bg-white/20 text-white' : card.badgeBg
                    }`}
                  >
                    {card.badgeText.includes('+') && <TrendingUp className="w-3 h-3 mr-0.5" />}
                    {card.badgeText}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                  {card.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Grid: Main Section + Secondary Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Main Overview Card & Main Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card 1: Attendance/Financial Progress Bar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {role === 'accountant'
                    ? 'Monthly Fee & Revenue Overview'
                    : role === 'teacher'
                    ? "Today's Class Attendance Summary"
                    : role === 'student'
                    ? 'Academic Attendance & Term Progress'
                    : role === 'parent'
                    ? "Child's Attendance & Conduct Summary"
                    : "Today's Attendance Overview"}
                </h3>
                <p className="text-xs text-gray-500">
                  {role === 'accountant'
                    ? 'Breakdown of paid collections vs pending student fee invoices'
                    : role === 'teacher'
                    ? 'Live attendance summary across Grade 10-A, 10-B, and 9-A'
                    : role === 'student'
                    ? 'Term 1 attendance logs and subject participation rate'
                    : role === 'parent'
                    ? 'Live status update for Alex Johnson (Grade 10-A)'
                    : 'Live summary across all active classes'}
                </p>
              </div>
              <button
                onClick={() =>
                  onNavigate(
                    role === 'accountant'
                      ? 'accounts'
                      : role === 'teacher'
                      ? 'attendance'
                      : role === 'student'
                      ? 'attendance'
                      : role === 'parent'
                      ? 'attendance'
                      : 'attendance'
                  )
                }
                className="text-xs font-semibold text-[#2C633E] hover:underline flex items-center cursor-pointer"
              >
                <span>
                  {role === 'accountant' ? 'View Accounts' : 'View Attendance'}
                </span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              {role === 'accountant' ? (
                <>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: '75%' }} title="Collected: 75%" />
                    <div className="bg-amber-400 h-full" style={{ width: '18%' }} title="Pending: 18%" />
                    <div className="bg-red-400 h-full" style={{ width: '7%' }} title="Overdue: 7%" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 pt-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>Collected (${totalCollected.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span>Pending (${pendingAmount.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span>Overdue ($1,200)</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: '82%' }} title="Present: 82%" />
                    <div className="bg-amber-400 h-full" style={{ width: '10%' }} title="Late: 10%" />
                    <div className="bg-blue-400 h-full" style={{ width: '4%' }} title="Excused: 4%" />
                    <div className="bg-red-400 h-full" style={{ width: '4%' }} title="Absent: 4%" />
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 pt-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>Present (82%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span>Late (10%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                      <span>Excused (4%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span>Absent (4%)</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Main Card 2: Role-Based Table */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {role === 'accountant'
                    ? 'Recent Financial Invoices & Receipts'
                    : role === 'teacher'
                    ? "Today's Teaching Schedule & Assignments"
                    : role === 'student'
                    ? 'My Homework & Pending Assignments'
                    : role === 'parent'
                    ? "Child's Homework & Exam Schedule"
                    : 'Recent Student Admissions'}
                </h3>
                <p className="text-xs text-gray-500">
                  {role === 'accountant'
                    ? 'Recent tuition fees, invoices, and payment statuses'
                    : role === 'teacher'
                    ? 'Scheduled class periods and assignment submissions'
                    : role === 'student'
                    ? 'Current coursework to submit and upcoming deadlines'
                    : role === 'parent'
                    ? 'Assigned coursework and upcoming examination dates'
                    : 'Newly registered students and pending applications'}
                </p>
              </div>
              <button
                onClick={() =>
                  onNavigate(
                    role === 'accountant'
                      ? 'accounts'
                      : role === 'teacher'
                      ? 'timetable'
                      : role === 'student'
                      ? 'homework'
                      : role === 'parent'
                      ? 'homework'
                      : 'all-students'
                  )
                }
                className="text-xs font-semibold text-[#2C633E] hover:underline flex items-center cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              {role === 'accountant' ? (
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-y border-gray-100">
                    <tr>
                      <th className="py-3 px-4">Invoice ID</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Fee Category</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {invoices.slice(0, 5).map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-gray-900">{inv.id}</td>
                        <td className="py-3 px-4 text-gray-800 font-semibold">{inv.studentName}</td>
                        <td className="py-3 px-4 text-gray-600">{inv.title}</td>
                        <td className="py-3 px-4 font-bold text-gray-900">${inv.amount.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700'
                                : inv.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : role === 'teacher' ? (
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-y border-gray-100">
                    <tr>
                      <th className="py-3 px-4">Period & Time</th>
                      <th className="py-3 px-4">Class & Sec</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Room</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Period 1 (08:30 - 09:15)</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Grade 10 - Sec A</td>
                      <td className="py-3 px-4 text-gray-600">Algebra II & Functions</td>
                      <td className="py-3 px-4 text-gray-600">Room 204</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">Completed</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Period 3 (10:15 - 11:00)</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Grade 10 - Sec B</td>
                      <td className="py-3 px-4 text-gray-600">Geometry & Trigonometry</td>
                      <td className="py-3 px-4 text-gray-600">Room 206</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">In Progress</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Period 5 (13:00 - 13:45)</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Grade 9 - Sec A</td>
                      <td className="py-3 px-4 text-gray-600">Foundational Mathematics</td>
                      <td className="py-3 px-4 text-gray-600">Room 102</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700">Upcoming</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : role === 'student' ? (
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-y border-gray-100">
                    <tr>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Homework Title</th>
                      <th className="py-3 px-4">Assigned By</th>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Mathematics</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Algebra Worksheet Ch 4</td>
                      <td className="py-3 px-4 text-gray-600">Robert Chen</td>
                      <td className="py-3 px-4 text-gray-600">Tomorrow, 5:00 PM</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">Pending</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Physics</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Kinematics Lab Report</td>
                      <td className="py-3 px-4 text-gray-600">Sarah Jenkins</td>
                      <td className="py-3 px-4 text-gray-600">Aug 2, 2026</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">In Progress</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">English Lit</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Macbeth Character Essay</td>
                      <td className="py-3 px-4 text-gray-600">Elena Rostova</td>
                      <td className="py-3 px-4 text-gray-600">Jul 20, 2026</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">Submitted</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : role === 'parent' ? (
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-y border-gray-100">
                    <tr>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Assignment / Exam</th>
                      <th className="py-3 px-4">Teacher</th>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Mathematics</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Mid-Term Geometry Prep</td>
                      <td className="py-3 px-4 text-gray-600">Robert Chen</td>
                      <td className="py-3 px-4 text-gray-600">Aug 10, 2026</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">Upcoming Exam</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Physics</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Practical Lab Review</td>
                      <td className="py-3 px-4 text-gray-600">Sarah Jenkins</td>
                      <td className="py-3 px-4 text-gray-600">Aug 12, 2026</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">Scheduled</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">Chemistry</td>
                      <td className="py-3 px-4 text-gray-800 font-semibold">Periodic Table Problem Set</td>
                      <td className="py-3 px-4 text-gray-600">David Miller</td>
                      <td className="py-3 px-4 text-gray-600">Jul 28, 2026</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-y border-gray-100">
                    <tr>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Grade & Section</th>
                      <th className="py-3 px-4">Parent / Guardian</th>
                      <th className="py-3 px-4">Fee Status</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {students.slice(0, 5).map((stu) => (
                      <tr key={stu.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#EAF2EC] text-[#2C633E] font-bold flex items-center justify-center text-xs">
                              {stu.firstName[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{stu.firstName} {stu.lastName}</p>
                              <p className="text-[10px] text-gray-400">{stu.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{stu.grade} - Sec {stu.section}</td>
                        <td className="py-3 px-4 text-gray-600">{stu.parentName}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              stu.feeStatus === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700'
                                : stu.feeStatus === 'Pending'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {stu.feeStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              stu.status === 'Active'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-[#EAF2EC] text-[#2C633E]'
                            }`}
                          >
                            {stu.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Notice Board & Secondary Widget */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                <Megaphone className="w-4 h-4 text-[#2C633E]" />
                <span>Notice Board</span>
              </h3>
              <button
                onClick={() => onNavigate('notice-board')}
                className="text-xs font-semibold text-[#2C633E] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-3.5 bg-[#F8F9FC] border border-gray-200/60 rounded-xl hover:border-[#2C633E]/30 transition-all cursor-pointer"
                  onClick={() => onNavigate('notice-board')}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        notice.priority === 'Urgent'
                          ? 'bg-red-50 text-red-600'
                          : notice.priority === 'High'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {notice.priority}
                    </span>
                    <span className="text-[10px] text-gray-400">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{notice.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Widget 2 (Role Dependent) */}
          {role === 'teacher' ? (
            /* Teacher Salary Summary Card */
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <Banknote className="w-4 h-4 text-[#2C633E]" />
                  <span>My Salary Summary</span>
                </h3>
                <button
                  onClick={() => onNavigate('accounts')}
                  className="text-xs font-semibold text-[#2C633E] hover:underline cursor-pointer"
                >
                  Payslips
                </button>
              </div>

              <div className="p-4 bg-[#F8F9FC] border border-gray-200/60 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Base Salary</span>
                  <span className="text-xs font-bold text-gray-900">$3,800.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Allowances</span>
                  <span className="text-xs font-bold text-emerald-700">+$450.00</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">Net Monthly Payout</span>
                  <span className="text-sm font-bold text-[#2C633E]">$4,250.00</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-gray-400">July 2026 Payment</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    Paid On Jul 25
                  </span>
                </div>
              </div>
            </div>
          ) : role === 'student' || role === 'parent' ? (
            /* Student / Parent Fee Statement Overview */
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <Receipt className="w-4 h-4 text-[#2C633E]" />
                  <span>Fee Statement</span>
                </h3>
                <button
                  onClick={() => onNavigate('fees')}
                  className="text-xs font-semibold text-[#2C633E] hover:underline cursor-pointer"
                >
                  Receipts
                </button>
              </div>

              <div className="p-4 bg-[#F8F9FC] border border-gray-200/60 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Term 1 Tuition Fee</span>
                  <span className="text-xs font-bold text-gray-900">$2,400.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Amount Paid</span>
                  <span className="text-xs font-bold text-emerald-700">-$2,400.00</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">Remaining Balance</span>
                  <span className="text-sm font-bold text-emerald-700">$0.00</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-gray-400">Receipt #INV-2026-001</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    Fully Cleared
                  </span>
                </div>
              </div>
            </div>
          ) : role === 'accountant' ? (
            /* Accountant Payroll Quick Actions Widget */
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span>Payroll Disbursement</span>
                </h3>
                <button
                  onClick={() => onNavigate('accounts')}
                  className="text-xs font-semibold text-[#2C633E] hover:underline cursor-pointer"
                >
                  Manage
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-gray-50 border border-gray-200/60 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Faculty Payroll (July)</p>
                    <p className="text-[10px] text-gray-500">12 Teachers • $38,400 Total</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </div>

                <div className="p-3.5 bg-gray-50 border border-gray-200/60 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Support Staff Payroll</p>
                    <p className="text-[10px] text-gray-500">6 Staff • $4,100 Total</p>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    2 Pending
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Admin Upcoming Exams Widget */
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Upcoming Exams</span>
                </h3>
                <button
                  onClick={() => onNavigate('examination')}
                  className="text-xs font-semibold text-[#2C633E] hover:underline cursor-pointer"
                >
                  Schedule
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-gray-50 border border-gray-200/60 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">Mid-Term Mathematics</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Aug 10
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Grade 10 • Algebra II & Geometry</p>
                </div>

                <div className="p-3.5 bg-gray-50 border border-gray-200/60 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">Physics Practical Test</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Aug 12
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Grade 10 • Science Lab 2</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
