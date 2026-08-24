import { SubjectConfig } from './types';

export const yogaConfig: SubjectConfig = {
  code: '100',
  slug: 'yoga',
  name: 'Yoga',
  nativeName: 'योग एवं यौगिक विज्ञान',
  tagline: 'पातञ्जलयोगसूत्राणि (अष्टाङ्गयोग) • हठयोगप्रदीपिका एवं घेरण्डसंहिता • उपनिषत्सु योगः • श्रीमद्भगवद्गीता • यौगिकचिकित्सा एवं शरीरक्रियाविज्ञानम्',
  positioningHeadline: 'UGC NET Yoga —',
  positioningHighlight: 'Classical Texts & Yogic Physiology.',
  description: 'Patanjali Yoga Sutras (4 Padas), Hatha Yoga Pradipika (4 Upadeshas), Gheranda Samhita (Saptanga Yoga), Shatkarmas, Pranayama, Bandhas, and Therapeutic Yoga.',
  theme: {
    primaryColor: '#C2410C',
    accentColor: '#F97316',
    surfaceGradient: 'from-[#2C1004] to-[#0D0401]',
    fontFamily: 'font-devanagari',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgYoga" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B1706" />
            <stop offset="100%" stop-color="#140601" />
          </linearGradient>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FB923C" />
            <stop offset="100%" stop-color="#F97316" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgYoga)" stroke="#C2410C" stroke-width="1.5" />

        <!-- Patanjali Yoga Sutra Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1C0A02" stroke="#EA580C" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#FFEDD5" font-size="13" font-weight="bold">॥ योगश्चित्तवृत्तिनिरोधः • तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥</text>
        <text x="250" y="98" text-anchor="middle" fill="#FB923C" font-size="9">अष्टाङ्गयोग (यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान, समाधि)</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#250F03" stroke="url(#orangeGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900">YOGA</text>
        <text x="250" y="227" text-anchor="middle" fill="#FB923C" font-size="10" font-weight="bold" letter-spacing="1">CODE 100</text>

        <!-- Left Node: Patanjali & Gita -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#170801" stroke="#C2410C" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#FFEDD5" font-size="11" font-weight="bold">पातञ्जल एवं गीता</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">४ पादाः (१९५ सूत्राणि)</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">ज्ञान, कर्म, भक्तियोग</text>

        <!-- Right Node: Hatha & Therapy -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#170801" stroke="#C2410C" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#FFEDD5" font-size="11" font-weight="bold">हठयोग एवं चिकित्सा</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">षट्कर्म • कुम्भक ८ प्रकार</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">नाड़ी-चक्र एवं शरीरक्रिया</text>

        <path d="M 175 210 L 195 210" stroke="#FB923C" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#FB923C" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">१० आधिकारिक इकाइयाँ • NTA प्रश्न संग्रह</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'पातञ्जलयोगसूत्राणि',
      subtitle: 'समाधि, साधन, विभूति एवं कैवल्यपाद',
      description: 'चित्तवृत्तयः (प्रमाण, विपर्यय, विकल्प, निद्रा, स्मृति), चित्तभूमयः (क्षिप्त, मूढ़, विक्षिप्त, एकाग्र, निरुद्ध), अष्टाङ्गयोग (यम ५, नियम ५, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान, समाधि), एवं कैवल्यस्वरूपम्।',
      keyTerms: ['योगश्चित्तवृत्तिनिरोधः', 'चित्तभूमयः पञ्च', 'अष्टाङ्गयोग', 'सबीज-निर्बीजसमाधि'],
    },
    {
      number: '02',
      title: 'हठयोगग्रन्थाः (हठप्रदीपिका एवं घेरण्डसंहिता)',
      subtitle: 'षट्कर्म, आसन, कुम्भक, मुद्रा एवं बन्ध',
      description: 'स्वात्मारामस्य हठप्रदीपिका (४ उपदेशाः: आसन, कुम्भक अष्टौ, मुद्रा दश, नादानुसन्धानम्), घेरण्डसंहिता (सप्ताङ्गयोग: शोधन, दृढ़ता, स्थैर्य, धैर्य, लाघव, प्रत्यक्ष, निर्लिप्तता), एवं सिद्धसिद्धान्तपद्धतिः।',
      keyTerms: ['हठप्रदीपिका अष्टकुम्भकाः', 'घेरण्डसंहिता सप्ताङ्गयोग', 'षट्कर्माणि (धौति, बस्ति, नेति, त्राटक, नौलि, कपालभाति)', 'महामुद्रा एवं बन्धत्रयम्'],
    },
    {
      number: '03',
      title: 'उपनिषदः एवं श्रीमद्भगवद्गीतायां योगः',
      subtitle: 'प्रस्थानत्रयी एवं यौगिकतत्त्वानि',
      description: 'कठोपनिषद् (रथ-रूपकम्), श्वेताश्वतरोपनिषद्, तैत्तिरीयोपनिषद् (पञ्चकोशविवेकः), भगवद्गीता (ज्ञानयोग, कर्मयोग, भक्तियोग, ध्यानाभ्यासयोग, स्थितप्रज्ञलक्षणम्), एवं योगवासिष्ठः।',
      keyTerms: ['पञ्चकोशाः (अन्नमय, प्राणमय, मनोमय, विज्ञानमय, आनन्दमय)', 'कर्मण्येवाधिकारस्ते', 'स्थितप्रज्ञलक्षणम्', 'कठोपनिषद् रथरूपकम्'],
    },
    {
      number: '04',
      title: 'यौगिकचिकित्सा एवं शरीरक्रियाविज्ञानम्',
      subtitle: 'नाड़ी, चक्र, कुण्डलिनी एवं स्वास्थ्य',
      description: 'ईडा, पिङ्गला, सुषुम्णा नाड्यः, षट्चक्राणि (मूलाधार, स्वाधिष्ठान, मणिपूर, अनाहत, विशुद्ध, आज्ञा, सहस्रार), कुण्डलिनी जागरणम्, योगोपचार (मधुमेह, उच्चरक्तचाप, तनाव), एवं स्वायत्त-तन्त्रिका-तन्त्रम्।',
      keyTerms: ['सुषुम्णा नाडी', 'षट्चक्राणि', 'स्वायत्त तन्त्रिका तन्त्र (ANS)', 'योगनिद्रा एवं तनावमुक्ति'],
    },
  ],
  memoryExample: {
    questionText: "घेरण्डसंहितानुसारं सप्ताङ्गयोगस्य प्रथमम् अङ्गं किं वर्तते?",
    questionMeta: "2023 Paper II • Q06",
    connectionTrick: "घेरण्ड सप्ताङ्गयोग = (शोधनं षट्कर्मभिः • दृढता आसनेन • स्थैर्यं मुद्रया • धैर्यं प्रत्याहारेण • लाघवं प्राणायामेन • प्रत्यक्षं ध्यानेन • निर्लिप्तं समाधिना)",
    targetRule: "घेरण्डसंहितायां सप्ताङ्गयोगे प्रथमं स्थानं षट्कर्मणा क्रियमाणस्य 'शोधनस्य' अस्ति।",
    direction: 'ltr',
  },
  ctaPractice: 'अभ्यासः प्रारभ्यताम् (Start Yoga Practice)',
  ctaSyllabus: '१० एककानां सम्पूर्णः पाठ्यक्रमः',
  ctaBenchmark: 'निःशुल्कं मॉक परीक्षणम् (Free Benchmark Exam)',
  curriculumBadge: 'NTA द्वारा निर्धारितः आधिकारिक-योगपाठ्यक्रमः (१० एककानि)',
  whySectionTitle: 'योग-JRF परीक्षायै प्रामाणिकं मार्गदर्शनम्',
  whySectionSubtitle: 'पातञ्जलयोगसूत्रादारभ्य हठयोगग्रन्थ-शरीरक्रियाविज्ञानपर्यन्तं सम्पूर्णं विवरणम्।',
  paywallHighlights: [
    'विगत वर्षाणां समाधानसहितानि प्रश्नपत्राणि',
    'सामान्यप्रश्नपत्रम् १ (Paper 1) सम्पूर्णतया सम्मिलितम्',
    'हठयोगसूत्राणां शरीरक्रियाविज्ञानस्य च त्रुटिविशलेषणम्',
    'NTA CBT आधिकारिकपरीक्षा-सिम्युलेटरः',
  ],
};
