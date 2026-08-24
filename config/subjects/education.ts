import { SubjectConfig } from './types';

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
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgEdu" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#083330" />
            <stop offset="100%" stop-color="#021211" />
          </linearGradient>
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2DD4BF" />
            <stop offset="100%" stop-color="#0D9488" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgEdu)" stroke="#0F766E" stroke-width="1.5" />

        <!-- Educational Taxonomy Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#041B19" stroke="#115E59" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#CCFBF1" font-size="12" font-weight="bold">CURRICULUM (TYLER & TABA) • PIAGET & VYGOTSKY • ADDIE & GAGNE 9 EVENTS</text>
        <text x="250" y="98" text-anchor="middle" fill="#2DD4BF" font-size="9">NCTE 2014 Norms • NEP 2020 • PwD Act 2016 (21 Disabilities) • CIPP Model</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#052E2B" stroke="url(#tealGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900">EDUCATION</text>
        <text x="250" y="227" text-anchor="middle" fill="#2DD4BF" font-size="10" font-weight="bold" letter-spacing="1">CODE 09</text>

        <!-- Left Node: Philosophy & Learner -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#031C1A" stroke="#0F766E" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#99F6E4" font-size="11" font-weight="bold">Philosophy & Learner</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Sankhya • Pragmatism • Paulo</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Piaget Schema • Vygotsky ZPD</text>

        <!-- Right Node: Tech & Teacher Ed -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#031C1A" stroke="#0F766E" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#99F6E4" font-size="11" font-weight="bold">Tech & Inclusion</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">ADDIE • ASSURE • Gagne</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">RPwD Act 2016 • CIPP Model</text>

        <path d="M 175 210 L 195 210" stroke="#2DD4BF" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#2DD4BF" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
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
};
