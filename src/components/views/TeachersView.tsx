import React, { useState } from 'react';
import { Teacher, Department } from '../../types';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Building,
  Award,
  X,
  UserCheck
} from 'lucide-react';

interface TeachersViewProps {
  teachers: Teacher[];
  departments: Department[];
  onAddTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  activeTab: 'all-teachers' | 'departments';
  onNavigateTab: (tab: 'all-teachers' | 'departments') => void;
}

export const TeachersView: React.FC<TeachersViewProps> = ({
  teachers,
  departments,
  onAddTeacher,
  activeTab,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    empId: `EMP-${teachers.length + 1}`,
    name: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    designation: 'Senior Teacher',
    qualification: 'M.Sc. Education',
    joinDate: new Date().toISOString().split('T')[0],
    subjects: ['Mathematics'],
    status: 'Active' as 'Active' | 'On Leave' | 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  });

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = deptFilter === 'All' || t.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please enter teacher name and email');
      return;
    }

    onAddTeacher({
      ...formData,
      subjects: typeof formData.subjects === 'string' ? [formData.subjects] : formData.subjects
    });

    setShowAddModal(false);
    setFormData({
      empId: `EMP-${teachers.length + 2}`,
      name: '',
      email: '',
      phone: '',
      department: 'Mathematics',
      designation: 'Senior Teacher',
      qualification: 'M.Sc. Education',
      joinDate: new Date().toISOString().split('T')[0],
      subjects: ['Mathematics'],
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Faculty & Departments</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage academic instructors, department heads, and teaching assignments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center space-x-1 bg-[#F8F9FC] p-1 border border-gray-200 rounded-xl overflow-x-auto">
            <button
              onClick={() => onNavigateTab('all-teachers')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all-teachers'
                  ? 'bg-white text-[#2C633E] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Teachers ({teachers.length})
            </button>
            <button
              onClick={() => onNavigateTab('departments')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'departments'
                  ? 'bg-white text-[#2C633E] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Departments ({departments.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Teacher</span>
          </button>
        </div>
      </div>

      {/* ALL TEACHERS TAB */}
      {activeTab === 'all-teachers' && (
        <div className="space-y-5">
          {/* Search & Dept Filter */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teacher by name or email..."
                className="w-full pl-10 pr-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-gray-500 font-medium">Department:</span>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-[#F8F9FC] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#2C633E]"
              >
                <option value="All">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Teacher Cards Grid (Hostinger Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-[#2C633E]/40 transition-all flex flex-col justify-between hostinger-shadow-hover"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-100"
                      />
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 leading-tight">{teacher.name}</h3>
                        <p className="text-xs text-[#2C633E] font-semibold mt-0.5">{teacher.designation}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        teacher.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Department:</span>
                      <span className="font-semibold text-gray-800">{teacher.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Qualification:</span>
                      <span className="font-medium text-gray-700 truncate max-w-[180px]">{teacher.qualification}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Subjects:</span>
                      <span className="font-semibold text-gray-900">{teacher.subjects.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEPARTMENTS TAB */}
      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#2C633E]/40 transition-all"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] text-[#2C633E] font-bold flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">{dept.name}</h3>
                    <p className="text-[11px] text-gray-400">Code: {dept.code}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                  {dept.budget}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Head of Department:</span>
                  <span className="font-semibold text-gray-900">{dept.headTeacher}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Total Faculty:</span>
                  <span className="font-bold text-[#2C633E]">{dept.teacherCount} Instructors</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Enrolled Students:</span>
                  <span className="font-medium text-gray-800">{dept.studentCount} Students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD TEACHER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Add New Instructor</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Robert Langdon"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="robert.l@horizon.edu"
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Subjects Taught (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.subjects) ? formData.subjects.join(', ') : formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value.split(',').map((s) => s.trim()) })}
                  placeholder="Calculus, Geometry"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
                >
                  Save Teacher Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
