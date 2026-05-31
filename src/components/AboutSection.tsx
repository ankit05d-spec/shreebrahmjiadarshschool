import React from 'react';
import { TRANSLATIONS, FACULTY_MEMBERS, SCHOOL_INFO } from '../data';
import { Language } from '../types';
import { History, Target, Users, Award, ShieldAlert, PhoneCall, Feather } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  lang: Language;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-12">
      {/* Introduction banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl font-extrabold text-stone-850 tracking-tight">
          {lang === 'en' ? "About Shree Brahma Ji Adarsh HP School" : "श्री ब्रह्मा जी आदर्श एच.पी. विद्यालय के बारे में"}
        </h2>
        <p className="text-stone-500 font-light text-sm">
          {lang === 'en' 
            ? "Discover our origins, core ideologies, founders, and the devoted mentors who make this educational dream a reality." 
            : "विद्यालय की स्थापना, हमारा उद्देश्य, मार्गदर्शक मंडल और शिक्षा के प्रति पूर्णतः समर्पित हमारे अध्यापकों का परिचय।"}
        </p>
      </div>

      {/* Grid: School History & Mission-Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* History Card */}
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="p-3 bg-red-100 text-red-800 rounded-xl w-fit">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-stone-850">{t.schoolHistory}</h3>
          <p className="text-stone-600 text-sm leading-relaxed text-justify">
            {t.historyText}
          </p>
          <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-4 text-xs font-mono text-stone-500">
            <div><span className="font-bold text-red-850">ESTABLISHED:</span> 2008</div>
            <div><span className="font-bold text-red-850">RECOGNITION:</span> UP Govt (2008-09)</div>
          </div>
        </div>

        {/* Mission and Vision Card */}
        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-850">{t.missionVision}</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-extrabold text-xs text-stone-500 uppercase tracking-wider mb-1">
                  {lang === 'en' ? "Our Goal & Mission" : "हमारा पावन लक्ष्य (मिशन)"}
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed select-text">
                  {t.missionText}
                </p>
              </div>
              <div className="pt-2">
                <h4 className="font-extrabold text-xs text-stone-500 uppercase tracking-wider mb-1">
                  {lang === 'en' ? "Our Vision" : "दृष्टिकोण (विजन)"}
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed select-text">
                  {t.visionText}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-stone-200 text-xs font-mono text-stone-500 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>U-DISE Registered: 09590703204</span>
          </div>
        </div>
      </div>

      {/* School Founders & Principals Messages */}
      <div className="space-y-6">
        <h3 className="text-2xl font-extrabold text-stone-850 flex items-center gap-2 border-b border-stone-200 pb-3">
          <Feather className="w-6 h-6 text-yellow-600 animate-bounce" />
          {t.principlesMessage}
        </h3>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Founder block */}
          <div className="bg-gradient-to-b from-amber-50 to-white p-8 rounded-2xl border border-amber-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-900 border-2 border-amber-400 overflow-hidden shrink-0">
                  <span className="text-xl">GMT</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">Shree Gautam Muni Tiwari</h4>
                  <p className="text-xs text-amber-800 font-medium">{lang==='en' ? "Founder & School Manager" : "विद्यालय प्रबंधक एवं संस्थापक"}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-amber-200/50">
                <h5 className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">{lang === 'en' ? "Founder's Message" : "प्रबंधक का संदेश"}</h5>
                <p className="text-stone-600 text-sm italic leading-relaxed select-text">
                  &ldquo;{t.founderMessage}&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-amber-100/60 p-4 rounded-xl flex items-center justify-between text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5"><PhoneCall className="w-4 h-4 text-amber-700" /> +91 {SCHOOL_INFO.contactFounder}</span>
              <span className="text-[10px] uppercase bg-amber-200 text-stone-900 px-2 py-0.5 rounded font-bold">{lang === 'en' ? "Founder Incharge" : "प्रबंधक कार्यालय"}</span>
            </div>
          </div>

          {/* Principal block */}
          <div className="bg-gradient-to-b from-rose-50 to-white p-8 rounded-2xl border border-rose-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-200 flex items-center justify-center font-bold text-red-900 border-2 border-red-400 overflow-hidden shrink-0">
                  <span className="text-xl">VKT</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">Shree Vijendra Kumar Tiwari</h4>
                  <p className="text-xs text-red-800 font-medium">{lang==='en' ? "School Principal" : "प्रधानाचार्य"}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-rose-200/50">
                <h5 className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">{lang === 'en' ? "Principal's Message" : "प्रधानाचार्य का संदेश"}</h5>
                <p className="text-stone-600 text-sm italic leading-relaxed select-text">
                  &ldquo;{t.principalMessage}&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-red-100/60 p-4 rounded-xl flex items-center justify-between text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5"><PhoneCall className="w-4 h-4 text-red-700" /> +91 {SCHOOL_INFO.contactPrincipal}</span>
              <span className="text-[10px] uppercase bg-red-200 text-stone-900 px-2 py-0.5 rounded font-bold">{lang === 'en' ? "Principal Office" : "प्रधानाचार्य कक्ष"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Information section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-extrabold text-stone-850 flex items-center gap-2 border-b border-stone-200 pb-3">
          <Users className="w-6 h-6 text-emerald-600" />
          {lang === 'en' ? "Our Dedicated Teacher Staff" : "हमारा शिक्षण संस्थान और शिक्षक सूची"}
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY_MEMBERS.map((staff, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 hover:border-red-300 transition duration-300 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-700 font-serif flex items-center justify-center shrink-0 border border-stone-200 font-bold text-sm">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-sm">
                  {lang === 'en' ? staff.nameEn : staff.nameHi}
                </h4>
                <p className="text-xs font-semibold text-red-800">
                  {lang === 'en' ? staff.roleEn : staff.roleHi}
                </p>
                <p className="text-[10.5px] text-stone-450 font-medium text-stone-500">
                  {lang === 'en' ? staff.eduEn : staff.eduHi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
