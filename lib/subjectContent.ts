import { SubjectInfo } from './subjectContext';

export interface SubjectFeature {
  title: string;
  subtitle: string;
  description: string;
}

export interface SubjectLocalizedContent {
  heroBadge: string;
  headline: string;
  headlineHighlight: string;
  headlineNative?: string;
  tagline: string;
  description: string;
  ctaPractice: string;
  ctaSyllabus: string;
  ctaBenchmark: string;
  features: SubjectFeature[];
  curriculumBadge: string;
  whySectionTitle: string;
  whySectionSubtitle: string;
  direction: 'ltr' | 'rtl';
}

const SUBJECT_CONTENT_MAP: Record<string, Partial<SubjectLocalizedContent>> = {
  // ── Paper 1 (Common) ──
  'paper-1': {
    heroBadge: 'UGC NET GENERAL PAPER 1 (CODE 00) • COMMON FOR ALL CANDIDATES',
    headline: 'Master UGC NET Paper 1 —',
    headlineHighlight: 'Score 80+ Marks.',
    headlineNative: 'Teaching & Research Aptitude (General Paper 1)',
    tagline: 'Teaching Aptitude • Research Methodology • Higher Education • Mathematical Reasoning • Data Interpretation',
    description: 'Master the high-scoring foundation common to all UGC NET aspirants. Practice past exam papers with step-by-step explanations across all 10 core units.',
    ctaPractice: 'Start Paper 1 Practice',
    ctaSyllabus: 'Explore Paper 1 Syllabus (10 Units)',
    ctaBenchmark: 'Take Free Paper 1 Benchmark Exam',
    curriculumBadge: 'Official UGC NET Paper 1 Curriculum (10 Units)',
    whySectionTitle: 'Why Paper 1 Decides Your JRF Rank',
    whySectionSubtitle: 'A high score in General Paper 1 gives you the competitive edge needed to cross the JRF cutoff.',
    features: [
      {
        title: 'Teaching & Research Aptitude',
        subtitle: 'Foundational Pedagogy',
        description: 'Levels of teaching, research ethics, thesis formatting, and ICT integration.',
      },
      {
        title: 'Mathematical & Logical Reasoning',
        subtitle: 'Syllogisms & Data Analysis',
        description: 'Pramanasyas, Venn diagrams, number series, coding-decoding, and Data Interpretation.',
      },
      {
        title: 'People, Dev & Environment',
        subtitle: 'SDGs & Climate Protocols',
        description: 'Pollution indices, Paris Agreement, Montreal Protocol, and renewable energy targets.',
      },
      {
        title: 'Higher Education System',
        subtitle: 'Ancient to Modern Policies',
        description: 'Vedic institutions, NEP 2020, regulatory bodies (UGC, AICTE, NTA), and value education.',
      },
    ],
  },

  // ── Arabic (Code 29) ──
  arabic: {
    heroBadge: 'UGC NET / JRF ARABIC (CODE 29) • اللغة العربية وآدابها',
    headline: 'Master UGC NET Arabic —',
    headlineHighlight: 'the smart way.',
    headlineNative: 'ادرس المنهج الرسمي • تدرب على أسئلة الامتحانات السابقة • ثبّت حفظك بالروابط الذهنية',
    tagline: 'الأدب الجاهلي والإسلامي • العصر العباسي والأندلسي • الأدب الحديث والمعاصر • النحو والصرف والبلاغة • الأدب العربي في الهند',
    description: 'تدرب على أسئلة الامتحانات السابقة الحقيقية (٢٠٠٤–٢٠٢٤) للغة العربية وآدابها. تتبع نقاط ضعفك بدقة عبر الوحدات العشر، واستعد للامتحان في بيئة الاختبار الرسمي (CBT).',
    ctaPractice: 'ابدأ التدريب الآن (Start Practice)',
    ctaSyllabus: 'تصفح المنهج الرسمي (١٠ وحدات)',
    ctaBenchmark: 'خوض الاختبار المجاني (2023 Free Benchmark Exam)',
    curriculumBadge: 'المنهج الرسمي المعتمد لـ UGC NET (١٠ وحدات كاملة)',
    whySectionTitle: 'لماذا تعد هذه المنصة الخيار الأول لمرشحي JRF العربي؟',
    whySectionSubtitle: 'محتوى أصيل موثق بنماذج الإجابة الرسمية، وتصنيف دقيق لكل شاعر وأديب ومصنف.',
    direction: 'rtl',
    features: [
      {
        title: 'العصور الأدبية الكبرى',
        subtitle: 'من الجاهلية إلى العصر الحديث',
        description: 'تغطية شاملة لأعلام الأدب من شعراء المعلقات إلى رواد النهضة الحديثة.',
      },
      {
        title: 'الأدب العربي في الهند',
        subtitle: 'تراث علماء شبه القارة',
        description: 'مصنفات الشاه ولي الله الدهلوي، غلام علي آزاد البلكرامي، والندويين.',
      },
      {
        title: 'علوم اللغة والنقد',
        subtitle: 'النحو والبلاغة والعروض',
        description: 'أصول النحو الكوفي والبصري، البلاغة الواضحة، وموازين الشعر العربي.',
      },
      {
        title: 'محاكي NTA CBT الكامل',
        subtitle: 'توقيت وتنسيق رسمي',
        description: 'تجربة واقعية للامتحان مع عداد تنازلي، نظام المراجعة، وتقييم فوري.',
      },
    ],
  },

  // ── Hindi (Code 20) ──
  hindi: {
    heroBadge: 'UGC NET / JRF हिन्दी साहित्य (कोड 20) • संपूर्ण तैयारी',
    headline: 'UGC NET हिन्दी साहित्य —',
    headlineHighlight: 'JRF का प्रामाणिक मार्ग।',
    headlineNative: 'आधिकारिक पाठ्यक्रम • विगत वर्षों के प्रश्न-पत्र (PYQs) • सटीक विश्लेषण',
    tagline: 'हिन्दी भाषा का विकास • हिन्दी साहित्य का इतिहास • काव्यशास्त्र • कहानी, नाटक, उपन्यास एवं वैचारिक पृष्ठभूमि',
    description: 'हिन्दी साहित्य के संपूर्ण 10 इकाइयों का विस्तृत अध्ययन करें। 2004 से 2024 तक के आधिकारिक प्रश्नों को NTA CBT वातावरण में हल करें और अपनी तैयारी को शीर्ष स्तर पर ले जाएं।',
    ctaPractice: 'अभ्यास प्रारंभ करें (Start Practice)',
    ctaSyllabus: 'पाठ्यक्रम देखें (10 इकाइयाँ)',
    ctaBenchmark: 'निःशुल्क मॉक टेस्ट दें (Free Benchmark Exam)',
    curriculumBadge: 'NTA द्वारा निर्धारित आधिकारिक हिन्दी पाठ्यक्रम',
    whySectionTitle: 'हिन्दी साहित्य में JRF की सफलता के मुख्य आधार',
    whySectionSubtitle: 'आदिकाल से आधुनिक काल तक के रचनाकारों, पंक्तियों, और उपन्यासों का कालक्रमानुसार प्रामाणिक संकलन।',
    features: [
      {
        title: 'साहित्य का इतिहास',
        subtitle: 'आदिकाल, भक्तिकाल, रीतिकाल, आधुनिक काल',
        description: 'रामचंद्र शुक्ल, हजारी प्रसाद द्विवेदी एवं बच्चन सिंह के इतिहास ग्रंथों पर आधारित अध्ययन।',
      },
      {
        title: 'भारतीय एवं पाश्चात्य काव्यशास्त्र',
        subtitle: 'रस, ध्वनि, वक्रोक्ति एवं पाश्चात्य सिद्धांत',
        description: 'भरतमुनि से लेकर अरस्तू, लोंजाइनस, आई.ए. रिचर्ड्स और टी.एस. इलियट के सिद्धांत।',
      },
      {
        title: 'गद्य विधाएं एवं पाठ्य पुस्तकें',
        subtitle: 'उपन्यास, नाटक, निबंध एवं आत्मकथा',
        description: 'गोदान, अंधा युग, राग दरबारी, भारत दुर्दशा तथा अन्य प्रमुख पाठों का गहन विश्लेषण।',
      },
      {
        title: 'विगत 20 वर्षों के प्रश्न',
        subtitle: 'NTA CBT प्रारूप में',
        description: 'अपेक्षित एवं पूर्व-परीक्षा के प्रश्नों का कालक्रम, सुमेलन और अभिकथन-तर्क अभ्यास।',
      },
    ],
  },

  // ── Urdu (Code 28) ──
  urdu: {
    heroBadge: 'UGC NET / JRF اردو ادب (کوڈ 28) • مکمل تیاری',
    headline: 'UGC NET اردو ادب —',
    headlineHighlight: 'کامیابی کی یقینی ضمانت۔',
    headlineNative: 'سرکاری نصاب • گزشتہ سالوں کے حل شدہ پرچہ جات • مستند نوٹس',
    tagline: 'اردو زبان کی تاریخ • شاعری اور نثری اصناف • دبستان اور تحریکات • تنقید و تحقیق',
    description: 'اردو زبان و ادب کے تمام دس یونٹس کی جامع تیاری کریں۔ 2004 سے 2024 تک کے تمام سرکاری پیپرز کو آن لائن کمپیوٹر بیسڈ ماحول میں حل کریں۔',
    ctaPractice: 'مشق شروع کریں (Start Practice)',
    ctaSyllabus: 'مکمل نصاب ملاحظہ کریں',
    ctaBenchmark: 'مفت بینچ مارک ٹیسٹ دیں',
    curriculumBadge: 'UGC NET کا سرکاری منظور شدہ اردو نصاب',
    whySectionTitle: 'اردو نیٹ/جے آر ایف کے لیے یہ پلیٹ فارم کیوں منتخب کریں؟',
    whySectionSubtitle: 'قدیم و جدید شعرا، مثنوی، مرثیہ، غزل، ناول اور تنقیدی نظریات کا مکمل احاطہ۔',
    direction: 'rtl',
    features: [
      {
        title: 'کلاسیکی و جدید شاعری',
        subtitle: 'غزل، قصیدہ، مثنوی، مرثیہ اور نظم',
        description: 'میر، غالب، اقبال، فیض اور جدید شعرا کے منتخب کلام اور فکری رجحانات۔',
      },
      {
        title: 'نثری اصناف اور داستانیں',
        subtitle: 'ناول، افسانہ، ڈرامہ اور انشائیہ',
        description: 'باغ و بہار، فسانہ عجائب، گؤدان، پریم چند اور عصمت چغتائی کے شاہکار۔',
      },
      {
        title: 'ادبی تحریکات و دبستان',
        subtitle: 'دبستان دلی و لکھنؤ، علی گڑھ و ترقی پسند',
        description: 'فورٹ ولیم کالج سے لے کر جدیدیت اور مابعد جدیدیت تک کے ادبی ادوار۔',
      },
      {
        title: 'آن لائن سی بی ٹی ٹیسٹ',
        subtitle: 'اصلی امتحانی فارمیٹ',
        description: 'تمام امتحانات کے سوالات کی ترتیب وار مشق اور ذاتی کمزوریوں کی فوری اصلاح۔',
      },
    ],
  },

  // ── Sanskrit (Code 25) ──
  sanskrit: {
    heroBadge: 'UGC NET / JRF संस्कृतम् (कोड 25) • साफल्यस्य निश्चितः मार्गः',
    headline: 'UGC NET संस्कृत साहित्य —',
    headlineHighlight: 'साफल्यस्य परमं साधनम्।',
    headlineNative: 'आधिकारिकः पाठ्यक्रमः • पूर्ववर्षीय-प्रश्नोत्तराणि • स्मृति-दृढीकरणम्',
    tagline: 'वैदिक-साहित्यम् • दर्शन-शास्त्राणि • व्याकरणं भाषाविज्ञानं च • संस्कृत-साहित्यं काव्यशास्त्रं च',
    description: 'संस्कृतसाहित्यस्य संपूर्णदश-इकाईनां गभीरमध्ययनं कुर्वन्तु। २००४ तः २०२४ पर्यन्तं पृष्टानां प्रश्नानां प्रामाणिकम् अभ्यासम् आचरन्तु।',
    ctaPractice: 'अभ्यासं प्रारभताम् (Start Practice)',
    ctaSyllabus: 'पाठ्यक्रमं पश्यतु (१० Units)',
    ctaBenchmark: 'निःशुल्क-परीक्षां प्रयच्छतु (Free Benchmark Exam)',
    curriculumBadge: 'UGC NET आधिकारिक-संस्कृत-पाठ्यक्रमः (दश-इकाइयः)',
    whySectionTitle: 'संस्कृत-JRF-प्राप्तये अस्माकं वैशिष्ट्यम्',
    whySectionSubtitle: 'संहिता, ब्राह्मण, उपनिषद्, व्याकरण, न्याय, वेदान्त एवं काव्यानां सूक्ष्मावलोकनम्।',
    features: [
      {
        title: 'वैदिकं साहित्यम्',
        subtitle: 'संहिता, ब्राह्मण, आरण्यक, उपनिषदः',
        description: 'ऋग्वेद-सूक्तानि, तैत्तिरीय-संहिता, ईशादि-दशोपनिषदः तथा वेदाङ्गानाम् अध्ययनम्।',
      },
      {
        title: 'व्याकरणं भाषाविज्ञानं च',
        subtitle: 'लघुसिद्धान्तकौमुदी, महाभाष्यम्, वाक्यपदीयम्',
        description: 'सज्ञा, सन्धि, समास, कारक, कृत्-तद्धित-प्रक्रिया तथा ध्वनि-परिवर्तन-नियमाः।',
      },
      {
        title: 'भारतीय-दर्शनम्',
        subtitle: 'सांख्य, योग, न्याय, वैशेषिक, मीमांसा, वेदान्त',
        description: 'सांख्यकारिका, तर्कसंग्रहः, अर्थसंग्रहः, वेदान्तसारः तथा दर्शन-सिद्धान्ताः।',
      },
      {
        title: 'काव्यं काव्यशास्त्रं च',
        subtitle: 'नाट्यशास्त्रम्, काव्यप्रकाशः, साहित्यदर्पणः',
        description: 'कालिदास, भारवि, श्रीहर्ष, भवभूति-कृतयः तथा रस-ध्वनि-अलङ्कार-सिद्धान्ताः।',
      },
    ],
  },

  // ── English (Code 30) ──
  english: {
    heroBadge: 'UGC NET / JRF ENGLISH (CODE 30) • PREPARATION PLATFORM',
    headline: 'Master UGC NET English —',
    headlineHighlight: 'The Definitive JRF Guide.',
    headlineNative: 'British, Postcolonial, American Literature & Critical Theory',
    tagline: 'Chaucer to Contemporary • Literary Criticism & Theory • Cultural Studies • Language & Pedagogy',
    description: 'Conquer the vast syllabus of UGC NET English Literature. Practice 20+ years of official NTA questions with chronologically indexed authors, critical terms, and literary movements.',
    ctaPractice: 'Start English Practice',
    ctaSyllabus: 'Explore English Syllabus',
    ctaBenchmark: 'Take Free English Benchmark Exam',
    curriculumBadge: 'Official NTA English Literature Curriculum (10 Units)',
    whySectionTitle: 'Why Our English Literature Engine Delivers Results',
    whySectionSubtitle: 'From Renaissance drama to Post-structuralism and Cultural Studies, master every key text and theorist.',
    features: [
      {
        title: 'British Literature & Drama',
        subtitle: 'Chaucer to the 21st Century',
        description: 'In-depth coverage of Elizabethan, Jacobean, Augustan, Romantic, Victorian, and Modernist works.',
      },
      {
        title: 'Literary Theory & Criticism',
        subtitle: 'Classical to Post-theory',
        description: 'Aristotle, Sidney, Dryden, Arnold, New Criticism, Structuralism, Deconstruction, and Eco-criticism.',
      },
      {
        title: 'Non-British & Postcolonial Literature',
        subtitle: 'Indian, American, African & Caribbean',
        description: 'R.K. Narayan, Salman Rushdie, Chinua Achebe, Toni Morrison, and Derek Walcott.',
      },
      {
        title: 'Cultural Studies & Research Methods',
        subtitle: 'Birmingham School & Methodologies',
        description: 'Stuart Hall, Raymond Williams, MLA handbook conventions, and research methodologies.',
      },
    ],
  },

  // ── Commerce (Code 08) ──
  commerce: {
    heroBadge: 'UGC NET / JRF COMMERCE (CODE 08) • FINANCE & ACCOUNTING',
    headline: 'Master UGC NET Commerce —',
    headlineHighlight: 'Concept-Driven JRF Prep.',
    headlineNative: 'Accounting, Finance, Taxation, Banking & Business Environment',
    tagline: 'Accounting & Auditing • Business Finance • Income Tax & Corporate Tax Planning • Banking & Financial Institutions',
    description: 'Build absolute mastery over all 10 Commerce units. Solve complex numericals, corporate law provisions, and taxation rules with authentic past exam questions.',
    ctaPractice: 'Start Commerce Practice',
    ctaSyllabus: 'Explore Commerce Syllabus',
    ctaBenchmark: 'Take Free Commerce Benchmark Exam',
    curriculumBadge: 'Official NTA Commerce Curriculum (10 Units)',
    whySectionTitle: 'Designed for High Scores in Commerce',
    whySectionSubtitle: 'Clear conceptual breakdowns of AS/Ind-AS, capital budgeting formulas, and latest tax slabs.',
    features: [
      {
        title: 'Accounting & Auditing',
        subtitle: 'Financial, Corporate & Cost Accounting',
        description: 'Ind-AS standards, partnership dissolution, holding company accounts, and audit sampling.',
      },
      {
        title: 'Business Finance',
        subtitle: 'Capital Budgeting & Cost of Capital',
        description: 'WACC, MM hypothesis, dividend models (Gordon, Walter), working capital management.',
      },
      {
        title: 'Income Tax & Corporate Tax',
        subtitle: 'Assessment & Provisions',
        description: 'Residential status, head-wise deductions, MAT, transfer pricing, and TDS regulations.',
      },
      {
        title: 'Banking & Financial Institutions',
        subtitle: 'RBI, Basel Norms & Capital Markets',
        description: 'Monetary policy, NPA resolution, SEBI regulations, NBFCs, and digital banking frameworks.',
      },
    ],
  },

  // ── Political Science (Code 02) ──
  'political-science': {
    heroBadge: 'UGC NET / JRF POLITICAL SCIENCE (CODE 02) • राजनीति विज्ञान',
    headline: 'Master Political Science —',
    headlineHighlight: 'From Theory to Global Order.',
    headlineNative: 'Political Theory, Indian Constitution, Comparative Politics & IR',
    tagline: 'Western & Indian Political Thought • Indian Constitution & Governance • International Relations & Foreign Policy',
    description: 'Master political thinkers, constitutional amendments, and international paradigms with 20+ years of verified UGC NET questions.',
    ctaPractice: 'Start Political Science Practice',
    ctaSyllabus: 'Explore Political Science Syllabus',
    ctaBenchmark: 'Take Free Benchmark Exam',
    curriculumBadge: 'Official NTA Political Science Curriculum (10 Units)',
    whySectionTitle: 'Master Political Theory & Governance',
    whySectionSubtitle: 'From Plato and Kautilya to modern IR realism, liberalism, and Indian constitutional jurisprudence.',
    features: [
      {
        title: 'Political Theory & Thought',
        subtitle: 'Western & Indian Thinkers',
        description: 'Plato, Machiavelli, Hobbes, Locke, Marx, Rawls, Kautilya, Gandhi, Ambedkar, and Roy.',
      },
      {
        title: 'Indian Constitution & Institutions',
        subtitle: 'Articles, Judgments & Governance',
        description: 'Fundamental rights, directive principles, judicial review, federalism, and statutory bodies.',
      },
      {
        title: 'Comparative Politics',
        subtitle: 'Regimes & Political Systems',
        description: 'Constitutionalism, electoral systems, party systems, political development, and revolution theories.',
      },
      {
        title: 'International Relations & India',
        subtitle: 'Global Politics & Foreign Policy',
        description: 'Realism, constructivism, UN system, NAM, Act East Policy, and bilateral security alignments.',
      },
    ],
  },

  // ── History (Code 06) ──
  history: {
    heroBadge: 'UGC NET / JRF HISTORY (CODE 06) • इतिहास',
    headline: 'Master UGC NET History —',
    headlineHighlight: 'From Ancient Sources to Modern India.',
    headlineNative: 'Ancient, Medieval, Modern Indian History & Historiography',
    tagline: 'Archaeological & Epigraphic Sources • Delhi Sultanate & Mughals • Freedom Struggle • Historical Method',
    description: 'Master chronological timelines, inscriptions, administrative systems, agrarian structures, and historiographical debates across Indian history.',
    ctaPractice: 'Start History Practice',
    ctaSyllabus: 'Explore History Syllabus',
    ctaBenchmark: 'Take Free History Benchmark Exam',
    curriculumBadge: 'Official NTA History Curriculum (10 Units)',
    whySectionTitle: 'Chronological Precision for History JRF',
    whySectionSubtitle: 'Detailed coverage of dynasties, revenue terms, architectural styles, and landmark historical treatises.',
    features: [
      {
        title: 'Ancient Indian History',
        subtitle: 'Harappa to Early Medieval',
        description: 'Vedic polity, Mauryan administration, Gupta golden age, Sangam literature, and temple styles.',
      },
      {
        title: 'Medieval India',
        subtitle: 'Sultanate, Mughals & Regional Kingdoms',
        description: 'Iqta system, Mansabdari, Bhakti and Sufi movements, Vijayanagara Empire, and Maratha state.',
      },
      {
        title: 'Modern Indian History',
        subtitle: 'Colonial Economy to Independence',
        description: 'Land settlements, 1857 revolt, social reform movements, INC sessions, and freedom movements.',
      },
      {
        title: 'Historical Method & Historiography',
        subtitle: 'Research & Historical Schools',
        description: 'Imperialist, Nationalist, Marxist, Subaltern historiography, primary vs secondary source criticism.',
      },
    ],
  },

  // ── Computer Science (Code 87) ──
  'computer-science-and-applications': {
    heroBadge: 'UGC NET COMPUTER SCIENCE (CODE 87) • IT & APPLICATIONS',
    headline: 'Master UGC NET Computer Science —',
    headlineHighlight: 'Crack JRF with Algorithmic Precision.',
    headlineNative: 'Discrete Mathematics, Algorithms, OS, DBMS, Networks & AI',
    tagline: 'Discrete Structures • Data Structures & Algorithms • Operating Systems • Computer Networks • AI & ML',
    description: 'Practice high-yield theoretical and numerical questions from TOC, Operating Systems, Computer Architecture, Database Systems, and Software Engineering.',
    ctaPractice: 'Start CS Practice',
    ctaSyllabus: 'Explore CS Syllabus',
    ctaBenchmark: 'Take Free CS Benchmark Exam',
    curriculumBadge: 'Official NTA Computer Science Curriculum (10 Units)',
    whySectionTitle: 'Algorithmic Mastery for Computer Science',
    whySectionSubtitle: 'From Chomsky hierarchy in TOC to deadlock algorithms and relational calculus in DBMS.',
    features: [
      {
        title: 'Theory of Computation & Compilers',
        subtitle: 'Automata, Grammars & Parsing',
        description: 'DFA/NFA equivalence, pumping lemma, Turing machines, LL/LR parsers, and code optimization.',
      },
      {
        title: 'Data Structures & Algorithms',
        subtitle: 'Complexity & Design Techniques',
        description: 'Asymptotic notation, Divide & Conquer, Dynamic Programming, Greedy algorithms, Graph traversals.',
      },
      {
        title: 'DBMS & Operating Systems',
        subtitle: 'Core Systems Engineering',
        description: 'Normalization (BCNF, 4NF), ACID transactions, process synchronization, paging, and virtual memory.',
      },
      {
        title: 'Computer Networks & Security',
        subtitle: 'Protocols & Cryptography',
        description: 'TCP/IP layers, routing algorithms (Dijkstra, Bellman-Ford), RSA encryption, and firewalls.',
      },
    ],
  },

  // ── Law (Code 58) ──
  law: {
    heroBadge: 'UGC NET / JRF LAW (CODE 58) • विधि',
    headline: 'Master UGC NET Law —',
    headlineHighlight: 'From Jurisprudence to Judicial Precedents.',
    headlineNative: 'Jurisprudence, Constitutional Law, International Law, Crimes & Torts',
    tagline: 'Jurisprudence & Legal Theory • Constitutional & Administrative Law • Public International Law • Law of Crimes & Torts',
    description: 'Strengthen legal reasoning with comprehensive coverage of landmark Supreme Court judgments, statutory provisions, international treaties, and jurisprudential schools.',
    ctaPractice: 'Start Law Practice',
    ctaSyllabus: 'Explore Law Syllabus',
    ctaBenchmark: 'Take Free Law Benchmark Exam',
    curriculumBadge: 'Official NTA Law Curriculum (10 Units)',
    whySectionTitle: 'Precision Legal Analysis for Law JRF',
    whySectionSubtitle: 'Master legal maxims, constitutional doctrines, IPC sections, and international conventions.',
    features: [
      {
        title: 'Jurisprudence & Legal Theory',
        subtitle: 'Analytical, Natural, Historical & Realist',
        description: 'Bentham, Austin, Hart, Kelsen, Fuller, Savigny, Roscoe Pound, and feminist jurisprudence.',
      },
      {
        title: 'Constitutional & Administrative Law',
        subtitle: 'Fundamental Rights & Judicial Review',
        description: 'Basic structure doctrine, emergency provisions, writs, delegated legislation, and ombudsman.',
      },
      {
        title: 'Public International Law & IHR',
        subtitle: 'Treaties, Statehood & Human Rights',
        description: 'ICJ statutes, law of the sea (UNCLOS), extradition, asylum, and international humanitarian law.',
      },
      {
        title: 'Law of Crimes & Commercial Law',
        subtitle: 'IPC, Contract & Intellectual Property',
        description: 'General exceptions, culpable homicide vs murder, consideration, breach of contract, and TRIPS.',
      },
    ],
  },
};

