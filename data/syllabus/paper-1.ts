import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const paper1SyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET General Paper 1 on Teaching and Research Aptitude (Code 00) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const paper1Syllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit I: Teaching Aptitude (शिक्षण अभिवृत्ति)',
    topics: [
      {
        name: 'Teaching: Concept, Objectives and Levels of Teaching',
        subtopics: [
          { name: 'Concept, Nature, and Basic Requirements of Teaching' },
          { name: 'Memory Level of Teaching (Herbartian model: Focus on recall, facts, rote retention)' },
          { name: 'Understanding Level of Teaching (Morrison model: Focus on seeing relationships, mastery of subject)' },
          { name: 'Reflective Level of Teaching (Hunt model: Problem-centric, critical thinking, open classroom)' },
        ],
      },
      {
        name: "Learner's Characteristics and Individual Differences",
        subtopics: [
          { name: 'Adolescent and Adult learners: Academic characteristics and learning readiness' },
          { name: 'Social and Emotional characteristics: Motivation, peer pressure, self-regulation' },
          { name: 'Cognitive characteristics: Information processing, memory span, metacognition' },
          { name: 'Individual differences: Learning styles (Visual, Auditory, Kinesthetic), aptitudes, and socio-economic background' },
        ],
      },
      {
        name: 'Factors Affecting Teaching and Learning Environment',
        subtopics: [
          { name: 'Teacher-related factors: Subject expertise, communication skills, pedagogical content knowledge' },
          { name: 'Learner-related factors: Prior knowledge, motivation, psychological well-being' },
          { name: 'Support material and instructional facilities: Audio-visual aids, laboratory infrastructure' },
          { name: 'Learning environment and Institutional culture: Socio-cultural climate, physical classroom conditions' },
        ],
      },
      {
        name: 'Methods of Teaching in Higher Education Institutions',
        subtopics: [
          { name: 'Teacher-Centred Methods: Lecture method, Demonstration, Team teaching' },
          { name: 'Learner-Centred Methods: Heuristic, Project method, Problem-solving, Flipped classroom, Case studies' },
          { name: 'Group Interactive Methods: Seminars, Workshops, Panel discussions, Brainstorming, Role play' },
          { name: 'Digital & Online Learning: SWAYAM, SWAYAMPRABHA, MOOCs platforms, LMS (Moodle, Canvas)' },
        ],
      },
      {
        name: 'Teaching Support Systems',
        subtopics: [
          { name: 'Traditional Support Systems: Chalkboards, charts, textbooks, physical models' },
          { name: 'Modern Support Systems: Interactive smartboards, digital projectors, slide decks' },
          { name: 'ICT-based Support Systems: Virtual labs, educational simulations, podcasts, AI tutors' },
        ],
      },
      {
        name: 'Evaluation Systems and Innovations in Higher Education',
        subtopics: [
          { name: 'Types of Evaluation: Formative (during instruction), Summative (at end), Diagnostic, Placement' },
          { name: 'Criterion-Referenced vs Norm-Referenced Testing' },
          { name: 'Choice Based Credit System (CBCS): Core courses, Elective courses, Grading systems' },
          { name: 'Computer Based Testing (CBT): Remote proctoring, adaptive testing, automated item banking' },
          { name: 'Innovations in Evaluation: Open book exams, rubrics, portfolio assessment, peer evaluation' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit II: Research Aptitude (शोध अभिवृत्ति)',
    topics: [
      {
        name: 'Research: Meaning, Objectives, Types and Characteristics',
        subtopics: [
          { name: 'Definition and Nature of Scientific Inquiry: Replicability, Precision, Falsifiability, Parsimony' },
          { name: 'Fundamental (Basic/Pure) Research vs Applied Research' },
          { name: 'Action Research: Cyclic model (Plan, Act, Observe, Reflect) for local classroom problem solving' },
          { name: 'Quantitative vs Qualitative Research paradigms' },
          { name: 'Exploratory, Descriptive, Explanatory, and Longitudinal vs Cross-Sectional Studies' },
        ],
      },
      {
        name: 'Positivism and Post-Positivistic Approach to Research',
        subtopics: [
          { name: 'Positivism: Auguste Comte, empirical verification, quantitative measurement, value neutrality' },
          { name: 'Post-Positivism (Interpretivism): Subjectivity, social construction of reality, qualitative reflexivity' },
          { name: 'Critical Realism and Mixed-Methods Research Frameworks' },
        ],
      },
      {
        name: 'Methods of Research',
        subtopics: [
          { name: 'Experimental Method: Independent, Dependent, and Extraneous variables, Control groups, Randomization' },
          { name: 'Descriptive Method: Surveys, Ex-post facto studies, Observational research' },
          { name: 'Historical Method: Primary vs Secondary sources, External and Internal criticism of documents' },
          { name: 'Qualitative Methods: Ethnography, Phenomenological research, Grounded theory, Case study' },
        ],
      },
      {
        name: 'Steps of the Scientific Research Process',
        subtopics: [
          { name: 'Problem Identification, Literature Review, and Research Question formulation' },
          { name: 'Hypothesis Formulation: Null hypothesis (H0), Directional/Alternative hypothesis (H1)' },
          { name: 'Research Design Preparation: Sample selection, instrumentation, data collection protocols' },
          { name: 'Data Collection & Statistical Analysis: Hypothesis testing (Type I error α, Type II error β, Power)' },
          { name: 'Generalization, Interpretation of Findings, and Drawing Conclusions' },
        ],
      },
      {
        name: 'Thesis and Article Writing: Formats and Referencing Styles',
        subtopics: [
          { name: 'Standard Structure of a Research Thesis / Dissertation: Preliminary, Textual, and Reference sections' },
          { name: 'APA Style (American Psychological Association): Author-date format, in-text citations, reference list' },
          { name: 'MLA Style (Modern Language Association): Author-page format, Works Cited mechanics' },
          { name: 'Chicago & Harvard Styles: Footnotes, endnotes, author-date variations' },
        ],
      },
      {
        name: 'Application of ICT in Research and Research Ethics',
        subtopics: [
          { name: 'ICT Tools: Online survey tools (Google Forms, Qualtrics), Statistical packages (SPSS, R, Python)' },
          { name: 'Reference Management Tools: Zotero, Mendeley, EndNote' },
          { name: 'Research Ethics: Fabrication, Falsification, and Plagiarism (FFP), Self-plagiarism' },
          { name: 'Plagiarism Detection Software (Turnitin, Urkund/Ouriginal) and UGC Regulations 2018 on Academic Integrity' },
          { name: 'Copyright, Intellectual Property Rights (IPR), Fair Use, and Open Access Publishing' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit III: Reading Comprehension (बोध)',
    topics: [
      {
        name: 'Passage Analysis and Literal Comprehension',
        subtopics: [
          { name: 'Extraction of explicit facts, figures, and direct assertions from unseen academic texts' },
          { name: 'Identifying the primary thesis and supporting evidence in prose passages' },
        ],
      },
      {
        name: 'Inferential & Critical Comprehension',
        subtopics: [
          { name: 'Contextual inference: Deducing underlying premises, authorial tone, purpose, and perspective' },
          { name: 'Evaluating argument strength, logical consistency, and implicit assumptions' },
        ],
      },
      {
        name: 'Vocabulary and Contextual Semantics',
        subtopics: [
          { name: 'Understanding words, idioms, and phrases in specialized academic contexts' },
          { name: 'Synonymy, antonymy, and nuance interpretation under reading constraints' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit IV: Communication (सम्प्रेषण)',
    topics: [
      {
        name: 'Communication: Meaning, Nature and Types',
        subtopics: [
          { name: 'Communication Process: Sender, Encoding, Message, Channel, Receiver, Decoding, Feedback, Noise' },
          { name: 'Intrapersonal vs Interpersonal vs Group Communication' },
          { name: 'Mass Communication: Characteristics, Gatekeeping, Public discourse' },
        ],
      },
      {
        name: 'Verbal and Non-Verbal Communication',
        subtopics: [
          { name: 'Verbal: Oral vs Written communication, Precision, Active listening' },
          { name: 'Non-Verbal: Kinesics (Body language, gestures, facial expressions), Proxemics (Space), Paralanguage (Tone, pitch), Haptics (Touch), Chronemics (Time)' },
          { name: 'Inter-Cultural and Cross-Cultural Communication nuances and sensitivities' },
        ],
      },
      {
        name: 'Classroom Communication Dynamics',
        subtopics: [
          { name: 'Teacher-Student communication channels and positive rapport building' },
          { name: 'Pedagogical clarity, questioning techniques, and constructive feedback loops' },
          { name: 'Empathy, classroom climate, and managing disruptive communicative behaviors' },
        ],
      },
      {
        name: 'Barriers to Effective Communication',
        subtopics: [
          { name: 'Physical & Environmental Barriers: Noise, distance, faulty equipment' },
          { name: 'Psychological & Emotional Barriers: Prejudices, selective perception, anxiety, cognitive overload' },
          { name: 'Linguistic & Semantic Barriers: Jargon, ambiguous phrasing, translation errors' },
          { name: 'Organizational & Socio-Cultural Barriers: Hierarchy, cultural stereotypes' },
        ],
      },
      {
        name: 'Mass-Media and Society',
        subtopics: [
          { name: 'Functions of Media: Surveillance, Correlation, Cultural transmission, Entertainment' },
          { name: 'Media Literacy, Fake news, Misinformation, Algorithm bias in digital media' },
          { name: 'Impact of television, print, radio, and social media networks on democratic discourse' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit V: Mathematical Reasoning and Aptitude (गणितीय तर्क और अभिवृत्ति)',
    topics: [
      {
        name: 'Types of Reasoning',
        subtopics: [
          { name: 'Inductive Reasoning: Particular observations to general principles' },
          { name: 'Deductive Reasoning: General premise to specific necessary conclusion' },
          { name: 'Analogical and Abductive Reasoning in problem solving' },
        ],
      },
      {
        name: 'Number Series, Letter Series, and Coding-Decoding',
        subtopics: [
          { name: 'Arithmetic, Geometric, Fibonacci, and Multi-pattern Number Series' },
          { name: 'Letter Series: Alphabetical position patterns, reverse rankings' },
          { name: 'Coding and Decoding: Letter coding, number coding, substitution codes' },
          { name: 'Blood Relations and Direction Sense Tests' },
        ],
      },
      {
        name: 'Fractions, Decimals, Ratios and Proportions',
        subtopics: [
          { name: 'Fractions and Decimals operations and comparison algorithms' },
          { name: 'Ratios, Proportions, and Direct vs Inverse variation problems' },
          { name: 'Averages and Weighted Mean calculations' },
        ],
      },
      {
        name: 'Percentages, Profit & Loss, and Discount',
        subtopics: [
          { name: 'Percentage change, successive percentages, population growth rate calculations' },
          { name: 'Cost Price, Selling Price, Marked Price, Profit Percentage, Loss Percentage' },
          { name: 'Trade discounts, cash discounts, and successive discount problems' },
        ],
      },
      {
        name: 'Simple & Compound Interest, Time, Speed & Distance, and Work',
        subtopics: [
          { name: 'Simple Interest (SI = PRT/100) and Compound Interest (Annual/Semi-annual compounding)' },
          { name: 'Time and Distance: Relative speed, Trains, Boats and Streams' },
          { name: 'Time and Work: Unitary method, Pipes and Cisterns calculations' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit VI: Logical Reasoning (युक्तियुक्त तर्क)',
    topics: [
      {
        name: 'Structure of Arguments and Categorical Propositions',
        subtopics: [
          { name: 'Argument Structure: Premise, Conclusion, and Inferential Link' },
          { name: 'Categorical Propositions: Universal Affirmative (A), Universal Negative (E), Particular Affirmative (I), Particular Negative (O)' },
          { name: 'Mood and Figure of Categorical Syllogisms' },
          { name: 'Classical Square of Opposition: Contradictories, Contraries, Sub-Contraries, Subalternation' },
        ],
      },
      {
        name: 'Deductive, Inductive, and Analogical Arguments',
        subtopics: [
          { name: 'Validity vs Soundness in Deductive Arguments' },
          { name: 'Strength vs Cogency in Inductive Arguments' },
          { name: 'Evaluating Analogical Arguments and Metaphorical Reasoning' },
        ],
      },
      {
        name: 'Venn Diagram Techniques for Argument Testing',
        subtopics: [
          { name: 'Two-set and Three-set Venn diagrams for categorical propositions' },
          { name: 'Determining the validity and invalidity of categorical syllogisms via Venn intersections' },
        ],
      },
      {
        name: 'Formal and Informal Fallacies',
        subtopics: [
          { name: 'Formal Fallacies: Fallacy of Undistributed Middle, Illicit Major, Illicit Minor, Affirming the Consequent' },
          { name: 'Informal Fallacies: Ad Hominem, Straw Man, Appeal to Ignorance, Begging the Question (Petitio Principii), Slippery Slope, False Dilemma, Equivocation, Red Herring' },
        ],
      },
      {
        name: 'Indian Logic: Means of Valid Knowledge (प्रमाण - Pramanas)',
        subtopics: [
          { name: 'Pratyaksha (Direct Perception): Nirvikalpaka (Indeterminate) vs Savikalpaka (Determinate), Laukika vs Alaukika' },
          { name: 'Anumana (Inference): Cognitive process of knowing the unperceived through the perceived' },
          { name: 'Upamana (Comparison / Analogy): Recognition of similarity' },
          { name: 'Shabda (Verbal Testimony): Aptavakya (Testimony of trustworthy authority)' },
          { name: 'Arthapatti (Postulation / Implication): Assumption of an unperceived fact (e.g., Fat Devadatta eats at night)' },
          { name: 'Anupalabdhi (Non-Apprehension): Source of knowledge of non-existence / absence' },
        ],
      },
      {
        name: 'Structure and Kinds of Anumana (Inference) and Hetvabhasa (Fallacies of Inference)',
        subtopics: [
          { name: 'Components of Anumana: Paksha (Minor Term), Sadhya (Major Term), Hetu / Linga (Middle Term)' },
          { name: 'Vyapti (Invariable Concomitance): Relationship between Hetu and Sadhya (Anvaya and Vyatireka)' },
          { name: 'Five-member Syllogism (Pancha Avayava): Pratijna (Proposition), Hetu (Reason), Udaharana (Example), Upanaya (Application), Nigamana (Conclusion)' },
          { name: 'Classification of Anumana: Svartha (for oneself), Parartha (for others); Purvavat, Sheshavat, Samanyatodrishta' },
          { name: 'Hetvabhasa (Fallacies of Inference): Savyabhichara (Irregular middle), Viruddha (Contradictory middle), Satpratipaksha (Counterbalanced), Asiddha (Unproved middle: Ashrayasiddha, Svarupasiddha, Vyapyatvasiddha), Badhita (Non-inferentially contradicted)' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit VII: Data Interpretation (आंकड़ों की व्याख्या)',
    topics: [
      {
        name: 'Sources, Acquisition and Classification of Data',
        subtopics: [
          { name: 'Primary vs Secondary Data sources' },
          { name: 'Quantitative vs Qualitative Data classification' },
          { name: 'Continuous vs Discrete Data and Scales of Measurement (Nominal, Ordinal, Interval, Ratio)' },
        ],
      },
      {
        name: 'Tabular Representation and Data Parsing',
        subtopics: [
          { name: 'Complex two-way and multi-variable Data Tables' },
          { name: 'Missing data calculation, percentage computation, and ratio balancing in tables' },
        ],
      },
      {
        name: 'Graphical Representations of Data',
        subtopics: [
          { name: 'Bar Charts (Single, Grouped, Stacked) and Histograms' },
          { name: 'Pie Charts (Degree and Percentage distributions)' },
          { name: 'Line Graphs, Frequency Polygons, and Scatter Plots' },
        ],
      },
      {
        name: 'Data Analytics and Data Governance',
        subtopics: [
          { name: 'Calculating compound annual growth rates (CAGR), percentages, ratios, and averages from data sets' },
          { name: 'Open Government Data initiatives, Data privacy, and Big Data applications in public governance' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit VIII: Information and Communication Technology (ICT) (सूचना और संचार प्रौद्योगिकी)',
    topics: [
      {
        name: 'ICT: General Abbreviations, Acronyms and Terminology',
        subtopics: [
          { name: 'Hardware & Architecture: CPU, ALU, RAM, ROM, Cache, SSD, HDD, Register memory' },
          { name: 'Number Systems: Binary, Octal, Decimal, Hexadecimal conversions and ASCII / Unicode standards' },
          { name: 'Operating Systems (Windows, Linux, macOS, Android), System Software vs Application Software, Open Source Software' },
        ],
      },
      {
        name: 'Basics of Internet, Intranet, Networking and Web Protocols',
        subtopics: [
          { name: 'Network Topologies (Star, Bus, Ring, Mesh) and Classifications (LAN, MAN, WAN, PAN)' },
          { name: 'Internet Protocols: TCP/IP, HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, IP Addressing (IPv4 vs IPv6)' },
          { name: 'Cloud Computing (IaaS, PaaS, SaaS), Web Browsers, Search Engines, URL structure' },
        ],
      },
      {
        name: 'Audio, Video-Conferencing and Digital Communication',
        subtopics: [
          { name: 'Video Conferencing platforms (Zoom, Google Meet, Microsoft Teams) protocols and bandwidth dynamics' },
          { name: 'E-mail mechanics: To, Cc, Bcc, Spam filters, Phishing vectors, PGP encryption' },
        ],
      },
      {
        name: 'Digital Initiatives in Higher Education',
        subtopics: [
          { name: 'NMEICT (National Mission on Education through ICT)' },
          { name: 'SWAYAM, SWAYAM PRABHA (40 DTH channels), NDL (National Digital Library)' },
          { name: 'e-PG Pathshala, Shodhganga (PhD repository), Shodhgangotri (Research proposals), Spoken Tutorial' },
          { name: 'SAMARTH (ERP for HEIs), NAD (National Academic Depository), DigiLocker, IRINS' },
        ],
      },
      {
        name: 'ICT and Governance / Cyber Security',
        subtopics: [
          { name: 'E-Governance: G2C, G2B, G2G, Digital India initiatives (UMANG, BharatNet)' },
          { name: 'Cyber Threats: Malware, Viruses, Worms, Trojans, Ransomware, Spyware, Denial of Service (DoS)' },
          { name: 'Information Security: Firewalls, SSL/TLS certificates, Two-factor authentication (2FA), Cyber Law essentials' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit IX: People, Development and Environment (लोग, विकास और पर्यावरण)',
    topics: [
      {
        name: 'Development and Environment: MDGs and SDGs',
        subtopics: [
          { name: 'Millennium Development Goals (8 MDGs and 21 targets - 2000 to 2015 period)' },
          { name: 'Sustainable Development Goals (17 SDGs and 169 targets - 2015 to 2030 period: SDG 1 No Poverty, SDG 4 Quality Education, SDG 13 Climate Action)' },
        ],
      },
      {
        name: 'Human and Environment Interaction: Anthropogenic Activities',
        subtopics: [
          { name: 'Deforestation, urbanization, industrialization, and intensive agriculture impacts' },
          { name: 'Ecological footprint, carrying capacity, carbon footprint, and loss of biodiversity' },
        ],
      },
      {
        name: 'Environmental Issues: Pollution and Waste Management',
        subtopics: [
          { name: 'Air Pollution: Primary vs Secondary pollutants (PM2.5, PM10, NOx, SO2, CO, Ozone, Photochemical Smog), Air Quality Index (AQI)' },
          { name: 'Water Pollution: Biochemical Oxygen Demand (BOD), Chemical Oxygen Demand (COD), Eutrophication, Heavy metal contamination (Arsenic, Fluoride, Lead)' },
          { name: 'Soil Pollution, Noise Pollution (Decibel limits), Thermal & Radioactive Pollution' },
          { name: 'Waste Management: Municipal Solid Waste, Biomedical Waste, E-Waste Rules, Hazardous Waste, 5R principle' },
          { name: 'Climate Change: Global Warming Potential (GWP) of Greenhouse Gases (CO2, CH4, N2O, CFCs), Acid Rain, Ozone Layer Depletion (CFCs, Halons, Dobson Units)' },
        ],
      },
      {
        name: 'Natural and Energy Resources',
        subtopics: [
          { name: 'Renewable Energy: Solar Energy (Photovoltaic, CSP), Wind Energy, Hydroelectric, Geothermal, Biomass, Tidal' },
          { name: 'Non-Renewable Energy: Coal, Petroleum, Natural Gas, Nuclear Energy' },
          { name: 'India’s Renewable Energy Targets (500 GW non-fossil capacity by 2030, Panchamrit pledges)' },
        ],
      },
      {
        name: 'Natural Hazards and Disaster Mitigation',
        subtopics: [
          { name: 'Geological Hazards: Earthquakes (Richter vs Mercalli scale), Tsunamis, Landslides, Volcanoes' },
          { name: 'Hydro-Meteorological Hazards: Floods, Droughts, Cyclones, Cloudbursts, Glacial Lake Outburst Floods (GLOF)' },
          { name: 'Disaster Management Act 2005, NDMA, Sendai Framework for Disaster Risk Reduction (2015-2030)' },
        ],
      },
      {
        name: 'Environmental Protection Acts, Policies and International Agreements',
        subtopics: [
          { name: 'Environment (Protection) Act, 1986, Wildlife Protection Act 1972, Forest Conservation Act 1980, Water Act 1974, Air Act 1981' },
          { name: 'National Action Plan on Climate Change (NAPCC - 8 National Missions: Solar, Water, Enhanced Energy Efficiency, Sustainable Habitat, Green India, Himalayan Ecosystem, Sustainable Agriculture, Strategic Knowledge)' },
          { name: 'Montreal Protocol 1987 (Ozone Depleting Substances) and Kigali Amendment 2016 (HFC phase-down)' },
          { name: 'Rio Earth Summit 1992 (Agenda 21, UNFCCC, CBD, UNCCD)' },
          { name: 'Kyoto Protocol 1997 (Annex I/II countries, Clean Development Mechanism, Carbon credits)' },
          { name: 'Paris Agreement 2015 (Nationally Determined Contributions NDCs, 1.5°C threshold), International Solar Alliance (ISA), Coalition for Disaster Resilient Infrastructure (CDRI)' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit X: Higher Education System (उच्च शिक्षा प्रणाली)',
    topics: [
      {
        name: 'Institutions of Higher Learning and Education in Ancient India',
        subtopics: [
          { name: 'Ancient Education Systems: Gurukula system, Vedic, Buddhist (Viharas), and Jaina education' },
          { name: 'Major Ancient Universities: Takshashila, Nalanda, Vikramashila, Vallabhi, Odantapuri, Jagaddala' },
          { name: 'Curriculum, admission procedures (Dvarapandita), degrees, and foreign scholars (Xuanzang, Faxian, Yijing)' },
        ],
      },
      {
        name: 'Evolution of Higher Learning and Research in Pre & Post-Independence India',
        subtopics: [
          { name: 'Pre-Independence: Charter Act 1813, Macaulay’s Minute 1835, Wood’s Despatch 1854 (Magna Carta of English Education), Hunter Commission 1882, Sadler Commission 1917, Hartog Committee 1929, Sargent Plan 1944' },
          { name: 'Post-Independence: Radhakrishnan Commission (University Education 1948-49), Mudaliar Commission (Secondary Education 1952-53), Kothari Commission (1964-66: 10+2+3 structure, 6% GDP target)' },
          { name: 'National Policies on Education: NPE 1968, NPE 1986 / POA 1992, National Knowledge Commission 2005 (Sam Pitroda), Yashpal Committee 2009, Justice Verma Committee 2012' },
          { name: 'National Education Policy (NEP 2020): 5+3+3+4 foundational structure, multidisciplinary universities, Academic Bank of Credits (ABC), MERUs, National Research Foundation (NRF), Higher Education Commission of India (HECI with 4 verticals: NHERC, NAC, HEGC, GEC)' },
        ],
      },
      {
        name: 'Oriental, Conventional and Non-Conventional Learning Programmes',
        subtopics: [
          { name: 'Oriental & Classical Studies: Sanskrit, Arabic, Persian, Pali, Prakrit learning institutions' },
          { name: 'Conventional Learning: University lecture models, residential colleges, autonomous colleges' },
          { name: 'Non-Conventional & Open Distance Learning (ODL): IGNOU, State Open Universities, Distance Education Bureau (DEB)' },
        ],
      },
      {
        name: 'Professional, Technical, Skill-Based and Vocational Education',
        subtopics: [
          { name: 'Apex Regulatory Bodies: UGC, AICTE (Technical), NMC/MCI (Medical), BCI (Legal), NCTE (Teacher Education), ICAR (Agriculture), PCI (Pharmacy), COA (Architecture)' },
          { name: 'Skill-Based Education: National Skills Qualifications Framework (NSQF), DDU KAUSHAL Kendras, PMKVY, Apprenticeship schemes' },
        ],
      },
      {
        name: 'Value Education and Environmental Education',
        subtopics: [
          { name: 'Value Education: Moral, ethical, spiritual and constitutional values (Justice, Liberty, Equality, Fraternity)' },
          { name: 'Environmental Education: Curriculum integration across higher education institutions (Supreme Court mandate)' },
        ],
      },
      {
        name: 'Policies, Governance and Administration in Higher Education',
        subtopics: [
          { name: 'Types of Universities: Central Universities, State Universities, Deemed-to-be Universities (Section 3 of UGC Act 1956), Private Universities, Institutes of National Importance (INIs)' },
          { name: 'Statutory Administrative Bodies: Chancellor, Vice-Chancellor, Executive Council/Syndicate, Academic Council, Board of Studies' },
          { name: 'Financing & Quality Assurance: Higher Education Financing Agency (HEFA), NAAC (National Assessment and Accreditation Council - Criteria & Grading), NIRF (National Institutional Ranking Framework - Parameters), NBA (National Board of Accreditation)' },
        ],
      },
    ],
  },
];
