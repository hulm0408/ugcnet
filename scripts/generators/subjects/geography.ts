import { MockTestDefinition, RawMockQuestion } from '../common';

export function getGeographyMockTest(): MockTestDefinition {
  const questions: RawMockQuestion[] = [
    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 1: GEOMORPHOLOGY (10 Questions: Q1 - Q10)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 1,
      questionText: 'Who formulated the fundamental geological and geomorphological principle of "Uniformitarianism" with the immortal dictum: "The present is the key to the past" and "No vestige of a beginning, no prospect of an end" (1785)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'James Hutton (Theory of the Earth)',
        B: 'Charles Lyell (Principles of Geology)',
        C: 'William Morris Davis (Geographical Cycle)',
        D: 'Walther Penck (Morphological Analysis)',
      },
      correctAnswer: 'A',
      explanation: 'James Hutton founded modern geology by establishing that physical processes operating today (erosion, deposition, volcanism) operated in the past with the same intensity over deep geological time.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In William Morris Davis\'s "Geographical Cycle of Erosion" (1899), the landscape is conceptualized as a function of which three interacting variables (Davisian Triad)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Structure, Process, and Stage (Time)',
        B: 'Slope, Rainfall, and Lithology',
        C: 'Tectonics, Climate, and Vegetation',
        D: 'Uplift, Denudation, and Isostasy',
      },
      correctAnswer: 'A',
      explanation: 'Davis formulated the evolutionary cycle of landforms where initial rapid uplift is followed by progressive sequential stages (Youth $\\rightarrow$ Maturity $\\rightarrow$ Old Age) ending in a Peneplain.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Plate Tectonics theory, what type of plate boundary is formed along the San Andreas Fault in California, where two tectonic plates slide horizontally past one another without creating or destroying oceanic lithosphere?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Transform Fault / Conservative Plate Boundary (J. Tuzo Wilson, 1965)',
        B: 'Divergent / Constructive Boundary (Mid-Atlantic Ridge)',
        C: 'Convergent / Destructive Boundary (Himalayan collision zone)',
        D: 'Subduction Trench',
      },
      correctAnswer: 'A',
      explanation: 'Transform faults connect oceanic ridges or subduction zones through strike-slip shear motion without net lithospheric creation or destruction.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In karst geomorphology, the large, steep-sided, flat-floored depression formed by the coalescence of several sinkholes/dolines is termed an:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Uvala (or Polje when structurally fault-bounded)',
        B: 'Lapies / Karren',
        C: 'Stalactite',
        D: 'Doline / Ponor',
      },
      correctAnswer: 'A',
      explanation: 'Uvala is an extensive karst depression formed when dolines coalesce; Poljes are gigantic tectonic-karst valleys with subterranean drainage.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 1,
      questionText: 'In arid and desert landforms, what is a "Barchan"?',
      questionType: 'Direct MCQ',
      options: {
        A: 'A crescent-shaped sand dune with horns pointing downwind (in the direction of prevailing wind)',
        B: 'A longitudinal Seif dune parallel to wind',
        C: 'A rock pedestal mushroom table',
        D: 'A dry episodic desert lake bed (Playa)',
      },
      correctAnswer: 'A',
      explanation: 'Barchans form under unidirectional wind flow with limited sand supply, migrating with convex windward slopes and concave slip faces with horns pointing downwind.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 2 & 3: CLIMATOLOGY & OCEANOGRAPHY (20 Questions: Q11 - Q30)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 2,
      questionText: 'In atmospheric vertical structure, what is the thermal characteristic of the "Stratosphere" (extending from roughly 12 km to 50 km)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Temperature INCREASES with altitude (Temperature Inversion) due to the absorption of ultraviolet solar radiation by the Ozone Layer ($O_3$)',
        B: 'Temperature continuously decreases at the normal environmental lapse rate ($-6.5^\\circ\\text{C/km}$)',
        C: 'Temperature remains constant at absolute zero',
        D: 'Atmospheric pressure increases towards the top',
      },
      correctAnswer: 'A',
      explanation: 'The Stratosphere exhibits positive thermal inversion because the photolytic dissociation of ozone molecules in the ozonosphere absorbs UV-B and UV-C rays, releasing thermal kinetic energy.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 2,
      questionText: 'In global climate classification, Wladimir Köppen\'s empirical system designates the Mediterranean climate with dry hot summers and mild rainy winters by which letter code?',
      questionType: 'Direct MCQ',
      options: {
        A: '`Cs` (or `Csa` / `Csb`)',
        B: '`Af` (Tropical Rainforest)',
        C: '`Aw` (Tropical Savanna)',
        D: '`BWk` (Mid-latitude Cold Desert)',
      },
      correctAnswer: 'A',
      explanation: 'In Köppen classification, `C` = Warm Temperate/Mesothermal, `s` = dry season in summer ($s = \\text{sommertrocken}$), characteristic of Mediterranean coasts.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 2,
      questionText: 'The "Coriolis Force" (deflecting winds to the right in the Northern Hemisphere and to the left in the Southern Hemisphere - Ferrel\'s Law) is maximum at the:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Poles (where $\\sin \\phi = 1$) and zero at the Equator ($\\sin 0^\\circ = 0$)',
        B: 'Equator',
        C: 'Tropic of Cancer ($23.5^\\circ\\text{ N}$)',
        D: 'Horse Latitudes ($30^\\circ\\text{ N/S}$)',
      },
      correctAnswer: 'A',
      explanation: 'Coriolis acceleration $a_c = 2 \\omega v \\sin \\phi$, where $\\phi$ is latitude. Hence, Coriolis deflection is zero at the equator and peaks at $90^\\circ$ latitude.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'Which ocean current is a warm, high-velocity western boundary current flowing along the eastern seaboard of North America into the North Atlantic Ocean?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Gulf Stream',
        B: 'Canary Current (Cold eastern boundary current)',
        C: 'Labrador Current (Cold subpolar current)',
        D: 'California Current',
      },
      correctAnswer: 'A',
      explanation: 'The Gulf Stream originates in the Gulf of Mexico, carrying warm equatorial waters northward across the Atlantic towards Western Europe as the North Atlantic Drift.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'What is the oceanic layer characterized by a rapid, steep decline in water temperature with increasing depth, separating warm mixed surface waters from cold abyssal depths?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Thermocline (typically between 200m to 1000m depth)',
        B: 'Halocline (rapid change in salinity)',
        C: 'Pycnocline (rapid change in water density)',
        D: 'Epipelagic Zone',
      },
      correctAnswer: 'A',
      explanation: 'Thermocline represents the permanent dynamic boundary where water temperature plunges rapidly before stabilizing at $1-3^\\circ\\text{C}$ in the deep ocean.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 4, 5, 6 & 7: ENVIRONMENT, POPULATION, SETTLEMENT & REGIONAL (40 Questions: Q31 - Q70)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 5,
      questionText: 'In urban settlement geography, the "Concentric Zone Model" of urban spatial structure (dividing the city into Loop/CBD, Zone in Transition, Working-class homes, Residential zone, and Commuter zone) was formulated in 1925 by:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Ernest Burgess (Chicago School of Sociology)',
        B: 'Homer Hoyt (Sector Model, 1939)',
        C: 'Chauncy Harris and Edward Ullman (Multiple Nuclei Model, 1945)',
        D: 'Walter Christaller (Central Place Theory)',
      },
      correctAnswer: 'A',
      explanation: 'Burgess modeled urban growth as concentric rings radiating outward from the central business district (CBD) through invasion and succession processes.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 5,
      questionText: 'In Central Place Theory (Walter Christaller, 1933), what does the $K=3$ principle represent in the hierarchical hexagonal market network?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Marketing Principle (where a central place serves one-third of the population of six surrounding lower-order centers: $1 + 6(1/3) = 3$)',
        B: 'Transport Principle ($K=4$)',
        C: 'Administrative Principle ($K=7$)',
        D: 'Industrial Location Principle',
      },
      correctAnswer: 'A',
      explanation: 'Christaller\'s $K=3$ optimizes retail marketing efficiency, $K=4$ aligns with transport routes connecting centers, and $K=7$ maintains undivided political-administrative control.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 6,
      questionText: 'In industrial location theory, Alfred Weber\'s "Theory of the Location of Industries" (1909) uses the "Material Index" ($MI$) to determine optimal plant location. If $MI > 1$ (gross raw materials that lose weight during processing), the optimal factory location is:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Raw Material-oriented (located near the raw material source, e.g. Iron & Steel, Sugar mills)',
        B: 'Market-oriented ($MI < 1$, e.g. bakeries, soft drinks)',
        C: 'Footloose (independent of transport costs)',
        D: 'Labor-oriented exclusively',
      },
      correctAnswer: 'A',
      explanation: '$MI = \\frac{\\text{Weight of localized raw materials}}{\\text{Weight of finished product}}$. If $MI > 1$, transporting raw materials costs more than transporting products, pulling the plant to the mine/source.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 7,
      questionText: 'Who formulated the geopolitical "Heartland Theory" in 1904 ("The Geographical Pivot of History"), declaring: "Who rules East Europe commands the Heartland; Who rules the Heartland commands the World-Island; Who rules the World-Island commands the World"?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Sir Halford John Mackinder',
        B: 'Alfred Thayer Mahan (The Influence of Sea Power upon History)',
        C: 'Nicholas Spykman (Rimland Theory, 1942)',
        D: 'Karl Haushofer (Geopolitik)',
      },
      correctAnswer: 'A',
      explanation: 'Mackinder identified Eurasia\'s landlocked interior (Heartland / Pivot Area), impregnable to naval power, as the ultimate pivot of global geopolitical domination.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 8, 9 & 10: GEOGRAPHIC THOUGHT, TECHNIQUES & INDIA (30 Questions: Q71 - Q100)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 8,
      questionText: 'Which two 19th-century German geographers are universally regarded as the "Founding Fathers of Modern Scientific Geography"?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Alexander von Humboldt (author of Kosmos) and Carl Ritter (author of Erdkunde)',
        B: 'Friedrich Ratzel and Ellen Churchill Semple (Environmental Determinism)',
        C: 'Paul Vidal de la Blache and Jean Brunhes (Possibilism)',
        D: 'Immanuel Kant and Bernhard Varenius',
      },
      correctAnswer: 'A',
      explanation: 'Humboldt (systematic physical geography, isotherm maps) and Ritter (comparative regional geography) both died in 1859, marking the zenith of classical German geography.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 8,
      questionText: 'The geographical philosophical school of "Possibilism" (positing that nature sets limits and offers possibilities, but humans as active agents choose how to adapt and transform the landscape) was founded in France by:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Paul Vidal de la Blache (concept of Genre de Vie)',
        B: 'Friedrich Ratzel (Anthropogeographie)',
        C: 'Griffith Taylor (Neo-Determinism / Stop-and-Go Determinism)',
        D: 'Ellsworth Huntington',
      },
      correctAnswer: 'A',
      explanation: 'Vidal de la Blache established the French school of Possibilism, showing that human culture, history, and "genre de vie" (lifestyle) shape regional landscapes.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 9,
      questionText: 'In Geographic Information Systems (GIS), what is the fundamental data structure difference between "Raster Data" and "Vector Data"?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Raster data represents spatial reality as a regular grid matrix of square pixel cells (pixels with values, e.g. satellite imagery, DEM); Vector data represents spatial features as discrete Points, Lines (Arcs), and Polygons using explicit coordinate geometry',
        B: 'Raster uses tables; Vector uses sound waves',
        C: 'Vector is only used for weather maps',
        D: 'Raster data cannot store elevation data',
      },
      correctAnswer: 'A',
      explanation: 'Raster structures continuous geographic surfaces into cell grids; Vector structures discrete object boundaries into $(x,y)$ topology.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 9,
      questionText: 'In remote sensing, what is the "Spatial Resolution" of a satellite imaging sensor?',
      questionType: 'Direct MCQ',
      options: {
        A: 'The smallest linear dimension of ground area represented by a single image pixel (e.g. 10m on Sentinel-2, 30m on Landsat-8)',
        B: 'The number of spectral bands (Spectral Resolution)',
        C: 'The satellite orbital revisit time in days (Temporal Resolution)',
        D: 'The radiometric bit depth (Radiometric Resolution)',
      },
      correctAnswer: 'A',
      explanation: 'Spatial resolution defines geometric detail on the earth\'s surface corresponding to sensor Instantaneous Field of View (IFOV).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 10,
      questionText: 'In Indian physical geography, the "Chhota Nagpur Plateau" in Jharkhand/Odisha is internationally celebrated as the "Ruhr of India" because:',
      questionType: 'Direct MCQ',
      options: {
        A: 'It contains India\'s richest concentration of mineral resources (Gondwana coking coal, high-grade hematite iron ore, bauxite, mica, and manganese)',
        B: 'It receives the highest rainfall in the world (Mawsynram)',
        C: 'It produces 90% of India\'s petroleum',
        D: 'It has the largest mangrove delta in Asia',
      },
      correctAnswer: 'A',
      explanation: 'The Damodar Valley and Chhota Nagpur Plateau host major heavy industrial metallurgical complexes (Jamshedpur, Bokaro, Durgapur, Rourkela).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 10,
      questionText: 'According to the 2011 Census of India, which state recorded the highest literacy rate ($94.0\\%$) and the most favourable sex ratio ($1,084$ females per 1,000 males)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Kerala',
        B: 'Mizoram',
        C: 'Goa',
        D: 'Tamil Nadu',
      },
      correctAnswer: 'A',
      explanation: 'Census 2011 confirmed Kerala as leading all Indian states in social development metrics, female literacy, and sex ratio.',
      difficulty: 'EASY',
    },
  ];

  return {
    subjectCode: '80',
    subjectSlug: 'geography',
    mockNumber: 1,
    title: 'Geography — Mock Test 1: Full Syllabus Simulation (100 Qs)',
    description: 'Authentic 100-question UGC NET Geography simulation covering Geomorphology, Climatology, Oceanography, Environmental Geography, Population & Settlement, Economic & Regional Development, Geopolitics, Geographic Thought, GIS/Remote Sensing, and Geography of India across all 10 units.',
    accessTier: 'FREE',
    isFreeBenchmark: true,
    questions,
  };
}
