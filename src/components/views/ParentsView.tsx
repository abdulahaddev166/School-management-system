import React, { useState } from 'react';
import { Parent } from '../../types';
import { UserCheck, Search, Mail, Phone, MapPin, Briefcase, Plus, X } from 'lucide-react';

interface ParentsViewProps {
  parents: Parent[];
  onAddParent: (p: Omit<Parent, 'id'>) => void;
}

export const ParentsView: React.FC<ParentsViewProps> = ({ parents, onAddParent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occupation: '',
    childrenNames: ['Alexander Wright'],
    address: 'San Francisco, CA',
    relationship: 'Father' as 'Father' | 'Mother' | 'Guardian'
  });

  const filteredParents = parents.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.childrenNames.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onAddParent(formData);
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      occupation: '',
      childrenNames: ['Student'],
      address: 'San Francisco, CA',
      relationship: 'Father'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Parents & Guardians</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Directory of student guardians, emergency contact details, and parent portal profiles.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Parent Profile</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by parent name, email or child..."
            className="w-full pl-10 pr-3 py-2 bg-[#F8F9FC] border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/20 focus:border-[#2C633E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredParents.map((parent) => (
          <div
            key={parent.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-[#2C633E]/40 transition-all space-y-4 hostinger-shadow-hover"
          >
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] text-[#2C633E] font-bold flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{parent.name}</h3>
                  <p className="text-[11px] text-gray-400">{parent.relationship} • {parent.occupation}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="font-semibold text-gray-900">{parent.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate">{parent.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate text-gray-500">{parent.address}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">Children Enrolled:</span>
              <div className="flex flex-wrap gap-1">
                {parent.childrenNames.map((child, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-[#EAF2EC] text-[#2C633E] font-bold text-[10px]"
                  >
                    {child}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Add Parent Profile</h3>
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
                  placeholder="e.g. David Wright"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
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
                  Save Parent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
