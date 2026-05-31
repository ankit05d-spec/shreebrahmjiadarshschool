import { GalleryItem, NewsEvent } from './types';

export const SCHOOL_INFO = {
  nameEn: "Shree Brahma Ji Adarsh H.P. School",
  nameHi: "श्री ब्रह्मा जी आदर्श एच.पी. स्कूल",
  addressEn: "Muhammada Barwapatti, Motichak, Kushinagar, Uttar Pradesh",
  addressHi: "मुहम्मदा, बरवापट्टी, मोतीचक, कुशीनगर (उत्तर प्रदेश)",
  villageEn: "Siktiya, Uttar Pradesh 274305",
  villageHi: "सिक्टिया, उत्तर प्रदेश 274305",
  maplink: "RR73+6J, Siktiya, Uttar Pradesh 274305",
  udiseCode: "09590703204",
  recognitionEn: "Recognized by U.P. Govt. Since 2008-09 (Nursery to Class VIII)",
  recognitionHi: "उत्तर प्रदेश सरकार द्वारा मान्यता प्राप्त - वर्ष 2008/09 से (नर्सरी से कक्षा 8 तक)",
  contactFounder: "9450231827",
  contactPrincipal: "9984135693",
  contactAlt: "6393299193",
  email: "sbjadarsheschool@gmail.com",
};

