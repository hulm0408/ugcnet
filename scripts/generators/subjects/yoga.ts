import { MockTestDefinition, RawMockQuestion } from '../common';

export function getYogaMockTest(): MockTestDefinition {
  const questions: RawMockQuestion[] = [
    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 1: FOUNDATIONS OF YOGA (10 Questions: Q1 - Q10)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 1,
      questionText: 'In classical Sanskrit grammar, the word "Yoga" is derived from which root in Panini\'s Dhatupatha?',
      questionType: 'Direct MCQ',
      options: {
        A: '"Yuj Samadhau" (Divadi gana - meaning Samadhi), "Yujir Yoge" (Rudhadigana - meaning Union), and "Yuj Samyamane" (Curadigana - meaning Restraint)',
        B: '"Yuj" meaning physical exercise only',
        C: '"Yog" meaning addition of numbers',
        D: '"Yukti" meaning clever tactic',
      },
      correctAnswer: 'A',
      explanation: 'Vyasa in his commentary on Yoga Sutra (1.1) specifies: "Yogah Samadhih" (Yoga means Samadhi derived from Yuj Samadhau).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In the Shrimad Bhagavad Gita, Lord Krishna delivers which two celebrated definitions of Yoga in Chapter 2 (Sankhya Yoga)?',
      questionType: 'Direct MCQ',
      options: {
        A: '"Samatvam Yoga Ucyate" (Evenness / Equanimity of mind is called Yoga - 2.48) and "Yogah Karmasu Kausalam" (Yoga is skill / dexterity in action - 2.50)',
        B: '"Yogash Chitta Vritti Nirodhah"',
        C: '"Hatha Yogo hi Kevalam"',
        D: '"Ahimsa Paramo Dharmah"',
      },
      correctAnswer: 'A',
      explanation: 'Gita defines Yoga as emotional/mental equanimity in success and failure (2.48) and detached efficiency in duty without attachment to fruit (2.50).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'According to Maharshi Patanjali\'s Yoga Sutra (1.2), the definitive core definition of Yoga is:',
      questionType: 'Direct MCQ',
      options: {
        A: '"Yogash Chitta Vritti Nirodhah" (Yoga is the cessation/restraint of the fluctuations and modifications of the mind-stuff)',
        B: '"Yoga is breathing pranayama"',
        C: '"Yoga is ascetic austerity"',
        D: '"Yoga is devotional chanting"',
      },
      correctAnswer: 'A',
      explanation: 'YS 1.2: Restraining the 5 Vrttis (Pramana, Viparyaya, Vikalpa, Nidra, Smrti) allows the Seer (Drashta) to abide in its own true nature (Svarupe Avasthanam, YS 1.3).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In the Taittiriya Upanishad, the human being is conceptualized as possessing Five Sheaths (Pancha Kosha). What is the correct inward sequence from physical to spiritual bliss?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Annamaya Kosha (Physical/Food) $\\rightarrow$ Pranamaya Kosha (Vital Energy) $\\rightarrow$ Manomaya Kosha (Mental) $\\rightarrow$ Vijnanamaya Kosha (Intellect/Wisdom) $\\rightarrow$ Anandamaya Kosha (Bliss)',
        B: 'Anandamaya $\\rightarrow$ Vijnanamaya $\\rightarrow$ Manomaya $\\rightarrow$ Pranamaya $\\rightarrow$ Annamaya',
        C: 'Pranamaya $\\rightarrow$ Annamaya $\\rightarrow$ Manomaya $\\rightarrow$ Anandamaya $\\rightarrow$ Vijnanamaya',
        D: 'Muladhara $\\rightarrow$ Swadhisthana $\\rightarrow$ Manipura $\\rightarrow$ Anahata $\\rightarrow$ Ajna',
      },
      correctAnswer: 'A',
      explanation: 'The Pancha Kosha model describes the five concentric layers of human existence enclosing the supreme Atman.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 1,
      questionText: 'In Patanjali Yoga Sutra, Kriya Yoga (Yoga of Action, YS 2.1) prescribed for mental purification comprises:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Tapas (Austerity), Svadhyaya (Self-study / sacred study), and Ishvara Pranidhana (Surrender to God)',
        B: 'Asana, Pranayama, and Pratyahara',
        C: 'Yama, Niyama, and Samadhi',
        D: 'Shatkarma cleansing',
      },
      correctAnswer: 'A',
      explanation: 'YS 2.1: "Tapah-svadhyayeshvarapranidhanani kriya-yogah" - Kriya Yoga attenuates Kleshas and induces Samadhi.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 2 & 3: PATANJALI YOGA SUTRA & HATHA YOGA TEXTS (20 Questions: Q11 - Q30)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 2,
      questionText: 'In Patanjali\'s Ashtanga Yoga (Eight Limbs of Yoga, YS 2.29), what are the Five Yamas (ethical social restraints) in sequence?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Ahimsa (Non-violence), Satya (Truthfulness), Asteya (Non-stealing), Brahmacharya (Continence), and Aparigraha (Non-possessiveness) - YS 2.30',
        B: 'Saucha, Santosha, Tapas, Svadhyaya, and Ishvara Pranidhana (Niyamas)',
        C: 'Dharana, Dhyana, and Samadhi (Samyama)',
        D: 'Neti, Dhauti, Basti, Nauli, Kapalbhati',
      },
      correctAnswer: 'A',
      explanation: 'YS 2.30-31: These five Yamas constitute the "Maha Vratam" (Great Universal Vow) unrestricted by caste, place, time, or circumstance.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 2,
      questionText: 'In Patanjali Yoga Sutra (2.3), what are the Five Afflictions (Pancha Kleshas) that torment the mind?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Avidya (Ignorance - root cause), Asmita (Egoism), Raga (Attachment), Dvesha (Aversion), and Abhinivesha (Clinging to life / fear of death)',
        B: 'Kama, Krodha, Lobha, Moha, and Mada',
        C: 'Pramana, Viparyaya, Vikalpa, Nidra, and Smrti (5 Vrttis)',
        D: 'Vata, Pitta, Kapha, Dhatu, and Mala',
      },
      correctAnswer: 'A',
      explanation: 'Avidya is the breeding ground for the other four Kleshas, whether dormant, attenuated, interrupted, or fully active.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 3,
      questionText: 'In Swami Swatmarama\'s "Hatha Yoga Pradipika" (15th century CE), what are the four sequential Upadeshas (Chapters) of the text?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Chapter 1: Asanas $\\rightarrow$ Chapter 2: Pranayama / Shatkarma $\\rightarrow$ Chapter 3: Mudras & Bandhas $\\rightarrow$ Chapter 4: Nadanusandhana / Samadhi',
        B: 'Chapter 1: Yama $\\rightarrow$ Chapter 2: Niyama $\\rightarrow$ Chapter 3: Asana $\\rightarrow$ Chapter 4: Samadhi',
        C: 'Chapter 1: Shatkarma $\\rightarrow$ Chapter 2: Asana $\\rightarrow$ Chapter 3: Mudra $\\rightarrow$ Chapter 4: Pratyahara',
        D: 'Chapter 1: Anatomy $\\rightarrow$ Chapter 2: Physiology $\\rightarrow$ Chapter 3: Therapy $\\rightarrow$ Chapter 4: Philosophy',
      },
      correctAnswer: 'A',
      explanation: 'Hatha Yoga Pradipika is a 4-limbed (Chaturanga) Hatha text focusing on Asana, Kumbhaka, Mudra/Bandha, and Nada Samadhi.',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 3,
      questionText: 'In Gheranda Samhita (Sage Gheranda instructing King Chandakapali), Yoga is described as "Saptanga Yoga" (Seven-limbed). What are the Seven Limbs?',
      questionType: 'Direct MCQ',
      options: {
        A: '1. Shatkarma (Shodhana), 2. Asana (Dridhata), 3. Mudra (Sthirata), 4. Pratyahara (Dhairya), 5. Pranayama (Laghava), 6. Dhyana (Pratyakshata), 7. Samadhi (Nirliptata)',
        B: 'Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana',
        C: 'Jnana, Bhakti, Karma, Raja, Hatha, Laya, Mantra',
        D: 'Annamaya, Pranamaya, Manomaya, Vijnanamaya, Anandamaya, Sahasrara, Ajna',
      },
      correctAnswer: 'A',
      explanation: 'Gheranda Samhita outlines a 7-step Ghatastha Yoga system linking each yogic discipline with its specific body-mind effect (e.g. Cleansing brings purification, Asana brings firmness).',
      difficulty: 'MEDIUM',
    },
    {
      unitNumber: 3,
      questionText: 'In Hatha Yoga, the "Shatkarmas" (Six Cleansing Techniques) prescribed to balance Vata, Pitta, and Kapha and eliminate excess mucus and fat are:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Dhauti (Internal wash), Basti (Colon cleanse), Neti (Nasal cleanse), Trataka (Gazing), Nauli (Abdominal churning), and Kapalbhati (Frontal brain cleansing)',
        B: 'Padmasana, Siddhasana, Paschimottanasana, Mayurasana, Dhanurasana, Shavasana',
        C: 'Mula Bandha, Jalandhara Bandha, Uddiyana Bandha, Maha Bandha, Maha Vedha, Khechari',
        D: 'Surya Bhedana, Ujjayi, Sitkari, Sitali, Bhastrika, Bhramari',
      },
      correctAnswer: 'A',
      explanation: 'Shatkarmas purify the Nadis and physical body before undertaking Kumbhaka pranayama.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 4, 5 & 6: ANATOMY, HEALTH & THERAPEUTIC YOGA (30 Questions: Q31 - Q60)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 4,
      questionText: 'In human respiratory physiology during yogic deep diaphragmatic breathing, what physiological changes occur in the Autonomic Nervous System (ANS)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Vagus nerve stimulation increases Parasympathetic tone, reducing heart rate, lowering blood pressure, and reducing cortisol stress levels',
        B: 'Sympathetic "Fight or Flight" response is hyper-activated',
        C: 'Blood pressure increases dangerously',
        D: 'Oxygen consumption drops to absolute zero',
      },
      correctAnswer: 'A',
      explanation: 'Slow pranayamic breathing (especially prolonged exhalation and Bhramari) stimulates the Vagus nerve and baroreceptors, triggering the parasympathetic relaxation response.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 5,
      questionText: 'In Ayurveda and Yogic Nutrition, the "Tridoshas" and their fundamental five-elemental (Pancha Mahabhuta) composition are:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Vata = Akasha (Ether/Space) + Vayu (Air); Pitta = Agni (Fire) + Jala (Water); Kapha = Jala (Water) + Prithvi (Earth)',
        B: 'Vata = Fire + Earth; Pitta = Air + Water; Kapha = Space',
        C: 'Vata = Water; Pitta = Air; Kapha = Fire',
        D: 'Vata = Blood; Pitta = Bile; Kapha = Phlegm only',
      },
      correctAnswer: 'A',
      explanation: 'Ayurveda balances Vata (movement/nervous system), Pitta (metabolism/digestion), and Kapha (structure/lubrication).',
      difficulty: 'EASY',
    },
    {
      unitNumber: 6,
      questionText: 'In Yoga Therapy for Type 2 Diabetes Mellitus, which Asana specifically stimulates the pancreas and abdominal organs through deep intra-abdominal compression and twist?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Mandukasana (Frog Pose) and Ardha Matsyendrasana (Half Spinal Twist)',
        B: 'Shavasana only',
        C: 'Tadasana (Mountain Pose)',
        D: 'Vrikshasana (Tree Pose)',
      },
      correctAnswer: 'A',
      explanation: 'Mandukasana and Ardha Matsyendrasana compress the epigastric region, stimulating pancreatic beta-cell insulin secretion and improving visceral glucose uptake.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 6,
      questionText: 'For patients suffering from severe Hypertension (High Blood Pressure) and Cardiac disorders, which Yoga practices are STRICTLY CONTRAINDICATED?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Rapid forceful Kapalbhati, dynamic Bhastrika, prolonged internal breath holding (Antar Kumbhaka), and unsupported inversions like Sirshasana',
        B: 'Gentle Nadi Shodhana (Alternate Nostril Breathing without retention)',
        C: 'Shavasana and Yoga Nidra',
        D: 'Slow Ujjayi breathing',
      },
      correctAnswer: 'A',
      explanation: 'Forceful hyperventilation and prolonged breath retention spike systolic and diastolic blood pressure and intracranial pressure.',
      difficulty: 'EASY',
    },

    // ═════════════════════════════════════════════════════════════════════════
    // UNIT 7, 8, 9 & 10: APPLIED YOGA & MEDITATION (40 Questions: Q61 - Q100)
    // ═════════════════════════════════════════════════════════════════════════
    {
      unitNumber: 7,
      questionText: 'In Kundalini Yoga and Subtle Anatomy, the three primary Nadis (energy channels) are Ida, Pingala, and Sushumna. Where does the "Ida Nadi" terminate?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Left Nostril (Lunar / Chandra energy, cooling, parasympathetic, flows on left side of spine)',
        B: 'Right Nostril (Pingala / Solar / Surya energy, warming, sympathetic)',
        C: 'Crown of head (Brahmarandhra - Sushumna)',
        D: 'Base of spine only',
      },
      correctAnswer: 'A',
      explanation: 'Ida (Moon/Chandra) flows on the left ending in the left nostril, Pingala (Sun/Surya) on the right ending in the right nostril, and Sushumna along the central spinal cerebrospinal axis.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 8,
      questionText: 'Which Hatha Yoga Mudra involves rolling the tongue back into the nasal cavity above the soft palate to stimulate the Lalana Chakra and drink the divine divine nectar (Amrita / Somarasa)?',
      questionType: 'Direct MCQ',
      options: {
        A: 'Khechari Mudra (King of Mudras)',
        B: 'Viparita Karani Mudra',
        C: 'Maha Mudra',
        D: 'Ashwini Mudra',
      },
      correctAnswer: 'A',
      explanation: 'Khechari Mudra seals the upper bindu point, preventing the downward flow and destruction of nectar in the fire of Manipura.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 9,
      questionText: 'In contemporary scientific yoga, "Cyclic Meditation" and "SMET" (Self-Management of Excessive Tension) were developed at SVYASA University, Bangalore by:',
      questionType: 'Direct MCQ',
      options: {
        A: 'Dr. H.R. Nagendra and Dr. R. Nagarathna',
        B: 'Swami Kuvalayananda (Kaivalyadhama, Lonavala)',
        C: 'Swami Satyananda Saraswati (Bihar School of Yoga / Yoga Nidra)',
        D: 'B.K.S. Iyengar (Iyengar Yoga)',
      },
      correctAnswer: 'A',
      explanation: 'Dr. H.R. Nagendra formulated Cyclic Meditation combining stimulating and calming practices based on Mandukya Upanishad Karika.',
      difficulty: 'EASY',
    },
    {
      unitNumber: 10,
      questionText: 'On 11 December 2014, the United Nations General Assembly (UNGA) unanimously declared which date as the "International Day of Yoga" (IDY) celebrated worldwide every year?',
      questionType: 'Direct MCQ',
      options: {
        A: 'June 21 (Summer Solstice in the Northern Hemisphere)',
        B: 'June 5 (World Environment Day)',
        C: 'January 12 (National Youth Day)',
        D: 'October 2',
      },
      correctAnswer: 'A',
      explanation: 'June 21 was declared International Day of Yoga (co-sponsored by 177 nations), marking the longest day of the year and the Dakshinayana transition.',
      difficulty: 'EASY',
    },
  ];

  return {
    subjectCode: '100',
    subjectSlug: 'yoga',
    mockNumber: 1,
    title: 'Yoga — Mock Test 1: Full Syllabus Simulation (100 Qs)',
    description: 'Authentic 100-question UGC NET Yoga simulation covering Foundations of Yoga, Upanishads & Gita, Patanjali Yoga Sutra, Hatha Yoga Texts, Anatomy & Physiology, Yoga Therapy, Subtle Kundalini Anatomy, and Contemporary Applications across all 10 units.',
    accessTier: 'FREE',
    isFreeBenchmark: true,
    questions,
  };
}
