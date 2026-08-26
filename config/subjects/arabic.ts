import { SubjectConfig } from './types';
import { arabicSyllabus, arabicSyllabusSource } from '../../data/syllabus/arabic';

export const arabicConfig: SubjectConfig = {
  code: '29',
  slug: 'arabic',
  name: 'Arabic',
  nativeName: 'اللغة العربية وآدابها',
  tagline: 'الأدب الجاهلي والإسلامي • العصر العباسي والأندلسي • الأدب الحديث والمعاصر • النحو والبلاغة • الأدب العربي في الهند',
  positioningHeadline: 'Master UGC NET Arabic —',
  positioningHighlight: 'the smart way.',
  description: 'تدرب على أسئلة الامتحانات السابقة الحقيقية (٢٠٠٤–٢٠٢٤) للغة العربية وآدابها. تتبع نقاط ضعفك بدقة عبر الوحدات العشر، واستعد للامتحان في بيئة الاختبار الرسمي (CBT).',
  theme: {
    primaryColor: '#047857',
    accentColor: '#F59E0B',
    surfaceGradient: 'from-[#0A1E18] to-[#040D0A]',
    fontFamily: 'font-arabic',
    scriptDirection: 'rtl',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none" direction="rtl">
        <defs>
          <linearGradient id="bgArab" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#021E14" />
            <stop offset="100%" stop-color="#010C08" />
          </linearGradient>
          <linearGradient id="goldArab" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A" />
            <stop offset="50%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#B45309" />
          </linearGradient>
          <path id="bottomArc" d="M 130 250 A 120 120 0 0 0 370 250" fill="none" />
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgArab)" />

        <!-- Subject Title -->
        <text x="470" y="40" fill="#F59E0B" font-size="18" font-weight="900" text-anchor="end" font-family="serif">العربية</text>
        <text x="470" y="58" fill="#6EE7B7" font-size="12" text-anchor="end" font-family="serif">CODE 29 • اللغة العربية وآدابها</text>

        <!-- Astrolabe Centerpiece -->
        <g transform="translate(250, 190)">
          <!-- Outer Rim -->
          <circle cx="0" cy="0" r="130" fill="#042F22" stroke="url(#goldArab)" stroke-width="4" />
          <circle cx="0" cy="0" r="120" fill="none" stroke="#F59E0B" stroke-width="1" opacity="0.5" />
          
          <!-- Degree Markings -->
          <g stroke="#F59E0B" stroke-width="1" opacity="0.7">
            <line x1="0" y1="-130" x2="0" y2="-120" />
            <line x1="0" y1="120" x2="0" y2="130" />
            <line x1="-130" y1="0" x2="-120" y2="0" />
            <line x1="120" y1="0" x2="130" y2="0" />
            <line x1="-92" y1="-92" x2="-85" y2="-85" />
            <line x1="92" y1="92" x2="85" y2="85" />
            <line x1="-92" y1="92" x2="-85" y2="85" />
            <line x1="92" y1="-92" x2="85" y2="-85" />
          </g>

          <!-- Cardinal Labels -->
          <text x="0" y="-100" fill="#A7F3D0" font-size="12" font-weight="bold" text-anchor="middle" font-family="serif">الشعر</text>
          <text x="0" y="110" fill="#A7F3D0" font-size="12" font-weight="bold" text-anchor="middle" font-family="serif">الأدب</text>
          <text x="100" y="5" fill="#A7F3D0" font-size="12" font-weight="bold" text-anchor="middle" font-family="serif">النحو</text>
          <text x="-100" y="5" fill="#A7F3D0" font-size="12" font-weight="bold" text-anchor="middle" font-family="serif">البلاغة</text>

          <!-- Geometric Pattern (Inner Star) -->
          <g stroke="url(#goldArab)" stroke-width="1.5" fill="none" opacity="0.6">
            <polygon points="0,-70 21,-21 70,0 21,21 0,70 -21,21 -70,0 -21,-21" />
            <polygon points="0,-50 15,-15 50,0 15,15 0,50 -15,15 -50,0 -15,-15" />
            <circle cx="0" cy="0" r="70" />
            <circle cx="0" cy="0" r="50" />
          </g>

          <!-- Rete (Pointers) -->
          <g stroke="#FCD34D" stroke-width="2" fill="none">
            <path d="M 0 0 L -60 -40 L -40 -60 Z" fill="#047857" opacity="0.5" />
            <path d="M 0 0 L 50 60 L 30 70 Z" fill="#047857" opacity="0.5" />
            <circle cx="-50" cy="-50" r="3" fill="#FCD34D" />
            <circle cx="40" cy="65" r="3" fill="#FCD34D" />
          </g>

          <!-- Central Pivot -->
          <circle cx="0" cy="0" r="6" fill="#F59E0B" />
          <circle cx="0" cy="0" r="2" fill="#021E14" />
        </g>
        
        <!-- Verse Along Arc -->
        <text font-size="10" fill="#6EE7B7" font-family="serif" font-weight="bold" opacity="0.8">
          <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">قِفَا نَبْكِ مِنْ ذِكْرَى حَبِيبٍ وَمَنْزِلِ</textPath>
        </text>
      </svg>
    `,
    visualConcept: 'Astrolabe instrument with Islamic geometric pattern and cardinal Arabic discipline labels',
  },
  pillars: [
    {
      number: '01',
      title: 'العصور الأدبية الكبرى',
      subtitle: 'من الجاهلية إلى العصر العباسي',
      description: 'شعراء المعلقات السبع، المخضرمون، شعر النقائض في العصر الأموي، ورواد التجديد في العصر العباسي.',
      keyTerms: ['المعلقات', 'شعر النقائض', 'العصر العباسي', 'الأدب الأندلسي'],
    },
    {
      number: '02',
      title: 'الأدب العربي في شبه القارة الهندية',
      subtitle: 'تراث علماء الهند',
      description: 'مصنفات الشاه ولي الله الدهلوي (حجة الله البالغة)، غلام علي آزاد البلكرامي (سبحة المرجان)، وأبي الحسن الندوي.',
      keyTerms: ['حجة الله البالغة', 'سبحة المرجان', 'نزهة الخواطر', 'أبجد العلوم'],
    },
    {
      number: '03',
      title: 'علوم النحو والصرف والبلاغة',
      subtitle: 'الأصول والقواعد الكبرى',
      description: 'أصول مدرسة البصرة والكوفة، ألفية ابن مالك، ودلائل الإعجاز لعبد القاهر الجرجاني.',
      keyTerms: ['ألفية ابن مالك', 'دلائل الإعجاز', 'علم البيان', 'علم البديع'],
    },
    {
      number: '04',
      title: 'الأدب الحديث وحركات التجديد',
      subtitle: 'النهضة وشعر المهجر',
      description: 'مدرسة الإحياء والبعث، الرابطة القلمية في المهجر، مدرسة الديوان، وجماعة أبولو.',
      keyTerms: ['محمود سامي البارودي', 'جبران خليل جبران', 'أحمد شوقي', 'مطران'],
    },
  ],
  memoryExample: {
    questionText: "من مؤلف كتاب \"سبحة المرجان في آثار هندوستان\"؟",
    questionMeta: "2023 Paper II • Q14",
    connectionTrick: "غلام علي آزاد البلكرامي = (آزاد + سبحة المرجان في تاريخ علماء الهند)",
    targetRule: "سبحة المرجان = غلام علي آزاد البلكرامي • نزهة الخواطر = عبد الحي الحسني",
    direction: 'rtl',
  },
  ctaPractice: 'ابدأ التدريب الآن (Start Arabic Practice)',
  ctaSyllabus: 'تصفح المنهج الرسمي (١٠ وحدات)',
  ctaBenchmark: 'خوض الاختبار المجاني (Free Benchmark Exam)',
  curriculumBadge: 'المنهج الرسمي المعتمد لـ UGC NET (١٠ وحدات كاملة)',
  whySectionTitle: 'لماذا تعد هذه المنصة الخيار الأول لمرشحي JRF العربي؟',
  whySectionSubtitle: 'محتوى أصيل موثق بنماذج الإجابة الرسمية، وتصنيف دقيق لكل شاعر وأديب ومصنف.',
  paywallHighlights: [
    'أكثر من ٤٥ امتحاناً أصلياً مع التشكيل ونماذج الإجابة',
    'الورقة العامة الأولى (Paper 1) مشمولة بالكامل',
    'نظام تتبع الأخطاء ونقاط الضعف التلقائي',
    'محاكي NTA CBT الكامل بالاختبارات الموقوتة',
  ],
  officialSyllabus: arabicSyllabus,
  syllabusSource: arabicSyllabusSource,
};
