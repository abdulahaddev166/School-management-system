import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SubscriptionPlan } from '../../types';
import {
  Sparkles,
  Check,
  Zap,
  ShieldCheck,
  Building2,
  Users,
  HardDrive,
  Headphones,
  CheckCircle2,
  X
} from 'lucide-react';

interface SubscriptionViewProps {
  plans: SubscriptionPlan[];
  activePlanId: string;
  onUpgradePlan: (planId: string) => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  plans,
  activePlanId,
  onUpgradePlan
}) => {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlanToUpgrade, setSelectedPlanToUpgrade] = useState<SubscriptionPlan | null>(null);

  const handleConfirmUpgrade = () => {
    if (selectedPlanToUpgrade) {
      onUpgradePlan(selectedPlanToUpgrade.id);
      setSelectedPlanToUpgrade(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-12">
      {/* Top Banner / Hero (Hostinger Style) */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <span className="px-3 py-1 bg-[#EAF2EC] text-[#2C633E] rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          <span>SaaS Platform Subscriptions</span>
        </span>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Flexible Pricing for Every School
        </h2>
        <p className="text-sm text-gray-500">
          Scale your school's digital infrastructure with zero hidden fees, unlimited module updates, and enterprise security guarantees.
        </p>

        {/* Billing Toggle (Monthly / Yearly) */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-gray-200/80 p-1.5 rounded-full border border-gray-300/70 shadow-inner inline-flex items-center space-x-1 relative">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold transition-colors duration-200 focus:outline-none flex items-center space-x-1.5 cursor-pointer select-none ${
                !isYearly ? 'text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {!isYearly && (
                <motion.div
                  layoutId="activeBillingTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#2C633E] via-[#245334] to-[#1b3e27] rounded-full shadow-md shadow-[#2C633E]/25 border border-[#37794e]/40"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Monthly Billing</span>
            </button>

            <button
              onClick={() => setIsYearly(true)}
              className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold transition-colors duration-200 focus:outline-none flex items-center space-x-2 cursor-pointer select-none ${
                isYearly ? 'text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isYearly && (
                <motion.div
                  layoutId="activeBillingTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#2C633E] via-[#245334] to-[#1b3e27] rounded-full shadow-md shadow-[#2C633E]/25 border border-[#37794e]/40"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Yearly Billing</span>
              <span
                className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                  isYearly
                    ? 'bg-emerald-300/20 text-emerald-200 border border-emerald-300/30'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200/60'
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Hostinger-Inspired Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isCurrent = activePlanId === plan.id;
          const currentSelectedId = selectedPlanToUpgrade ? selectedPlanToUpgrade.id : activePlanId;
          const isSelected = currentSelectedId === plan.id;
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: index * 0.08 }}
              key={plan.id}
              onClick={() => setSelectedPlanToUpgrade(plan)}
              className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative cursor-pointer text-white ${
                isSelected
                  ? 'bg-black border border-zinc-800 shadow-2xl shadow-black/80 ring-2 ring-white/30'
                  : 'bg-gradient-to-br from-[#2C633E] via-[#214a2e] to-[#0e1d13] border border-[#2d613e]/50 shadow-lg hover:shadow-2xl hover:border-[#387a4e]'
              }`}
            >
              {/* Badge if present */}
              {plan.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full shadow-md ${
                    isSelected ? 'bg-white text-black' : 'bg-white/20 text-white backdrop-blur-md border border-white/30'
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Plan Title & Price */}
                <div className={`border-b pb-5 ${isSelected ? 'border-zinc-800' : 'border-white/15'}`}>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className={`text-xs mt-1 min-h-[36px] ${isSelected ? 'text-zinc-400' : 'text-white/80'}`}>{plan.description}</p>

                  <div className="mt-4 flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-white">${price}</span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-zinc-400' : 'text-white/80'}`}>/ month</span>
                  </div>
                  <p className={`text-[11px] mt-1 ${isSelected ? 'text-zinc-500' : 'text-white/70'}`}>
                    {isYearly ? `Billed annually ($${price * 12}/yr)` : 'Billed monthly'}
                  </p>
                </div>

                {/* Main Action Button */}
                <div className="my-5">
                  {isCurrent ? (
                    <button
                      disabled
                      className={`w-full py-3 font-bold text-xs rounded-xl border cursor-default flex items-center justify-center space-x-1.5 ${
                        isSelected
                          ? 'bg-zinc-900 text-white border-zinc-700'
                          : 'bg-white/15 text-white border-white/20 backdrop-blur-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Current Active Plan</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlanToUpgrade(plan);
                      }}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-sm active:scale-95 ${
                        isSelected
                          ? 'bg-white text-black hover:bg-zinc-200'
                          : 'bg-white text-[#2C633E] hover:bg-emerald-50'
                      }`}
                    >
                      Upgrade to {plan.name}
                    </button>
                  )}
                </div>

                {/* Capacity Limits Breakdown */}
                <div
                  className={`space-y-2.5 text-xs p-3.5 rounded-xl border mb-5 ${
                    isSelected
                      ? 'bg-zinc-900/90 border-zinc-800 text-white'
                      : 'bg-black/25 border-white/10 text-white backdrop-blur-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center ${isSelected ? 'text-zinc-400' : 'text-white/80'}`}>
                      <Users className={`w-3.5 h-3.5 mr-1.5 ${isSelected ? 'text-zinc-300' : 'text-emerald-300'}`} />
                      Student Limit:
                    </span>
                    <span className="font-bold text-white">{plan.maxStudents.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center ${isSelected ? 'text-zinc-400' : 'text-white/80'}`}>
                      <Building2 className={`w-3.5 h-3.5 mr-1.5 ${isSelected ? 'text-zinc-300' : 'text-emerald-300'}`} />
                      Teacher Limit:
                    </span>
                    <span className="font-bold text-white">{plan.maxTeachers} Profiles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center ${isSelected ? 'text-zinc-400' : 'text-white/80'}`}>
                      <HardDrive className={`w-3.5 h-3.5 mr-1.5 ${isSelected ? 'text-zinc-300' : 'text-emerald-300'}`} />
                      Cloud Storage:
                    </span>
                    <span className="font-bold text-white">{plan.storage}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-zinc-400' : 'text-white/80'}`}>
                    Included Features:
                  </h4>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-white">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-emerald-400' : 'text-emerald-300'}`} />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* UPGRADE CONFIRMATION MODAL */}
      {selectedPlanToUpgrade && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Confirm Plan Upgrade</h3>
              <button onClick={() => setSelectedPlanToUpgrade(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#EAF2EC] border border-[#2C633E]/30 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-[#2C633E] uppercase tracking-wider">Upgrading To</span>
                <p className="text-lg font-extrabold text-gray-900">{selectedPlanToUpgrade.name}</p>
                <p className="text-xs font-bold text-[#2C633E]">
                  ${isYearly ? selectedPlanToUpgrade.yearlyPrice : selectedPlanToUpgrade.monthlyPrice} / month
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Upgrading unlocks immediate access to {selectedPlanToUpgrade.maxStudents.toLocaleString()} student slots,{' '}
                {selectedPlanToUpgrade.storage}, and priority support.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedPlanToUpgrade(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl font-semibold text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpgrade}
                className="px-5 py-2 bg-[#2C633E] text-white rounded-xl font-bold"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
