import { SubjectConfig } from './types';

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
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgSkt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B1C04" />
            <stop offset="100%" stop-color="#140801" />
          </linearGradient>
          <linearGradient id="goldSkt" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FBBF24" />
            <stop offset="100%" stop-color="#F59E0B" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgSkt)" stroke="#B45309" stroke-width="1.5" />

        <!-- Vedic Samhita & Paninian Sutra Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1C0C02" stroke="#D97706" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#FEF3C7" font-size="13" font-weight="bold">॥ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् • होतारं रत्नधातमम् ॥</text>
        <text x="250" y="98" text-anchor="middle" fill="#FBBF24" font-size="9">पाणिनीय अष्टाध्यायी (वृद्धिरादैच् • अदेङ्गुणः) • ध्वन्यालोकः • सांख्यकारिका</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#261202" stroke="url(#goldSkt)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900">संस्कृतम्</text>
        <text x="250" y="227" text-anchor="middle" fill="#FBBF24" font-size="10" font-weight="bold" letter-spacing="1">CODE 25</text>

        <!-- Left Node: Veda & Vyakarana -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#190A01" stroke="#B45309" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#FEF3C7" font-size="11" font-weight="bold">वेद एवं व्याकरण</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">ऋग्वेद सूक्त • निरुक्तम्</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">अष्टाध्यायी • सिद्धान्तकौमुदी</text>

        <!-- Right Node: Darshana & Sahitya -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#190A01" stroke="#B45309" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#FEF3C7" font-size="11" font-weight="bold">दर्शन एवं साहित्य</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">सांख्य • वेदान्तसार • तर्कभाषा</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">अभिज्ञानशाकुन्तलम् • मम्मट</text>

        <path d="M 175 210 L 195 210" stroke="#FBBF24" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#FBBF24" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">१० आधिकारिक इकाइयाँ • विगत २० वर्षों का NTA प्रश्न संग्रह</text>
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
};
