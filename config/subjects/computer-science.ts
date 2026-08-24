import { SubjectConfig } from './types';

export const computerScienceConfig: SubjectConfig = {
  code: '87',
  slug: 'computer-science-and-applications',
  name: 'Computer Science and Applications',
  nativeName: 'कंप्यूटर विज्ञान एवं अनुप्रयोग',
  tagline: 'Discrete Structures • Data Structures & Algorithms • Theory of Computation • Operating Systems • DBMS • Computer Networks • AI & ML',
  positioningHeadline: 'Master UGC NET Computer Science —',
  positioningHighlight: 'Crack JRF with Algorithmic Precision.',
  description: 'Practice high-yield theoretical and numerical questions from TOC, Operating Systems, Computer Architecture, Database Systems, and Software Engineering with verified answer keys.',
  theme: {
    primaryColor: '#0E7490',
    accentColor: '#06B6D4',
    surfaceGradient: 'from-[#06202A] to-[#020B0F]',
    fontFamily: 'font-mono',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgCS" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#082F38" />
            <stop offset="100%" stop-color="#020E12" />
          </linearGradient>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#22D3EE" />
            <stop offset="100%" stop-color="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgCS)" stroke="#0E7490" stroke-width="1.5" />

        <!-- Binary & Syntax Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#04181D" stroke="#155E75" stroke-width="1.5" />
        <text x="75" y="80" fill="#22D3EE" font-size="11" font-family="monospace">01010100 01001111 01000011 (TURING MACHINE δ: Q × Γ → Q × Γ × {L,R})</text>
        <text x="75" y="98" fill="#67E8F9" font-size="10" font-family="monospace">P vs NP • Chomsky Hierarchy: Type 3 ⊂ Type 2 ⊂ Type 1 ⊂ Type 0</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#083344" stroke="url(#cyanGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="15" font-weight="900" font-family="sans-serif">CS & APPS</text>
        <text x="250" y="227" text-anchor="middle" fill="#22D3EE" font-size="10" font-weight="bold" letter-spacing="1">CODE 87</text>

        <!-- Left Node: TOC & Algorithms -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#041A20" stroke="#0E7490" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#67E8F9" font-size="11" font-weight="bold" font-family="sans-serif">TOC & Algo</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9" font-family="sans-serif">DFA/NFA • Pumping Lemma</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8" font-family="sans-serif">Dynamic Prog. • NP-Complete</text>

        <!-- Right Node: Systems & Networks -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#041A20" stroke="#0E7490" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#67E8F9" font-size="11" font-weight="bold" font-family="sans-serif">Systems & Networks</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9" font-family="sans-serif">Paging • BCNF Normalization</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8" font-family="sans-serif">TCP/IP • RSA Cryptography</text>

        <path d="M 175 210 L 195 210" stroke="#22D3EE" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#22D3EE" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold" font-family="sans-serif">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Theory of Computation & Automata',
      subtitle: 'Grammars, Languages & Turing Machines',
      description: 'Chomsky hierarchy (Regular, CFL, CSL, Recursively Enumerable), DFA/NFA minimization, Pumping Lemma, Pushdown Automata, Turing decidability, Halting Problem, and Post Correspondence Problem.',
      keyTerms: ['Chomsky Hierarchy', 'Myhill-Nerode Theorem', 'Pumping Lemma', 'Undecidability of PCP'],
    },
    {
      number: '02',
      title: 'Data Structures & Algorithm Design',
      subtitle: 'Complexity & Paradigms',
      description: 'Asymptotic notation (O, Ω, Θ), Master Theorem for divide & conquer, Dynamic Programming (LCS, 0/1 Knapsack), Greedy techniques (Huffman, Prim, Kruskal), Graph traversals, and P vs NP completeness.',
      keyTerms: ['Master Theorem', 'NP-Complete Reductions', 'Bellman-Ford Algorithm', 'Red-Black Tree'],
    },
    {
      number: '03',
      title: 'Database Management Systems & SQL',
      subtitle: 'Relational Design & Transaction Processing',
      description: 'Relational algebra & tuple calculus, Normal forms (1NF, 2NF, 3NF, BCNF, 4NF, 5NF), Functional dependencies, Lossless join decomposition, ACID properties, Conflict serializability, and 2-Phase Locking.',
      keyTerms: ['BCNF vs 3NF', 'Conflict Serializability', 'Two-Phase Locking (2PL)', 'B+ Tree Indexing'],
    },
    {
      number: '04',
      title: 'Operating Systems & System Architecture',
      subtitle: 'Concurrency, Memory & CPU Scheduling',
      description: 'Process synchronization (Semaphores, Peterson Algorithm), Deadlock handling (Banker Algorithm), Virtual memory, Demand paging, Page replacement (LRU, Optimal), and Disk scheduling (SCAN, C-LOOK).',
      keyTerms: ['Bankers Algorithm', 'Beladys Anomaly', 'TLB Hit Ratio', 'Peterson Mutual Exclusion'],
    },
  ],
  memoryExample: {
    questionText: "Which page replacement algorithm suffers from Belady's Anomaly (increasing page frames results in more page faults)?",
    questionMeta: "2023 Paper II • Q34",
    connectionTrick: "FIFO = (First In First Out causes Belady's Anomaly; Optimal and LRU are Stack Algorithms and never suffer from it)",
    targetRule: "Belady's Anomaly occurs in FIFO replacement. Stack-based algorithms like LRU and OPT are immune because the set of pages in memory for n frames is a subset of n+1 frames.",
    direction: 'ltr',
  },
  ctaPractice: 'Start CS Practice',
  ctaSyllabus: 'Explore 10 CS Units',
  ctaBenchmark: 'Take Free CS Benchmark Exam',
  curriculumBadge: 'Official NTA Computer Science Curriculum (10 Units)',
  whySectionTitle: 'Algorithmic Mastery for Computer Science JRF',
  whySectionSubtitle: 'From automata theory and relational algebra to deadlock algorithms and TCP congestion control.',
  paywallHighlights: [
    '20+ Years of Solved Computer Science Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'TOC, DBMS & OS Numerical Mistake Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
};
