export interface StudentRecord {
  id: string;
  studentName: string;
  fatherName: string;
  lastName: string;
  motherName: string;
  height: string; // in cm or feet/inches
  weight: string; // in kg
  address: string;
  fatherContact: string;
  alternateContact: string;
  bloodGroup: string;
  adharNumber: string;
  photoUrl: string; // Base64 or standard URL
  admissionDate: string;
  academicClass: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  feesTotal?: number;
  feesPaid?: number;
  feesRemarks?: string;
  notifications?: Array<{ id: string; title: string; message: string; date: string; read?: boolean }>;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  titleEn: string;
  titleHi: string;
  category: 'Celebration' | 'Sports' | 'Academic' | 'Rangoli' | 'Plantation' | 'Infrastructure' | 'Other';
  descriptionEn: string;
  descriptionHi: string;
  date: string;
}

export interface NewsEvent {
  id: string;
  titleEn: string;
  titleHi: string;
  contentEn: string;
  contentHi: string;
  date: string;
  category: 'News' | 'Event' | 'Achievement';
  imageUrl?: string;
}

export type Language = 'en' | 'hi';

export interface Translation {
  // Navigation elements
  home: string;
  aboutUs: string;
  academics: string;
  admission: string;
  newsEvents: string;
  contact: string;
  adminPanel: string;

  // Header/School Identity
  schoolName: string;
  govtRecognized: string;
  udiseCode: string;
  tagline: string;
  addressFull: string;

  // Home Page
  welcome: string;
  introText: string;
  keyFeatures: string;
  quickLinks: string;
  slideshow: string;

  // About US Subsections
  schoolHistory: string;
  missionVision: string;
  principlesMessage: string;
  staffInfo: string;
  historyText: string;
  missionText: string;
  visionText: string;
  founderMessage: string;
  principalMessage: string;

  // Admission Page
  admissionForm: string;
  requirements: string;
  feeStructure: string;
  admissionProcess: string;
  generateIdCard: string;
  donate?: string;
  donationTagline?: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  email: string;
  phone: string;
  referenceNumber: string;
  message: string;
  date: string;
  status: 'Pending' | 'Verified' | 'Cancelled';
}