export const TRANSLATIONS = {
  en: {
    home: "Home",
    aboutUs: "About Us",
    academics: "Academics",
    admission: "Admissions & ID Setup",
    newsEvents: "News, Events & Gallery",
    contact: "Contact Us",
    adminPanel: "Admin Suite",
    schoolName: SCHOOL_INFO.nameEn,
    govtRecognized: SCHOOL_INFO.recognitionEn,
    udiseCode: `U-DISE Code: ${SCHOOL_INFO.udiseCode}`,
    tagline: "Quality Education for All at Low Cost",
    addressFull: SCHOOL_INFO.addressEn,
    welcome: "Welcome to Shree Brahma Ji Adarsh H.P. School",
    introText: "Established in 2008, our school is dedicated to delivering top-tier education to rural and economically challenged students. Founded by Shree Gautam Muni Tiwari with a non-commercial vision, we support and nourish the cognitive and ethical development of students from Nursery through Class VIII.",
    keyFeatures: "Core Highlights",
    quickLinks: "Quick Access",
    slideshow: "Glimpses of School Activities",
    schoolHistory: "Our History",
    missionVision: "Mission & Vision",
    principlesMessage: "Leadership Message",
    staffInfo: "Faculty & Staff",
    historyText: "Founded in the academic year 2008-2009 in Muhammada Barwapatti, Motichak (Kushinagar), the school was established by veteran rural journalist and visionary farmer, Shree Gautam Muni Tiwari. Observing a lack of affordable yet highly qualitative schools for children of remote agrarian families in Siktiya and Barwapatti, he initiated this institution with a service-first, low-cost structure to ensure no child is left behind in literacy and morals.",
    missionText: "To cultivate a healthy, stimulating learning environment where students from every corner of rural Kushinagar acquire scientific curiosity, disciplined ethics, and social responsibility without being burdened with expensive commercial schooling fees.",
    visionText: "To build a model rural educational institution that merges traditional moral values with digital-friendly teaching, empowering every rural pupil to succeed in modern competitive spheres.",
    founderMessage: "Education is not a commercial commerce, but a sacred trust. Our goal is to provide the finest educational framework, qualified support, and discipline to the children of hardworking families at a price that respects and protects their livelihoods.",
    principalMessage: "Our faculty is committed to developing classroom programs that foster all-round academic, creative, and physical excellence. We invite critical parental collaboration to maintain a high-quality educational standard.",
    admissionForm: "Admissions Registration",
    requirements: "Required Documentation",
    feeStructure: "Affordable Fee Details",
    admissionProcess: "Admission Steps",
    generateIdCard: "Student Portal & ID Generator",
    donate: "Support & Donations",
    donationTagline: "Help us reach more underprivileged children with modern educational toolkits and safe infrastructure."
  },
  hi: {
    home: "मुख्य पृष्ठ",
    aboutUs: "हमारे बारे में",
    academics: "शैक्षणिक विवरण",
    admission: "प्रवेश और पहचान पत्र",
    newsEvents: "समाचार व दीर्घा",
    contact: "संपर्क करें",
    adminPanel: "प्रशासनिक पैनल",
    schoolName: SCHOOL_INFO.nameHi,
    govtRecognized: SCHOOL_INFO.recognitionHi,
    udiseCode: `यू-डाइस कोड: ${SCHOOL_INFO.udiseCode}`,
    tagline: "कम खर्च में उच्च गुणवत्ता और श्रेष्ठ संस्कार",
    addressFull: SCHOOL_INFO.addressHi,
    welcome: "श्री ब्रह्मा जी आदर्श एच.पी. विद्यालय में आपका स्वागत है",
    introText: "वर्ष 2008 से स्थापित हमारा विद्यालय ग्रामीण और गरीब पृष्ठभूमि से आने वाले विद्यार्थियों को उत्कृष्ट शिक्षा और नैतिक मूल्य प्रदान करने हेतु समर्पित है। वरिष्ठ पत्रकार श्री गौतम मुनि तिवारी जी द्वारा बिना किसी व्यावसायिक लाभ के शुरू किया गया यह संस्थान नर्सरी से कक्षा 8 तक के प्रत्येक छात्र का सर्वांगीण विकास करता है।",
    keyFeatures: "मुख्य विशेषताएँ",
    quickLinks: "त्वरित लिंक्स",
    slideshow: "विद्यालय की प्रमुख झलकियाँ",
    schoolHistory: "हमारा इतिहास",
    missionVision: "लक्ष्य और दृष्टिकोण",
    principlesMessage: "नेतृत्व संदेश",
    staffInfo: "शिक्षक और कर्मचारी",
    historyText: "शैक्षणिक वर्ष 2008-2009 में कुशीनगर के मोतीचक ब्लॉक अंतर्गत मुहम्मदा बरवापट्टी में स्थापित यह विद्यालय वरिष्ठ ग्रामीण पत्रकार और प्रगतिशील कृषक श्री गौतम मुनि तिवारी जी की दूरदर्शी सोच का परिणाम है। सुदूर आजीविका वाले परिवारों के बच्चों हेतु उच्च स्तर की बुनियादी तथा संस्कारयुक्त शिक्षा सुलभ कराने के उद्देश्य से उन्होंने इसकी नींव कम लागत और लोक-सेवा भाव से रखी थी।",
    missionText: "कुशीनगर के ग्रामीण क्षेत्रों के प्रत्येक बच्चे को बिना किसी आर्थिक बोझ के एक स्वस्थ और प्रेरक शिक्षा वातावरण प्रदान करना, जिससे वे वैज्ञानिक दृष्टिकोण और मजबूत चरित्र के साथ समाज के जिम्मेदार नागरिक बन सकें।",
    visionText: "पारंपरिक मानवीय संस्कारों और डिजिटल युग की आधुनिक शिक्षा के समन्वय से एक ऐसा आदर्श ग्रामीण विद्यालय बनाना, जो छात्रों को आगामी प्रतियोगी परीक्षाओं और राष्ट्र-निर्माण में अग्रणी बना सके।",
    founderMessage: "शिक्षा कोई व्यापार नहीं है, बल्कि एक पवित्र सामाजिक जिम्मेदारी है। हमारा एकमात्र संकल्प यही है कि ग्रामीण किसानों और सामान्य परिवारों के मेहनती बच्चों को बेहद मामूली शुल्क में गुणवत्तापूर्ण संस्कारयुक्त शिक्षा उपलब्ध कराई जा सके।",
    principalMessage: "हमारा समस्त स्टाफ अनुशासन, चरित्र निर्माण और उत्कृष्ट पठन-पाठन हेतु सदैव प्रयासरत रहता है। हम अभिभावकों को आमंत्रित करते हैं कि वे विद्यालय की उन्नति में सक्रिय सहयोग दें।",
    admissionForm: "नया छात्र प्रवेश फॉर्म",
    requirements: "आवश्यक सिफ़ारिशें और दस्तावेज",
    feeStructure: "शुल्क विवरण",
    admissionProcess: "प्रवेश की प्रक्रिया",
    generateIdCard: "आईडी कार्ड जनरेटर",
    donate: "सहयोग एवं दान",
    donationTagline: "ग्रामीण कुशीनगर के जरूरतमंद बच्चों को सर्वश्रेष्ठ शिक्षा, कंप्यूटर प्रयोगशाला व उत्कृष्ट विद्यालय संसाधन सुलभ बनाने में सहयोग करें।"
  }
};

