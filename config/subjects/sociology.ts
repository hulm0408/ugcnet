import { SubjectConfig } from './types';
import { sociologySyllabus, sociologySyllabusSource } from '../../data/syllabus/sociology';

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
    visualConcept: 'Social network sociogram with institutional nodes, tie strength edges, and micro-meso-macro zones',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgSoc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2E1065" />
            <stop offset="100%" stop-color="#4C1D95" />
          </linearGradient>
          <radialGradient id="zoneMacro" cx="50%" cy="50%" r="50%">
            <stop offset="90%" stop-color="transparent" />
            <stop offset="100%" stop-color="#6D28D9" stop-opacity="0.3" />
          </radialGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgSoc)" stroke="#7C3AED" stroke-width="1.5" />

        <!-- Concentric Zones: Micro, Meso, Macro -->
        <circle cx="250" cy="180" r="140" fill="none" stroke="#6D28D9" stroke-width="1" stroke-dasharray="4,4" />
        <text x="250" y="55" fill="#A78BFA" font-size="10" text-anchor="middle" opacity="0.7">MACRO LEVEL (Society / Global)</text>
        
        <circle cx="250" cy="180" r="85" fill="none" stroke="#7C3AED" stroke-width="1" stroke-dasharray="2,2" />
        <text x="250" y="110" fill="#C4B5FD" font-size="10" text-anchor="middle" opacity="0.8">MESO LEVEL (Institutions)</text>

        <!-- Network Edges -->
        <!-- Strong ties (solid) -->
        <g stroke="#A78BFA" stroke-width="2" opacity="0.8">
          <line x1="250" y1="180" x2="180" y2="130" /> <!-- Self to Family -->
          <line x1="250" y1="180" x2="320" y2="130" /> <!-- Self to Education -->
          <line x1="250" y1="180" x2="250" y2="260" /> <!-- Self to Economy -->
          <line x1="180" y1="130" x2="140" y2="100" /> <!-- Family to extended -->
          <line x1="320" y1="130" x2="360" y2="90" /> <!-- Education to higher ed -->
        </g>
        
        <!-- Weak ties (dotted) -->
        <g stroke="#C4B5FD" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6">
          <line x1="250" y1="180" x2="120" y2="220" /> <!-- Self to Religion -->
          <line x1="250" y1="180" x2="380" y2="220" /> <!-- Self to State -->
          <line x1="180" y1="130" x2="320" y2="130" /> <!-- Family to Education -->
          <line x1="120" y1="220" x2="250" y2="260" /> <!-- Religion to Economy -->
          <line x1="380" y1="220" x2="250" y2="260" /> <!-- State to Economy -->
        </g>

        <!-- Macro connections (faint) -->
        <g stroke="#8B5CF6" stroke-width="1" opacity="0.3">
          <line x1="140" y1="100" x2="80" y2="150" />
          <line x1="360" y1="90" x2="420" y2="140" />
          <line x1="250" y1="260" x2="250" y2="320" />
        </g>

        <!-- Nodes -->
        <!-- Central Node: Self/Individual -->
        <circle cx="250" cy="180" r="22" fill="#C4B5FD" stroke="#F5F3FF" stroke-width="2" />
        <text x="250" y="184" fill="#2E1065" font-size="10" font-weight="bold" text-anchor="middle">SELF</text>
        <text x="250" y="215" fill="#DDD6FE" font-size="9" text-anchor="middle">Micro</text>

        <!-- Meso Nodes: Institutions -->
        <circle cx="180" cy="130" r="16" fill="#8B5CF6" />
        <text x="180" y="120" fill="#F5F3FF" font-size="10" font-weight="bold" text-anchor="middle">Family</text>
        
        <circle cx="320" cy="130" r="18" fill="#8B5CF6" />
        <text x="320" y="120" fill="#F5F3FF" font-size="10" font-weight="bold" text-anchor="middle">Education</text>

        <circle cx="120" cy="220" r="15" fill="#7C3AED" />
        <text x="120" y="245" fill="#F5F3FF" font-size="10" font-weight="bold" text-anchor="middle">Religion</text>
        
        <circle cx="380" cy="220" r="17" fill="#7C3AED" />
        <text x="380" y="245" fill="#F5F3FF" font-size="10" font-weight="bold" text-anchor="middle">State</text>
        
        <circle cx="250" cy="260" r="20" fill="#6D28D9" />
        <text x="250" y="288" fill="#F5F3FF" font-size="10" font-weight="bold" text-anchor="middle">Economy</text>

        <!-- Macro Nodes (clusters) -->
        <circle cx="140" cy="100" r="8" fill="#5B21B6" />
        <circle cx="360" cy="90" r="10" fill="#5B21B6" />
        <circle cx="80" cy="150" r="6" fill="#5B21B6" />
        <circle cx="420" cy="140" r="7" fill="#5B21B6" />
        <circle cx="250" cy="320" r="12" fill="#5B21B6" />

        <!-- Legend -->
        <rect x="20" y="20" width="120" height="70" rx="6" fill="#3B0764" opacity="0.8" />
        <text x="30" y="35" fill="#C4B5FD" font-size="10" font-weight="bold">TIE STRENGTH</text>
        <line x1="30" y1="50" x2="60" y2="50" stroke="#A78BFA" stroke-width="2" />
        <text x="70" y="53" fill="#E2E8F0" font-size="9">Strong Tie</text>
        <line x1="30" y1="70" x2="60" y2="70" stroke="#C4B5FD" stroke-width="1.5" stroke-dasharray="3,3" />
        <text x="70" y="73" fill="#E2E8F0" font-size="9">Weak Tie</text>
        
        <!-- Subject Title -->
        <text x="470" y="335" fill="#FFFFFF" font-size="18" font-weight="900" text-anchor="end">SOCIOLOGY (05)</text>
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
  officialSyllabus: sociologySyllabus,
  syllabusSource: sociologySyllabusSource,
};
