import React, { useState } from 'react';
import { SCHOOL_INFO, TRANSLATIONS } from '../data';
import { Language } from '../types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, HelpCircle, UserCheck } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = TRANSLATIONS[lang];

  // Parents inquiry form state
  const [parentName, setParentName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [childClass, setChildClass] = useState("Class VI to VIII");
  const [queryText, setQueryText] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phoneNum || !queryText) {
      alert(lang==='en' ? "Please provide your Name, Mobile Number, and message." : "कृपया अपना नाम, मोबाइल नंबर और संदेश प्रदान करें।");
      return;
    }

    const newQuery = {
      id: "Q_" + Date.now().toString().slice(-5),
      parentName,
      phoneNum,
      childClass,
      queryText,
      date: new Date().toLocaleDateString('en-IN')
    };

    // Save locally
    const existing = JSON.parse(localStorage.getItem("school_queries") || "[]");
    localStorage.setItem("school_queries", JSON.stringify([...existing, newQuery]));

    setIsSent(true);
  };

  const clearQueryForm = () => {
    setParentName("");
    setPhoneNum("");
    setQueryText("");
    setIsSent(false);
  };

  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl font-extrabold text-stone-850 tracking-tight">
          {lang === 'en' ? "Get in Touch with Our Faculty" : "समस्त संपर्क सूत्र व सहायता पोर्टल"}
        </h2>
        <p className="text-stone-500 font-light text-sm">
          {lang === 'en' 
            ? "We maintain responsive direct lines with our regional parents. Contact the principal or office management below." 
            : "प्रत्येक अभिभावक का सुझाव और बच्चों की प्रगति हमारे लिए सर्वोपरि है। सीधा संपर्क या संदेश भेजने हेतु निम्न विकल्पों का उपयोग करें।"}
        </p>
      </div>

      {/* Grid: Details & Map Integration */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Contacts details column */}
        <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-8 select-text">
          <div className="space-y-6">
            <h3 className="font-extrabold text-stone-900 text-lg border-b border-stone-100 pb-3">
              {lang === 'en' ? "Direct Contact Directory" : "विद्यालय संपर्क विवरणिका"}
            </h3>

            <div className="space-y-4 text-xs">
              {/* Address details */}
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-red-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-800">{lang==='en' ? "Campus Location Address:" : "विद्यालय प्रांगण का डाक पता:"}</p>
                  <p className="text-stone-500 leading-relaxed">
                    {SCHOOL_INFO.addressEn}<br />
                    Siktiya, Uttar Pradesh IP-274305
                  </p>
                </div>
              </div>

              {/* Founder phone */}
              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-800">{lang==='en' ? "Founder & Manager Office:" : "प्रबंधक कार्यालय (श्री गौतम मुनि तिवारी):"}</p>
                  <p className="text-red-900 font-bold font-mono text-xs">+91 {SCHOOL_INFO.contactFounder}</p>
                </div>
              </div>

              {/* Principal phone */}
              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-red-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-800">{lang==='en' ? "Pradhancharya (Principal Helpline):" : "प्रधानाचार्य प्रकोष्ठ (श्री विजेंद्र कुमार तिवारी):"}</p>
                  <p className="text-red-900 font-bold font-mono text-xs">+91 {SCHOOL_INFO.contactPrincipal}</p>
                </div>
              </div>

              {/* Alt phone */}
              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-800">{lang==='en' ? "Alternate Campus Line:" : "वैकल्पिक दूरभाष केंद्र (सत्र पूछताछ):"}</p>
                  <p className="text-stone-600 font-bold font-mono text-xs">+91 {SCHOOL_INFO.contactAlt}</p>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-800">Email Correspondence:</p>
                  <p className="text-stone-500 font-mono text-[11px]">{SCHOOL_INFO.email}</p>
                </div>
              </div>

              {/* Open Hours */}
              <div className="flex gap-3 items-start">
                <Clock className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-stone-800">{lang==='en' ? "Visiting Office timings:" : "अभिभावक मिलने का समय (कार्यालय):"}</p>
                  <p className="text-stone-500 leading-relaxed">
                    {lang==='en' ? "Monday to Saturday: 08:30 AM - 01:30 PM" : "सोमवार से शनिवार: प्रातः 08:30 से दोपहर 01:30 बजे तक"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-150 select-none">
            <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5 mb-1 text-red-850">
              <UserCheck className="w-4 h-4" />
              {lang === 'en' ? "Parents-Faculty Trust" : "सच्चा मार्गदर्शक"}
            </span>
            <p className="text-[10.5px] leading-relaxed text-stone-500">
              {lang === 'en' 
                ? "Every parent has direct cell access to Shree Gautam Muni Tiwari ji and Princ. Vijendra Tiwari ji. We operate with complete accessibility."
                : "आप सीधे प्रबंधक जी या प्रधानाचार्य जी को कॉल कर सहयोग प्राप्त कर सकते हैं। हमारा विद्यालय पूर्णतः पारदर्शी संवाद का पक्षधर है।"}
            </p>
          </div>
        </div>

        {/* Map Embedding representation and parent inquiry form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Form */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-stone-850 text-base flex items-center gap-2">
              <span className="w-1.5 h-4 bg-red-800 rounded-sm"></span>
              {lang === 'en' ? "Parents-Faculty Collaboration Desk" : "अभिभावक-शिक्षक संवाद केंद्र"}
            </h3>

            {isSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">
                  {lang === 'en' ? "Query Submitted successfully!" : "परामर्श संदेश सफलतापूर्वक प्राप्त हुआ!"}
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                  {lang === 'en' ? "Our faculty team will analyze your request and connect back on your contact details." : "आपके संदेश को रजिस्टर में दर्ज कर लिया गया है। वरिष्ठ शिक्षक जल्द ही संपर्क करेंगे।"}
                </p>
                <div className="pt-2">
                  <button
                    onClick={clearQueryForm}
                    className="px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-xs font-bold cursor-pointer transition"
                  >
                    {lang === 'en' ? "Send Another Message" : "नया संदेश लिखें"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-stone-500">{lang==='en'?"Parent Full Name":"अभिभावक का नाम"}</label>
                    <input
                      type="text"
                      required
                      placeholder={lang==='en'?"e.g. Ramesh Tiwari" : "उदा. रमेश तिवारी"}
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full text-xs p-3 rounded-lg border border-stone-200 focus:border-red-800 ring-none outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-stone-500">{lang==='en'?"Mobile Contact Number":"सक्रिय मोबाइल नंबर"}</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="e.g. 91xxxxxxxx"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-xs p-3 rounded-lg border border-stone-200 focus:border-red-800 ring-none outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-stone-500">{lang==='en'?"Interested Class Level":"छात्र की वांछित कक्षा"}</label>
                  <select
                    value={childClass}
                    onChange={(e) => setChildClass(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-stone-200 focus:border-red-800 ring-none outline-none bg-white"
                  >
                    <option value="Nursery / KG">Nursery / LKG / UKG</option>
                    <option value="Class I to III">Class I to III</option>
                    <option value="Class IV to V">Class IV to V</option>
                    <option value="Class VI to VIII">Class VI to VIII</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold text-stone-500">{lang==='en'?"Your Message & Query Details":"परामर्श या पूछताछ संदेश"}</label>
                  <textarea
                    rows={2}
                    required
                    placeholder={lang==='en'?"e.g. Seeking bus convenience details, or fee concessions details." : "उदा. स्कूल बस सुविधा, या अतिरिक्त रियायतों के बारे में कुछ पूछें..."}
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-stone-200 focus:border-red-800 ring-none outline-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-stone-850 font-bold text-xs cursor-pointer shadow-sm transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {lang === 'en' ? "Submit Online Query Desk" : "संदेश भेजें"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Styled Dynamic Maps Placeholder representing Siktiya Coordinates */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <h4 className="font-extrabold text-stone-800 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-800" />
              {lang === 'en' ? "Campus Map & Route directions" : "गूगल मैप्स कैंपस नेविगेशन"}
            </h4>

            {/* Direct Static Map Visual Link to Siktiya Coordinates (Siktiya, Motichak/Muhammada route) */}
            <div className="relative h-[220px] rounded-xl overflow-hidden bg-stone-100 border border-stone-150 flex flex-col justify-end">
              {/* Symbolic styled grid depicting map roads */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #7f1d1d 1px, transparent 1px), linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)',
                  backgroundSize: '10px 10px, 40px 40px, 40px 40px',
                }}
              />
              
              {/* Symbolic pins representing the exact coordinates from the user: Maplink - RR73+6J, Siktiya, Uttar Pradesh 274305 */}
              <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center space-y-1">
                <div className="relative">
                  <MapPin className="w-10 h-10 text-red-700 animate-bounce" />
                  <span className="absolute inset-x-0 -bottom-1 h-2 w-4 bg-stone-900/10 rounded-full blur-xs mx-auto animate-ping" />
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg shadow-md border border-stone-250 border-red-150 text-center space-y-0.5">
                  <h6 className="font-bold text-stone-900 text-[10.5px]">Shree Brahma Ji Adarsh H.P. School</h6>
                  <p className="text-[9.5px] font-medium text-stone-500 font-mono">CODE: RR73+6J, Siktiya, Uttar Pradesh 274305</p>
                </div>
              </div>

              {/* Action route button to immediately open in Google Maps */}
              <div className="relative z-10 p-3 bg-stone-900 text-white flex justify-between items-center text-xs">
                <span>{lang==='en'?"Location coordinates: Siktiya, Motichak" : "अवस्थिति निर्देशांक: सिक्टिया, मोतीचक"}</span>
                <a
                  href="https://maps.google.com/?q=RR73+6J+Siktiya+Uttar+Pradesh+274305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-yellow-500 hover:bg-yellow-400 text-stone-900 font-bold text-[10px] uppercase select-none transition shadow"
                >
                  {lang === 'en' ? "Open In Google Maps" : "दिशा-निर्देश (गूगल मैप्स)"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
