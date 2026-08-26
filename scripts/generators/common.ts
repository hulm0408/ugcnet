import 'dotenv/config';
import prisma from '../../lib/db';

export interface RawMockQuestion {
  unitNumber: number; // 1 to 10
  topicSlug?: string;
  questionText: string; // Native or English text
  questionTextEnglish?: string; // Optional English translation
  questionType?: 'Direct MCQ' | 'Matching' | 'Assertion Reasoning' | 'Statement Based' | 'Chronological';
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  optionsEnglish?: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanationEnglish?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD';
  contextParagraph?: string;
  matchingTable?: any;
}

export interface MockTestDefinition {
  subjectCode: string;
  subjectSlug: string;
  mockNumber: number;
  title: string;
  description: string;
  accessTier: 'FREE' | 'PREMIUM';
  isFreeBenchmark?: boolean;
  questions: RawMockQuestion[];
}

export interface ValidationReport {
  subject: string;
  mockNumber: number;
  totalProvided: number;
  validCount: number;
  rejectedCount: number;
  unitDistribution: Record<number, number>;
  difficultyDistribution: Record<string, number>;
  reasons: string[];
}

/**
 * Strict Quality Control Validation Pipeline
 */
export function validateMockQuestions(def: MockTestDefinition): { valid: RawMockQuestion[]; report: ValidationReport } {
  const valid: RawMockQuestion[] = [];
  const reasons: string[] = [];
  const unitDist: Record<number, number> = {};
  const diffDist: Record<string, number> = { EASY: 0, MEDIUM: 0, HARD: 0, VERY_HARD: 0 };

  const seenStems = new Set<string>();

  for (let i = 0; i < def.questions.length; i++) {
    const q = def.questions[i];
    const qNum = i + 1;

    // 1. Check unit number
    if (!q.unitNumber || q.unitNumber < 1 || q.unitNumber > 10) {
      reasons.push(`Q${qNum}: Invalid unit number (${q.unitNumber})`);
      continue;
    }

    // 2. Check stem
    if (!q.questionText || q.questionText.trim().length < 5) {
      reasons.push(`Q${qNum}: Empty or too short question stem`);
      continue;
    }

    // 3. Check anti-duplication in this batch
    const normStem = q.questionText.toLowerCase().replace(/\s+/g, ' ').trim();
    if (seenStems.has(normStem)) {
      reasons.push(`Q${qNum}: Duplicate question stem in same mock`);
      continue;
    }
    seenStems.add(normStem);

    // 4. Check 4 options presence
    if (!q.options || !q.options.A || !q.options.B || !q.options.C || !q.options.D) {
      reasons.push(`Q${qNum}: Missing one or more of options A, B, C, D`);
      continue;
    }

    // 5. Check no duplicate option values
    const optVals = [q.options.A.trim(), q.options.B.trim(), q.options.C.trim(), q.options.D.trim()];
    if (new Set(optVals).size !== 4) {
      reasons.push(`Q${qNum}: Duplicate option choices detected`);
      continue;
    }

    // 6. Check single correct answer
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
      reasons.push(`Q${qNum}: Invalid correct_answer (${q.correctAnswer})`);
      continue;
    }

    // 7. Check explanation
    if (!q.explanation || q.explanation.trim().length < 5) {
      reasons.push(`Q${qNum}: Missing or trivial explanation`);
      continue;
    }

    const diff = q.difficulty || 'MEDIUM';
    diffDist[diff] = (diffDist[diff] || 0) + 1;
    unitDist[q.unitNumber] = (unitDist[q.unitNumber] || 0) + 1;

    valid.push(q);
  }

  const report: ValidationReport = {
    subject: def.subjectSlug,
    mockNumber: def.mockNumber,
    totalProvided: def.questions.length,
    validCount: valid.length,
    rejectedCount: reasons.length,
    unitDistribution: unitDist,
    difficultyDistribution: diffDist,
    reasons,
  };

  return { valid, report };
}

/**
 * Inserts a validated 100-Question Mock Test into PostgreSQL
 */
