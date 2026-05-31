import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Users, 
  User, 
  CheckCircle, 
  X, 
  Plus, 
  Trash2, 
  Calendar, 
  FileText, 
  QrCode, 
  Upload, 
  CheckSquare, 
  Award, 
  Search, 
  DollarSign, 
  BookOpen, 
  Bell, 
  Clock,
  Printer,
  Shield
} from 'lucide-react';
import { StudentRecord, Language, GalleryItem } from '../types';
import { FACULTY_MEMBERS, ACADEMIC_CLASSES } from '../data';

interface LoginPortalProps {
  lang: Language;
  students: StudentRecord[];
  onAddGalleryItem: (item: GalleryItem) => void;
  galleryList: GalleryItem[];
  onDeleteGalleryItem: (id: string) => void;
  // Admin Portal callback pass-throughs
  renderAdminPortal: () => React.ReactNode;
}

export default function LoginPortal({
  lang,
  students,
  onAddGalleryItem,
  galleryList,
  onDeleteGalleryItem,
  renderAdminPortal
}: LoginPortalProps) {
  // Session variables
  const [activeRole, setActiveRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);

  // Auth Inputs
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');

  const [teachersList, setTeachersList] = useState<any[]>([]);
  const [selectedTeacherIndex, setSelectedTeacherIndex] = useState<number>(0);
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherError, setTeacherError] = useState('');
  const [loggedInTeacher, setLoggedInTeacher] = useState<any>(null);

  // Student login inputs
  const [studentMethod, setStudentMethod] = useState<'adhar' | 'select'>('select');
  const [studentAdhar, setStudentAdhar] = useState('');
  const [studentClassFilter, setStudentClassFilter] = useState('Nursery / KG');
  const [studentSelectId, setStudentSelectId] = useState('');
  const [loggedInStudent, setLoggedInStudent] = useState<StudentRecord | null>(null);
  const [studentError, setStudentError] = useState('');

  // Admin Custom Setup options
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [customLargeLogo, setCustomLargeLogo] = useState<string | null>(null);
  const [founderPhoto, setFounderPhoto] = useState<string | null>(null);
  const [donationQr, setDonationQr] = useState<string | null>(null);
  const [upiId, setUpiId] = useState('9450231827@paytm');
  
  // Dynamic portal users list for admins and teachers login
  const [portalUsers, setPortalUsers] = useState<any[]>([]);
  // Auth inputs for Admin (full login instead of just passcode)
  const [adminUsernameInput, setAdminUsernameInput] = useState('admin');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  
  // Create Portal account states
  const [newPortalFullName, setNewPortalFullName] = useState('');
  const [newPortalUsername, setNewPortalUsername] = useState('');
  const [newPortalRole, setNewPortalRole] = useState<'admin' | 'teacher'>('teacher');
  const [newPortalPassword, setNewPortalPassword] = useState('');
  const [portalUserMsg, setPortalUserMsg] = useState('');
  
  // Quick Photo uploading for Admin
  const [simplePhotoFile, setSimplePhotoFile] = useState<string>('');
  const [simplePhotoTitle, setSimplePhotoTitle] = useState('');
  const [simplePhotoType, setSimplePhotoType] = useState<'Celebration' | 'Sports' | 'Academic' | 'Other'>('Celebration');
  const [simplePhotoMsg, setSimplePhotoMsg] = useState('');

  // Add/Remove Teacher inputs
  const [newTeacherNameEn, setNewTeacherNameEn] = useState('');
  const [newTeacherNameHi, setNewTeacherNameHi] = useState('');
  const [newTeacherRoleEn, setNewTeacherRoleEn] = useState('');
  const [newTeacherRoleHi, setNewTeacherRoleHi] = useState('');
  const [newTeacherEduEn, setNewTeacherEduEn] = useState('');
  const [newTeacherEduHi, setNewTeacherEduHi] = useState('');
  const [teacherMsg, setTeacherMsg] = useState('');

  // Teacher Workspace state
  const [activeTeacherTab, setActiveTeacherTab] = useState<'attendance' | 'reports'>('attendance');
  const [attendanceClass, setAttendanceClass] = useState('Nursery / KG');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dailyAttendanceState, setDailyAttendanceState] = useState<Record<string, 'Present' | 'Absent'>>({});
  const [attendanceSuccessMsg, setAttendanceSuccessMsg] = useState('');

  // Class reports / homework writing state
  const [reportClass, setReportClass] = useState('Nursery / KG');
  const [reportDate, setReportDate] = useState(new Date().toISOString().slice(0, 10));
  const [reportSubject, setReportSubject] = useState('');
  const [reportTopic, setReportTopic] = useState('');
  const [reportHomework, setReportHomework] = useState('');
  const [reportSuccessMsg, setReportSuccessMsg] = useState('');

  // Loaded records
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [classReports, setClassReports] = useState<any[]>([]);

  // Init custom configurations
  useEffect(() => {
    // 1. Teachers
    const storedTeachers = localStorage.getItem("sbj_school_teachers");
    if (storedTeachers) {
      try { setTeachersList(JSON.parse(storedTeachers)); } catch(e) {}
    } else {
      setTeachersList(FACULTY_MEMBERS);
      localStorage.setItem("sbj_school_teachers", JSON.stringify(FACULTY_MEMBERS));
    }

    // Portal Access Users list initialization
    const storedUsers = localStorage.getItem("sbj_portal_users");
    if (storedUsers) {
      try {
        setPortalUsers(JSON.parse(storedUsers));
      } catch (e) {
        setPortalUsers([]);
      }
    } else {
      const defaultUsers = [
        { id: "u_admin", username: "admin", fullName: "School Principal (Admin)", role: "admin", password: "1234" },
        { id: "u_asst", username: "asst", fullName: "Assistant Operator (Admin)", role: "admin", password: "1234" },
        { id: "u_t1", username: "pramod", fullName: "Pramod Kumar Mishra (Teacher)", role: "teacher", password: "teacher123" },
        { id: "u_t2", username: "srinivas", fullName: "Srinivas Singh (Teacher)", role: "teacher", password: "teacher123" },
      ];
      setPortalUsers(defaultUsers);
      localStorage.setItem("sbj_portal_users", JSON.stringify(defaultUsers));
    }

    // 2. Custom Images & Settings
    setCustomLogo(localStorage.getItem("sbj_custom_logo"));
    setCustomLargeLogo(localStorage.getItem("sbj_custom_large_logo"));
    setFounderPhoto(localStorage.getItem("sbj_founder_photo"));
    setDonationQr(localStorage.getItem("sbj_school_donation_qr"));
    const savedUpi = localStorage.getItem("sbj_school_upi_id");
    if (savedUpi) setUpiId(savedUpi);

    // 3. Attendance & Reports
    setAttendanceRecords(JSON.parse(localStorage.getItem("sbj_attendance_records") || "[]"));
    setClassReports(JSON.parse(localStorage.getItem("sbj_class_reports") || "[]"));
  }, []);

  // Sync teachers to localStorage on edits
  const saveTeachersToLocalStorage = (updated: any[]) => {
    setTeachersList(updated);
    localStorage.setItem("sbj_school_teachers", JSON.stringify(updated));
    // Trigger window storage event to alert other components
    window.dispatchEvent(new Event("storage"));
  };

  // Admin authenticate
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = adminUsernameInput.trim().toLowerCase();
    
    // Find matching admin user in portals list
    const matchedAdmin = portalUsers.find(u => 
      u.username.toLowerCase() === cleanUser && 
      u.password === adminPasswordInput && 
      u.role === 'admin'
    );

    // Support backward-compatible checks
    const isPasscodeCompat = (cleanUser === 'admin' || cleanUser === '') && (adminPasswordInput === '1234' || adminPasscode === '1234');
    const isLegacyDirectPasscode = adminPasscode === '1234' || adminPasswordInput === '1234';

    if (matchedAdmin || isPasscodeCompat || isLegacyDirectPasscode) {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError(lang === 'en' 
        ? "Invalid Admin Operator ID or Password. Try 'admin' and '1234'." 
        : "गलत प्रशासनिक यूजरनाम या पासवर्ड। परीक्षण के लिए 'admin' और '1234' डालें।");
    }
  };

  // Teacher authenticate
  const handleTeacherAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedObj = teachersList[selectedTeacherIndex];
    if (!selectedObj) return;

    // Try finding dynamic operator account or legacy test mode
    const cleanTeacherName = selectedObj.nameEn || '';
    const matchedPortal = portalUsers.find(u => 
      u.role === 'teacher' && 
      u.password === teacherPassword &&
      (u.fullName.toLowerCase().includes(cleanTeacherName.toLowerCase()) || 
       u.username.toLowerCase() === cleanTeacherName.toLowerCase() ||
       cleanTeacherName.toLowerCase().includes(u.fullName.toLowerCase()))
    );

    const isDefaultTestPass = teacherPassword === 'teacher123' || teacherPassword === '1234';

    if (matchedPortal || isDefaultTestPass) {
      setLoggedInTeacher(selectedObj);
      setIsTeacherLoggedIn(true);
      setTeacherError('');
    } else {
      setTeacherError(lang === 'en' 
        ? "Incorrect Password. Check operator setting or use 'teacher123' to test." 
        : "गलत पासवर्ड। परीक्षण के लिए 'teacher123' डालें।");
    }
  };

  // Student login
  const handleStudentAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentMethod === 'adhar') {
      const match = students.find(s => s.adharNumber.trim() === studentAdhar.trim());
      if (match) {
        setLoggedInStudent(match);
        setIsStudentLoggedIn(true);
        setStudentError('');
      } else {
        setStudentError(lang === 'en' 
          ? "No registered student found with this Adhar Number." 
          : "इस आधार नंबर के साथ कोई पंजीकृत छात्र नहीं मिला।");
      }
    } else {
      const match = students.find(s => s.id === studentSelectId);
      if (match) {
        setLoggedInStudent(match);
        setIsStudentLoggedIn(true);
        setStudentError('');
      } else {
        setStudentError(lang === 'en' 
          ? "Please select a classmate from the list." 
          : "कृपया सूची से एक छात्र का चयन करें।");
      }
    }
  };

  // Portal Operator/User Account Handlers
  const handleCreatePortalUser = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = newPortalUsername.trim().toLowerCase();
    if (!cleanUsername) return;
    
    // Check duplication
    if (portalUsers.some(u => u.username.toLowerCase() === cleanUsername)) {
      setPortalUserMsg(lang === 'en' ? "❌ Error: Username already taken!" : "❌ त्रुटि: यह यूजरनाम पहले से उपयोग में है!");
      return;
    }
    
    const newUser = {
      id: "u_" + Date.now().toString().slice(-6),
      username: cleanUsername,
      fullName: newPortalFullName,
      role: newPortalRole,
      password: newPortalPassword || "1234",
    };
    
    const updated = [...portalUsers, newUser];
    setPortalUsers(updated);
    localStorage.setItem("sbj_portal_users", JSON.stringify(updated));
    setNewPortalFullName('');
    setNewPortalUsername('');
    setNewPortalPassword('');
    setPortalUserMsg(lang === 'en' ? "✅ Portal Access Account Registered!" : "✅ पोर्टल यूजर अकाउंट सफलतापूर्वक पंजीकृत!");
    setTimeout(() => setPortalUserMsg(""), 3000);
  };

  const handleResetPortalUserPassword = (userId: string, targetName: string) => {
    const rawPass = prompt(
      lang === 'en' 
        ? `Enter preferred new password for operator/user "${targetName}":`
        : `ऑपरेटर/यूजर "${targetName}" के लिए नया पासवर्ड डालें:`
    );
    if (rawPass === null) return;
    const newPass = rawPass.trim();
    if (!newPass) {
      alert(lang === 'en' ? "Password cannot be left blank!" : "पासवर्ड खाली नहीं हो सकता!");
      return;
    }
    
    const updated = portalUsers.map(u => u.id === userId ? { ...u, password: newPass } : u);
    setPortalUsers(updated);
    localStorage.setItem("sbj_portal_users", JSON.stringify(updated));
    alert(lang === 'en' ? "Password reset successfully!" : "पासवर्ड सफलतापूर्वक बदला गया!");
  };

  const handleDeletePortalUser = (userId: string, targetName: string) => {
    if (userId === "u_admin") {
      alert(lang === 'en' ? "Core master Admin operator cannot be deleted!" : "मुख्य मास्टर एडमिन ऑपरेटर को हटाया नहीं जा सकता!");
      return;
    }
    if (confirm(lang === 'en' ? `Permanently delete user account "${targetName}"?` : `क्या आप यूजर एकाउंट "${targetName}" को स्थायी रूप से हटाना चाहते हैं?`)) {
      const updated = portalUsers.filter(u => u.id !== userId);
      setPortalUsers(updated);
      localStorage.setItem("sbj_portal_users", JSON.stringify(updated));
    }
  };

  // Handle Dynamic File uploads (Logo, Founder, QR)
  const processImageUpload = (file: File, keyName: string, successCallback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = String(reader.result);
      localStorage.setItem(keyName, base64String);
      successCallback(base64String);
      alert(lang === 'en' ? "Photo updated and saved successfully!" : "फोटो को सफलतापूर्वक सहेज लिया गया है!");
      // reload other components
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  };

  // Admin: Remove teacher
  const handleRemoveTeacher = (idxToRemove: number) => {
    const backup = [...teachersList];
    const filtered = backup.filter((_, i) => i !== idxToRemove);
    saveTeachersToLocalStorage(filtered);
    setTeacherMsg(lang === 'en' ? "Teacher removed successfully!" : "शिक्षक को हटा दिया गया है!");
    setTimeout(() => setTeacherMsg(''), 3000);
  };

  // Admin: Add teacher
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherNameEn || !newTeacherNameHi || !newTeacherRoleEn || !newTeacherRoleHi) {
      setTeacherMsg(lang === 'en' ? "Please fulfill teacher details!" : "कृपया शिक्षक के नाम व पद का विवरण पूरा करें!");
      return;
    }
    const newTeach = {
      nameEn: newTeacherNameEn,
      nameHi: newTeacherNameHi,
      roleEn: newTeacherRoleEn,
      roleHi: newTeacherRoleHi,
      eduEn: newTeacherEduEn || "Academic Mentor",
      eduHi: newTeacherEduHi || "शिक्षक"
    };
    const updated = [...teachersList, newTeach];
    saveTeachersToLocalStorage(updated);
    setNewTeacherNameEn('');
    setNewTeacherNameHi('');
    setNewTeacherRoleEn('');
    setNewTeacherRoleHi('');
    setNewTeacherEduEn('');
    setNewTeacherEduHi('');
    setTeacherMsg(lang==='en' ? "New Teacher added successfully!" : "नया शिक्षक सफलतापूर्वक जोड़ दिया गया है!");
    setTimeout(() => setTeacherMsg(''), 3000);
  };

  // Simple Photo Upload for Admin (Title only)
  const handleSimplePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simplePhotoFile || !simplePhotoTitle) {
      setSimplePhotoMsg(lang === 'en' ? "Please upload photo files and insert description" : "कृपया फोटो संचिका चुनें और 1 विवरण लिखें");
      return;
    }

    const newItem: GalleryItem = {
      id: `DYN_GAL_${Date.now()}`,
      imageUrl: simplePhotoFile,
      titleEn: simplePhotoTitle,
      titleHi: simplePhotoTitle,
      category: simplePhotoType as any,
      descriptionEn: simplePhotoTitle,
      descriptionHi: simplePhotoTitle,
      date: new Date().toISOString().slice(0, 10)
    };

    onAddGalleryItem(newItem);
    setSimplePhotoFile('');
    setSimplePhotoTitle('');
    setSimplePhotoMsg(lang === 'en' ? "Photo published successfully!" : "फोटो सफलतापूर्वक प्रकाशित किया गया!");
    setTimeout(() => setSimplePhotoMsg(''), 3000);
  };

  // Attendance logic: Submit
  const handleAttendanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save daily attendance records
    const record = {
      id: `att_${Date.now()}`,
      teacherName: loggedInTeacher?.nameEn || "Teacher",
      academicClass: attendanceClass,
      date: attendanceDate,
      attendance: dailyAttendanceState
    };

    // Filter old record for the same class and same date
    const updatedRecords = attendanceRecords.filter(r => !(r.academicClass === attendanceClass && r.date === attendanceDate));
    const finalRecords = [record, ...updatedRecords];

    setAttendanceRecords(finalRecords);
    localStorage.setItem("sbj_attendance_records", JSON.stringify(finalRecords));
    setAttendanceSuccessMsg(lang === 'en' ? "Daily Class Attendance recorded successfully!" : "दैनिक छात्र उपस्थिति सफलतापूर्वक सहेजी गई!");
    setTimeout(() => setAttendanceSuccessMsg(''), 3000);
  };

  // Submit Homework / Class Reports
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportSubject || !reportTopic) {
      alert(lang === 'en' ? "Please write Subject and Topics." : "कृपया विषय और पढ़ाए गए मुख्य पाठ की जानकारी लिखें।");
      return;
    }

    const newReport = {
      id: `rep_${Date.now()}`,
      teacherName: loggedInTeacher?.nameEn || "Teacher",
      academicClass: reportClass,
      date: reportDate,
      subject: reportSubject,
      topic: reportTopic,
      homework: reportHomework
    };

    const updated = [newReport, ...classReports];
    setClassReports(updated);
    localStorage.setItem("sbj_class_reports", JSON.stringify(updated));

    setReportSubject('');
    setReportTopic('');
    setReportHomework('');
    setReportSuccessMsg(lang === 'en' ? "Class task updated & shared successfully!" : "क्लास रिपोर्ट और होमवर्क सफलतापूर्वक साझा किया गया!");
    setTimeout(() => setReportSuccessMsg(''), 3000);
  };

  // Student panel attendance calculation
  const getStudentAttendanceStats = (studentId: string, studentClass: string) => {
    const studentHistory = attendanceRecords.filter(rec => rec.academicClass === studentClass);
    if (studentHistory.length === 0) return { totalDays: 0, presentDays: 0, percentage: 100 };

    let totalDays = studentHistory.length;
    let presentDays = 0;

    studentHistory.forEach(record => {
      if (record.attendance && record.attendance[studentId] === 'Present') {
        presentDays++;
      }
    });

    const percentage = Math.round((presentDays / totalDays) * 100);
    return { totalDays, presentDays, percentage };
  };

  const activeClassStudents = students.filter(st => st.academicClass === attendanceClass);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* 1. Header & Title block */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">
          {lang === 'en' ? "School Administration & Login Suite" : "विद्यालय प्रशासनिक एवं लॉगिन हब"}
        </h2>
        <p className="text-stone-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
          {lang === 'en' 
            ? "Access the unified dashboard securely. Select your designated department to log in."
            : "सुरक्षित एकीकृत पोर्टल में प्रवेश करें। आगे बढ़ने के लिए अपने संबंधित विभाग का चयन करें।"}
        </p>
      </div>

      {/* 2. Top Portal selection Cards (only when not logged in) */}
      {!isAdminLoggedIn && !isTeacherLoggedIn && !isStudentLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card A: Students login workspace */}
          <button
            onClick={() => setActiveRole('student')}
            className={`p-6 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-44 select-none ${
              activeRole === 'student' 
                ? 'bg-gradient-to-br from-red-800 to-amber-900 text-white border-red-950 shadow-md scale-[1.02]' 
                : 'bg-white text-stone-700 border-stone-200 hover:border-red-400'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white/10 w-fit">
              <User className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">
                {lang === 'en' ? "Classroom Student Login" : "विद्यार्थी लॉगिन (आईडी व रिपोर्ट)"}
              </h3>
              <p className="text-[11px] opacity-80 mt-1 font-semibold leading-relaxed">
                {lang === 'en' 
                  ? "View Digital ID Card, see homework assignments & access monthly attendance chart." 
                  : "प्रवेश पहचान पत्र देखें, दैनिक गृहकार्य पढ़ें व शिक्षक द्वारा चिह्नित उपस्थिति जांचें।"}
              </p>
            </div>
          </button>

          {/* Card B: Teachers login workspace */}
          <button
            onClick={() => setActiveRole('teacher')}
            className={`p-6 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-44 select-none ${
              activeRole === 'teacher' 
                ? 'bg-gradient-to-br from-red-800 to-amber-900 text-white border-red-950 shadow-md scale-[1.02]' 
                : 'bg-white text-stone-700 border-stone-200 hover:border-red-400'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white/10 w-fit">
              <Users className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">
                {lang === 'en' ? "Teacher Class Dashboard" : "शिक्षक एवं अध्यापन डैशबोर्ड"}
              </h3>
              <p className="text-[11px] opacity-80 mt-1 font-semibold leading-relaxed">
                {lang === 'en' 
                  ? "Mark daily attendance register, publish daily class reports & assign home-tasks." 
                  : "छात्रों की हाजिरी दर्ज करें, पढ़ाए गए विषयों का ब्यौरा दें व गृहकार्य अपडेट करें।"}
              </p>
            </div>
          </button>

          {/* Card C: Management Login */}
          <button
            onClick={() => setActiveRole('admin')}
            className={`p-6 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-44 select-none ${
              activeRole === 'admin' 
                ? 'bg-gradient-to-br from-red-800 to-amber-900 text-white border-red-950 shadow-md scale-[1.02]' 
                : 'bg-white text-stone-700 border-stone-200 hover:border-red-400'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white/10 w-fit">
              <Lock className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">
                {lang === 'en' ? "Management / Admin Desk" : "प्रबंधन एवं एडमिनिस्ट्रेटर डेस्क"}
              </h3>
              <p className="text-[11px] opacity-80 mt-1 font-semibold leading-relaxed">
                {lang === 'en'
                  ? "Configure custom school logo, modify QR Code and teachers list, verify dynamic admission forms."
                  : "विद्यालय का लोगो बदलें, दान भुगतान यूपीआई/क्यूआर अपडेट करें व नवीन प्रवेश स्वीकृत करें।"}
              </p>
            </div>
          </button>

        </div>
      )}

      {/* 3. Render Session Area or Login challenge */}
      
      {/* CASE A: STUDENT ACTIVE VIEW */}
      {activeRole === 'student' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
          {!isStudentLoggedIn ? (
            /* Student Challenge Form */
            <form onSubmit={handleStudentAuth} className="max-w-md mx-auto space-y-5">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full">Student Desk</span>
                <h3 className="text-lg font-black text-stone-850">{lang==='en' ? "Access Student Dashboard" : "विद्यार्थी लॉगिन द्वार"}</h3>
              </div>

              {/* Login Method Tab */}
              <div className="flex bg-stone-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setStudentMethod('select')}
                  className={`w-1/2 py-2 text-xs font-bold rounded-lg transition ${studentMethod === 'select' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
                >
                  {lang === 'en' ? "Select from Class List" : "वर्ग सूची से चुनें"}
                </button>
                <button
                  type="button"
                  onClick={() => setStudentMethod('adhar')}
                  className={`w-1/2 py-2 text-xs font-bold rounded-lg transition ${studentMethod === 'adhar' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
                >
                  {lang === 'en' ? "Use Adhar Number" : "आधार नंबर का उपयोग"}
                </button>
              </div>

              {studentMethod === 'adhar' ? (
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-extrabold text-stone-500">{lang === 'en' ? "Your Adhar Card Number" : "अपना आधार कार्ड नंबर दर्ज करें"}</label>
                  <input
                    type="password"
                    maxLength={14}
                    value={studentAdhar}
                    onChange={(e) => setStudentAdhar(e.target.value)}
                    placeholder="12-digit Aadhaar"
                    className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-red-800 focus:outline-none"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold text-stone-500">{lang === 'en' ? "Choose Class" : "कक्षा चुनें"}</label>
                    <select
                      value={studentClassFilter}
                      onChange={(e) => setStudentClassFilter(e.target.value)}
                      className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold bg-white cursor-pointer"
                    >
                      {ACADEMIC_CLASSES.map(cls => (
                        <option key={cls.id} value={cls.nameEn}>{lang === 'en' ? cls.nameEn : cls.nameHi}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold text-stone-500">{lang === 'en' ? "Select Student" : "विद्यार्थी का नाम चुनें"}</label>
                    <select
                      value={studentSelectId}
                      onChange={(e) => setStudentSelectId(e.target.value)}
                      className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold bg-white cursor-pointer"
                    >
                      <option value="">-- {lang==='en' ? "Select Classmate" : "छात्र का नाम चुनें"} --</option>
                      {students.filter(s => s.academicClass === studentClassFilter).map(st => (
                        <option key={st.id} value={st.id}>{st.studentName} S/O {st.fatherName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {studentError && <p className="text-xs font-bold text-red-600">{studentError}</p>}
              
              <button
                type="submit"
                className="w-full py-3 bg-red-800 hover:bg-stone-900 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition cursor-pointer"
              >
                {lang==='en'?"Unlock Dashboard & ID card" : "प्रोफाइल व विवरण अनलॉक करें"}
              </button>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 text-[10.5px] text-stone-500 font-semibold text-center leading-relaxed">
                {lang === 'en' 
                  ? "Note: First complete student admission registration in Admission section to log in."
                  : "ध्यान दें: लॉगिन करने हेतु पहले प्रवेश अनुभाग में जाकर छात्र पंजीकरण करें।"}
              </div>
            </form>
          ) : (
            /* Student Registered Workspace dashboard info */
            <div className="space-y-6">
              
              {/* Back Button */}
              <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-sm">
                    {loggedInStudent.studentName[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-stone-900 text-base">{loggedInStudent.studentName} S/O {loggedInStudent.fatherName}</h4>
                    <p className="text-xs font-semibold text-stone-400">Class: {loggedInStudent.academicClass} | Status: <span className="text-emerald-700 font-bold">{loggedInStudent.status}</span></p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setLoggedInStudent(null);
                    setIsStudentLoggedIn(false);
                  }}
                  className="px-4 py-2 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl font-bold text-xs cursor-pointer select-none"
                >
                  {lang==='en'?"Log Out" : "निकास (लॉगआउट)"}
                </button>
              </div>

              {/* Student Workspace layout */}
              <div className="grid md:grid-cols-12 gap-8 items-start">
                
                {/* Visual student meta badge card */}
                <div className="md:col-span-5 bg-gradient-to-br from-red-950 to-stone-900 text-white rounded-2xl p-6 shadow-sm border border-red-950 text-xs space-y-4">
                  <div className="text-center space-y-2 relative">
                    <div className="w-20 h-20 rounded-xl border-2 border-yellow-300 mx-auto overflow-hidden bg-stone-800 flex items-center justify-center">
                      {loggedInStudent.photoUrl ? (
                        <img src={loggedInStudent.photoUrl} alt="Student Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <User className="w-10 h-10 text-stone-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base tracking-tight">{loggedInStudent.studentName}</h4>
                      <p className="text-[10px] text-yellow-300 tracking-wide font-mono uppercase">ID: STU-{loggedInStudent.adharNumber?.slice(-4) || '2008'}</p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-4 font-semibold text-[11px] opacity-90">
                    <div className="flex justify-between">
                      <span className="text-stone-300">Father Name:</span>
                      <span className="font-bold text-white">{loggedInStudent.fatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-300">Mother Name:</span>
                      <span className="font-bold text-white">{loggedInStudent.motherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-300">Class Block:</span>
                      <span className="font-bold text-white">{loggedInStudent.academicClass}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-300">Aadhaar Card:</span>
                      <span className="font-mono text-white select-all">•••• •••• {loggedInStudent.adharNumber?.slice(-4) || 'XXXX'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between text-[11.5px]">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-400 animate-pulse" /> Attendance Rate:</span>
                      <span className="font-black text-yellow-300 text-sm">
                        {getStudentAttendanceStats(loggedInStudent.id, loggedInStudent.academicClass).percentage}%
                      </span>
                    </div>
                    <span className="text-[9px] text-stone-450 block text-right mt-1 opacity-70">
                      Calculated from {getStudentAttendanceStats(loggedInStudent.id, loggedInStudent.academicClass).totalDays} academic sessions
                    </span>
                  </div>
                </div>

                {/* Right details panel (Daily reports / Homework) */}
                <div className="md:col-span-7 space-y-6">
                  
                  {/* Attendance Visual Log */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
                    <h3 className="font-extrabold text-stone-900 text-sm tracking-wide flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-red-800" />
                      {lang === 'en' ? "Presence & Attendance Tracker" : "आपकी शैक्षणिक उपस्थिति रिकॉर्ड"}
                    </h3>
                    
                    <div className="bg-white p-4 rounded-xl border border-stone-150 flex items-center justify-between gap-4 text-xs font-semibold">
                      <div className="text-center p-2 border-r border-stone-150 flex-1">
                        <span className="text-stone-400 block text-[9.5px]">TOTAL TRACK DAYS</span>
                        <span className="text-stone-800 font-extrabold text-lg">
                          {getStudentAttendanceStats(loggedInStudent.id, loggedInStudent.academicClass).totalDays}
                        </span>
                      </div>
                      <div className="text-center p-2 border-r border-stone-150 flex-1">
                        <span className="text-stone-400 block text-[9.5px]">PRESENT SESSIONS</span>
                        <span className="text-emerald-700 font-extrabold text-lg">
                          {getStudentAttendanceStats(loggedInStudent.id, loggedInStudent.academicClass).presentDays}
                        </span>
                      </div>
                      <div className="text-center p-2 flex-1">
                        <span className="text-stone-400 block text-[9.5px]">PERCENT RATE</span>
                        <span className="text-amber-700 font-extrabold text-lg">
                          {getStudentAttendanceStats(loggedInStudent.id, loggedInStudent.academicClass).percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Attendance timeline calendar view */}
                    <div className="pt-2">
                      <h4 className="text-[10px] text-stone-500 font-extrabold uppercase mb-2 tracking-wider">Attendance Register History</h4>
                      <div className="max-h-36 overflow-y-auto space-y-2 pr-1 text-xs">
                        {attendanceRecords.filter(r => r.academicClass === loggedInStudent.academicClass).length === 0 ? (
                          <p className="text-stone-450 italic py-2">No attendance data recorded by teacher for your class yet.</p>
                        ) : (
                          attendanceRecords
                            .filter(r => r.academicClass === loggedInStudent.academicClass)
                            .map((attReg, idx) => {
                              const isPresent = attReg.attendance && attReg.attendance[loggedInStudent.id] === 'Present';
                              return (
                                <div key={idx} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg border border-stone-150 shadow-sm font-semibold">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                                    <span>{attReg.date}</span>
                                    <span className="text-[10px] text-stone-400 font-normal">by {attReg.teacherName}</span>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isPresent ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                    {isPresent ? "PRESENT (उपस्थित)" : "ABSENT (अनुपस्थित)"}
                                  </span>
                                </div>
                              );
                            })
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Daily Class Reports & Assignments assigned for student */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
                    <h3 className="font-extrabold text-stone-900 text-sm tracking-wide flex items-center gap-2 border-b border-stone-150 pb-2">
                      <BookOpen className="w-5 h-5 text-red-800" />
                      {lang === 'en' ? "Daily Homework & Subject Coverage" : "दैनिक गृहकार्य एवं विषय अध्यापन रिपोर्ट"}
                    </h3>

                    <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
                      {classReports.filter(r => r.academicClass === loggedInStudent.academicClass).length === 0 ? (
                        <div className="p-4 bg-white rounded-xl text-center border border-stone-150 text-xs italic text-stone-450">
                          {lang === 'en' ? "No class tasks published by your teachers yet." : "आपके शिक्षकों द्वारा कक्षा रिपोर्ट अभी तक प्रकाशित नहीं की गयी है।"}
                        </div>
                      ) : (
                        classReports
                          .filter(r => r.academicClass === loggedInStudent.academicClass)
                          .map((report, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-stone-150 shadow-sm relative text-xs space-y-2">
                              <div className="flex justify-between items-start font-bold">
                                <span className="bg-red-50 text-red-900 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                                  {report.subject}
                                </span>
                                <span className="text-[10px] text-stone-450">{report.date}</span>
                              </div>
                              
                              <div>
                                <h4 className="font-bold text-stone-800 text-[11px] uppercase tracking-wide">Class Topic Covered today:</h4>
                                <p className="text-stone-600 font-medium leading-relaxed bg-stone-50 p-2 rounded border border-stone-100 mt-1 select-text">
                                  {report.topic}
                                </p>
                              </div>

                              {report.homework && (
                                <div className="pt-1.5 border-t border-stone-100">
                                  <h4 className="font-bold text-red-800 text-[10.5px] uppercase tracking-wide flex items-center gap-1">
                                    <FileText className="w-3.5 h-3.5 text-red-700 animate-pulse" /> Homework Block (गृह कार्य):
                                  </h4>
                                  <p className="text-stone-700 font-extrabold leading-relaxed mt-1 whitespace-pre-wrap select-all">
                                    {report.homework}
                                  </p>
                                </div>
                              )}

                              <div className="text-[9.5px] text-stone-400 font-normal text-right">
                                Issued by: Shree {report.teacherName}
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CASE B: TEACHER ACTIVE VIEW */}
      {activeRole === 'teacher' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
          {!isTeacherLoggedIn ? (
            /* Teacher Login Form */
            <form onSubmit={handleTeacherAuth} className="max-w-md mx-auto space-y-5">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full">FACULTY CORNER</span>
                <h3 className="text-lg font-black text-stone-850">{lang==='en' ? "Teacher Dashboard Login" : "अध्यापक लॉगिन प्रवेश"}</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase font-extrabold text-stone-500">{lang === 'en' ? "Select Your Name" : "अपना नाम चुनें"}</label>
                <select
                  value={selectedTeacherIndex}
                  onChange={(e) => setSelectedTeacherIndex(Number(e.target.value))}
                  className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold bg-white cursor-pointer"
                >
                  {teachersList.map((t, idx) => (
                    <option key={idx} value={idx}>{lang === 'en' ? t.nameEn : t.nameHi}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase font-extrabold text-stone-500">{lang === 'en' ? "Security Password" : "सुरक्षा पासवर्ड दर्ज करें"}</label>
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="teacher123"
                  className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-red-800 focus:outline-none"
                />
              </div>

              {teacherError && <p className="text-xs font-bold text-red-600">{teacherError}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-red-800 hover:bg-stone-900 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition cursor-pointer"
              >
                {lang === 'en' ? "Authenticate Counselor" : "डैशबोर्ड अनलॉक करें"}
              </button>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 text-[10.5px] text-stone-500 font-semibold text-center leading-relaxed">
                {lang === 'en' 
                  ? "Note: Teachers can mark attendance registers and update homework. Default Password is 'teacher123'."
                  : "ध्यान दें: शिक्षक विद्यार्थी उपस्थिति व दैनिक होमवर्क भर सकते हैं। सुरक्षा पासवर्ड 'teacher123' है।"}
              </div>
            </form>
          ) : (
            /* Teacher active dashboard controls */
            <div className="space-y-6">
              
              {/* Back Button */}
              <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">{loggedInTeacher.nameEn}</h4>
                  <p className="text-xs text-red-800 font-semibold">{loggedInTeacher.roleEn} | {loggedInTeacher.eduEn}</p>
                </div>
                <button
                  onClick={() => {
                    setIsTeacherLoggedIn(false);
                    setLoggedInTeacher(null);
                    setTeacherPassword('');
                  }}
                  className="px-4 py-2 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl font-bold text-xs cursor-pointer select-none"
                >
                  {lang==='en'?"Log Out" : "निकास (लॉगआउट)"}
                </button>
              </div>

              {/* Sub navigation inside Teacher dashboard */}
              <div className="flex border-b border-stone-200 max-w-md">
                <button
                  onClick={() => setActiveTeacherTab('attendance')}
                  className={`flex-1 py-2.5 font-extrabold text-xs tracking-wider uppercase border-b-2 text-center transition ${
                    activeTeacherTab === 'attendance'
                      ? 'border-red-800 text-red-800'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {lang === 'en' ? "Daily Attendance" : "दैनिक हाजिरी रजिस्टर"}
                </button>
                <button
                  onClick={() => setActiveTeacherTab('reports')}
                  className={`flex-1 py-2.5 font-extrabold text-xs tracking-wider uppercase border-b-2 text-center transition ${
                    activeTeacherTab === 'reports'
                      ? 'border-red-800 text-red-800'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {lang === 'en' ? "Add Reports & Homework" : "गृहकार्य व क्लास रिपोर्ट दर्ज करें"}
                </button>
              </div>

              {/* Sub Tab Panel 1: Attendance Register */}
              {activeTeacherTab === 'attendance' && (
                <div className="space-y-6">
                  
                  {/* Select class block */}
                  <div className="grid sm:grid-cols-3 gap-4 items-end bg-stone-50 p-4 rounded-xl border border-stone-150">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-stone-400">{lang === 'en' ? "Target Class Unit" : "अपेक्षित कक्षा चुनें"}</label>
                      <select
                        value={attendanceClass}
                        onChange={(e) => {
                          setAttendanceClass(e.target.value);
                          // Reset checklist
                          setDailyAttendanceState({});
                        }}
                        className="w-full p-2.5 border border-stone-250 rounded-lg text-xs font-semibold bg-white cursor-pointer"
                      >
                        {ACADEMIC_CLASSES.map(cls => (
                          <option key={cls.id} value={cls.nameEn}>{lang === 'en' ? cls.nameEn : cls.nameHi}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-stone-400">{lang === 'en' ? "Attendance Date" : "दैनिक तारीख"}</label>
                      <input
                        type="date"
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                        className="w-full p-2.5 border border-stone-250 rounded-lg text-xs font-semibold bg-white cursor-pointer"
                      />
                    </div>

                    <div className="text-xs text-stone-500 font-semibold p-2">
                      {activeClassStudents.length} registered students found in this block.
                    </div>
                  </div>

                  {/* Attendance students roster */}
                  <form onSubmit={handleAttendanceSubmit} className="space-y-4">
                    <div className="border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-stone-50 px-4 py-2 text-[10.5px] uppercase font-bold text-stone-500 tracking-wider grid grid-cols-12 border-b border-stone-200">
                        <div className="col-span-2">Reg ID</div>
                        <div className="col-span-5">Student Name</div>
                        <div className="col-span-5 text-right">Roster Status</div>
                      </div>

                      <div className="divide-y divide-stone-100 max-h-96 overflow-y-auto">
                        {activeClassStudents.length === 0 ? (
                          <div className="p-8 text-center text-stone-400 text-xs italic">
                            No students registered under academic unit "{attendanceClass}". Let admin add students first.
                          </div>
                        ) : (
                          activeClassStudents.map((st, idx) => {
                            const currentStatus = dailyAttendanceState[st.id] || 'Present';
                            return (
                              <div key={st.id} className="px-4 py-3 grid grid-cols-12 items-center text-xs font-semibold">
                                <div className="col-span-2 text-stone-400 font-mono">#{st.id.slice(-4)}</div>
                                <div className="col-span-5 text-stone-850">
                                  {st.studentName}
                                  <span className="block text-[9.5px] font-normal text-stone-400">S/O {st.fatherName}</span>
                                </div>
                                <div className="col-span-5 flex justify-end gap-2 text-xs">
                                  <button
                                    type="button"
                                    onClick={() => setDailyAttendanceState(prev => ({...prev, [st.id]: 'Present'}))}
                                    className={`px-3 py-1 bg-stone-100 border rounded font-black text-[10px] uppercase select-none cursor-pointer ${
                                      currentStatus === 'Present' 
                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-sm' 
                                        : 'text-stone-400 border-stone-200'
                                    }`}
                                  >
                                    Present
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDailyAttendanceState(prev => ({...prev, [st.id]: 'Absent'}))}
                                    className={`px-3 py-1 bg-stone-100 border rounded font-black text-[10px] uppercase select-none cursor-pointer ${
                                      currentStatus === 'Absent' 
                                        ? 'bg-red-100 text-red-800 border-red-400 shadow-sm' 
                                        : 'text-stone-400 border-stone-200'
                                    }`}
                                  >
                                    Absent
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {attendanceSuccessMsg && (
                      <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                        <CheckSquare className="w-4 h-4 text-emerald-600" /> {attendanceSuccessMsg}
                      </p>
                    )}

                    {activeClassStudents.length > 0 && (
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-red-800 hover:bg-stone-900 text-white rounded-xl font-bold uppercase text-[11px] tracking-wider cursor-pointer"
                      >
                        {lang === 'en' ? "Commit Registry Records" : "हाजिरी रजिस्टर सहेजें"}
                      </button>
                    )}
                  </form>

                </div>
              )}

              {/* Sub Tab Panel 2: Class Reports & Homework submission */}
              {activeTeacherTab === 'reports' && (
                <form onSubmit={handleReportSubmit} className="space-y-4 max-w-xl bg-stone-50 p-6 rounded-2xl border border-stone-200">
                  <h3 className="font-extrabold text-stone-900 text-sm border-b pb-2 mb-4">
                    {lang === 'en' ? "Publish Daily Homework Assignment" : "दैनिक गृहकार्य व पाठ अपडेट फॉर्म"}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-stone-400">{lang === 'en' ? "Select Class" : "कक्षा का चयन करें"}</label>
                      <select
                        value={reportClass}
                        onChange={(e) => setReportClass(e.target.value)}
                        className="w-full p-2.5 border border-stone-250 rounded-lg text-xs font-semibold bg-white cursor-pointer"
                      >
                        {ACADEMIC_CLASSES.map(cls => (
                          <option key={cls.id} value={cls.nameEn}>{lang === 'en' ? cls.nameEn : cls.nameHi}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-stone-400">{lang === 'en' ? "Session Date" : "सत्र तिथि"}</label>
                      <input
                        type="date"
                        value={reportDate}
                        onChange={(e) => setReportDate(e.target.value)}
                        className="w-full p-2.5 border border-stone-250 rounded-lg text-xs font-semibold bg-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-stone-400">{lang === 'en' ? "Subject Name" : "विषय (उदा. गणित, विज्ञान, हिन्दी, Computer)"}</label>
                    <input
                      type="text"
                      required
                      value={reportSubject}
                      onChange={(e) => setReportSubject(e.target.value)}
                      placeholder="e.g. Mathematics"
                      className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-stone-400">{lang === 'en' ? "Topics Covered Today" : "आज कक्षा में क्या पढ़ाया गया?"}</label>
                    <textarea
                      required
                      value={reportTopic}
                      onChange={(e) => setReportTopic(e.target.value)}
                      placeholder="e.g. Completed Chapter 3 Fraction Multiplication and Class Exercise 3.2."
                      className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold bg-white h-20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-stone-400">{lang === 'en' ? "Homework / Assignment assigned" : "दिए गए गृहकार्य (Homework Details)"}</label>
                    <textarea
                      value={reportHomework}
                      onChange={(e) => setReportHomework(e.target.value)}
                      placeholder="e.g. Solve Q1 to Q5 in notebook. Memorize fraction formula on Page 88."
                      className="w-full p-3 border border-stone-250 rounded-xl text-xs font-semibold bg-white h-24"
                    />
                  </div>

                  {reportSuccessMsg && (
                    <p className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold">
                      {reportSuccessMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-800 hover:bg-stone-900 text-white rounded-xl font-bold uppercase text-[11.5px] tracking-wider cursor-pointer"
                  >
                    {lang==='en'?"Post to Student Desks" : "विद्यार्थी लॉगिन पर पब्लिश करें"}
                  </button>
                </form>
              )}

            </div>
          )}
        </div>
      )}

      {/* CASE C: MANAGEMENT / ADMIN ACTIVE VIEW */}
      {activeRole === 'admin' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
          {!isAdminLoggedIn ? (
            /* Admin passcode login challenge */
            <form onSubmit={handleAdminAuth} className="max-w-md mx-auto space-y-4">
              <div className="text-center space-y-1 select-none">
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-800 bg-red-50 px-2.5 py-0.5 rounded-full block w-fit mx-auto">ADMIN ACCESS DESK</span>
                <h3 className="text-lg font-black text-stone-850">{lang==='en' ? "Unlock Administrative Portal" : "प्रशासकीय नियंत्रण कक्ष लॉगिन"}</h3>
                <p className="text-[11px] text-stone-400 font-semibold">Enter your secure Operator credentials below</p>
              </div>

              {/* Username field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-extrabold text-stone-450 block tracking-wider">{lang === 'en' ? "Operator ID / Username" : "यूटिलिटी ऑपरेटर आईडी / यूजरनाम"}</label>
                <input
                  type="text"
                  required
                  value={adminUsernameInput}
                  onChange={(e) => setAdminUsernameInput(e.target.value)}
                  placeholder="e.g. admin or custom ID"
                  className="w-full p-2.5 border border-stone-250 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-red-800 focus:outline-none"
                />
              </div>

              {/* Password field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-extrabold text-stone-450 block tracking-wider">{lang === 'en' ? "Secret Password" : "एक्सेस पासवर्ड"}</label>
                <input
                  type="password"
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder={lang === 'en'?"Passcode (e.g. 1234)" : "पासवर्ड दर्ज करें (उदा. 1234)"}
                  className="w-full p-2.5 border border-stone-250 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-red-800 focus:outline-none"
                />
              </div>

              {adminError && <p className="text-xs font-bold text-red-600 p-2 bg-red-50 rounded-lg">{adminError}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-red-800 hover:bg-stone-900 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition cursor-pointer select-none"
              >
                {lang === 'en' ? "Authorize Operator Session" : "प्रशासनिक ऑपरेटर सत्यापित करें"}
              </button>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 text-[10.5px] text-stone-500 font-semibold text-center leading-relaxed select-none">
                {lang === 'en' 
                  ? "Note: Principal Operator ID is 'admin' and password is '1234'."
                  : "परीक्षण विवरण: प्रशासकीय यूजरनाम 'admin' और पासवर्ड '1234' है।"}
              </div>
            </form>
          ) : (
            /* Management Logged Inside workspace */
            <div className="space-y-8">
              
              <div className="flex justify-between items-center border-b border-stone-150 pb-4">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600 animate-spin" />
                    {lang === 'en' ? "Full School Control & Customization" : "संपूर्ण विद्यालय प्रबंधन केंद्र"}
                  </h3>
                  <p className="text-xs text-stone-450">Active Government recognition session: 2008-09 till date</p>
                </div>
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 font-bold rounded-xl text-xs cursor-pointer select-none"
                >
                  {lang==='en'?"Log Out" : "निकास (लॉगआउट)"}
                </button>
              </div>

              {/* Grid: Photo & Config customization panel */}
              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                
                {/* 1. School Photo Config parameters & Logo upgrades */}
                <div className="p-6 bg-gradient-to-br from-amber-50/60 to-white rounded-2xl border border-amber-250/50 shadow-sm space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5 uppercase tracking-wide border-b pb-2 text-stone-850">
                      <QrCode className="w-4 h-4 text-amber-600" />
                      {lang === 'en' ? "Branding & QR Code Uploads" : "ब्रांडिंग, लोगो व क्यूआर प्रबंधन"}
                    </h4>

                    {/* Logo Customizer */}
                    <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-stone-150 p-3 shadow-xs">
                      <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">
                        {lang === 'en' ? "Upload School Header Logo (Top-Left)" : "विद्यालय संक्षिप्त लोगो (शीर्ष बाएँ कोने के लिए - 50px)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) processImageUpload(file, "sbj_custom_logo", setCustomLogo);
                        }}
                        className="text-xs w-full font-mono file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-amber-100 file:text-amber-800"
                      />
                      {customLogo && (
                        <div className="mt-2 flex items-center gap-2">
                          <img src={customLogo} alt="Custom Logo Preview" className="w-12 h-12 object-contain rounded border" referrerPolicy="no-referrer" />
                          <button
                            onClick={() => {
                              localStorage.removeItem("sbj_custom_logo");
                              setCustomLogo(null);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            className="text-red-700 text-[10px] font-bold underline cursor-pointer"
                          >
                            Remove Custom Logo
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Big Hero Logo Customizer */}
                    <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-stone-150 p-3 shadow-xs">
                      <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">
                        {lang === 'en' ? "Upload Large Homepage Showcase Logo" : "मुख्य पृष्ठ का बड़ा शोकेस लोगो (Saraswati Logo की जगह - 130px)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) processImageUpload(file, "sbj_custom_large_logo", setCustomLargeLogo);
                        }}
                        className="text-xs w-full font-mono file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-amber-100 file:text-amber-800"
                      />
                      {customLargeLogo && (
                        <div className="mt-2 flex items-center gap-2">
                          <img src={customLargeLogo} alt="Custom Large Logo Preview" className="w-12 h-12 object-contain rounded border" referrerPolicy="no-referrer" />
                          <button
                            onClick={() => {
                              localStorage.removeItem("sbj_custom_large_logo");
                              setCustomLargeLogo(null);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            className="text-red-700 text-[10px] font-bold underline cursor-pointer"
                          >
                            Remove Large Logo
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Founder Gautam Tiwari Photo Upload */}
                    <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-stone-150">
                      <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">
                        {lang === 'en' ? "Upload Founder Shree Gautam Muni Tiwari Photo" : "प्रबंधक श्री गौतम मुनि तिवारी जी की फोटो"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) processImageUpload(file, "sbj_founder_photo", setFounderPhoto);
                        }}
                        className="text-xs w-full font-mono file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-amber-100 file:text-amber-800"
                      />
                      {founderPhoto && (
                        <div className="mt-2 flex items-center gap-2">
                          <img src={founderPhoto} alt="Founder Preview" className="w-12 h-12 object-cover rounded-full border" referrerPolicy="no-referrer" />
                          <button
                            onClick={() => {
                              localStorage.removeItem("sbj_founder_photo");
                              setFounderPhoto(null);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            className="text-red-700 text-[10px] font-bold underline"
                          >
                            Reset to Default Initials
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Donation QR Code upload */}
                    <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-stone-150">
                      <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">
                        {lang === 'en' ? "Upload Donation UPI QR Code Image" : "दान QR कोड संचिका अपलोड करें"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) processImageUpload(file, "sbj_school_donation_qr", setDonationQr);
                        }}
                        className="text-xs w-full font-mono file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-amber-100 file:text-amber-800"
                      />
                      {donationQr && (
                        <div className="mt-2 flex items-center gap-2">
                          <img src={donationQr} alt="QR Code Preview" className="w-12 h-12 object-contain border rounded" referrerPolicy="no-referrer" />
                          <button
                            onClick={() => {
                              localStorage.removeItem("sbj_school_donation_qr");
                              setDonationQr(null);
                              window.dispatchEvent(new Event("storage"));
                            }}
                            className="text-red-700 text-[10px] font-bold underline"
                          >
                            Reset to System Vector
                          </button>
                        </div>
                      )}
                    </div>

                    {/* UPI ID Address customizer */}
                    <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-stone-150">
                      <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">
                        {lang === 'en' ? "Customize UPI ID Address Address" : "यूपीआई पेमेंट आईडी कस्टमाइज़ करें"}
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="9450231827@paytm"
                          className="p-2 border border-stone-200 rounded text-xs font-mono font-bold flex-1"
                        />
                        <button
                          onClick={() => {
                            localStorage.setItem("sbj_school_upi_id", upiId);
                            alert(lang==='en'?"UPI Code updated!":"UPI एड्रेस अपडेट हुआ!");
                            window.dispatchEvent(new Event("storage"));
                          }}
                          className="px-3 bg-red-800 hover:bg-stone-900 text-white rounded text-xs select-none font-bold"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Simplified Photo publication for school events (Only 1 detail required!) */}
                <form onSubmit={handleSimplePhotoSubmit} className="p-6 bg-stone-50 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5 uppercase tracking-wide border-b pb-2 text-stone-850">
                        <Upload className="w-4 h-4 text-emerald-600" />
                        {lang === 'en' ? "Quick Photo Publication" : "गैलरी में नया फोटो जोड़ें (सरल 1-विवरण विधि)"}
                      </h4>
                      <p className="text-[10px] text-stone-450 font-semibold leading-relaxed">
                        {lang === 'en'
                          ? "Adhering to requested simplicity, load a file and write a simple descriptive title. That's all!"
                          : "फोटो संचिका अपलोड करें और केवल 1 मुख्य शीर्षक लिखें। अन्य विवरण स्वतः दर्ज हो जाएंगे।"}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">{lang === 'en' ? "Choose Photo File" : "फोटो संचिका चुनें"}</label>
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setSimplePhotoFile(String(reader.result));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-xs w-full font-mono file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-emerald-100 file:text-emerald-800 bg-white p-2 rounded-lg border"
                      />
                      {simplePhotoFile && (
                        <div className="mt-2 w-16 h-12 border overflow-hidden rounded bg-white">
                          <img src={simplePhotoFile} alt="Chosen Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">{lang === 'en' ? "Single information (Title / Caption)" : "केवल 1 अनिवार्य जानकारी (फोटो का मुख्य शीर्षक)"}</label>
                      <input
                        type="text"
                        required
                        value={simplePhotoTitle}
                        onChange={(e) => setSimplePhotoTitle(e.target.value)}
                        placeholder="e.g. Students in Computers lab computer monitor setup"
                        className="w-full p-2.5 border border-stone-250 rounded-lg text-xs font-semibold bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">{lang === 'en' ? "Visual Topic" : "श्रेणी"}</label>
                      <select
                        value={simplePhotoType}
                        onChange={(e) => setSimplePhotoType(e.target.value as any)}
                        className="w-full p-2.5 border border-stone-250 rounded-lg text-xs font-semibold bg-white cursor-pointer"
                      >
                        <option value="Celebration">{lang === 'en' ? "Celebration" : "उत्सव एवं पर्व"}</option>
                        <option value="Sports">{lang === 'en' ? "Sports" : "खेलकूद स्पर्धा"}</option>
                        <option value="Academic">{lang === 'en' ? "Academic Study" : "अध्ययन व कक्षा"}</option>
                        <option value="Other">{lang === 'en' ? "Other Infrastructures" : "अन्य सामान्य चित्र"}</option>
                      </select>
                    </div>
                  </div>

                  {simplePhotoMsg && <p className="text-xs font-bold text-emerald-800 p-2 bg-emerald-50 rounded mt-3">{simplePhotoMsg}</p>}

                  <button
                    type="submit"
                    className="w-full py-2.5 mt-4 bg-red-800 hover:bg-stone-900 text-white rounded-lg text-xs font-extrabold uppercase tracking-widest select-none cursor-pointer"
                  >
                    {lang === 'en' ? "Publish Photo Live" : "चित्र लाइव प्रकाशित करें"}
                  </button>
                </form>
              </div>

              {/* CRM 3: Teachers Management list (Add / Remove Faculty) */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6">
                <div className="border-b pb-3 space-y-1">
                  <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5 uppercase tracking-wide text-stone-850">
                    <Users className="w-5 h-5 text-red-800" />
                    {lang === 'en' ? "Add & Remove Teachers Registry" : "अध्यापकों की भर्ती व निष्कासन नियंत्रण (Teacher Registry)"}
                  </h4>
                  <p className="text-[10.5px] text-stone-450 font-semibold leading-relaxed">
                    {lang === 'en'
                      ? "Admin can enroll new teachers or remove existing staff. This is sync'd and updated live in the About section."
                      : "कौंसिल एडमिन किसी भी समय नए शिक्षकों को जोड़ सकते हैं या अनुपयोगी शिक्षकों को निकाल सकते हैं।"}
                  </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Register New staff form */}
                  <form onSubmit={handleAddTeacher} className="md:col-span-6 bg-white p-5 rounded-xl border border-stone-150 space-y-3">
                    <h5 className="font-bold text-stone-800 text-[11px] uppercase tracking-wider mb-2 border-b pb-1">Register New Staff Member</h5>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400">Teacher Name (En)</label>
                        <input
                          type="text"
                          required
                          value={newTeacherNameEn}
                          onChange={(e) => setNewTeacherNameEn(e.target.value)}
                          placeholder="e.g. Sandeep Tiwari"
                          className="w-full p-2 border rounded text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400">नाम (हिंदी में)</label>
                        <input
                          type="text"
                          required
                          value={newTeacherNameHi}
                          onChange={(e) => setNewTeacherNameHi(e.target.value)}
                          placeholder="उदा. संदीप तिवारी"
                          className="w-full p-2 border rounded text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400">Role/Post (En)</label>
                        <input
                          type="text"
                          required
                          value={newTeacherRoleEn}
                          onChange={(e) => setNewTeacherRoleEn(e.target.value)}
                          placeholder="e.g. Primary Teacher"
                          className="w-full p-2 border rounded text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400">पद (हिंदी में)</label>
                        <input
                          type="text"
                          required
                          value={newTeacherRoleHi}
                          onChange={(e) => setNewTeacherRoleHi(e.target.value)}
                          placeholder="उदा. प्राथमिक शिक्षक"
                          className="w-full p-2 border rounded text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400">Qualification (En)</label>
                        <input
                          type="text"
                          value={newTeacherEduEn}
                          onChange={(e) => setNewTeacherEduEn(e.target.value)}
                          placeholder="e.g. M.Sc Chemistry"
                          className="w-full p-2 border rounded text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400">योग्यता (हिंदी में)</label>
                        <input
                          type="text"
                          value={newTeacherEduHi}
                          onChange={(e) => setNewTeacherEduHi(e.target.value)}
                          placeholder="उदा. एम.एससी रसायन शास्त्र"
                          className="w-full p-2 border rounded text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    {teacherMsg && <p className="text-xs font-bold text-emerald-800 p-2 bg-emerald-50 rounded">{teacherMsg}</p>}

                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-800 hover:bg-stone-900 text-white rounded text-xs select-none font-extrabold uppercase tracking-wide cursor-pointer"
                    >
                      Hire & Register Counselor
                    </button>
                  </form>

                  {/* Right Column: Active Staff remove control roster */}
                  <div className="md:col-span-6 bg-white p-5 rounded-xl border border-stone-150 space-y-3">
                    <h5 className="font-bold text-stone-800 text-[11px] uppercase tracking-wider border-b pb-1">Manage Registered Faculty ({teachersList.length})</h5>
                    
                    <div className="divide-y divide-stone-100 max-h-56 overflow-y-auto space-y-1.5 text-xs">
                      {teachersList.map((t, idx) => (
                        <div key={idx} className="pb-2 pt-1 flex justify-between items-center font-semibold">
                          <div>
                            <span className="font-bold text-stone-900">{t.nameEn}</span>
                            <span className="block text-[10px] text-red-850">{t.roleEn} ({t.eduEn})</span>
                          </div>
                          
                          {/* Disable deleting founder Gautam Muni Tiwari & Principal Vijendra Tiwari to protect primary integrity */}
                          {idx > 1 ? (
                            <button
                              onClick={() => handleRemoveTeacher(idx)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded transition cursor-pointer select-none"
                              title="Dismiss Teacher"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[9px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase font-bold">LOCKED</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* CRM 4: Dynamic Portal Access Operators Customizer */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6">
                <div className="border-b pb-3 space-y-1">
                  <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5 uppercase tracking-wide text-stone-850">
                    <Shield className="w-5 h-5 text-red-850 animate-pulse" />
                    {lang === 'en' ? "Portal Operators & Accounts Manager" : "पोर्टल यूजर एकाउंट्स व कूटशब्द रीसेट प्रबंधन (User Access Control)"}
                  </h4>
                  <p className="text-[10.5px] text-stone-450 font-semibold leading-relaxed">
                    {lang === 'en'
                      ? "Create separate administrator or teacher accounts, restrict credentials, and trigger secure password overrides dynamically."
                      : "अन्य यूज़र्स (जैसे क्लर्क, सहायक ऑपरेटर या शिक्षक) के लिए अलग आईडी पासवर्ड बनाएं और आपातकालीन पासवर्ड रीसेट करें।"}
                  </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Create New Access ID */}
                  <form onSubmit={handleCreatePortalUser} className="md:col-span-5 bg-white p-5 rounded-xl border border-stone-150 space-y-3 shadow-xs">
                    <h5 className="font-extrabold text-stone-800 text-[11px] uppercase tracking-wider mb-2 border-b pb-1">
                      {lang === 'en' ? "Create Custom Access ID" : "नया यूजर आईडी / पासवर्ड बनाएं"}
                    </h5>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold uppercase text-stone-400 block tracking-wider">{lang === 'en' ? "Operator Full Name" : "यूनिट ऑपरेटर का नाम"}</label>
                      <input
                        type="text"
                        required
                        value={newPortalFullName}
                        onChange={(e) => setNewPortalFullName(e.target.value)}
                        placeholder="e.g. Anand Tiwari (Operator)"
                        className="w-full p-2 border border-stone-250 rounded text-xs font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold uppercase text-stone-400 block tracking-wider">{lang === 'en' ? "New Access Username" : "लॉगिन यूजरनाम आईडी (Username)"}</label>
                      <input
                        type="text"
                        required
                        value={newPortalUsername}
                        onChange={(e) => setNewPortalUsername(e.target.value)}
                        placeholder="e.g. anand123 (lowercase)"
                        className="w-full p-2 border border-stone-250 rounded text-xs font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pb-1">
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400 block tracking-wider">{lang === 'en' ? "Access Role" : "कार्यकारी रोल"}</label>
                        <select
                          value={newPortalRole}
                          onChange={(e) => setNewPortalRole(e.target.value as any)}
                          className="w-full p-2 border border-stone-250 rounded text-xs font-semibold focus:outline-none bg-white cursor-pointer"
                        >
                          <option value="admin">{lang === 'en' ? "Admin / Clerk" : "एडमिन / क्लर्क"}</option>
                          <option value="teacher">{lang === 'en' ? "Teacher" : "शिक्षक (Teacher)"}</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-extrabold uppercase text-stone-400 block tracking-wider">{lang === 'en' ? "Assign Password" : "एक्सेस पासवर्ड"}</label>
                        <input
                          type="password"
                          required
                          value={newPortalPassword}
                          onChange={(e) => setNewPortalPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full p-2 border border-stone-250 rounded text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    {portalUserMsg && <p className="text-xs font-bold text-red-800 p-2 bg-amber-50 rounded">{portalUserMsg}</p>}

                    <button
                      type="submit"
                      className="w-full py-2 bg-red-800 hover:bg-stone-900 text-white rounded text-xs select-none font-extrabold uppercase tracking-wide cursor-pointer text-center"
                    >
                      {lang === 'en' ? "Generate Security Credentials" : "सुरक्षित क्रेडेंशियल्स जनरेट करें"}
                    </button>
                  </form>

                  {/* Right Column: Manage Registered Operators List */}
                  <div className="md:col-span-7 bg-white p-5 rounded-xl border border-stone-150 space-y-3 shadow-xs">
                    <h5 className="font-extrabold text-stone-800 text-[11px] uppercase tracking-wider border-b pb-1">
                      {lang === 'en' ? "Operators Directory & Security Handlers" : "सक्रिय स्कूल ऑपरेटर्स लिस्ट व पासवर्ड रीसेट"}
                    </h5>
                    
                    <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto space-y-2 text-xs">
                      {portalUsers.map((u, index) => (
                        <div key={u.id || index} className="pb-2.5 pt-1.5 flex justify-between items-center bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-stone-900">{u.fullName}</span>
                              <span className={`text-[8.5px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                                u.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {u.role}
                              </span>
                            </div>
                            <div className="text-[10px] text-stone-500 font-semibold mt-1">
                              ID: <span className="font-mono bg-stone-200 px-1 rounded text-stone-900 font-bold">{u.username}</span> | 
                              Pass: <span className="font-mono bg-stone-205 px-1 rounded text-red-800 font-bold">{u.password}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            {/* Password override reset trigger */}
                            <button
                              onClick={() => handleResetPortalUserPassword(u.id, u.fullName)}
                              className="px-2 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded text-[9.5px] font-extrabold transition cursor-pointer select-none"
                              title="Reset Password"
                            >
                              {lang === 'en' ? "Change Password" : "कूटशब्द बदलें"}
                            </button>
                            
                            {u.id !== "u_admin" ? (
                              <button
                                onClick={() => handleDeletePortalUser(u.id, u.fullName)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded transition cursor-pointer select-none"
                                title="Revoke Account"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <span className="text-[9px] text-red-800 bg-red-50 px-1.5 py-0.5 rounded font-extrabold uppercase">MASTER</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Render the full original Admin portal sub-features (Students Management CRM, News publisher, parental Queries list) */}
              <div className="bg-stone-100 rounded-3xl p-6 border border-stone-200 mt-6 relative">
                <div className="absolute top-2 right-6 px-3 py-1 bg-red-105 text-red-900 rounded font-bold text-[9px] uppercase font-mono bg-red-100">INTEGRATED CLIENT PORTAL</div>
                <h4 className="font-extrabold text-stone-900 text-sm mb-4">COMPREHENSIVE ADMISSION, ENROLLMENT & NEWS BROADCASTER:</h4>
                {renderAdminPortal()}
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}
