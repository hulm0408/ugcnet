import { SubjectConfig } from './types';
import { bengaliSyllabus, bengaliSyllabusSource } from '../../data/syllabus/bengali';

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
          <linearGradient id="bgBeng" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2A0818" />
            <stop offset="100%" stop-color="#0D0207" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#D97706" />
            <stop offset="50%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#D97706" />
          </linearGradient>
          <filter id="roughEdge">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgBeng)" />

        <!-- Subject Title -->
        <text x="30" y="40" fill="#F97316" font-size="18" font-weight="900" font-family="sans-serif">বাংলা</text>
        <text x="30" y="58" fill="#FCA5A5" font-size="12" font-family="sans-serif">CODE 19 • সাহিত্য ও সংস্কৃতি</text>

        <!-- Palm Leaf Manuscript -->
        <g transform="translate(20, 110)">
          <!-- Leaf Shape -->
          <path d="M 20 40 Q 230 10, 440 40 Q 460 50, 440 60 Q 230 90, 20 60 Q 0 50, 20 40 Z" fill="url(#leafGrad)" filter="url(#roughEdge)" opacity="0.9" />
          <path d="M 20 40 Q 230 10, 440 40 Q 460 50, 440 60 Q 230 90, 20 60 Q 0 50, 20 40 Z" fill="none" stroke="#78350F" stroke-width="1.5" />
          
          <!-- Etched lines on leaf -->
          <path d="M 50 35 Q 230 20, 410 35" fill="none" stroke="#78350F" stroke-width="0.5" opacity="0.5" />
          <path d="M 45 50 Q 230 35, 415 50" fill="none" stroke="#78350F" stroke-width="0.5" opacity="0.5" />
          <path d="M 50 65 Q 230 50, 410 65" fill="none" stroke="#78350F" stroke-width="0.5" opacity="0.5" />

          <!-- Binding Holes and Cord -->
          <circle cx="150" cy="50" r="4" fill="#2A0818" />
          <circle cx="310" cy="50" r="4" fill="#2A0818" />
          <path d="M 150 50 C 140 20, 160 -10, 180 -30" fill="none" stroke="#92400E" stroke-width="2" stroke-dasharray="2,2" />
          <path d="M 310 50 C 300 20, 320 -10, 340 -30" fill="none" stroke="#92400E" stroke-width="2" stroke-dasharray="2,2" />

          <!-- Charyapada Text -->
          <text x="230" y="47" fill="#451A03" font-size="12" font-weight="bold" text-anchor="middle" opacity="0.8">॥ কাআ তরুবর পঞ্চবি ডাল ॥</text>
          <text x="230" y="62" fill="#451A03" font-size="12" font-weight="bold" text-anchor="middle" opacity="0.8">॥ চঞ্চল চীএ পইঠো কাল ॥</text>
        </g>

        <!-- Timeline Ribbon -->
        <g transform="translate(50, 260)">
          <path d="M 0 20 L 400 20" fill="none" stroke="#831843" stroke-width="4" />
          <path d="M 0 20 L 400 20" fill="none" stroke="#F97316" stroke-width="2" stroke-dasharray="8,4" />
          
          <!-- Nodes -->
          <circle cx="0" cy="20" r="6" fill="#F97316" />
          <text x="0" y="10" fill="#FCA5A5" font-size="10" font-weight="bold" text-anchor="middle">আদিযুগ (950)</text>

          <circle cx="130" cy="20" r="6" fill="#F97316" />
          <text x="130" y="40" fill="#FCA5A5" font-size="10" font-weight="bold" text-anchor="middle">মধ্যযুগ (1350)</text>

          <circle cx="260" cy="20" r="6" fill="#F97316" />
          <text x="260" y="10" fill="#FCA5A5" font-size="10" font-weight="bold" text-anchor="middle">আধুনিক (1800)</text>

          <circle cx="390" cy="20" r="6" fill="#F97316" />
          <text x="390" y="40" fill="#FCA5A5" font-size="10" font-weight="bold" text-anchor="middle">রবীন্দ্র (1861)</text>
        </g>
      </svg>
    `,
    visualConcept: 'Palm-leaf (tala patra) manuscript with Charyapada verse and literary period timeline',
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
  officialSyllabus: bengaliSyllabus,
  syllabusSource: bengaliSyllabusSource,
};
