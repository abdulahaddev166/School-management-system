import React, { useState } from 'react';
import { Exam, ExamMark, Student } from '../../types';
import {
  Award,
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  X,
  Edit2
} from 'lucide-react';

interface ExaminationViewProps {
  exams: Exam[];
  marks: ExamMark[];
  students: Student[];
  onAddExamMark: (mark: Omit<ExamMark, 'id'>) => void;
}

export const ExaminationView: React.FC<ExaminationViewProps> = ({
  exams,
  marks,
  students,
  onAddExamMark
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>('EXM-803');
  const [showMarkModal, setShowMarkModal] = useState(false);

  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0];
  const examMarks = marks.filter((m) => m.examId === selectedExamId);

  // New Mark Form
  const [markForm, setMarkForm] = useState({
    studentId: students[0]?.id || '',
    marksObtained: 45,
    remarks: 'Good progress'
  });

  const handleSaveMark = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find((s) => s.id === markForm.studentId);
    if (!stu || !selectedExam) return;

    const obtained = Number(markForm.marksObtained);
    const total = selectedExam.totalMarks;
    const pct = (obtained / total) * 100;

    let grade = 'F';
    if (pct >= 90) grade = 'A+';
    else if (pct >= 80) grade = 'A';
    else if (pct >= 70) grade = 'B';
    else if (pct >= 60) grade = 'C';
    else if (pct >= 50) grade = 'D';

    onAddExamMark({
      examId: selectedExam.id,
      studentId: stu.id,
      studentName: `${stu.firstName} ${stu.lastName}`,
      rollNumber: stu.rollNumber,
      marksObtained: obtained,
      totalMarks: total,
      grade,
      remarks: markForm.remarks
    });

    setShowMarkModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Examination & Grading Engine</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure exam timetables, record student marks, and generate performance report cards.
          </p>
        </div>

        <button
          onClick={() => setShowMarkModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Record Student Marks</span>
        </button>
      </div>

      {/* Grid: Exam Cards + Marks Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam Schedule List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
            Exam Schedules ({exams.length})
          </h3>

          <div className="space-y-3">
            {exams.map((exam) => {
              const isSelected = exam.id === selectedExamId;
              return (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExamId(exam.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EAF2EC] border-[#2C633E] ring-1 ring-[#2C633E]'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        exam.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {exam.status}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500">{exam.examDate}</span>
                  </div>

                  <h4 className="font-bold text-sm text-gray-900">{exam.title}</h4>
                  <p className="text-xs text-gray-600 mt-0.5">{exam.subject} • {exam.grade}</p>

                  <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-500">
                    <span>Pass Marks: {exam.passMarks}/{exam.totalMarks}</span>
                    <span>{exam.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Exam Marks Sheet */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{selectedExam?.title}</h3>
                <p className="text-xs text-gray-500">
                  {selectedExam?.subject} ({selectedExam?.grade}) — Total Marks: {selectedExam?.totalMarks}
                </p>
              </div>
              <span className="text-xs font-bold text-[#2C633E] bg-[#EAF2EC] px-3 py-1 rounded-xl">
                {examMarks.length} Recorded
              </span>
            </div>

            {/* Marks Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-[#F8F9FC] text-gray-500 font-semibold uppercase text-[10px] tracking-wider border-y border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Marks Obtained</th>
                    <th className="py-3 px-4">Percentage</th>
                    <th className="py-3 px-4">Grade</th>
                    <th className="py-3 px-4">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {examMarks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400">
                        No student marks recorded for this exam yet.
                      </td>
                    </tr>
                  ) : (
                    examMarks.map((m) => {
                      const pct = Math.round((m.marksObtained / m.totalMarks) * 100);
                      const isPass = m.marksObtained >= (selectedExam?.passMarks || 0);
                      return (
                        <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-gray-900">
                            {m.studentName}
                            <span className="block text-[10px] text-gray-400 font-normal">Roll #{m.rollNumber}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            {m.marksObtained} / {m.totalMarks}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-bold ${isPass ? 'text-emerald-600' : 'text-red-600'}`}>
                              {pct}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isPass ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                              }`}
                            >
                              {m.grade}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-500">{m.remarks}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* RECORD MARK MODAL */}
      {showMarkModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Record Exam Mark</h3>
              <button onClick={() => setShowMarkModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMark} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Select Student</label>
                <select
                  value={markForm.studentId}
                  onChange={(e) => setMarkForm({ ...markForm, studentId: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Marks Obtained (Out of {selectedExam?.totalMarks}) *
                </label>
                <input
                  type="number"
                  required
                  max={selectedExam?.totalMarks}
                  min={0}
                  value={markForm.marksObtained}
                  onChange={(e) => setMarkForm({ ...markForm, marksObtained: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Teacher Remarks</label>
                <input
                  type="text"
                  value={markForm.remarks}
                  onChange={(e) => setMarkForm({ ...markForm, remarks: e.target.value })}
                  placeholder="e.g. Excellent analytical problem solving"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMarkModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
                >
                  Save Marks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
