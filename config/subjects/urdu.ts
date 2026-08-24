import { SubjectConfig } from './types';

export const urduConfig: SubjectConfig = {
  code: '28',
  slug: 'urdu',
  name: 'Urdu',
  nativeName: 'اردو زبان و ادب',
  tagline: 'تاریخ زبان اردو • دکنی ادب • غزل و قصیدہ • مثنوی، مرثیہ و نظم • اردو نثر، داستان، ناول و افسانہ • تنقید و تحقیق',
  positioningHeadline: 'Master UGC NET Urdu —',
  positioningHighlight: 'اردو نیٹ/جے آر ایف کی مکمل تیاری۔',
  description: 'دکنی دور، دبستانِ دہلی و لکھنؤ، میر، غالب، اقبال، سر سید تحریک، ترقی پسند تحریک، اور جدید نظم و افسانہ کا مستند مطالعہ۔',
  theme: {
    primaryColor: '#065F46',
    accentColor: '#10B981',
    surfaceGradient: 'from-[#041D15] to-[#010906]',
    fontFamily: 'font-arabic',
    scriptDirection: 'rtl',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgUrdu" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#062E22" />
            <stop offset="100%" stop-color="#020E0A" />
          </linearGradient>
          <linearGradient id="greenUrdu" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#34D399" />
            <stop offset="100%" stop-color="#10B981" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgUrdu)" stroke="#065F46" stroke-width="1.5" />

        <!-- Nastaliq Divan Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#041A13" stroke="#047857" stroke-width="1.5" />
        <text x="250" y="80" text-anchor="middle" fill="#A7F3D0" font-size="14" font-weight="bold" font-family="serif">ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے • بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے</text>
        <text x="250" y="98" text-anchor="middle" fill="#34D399" font-size="9">دکنی دور (سب رس) • دبستانِ دہلی و لکھنؤ • علی گڑھ تحریک • ترقی پسند تحریک</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#06382A" stroke="url(#greenUrdu)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="19" font-weight="900">اردو</text>
        <text x="250" y="227" text-anchor="middle" fill="#34D399" font-size="10" font-weight="bold" letter-spacing="1">CODE 28</text>

        <!-- Left Node: Classical Poetry -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#031A12" stroke="#065F46" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="bold">کلاسک شاعری</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">میر • سودا • غالب • مومن</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">میر انیس مرثیہ • ذوق</text>

        <!-- Right Node: Modern Prose & Criticism -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#031A12" stroke="#065F46" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="bold">نثر و جدید تحریکیں</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">باغ و بہار • فسانۂ عجائب</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">پریم چند • منٹو • کلیم الدین</text>

        <path d="M 175 210 L 195 210" stroke="#34D399" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#34D399" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">۱۰ معتمد یونٹس • ۲۰+ سالہ پچھلے پرچے (۲۰۰۴–۲۰۲۴)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'تاریخ زبان اردو و دکنی ادب',
      subtitle: 'نظریات اور ابتدائی نمونے',
      description: 'اردو کے آغاز کے نظریات (محمود شیرانی، مسعود حسین خاں، شوکت سبزواری)، دکنی شعرا (قلی قطب شاہ، وجہی کی سب رس، غواصی کا سیف الملوک و بدیع الجمال، نصرتی کا گلشن عشق)۔',
      keyTerms: ['پنجاب میں اردو (شیرانی)', 'مقدمۂ تاریخ زبان اردو', 'سب رس (ملا وجہی)', 'کلیات قلی قطب شاہ'],
    },
    {
      number: '02',
      title: 'اصنافِ سخن: غزل، قصیدہ و مرثیہ',
      subtitle: 'دبستانِ دہلی و لکھنؤ',
      description: 'میر تقی میر، خواجہ میر درد، سودا (قصیدہ)، مرزا اسد اللہ خاں غالب، مومن، ذوق، آتش و ناسخ، اور میر ببر علی انیس و مرزا سلامت علی دبیر کا فن مرثیہ نگاری۔',
      keyTerms: ['دیوانِ غالب', 'میر کے چھ دیوان', 'تضحیکِ روزگار (سودا)', 'مرثیہ میر انیس'],
    },
    {
      number: '03',
      title: 'اصنافِ نثر: داستان، ناول و افسانہ',
      subtitle: 'فورٹ ولیم سے جدید فکشن تک',
      description: 'میر امن کی باغ و بہار، رجب علی بیگ سرور کی فسانۂ عجائب، پریم چند (گاؤدان)، نذیر احمد (مراۃ العروس)، رسوا (امراؤ جان ادا)، منٹو، بیدی، قرۃ العین حیدر (آگ کا دریا)۔',
      keyTerms: ['باغ و بہار (میر امن)', 'امراؤ جان ادا', 'آگ کا دریا', 'ٹو بہ ٹیک سنگھ (منٹو)'],
    },
    {
      number: '04',
      title: 'تنقید، تحقیق و ادبی تحریکات',
      subtitle: 'اصولِ تنقید و جدید میلانات',
      description: 'مقدمۂ شعر و شاعری (حالی)، شبلی نعمانی (شعر العجم)، کلیم الدین احمد، احتشام حسین، شمس الرحمن فاروقی، سر سید و علی گڑھ تحریک، اور ترقی پسند مصنفین (۱۹۳۶)۔',
      keyTerms: ['مقدمۂ شعر و شاعری ۱۸۹۳', 'شعر العجم', 'ترقی پسند تحریک ۱۹۳۶', 'شعر شور انگیز'],
    },
  ],
  memoryExample: {
    questionText: "اردو کی پہلی تمثیلی نثری داستان 'سب رس' کس سنہ میں اور کس کی فرمائش پر تصنیف ہوئی؟",
    questionMeta: "2023 Paper II • Q15",
    connectionTrick: "ملا وجہی (سب رس ۱۰۴۵ھ / ۱۶۳۵ء) = (وجہی نے عبد اللہ قطب شاہ کی فرمائش پر لکھی)",
    targetRule: "سب رس ملا وجہی نے ۱۰۴۵ھ (۱۶۳۵ء) میں عبد اللہ قطب شاہ کے عہد میں فتاحی نیشاپوری کے قصہ 'حسن و دل' سے ماخوذ کر کے لکھی۔",
    direction: 'rtl',
  },
  ctaPractice: 'مشق شروع کریں (Start Urdu Practice)',
  ctaSyllabus: 'مکمل ۱۰ یونٹس کا نصاب',
  ctaBenchmark: 'مفت ماک ٹیسٹ دیں (Free Benchmark Exam)',
  curriculumBadge: 'NTA کا باضابطہ منظور شدہ اردو نصاب (۱۰ یونٹس)',
  whySectionTitle: 'اردو نیٹ اور جے آر ایف کی مستند تیاری',
  whySectionSubtitle: 'دکنی ادب سے معاصر تنقید و تحقیق تک، ہر شاعر، مصنف اور کتاب کا مکمل تجزیہ۔',
  paywallHighlights: [
    '۲۰+ سال کے حل شدہ مستند امتحانی پرچے (۲۰۰۴–۲۰۲۴)',
    'پہلا جنرل پرچہ (Paper 1) مکمل طور پر شامل',
    'شعراء کے سالِ ولادت و وفات اور تصانیف کا ٹریکر',
    'NTA CBT کا اصل ٹیسٹ ماحول اور ٹائمر',
  ],
};
