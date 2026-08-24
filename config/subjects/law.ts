import { SubjectConfig } from './types';

export const lawConfig: SubjectConfig = {
  code: '58',
  slug: 'law',
  name: 'Law',
  nativeName: 'विधि एवं न्यायशास्त्र',
  tagline: 'Jurisprudence & Legal Theory • Constitutional & Administrative Law • Public International Law • Law of Crimes & Torts',
  positioningHeadline: 'Master UGC NET Law —',
  positioningHighlight: 'From Jurisprudence to Judicial Precedents.',
  description: 'Strengthen legal reasoning with comprehensive coverage of landmark Supreme Court judgments, statutory provisions, international treaties, and jurisprudential schools with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#854D0E',
    accentColor: '#EAB308',
    surfaceGradient: 'from-[#271704] to-[#0D0701]',
    fontFamily: 'font-serif',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgLaw" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2D1C05" />
            <stop offset="100%" stop-color="#0E0801" />
          </linearGradient>
          <linearGradient id="goldLaw" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FACC15" />
            <stop offset="100%" stop-color="#CA8A04" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgLaw)" stroke="#854D0E" stroke-width="1.5" />

        <!-- Scales of Justice Banner -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1A0F02" stroke="#A16207" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#FEF08A" font-size="12" font-weight="bold">FIAT JUSTITIA RUAT CAELUM • LET JUSTICE BE DONE THOUGH HEAVENS FALL</text>
        <text x="250" y="98" text-anchor="middle" fill="#CA8A04" font-size="9">Audi Alteram Partem • Nemo Judex In Causa Sua • Basic Structure</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#201303" stroke="url(#goldLaw)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="19" font-weight="900">LAW</text>
        <text x="250" y="227" text-anchor="middle" fill="#FACC15" font-size="10" font-weight="bold" letter-spacing="1">CODE 58</text>

        <!-- Left Node: Jurisprudence & Constitution -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#150B01" stroke="#854D0E" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#FDE047" font-size="11" font-weight="bold">Jurisprudence & Const.</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Hart • Kelsen • Fuller • Pound</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Articles 14, 19, 21 • Basic Str.</text>

        <!-- Right Node: Crimes & International Law -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#150B01" stroke="#854D0E" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#FDE047" font-size="11" font-weight="bold">Crimes & Int. Law</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">IPC • Mens Rea • Exceptions</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">UNCLOS • ICJ • Treaties</text>

        <path d="M 175 210 L 195 210" stroke="#FACC15" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#FACC15" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Jurisprudence & Legal Theory',
      subtitle: 'Schools of Law & Jurists',
      description: 'Analytical Positivism (Bentham, Austin, Hart, Kelsen Pure Theory), Natural Law (Fuller, Finnis), Historical School (Savigny Volksgeist), Sociological School (Roscoe Pound Social Engineering), and Realism.',
      keyTerms: ['Kelsen Grundnorm', 'Hart Rule of Recognition', 'Savigny Volksgeist', 'Roscoe Pound Social Engineering'],
    },
    {
      number: '02',
      title: 'Constitutional & Administrative Law',
      subtitle: 'Fundamental Rights & Precedents',
      description: 'Preamble, Golden Triangle (Arts 14, 19, 21), Basic Structure Doctrine, Judicial Review, Writs (Habeas Corpus, Mandamus, Quo Warranto), Delegated Legislation, Principles of Natural Justice, and Ombudsman.',
      keyTerms: ['Maneka Gandhi 1978', 'Kesavananda Bharati 1973', 'Audi Alteram Partem', 'Proportionality Test'],
    },
    {
      number: '03',
      title: 'Public International Law & IHR',
      subtitle: 'Treaties, Statehood & UNCLOS',
      description: 'Sources of International Law (Art 38 ICJ Statute), Recognition of States, State Succession, Law of the Sea (UNCLOS Territorial Sea, EEZ, Continental Shelf), Extradition, Asylum, and ICC Statute.',
      keyTerms: ['Art 38 ICJ Statute', 'Pacta Sunt Servanda', 'Jus Cogens', 'UNCLOS Maritime Zones'],
    },
    {
      number: '04',
      title: 'Law of Crimes & Commercial Laws',
      subtitle: 'IPC, Torts & Intellectual Property',
      description: 'Elements of crime (Actus Reus & Mens Rea), General exceptions (Sec 76–106 IPC), Culpable Homicide vs Murder (Sec 299 vs 300), Strict Liability vs Absolute Liability (M.C. Mehta), and TRIPS Agreement.',
      keyTerms: ['Sec 300 Exceptions', 'Rylands v Fletcher', 'M.C. Mehta Absolute Liability', 'TRIPS Patentability'],
    },
  ],
  memoryExample: {
    questionText: "Which landmark case propounded the 'Absolute Liability' principle without exceptions for hazardous industries in India?",
    questionMeta: "2023 Paper II • Q12",
    connectionTrick: "M.C. Mehta (Oleum Gas Leak 1987) = (Absolute Liability replaces English Strict Liability with zero exceptions)",
    targetRule: "M.C. Mehta v. Union of India (1987) established Absolute Liability, holding hazardous enterprises liable without the Rylands v. Fletcher exceptions.",
    direction: 'ltr',
  },
  ctaPractice: 'Start Law Practice',
  ctaSyllabus: 'Explore 10 Law Units',
  ctaBenchmark: 'Take Free Law Benchmark Exam',
  curriculumBadge: 'Official NTA Law Curriculum (10 Units)',
  whySectionTitle: 'Precision Legal Analysis for Law JRF',
  whySectionSubtitle: 'Master legal maxims, constitutional doctrines, IPC sections, and landmark case laws.',
  paywallHighlights: [
    '20+ Years of Solved Law Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Case-Law, Maxim & Article Mistake Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
};
