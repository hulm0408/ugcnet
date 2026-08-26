import { SubjectConfig } from './types';
import { historySyllabus, historySyllabusSource } from '../../data/syllabus/history';

export const historyConfig: SubjectConfig = {
  code: '06',
  slug: 'history',
  name: 'History',
  nativeName: 'इतिहास एवं ऐतिहासिक स्रोत',
  tagline: 'Archaeological & Epigraphic Sources • Ancient Polity • Delhi Sultanate & Mughals • Modern Freedom Struggle • Historiography',
  positioningHeadline: 'Master UGC NET History —',
  positioningHighlight: 'From Ancient Epigraphy to Modern India.',
  description: 'Conquer Ancient, Medieval, Modern Indian History and Historical Method. Practice 20+ years of verified NTA questions with chronologically indexed dynasties, land revenue systems, and historiographical debates.',
  theme: {
    primaryColor: '#78350F',
    accentColor: '#D97706',
    surfaceGradient: 'from-[#231206] to-[#0A0502]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    visualConcept: 'Archaeological stratigraphy cross-section with labeled excavation layers from Harappa to Modern era',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgHist" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1F0D04" />
            <stop offset="100%" stop-color="#0F0501" />
          </linearGradient>
          <linearGradient id="layerModern" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3D1C08" />
            <stop offset="100%" stop-color="#2D1305" />
          </linearGradient>
          <linearGradient id="layerMughal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#4A2209" />
            <stop offset="100%" stop-color="#361706" />
          </linearGradient>
          <linearGradient id="layerSultanate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#5B290B" />
            <stop offset="100%" stop-color="#421C07" />
          </linearGradient>
          <linearGradient id="layerGupta" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6F320C" />
            <stop offset="100%" stop-color="#512208" />
          </linearGradient>
          <linearGradient id="layerMaurya" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#853C0E" />
            <stop offset="100%" stop-color="#612909" />
          </linearGradient>
          <linearGradient id="layerHarappa" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#9C4510" />
            <stop offset="100%" stop-color="#73300A" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D97706" stroke-width="0.5" stroke-opacity="0.3"/>
          </pattern>
        </defs>
        
        <rect width="500" height="360" rx="20" fill="url(#bgHist)" stroke="#78350F" stroke-width="1.5" />
        
        <!-- Excavation Grid on the right -->
        <rect x="350" y="0" width="150" height="360" fill="url(#grid)" />
        
        <!-- Title -->
        <text x="30" y="40" fill="#FDE68A" font-size="18" font-weight="900" letter-spacing="1">ARCHAEOLOGICAL STRATIGRAPHY</text>
        <text x="30" y="55" fill="#9CA3AF" font-size="10">Cross-section of Indian History</text>

        <!-- Modern Layer -->
        <path d="M 20 70 L 480 70 L 480 110 L 20 110 Z" fill="url(#layerModern)" />
        <line x1="20" y1="110" x2="480" y2="110" stroke="#78350F" stroke-width="2" />
        <text x="35" y="95" fill="#FDE68A" font-size="12" font-weight="bold">Modern Era (1857 CE)</text>
        <text x="360" y="95" fill="#D97706" font-size="10" font-family="monospace">Depth: 1m</text>

        <!-- Mughal Layer -->
        <path d="M 20 110 L 480 110 L 480 150 L 20 150 Z" fill="url(#layerMughal)" />
        <line x1="20" y1="150" x2="480" y2="150" stroke="#78350F" stroke-width="2" />
        <text x="35" y="135" fill="#FDE68A" font-size="12" font-weight="bold">Mughal Empire (1526 CE)</text>
        <text x="360" y="135" fill="#D97706" font-size="10" font-family="monospace">Depth: 3m</text>

        <!-- Delhi Sultanate Layer -->
        <path d="M 20 150 L 480 150 L 480 190 L 20 190 Z" fill="url(#layerSultanate)" />
        <line x1="20" y1="190" x2="480" y2="190" stroke="#78350F" stroke-width="2" />
        <text x="35" y="175" fill="#FDE68A" font-size="12" font-weight="bold">Delhi Sultanate (1206 CE)</text>
        <text x="360" y="175" fill="#D97706" font-size="10" font-family="monospace">Depth: 5m</text>

        <!-- Gupta Layer -->
        <path d="M 20 190 L 480 190 L 480 230 L 20 230 Z" fill="url(#layerGupta)" />
        <line x1="20" y1="230" x2="480" y2="230" stroke="#78350F" stroke-width="2" />
        <text x="35" y="215" fill="#FDE68A" font-size="12" font-weight="bold">Gupta Period (320 CE)</text>
        <circle cx="280" cy="210" r="10" fill="#F59E0B" stroke="#B45309" stroke-width="1" />
        <text x="280" y="213" text-anchor="middle" fill="#78350F" font-size="8" font-weight="bold">C</text>
        <text x="360" y="215" fill="#D97706" font-size="10" font-family="monospace">Depth: 8m</text>

        <!-- Maurya Layer -->
        <path d="M 20 230 L 480 230 L 480 270 L 20 270 Z" fill="url(#layerMaurya)" />
        <line x1="20" y1="270" x2="480" y2="270" stroke="#78350F" stroke-width="2" />
        <text x="35" y="255" fill="#FDE68A" font-size="12" font-weight="bold">Maurya Empire (322 BCE)</text>
        <path d="M 275 260 L 275 240 L 285 240 L 285 260 Z" fill="#9CA3AF" />
        <circle cx="280" cy="235" r="5" fill="#9CA3AF" />
        <text x="360" y="255" fill="#D97706" font-size="10" font-family="monospace">Depth: 12m</text>

        <!-- Harappa Layer -->
        <path d="M 20 270 L 480 270 L 480 330 L 20 330 Z" fill="url(#layerHarappa)" />
        <line x1="20" y1="330" x2="480" y2="330" stroke="#78350F" stroke-width="2" />
        <text x="35" y="305" fill="#FDE68A" font-size="12" font-weight="bold">Harappan Civilization (3300 BCE)</text>
        <rect x="270" y="290" width="20" height="20" fill="#D4D4D8" stroke="#71717A" stroke-width="1" />
        <circle cx="280" cy="300" r="4" fill="#3F3F46" />
        <text x="360" y="305" fill="#D97706" font-size="10" font-family="monospace">Depth: 18m</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Ancient Indian History & Archaeology',
      subtitle: 'Sources, Epigraphy & Polities',
      description: 'Harappan urbanization, Vedic rituals, Mahajanapadas, Mauryan administration, Gupta golden age, Sangam polity, and temple architectural schools (Nagara, Dravida, Vesara).',
      keyTerms: ['Major Rock Edict XIII', 'Prayag Prashasti', 'Sangam Tinai', 'Arthashastra', 'Agrahara Grants'],
    },
    {
      number: '02',
      title: 'Medieval Indian State & Agrarian Structure',
      subtitle: 'Sultanate, Mughals & Regional Kingdoms',
      description: 'Iqta system, Alauddin Khalji market reforms, Mansabdari & Jagirdari under Akbar, Bhakti & Sufi orders, Vijayanagara Nayankara system, and Chhatrapati Shivaji administration.',
      keyTerms: ['Zabt & Dahsala System', 'Chauth & Sardeshmukhi', 'Nayankara', 'Madad-i Maash', 'Sulh-i Kul'],
    },
    {
      number: '03',
      title: 'Modern India & Freedom Struggle',
      subtitle: 'Colonial Economy & Nationalism',
      description: 'Permanent Settlement, Ryotwari, Mahalwari, Drain of Wealth theory, 1857 revolt, socio-religious reforms, INC sessions, Non-Cooperation, Civil Disobedience, and Partition politics.',
      keyTerms: ['Permanent Settlement 1793', 'Drain of Wealth', 'Swadeshi 1905', 'Poona Pact 1932', 'Cabinet Mission'],
    },
    {
      number: '04',
      title: 'Historical Method & Historiography',
      subtitle: 'Schools of Thought & Methodology',
      description: 'Primary vs secondary sources, internal and external criticism, Imperialist, Nationalist, Marxist (D.D. Kosambi, Irfan Habib), Subaltern Studies (Ranajit Guha), and Annals School.',
      keyTerms: ['Subaltern Studies', 'Feudalism Debate', 'Annales School', 'Heuristic Method', 'Hermeneutics'],
    },
  ],
  memoryExample: {
    questionText: "Which land revenue system introduced the 'Dahsala' method based on 10-year average crop yields?",
    questionMeta: "2023 Paper II • Q19",
    connectionTrick: "Todar Mal's Dahsala = (Dah = 10 Years Average + Todar Mal 1580 CE under Akbar)",
    targetRule: "Dahsala system was implemented in 1580 CE by Raja Todar Mal, calculating revenue at 1/3 of the 10-year average yield.",
    direction: 'ltr',
  },
  ctaPractice: 'Start History Practice',
  ctaSyllabus: 'Explore 10 History Units',
  ctaBenchmark: 'Take Free History Benchmark Exam',
  curriculumBadge: 'Official NTA History Curriculum (10 Units)',
  whySectionTitle: 'Chronological Precision for History JRF',
  whySectionSubtitle: 'Detailed coverage of dynasties, inscriptions, revenue terms, and landmark historical treatises.',
  paywallHighlights: [
    '20+ Years of Solved History Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Dynasty, Inscription & Chronology Mistake Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
  officialSyllabus: historySyllabus,
  syllabusSource: historySyllabusSource,
};
