import React, { useState, useEffect } from 'react';
import { StudentRecord, GalleryItem, NewsEvent, Language, DonationRecord } from '../types';
import { SCHOOL_INFO } from '../data';
import { ShieldAlert, Users, Database, ImagePlus, FileText, Lock, Plus, Trash2, Printer, Search, HelpCircle, Check, BookOpen, Heart } from 'lucide-react';

interface AdminPortalProps {
  lang: Language;
  students: StudentRecord[];
  onDeleteStudent: (id: string) => void;
  onAddGalleryItem: (item: GalleryItem) => void;
  onAddNewsEvent: (event: NewsEvent) => void;
  onGenerateIdCardForStudent: (student: StudentRecord) => void;
  galleryList: GalleryItem[];
  newsList: NewsEvent[];
  onDeleteGalleryItem: (id: string) => void;
  onDeleteNewsEvent: (id: string) => void;
}

export default function AdminPortal({
  lang,
  students,
  onDeleteStudent,
  onAddGalleryItem,
  onAddNewsEvent,
  onGenerateIdCardForStudent,
  galleryList,
  newsList,
  onDeleteGalleryItem,
  onDeleteNewsEvent
}: AdminPortalProps) {
  
  // Lock passcode authentication
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Sub-tabs in Admin
  const [adminActiveSubTab, setAdminActiveSubTab] = useState<'students' | 'publisher' | 'queries' | 'manualUploadHelp' | 'donations'>('students');

  // Search/Filters in student list
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  // Donations ledger state
  const [adminDonations, setAdminDonations] = useState<DonationRecord[]>([]);

  // Gallery publishing state
  const [galImageBase64, setGalImageBase64] = useState("");
  const [galTitleEn, setGalTitleEn] = useState("");
  const [galTitleHi, setGalTitleHi] = useState("");
  const [galCategory, setGalCategory] = useState<'Celebration' | 'Sports' | 'Academic' | 'Rangoli' | 'Plantation' | 'Infrastructure' | 'Other'>('Celebration');
  const [galDescEn, setGalDescEn] = useState("");
  const [galDescHi, setGalDescHi] = useState("");
  const [galDate, setGalDate] = useState(new Date().toISOString().slice(0, 10));

  // News publishing state
  const [newsTitleEn, setNewsTitleEn] = useState("");
  const [newsTitleHi, setNewsTitleHi] = useState("");
  const [newsContentEn, setNewsContentEn] = useState("");
  const [newsContentHi, setNewsContentHi] = useState("");
  const [newsCategory, setNewsCategory] = useState<'News' | 'Event' | 'Achievement'>('News');
  const [newsDate, setNewsDate] = useState(new Date().toISOString().slice(0, 10));

  // Saved Parent queries state
  const [queriesList, setQueriesList] = useState<any[]>([]);

  // Messages/Confirmations
  const [publishSuccessMsg, setPublishSuccessMsg] = useState("");

  // Load parent queries from localStorage
  useEffect(() => {
    const qList = JSON.parse(localStorage.getItem("school_queries") || "[]");
    setQueriesList(qList);

    // Load donations record list
    const list = localStorage.getItem("sbj_school_donations");
    if (list) {
      try {
        setAdminDonations(JSON.parse(list));
      } catch (e) {}
    }
  }, [adminActiveSubTab]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError(lang === 'en' ? "Incorrect passcode. Use '1234' to test." : "गलत कूट शब्द। परीक्षण हेतु '1234' का उपयोग करें।");
    }
  };

  const handleGalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalImageBase64(String(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galImageBase64 || !galTitleEn || !galTitleHi) {
      alert("Please upload an image and fill out at least english and hindi titles!");
      return;
    }

    const newItem: GalleryItem = {
      id: "DYN_GAL_" + Date.now().toString().slice(-4),
      imageUrl: galImageBase64,
      titleEn: galTitleEn,
      titleHi: galTitleHi,
      category: galCategory,
      descriptionEn: galDescEn || "School dynamic archive item",
      descriptionHi: galDescHi || "सत्र गतिशील गतिविधि अभिलेख",
      date: galDate
    };

    onAddGalleryItem(newItem);
    setPublishSuccessMsg("✨ Gallery item published successfully!");

    // Reset Form fields
    setGalImageBase64("");
    setGalTitleEn("");
    setGalTitleHi("");
    setGalDescEn("");
    setGalDescHi("");

    setTimeout(() => setPublishSuccessMsg(""), 4000);
  };

  const handlePublishNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitleEn || !newsTitleHi || !newsContentEn || !newsContentHi) {
      alert("Please fill in news titles and contents in both English and Hindi!");
      return;
    }

    const newEvent: NewsEvent = {
      id: "DYN_NEWS_" + Date.now().toString().slice(-4),
      titleEn: newsTitleEn,
      titleHi: newsTitleHi,
      contentEn: newsContentEn,
      contentHi: newsContentHi,
      date: newsDate,
      category: newsCategory
    };

    onAddNewsEvent(newEvent);
    setPublishSuccessMsg("✨ School news published successfully!");

    // Reset News
    setNewsTitleEn("");
    setNewsTitleHi("");
    setNewsContentEn("");
    setNewsContentHi("");

    setTimeout(() => setPublishSuccessMsg(""), 4000);
  };

  const handleDeleteQuery = (id: string) => {
    const updated = queriesList.filter((q: any) => q.id !== id);
    localStorage.setItem("school_queries", JSON.stringify(updated));
    setQueriesList(updated);
  };

  const handleVerifyDonation = (id: string, newStatus: 'Verified' | 'Cancelled' | 'Pending') => {
    const updated = adminDonations.map(don => {
      if (don.id === id) {
        return { ...don, status: newStatus };
      }
      return don;
    });
    setAdminDonations(updated);
    localStorage.setItem("sbj_school_donations", JSON.stringify(updated));
  };

  const handleDeleteDonation = (id: string) => {
    if (confirm(lang === 'en' ? "Permanently delete this donation record?" : "क्या आप इस भुगतान रिकॉर्ड को स्थायी रूप से हटाना चाहते हैं?")) {
      const updated = adminDonations.filter(don => don.id !== id);
      setAdminDonations(updated);
      localStorage.setItem("sbj_school_donations", JSON.stringify(updated));
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = classFilter === "All" || student.academicClass.toLowerCase().includes(classFilter.toLowerCase());
    
    return matchesSearch && matchesClass;
  });

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center py-20 px-4">
        <form onSubmit={handleAuthSubmit} className="max-w-md w-full bg-white rounded-3xl border border-stone-200 shadow-2xl p-8 space-y-6 select-none">
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 bg-red-100 text-red-000 rounded-full text-red-800">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              {lang==='en' ? "Faculty Administrative Suite" : "प्रशासनिक सुरक्षा लॉक"}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
              {lang==='en' 
                ? "This dashboard lets faculty publish media and manage student registrations. Enter school passcode to log in."
                : "यहाँ कर्मचारी छात्र प्रवेश को प्रबंधित कर दीर्घा (गैलरी) अपडेट कर सकते हैं। लॉग इन करने हेतु पासवर्ड दर्ज करें।"}
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-left">
            <label className="block font-extrabold text-stone-605 text-stone-700 uppercase tracking-wide">
              {lang==='en' ? "Administrative passcode" : "सुरक्षित पिन / वर्तमान पासकी"}
            </label>
            <input
              type="password"
              placeholder={lang==='en'?"Enter '1234' to test" : "'1234' दर्ज करें"}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full text-sm p-3.5 rounded-xl border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none text-center font-mono tracking-widest font-black"
            />
            {authError && <p className="text-red-700 font-bold text-[11px] text-center mt-1">{authError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-red-850 hover:bg-red-800 bg-red-800 text-stone-50 font-bold text-xs uppercase tracking-wider cursor-pointer shadow transition"
          >
            {lang === 'en' ? "Verify & Unlock Suite" : "सत्यापित कर पैनल लॉगिन करें"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-10 selection:bg-red-100">
      {/* Admin Title Board */}
      <div className="p-6 bg-red-800 text-white rounded-3xl border border-red-900 shadow-md flex justify-between items-center flex-wrap gap-4 select-none">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-yellow-300 tracking-widest">School Management Database</span>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
            {lang === 'en' ? 'Shree Brahma Ji Adarsh Faculty Portal' : 'श्री ब्रह्मा जी विद्या प्रबन्धन डेस्क'}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-xl font-bold transition cursor-pointer"
          >
            {lang === 'en' ? "Secure Sign Out" : "सुरक्षित बाहर जाएँ"}
          </button>
        </div>
      </div>

      {/* Sub tabs selectors */}
      <div className="flex flex-wrap gap-1 border-b border-stone-250 pb-2 select-none">
        {[
          { id: 'students', labelEn: 'Student Records CRM', labelHi: 'छात्र रिकॉर्ड सूची', icon: Users },
          { id: 'publisher', labelEn: 'Dynamic Photo/News Publisher', labelHi: 'समाचार व फोटो प्रकाशक', icon: ImagePlus },
          { id: 'donations', labelEn: 'Donations & Ledger', labelHi: 'दान एवं बही प्रबन्धन', icon: Heart },
          { id: 'queries', labelEn: 'Parent Inquiries Desk', labelHi: 'अभिभावक शिकायत व सुझाव', icon: FileText },
          { id: 'manualUploadHelp', labelEn: 'Manual Asset Upload Guide', labelHi: 'मैन्युअल फोटो अपलोड गाइड', icon: HelpCircle },
        ].map((sub) => {
          const SubIcon = sub.icon;
          const isSelected = adminActiveSubTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setAdminActiveSubTab(sub.id as any);
                setPublishSuccessMsg("");
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                isSelected 
                  ? "bg-stone-900 text-white shadow-md"
                  : "text-stone-605 bg-stone-50 hover:bg-stone-100"
              }`}
            >
              <SubIcon className="w-4 h-4" />
              <span>{lang === 'en' ? sub.labelEn : sub.labelHi}</span>
            </button>
          )
        })}
      </div>

      {/* Success notification banner */}
      {publishSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-850 font-bold text-xs select-none">
          {publishSuccessMsg}
        </div>
      )}

      {/* Sub tabs context rendering */}
      {adminActiveSubTab === 'students' && (
        <div className="space-y-4 select-text">
          {/* Filters/Search box */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between select-none bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder={lang === 'en' ? "Search student, father name or ID..." : "छात्र का नाम, पिता या आईडी खोजें..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-stone-205 rounded-xl outline-none focus:border-red-800"
              />
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-xs font-bold text-stone-505 text-stone-500 whitespace-nowrap">{lang === 'en' ? "Class filter:" : "कक्षा छांटें:"}</span>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-stone-205 bg-white outline-none"
              >
                <option value="All">{lang==='en'?"All Classes" : "सभी कक्षाएं"}</option>
                <option value="Nursery">Nursery / KG</option>
                <option value="Class I to III">Class I to III</option>
                <option value="Class IV to V">Class IV to V</option>
                <option value="Class VI to VIII">Class VI to VIII</option>
              </select>
            </div>
          </div>

          {/* CRM Records Table */}
          <div className="overflow-x-auto bg-white border border-stone-200 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 font-mono text-[10px] border-b border-stone-200">
                  <th className="p-4 uppercase">{lang==='en'?"ID":"अनुक्रमांक (ID)"}</th>
                  <th className="p-4 uppercase">{lang==='en'?"Photo":"चित्र"}</th>
                  <th className="p-4 uppercase">{lang==='en'?"Student Details":"छात्र का नाम व माता-पिता"}</th>
                  <th className="p-4 uppercase">{lang==='en'?"Class level":"दाखिला कक्षा"}</th>
                  <th className="p-4 uppercase">{lang==='en'?"Aadhar Number":"आधार संख्या"}</th>
                  <th className="p-4 uppercase">{lang==='en'?"Emergency No.":"फोन नंबर"}</th>
                  <th className="p-4 uppercase text-right">{lang==='en'?"Action controls" : "प्रशासनिक क्रियाएं"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-stone-400 italic font-medium">
                      {lang === 'en' ? "No student registrations matching search criteria." : "कोई छात्र मेल नहीं खाता। एडमिशन फॉर्म टैब पर जाकर नया छात्र दर्ज करें।"}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((stud) => (
                    <tr key={stud.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="p-4 font-bold font-mono text-red-800">{stud.id}</td>
                      <td className="p-4">
                        <div className="w-10 h-12 rounded border bg-stone-100 overflow-hidden shrink-0">
                          <img src={stud.photoUrl} alt={stud.studentName} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-4 max-w-[200px]">
                        <h5 className="font-bold text-stone-900 text-sm leading-none">{stud.studentName}</h5>
                        <p className="text-[10px] text-stone-405 mt-1 text-stone-500 leading-none">F: {stud.fatherName}</p>
                        <p className="text-[9px] text-stone-405 mt-0.5 text-stone-400 leading-none">M: {stud.motherName}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[9px] uppercase">
                          {stud.academicClass}
                        </span>
                      </td>
                      <td className="p-4 font-mono">{stud.adharNumber}</td>
                      <td className="p-4 font-mono font-semibold">{stud.fatherContact}</td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => onGenerateIdCardForStudent(stud)}
                            className="bg-stone-900 text-white hover:bg-stone-800 px-3 py-1.5 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer select-none"
                          >
                            <Printer className="w-3.5 h-3.5" /> ID Card
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete student record? This operation is irreversible!")) {
                                onDeleteStudent(stud.id);
                              }
                            }}
                            className="text-red-700 bg-red-50 hover:bg-red-100 hover:text-red-800 p-2 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {adminActiveSubTab === 'publisher' && (
        <div className="grid md:grid-cols-2 gap-8 items-stretch select-none">
          {/* Image & Photo Publishing */}
          <form onSubmit={handlePublishPhotoSubmit} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-stone-850 text-sm flex items-center gap-2 border-b border-stone-100 pb-2">
              <Plus className="w-4 h-4 text-red-800" />
              {lang==='en'?"Add Photo to Public Gallery":"गैलरी में नई तस्वीर जोड़ें"}
            </h4>

            {/* Direct dynamic photo input as base64 */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">1. Select Visual Photo File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleGalFileUpload}
                className="w-full text-xs p-2 bg-stone-50 rounded border border-stone-200 cursor-pointer"
              />
              {galImageBase64 && (
                <div className="mt-2 w-32 aspect-video border rounded overflow-hidden">
                  <img src={galImageBase64} alt="Pre-publish Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">2. Gallery Category</label>
              <select
                value={galCategory}
                onChange={(e: any) => setGalCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 bg-white"
              >
                <option value="Celebration">Celebration (उत्सव)</option>
                <option value="Rangoli">Rangoli Artwork (रंगोली)</option>
                <option value="Plantation">Plantation Campaign (पौधरोपण)</option>
                <option value="Sports">Sports Day (खेल कूद)</option>
                <option value="Infrastructure">Infrastructure (भवन एवं गेट)</option>
              </select>
            </div>

            {/* En title */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">3. Title (English)</label>
              <input
                type="text"
                required
                placeholder="e.g. Independence Day Flag Hoisting"
                value={galTitleEn}
                onChange={(e) => setGalTitleEn(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            {/* Hi title */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">4. Title (Hindi / हिंदी)</label>
              <input
                type="text"
                required
                placeholder="उदा. स्वतंत्रता दिवस पर राष्ट्रीय ध्वजारोहण कार्यक्रम"
                value={galTitleHi}
                onChange={(e) => setGalTitleHi(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            {/* En desc */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">5. Description (English)</label>
              <textarea
                placeholder="Write specific details of event..."
                value={galDescEn}
                onChange={(e) => setGalDescEn(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            {/* Hi desc */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">6. Description (Hindi / हिंदी)</label>
              <textarea
                placeholder="विवरण हिंदी में विस्तार से लिखें..."
                value={galDescHi}
                onChange={(e) => setGalDescHi(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-red-800 hover:bg-red-750 text-white font-bold text-xs rounded-lg cursor-pointer"
            >
              🚀 Publish visual image
            </button>
          </form>

          {/* School Announcements Publishing */}
          <form onSubmit={handlePublishNewsSubmit} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-stone-850 text-sm flex items-center gap-2 border-b border-stone-100 pb-2">
              <Plus className="w-4 h-4 text-red-800" />
              {lang==='en'?"Post News & Achievements":"नवीन समाचार या महत्वपूर्ण सूचना पोस्ट करें"}
            </h4>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">1. Announcement Category</label>
              <select
                value={newsCategory}
                onChange={(e: any) => setNewsCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 bg-white"
              >
                <option value="News">Standard News Broadcast (समाचार)</option>
                <option value="Event">Cultural Event (सांस्कृतिक गतिविधि)</option>
                <option value="Achievement">Regional Achievement (छात्र उपलब्धि)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">2. Title (English)</label>
              <input
                type="text"
                required
                placeholder="e.g. Admission Registrations Open 2026"
                value={newsTitleEn}
                onChange={(e) => setNewsTitleEn(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">3. Title (Hindi / हिंदी)</label>
              <input
                type="text"
                required
                placeholder="उदा. सत्र 2026 के दाखिले का ऑनलाइन पंजीकरण शुरू"
                value={newsTitleHi}
                onChange={(e) => setNewsTitleHi(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">4. Content details (English)</label>
              <textarea
                rows={3}
                required
                placeholder="Write news content in english..."
                value={newsContentEn}
                onChange={(e) => setNewsContentEn(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-stone-500">5. Content details (Hindi / हिंदी)</label>
              <textarea
                rows={3}
                required
                placeholder="विवरण हिंदी में विस्तृत लिखें..."
                value={newsContentHi}
                onChange={(e) => setNewsContentHi(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-stone-200 focus:border-red-800 outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs rounded-lg cursor-pointer"
            >
              📢 Post Announcement
            </button>
          </form>

          {/* Active Photo Catalog Manager */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-stone-850 text-sm flex items-center gap-2 border-b border-stone-100 pb-2">
              <Trash2 className="w-4 h-4 text-red-800" />
              {lang === 'en' ? "Manage Installed Gallery Media" : "वर्तमान फोटो गैलरी हटाएँ व प्रबन्धन"}
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed font-semibold">
              {lang === 'en'
                ? "Every photo loaded in the gallery/homepage slideshow is listed here. Click the delete button to permanently remove default Unsplash/web images or your custom photos from this server's view."
                : "यहाँ गैलरी और मुख्य पृष्ठ स्लाइड शो की सभी तस्वीरें दर्ज हैं। अनुपयुक्त वेब तस्वीरों या अपनी तस्वीरों को पूरी तरह हटाने के लिए डिलीट बटन का उपयोग करें।"}
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryList.length === 0 ? (
                <p className="text-xs text-stone-400 italic col-span-full">{lang === 'en' ? "No photos in the gallery." : "गैलरी में कोई फोटो उपलब्ध नहीं है।"}</p>
              ) : (
                galleryList.map((item) => (
                  <div key={item.id} className="p-3 bg-stone-50 rounded-xl border border-stone-150 flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-10 h-10 rounded overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                        <img src={item.imageUrl} alt={item.titleEn} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="text-[11px] font-bold text-stone-900 truncate leading-none">
                          {lang === 'en' ? item.titleEn : item.titleHi}
                        </h5>
                        <p className="text-[9px] text-stone-400 font-mono mt-0.5 uppercase tracking-wider">
                          {item.id.startsWith("DYN_GAL_") ? "Uploaded Photo" : "Default Photo"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(lang === 'en' ? "Delete this photo immediately from entire school website?" : "क्या आप इस फोटो को वेबसाइट से स्थायी रूप से हटाना चाहते हैं?")) {
                          onDeleteGalleryItem(item.id);
                        }
                      }}
                      className="p-1.5 hover:bg-red-50 text-red-700 hover:text-red-800 rounded-lg cursor-pointer transition select-none"
                      title={lang === 'en' ? "Remove Photo" : "फोटो हटाएँ"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active News Listings Manager */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-stone-850 text-sm flex items-center gap-2 border-b border-stone-100 pb-2">
              <Trash2 className="w-4 h-4 text-red-800" />
              {lang === 'en' ? "Manage Active Broadcast News" : "सक्रिय समाचार व बोर्ड घोषणाएं प्रबन्धन"}
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {newsList.length === 0 ? (
                <p className="text-xs text-stone-400 italic col-span-full">{lang === 'en' ? "No news announcements listed." : "कोई घोषणा उपलब्ध नहीं है।"}</p>
              ) : (
                newsList.map((item) => (
                  <div key={item.id} className="p-3 bg-stone-50 rounded-xl border border-stone-150 flex items-center justify-between gap-3">
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[8px] uppercase tracking-wide">
                          {item.category}
                        </span>
                        <span className="text-[9px] text-stone-400 font-mono">{item.date}</span>
                      </div>
                      <h5 className="text-[11.5px] font-extrabold text-stone-900 mt-1 truncate">
                        {lang === 'en' ? item.titleEn : item.titleHi}
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(lang === 'en' ? "Delete this news post immediately?" : "क्या आप इस समाचार घोषणा को हटाना चाहते हैं?")) {
                          onDeleteNewsEvent(item.id);
                        }
                      }}
                      className="p-1.5 hover:bg-red-50 text-red-700 hover:text-red-800 rounded-lg cursor-pointer transition shrink-0 select-none"
                      title={lang === 'en' ? "Remove Post" : "हटाएँ"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {adminActiveSubTab === 'queries' && (
        <div className="space-y-4 select-text">
          <h4 className="font-extrabold text-stone-850 text-sm flex items-center gap-2 select-none">
            <Database className="w-5 h-5 text-emerald-800" />
            {lang==='en'?"Received Parent Inquiry Sheets":"अभिभावकों द्वारा भेजे गए संदेश सूची"}
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            {queriesList.length === 0 ? (
              <p className="text-xs text-stone-400 italic font-medium select-none">{lang==='en'?"No parent inquiries received in dashboard database yet.":"कोई शिकायत या पूछताछ संदेश डेटा अभी दर्ज नहीं हुआ हैं।"}</p>
            ) : (
              queriesList.map((q) => (
                <div key={q.id} className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex justify-between items-center select-none font-mono text-[10px] text-stone-450 border-b border-stone-200 pb-2">
                    <span>INQUIRY ID: {q.id}</span>
                    <span>Date: {q.date}</span>
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-stone-900 text-sm">{q.parentName}</h5>
                    <p className="text-xs font-semibold text-emerald-800">Interested in: {q.childClass}</p>
                  </div>
                  <p className="text-xs text-stone-600 bg-white p-3 rounded-lg border border-stone-150 font-light italic">
                    &ldquo;{q.queryText}&rdquo;
                  </p>
                  <div className="flex justify-between items-center select-none pt-2 font-mono text-[11px]">
                    <span className="font-bold text-red-850 flex items-center gap-1">📞 {q.phoneNum}</span>
                    <button
                      onClick={() => handleDeleteQuery(q.id)}
                      className="text-red-700 bg-red-50 hover:bg-red-100 font-bold px-2.5 py-1.5 rounded text-[10px] cursor-pointer"
                    >
                      Delete Inquiry
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {adminActiveSubTab === 'donations' && (
        <div className="space-y-4 select-text">
          <h4 className="font-extrabold text-stone-850 text-sm flex items-center gap-2 select-none border-b border-stone-150 pb-2">
            <Heart className="w-5 h-5 text-red-800 fill-current" />
            {lang === 'en' ? "Donations Ledger Database (Registered Pledges)" : "विद्यालय दान बहीखाता डेटाबेस (पंजीकृत रसीदें)"}
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            {adminDonations.length === 0 ? (
              <p className="text-xs text-stone-400 italic font-medium select-none col-span-full py-6 text-center bg-white border border-dashed rounded-xl">
                {lang === 'en' ? "No donation notifications received in database yet." : "कोई दान या सुपुर्दगी रसीद अभी दर्ज नहीं हुयी हैं।"}
              </p>
            ) : (
              adminDonations.map((don) => (
                <div key={don.id} className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center select-none font-mono text-[10px] text-stone-400 border-b border-stone-100 pb-2">
                    <span>RECORD ID: {don.id}</span>
                    <span>Date: {don.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1 overflow-hidden">
                      <h5 className="font-extrabold text-stone-900 text-sm truncate">{don.donorName}</h5>
                      <p className="text-[11px] font-mono text-stone-500 truncate">
                        IFSC/REF: <span className="font-bold text-red-900 select-all">{don.referenceNumber}</span>
                      </p>
                      {don.email && <p className="text-[10px] text-stone-400 font-mono truncate">{don.email}</p>}
                      {don.phone && <p className="text-[10px] text-stone-400 font-mono">{don.phone}</p>}
                    </div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-red-800 to-amber-950 text-white rounded-xl font-mono font-black text-xs shrink-0 select-none shadow-sm">
                      ₹{don.amount.toLocaleString()}
                    </div>
                  </div>

                  {don.message && (
                    <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-150 font-medium italic">
                      &ldquo;{don.message}&rdquo;
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-1.5 select-none">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">{lang === 'en' ? 'STATUS:' : 'स्थिति:'}</span>
                      {don.status === 'Pending' ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[9px] uppercase tracking-wide">
                          {lang === 'en' ? 'Pending Acknowledgment' : 'जांच लंबित'}
                        </span>
                      ) : don.status === 'Verified' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase tracking-wide flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5" />
                          {lang === 'en' ? 'Verified (Shown on Roll)' : 'सत्यापित प्राप्त'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[9px] uppercase tracking-wide">
                          {lang === 'en' ? 'Cancelled / Fake' : 'विफल / निरस्त'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 select-none shrink-0 ml-auto">
                      {don.status === 'Pending' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleVerifyDonation(don.id, 'Verified')}
                            className="bg-emerald-700 hover:bg-emerald-850 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer transition shadow-xs"
                          >
                            {lang === 'en' ? 'Acknowledge' : 'प्राप्त प्रमाणित करें'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleVerifyDonation(don.id, 'Cancelled')}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10.5px] font-bold px-2 py-1.5 rounded-lg cursor-pointer transition border border-stone-200"
                          >
                            {lang === 'en' ? 'Cancel' : 'निरस्त'}
                          </button>
                        </>
                      )}
                      
                      {don.status !== 'Pending' && (
                        <button
                          type="button"
                          onClick={() => handleVerifyDonation(don.id, 'Pending')}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold px-2 py-1 select-none cursor-pointer rounded-lg border border-stone-200"
                        >
                          {lang === 'en' ? 'Investigate Again' : 'जांच रीसेट करें'}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteDonation(don.id)}
                        className="p-1.5 hover:bg-red-50 text-red-700 hover:text-red-950 rounded-lg cursor-pointer transition"
                        title={lang === 'en' ? 'Delete Record' : 'रिकॉर्ड स्वतंत्र डिलीट करें'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {adminActiveSubTab === 'manualUploadHelp' && (
        <div className="p-8 bg-white border border-stone-200 rounded-3xl space-y-6 select-text">
          <div className="space-y-2 border-b border-stone-150 pb-4 select-none">
            <h4 className="font-black text-stone-850 text-base lg:text-lg">
              {lang === 'en' ? "Dynamic Content Upload & Manual Setup Guide" : "मैन्युअल फोटो अपलोड एवं डायनामिक डेटा निर्देशन गाइड"}
            </h4>
            <p className="text-xs text-stone-500">
              {lang==='en'
                ? "This instruction kit describes how to manage photos, sliders, and achievements both dynamically through the browser dashboard and directly in the codebase."
                : "यह अनुभाग संक्षेप में वर्णन करता है कि किस प्रकार बिना कोडिंग को छेड़े ब्राउज़र से अथवा कोडिंग फाइल द्वारा आप स्थायी रूप से तस्वीरें और सूचनाएँ जोड़ सकते हैं।"}
            </p>
          </div>

          <div className="space-y-6 text-xs text-stone-700 leading-relaxed md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            {/* English Guide */}
            <div className="space-y-4">
              <h5 className="font-bold text-red-850 select-none uppercase tracking-wide flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> English Instructions
              </h5>
              
              <div className="space-y-3">
                <div className="p-3 bg-stone-50 rounded-lg">
                  <span className="font-bold text-stone-900 block mb-1">Trick 1: Admin Browser Publishing (Easiest)</span>
                  <p className="text-stone-550 leading-relaxed">
                    Use our built-in <strong>Dynamic Photo/News Publisher</strong> tab. Simply upload a local JPEG/PNG image from your device. The system immediately parses it into <strong>Base64 dynamic context</strong>, appends it into your local gallery array, and saves it in the browser's <code>localStorage</code> database. It persists instantly!
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg">
                  <span className="font-bold text-stone-900 block mb-1">Trick 2: Standard Codebase Injection</span>
                  <p className="text-stone-550 leading-relaxed">
                    To hardcode permanent images directly without database buffers, save your school's physical photographs inside the <code>/assets</code> folder in this workspace. Then, edit the <code>/src/data.ts</code> file and add a new record to the <code>PRESEEDED_GALLERY</code> array pointing to that asset.
                  </p>
                </div>
              </div>
            </div>

            {/* Hindi Guide */}
            <div className="space-y-4">
              <h5 className="font-bold text-red-850 select-none uppercase tracking-wide flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> हिंदी निर्देश व तरकीबें
              </h5>

              <div className="space-y-3">
                <div className="p-3 bg-stone-50 rounded-lg">
                  <span className="font-bold text-stone-900 block mb-1">तरकीब 1: ऑनलाइन ब्राउज़र प्रकाशक (अति सरल)</span>
                  <p className="text-stone-550 leading-relaxed">
                    इसी <strong>'समाचार व फोटो प्रकाशक'</strong> टैब का उपयोग करें। अपने कंप्यूटर या फ़ोन से कोई भी चित्र चुनें, यह तुरंत <strong>Base64 छवि</strong> में बदल जाएगा तथा सुरक्षित रूप से ब्राउज़र के लोकल डेटाबेस (<code>localStorage</code>) में दर्ज हो जाएगा। मुख्य पृष्ठ की दीर्घा में यह स्वयं आ जाएगा।
                  </p>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg">
                  <span className="font-bold text-stone-900 block mb-1">तरकीब 2: कोडिंग फ़ाइल में स्थायी परिवर्तन</span>
                  <p className="text-stone-550 leading-relaxed">
                    यदि आप इसे फाइल सिस्टम में पक्का जोड़ना चाहते हैं, तो स्कूल की तस्वीरों को वर्तमान डायरेक्टरी की <code>/assets</code> निर्देशिका में रखकर, मुख्य कोडिंग फ़ाइल <code>/src/data.ts</code> खोलें। वहाँ सूची में जाकर नयी तस्वीर के पाथ को सम्पादित कर जोड़ लें।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
