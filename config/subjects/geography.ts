import { SubjectConfig } from './types';
import { geographySyllabus, geographySyllabusSource } from '../../data/syllabus/geography';

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
    visualConcept: 'Topographic contour map with elevation cross-section, compass rose, and river path',
    heroSvgIllustration: `
      <svg viewBox="0 0 500 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
        <defs>
          <linearGradient id="bgGeo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#022C22" />
            <stop offset="100%" stop-color="#064E3B" />
          </linearGradient>
        </defs>
        <rect width="500" height="360" rx="20" fill="url(#bgGeo)" stroke="#047857" stroke-width="1.5" />

        <!-- Grid Lines -->
        <g stroke="#047857" stroke-width="0.5" opacity="0.3">
          <line x1="50" y1="0" x2="50" y2="360" />
          <line x1="150" y1="0" x2="150" y2="360" />
          <line x1="250" y1="0" x2="250" y2="360" />
          <line x1="350" y1="0" x2="350" y2="360" />
          <line x1="450" y1="0" x2="450" y2="360" />
          <line x1="0" y1="60" x2="500" y2="60" />
          <line x1="0" y1="120" x2="500" y2="120" />
          <line x1="0" y1="180" x2="500" y2="180" />
          <line x1="0" y1="240" x2="500" y2="240" />
          <line x1="0" y1="300" x2="500" y2="300" />
        </g>
        
        <!-- Grid Coordinates -->
        <text x="50" y="15" fill="#A7F3D0" font-size="8" opacity="0.7">10°E</text>
        <text x="150" y="15" fill="#A7F3D0" font-size="8" opacity="0.7">20°E</text>
        <text x="15" y="60" fill="#A7F3D0" font-size="8" opacity="0.7">10°N</text>
        <text x="15" y="120" fill="#A7F3D0" font-size="8" opacity="0.7">20°N</text>

        <!-- Topographic Contour Lines -->
        <g fill="none" stroke="#10B981" opacity="0.8">
          <!-- 100m -->
          <path d="M 0 100 Q 150 50 300 120 T 500 80 L 500 360 L 0 360 Z" stroke-width="1" />
          <!-- 200m -->
          <path d="M 30 140 Q 200 90 320 150 T 480 130" stroke-width="1.2" />
          <!-- 500m -->
          <path d="M 80 180 Q 220 130 310 190 T 420 180" stroke-width="1.5" />
          <!-- 1000m -->
          <path d="M 140 210 Q 230 170 280 220 T 360 210 C 360 210 320 250 250 250 C 180 250 140 210 140 210 Z" stroke-width="2" />
        </g>
        
        <!-- Elevation Labels -->
        <text x="450" y="90" fill="#A7F3D0" font-size="9">100m</text>
        <text x="400" y="145" fill="#A7F3D0" font-size="9">200m</text>
        <text x="350" y="195" fill="#A7F3D0" font-size="9">500m</text>
        <text x="235" y="225" fill="#A7F3D0" font-size="9" font-weight="bold">1000m</text>
        
        <!-- River Path -->
        <path d="M 150 220 Q 120 160 200 100 T 350 0" fill="none" stroke="#3B82F6" stroke-width="3" opacity="0.7" />
        <text x="210" y="85" fill="#60A5FA" font-size="9" transform="rotate(-30, 210, 85)">RIVER PATH</text>

        <!-- Compass Rose -->
        <g transform="translate(430, 40) scale(0.8)">
          <circle cx="0" cy="0" r="20" fill="none" stroke="#A7F3D0" stroke-width="1" opacity="0.5" />
          <path d="M 0 -25 L 5 -5 L 25 0 L 5 5 L 0 25 L -5 5 L -25 0 L -5 -5 Z" fill="#10B981" opacity="0.8" />
          <text x="0" y="-30" fill="#A7F3D0" font-size="10" text-anchor="middle">N</text>
          <text x="0" y="38" fill="#A7F3D0" font-size="10" text-anchor="middle">S</text>
          <text x="32" y="4" fill="#A7F3D0" font-size="10" text-anchor="middle">E</text>
          <text x="-32" y="4" fill="#A7F3D0" font-size="10" text-anchor="middle">W</text>
        </g>

        <!-- Cross-section Profile below -->
        <rect x="50" y="270" width="400" height="70" rx="4" fill="#021C14" stroke="#047857" stroke-width="1" />
        <text x="60" y="285" fill="#A7F3D0" font-size="10">Elevation Profile A-B</text>
        <path d="M 60 330 L 100 330 L 150 310 L 250 280 L 320 310 L 380 325 L 440 330" fill="none" stroke="#10B981" stroke-width="2" />
        <line x1="60" y1="330" x2="440" y2="330" stroke="#047857" stroke-width="1" />
        <line x1="60" y1="290" x2="60" y2="330" stroke="#047857" stroke-width="1" />

        <!-- Legend Box -->
        <rect x="20" y="160" width="110" height="80" rx="4" fill="#022C22" stroke="#047857" stroke-width="1" opacity="0.9" />
        <text x="30" y="175" fill="#A7F3D0" font-size="10" font-weight="bold">LEGEND</text>
        <line x1="30" y1="190" x2="50" y2="190" stroke="#10B981" stroke-width="1.5" />
        <text x="60" y="193" fill="#E2E8F0" font-size="9">Contour</text>
        <line x1="30" y1="210" x2="50" y2="210" stroke="#3B82F6" stroke-width="2" />
        <text x="60" y="213" fill="#E2E8F0" font-size="9">Water</text>
        <circle cx="40" cy="228" r="3" fill="#10B981" />
        <text x="60" y="231" fill="#E2E8F0" font-size="9">Peak</text>
        
        <!-- Subject Title -->
        <text x="470" y="345" fill="#FFFFFF" font-size="18" font-weight="900" text-anchor="end" opacity="0.9">GEOGRAPHY (80)</text>
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
  officialSyllabus: geographySyllabus,
  syllabusSource: geographySyllabusSource,
};
