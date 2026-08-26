import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const educationSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Education (Code 09) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const educationSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Educational Studies (Philosophical & Sociological Foundations)',
    topics: [
      {
        name: 'Indian Schools of Philosophy and Educational Implications',
        subtopics: [
          { name: 'Sankhya Philosophy: Purusha, Prakriti, 25 Tattvas, Epistemology, and Educational Goals' },
          { name: 'Yoga Philosophy: Ashtanga Yoga, Chittavritti Nirodha, Character and Moral Discipline in Education' },
          { name: 'Vedanta Philosophy: Advaita (Shankaracharya - Maya, Bramhan, Atman), Levels of Truth (Paramarthika, Vyavaharika, Pratibhasika), Jnana Yoga' },
          { name: 'Buddhism: Four Noble Truths, Eightfold Path, Pratityasamutpada, Monastic and Vihara Education Systems' },
          { name: 'Jainism: Anekantavada, Syadvada, Triratna (Right Faith, Knowledge, Conduct), Ahimsa and Value Education' },
          { name: 'Islamic Traditions of Education: Maktabs, Madrasas, Curriculum, Aims and Methods of Instruction' },
        ],
      },
      {
        name: 'Western Schools of Philosophy and Educational Thought',
        subtopics: [
          { name: 'Idealism (Plato, Hegel, Kant): Mind over matter, eternal values, dialectic method, teacher-centric model' },
          { name: 'Realism (Aristotle, Locke, Russell): Objective reality, sensory experience, scientific method, subject-centered curriculum' },
          { name: 'Naturalism (Rousseau, Herbert Spencer): Nature as teacher, child-centered education, negative education, freedom, sensory training' },
          { name: 'Pragmatism (John Dewey, Charles Peirce, William James): Experimentalism, instrumentalism, project method, education as reconstruction of experience' },
          { name: 'Existentialism (Søren Kierkegaard, Jean-Paul Sartre, Martin Buber): Individual choice, freedom, authenticity, I-Thou relationship' },
          { name: 'Marxism (Karl Marx): Dialectical materialism, polytechnic education, class consciousness, social transformation' },
        ],
      },
      {
        name: 'Contributions of Indian and Western Thinkers to Education',
        subtopics: [
          { name: 'Swami Vivekananda (Man-making, character-building, character education, harmony of East and West)' },
          { name: 'Rabindranath Tagore (Naturalism, internationalism, humanism, Visva-Bharati, Santiniketan experiments)' },
          { name: 'Sri Aurobindo (Integral Education - Physical, Vital, Mental, Psychic, Spiritual faculties, The Mother)' },
          { name: 'Mahatma Gandhi (Basic Education / Nai Talim - Wardha Scheme 1937, 3H: Hand, Heart, Head, Craft-centered learning)' },
          { name: 'J. Krishnamurti (Freedom from the known, fearlessness, self-observation, Choiceless Awareness)' },
          { name: 'Western Thinkers: Paulo Freire (Pedagogy of the Oppressed, Banking concept of education vs Conscientization/Problem-posing education), Ivan Illich (Deschooling Society), Wollstonecraft and Nel Noddings (Ethics of Care)' },
        ],
      },
      {
        name: 'Sociological Foundations and Social Stratification in Education',
        subtopics: [
          { name: 'Sociology of Education vs Educational Sociology: Concepts and Methods' },
          { name: 'Social Mobility (Vertical, Horizontal, Inter-generational) and Social Stratification (Caste, Class, Gender, Tribe)' },
          { name: 'Education and Social Change: Modernization, Urbanization, Globalization, Sanskritization (M.N. Srinivas)' },
          { name: 'Socialisation Process, Enculturation, Cultural Lag (W.F. Ogburn), and Educational Equity' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: History, Politics and Economics of Education',
    topics: [
      {
        name: 'Committees and Commissions on Education in Pre and Post-Independence India',
        subtopics: [
          { name: 'Pre-Independence Milestones: Macaulay’s Minute 1835, Wood’s Despatch 1854, Hunter Commission 1882, Indian Universities Commission 1902, Sadler Commission 1917, Hartog Committee 1929, Sargent Report 1944' },
          { name: 'Post-Independence Commissions: University Education Commission (Radhakrishnan 1948-49), Secondary Education Commission (Mudaliar 1952-53), Education Commission (Kothari 1964-66: 10+2+3 structure, Common School System, 6% GDP target)' },
          { name: 'National Policies on Education: NPE 1968, NPE 1986 / POA 1992, National Knowledge Commission 2005, Justice Verma Commission 2012, National Education Policy (NEP 2020: 5+3+3+4 school structure, Higher Education transformation)' },
        ],
      },
      {
        name: 'Relationship between Politics and Education',
        subtopics: [
          { name: 'Perspectives on Politics of Education: Liberal, Conservative, and Critical' },
          { name: 'Democratic, Authoritarian and Totalitarian political regimes and their impact on curriculum and educational autonomy' },
          { name: 'Constitutional Provisions for Education in India: Preamble, Fundamental Rights (Article 21A, Right to Education Act RTE 2009), Articles 29, 30, 45, 46, 51A(k)' },
        ],
      },
      {
        name: 'Economics of Education: Human Capital and Cost-Benefit Analysis',
        subtopics: [
          { name: 'Human Capital Theory (Theodore Schultz, Gary Becker): Education as an investment in human productivity vs Consumption good' },
          { name: 'Signaling and Screening Theory of Education (Michael Spence)' },
          { name: 'Cost of Education: Direct, Indirect, Private, and Institutional Costs, Opportunity Costs / Foregone earnings' },
          { name: 'Cost-Benefit Analysis (CBA) and Cost-Effectiveness Analysis (CEA) in educational planning' },
          { name: 'Financing of Education: Central and State funding patterns, Budgetary allocations, Public-Private Partnerships (PPP)' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Learner and Learning Process',
    topics: [
      {
        name: 'Growth, Development and Cognitive Theories',
        subtopics: [
          { name: 'Principles of Human Development: Cephalocaudal, Proximodistal, Nature vs Nurture debate' },
          { name: 'Jean Piaget’s Cognitive Development Theory: Schema, Assimilation, Accommodation, Equilibration, Four Stages (Sensorimotor, Preoperational, Concrete Operational, Formal Operational)' },
          { name: 'Lev Vygotsky’s Socio-Cultural Theory: Zone of Proximal Development (ZPD), Scaffolding, More Knowledgeable Other (MKO), Private Speech' },
          { name: 'Jerome Bruner’s Theory of Cognitive Growth: Enactive, Iconic, Symbolic modes of representation, Spiral Curriculum' },
        ],
      },
      {
        name: 'Theories of Learning: Behaviourist, Cognitivist and Constructivist',
        subtopics: [
          { name: 'Behaviourist Theories: Classical Conditioning (Pavlov: UCS, UCR, CS, CR, Extinction, Spontaneous Recovery), Operant Conditioning (B.F. Skinner: Reinforcement Schedules, Shaping, Chaining), Connectionism (Thorndike: Law of Effect, Exercise, Readiness)' },
          { name: 'Cognitivist & Social Learning: Gestalt Theory (Insight Learning - Wolfgang Köhler), Kurt Lewin’s Field Theory, Albert Bandura’s Social Cognitive Theory (Observational Learning: Attention, Retention, Reproduction, Motivation, Self-Efficacy)' },
          { name: 'Constructivism: Cognitive Constructivism (Piaget) vs Social Constructivism (Vygotsky), Radical Constructivism (Von Glasersfeld)' },
        ],
      },
      {
        name: 'Theories of Personality, Motivation and Moral/Emotional Development',
        subtopics: [
          { name: 'Personality Theories: Psychoanalytic (Freud), Psychosocial Stages (Erik Erikson - 8 Crises), Trait Theories (Allport, Cattell 16PF, Eysenck PEN model, Big Five OCEAN), Humanistic (Carl Rogers - Fully Functioning Person, Abraham Maslow - Self-Actualization)' },
          { name: 'Motivation: Drive Reduction (Hull), Need Hierarchy (Maslow), Achievement Motivation (McClelland), Intrinsic vs Extrinsic Motivation, Attribution Theory (Weiner)' },
          { name: 'Moral and Emotional Development: Lawrence Kohlberg’s Moral Development (Pre-conventional, Conventional, Post-conventional stages), Carol Gilligan’s Care Ethics, Daniel Goleman’s Emotional Intelligence (EQ)' },
        ],
      },
      {
        name: 'Intelligence, Creativity and Guidance/Counselling',
        subtopics: [
          { name: 'Theories of Intelligence: Spearman’s Two-Factor (g and s), Thurstone’s Primary Mental Abilities (PMA), Guilford’s Structure of Intellect (SI model - 180 factors), Gardner’s Multiple Intelligences (8 intelligences), Sternberg’s Triarchic Theory (Analytical, Creative, Practical)' },
          { name: 'Creativity: Nature, Process (Preparation, Incubation, Illumination, Verification - Graham Wallas), Measurement of Creativity (Torrance Tests TTCT, Baqer Mehdi)' },
          { name: 'Guidance and Counselling: Educational, Vocational, Personal Guidance, Directive (E.G. Williamson), Non-Directive (Carl Rogers), and Eclectic (F.C. Thorne) Counselling approaches' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Teacher Education',
    topics: [
      {
        name: 'Meaning, Nature, Scope and Structure of Teacher Education in India',
        subtopics: [
          { name: 'Evolution of Teacher Education in India: Pre-service and In-service programs (D.El.Ed, B.Ed, M.Ed, 4-Year ITEP - Integrated Teacher Education Programme under NEP 2020)' },
          { name: 'Curriculum Frameworks for Teacher Education: NCFTE 2009 (NCTE) and NEP 2020 Teacher Education Vision' },
        ],
      },
      {
        name: 'Instructional Designs, Models of Teaching and Competency Models',
        subtopics: [
          { name: 'Models of Teaching (Bruce Joyce and Marsha Weil): Information Processing Family (Concept Attainment, Advance Organizer - David Ausubel, Inquiry Training - Richard Suchman), Social Family (Jurisprudential Inquiry, Role Play), Personal Family, Behavioural Modification Family' },
          { name: 'Microteaching: Concept, Microteaching Cycle (Plan, Teach, Feedback, Re-plan, Re-teach, Re-feedback - 36 minutes), Core Teaching Skills' },
          { name: 'Competency-Based Teacher Education (CBTE), Reflective Teaching (Donald Schön - Reflection-in-Action vs Reflection-on-Action), Flander’s Interaction Analysis Category System (FIACS - 10 Categories)' },
        ],
      },
      {
        name: 'Agencies, Professional Development and Ethical Standards',
        subtopics: [
          { name: 'National Apex Bodies: National Council for Teacher Education (NCTE - Powers, Functions, Regulations), NCERT, NIEPA, UGC' },
          { name: 'State Level Agencies: SCERT, DIET (District Institute of Education and Training), CTE (College of Teacher Education), IASE (Institute of Advanced Studies in Education)' },
          { name: 'Professionalization of Teacher Education, Code of Professional Ethics for Teachers, Continuing Professional Development (CPD - 50 hours annual CPD mandate under NEP 2020)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: Curriculum Studies',
    topics: [
      {
        name: 'Curriculum: Concept, Foundations and Approaches',
        subtopics: [
          { name: 'Concept of Curriculum: Explicit vs Implicit / Hidden Curriculum, Null Curriculum (Elliot Eisner)' },
          { name: 'Foundations of Curriculum: Philosophical, Sociological, and Psychological foundations' },
          { name: 'Approaches to Curriculum: Subject-Centered, Learner-Centered, Problem-Centered, Humanistic, Broad Fields Curriculum' },
        ],
      },
      {
        name: 'Models of Curriculum Design and Development',
        subtopics: [
          { name: 'Technical / Scientific Models: Ralph Tyler’s Objectives Model (Four fundamental questions: Objectives, Experiences, Organization, Evaluation), Hilda Taba’s Inverted / Inductive Model (Seven steps, Teacher-driven design)' },
          { name: 'Non-Technical / Humanistic Models: Wheeler’s Cyclic Model, Walker’s Deliberative Model (Naturalistic model - Platform, Deliberation, Design)' },
        ],
      },
      {
        name: 'Curriculum Evaluation Models and Change Processes',
        subtopics: [
          { name: 'Daniel Stufflebeam’s CIPP Model: Context Evaluation (Needs/Problems), Input Evaluation (Resources/Strategies), Process Evaluation (Implementation), Product Evaluation (Outcomes)' },
          { name: 'Robert Stake’s Countenance Model (Antecedents, Transactions, Outcomes - Description vs Judgment matrices), Michael Scriven’s Goal-Free Evaluation' },
          { name: 'Curriculum Change: Process, Resistance to Change, Strategies for Curriculum Dissemination and Implementation' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: Research in Education',
    topics: [
      {
        name: 'Meaning, Paradigms and Formulations in Educational Research',
        subtopics: [
          { name: 'Scientific Inquiry in Education: Positivism vs Post-Positivism / Interpretivism vs Critical Theory' },
          { name: 'Research Problem Identification, Literature Review, Variables (Independent, Dependent, Moderator, Extraneous, Intervening)' },
          { name: 'Hypothesis Formulation: Directional, Non-directional, Null (H0), and Alternative (H1) Hypotheses' },
        ],
      },
      {
        name: 'Quantitative Research Methods and Designs',
        subtopics: [
          { name: 'Descriptive Research: Surveys, Longitudinal, Cross-Sectional, Correlational, Ex-Post Facto (Causal-Comparative) Studies' },
          { name: 'Experimental Research: True Experimental (Pre-test Post-test Control Group, Solomon Four-Group), Quasi-Experimental (Non-equivalent control group, Time series), Pre-Experimental designs' },
          { name: 'Internal and External Validity of Experimental Designs and Threats to Validity (Campbell and Stanley)' },
        ],
      },
      {
        name: 'Qualitative and Mixed-Methods Research Paradigms',
        subtopics: [
          { name: 'Phenomenological Research, Grounded Theory (Glaser and Strauss - Open, Axial, Selective coding)' },
          { name: 'Ethnographic Research, Case Study Method (Robert Yin), Narrative Inquiry, Historical Research (External and Internal criticism)' },
          { name: 'Mixed Methods Designs (Creswell): Convergent Parallel, Explanatory Sequential, Exploratory Sequential designs' },
          { name: 'Action Research in Educational Settings: Kemmis and McTaggart Cycle (Plan, Act, Observe, Reflect)' },
        ],
      },
      {
        name: 'Sampling, Tool Standardization and Statistical Analysis',
        subtopics: [
          { name: 'Sampling: Probability (Simple Random, Stratified, Systematic, Cluster) vs Non-Probability (Purposive, Quota, Snowball) techniques, Sampling error' },
          { name: 'Measurement Tools: Tests, Questionnaires, Rating Scales, Rubrics, Item Analysis (Difficulty Index p, Discrimination Index D)' },
          { name: 'Reliability (Test-Retest, Split-Half - Spearman-Brown formula, Kuder-Richardson KR-20, Cronbach Alpha) and Validity (Content, Criterion-related: Concurrent/Predictive, Construct validity)' },
          { name: 'Inferential Statistics: Normal Distribution Properties, Parametric Tests (z-test, t-test, ANOVA - One-Way and Two-Way, ANCOVA), Non-Parametric Tests (Chi-Square, Mann-Whitney U, Wilcoxon, Kruskal-Wallis)' },
          { name: 'Type I and Type II Errors, Level of Significance, Effect Size, Research Ethics and Plagiarism' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: Pedagogy, Andragogy and Assessment',
    topics: [
      {
        name: 'Pedagogy vs Andragogy and Instructional Design Models',
        subtopics: [
          { name: 'Pedagogy (Child learning - Teacher directed) vs Andragogy (Malcolm Knowles - Adult learning assumptions: Self-concept, Prior experience, Readiness to learn, Problem-centered orientation)' },
          { name: 'Heutagogy (Self-determined learning) and Paragogy (Peer learning)' },
          { name: 'Instructional Design Models: ADDIE Model (Analysis, Design, Development, Implementation, Evaluation), Dick and Carey Systems Approach Model, Gagne’s Nine Events of Instruction' },
        ],
      },
      {
        name: 'Bloom’s Taxonomy of Educational Objectives and Cognitive Load Theory',
        subtopics: [
          { name: 'Cognitive Domain: Original Bloom’s Taxonomy (1956) vs Revised Bloom’s Taxonomy (Anderson and Krathwohl 2001 - Remember, Understand, Apply, Analyze, Evaluate, Create)' },
          { name: 'Affective Domain (Krathwohl: Receiving, Responding, Valuing, Organizing, Characterizing) and Psychomotor Domain (Dave, Simpson, Harrow)' },
          { name: 'Sweller’s Cognitive Load Theory (Intrinsic, Extraneous, Germane cognitive load)' },
        ],
      },
      {
        name: 'Assessment Systems and Formative-Summative Frameworks',
        subtopics: [
          { name: 'Assessment FOR Learning (Formative assessment - Continuous feedback, diagnostic)' },
          { name: 'Assessment OF Learning (Summative assessment - Grading, certification)' },
          { name: 'Assessment AS Learning (Self-assessment, metacognitive reflection, peer assessment)' },
          { name: 'Criterion-Referenced Testing (CRT) vs Norm-Referenced Testing (NRT)' },
          { name: 'Assessment Tools: Rubrics (Holistic vs Analytic), Portfolios, Reflective Journals, Competency-Based Assessment' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Technology in / for Education',
    topics: [
      {
        name: 'Concept of Educational Technology and Communication Models',
        subtopics: [
          { name: 'Educational Technology: ET-1 (Hardware Approach), ET-2 (Software Approach), ET-3 (Systems Approach)' },
          { name: 'Communication Models in Teaching: Shannon-Weaver Mathematical Model, Berlo’s SMCR Model, Schramm’s Interactive Model' },
          { name: 'Edgar Dale’s Cone of Experience (Direct purposeful experiences to Verbal symbols)' },
        ],
      },
      {
        name: 'E-Learning, MOOCs and Open Educational Resources (OER)',
        subtopics: [
          { name: 'E-Learning Models: Synchronous vs Asynchronous Learning, Blended Learning, Flipped Classroom' },
          { name: 'Massive Open Online Courses (MOOCs): Four Quadrants of SWAYAM (e-Tutorial, e-Content, Web Resources, Self-Assessment), SWAYAM PRABHA' },
          { name: 'Open Educational Resources (OER): Creative Commons Licensing, National Digital Library (NDL), e-PG Pathshala, DIKSHA portal' },
        ],
      },
      {
        name: 'Emerging Technologies and Assistive Technologies in Education',
        subtopics: [
          { name: 'Learning Management Systems (LMS): Moodle, Canvas, Google Classroom' },
          { name: 'Artificial Intelligence in Education (AIED), Adaptive Learning Platforms, Virtual Reality (VR) and Augmented Reality (AR) in Classrooms' },
          { name: 'Assistive Technologies for Students with Disabilities: Screen readers (JAWS, NVDA), Speech-to-Text software, Braille displays, Augmentative and Alternative Communication (AAC)' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Educational Management, Administration and Leadership',
    topics: [
      {
        name: 'Principles of Educational Management and Administrative Thought',
        subtopics: [
          { name: 'Classical Administrative Theories: Henri Fayol’s Functions of Management (POCCC), Gulick and Urwick’s POSDCORB' },
          { name: 'Scientific Management in Education (F.W. Taylor), Max Weber’s Bureaucratic Model' },
          { name: 'Human Relations Movement in Educational Administration (Elton Mayo), Social Systems Theory (Getzels and Guba Model of Administrative Behavior)' },
        ],
      },
      {
        name: 'Leadership in Educational Organizations',
        subtopics: [
          { name: 'Leadership Theories: Trait, Behavioral (Blake and Mouton Managerial Grid), Contingency (Fiedler, Hersey-Blanchard Situational Leadership)' },
          { name: 'Transformational vs Transactional Leadership, Instructional Leadership, Distributed / Shared Leadership in School Systems' },
        ],
      },
      {
        name: 'Quality Management and Quality Assurance in Education',
        subtopics: [
          { name: 'Total Quality Management (TQM) in Education: Edward Deming’s 14 Points (PDCA Cycle), Joseph Juran’s Quality Trilogy' },
          { name: 'Quality Assurance Bodies in India: National Assessment and Accreditation Council (NAAC - Seven Criteria and Assessment Framework), National Board of Accreditation (NBA), National Institutional Ranking Framework (NIRF)' },
          { name: 'Institutional Planning, School Development and Management Committees (SDMC), Educational Auditing' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Inclusive Education',
    topics: [
      {
        name: 'Concept, Evolution and Legal Frameworks of Inclusive Education',
        subtopics: [
          { name: 'Evolution of Education for Disabled: Special Education -> Integrated Education -> Inclusive Education paradigms' },
          { name: 'International Frameworks: Salamanca Statement and Framework for Action (1994), UNCRPD (UN Convention on the Rights of Persons with Disabilities 2006), Incheon Declaration (2015 - SDG 4)' },
          { name: 'Indian Legal Provisions: Persons with Disabilities (PWD) Act 1995 vs Rights of Persons with Disabilities (RPwD) Act 2016 (21 Specified Disabilities, 4% / 5% reservations), Rehabilitation Council of India (RCI) Act 1992, National Trust Act 1999' },
        ],
      },
      {
        name: 'Types of Diverse Learners and Identification',
        subtopics: [
          { name: 'Sensory Impairments: Visual Impairment (Blindness, Low vision), Hearing Impairment (Deaf, Hard of hearing)' },
          { name: 'Neuro-Developmental & Cognitive Disabilities: Intellectual Disability, Specific Learning Disabilities (SLD: Dyslexia, Dysgraphia, Dyscalculia, Dyspraxia), Autism Spectrum Disorder (ASD), ADHD' },
          { name: 'Locomotor and Neurological: Cerebral Palsy, Multiple Sclerosis, Muscular Dystrophy' },
          { name: 'Gifted, Creative, and Socio-Economically Disadvantaged Groups (SEDGs) as designated in NEP 2020' },
        ],
      },
      {
        name: 'Pedagogical Adaptations and Universal Design for Learning (UDL)',
        subtopics: [
          { name: 'Universal Design for Learning (UDL): Three Principles (Multiple Means of Representation, Multiple Means of Action & Expression, Multiple Means of Engagement)' },
          { name: 'Individualized Education Plan (IEP): Components, Development, Implementation, and Team dynamics' },
          { name: 'Curricular Adaptations, Accommodation vs Modification, Differentiated Instruction, Co-teaching models' },
          { name: 'Barrier-Free Environment, Assistive Devices, and Peer Tutoring in Inclusive Classrooms' },
        ],
      },
    ],
  },
];
