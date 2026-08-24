import { SubjectConfig } from './types';

export const geographyConfig: SubjectConfig = {
  code: '80',
  slug: 'geography',
  name: 'Geography',
  nativeName: 'भूगोल एवं स्थानिक विश्लेषण',
  tagline: 'Geomorphology • Climatology & Oceanography • Geographic Thought • Population & Settlement • GIS & Remote Sensing',
  positioningHeadline: 'Master UGC NET Geography —',
  positioningHighlight: 'From Geomorphic Processes to Spatial GIS.',
  description: 'Master plate tectonics, Köppen & Thornthwaite climate classifications, central place theory, geographical models, and GIS remote sensing with 20+ years of verified NTA questions.',
  theme: {
    primaryColor: '#047857',
    accentColor: '#10B981',
    surfaceGradient: 'from-[#031C14] to-[#010906]',
    fontFamily: 'font-sans',
    scriptDirection: 'ltr',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgGeo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#052E21" />
            <stop offset="100%" stop-color="#020E0A" />
          </linearGradient>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#34D399" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgGeo)" stroke="#047857" stroke-width="1.5" />

        <!-- Topographic Contour Silhouette Header -->
        <rect x="50" y="55" width="400" height="55" rx="8" fill="#021A12" stroke="#065F46" stroke-width="1.5" />
        <path d="M 60 90 Q 150 65 250 85 T 440 75" fill="none" stroke="#34D399" stroke-width="1.5" />
        <path d="M 60 100 Q 150 78 250 95 T 440 88" fill="none" stroke="#10B981" stroke-width="1" stroke-dasharray="4,3" />
        <text x="250" y="75" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="bold">TOPOGRAPHY • GIS LAYERS • KÖPPEN-THORNTHWAITE CLIMATE</text>

        <!-- Center Emblem -->
        <circle cx="250" cy="210" r="55" fill="#043829" stroke="url(#emeraldGrad)" stroke-width="2.5" />
        <text x="250" y="205" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="900">GEOGRAPHY</text>
        <text x="250" y="227" text-anchor="middle" fill="#34D399" font-size="10" font-weight="bold" letter-spacing="1">CODE 80</text>

        <!-- Left Node: Physical Geography -->
        <rect x="45" y="165" width="130" height="90" rx="12" fill="#021C14" stroke="#047857" stroke-width="1" />
        <text x="110" y="195" text-anchor="middle" fill="#6EE7B7" font-size="11" font-weight="bold">Physical Geography</text>
        <text x="110" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Plate Tectonics • Davis Cycle</text>
        <text x="110" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Rossby Waves • El Niño-ENSO</text>

        <!-- Right Node: Human & GIS -->
        <rect x="325" y="165" width="130" height="90" rx="12" fill="#021C14" stroke="#047857" stroke-width="1" />
        <text x="390" y="195" text-anchor="middle" fill="#6EE7B7" font-size="11" font-weight="bold">Human & Methods</text>
        <text x="390" y="215" text-anchor="middle" fill="#E2E8F0" font-size="9">Christaller Central Place</text>
        <text x="390" y="233" text-anchor="middle" fill="#94A3B8" font-size="8">Weber Model • GIS Raster/Vector</text>

        <path d="M 175 210 L 195 210" stroke="#34D399" stroke-width="2" stroke-dasharray="3,3" />
        <path d="M 305 210 L 325 210" stroke="#34D399" stroke-width="2" stroke-dasharray="3,3" />

        <text x="250" y="315" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="bold">10 Official Units • 20+ Years NTA Archive (2004–2024)</text>
      </svg>
    `,
  },
  pillars: [
    {
      number: '01',
      title: 'Geomorphology & Endogenetic Processes',
      subtitle: 'Landforms, Cycles & Tectonics',
      description: 'Plate Tectonics (Wilson Cycle), Continental Drift (Wegener), Davisian vs Penckian cycle of erosion, Karst, Glacial, Aeolian landforms, and Isostasy theories (Airy vs Pratt).',
      keyTerms: ['W.M. Davis Peneplain', 'Penck Primärrumpf', 'Airy Uniform Density', 'Wilson Cycle Tectonics'],
    },
    {
      number: '02',
      title: 'Climatology & Oceanography',
      subtitle: 'Atmosphere, Oceans & Global Circulation',
      description: 'Köppen and Thornthwaite climate classifications, Jet streams, Rossby waves, Tropical vs Temperate cyclones, El Niño/La Niña (ENSO), Ocean currents, and T-S diagram bathymetry.',
      keyTerms: ['Köppen Aw, Cfa, Dfb', 'Thornthwaite PE Index', 'Rossby Waves', 'ENSO Cycle'],
    },
    {
      number: '03',
      title: 'Geographic Thought & Human Geography',
      subtitle: 'Schools, Paradigms & Models',
      description: 'Environmental Determinism vs Possibilism (Ratzel, Vidal de la Blache, Hartshorne), Quantitative Revolution, Christaller Central Place (k=3, k=4, k=7), Weber Industrial Location, and Demographic Transition Model.',
      keyTerms: ['Christaller k=3, 4, 7', 'Weber Isodapane', 'Demographic Transition 5 Stages', 'Possibilism (Blache)'],
    },
    {
      number: '04',
      title: 'Geographical Techniques, Remote Sensing & GIS',
      subtitle: 'Cartography, GPS & Spatial Statistics',
      description: 'Map projections (Mercator, Conical, Zenithal), Remote Sensing sensors (LISS-IV, Landsat, Sentinel), Raster vs Vector data models, Spatial interpolation (IDW, Kriging), and Nearest Neighbour Analysis.',
      keyTerms: ['Nearest Neighbour Rn Statistic', 'Raster vs Vector GIS', 'Mercator Rhumb Lines', 'Kriging Interpolation'],
    },
  ],
  memoryExample: {
    questionText: "In Christaller's Central Place Theory, which 'k-value' represents the Transport Principle (Traffic Principle)?",
    questionMeta: "2023 Paper II • Q17",
    connectionTrick: "Christaller K-Values = (k=3 Marketing; k=4 Transport/Traffic; k=7 Administrative)",
    targetRule: "Walter Christaller established: k=3 for Marketing principle; k=4 for Traffic/Transport principle; k=7 for Administrative principle.",
    direction: 'ltr',
  },
  ctaPractice: 'Start Geography Practice',
  ctaSyllabus: 'Explore 10 Geography Units',
  ctaBenchmark: 'Take Free Geography Benchmark Exam',
  curriculumBadge: 'Official NTA Geography Curriculum (10 Units)',
  whySectionTitle: 'Spatial Mastery for Geography JRF',
  whySectionSubtitle: 'From geomorphic landform formulas to GIS spatial analytics and geographical thought paradigms.',
  paywallHighlights: [
    '20+ Years of Solved Geography Papers (2004–2024)',
    'Complete General Paper 1 Companion Included',
    'Models, Theories, Thinkers & Map Projection Tracker',
    'Official NTA CBT Mock Simulator with Countdown Timer',
  ],
};
