import { SubjectConfig } from './types';

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
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgArabic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06241C" />
            <stop offset="100%" stop-color="#020C09" />
          </linearGradient>
          <linearGradient id="goldArabic" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#10B981" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgArabic)" stroke="#064E3B" stroke-width="1.5" />

        <!-- Calligraphic Header Line -->
        <rect x="40" y="60" width="420" height="60" rx="10" fill="#041812" stroke="#059669" stroke-width="1" />
        <text x="250" y="96" text-anchor="middle" fill="#A7F3D0" font-size="16" font-weight="bold" font-family="serif">قِفَا نَبْكِ مِنْ ذِكْرَى حَبِيبٍ وَمَنْزِلِ • بِسِقْطِ اللِّوَى بَيْنَ الدَّخُولِ فَحَوْمَلِ</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="215" r="55" fill="#062E24" stroke="url(#goldArabic)" stroke-width="2.5" />
        <text x="250" y="210" text-anchor="middle" fill="#FFFFFF" font-size="20" font-weight="900">العربية</text>
        <text x="250" y="232" text-anchor="middle" fill="#34D399" font-size="10" font-weight="bold" letter-spacing="1">CODE 29</text>

        <!-- Left Node: Classical Poetry -->
        <rect x="40" y="170" width="130" height="90" rx="12" fill="#041A14" stroke="#065F46" stroke-width="1" />
        <text x="105" y="200" text-anchor="middle" fill="#34D399" font-size="11" font-weight="bold">الشعر القديم</text>
        <text x="105" y="220" text-anchor="middle" fill="#D1D5DB" font-size="9">المعلقات • المخضرمون</text>
        <text x="105" y="238" text-anchor="middle" fill="#9CA3AF" font-size="8">النقائض • العصر العباسي</text>

        <!-- Right Node: Arabic in India -->
        <rect x="330" y="170" width="130" height="90" rx="12" fill="#041A14" stroke="#065F46" stroke-width="1" />
        <text x="395" y="200" text-anchor="middle" fill="#34D399" font-size="11" font-weight="bold">الأدب في الهند</text>
        <text x="395" y="220" text-anchor="middle" fill="#D1D5DB" font-size="9">الشاه ولي الله الدهلوي</text>
        <text x="395" y="238" text-anchor="middle" fill="#9CA3AF" font-size="8">آزاد البلكرامي • الندوي</text>

        <path d="M 170 215 L 195 215" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 215 L 330 215" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#9CA3AF" font-size="10" font-weight="bold">١٠ وحدات معتمدة • ٤٥+ امتحاناً مع نماذج الإجابة</text>
      </svg>
    `,
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
};
