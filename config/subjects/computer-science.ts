import { SubjectConfig } from './types';
import { computerScienceSyllabus, computerScienceSyllabusSource } from '../../data/syllabus/computer-science';

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
    visualConcept: 'Binary tree / finite state automaton diagram with terminal aesthetic',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgCS" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#041217" />
            <stop offset="100%" stop-color="#010608" />
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#06B6D4" />
          </marker>
        </defs>
        
        <rect width="500" height="360" rx="20" fill="url(#bgCS)" stroke="#0E7490" stroke-width="1.5" />
        
        <!-- Background Binary Digits -->
        <g fill="#0E7490" font-family="monospace" font-size="10" opacity="0.3">
          <text x="20" y="40">010010</text>
          <text x="400" y="80">1101</text>
          <text x="60" y="200">10110</text>
          <text x="420" y="300">001011</text>
          <text x="180" y="320">1110001</text>
        </g>
        
        <!-- Title -->
        <text x="250" y="35" text-anchor="middle" fill="#67E8F9" font-family="monospace" font-size="16" font-weight="bold">> ./parse_tree.sh</text>

        <!-- Edges -->
        <path d="M 250 80 L 150 160" stroke="#06B6D4" stroke-width="2" marker-end="url(#arrow)" />
        <path d="M 250 80 L 350 160" stroke="#06B6D4" stroke-width="2" marker-end="url(#arrow)" />
        <path d="M 150 180 L 90 260" stroke="#06B6D4" stroke-width="2" marker-end="url(#arrow)" />
        <path d="M 150 180 L 210 260" stroke="#06B6D4" stroke-width="2" marker-end="url(#arrow)" />
        <path d="M 350 180 L 290 260" stroke="#06B6D4" stroke-width="2" marker-end="url(#arrow)" />
        <path d="M 350 180 L 410 260" stroke="#06B6D4" stroke-width="2" marker-end="url(#arrow)" />
        
        <!-- Nodes -->
        <!-- Root -->
        <circle cx="250" cy="70" r="18" fill="#083344" stroke="#22D3EE" stroke-width="2" />
        <text x="250" y="74" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">50</text>
        
        <!-- Level 1 -->
        <circle cx="150" cy="170" r="18" fill="#083344" stroke="#22D3EE" stroke-width="2" />
        <text x="150" y="174" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">25</text>
        
        <circle cx="350" cy="170" r="18" fill="#083344" stroke="#22D3EE" stroke-width="2" />
        <text x="350" y="174" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">75</text>
        
        <!-- Level 2 -->
        <circle cx="90" cy="270" r="18" fill="#083344" stroke="#22D3EE" stroke-width="2" />
        <text x="90" y="274" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">12</text>
        
        <circle cx="210" cy="270" r="18" fill="#083344" stroke="#22D3EE" stroke-width="2" />
        <text x="210" y="274" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">37</text>
        
        <circle cx="290" cy="270" r="18" fill="#083344" stroke="#22D3EE" stroke-width="2" />
        <text x="290" y="274" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">60</text>
        
        <circle cx="410" cy="270" r="18" fill="#083344" stroke="#22D3EE" stroke-width="2" />
        <text x="410" y="274" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">85</text>

        <!-- Stack on the side -->
        <rect x="450" y="120" width="30" height="90" fill="none" stroke="#0E7490" stroke-width="2" />
        <rect x="452" y="185" width="26" height="20" fill="#06B6D4" opacity="0.8" />
        <rect x="452" y="160" width="26" height="20" fill="#06B6D4" opacity="0.6" />
        <rect x="452" y="135" width="26" height="20" fill="#06B6D4" opacity="0.4" />
        <text x="465" y="225" text-anchor="middle" fill="#67E8F9" font-family="monospace" font-size="10">STACK</text>
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
  officialSyllabus: computerScienceSyllabus,
  syllabusSource: computerScienceSyllabusSource,
};
