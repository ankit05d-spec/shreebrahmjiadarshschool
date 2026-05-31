import React, { useState, useEffect } from 'react';
import { SCHOOL_INFO, TRANSLATIONS, PRESEEDED_GALLERY } from '../data';
import { Language } from '../types';
import SaraswatiLogo from './SaraswatiLogo';
import { BookOpen, ShieldCheck, Heart, Sparkles, Award, ArrowRight, PhoneCall, FileText, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeSectionProps {
  lang: Language;
  setActiveTab: (tab: string) => void;
  galleryList: typeof PRESEEDED_GALLERY;
}

export default function HomeSection({ lang, setActiveTab, galleryList }: HomeSectionProps) {
  const t = TRANSLATIONS[lang];
  const [slideIndex, setSlideIndex] = useState(0);
  const [customLargeLogo, setCustomLargeLogo] = useState<string | null>(null);

  // Auto slideshow loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % galleryList.slice(0, 5).length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galleryList]);

  // Load custom large showcase logo
  useEffect(() => {
    const saved = localStorage.getItem("sbj_custom_large_logo");
    setCustomLargeLogo(saved);

    // Dynamic storage listener
    const handleStorage = () => {
      setCustomLargeLogo(localStorage.getItem("sbj_custom_large_logo"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const introHeading = lang === 'en' ? "Empowering Rural Minds Since 2008" : "2008 से ग्रामीण प्रतिभाओं को दे रहे संबल";
  
  const highlights = [
    {
      icon: BookOpen,
      titleEn: "Experienced Mentorship",
      titleHi: "अनुभवी एवं कुशल शिक्षक",
      descEn: "Continuous support from dedicated professionals under Shree Vijendra Kumar Tiwari's academic supervision.",
      descHi: "प्रधानाचार्य श्री विजेंद्र कुमार तिवारी के नेतृत्व में समर्पित शिक्षकों द्वारा विशेष देखभाल।",
      color: "bg-red-50 text-red-800"
    },
    {
      icon: ShieldCheck,
      titleEn: "Ethical & Moral Focus",
      titleHi: "संस्कारयुक्त नैतिक शिक्षा",
      descEn: "Traditional cultural activities, rangoli events, and local patriotic programs shape student discipline.",
      descHi: "रचनात्मक रंगोली प्रतियोगिताओं व राष्ट्रीय पर्वों से बच्चों में देशभक्ति व संस्कारों का बीजारोपण।",
      color: "bg-amber-50 text-amber-800"
    },
    {
      icon: Heart,
      titleEn: "Affordable Charity First",
      titleHi: "आर्थिक सहायता एवं कम खर्च",
      descEn: "Initiated by Shree Gautam Muni Tiwari to educate needy rural children at bare minimal fees.",
      descHi: "प्रबंधक श्री गौतम मुनि तिवारी जी के संकल्प से गरीब वर्ग के बच्चों हेतु न्यूनतम शिक्षा शुल्क परिसर।",
      color: "bg-emerald-50 text-emerald-800"
    },
    {
      icon: Sparkles,
      titleEn: "Modern Digital Aid",
      titleHi: "डिजिटल एवं स्मार्ट लर्निंग",
      descEn: "Gradual integration of computerized slides, quiz contests, and practical logic assemblies.",
      descHi: "प्रश्नोत्तरी प्रतियोगिताओं व कंप्यूटर कक्षाओं द्वारा आधुनिक ज्ञान का सुंदर समागम।",
      color: "bg-blue-50 text-blue-800"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Welcome Board & Visual Banner */}
      <div className="relative bg-gradient-to-br from-red-900 to-amber-950 text-white rounded-3xl overflow-hidden shadow-xl p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent)] pointer-events-none" />
        
        <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-8 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-yellow-300 border border-yellow-400/30">
              <Award className="w-3.5 h-3.5" /> U-DISE {SCHOOL_INFO.udiseCode}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {t.welcome}
            </h1>
            <p className="text-red-100 text-base md:text-lg max-w-2xl font-light leading-relaxed">
              {t.introText}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('admission')}
                id="btn-hero-admission"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 text-stone-900 hover:bg-yellow-400 transition font-bold shadow-md cursor-pointer text-sm"
              >
                {lang === 'en' ? "Apply Online Admission" : "प्रवेश हेतु आवेदन करें"}
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </button>
              <button
                onClick={() => setActiveTab('about')}
                id="btn-hero-about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 text-white hover:bg-white/20 transition font-semibold text-sm border border-white/10 cursor-pointer"
              >
                {lang === 'en' ? "Explore History" : "विद्यालय का इतिहास जानें"}
              </button>
            </div>
          </div>
          
          <div className="md:col-span-4 flex justify-center">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col items-center text-center space-y-4 shadow-2xl relative">
              {customLargeLogo ? (
                <img src={customLargeLogo} alt="Home Showcase Banner logo" className="w-[130px] h-[130px] object-contain rounded-xl" referrerPolicy="no-referrer" />
              ) : (
                <SaraswatiLogo size={130} />
              )}
              <div>
                <h4 className="font-bold text-yellow-300 text-sm tracking-wide">SHREE BRAHMA JI</h4>
                <p className="text-[10px] text-stone-300 mt-1 uppercase tracking-widest font-mono">ESTD. 2008 / REG. NO. 2008-09</p>
                <div className="mt-2 text-xs font-bold text-stone-200 border-t border-white/10 pt-2 italic">
                  &ldquo;अमृतं हि विद्या&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Slideshow Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-extrabold text-stone-800 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-red-800 rounded-full inline-block"></span>
            {t.slideshow}
          </h3>
          <div className="flex gap-1.5 text-xs font-medium text-stone-500">
            {galleryList.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`w-3.5 h-1.5 rounded-full transition-all ${
                  idx === slideIndex ? 'bg-red-800 w-6' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img
                src={galleryList[slideIndex]?.imageUrl}
                alt={lang==='en' ? galleryList[slideIndex]?.titleEn : galleryList[slideIndex]?.titleHi}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
                <span className="px-2.5 py-1 rounded bg-yellow-500 text-stone-900 font-bold uppercase tracking-wider text-[10px] w-fit mb-3">
                  {galleryList[slideIndex]?.category}
                </span>
                <h4 className="text-lg md:text-2xl font-bold tracking-tight text-white mb-2">
                  {lang === 'en' ? galleryList[slideIndex]?.titleEn : galleryList[slideIndex]?.titleHi}
                </h4>
                <p className="text-xs md:text-sm text-stone-200 max-w-4xl line-clamp-2">
                  {lang === 'en' ? galleryList[slideIndex]?.descriptionEn : galleryList[slideIndex]?.descriptionHi}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Core Highlights Grid */}
      <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/60 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-stone-850 tracking-tight">
            {t.keyFeatures}
          </h3>
          <p className="text-sm text-stone-500 font-light">
            {lang === 'en'
              ? "Every aspect of our pedagogy is designed to ensure wholesome cognitive and character elevation."
              : "हमारे पठन-पाठन का प्रत्येक हिस्सा बच्चों के मानसिक और चारित्रिक विकास को ध्यान में रखकर तैयार किया गया है।"}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-stone-150 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg w-fit ${item.color}`}>
                    <Icon className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="font-bold text-stone-800 text-base">
                    {lang === 'en' ? item.titleEn : item.titleHi}
                  </h4>
                  <p className="text-xs text-stone-505 leading-relaxed text-stone-500">
                    {lang === 'en' ? item.descEn : item.descHi}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Immersive School Support Donation Teaser Card */}
      <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-6 md:p-8 border border-red-500/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.03] pointer-events-none select-none">
          <Heart className="w-56 h-56 text-red-950 fill-current" />
        </div>
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-100 text-red-850 font-bold text-[10px] rounded-full uppercase tracking-wider">
            <Heart className="w-3 h-3 fill-current text-red-600 animate-pulse" />
            {lang === 'en' ? "Support Education" : "विद्यार्थी सहयोग एवं दान"}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight leading-snug">
            {lang === 'en' ? "Assist in building our Computer Lab & Sports Gear" : "आधुनिक कंप्यूटर लैब व खेल सामग्री जुटाने में भागीदार बनें"}
          </h3>
          <p className="text-xs text-stone-550 leading-relaxed font-semibold">
            {lang === 'en'
              ? "Every check or donation directly funds modern study books, computer monitors, science lab equipment, or free uniforms for needy rural girls and boys of Kushinagar."
              : "आपका अत्यंत छोटा सा स्वैच्छिक योगदान भी सुदूर ग्रामीण अंचल के विद्यार्थियों को कंप्यूटर स्क्रीन, नैतिक पाठ्यपुस्तकें व उत्कृष्ट खेल उपकरण सुलभ कराने में सहायक सिद्ध होगा।"}
          </p>
        </div>
        <button
          onClick={() => setActiveTab('donations')}
          className="px-6 py-3 bg-red-800 hover:bg-red-950 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-lg cursor-pointer shrink-0 inline-flex items-center gap-2 select-none"
        >
          <span>{lang === 'en' ? "Donate & Support Now" : "सहयोग एवं दान करें"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Links & Highlights */}
      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        <div className="md:col-span-5 bg-stone-900 text-white rounded-2xl p-8 flex flex-col justify-between border border-stone-850 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-red-700/20 rounded-full blur-2xl" />
          <div className="space-y-4 relative z-10">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">{t.quickLinks}</h3>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              {lang === 'en'
                ? "Immediate digital pathways for school requirements, news updates, student registration, and general academic schedules."
                : "शैक्षणिक समय-सारणी, प्रवेश फॉर्म, नए समाचार और कार्यालय सहायता हेतु सीधे लिंक्स।"}
            </p>
          </div>
          
          <div className="space-y-3 pt-6 relative z-10 w-full">
            <button
              onClick={() => setActiveTab('admission')}
              className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 transition text-xs font-semibold cursor-pointer border border-white/5"
            >
              <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-yellow-400" /> {lang==='en' ? "Registration Form & Card Setup" : "प्रवेश फॉर्म व आईडी सेटअप"}</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 transition text-xs font-semibold cursor-pointer border border-white/5"
            >
              <span className="flex items-center gap-2"><Award className="w-4 h-4 text-emerald-400" /> {lang==='en' ? "Daily School Timetable" : "दैनिक समय-सारणी"}</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 transition text-xs font-semibold cursor-pointer border border-white/5"
            >
              <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-blue-400" /> {lang==='en' ? "Connect Directly (Contacts)" : "सीधे संपर्क करें (नंबर)"}</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Vision Quote Box */}
        <div className="md:col-span-7 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 flex flex-col justify-between shadow-sm relative">
          <div className="absolute bottom-4 right-4 text-7xl font-serif text-amber-500/10 pointer-events-none select-none">
            &ldquo;
          </div>
          <div className="space-y-4">
            <h4 className="text-amber-800 font-extrabold uppercase tracking-wide text-xs">
              {lang === 'en' ? "Our Underlying Purpose" : "हमारा मूल संकल्प"}
            </h4>
            <h3 className="text-xl md:text-3xl font-bold text-stone-900 leading-tight">
              &ldquo;{lang === 'en' 
                ? "Providing state of the art foundation, high ethical wisdom, and digital fluency to rural children, strictly keeping business commercialization away."
                : "ग्रामीण नौनिहालों को व्यावसायिक लालच से परे रखकर आधुनिक उत्कृष्ट बुनियादी शिक्षा और सुदृढ़ नैतिक संस्कारों से अभिसिंचित करना।"} &rdquo;
            </h3>
          </div>
          <div className="flex items-center gap-4 border-t border-amber-500/15 pt-6 mt-6">
            <div className="p-1 rounded-full bg-amber-200 text-stone-900">
              <SaraswatiLogo size={36} />
            </div>
            <div>
              <h5 className="font-bold text-stone-850 text-sm">Shree Gautam Muni Tiwari</h5>
              <p className="text-[10px] text-stone-550 font-medium">Founder & Manager / Senior Journalist & Farmer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
