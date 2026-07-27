import React from 'react';
import { Student, Teacher, FeeInvoice, AttendanceRecord } from '../../types';
import { BarChart3, Download, TrendingUp, DollarSign, Users, Award, Calendar } from 'lucide-react';

interface ReportsViewProps {
  students: Student[];
  teachers: Teacher[];
  invoices: FeeInvoice[];
  attendanceRecords: AttendanceRecord[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  students,
  teachers,
  invoices,
  attendanceRecords
}) => {
  const downloadReport = (reportTitle: string) => {
    alert(`Generating & downloading ${reportTitle} PDF/CSV package...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Executive Reports & Analytics</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Institutional performance metrics, financial revenue audits, and academic trends.
          </p>
        </div>

        <button
          onClick={() => downloadReport('Comprehensive Executive Summary')}
          className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export All Reports (PDF)</span>
        </button>
      </div>

      {/* Visual Analytics Chart */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-gray-900">Monthly Fee Collection Revenue</h3>
            <p className="text-xs text-gray-500">2026 Academic Year Financial Breakdown ($)</p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
            <TrendingUp className="w-4 h-4" />
            <span>+18.4% YoY Growth</span>
          </div>
        </div>

        {/* SVG Bar Chart */}
        <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 px-4">
          {[
            { month: 'Jan', val: 32000, max: 50000 },
            { month: 'Feb', val: 38000, max: 50000 },
            { month: 'Mar', val: 41000, max: 50000 },
            { month: 'Apr', val: 29000, max: 50000 },
            { month: 'May', val: 45000, max: 50000 },
            { month: 'Jun', val: 48000, max: 50000 },
            { month: 'Jul', val: 42500, max: 50000 }
          ].map((bar, idx) => {
            const hPct = Math.round((bar.val / bar.max) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end space-y-2 group">
                <div className="text-[10px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(bar.val / 1000).toFixed(1)}k
                </div>
                <div className="w-full max-w-[40px] bg-gray-100 rounded-t-xl overflow-hidden h-full flex items-end">
                  <div
                    className="w-full bg-[#2C633E] hover:bg-[#214A2E] transition-all rounded-t-xl"
                    style={{ height: `${hPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-600">{bar.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#2C633E]/40 transition-all hostinger-shadow-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] text-[#2C633E] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Academic Grade Performance Report</h3>
              <p className="text-xs text-gray-500">Distribution of term exam grades across Grade 9-12</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Detailed breakdown of GPA benchmarks, subject pass ratios, and honors list candidates.
          </p>
          <button
            onClick={() => downloadReport('Academic Grade Performance')}
            className="w-full py-2 bg-[#F8F9FC] hover:bg-[#EAF2EC] text-[#2C633E] font-bold text-xs rounded-xl border border-gray-200 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report CSV</span>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-[#2C633E]/40 transition-all hostinger-shadow-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Student Attendance Analytics</h3>
              <p className="text-xs text-gray-500">Monthly attendance percentage & absentee logs</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Unexcused absence frequencies, late arrival logs, and medical leave approvals.
          </p>
          <button
            onClick={() => downloadReport('Student Attendance Analytics')}
            className="w-full py-2 bg-[#F8F9FC] hover:bg-[#EAF2EC] text-[#2C633E] font-bold text-xs rounded-xl border border-gray-200 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
