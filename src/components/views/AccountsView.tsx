import React, { useState } from 'react';
import { FeeInvoice, Student, Teacher, SupportStaff, UserSession } from '../../types';
import { SalaryView } from './SalaryView';
import {
  CreditCard,
  Banknote,
  Plus,
  Search,
  Filter,
  DollarSign,
  FileText,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Download,
  Users,
  Building2,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
  Briefcase
} from 'lucide-react';

interface AccountsViewProps {
  invoices: FeeInvoice[];
  students: Student[];
  teachers: Teacher[];
  supportStaff: SupportStaff[];
  onAddInvoice: (inv: Omit<FeeInvoice, 'id'>) => void;
  onUpdateInvoiceStatus: (invoiceId: string, status: 'Paid' | 'Pending' | 'Overdue') => void;
  schoolName: string;
  currentUser?: UserSession | null;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  invoices,
  students,
  teachers,
  supportStaff,
  onAddInvoice,
  onUpdateInvoiceStatus,
  schoolName,
  currentUser
}) => {
  const role = currentUser?.role || 'admin';

  // State for tabs: Admin sees Fees & Salaries. Teacher sees Salaries only.
  const [activeTab, setActiveTab] = useState<'fees' | 'salaries'>(
    role === 'teacher' ? 'salaries' : 'fees'
  );

  // Fees State
  const [feeSearch, setFeeSearch] = useState('');
  const [feeStatusFilter, setFeeStatusFilter] = useState('All');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<FeeInvoice | null>(null);

  const [newInv, setNewInv] = useState({
    studentId: students[0]?.id || '',
    amount: 1250,
    feeType: 'Tuition' as 'Tuition' | 'Admission' | 'Exam' | 'Transport' | 'Library',
    dueDate: '2026-08-15',
    status: 'Pending' as 'Paid' | 'Pending' | 'Overdue'
  });

  // Salaries State
  const [salarySearch, setSalarySearch] = useState('');
  const [staffRoleFilter, setStaffRoleFilter] = useState('All');
  const [selectedStaffPayslip, setSelectedStaffPayslip] = useState<any | null>(null);
  const [salaryRecords, setSalaryRecords] = useState(() => {
    // Generate initial payroll data from teachers and support staff
    const teacherSalaries = teachers.map((t, idx) => ({
      id: `PAY-TCH-${t.id}`,
      staffId: t.id,
      name: t.name,
      role: 'Teacher' as const,
      department: t.department,
      basicPay: 4800 + (idx * 350),
      allowances: 750,
      deductions: 450,
      netSalary: 4800 + (idx * 350) + 750 - 450,
      paymentDate: '2026-07-01',
      paymentMethod: 'Direct Bank Transfer',
      status: idx % 4 === 0 ? 'Pending' : 'Paid'
    }));

    const staffSalaries = supportStaff.map((s, idx) => ({
      id: `PAY-STF-${s.id}`,
      staffId: s.id,
      name: s.name,
      role: 'Support Staff' as const,
      department: s.role,
      basicPay: 2800 + (idx * 200),
      allowances: 400,
      deductions: 250,
      netSalary: 2800 + (idx * 200) + 400 - 250,
      paymentDate: '2026-07-01',
      paymentMethod: 'Direct Bank Transfer',
      status: 'Paid'
    }));

    return [...teacherSalaries, ...staffSalaries];
  });

  // Access Control Guard for Student and Parent
  if (role === 'student' || role === 'parent') {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm space-y-4 animate-in fade-in duration-200">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-100">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          You do not have permission to access the Accounts & Payroll administrative module. Please use the Fees portal to view your statement.
        </p>
      </div>
    );
  }

  // Filtered Fees
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(feeSearch.toLowerCase()) ||
      inv.studentName.toLowerCase().includes(feeSearch.toLowerCase()) ||
      inv.studentId.toLowerCase().includes(feeSearch.toLowerCase());

    const matchesStatus = feeStatusFilter === 'All' || inv.status === feeStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalFeesCollected = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalFeesPending = invoices
    .filter((i) => i.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalFeesOverdue = invoices
    .filter((i) => i.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Filtered Salaries
  const filteredSalaries = salaryRecords.filter((sal) => {
    const matchesSearch =
      sal.name.toLowerCase().includes(salarySearch.toLowerCase()) ||
      sal.staffId.toLowerCase().includes(salarySearch.toLowerCase()) ||
      sal.department.toLowerCase().includes(salarySearch.toLowerCase());

    const matchesRole = staffRoleFilter === 'All' || sal.role === staffRoleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPayrollMonthly = salaryRecords.reduce((acc, curr) => acc + curr.netSalary, 0);
  const totalSalariesPaid = salaryRecords.filter(s => s.status === 'Paid').reduce((acc, curr) => acc + curr.netSalary, 0);
  const totalSalariesPending = salaryRecords.filter(s => s.status === 'Pending').reduce((acc, curr) => acc + curr.netSalary, 0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find((s) => s.id === newInv.studentId);
    if (!stu) return;

    onAddInvoice({
      invoiceNo: `HA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: stu.id,
      studentName: `${stu.firstName} ${stu.lastName}`,
      grade: stu.grade,
      amount: Number(newInv.amount),
      feeType: newInv.feeType,
      dueDate: newInv.dueDate,
      status: newInv.status,
      paymentMethod: newInv.status === 'Paid' ? 'Online Gateway' : undefined
    });

    setShowInvoiceModal(false);
  };

  const handleMarkSalaryPaid = (salaryId: string) => {
    setSalaryRecords(prev => prev.map(s => s.id === salaryId ? { ...s, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0] } : s));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Tab Switcher */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2EC] text-[#2C633E] text-xs font-bold uppercase tracking-wider">
              {role === 'teacher' ? 'Faculty Portal' : 'Financial Administration'}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">Accounts Module</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mt-1">
            {role === 'teacher' ? 'My Salary & Payslips' : 'School Accounts & Payroll'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {role === 'teacher'
              ? 'View your personal salary breakdown, monthly history, and official payslips.'
              : 'Comprehensive financial management for student tuition fees and employee payroll salaries.'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-[#F8F9FC] p-1 rounded-xl border border-gray-200 shrink-0">
          {(role === 'admin' || role === 'accountant') && (
            <button
              onClick={() => setActiveTab('fees')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fees'
                  ? 'bg-white text-[#2C633E] shadow-sm border border-gray-200/80'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Fees</span>
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#EAF2EC] text-[#2C633E] text-[10px]">
                {invoices.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('salaries')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'salaries'
                ? 'bg-white text-[#2C633E] shadow-sm border border-gray-200/80'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>Salaries</span>
            {(role === 'admin' || role === 'accountant') && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#EAF2EC] text-[#2C633E] text-[10px]">
                {salaryRecords.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ================= TAB 1: FEES MANAGEMENT ================= */}
      {activeTab === 'fees' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Collections</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mt-2">${totalFeesCollected.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">Paid Invoices ({invoices.filter(i => i.status === 'Paid').length})</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Fees</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mt-2">${totalFeesPending.toLocaleString()}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">Awaiting Payment ({invoices.filter(i => i.status === 'Pending').length})</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overdue Balance</span>
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mt-2">${totalFeesOverdue.toLocaleString()}</p>
              <p className="text-xs text-rose-600 font-medium mt-1">Overdue Invoices ({invoices.filter(i => i.status === 'Overdue').length})</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Discounts & Fines</span>
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mt-2">$2,400</p>
              <p className="text-xs text-blue-600 font-medium mt-1">Active Waivers & Fine Audits</p>
            </div>
          </div>

          {/* Controls & Search */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center space-x-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoice no, student name or ID..."
                  value={feeSearch}
                  onChange={(e) => setFeeSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <select
                value={feeStatusFilter}
                onChange={(e) => setFeeStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:border-[#2C633E]"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid Only</option>
                <option value="Pending">Pending Only</option>
                <option value="Overdue">Overdue Only</option>
              </select>
            </div>

            <button
              onClick={() => setShowInvoiceModal(true)}
              className="px-4 py-2 bg-[#2C633E] hover:bg-[#214A2E] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Fee Voucher</span>
            </button>
          </div>

          {/* Invoices Table */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FC] border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-4">Invoice No</th>
                    <th className="p-4">Student Info</th>
                    <th className="p-4">Fee Type</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700 font-medium">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#2C633E]">{inv.invoiceNo}</td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{inv.studentName}</div>
                        <div className="text-[11px] text-gray-400">{inv.studentId} • {inv.grade}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 font-semibold text-[11px]">
                          {inv.feeType}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-900">${inv.amount.toLocaleString()}</td>
                      <td className="p-4 text-gray-500">{inv.dueDate}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : inv.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {inv.status === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
                          {inv.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {inv.status === 'Overdue' && <AlertTriangle className="w-3 h-3" />}
                          <span>{inv.status}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {inv.status !== 'Paid' && (
                          <button
                            onClick={() => onUpdateInvoiceStatus(inv.id, 'Paid')}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => setPreviewInvoice(inv)}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center space-x-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredInvoices.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-xs text-gray-400">
                        No fee invoices found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: EMPLOYEE SALARIES ================= */}
      {activeTab === 'salaries' && (
        role === 'teacher' ? (
          <SalaryView
            currentUser={currentUser!}
            teachers={teachers}
            schoolName={schoolName}
          />
        ) : (
          <div className="space-y-6 animate-in fade-in duration-150">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Payroll</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Banknote className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mt-2">${totalPayrollMonthly.toLocaleString()}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">Total Faculty & Staff Salary Budget</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Disbursed Payroll</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-emerald-700 mt-2">${totalSalariesPaid.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">Processed Salary Payments</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Disbursal</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-amber-700 mt-2">${totalSalariesPending.toLocaleString()}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">Awaiting Salary Transfer</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Employees Enrolled</span>
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mt-2">{salaryRecords.length}</p>
              <p className="text-xs text-blue-600 font-medium mt-1">{teachers.length} Teachers • {supportStaff.length} Staff</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center space-x-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search staff name, ID or department..."
                  value={salarySearch}
                  onChange={(e) => setSalarySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <select
                value={staffRoleFilter}
                onChange={(e) => setStaffRoleFilter(e.target.value)}
                className="px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:border-[#2C633E]"
              >
                <option value="All">All Staff Roles</option>
                <option value="Teacher">Teachers Only</option>
                <option value="Support Staff">Support Staff Only</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSalaryRecords(prev => prev.map(s => ({ ...s, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0] })));
              }}
              className="px-4 py-2 bg-[#2C633E] hover:bg-[#214A2E] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Process All Pending Salaries</span>
            </button>
          </div>

          {/* Salary Records Table */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FC] border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="p-4">Employee</th>
                    <th className="p-4">Role / Dept</th>
                    <th className="p-4">Basic Pay</th>
                    <th className="p-4">Allowances</th>
                    <th className="p-4">Deductions</th>
                    <th className="p-4">Net Salary</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700 font-medium">
                  {filteredSalaries.map((sal) => (
                    <tr key={sal.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{sal.name}</div>
                        <div className="text-[11px] font-mono text-gray-400">{sal.staffId}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-bold text-[10px]">
                          {sal.role}
                        </span>
                        <div className="text-[11px] text-gray-500 mt-0.5">{sal.department}</div>
                      </td>
                      <td className="p-4">${sal.basicPay.toLocaleString()}</td>
                      <td className="p-4 text-emerald-600">+${sal.allowances}</td>
                      <td className="p-4 text-rose-600">-${sal.deductions}</td>
                      <td className="p-4 font-extrabold text-gray-900">${sal.netSalary.toLocaleString()}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            sal.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {sal.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{sal.status}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {sal.status !== 'Paid' && (
                          <button
                            onClick={() => handleMarkSalaryPaid(sal.id)}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                          >
                            Disburse
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedStaffPayslip(sal)}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center space-x-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Payslip</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    )}

      {/* Invoice Receipt Modal */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Official Fee Voucher</h3>
                <p className="text-xs text-gray-500 font-mono">{previewInvoice.invoiceNo}</p>
              </div>
              <button
                onClick={() => setPreviewInvoice(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-400">School:</span>
                <span className="font-bold text-gray-900">{schoolName}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-400">Student Name:</span>
                <span className="font-bold text-gray-900">{previewInvoice.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-400">Fee Category:</span>
                <span className="font-bold text-[#2C633E]">{previewInvoice.feeType}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-400">Amount Due:</span>
                <span className="font-bold text-gray-900 text-sm">${previewInvoice.amount}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-400">Due Date:</span>
                <span>{previewInvoice.dueDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-400">Payment Status:</span>
                <span className="font-bold uppercase text-emerald-600">{previewInvoice.status}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end space-x-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#2C633E] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payslip Modal */}
      {selectedStaffPayslip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Monthly Salary Payslip</h3>
                <p className="text-xs text-gray-500">{selectedStaffPayslip.id} • July 2026</p>
              </div>
              <button
                onClick={() => setSelectedStaffPayslip(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F8F9FC] border border-gray-200/80 rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Employee Name:</span>
                <span className="font-bold text-gray-900">{selectedStaffPayslip.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Staff ID & Role:</span>
                <span className="font-medium text-gray-700">{selectedStaffPayslip.staffId} ({selectedStaffPayslip.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Department:</span>
                <span className="font-medium text-gray-700">{selectedStaffPayslip.department}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t pt-3">
              <div className="flex justify-between py-1">
                <span>Basic Salary</span>
                <span className="font-bold text-gray-900">${selectedStaffPayslip.basicPay}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>HRA & Allowances</span>
                <span className="font-bold text-emerald-600">+${selectedStaffPayslip.allowances}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax & Provident Fund Deductions</span>
                <span className="font-bold text-rose-600">-${selectedStaffPayslip.deductions}</span>
              </div>
              <div className="flex justify-between py-2 border-t font-extrabold text-sm text-gray-900">
                <span>Net Salary Payable</span>
                <span className="text-[#2C633E]">${selectedStaffPayslip.netSalary}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#2C633E] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Payslip PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-base">Issue New Student Fee Voucher</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Student</label>
                <select
                  value={newInv.studentId}
                  onChange={(e) => setNewInv({ ...newInv, studentId: e.target.value })}
                  className="w-full p-2.5 bg-[#F8F9FC] border border-gray-200 rounded-xl focus:border-[#2C633E]"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.id} • {s.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Fee Type</label>
                <select
                  value={newInv.feeType}
                  onChange={(e) => setNewInv({ ...newInv, feeType: e.target.value as any })}
                  className="w-full p-2.5 bg-[#F8F9FC] border border-gray-200 rounded-xl focus:border-[#2C633E]"
                >
                  <option value="Tuition">Tuition Fee</option>
                  <option value="Admission">Admission Fee</option>
                  <option value="Exam">Exam Fee</option>
                  <option value="Transport">Transport Fee</option>
                  <option value="Library">Library Fee</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  value={newInv.amount}
                  onChange={(e) => setNewInv({ ...newInv, amount: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#F8F9FC] border border-gray-200 rounded-xl focus:border-[#2C633E]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newInv.dueDate}
                  onChange={(e) => setNewInv({ ...newInv, dueDate: e.target.value })}
                  className="w-full p-2.5 bg-[#F8F9FC] border border-gray-200 rounded-xl focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2C633E] text-white rounded-xl font-bold hover:bg-[#214A2E] cursor-pointer"
                >
                  Create Fee Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
