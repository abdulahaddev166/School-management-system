import React, { useState } from 'react';
import { Student, AttendanceRecord, AttendanceStatus, ClassRoom } from '../../types';
import {
  ClipboardCheck,
  Calendar,
  Check,
  X,
  Clock,
  HelpCircle,
  Save,
  CheckCheck
} from 'lucide-react';

interface AttendanceViewProps {
  students: Student[];
  classes: ClassRoom[];
  attendanceRecords: AttendanceRecord[];
  onSaveAttendance: (records: AttendanceRecord[]) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  classes,
  attendanceRecords,
  onSaveAttendance
}) => {
  const [selectedClassId, setSelectedClassId] = useState('CLS-10A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter students for selected class
  const targetClass = classes.find((c) => c.id === selectedClassId);
  const classStudents = students.filter(
    (s) => s.grade === targetClass?.grade && s.section === targetClass?.section
  );

  // Local state for attendance edits
  const [currentAttendance, setCurrentAttendance] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    classStudents.forEach((stu) => {
      const existing = attendanceRecords.find(
        (a) => a.studentId === stu.id && a.date === selectedDate
      );
      initial[stu.id] = existing ? existing.status : 'Present';
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setCurrentAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceStatus> = {};
    classStudents.forEach((stu) => {
      updated[stu.id] = 'Present';
    });
    setCurrentAttendance(updated);
  };

  const handleSave = () => {
    const newRecords: AttendanceRecord[] = classStudents.map((stu) => ({
      id: `ATT-${stu.id}-${selectedDate}`,
      date: selectedDate,
      studentId: stu.id,
      studentName: `${stu.firstName} ${stu.lastName}`,
      rollNumber: stu.rollNumber,
      classId: selectedClassId,
      status: currentAttendance[stu.id] || 'Present'
    }));

    onSaveAttendance(newRecords);
  };

  // Stats calculation
  const total = classStudents.length;
  const presentCount = Object.values(currentAttendance).filter((s) => s === 'Present').length;
  const absentCount = Object.values(currentAttendance).filter((s) => s === 'Absent').length;
  const lateCount = Object.values(currentAttendance).filter((s) => s === 'Late').length;
  const excusedCount = Object.values(currentAttendance).filter((s) => s === 'Excused').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Daily Attendance Register</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Record, update, and track student presence and absence logs.
          </p>
        </div>

        {/* Date & Class Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-[#F8F9FC] border border-gray-200 rounded-xl px-3 py-1.5">
            <Calendar className="w-4 h-4 text-[#2C633E]" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none"
            />
          </div>

          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-[#F8F9FC] border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#2C633E]"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.roomNumber})
              </option>
            ))}
          </select>

          <button
            onClick={handleMarkAllPresent}
            className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-semibold border border-emerald-200 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Present</span>
            <p className="text-xl font-bold text-emerald-600">{presentCount} / {total}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
            {total > 0 ? Math.round((presentCount / total) * 100) : 0}%
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Absent</span>
            <p className="text-xl font-bold text-red-600">{absentCount}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
            <X className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Late Arrival</span>
            <p className="text-xl font-bold text-amber-600">{lateCount}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase">Excused Leave</span>
            <p className="text-xl font-bold text-blue-600">{excusedCount}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 bg-[#F8F9FC] border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Student Roster — {targetClass?.name} ({selectedDate})
          </h3>
          <span className="text-xs text-gray-500 font-medium">Class Teacher: {targetClass?.classTeacher}</span>
        </div>

        <div className="divide-y divide-gray-100">
          {classStudents.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              No students enrolled in this class section.
            </div>
          ) : (
            classStudents.map((stu) => {
              const status = currentAttendance[stu.id] || 'Present';
              return (
                <div
                  key={stu.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAF2EC] text-[#2C633E] font-bold text-xs flex items-center justify-center">
                      {stu.rollNumber}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{stu.firstName} {stu.lastName}</h4>
                      <p className="text-[11px] text-gray-400">ID: {stu.id} • Parent: {stu.parentName}</p>
                    </div>
                  </div>

                  {/* Attendance Toggle Buttons */}
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => handleStatusChange(stu.id, 'Present')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                        status === 'Present'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Present</span>
                    </button>

                    <button
                      onClick={() => handleStatusChange(stu.id, 'Absent')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                        status === 'Absent'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Absent</span>
                    </button>

                    <button
                      onClick={() => handleStatusChange(stu.id, 'Late')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                        status === 'Late'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Late</span>
                    </button>

                    <button
                      onClick={() => handleStatusChange(stu.id, 'Excused')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                        status === 'Excused'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Excused</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
