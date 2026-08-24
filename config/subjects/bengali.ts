import { SubjectConfig } from './types';

export const bengaliConfig: SubjectConfig = {
  code: '19',
  slug: 'bengali',
  name: 'Bengali',
  nativeName: 'বাংলা সাহিত্য ও সংস্কৃতি',
  tagline: 'চর্যাপদ ও মঙ্গলকাব্য • ঊনবিংশ শতকের নবজাগরণ • রবীন্দ্র ও কল্লোল যুগ • ভাষাতত্ত্ব, ছন্দ ও অলঙ্কার',
  positioningHeadline: 'UGC NET বাংলা সাহিত্য —',
  positioningHighlight: 'JRF সাফল্যের সুনির্দিষ্ট দিশা।',
  description: 'চর্যাপদ, মঙ্গলকাব্য, বৈষ্ণব পদাবলী থেকে শুরু করে আধুনিক কথাসাহিত্য ও নাটকের সম্পূর্ণ ১০টি ইউনিট NTA CBT পরিবেশে অনুশীলন করুন। বিগত ২০ বছরের প্রশ্নপত্রের নিখুঁত বিশ্লেষণ।',
  theme: {
    primaryColor: '#831843',
    accentColor: '#F97316',
    surfaceGradient: 'from-[#2A0818] to-[#0D0207]',
    fontFamily: 'font-bengali',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgBengali" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B071E" />
            <stop offset="100%" stop-color="#14020A" />
          </linearGradient>
          <linearGradient id="goldBengali" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#F97316" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgBengali)" stroke="#831843" stroke-width="1.5" />
        
        <!-- Charyapada Palm Leaf Manuscript Silhouette -->
        <rect x="50" y="70" width="400" height="65" rx="8" fill="#1C040E" stroke="#9D174D" stroke-width="1.5" />
        <line x1="70" y1="90" x2="430" y2="90" stroke="#F59E0B" stroke-width="1" stroke-dasharray="6,4" opacity="0.6" />
        <line x1="70" y1="110" x2="380" y2="110" stroke="#F59E0B" stroke-width="1" stroke-dasharray="6,4" opacity="0.6" />
        <text x="250" y="105" text-anchor="middle" fill="#FDE68A" font-size="13" font-weight="bold">॥ কাআ তরুবর পঞ্চবি ডাল • চঞ্চল চীএ পইঠো কাল ॥</text>
        
        <!-- Center Emblem: Bengali Renaissance & Modernism Hub -->
        <circle cx="250" cy="225" r="55" fill="#2A0818" stroke="url(#goldBengali)" stroke-width="2.5" />
        <text x="250" y="220" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="900">বাংলা</text>
        <text x="250" y="240" text-anchor="middle" fill="#F472B6" font-size="10" font-weight="bold" letter-spacing="1">CODE 19</text>
        
        <!-- Left Pillar: Ancient/Medieval -->
        <rect x="50" y="180" width="120" height="90" rx="12" fill="#1A030D" stroke="#831843" stroke-width="1" />
        <text x="110" y="210" text-anchor="middle" fill="#F472B6" font-size="11" font-weight="bold">প্রাচীন ও মধ্যযুগ</text>
        <text x="110" y="230" text-anchor="middle" fill="#D1D5DB" font-size="9">চর্যাপদ • মঙ্গলকাব্য</text>
        <text x="110" y="248" text-anchor="middle" fill="#9CA3AF" font-size="8">শ্রীকৃষ্ণকীর্তন • পদাবলী</text>
        
        <!-- Right Pillar: Modern Era -->
        <rect x="330" y="180" width="120" height="90" rx="12" fill="#1A030D" stroke="#831843" stroke-width="1" />
        <text x="390" y="210" text-anchor="middle" fill="#F472B6" font-size="11" font-weight="bold">আধুনিক যুগ</text>
        <text x="390" y="230" text-anchor="middle" fill="#D1D5DB" font-size="9">রবীন্দ্র • কল্লোল যুগ</text>
        <text x="390" y="248" text-anchor="middle" fill="#9CA3AF" font-size="8">কথাসাহিত্য ও নাটক</text>
        
        <!-- Connecting Vectors -->
        <path d="M 170 225 L 195 225" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 225 L 330 225" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />
        
        <!-- Bottom Banner -->
        <text x="250" y="320" text-anchor="middle" fill="#9CA3AF" font-size="10" font-weight="bold">১০টি অফিশিয়াল ইউনিট • বিগত ২০ বছরের NTA প্রশ্নব্যাংক</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'প্রাচীন ও মধ্যযুগীয় বাংলা সাহিত্য',
      subtitle: 'চর্যাপদ, মঙ্গলকাব্য ও পদাবলী',
      description: 'হরপ্রসাদ শাস্ত্রী আবিষ্কৃত চর্যাগীতি, শ্রীকৃষ্ণকীর্তন, চৈতন্যভাগবত, কৃত্তিবাসী রামায়ণ ও বৈষ্ণব পদাবলী।',
      keyTerms: ['চর্যাপদ', 'শ্রীকৃষ্ণকীর্তন', 'মঙ্গলকাব্য', 'চৈতন্যজীবনী', 'বৈষ্ণব পদাবলী'],
    },
    {
      number: '02',
      title: 'ঊনবিংশ শতকের নবজাগরণ ও কাব্য-নাটক',
      subtitle: 'মহাকাব্য, গদ্য ও রঙ্গমঞ্চ',
      description: 'ফোর্ট উইলিয়াম কলেজ, রাজা রামমোহন, ঈশ্বরচন্দ্র বিদ্যাসাগর, বঙ্কিমচন্দ্র, মাইকেল মধুসূদন দত্ত ও দীনবন্ধু মিত্র।',
      keyTerms: ['মেঘনাদবধ কাব্য', 'কমলাকান্তের দপ্তর', 'নীলদর্পণ', 'হুতোম প্যাঁচার নকশা'],
    },
    {
      number: '03',
      title: 'রবীন্দ্র ও আধুনিক কথাসাহিত্য',
      subtitle: 'কবিতা, উপন্যাস ও ছোটগল্প',
      description: 'রবীন্দ্রনাথ ঠাকুর, কাজী নজরুল ইসলাম, জীবনানন্দ দাশ, কল্লোল যুগ ও তারাশঙ্কর-বিভূতিভূষণ-মানিক বন্দ্যোপাধ্যায়।',
      keyTerms: ['সোনার তরী', 'ধূসর পাণ্ডুলিপি', 'পথের পাঁচালী', 'পদ্মানদীর মাঝি'],
    },
    {
      number: '04',
      title: 'ভাষাতত্ত্ব, ছন্দ ও অলঙ্কারশাস্ত্র',
      subtitle: 'ব্যাকরণ ও প্রায়োগিক রূপ',
      description: 'মাগধী অপভ্রংশ থেকে বাংলা ভাষার উৎপত্তি, উপভাষা (রাঢ়ী, বঙ্গালী, বরেন্দ্রী), অক্ষরবৃত্ত ও মাত্রাবৃত্ত ছন্দ।',
      keyTerms: ['অক্ষরবৃত্ত', 'মাত্রাবৃত্ত', 'উপভাষা', 'ধ্বনিবিজ্ঞান', 'শব্দালঙ্কার'],
    },
  ],
  memoryExample: {
    questionText: "চর্যাপদের তিব্বতি অনুবাদ কে আবিষ্কার করেন?",
    questionMeta: "২০২৩ পেপার ২ • প্রশ্ন ১৪",
    connectionTrick: "প্রবোধচন্দ্র বাগচী = (প্রবোধ + তিব্বত অনুসন্ধান ১৯৩৮)",
    targetRule: "চর্যাপদের আবিষ্কারক হরপ্রসাদ শাস্ত্রী (১৯০৭ নেপাল দরবার লাইব্রেরি), কিন্তু তিব্বতি অনুবাদ ড. প্রবোধচন্দ্র বাগচী।",
    direction: 'ltr',
  },
  ctaPractice: 'অনুশীলন শুরু করুন (Start Bengali Practice)',
  ctaSyllabus: '১০টি ইউনিটের পূর্ণ সিলেবাস',
  ctaBenchmark: 'বিনামূল্যে মক টেস্ট দিন (Free Benchmark Exam)',
  curriculumBadge: 'NTA দ্বারা নির্ধারিত অফিশিয়াল বাংলা সিলেবাস (১০টি ইউনিট)',
  whySectionTitle: 'বাংলা সাহিত্যে JRF পাওয়ার নিশ্চিত প্রস্তুতি',
  whySectionSubtitle: 'প্রাচীন পাণ্ডুলিপি থেকে আধুনিক কল্লোল যুগ পর্যন্ত প্রতিটি কবি, গ্রন্থ ও তত্ত্বের নির্ভুল বিশ্লেষণ।',
  paywallHighlights: [
    '২০+ বছরের বাংলা সমাধানসহ অফিশিয়াল প্রশ্নপত্র (২০০৪-২০২৪)',
    'জেনারেল পেপার ১ কমপ্লিট প্রিপারেশন অন্তর্ভুক্ত',
    'ভুলত্রুটি ট্র্যাকার ও দুর্বল টপিক চিহ্নিতকরণ',
    'NTA CBT অফিশিয়াল পরীক্ষা সিমুলেটর ও টাইমার',
  ],
};
