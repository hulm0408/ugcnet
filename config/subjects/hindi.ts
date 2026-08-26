import { SubjectConfig } from './types';
import { hindiSyllabus, hindiSyllabusSource } from '../../data/syllabus/hindi';

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
    visualConcept: 'Devanagari script evolution scroll with literary period arc and calligraphic elements',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgHindi" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B0D0D" />
            <stop offset="100%" stop-color="#140303" />
          </linearGradient>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#450a0a" />
            <stop offset="50%" stop-color="#7f1d1d" />
            <stop offset="100%" stop-color="#450a0a" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgHindi)" stroke="#991B1B" stroke-width="1.5" />

        <!-- Literary Period Arc -->
        <path d="M 60 160 A 250 120 0 0 1 440 160" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="4,4" />
        
        <!-- Arc Markers & Labels -->
        <circle cx="95" cy="98" r="4" fill="#FCA5A5" />
        <text x="95" y="85" text-anchor="middle" fill="#F87171" font-size="12" font-weight="bold">आदिकाल</text>
        <text x="95" y="115" text-anchor="middle" fill="#94A3B8" font-size="10">⚔️ Veer-gatha</text>

        <circle cx="195" cy="55" r="4" fill="#FCA5A5" />
        <text x="195" y="42" text-anchor="middle" fill="#F87171" font-size="12" font-weight="bold">भक्तिकाल</text>
        <text x="195" y="72" text-anchor="middle" fill="#94A3B8" font-size="10">🛕 Bhakti</text>

        <circle cx="305" cy="55" r="4" fill="#FCA5A5" />
        <text x="305" y="42" text-anchor="middle" fill="#F87171" font-size="12" font-weight="bold">रीतिकाल</text>
        <text x="305" y="72" text-anchor="middle" fill="#94A3B8" font-size="10">🦚 Riti</text>

        <circle cx="405" cy="98" r="4" fill="#FCA5A5" />
        <text x="405" y="85" text-anchor="middle" fill="#F87171" font-size="12" font-weight="bold">आधुनिक काल</text>
        <text x="405" y="115" text-anchor="middle" fill="#94A3B8" font-size="10">✒️ Modern</text>

        <!-- Unfurling Scroll Base -->
        <path d="M 100 170 Q 150 140 250 170 T 400 170 L 400 270 Q 350 240 250 270 T 100 270 Z" fill="url(#scrollGrad)" stroke="#F87171" stroke-width="1.5" />
        
        <!-- Scroll Rolls Ends -->
        <ellipse cx="100" cy="220" rx="10" ry="50" fill="#2a0505" stroke="#F87171" stroke-width="1.5" />
        <ellipse cx="400" cy="220" rx="10" ry="50" fill="#2a0505" stroke="#F87171" stroke-width="1.5" />

        <!-- Evolution of Script on Scroll -->
        <text x="150" y="215" text-anchor="middle" fill="#FECACA" font-size="14" font-family="serif">𑀅</text>
        <text x="150" y="235" text-anchor="middle" fill="#94A3B8" font-size="10">Brahmi</text>
        
        <path d="M 175 220 L 210 220" stroke="#EF4444" stroke-width="1" />
        <polygon points="210,217 215,220 210,223" fill="#EF4444" />

        <text x="250" y="215" text-anchor="middle" fill="#FECACA" font-size="16" font-family="sans-serif">अ</text>
        <text x="250" y="235" text-anchor="middle" fill="#94A3B8" font-size="10">Nagari</text>

        <path d="M 290 220 L 325 220" stroke="#EF4444" stroke-width="1" />
        <polygon points="325,217 330,220 325,223" fill="#EF4444" />

        <text x="360" y="215" text-anchor="middle" fill="#FFFFFF" font-size="18" font-family="sans-serif" font-weight="bold">अ</text>
        <text x="360" y="235" text-anchor="middle" fill="#94A3B8" font-size="10">Devanagari</text>

        <!-- Ink Pot and Reed Pen -->
        <g transform="translate(60, 270)">
          <path d="M 0 10 L 20 10 L 15 30 L 5 30 Z" fill="#140303" stroke="#F87171" stroke-width="1" />
          <ellipse cx="10" cy="10" rx="10" ry="3" fill="#7f1d1d" />
          <!-- Reed Pen -->
          <path d="M 5 0 L 25 -30 L 28 -28 L 8 2 Z" fill="#fca5a5" />
        </g>

        <!-- Labels -->
        <text x="250" y="340" text-anchor="middle" fill="#FECACA" font-size="18" font-weight="900" font-family="sans-serif">हिन्दी (CODE 20)</text>
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
  officialSyllabus: hindiSyllabus,
  syllabusSource: hindiSyllabusSource,
};
