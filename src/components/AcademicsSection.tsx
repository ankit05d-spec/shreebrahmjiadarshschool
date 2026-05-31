import React, { useState } from 'react';
import { TRANSLATIONS, ACADEMIC_CLASSES, GENERAL_TIMETABLE } from '../data';
import { Language } from '../types';
import { GraduationCap, Clock, BookOpen, Layers, Sparkles } from 'lucide-react';

interface AcademicsSectionProps {
  lang: Language;
}

export default function AcademicsSection({ lang }: AcademicsSectionProps) {
  const t = TRANSLATIONS[lang];
  const [selectedClassId, setSelectedClassId] = useState(ACADEMIC_CLASSES[0]?.id || "");

  const activeClass = ACADEMIC_CLASSES.find(c => c.id === selectedClassId) || ACADEMIC_CLASSES[0];

  return (
    <div className="space-y-12 select-none">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl font-extrabold text-stone-850 tracking-tight">
          {lang === 'en' ? "Classes & Academics Program" : "कक्षाएं और शैक्षणिक कार्यक्रम"}
        </h2>
        <p className="text-stone-500 font-light text-sm">
          {lang === 'en' 
            ? "We implement UP State Primary Board-aligned curricula with deep moral and digital enhancements from Pre-Primary up to Junior levels." 
            : "हम उत्तर प्रदेश प्राथमिक और जूनियर शिक्षा बोर्ड के दिशा-निर्देशों के अनुरूप संस्कारयुक्त और आधुनिक पाठ्यक्रम संचालित करते हैं।"}
        </p>
      </div>

      {/* Curriculum & Classes Info */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Class Selector list */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-stone-800 text-base mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-800" />
            {lang === 'en' ? "Select Class Level" : "कक्षा का स्तर चुनें"}
          </h3>
          <div className="flex flex-col gap-2">
            {ACADEMIC_CLASSES.map((cls) => {
              const isSelected = cls.id === selectedClassId;
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-250 cursor-pointer flex justify-between items-center ${
                    isSelected 
                      ? "bg-red-800 text-white border-red-800 shadow-md" 
                      : "bg-white text-stone-700 border-stone-200 hover:border-red-300 hover:bg-stone-50"
                  }`}
                >
                  <div>
                    <h4 className="font-extrabold text-sm">{lang === 'en' ? cls.nameEn : cls.nameHi}</h4>
                    <p className={`text-[11px] mt-0.5 ${isSelected ? "text-stone-200" : "text-stone-500"}`}>
                      {lang === 'en' ? `Age Limit: ${cls.ageEn}` : `आयु सीमा: ${cls.ageHi}`}
                    </p>
                  </div>
                  <GraduationCap className={`w-4 h-4 ${isSelected ? "text-yellow-300" : "text-stone-400"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Curriculum Details Container */}
        <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-150 pb-4">
            <div className="p-3 bg-red-100 text-red-800 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">{lang === 'en' ? "Academic Curriculum Details" : "पाठ्यक्रम की विषयवार विस्तृत जानकारी"}</span>
              <h3 className="text-xl font-bold text-stone-850">
                {lang === 'en' ? activeClass?.nameEn : activeClass?.nameHi} (UP Govt. Syllabus)
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-extrabold text-xs uppercase text-stone-450 tracking-wider">
              {lang === 'en' ? "Course Content & Core Subjects" : "मुख्य अध्यापन विषय व मार्गदर्शिका"}
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line select-text">
              {lang === 'en' ? activeClass?.subjectsEn : activeClass?.subjectsHi}
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 select-none flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <span className="font-bold text-xs text-amber-900">{lang==='en' ? "Moral & Creative Integration" : "नैतिक पठन-पाठन और अतिरिक्त खेल विकास"}</span>
              <p className="text-stone-605 text-[11px] leading-relaxed text-stone-600">
                {lang === 'en' 
                  ? "Every day ends with a 20-minute group ethical session that aligns with Rangoli preparation, patriotic poetry writing, and environmental sapling maintenance."
                  : "प्रत्येक विषय के अतिरिक्त बच्चों को दैनिक प्रार्थना सभा में भाषण, कला, सुलेख, रंगोली निर्माण और पर्यावरण संबंधी नैतिक संस्कार दिए जाते हैं।"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timetable schedule display */}
      <div className="space-y-6">
        <h3 className="text-2xl font-extrabold text-stone-850 flex items-center gap-2 border-b border-stone-200 pb-3">
          <Clock className="w-6 h-6 text-red-800" />
          {lang === 'en' ? "Daily School Timetable (Nursery to VIII)" : "विद्यालई दैनिक समय-सारणी विवरण"}
        </h3>

        <div className="overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-sm">
          <table className="w-full text-left border-collapse select-text">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">{lang==='en'?'Period' : 'कालांश'}</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">{lang==='en'?'Timing' : 'समय'}</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">{lang==='en'?'Curriculum Activity' : 'प्रक्रिया / विवरण'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-150">
              {GENERAL_TIMETABLE.map((row, idx) => {
                const isSpecial = row.period.includes("Assembly") || row.period.includes("Recess");
                return (
                  <tr 
                    key={idx} 
                    className={`hover:bg-stone-50/50 transition-colors ${
                      isSpecial ? "bg-amber-500/5 font-semibold text-amber-950" : "text-stone-700"
                    }`}
                  >
                    <td className="p-4 text-xs md:text-sm font-bold text-stone-800">{row.period}</td>
                    <td className="p-4 text-xs md:text-sm text-stone-550 font-mono whitespace-nowrap">{row.time}</td>
                    <td className="p-4 text-xs md:text-sm">
                      {lang === 'en' ? row.activityEn : row.activityHi}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
