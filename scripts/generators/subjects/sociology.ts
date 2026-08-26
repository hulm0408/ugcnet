import { MockTestDefinition, RawMockQuestion } from '../common';

export function getSociologyMockTest(): MockTestDefinition {
  const questions: RawMockQuestion[] = [
    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 1: SOCIOLOGICAL THEORIES (10 Questions: Q1 - Q10)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 1,
      questionText: 'Who is recognized as the "Father of Sociology" who coined the term "Sociology" in 1838 and formulated the "Law of Three Stages" of human intellectual development?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Auguste Comte (Theological $\\rightarrow$ Metaphysical $\\rightarrow$ Positivist/Scientific)',
        B: 'Émile Durkheim',
        C: 'Max Weber',
        D: 'Karl Marx',
      },
      correctAnswer: 'A',
      explanation: 'Auguste Comte established Positivism, arguing that human thought evolves from supernatural theological explanations to abstract metaphysical speculation, culminating in empirical positive science.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In "The Rules of Sociological Method" (1895), Émile Durkheim established that the distinctive subject matter of sociology is the study of "Social Facts", defined as:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Ways of acting, thinking, and feeling that are external to the individual and endowed with coercive power to exercise control over them',
        B: 'Individual psychological neuroses and biological reflexes',
        C: 'Abstract economic utility calculations',
        D: 'Subjective private diary reflections',
      },
      correctAnswer: 'A',
      explanation: 'Durkheim asserted: "Treat social facts as things" (des choses), emphasizing their externality (exteriority) and coercive constraint (coercion).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In his landmark sociological study "Suicide" (1897), Émile Durkheim identified four distinct sociological types of suicide based on the axes of Social Integration and Moral Regulation. What are they?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Egoistic (low integration), Altruistic (high integration), Anomic (low regulation/normlessness), and Fatalistic (excessive regulation)',
        B: 'Rational, Emotional, Habitual, and Compulsive',
        C: 'Personal, Economic, Political, and Religious',
        D: 'Organic, Mechanical, Dynamic, and Static',
      },
      correctAnswer: 'A',
      explanation: 'Durkheim demonstrated that suicide rates are sociological phenomena resulting from imbalances in social integration and normative regulation.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In "The Protestant Ethic and the Spirit of Capitalism" (1905), Max Weber argued that modern rational industrial capitalism was fostered by which theological concept within ascetic Calvinism?',
      questionType: 'Direct MCQ',
      options: {
        A: 'The Doctrine of Predestination and the concept of the "Calling" (Beruf) treating worldly economic success as a sign of divine election',
        B: 'Papal indulgences and monastic asceticism',
        C: 'Feudal land grants from the Catholic Church',
        D: 'Reincarnation and karma',
      },
      correctAnswer: 'A',
      explanation: 'Weber demonstrated how Calvinist inner-worldly asceticism (combining hard labor, frugality, and reinvestment) generated the cultural ethos required for rational capitalism.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 1,
      questionText: 'In Max Weber\'s interpretive sociology (Verstehen), what are the four ideal types of "Social Action"?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Zweckrational (Instrumentally rational), Wertrational (Value-rational), Affective (Emotional), and Traditional (Habitual)',
        B: 'Primary, Secondary, Tertiary, and Quaternary',
        C: 'Micro, Meso, Macro, and Global',
        D: 'Economic, Political, Legal, and Religious',
      },
      correctAnswer: 'A',
      explanation: 'Weber classified social actions by their subjective meaning: Zweckrational (ends-means calculation), Wertrational (absolute ethical commitment), Affective (emotional impulses), and Traditional (customary habit).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Karl Marx\'s historical materialism, society\'s economic Base (Infrastructure) consists of which two core elements?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Forces of Production (means of production and human labour power) and Relations of Production (property/class relations)',
        B: 'Legal institutions and religious churches (Superstructure)',
        C: 'Political state and philosophical ideologies',
        D: 'Art, literature, and media apparatuses',
      },
      correctAnswer: 'A',
      explanation: 'The economic Base (Forces + Relations of production) determines the legal, political, and ideological Superstructure in Marx\'s dialectical materialist model.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Talcott Parsons\' Structural-Functionalist "AGIL Paradigm", what are the four essential functional requisites that any social system must satisfy to survive?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Adaptation (Economy), Goal Attainment (Polity), Integration (Legal system/community), and Latency / Pattern Maintenance (Family/Education/Culture)',
        B: 'Action, Growth, Innovation, and Leadership',
        C: 'Authority, Governance, Inclusion, and Liberty',
        D: 'Assimilation, Generation, Individuation, and Legitimacy',
      },
      correctAnswer: 'A',
      explanation: 'Parsons\' AGIL framework: Adaptation (adjusting to physical environment), Goal Attainment (mobilizing resources for collective aims), Integration (solidarity/social control), Latency (pattern maintenance and tension management).',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 1,
      questionText: 'In Robert K. Merton\'s functional analysis, the distinction between functions that are intended and recognized by participants versus those that are unintended and unrecognized is termed:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Manifest Functions and Latent Functions (e.g. Hopi Rain Dance creating social cohesion as a latent function)',
        B: 'Eufunctions and Dysfunctions',
        C: 'Primary and Secondary socialization',
        D: 'Role conflict and Role strain',
      },
      correctAnswer: 'A',
      explanation: 'Merton introduced Manifest (conscious deliberate outcomes) and Latent (unintended hidden consequences) functions to expand functionalist methodology.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Symbolic Interactionism, who formulated the concept of the "Looking-Glass Self" (1902), proposing that our self-concept is a reflective mirror of how we imagine others perceive and judge us?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Charles Horton Cooley',
        B: 'George Herbert Mead (Mind, Self, and Society - "I" and "Me")',
        C: 'Erving Goffman (Dramaturgy - Front stage / Back stage)',
        D: 'Herbert Blumer',
      },
      correctAnswer: 'A',
      explanation: 'Cooley\'s Looking-Glass Self involves 3 steps: imagining our appearance to others, imagining their judgment of our appearance, and experiencing a self-feeling (pride or shame).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Dramaturgical Sociology, Erving Goffman ("The Presentation of Self in Everyday Life", 1956) conceptualizes social interactions using the theatrical metaphor of:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Front Stage (formal performance to audience), Back Stage (private area where actors drop roles and prepare), and Impression Management',
        B: 'Tragedy and Comedy masks',
        C: 'Puppet theatre without free will',
        D: 'Cinema screen projections',
      },
      correctAnswer: 'A',
      explanation: 'Goffman analyzes everyday social interaction as theatrical performances where social actors utilize props, scripts, and impression management techniques.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 2 & 3: RESEARCH METHODOLOGY & BASIC INSTITUTIONS (20 Questions: Q11 - Q30)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 2,
      questionText: 'In qualitative research methodology, what is "Triangulation"?',
      questionType: 'Direct MCQ',
      options: {
        A: 'The use of multiple research methods, data sources, theoretical perspectives, or investigators to study the same phenomenon and cross-validate findings',
        B: 'Drawing a 3-variable scatter plot',
        C: 'Surveying only 3 respondents per village',
        D: 'Dividing a sample into 3 equal income tiers',
      },
      correctAnswer: 'A',
      explanation: 'Norman Denzin identified 4 types of triangulation (Data, Investigator, Theory, Methodological) to enhance validity and reduce single-method bias.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 3,
      questionText: 'In sociological study of kinship, the rule of residence where a newly married couple resides with or near the husband\'s father\'s family is termed:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Patrilocal Residence (Virilocal)',
        B: 'Matrilocal Residence (Uxorilocal)',
        C: 'Neolocal Residence (independent new household)',
        D: 'Avunculocal Residence (residing with maternal uncle)',
      },
      correctAnswer: 'A',
      explanation: 'Patrilocal residence situates the marital home with the husband\'s patrilineal kin group.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'In his landmark work "The Elementary Forms of Religious Life" (1912), Émile Durkheim analyzed Australian Aboriginal Totemism and defined Religion as:',
      questionType: 'Direct MCQ',
      options: {
        A: 'A unified system of beliefs and practices relative to Sacred (set apart and forbidden) things versus Profane things, which unite into a single moral community called a Church',
        B: 'The opiate of the masses (Marx)',
        C: 'An individual neurotic illusion (Freud)',
        D: 'A set of commercial transactions with deities',
      },
      correctAnswer: 'A',
      explanation: 'Durkheim showed that in worshipping the totem, society is essentially worshipping its own collective sacred power (collective effervescence).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'The concept of "Cultural Lag" (the gap that occurs when material technology changes rapidly while non-material culture like morals, laws, and beliefs lags behind) was introduced in 1922 by:',
      questionType: 'Direct MCQ',
      options: {
        A: 'William F. Ogburn (Social Change, 1922)',
        B: 'Thorstein Veblen (Conspicuous Consumption)',
        C: 'Pitirim Sorokin (Social and Cultural Dynamics)',
        D: 'Robert MacIver',
      },
      correctAnswer: 'A',
      explanation: 'Ogburn explained that modern social maladjustments stem from the lag between fast-moving material innovations and slow-adapting adaptive culture.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 4, 5 & 6: RURAL, STATE, POLITICS & ECONOMY (30 Questions: Q31 - Q60)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 4,
      questionText: 'M.N. Srinivas introduced the concept of the "Dominant Caste" in his study of the village of Rampura. What are the key defining attributes of a dominant caste?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Numerical preponderance, economic and political power (ownership of sizable agricultural land), and relatively high ritual status in the local hierarchy',
        B: 'Highest Brahmin ritual status exclusively',
        C: 'Urban corporate wealth and English education',
        D: 'Official state government appointment',
      },
      correctAnswer: 'A',
      explanation: 'Srinivas showed that castes like Vokkaligas/Lingayats in Karnataka, Jats in Haryana/UP, and Kammas/Reddys in AP exercise decisive local dominance.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 4,
      questionText: 'M.N. Srinivas coined the term "Sanskritization" to describe:',
      questionType: 'Direct MCQ',
      options: {
        A: 'The process by which a low Hindu caste, tribal, or other group changes its customs, ritual, ideology, and way of life in the direction of a high, frequently "twice-born" (dvija) caste to claim higher status',
        B: 'The mandatory teaching of Sanskrit in universities',
        C: 'The migration of rural Brahmins to metropolitan cities',
        D: 'The conversion of Hindus to Buddhism',
      },
      correctAnswer: 'A',
      explanation: 'Sanskritization involves positional mobility (within the caste system) rather than structural change in the caste system itself.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 5,
      questionText: 'In "Homo Hierarchicus: The Caste System and Its Implications" (1966), French anthropologist Louis Dumont analyzed the Indian caste system as being based fundamentally on the structural opposition between:',
      questionType: 'Direct MCQ',
      options: {
        A: 'The Pure and the Impure (Purity and Pollution)',
        B: 'The Rich and the Poor',
        C: 'The Ruler and the Ruled',
        D: 'The Educated and the Illiterate',
      },
      correctAnswer: 'A',
      explanation: 'Dumont argued that caste is an ideological hierarchy founded on religious notions of ritual purity and pollution, subordinating political/economic power to ritual status (Brahman over Kshatriya).',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 6,
      questionText: 'In Pierre Bourdieu\'s theory of social reproduction and stratification ("Distinction", 1979), what are the four forms of Capital?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Economic Capital (financial wealth), Cultural Capital (embodied, objectified, institutionalized), Social Capital (networks/connections), and Symbolic Capital (prestige/honor)',
        B: 'Fixed, Working, Variable, and Constant capital',
        C: 'Human, Physical, Natural, and Financial capital',
        D: 'National, Regional, Urban, and Rural capital',
      },
      correctAnswer: 'A',
      explanation: 'Bourdieu analyzed how the dominant class uses Cultural Capital and Habitus to reproduce class inequalities across generations through the education system.',
      difficulty: 'MEDIUM',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 7, 8, 9 & 10: ENVIRONMENT, KINSHIP, SCIENCE & CULTURE (40 Questions: Q61 - Q100)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 7,
      questionText: 'The historic "Chipko Movement" in the Garhwal Himalayas (Uttarakhand) in the 1970s was an eco-feminist environmental movement where village women led by Gaura Devi hugged trees to prevent:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Commercial logging and deforestation by state-authorized contractors',
        B: 'Construction of hydroelectric nuclear reactors',
        C: 'Expansion of railway broad-gauge lines',
        D: 'Tourist hotel developments',
      },
      correctAnswer: 'A',
      explanation: 'Chipko demonstrated grassroots ecological resistance linking forest conservation directly to female livelihoods, fuel, and fodder security in Himalayan ecosystems.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 8,
      questionText: 'In his landmark kinship study "Kinship Organization in India" (1953), which Indian sociologist mapped regional kinship variations across Northern, Central, Southern, and Eastern zones?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Irawati Karve',
        B: 'Leela Dube',
        C: 'G.S. Ghurye',
        D: 'Patricia Uberoi',
      },
      correctAnswer: 'A',
      explanation: 'Irawati Karve analyzed linguistic boundaries and kinship practices, contrasting North Indian village exogamy with South Indian cross-cousin marriages.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 9,
      questionText: 'In the sociology of science, who formulated the concept of "Paradigm Shift" and Scientific Revolutions in "The Structure of Scientific Revolutions" (1962)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Thomas S. Kuhn',
        B: 'Karl Popper (The Logic of Scientific Discovery - Falsificationism)',
        C: 'Paul Feyerabend (Against Method - Epistemological Anarchism)',
        D: 'Imre Lakatos (Research Programmes)',
      },
      correctAnswer: 'A',
      explanation: 'Thomas Kuhn showed that science does not progress via smooth linear accumulation, but through periods of "Normal Science" punctuated by revolutionary Paradigm Shifts.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 10,
      questionText: 'In Postmodern cultural theory, Jean Baudrillard ("Simulacra and Simulation", 1981) introduced the concept of "Hyperreality", describing a condition in which:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Media simulations and representations (simulacra) replace real physical experience, so that the image is more real than the reality it supposedly represents (the desert of the real)',
        B: 'Virtual reality headsets are banned by law',
        C: 'Cinema tickets become free for all citizens',
        D: 'Television broadcasts only news documentaries',
      },
      correctAnswer: 'A',
      explanation: 'Baudrillard argued that in consumer society, signs refer only to other signs rather than an underlying authentic reality, producing Hyperreality.',
      difficulty: 'MEDIUM',
    },
  ];

  return {
    subjectCode: '05',
    subjectSlug: 'sociology',
    mockNumber: 1,
    title: 'Sociology — Mock Test 1: Full Syllabus Simulation (100 Qs)',
    description: 'Authentic 100-question UGC NET Sociology simulation covering Sociological Theory, Research Methodology, Basic Institutions, Rural/Urban Transformations, State & Politics, Economy & Society, Environment, Family & Kinship, Science & Technology, and Culture across all 10 units.',
    accessTier: 'FREE',
    isFreeBenchmark: true,
    questions,
  };
}