export const PRESEEDED_DOCK_NEWS: NewsEvent[] = [
  {
    id: "news_1",
    titleEn: "Grand Rangoli Competition Held on Independence Day Eve",
    titleHi: "स्वतंत्रता दिवस की पूर्व संध्या पर भव्य रंगोली प्रतियोगिता का आयोजन",
    contentEn: "Students of Class VII and VIII took active part in a vibrant, color-packed Rangoli creation event. Senior manager Shree Gautam Muni Tiwari, chief guest, highly motivated the students. Highlights were published in Lokbharati News where students won local awards for their precision work.",
    contentHi: "कक्षा 7 और 8 के छात्र-छात्राओं ने आकर्षक रंगोली प्रतियोगिता में बढ़-चढ़कर हिस्सा लिया। इस दौरान प्रबंधक श्री गौतम मुनि तिवारी जी ने छात्रों का मार्गदर्शन कर शिक्षा के साथ-साथ रचनात्मक गतिविधियों में सहभागिता पर बल दिया। कार्यक्रम को दैनिक समाचार पत्रों 'लोकभारती न्यूज़' में विशेष स्थान मिला।",
    date: "2025-08-15",
    category: "Event",
  },
  {
    id: "news_2",
    titleEn: "Tree Sapling Plantation Drive 2025 Successfully Completed",
    titleHi: "पौधरोपण कार्यक्रम का सफल आयोजन (28 जुलाई 2025)",
    contentEn: "Aligned with nature conservation, the school hosted parent-teacher sapling distributions, planting over 200 micro-herbal and shady plants in Muhammada grounds. Senior management with community leaders guided block-level plantation.",
    contentHi: "नई दिशा पर्यावरण सेवा संस्थान कुशीनगर के सहयोग से विद्यालय प्रांगण में वृहद पौधरोपण कार्यक्रम चलाया गया। अभिभावकों व विद्यालय स्टाफ ने पर्यावरण संरक्षण का संकल्प लेकर छायादार और फलदार पौधे रोपित किए।",
    date: "2025-07-28",
    category: "Achievement",
  },
  {
    id: "news_3",
    titleEn: "Admission Open for Session 2026-2027",
    titleHi: "सत्र 2026-2027 के लिए नए प्रवेश प्रारंभ",
    contentEn: "Admissions are actively running for Class Nursery to VIII. Special support is offered to single-mother children and farming households. Features include physical layout, smart boards, and digital learning facilities.",
    contentHi: "कक्षा नर्सरी से कक्षा VIII तक के छात्र-छात्राओं हेतु नवीन प्रवेश शुरू हो चुके हैं। दूरदराज के कृषि परिवारों और जरूरतमंदों के लिए विशेष रियायतें उपलब्ध हैं। अनुभवी शिक्षक, खेल-कूद और नैतिक मूल्यों का उत्तम केंद्र।",
    date: "2026-04-01",
    category: "News"
  }
];

