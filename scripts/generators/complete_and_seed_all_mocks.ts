import 'dotenv/config';
import prisma from '../../lib/db';
import { RawMockQuestion, MockTestDefinition, insertMockTestToDatabase, validateMockQuestions } from './common';

// Import all subject mock definitions
import { getPaper1MockTest } from './subjects/paper1';
import { getArabicMockTest } from './subjects/arabic';
import { getHistoryMockTest } from './subjects/history';
import { getPoliticalScienceMockTest } from './subjects/political_science';
import { getEconomicsMockTest } from './subjects/economics';
import { getComputerScienceMockTest } from './subjects/computer_science';
import { getCommerceMockTest } from './subjects/commerce';
import { getManagementMockTest } from './subjects/management';
import { getEnglishMockTest } from './subjects/english';
import { getHindiMockTest } from './subjects/hindi';
import { getLawMockTest } from './subjects/law';
import { getSociologyMockTest } from './subjects/sociology';
import { getPsychologyMockTest } from './subjects/psychology';
import { getEducationMockTest } from './subjects/education';
import { getGeographyMockTest } from './subjects/geography';
import { getBengaliMockTest } from './subjects/bengali';
import { getSanskritMockTest } from './subjects/sanskrit';
import { getUrduMockTest } from './subjects/urdu';
import { getYogaMockTest } from './subjects/yoga';

// Subject topic generators for filling missing questions to reach 10 per unit
import { getSupplementaryQuestionsForSubject } from './supplementary_questions';

async function main() {
  console.log('================================================================');
  console.log('🚀 MASTER 100-QUESTION UGC NET MOCK GENERATOR ACROSS ALL 19 SUBJECTS');
  console.log('================================================================\n');

  const generators: { slug: string; name: string; fn: () => MockTestDefinition }[] = [
    { slug: 'paper-1', name: 'General Paper 1 (Code 00)', fn: getPaper1MockTest },
    { slug: 'arabic', name: 'Arabic (Code 29)', fn: getArabicMockTest },
    { slug: 'history', name: 'History (Code 06)', fn: getHistoryMockTest },
    { slug: 'political-science', name: 'Political Science (Code 02)', fn: getPoliticalScienceMockTest },
    { slug: 'economics', name: 'Economics (Code 01)', fn: getEconomicsMockTest },
    { slug: 'computer-science-and-applications', name: 'Computer Science (Code 87)', fn: getComputerScienceMockTest },
    { slug: 'commerce', name: 'Commerce (Code 08)', fn: getCommerceMockTest },
    { slug: 'management', name: 'Management (Code 17)', fn: getManagementMockTest },
    { slug: 'english', name: 'English (Code 30)', fn: getEnglishMockTest },
    { slug: 'hindi', name: 'Hindi (Code 20)', fn: getHindiMockTest },
    { slug: 'law', name: 'Law (Code 58)', fn: getLawMockTest },
    { slug: 'sociology', name: 'Sociology (Code 05)', fn: getSociologyMockTest },
    { slug: 'psychology', name: 'Psychology (Code 04)', fn: getPsychologyMockTest },
    { slug: 'education', name: 'Education (Code 09)', fn: getEducationMockTest },
    { slug: 'geography', name: 'Geography (Code 80)', fn: getGeographyMockTest },
    { slug: 'bengali', name: 'Bengali (Code 19)', fn: getBengaliMockTest },
    { slug: 'sanskrit', name: 'Sanskrit (Code 25)', fn: getSanskritMockTest },
    { slug: 'urdu', name: 'Urdu (Code 28)', fn: getUrduMockTest },
    { slug: 'yoga', name: 'Yoga (Code 100)', fn: getYogaMockTest },
  ];

  const auditRows: {
    subject: string;
    code: string;
    totalQs: number;
    units: string;
    paperId: string;
    status: string;
  }[] = [];

  for (const gen of generators) {
    console.log(`\n⏳ Processing Mock Test for: ${gen.name}...`);
    const def = gen.fn();

    // 1. Check unit distribution and supplement if needed
    const questionsByUnit: Record<number, RawMockQuestion[]> = {};
    for (let u = 1; u <= 10; u++) questionsByUnit[u] = [];

    for (const q of def.questions) {
      if (q.unitNumber >= 1 && q.unitNumber <= 10) {
        questionsByUnit[q.unitNumber].push(q);
      }
    }

    const supplementary = getSupplementaryQuestionsForSubject(def.subjectSlug, def.subjectCode);
    const completeQuestions: RawMockQuestion[] = [];

    for (let u = 1; u <= 10; u++) {
      const existing = questionsByUnit[u];
      completeQuestions.push(...existing);

      const needed = 10 - existing.length;
      if (needed > 0) {
        const suppPool = supplementary[u] || [];
        const added = suppPool.slice(0, needed);
        completeQuestions.push(...added);
        if (added.length < needed) {
          console.warn(`⚠️ Unit ${u} for ${gen.name} has only ${existing.length + added.length} / 10 questions.`);
        }
      }
    }

    def.questions = completeQuestions;

    // 2. Validate
    const { valid, report } = validateMockQuestions(def);
    if (report.rejectedCount > 0 || valid.length !== 100) {
      console.error(`❌ Validation FAILED for ${gen.name} (${valid.length}/100 valid, ${report.rejectedCount} rejected):`);
      report.reasons.slice(0, 10).forEach((err) => console.error(`   - ${err}`));
      process.exit(1);
    }
    console.log(`✅ Validation PASSED: ${valid.length} questions, 10 units covered, 0 duplicates.`);

    // 3. Database Insertion
    const insertion = await insertMockTestToDatabase(def, valid);
    console.log(`🎉 DB Insertion Success: Paper ID ${insertion.examPaper.id} with ${insertion.count} questions.`);

    auditRows.push({
      subject: gen.name,
      code: def.subjectCode,
      totalQs: insertion.count,
      units: '10 / 10',
      paperId: insertion.examPaper.id,
      status: 'PUBLISHED (FREE)',
    });
  }

  console.log('\n\n================================================================');
  console.log('📊 MASTER UGC NET MOCK TEST AUDIT SUMMARY ACROSS ALL 19 SUBJECTS');
  console.log('================================================================\n');

  console.table(auditRows);

  const totalQuestions = auditRows.reduce((acc, r) => acc + r.totalQs, 0);
  console.log(`\n✅ ALL ${auditRows.length} SUBJECTS PROVISIONED WITH FULL 100-QUESTION MOCK TESTS.`);
  console.log(`✅ TOTAL QUESTIONS SEEDED IN DATABASE: ${totalQuestions} / 1900`);
}

main()
  .catch((e) => {
    console.error('Fatal execution error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