/**
 * Returns localized, pedagogy-matched content for any active UGC NET subject
 */
export function getSubjectLocalizedContent(subject: SubjectInfo): SubjectLocalizedContent {
  const custom = SUBJECT_CONTENT_MAP[subject.slug];
  if (custom) {
    return {
      heroBadge: custom.heroBadge || `UGC NET / JRF ${subject.name.toUpperCase()} (CODE ${subject.code})`,
      headline: custom.headline || `Master UGC NET ${subject.name} —`,
      headlineHighlight: custom.headlineHighlight || 'the smart way.',
      headlineNative: custom.headlineNative || subject.name_native || undefined,
      tagline: custom.tagline || `Master the official 10 units of ${subject.name} with authentic past exam questions and CBT mock tests.`,
      description: custom.description || `Practice authentic UGC NET ${subject.name} (Code ${subject.code}) previous year questions under official NTA exam conditions. Track your accuracy and master all 10 units.`,
      ctaPractice: custom.ctaPractice || `Start ${subject.name} Practice`,
      ctaSyllabus: custom.ctaSyllabus || `Explore ${subject.name} Syllabus`,
      ctaBenchmark: custom.ctaBenchmark || `Take Free ${subject.name} Benchmark Exam`,
      curriculumBadge: custom.curriculumBadge || `Official UGC NET ${subject.name} Curriculum (10 Units)`,
      whySectionTitle: custom.whySectionTitle || `Why Choose Our ${subject.name} Preparation Engine?`,
      whySectionSubtitle: custom.whySectionSubtitle || `Comprehensive coverage of official past papers, syllabus drilldowns, and mistake tracking for ${subject.name}.`,
      direction: custom.direction || subject.direction,
      features: custom.features || [
        {
          title: 'Official 10-Unit Syllabus',
          subtitle: 'Complete NTA Coverage',
          description: `Structured hierarchical drilldown through all topics and subtopics for ${subject.name}.`,
        },
        {
          title: 'Authentic Past Papers (PYQs)',
          subtitle: 'Official NTA Keys',
          description: `Practice multi-year past questions with official answer keys and performance analysis.`,
        },
        {
          title: 'Timed CBT Mock Simulator',
          subtitle: 'Real Exam Conditions',
          description: `Experience the authentic NTA interface with official test timers and scorecard generation.`,
        },
        {
          title: 'Personal Mistake Tracker',
          subtitle: 'Targeted Revision',
          description: `Automatically track incorrect questions and focus your revision on weak units.`,
        },
      ],
    };
  }

  // Generic Dynamic Localization Fallback for all other 75+ subjects
  const isRtl = subject.direction === 'rtl';
  return {
    heroBadge: `UGC NET / JRF ${subject.name.toUpperCase()} (CODE ${subject.code}) • PREP PLATFORM`,
    headline: `Master UGC NET ${subject.name} —`,
    headlineHighlight: 'the smart way.',
    headlineNative: subject.name_native || undefined,
    tagline: `Official 10 Units • Authentic Past Exam Papers • Timed NTA Mock Tests • Mistake Tracker`,
    description: `Prepare for UGC NET ${subject.name} (Subject Code ${subject.code}) with authentic previous-year questions, 10-unit syllabus exploration, and computer-based mock tests.`,
    ctaPractice: `Start ${subject.name} Practice`,
    ctaSyllabus: `Explore ${subject.name} Syllabus`,
    ctaBenchmark: `Take Free ${subject.name} Benchmark Exam`,
    curriculumBadge: `Official NTA Curriculum for ${subject.name} (Code ${subject.code})`,
    whySectionTitle: `Why Prepare for ${subject.name} Here?`,
    whySectionSubtitle: `Authentic question sets, official scoring guidelines, and real-time accuracy analytics tailored to ${subject.name}.`,
    direction: isRtl ? 'rtl' : 'ltr',
    features: [
      {
        title: `${subject.name} Core Syllabus`,
        subtitle: '10 Structured Units',
        description: `Complete NTA curriculum mapping for all foundational and advanced topics in ${subject.name}.`,
      },
      {
        title: 'Authentic Past Papers',
        subtitle: 'Official NTA Keys',
        description: `Full collection of past examination questions with verified answer keys.`,
      },
      {
        title: 'NTA CBT Simulator',
        subtitle: 'Timed Exam Practice',
        description: `Practice with authentic countdown timers, question palettes, and immediate score breakdowns.`,
      },
      {
        title: 'Mistake Diagnostic',
        subtitle: 'Weak Area Detection',
        description: `Identify exactly which units need more practice to guarantee your JRF qualification.`,
      },
    ],
  };
}