export const PRESEEDED_GALLERY: GalleryItem[] = [
  {
    id: "gal_1",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1000", // Representative high-quality school/students illustration
    titleEn: "Founder Shree Gautam Muni Tiwari",
    titleHi: "प्रबंधक श्री गौतम मुनि तिवारी",
    category: "Infrastructure",
    descriptionEn: "Highly acclaimed journalist, farmer and humanitarian founder who has selflessly dedicated decades to providing affordable, excellent rural education in Kushinagar.",
    descriptionHi: "वरिष्ठ पत्रकार एवं प्रगतिशील कृषक, जो कुशीनगर के ग्रामीण क्षेत्रों में उत्कृष्ट व सस्ती शिक्षा उपलब्ध कराने हेतु आजीवन प्रयासरत हैं।",
    date: "2025"
  },
  {
    id: "gal_2",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    titleEn: "Creative Rangoli Art by Higher Grades",
    titleHi: "छात्राओं द्वारा आकर्षक और सुंदर रंगोली का निर्माण",
    category: "Rangoli",
    descriptionEn: "Students of Class VI, VII and VIII displaying collaborative floral Rangoli on various competitive events.",
    descriptionHi: "कक्षा 6, 7 और 8 की छात्राओं ने रंगोली उत्सव में सहभागिता कर अपनी उत्कृष्ट चित्रकारी और संस्कृति को प्रस्तुत किया।",
    date: "2025-08-15"
  },
  {
    id: "gal_3",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
    titleEn: "Environmental Conservation Plantation Ceremony",
    titleHi: "पर्यावरण पौधरोपण कार्यक्रम",
    category: "Plantation",
    descriptionEn: "Staff and community members planting saplings in school grounds to celebrate conservation.",
    descriptionHi: "पर्यावरण जागृति अभियान के अंतर्गत छात्र-छात्राओं, शिक्षकों और ग्रामीणों द्वारा औषधीय पौधे लगाए गए।",
    date: "2025-07-28"
  },
  {
    id: "gal_4",
    imageUrl: "https://images.unsplash.com/photo-1597005089699-0b2f7d925827?auto=format&fit=crop&q=80&w=1000",
    titleEn: "Independence Day Flag Hoisting & Celebrations",
    titleHi: "स्वतंत्रता दिवस ध्वजारोहण समारोह",
    category: "Celebration",
    descriptionEn: "Patriotic pledge, flag hoisting, and parade with principal Vijendra Kumar Tiwari and senior faculty.",
    descriptionHi: "विद्यालय में गौरवमयी 15 अगस्त को ध्वजारोहण कर बच्चों द्वारा राष्ट्रगान और परेड का भव्य प्रदर्शन किया गया।",
    date: "2025-08-15"
  },
  {
    id: "gal_5",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000",
    titleEn: "School Entrance Gate - Azwar Road",
    titleHi: "विद्यालय मुख्य प्रवेश द्वार",
    category: "Infrastructure",
    descriptionEn: "The welcoming arch of Shree Brahma Ji Adarsh school with traditional paintings representing 'Education is the Greatest Power'.",
    descriptionHi: "मान्यता वर्ष 2008-09 की सुंदर अल्पनाओं से सजा विद्यालय का मुख्य द्वार और सुन्दर कलाकृतियां।",
    date: "2025"
  },
  {
    id: "gal_6",
    imageUrl: "https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&q=80&w=1000",
    titleEn: "Co-curricular Holi celebrations",
    titleHi: "सांस्कृतिक उत्सव होली मिलन समारोह",
    category: "Celebration",
    descriptionEn: "Creative festival interactions focusing on traditional unity and cultural integrity.",
    descriptionHi: "शिक्षक और विद्यार्थियों ने मिलकर सौहार्दपूर्ण होली मिलन कार्यक्रम में सुंदर रंगों से खुशियाँ बांटी।",
    date: "2026-03-24"
  }
];

