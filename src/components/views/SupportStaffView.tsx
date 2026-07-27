import React, { useState } from 'react';
import { SupportStaff } from '../../types';
import {
  Briefcase,
  Search,
  Plus,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  UserCheck,
  UserX,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  FileText,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  LayoutGrid,
  ListFilter,
  UserPlus,
  Filter
} from 'lucide-react';

interface SupportStaffViewProps {
  staffList: SupportStaff[];
  onAddStaff: (staff: Omit<SupportStaff, 'id'>) => void;
  onUpdateStaff: (staff: SupportStaff) => void;
  onDeleteStaff: (id: string) => void;
  searchQuery?: string;
}

export const SupportStaffView: React.FC<SupportStaffViewProps> = ({
  staffList,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff,
  searchQuery: externalSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery);
  const [roleFilter, setRoleFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [shiftFilter, setShiftFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<SupportStaff | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<SupportStaff | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    staffId: string;
    name: string;
    role: string;
    department: string;
    phone: string;
    email: string;
    cnic: string;
    address: string;
    joinDate: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    salary: number;
    shift: 'Morning' | 'Evening' | 'Night' | 'Full Day';
    emergencyContact: string;
    avatar: string;
    notes: string;
  }>({
    staffId: `STF-${100 + staffList.length + 1}`,
    name: '',
    role: 'Security Guard',
    department: 'Security',
    phone: '',
    email: '',
    cnic: '',
    address: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    salary: 2500,
    shift: 'Morning',
    emergencyContact: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    notes: ''
  });

  const ROLE_OPTIONS = [
    'All',
    'Security Guard',
    'Driver',
    'Peon / Office Assistant',
    'Canteen Staff / Owner',
    'Janitor / Cleaner',
    'Gardener',
    'Electrician',
    'Plumber & Handyman',
    'Reception Assistant',
    'Transport Helper',
    'Maintenance Staff',
    'Office Helper'
  ];

  const DEPT_OPTIONS = [
    'All',
    'Security',
    'Transportation',
    'Administration',
    'Food Services',
    'Sanitation',
    'Campus Maintenance'
  ];

  const SHIFT_OPTIONS = ['All', 'Morning', 'Evening', 'Night', 'Full Day'];

  // Filtered staff list
  const filteredStaff = staffList.filter((s) => {
    const q = (searchQuery || externalSearchQuery).toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.staffId.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q) ||
      s.phone.toLowerCase().includes(q) ||
      (s.email && s.email.toLowerCase().includes(q)) ||
      (s.cnic && s.cnic.toLowerCase().includes(q));

    const matchesRole = roleFilter === 'All' || s.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.department.toLowerCase() === deptFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesShift = shiftFilter === 'All' || s.shift === shiftFilter;

    return matchesSearch && matchesRole && matchesDept && matchesStatus && matchesShift;
  });

  const activeCount = staffList.filter((s) => s.status === 'Active').length;
  const onLeaveCount = staffList.filter((s) => s.status === 'On Leave').length;
  const totalPayroll = staffList.reduce((acc, curr) => acc + (curr.salary || 0), 0);

  const resetForm = () => {
    setFormData({
      staffId: `STF-${100 + staffList.length + 1}`,
      name: '',
      role: 'Security Guard',
      department: 'Security',
      phone: '',
      email: '',
      cnic: '',
      address: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      salary: 2500,
      shift: 'Morning',
      emergencyContact: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      notes: ''
    });
    setEditingStaff(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEditModal = (staff: SupportStaff) => {
    setEditingStaff(staff);
    setFormData({
      staffId: staff.staffId,
      name: staff.name,
      role: staff.role,
      department: staff.department,
      phone: staff.phone,
      email: staff.email || '',
      cnic: staff.cnic || '',
      address: staff.address || '',
      joinDate: staff.joinDate,
      status: staff.status,
      salary: staff.salary,
      shift: staff.shift,
      emergencyContact: staff.emergencyContact || '',
      avatar: staff.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      notes: staff.notes || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.role) {
      alert('Please fill in Name, Staff Role, and Mobile Phone.');
      return;
    }

    if (editingStaff) {
      onUpdateStaff({
        ...editingStaff,
        ...formData
      });
    } else {
      onAddStaff({
        ...formData
      });
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleViewDetails = (staff: SupportStaff) => {
    setSelectedStaff(staff);
    setShowDetailsModal(true);
  };

  const confirmDelete = (id: string) => {
    onDeleteStaff(id);
    setDeleteConfirmId(null);
    if (selectedStaff?.id === id) {
      setShowDetailsModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Section / Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF2EC] text-[#2C633E] flex items-center justify-center font-bold shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Support Staff Management</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Directory & operational management for non-teaching, security, transportation, cafeteria, and facility staff.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0 self-start md:self-auto">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Support Staff</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#2C633E] flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">Total Staff</span>
            <span className="text-xl font-bold text-gray-900">{staffList.length} Employees</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">Active On Duty</span>
            <span className="text-xl font-bold text-emerald-700">{activeCount} Staff</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">On Leave</span>
            <span className="text-xl font-bold text-amber-700">{onLeaveCount} Staff</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">Monthly Payroll</span>
            <span className="text-xl font-bold text-gray-900">${totalPayroll.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, staff ID, role, phone, or CNIC..."
              className="w-full pl-10 pr-4 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E] transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1.5 bg-[#F8F9FC] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-700">
              <Building className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="font-medium text-gray-500">Dept:</span>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-transparent font-semibold text-[#2C633E] focus:outline-none cursor-pointer"
              >
                {DEPT_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-1.5 bg-[#F8F9FC] border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-700">
              <span className="font-medium text-gray-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent font-semibold text-[#2C633E] focus:outline-none cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center space-x-1 bg-[#F8F9FC] border border-gray-200 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white text-[#2C633E] shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table' ? 'bg-white text-[#2C633E] shadow-sm font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Table View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 font-medium flex items-center justify-between pt-1">
          <span>
            Showing <strong className="text-gray-900">{filteredStaff.length}</strong> of{' '}
            <strong className="text-gray-900">{staffList.length}</strong> support staff employees
          </span>
          {(roleFilter !== 'All' || deptFilter !== 'All' || statusFilter !== 'All' || shiftFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setRoleFilter('All');
                setDeptFilter('All');
                setStatusFilter('All');
                setShiftFilter('All');
                setSearchQuery('');
              }}
              className="text-[#2C633E] font-semibold hover:underline text-xs"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* DISPLAY: GRID CARDS VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-[#2C633E]/40 transition-all hostinger-shadow-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={staff.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={staff.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-100 shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-bold text-sm text-gray-900 leading-tight">{staff.name}</h3>
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          {staff.staffId}
                        </span>
                      </div>
                      <p className="text-xs text-[#2C633E] font-semibold mt-0.5">{staff.role}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      staff.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : staff.status === 'On Leave'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {staff.status}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Department:</span>
                    <span className="font-semibold text-gray-800">{staff.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Shift & Hours:</span>
                    <span className="font-medium text-gray-800">{staff.shift} Shift</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Monthly Salary:</span>
                    <span className="font-bold text-gray-900">${staff.salary?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Mobile Phone:</span>
                    <span className="font-semibold text-gray-900">{staff.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => handleViewDetails(staff)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#F8F9FC] hover:bg-[#EAF2EC] text-gray-700 hover:text-[#2C633E] rounded-xl font-semibold transition-all border border-gray-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEditModal(staff)}
                    className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Record"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(staff.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Staff"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredStaff.length === 0 && (
            <div className="col-span-full bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">No Support Staff Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No matching support staff employees found. Try adjusting your search query or filters.
              </p>
            </div>
          )}
        </div>
      )}

      {/* DISPLAY: TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#F8F9FC] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200 text-[10px]">
                <tr>
                  <th className="px-4 py-3.5">Staff ID</th>
                  <th className="px-4 py-3.5">Employee Name</th>
                  <th className="px-4 py-3.5">Role & Dept</th>
                  <th className="px-4 py-3.5">Phone / Contact</th>
                  <th className="px-4 py-3.5">Shift</th>
                  <th className="px-4 py-3.5">Salary</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">{staff.staffId}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={staff.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={staff.name}
                          className="w-8 h-8 rounded-xl object-cover ring-1 ring-gray-200"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{staff.name}</p>
                          {staff.cnic && <p className="text-[10px] text-gray-400">CNIC: {staff.cnic}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-semibold text-gray-900">{staff.role}</p>
                      <p className="text-[11px] text-[#2C633E] font-medium">{staff.department}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-semibold text-gray-900">{staff.phone}</p>
                      {staff.email && <p className="text-[10px] text-gray-400">{staff.email}</p>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">{staff.shift}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-900">${staff.salary?.toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          staff.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : staff.status === 'On Leave'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleViewDetails(staff)}
                          className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(staff)}
                          className="p-1.5 text-gray-500 hover:text-[#2C633E] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(staff.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {showDetailsModal && selectedStaff && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#F8F9FC] border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-[#EAF2EC] text-[#2C633E]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 leading-snug">
                    Support Employee Profile
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Non-Academic Operations & Support Staff
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Primary Header Banner */}
              <div className="p-4 bg-linear-to-r from-[#EAF2EC] to-emerald-50/40 border border-[#2C633E]/15 rounded-2xl flex items-center justify-between shadow-2xs">
                <div className="flex items-center space-x-3.5">
                  {selectedStaff.avatar ? (
                    <img
                      src={selectedStaff.avatar}
                      alt={selectedStaff.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-2xs shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-[#2C633E] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                      {selectedStaff.name ? selectedStaff.name.charAt(0) : 'S'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{selectedStaff.name}</h3>
                    <p className="text-xs text-[#2C633E] font-bold mt-0.5">{selectedStaff.role}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[11px] text-gray-600 font-medium">{selectedStaff.department}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[10px] font-mono font-semibold text-gray-500 bg-white/80 px-1.5 py-0.5 rounded border border-gray-200/60">
                        ID: #{selectedStaff.staffId}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    selectedStaff.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedStaff.status === 'On Leave'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {selectedStaff.status}
                </span>
              </div>

              {/* Employment & Schedule Specs */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Employment & Schedule Specs
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Work Shift</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{selectedStaff.shift} Shift</span>
                  </div>
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Monthly Salary</span>
                    <span className="font-bold text-[#2C633E] mt-0.5 block">${selectedStaff.salary?.toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Date of Joining</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{selectedStaff.joinDate}</span>
                  </div>
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Department</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{selectedStaff.department}</span>
                  </div>
                </div>
              </div>

              {/* Contact & Identification */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Contact & Identification
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-[#2C633E] mr-1" /> Mobile Phone
                    </span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{selectedStaff.phone}</span>
                  </div>
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-[#2C633E] mr-1" /> Email Address
                    </span>
                    <span className="font-bold text-gray-900 mt-0.5 block truncate">{selectedStaff.email || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold flex items-center space-x-1">
                      <FileText className="w-3 h-3 text-[#2C633E] mr-1" /> CNIC / National ID
                    </span>
                    <span className="font-bold text-gray-900 mt-0.5 block font-mono">{selectedStaff.cnic || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 text-amber-600 mr-1" /> Emergency Contact
                    </span>
                    <span className="font-bold text-gray-900 mt-0.5 block">{selectedStaff.emergencyContact || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Residential Address */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Residential Address
                </h4>
                <div className="p-3.5 bg-gray-50/80 border border-gray-100 rounded-xl flex items-center space-x-2 text-gray-900 font-semibold">
                  <MapPin className="w-4 h-4 text-[#2C633E] shrink-0" />
                  <span>{selectedStaff.address || 'N/A'}</span>
                </div>
              </div>

              {/* Duties & Notes */}
              {selectedStaff.notes && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Duties & Operational Notes
                  </h4>
                  <div className="p-3.5 bg-gray-50/80 border border-gray-100 rounded-xl text-gray-700 leading-relaxed font-normal">
                    {selectedStaff.notes}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#F8F9FC] border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleOpenEditModal(selectedStaff);
                }}
                className="flex items-center space-x-1.5 px-4 py-2 bg-white border border-gray-200 hover:border-[#2C633E] text-gray-700 hover:text-[#2C633E] rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Employee</span>
              </button>

              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-5 py-2 bg-[#2C633E] hover:bg-[#235032] text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT STAFF MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#F8F9FC]">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-[#2C633E]" />
                <h3 className="font-bold text-base text-gray-900">
                  {editingStaff ? 'Edit Support Employee' : 'Register Support Employee'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Staff ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.staffId}
                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mahmood"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Staff Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Security Guard, Peon, Driver, Janitor"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  >
                    <option value="Security">Security</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Administration">Administration</option>
                    <option value="Food Services">Food Services</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Campus Maintenance">Campus Maintenance</option>
                    <option value="Facility Operations">Facility Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. staff@horizon.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">CNIC / National ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="42101-1234567-1"
                    value={formData.cnic}
                    onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Date of Joining</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Shift</label>
                  <select
                    value={formData.shift}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shift: e.target.value as 'Morning' | 'Evening' | 'Night' | 'Full Day'
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                    <option value="Full Day">Full Day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Monthly Salary ($)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Employment Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'Active' | 'On Leave' | 'Inactive'
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    placeholder="Relative Name (+1 555 ...)"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="Street address, quarter, or residence location"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Profile Photo URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Duties & Operational Notes</label>
                <textarea
                  rows={2}
                  placeholder="Specify primary duties, gate assignment, bus route, or facility responsibilities..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2C633E] hover:bg-[#20482d] text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
                >
                  {editingStaff ? 'Update Employee' : 'Save Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base">Delete Support Staff Record?</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to delete this support employee record? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
