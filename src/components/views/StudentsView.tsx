import React, { useState } from 'react';
import { Student, NavigationItem } from '../../types';
import {
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Mail,
  Phone,
  Calendar,
  FileText,
  UserCheck,
  GraduationCap
} from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  activeTab: 'all-students' | 'add-student' | 'admissions';
  onNavigateTab: (tab: NavigationItem) => void;
  searchQuery: string;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  activeTab,
  onNavigateTab,
  searchQuery: globalSearch
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // New Student Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: 'Grade 10',
    section: 'A',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dob: '2010-01-01',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'Active' as 'Active' | 'Inactive' | 'Pending',
    feeStatus: 'Paid' as 'Paid' | 'Pending' | 'Overdue',
    rollNumber: (100 + students.length + 1).toString()
  });

  const query = (localSearch || globalSearch).toLowerCase();

  const filteredStudents = students.filter((stu) => {
    const matchesSearch =
      stu.firstName.toLowerCase().includes(query) ||
      stu.lastName.toLowerCase().includes(query) ||
      stu.id.toLowerCase().includes(query) ||
      stu.email.toLowerCase().includes(query) ||
      stu.parentName.toLowerCase().includes(query);

    const matchesGrade = gradeFilter === 'All' || stu.grade === gradeFilter;
    const matchesFee = feeFilter === 'All' || stu.feeStatus === feeFilter;

    if (activeTab === 'admissions') {
      return matchesSearch && stu.status === 'Pending';
    }

    return matchesSearch && matchesGrade && matchesFee;
  });

  const handleSubmitNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.parentName) {
      alert('Please fill in required fields (First Name, Last Name, Parent Name)');
      return;
    }

    onAddStudent({
      ...formData,
      rollNumber: (100 + students.length + 1).toString()
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      grade: 'Grade 10',
      section: 'A',
      gender: 'Male',
      dob: '2010-01-01',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      address: '',
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      feeStatus: 'Paid',
      rollNumber: ''
    });

    onNavigateTab('all-students');
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      onUpdateStudent(editingStudent);
      setEditingStudent(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Tab Navigation */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Student Directory</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage student profiles, enrollments, admissions, and academic status.
          </p>
        </div>

        {/* Navigation Tabs (Hostinger Pill Style) */}
        <div className="flex items-center space-x-1 bg-[#F8F9FC] p-1 border border-gray-200 rounded-xl shrink-0">
          <button
            onClick={() => onNavigateTab('all-students')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'all-students'
                ? 'bg-white text-[#2C633E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Students ({students.filter((s) => s.status !== 'Pending').length})
          </button>
          <button
            onClick={() => onNavigateTab('add-student')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'add-student'
                ? 'bg-white text-[#2C633E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>
          <button
            onClick={() => onNavigateTab('admissions')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'admissions'
                ? 'bg-white text-[#2C633E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Admissions</span>
            {students.filter((s) => s.status === 'Pending').length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {students.filter((s) => s.status === 'Pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ALL STUDENTS / ADMISSIONS TAB VIEW */}
      {(activeTab === 'all-students' || activeTab === 'admissions') && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Table Filters & Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 bg-[#F8F9FC]/50">
            {/* Local Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search by name, ID or email..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
              />
            </div>

            {/* Filter Dropdowns */}
            {activeTab === 'all-students' && (
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  <span>Grade:</span>
                  <select
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:border-[#2C633E]"
                  >
                    <option value="All">All Grades</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                  <span>Fee Status:</span>
                  <select
                    value={feeFilter}
                    onChange={(e) => setFeeFilter(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:border-[#2C633E]"
                  >
                    <option value="All">All Fees</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Student ID & Name</th>
                  <th className="py-3.5 px-4">Class & Section</th>
                  <th className="py-3.5 px-4">Parent Details</th>
                  <th className="py-3.5 px-4">Admission Date</th>
                  <th className="py-3.5 px-4">Fee Status</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      <GraduationCap className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm font-semibold text-gray-600">No students found</p>
                      <p className="text-xs text-gray-400 mt-0.5">Try clearing filters or adding a new student profile.</p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stu) => (
                    <tr key={stu.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-[#EAF2EC] text-[#2C633E] font-bold flex items-center justify-center text-xs shrink-0">
                            {stu.firstName[0]}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{stu.firstName} {stu.lastName}</p>
                            <p className="text-[11px] text-gray-400">{stu.id} • Roll #{stu.rollNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 font-semibold">
                        {stu.grade} ({stu.section})
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-gray-900">{stu.parentName}</p>
                        <p className="text-[11px] text-gray-400">{stu.parentPhone}</p>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{stu.admissionDate}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            stu.feeStatus === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : stu.feeStatus === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {stu.feeStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            stu.status === 'Active'
                              ? 'bg-blue-50 text-blue-700'
                              : stu.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {stu.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {activeTab === 'admissions' ? (
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => onUpdateStudent({ ...stu, status: 'Active' })}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold transition-colors flex items-center space-x-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => onDeleteStudent(stu.id)}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[11px] font-semibold transition-colors flex items-center space-x-1"
                            >
                              <X className="w-3 h-3" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => setSelectedStudent(stu)}
                              className="p-1.5 text-gray-400 hover:text-[#2C633E] hover:bg-[#EAF2EC] rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingStudent(stu)}
                              className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Edit Student"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${stu.firstName} ${stu.lastName}?`)) {
                                  onDeleteStudent(stu.id);
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Student"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD STUDENT FORM TAB */}
      {activeTab === 'add-student' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-4xl mx-auto">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900">New Student Registration</h3>
            <p className="text-xs text-gray-500">Fill in student personal details, parent info, and class placement.</p>
          </div>

          <form onSubmit={handleSubmitNewStudent} className="space-y-6">
            {/* Student Personal Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C633E]">
                1. Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Benjamin"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Franklin"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="benjamin.f@horizon.edu"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
              </div>
            </div>

            {/* Academic Placement */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C633E]">
                2. Academic Placement & Fees
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Grade Level</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Initial Fee Status</label>
                  <select
                    value={formData.feeStatus}
                    onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value as 'Paid' | 'Pending' | 'Overdue' })}
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parent & Guardian Info */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C633E]">
                3. Parent & Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Parent / Guardian Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Thomas Franklin"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Parent Phone Number</label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="+1 (555) 999-8888"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address, City, State"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => onNavigateTab('all-students')}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
              >
                Save & Register Student
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF2EC] text-[#2C633E] font-bold text-base flex items-center justify-center">
                  {selectedStudent.firstName[0]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h3>
                  <p className="text-xs text-gray-400">ID: {selectedStudent.id} • Roll #{selectedStudent.rollNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#F8F9FC] p-3 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium">Grade & Section</span>
                  <span className="font-bold text-gray-800">{selectedStudent.grade} ({selectedStudent.section})</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Gender & DOB</span>
                  <span className="font-bold text-gray-800">{selectedStudent.gender} • {selectedStudent.dob}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Admission Date</span>
                  <span className="font-bold text-gray-800">{selectedStudent.admissionDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Fee Status</span>
                  <span className="font-bold text-emerald-600">{selectedStudent.feeStatus}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Parent & Emergency Contact</h4>
                <div className="space-y-1.5 text-gray-600">
                  <p className="flex items-center space-x-2">
                    <UserCheck className="w-3.5 h-3.5 text-gray-400" />
                    <span><strong>Parent:</strong> {selectedStudent.parentName}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span><strong>Phone:</strong> {selectedStudent.parentPhone || 'Not provided'}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span><strong>Email:</strong> {selectedStudent.email}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-right">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Edit Student Record</h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    value={editingStudent.firstName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, firstName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editingStudent.lastName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, lastName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Grade</label>
                  <select
                    value={editingStudent.grade}
                    onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Fee Status</label>
                  <select
                    value={editingStudent.feeStatus}
                    onChange={(e) => setEditingStudent({ ...editingStudent, feeStatus: e.target.value as 'Paid' | 'Pending' | 'Overdue' })}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">Parent Name</label>
                <input
                  type="text"
                  value={editingStudent.parentName}
                  onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-lg font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
                >
                  Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
