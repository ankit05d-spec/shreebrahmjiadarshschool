import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language, GalleryItem, NewsEvent } from '../types';
import { Calendar, Award, Star, Eye, Image, Newspaper, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsSectionProps {
  lang: Language;
  galleryList: GalleryItem[];
  newsList: NewsEvent[];
}

export default function NewsSection({ lang, galleryList, newsList }: NewsSectionProps) {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Celebration", "Rangoli", "Plantation", "Infrastructure"];

  const filteredGallery = selectedCategory === "All"
    ? galleryList
    : galleryList.filter(item => item.category === selectedCategory);

  const newsItems = newsList.filter(item => item.category === 'News' || item.category === 'Event');
  const achievementItems = newsList.filter(item => item.category === 'Achievement');

  return (
    <div className="space-y-12 select-none">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl font-extrabold text-stone-850 tracking-tight">
          {lang === 'en' ? "News, Events & Interactive Gallery" : "दैनिक समाचार, सांस्कृतिक गतिविधियां व दीर्घा"}
        </h2>
        <p className="text-stone-500 font-light text-sm">
          {lang === 'en' 
            ? "Stay updated with historic achievements, regional press releases, and creative outputs from our students." 
            : "विद्यालय में होने वाले दैनिक आयोजनों, छात्र उपलब्धियों और सांस्कृतिक कलाकृतियों की सुंदर झलकियाँ।"}
        </p>
      </div>

      {/* Grid: Latest News & Achievements */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Latest Announcements Column */}
        <div className="md:col-span-7 space-y-6">
          <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2 border-b border-stone-200 pb-3">
            <Newspaper className="w-5 h-5 text-red-800" />
            {lang === 'en' ? "School News & Broadcasts" : "प्रमुख समाचार व सूचनाएँ"}
          </h3>

          <div className="space-y-4">
            {newsItems.length === 0 ? (
              <p className="text-xs text-stone-400 italic">No news items found.</p>
            ) : (
              newsItems.map((item) => (
                <div key={item.id} className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:border-red-200 transition duration-300 space-y-3 select-text">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-red-100 text-red-850 font-bold text-[9px] uppercase tracking-wide">
                      {item.category}
                    </span>
                    <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" /> {item.date}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-base leading-snug">
                    {lang === 'en' ? item.titleEn : item.titleHi}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed text-justify">
                    {lang === 'en' ? item.contentEn : item.contentHi}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* School Achievements and Press clipping Column */}
        <div className="md:col-span-5 space-y-6">
          <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2 border-b border-stone-200 pb-3">
            <Award className="w-5 h-5 text-yellow-600" />
            {lang === 'en' ? "Key Milestones & Honors" : "गौरवशाली उपलब्धियां एवं सम्मान"}
          </h3>

          <div className="space-y-4">
            {achievementItems.map((ach) => (
              <div key={ach.id} className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/15 space-y-3 shadow-inner select-text">
                <div className="flex gap-1 items-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] uppercase font-bold text-amber-800 ml-1">Featured Award</span>
                </div>
                <h4 className="font-extrabold text-stone-900 text-sm">
                  {lang === 'en' ? ach.titleEn : ach.titleHi}
                </h4>
                <p className="text-xs text-stone-550 leading-relaxed">
                  {lang === 'en' ? ach.contentEn : ach.contentHi}
                </p>
                <div className="text-[10px] font-mono text-stone-400 border-t border-amber-500/10 pt-2 flex items-center gap-1.5 justify-between">
                  <span>PRESS RELEASE DATE:</span>
                  <span className="font-bold">{ach.date}</span>
                </div>
              </div>
            ))}

            {/* Newspaper info card representing Rangoli event */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
              <div className="h-6 w-fit px-2 rounded bg-stone-100 flex items-center text-[10px] font-mono font-bold text-stone-500 border border-stone-150">
                LOKBHARATI SCAN
              </div>
              <h4 className="font-black text-rose-950 font-serif text-sm">
                श्री ब्रह्म जी आदर्श हरिजन स्कूल में हुआ रंगोली प्रतियोगिता का आयोजन
              </h4>
              <p className="text-[10.5px] text-stone-500 leading-relaxed text-justify italic">
                &ldquo;रंगोली प्रतियोगिता को लेकर बच्चों में काफी उत्साह रहा... जूनियर बालक वर्ग में कक्षा 8 के निखिल, रोशन, प्रिंस को प्रथम, कक्षा 7 के अन्नू, लक्ष्मीना को द्वितीय तथा कक्षा 4 के निधि, अंशिका, सिद्धि को प्रथम स्थान मिला। प्रधानाध्यापक मुबारक अली, श्रीनिवास सिंह, प्रमोद कुमार मिश्र उपस्थित रहे।&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Filterable Photo gallery list */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-250 pb-3">
          <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
            <Image className="w-5 h-5 text-red-800" />
            {lang === 'en' ? "Digital Visual Gallery" : "चित्र दीर्घा (फोटो गैलरी)"}
          </h3>

          {/* Categories Selector */}
          <div className="flex flex-wrap gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-semibold transition cursor-pointer select-none ${
                  selectedCategory === cat 
                    ? "bg-red-800 text-white shadow-sm"
                    : "text-stone-605 hover:bg-stone-200 hover:text-stone-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-stone-150 overflow-hidden shadow-sm hover:shadow-md transition duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-stone-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={lang==='en' ? item.titleEn : item.titleHi}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 brightness-95 group-hover:brightness-100"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[8.5px] font-bold bg-black/70 backdrop-blur-sm shadow border border-white/5 text-white py-1 px-2.5 rounded-md uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-red-955 truncate">
                      {lang === 'en' ? item.titleEn : item.titleHi}
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                      {lang === 'en' ? item.descriptionEn : item.descriptionHi}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-stone-50 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>DATE: {item.date}</span>
                  <button
                    onClick={() => setLightboxItem(item)}
                    className="inline-flex items-center gap-1 text-red-800 font-bold hover:text-red-900 cursor-pointer select-none"
                  >
                    <Eye className="w-3.5 h-3.5" /> {lang === 'en' ? "Zoom" : "बड़ा देखें"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Dynamic Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setLightboxItem(null)}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer select-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col justify-between">
            <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.imageUrl}
                alt={lang==='en' ? lightboxItem.titleEn : lightboxItem.titleHi}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[60vh] object-contain"
              />
            </div>
            
            <div className="p-6 md:p-8 text-white space-y-3">
              <div className="flex justify-between items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-800 text-white text-[9px] font-bold uppercase tracking-wider">
                  {lightboxItem.category}
                </span>
                <span className="text-[11px] font-mono text-stone-450 text-stone-430">Date: {lightboxItem.date}</span>
              </div>
              <h4 className="font-bold text-lg md:text-xl text-yellow-300">
                {lang === 'en' ? lightboxItem.titleEn : lightboxItem.titleHi}
              </h4>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed text-justify select-text">
                {lang === 'en' ? lightboxItem.descriptionEn : lightboxItem.descriptionHi}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
