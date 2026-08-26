import { MockTestDefinition, RawMockQuestion } from '../common';

export function getEducationMockTest(): MockTestDefinition {
  const questions: RawMockQuestion[] = [
    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 1: EDUCATIONAL STUDIES & PHILOSOPHY (10 Questions: Q1 - Q10)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 1,
      questionText: 'In classical Western philosophy of education, "Pragmatism" (expounded by John Dewey in "Democracy and Education", 1916) asserts that:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Truth is dynamic and verified by practical experimental consequences; education is life itself ("Learning by Doing"), not mere preparation for life',
        B: 'Ideas are the only ultimate eternal reality (Idealism / Plato)',
        C: 'Physical matter and empirical nature are the sole realities (Naturalism / Rousseau)',
        D: 'Education should enforce rigid authoritarian curriculum',
      },
      correctAnswer: 'A',
      explanation: 'Dewey\'s Pragmatic Instrumentalism views education as the continuous reconstruction and reorganization of lived experience through problem-solving and democratic inquiry.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Indian educational philosophy, who established "Visva-Bharati" at Santiniketan (1921) based on Naturalism, Internationalism, and aesthetic harmony with Nature ("Where the mind is without fear")?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Rabindranath Tagore',
        B: 'Swami Vivekananda (Man-Making Education)',
        C: 'Sri Aurobindo (Integral Education)',
        D: 'Mahatma Gandhi (Nai Talim / Basic Education)',
      },
      correctAnswer: 'A',
      explanation: 'Tagore founded Santiniketan as an open-air school liberating children from the mechanical "educational factory", synthesizing ancient Upanishadic forest ashram ideals with universal humanism.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'Mahatma Gandhi\'s "Wardha Scheme of Basic Education" (Nai Talim, 1937) was based on the pedagogical principle of:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Craft-centered, self-supporting education integrating head, heart, and hands (3 Hs) taught through the mother tongue',
        B: 'English medium rote memorization of classics',
        C: 'Pure theoretical mathematics without manual work',
        D: 'Military drill training in schools',
      },
      correctAnswer: 'A',
      explanation: 'Nai Talim centered all learning around productive local handicrafts (spinning, weaving, agriculture) to develop moral character, dignity of labor, and economic self-sufficiency.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In "Pedagogy of the Oppressed" (1968), Brazilian critical pedagogue Paulo Freire vigorously condemned the traditional "Banking Concept of Education", proposing instead:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Problem-Posing Education and Critical Conscientization (Conscientização) through egalitarian dialogue between teacher-students and student-teachers',
        B: 'Rote memorization and digital testing',
        C: 'Corporate sponsorship of primary schools',
        D: 'Standardized multiple-choice examination rankings',
      },
      correctAnswer: 'A',
      explanation: 'Freire rejected the banking model where teachers deposit knowledge into passive students, advocating critical dialogue to unveil systemic oppression and achieve human liberation.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 1,
      questionText: 'Which ancient Buddhist monastic university located in Bihar attracted international scholars like Xuanzang and taught Mahayana Buddhism, Logic, Grammar, and Medicine under the chancellorship of Shilabhadra?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Nalanda Mahavihara (founded under Kumaragupta I)',
        B: 'Takshashila (Taxila)',
        C: 'Vikramashila (founded by King Dharmapala)',
        D: 'Valabhi University',
      },
      correctAnswer: 'A',
      explanation: 'Nalanda was the premier residential Buddhist university of the ancient world with three multi-storied libraries (Ratnasagara, Ratnodadhi, Ratnaranjaka).',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 2 & 3: POLICY, LEARNER & LEARNING PROCESS (20 Questions: Q11 - Q30)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 2,
      questionText: 'The historic "Kothari Commission" (National Education Commission 1964-66) chaired by Dr. D.S. Kothari opened its monumental report with the famous sentence:',
      questionType: 'Direct MCQ',
      options: {
        A: '"The destiny of India is now being shaped in her classrooms"',
        B: '"Education is the manifestation of the perfection already in man"',
        C: '"Knowledge is power"',
        D: '"Every village must have an English school"',
      },
      correctAnswer: 'A',
      explanation: 'The Kothari Commission recommended the uniform $10+2+3$ national educational structure, the Common School System, and allocating $6\\%$ of GDP to public education.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 2,
      questionText: 'Under the "National Education Policy 2020" (NEP 2020 drafted by the Dr. K. Kasturirangan Committee), the traditional $10+2$ school pedagogical structure was replaced by which new curricular framework?',
      questionType: 'Direct MCQ',
      options: {
        A: '$5 + 3 + 3 + 4$ (Foundational: 3-8 yrs $\\rightarrow$ Preparatory: 8-11 yrs $\\rightarrow$ Middle: 11-14 yrs $\\rightarrow$ Secondary: 14-18 yrs)',
        B: '$5 + 4 + 4 + 3$',
        C: '$3 + 3 + 4 + 4$',
        D: '$6 + 3 + 3 + 2$',
      },
      correctAnswer: 'A',
      explanation: 'NEP 2020 restructured schooling into Foundational (5 yrs, including 3 yrs of Anganwadi/ECCE), Preparatory (3 yrs), Middle (3 yrs), and Secondary (4 yrs multidisciplinary).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'In Lev Vygotsky\'s Social Development Theory of learning, the distance between what a child can achieve independently and what they can achieve with guidance and collaboration from a More Knowledgeable Other (MKO) is termed the:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Zone of Proximal Development (ZPD - supported by Scaffolding)',
        B: 'Sensorimotor Schema',
        C: 'Law of Effect (Thorndike)',
        D: 'Classical Conditioning Gradient',
      },
      correctAnswer: 'A',
      explanation: 'Vygotsky emphasized that cognitive development is mediated socio-culturally through language, where scaffolding within the ZPD elevates intellectual potential.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'In Benjamin Bloom\'s Revised Taxonomy of Educational Objectives (Anderson & Krathwohl, 2001), what is the correct ascending cognitive hierarchy from lowest to highest order thinking skills?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Remembering $\\rightarrow$ Understanding $\\rightarrow$ Applying $\\rightarrow$ Analyzing $\\rightarrow$ Evaluating $\\rightarrow$ Creating',
        B: 'Knowledge $\\rightarrow$ Comprehension $\\rightarrow$ Application $\\rightarrow$ Analysis $\\rightarrow$ Synthesis $\\rightarrow$ Evaluation (Original 1956 Bloom)',
        C: 'Recall $\\rightarrow$ Application $\\rightarrow$ Memorization $\\rightarrow$ Synthesis $\\rightarrow$ Examination',
        D: 'Observation $\\rightarrow$ Imitation $\\rightarrow$ Practice $\\rightarrow$ Mastery $\\rightarrow$ Habit',
      },
      correctAnswer: 'A',
      explanation: 'The 2001 revised taxonomy shifted categories to active verbs, placing \'Creating\' at the pinnacle above \'Evaluating\'.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 4, 5, 6 & 7: TEACHER ED, CURRICULUM, RESEARCH & PEDAGOGY (40 Questions: Q31 - Q70)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 4,
      questionText: 'Which statutory apex body established under an Act of Parliament in 1993 oversees the standards, regulations, and quality accreditation of Teacher Education institutions in India?',
      questionType: 'Direct MCQ',
      options: {
        A: 'National Council for Teacher Education (NCTE)',
        B: 'National Council of Educational Research and Training (NCERT)',
        C: 'University Grants Commission (UGC)',
        D: 'National Assessment and Accreditation Council (NAAC)',
      },
      correctAnswer: 'A',
      explanation: 'NCTE was established under the NCTE Act 1993 to achieve planned and coordinated development of teacher education systems across India.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 5,
      questionText: 'In curriculum theory, the "Tyler Rationale" (Ralph W. Tyler, 1949 - Basic Principles of Curriculum and Instruction) centers on which four fundamental curricular questions?',
      questionType: 'Direct MCQ',
      options: {
        A: '1. What educational purposes should the school seek to attain? 2. What educational experiences can be provided? 3. How can these experiences be effectively organized? 4. How can we evaluate whether these purposes are attained?',
        B: '1. What textbooks to purchase? 2. What fees to charge? 3. What uniforms to assign? 4. What holidays to schedule?',
        C: '1. Who is the principal? 2. Where is the building? 3. What is the budget? 4. Who are the teachers?',
        D: '1. Teacher salary 2. Examination rules 3. Sports activities 4. Transport',
      },
      correctAnswer: 'A',
      explanation: 'The Tyler Model provides the classic linear deductive curriculum development framework connecting Objectives, Learning Experiences, Organization, and Evaluation.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 6,
      questionText: 'In Educational Research, "Action Research" (popularized in education by Stephen Corey, originated by Kurt Lewin) is defined as:',
      questionType: 'Direct MCQ',
      options: {
        A: 'A cyclical reflective inquiry process (Plan $\\rightarrow$ Act $\\rightarrow$ Observe $\\rightarrow$ Reflect) conducted by teachers and school practitioners to solve immediate classroom problems and improve pedagogical practices',
        B: 'Pure theoretical laboratory experimentation on animals',
        C: 'A national demographic census survey',
        D: 'Historical archival research on ancient manuscripts',
      },
      correctAnswer: 'A',
      explanation: 'Action Research bridges the gap between educational theory and practice, empowering frontline teachers to systematically evaluate and optimize their immediate classroom environment.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 7,
      questionText: 'In adult learning theory, Malcolm Knowles coined the term "Andragogy" to contrast adult learning with child pedagogy. What is a core assumption of Andragogy?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Adult learners are self-directed, draw upon rich accumulated life experience, are problem-centered / application-oriented, and possess internal motivation to learn',
        B: 'Adult learners are completely dependent on teacher authority and extrinsic rewards',
        C: 'Adult learners have no prior relevant knowledge',
        D: 'Adults learn best through rote choral recitation',
      },
      correctAnswer: 'A',
      explanation: 'Knowles identified that adults are intrinsically motivated, self-directed, and require immediate practical relevance to solve real-world life problems.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 8, 9 & 10: EDTECH, MANAGEMENT & INCLUSIVE EDUCATION (30 Questions: Q71 - Q100)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 8,
      questionText: 'In educational technology integration, the "TPACK" framework formulated by Punya Mishra and Matthew J. Koehler (2006) represents the complex intersection of which three core knowledge bodies?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Technological Knowledge (TK), Pedagogical Knowledge (PK), and Content Knowledge (CK)',
        B: 'Testing, Planning, Administering, and Checking',
        C: 'Textbook, Practice, Application, and Communication',
        D: 'Theory, Performance, Ability, and Competence',
      },
      correctAnswer: 'A',
      explanation: 'TPACK outlines the nuanced intuitive understanding of teaching content with appropriate pedagogical methods using modern technological tools.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 8,
      questionText: 'In online digital education in India, what is the government of India\'s indigenous MOOCs (Massive Open Online Courses) portal initiated to provide free quality courses from school (Class 9) to postgraduate level?',
      questionType: 'Direct MCQ',
      options: {
        A: 'SWAYAM (Study Webs of Active-Learning for Young Aspiring Minds)',
        B: 'SWAYAM PRABHA (34 DTH educational TV channels)',
        C: 'DIKSHA',
        D: 'e-PG Pathshala',
      },
      correctAnswer: 'A',
      explanation: 'SWAYAM was launched by the Ministry of Education to uphold the three cardinal principles of Education Policy: Access, Equity, and Quality with credit transfer via Academic Bank of Credits (ABC).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 10,
      questionText: 'Under the Rights of Persons with Disabilities Act (RPwD Act 2016), the number of recognized benchmark disability categories in India was expanded from 7 (under the 1995 Act) to:',
      questionType: 'Direct MCQ',
      options: {
        A: '$21\\text{ Disabilities}$ (including Autism Spectrum Disorder, Specific Learning Disabilities, Acid Attack victims, and Dwarfism)',
        B: '$14\\text{ Disabilities}$',
        C: '$10\\text{ Disabilities}$',
        D: '$28\\text{ Disabilities}$',
      },
      correctAnswer: 'A',
      explanation: 'The RPwD Act 2016 harmonized Indian law with the UNCRPD, expanding benchmark disabilities to 21 and raising higher education reservation to $5\\%$.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 10,
      questionText: 'In Inclusive Education, the "Salamanca Statement and Framework for Action on Special Needs Education" (UNESCO 1994, Salamanca, Spain) established the global principle that:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Regular mainstream schools with inclusive orientation are the most effective means of combating discriminatory attitudes and achieving Education for All (EFA)',
        B: 'All children with special needs must be strictly segregated in isolated special institutions',
        C: 'Special education should be abolished completely',
        D: 'Only wealthy nations can afford inclusive education',
      },
      correctAnswer: 'A',
      explanation: 'The Salamanca Statement proclaimed that every child has unique learning needs and that regular schools must accommodate all children regardless of physical, intellectual, or linguistic conditions.',
      difficulty: 'MEDIUM',
    },
  ];

  return {
    subjectCode: '09',
    subjectSlug: 'education',
    mockNumber: 1,
    title: 'Education — Mock Test 1: Full Syllabus Simulation (100 Qs)',
    description: 'Authentic 100-question UGC NET Education simulation covering Philosophy & Sociology of Education, Policy & History, Learning Processes, Teacher Education, Curriculum Studies, Research in Education, Pedagogy/Andragogy, EdTech, Educational Management, and Inclusive Education across all 10 units.',
    accessTier: 'FREE',
    isFreeBenchmark: true,
    questions,
  };
}
