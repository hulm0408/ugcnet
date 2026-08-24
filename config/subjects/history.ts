import { SubjectConfig } from './types';

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
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgHist" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2D1507" />
            <stop offset="100%" stop-color="#0F0602" />
          </linearGradient>
          <linearGradient id="amberHist" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#D97706" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgHist)" stroke="#78350F" stroke-width="1.5" />
        
        <!-- Stratigraphic Timeline & Ashokan Inscription Banner -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1B0C04" stroke="#92400E" stroke-width="1.5" />
        <line x1="70" y1="82" x2="430" y2="82" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="8,4" />
        <text x="250" y="78" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="bold">॥ देवानांप्रिय प्रियदर्शी राजा • धम्म विजय ॥</text>
        <text x="250" y="98" text-anchor="middle" fill="#9CA3AF" font-size="9">Edicts of Ashoka (Major Rock Edicts XIII & Kalinga)</text>

        <!-- Center Emblem: Chronology Matrix -->
        <circle cx="250" cy="210" r="55" fill="#241005" stroke="url(#amberHist)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="17" font-weight="900">HISTORY</text>
        <text x="250" y="227" text-anchor="middle" fill="#F59E0B" font-size="10" font-weight="bold" letter-spacing="1">CODE 06</text>

        <!-- Left Node: Ancient & Medieval -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#180A03" stroke="#78350F" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#FBBF24" font-size="11" font-weight="bold">Ancient & Medieval</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Harappa • Mauryas • Guptas</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Iqta • Mansabdari • Vijayanagar</text>

        <!-- Right Node: Modern & Historiography -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#180A03" stroke="#78350F" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#FBBF24" font-size="11" font-weight="bold">Modern & Method</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Land Settlements • 1857</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Nationalist • Subaltern School</text>

        <path d="M 175 210 L 195 210" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
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
};
