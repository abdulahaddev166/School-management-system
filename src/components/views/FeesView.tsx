import React, { useState } from 'react';
import { FeeInvoice, Student, UserSession } from '../../types';
import {
  CreditCard,
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
  ShieldCheck,
  User,
  ExternalLink
} from 'lucide-react';

interface FeesViewProps {
  invoices: FeeInvoice[];
  students: Student[];
  onAddInvoice: (inv: Omit<FeeInvoice, 'id'>) => void;
  onUpdateInvoiceStatus: (invoiceId: string, status: 'Paid' | 'Pending' | 'Overdue') => void;
  schoolName: string;
  currentUser?: UserSession | null;
}

export const FeesView: React.FC<FeesViewProps> = ({
  invoices,
  students,
  onAddInvoice,
  onUpdateInvoiceStatus,
  schoolName,
  currentUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<FeeInvoice | null>(null);

  const role = currentUser?.role || 'admin';

  // Role Specific Invoices Filtering
  let targetInvoices = invoices;
  if (role === 'student') {
    // Filter to logged in student or first student
    targetInvoices = invoices.filter(
      (inv) =>
        inv.studentName.toLowerCase().includes(currentUser?.name.toLowerCase() || 'wright') ||
        inv.studentId === 'STU-1001'
    );
    if (targetInvoices.length === 0) {
      targetInvoices = invoices.slice(0, 2);
    }
  } else if (role === 'parent') {
    // Filter to parent's child (e.g., Ethan Miller STU-1003 / Leo Miller)
    targetInvoices = invoices.filter(
      (inv) =>
        inv.studentName.toLowerCase().includes('miller') ||
        inv.studentId === 'STU-1003'
    );
    if (targetInvoices.length === 0) {
      targetInvoices = invoices.slice(2, 4);
    }
  }

  const filteredInvoices = targetInvoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.studentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = targetInvoices
    .filter((i) => i.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = targetInvoices
    .filter((i) => i.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalOverdue = targetInvoices
    .filter((i) => i.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const [newInv, setNewInv] = useState({
    studentId: students[0]?.id || '',
    amount: 1250,
    feeType: 'Tuition' as 'Tuition' | 'Admission' | 'Exam' | 'Transport' | 'Library',
    dueDate: '2026-08-15',
    status: 'Pending' as 'Paid' | 'Pending' | 'Overdue'
  });

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

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2EC] text-[#2C633E] text-xs font-bold uppercase tracking-wider">
              {role === 'student' ? 'Student Portal' : role === 'parent' ? 'Parent Portal' : 'Financials'}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">Fee Statements & Receipts</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mt-1">
            {role === 'student'
              ? 'My Fee Statement & Receipts'
              : role === 'parent'
              ? 'Child Fee Records & Payments'
              : 'Fee Administration & Financials'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {role === 'student'
              ? 'View your tuition balances, official receipts, and payment history.'
              : role === 'parent'
              ? 'Manage and pay tuition fees for your child(ren) enrolled at ' + schoolName + '.'
              : 'Issue student fee vouchers, track payment collections, and issue official receipts.'}
          </p>
        </div>

        {(role === 'admin' || role === 'accountant') && (
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="px-4 py-2.5 bg-[#2C633E] hover:bg-[#214A2E] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Fee Invoice</span>
          </button>
        )}
      </div>

      {/* Linked Child Banner for Parent */}
      {role === 'parent' && (
        <div className="bg-gradient-to-r from-[#2C633E] to-[#1E462B] text-white rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center font-bold text-lg border border-white/20">
              <User className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="text-xs text-emerald-200 font-medium uppercase tracking-wider">Linked Student Record</div>
              <div className="text-base font-extrabold text-white">Ethan Miller • Grade 10B (ID: STU-1003)</div>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-emerald-100">
            Current Term: Fall 2026
          </span>
        </div>
      )}

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {role === 'admin' ? 'Total Revenue Paid' : 'Paid Amount'}
            </span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">${totalCollected.toLocaleString()}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Verified online & bank receipts</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Balance</span>
            <p className="text-2xl font-bold text-amber-600 mt-1">${totalPending.toLocaleString()}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Awaiting payment settlement</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Overdue Fees</span>
            <p className="text-2xl font-bold text-rose-600 mt-1">${totalOverdue.toLocaleString()}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Overdue vouchers</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoice number or fee type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#2C633E]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:border-[#2C633E]"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4">Invoice No</th>
                <th className="p-4">Student</th>
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
                    {inv.status !== 'Paid' && (role === 'student' || role === 'parent') && (
                      <button
                        onClick={() => onUpdateInvoiceStatus(inv.id, 'Paid')}
                        className="px-3 py-1 bg-[#2C633E] text-white hover:bg-[#214A2E] rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs inline-flex items-center space-x-1"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Online</span>
                      </button>
                    )}

                    {inv.status !== 'Paid' && (role === 'admin' || role === 'accountant') && (
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
                      <Download className="w-3.5 h-3.5 text-gray-500" />
                      <span>{inv.status === 'Paid' ? 'Receipt' : 'Invoice'}</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-xs text-gray-400">
                    No fee records found for this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{schoolName} Fee Invoice</h3>
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
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal for Admin */}
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
