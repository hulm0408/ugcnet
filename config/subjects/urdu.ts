import { SubjectConfig } from './types';
import { urduSyllabus, urduSyllabusSource } from '../../data/syllabus/urdu';

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
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E3A5F" />
          </linearGradient>
          <pattern id="zellige" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="#60A5FA" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="500" height="360" rx="10" fill="url(#bgUrdu)" />
        <rect width="500" height="360" rx="10" fill="url(#zellige)" />
        
        <!-- Outer border -->
        <rect x="15" y="15" width="470" height="330" rx="8" fill="none" stroke="#60A5FA" stroke-width="2" opacity="0.8"/>
        <rect x="20" y="20" width="460" height="320" rx="6" fill="none" stroke="#60A5FA" stroke-width="1" opacity="0.5"/>

        <!-- Title at Top -->
        <text x="250" y="45" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900" font-family="serif">URDU / اردو</text>
        
        <!-- Central Calligraphy Panel -->
        <path d="M 100 80 L 400 80 L 420 120 L 400 160 L 100 160 L 80 120 Z" fill="#1E3A5F" stroke="#60A5FA" stroke-width="1.5"/>
        <text x="250" y="115" text-anchor="middle" fill="#BFDBFE" font-size="14" font-family="serif">ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے</text>
        <text x="250" y="135" text-anchor="middle" fill="#93C5FD" font-size="12" font-family="serif">بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے</text>

        <!-- Ghazal Structure Flow (RTL) -->
        <!-- Right Box: Matla (x=360, w=90) -->
        <rect x="360" y="200" width="90" height="40" rx="5" fill="#172554" stroke="#60A5FA" stroke-width="1"/>
        <text x="405" y="225" text-anchor="middle" fill="#FFFFFF" font-size="12" font-family="serif">مطلع (Matla)</text>

        <!-- Arrow RTL: 360 to 290 -->
        <path d="M 360 220 L 290 220" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4,4"/>
        <polygon points="290,220 298,216 298,224" fill="#60A5FA"/>

        <!-- Center Box: Sher (x=200, w=90) -->
        <rect x="200" y="200" width="90" height="40" rx="5" fill="#172554" stroke="#60A5FA" stroke-width="1"/>
        <text x="245" y="225" text-anchor="middle" fill="#FFFFFF" font-size="12" font-family="serif">شعر (Sher)</text>

        <!-- Arrow RTL: 200 to 130 -->
        <path d="M 200 220 L 130 220" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4,4"/>
        <polygon points="130,220 138,216 138,224" fill="#60A5FA"/>

        <!-- Left Box: Maqta (x=40, w=90) -->
        <rect x="40" y="200" width="90" height="40" rx="5" fill="#172554" stroke="#60A5FA" stroke-width="1"/>
        <text x="85" y="225" text-anchor="middle" fill="#FFFFFF" font-size="12" font-family="serif">مقطع (Maqta)</text>

        <!-- Schools of thought / Dabistan -->
        <text x="150" y="290" text-anchor="middle" fill="#93C5FD" font-size="12" font-family="serif">دبستان دہلی</text>
        <circle cx="250" cy="286" r="4" fill="#60A5FA"/>
        <text x="350" y="290" text-anchor="middle" fill="#93C5FD" font-size="12" font-family="serif">دبستان لکھنؤ</text>
        
        <!-- Inkpot & Qalam Silhouette -->
        <path d="M 235 320 C 235 310, 265 310, 265 320 L 270 340 C 270 345, 230 345, 230 340 Z" fill="#60A5FA" opacity="0.7"/>
        <path d="M 255 315 L 285 275 L 290 280 L 260 320 Z" fill="#93C5FD" opacity="0.9"/>
      </svg>
    `,
    visualConcept: 'Nastaliq calligraphy mushaira panel with ghazal structure flow and zellige border',
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
  officialSyllabus: urduSyllabus,
  syllabusSource: urduSyllabusSource,
};
