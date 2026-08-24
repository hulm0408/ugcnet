import { SubjectConfig } from './types';

export const politicalScienceConfig: SubjectConfig = {
  code: '02',
  slug: 'political-science',
  name: 'Political Science',
  nativeName: 'राजनीति विज्ञान एवं अंतर्राष्ट्रीय संबंध',
  tagline: 'Political Theory & Thinkers • Indian Constitution & Polity • Comparative Regimes • International Relations & Foreign Policy',
  positioningHeadline: 'Master Political Science —',
  positioningHighlight: 'From Political Thought to Global Governance.',
  description: 'Master Western and Indian political thinkers, constitutional amendments, comparative politics, and IR paradigms with 20+ years of verified UGC NET questions.',
  theme: {
    primaryColor: '#312E81',
    accentColor: '#6366F1',
    surfaceGradient: 'from-[#100F2E] to-[#040412]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgPol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1B4B" />
            <stop offset="100%" stop-color="#070617" />
          </linearGradient>
          <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#818CF8" />
            <stop offset="100%" stop-color="#6366F1" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgPol)" stroke="#3730A3" stroke-width="1.5" />

        <!-- Constitutional Preamble Silhouette -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#0C0A26" stroke="#4338CA" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#C7D2FE" font-size="12" font-weight="bold">WE, THE PEOPLE OF INDIA • SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC</text>
        <text x="250" y="98" text-anchor="middle" fill="#818CF8" font-size="9">JUSTICE • LIBERTY • EQUALITY • FRATERNITY (Basic Structure Doctrine)</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#131138" stroke="url(#indigoGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900">POL SCIENCE</text>
        <text x="250" y="227" text-anchor="middle" fill="#818CF8" font-size="10" font-weight="bold" letter-spacing="1">CODE 02</text>

        <!-- Left Node: Political Thinkers -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#0C0A26" stroke="#3730A3" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#A5B4FC" font-size="11" font-weight="bold">Theory & Thinkers</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Plato • Machiavelli • Gramsci</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Kautilya • Gandhi • Ambedkar</text>

        <!-- Right Node: IR & Governance -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#0C0A26" stroke="#3730A3" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#A5B4FC" font-size="11" font-weight="bold">Institutions & IR</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Parliament • Judicial Review</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Realism • Constructivism • UN</text>

        <path d="M 175 210 L 195 210" stroke="#818CF8" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#818CF8" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Political Theory & Western Thinkers',
      subtitle: 'Liberty, Justice, Power & Ideologies',
      description: 'Plato (Republic), Aristotle (Politics), Machiavelli (Prince), Hobbes, Locke, Rousseau, Marx, J.S. Mill, John Rawls (Theory of Justice), Robert Nozick, and Antonio Gramsci (Hegemony).',
      keyTerms: ['Rawls Veil of Ignorance', 'Gramsci Hegemony', 'Social Contract', 'Nozick Entitlement Theory'],
    },
    {
      number: '02',
      title: 'Indian Political Thought & Thinkers',
      subtitle: 'Ancient to Modern Paradigms',
      description: 'Kautilya (Saptanga Theory & Mandal Siddhanta), Ziauddin Barani, Raja Rammohan Roy, Swami Vivekananda, Rabindranath Tagore, Mahatma Gandhi (Swaraj & Satyagraha), B.R. Ambedkar, and M.N. Roy.',
      keyTerms: ['Saptanga Theory', 'Mandal Siddhanta', 'Hind Swaraj', 'Annihilation of Caste', 'Radical Humanism'],
    },
    {
      number: '03',
      title: 'Indian Constitution & Political Institutions',
      subtitle: 'Rights, Federalism & Governance',
      description: 'Constituent Assembly debates, Fundamental Rights vs DPSP, Basic Structure Doctrine (Kesavananda Bharati), Emergency Provisions, Federal Dynamics (Sarkaria & Punchhi Commissions), and Election Commission.',
      keyTerms: ['Kesavananda Bharati 1973', 'Article 21 Judicial Expansions', 'Sarkaria Commission', 'Collegium System'],
    },
    {
      number: '04',
      title: 'International Relations & Global Order',
      subtitle: 'Theories, Security & Indian Foreign Policy',
      description: 'Realism (Morgenthau, Waltz), Liberalism, Constructivism, Feminism, Security Dilemma, Non-Alignment (NAM), Nuclear Doctrine, Act East Policy, Quad, BRICS, and Indo-Pacific Geopolitics.',
      keyTerms: ['Morgenthau 6 Principles', 'Waltz Structural Realism', 'Constructivism (Wendt)', 'Act East Policy'],
    },
  ],
  memoryExample: {
    questionText: "Who formulated the 'Saptanga Theory' of the state with Seven Elements (Swamin, Amatya, Janapada, Durga, Kosha, Danda, Mitra)?",
    questionMeta: "2023 Paper II • Q08",
    connectionTrick: "Kautilya's Arthashastra = (7 Organs of State: King is the Head, Minister is the Eyes)",
    targetRule: "Kautilya in Arthashastra Book VI defines the Saptanga: 1. Swamin 2. Amatya 3. Janapada 4. Durga 5. Kosha 6. Danda 7. Mitra.",
    direction: 'ltr',
  },
  ctaPractice: 'Start Political Science Practice',
  ctaSyllabus: 'Explore 10 Pol Science Units',
  ctaBenchmark: 'Take Free Pol Science Benchmark Exam',
  curriculumBadge: 'Official NTA Political Science Curriculum (10 Units)',
  whySectionTitle: 'Master Political Theory & Governance for JRF',
  whySectionSubtitle: 'From foundational political philosophy to landmark Supreme Court verdicts and international treaties.',
  paywallHighlights: [
    '20+ Years of Solved Political Science Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Thinkers, Books, Articles & Case-Law Mistake Tracker',
    'Official NTA CBT Mock Simulator with Live Timer',
  ],
};
