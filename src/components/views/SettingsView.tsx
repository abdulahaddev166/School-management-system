import React, { useState, useRef, useEffect } from 'react';
import { SchoolSettings } from '../../types';
import {
  School,
  Globe,
  Mail,
  Phone,
  Shield,
  Bell,
  Database,
  Lock,
  CreditCard,
  Save,
  Check,
  ChevronDown,
  Palette
} from 'lucide-react';

interface SettingsViewProps {
  settings: SchoolSettings;
  onSaveSettings: (newSettings: SchoolSettings) => void;
}

interface ThemeOption {
  id: string;
  name: string;
  color: string;
  isDefault?: boolean;
  description: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    color: '#2E6640',
    isDefault: true,
    description: 'Professional, trustworthy, calm, and ideal for School Management Systems.'
  },
  {
    id: 'sapphire-blue',
    name: 'Sapphire Blue',
    color: '#2563EB',
    description: 'A modern educational blue representing trust, intelligence, technology, and clarity.'
  },
  {
    id: 'royal-teal',
    name: 'Royal Teal',
    color: '#0F766E',
    description: 'A premium teal shade that feels fresh, elegant, and modern on white interfaces.'
  },
  {
    id: 'royal-indigo',
    name: 'Royal Indigo',
    color: '#4F46E5',
    description: 'Deep indigo offering high contrast, sophistication, and executive academic polish.'
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    color: '#EA580C',
    description: 'Warm and energetic tone providing an inviting, vibrant, and active brand identity.'
  },
  {
    id: 'crimson-red',
    name: 'Crimson Red',
    color: '#C2410C',
    description: 'Rich crimson shade delivering bold accent strength, authority, and distinct focus.'
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    color: '#166534',
    description: 'Deep natural green evoking academic tradition, prestige, stability, and growth.'
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    color: '#0284C7',
    description: 'Clean cyan-tinted blue giving an approachable, modern, and tech-forward feel.'
  },
  {
    id: 'jade-green',
    name: 'Jade Green',
    color: '#15803D',
    description: 'Vibrant balanced green with crisp contrast and refreshing modern aesthetics.'
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    color: '#1E3A8A',
    description: 'Classic dark navy blue tailored for prestigious institutional authority.'
  }
];

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSaveSettings }) => {
  const [activeSection, setActiveSection] = useState<
    | 'school-info'
    | 'branding'
    | 'academic-year'
    | 'email'
    | 'sms'
    | 'payments'
    | 'security'
    | 'backups'
  >('school-info');

  const [formData, setFormData] = useState<SchoolSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme =
    THEME_OPTIONS.find(
      (t) =>
        t.color.toLowerCase() === formData.themePrimary?.toLowerCase() ||
        (t.id === 'emerald-green' && formData.themePrimary?.toLowerCase() === '#2c633e')
    ) || THEME_OPTIONS[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { id: 'school-info', label: 'School Information', icon: School },
    { id: 'branding', label: 'Branding & Theme', icon: Globe },
    { id: 'academic-year', label: 'Academic Year', icon: Shield },
    { id: 'email', label: 'Email Settings', icon: Mail },
    { id: 'sms', label: 'SMS Notifications', icon: Phone },
    { id: 'payments', label: 'Payment Gateway', icon: CreditCard },
    { id: 'security', label: 'Security & Access', icon: Lock },
    { id: 'backups', label: 'Cloud Backups', icon: Database }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">System Configuration Settings</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure institutional profile, academic schedules, communication gateways, and security policies.
          </p>
        </div>

        {saved && (
          <span className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      {/* Modern SaaS Settings Layout: Left Menu + Right Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Submenu */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm space-y-1 h-fit">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EAF2EC] text-[#2C633E] font-bold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2C633E]' : 'text-gray-400'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Form Content */}
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {activeSection === 'school-info' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
                  School Identity & Contact Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">School Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Tagline / Motto</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Official Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Campus Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'branding' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-[#2C633E]" />
                  <span>Branding & Theme Customization</span>
                </h3>

                {/* Theme Selector Section */}
                <div className="space-y-3" ref={themeDropdownRef}>
                  <div>
                    <label className="block text-gray-700 font-semibold text-xs">
                      Brand Primary Theme
                    </label>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      Select a curated primary brand theme to apply across the school management system.
                    </p>
                  </div>

                  {/* Dropdown Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsThemeOpen(!isThemeOpen)}
                      aria-haspopup="listbox"
                      aria-expanded={isThemeOpen}
                      className="w-full bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/90 rounded-2xl p-3.5 flex items-center justify-between transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/30 focus:border-[#2C633E] cursor-pointer text-left shadow-2xs"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div
                          className="w-6 h-6 rounded-full shrink-0 shadow-xs ring-2 ring-white border border-black/10"
                          style={{ backgroundColor: currentTheme.color }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-900 text-xs truncate">
                              {currentTheme.name}
                            </span>
                            {currentTheme.isDefault && (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200/60 shrink-0">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-[11px] truncate mt-0.5">
                            {currentTheme.description}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ml-2 ${
                          isThemeOpen ? 'rotate-180 text-[#2C633E]' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Popover */}
                    {isThemeOpen && (
                      <div
                        role="listbox"
                        className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200/90 rounded-2xl shadow-xl z-30 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto"
                      >
                        {THEME_OPTIONS.map((theme) => {
                          const isSelected = currentTheme.color.toLowerCase() === theme.color.toLowerCase();
                          return (
                            <button
                              key={theme.id}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                const newSettings = { ...formData, themePrimary: theme.color };
                                setFormData(newSettings);
                                setIsThemeOpen(false);
                                onSaveSettings(newSettings);
                              }}
                              className={`w-full text-left p-3 rounded-xl transition-all duration-150 flex items-start justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-[#EAF2EC]/70 border border-[#2C633E]/20'
                                  : 'hover:bg-gray-50 border border-transparent'
                              }`}
                            >
                              <div className="flex items-start space-x-3 pr-2">
                                <div
                                  className="w-5 h-5 rounded-full mt-0.5 shrink-0 shadow-2xs ring-2 ring-white border border-black/10"
                                  style={{ backgroundColor: theme.color }}
                                />
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`font-bold text-xs ${
                                        isSelected ? 'text-[#2C633E]' : 'text-gray-900'
                                      }`}
                                    >
                                      {theme.name}
                                    </span>
                                    {theme.isDefault && (
                                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200/60">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-500 text-[11px] leading-relaxed">
                                    {theme.description}
                                  </p>
                                </div>
                              </div>

                              {isSelected && (
                                <div className="p-1 rounded-full bg-[#2C633E] text-white shrink-0 mt-0.5">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Available Brand Color Grid */}
                  <div className="pt-2">
                    <span className="block text-gray-600 font-semibold text-[11px] uppercase tracking-wider mb-2">
                      All Curated Theme Presets
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {THEME_OPTIONS.map((theme) => {
                        const isSelected = currentTheme.color.toLowerCase() === theme.color.toLowerCase();
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => {
                              const newSettings = { ...formData, themePrimary: theme.color };
                              setFormData(newSettings);
                              onSaveSettings(newSettings);
                            }}
                            className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-white border-[#2C633E] ring-2 ring-[#2C633E]/20 shadow-xs'
                                : 'bg-gray-50/60 hover:bg-white hover:border-gray-300 border-gray-200/80'
                            }`}
                          >
                            <div className="flex items-start space-x-2.5 min-w-0 pr-2">
                              <div
                                className="w-5 h-5 rounded-full mt-0.5 shrink-0 shadow-xs ring-2 ring-white border border-black/10"
                                style={{ backgroundColor: theme.color }}
                              />
                              <div className="min-w-0">
                                <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                                  <span
                                    className={`font-bold text-xs truncate ${
                                      isSelected ? 'text-gray-900' : 'text-gray-800'
                                    }`}
                                  >
                                    {theme.name}
                                  </span>
                                  {theme.isDefault && (
                                    <span className="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200/60 shrink-0">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-500 text-[10px] line-clamp-1 mt-0.5">
                                  {theme.description}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-[#2C633E] border-[#2C633E] text-white'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    School Website Domain
                  </label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  />
                </div>
              </div>
            )}

            {activeSection === 'academic-year' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
                  Academic Calendar Schedule
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Current Academic Year</label>
                    <input
                      type="text"
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Current Term</label>
                    <input
                      type="text"
                      value={formData.currentTerm}
                      onChange={(e) => setFormData({ ...formData, currentTerm: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                    />
                  </div>
                </div>
              </div>
            )}

            {(activeSection === 'email' ||
              activeSection === 'sms' ||
              activeSection === 'payments' ||
              activeSection === 'security' ||
              activeSection === 'backups') && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 capitalize">
                  {activeSection.replace('-', ' ')} Gateway Configuration
                </h3>

                <div className="p-4 bg-[#F8F9FC] border border-gray-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Automated Notification Dispatcher</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      Send transactional fee alerts and attendance updates automatically.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                    className="w-4 h-4 text-[#2C633E] rounded border-gray-300 focus:ring-[#2C633E]"
                  />
                </div>

                <div className="p-4 bg-[#F8F9FC] border border-gray-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Daily Cloud Database Backups</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      Encrypted midnight snapshots stored in multi-region cloud buckets.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoBackup}
                    onChange={(e) => setFormData({ ...formData, autoBackup: e.target.checked })}
                    className="w-4 h-4 text-[#2C633E] rounded border-gray-300 focus:ring-[#2C633E]"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl font-bold flex items-center space-x-1.5 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
