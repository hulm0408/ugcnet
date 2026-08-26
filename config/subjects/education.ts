import { SubjectConfig } from './types';
import { educationSyllabus, educationSyllabusSource } from '../../data/syllabus/education';

export const educationConfig: SubjectConfig = {
  code: '09',
  slug: 'education',
  name: 'Education',
  nativeName: 'शिक्षाशास्त्र एवं शैक्षणिक प्रौद्योगिकी',
  tagline: 'Philosophical & Sociological Foundations • Learner & Learning Process • Teacher Education • Educational Research • Educational Technology & Inclusive Education',
  positioningHeadline: 'Master UGC NET Education —',
  positioningHighlight: 'Pedagogy, Curriculum & Educational Research.',
  description: 'Master educational philosophy (Sankhya, Vedanta, Pragmatism), curriculum development (Taba, Tyler), psychometrics, special education, and teacher education policy with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#0F766E',
    accentColor: '#14B8A6',
    surfaceGradient: 'from-[#04201E] to-[#010B0A]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    visualConcept: 'Bloom taxonomy pyramid with 6 cognitive levels and pedagogy methodology labels',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgEdu" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#04201E" />
            <stop offset="100%" stop-color="#010B0A" />
          </linearGradient>
          <linearGradient id="pyr1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#042F2E" />
            <stop offset="100%" stop-color="#0F766E" />
          </linearGradient>
          <linearGradient id="pyr2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0D9488" />
            <stop offset="100%" stop-color="#14B8A6" />
          </linearGradient>
          <linearGradient id="pyr3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#14B8A6" />
            <stop offset="100%" stop-color="#2DD4BF" />
          </linearGradient>
          <linearGradient id="pyr4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2DD4BF" />
            <stop offset="100%" stop-color="#5EEAD4" />
          </linearGradient>
          <linearGradient id="pyr5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#5EEAD4" />
            <stop offset="100%" stop-color="#99F6E4" />
          </linearGradient>
          <linearGradient id="pyr6" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#99F6E4" />
            <stop offset="100%" stop-color="#CCFBF1" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgEdu)" stroke="#0F766E" stroke-width="1.5" />
        
        <!-- Pyramid Base coordinates -->
        <!-- Level 1 (Bottom): Remember -->
        <polygon points="120,320 380,320 350,280 150,280" fill="url(#pyr1)" stroke="#04201E" stroke-width="2" />
        <text x="250" y="305" text-anchor="middle" fill="#CCFBF1" font-size="12" font-weight="bold" letter-spacing="1">REMEMBER</text>
        <circle cx="170" cy="300" r="5" fill="#14B8A6" />
        
        <!-- Level 2: Understand -->
        <polygon points="152,278 348,278 322,240 178,240" fill="url(#pyr2)" stroke="#04201E" stroke-width="2" />
        <text x="250" y="264" text-anchor="middle" fill="#042F2E" font-size="11" font-weight="bold" letter-spacing="1">UNDERSTAND</text>
        <rect x="195" y="256" width="8" height="8" fill="#CCFBF1" />
        
        <!-- Level 3: Apply -->
        <polygon points="180,238 320,238 296,200 204,200" fill="url(#pyr3)" stroke="#04201E" stroke-width="2" />
        <text x="250" y="224" text-anchor="middle" fill="#042F2E" font-size="11" font-weight="bold" letter-spacing="1">APPLY</text>
        <path d="M 215 215 L 223 215 L 219 223 Z" fill="#CCFBF1" />

        <!-- Level 4: Analyze -->
        <polygon points="206,198 294,198 274,160 226,160" fill="url(#pyr4)" stroke="#04201E" stroke-width="2" />
        <text x="250" y="184" text-anchor="middle" fill="#042F2E" font-size="10" font-weight="bold" letter-spacing="1">ANALYZE</text>
        
        <!-- Level 5: Evaluate -->
        <polygon points="228,158 272,158 258,125 242,125" fill="url(#pyr5)" stroke="#04201E" stroke-width="2" />
        <text x="250" y="146" text-anchor="middle" fill="#042F2E" font-size="9" font-weight="bold" letter-spacing="1">EVALUATE</text>

        <!-- Level 6 (Top): Create -->
        <polygon points="244,123 256,123 250,90" fill="url(#pyr6)" stroke="#04201E" stroke-width="2" />
        <circle cx="250" cy="115" r="3" fill="#042F2E" />

        <!-- Labels around the pyramid -->
        <text x="80" y="220" text-anchor="middle" fill="#2DD4BF" font-size="10" font-weight="bold">Behaviorism</text>
        <path d="M 120 216 L 160 216" stroke="#0F766E" stroke-width="1" stroke-dasharray="2,2" />

        <text x="90" y="150" text-anchor="middle" fill="#5EEAD4" font-size="10" font-weight="bold">Cognitivism</text>
        <path d="M 130 146 L 200 146" stroke="#0F766E" stroke-width="1" stroke-dasharray="2,2" />

        <text x="400" y="180" text-anchor="middle" fill="#99F6E4" font-size="10" font-weight="bold">Constructivism</text>
        <path d="M 320 176 L 350 176" stroke="#0F766E" stroke-width="1" stroke-dasharray="2,2" />

        <text x="250" y="50" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900" letter-spacing="2">EDUCATION</text>
        <text x="250" y="70" text-anchor="middle" fill="#14B8A6" font-size="12" font-weight="bold" letter-spacing="1">BLOOM'S TAXONOMY</text>

        <!-- NEP 2020 Badge -->
        <rect x="380" y="30" width="90" height="30" rx="4" fill="#0F766E" stroke="#2DD4BF" stroke-width="1" />
        <text x="425" y="49" text-anchor="middle" fill="#CCFBF1" font-size="10" font-weight="bold">NEP 2020</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Educational Philosophy & Sociology',
      subtitle: 'Schools of Thought & Thinkers',
      description: 'Sankhya, Yoga, Vedanta, Buddhism, Jainism, Islamic traditions, Western philosophies (Idealism, Realism, Pragmatism, Existentialism), and educational thinkers (Swami Vivekananda, Tagore, Gandhi, Sri Aurobindo, J. Krishnamurti, Paulo Freire).',
      keyTerms: ['Sankhya Trigunas', 'Pragmatism (John Dewey)', 'Paulo Freire Pedagogy of Oppressed', 'Integral Education (Aurobindo)'],
    },
    {
      number: '02',
      title: 'Learner & Learning Process',
      subtitle: 'Cognition, Motivation & Guidance',
      description: 'Piaget stages of cognitive development, Vygotsky Zone of Proximal Development (ZPD) & Scaffolding, Bruner Discovery Learning, Gagne 9 Events of Instruction, Hull Drive Reduction theory, and Personality assessments.',
      keyTerms: ['Vygotsky ZPD & MKO', 'Bruner Enactive-Iconic-Symbolic', 'Gagne 9 Events of Instruction', 'Carl Rogers Person-Centered'],
    },
    {
      number: '03',
      title: 'Teacher Education & Curriculum Studies',
      subtitle: 'Policy, Models & Evaluation',
      description: 'Structure of teacher education in India (NCTE, NCERT, SCERT, DIET), Models of curriculum development (Tyler Model, Hilda Taba Inverted Model), and Evaluation models (Stufflebeam CIPP Model, Stake Responsive Model).',
      keyTerms: ['Stufflebeam CIPP Model', 'Hilda Taba Inverted Model', 'Tyler Objective Model', 'NCTE Regulations 2014'],
    },
    {
      number: '04',
      title: 'Educational Technology & Inclusive Education',
      subtitle: 'Instructional Design & Disabilities',
      description: 'Instructional design models (ADDIE, ASSURE, Dick and Carey), E-learning platforms (MOOCs, SWAYAM), Concept of Inclusion vs Integration, RPwD Act 2016 (21 benchmark disabilities), and Assistive technologies.',
      keyTerms: ['ADDIE Model', 'ASSURE Model', 'RPwD Act 2016 (21 Types)', 'Universal Design for Learning (UDL)'],
    },
  ],
  memoryExample: {
    questionText: "What are the four components of Daniel Stufflebeam's CIPP curriculum evaluation model?",
    questionMeta: "2023 Paper II • Q18",
    connectionTrick: "CIPP Model = (C: Context; I: Input; P: Process; P: Product)",
    targetRule: "Stufflebeam's CIPP model evaluates 4 dimensions: Context evaluation (needs/objectives), Input evaluation (resources/strategy), Process evaluation (implementation), Product evaluation (outcomes/impact).",
    direction: 'ltr',
  },
  ctaPractice: 'Start Education Practice',
  ctaSyllabus: 'Explore 10 Education Units',
  ctaBenchmark: 'Take Free Education Benchmark Exam',
  curriculumBadge: 'Official NTA Education Curriculum (10 Units)',
  whySectionTitle: 'Pedagogical Rigor for Education JRF',
  whySectionSubtitle: 'From philosophical foundations to instructional design paradigms, CIPP evaluation, and RPwD provisions.',
  paywallHighlights: [
    '20+ Years of Solved Education Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Curriculum Models, Thinkers & Evaluation Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
  officialSyllabus: educationSyllabus,
  syllabusSource: educationSyllabusSource,
};