export const FACULTY_MEMBERS = [
  {
    nameEn: "Shree Gautam Muni Tiwari",
    nameHi: "श्रीमती/श्री गौतम मुनि तिवारी जी",
    roleEn: "Founder & Manager",
    roleHi: "संस्थापक एवं प्रबंधक",
    eduEn: "Senior Rural Journalist & Progressive Agriculturist",
    eduHi: "वरिष्ठ ग्रामीण पत्रकार एवं प्रगतिशील किसान"
  },
  {
    nameEn: "Shree Vijendra Kumar Tiwari",
    nameHi: "श्री विजेंद्र कुमार तिवारी जी",
    roleEn: "School Principal",
    roleHi: "प्रधानाचार्य",
    eduEn: "M.A., B.Ed - Decades of Academic Mentorship",
    eduHi: "एम.ए., बी.एड - 20 वर्षों से अधिक शैक्षणिक अनुभव"
  },
  {
    nameEn: "Shree Pramod Kumar Mishra",
    nameHi: "श्री प्रमोद कुमार मिश्र जी",
    roleEn: "Senior Teacher (Social Science & Sanskrit)",
    roleHi: "वरिष्ठ शिक्षक (समाजिक विज्ञान एवं संस्कृत)",
    eduEn: "B.A., D.El.Ed",
    eduHi: "बी.ए., डी.एल.एड"
  },
  {
    nameEn: "Shree Srinivas Singh",
    nameHi: "श्री श्रीनिवास सिंह",
    roleEn: "Mathematics & General Science Head",
    roleHi: "गणित एवं सामान्य विज्ञान प्रभारी",
    eduEn: "B.Sc, B.Ed",
    eduHi: "बी.एससी, बी.एड"
  },
  {
    nameEn: "Deepika Tiwari",
    nameHi: "सुश्री दीपिका तिवारी",
    roleEn: "Primary Incharge & Languages Head",
    roleHi: "प्राथमिक प्रभारी एवं भाषा प्रमुख",
    eduEn: "M.A. English literature",
    eduHi: "एम.ए. अंग्रेजी साहित्य"
  },
  {
    nameEn: "Pallavi Singh",
    nameHi: "सुश्री पल्लवी सिंह",
    roleEn: "Junior Section Supervisor (Hindi)",
    roleHi: "जूनियर वर्ग पर्यवेक्षक (हिंदी)",
    eduEn: "B.A. Hindi & Sanskrit",
    eduHi: "बी.ए. हिंदी एवं संस्कृत"
  },
  {
    nameEn: "Mr. Ankitkumar Dwivedi",
    nameHi: "श्री अंकितकुमार द्विवेदी",
    roleEn: "CS Mentor & Website Creator",
    roleHi: "कंप्यूटर विज्ञान शिक्षक एवं वेबसाइट निर्माता (क्रिएटर)",
    eduEn: "B.E. Mechanical & Full-Stack Developer",
    eduHi: "बी.ई. मैकेनिकल एवं फुल-स्टैक वेब डेवलपर"
  }
];

export const ACADEMIC_CLASSES = [
  {
    id: "nur",
    nameEn: "Nursery / KG",
    nameHi: "नर्सरी / के.जी.",
    ageEn: "3 - 5 Years",
    ageHi: "3 - 5 वर्ष",
    subjectsEn: "Basic English Alphabets, Hindi Varnamala, Simple Numbers, Interactive Rhymes, Drawing",
    subjectsHi: "बुनियादी वर्णमाला (अंग्रेजी/हिंदी), गिनती, बालगीत, खेल, चित्रकला",
  },
  {
    id: "p1_3",
    nameEn: "Class I to III",
    nameHi: "कक्षा 1 से 3",
    ageEn: "6 - 8 Years",
    ageHi: "6 - 8 वर्ष",
    subjectsEn: "Hindi (Vasudha), English (English Springs), Mathematics, EVS (Our Environment), Moral Science, Computer Bas.",
    subjectsHi: "हिंदी (वसुधा), अंग्रेजी, गणित, पर्यावरण अध्ययन, नैतिक शिक्षा, कंप्यूटर के बुनियादी गुर",
  },
  {
    id: "p4_5",
    nameEn: "Class IV to V",
    nameHi: "कक्षा 4 से 5",
    ageEn: "9 - 10 Years",
    ageHi: "9 - 10 वर्ष",
    subjectsEn: "Hindi Main & Grammar, English Prose & Gram., Mathematics (Step-by-step), Science, Social Studies, Sanskrit, Arts",
    subjectsHi: "हिंदी पाठ्यपुस्तक और व्याकरण, अंग्रेजी गद्य व व्याकरण, गणितीय अभ्यास, विज्ञान, सामाजिक अध्ययन, संस्कृत, कला",
  },
  {
    id: "j6_8",
    nameEn: "Class VI to VIII",
    nameHi: "कक्षा 6 से 8",
    ageEn: "11 - 13 Years",
    ageHi: "11 - 13 वर्ष",
    subjectsEn: "Hindi Literary, Advanced English Grammar, Algebra & Geometry, Physics, Chemistry, Biology, History, Civics, Geography, Sanskrit (Manjusha), Computers & Coding",
    subjectsHi: "साहित्यिक हिंदी, अग्रिम अंग्रेजी व्याकरण, बीजगणित व रेखागणित, भौतिकी, रसायन विज्ञान, जीव विज्ञान, इतिहास, नागरिक शास्त्र, भूगोल, संस्कृत (मंजूषा), कंप्यूटर और बुनियादी कोडिंग",
  }
];

