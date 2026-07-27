import React, { useState } from 'react';
import { UserSession, Teacher } from '../../types';
import {
  Banknote,
  CheckCircle2,
  Calendar,
  FileText,
  Printer,
  Download,
  CreditCard,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Clock,
  Building2,
  ChevronRight,
  Info
} from 'lucide-react';

interface SalaryViewProps {
  currentUser: UserSession;
  teachers?: Teacher[];
  schoolName: string;
}

export const SalaryView: React.FC<SalaryViewProps> = ({
  currentUser,
  teachers = [],
  schoolName
}) => {
  const [selectedMonth, setSelectedMonth] = useState('July 2026');
  const [showPayslipModal, setShowPayslipModal] = useState(false);

  // Find matching teacher record or fallback to current user details
  const matchedTeacher = teachers.find(
    (t) => t.email.toLowerCase() === currentUser.email.toLowerCase() || t.name === currentUser.name
  ) || {
    id: 'TCH-201',
    empId: 'EMP-01',
    name: currentUser.name || 'Robert Chen',
    email: currentUser.email || 'teacher@school.com',
    department: 'Mathematics & STEM',
    designation: 'Senior Faculty Member',
    status: 'Active'
  };

  // Dedicated Salary Details for logged-in teacher only
  const teacherSalary = {
    basicPay: 5200,
    hra: 850,
    medicalAllowance: 300,
    performanceBonus: 250,
    taxDeductions: 550,
    pfDeductions: 200,
    netPayable: 5850,
    paymentStatus: 'Paid' as const,
    lastPaymentDate: '2026-07-01',
    paymentMethod: 'Direct Bank Deposit (A/C ****4892)',
    transactionRef: 'TXN-2026-0701-8842'
  };

  const salaryHistory = [
    { month: 'July 2026', gross: 6600, deductions: 750, net: 5850, status: 'Paid', date: '2026-07-01', ref: 'TXN-8842' },
    { month: 'June 2026', gross: 6600, deductions: 750, net: 5850, status: 'Paid', date: '2026-06-01', ref: 'TXN-7921' },
    { month: 'May 2026', gross: 6600, deductions: 750, net: 5850, status: 'Paid', date: '2026-05-01', ref: 'TXN-6410' },
    { month: 'April 2026', gross: 6400, deductions: 720, net: 5680, status: 'Paid', date: '2026-04-01', ref: 'TXN-5509' },
    { month: 'March 2026', gross: 6400, deductions: 720, net: 5680, status: 'Paid', date: '2026-03-01', ref: 'TXN-4198' },
    { month: 'February 2026', gross: 6400, deductions: 720, net: 5680, status: 'Paid', date: '2026-02-01', ref: 'TXN-3087' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
            alt="Teacher Profile"
            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-[#2C633E]/10 border border-gray-200"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">{currentUser.name}</h2>
              <span className="px-2.5 py-0.5 bg-[#EAF2EC] text-[#2C633E] rounded-full text-xs font-bold uppercase tracking-wider">
                My Salary Portal
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {matchedTeacher.designation} • {matchedTeacher.department} • Emp ID: <span className="font-mono text-gray-700 font-bold">{matchedTeacher.empId}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPayslipModal(true)}
          className="px-4 py-2.5 bg-[#2C633E] hover:bg-[#214A2E] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Download Current Payslip</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Net Pay</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#2C633E] mt-2">${teacherSalary.netPayable.toLocaleString()}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">Disbursed for {selectedMonth}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Allowances</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mt-2">
            +${(teacherSalary.hra + teacherSalary.medicalAllowance + teacherSalary.performanceBonus).toLocaleString()}
          </p>
          <p className="text-xs text-blue-600 font-medium mt-1">HRA, Medical & Performance</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Deductions</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-rose-700 mt-2">
            -${(teacherSalary.taxDeductions + teacherSalary.pfDeductions).toLocaleString()}
          </p>
          <p className="text-xs text-rose-600 font-medium mt-1">Income Tax & Provident Fund</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Status</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-xs uppercase tracking-wide">
              {teacherSalary.paymentStatus}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-2">{teacherSalary.lastPaymentDate}</p>
        </div>
      </div>

      {/* Current Month Breakdown Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Salary Breakdown — {selectedMonth}</h3>
            <p className="text-xs text-gray-500">Detailed line items for basic pay, allowances and tax deductions.</p>
          </div>
          <div className="text-xs text-right text-gray-500 font-mono">
            Ref: <span className="font-bold text-gray-800">{teacherSalary.transactionRef}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Earnings */}
          <div className="space-y-3 bg-[#F8F9FC] border border-gray-200/80 rounded-xl p-4">
            <div className="text-xs font-bold text-[#2C633E] uppercase tracking-wider flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Earnings & Allowances</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">Basic Monthly Salary</span>
                <span className="font-bold text-gray-900">${teacherSalary.basicPay.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">House Rent Allowance (HRA)</span>
                <span className="font-bold text-emerald-600">+${teacherSalary.hra}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">Medical Allowance</span>
                <span className="font-bold text-emerald-600">+${teacherSalary.medicalAllowance}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">Performance & STEM Bonus</span>
                <span className="font-bold text-emerald-600">+${teacherSalary.performanceBonus}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold text-gray-900 pt-2">
                <span>Gross Monthly Earnings</span>
                <span>${(teacherSalary.basicPay + teacherSalary.hra + teacherSalary.medicalAllowance + teacherSalary.performanceBonus).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="space-y-3 bg-[#F8F9FC] border border-gray-200/80 rounded-xl p-4">
            <div className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center space-x-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Statutory Deductions</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">Income Tax Withholding (PAYE)</span>
                <span className="font-bold text-rose-600">-${teacherSalary.taxDeductions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">Provident Fund Contribution</span>
                <span className="font-bold text-rose-600">-${teacherSalary.pfDeductions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">Professional Insurance</span>
                <span className="font-bold text-gray-400">$0 (Covered)</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold text-rose-700 pt-6">
                <span>Total Deductions</span>
                <span>-${(teacherSalary.taxDeductions + teacherSalary.pfDeductions).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#EAF2EC] border border-[#2C633E]/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-[#2C633E]">
            <ShieldCheck className="w-5 h-5 shrink-0 text-[#2C633E]" />
            <div>
              <span className="font-bold">Salary Disbursed to Bank Account:</span> {teacherSalary.paymentMethod}
            </div>
          </div>
          <div className="text-sm font-extrabold text-gray-900">
            Net Take-Home: <span className="text-[#2C633E]">${teacherSalary.netPayable.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Salary History Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">Disbursed Salary History</h3>
          <span className="text-xs text-gray-400">Last 6 Months Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4">Pay Period</th>
                <th className="p-4">Disbursed Date</th>
                <th className="p-4">Gross Salary</th>
                <th className="p-4">Deductions</th>
                <th className="p-4">Net Paid</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {salaryHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{item.month}</td>
                  <td className="p-4 text-gray-500">{item.date}</td>
                  <td className="p-4">${item.gross.toLocaleString()}</td>
                  <td className="p-4 text-rose-600">-${item.deductions}</td>
                  <td className="p-4 font-bold text-[#2C633E]">${item.net.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedMonth(item.month);
                        setShowPayslipModal(true);
                      }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-bold text-[11px] transition-all cursor-pointer inline-flex items-center space-x-1"
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

      {/* Payslip Modal */}
      {showPayslipModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{schoolName} — Official Payslip</h3>
                <p className="text-xs text-gray-500">Pay Period: {selectedMonth}</p>
              </div>
              <button
                onClick={() => setShowPayslipModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#F8F9FC] border border-gray-200/80 rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Employee Name:</span>
                <span className="font-bold text-gray-900">{currentUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Employee ID:</span>
                <span className="font-mono text-gray-700">{matchedTeacher.empId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Department:</span>
                <span className="font-medium text-gray-700">{matchedTeacher.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Designation:</span>
                <span className="font-medium text-gray-700">{matchedTeacher.designation}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t pt-3">
              <div className="flex justify-between py-1">
                <span>Basic Salary</span>
                <span className="font-bold text-gray-900">${teacherSalary.basicPay}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>HRA + Medical + Performance Allowances</span>
                <span className="font-bold text-emerald-600">+${teacherSalary.hra + teacherSalary.medicalAllowance + teacherSalary.performanceBonus}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Income Tax & PF Deductions</span>
                <span className="font-bold text-rose-600">-${teacherSalary.taxDeductions + teacherSalary.pfDeductions}</span>
              </div>
              <div className="flex justify-between py-2 border-t font-extrabold text-sm text-gray-900">
                <span>Net Disbursed Salary</span>
                <span className="text-[#2C633E]">${teacherSalary.netPayable.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#2C633E] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Payslip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
