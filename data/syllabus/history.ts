import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const historySyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET History (Code 06) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const historySyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Negotiating the Sources and Early Indian History',
    topics: [
      {
        name: 'Negotiating the Sources',
        subtopics: [
          { name: 'Archaeological Sources: Exploration, Excavation, Epigraphy, Numismatics' },
          { name: 'Dating methods and techniques of archaeological sites' },
          { name: 'Indigenous Literary Sources: Vedic, Epic, Puranic, Buddhist, Jaina literature' },
          { name: 'Foreign Accounts: Greek, Roman, Chinese, Arab travellers' },
        ],
      },
      {
        name: 'Pastoralism and Food Production',
        subtopics: [
          { name: 'Neolithic and Chalcolithic phases: Settlement patterns, tools, exchange' },
          { name: 'Prehistoric hunting-gathering: Paleolithic and Mesolithic cultures' },
        ],
      },
      {
        name: 'Indus / Harappan Civilization',
        subtopics: [
          { name: 'Origin, geographical extent, and major sites' },
          { name: 'Urban planning, settlement patterns, architecture' },
          { name: 'Craft specialization, metallurgy, trade networks' },
          { name: 'Social structure, religious practices, political organization' },
          { name: 'Decline and late Harappan phases' },
        ],
      },
      {
        name: 'Vedic and Later Vedic Periods',
        subtopics: [
          { name: 'Aryan debate and migrations' },
          { name: 'Early Vedic society: Polity, lineage, economy, religion' },
          { name: 'Later Vedic: Expansion, Varna stratification, rituals, philosophy' },
          { name: 'Iron technology and socio-economic impact' },
        ],
      },
      {
        name: 'Second Urbanization and State System',
        subtopics: [
          { name: 'Mahajanapadas: Monarchies and Ganasanghas' },
          { name: 'Rise of Buddhism, Jainism, Ajivikas' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'From State to Empire',
    topics: [
      {
        name: 'Rise of Magadha and Pre-Mauryan Polities',
        subtopics: [
          { name: 'Haryankas, Shishunagas, Nandas' },
          { name: 'Persian and Macedonian invasions' },
        ],
      },
      {
        name: 'The Mauryan Empire',
        subtopics: [
          { name: 'Chandragupta Maurya and Bindusara' },
          { name: 'Ashoka: Dhamma, edicts, inscriptions' },
          { name: 'Administration: Central, provincial, local' },
          { name: 'Economy: Revenue, craft guilds, trade' },
          { name: 'Art and architecture: Pillars, caves, stupas' },
          { name: 'Decline and disintegration' },
        ],
      },
      {
        name: 'Post-Mauryan Dynasties',
        subtopics: [
          { name: 'Shungas, Kanvas' },
          { name: 'Indo-Greeks, Sakas, Parthians, Kushanas' },
          { name: 'Satavahanas and Western Kshatrapas' },
          { name: 'Sangam Age: Polity, society, maritime trade' },
        ],
      },
      {
        name: 'The Imperial Guptas and Vakatakas',
        subtopics: [
          { name: 'Samudragupta, Chandragupta II' },
          { name: 'Administration, land grants, revenue' },
          { name: 'Economy, trade, coinage' },
          { name: 'Science, literature, temple architecture' },
        ],
      },
      {
        name: 'Post-Gupta Period',
        subtopics: [
          { name: 'Harshavardhana: Empire, administration, Xuanzang' },
          { name: 'Maitrakas, Maukharis, Gaudas' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Emergence of Regional Kingdoms (c. 650–1200 CE)',
    topics: [
      {
        name: 'Regional Kingdoms in the Deccan',
        subtopics: [
          { name: 'Chalukyas of Badami, Vengi, and Kalyani' },
          { name: 'Rashtrakutas: Literature, Ellora' },
          { name: 'Hoysalas, Kakatiyas, Yadavas' },
        ],
      },
      {
        name: 'Regional Kingdoms in South India',
        subtopics: [
          { name: 'Pallavas: Mahabalipuram temples' },
          { name: 'Imperial Cholas: Village assemblies, navy, maritime expansion' },
          { name: 'Pandyas and Cheras' },
        ],
      },
      {
        name: 'Eastern, Western, and Northern India',
        subtopics: [
          { name: 'Palas and Senas: Mahayana Buddhism, Nalanda' },
          { name: 'Gurjara-Pratiharas, Paramaras, Chandellas, Chauhans' },
          { name: 'Arab conquest of Sindh, Ghaznavid invasions' },
        ],
      },
      {
        name: 'Early Medieval Society and Culture',
        subtopics: [
          { name: 'Debates on Indian Feudalism: Land grants, peasant subordination' },
          { name: 'Bhakti tradition: Alvars, Nayanars, Shankaracharya' },
          { name: 'Temple architecture: Nagara, Dravida, Vesara' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Sources of Medieval Indian History and Political Developments',
    topics: [
      {
        name: 'Sources for Medieval History',
        subtopics: [
          { name: 'Archaeological, epigraphic, numismatic sources' },
          { name: 'Persian chronicles: Barani, Amir Khusrau, Baburnama, Ain-i-Akbari' },
          { name: 'Travelogues: Ibn Battuta, Bernier, Tavernier' },
        ],
      },
      {
        name: 'Delhi Sultanate (1206–1526)',
        subtopics: [
          { name: 'Aibak, Iltutmish, Balban' },
          { name: 'Alauddin Khalji: Market and military reforms' },
          { name: 'Muhammad bin Tughlaq, Firuz Shah Tughlaq' },
          { name: 'Sayyids and Lodis; decline' },
        ],
      },
      {
        name: 'Mughal Empire',
        subtopics: [
          { name: 'Babur, Humayun, Sher Shah Suri' },
          { name: 'Akbar: Rajput policy, Sulh-i-Kul, Din-i-Ilahi' },
          { name: 'Jahangir, Shah Jahan, Aurangzeb' },
          { name: 'Decline: Jagirdari crisis' },
        ],
      },
      {
        name: 'Regional Powers and Marathas',
        subtopics: [
          { name: 'Vijayanagara: Nayankara, Krishnadevaraya' },
          { name: 'Bahmani and Deccan Sultanates' },
          { name: 'Shivaji: Ashta Pradhan, Chauth, Sardeshmukhi' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Medieval Administration and Economy',
    topics: [
      {
        name: 'Administrative Systems',
        subtopics: [
          { name: 'Delhi Sultanate: Iqta system' },
          { name: 'Mughal: Mansabdari, Jagirdari, Zamindars' },
          { name: 'Maratha administration' },
        ],
      },
      {
        name: 'Agrarian Economy and Land Revenue',
        subtopics: [
          { name: 'Zabti, Nasaq, Ghalla-Bakshi, Kankut' },
          { name: 'Peasant classes: Khudkasht, Pahikasht' },
          { name: 'Famines and agrarian revolts' },
        ],
      },
      {
        name: 'Trade, Commerce, and Urbanization',
        subtopics: [
          { name: 'Inland and maritime trade routes' },
          { name: 'Hundis, Sarrafs, Dadni system' },
          { name: 'Growth of medieval cities' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Medieval Society and Culture',
    topics: [
      {
        name: 'Social Structure and Stratification',
        subtopics: [
          { name: 'Ruling elites, nobility, artisans, slaves' },
          { name: 'Caste, Varna, status of women' },
        ],
      },
      {
        name: 'Religious Movements',
        subtopics: [
          { name: 'Sufism: Chishti, Suhrawardi, Qadiri, Naqshbandi' },
          { name: 'Bhakti: Kabir, Nanak, Mirabai, Chaitanya, Tulsidas' },
          { name: 'Sikh Panth: Guru Nanak to Guru Gobind Singh' },
        ],
      },
      {
        name: 'Education, Literature, Architecture',
        subtopics: [
          { name: 'Maktabs, Madrassas, Pathshalas' },
          { name: 'Sultanate Architecture: Qutb Minar, Tughlaqabad' },
          { name: 'Mughal Architecture: Taj Mahal, Fatehpur Sikri, Red Fort' },
          { name: 'Painting schools and Music' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Sources of Modern Indian History and British Expansion',
    topics: [
      {
        name: 'Sources for Modern History',
        subtopics: [
          { name: 'Archives, private papers, newspapers, gazetteers' },
          { name: 'Oral history, photographs, monuments' },
        ],
      },
      {
        name: 'European Ingress and Colonial Wars',
        subtopics: [
          { name: 'East India Companies: Portuguese, Dutch, British, French' },
          { name: 'Anglo-French rivalry: Carnatic Wars' },
          { name: 'Plassey (1757) and Buxar (1764)' },
        ],
      },
      {
        name: 'British Expansion and Consolidation',
        subtopics: [
          { name: 'Anglo-Mysore, Anglo-Maratha, Anglo-Sikh Wars' },
          { name: 'Subsidiary Alliance, Doctrine of Lapse' },
        ],
      },
      {
        name: 'Revolt of 1857',
        subtopics: [
          { name: 'Earlier civil and tribal rebellions' },
          { name: 'Causes, leadership, regional spread, outcome' },
          { name: 'Government of India Act 1858' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Colonial Economy and Society',
    topics: [
      {
        name: 'Colonial Economic Policies',
        subtopics: [
          { name: 'Permanent Settlement, Ryotwari, Mahalwari' },
          { name: 'De-industrialization, Drain of Wealth' },
        ],
      },
      {
        name: 'Modern Industry and Infrastructure',
        subtopics: [
          { name: 'Cotton, jute, coal, iron and steel industries' },
          { name: 'Railways, telegraph, famines' },
        ],
      },
      {
        name: 'Social and Religious Reform',
        subtopics: [
          { name: 'Brahmo Samaj, Arya Samaj, Ramakrishna Mission' },
          { name: 'Aligarh Movement, Deoband' },
          { name: 'Anti-caste movements: Phule, Periyar, Narayana Guru' },
        ],
      },
      {
        name: 'Modern Education and Social Transitions',
        subtopics: [
          { name: "Macaulay's Minute, Wood's Despatch 1854" },
          { name: "Abolition of Sati, widow remarriage, women's education" },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Rise of Indian Nationalism and Post-Independence',
    topics: [
      {
        name: 'Emergence of Nationalism',
        subtopics: [
          { name: 'Foundation of INC (1885), Moderates' },
          { name: 'Extremism: Lal-Bal-Pal, Swadeshi' },
          { name: 'Revolutionary movements: Ghadar Party, HSRA, Bhagat Singh' },
        ],
      },
      {
        name: 'Gandhian Era',
        subtopics: [
          { name: 'Champaran, Kheda, Non-Cooperation, Khilafat' },
          { name: 'Civil Disobedience, Round Table, Poona Pact' },
          { name: 'Quit India 1942, INA, RIN Mutiny' },
        ],
      },
      {
        name: 'Left Politics and Independence',
        subtopics: [
          { name: 'CPI, Trade Unions, Kisan Sabhas' },
          { name: 'Ambedkar: Anti-caste, Constitutional struggle' },
          { name: 'Partition and Independence (1947)' },
        ],
      },
      {
        name: 'Post-Independence Consolidation',
        subtopics: [
          { name: 'Integration of Princely States' },
          { name: 'Constitution, linguistic reorganization' },
          { name: 'Five-Year Plans, Non-Aligned Movement' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Historical Method, Research Methodology, and Historiography',
    topics: [
      {
        name: 'Scope and Concepts in History',
        subtopics: [
          { name: 'Definition, nature, objectivity, bias' },
          { name: 'Causation, generalization, periodization' },
        ],
      },
      {
        name: 'Research Methodology',
        subtopics: [
          { name: 'Primary vs. Secondary sources' },
          { name: 'Heuristics and Hermeneutics' },
          { name: 'Footnotes, bibliography, ethics' },
        ],
      },
      {
        name: 'Historiographical Traditions',
        subtopics: [
          { name: 'Greco-Roman: Herodotus, Thucydides' },
          { name: 'Islamic: Ibn Khaldun, Al-Biruni' },
          { name: 'Indian: Itihasa-Purana, Rajatarangini' },
        ],
      },
      {
        name: 'Modern Schools of Thought',
        subtopics: [
          { name: 'Positivist (Ranke), Marxist, Annales School' },
          { name: 'Imperialist, Nationalist, Cambridge schools' },
          { name: 'Subaltern Studies (Ranajit Guha)' },
          { name: 'Postmodernism and Postcolonial critique' },
        ],
      },
    ],
  },
];