export const FEE_STRUCTURE = [
  { classEn: "Nursery / LKG / UKG", classHi: "नर्सरी व पूर्व-प्राथमिक", feeMonthEn: "₹250 / Month", feeMonthHi: "₹250 / प्रति माह", admissionFeeEn: "₹200 (One-Time)", admissionFeeHi: "₹200 (केवल एक बार)" },
  { classEn: "Class I to III", classHi: "कक्षा 1 से 3", feeMonthEn: "₹350 / Month", feeMonthHi: "₹350 / प्रति माह", admissionFeeEn: "₹300 (One-Time)", admissionFeeHi: "₹300 (केवल एक बार)" },
  { classEn: "Class IV to V", classHi: "कक्षा 4 से 5", feeMonthEn: "₹400 / Month", feeMonthHi: "₹400 / प्रति माह", admissionFeeEn: "₹300 (One-Time)", admissionFeeHi: "₹300 (केवल एक बार)" },
  { classEn: "Class VI to VIII", classHi: "कक्षा 6 से 8", feeMonthEn: "₹500 / Month", feeMonthHi: "₹500 / प्रति माह", admissionFeeEn: "₹400 (One-Time)", admissionFeeHi: "₹400 (केवल एक बार)" },
];

export const GENERAL_TIMETABLE = [
  { period: "Assembly (प्रार्थना सभा)", time: "08:00 AM - 08:30 AM", activityEn: "Saraswati Vandana, National Anthem, Pledge, Daily News & Moral Speech", activityHi: "सरस्वती वंदना, राष्ट्रगान, प्रतिज्ञा, वर्तमान विचार व नैतिक भाषण" },
  { period: "Period 1", time: "08:30 AM - 09:15 AM", activityEn: "Hindi / Mathematics", activityHi: "हिंदी / गणित" },
  { period: "Period 2", time: "09:15 AM - 10:00 AM", activityEn: "English Literature & Reading", activityHi: "अंग्रेजी साहित्य और पठन" },
  { period: "Period 3", time: "10:00 AM - 10:45 AM", activityEn: "Science, Nature & Logic", activityHi: "विज्ञान और तर्क" },
  { period: "Recess (भोजनावकाश)", time: "10:45 AM - 11:15 AM", activityEn: "Healthy Tiffin / Sports Recreation", activityHi: "स्वस्थ टिफिन / खेल-कूद मनोरंजन" },
  { period: "Period 4", time: "11:15 AM - 11:55 AM", activityEn: "Social Studies & History", activityHi: "सामाजिक विज्ञान और इतिहास" },
  { period: "Period 5", time: "11:55 AM - 12:35 PM", activityEn: "Sanskrit Grammar & Shloka Recitation", activityHi: "संस्कृत व्याकरण और श्लोक गायन" },
  { period: "Period 6", time: "12:35 PM - 01:10 PM", activityEn: "Computer/Digital Learning", activityHi: "कंप्यूटर/डिजिटल कक्षा" },
  { period: "Period 7", time: "01:10 PM - 01:45 PM", activityEn: "General Knowledge (GK) & Quiz", activityHi: "सामान्य ज्ञान (जीके) और प्रश्नोत्तरी" },
  { period: "Period 8 & Dismissal", time: "01:45 PM - 02:00 PM", activityEn: "Remediary doubts clearing, National Geet, safe home departure", activityHi: "शंका समाधान सत्र, राष्ट्रीय गीत, सुरक्षित प्रस्थान" },
];
