import { SubjectConfig } from './types';

export const hindiConfig: SubjectConfig = {
  code: '20',
  slug: 'hindi',
  name: 'Hindi',
  nativeName: 'हिन्दी साहित्य एवं भाषा विज्ञान',
  tagline: 'हिन्दी साहित्य का इतिहास • भक्तिकाल एवं रीतिकाल • आधुनिक काल एवं छायावाद • हिन्दी उपन्यास, कहानी, नाटक एवं गद्य विधाएँ • काव्यशास्त्र',
  positioningHeadline: 'UGC NET हिन्दी साहित्य —',
  positioningHighlight: 'JRF सफलता का प्रामाणिक मार्ग।',
  description: 'आचार्य रामचन्द्र शुक्ल, हजारीप्रसाद द्विवेदी, कबीर, सूरदास, तुलसीदास, जायसी, भारतेंदु, जयशंकर प्रसाद, प्रेमचंद और मुक्तिबोध की कृतियों का संपूर्ण १० इकाइयों में अभ्यास।',
  theme: {
    primaryColor: '#991B1B',
    accentColor: '#EF4444',
    surfaceGradient: 'from-[#2B0909] to-[#0D0202]',
    fontFamily: 'font-devanagari',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgHindi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B0D0D" />
            <stop offset="100%" stop-color="#140303" />
          </linearGradient>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F87171" />
            <stop offset="100%" stop-color="#EF4444" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgHindi)" stroke="#991B1B" stroke-width="1.5" />

        <!-- Devanagari Prabandha Kavya Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1C0505" stroke="#B91C1C" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#FECACA" font-size="12" font-weight="bold">॥ पोथी पढ़ि पढ़ि जग मुआ पंडित भया न कोय • ढाई आखर प्रेम का पढ़े सो पंडित hoy ॥</text>
        <text x="250" y="98" text-anchor="middle" fill="#F87171" font-size="9">आदिकाल (वीरगाथा) • भक्तिकाल (स्वर्णयुग) • रीतिकाल • आधुनिक काल</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#260808" stroke="url(#redGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="19" font-weight="900">हिन्दी</text>
        <text x="250" y="227" text-anchor="middle" fill="#F87171" font-size="10" font-weight="bold" letter-spacing="1">CODE 20</text>

        <!-- Left Node: Bhakti & Riti -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#1A0404" stroke="#991B1B" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#FECACA" font-size="11" font-weight="bold">भक्तिकाल व रीतिकाल</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">कबीर • जायसी • तुलसीदास</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">केशवदास • बिहारी • घनानंद</text>

        <!-- Right Node: Modern & Katha Sahitya -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#1A0404" stroke="#991B1B" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#FECACA" font-size="11" font-weight="bold">आधुनिक साहित्य</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">भारतेंदु • छायावाद • प्रगतिवाद</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">गोदान • कामायनी • असाध्य वीणा</text>

        <path d="M 175 210 L 195 210" stroke="#F87171" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#F87171" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">१० आधिकारिक इकाइयाँ • विगत २० वर्षों का NTA प्रश्न संग्रह</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'हिन्दी भाषा और उसका विकास',
      subtitle: 'अपभ्रंश, बोलियाँ एवं मानकीकरण',
      description: 'शौरसेनी, मागधी, अर्धमागधी अपभ्रंश से हिन्दी का उद्भव, पश्चिमी हिन्दी (ब्रज, खड़ी बोली, बुंदेली), पूर्वी हिन्दी (अवधी, बघेली, छत्तीसगढ़ी), देवनागरी लिपि का मानकीकरण एवं प्रयोजनमूलक हिन्दी।',
      keyTerms: ['शौरसेनी अपभ्रंश', 'खड़ी बोली', 'अवधी', 'देवनागरी मानकीकरण'],
    },
    {
      number: '02',
      title: 'हिन्दी साहित्य का इतिहास',
      subtitle: 'आदिकाल, भक्तिकाल एवं रीतिकाल',
      description: 'आचार्य शुक्ल का काल-विभाजन, सिद्ध-नाथ साहित्य, पृथ्वीराज रासो, निर्गुण-सगुण काव्यधारा (कबीर, जायसी का पद्मावत, सूरसागर, रामचरितमानस), और रीतिकाल (रीतिबद्ध, रीतिसिद्ध, रीतिमुक्त - केशव, बिहारी, घनानंद)।',
      keyTerms: ['पद्मावत (जायसी)', 'रामचरितमानस', 'बिहारी सतसई', 'सुजान हित (घनानंद)'],
    },
    {
      number: '03',
      title: 'आधुनिक काल एवं छायावाद-प्रगतिवाद',
      subtitle: 'नवजागरण से समकालीन कविता तक',
      description: 'भारतेंदु युग, द्विवेदी युग (मैथिलीशरण गुप्त का साकेत), छायावाद (प्रसाद की कामायनी, निराला की राम की शक्तिपूजा, पंत, महादेवी), प्रगतिवाद, प्रयोगवाद, नई कविता (अज्ञेय, मुक्तिबोध की अंधेरे में)।',
      keyTerms: ['कामायनी (प्रसाद)', 'राम की शक्तिपूजा (निराला)', 'अंधेरे में (मुक्तिबोध)', 'असाध्य वीणा'],
    },
    {
      number: '04',
      title: 'हिन्दी उपन्यास, नाटक, कहानी एवं गद्य विधाएँ',
      subtitle: 'कथा साहित्य एवं भारतीय काव्यशास्त्र',
      description: 'प्रेमचंद (गोदान), यशपाल (झूठा सच), फणीश्वरनाथ रेणु (मैला आंचल), नाटक (भारत दुर्दशा, स्कंदगुप्त, आषाढ़ का एक दिन), रस निष्पत्ति (भरतमुनि), वक्रोक्ति एवं पाश्चात्य काव्यशास्त्र।',
      keyTerms: ['गोदान (प्रेमचंद)', 'मैला आंचल (रेणु)', 'आषाढ़ का एक दिन', 'रस निष्पत्ति सूत्र'],
    },
  ],
  memoryExample: {
    questionText: "भरतमुनि के 'विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः' सूत्र के सर्वप्रथम व्याख्याकार कौन हैं?",
    questionMeta: "2023 Paper II • Q09",
    connectionTrick: "भट्ट लोलट (उत्पत्तिवाद/आरोपवाद) = (लोलट = सर्वप्रथम व्याख्याकार; शंकुक = अनुमितिवाद; भट्ट नायक = भुक्तिवाद; अभिनवगुप्त = अभिव्यक्तिवाद)",
    targetRule: "रस सूत्र के चार प्रमुख व्याख्याता: 1. भट्ट लोलट (उत्पत्तिवाद) 2. शंकुक (अनुमितिवाद) 3. भट्ट नायक (भुक्तिवाद) 4. अभिनवगुप्त (अभिव्यक्तिवाद)।",
    direction: 'ltr',
  },
  ctaPractice: 'अभ्यास शुरू करें (Start Hindi Practice)',
  ctaSyllabus: '१० इकाइयों का संपूर्ण पाठ्यक्रम',
  ctaBenchmark: 'निःशुल्क मॉक टेस्ट दें (Free Benchmark Mock)',
  curriculumBadge: 'NTA द्वारा निर्धारित आधिकारिक हिन्दी पाठ्यक्रम (१० इकाइयाँ)',
  whySectionTitle: 'हिन्दी साहित्य में JRF की सुनिश्चित तैयारी',
  whySectionSubtitle: 'आदिकाल से आधुनिक गद्य विधाओं तक, काव्यशास्त्र एवं व्याकरण की गहन व्याख्या।',
  paywallHighlights: [
    'विगत २० वर्षों के हल सहित प्रामाणिक प्रश्नपत्र (२००४-२०२४)',
    'सामान्य प्रश्नपत्र १ (Paper 1) संपूर्ण तैयारी शामिल',
    'कवि, रचनाकाल, काव्य पंक्तियों का त्रुटि विश्लेषक',
    'NTA CBT आधिकारिक परीक्षा सिम्युलेटर एवं टाइमर',
  ],
};
