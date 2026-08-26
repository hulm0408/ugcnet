import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const sociologySyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Sociology (Code 05) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const sociologySyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Sociological Theory',
    topics: [
      {
        name: 'Classical Sociological Thinkers',
        subtopics: [
          { name: 'Émile Durkheim: Social Facts, Division of Labour (Mechanical vs Organic Solidarity), Anomie, Suicide (Egoistic, Altruistic, Anomic, Fatalistic), Elementary Forms of Religious Life (Sacred vs Profane, Totemism, Collective Effervescence)' },
          { name: 'Max Weber: Social Action (Instrumentally rational, Value-rational, Affectual, Traditional), Verstehen, Ideal Types, Protestant Ethic and the Spirit of Capitalism, Authority (Traditional, Charismatic, Rational-Legal), Bureaucracy, Class, Status, Party' },
          { name: 'Karl Marx: Historical Materialism, Dialectical Materialism, Mode of Production (Forces & Relations of Production), Base and Superstructure, Class Struggle, Alienation (from Product, Process, Species-being, Others), Commodity Fetishism' },
        ],
      },
      {
        name: 'Structure-Functionalism and Structuralism',
        subtopics: [
          { name: 'Bronislaw Malinowski: Functionalism, Biological and Cultural Needs, Kula Ring' },
          { name: 'A.R. Radcliffe-Brown: Structural-Functionalism, Social Structure, Joking Relationships' },
          { name: 'Talcott Parsons: Social Action Systems, Pattern Variables, AGIL Paradigm (Adaptation, Goal Attainment, Integration, Latency), Cybernetic Hierarchy of Control' },
          { name: 'Robert K. Merton: Middle-Range Theory, Manifest vs Latent Functions, Dysfunctions, Reference Group Theory, Anomie & Strain Theory (Conformity, Innovation, Ritualism, Retreatism, Rebellion)' },
          { name: 'Claude Lévi-Strauss: Structuralism, Binary Oppositions, Myth Analysis, Alliance Theory of Kinship' },
        ],
      },
      {
        name: 'Hermeneutic, Interpretive and Interactionist Traditions',
        subtopics: [
          { name: 'G.H. Mead: Symbolic Interactionism, Mind, Self, Society, Play Stage & Game Stage, "I" and "Me", Generalized Other' },
          { name: 'Herbert Blumer: Premise of Symbolic Interactionism, Joint Action' },
          { name: 'Erving Goffman: Dramaturgy (Front Stage, Back Stage, Impression Management, Stigma, Total Institutions - Asylums)' },
          { name: 'Alfred Schutz: Phenomenological Sociology, Life-World (Lebenswelt), Typifications, Intersubjectivity' },
          { name: 'Harold Garfinkel: Ethnomethodology, Indexicality, Reflexivity, Breaching Experiments, Accounting Practices' },
          { name: 'Clifford Geertz: Thick Description, Interpretive Anthropology' },
        ],
      },
      {
        name: 'Post-Structuralism, Post-Modernism and Critical Theory',
        subtopics: [
          { name: 'Michel Foucault: Archaeology of Knowledge, Genealogy of Power, Power/Knowledge, Panopticon, Biopolitics, Governmentality, Madness and Civilization' },
          { name: 'Jacques Derrida: Deconstruction, Logocentrism, Différance' },
          { name: 'Pierre Bourdieu: Theory of Practice, Habitus, Field, Cultural Capital (Embodied, Objectified, Institutionalized), Symbolic Violence' },
          { name: 'Anthony Giddens: Structuration Theory, Duality of Structure, Time-Space Distanciation, Runaway World' },
          { name: 'Jürgen Habermas: Theory of Communicative Action, Ideal Speech Situation, Public Sphere, Colonization of the Life-World' },
          { name: 'Ulrich Beck: Risk Society; Zygmunt Bauman: Liquid Modernity; Jean Baudrillard: Simulacra and Simulation, Hyperreality' },
        ],
      },
      {
        name: 'Indian Sociological Thinkers',
        subtopics: [
          { name: 'G.S. Ghurye: Indological Perspective, Caste and Race in India (Six features of caste), Tribal Integration vs Assimilation debate (with Verrier Elwin)' },
          { name: 'M.N. Srinivas: Structural-Functional & Fieldwork Approach, Dominant Caste, Sanskritization, Westernization, Secularization, Rampura Village Study (The Remembered Village)' },
          { name: 'B.R. Ambedkar: Subaltern Critique of Caste, Annihilation of Caste, Untouchability, Constitutional Democracy, Neo-Buddhism' },
          { name: 'D.P. Mukerji: Marxian & Culturological Approach, Tradition and Modernity, Dialectics of Indian Tradition' },
          { name: 'Irawati Karve: Kinship Organization in India (Four cultural zones: North, South, East, Central), Hindu Society' },
          { name: 'Radhakamal Mukerjee: Social Structure of Values, Regional Sociology; A.R. Desai: Marxist Analysis of Indian Nationalism, Peasant Struggles; Louis Dumont: Homo Hierarchicus (Purity and Pollution, Hierarchy vs Equality)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Research Methodology and Methods',
    topics: [
      {
        name: 'Philosophical Foundations of Social Research',
        subtopics: [
          { name: 'Ontology, Epistemology and Methodology in Social Sciences' },
          { name: 'Positivism and Critique of Positivism in Sociology (Value Neutrality, Objectivity vs Subjectivity)' },
          { name: 'Interpretive, Phenomenological and Hermeneutic Traditions in Social Research' },
          { name: 'Critical Theory, Feminist Methodology (Standpoint Epistemology - Sandra Harding, Dorothy Smith), and Subaltern Historiography' },
        ],
      },
      {
        name: 'Research Design and Quantitative Research Strategies',
        subtopics: [
          { name: 'Formulation of Research Problem, Conceptual Framework, Hypotheses, Variables (Independent, Dependent, Intervening)' },
          { name: 'Quantitative Research Designs: Descriptive, Explanatory, Experimental, Cross-Sectional, Longitudinal (Cohort, Panel studies)' },
          { name: 'Sampling Techniques: Probability Sampling (Simple Random, Stratified, Systematic, Cluster) vs Non-Probability Sampling (Purposive, Snowball, Quota)' },
          { name: 'Survey Method, Structured Questionnaires, Scaling Techniques (Likert Scale, Guttman Scale, Bogardus Social Distance Scale)' },
        ],
      },
      {
        name: 'Qualitative and Field Research Methods',
        subtopics: [
          { name: 'Ethnography: Participant Observation (Complete participant, Participant-as-observer, Observer-as-participant)' },
          { name: 'In-depth Interviews (Unstructured, Semi-structured), Oral History, Life Histories, Focus Group Discussions (FGD)' },
          { name: 'Grounded Theory Methodology: Constant Comparative Method, Theoretical Sampling, Open/Axial/Selective Coding' },
          { name: 'Case Study Method, Content Analysis, Semiotics, Discourse Analysis (Foucauldian)' },
          { name: 'Triangulation (Data, Investigator, Theory, Methodological Triangulation)' },
        ],
      },
      {
        name: 'Statistical Analysis, Data Interpretation and Research Ethics',
        subtopics: [
          { name: 'Measures of Central Tendency and Dispersion (Mean, Median, Mode, Standard Deviation)' },
          { name: 'Bivariate & Multivariate Analysis: Chi-Square Test of Independence, Pearson’s r, Spearman’s Rho, Regression Analysis' },
          { name: 'Qualitative Data Software (NVivo, ATLAS.ti) and Statistical Software (SPSS, R)' },
          { name: 'Research Ethics: Informed Consent, Anonymity, Confidentiality, Plagiarism, Politics of Social Research' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Basic Concepts and Institutions',
    topics: [
      {
        name: 'Sociological Concepts: Structure, Status, Role and Socialization',
        subtopics: [
          { name: 'Sociological Concepts: Social Structure, Social System, Society, Community (Tönnies: Gemeinschaft vs Gesellschaft), Association, Institution' },
          { name: 'Status and Role: Ralph Linton (Ascribed vs Achieved Status, Role Set, Status Set, Role Conflict, Role Distance - Goffman)' },
          { name: 'Social Groups: Primary vs Secondary Groups (C.H. Cooley), In-Group vs Out-Group (W.G. Sumner), Reference Group (Herbert Hyman, Merton)' },
          { name: 'Socialization: Agencies of Socialization, Primary vs Secondary, Anticipatory Socialization (Merton), Resocialization' },
          { name: 'Social Control (Formal vs Informal mechanisms), Deviance (Robert Merton’s Strain Theory, Howard Becker’s Labeling Theory, Edwin Sutherland’s Differential Association)' },
        ],
      },
      {
        name: 'Social Stratification: Hierarchy, Inequality and Mobility',
        subtopics: [
          { name: 'Theories of Stratification: Functionalist Theory (Davis & Moore - Functional Necessity of Stratification vs Tumin’s Critique), Conflict Theory (Marx, Weber), Dahrendorf (Imperatively Coordinated Associations)' },
          { name: 'Forms of Stratification: Caste, Class, Estate, Race, Gender, Ethnicity' },
          { name: 'Caste System in India: Varna vs Jati, Purity and Pollution (Dumont), Jajmani System (William Wiser), Untouchability, Caste Mobility (Sanskritization)' },
          { name: 'Social Mobility: Vertical (Upward, Downward), Horizontal, Inter-generational vs Intra-generational mobility' },
        ],
      },
      {
        name: 'Social Institutions: Family, Marriage, Kinship and Religion',
        subtopics: [
          { name: 'Family: Nuclear, Extended, Joint Family in India (Changes, Structural disintegration vs Functional jointness), Changing family forms' },
          { name: 'Marriage: Monogamy, Polygamy (Polygyny, Polyandry: Fraternal vs Non-fraternal), Endogamy, Exogamy (Gotra, Sapinda, Village exogamy), Hypergamy (Anuloma) vs Hypogamy (Pratiloma), Incest Taboo' },
          { name: 'Kinship: Principles of Descent (Patrilineal, Matrilineal - Nayars, Khasis, Bilateral, Double descent), Kinship Usages (Rule of Avoidance, Joking relationship, Teknonymy, Avunculate, Amitate, Couvade), Kinship Terms (Descriptive vs Classificatory - Lewis Henry Morgan)' },
          { name: 'Religion: Secularization, Sacred and Profane, Magic, Religion and Science (Frazer, Malinowski), Religious movements, Cults, Sects, Denominations, Church' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Rural and Urban Transformations',
    topics: [
      {
        name: 'Rural Society and Agrarian Structure in India',
        subtopics: [
          { name: 'Indian Village Studies: Self-Sufficient Village Community Myth (Metcalfe, Baden-Powell vs Srinivas, Dube, Bailey), Jajmani System and its decline' },
          { name: 'Agrarian Social Structure: Daniel Thorner’s Classification (Malik, Kisan, Mazdoor), Land Reforms (Zamindari abolition, Tenancy reforms, Land ceiling, Bhoodan & Gramdan movements)' },
          { name: 'Green Revolution: Socio-economic impacts, Class polarization, Regional imbalances, Inter-caste tensions, Commercialization of agriculture' },
          { name: 'Agrarian Crisis and Rural Unrest: Farmers’ Movements (Shetkari Sanghatana, BKU), Peasant Struggles (Tebhaga, Telangana, Naxalbari), Agrarian distress and farmers’ suicides' },
        ],
      },
      {
        name: 'Urbanization, Industrialization and Urban Space',
        subtopics: [
          { name: 'Urbanism as a Way of Life (Louis Wirth: Size, Density, Heterogeneity), Georg Simmel (The Metropolis and Mental Life - Blasé attitude)' },
          { name: 'Chicago School of Urban Sociology: Robert Park, Ernest Burgess (Concentric Zone Model), Homer Hoyt (Sector Model), Harris & Ullman (Multiple Nuclei Model)' },
          { name: 'Urban Growth in India: Trends, Megacities, Slums, Urban Poverty, Informal Economy (Keith Hart), Gated Communities, Gentrification, Right to the City (David Harvey)' },
          { name: 'Rural-Urban Continuum (Robert Redfield: Folk-Urban Continuum, Little Tradition and Great Tradition - Robert Redfield & Milton Singer)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: State, Politics and Development',
    topics: [
      {
        name: 'Theories of State and Political Sociology',
        subtopics: [
          { name: 'Theories of the State: Liberal-Pluralist, Marxist (Instrumentalist: Ralph Miliband vs Structuralist: Nicos Poulantzas), Weberian (Monopoly of legitimate physical violence)' },
          { name: 'Power and Authority: Steven Lukes (Three Dimensions of Power), Michel Foucault (Capillary Power, Disciplinary Power)' },
          { name: 'Power Elite (C. Wright Mills), Ruling Class (Gaetano Mosca, Vilfredo Pareto - Circulation of Elites, Residues and Derivations, Robert Michels - Iron Law of Oligarchy)' },
        ],
      },
      {
        name: 'Democratic Politics, Civil Society and Nation-Building in India',
        subtopics: [
          { name: 'Political Parties, Pressure Groups, Caste in Indian Politics (Rajni Kothari - Politics in India, Congress System), Politicization of Caste vs Castification of Politics' },
          { name: 'Civil Society, Public Sphere, Non-Governmental Organizations (NGOs), Social Capital (Robert Putnam: Bonding vs Bridging Social Capital)' },
          { name: 'Sub-Nationalism, Regionalism, Communalism, Secularism debates (Ashis Nandy, T.N. Madan, Partha Chatterjee)' },
        ],
      },
      {
        name: 'Theories and Models of Development',
        subtopics: [
          { name: 'Modernization Theory (W.W. Rostow’s 5 Stages of Economic Growth, Daniel Lerner, Alex Inkeles)' },
          { name: 'Dependency Theory (Andre Gunder Frank - Development of Underdevelopment, Metropolis-Periphery Model, Fernando Henrique Cardoso, Samir Amin)' },
          { name: 'World Systems Theory (Immanuel Wallerstein: Core, Semi-Periphery, Periphery)' },
          { name: 'Sustainable Development, Post-Development Theory (Arturo Escobar), Human Development Approach (Amartya Sen: Capability Approach, Development as Freedom)' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: Economy and Society',
    topics: [
      {
        name: 'Sociological Perspectives on Economy and Markets',
        subtopics: [
          { name: 'Formalism vs Substantivism debate in Economic Anthropology (Karl Polanyi: The Great Transformation - Embeddedness, Reciprocity, Redistribution, Market Exchange)' },
          { name: 'Sociology of Markets: Mark Granovetter (Embeddedness of Economic Action in Social Networks, Strength of Weak Ties), Viviana Zelizer (Social Meaning of Money)' },
          { name: 'Gifts and Exchange: Marcel Mauss (The Gift - Obligation to give, receive, and reciprocate, Hau)' },
        ],
      },
      {
        name: 'Work, Labour, Industrialization and Globalization',
        subtopics: [
          { name: 'Labour Process: Harry Braverman (Labor and Monopoly Capital: Degradation of Work in the 20th Century, Deskilling), Fordism vs Post-Fordism / Flexible Specialization' },
          { name: 'Informal Sector & Precarious Labour: Informalization, Gig Economy, Platform Capitalism, Gender and Unpaid Care Work' },
          { name: 'Impact of Globalization on Indian Economy: Privatization, Disinvestment, SEZs, Land Acquisition, Displacement and Resettlement issues' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: Environment and Society',
    topics: [
      {
        name: 'Sociological Approaches to Nature, Environment and Risk',
        subtopics: [
          { name: 'Environmental Sociology: New Ecological Paradigm (NEP - Catton & Dunlap) vs Human Exemptionalism Paradigm (HEP)' },
          { name: 'Political Ecology, Treadmill of Production (Allan Schnaiberg), Ecological Modernization Theory (Arthur Mol, Gert Spaargaren)' },
          { name: 'Ulrich Beck: Risk Society (Manufactured Uncertainties, Reflexive Modernization)' },
        ],
      },
      {
        name: 'Environmental Degradation, Justice and Ecological Movements in India',
        subtopics: [
          { name: 'Environmental Justice Movement: Environmental Racism, Unequal Distribution of Environmental Hazards' },
          { name: 'Ecofeminism: Vandana Shiva (Staying Alive: Women, Ecology and Development - Prakriti/Purusha), Maria Mies, Bina Agarwal (Feminist Environmentalism)' },
          { name: 'Environmental Movements in India: Chipko Movement (Ramachandra Guha - The Unquiet Woods), Narmada Bachao Andolan (Medha Patkar), Silent Valley Movement, Appiko Movement, Forest Rights Act 2006 (FRA)' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Family, Marriage and Kinship',
    topics: [
      {
        name: 'Theories and Structural Variations of Kinship',
        subtopics: [
          { name: 'Descent Theory (Radcliffe-Brown, Evans-Pritchard, Fortes) vs Alliance Theory (Claude Lévi-Strauss - Elementary Structures of Kinship, Symmetrical vs Asymmetrical Cross-Cousin Marriage)' },
          { name: 'Matrilineal Systems in India: Taravad among Nayars of Kerala (Kathleen Gough), Khasis and Garos of Meghalaya' },
          { name: 'Patrilineal Systems and North Indian Kinship Systems: Lineage (Khandan), Gotra, Sapinda Rules' },
        ],
      },
      {
        name: 'Gender, Domestic Violence and Emerging Family Forms',
        subtopics: [
          { name: 'Patriarchy: Theories of Patriarchy (Sylvia Walby - Six structures of patriarchy: Paid work, Household production, Culture, Sexuality, Violence, State)' },
          { name: 'Gender Division of Labour, Domestic Labour Debate, Dowry system and Dowry Prohibition Act 1961, Protection of Women from Domestic Violence Act 2005 (PWDVA)' },
          { name: 'Contemporary Changes in Kinship: Same-Sex Unions, Live-in Relationships, Assisted Reproductive Technologies (Surrogacy, IVF) and New Reproductive Kinship' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Science, Technology and Society',
    topics: [
      {
        name: 'Sociology of Science and Scientific Knowledge',
        subtopics: [
          { name: 'Robert K. Merton: Sociology of Science, Mertonian Norms of Science / CUDOS Norms (Communalism, Universalism, Disinterestedness, Organized Skepticism), Matthew Effect in Science' },
          { name: 'Thomas Kuhn: The Structure of Scientific Revolutions (1962 - Paradigm Shifts, Normal Science, Incommensurability, Scientific Anomalies)' },
          { name: 'Sociology of Scientific Knowledge (SSK): David Bloor (Strong Programme: Symmetry Principle, Impartiality), Bruno Latour & Steve Woolgar (Laboratory Life, Actor-Network Theory ANT)' },
        ],
      },
      {
        name: 'Information Age, Digital Divide and Surveillance',
        subtopics: [
          { name: 'Manuel Castells: The Information Age (The Rise of the Network Society, Space of Flows vs Space of Places, Timeless Time)' },
          { name: 'Digital Divide: Socio-Economic, Gender, and Regional disparities in technological access and digital literacy in India' },
          { name: 'Shoshana Zuboff: Surveillance Capitalism, Big Data, Algorithmic Bias, AI Governance, and Social Media impact on Public Sphere' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Culture and Symbolic Transformations',
    topics: [
      {
        name: 'Culture, Signs, Semiotics and Hegemony',
        subtopics: [
          { name: 'Definitions of Culture: High Culture, Popular Culture, Folk Culture, Mass Culture' },
          { name: 'Frankfurt School & Culture Industry: Adorno and Horkheimer (Standardization, Pseudo-individuation)' },
          { name: 'Antonio Gramsci (Cultural Hegemony, Subalternity), Raymond Williams (Culture is Ordinary, Structures of Feeling, Dominant, Residual, Emergent Culture)' },
          { name: 'Semiotics: Roland Barthes (Mythologies - Denotation, Connotation, Myth as Semiological System)' },
        ],
      },
      {
        name: 'Identity, Diaspora, Globalization and Body',
        subtopics: [
          { name: 'Cultural Identity and Globalization: Cultural Homogenization (McDonaldization - George Ritzer, Cocacolonization) vs Cultural Heterogenization / Hybridization (Glolocalization - Roland Robertson), Cultural Imperialism' },
          { name: 'Diaspora and Transnationalism: Concepts, Indian Diaspora (Old vs New Diaspora), Cultural Hybridity, Nostalgia, Imagined Communities (Benedict Anderson)' },
          { name: 'Sociology of the Body and Consumption: Bryan Turner (The Body and Society), Jean Baudrillard (Consumer Society, Sign-Value), Thorstein Veblen (Theory of the Leisure Class - Conspicuous Consumption)' },
        ],
      },
    ],
  },
];
