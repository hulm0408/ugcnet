import { SubjectConfig } from './types';

export const sociologyConfig: SubjectConfig = {
  code: '05',
  slug: 'sociology',
  name: 'Sociology',
  nativeName: 'समाजशास्त्र एवं सामाजिक सिद्धांत',
  tagline: 'Classical Sociological Thinkers • Modern Theoretical Perspectives • Indian Sociological Thinkers • Methodology & Methods • Social Stratification',
  positioningHeadline: 'Master UGC NET Sociology —',
  positioningHighlight: 'From Classical Foundations to Indian Society.',
  description: 'Master Marx, Weber, Durkheim, Parsons, Merton, Bourdieu, Foucault, G.S. Ghurye, M.N. Srinivas, and B.R. Ambedkar with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#701A75',
    accentColor: '#C026D3',
    surfaceGradient: 'from-[#240626] to-[#0A010B]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgSoc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#340838" />
            <stop offset="100%" stop-color="#0E020F" />
          </linearGradient>
          <linearGradient id="fuchsiaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#E879F9" />
            <stop offset="100%" stop-color="#C026D3" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgSoc)" stroke="#701A75" stroke-width="1.5" />

        <!-- Social Structure Network Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1A031C" stroke="#86198F" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#F5D0FE" font-size="12" font-weight="bold">SOCIAL FACTS • HISTORICAL MATERIALISM • PROTESTANT ETHIC & CAPITALISM</text>
        <text x="250" y="98" text-anchor="middle" fill="#E879F9" font-size="9">Durkheim • Marx • Weber • Parsons AGIL • Merton Manifest/Latent Functions</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#200423" stroke="url(#fuchsiaGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900">SOCIOLOGY</text>
        <text x="250" y="227" text-anchor="middle" fill="#E879F9" font-size="10" font-weight="bold" letter-spacing="1">CODE 05</text>

        <!-- Left Node: Classical & Modern Thinkers -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#140216" stroke="#701A75" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#F5D0FE" font-size="11" font-weight="bold">Classical & Modern</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Durkheim • Marx • Weber</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Bourdieu Habitus • Giddens</text>

        <!-- Right Node: Indian Society & Methods -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#140216" stroke="#701A75" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#F5D0FE" font-size="11" font-weight="bold">Indian Thinkers</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">M.N. Srinivas Sanskritization</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Ambedkar • Ghurye • Dube</text>

        <path d="M 175 210 L 195 210" stroke="#E879F9" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#E879F9" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Sociological Theory & Classical Thinkers',
      subtitle: 'Durkheim, Marx & Max Weber',
      description: 'Émile Durkheim (Social Facts, Suicide Types, Mechanical vs Organic Solidarity), Karl Marx (Historical Materialism, Alienation, Class Struggle), Max Weber (Social Action Types, Ideal Types, Protestant Ethic), and Georg Simmel.',
      keyTerms: ['Social Facts (Durkheim)', 'Anomie & Egoistic Suicide', 'Alienation 4 Dimensions', 'Protestant Ethic Spirit of Capitalism'],
    },
    {
      number: '02',
      title: 'Structural-Functionalism & Conflict Theory',
      subtitle: 'Parsons, Merton & Dahrendorf',
      description: 'Talcott Parsons (AGIL Schema, Pattern Variables, Social System), Robert K. Merton (Manifest & Latent Functions, Reference Group Theory, Anomie Strain Theory), Ralf Dahrendorf (Imperatively Coordinated Associations), and Lewis Coser.',
      keyTerms: ['Parsons AGIL Schema', 'Merton Manifest vs Latent', 'Merton 5 Adaptations to Strain', 'Pattern Variables'],
    },
    {
      number: '03',
      title: 'Indian Thinkers & Indian Society',
      subtitle: 'Sanskritization, Caste & Tribes',
      description: 'G.S. Ghurye (Indological approach, Caste features), M.N. Srinivas (Sanskritization, Westernization, Dominant Caste, Coorgs study), B.R. Ambedkar (Dalit perspective, Annihilation of Caste), S.C. Dube (Shamirpet village), and Irawati Karve.',
      keyTerms: ['M.N. Srinivas Sanskritization', 'Dominant Caste 6 Criteria', 'Irawati Karve Kinship Zones', 'G.S. Ghurye Indology'],
    },
    {
      number: '04',
      title: 'Contemporary Theories & Research Methodology',
      subtitle: 'Post-Structuralism, Habitus & Methods',
      description: 'Pierre Bourdieu (Habitus, Field, Cultural Capital), Michel Foucault (Power/Knowledge, Panopticon), Anthony Giddens (Structuration Theory), Qualitative vs Quantitative methods, Grounded Theory, and Triangulation.',
      keyTerms: ['Bourdieu Cultural Capital', 'Foucault Panopticon', 'Giddens Duality of Structure', 'Grounded Theory'],
    },
  ],
  memoryExample: {
    questionText: "Which four functional prerequisites are formulated in Talcott Parsons' AGIL paradigm?",
    questionMeta: "2023 Paper II • Q11",
    connectionTrick: "Parsons AGIL = (A: Adaptation [Economy]; G: Goal Attainment [Polity]; I: Integration [Legal/Social]; L: Latency/Pattern Maintenance [Family/Culture])",
    targetRule: "Parsons AGIL: A = Adaptation (Economy); G = Goal Attainment (Polity); I = Integration (Law/Community); L = Latency (Family/Education).",
    direction: 'ltr',
  },
  ctaPractice: 'Start Sociology Practice',
  ctaSyllabus: 'Explore 10 Sociology Units',
  ctaBenchmark: 'Take Free Sociology Benchmark Exam',
  curriculumBadge: 'Official NTA Sociology Curriculum (10 Units)',
  whySectionTitle: 'Deep Conceptual Clarity for Sociology JRF',
  whySectionSubtitle: 'From classical European sociology to field studies of Indian villages, caste structures, and post-modern paradigms.',
  paywallHighlights: [
    '20+ Years of Solved Sociology Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Thinkers, Concepts, Field Studies & Books Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
};
