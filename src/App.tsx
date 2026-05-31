import React, { useState, useEffect } from 'react';
import { SCHOOL_INFO, TRANSLATIONS, PRESEEDED_GALLERY, PRESEEDED_DOCK_NEWS } from './data';
import { Language, StudentRecord, GalleryItem, NewsEvent } from './types';
import SaraswatiLogo from './components/SaraswatiLogo';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import AcademicsSection from './components/AcademicsSection';
import AdmissionSection from './components/AdmissionSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import AdminPortal from './components/AdminPortal';
import DonationSection from './components/DonationSection';

import { 
  Building, 
  Home, 
  Info, 
  BookOpen, 
  UserPlus, 
  Newspaper, 
  Mail, 
  Lock, 
  Globe, 
  Menu, 
  X, 
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

export default function App() {
  // Central Language State
  const [lang, setLang] = useState<Language>('en');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic state for Gallery, News and Students
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [newsList, setNewsList] = useState<NewsEvent[]>([]);
  const [students, setStudents] = useState<StudentRecord[]>([]);

  // Load persistent records from localStorage
  useEffect(() => {
    // 1. Photo Gallery initialization
    const storedGallery = localStorage.getItem("sbj_custom_gallery");
    const deletedPreseededGal = JSON.parse(localStorage.getItem("sbj_deleted_preseeded_gallery") || "[]");
    const activePreseededGal = PRESEEDED_GALLERY.filter(item => !deletedPreseededGal.includes(item.id));
    
    let parsedGal: GalleryItem[] = [];
    if (storedGallery) {
      try {
        parsedGal = JSON.parse(storedGallery);
      } catch (e) {}
    }
    setGalleryList([...parsedGal, ...activePreseededGal]);

    // 2. School News Broadcast initialization
    const storedNews = localStorage.getItem("sbj_custom_news");
    const deletedPreseededNews = JSON.parse(localStorage.getItem("sbj_deleted_preseeded_news") || "[]");
    const activePreseededNews = PRESEEDED_DOCK_NEWS.filter(item => !deletedPreseededNews.includes(item.id));
    
    let parsedNews: NewsEvent[] = [];
    if (storedNews) {
      try {
        parsedNews = JSON.parse(storedNews);
      } catch (e) {}
    }
    setNewsList([...parsedNews, ...activePreseededNews]);

    // 3. Registered students database initialization
    const storedStudents = localStorage.getItem("sbj_custom_students");
    if (storedStudents) {
      try {
        setStudents(JSON.parse(storedStudents));
      } catch (e) {
        setStudents([]);
      }
    } else {
      setStudents([]);
    }
  }, []);

  const handleDeleteGalleryItem = (id: string) => {
    const storedGallery = localStorage.getItem("sbj_custom_gallery");
    let customList: GalleryItem[] = [];
    if (storedGallery) {
      try { customList = JSON.parse(storedGallery); } catch (e) {}
    }
    
    const updatedCustom = customList.filter(item => item.id !== id);
    localStorage.setItem("sbj_custom_gallery", JSON.stringify(updatedCustom));
    
    if (!id.startsWith("DYN_GAL_")) {
      const deletedPreseeded = JSON.parse(localStorage.getItem("sbj_deleted_preseeded_gallery") || "[]");
      const updatedDeleted = [...deletedPreseeded, id];
      localStorage.setItem("sbj_deleted_preseeded_gallery", JSON.stringify(updatedDeleted));
    }
    
    const deletedPreseededIds = JSON.parse(localStorage.getItem("sbj_deleted_preseeded_gallery") || "[]");
    const activePreseeded = PRESEEDED_GALLERY.filter(item => !deletedPreseededIds.includes(item.id));
    setGalleryList([...updatedCustom, ...activePreseeded]);
  };

  const handleDeleteNewsEvent = (id: string) => {
    const storedNews = localStorage.getItem("sbj_custom_news");
    let customList: NewsEvent[] = [];
    if (storedNews) {
      try { customList = JSON.parse(storedNews); } catch (e) {}
    }
    
    const updatedCustom = customList.filter(item => item.id !== id);
    localStorage.setItem("sbj_custom_news", JSON.stringify(updatedCustom));
    
    if (!id.startsWith("DYN_NEWS_")) {
      const deletedPreseeded = JSON.parse(localStorage.getItem("sbj_deleted_preseeded_news") || "[]");
      const updatedDeleted = [...deletedPreseeded, id];
      localStorage.setItem("sbj_deleted_preseeded_news", JSON.stringify(updatedDeleted));
    }
    
    const deletedPreseededIds = JSON.parse(localStorage.getItem("sbj_deleted_preseeded_news") || "[]");
    const activePreseeded = PRESEEDED_DOCK_NEWS.filter(item => !deletedPreseededIds.includes(item.id));
    setNewsList([...updatedCustom, ...activePreseeded]);
  };

  const handleNewAdmission = (newRecord: StudentRecord) => {
    const updated = [newRecord, ...students];
    setStudents(updated);
    localStorage.setItem("sbj_custom_students", JSON.stringify(updated));
  };

  const handleDeleteStudent = (id: string) => {
    const updated = students.filter(st => st.id !== id);
    setStudents(updated);
    localStorage.setItem("sbj_custom_students", JSON.stringify(updated));
  };

  const handleAddGalleryItem = (newItem: GalleryItem) => {
    // We add to the top of dynamic file
    const storedGallery = localStorage.getItem("sbj_custom_gallery");
    let baseList: GalleryItem[] = [];
    if (storedGallery) {
      try { baseList = JSON.parse(storedGallery); } catch(e){}
    }
    const updatedCustom = [newItem, ...baseList];
    localStorage.setItem("sbj_custom_gallery", JSON.stringify(updatedCustom));
    setGalleryList([newItem, ...galleryList]);
  };

  const handleAddNewsEvent = (newEvent: NewsEvent) => {
    const storedNews = localStorage.getItem("sbj_custom_news");
    let baseList: NewsEvent[] = [];
    if (storedNews) {
      try { baseList = JSON.parse(storedNews); } catch(e){}
    }
    const updatedCustom = [newEvent, ...baseList];
    localStorage.setItem("sbj_custom_news", JSON.stringify(updatedCustom));
    setNewsList([newEvent, ...newsList]);
  };

  // Switch to ID Generator in Admission page with specific student card preselected
  const handleGenerateIdCardForStudent = (student: StudentRecord) => {
    setActiveTab('admission');
    // Scroll to the generated ID badge area
    setTimeout(() => {
      const container = document.getElementById("students-print-badge-container");
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const t = TRANSLATIONS[lang];

  // List of tabs
  const navigationItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'about', label: t.aboutUs, icon: Info },
    { id: 'academics', label: t.academics, icon: BookOpen },
    { id: 'admission', label: t.admission, icon: UserPlus },
    { id: 'news', label: t.newsEvents, icon: Newspaper },
    { id: 'donations', label: t.donate || (lang === 'en' ? 'Support & Donations' : 'सहयोग व दान'), icon: Heart },
    { id: 'contact', label: t.contact, icon: Mail },
    { id: 'admin', label: t.adminPanel, icon: Lock }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans select-none antialiased">
      
      {/* 1. Double deck elegant bilingually styled header */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-sm select-none">
        
        {/* Top Info mini Bar */}
        <div className="bg-gradient-to-r from-red-900 to-amber-950 text-white py-2 px-4 shadow-inner text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-200">
              <span className="font-semibold text-yellow-400">❖ {t.govtRecognized}</span>
              <span className="opacity-75 font-mono">UDISE: {SCHOOL_INFO.udiseCode}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-semibold text-yellow-300">
              <span className="flex items-center gap-1">📞 +91 {SCHOOL_INFO.contactFounder}</span>
              <span className="flex items-center gap-1">📍 Kushinagar</span>
            </div>
          </div>
        </div>

        {/* Primary Navbar Area */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & School Branding */}
          <div 
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <SaraswatiLogo size={52} className="hover:rotate-6 transition duration-300" />
            <div>
              <h1 className="text-sm md:text-base lg:text-lg font-black text-red-900 tracking-tight leading-none uppercase">
                {lang === 'en' ? 'Shree Brahma Ji Adarsh' : 'श्री ब्रह्मा जी आदर्श'}
              </h1>
              <p className="text-[10px] md:text-[11px] font-bold text-amber-800 tracking-wide mt-1 leading-none">
                H.P. SCHOOL, KUSHINAGAR (U.P.)
              </p>
              <span className="text-[8px] text-stone-400 font-mono tracking-widest block mt-0.5 leading-none">
                ESTD. 2008 &rdquo;अमृतं हि विद्या&rdquo;
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Responsive display) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs">
            {navigationItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-extrabold transition cursor-pointer ${
                    isSelected 
                      ? 'bg-red-800 text-white shadow-sm'
                      : 'text-stone-650 hover:bg-stone-50 hover:text-red-900'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Side: Global Language Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Language toggle button */}
            <div className="bg-stone-100 p-1.5 rounded-xl border border-stone-250 flex items-center gap-1 relative shadow-inner">
              <Globe className="w-3.5 h-3.5 text-stone-400 ml-1.5" />
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-black transition cursor-pointer select-none ${
                  lang === 'en' 
                    ? "bg-stone-900 text-stone-50 shadow-sm" 
                    : "text-stone-550 hover:text-stone-900"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-lg text-[10.5px] font-black transition cursor-pointer select-none ${
                  lang === 'hi' 
                    ? "bg-red-800 text-white shadow-sm" 
                    : "text-stone-550 hover:text-stone-900"
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Mobile Hamburger menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl lg:hidden transition cursor-pointer"
              aria-label="Toggle Navigation Screen"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white shadow-lg p-4 space-y-2 select-none">
            {navigationItems.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-red-800 text-white shadow-sm'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <IconComp className="w-4 h-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* 2. Main content rendering window */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-10 select-none">
        {activeTab === 'home' && (
          <HomeSection 
            lang={lang} 
            setActiveTab={handleTabChange} 
            galleryList={galleryList} 
          />
        )}
        {activeTab === 'about' && (
          <AboutSection lang={lang} />
        )}
        {activeTab === 'academics' && (
          <AcademicsSection lang={lang} />
        )}
        {activeTab === 'admission' && (
          <AdmissionSection 
            lang={lang} 
            onNewAdmission={handleNewAdmission} 
          />
        )}
        {activeTab === 'news' && (
          <NewsSection 
            lang={lang} 
            galleryList={galleryList} 
            newsList={newsList} 
          />
        )}
        {activeTab === 'donations' && (
          <DonationSection lang={lang} />
        )}
        {activeTab === 'contact' && (
          <ContactSection lang={lang} />
        )}
        {activeTab === 'admin' && (
          <AdminPortal 
            lang={lang} 
            students={students} 
            onDeleteStudent={handleDeleteStudent}
            onAddGalleryItem={handleAddGalleryItem}
            onAddNewsEvent={handleAddNewsEvent}
            onGenerateIdCardForStudent={handleGenerateIdCardForStudent}
            galleryList={galleryList}
            newsList={newsList}
            onDeleteGalleryItem={handleDeleteGalleryItem}
            onDeleteNewsEvent={handleDeleteNewsEvent}
          />
        )}
      </main>

      {/* 3. Footer */}
      <footer className="bg-stone-900 border-t border-stone-850 text-white select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid sm:grid-cols-2 md:grid-cols-12 gap-10 items-start">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <SaraswatiLogo size={36} />
              <h4 className="font-extrabold text-sm tracking-tight text-yellow-300">
                {lang==='en' ? "SHREE BRAHMA JI ADARSH H.P. SCHOOL" : "श्री ब्रह्मा जी आदर्श एच.पी. विद्यालय"}
              </h4>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
              {lang === 'en' 
                ? "Registered Since 2008. Dedicated to providing moral foundation & qualitative rural guidance without business interest."
                : "मान्यता प्राप्त वर्ष 2008। लोक-हितार्थ सेवा भाव से बच्चों को आधुनिक शिक्षा देने हेतु कृतसंकल्पित ग्रामीण संस्थान।"}
            </p>
          </div>

          <div className="md:col-span-4 space-y-3 font-mono text-xs text-stone-430 text-stone-400">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px] select-text">{lang==='en'?"POSTAL COORDINATES":"डाक पता व स्थान"}</h5>
            <p className="leading-relaxed select-text">
              <strong>Campus:</strong> {SCHOOL_INFO.addressEn}<br />
              <strong>Coordinates:</strong> RR73+6J, Siktiya, UP 274305
            </p>
            <p className="select-text">Email ID: {SCHOOL_INFO.email}</p>
          </div>

          <div className="md:col-span-4 space-y-3 font-mono text-xs text-stone-400">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">{lang==='en'?"OFFICE DESK PHONE":"परामर्श टेलीफोन सूची"}</h5>
            <p className="space-y-1.5 select-text">
              <span className="block"><strong>Founder Gautam Tiwari:</strong> +91 {SCHOOL_INFO.contactFounder}</span>
              <span className="block"><strong>Principal Vijendra Tiwari:</strong> +91 {SCHOOL_INFO.contactPrincipal}</span>
              <span className="block flex items-center gap-1 text-yellow-300"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Government Affiliated No. 2008-09</span>
            </p>
          </div>
        </div>

        <div className="border-t border-stone-850 p-6 text-center text-xs text-stone-500 font-mono select-none bg-stone-950 space-y-2">
          <p>© {new Date().getFullYear()} {SCHOOL_INFO.nameEn}. All Rights Reserved. U-DISE Code: {SCHOOL_INFO.udiseCode}</p>
          <div className="text-[10px] text-stone-600 flex flex-wrap items-center justify-center gap-1.5 font-sans">
            <span>{lang === 'en' ? "Designed & Developed by" : "वेबसाइट अभिकल्पना व निर्माण:"}</span>
            <span className="font-extrabold text-amber-500 hover:text-amber-400 transition">
              Mr. Ankitkumar Dwivedi (B.E. Mechanical)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
