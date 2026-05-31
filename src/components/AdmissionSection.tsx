import React, { useState } from 'react';
import { TRANSLATIONS, FEE_STRUCTURE, SCHOOL_INFO, ACADEMIC_CLASSES } from '../data';
import { Language, StudentRecord } from '../types';
import { FileText, ClipboardList, Wallet, Image, Download, CheckCircle, HelpCircle, Sparkles, Printer, UserPlus } from 'lucide-react';
import SaraswatiLogo from './SaraswatiLogo';

interface AdmissionSectionProps {
  lang: Language;
  onNewAdmission: (newRecord: StudentRecord) => void;
}

export default function AdmissionSection({ lang, onNewAdmission }: AdmissionSectionProps) {
  const t = TRANSLATIONS[lang];

  // Forms states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [fatherContact, setFatherContact] = useState("");
  const [alternateContact, setAlternateContact] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [adharNumber, setAdharNumber] = useState("");
  const [academicClass, setAcademicClass] = useState("Class VI to VIII");
  const [photoBase64, setPhotoBase64] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newlyCreatedStudent, setNewlyCreatedStudent] = useState<StudentRecord | null>(null);

  // MOCK default photo
  const DEFAULT_STUDENT_AVATAR = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=300";

  // Check file upload and convert to base64
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(String(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !fatherName || !motherName || !fatherContact) {
      alert(lang === 'en' ? "Please fill in all the required fields (First Name, Father's Name, Mother's Name, Contact Number)." : "कृपया सभी आवश्यक क्षेत्र भरें (प्रथम नाम, पिता का नाम, माता का नाम, फोन नंबर)।");
      return;
    }

    const newStudent: StudentRecord = {
      id: "STUD_" + Date.now().toString().slice(-6),
      studentName: `${firstName} ${lastName}`.trim(),
      fatherName: fatherName,
      lastName: lastName,
      motherName: motherName,
      height: height || "135 cm",
      weight: weight || "32 kg",
      address: address || "Muhammad Barwapatti, Motichak",
      fatherContact: fatherContact,
      alternateContact: alternateContact || SCHOOL_INFO.contactPrincipal,
      bloodGroup: bloodGroup,
      adharNumber: adharNumber || "-----",
      photoUrl: photoBase64 || DEFAULT_STUDENT_AVATAR,
      admissionDate: new Date().toLocaleDateString('en-IN'),
      academicClass: academicClass,
      status: 'Approved' // Auto approve for instant demonstration of ID card
    };

    onNewAdmission(newStudent);
    setNewlyCreatedStudent(newStudent);
    setIsSubmitted(true);
  };

  // Reset Form for another registration
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setFatherName("");
    setMotherName("");
    setHeight("");
    setWeight("");
    setAddress("");
    setFatherContact("");
    setAlternateContact("");
    setBloodGroup("O+");
    setAdharNumber("");
    setPhotoBase64("");
    setIsSubmitted(false);
    setNewlyCreatedStudent(null);
  };

  const invokePrint = () => {
    window.print();
  };

  // Pre-fill mock data for quick testing/generating
  const fillMockDataEn = () => {
    setFirstName("Aryan");
    setLastName("Tiwari");
    setFatherName("Gaurav Tiwari");
    setMotherName("Kavita Tiwari");
    setHeight("142 cm");
    setWeight("35 kg");
    setAddress("Siktiya village, Motichak, Kushinagar");
    setFatherContact("9123456789");
    setAlternateContact("8877665544");
    setBloodGroup("B+");
    setAdharNumber("5467 8901 2345");
    setAcademicClass("Class VI to VIII");
  };

  return (
    <div className="space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl font-extrabold text-stone-850 tracking-tight">
          {lang === 'en' ? "Student Registration & ID Card Suite" : "छात्र प्रवेश और पहचान पत्र निर्माण गृह"}
        </h2>
        <p className="text-stone-500 font-light text-sm">
          {lang === 'en' 
            ? "Submit the legal admission form below to enroll your child and instantly generate an printable official student ID card." 
            : "अपने बच्चे के विवरण के साथ नीचे दिया गया प्रवेश फॉर्म भरें और अपनी सुविधानुसार प्रिंट होने वाला छात्र पहचान पत्र (आईडी कार्ड) प्राप्त करें।"}
        </p>
      </div>

      {/* Grid: Admissions Guidelines & Fee details */}
      <div className="grid lg:grid-cols-2 gap-8 select-none">
        {/* Fees Table */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-bold text-stone-850 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <Wallet className="w-5 h-5 text-red-800" />
            {lang === 'en' ? "Bilingual School Fee Structure" : "विद्यालय की अति-सुलभ शुल्क तालिका"}
          </h3>
          <p className="text-xs text-stone-500">
            {lang==='en' ? "As part of our mission, school fees are kept highly competitive with zero hidden charges." : "निःशक्त व किसान परिवारों के हितार्थ विशेष रियायतों के साथ हमारी शुल्क विवरणिका निम्न है:"}
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-150">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-stone-500">
                <tr>
                  <th className="p-3 font-semibold">{lang==='en' ? "Class Level" : "कक्षा का स्तर"}</th>
                  <th className="p-3 font-semibold">{lang==='en' ? "Admission Fee" : "प्रवेश शुल्क"}</th>
                  <th className="p-3 font-semibold">{lang==='en' ? "Monthly Fee" : "मासिक शुल्क"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-150">
                {FEE_STRUCTURE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="p-3 font-bold text-stone-850">{lang === 'en' ? row.classEn : row.classHi}</td>
                    <td className="p-3 text-red-850 font-medium">{lang === 'en' ? row.admissionFeeEn : row.admissionFeeHi}</td>
                    <td className="p-3 font-semibold">{lang === 'en' ? row.feeMonthEn : row.feeMonthHi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Requirements and process */}
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-stone-850 text-base flex items-center gap-2 border-b border-stone-150 pb-2">
            <ClipboardList className="w-5 h-5 text-emerald-800" />
            {lang === 'en' ? "System Requirements & Documents" : "प्रवेश हेतु आवश्यक दस्तावेज और प्रक्रिया"}
          </h3>
          
          <ul className="space-y-2.5 text-xs text-stone-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full shrink-0 mt-1.5"></span>
              <span><strong>Adhar Card</strong> {lang==='en' ? "(Required for student identity card generation)" : "(छात्र पहचान पत्र विवरण हेतु अनिवार्य)"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full shrink-0 mt-1.5"></span>
              <span><strong>3 Passport Photos</strong> {lang==='en' ? "(Original physical photos alongside digital uploader)" : "(दाखिले के समय कार्यालय में जमा करने हेतु)"}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full shrink-0 mt-1.5"></span>
              <span><strong>Previous Report Card & Transfer Certificate (TC)</strong> {lang==='en' ? "(From prior recognized school)" : "(पूर्व विद्यालय का स्थानांतरण प्रमाण पत्र - यदि लागू हो)"}</span>
            </li>
          </ul>

          <div className="bg-white p-4 rounded-xl border border-stone-200 text-[11px] leading-relaxed text-stone-500">
            <h4 className="font-bold text-stone-850 mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
              {lang==='en'?"Alternative Admission Support" : "सहायता परामर्श"}
            </h4>
            <p>
              {lang==='en'
                ? "Facing connectivity limits? Parents are invited to register at our Motichak campus directly under principal Shree Vijendra Kumar Tiwari (+91 9984135693)."
                : "यदि आपको ऑनलाइन पंजीकरण में समस्या आ रही है, तो विद्यालय प्रांगण में आकर प्रधानाचार्य श्री विजेंद्र कुमार तिवारी (9984135693) से सीधे प्रवेश फॉर्म भरवाएं।"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Form Column OR ID CARDS DISPLAY */}
      {isSubmitted && newlyCreatedStudent ? (
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 md:p-8 space-y-8 select-text">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black text-emerald-900 tracking-tight">
              {lang === 'en' ? "Enrollment Registered Successfully!" : "छात्र प्रवेश सफलतापूर्वक दर्ज हुआ!"}
            </h3>
            <p className="text-xs text-emerald-700">
              {lang === 'en' 
                ? "The database has saved student information records. Print the student's laminated ID badge directly below." 
                : "छात्र का रिकॉर्ड सुरक्षित सहेजा गया है। नीचे उसका डिजिटल पहचान पत्र (ID Card) तैयार है, इसे तुरंत प्रिंट करें।"}
            </p>
          </div>

          {/* Interactive ID Card Preview (Perfect Visual Replica) */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                #students-print-badge-container, #students-print-badge-container * {
                  visibility: visible;
                }
                #students-print-badge-container {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%) scale(1.3);
                }
              }
            `}</style>

            <div id="students-print-badge-container" className="w-[330px] h-[520px] bg-gradient-to-b from-stone-50 to-white rounded-2xl border-4 border-red-800 shadow-2xl relative flex flex-col justify-between overflow-hidden p-4 select-none">
              {/* ID Badge Header (Identical to Saraswati seal concept) */}
              <div className="text-center border-b-2 border-red-800 pb-2 flex items-center justify-between gap-1">
                <SaraswatiLogo size={42} className="shrink-0" />
                <div className="text-right flex-1">
                  <h4 className="text-[11px] font-black text-red-900 leading-tight uppercase leading-none">
                    {SCHOOL_INFO.nameEn}
                  </h4>
                  <p className="text-[7.5px] text-stone-500 font-mono mt-0.5 leading-none">
                    MUHAMMDA BARWAPATTI, MOTICHAK
                  </p>
                  <p className="text-[6.5px] text-stone-400 font-mono leading-none">
                     U-DISE: {SCHOOL_INFO.udiseCode}
                  </p>
                </div>
              </div>

              {/* ID Content */}
              <div className="flex flex-col items-center space-y-3 mt-2">
                {/* Photo frame */}
                <div className="relative w-24 h-28 border-2 border-red-800 rounded bg-stone-100 flex items-center justify-center overflow-hidden shadow-inner">
                  <img
                    src={newlyCreatedStudent.photoUrl}
                    alt={newlyCreatedStudent.studentName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h5 className="font-extrabold text-base text-stone-900 tracking-tight uppercase leading-none">
                    {newlyCreatedStudent.studentName}
                  </h5>
                  <p className="text-[10px] font-bold text-red-800 tracking-wider font-mono mt-1">
                    ID: {newlyCreatedStudent.id}
                  </p>
                  <span className="mt-1 inline-block px-3 py-0.5 rounded-full bg-red-800 text-white font-bold text-[9px] uppercase">
                    {newlyCreatedStudent.academicClass}
                  </span>
                </div>

                {/* Grid details */}
                <div className="w-full px-2 text-[10px] text-stone-700 space-y-1.5 border-t border-b border-stone-200/50 py-2.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-400">Father's Name:</span>
                    <span className="font-bold text-stone-800">{newlyCreatedStudent.fatherName}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-400">Mother's Name:</span>
                    <span className="font-bold text-stone-800">{newlyCreatedStudent.motherName}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-400">Blood Group:</span>
                    <span className="font-black text-red-700 font-mono">{newlyCreatedStudent.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-400">Adhar Number:</span>
                    <span className="font-semibold font-mono">{newlyCreatedStudent.adharNumber}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-400">Weight / Height:</span>
                    <span className="font-medium font-mono">{newlyCreatedStudent.weight} / {newlyCreatedStudent.height}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-400">Emergency Call:</span>
                    <span className="font-bold font-mono text-red-800">+91 {newlyCreatedStudent.fatherContact}</span>
                  </div>
                </div>
              </div>

              {/* ID Footer Card Seal and signatures */}
              <div className="flex items-end justify-between border-t border-stone-200 pt-1 mt-1 text-[7px] text-stone-400">
                <div className="space-y-0.5">
                  <p className="font-bold text-[#3a3a3a]">S.B.J.A.H.P.S Address:</p>
                  <p className="italic max-w-[170px] leading-relaxed">Muhammada Barwapatti, Siktiya, Kushinagar</p>
                </div>
                <div className="text-center flex flex-col items-center shrink-0">
                  <div className="h-4 w-12 border-b border-stone-300 relative flex items-center justify-center">
                    <span className="text-[6px] font-serif text-teal-800 select-none scale-90 -translate-y-1">G.M. Tiwari</span>
                  </div>
                  <p className="text-[6.5px] uppercase font-bold text-stone-600 mt-0.5">MANAGER SIGN</p>
                </div>
              </div>
            </div>

            {/* Print trigger button */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={invokePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-800 text-white hover:bg-red-750 font-bold text-xs cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4 animate-pulse" />
                {lang === 'en' ? "Print Student ID Badge" : "पहचान पत्र प्रिंट करें"}
              </button>
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-200 text-stone-800 hover:bg-stone-300 font-bold text-xs cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                {lang === 'en' ? "Enroll Another Child" : "नया दाखिला पंजीकृत करें"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-stone-150 pb-4 flex-wrap gap-2">
            <h3 className="font-extrabold text-stone-850 text-lg flex items-center gap-2">
              <span className="w-2 h-5 bg-red-800 rounded-sm inline-block"></span>
              {t.admissionForm}
            </h3>
            
            <button
              type="button"
              onClick={fillMockDataEn}
              className="text-xs font-bold text-amber-700 p-2 bg-amber-50 rounded bg-stone-100 hover:bg-amber-100/80 transition inline-block cursor-pointer select-none"
            >
              ⚡ {lang==='en' ? "Fill Mock Demo student Data" : "परीक्षण विवरण तुरंत भरें"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Student First Name" : "विद्यार्थी का नाम (First Name)"} <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Priyanshu / अमित"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
              />
            </div>

            {/* Student Last Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Student Last Name / Surname" : "उपनाम / सरनेम (Last Name)"}
              </label>
              <input
                type="text"
                placeholder="e.g. Tiwari / Singh"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
              />
            </div>

            {/* Father's Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Father's Full Name" : "पिता का पूरा नाम"} <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Shree Gautam Tiwari"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
              />
            </div>

            {/* Mother's Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Mother's Full Name" : "माता का नाम"} <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kiran Devi"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
              />
            </div>

            {/* Class Selecting */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Academic Class Choice" : "प्रवेशीय श्रेणी (कक्षा स्तर)"} <span className="text-red-700">*</span>
              </label>
              <select
                value={academicClass}
                onChange={(e) => setAcademicClass(e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 ring-none outline-none bg-white"
              >
                {ACADEMIC_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.nameEn}>
                    {lang === 'en' ? cls.nameEn : cls.nameHi}
                  </option>
                ))}
              </select>
            </div>

            {/* Adhar Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide flex justify-between">
                <span>{lang==='en' ? "Adhar Card Number (Optional)" : "आधार कार्ड संख्या (वैकल्पिक)"}</span>
                <span className="text-[10px] text-stone-400 capitalize">{lang==='en'?"Format: 12 digits" : "12 अंक"}</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 5467 8901 2345"
                value={adharNumber}
                onChange={(e) => setAdharNumber(e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none font-mono"
              />
            </div>

            {/* Heights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                  {lang==='en' ? "Student Height" : "छात्र की ऊँचाई"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. 138 cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                  {lang==='en' ? "Student Weight" : "छात्र का वजन"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. 33 kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
                />
              </div>
            </div>

            {/* Blood Groups */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Blood Group" : "रक्त समूह (Blood Group)"}
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 ring-none outline-none bg-white font-mono font-bold"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            {/* Contacts */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Father's Contact number" : "पिता का मुख्य मोबाइल नंबर"} <span className="text-red-700">*</span>
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="e.g. 9450231827"
                value={fatherContact}
                onChange={(e) => setFatherContact(e.target.value.replace(/\D/g, ''))}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800-800 focus:ring-1 focus:ring-red-800 outline-none font-mono"
              />
            </div>

            {/* Alternates contacts */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
                {lang==='en' ? "Alternate contact number" : "वैकल्पिक अभिभावक मोबाइल नंबर"}
              </label>
              <input
                type="tel"
                maxLength={10}
                placeholder="e.g. 9984135693"
                value={alternateContact}
                onChange={(e) => setAlternateContact(e.target.value.replace(/\D/g, ''))}
                className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none font-mono"
              />
            </div>
          </div>

          {/* Full Address */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">
              {lang==='en' ? "Home Address" : "स्थायी निवास का पता"}
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Village- Siktiya, Muhammada Barwapatti, Motichak, Kushinagar"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-sm p-3 rounded-lg border border-stone-205 focus:border-red-800-800 focus:ring-1 focus:ring-red-800 outline-none"
            />
          </div>

          {/* Picture Upload */}
          <div className="p-5 bg-stone-50 rounded-xl border-2 border-dashed border-stone-200 text-center space-y-4">
            <div className="inline-flex p-3 bg-red-100 text-red-800 rounded-full">
              <Image className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="font-extrabold text-xs text-stone-800">
                {lang === 'en' ? "Upload Student passport sized Digital Photo" : "छात्र का डिजिटल पासपोर्ट आकार फोटो अपलोड करें"}
              </p>
              <p className="text-[10px] text-stone-400">
                {lang==='en' ? "Accepted formats: PNG, JPG, JPEG (will instantly generate on the identity card)" : "JPEG, JPG, PNG फाइल (आईडी कार्ड पर तुरंत प्रदर्शित होगी)"}
              </p>
            </div>
            <div className="flex justify-center">
              <label className="px-4 py-2 bg-stone-200 hover:bg-stone-300 rounded-lg text-xs font-bold font-semibold text-stone-700 cursor-pointer transition select-none">
                {photoBase64 ? "✓ Photo Chosen" : (lang==='en'?"Choose Photo File" : "फ़ाइल चुनें")}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            {photoBase64 && (
              <div className="flex justify-center mt-2">
                <div className="w-16 h-20 rounded border overflow-hidden shadow">
                  <img src={photoBase64} alt="Chosen Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3.5 bg-red-800 hover:bg-red-750 font-bold text-white rounded-xl text-sm shadow-md flex items-center gap-2 cursor-pointer transition select-none"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              {lang === 'en' ? "Register Student & Produce Card" : "दाखिला दर्ज करें और पहचान पत्र बनाएं"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
