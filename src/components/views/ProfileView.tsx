import React, { useState } from 'react';
import { User, Shield, Key, Clock, Check, Save } from 'lucide-react';

interface ProfileViewProps {
  schoolName: string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ schoolName }) => {
  const [profile, setProfile] = useState({
    name: 'Sarah Jenkins',
    email: `sarah.j@${schoolName.toLowerCase().replace(/\s+/g, '')}.edu`,
    role: 'Super Administrator',
    phone: '+1 (555) 234-5678',
    joinedDate: 'August 15, 2024'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saved, setSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Profile Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#EAF2EC]"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-xs text-[#2C633E] font-semibold mt-0.5">{profile.role}</p>
            <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
          </div>
        </div>

        {saved && (
          <span className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Check className="w-4 h-4" />
            <span>Profile Updated</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Edit Profile Form */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            Administrator Account Settings
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Role Title</label>
                <input
                  type="text"
                  disabled
                  value={profile.role}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl font-bold flex items-center space-x-1.5 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Info</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Active Sessions & Security */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#2C633E]" />
            <span>Active Login Sessions</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F8F9FC] border border-gray-200/80 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Current Web Session</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Active Now
                </span>
              </div>
              <p className="text-gray-500 mt-1">Chrome on macOS (San Francisco, US)</p>
              <span className="text-[10px] text-gray-400 block mt-1">IP: 192.168.1.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
