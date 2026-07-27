import React, { useState, useEffect } from 'react';
import { ActivityEvent, ActivityImage } from '../../types';
import { SAMPLE_ACTIVITIES } from '../../data/activitiesData';
import {
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Sparkles,
  Layers,
  Maximize2,
  Share2,
  Tag,
  Camera,
  Filter
} from 'lucide-react';

export const ActivitiesView: React.FC = () => {
  // State for activities data and filtering
  const [activities] = useState<ActivityEvent[]>(SAMPLE_ACTIVITIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State for active gallery view
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(null);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');

  // State for Lightbox Modal
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter activities for main list
  const filteredActivities = activities.filter((act) => {
    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter gallery images within an active event
  const activeGalleryImages = selectedEvent
    ? selectedEvent.gallery.filter(
        (img) => galleryCategoryFilter === 'All' || img.category === galleryCategoryFilter
      )
    : [];

  // Unique gallery categories for selected event
  const galleryCategories = selectedEvent
    ? ['All', ...Array.from(new Set(selectedEvent.gallery.map((g) => g.category || 'General')))]
    : ['All'];

  // Handle Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || activeGalleryImages.length === 0) return;

      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < activeGalleryImages.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : activeGalleryImages.length - 1));
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeGalleryImages]);

  // Categories list
  const categories = ['All', 'Sports', 'Academic', 'Cultural', 'Celebration', 'Field Trip'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* SECTION 1: ALL ACTIVITIES GALLERY (DEFAULT VIEW) */}
      {!selectedEvent ? (
        <>
          {/* Header Banner */}
          <div className="bg-linear-to-r from-[#2C633E] via-[#235032] to-[#1a3d26] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
              <Camera className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>School Activities & Event Gallery</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Activities & Events Gallery
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
                Explore memories, sports meets, science exhibitions, cultural functions, and educational trips across our vibrant campus community.
              </p>

              {/* Quick Summary Stats */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-emerald-100">
                <div className="flex items-center space-x-1.5 bg-black/15 px-3 py-1.5 rounded-xl border border-white/10">
                  <Camera className="w-4 h-4 text-emerald-300" />
                  <span>5 Featured Events</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/15 px-3 py-1.5 rounded-xl border border-white/10">
                  <ImageIcon className="w-4 h-4 text-emerald-300" />
                  <span>50+ High-Res Photos</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/15 px-3 py-1.5 rounded-xl border border-white/10">
                  <Users className="w-4 h-4 text-emerald-300" />
                  <span>Whole School Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 flex items-center shrink-0">
                <Filter className="w-3.5 h-3.5 mr-1" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#2C633E] text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative sm:w-64 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C633E]/30 focus:border-[#2C633E] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Activity Cards Grid */}
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center space-y-3">
              <Camera className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-base font-bold text-gray-800">No activities found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No school events match your selected category or search query. Try clearing your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#2C633E] text-white text-xs font-semibold rounded-xl hover:bg-[#235032] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Category Badge Top Right */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#2C633E] border border-white/50 shadow-2xs">
                      {event.category}
                    </div>

                    {/* Date Tag Top Left */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white flex items-center space-x-1 border border-white/20">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span>{event.date}</span>
                    </div>

                    {/* Photo Count Tag Bottom Left */}
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center space-x-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-white/20">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{event.gallery.length} Photos</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#2C633E] transition-colors leading-snug">
                        {event.title}
                      </h3>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {event.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 pt-1">
                        <span className="flex items-center space-x-1 bg-gray-100 px-2 py-0.5 rounded-md">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{event.location}</span>
                        </span>
                        <span className="flex items-center space-x-1 bg-gray-100 px-2 py-0.5 rounded-md">
                          <Users className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{event.participantCount}</span>
                        </span>
                      </div>
                    </div>

                    {/* Button Action */}
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setGalleryCategoryFilter('All');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 px-4 bg-[#EAF2EC] hover:bg-[#2C633E] text-[#2C633E] hover:text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 border border-[#2C633E]/15 group/btn cursor-pointer shadow-2xs"
                    >
                      <span>View Gallery</span>
                      <ImageIcon className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* SECTION 2: DEDICATED EVENT GALLERY VIEW */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Back Navigation & Breadcrumb Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedEvent(null)}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#2C633E] bg-[#EAF2EC] hover:bg-[#2C633E] hover:text-white px-3.5 py-2 rounded-xl border border-[#2C633E]/20 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Activities</span>
            </button>

            <div className="text-xs text-gray-500 font-medium">
              Activities / <span className="font-bold text-gray-800">{selectedEvent.title}</span>
            </div>
          </div>

          {/* Event Header Banner */}
          <div className="bg-linear-to-r from-[#2C633E] via-[#235032] to-[#1a3d26] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/20 text-emerald-100 text-[11px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-md">
                  {selectedEvent.category}
                </span>
                <span className="text-emerald-200 text-xs font-semibold flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedEvent.date}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedEvent.title}
              </h1>

              <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {selectedEvent.shortDescription}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-emerald-100">
                <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                  <MapPin className="w-4 h-4 text-emerald-300" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                  <Users className="w-4 h-4 text-emerald-300" />
                  <span>{selectedEvent.participantCount}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                  <ImageIcon className="w-4 h-4 text-emerald-300" />
                  <span>{selectedEvent.gallery.length} High-Res Images</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Sub-Category Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 flex items-center shrink-0">
                <Tag className="w-3.5 h-3.5 mr-1" /> Filter Gallery:
              </span>
              {galleryCategories.map((gCat) => (
                <button
                  key={gCat}
                  onClick={() => setGalleryCategoryFilter(gCat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    galleryCategoryFilter === gCat
                      ? 'bg-[#2C633E] text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
                  }`}
                >
                  {gCat}
                </button>
              ))}
            </div>

            <div className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{activeGalleryImages.length}</span> of {selectedEvent.gallery.length} photos
            </div>
          </div>

          {/* Masonry-Style Responsive Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeGalleryImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative bg-gray-100 rounded-2xl overflow-hidden cursor-pointer aspect-4/3 sm:aspect-square shadow-2xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/60"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold">
                      {img.category || 'Event Highlight'}
                    </span>
                    <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-white leading-snug">{img.title}</h4>
                    {img.caption && (
                      <p className="text-[11px] text-gray-300 line-clamp-2 leading-tight">{img.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LIGHTBOX MODAL */}
          {lightboxIndex !== null && activeGalleryImages[lightboxIndex] && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200 select-none">
              {/* Top Header */}
              <div className="flex items-center justify-between text-white z-10">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    {lightboxIndex + 1} / {activeGalleryImages.length}
                  </span>
                  <div className="hidden sm:block">
                    <h3 className="text-sm font-bold text-white">{activeGalleryImages[lightboxIndex].title}</h3>
                    <p className="text-xs text-gray-400">{selectedEvent.title}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: activeGalleryImages[lightboxIndex].title,
                          url: activeGalleryImages[lightboxIndex].url
                        });
                      }
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer"
                    title="Share Image"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image View & Prev/Next Controls */}
              <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : activeGalleryImages.length - 1
                    )
                  }
                  className="absolute left-2 sm:left-4 z-20 p-3 bg-black/50 hover:bg-black/80 rounded-2xl text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
                  title="Previous Image (←)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Displayed Image */}
                <div className="max-w-5xl max-h-full flex flex-col items-center justify-center p-2">
                  <img
                    src={activeGalleryImages[lightboxIndex].url}
                    alt={activeGalleryImages[lightboxIndex].title}
                    className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
                  />
                </div>

                {/* Next Button */}
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev < activeGalleryImages.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 sm:right-4 z-20 p-3 bg-black/50 hover:bg-black/80 rounded-2xl text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
                  title="Next Image (→)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-2xl mx-auto w-full text-center text-white space-y-1">
                <h4 className="font-bold text-sm sm:text-base text-white">
                  {activeGalleryImages[lightboxIndex].title}
                </h4>
                {activeGalleryImages[lightboxIndex].caption && (
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activeGalleryImages[lightboxIndex].caption}
                  </p>
                )}
                {activeGalleryImages[lightboxIndex].category && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {activeGalleryImages[lightboxIndex].category}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
