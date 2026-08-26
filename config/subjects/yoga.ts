import { SubjectConfig } from './types';
import { yogaSyllabus, yogaSyllabusSource } from '../../data/syllabus/yoga';

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
    visualConcept: 'Ashtanga 8-petal lotus with chakra spine and Om center',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgYoga" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1430" />
            <stop offset="100%" stop-color="#0F0A1A" />
          </linearGradient>
          <radialGradient id="lotusCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#A78BFA" />
            <stop offset="100%" stop-color="#5B21B6" />
          </radialGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgYoga)" stroke="#7C3AED" stroke-width="1.5" />
        
        <!-- Sanskrit Text Title -->
        <text x="250" y="50" text-anchor="middle" fill="#FFFFFF" font-size="18" font-family="sans-serif, Arial Unicode MS, Devanagari" font-weight="900" letter-spacing="2">YOGA (योग)</text>
        <text x="250" y="70" text-anchor="middle" fill="#A78BFA" font-size="12" font-weight="bold" font-family="sans-serif, Arial Unicode MS, Devanagari" letter-spacing="1">योगश्चित्तवृत्तिनिरोधः</text>

        <!-- 8-Petal Lotus (Center ~ x=300, y=210) -->
        <g transform="translate(300, 210)">
          <!-- Petal 1: Yama (Top) -->
          <path d="M 0 0 Q 20 -40 0 -80 Q -20 -40 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="0" y="-85" text-anchor="middle" fill="#E9D5FF" font-size="10">Yama</text>

          <!-- Petal 2: Niyama (Top Right) -->
          <path d="M 0 0 Q 40 -20 56 -56 Q 20 -40 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="65" y="-60" text-anchor="middle" fill="#E9D5FF" font-size="10">Niyama</text>

          <!-- Petal 3: Asana (Right) -->
          <path d="M 0 0 Q 40 20 80 0 Q 40 -20 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="90" y="5" text-anchor="middle" fill="#E9D5FF" font-size="10">Asana</text>

          <!-- Petal 4: Pranayama (Bottom Right) -->
          <path d="M 0 0 Q 20 40 56 56 Q 40 20 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="65" y="70" text-anchor="middle" fill="#E9D5FF" font-size="10">Pranayama</text>

          <!-- Petal 5: Pratyahara (Bottom) -->
          <path d="M 0 0 Q -20 40 0 80 Q 20 40 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="0" y="95" text-anchor="middle" fill="#E9D5FF" font-size="10">Pratyahara</text>

          <!-- Petal 6: Dharana (Bottom Left) -->
          <path d="M 0 0 Q -40 20 -56 56 Q -20 40 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="-65" y="70" text-anchor="middle" fill="#E9D5FF" font-size="10">Dharana</text>

          <!-- Petal 7: Dhyana (Left) -->
          <path d="M 0 0 Q -40 -20 -80 0 Q -40 20 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="-90" y="5" text-anchor="middle" fill="#E9D5FF" font-size="10">Dhyana</text>

          <!-- Petal 8: Samadhi (Top Left) -->
          <path d="M 0 0 Q -20 -40 -56 -56 Q -40 -20 0 0" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1" />
          <text x="-65" y="-60" text-anchor="middle" fill="#E9D5FF" font-size="10">Samadhi</text>

          <!-- Center Om -->
          <circle cx="0" cy="0" r="15" fill="url(#lotusCenter)" />
          <text x="0" y="6" text-anchor="middle" fill="#FFFFFF" font-size="16" font-family="sans-serif, Arial Unicode MS, Devanagari">ओं</text>
        </g>

        <!-- Vertical Chakra Spine (Left side) -->
        <g transform="translate(100, 120)">
          <line x1="0" y1="0" x2="0" y2="180" stroke="#4C1D95" stroke-width="3" />
          
          <!-- Sahasrara (Crown) -->
          <circle cx="0" cy="0" r="7" fill="#E9D5FF" />
          <text x="-20" y="4" text-anchor="end" fill="#E9D5FF" font-size="10">Sahasrara</text>

          <!-- Ajna (Third Eye) -->
          <circle cx="0" cy="30" r="7" fill="#4338CA" />
          <text x="-20" y="34" text-anchor="end" fill="#C4B5FD" font-size="10">Ajna</text>

          <!-- Vishuddha (Throat) -->
          <circle cx="0" cy="60" r="7" fill="#0EA5E9" />
          <text x="-20" y="64" text-anchor="end" fill="#C4B5FD" font-size="10">Vishuddha</text>

          <!-- Anahata (Heart) -->
          <circle cx="0" cy="90" r="7" fill="#22C55E" />
          <text x="-20" y="94" text-anchor="end" fill="#C4B5FD" font-size="10">Anahata</text>

          <!-- Manipura (Solar Plexus) -->
          <circle cx="0" cy="120" r="7" fill="#EAB308" />
          <text x="-20" y="124" text-anchor="end" fill="#C4B5FD" font-size="10">Manipura</text>

          <!-- Svadhishthana (Sacral) -->
          <circle cx="0" cy="150" r="7" fill="#F97316" />
          <text x="-20" y="154" text-anchor="end" fill="#C4B5FD" font-size="10">Svadhishthana</text>

          <!-- Muladhara (Root) -->
          <circle cx="0" cy="180" r="7" fill="#EF4444" />
          <text x="-20" y="184" text-anchor="end" fill="#C4B5FD" font-size="10">Muladhara</text>
        </g>
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
  officialSyllabus: yogaSyllabus,
  syllabusSource: yogaSyllabusSource,
};
