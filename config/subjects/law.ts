import { SubjectConfig } from './types';
import { lawSyllabus, lawSyllabusSource } from '../../data/syllabus/law';

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
    visualConcept: 'Scales of justice with legal codification book and constitutional article pillar',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgLaw" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2D1C05" />
            <stop offset="100%" stop-color="#0A0601" />
          </linearGradient>
          <linearGradient id="goldLaw" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FACC15" />
            <stop offset="100%" stop-color="#854D0E" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgLaw)" stroke="#854D0E" stroke-width="1.5" />

        <!-- Background Book -->
        <path d="M 150 280 C 150 280, 250 250, 250 250 C 250 250, 350 280, 350 280 L 350 150 C 350 150, 250 120, 250 120 C 250 120, 150 150, 150 150 Z" fill="#150901" stroke="#854D0E" stroke-width="2" />
        <path d="M 250 120 L 250 250" stroke="#854D0E" stroke-width="2" />
        <!-- Book Pages lines -->
        <path d="M 160 160 C 160 160, 240 135, 240 135" stroke="#422006" stroke-width="1" />
        <path d="M 160 180 C 160 180, 240 155, 240 155" stroke="#422006" stroke-width="1" />
        <path d="M 340 160 C 340 160, 260 135, 260 135" stroke="#422006" stroke-width="1" />
        <path d="M 340 180 C 340 180, 260 155, 260 155" stroke="#422006" stroke-width="1" />

        <!-- Pillar (Center) -->
        <rect x="235" y="160" width="30" height="130" fill="#2D1C05" stroke="url(#goldLaw)" stroke-width="2" />
        <rect x="225" y="290" width="50" height="15" fill="url(#goldLaw)" />
        <rect x="225" y="145" width="50" height="15" fill="url(#goldLaw)" />
        <!-- Pillar inscriptions -->
        <text x="250" y="190" text-anchor="middle" fill="#FACC15" font-size="10" font-weight="bold">ART. 14</text>
        <text x="250" y="220" text-anchor="middle" fill="#FACC15" font-size="10" font-weight="bold">ART. 19</text>
        <text x="250" y="250" text-anchor="middle" fill="#FACC15" font-size="10" font-weight="bold">ART. 21</text>

        <!-- Crossbar -->
        <path d="M 140 120 L 360 120" stroke="url(#goldLaw)" stroke-width="4" />
        
        <!-- Left Pan (Rights - Higher) -->
        <path d="M 140 120 L 110 200 L 170 200 Z" fill="none" stroke="#A16207" stroke-width="1" />
        <path d="M 110 200 C 110 230, 170 230, 170 200 Z" fill="url(#goldLaw)" />
        <text x="140" y="215" text-anchor="middle" fill="#1A0F02" font-size="10" font-weight="bold">RIGHTS</text>

        <!-- Right Pan (Duties - Lower) -->
        <path d="M 360 120 L 330 220 L 390 220 Z" fill="none" stroke="#A16207" stroke-width="1" />
        <path d="M 330 220 C 330 250, 390 250, 390 220 Z" fill="url(#goldLaw)" />
        <text x="360" y="235" text-anchor="middle" fill="#1A0F02" font-size="10" font-weight="bold">DUTIES</text>

        <!-- Ribbon at Top -->
        <path d="M 100 60 Q 250 40 400 60 L 390 80 Q 250 60 110 80 Z" fill="#422006" stroke="#FACC15" stroke-width="1.5" />
        <text x="250" y="72" text-anchor="middle" fill="#FEF08A" font-size="12" font-weight="bold" letter-spacing="1">FIAT JUSTITIA RUAT CAELUM</text>

        <!-- Small Gavel Bottom Corner -->
        <g transform="translate(410, 280) rotate(-30)">
          <rect x="0" y="0" width="10" height="40" fill="#854D0E" rx="3" />
          <rect x="-15" y="-10" width="40" height="15" fill="url(#goldLaw)" rx="2" />
        </g>

        <!-- Labels -->
        <text x="250" y="340" text-anchor="middle" fill="#FDE047" font-size="18" font-weight="900">LAW (CODE 58)</text>
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
  officialSyllabus: lawSyllabus,
  syllabusSource: lawSyllabusSource,
};
