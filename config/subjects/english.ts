import { SubjectConfig } from './types';

export const englishConfig: SubjectConfig = {
  code: '30',
  slug: 'english',
  name: 'English',
  nativeName: 'English Literature & Critical Theory',
  tagline: 'Chaucer to Contemporary • Literary Criticism & Theory • Cultural Studies • Non-British & Postcolonial Literature • Language & Pedagogy',
  positioningHeadline: 'Master UGC NET English —',
  positioningHighlight: 'The Definitive JRF Literature Guide.',
  description: 'Conquer British, American, Postcolonial, Indian English literature, and Critical Theory. Practice 20+ years of official NTA questions with chronologically indexed authors, movements, and key theoretical terms.',
  theme: {
    primaryColor: '#831843',
    accentColor: '#DB2777',
    surfaceGradient: 'from-[#2A0617] to-[#0A0105]',
    fontFamily: 'font-serif',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgEng" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B0720" />
            <stop offset="100%" stop-color="#12010A" />
          </linearGradient>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F472B6" />
            <stop offset="100%" stop-color="#DB2777" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgEng)" stroke="#831843" stroke-width="1.5" />

        <!-- First Folio Silhouette Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#1C030F" stroke="#9D174D" stroke-width="1.5" />
        <text x="250" y="78" text-anchor="middle" fill="#FBCFE8" font-size="12" font-weight="bold">MR. WILLIAM SHAKESPEARES COMEDIES, HISTORIES, & TRAGEDIES (FIRST FOLIO 1623)</text>
        <text x="250" y="98" text-anchor="middle" fill="#F472B6" font-size="9">From Old English Beowulf to Post-Structuralism & Deconstruction</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#240414" stroke="url(#roseGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="18" font-weight="900">ENGLISH</text>
        <text x="250" y="227" text-anchor="middle" fill="#F472B6" font-size="10" font-weight="bold" letter-spacing="1">CODE 30</text>

        <!-- Left Node: British & American -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#18030D" stroke="#831843" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#FBCFE8" font-size="11" font-weight="bold">British & American</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Chaucer • Milton • Wordsworth</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Eliot • Joyce • Morrison</text>

        <!-- Right Node: Theory & Postcolonial -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#18030D" stroke="#831843" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#FBCFE8" font-size="11" font-weight="bold">Theory & Cultural</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Derrida • Foucault • Said</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Achebe • Rushdie • Spivak</text>

        <path d="M 175 210 L 195 210" stroke="#F472B6" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#F472B6" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Drama, Poetry & Fiction (British Literature)',
      subtitle: 'Chaucer to the 21st Century',
      description: 'Canterbury Tales, Elizabethan & Jacobean drama (Shakespeare, Marlowe, Webster), Metaphysical poets (Donne), Augustan satire (Pope, Swift), Romantics (Wordsworth, Coleridge, Keats), Victorians, and Modernists.',
      keyTerms: ['First Folio 1623', 'Metaphysical Conceit', 'Objective Correlative', 'Stream of Consciousness'],
    },
    {
      number: '02',
      title: 'Non-Fiction, Essays & Language in Use',
      subtitle: 'Prose & English Language Teaching (ELT)',
      description: 'Francis Bacon, Charles Lamb, William Hazlitt, Matthew Arnold, George Orwell, Language teaching methods (Direct Method, Communicative Language Teaching - CLT), and Sociolinguistics.',
      keyTerms: ['Baconian Essays', 'Matthew Arnold Touchstone Method', 'Communicative Approach (CLT)'],
    },
    {
      number: '03',
      title: 'Literary Criticism & Critical Theory',
      subtitle: 'Classical to Post-Theory',
      description: 'Aristotle (Poetics), Philip Sidney, Dryden, Wordsworth (Preface to Lyrical Ballads), T.S. Eliot (Tradition & Individual Talent), Russian Formalism, New Criticism, Structuralism, Deconstruction (Derrida), Psychoanalysis, and Eco-criticism.',
      keyTerms: ['Hamartia & Catharsis', 'Dissociation of Sensibility', 'Defamiliarization', 'Différance (Derrida)'],
    },
    {
      number: '04',
      title: 'Postcolonial, Indian Literature & Cultural Studies',
      subtitle: 'Global Voices & Cultural Paradigms',
      description: 'Edward Said (Orientalism), Homi Bhabha (Hybridity, Mimicry), Gayatri Spivak (Can the Subaltern Speak?), Chinua Achebe, Salman Rushdie, Amitav Ghosh, Stuart Hall, and Raymond Williams (Structure of Feeling).',
      keyTerms: ['Orientalism 1978', 'Mimicry & Hybridity', 'Subaltern Voice', 'Culture is Ordinary'],
    },
  ],
  memoryExample: {
    questionText: "Who coined the critical term 'Objective Correlative' in the 1919 essay 'Hamlet and His Problems'?",
    questionMeta: "2023 Paper II • Q05",
    connectionTrick: "T.S. Eliot = (Eliot 1919: a set of objects, a situation, a chain of events which shall be the formula of that particular emotion)",
    targetRule: "T.S. Eliot coined 'Objective Correlative' in 'Hamlet and His Problems' (1919), arguing that Hamlet's emotion lacks an adequate objective equivalent.",
    direction: 'ltr',
  },
  ctaPractice: 'Start English Practice',
  ctaSyllabus: 'Explore 10 English Units',
  ctaBenchmark: 'Take Free English Benchmark Exam',
  curriculumBadge: 'Official NTA English Literature Curriculum (10 Units)',
  whySectionTitle: 'Comprehensive Literature & Theory for English JRF',
  whySectionSubtitle: 'From Renaissance drama and Romantic odes to Post-structuralism and Cultural Studies.',
  paywallHighlights: [
    '20+ Years of Solved English Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Critical Theory, Chronology & Text Mistake Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
};
