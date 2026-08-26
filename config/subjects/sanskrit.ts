import { SubjectConfig } from './types';
import { sanskritSyllabus, sanskritSyllabusSource } from '../../data/syllabus/sanskrit';

export const sanskritConfig: SubjectConfig = {
  code: '25',
  slug: 'sanskrit',
  name: 'Sanskrit',
  nativeName: 'संस्कृतम् साहित्यम् एवं व्याकरणम्',
  tagline: 'वैदिकसाहित्यम् • पाणिनीयव्याकरणम् (अष्टाध्यायी) • दर्शनम् (सांख्य, वेदान्त, न्याय) • संस्कृतकाव्यम् एवं काव्यशास्त्रम् • पुराणेतिहासः',
  positioningHeadline: 'UGC NET संस्कृतम् —',
  positioningHighlight: 'JRF सफलतायै प्रामाणिकं साधनम्।',
  description: 'ऋग्वेद-संहिता, उपनिषदः, पाणिनीय-अष्टाध्यायी, महाभाष्यम्, सांख्यकारिका, वेदान्तसारः, कालिदास-भवभूति-भारवि-काव्यानि, एवं ध्वन्यालोक-काव्यप्रकाशयोः विशद् विश्लेषणम्।',
  theme: {
    primaryColor: '#B45309',
    accentColor: '#F59E0B',
    surfaceGradient: 'from-[#2E1603] to-[#0D0501]',
    fontFamily: 'font-devanagari',
    scriptDirection: 'ltr',
    visualConcept: 'Paninian grammar stone tablet with Maheshwara Sutra grid cells',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgSkt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#291204" />
            <stop offset="100%" stop-color="#0F0501" />
          </linearGradient>
          <linearGradient id="tabletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#78350F" />
            <stop offset="50%" stop-color="#92400E" />
            <stop offset="100%" stop-color="#451A03" />
          </linearGradient>
          <filter id="roughStone">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" in="noise" result="coloredNoise" />
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
          </filter>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgSkt)" stroke="#92400E" stroke-width="1.5" />
        
        <!-- Yajna Kunda in Corner -->
        <g transform="translate(420, 30)">
          <!-- Base -->
          <polygon points="10,40 50,40 40,25 20,25" fill="#B45309" stroke="#D97706" stroke-width="1" />
          <polygon points="15,25 45,25 35,15 25,15" fill="#92400E" stroke="#D97706" stroke-width="1" />
          <!-- Fire -->
          <path d="M 30 15 Q 25 5 30 -5 Q 35 5 30 15" fill="#F59E0B" />
          <path d="M 28 15 Q 22 8 26 2 Q 30 8 28 15" fill="#FEF3C7" />
        </g>

        <!-- Stone Tablet Background -->
        <!-- Irregular Path for tablet -->
        <path d="M 90 70 C 110 65, 390 68, 410 72 C 415 150, 412 250, 408 300 C 380 305, 120 308, 95 302 C 85 240, 88 120, 90 70 Z" fill="url(#tabletGrad)" stroke="#B45309" stroke-width="3" filter="url(#roughStone)" />

        <!-- Title Inscription on Tablet -->
        <text x="250" y="105" text-anchor="middle" fill="#FEF3C7" font-size="18" font-family="sans-serif, Arial Unicode MS, Devanagari" font-weight="bold" opacity="0.9">अष्टाध्यायी</text>
        <line x1="160" y1="115" x2="340" y2="115" stroke="#D97706" stroke-width="2" opacity="0.6" />

        <!-- Grid of Maheshwara Sutras -->
        <g transform="translate(130, 130)" fill="#FDE68A" font-size="12" font-family="sans-serif, Arial Unicode MS, Devanagari" font-weight="bold" opacity="0.85">
          <!-- Row 1 -->
          <rect x="0" y="0" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="35" y="25" text-anchor="middle">अइउण्</text>

          <rect x="80" y="0" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="115" y="25" text-anchor="middle">ऋलृक्</text>

          <rect x="160" y="0" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="195" y="25" text-anchor="middle">एओङ्</text>

          <!-- Row 2 -->
          <rect x="0" y="50" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="35" y="75" text-anchor="middle">ऐऔच्</text>

          <rect x="80" y="50" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="115" y="75" text-anchor="middle">हयवरट्</text>

          <rect x="160" y="50" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="195" y="75" text-anchor="middle">लण्</text>

          <!-- Row 3 -->
          <rect x="0" y="100" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="35" y="125" text-anchor="middle">ञमङणनम्</text>

          <rect x="80" y="100" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="115" y="125" text-anchor="middle">झभञ्</text>

          <rect x="160" y="100" width="70" height="40" fill="none" stroke="#D97706" stroke-width="1" opacity="0.4" />
          <text x="195" y="125" text-anchor="middle">घढधष्</text>
        </g>

        <!-- Top Header for Main Theme -->
        <text x="250" y="35" text-anchor="middle" fill="#FFFFFF" font-size="18" font-family="sans-serif, Arial Unicode MS, Devanagari" font-weight="900" letter-spacing="2">SANSKRIT</text>
        <text x="250" y="55" text-anchor="middle" fill="#F59E0B" font-size="12" font-weight="bold" font-family="sans-serif, Arial Unicode MS, Devanagari" letter-spacing="1">माहेश्वरसूत्राणि</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'वैदिकसाहित्यम् एवं वेदाङ्गानि',
      subtitle: 'संहिता, ब्राह्मणम्, आरण्यकम्, उपनिषदः',
      description: 'ऋग्वेदस्य सूक्तानि (अग्नि, वरुण, सूर्य, इन्द्र, पुरुष, नासदीय), यजुर्वेद, सामवेद, अथर्ववेद, यास्कस्य निरुक्तम् (षड्भावविकाराः, पदचतुष्टयम्), एवं वैदिकव्याकरणम्।',
      keyTerms: ['पुरुषसूक्तम् (१०.९०)', 'नासदीयसूक्तम्', 'यास्कस्य निरुक्तम्', 'ईशावास्योपनिषद्'],
    },
    {
      number: '02',
      title: 'पाणिनीयव्याकरणम् एवं भाषाविज्ञानम्',
      subtitle: 'अष्टाध्यायी, सिद्धान्तकौमुदी एवं महाभाष्यम्',
      description: 'माहेश्वरसूत्राणि, प्रत्याहाराः, संज्ञाप्रकरणम्, सन्धिः, सुबन्तम्, तिङन्तम्, कृदन्तम्, तद्धितम्, समासः, कारकप्रकरणम् (कर्मप्रवचनीय), तथा भारोपीयभाषापरिवारः।',
      keyTerms: ['वृद्धिरादैच् (१.१.१)', 'अदेङ्गुणः (१.१.२)', 'साधकतमं करणम्', 'शेश्छोऽटि'],
    },
    {
      number: '03',
      title: 'भारतीयदर्शनम्',
      subtitle: 'सांख्य, वेदान्त, न्याय, मीमांसा एवं बौद्ध-जैन',
      description: 'ईश्वरकृष्णस्य सांख्यकारिका (सत्कार्यवादः, त्रिगुणाः, पुरुषबहुत्वम्), सदानन्दस्य वेदान्तसारः (अध्यारोप-अपवादौ), केशवमिश्रस्य तर्कभाषा (षोडशपदार्थाः), एवं अर्थसंग्रहः।',
      keyTerms: ['सत्कार्यवादः', 'अध्यारोप-अपवाद', 'अनुबन्धचतुष्टयम्', 'षोडशपदार्थाः'],
    },
    {
      number: '04',
      title: 'संस्कृतकाव्यम्, नाटकम् एवं काव्यशास्त्रम्',
      subtitle: 'कालिदास, भवभूति, मम्मट एवं आनन्दवर्धन',
      description: 'रघुवंशम्, किरातार्जुनीयम्, शिशुपालवधम्, नैषधीयचरितम्, अभिज्ञानशाकुन्तलम्, उत्तररामचरितम्, मम्मटस्य काव्यप्रकाशः (काव्यलक्षणम्, शब्दशक्तयः), तथा आनन्दवर्धनस्य ध्वन्यालोकः।',
      keyTerms: ['अभिज्ञानशाकुन्तलम्', 'ध्वन्यालोकः (आनन्दवर्धन)', 'काव्यप्रकाशः (मम्मट)', 'अभिधा-लक्षणा-व्यञ्जना'],
    },
  ],
  memoryExample: {
    questionText: "अष्टाध्याय्याः प्रथमं सूत्रम् अन्तिमं सूत्रं च किं वर्तते?",
    questionMeta: "2023 Paper II • Q02",
    connectionTrick: "पाणिनीय सूत्र क्रम = (प्रथमम्: १.१.१ 'वृद्धिरादैच्'; अन्तिमम्: ८.४.६८ 'अ अ')",
    targetRule: "पाणिनि-प्रणीतायाः अष्टाध्याय्याः प्रथमं सूत्रं 'वृद्धिरादैच्' (१.१.१) तथा च चरमं सूत्रं 'अ अ' (८.४.६८) वर्तते।",
    direction: 'ltr',
  },
  ctaPractice: 'अभ्यासः प्रारभ्यताम् (Start Sanskrit Practice)',
  ctaSyllabus: '१० एककानां सम्पूर्णः पाठ्यक्रमः',
  ctaBenchmark: 'निःशुल्कं परीक्षणं क्रियताम् (Free Benchmark Exam)',
  curriculumBadge: 'NTA द्वारा निर्धारितः संस्कृतपाठ्यक्रमः (१० एककानि)',
  whySectionTitle: 'संस्कृत-JRF परीक्षायै प्रामाणिकं मार्गदर्शनम्',
  whySectionSubtitle: 'वेदमन्त्रादारभ्य आधुनिककाव्यशास्त्रपर्यन्तं समस्तविषयाणां विशदं विश्लेषणम्।',
  paywallHighlights: [
    'विगत २० वर्षाणां समाधानसहितानि प्रश्नपत्राणि (२००४-२०२४)',
    'सामान्यप्रश्नपत्रम् १ (Paper 1) सम्पूर्णतया सम्मिलितम्',
    'व्याकरणसूत्राणां दर्शनसिद्धान्तानां च त्रुटिविशेलेषणम्',
    'NTA CBT आधिकारिकपरीक्षा-सिम्युलेटरः',
  ],
  officialSyllabus: sanskritSyllabus,
  syllabusSource: sanskritSyllabusSource,
};
