import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const geographySyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Geography (Code 80) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const geographySyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit I: Geomorphology',
    topics: [
      {
        name: 'Earth’s Interior, Geological Time Scale and Tectonics',
        subtopics: [
          { name: 'Earth’s Interior: Crust, Mantle, Core, Seismic discontinuities (Conrad, Mohorovičić, Repetti, Gutenberg, Lehmann), Isostasy (Pratt vs Airy models, Joly, Holmes)' },
          { name: 'Endogenetic Forces: Diastrophism (Epeirogenic vs Orogenic movements), Geosynclines (Hall, Dana, Kober’s Orogen Theory), Continental Drift (Alfred Wegener: Pangaea, Panthalassa, Evidence)' },
          { name: 'Plate Tectonics: Plate Boundaries (Divergent, Convergent, Transform), Sea-Floor Spreading (Harry Hess), Paleomagnetism, Hotspots and Mantle Plumes' },
          { name: 'Earthquakes: Seismic Waves (P, S, L waves), Shadow zones, Richter vs Mercalli scales, Volcanoes and Volcanic landforms' },
        ],
      },
      {
        name: 'Exogenetic Processes, Weathering and Mass Wasting',
        subtopics: [
          { name: 'Weathering: Physical/Mechanical (Thermal expansion, Frost wedging, Exfoliation), Chemical (Carbonation, Hydration, Oxidation, Solution), Biological weathering' },
          { name: 'Mass Wasting: Slow movements (Soil creep, Solifluction), Rapid movements (Earthflow, Mudflow, Debris avalanche, Landslides)' },
        ],
      },
      {
        name: 'Geomorphic Cycles and Landscape Evolution',
        subtopics: [
          { name: 'W.M. Davis’ Geographical Cycle of Erosion (Structure, Process, Stage - Youth, Maturity, Old age, Peneplain)' },
          { name: 'Walther Penck’s Morphological Analysis (Penckian Cycle: Primärrumpf, Endrumpf, Aufsteigende/Gleichförmige/Absteigende Entwicklung)' },
          { name: 'L.C. King’s Pediplanation Cycle (Pediments, Scarps, Pedipalin)' },
          { name: 'Dynamic Equilibrium Theory (J.T. Hack) and Slope Development Models (Wood, Davis, Penck, King - Slope Decline, Replacement, Parallel Retreat)' },
        ],
      },
      {
        name: 'Fluvial, Glacial, Aeolian, Coastal and Karst Landforms',
        subtopics: [
          { name: 'Fluvial Landforms: Erosional (V-shaped valleys, Gorges, Canyons, Potholes, Waterfalls) and Depositional (Alluvial fans, Meanders, Oxbow lakes, Natural levees, Deltas)' },
          { name: 'Glacial Landforms: Erosional (Cirques, Arêtes, Horns, U-shaped valleys, Hanging valleys, Fiords) and Depositional (Moraines, Drumlins, Eskers, Kames, Outwash plains)' },
          { name: 'Karst Landforms: Erosional (Lapies, Sinkholes, Poljes, Caves) and Depositional (Stalactites, Stalagmites, Columns, Dripstones)' },
          { name: 'Aeolian & Desert Landforms: Erosional (Yardangs, Zeugen, Mushroom rocks, Ventifacts) and Depositional (Barchans, Seifs, Sand dunes, Loess)' },
          { name: 'Coastal Landforms: Erosional (Cliffs, Wave-cut platforms, Sea caves, Stacks) and Depositional (Beaches, Spits, Bars, Tombolos, Barrier islands)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit II: Climatology',
    topics: [
      {
        name: 'Atmospheric Composition, Structure and Insolation',
        subtopics: [
          { name: 'Composition and Thermal Layering of Atmosphere: Troposphere (Normal Lapse Rate), Stratosphere (Ozonosphere), Mesosphere, Thermosphere (Ionosphere), Exosphere' },
          { name: 'Insolation and Heat Budget of the Earth: Solar Constant, Terrestrial radiation, Albedo of the Earth, Greenhouse Effect' },
          { name: 'Temperature: Horizontal and Vertical Distribution, Temperature Inversion (Surface, Upper air, Valley inversion), Isotherms' },
        ],
      },
      {
        name: 'Atmospheric Pressure, Planetary Wind Systems and Jet Streams',
        subtopics: [
          { name: 'Pressure Belts: Equatorial Low (Doldrums), Subtropical Highs (Horse Latitudes), Subpolar Lows, Polar Highs' },
          { name: 'Planetary Winds: Trade Winds, Westerlies, Polar Easterlies, Coriolis Force, Ferrel’s Law, Geostrophic Winds' },
          { name: 'Local Winds: Foehn, Chinook, Mistral, Sirocco, Bora, Harmattan, Loo, Land and Sea Breezes, Mountain and Valley Breezes' },
          { name: 'Tri-cellular Meridional Circulation: Hadley Cell, Ferrel Cell, Polar Cell' },
          { name: 'Jet Streams: Polar Front Jet, Subtropical Westerly Jet, Tropical Easterly Jet, Index Cycle, Rossby Waves' },
        ],
      },
      {
        name: 'Atmospheric Moisture, Air Masses, Fronts and Cyclones',
        subtopics: [
          { name: 'Humidity: Absolute, Specific, Relative Humidity, Dew Point, Condensation forms (Clouds: High, Middle, Low, Cumulonimbus), Precipitation types' },
          { name: 'Adiabatic Temperature Changes: Dry Adiabatic Lapse Rate (DALR), Saturated/Moist Adiabatic Lapse Rate (SALR), Atmospheric Stability and Instability' },
          { name: 'Air Masses: Source Regions, Classification (cP, cT, mP, mT), Frontogenesis (Warm Front, Cold Front, Occluded Front, Stationary Front)' },
          { name: 'Tropical Cyclones: Origin, Structure (Eye, Eyewall), Conditions for formation vs Temperate / Extra-Tropical Cyclones (Polar Front Theory - Bjerknes)' },
          { name: 'Monsoons: Thermal Concept (Halley), Dynamic Concept (Flohn - ITCZ shift), Jet Stream Theory (Koteswaram), Indian Ocean Dipole (IOD), El Niño-Southern Oscillation (ENSO), La Niña' },
        ],
      },
      {
        name: 'Climatic Classifications and Global Climate Change',
        subtopics: [
          { name: 'W. Köppen’s Empirical Climate Classification: Major Groups (A, B, C, D, E, H) and Sub-types' },
          { name: 'C.W. Thornthwaite’s Rational Classification: 1931 System (Precipitation Effectiveness PE, Thermal Efficiency TE) and 1948 System (Potential Evapotranspiration PET, Moisture Index Im)' },
          { name: 'Trewartha’s Climate Classification' },
          { name: 'Global Warming, Ozone Depletion, Acid Rain, IPCC Reports and Climate Modeling' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit III: Oceanography',
    topics: [
      {
        name: 'Ocean Relief Features and Ocean Bottom Topography',
        subtopics: [
          { name: 'Major Relief Units: Continental Shelf, Continental Slope, Continental Rise, Abyssal Plain' },
          { name: 'Minor Relief Features: Mid-Oceanic Ridges, Deep Sea Trenches/Deeps (Mariana, Puerto Rico, Java), Guyots, Seamounts, Submarine Canyons' },
          { name: 'Bottom Topography of Atlantic Ocean (Mid-Atlantic Ridge), Pacific Ocean, and Indian Ocean (Ninety East Ridge, Chagos-Laccadive Ridge)' },
        ],
      },
      {
        name: 'Temperature, Salinity and Density of Ocean Water',
        subtopics: [
          { name: 'Horizontal and Vertical Distribution of Ocean Temperature: Thermocline layer' },
          { name: 'Ocean Salinity: Factors affecting salinity, Composition of sea water salts (Chlorides, Sodium), Isohalines, Halocline layer' },
          { name: 'Density Stratification of Ocean Waters and Pycnocline' },
        ],
      },
      {
        name: 'Ocean Circulation: Waves, Tides and Currents',
        subtopics: [
          { name: 'Waves: Anatomy of a wave, Wave refraction, Tsunamis' },
          { name: 'Tides: Tide-generating Forces (Gravitational pull of Moon and Sun, Centrifugal force), Types of Tides (Spring Tide, Neap Tide, Apogean/Perigean Tides), Tidal Theories (Newton’s Equilibrium Theory, Laplace’s Dynamic Theory, Airy’s Canal Theory, Whewell’s Progressive Wave Theory, Harris’ Stationary Wave Theory)' },
          { name: 'Ocean Currents: Driving factors, Currents of Atlantic Ocean (Gulf Stream, North Atlantic Drift, Canary, Benguela, Brazil), Pacific Ocean (Kuroshio, Oyashio, California, Peru/Humboldt), Indian Ocean (Monsoon Drift reversals, Agulhas), Thermohaline Circulation (Global Conveyor Belt)' },
        ],
      },
      {
        name: 'Ocean Deposits, Coral Reefs and Marine Resources',
        subtopics: [
          { name: 'Ocean Deposits: Terrigenous (Mud, Sand, Silt) vs Pelagic/Biogenous Deposits (Oozes: Calcareous - Globigerina, Pteropod; Siliceous - Diatom, Radiolarian), Red Clay, Hydrogenous Deposits (Polymetallic Nodules)' },
          { name: 'Coral Reefs: Conditions for coral growth, Types of Coral Reefs (Fringing Reef, Barrier Reef, Atoll), Theories of Coral Reef Formation (Darwin’s Subsidence Theory, Dana’s Theory, Murray’s Non-Subsidence Theory, Daly’s Glacial Control Theory), Coral Bleaching' },
          { name: 'Marine Resources: Biotic (Fisheries), Mineral (Petroleum, Gas Hydrates, Polymetallic Nodules), Energy (Tidal, OTEC), Law of the Sea (UNCLOS)' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit IV: Geography of Environment',
    topics: [
      {
        name: 'Ecosystem: Structure, Function and Energy Flow',
        subtopics: [
          { name: 'Components of Ecosystem: Abiotic vs Biotic (Producers, Consumers, Decomposers)' },
          { name: 'Trophic Levels, Food Chains (Grazing vs Detritus), Food Webs, Ecological Pyramids (Number, Biomass, Energy - Lindeman’s 10% Law)' },
          { name: 'Biogeochemical Cycles: Carbon Cycle, Nitrogen Cycle, Phosphorus Cycle, Hydrological Cycle' },
          { name: 'Ecological Succession: Primary vs Secondary Succession, Seral Stages, Climax Community (Hydrosere, Xerosere)' },
        ],
      },
      {
        name: 'Major Biomes of the World',
        subtopics: [
          { name: 'Tropical Rainforest / Equatorial Biome: Flora, Fauna, Stratification, Shifting cultivation threats' },
          { name: 'Savanna / Tropical Grassland Biome and Temperate Grassland Biome (Steppes, Prairies, Pampas, Veld)' },
          { name: 'Taiga / Boreal Coniferous Forest Biome and Tundra Biome (Permafrost)' },
          { name: 'Desert Biome and Mediterranean Scrubland / Chaparral Biome' },
        ],
      },
      {
        name: 'Environmental Degradation, Pollution and Hazards',
        subtopics: [
          { name: 'Deforestation, Desertification, Soil Erosion, Loss of Biodiversity' },
          { name: 'Pollution: Air, Water (Eutrophication), Soil, Noise, Radioactive, Plastic pollution' },
          { name: 'Natural Hazards: Cyclones, Floods, Droughts, Landslides, Earthquakes, Tsunamis' },
        ],
      },
      {
        name: 'Environmental Conservation, Treaties and Sustainable Development',
        subtopics: [
          { name: 'Biodiversity Conservation: In-situ (National Parks, Wildlife Sanctuaries, Biosphere Reserves - MAB Programme) vs Ex-situ (Botanical Gardens, Gene Banks), Biodiversity Hotspots (Norman Myers)' },
          { name: 'Global Environmental Conventions: Stockholm 1972, Ramsar Convention on Wetlands 1971, CITES, Montreal Protocol 1987, Rio Earth Summit 1992 (Agenda 21, UNFCCC, CBD), Kyoto Protocol 1997, Paris Agreement 2015, SDGs (2015-2030)' },
          { name: 'Environmental Impact Assessment (EIA), Environmental Auditing, Environmental Movements in India (Chipko, Narmada Bachao Andolan, Appiko)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit V: Population and Settlement Geography',
    topics: [
      {
        name: 'Population Distribution, Density, Growth and Theories',
        subtopics: [
          { name: 'Global Patterns of Population Distribution and Physical/Economic determinants' },
          { name: 'Population Growth Trends: Natural Increase, Crude Birth Rate (CBR), Crude Death Rate (CDR), Total Fertility Rate (TFR), Infant Mortality Rate (IMR)' },
          { name: 'Population Theories: Malthusian Theory of Population (Geometric growth vs Arithmetic food), Neo-Malthusianism' },
          { name: 'Demographic Transition Model (Warren Thompson, Frank Notestein - 5 Stages)' },
          { name: 'Optimum Population Theory (Edwin Cannan, Dalton, Robbins)' },
        ],
      },
      {
        name: 'Population Composition, Migration Dynamics and Policies',
        subtopics: [
          { name: 'Population Composition: Age-Sex Pyramids (Expansive, Constrictive, Stationary), Demographic Dividend, Sex Ratio, Literacy, Occupational Structure' },
          { name: 'Migration: Types, Causes (Push and Pull factors)' },
          { name: 'Theories of Migration: E.G. Ravenstein’s Laws of Migration, Everett Lee’s Push-Pull Theory, Wilbur Zelinsky’s Mobility Transition Model, Stouffer’s Intervening Opportunities Model' },
          { name: 'National Population Policies in India (2000 Policy targets) and Global Population Policies' },
        ],
      },
      {
        name: 'Rural Settlements: Types, Patterns and Morphologies',
        subtopics: [
          { name: 'Types of Rural Settlements: Clustered/Nucleated, Semi-Clustered, Hamleted, Dispersed/Isolated' },
          { name: 'Morphological Patterns: Linear, Rectangular, Circular, Radial, Star-shaped, T-shaped, Double village patterns' },
          { name: 'Rural House Types: Building materials, environmental adaptations, regional vernacular architecture in India' },
        ],
      },
      {
        name: 'Urban Settlements: Urbanization, Models and Theories',
        subtopics: [
          { name: 'Urbanization: Trends, Megacities, Conurbations (Patrick Geddes), Megalopolis (Jean Gottmann), Primate City Rule (Mark Jefferson), Rank-Size Rule (G.K. Zipf)' },
          { name: 'Internal Structure of Cities / Urban Morphology Models: Concentric Zone Model (Ernest Burgess 1925), Sector Model (Homer Hoyt 1939), Multiple Nuclei Model (Harris and Ullman 1945)' },
          { name: 'Central Place Theory: Walter Christaller (1933 - Hexagonal market areas, Range of a good, Threshold population, k=3 Marketing, k=4 Transport, k=7 Administrative principles) and August Lösch’s Economic Landscape' },
          { name: 'Rural-Urban Fringe, Urban Sprawl, Smart Cities, Slums and Urban Environmental Problems' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit VI: Geography of Economic Activities and Regional Development',
    topics: [
      {
        name: 'Primary, Secondary, Tertiary and Quaternary Activities',
        subtopics: [
          { name: 'Classification of Economic Activities: Primary (Agriculture, Forestry, Mining), Secondary (Manufacturing), Tertiary (Trade, Transport, Services), Quaternary (Knowledge/Information), Quinary (High-level decision making)' },
          { name: 'World Agriculture Systems (Derwent Whittlesey’s 13 Agricultural Regions: Nomadic herding, Shifting cultivation, Intensive subsistence, Commercial grain, Mediterranean, Plantation agriculture)' },
        ],
      },
      {
        name: 'Agricultural and Industrial Location Theories',
        subtopics: [
          { name: 'Von Thünen’s Isolated State Model of Agricultural Location (1826 - Economic Rent / Locational Rent, Concentric Agricultural Rings, Transport cost assumptions)' },
          { name: 'Alfred Weber’s Theory of Industrial Location (1909 - Least Cost Theory, Material Index MI, Isodapanes, Agglomeration economies, Critical Isodapane)' },
          { name: 'Other Industrial Location Theories: August Lösch (Profit Maximization), D.M. Smith (Spatial Margins of Profitability), Edgar Hoover (Transport Costs)' },
        ],
      },
      {
        name: 'World Energy Resources and Industrial Regions',
        subtopics: [
          { name: 'Conventional Energy: Coal, Petroleum, Natural Gas distribution' },
          { name: 'Non-Conventional Energy: Hydroelectric, Nuclear, Solar, Wind, Biomass' },
          { name: 'Major Industrial Regions of the World: Great Lakes & Appalachian (USA), Ruhr & Midlands (Europe), Kanto & Kansai (Japan), Yangtze & Pearl River Delta (China), Mumbai-Pune, Hooghly, Damodar Valley (India)' },
        ],
      },
      {
        name: 'Regional Planning and Development Models',
        subtopics: [
          { name: 'Concept of Region: Formal, Functional, Perceptual/Vernacular regions' },
          { name: 'Theories of Regional Growth: François Perroux’s Growth Pole Theory, Albert Hirschman’s Trickling Down vs Polarization Effects, Gunnar Myrdal’s Cumulative Causation Theory (Spread vs Backwash Effects), John Friedmann’s Core-Periphery Model' },
          { name: 'Regional Imbalances and Planning in India: Five-Year Plans, Multi-level Planning (District, Block, Panchayat level), Special Area Development Programmes (DPAP, DDP, Hill Area Development, Aspirational Districts Programme)' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit VII: Cultural, Social and Political Geography',
    topics: [
      {
        name: 'Cultural Geography: Realms, Hearths and Acculturation',
        subtopics: [
          { name: 'Concepts: Culture, Cultural Trait, Cultural Complex, Cultural Landscape (Carl Sauer - Berkeley School), Cultural Hearth, Cultural Realm' },
          { name: 'Major Cultural Realms of the World (Occidental, Islamic, Indic, East Asian, South-East Asian, Sub-Saharan African)' },
          { name: 'Cultural Processes: Cultural Diffusion (Expansion, Relocation, Contagious, Hierarchical), Acculturation, Assimilation, Cultural Integration' },
        ],
      },
      {
        name: 'Social Geography: Social Structure, Well-Being and Ethnicity',
        subtopics: [
          { name: 'Social Geography: Concept, Social Space, Social Structure in India (Caste, Class, Religion, Language, Tribe - Scheduled Castes & Scheduled Tribes distribution)' },
          { name: 'Spatial Patterns of Social Well-Being and Quality of Life, Human Development Index (HDI - UNDP parameters: Life expectancy, Education, GNI per capita), Gender Inequality Index (GII)' },
          { name: 'Linguistic Families of India: Indo-Aryan, Dravidian, Austro-Asiatic, Tibeto-Burman' },
        ],
      },
      {
        name: 'Political Geography: Frontiers, Boundaries, Heartland & Rimland',
        subtopics: [
          { name: 'Concepts: State, Nation, Nation-State, Frontiers vs Boundaries (Genetic classification of boundaries: Antecedent, Subsequent, Superimposed, Relict boundaries - Richard Hartshorne)' },
          { name: 'Geopolitical Theories: Halford J. Mackinder’s Heartland Theory (1904/1919 - Geographical Pivot of History: Who rules East Europe commands the Heartland; Who rules the Heartland commands the World-Island; Who rules the World-Island commands the World)' },
          { name: 'Nicholas J. Spykman’s Rimland Theory (1944 - Who controls the Rimland rules Eurasia; Who rules Eurasia controls the destinies of the world)' },
          { name: 'A.T. Mahan’s Sea Power Theory, Alexander de Seversky’s Air Power Theory, Geopolitics of Indian Ocean, Maritime Boundaries and EEZ disputes' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit VIII: Geographic Thought',
    topics: [
      {
        name: 'Contributions of Greek, Roman, Arab and Medieval Geographers',
        subtopics: [
          { name: 'Ancient Greek Geographers: Homer, Thales, Anaximander (Gnomon, First World Map), Hecataeus (Father of Geography - Periodos Ges), Herodotus (All history must be treated geographically), Eratosthenes (Coined "Geography", Calculated Earth’s circumference), Hipparchus (Astrolabe, 360° division), Posidonius' },
          { name: 'Roman Geographers: Strabo (Geographia in 17 volumes - Encyclopedic approach), Ptolemy (Guide to Geography / Geographia - Map projections, Optical errors, Almagest)' },
          { name: 'Arab Geographers: Al-Balkhi, Al-Masudi (Kitab Murad-al-Dhahab - Monsoon analysis), Al-Biruni (Kitab-al-Hind, Qanun-al-Masudi), Al-Idrisi (Tabula Rogeriana), Ibn Battuta (Rihla), Ibn Khaldun (Muqaddimah - Environmental determinism)' },
          { name: 'Age of Exploration & Varenius: Bernhard Varenius (Geographia Generalis - General vs Special Geography dichotomy), Immanuel Kant (Physical Geography, Chorological approach)' },
        ],
      },
      {
        name: 'German and French Schools of Geography',
        subtopics: [
          { name: 'Founders of Modern Geography: Alexander von Humboldt (Kosmos - Systematic physical geography, Comparative method, Isotherms) and Carl Ritter (Erdkunde - Teleological approach, Regional geography, Comparative geography)' },
          { name: 'German Geographers: Friedrich Ratzel (Anthropogeographie, Politische Geographie - Lebensraum concept, Father of Human & Political Geography), Ferdinand von Richthofen (Chorology), Alfred Hettner (Chorological science)' },
          { name: 'French School & Possibilism: Paul Vidal de la Blache (Tableau de la géographie de la France - Possibilism, Genre de vie / Lifestyle, Pays), Jean Brunhes, Emmanuel de Martonne, Albert Demangeon' },
        ],
      },
      {
        name: 'British and American Schools and Paradigms in Geography',
        subtopics: [
          { name: 'British Geographers: Halford Mackinder, A.J. Herbertson (Natural regions), Peter Haggett' },
          { name: 'American Geographers: William Morris Davis, Ellen Churchill Semple (Influences of Geographic Environment - Extreme Determinism), Ellsworth Huntington (Civilization and Climate), Carl O. Sauer (Cultural Landscape), Richard Hartshorne (The Nature of Geography 1939 - Areal Differentiation)' },
          { name: 'Paradigms: Environmental Determinism vs Possibilism, Neo-Determinism / Stop-and-Go Determinism (Griffith Taylor), Quantitative Revolution (1950s-1960s - Spatial Science, Fred K. Schaefer - Exceptionalism in Geography)' },
        ],
      },
      {
        name: 'Contemporary Philosophical Paradigms in Geography',
        subtopics: [
          { name: 'Positivism and Spatial Analysis in Geography' },
          { name: 'Behavioural Geography (William Kirk, Julian Wolpert, Peter Gould - Cognitive Maps, Mental Maps, Bounded Rationality)' },
          { name: 'Humanistic Geography (Yi-Fu Tuan - Topophilia, Space and Place; Anne Buttimer, Edward Relph - Placelessness)' },
          { name: 'Radical and Marxist Geography (David Harvey - Social Justice and the City, Limits to Capital; Richard Peet - Antipode journal), Welfare Geography (D.M. Smith - Who gets what, where, and how), Feminist Geography, Postmodern Geography (Edward Soja)' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit IX: Geographical Techniques',
    topics: [
      {
        name: 'Cartography, Scales, Map Projections and Topographical Maps',
        subtopics: [
          { name: 'Scales: Representative Fraction (R.F.), Plain, Diagonal, and Comparative Scales' },
          { name: 'Map Projections: Classification (Conical, Cylindrical, Zenithal, Conventional), Preserved Properties (Conformal/Orthomorphic, Equal Area/Homolographic, Equidistant, Azimuthal), Mercator’s Projection (Rhumb lines / Loxodromes), Gnomonic, Polyconic, Bonne’s Projection' },
          { name: 'Topographical Maps: Survey of India (SOI) Open Series Maps (OSM), Indexing sheets (1:1,000,000, 1:250,000, 1:50,000, 1:25,000), Contour interpretation, Profiles (Serial, Superimposed, Composite, Projected)' },
        ],
      },
      {
        name: 'Remote Sensing and Aerial Photography',
        subtopics: [
          { name: 'Remote Sensing Principles: Electromagnetic Radiation (EMR), Electromagnetic Spectrum (Visible, Infrared, Thermal, Microwave), Atmospheric Windows, Spectral Signatures' },
          { name: 'Sensors and Resolutions: Spatial, Spectral, Radiometric, Temporal Resolution, Active vs Passive Remote Sensing (LIDAR, RADAR)' },
          { name: 'Satellites: Sun-Synchronous (Landsat, SPOT, IRS, Sentinel) vs Geostationary Satellites (INSAT)' },
          { name: 'Aerial Photography: Types (Vertical, Low Oblique, High Oblique), Scale of aerial photograph, Stereoscopic parallax, Relief displacement' },
        ],
      },
      {
        name: 'Geographic Information Systems (GIS) and GNSS / GPS',
        subtopics: [
          { name: 'GIS Concepts: Spatial Data (Vector: Points, Lines, Polygons vs Raster: Pixels, Grid cells) and Attribute Data' },
          { name: 'Spatial Data Analysis: Overlay Analysis (Union, Intersect, Clip), Buffer Analysis, Network Analysis, Digital Elevation Model (DEM/DTM), Spatial Interpolation (Kriging, IDW)' },
          { name: 'Global Navigation Satellite Systems (GNSS): GPS (NAVSTAR - USA), GLONASS (Russia), Galileo (EU), BeiDou (China), NavIC / IRNSS (India) - Segments (Space, Control, User), Triangulation' },
        ],
      },
      {
        name: 'Quantitative and Statistical Techniques in Geography',
        subtopics: [
          { name: 'Measures of Central Tendency and Dispersion (Mean, Standard Deviation, Coefficient of Variation)' },
          { name: 'Spatial Statistics: Nearest Neighbour Analysis (Rn Statistic: 0 = Clustered, 1 = Random, 2.149 = Regular/Uniform grid), Lorenz Curve and Gini’s Coefficient (Inequality)' },
          { name: 'Correlation and Regression Analysis, Principal Component Analysis (PCA), Factor Analysis' },
          { name: 'Hypothesis Testing in Geography: Student’s t-test, Chi-Square test, ANOVA' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit X: Geography of India',
    topics: [
      {
        name: 'Physiography, Geological Structure and Drainage Systems',
        subtopics: [
          { name: 'Geological Formations of India: Archaean, Dharwar, Cuddapah, Vindhyan, Gondwana, Deccan Traps, Tertiary' },
          { name: 'Physiographic Divisions: Northern Mountains (Himalayas - Trans, Greater, Lesser, Shiwalik), Great Northern Plains (Bhabar, Tarai, Bhangar, Khadar), Peninsular Plateau, Coastal Plains (Western vs Eastern), Islands' },
          { name: 'Drainage Systems: Himalayan Rivers (Indus, Ganga, Brahmaputra - Antecedent drainage) vs Peninsular Rivers (Narmada, Tapi, Godavari, Krishna, Cauvery, Mahanadi - Consequent/Superimposed drainage)' },
        ],
      },
      {
        name: 'Climate, Natural Vegetation and Soil Types',
        subtopics: [
          { name: 'Climate of India: Indian Monsoon mechanism, Seasons (Winter, Pre-monsoon, SW Monsoon, Retreating NE Monsoon - Western Disturbances, Mango showers, Kalbaisakhi), Rainfall distribution' },
          { name: 'Natural Vegetation: Classification (Tropical Evergreen, Deciduous, Thorn, Mountain, Mangrove forests), Forest Conservation policies, State of Forest Report (ISFR)' },
          { name: 'Soils of India (ICAR Classification): Alluvial (Khadar/Bhangar), Black / Regur, Red & Yellow, Laterite, Arid, Saline, Peaty soils, Soil Degradation and Conservation' },
        ],
      },
      {
        name: 'Agriculture, Mineral, Energy and Industrial Sectors',
        subtopics: [
          { name: 'Agriculture: Major Crops (Rice, Wheat, Cotton, Jute, Sugarcane, Tea, Coffee), Green Revolution, White Revolution, Blue Revolution, Agricultural Regions of India' },
          { name: 'Mineral Resources: Iron Ore (Kudremukh, Bailadila), Bauxite, Manganese, Mica, Copper distribution' },
          { name: 'Energy Resources: Coalfields (Damodar, Son, Mahanadi, Godavari Valleys), Petroleum basins (Bombay High, Assam, Krishna-Godavari), Renewable energy parks' },
          { name: 'Major Industrial Belts of India: Mumbai-Pune, Hooghly, Chota Nagpur, Bengaluru-Tamil Nadu, Gujarat, Delhi-Meerut' },
        ],
      },
      {
        name: 'Population, Urbanization and Regional Disparities in India',
        subtopics: [
          { name: 'Population Dynamics: Census 2011 (Growth, Density, Literacy, Sex Ratio trends, Child Sex Ratio 0-6)' },
          { name: 'Urbanization Trends: Mega cities, Smart City Mission, AMRUT, Urban problems' },
          { name: 'Regional Imbalances, Inter-state disparities, Aspirational Districts Programme, Special Category States' },
        ],
      },
    ],
  },
];
