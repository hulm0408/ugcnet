import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const psychologySyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Psychology (Code 04) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const psychologySyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Emergence of Psychology',
    topics: [
      {
        name: 'Historical Roots and Major Paradigms in Psychology',
        subtopics: [
          { name: 'Philosophical Roots: Rationalism (Descartes), Empiricism (Locke, Hume), Associationism' },
          { name: 'Structuralism (Wilhelm Wundt - First Lab 1879, E.B. Titchener - Introspection method)' },
          { name: 'Functionalism (William James - Principles of Psychology, Stream of Consciousness, John Dewey, James Angell)' },
          { name: 'Gestalt Psychology (Max Wertheimer - Phi Phenomenon, Kurt Koffka, Wolfgang Köhler - Insight Learning, Principles of Pragnanz and Perceptual Grouping)' },
          { name: 'Psychoanalysis (Sigmund Freud - Unconscious, Id/Ego/Superego, Psychosexual stages) and Neo-Freudians (Carl Jung - Collective Unconscious, Alfred Adler - Individual Psychology, Karen Horney - Basic Anxiety, Erik Erikson)' },
          { name: 'Behaviourism (John B. Watson, B.F. Skinner, Clark Hull, Edward Tolman - Purposive Behaviourism / Latent Learning)' },
          { name: 'Humanistic Psychology (Carl Rogers - Person-Centered Approach, Abraham Maslow - Hierarchy of Needs) and Existential Psychology (Rollo May, Viktor Frankl - Logotherapy)' },
          { name: 'Cognitive Revolution (George Miller, Ulric Neisser, Donald Broadbent - Information Processing Paradigm)' },
        ],
      },
      {
        name: 'Indian Psychological Thought and Epistemologies',
        subtopics: [
          { name: 'Indian Perspectives on Consciousness and Self: Upanishads (Pancha Kosha Model: Annamaya, Pranamaya, Manomaya, Vijnanamaya, Anandamaya), Mandukya Upanishad (Four states of consciousness: Jagrat, Svapna, Sushupti, Turiya)' },
          { name: 'Sankhya-Yoga Psychology: Trigunas (Sattva, Rajas, Tamas), Chitta Vritti, Kleshas, Ashtanga Yoga, Samadhi' },
          { name: 'Buddhist Psychology: Abhidharma, Skandhas (Five Aggregates), Pratityasamutpada, Mindfulness (Sati), Vipassana' },
          { name: 'Jaina Psychology: Jiva, Ajiva, Leshyas, Anekantavada' },
          { name: 'Bhagavad Gita: Trigunatita, Sthitaprajna, Karma Yoga, Bhakti Yoga, Jnana Yoga' },
          { name: 'Integral Psychology of Sri Aurobindo (Levels of Mind: Lower Mind, Higher Mind, Illumined Mind, Intuitive Mind, Overmind, Supermind)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Research Methods and Statistics',
    topics: [
      {
        name: 'Research Paradigms, Designs and Sampling',
        subtopics: [
          { name: 'Research Paradigms: Quantitative, Qualitative (Phenomenology, Grounded Theory, Discourse Analysis), Mixed Methods' },
          { name: 'Research Designs: Experimental Designs (True Experimental, Quasi-Experimental, Factorial Designs: 2x2, 2x3, Randomized Block, Latin Square), Non-Experimental Designs (Correlational, Ex-post facto, Cross-sectional, Longitudinal)' },
          { name: 'Sampling Techniques: Probability (Simple random, Stratified, Cluster, Systematic) vs Non-Probability (Purposive, Quota, Snowball) Sampling' },
        ],
      },
      {
        name: 'Parametric and Non-Parametric Statistical Methods',
        subtopics: [
          { name: 'Descriptive Statistics: Measures of Central Tendency, Dispersion, Skewness, Kurtosis' },
          { name: 'Normal Probability Curve (NPC): Properties, Areas under NPC, Applications, Standard Scores (Z-score, T-score, Stanine, Sten)' },
          { name: 'Correlation: Pearson’s r, Spearman’s Rho, Point-Biserial, Biserial, Phi Coefficient, Tetrachoric Correlation, Partial & Multiple Correlation' },
          { name: 'Parametric Inferential Tests: t-test (Independent, Paired), ANOVA (One-way, Two-way, Repeated Measures), ANCOVA, MANOVA, Post-hoc tests (Tukey, Scheffé)' },
          { name: 'Non-Parametric Tests: Chi-Square Test (Goodness of Fit, Independence), Mann-Whitney U Test, Wilcoxon Matched-Pairs Signed Ranks Test, Kruskal-Wallis One-Way ANOVA, Friedman Two-Way ANOVA' },
          { name: 'Advanced Statistical Techniques: Multiple Linear Regression, Factor Analysis (Exploratory EFA vs Confirmatory CFA, Principal Component Analysis PCA, Orthogonal Varimax vs Oblique Rotation)' },
        ],
      },
      {
        name: 'Ethics in Psychological Research',
        subtopics: [
          { name: 'Informed Consent, Deception and Debriefing protocols' },
          { name: 'Confidentiality, Protection from harm, Institutional Ethics Committees (IEC), APA Ethical Guidelines' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Psychological Testing',
    topics: [
      {
        name: 'Test Construction, Item Analysis and Scaling',
        subtopics: [
          { name: 'Steps in Test Construction: Planning, Item Writing, Item Try-out, Item Analysis' },
          { name: 'Item Analysis: Item Difficulty Index (p-value), Item Discrimination Index (D-value), Distractor Analysis' },
          { name: 'Item Response Theory (IRT): One-Parameter (Rasch Model), Two-Parameter (Discrimination & Difficulty), Three-Parameter (Pseudo-guessing) IRT Models, Item Characteristic Curve (ICC)' },
          { name: 'Attitude Scaling Techniques: Thurstone’s Equal Appearing Intervals, Likert’s Summated Ratings, Guttman’s Scalogram Analysis, Osgood’s Semantic Differential Scale' },
        ],
      },
      {
        name: 'Reliability, Validity and Norms',
        subtopics: [
          { name: 'Reliability: Concept (True Score Theory / Classical Test Theory CTT: X = T + E), Methods of Estimating Reliability (Test-Retest, Alternate/Parallel Form, Split-Half - Spearman-Brown Prophecy formula, Kuder-Richardson KR-20/KR-21, Cronbach’s Alpha, Inter-Rater Reliability), Standard Error of Measurement (SEM)' },
          { name: 'Validity: Types of Validity (Content Validity, Criterion-Related: Concurrent & Predictive Validity, Construct Validity: Convergent & Discriminant Validity - Campbell & Fiske Multitrait-Multimethod MTMM Matrix, Factorial Validity)' },
          { name: 'Norms: Age Norms, Grade Norms, Percentile Norms, Standard Score Norms (Z, T, Deviation IQ)' },
        ],
      },
      {
        name: 'Applications of Psychological Tests',
        subtopics: [
          { name: 'Assessment of Intelligence (Binet-Kamath, WAIS, WISC, RPM, Bhatia Battery), Personality Assessment (MMPI, 16PF, NEO-PI-R, Rorschach Inkblot Test - Exner Comprehensive System, TAT, Sentence Completion), Neuropsychological Testing (Bender-Gestalt, Luria-Nebraska, Halstead-Reitan, NIMHANS Neuropsychological Battery)' },
          { name: 'Ethical, Social, and Cultural Issues in Testing (Cultural Bias, Test fairness, Computer-Adaptive Testing CAT)' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Biological Basis of Behaviour',
    topics: [
      {
        name: 'Neurons, Action Potential and Synaptic Transmission',
        subtopics: [
          { name: 'Structure of Neuron (Dendrites, Soma, Axon, Myelin Sheath, Nodes of Ranvier)' },
          { name: 'Resting Membrane Potential (-70 mV, Sodium-Potassium Pump), Action Potential (Depolarization, Repolarization, Hyperpolarization, All-or-None Law, Refractory Periods)' },
          { name: 'Synaptic Transmission: Neurotransmitters (Acetylcholine, Dopamine, Serotonin, Norepinephrine, GABA - Primary Inhibitory, Glutamate - Primary Excitatory, Endorphins), Reuptake, EPSP and IPSP' },
        ],
      },
      {
        name: 'Structure and Function of the Nervous System',
        subtopics: [
          { name: 'Central Nervous System (CNS): Brain and Spinal Cord (Reflex Arc)' },
          { name: 'Brain Structures: Hindbrain (Medulla Oblongata, Pons, Cerebellum), Midbrain (Tectum, Tegmentum, Substantia Nigra, Reticular Activating System RAS), Forebrain (Thalamus - Sensory Relay, Hypothalamus - Homeostasis & 4 Fs, Limbic System: Amygdala, Hippocampus, Cingulate Gyrus, Basal Ganglia)' },
          { name: 'Cerebral Cortex: Frontal Lobe (Prefrontal Cortex, Broca’s Area - Motor Speech, Motor Cortex), Parietal Lobe (Somatosensory Cortex), Temporal Lobe (Wernicke’s Area - Speech Comprehension, Auditory Cortex), Occipital Lobe (Visual Cortex)' },
          { name: 'Hemispheric Lateralization: Split-Brain Studies (Roger Sperry, Michael Gazzaniga), Left vs Right Hemisphere Specialization' },
          { name: 'Peripheral Nervous System (PNS): Somatic vs Autonomic Nervous System (Sympathetic - Fight or Flight vs Parasympathetic - Rest and Digest)' },
        ],
      },
      {
        name: 'Endocrine System, Genetics and Neuroimaging Techniques',
        subtopics: [
          { name: 'Endocrine Glands: Pituitary (Master Gland), Thyroid (Thyroxine), Adrenal (Cortex - Cortisol vs Medulla - Adrenaline), Pancreas (Insulin), Gonads' },
          { name: 'Genetics and Behaviour: Chromosomes, Genes, Genotype vs Phenotype, Twin Studies (Monozygotic vs Dizygotic), Adoption Studies, Epigenetics' },
          { name: 'Methods of Physiological Investigation: Lesioning, Electrical Stimulation (ESB), Structural Imaging (CT, MRI), Functional Imaging (EEG/ERP, fMRI, PET, MEG, TMS)' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: Attention, Perception, Learning, Memory and Forgetting',
    topics: [
      {
        name: 'Attention and Psychophysics',
        subtopics: [
          { name: 'Attention: Selective, Sustained, Divided, Alternating Attention' },
          { name: 'Theories of Selective Attention: Filter Theory (Donald Broadbent), Attenuation Theory (Anne Treisman), Late Selection Theory (Deutsch & Deutsch), Multimode Theory (Johnston & Heinz)' },
          { name: 'Psychophysics: Absolute Threshold (AL), Difference Threshold (DL / JND), Weber’s Law (ΔI/I = k), Fechner’s Law (S = k log I), Stevens’ Power Law (S = k I^n)' },
          { name: 'Signal Detection Theory (SDT): Hits, Misses, False Alarms, Correct Rejections, Sensitivity Index (d\'), Response Criterion / Bias (Beta / C), ROC Curve' },
        ],
      },
      {
        name: 'Perceptual Processes and Illusions',
        subtopics: [
          { name: 'Perceptual Organization: Gestalt Laws (Proximity, Similarity, Continuity, Closure, Figure-Ground Segregation)' },
          { name: 'Depth Perception: Monocular Cues (Linear perspective, Relative size, Interposition, Texture gradient, Motion parallax) vs Binocular Cues (Retinal Disparity, Convergence)' },
          { name: 'Perceptual Constancies (Size, Shape, Brightness, Colour) and Perceptual Illusions (Müller-Lyer, Ponzo, Poggendorff, Ames Room, Moon Illusion)' },
          { name: 'Top-down (Conceptually Driven) vs Bottom-up (Data Driven) Processing (Gibson’s Ecological Direct Perception vs Gregory’s Constructive Perception)' },
        ],
      },
      {
        name: 'Theories of Learning',
        subtopics: [
          { name: 'Classical Conditioning (Ivan Pavlov): Principles (Acquisition, Extinction, Spontaneous Recovery, Stimulus Generalization, Discrimination, Higher-Order Conditioning), Rescorla-Wagner Model (Contingency vs Contiguity, Blocking Effect)' },
          { name: 'Operant Conditioning (B.F. Skinner): Reinforcement (Positive, Negative) vs Punishment (Positive, Negative), Schedules of Reinforcement (Fixed/Variable Ratio, Fixed/Variable Interval), Premack Principle, Chaining, Shaping' },
          { name: 'Cognitive & Observational Learning: Edward Tolman (Latent Learning, Cognitive Maps), Wolfgang Köhler (Insight Learning), Albert Bandura (Social Cognitive Theory - Modeling, Vicarious Reinforcement)' },
          { name: 'Biological Constraints on Learning: Preparedness (Seligman), Taste Aversion / Garcia Effect, Instinctive Drift (Breland & Breland)' },
        ],
      },
      {
        name: 'Memory Models, Systems and Forgetting',
        subtopics: [
          { name: 'Atkinson-Shiffrin Multi-Store Model: Sensory Memory (Iconic, Echoic), Short-Term Memory (STM - 7±2 Capacity - Miller, Chunking), Long-Term Memory (LTM)' },
          { name: 'Baddeley’s Working Memory Model: Central Executive, Phonological Loop, Visuo-Spatial Sketchpad, Episodic Buffer' },
          { name: 'Levels of Processing Framework (Craik & Lockhart: Structural, Phonemic, Semantic processing)' },
          { name: 'Long-Term Memory Systems (Endel Tulving): Explicit/Declarative (Episodic, Semantic) vs Implicit/Non-Declarative (Procedural, Priming, Classical Conditioning)' },
          { name: 'Theories of Forgetting: Herman Ebbinghaus (Forgetting Curve, Spacing Effect), Trace Decay Theory, Interference Theory (Proactive vs Retroactive Interference), Retrieval Failure (Tip-of-the-Tongue, Context/State-Dependent Memory), Motivated Forgetting (Freudian Repression)' },
          { name: 'Constructive Memory and False Memories (Elizabeth Loftus - Misinformation Effect, Eyewitness Testimony)' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: Thinking, Intelligence and Creativity',
    topics: [
      {
        name: 'Thinking, Concept Formation and Problem Solving',
        subtopics: [
          { name: 'Thought Process: Mental Images, Propositions, Cognitive Maps' },
          { name: 'Concept Formation: Prototype Theory (Eleanor Rosch), Exemplar Theory, Feature-Based Theory' },
          { name: 'Problem Solving Strategies: Algorithms, Heuristics (Availability, Representativeness, Anchoring and Adjustment Heuristics), Means-Ends Analysis, Trial and Error' },
          { name: 'Barriers to Problem Solving: Mental Set (Einstellung Effect), Functional Fixedness, Confirmation Bias, Framing Effect' },
          { name: 'Reasoning: Deductive Reasoning (Syllogisms, Conditional Reasoning - Wason Selection Task) vs Inductive Reasoning' },
        ],
      },
      {
        name: 'Theories and Measurement of Intelligence',
        subtopics: [
          { name: 'Factor-Analytic Theories: Charles Spearman’s Two-Factor Theory (g and s), Louis Thurstone’s Primary Mental Abilities (PMA - 7 abilities), Raymond Cattell & John Horn’s Fluid (Gf) and Crystallized (Gc) Intelligence, J.P. Guilford’s Structure of Intellect (SI Model - Operations, Contents, Products - 180 factors), Philip Vernon’s Hierarchical Model' },
          { name: 'Information Processing & Contemporary Theories: Howard Gardner’s Theory of Multiple Intelligences (8/9 Intelligences), Robert Sternberg’s Triarchic Theory of Intelligence (Componential/Analytical, Experiential/Creative, Contextual/Practical), J.P. Das’s PASS Model of Intelligence (Planning, Attention-Arousal, Simultaneous, Successive processing - CAS Battery)' },
          { name: 'Emotional Intelligence: Daniel Goleman Model (Self-awareness, Self-regulation, Motivation, Empathy, Social skills), Mayer-Salovey-Caruso Emotional Intelligence Test (MSCEIT - 4 Branch Model)' },
          { name: 'Biological and Environmental Influences on Intelligence: Twin Studies, Flynn Effect, Intellectual Disability vs Intellectual Giftedness' },
        ],
      },
      {
        name: 'Creativity: Nature, Process and Measurement',
        subtopics: [
          { name: 'Creativity: Divergent vs Convergent Thinking (J.P. Guilford)' },
          { name: 'Creative Process Stages (Graham Wallas: Preparation, Incubation, Illumination, Verification)' },
          { name: 'Investment Theory of Creativity (Sternberg & Lubart - Buying low, selling high)' },
          { name: 'Assessment of Creativity: Torrance Tests of Creative Thinking (TTCT - Fluency, Flexibility, Originality, Elaboration), Wallach-Kogan Tests, Baqer Mehdi Creativity Test' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: Personality, Motivation, Emotion, Stress and Coping',
    topics: [
      {
        name: 'Theories of Personality',
        subtopics: [
          { name: 'Psychodynamic Theories: Sigmund Freud (Topographical Model: Conscious, Preconscious, Unconscious; Structural Model: Id, Ego, Superego; Defense Mechanisms), Carl Jung (Archetypes, Introversion/Extraversion), Alfred Adler (Inferiority Complex, Striving for Superiority, Birth Order), Karen Horney (Basic Anxiety, 10 Neurotic Needs)' },
          { name: 'Trait and Type Theories: Hippocrates-Galen Types, Sheldon’s Somatotypes (Endomorph, Mesomorph, Ectomorph), Gordon Allport (Cardinal, Central, Secondary Traits; Functional Autonomy), Raymond Cattell (Surface vs Source Traits, 16PF Questionnaire), Hans Eysenck (PEN Model: Psychoticism, Extraversion, Neuroticism - Biological basis), Costa & McCrae (Big Five Model: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism - NEO-PI-R)' },
          { name: 'Humanistic & Phenomenological Theories: Carl Rogers (Self-Concept, Unconditional Positive Regard, Congruence), Abraham Maslow (Self-Actualizing Individuals)' },
          { name: 'Social-Cognitive Theories: Albert Bandura (Reciprocal Determinism, Self-Efficacy), Julian Rotter (Locus of Control, Expectancy-Value Theory), Walter Mischel (Cognitive-Affective Personality System CAPS, Delay of Gratification - Marshmallow Test)' },
        ],
      },
      {
        name: 'Motivation and Emotion Theories',
        subtopics: [
          { name: 'Motivation Concepts: Instinct Theories (William James, McDougall), Drive Reduction Theory (Clark Hull - Homeostasis), Arousal Theory (Yerkes-Dodson Law - Inverted U hypothesis), Incentive Theories' },
          { name: 'Cognitive & Humanistic Motivation: Need Hierarchy (Maslow), ERG Theory (Alderfer), Self-Determination Theory (Deci & Ryan - Autonomy, Competence, Relatedness), McClelland’s Acquired Needs (nAch, nAff, nPower)' },
          { name: 'Biological Motivations (Hunger: Lateral vs Ventromedial Hypothalamus, Thirst, Sleep, Sex) vs Social Motivations' },
          { name: 'Theories of Emotion: James-Lange Theory (Physiological arousal precedes emotion), Cannon-Bard Theory (Thalamic processing - Simultaneous arousal and emotion), Schachter-Singer Two-Factor Theory (Arousal + Cognitive Appraisal), Richard Lazarus’s Cognitive-Mediational Theory, Robert Zajonc (Preferences need no inferences)' },
          { name: 'Facial Feedback Hypothesis (Paul Ekman - 6 Basic Universal Emotions: Happiness, Sadness, Anger, Fear, Surprise, Disgust)' },
        ],
      },
      {
        name: 'Stress, Coping and Health Psychology',
        subtopics: [
          { name: 'Nature and Sources of Stress: Life Events (Holmes & Rahe Social Readjustment Rating Scale SRRS), Daily Hassles, Frustration, Conflict (Approach-Approach, Avoidance-Avoidance, Approach-Avoidance, Double Approach-Avoidance)' },
          { name: 'Models of Stress: Hans Selye’s General Adaptation Syndrome (GAS: Alarm Reaction, Resistance, Exhaustion), Richard Lazarus’s Transactional Model (Primary Appraisal, Secondary Appraisal, Reappraisal)' },
          { name: 'Physiological Response to Stress: Sympathetic-Adrenomedullary (SAM) Axis (Adrenaline) and Hypothalamic-Pituitary-Adrenocortical (HPA) Axis (Cortisol)' },
          { name: 'Coping Strategies: Problem-Focused vs Emotion-Focused Coping (Lazarus & Folkman), Proactive Coping, Defense Mechanisms' },
          { name: 'Stress and Illness: Type A Behaviour Pattern and Coronary Heart Disease (Friedman & Rosenman), Psychoneuroimmunology, Hardiness (Suzanne Kobasa - Challenge, Commitment, Control), Resilience, Mindfulness-Based Stress Reduction (MBSR)' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Social Psychology',
    topics: [
      {
        name: 'Social Cognition, Attribution and Attitudes',
        subtopics: [
          { name: 'Social Cognition: Schemas, Prototypes, Heuristics (Availability, Representativeness), Automatic vs Controlled Processing' },
          { name: 'Attribution Theories: Fritz Heider (Internal vs External Attribution), Edward Jones & Keith Davis (Correspondent Inference Theory), Harold Kelley’s Covariation Model (Consensus, Consistency, Distinctiveness)' },
          { name: 'Attributional Biases: Fundamental Attribution Error (Actor-Observer Bias), Self-Serving Bias, Just-World Hypothesis, Ultimate Attribution Error' },
          { name: 'Attitudes: Structure (CAB Model: Cognitive, Affective, Behavioural components), Attitude-Behaviour Relation (Theory of Planned Behaviour - Icek Ajzen)' },
          { name: 'Attitude Change: Cognitive Dissonance Theory (Leon Festinger), Elaboration Likelihood Model (Petty & Cacioppo: Central vs Peripheral Route persuasion)' },
        ],
      },
      {
        name: 'Social Influence, Group Dynamics and Interpersonal Attraction',
        subtopics: [
          { name: 'Social Influence: Conformity (Solomon Asch Line Judgment Experiments - Informational vs Normative Social Influence), Compliance (Cialdini’s Techniques: Foot-in-the-Door, Door-in-the-Face, Low-Ball, That’s-Not-All), Obedience to Authority (Stanley Milgram Shock Experiments, Factors affecting obedience)' },
          { name: 'Group Dynamics: Social Facilitation (Norman Triplett, Robert Zajonc Drive Theory) vs Social Loafing (Ringelmann Effect), Deindividuation (Philip Zimbardo - Stanford Prison Experiment), Groupthink (Irving Janis), Group Polarization' },
          { name: 'Interpersonal Attraction: Determinants (Proximity - Mere Exposure Effect, Similarity, Reciprocity, Physical Attractiveness), Robert Sternberg’s Triangular Theory of Love (Intimacy, Passion, Commitment)' },
        ],
      },
      {
        name: 'Prosocial Behaviour, Aggression and Prejudice',
        subtopics: [
          { name: 'Prosocial Behaviour / Altruism: Bystander Effect and Diffusion of Responsibility (Bibb Latané & John Darley - Murder of Kitty Genovese), Empathy-Altruism Hypothesis (Daniel Batson), Evolutionary Altruism (Kin Selection, Reciprocal Altruism)' },
          { name: 'Aggression: Biological Theories (Evolutionary, Brain structures, Testosterone), Frustration-Aggression Hypothesis (Dollard et al. / Berkowitz Cognitive Neoassociation Model), Social Learning Theory (Bandura Bobo Doll Experiment), General Aggression Model (GAM)' },
          { name: 'Prejudice, Stereotypes and Discrimination: Social Identity Theory (Henri Tajfel - Minimal Group Paradigm, Ingroup Favoritism vs Outgroup Derogation), Realistic Group Conflict Theory (Muzafer Sherif - Robbers Cave Experiment, Superordinate Goals), Contact Hypothesis (Gordon Allport)' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Human Development and Clinical Interventions',
    topics: [
      {
        name: 'Developmental Stages and Developmental Theories',
        subtopics: [
          { name: 'Prenatal Development: Germinal, Embryonic, Fetal stages, Teratogens' },
          { name: 'Infancy and Childhood: Motor Milestones, Attachment Theory (John Bowlby - Attachment behavioral system; Mary Ainsworth - Strange Situation: Secure, Insecure-Avoidant, Insecure-Ambivalent, Disorganized Attachment)' },
          { name: 'Cognitive & Language Development: Piaget (Conservation, Centration, Egocentrism), Lev Vygotsky (Scaffolding, ZPD), Noam Chomsky (LAD, Poverty of the Stimulus)' },
          { name: 'Psychosocial Development: Erik Erikson’s 8 Stages of Life-Span Development (Trust vs Mistrust to Ego Integrity vs Despair), James Marcia’s Identity Statuses (Identity Diffusion, Foreclosure, Moratorium, Identity Achievement)' },
          { name: 'Moral Development: Lawrence Kohlberg (6 Stages), Carol Gilligan’s Care Orientation' },
          { name: 'Adolescence, Adulthood and Aging: Puberty, Imaginary Audience, Personal Fable (Elkind), Emerging Adulthood (Arnett), Physical and Cognitive changes in Aging, Theories of Aging (Disengagement, Activity theories)' },
        ],
      },
      {
        name: 'Psychopathology and Classification Systems (DSM-5 and ICD-11)',
        subtopics: [
          { name: 'Models of Psychopathology: Biological, Psychodynamic, Behavioural, Cognitive, Humanistic, Biopsychosocial Models, Diathesis-Stress Model' },
          { name: 'Anxiety Disorders: Generalized Anxiety Disorder (GAD), Panic Disorder, Agoraphobia, Specific Phobias, Social Anxiety Disorder' },
          { name: 'Obsessive-Compulsive and Related Disorders (OCD - Obsessions vs Compulsions), Trauma-Related Disorders (PTSD, Acute Stress Disorder)' },
          { name: 'Mood Disorders: Major Depressive Disorder (Beck’s Cognitive Triad, Learned Helplessness - Seligman), Bipolar I and Bipolar II Disorders, Cyclothymic Disorder' },
          { name: 'Schizophrenia Spectrum: Positive Symptoms (Delusions, Hallucinations, Disorganized speech) vs Negative Symptoms (Flat affect, Avolition, Alogia), Dopamine Hypothesis, Glutamate Hypothesis' },
          { name: 'Neurodevelopmental Disorders (Autism Spectrum Disorder, ADHD, Intellectual Disability) and Personality Disorders (Cluster A: Odd/Eccentric, Cluster B: Dramatic/Erratic - Borderline, Antisocial, Cluster C: Anxious/Fearful)' },
        ],
      },
      {
        name: 'Psychotherapies and Clinical Interventions',
        subtopics: [
          { name: 'Psychoanalytic & Psychodynamic Therapy: Free Association, Dream Analysis (Manifest vs Latent content), Transference and Counter-transference, Interpretation' },
          { name: 'Behavioural Therapies: Systematic Desensitization (Joseph Wolpe - Reciprocal Inhibition), Flooding, Exposure and Response Prevention (ERP), Aversion Therapy, Token Economy, Applied Behaviour Analysis (ABA)' },
          { name: 'Cognitive & Behavioural Therapies: Aaron Beck’s Cognitive Therapy (Cognitive Distortions, Automatic Thoughts, Thought Records), Albert Ellis’s Rational Emotive Behaviour Therapy (REBT - ABCDE Model)' },
          { name: 'Humanistic-Existential Therapies: Person-Centered Therapy (Carl Rogers - Empathy, Unconditional Positive Regard, Congruence/Genuineness), Gestalt Therapy (Fritz Perls - Empty Chair Technique), Existential Therapy (Viktor Frankl - Logotherapy)' },
          { name: 'Third-Wave CBT: Dialectical Behaviour Therapy (DBT - Marsha Linehan), Acceptance and Commitment Therapy (ACT - Steven Hayes), Mindfulness-Based Cognitive Therapy (MBCT)' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Emerging Areas in Psychology',
    topics: [
      {
        name: 'Positive Psychology and Well-Being',
        subtopics: [
          { name: 'Martin Seligman: Positive Psychology, PERMA Model (Positive Emotion, Engagement, Relationships, Meaning, Accomplishment), Authentic Happiness, Signature Strengths (VIA Classification)' },
          { name: 'Mihaly Csikszentmihalyi: Flow Theory (Optimal Experience, Balance of Challenge and Skill)' },
          { name: 'Well-Being: Hedonic Well-Being (Subjective Well-Being - Diener) vs Eudaimonic Well-Being (Psychological Well-Being - Carol Ryff’s 6 Dimensions: Autonomy, Environmental Mastery, Personal Growth, Positive Relations, Purpose in Life, Self-Acceptance)' },
          { name: 'Hope Theory (Snyder), Optimism (Learned Optimism - Seligman), Post-Traumatic Growth (Tedeschi & Calhoun), Mindfulness' },
        ],
      },
      {
        name: 'Neuropsychology and Cognitive Neuroscience',
        subtopics: [
          { name: 'Neuroplasticity: Synaptic Plasticity, Long-Term Potentiation (LTP), Neurogenesis' },
          { name: 'Cognitive Neuropsychology: Agnosia (Visual, Prosopagnosia), Aphasia (Broca’s Motor Aphasia vs Wernicke’s Sensory Aphasia, Conduction Aphasia), Apraxia, Amnesia (Anterograde vs Retrograde Amnesia - Patient H.M.)' },
          { name: 'Executive Functions: Working Memory, Cognitive Flexibility, Inhibitory Control, Role of Prefrontal Cortex (Dorsolateral, Orbitofrontal, Ventromedial PFC)' },
          { name: 'Mirror Neurons (Giacomo Rizzolatti - Empathy, Imitation, Theory of Mind)' },
        ],
      },
      {
        name: 'Environmental, Forensic, Military and Cyberpsychology',
        subtopics: [
          { name: 'Environmental Psychology: Personal Space, Territoriality, Crowding vs Density, Noise and Temperature effects on behaviour, Pro-environmental behaviour' },
          { name: 'Forensic Psychology: Criminal Profiling, Eyewitness Testimony, Lie Detection (Polygraph, Brain Fingerprinting / P300 wave, Narco-analysis), Competency to stand trial' },
          { name: 'Military Psychology: Soldier Selection, Combat Stress Reaction, Psychological Warfare, Morale Building' },
          { name: 'Cyberpsychology: Online Identity, Online Disinhibition Effect (John Suler), Internet Gaming Disorder, Social Media and Mental Health, Cyberbullying, Fear of Missing Out (FOMO)' },
        ],
      },
    ],
  },
];
