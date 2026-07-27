import React, { useState } from 'react';
import { UserRole, UserSession } from '../../types';
import { DEMO_USERS } from '../../utils/rbac';
import {
  School,
  Lock,
  Mail,
  UserCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LoginViewProps {
  onLogin: (userSession: UserSession) => void;
  schoolName: string;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, schoolName }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState<string>(DEMO_USERS.admin.email);
  const [password, setPassword] = useState<string>(DEMO_USERS.admin.password);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [infoNotice, setInfoNotice] = useState<string>('');

  // Handle Role Dropdown or Card Selection
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setPassword(DEMO_USERS[role].password);
    setErrorMsg('');
  };

  const handleQuickDemoClick = (role: UserRole) => {
    handleRoleChange(role);
    setInfoNotice(`Selected ${role.toUpperCase()} credentials auto-filled.`);
    setTimeout(() => setInfoNotice(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Find matching demo user or match selected role
      const demoAccount = DEMO_USERS[selectedRole];
      
      if (email.trim().toLowerCase() === demoAccount.email.toLowerCase() && password === demoAccount.password) {
        setIsLoading(false);
        onLogin({
          role: demoAccount.role,
          name: demoAccount.name,
          email: demoAccount.email,
          title: demoAccount.title,
          avatar: demoAccount.avatar
        });
      } else {
        // Fallback check if user typed credentials of another role
        const matchedRole = (Object.keys(DEMO_USERS) as UserRole[]).find(
          (r) => DEMO_USERS[r].email.toLowerCase() === email.trim().toLowerCase() && DEMO_USERS[r].password === password
        );

        if (matchedRole) {
          setIsLoading(false);
          const user = DEMO_USERS[matchedRole];
          onLogin({
            role: user.role,
            name: user.name,
            email: user.email,
            title: user.title,
            avatar: user.avatar
          });
        } else {
          setIsLoading(false);
          setErrorMsg(`Invalid credentials. Demo password for ${selectedRole.toUpperCase()} is "${demoAccount.password}".`);
        }
      }
    }, 600);
  };

  const handleForgotPassword = () => {
    alert(`Demo Mode: Password reset link sent to ${email || 'your email'}. Password remains "${DEMO_USERS[selectedRole].password}".`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 select-none font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2C633E] text-white shadow-lg shadow-[#2C633E]/20 ring-4 ring-[#2C633E]/10 transition-transform duration-200 hover:scale-105">
            <School className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {schoolName || 'School Management System'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Enterprise Role-Based Access Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-200/50 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-gray-900">Welcome Back</h2>
            <p className="text-xs text-gray-500">
              Select your role and enter credentials to sign in.
            </p>
          </div>

          {/* Quick Info Toast if any */}
          {infoNotice && (
            <div className="p-3 bg-[#EAF2EC] border border-[#2C633E]/20 rounded-xl flex items-center space-x-2 text-xs font-medium text-[#2C633E] animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2C633E]" />
              <span>{infoNotice}</span>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs font-medium text-red-700 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="role-select" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Select Portal Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <UserCheck className="w-4 h-4 text-[#2C633E]" />
                </div>
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FC] border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/30 focus:border-[#2C633E] cursor-pointer transition-all"
                >
                  <option value="admin">Admin (Full System Access)</option>
                  <option value="accountant">Accountant / HR (Finance & Payroll)</option>
                  <option value="teacher">Teacher (Faculty & Classes)</option>
                  <option value="student">Student (Student Portal)</option>
                  <option value="parent">Parent (Parent Portal)</option>
                </select>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FC] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/30 focus:border-[#2C633E] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-semibold text-[#2C633E] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F8F9FC] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/30 focus:border-[#2C633E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#2C633E] focus:ring-[#2C633E]/30 cursor-pointer"
                />
                <span className="text-xs font-medium text-gray-600">Remember me on this browser</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#2C633E]/20 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as {selectedRole.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#2C633E]" />
                <span>1-Click Demo Accounts</span>
              </span>
              <span>Select to autofill</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['admin', 'accountant', 'teacher', 'student', 'parent'] as UserRole[]).map((r) => {
                const isActive = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleQuickDemoClick(r)}
                    className={`p-2 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      isActive
                        ? 'bg-[#EAF2EC] border-[#2C633E] font-bold text-[#2C633E] shadow-2xs'
                        : 'bg-[#F8F9FC] border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="capitalize font-bold">{r}</div>
                    <div className="text-[10px] text-gray-500 truncate font-mono mt-0.5">
                      {DEMO_USERS[r].email.split('@')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-400 flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Frontend RBAC Demo System • Secure Client Session</span>
        </div>
      </div>
    </div>
  );
};
