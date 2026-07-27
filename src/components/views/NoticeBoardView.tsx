import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Notice, UserSession } from '../../types';
import { Megaphone, Plus, Calendar, User, Tag, AlertCircle, X } from 'lucide-react';

interface NoticeBoardViewProps {
  notices: Notice[];
  onAddNotice: (notice: Omit<Notice, 'id'>) => void;
  currentUser?: UserSession | null;
}

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({ notices, onAddNotice, currentUser }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const role = currentUser?.role;
  const canPublish = role !== 'student' && role !== 'parent';

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Academic' as 'General' | 'Academic' | 'Sports' | 'Exam' | 'Emergency',
    audience: 'All' as 'All' | 'Students' | 'Teachers' | 'Parents',
    priority: 'Normal' as 'Normal' | 'High' | 'Urgent',
    author: 'Principal Office'
  });

  const filteredNotices = notices.filter(
    (n) => categoryFilter === 'All' || n.category === categoryFilter
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    onAddNotice(formData);
    setShowModal(false);
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Academic',
      audience: 'All',
      priority: 'Normal',
      author: 'Principal Office'
    });
  };

  const categories = ['All', 'Academic', 'Exam', 'General', 'Sports', 'Emergency'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">School Notice Board</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Broadcast official announcements, circulars, exam alerts, and emergency bulletins.
          </p>
        </div>

        {canPublish && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              categoryFilter === cat
                ? 'bg-[#2C633E] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notice Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredNotices.map((notice, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.05 }}
              key={notice.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#2C633E]/40 transition-colors space-y-3 hostinger-shadow-hover"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    notice.priority === 'Urgent'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : notice.priority === 'High'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {notice.priority} Priority
                </span>

                <span className="text-xs font-medium text-gray-400 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {notice.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 leading-snug">{notice.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{notice.content}</p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span>Target: <strong className="text-gray-800">{notice.audience}</strong></span>
                <span>By: <strong className="text-gray-800">{notice.author}</strong></span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* PUBLISH MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Publish Announcement</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Annual Sports Meet 2026 Registration"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Exam">Exam</option>
                    <option value="General">General</option>
                    <option value="Sports">Sports</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Target Audience</label>
                  <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  >
                    <option value="All">All Portal</option>
                    <option value="Students">Students Only</option>
                    <option value="Teachers">Teachers Only</option>
                    <option value="Parents">Parents Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write clear notice text here..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-[#2C633E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-b from-[#2C633E] to-[#20482d] hover:from-[#255435] hover:to-[#1a3c25] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#2C633E]/20 active:translate-y-0 active:scale-[0.98] text-white rounded-xl text-xs font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#2C633E]/50 focus:ring-offset-2"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
