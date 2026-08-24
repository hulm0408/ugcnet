import { SubjectConfig } from './types';

export const paper1Config: SubjectConfig = {
  code: '00',
  slug: 'paper-1',
  name: 'General Paper 1',
  nativeName: 'Teaching & Research Aptitude (Common Paper)',
  tagline: 'Teaching Aptitude • Research Methodology • Reading Comprehension • Communication • Mathematical Reasoning • Logical Reasoning & Indian Logic • DI • ICT • People & Environment • Higher Education System',
  positioningHeadline: 'Master UGC NET General Paper 1 —',
  positioningHighlight: 'Score 80+ Marks in Common Paper 1.',
  description: 'Master all 10 high-scoring sections: Pramanas (Indian Logic), Fallacies, Research Ethics, Hypothesis Testing, ICT protocols, SDG/MDG goals, and Higher Education bodies (NEP 2020) with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#0369A1',
    accentColor: '#38BDF8',
    surfaceGradient: 'from-[#031E2C] to-[#01090E]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgP1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#042C40" />
            <stop offset="100%" stop-color="#010F17" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38BDF8" />
            <stop offset="100%" stop-color="#0284C7" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgP1)" stroke="#0369A1" stroke-width="1.5" />

        <!-- Indian Logic & Research Aptitude Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#021B28" stroke="#0284C7" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#BAE6FD" font-size="12" font-weight="bold">INDIAN LOGIC (PRAMANAS) • PRATYAKSHA, ANUMANA, UPAMANA, SHABDA</text>
        <text x="250" y="98" text-anchor="middle" fill="#38BDF8" font-size="9">Hetu & Sadhya • Classical Square of Opposition • NEP 2020 • SDG 17 Goals</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#032537" stroke="url(#skyGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900">PAPER 1</text>
        <text x="250" y="227" text-anchor="middle" fill="#38BDF8" font-size="10" font-weight="bold" letter-spacing="1">CODE 00</text>

        <!-- Left Node: Teaching & Research -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#021C2B" stroke="#0369A1" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#BAE6FD" font-size="11" font-weight="bold">Teaching & Research</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Bloom Taxonomy • Formative</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Type I/II Error • Sampling</text>

        <!-- Right Node: Logic & ICT/Env -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#021C2B" stroke="#0369A1" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#BAE6FD" font-size="11" font-weight="bold">Logic & Env/Higher Ed</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Square of Opposition • Vyapti</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">NEP 2020 • Paris Agreement</text>

        <path d="M 175 210 L 195 210" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Teaching & Research Aptitude',
      subtitle: 'Pedagogy, Evaluation & Methods',
      description: 'Levels of Teaching (Memory, Understanding, Reflective), Bloom Taxonomy, Formative vs Summative assessment, Positivism vs Post-positivism, Probability vs Non-probability sampling, and Type I (Alpha) vs Type II (Beta) errors.',
      keyTerms: ['Bloom Revised Taxonomy', 'Type I vs Type II Error', 'Post-Positivism', 'CBCS Grading System'],
    },
    {
      number: '02',
      title: 'Logical Reasoning & Indian Logic (Pramanas)',
      subtitle: 'Pramanas, Hetvabhasa & Deductive Logic',
      description: 'Nyaya Pramanas: Pratyaksha (Perception), Anumana (Inference), Upamana (Comparison), Shabda (Testimony), Arthapatti (Implication), Anupalabdhi (Non-apprehension), Structure of Anumana (Pratijna, Hetu, Udaharana, Upanaya, Nigamana), and Hetvabhasa (Fallacies).',
      keyTerms: ['Nyaya 5-Membered Syllogism', 'Vyapti (Invariable Concomitance)', 'Hetvabhasa Fallacies', 'Classical Square of Opposition'],
    },
    {
      number: '03',
      title: 'ICT & Communication Systems',
      subtitle: 'Digital Initiatives & Protocols',
      description: 'Barriers to communication, Digital initiatives in higher ed (SWAYAM, SWAYAM PRABHA, NAD, NDL), IPv4 vs IPv6, Binary-Hex conversions, Phishing/Malware, and Cloud Computing.',
      keyTerms: ['SWAYAM 4 Quadrants', 'SWAYAM PRABHA 34 DTH Channels', 'IPv4 (32-bit) vs IPv6 (128-bit)', 'RAM vs ROM Volatility'],
    },
    {
      number: '04',
      title: 'People, Environment & Higher Education',
      subtitle: 'SDGs, MDGs & NEP 2020 Governance',
      description: 'Millennium Development Goals (8 MDGs) vs Sustainable Development Goals (17 SDGs), Montreal Protocol (Ozone), Paris Agreement, National Education Policy (NEP 2020 structure 5+3+3+4), Ancient Universities (Takshashila, Nalanda), and UGC/NAAC/NIRF.',
      keyTerms: ['17 SDG Goals (2015-2030)', 'Montreal Protocol 1987', 'NEP 2020 5+3+3+4', 'Nalanda & Takshashila'],
    },
  ],
  memoryExample: {
    questionText: "In Indian Logic (Nyaya School), what is the term for the 'Middle Term' that serves as the reason or sign in inference?",
    questionMeta: "2023 Paper I • Q04",
    connectionTrick: "Nyaya Anumana Terms = (Hetu / Linga = Middle Term / Reason; Paksha = Minor Term; Sadhya = Major Term)",
    targetRule: "In Nyaya syllogism: Paksha = Minor Term (Subject, e.g., Hill); Sadhya = Major Term (Object, e.g., Fire); Hetu/Linga = Middle Term (Reason, e.g., Smoke).",
    direction: 'ltr',
  },
  ctaPractice: 'Start Paper 1 Practice',
  ctaSyllabus: 'Explore 10 Paper 1 Units',
  ctaBenchmark: 'Take Free Paper 1 Benchmark Exam',
  curriculumBadge: 'Official NTA General Paper 1 Curriculum (10 Units)',
  whySectionTitle: 'Guaranteed 80+ Marks in UGC NET Paper 1',
  whySectionSubtitle: 'Master Indian Logic, Teaching & Research Aptitude, Data Interpretation, and NEP 2020 initiatives.',
  paywallHighlights: [
    '20+ Years of Solved Paper 1 Questions (2004–2024)',
    'Detailed Step-by-Step Mathematical & DI Solutions',
    'Indian Logic (Pramanas) & Fallacies Diagnostic Tracker',
    'Official NTA CBT Mock Simulator with 50-Question Countdown Timer',
  ],
};
