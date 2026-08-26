import { MockTestDefinition, RawMockQuestion } from '../common';

export function getPsychologyMockTest(): MockTestDefinition {
  const questions: RawMockQuestion[] = [
    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 1: EMERGENCE OF PSYCHOLOGY (10 Questions: Q1 - Q10)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 1,
      questionText: 'Who is recognized as the "Father of Experimental Psychology" for establishing the world\'s first formal psychological laboratory in 1879 at the University of Leipzig, Germany?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Wilhelm Wundt (Structuralism and Introspection method)',
        B: 'William James (Father of American Functionalism)',
        C: 'Edward Titchener',
        D: 'Sigmund Freud (Psychoanalysis)',
      },
      correctAnswer: 'A',
      explanation: 'Wilhelm Wundt separated psychology from philosophy by applying systematic experimental methods and objective introspection to study conscious experience.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Indian psychological thought, the Sankhya-Yoga system conceptualizes the Mind (Manas), Intellect (Buddhi), and Ego (Ahamkara) collectively as the:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Antahkarana (Internal Instrument)',
        B: 'Bahirindriya (External Senses)',
        C: 'Tanmatra',
        D: 'Karmendriya',
      },
      correctAnswer: 'A',
      explanation: 'Antahkarana represents the tripartite inner psychic apparatus processing sensory inputs (Manas), synthesizing cognitive discrimination (Buddhi), and generating subjective identity (Ahamkara).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Gestalt Psychology founded by Max Wertheimer, Wolfgang Köhler, and Kurt Koffka, the "Phi Phenomenon" (1912) demonstrated that:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Apparent motion is perceived when two stationary adjacent lights flash alternately in rapid succession, proving that "The whole is greater/other than the sum of its parts"',
        B: 'Memory decays exponentially over time (Ebbinghaus)',
        C: 'Conditioned reflexes depend on salivary glands',
        D: 'Dreams represent repressed sexual wishes',
      },
      correctAnswer: 'A',
      explanation: 'The Phi phenomenon proved that perception cannot be reduced to isolated atomistic sensations, birthing Gestalt holistic perceptual laws.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 1,
      questionText: 'In psychoanalytic theory, Sigmund Freud formulated the Structural Model of Personality comprising Id, Ego, and Superego. The "Id" operates strictly according to the:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Pleasure Principle (seeking immediate gratification of biological instincts without moral or practical restraint)',
        B: 'Reality Principle (Ego)',
        C: 'Moral Idealistic Principle (Superego)',
        D: 'Nirvana Principle',
      },
      correctAnswer: 'A',
      explanation: 'The Id is the unconscious reservoir of Eros (life instinct/libido) and Thanatos (death instinct) seeking immediate impulse release via primary process thinking.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Carl Gustav Jung\'s Analytical Psychology, archetypes such as the Persona, Shadow, Anima/Animus, and the Self reside in the deepest layer of the psyche termed the:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Collective Unconscious (inherited universal evolutionary memory of mankind)',
        B: 'Personal Unconscious (repressed individual memories)',
        C: 'Conscious Ego',
        D: 'Preconscious filter',
      },
      correctAnswer: 'A',
      explanation: 'Jung distinguished the Personal Unconscious (complexes) from the Collective Unconscious (transpersonal archetypes shared across all human cultures).',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 2 & 3: RESEARCH METHODS, TESTING & BIOLOGICAL BASIS (20 Questions: Q11 - Q30)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 2,
      questionText: 'In psychometric test construction, the "Cronbach\'s Alpha" ($\\alpha$) coefficient is the most widely utilized statistical metric for assessing:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Internal Consistency Reliability of a multi-item psychometric scale',
        B: 'Test-Retest Temporal Stability',
        C: 'Predictive Criterion Validity',
        D: 'Construct Factor Loading',
      },
      correctAnswer: 'A',
      explanation: 'Cronbach\'s Alpha ($\\alpha \\ge 0.70$ standard benchmark) measures how closely related a set of test items are as a cohesive unified group.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 2,
      questionText: 'The Rorschach Inkblot Test and the Thematic Apperception Test (TAT) developed by Henry Murray are examples of which psychodiagnostic assessment method?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Projective Techniques (where ambiguous stimuli trigger projection of unconscious motives and conflicts)',
        B: 'Objective Self-Report Inventories (MMPI)',
        C: 'Neuropsychological Halstead-Reitan Battery',
        D: 'Aptitude Speed Tests',
      },
      correctAnswer: 'A',
      explanation: 'Projective tests present unstructured, ambiguous visual stimuli enabling respondents to project their underlying hidden dynamics and unconscious fantasies.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'In the human central nervous system, what major subcortical limbic structure plays the paramount role in the consolidation of short-term memory into long-term declarative memory?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Hippocampus (demonstrated in the classic neurological patient H.M.)',
        B: 'Amygdala (emotional fear processing)',
        C: 'Thalamus (sensory relay station)',
        D: 'Hypothalamus (homeostatic regulation - hunger, thirst, temperature)',
      },
      correctAnswer: 'A',
      explanation: 'Bilateral medial temporal lobectomy in patient H.M. destroyed the Hippocampus, causing severe anterograde amnesia (inability to form new episodic/declarative long-term memories).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'In the cerebral cortex, damage to "Broca\'s Area" (located in the left posterior inferior frontal gyrus) produces:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Expressive / Non-Fluent Aphasia (slow, halting, agrammatic speech production with relatively intact comprehension)',
        B: 'Wernicke\'s Receptive / Fluent Aphasia (fluent but meaningless "word salad" with impaired comprehension)',
        C: 'Visual Agnosia',
        D: 'Prosopagnosia (inability to recognize faces)',
      },
      correctAnswer: 'A',
      explanation: 'Paul Broca (1861) discovered that lesions in the left frontal lobe impair the motor articulation and grammatical syntax of speech (Broca\'s Aphasia).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'In neuronal neurotransmission, the rapid electrical Action Potential along an axon is generated primarily by the sudden influx of which ions through voltage-gated channels?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Sodium ions ($Na^+$ influx causing rapid depolarization from $-70\\text{ mV}$ to $+30\\text{ mV}$)',
        B: 'Potassium ions ($K^+$ efflux causing repolarization)',
        C: 'Chloride ions ($Cl^-$ causing hyperpolarization)',
        D: 'Calcium ions exclusively',
      },
      correctAnswer: 'A',
      explanation: 'Depolarization above threshold ($-55\\text{ mV}$) opens voltage-gated $Na^+$ channels, causing rapid sodium influx to trigger the all-or-none action potential.',
      difficulty: 'MEDIUM',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 4, 5, 6 & 7: COGNITION, LEARNING, INTELLIGENCE & PERSONALITY (40 Questions: Q31 - Q70)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 4,
      questionText: 'In Ivan Pavlov\'s Classical Conditioning experiments on dogs, what did the Meat Powder and the Bell Tone represent before conditioning took place?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Meat Powder = Unconditioned Stimulus (UCS); Bell Tone = Neutral Stimulus (which becomes Conditioned Stimulus / CS after pairing)',
        B: 'Meat Powder = Conditioned Stimulus; Bell Tone = Unconditioned Stimulus',
        C: 'Meat Powder = Negative Reinforcer; Bell Tone = Positive Reinforcer',
        D: 'Meat Powder = Operant Response; Bell Tone = Discriminative Stimulus',
      },
      correctAnswer: 'A',
      explanation: 'UCS (Food) automatically triggers UCR (Salivation). Repeated pairing with Neutral Stimulus (Bell) transforms it into a CS evoking a CR.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 4,
      questionText: 'In B.F. Skinner\'s Operant Conditioning, which schedule of reinforcement yields the highest and most consistent rate of responding and the greatest resistance to extinction (e.g., slot machines)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Variable Ratio (VR) Schedule',
        B: 'Fixed Ratio (FR) Schedule',
        C: 'Fixed Interval (FI) Schedule (produces scallop effect)',
        D: 'Variable Interval (VI) Schedule',
      },
      correctAnswer: 'A',
      explanation: 'Variable Ratio schedules reinforce after an unpredictable number of responses, generating rapid, relentless response rates highly resistant to behavioral extinction.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 4,
      questionText: 'In cognitive psychology, the "Atkinson-Shiffrin Model" (Modal Model of Memory, 1968) outlines which three structural memory stores in sequence?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Sensory Memory (Iconic/Echoic) $\\rightarrow$ Short-Term Memory (STM - limited capacity $7 \\pm 2$) $\\rightarrow$ Long-Term Memory (LTM - unlimited capacity)',
        B: 'Episodic $\\rightarrow$ Semantic $\\rightarrow$ Procedural',
        C: 'Implicit $\\rightarrow$ Explicit $\\rightarrow$ Declarative',
        D: 'Working Memory $\\rightarrow$ Flashbulb Memory $\\rightarrow$ Muscle Memory',
      },
      correctAnswer: 'A',
      explanation: 'Atkinson-Shiffrin model maps information flow from sensory registers to STM (rehearsal buffer) and encoding into permanent LTM.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 5,
      questionText: 'In theories of intelligence, Raymond Cattell and John Horn distinguished between:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Fluid Intelligence ($G_f$ - innate, biologically based reasoning ability in novel situations) and Crystallized Intelligence ($G_c$ - acquired knowledge and skills through education and culture)',
        B: 'Verbal IQ and Performance IQ',
        C: 'Spatial and Musical Intelligence',
        D: 'Analytical, Creative, and Practical Intelligence (Sternberg\'s Triarchic Theory)',
      },
      correctAnswer: 'A',
      explanation: 'Fluid intelligence peaks in early adulthood and declines with age, whereas Crystallized intelligence continues to grow across the lifespan through learning.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 5,
      questionText: 'Howard Gardner\'s "Theory of Multiple Intelligences" (Frames of Mind, 1983) originally proposed that human intelligence comprises which eight distinct modalities?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Linguistic, Logical-Mathematical, Spatial, Musical, Bodily-Kinesthetic, Interpersonal, Intrapersonal, and Naturalistic',
        B: 'General ($g$) factor and Specific ($s$) factors (Spearman)',
        C: 'Primary Mental Abilities (Thurstone - 7 PMA)',
        D: 'Structure of Intellect (Guilford - 180 factors)',
      },
      correctAnswer: 'A',
      explanation: 'Gardner rejected single IQ metrics, proposing autonomous neurobiological intelligences ranging from spatial and musical to interpersonal and naturalist.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 6,
      questionText: 'In development psychology, Jean Piaget\'s Stages of Cognitive Development follow which invariant chronological sequence?',
      questionType: 'Direct MCQ',
      options: {
        A: '1: Sensorimotor (0-2 yrs, Object Permanence) $\\rightarrow$ 2: Preoperational (2-7 yrs, Egocentrism/Animism) $\\rightarrow$ 3: Concrete Operational (7-11 yrs, Conservation) $\\rightarrow$ 4: Formal Operational (11+ yrs, Abstract hypothetical reasoning)',
        B: '1: Preoperational $\\rightarrow$ 2: Sensorimotor $\\rightarrow$ 3: Formal $\\rightarrow$ 4: Concrete',
        C: '1: Oral $\\rightarrow$ 2: Anal $\\rightarrow$ 3: Phallic $\\rightarrow$ 4: Latent $\\rightarrow$ 5: Genital (Freud)',
        D: '1: Trust $\\rightarrow$ 2: Autonomy $\\rightarrow$ 3: Initiative $\\rightarrow$ 4: Industry (Erikson)',
      },
      correctAnswer: 'A',
      explanation: 'Piaget mapped cognitive maturation through schema accommodation and assimilation across 4 developmental stages.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 8, 9 & 10: SOCIAL PSYCHOLOGY & CLINICAL DISORDERS (30 Questions: Q71 - Q100)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 8,
      questionText: 'In classic social psychology, Stanley Milgram\'s Obedience Experiments (Yale University, 1963) revealed the disturbing finding that what percentage of normal adult participants delivered the maximum lethal 450-volt electric shock to an innocent learner under the orders of an authority figure?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Approximately $65\\%$ (two-thirds of all participants)',
        B: 'Less than $1\\%$',
        C: '$10\\%$',
        D: '$100\\%$',
      },
      correctAnswer: 'A',
      explanation: 'Milgram demonstrated the Agentic State, showing that ordinary individuals will comply with destructive authority commands violating personal conscience.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 8,
      questionText: 'The "Bystander Effect" in social psychology (demonstrated by John Darley and Bibb Latané following the 1964 murder of Kitty Genovese) refers to the phenomenon where:',
      questionType: 'Direct MCQ',
      options: {
        A: 'An individual is significantly LESS likely to help a victim in an emergency when other passive bystanders are present, due to Diffusion of Responsibility and Pluralistic Ignorance',
        B: 'Crowds become aggressive during rock concerts',
        C: 'Witnesses always report crimes immediately',
        D: 'People perform tasks faster in front of an audience (Social Facilitation)',
      },
      correctAnswer: 'A',
      explanation: 'Diffusion of responsibility leads bystanders to assume someone else will intervene, reducing individual willingness to act as group size increases.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 9,
      questionText: 'According to the DSM-5 criteria, what are the primary positive symptoms of Schizophrenia?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Delusions (fixed false beliefs), Hallucinations (mostly auditory), Disorganized thinking/speech, and Grossly disorganized motor behavior (Catatonia)',
        B: 'Avolition, Anhedonia, Alogia, and Affective Flattening (Negative symptoms)',
        C: 'Panic attacks and Agoraphobia',
        D: 'Multiple distinct personality alters (Dissociative Identity Disorder)',
      },
      correctAnswer: 'A',
      explanation: 'Positive symptoms represent an excess or distortion of normal psychological functions (hallucinations, delusions), whereas negative symptoms represent deficits (flat affect, avolition).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 10,
      questionText: 'In cognitive psychotherapy, Aaron T. Beck formulated the "Cognitive Triad" of Depression, which consists of automatic negative distortions concerning:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Negative view of the Self ("I am worthless"), Negative view of the World/Environment ("Everyone is hostile"), and Negative view of the Future ("Things will never improve")',
        B: 'Negative view of Parents, Teachers, and Friends',
        C: 'Past traumas, Present fears, and Future phobias',
        D: 'Id, Ego, and Superego conflicts',
      },
      correctAnswer: 'A',
      explanation: 'Beck\'s Cognitive Therapy targets the Cognitive Triad and systematic cognitive errors (all-or-nothing thinking, catastrophizing, overgeneralization) to alleviate depression.',
      difficulty: 'EASY',
    },
  ];

  return {
    subjectCode: '04',
    subjectSlug: 'psychology',
    mockNumber: 1,
    title: 'Psychology — Mock Test 1: Full Syllabus Simulation (100 Qs)',
    description: 'Authentic 100-question UGC NET Psychology simulation covering Emergence of Psychology, Research Methods & Testing, Biological Basis of Behaviour, Perception, Learning, Memory, Thinking, Intelligence, Personality, Social Psychology, and Clinical Interventions across all 10 units.',
    accessTier: 'FREE',
    isFreeBenchmark: true,
    questions,
  };
}