export async function insertMockTestToDatabase(def: MockTestDefinition, validQuestions: RawMockQuestion[]) {
  // 1. Locate Subject
  const subject = await prisma.subject.findUnique({
    where: { slug: def.subjectSlug },
    include: {
      units: {
        include: { broad_topics: true },
      },
    },
  });

  if (!subject) {
    throw new Error(`Subject with slug "${def.subjectSlug}" not found in database!`);
  }

  // Map unit number to DB unit
  const unitMap = new Map<number, { unitId: string; topicId?: string }>();
  for (const u of subject.units) {
    const firstTopic = u.broad_topics[0];
    unitMap.set(u.unit_number, {
      unitId: u.id,
      topicId: firstTopic?.id,
    });
  }

  // 2. Find or Create ExamPaper record for this Mock Test
  const paperUniqueExamName = `UGC NET ${subject.name} Mock Test ${def.mockNumber}`;
  const paperSourceFileName = `mock_${def.subjectSlug}_test_${def.mockNumber}.json`;

  let examPaper = await prisma.examPaper.findFirst({
    where: {
      subject_id: subject.id,
      is_mock_test: true,
      mock_test_number: def.mockNumber,
    },
  });

  if (!examPaper) {
    examPaper = await prisma.examPaper.create({
      data: {
        subject_id: subject.id,
        source_file_name: paperSourceFileName,
        exam_name: paperUniqueExamName,
        subject: `${subject.name} (Code No. ${subject.code})`,
        paper_number: 'II',
        year: 2025,
        session: `Mock ${def.mockNumber}`,
        total_questions: validQuestions.length,
        content_status: 'PUBLISHED',
        is_paper_iii: false,
        is_free_benchmark: def.isFreeBenchmark || def.mockNumber === 1,
        is_mock_test: true,
        mock_test_number: def.mockNumber,
        access_tier: def.accessTier || (def.mockNumber === 1 ? 'FREE' : 'PREMIUM'),
        display_name: def.title,
      },
    });
    console.log(`  Created Mock ExamPaper: "${examPaper.display_name}" (ID: ${examPaper.id})`);
  } else {
    examPaper = await prisma.examPaper.update({
      where: { id: examPaper.id },
      data: {
        display_name: def.title,
        total_questions: validQuestions.length,
        is_free_benchmark: def.isFreeBenchmark || def.mockNumber === 1,
        access_tier: def.accessTier || (def.mockNumber === 1 ? 'FREE' : 'PREMIUM'),
      },
    });
    console.log(`  Updated Mock ExamPaper: "${examPaper.display_name}" (ID: ${examPaper.id})`);
  }

  // 3. Delete existing questions for this specific mock paper to avoid stale duplicates
  await prisma.question.deleteMany({
    where: { exam_paper_id: examPaper.id },
  });

  // 4. Batch insert all validated questions
  const questionRecords = validQuestions.map((q, idx) => {
    const qNum = idx + 1;
    const sourceQId = `MOCK_${subject.code}_T${def.mockNumber}_Q${qNum.toString().padStart(3, '0')}`;
    const mapping = unitMap.get(q.unitNumber) || { unitId: null, topicId: null };

    const correctKey = q.correctAnswer;
    const correctText = q.options[correctKey] || '';
    const correctTextEng = q.optionsEnglish ? q.optionsEnglish[correctKey] || null : null;

    return {
      subject_id: subject.id,
      source_question_id: sourceQId,
      source_file_name: paperSourceFileName,
      exam_paper_id: examPaper.id,
      original_question_number: qNum.toString(),
      question_arabic: q.questionText,
      question_english: q.questionTextEnglish || (subject.primary_language === 'en' ? q.questionText : null),
      question_type: q.questionType || 'Direct MCQ',
      context_paragraph_arabic: q.contextParagraph || null,
      matching_table_arabic: q.matchingTable || null,
      options_arabic: q.options as any,
      options_english: q.optionsEnglish ? (q.optionsEnglish as any) : undefined,
      options_generated: false,
      correct_answer: q.correctAnswer,
      correct_answer_text_arabic: correctText,
      correct_answer_text_english: correctTextEng,
      explanation_arabic: q.explanation,
      explanation_english: q.explanationEnglish || (subject.primary_language === 'en' ? q.explanation : null),
      unit_id: mapping.unitId,
      broad_topic_id: mapping.topicId,
      final_folder_type: q.difficulty || 'MEDIUM',
      content_status: 'PUBLISHED',
      classification_status: 'classified',
    };
  });

  const inserted = await prisma.question.createMany({
    data: questionRecords,
    skipDuplicates: true,
  });

  console.log(`  ✅ Successfully inserted ${inserted.count} / ${validQuestions.length} questions into ExamPaper "${examPaper.display_name}".`);
  return { examPaper, count: inserted.count };
}
