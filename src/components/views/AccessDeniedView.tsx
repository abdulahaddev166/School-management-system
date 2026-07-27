import React from 'react';
import { UserSession } from '../../types';
import { ShieldAlert, ArrowLeft, LayoutDashboard, Lock } from 'lucide-react';

interface AccessDeniedViewProps {
  user: UserSession;
  onGoHome: () => void;
  attemptedNav?: string;
}

export const AccessDeniedView: React.FC<AccessDeniedViewProps> = ({
  user,
  onGoHome,
  attemptedNav
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center max-w-xl mx-auto my-12 shadow-sm space-y-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-amber-600 mx-auto">
        <ShieldAlert className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-100/60 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          <span>Access Restricted</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Module Permission Required</h2>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
          Your current role (<strong className="capitalize text-gray-900">{user.role}</strong>) does not have permission to access the{' '}
          <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-800">{attemptedNav || 'requested'}</span> module.
        </p>
      </div>

      <div className="bg-[#F8F9FC] border border-gray-200/80 rounded-xl p-4 text-left space-y-2 text-xs text-gray-600">
        <div className="font-semibold text-gray-900">LoggedIn Session Details:</div>
        <div className="grid grid-cols-2 gap-2">
          <div><span className="text-gray-400">User:</span> {user.name}</div>
          <div><span className="text-gray-400">Role:</span> <span className="capitalize font-semibold text-[#2C633E]">{user.role}</span></div>
          <div className="col-span-2 truncate"><span className="text-gray-400">Email:</span> {user.email}</div>
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          onClick={onGoHome}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to My Dashboard</span>
        </button>
      </div>
    </div>
  );
};
