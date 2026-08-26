import { SubjectConfig } from './types';
import { paper1Syllabus, paper1SyllabusSource } from '../../data/syllabus/paper-1';

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
            <stop offset="0%" stop-color="#111827" />
            <stop offset="100%" stop-color="#1F2937" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="10" fill="url(#bgP1)" />
        
        <text x="250" y="30" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900" letter-spacing="1">GENERAL PAPER 1</text>

        <!-- 3x3 Reasoning Matrix -->
        <!-- 150x150 centered around x=150, y=130 -->
        <g transform="translate(60, 60)">
          <!-- Grid lines -->
          <path d="M 0 0 L 150 0 L 150 150 L 0 150 Z" fill="none" stroke="#10B981" stroke-width="2"/>
          <path d="M 50 0 L 50 150 M 100 0 L 100 150" stroke="#10B981" stroke-width="2"/>
          <path d="M 0 50 L 150 50 M 0 100 L 150 100" stroke="#10B981" stroke-width="2"/>
          
          <!-- Cell 1,1 -->
          <circle cx="25" cy="25" r="10" fill="none" stroke="#6EE7B7" stroke-width="2"/>
          <!-- Cell 1,2 -->
          <rect x="65" y="15" width="20" height="20" fill="none" stroke="#6EE7B7" stroke-width="2"/>
          <!-- Cell 1,3 -->
          <polygon points="125,15 135,35 115,35" fill="none" stroke="#6EE7B7" stroke-width="2"/>
          
          <!-- Cell 2,1 -->
          <circle cx="25" cy="75" r="10" fill="#6EE7B7"/>
          <!-- Cell 2,2 -->
          <rect x="65" y="65" width="20" height="20" fill="#6EE7B7"/>
          <!-- Cell 2,3 -->
          <polygon points="125,65 135,85 115,85" fill="#6EE7B7"/>
          
          <!-- Cell 3,1 -->
          <circle cx="25" cy="125" r="10" fill="none" stroke="#10B981" stroke-width="4"/>
          <!-- Cell 3,2 -->
          <rect x="65" y="115" width="20" height="20" fill="none" stroke="#10B981" stroke-width="4"/>
          <!-- Cell 3,3 (?) -->
          <text x="125" y="132" text-anchor="middle" fill="#34D399" font-size="20" font-weight="bold">?</text>
        </g>
        <text x="135" y="235" text-anchor="middle" fill="#9CA3AF" font-size="10">LOGICAL REASONING</text>

        <!-- Syllogism Venn Diagram -->
        <g transform="translate(350, 130)">
          <circle cx="-20" cy="-20" r="40" fill="#047857" fill-opacity="0.3" stroke="#10B981" stroke-width="2"/>
          <circle cx="20" cy="-20" r="40" fill="#059669" fill-opacity="0.3" stroke="#34D399" stroke-width="2"/>
          <circle cx="0" cy="20" r="40" fill="#065F46" fill-opacity="0.3" stroke="#6EE7B7" stroke-width="2"/>
          
          <text x="-35" y="-30" fill="#D1D5DB" font-size="10">All P</text>
          <text x="25" y="-30" fill="#D1D5DB" font-size="10">Some Q</text>
          <text x="0" y="45" fill="#D1D5DB" font-size="10" text-anchor="middle">No R</text>
        </g>
        <text x="350" y="235" text-anchor="middle" fill="#9CA3AF" font-size="10">SYLLOGISM</text>

        <!-- Aptitude Elements Below -->
        <g transform="translate(100, 280)">
          <!-- Bar chart for Research Data -->
          <line x1="0" y1="40" x2="60" y2="40" stroke="#10B981" stroke-width="1"/>
          <line x1="0" y1="40" x2="0" y2="0" stroke="#10B981" stroke-width="1"/>
          <rect x="10" y="20" width="10" height="20" fill="#34D399"/>
          <rect x="25" y="10" width="10" height="30" fill="#059669"/>
          <rect x="40" y="30" width="10" height="10" fill="#6EE7B7"/>
          <text x="30" y="55" text-anchor="middle" fill="#9CA3AF" font-size="10">RESEARCH DATA</text>
        </g>
        
        <g transform="translate(300, 280)">
          <!-- Teacher at board icon -->
          <rect x="0" y="0" width="50" height="30" fill="none" stroke="#10B981" stroke-width="2"/>
          <circle cx="65" cy="15" r="5" fill="#34D399"/>
          <path d="M 55" /> <!-- Let's remove the half finished path and do simple lines -->
          <line x1="55" y1="35" x2="65" y2="20" stroke="#34D399" stroke-width="2"/>
          <line x1="65" y1="20" x2="75" y2="35" stroke="#34D399" stroke-width="2"/>
          <text x="35" y="55" text-anchor="middle" fill="#9CA3AF" font-size="10">TEACHING APTITUDE</text>
        </g>
      </svg>
    `,
    visualConcept: 'Reasoning matrix puzzle grid with syllogism Venn diagram and aptitude elements',
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
  officialSyllabus: paper1Syllabus,
  syllabusSource: paper1SyllabusSource,
};
