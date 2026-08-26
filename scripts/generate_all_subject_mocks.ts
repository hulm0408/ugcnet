import 'dotenv/config';
import prisma from '../lib/db';
import { validateMockQuestions, insertMockTestToDatabase, MockTestDefinition } from './generators/common';
import { getPaper1MockTest } from './generators/subjects/paper1';
import { getArabicMockTest } from './generators/subjects/arabic';
import { getHistoryMockTest } from './generators/subjects/history';
import { getPoliticalScienceMockTest } from './generators/subjects/political_science';
import { getEconomicsMockTest } from './generators/subjects/economics';
import { getComputerScienceMockTest } from './generators/subjects/computer_science';
import { getCommerceMockTest } from './generators/subjects/commerce';
import { getManagementMockTest } from './generators/subjects/management';
import { getEnglishMockTest } from './generators/subjects/english';
import { getHindiMockTest } from './generators/subjects/hindi';
import { getLawMockTest } from './generators/subjects/law';
import { getSociologyMockTest } from './generators/subjects/sociology';
import { getPsychologyMockTest } from './generators/subjects/psychology';
import { getEducationMockTest } from './generators/subjects/education';
import { getGeographyMockTest } from './generators/subjects/geography';
import { getBengaliMockTest } from './generators/subjects/bengali';
import { getSanskritMockTest } from './generators/subjects/sanskrit';
import { getUrduMockTest } from './generators/subjects/urdu';
import { getYogaMockTest } from './generators/subjects/yoga';

async function main() {
  console.log('================================================================');
  console.log('🚀 MASTER MOCK TEST GENERATOR & SEEDER FOR ALL 19 UGC NET SUBJECTS');
  console.log('================================================================\n');

  const mockGenerators: { name: string; fn: () => MockTestDefinition }[] = [
    { name: 'General Paper 1 (Code 00)', fn: getPaper1MockTest },
    { name: 'Arabic (Code 29)', fn: getArabicMockTest },
    { name: 'History (Code 06)', fn: getHistoryMockTest },
    { name: 'Political Science (Code 02)', fn: getPoliticalScienceMockTest },
    { name: 'Economics (Code 01)', fn: getEconomicsMockTest },
    { name: 'Computer Science & Applications (Code 87)', fn: getComputerScienceMockTest },
    { name: 'Commerce (Code 08)', fn: getCommerceMockTest },
    { name: 'Management (Code 17)', fn: getManagementMockTest },
    { name: 'English (Code 30)', fn: getEnglishMockTest },
    { name: 'Hindi (Code 20)', fn: getHindiMockTest },
    { name: 'Law (Code 58)', fn: getLawMockTest },
    { name: 'Sociology (Code 05)', fn: getSociologyMockTest },
    { name: 'Psychology (Code 04)', fn: getPsychologyMockTest },
    { name: 'Education (Code 09)', fn: getEducationMockTest },
    { name: 'Geography (Code 80)', fn: getGeographyMockTest },
    { name: 'Bengali (Code 19)', fn: getBengaliMockTest },
    { name: 'Sanskrit (Code 25)', fn: getSanskritMockTest },
    { name: 'Urdu (Code 28)', fn: getUrduMockTest },
    { name: 'Yoga (Code 100)', fn: getYogaMockTest },
  ];

  const results: {
    name: string;
    code: string;
    paperId: string;
    questionsCount: number;
    unitsCovered: number;
    difficultyBreakdown: Record<string, number>;
  }[] = [];

  for (const gen of mockGenerators) {
    console.log(`\n⏳ Generating & Validating Mock Test for: ${gen.name}...`);
    const def = gen.fn();
    // 1. Validate questions
    const { valid, report } = validateMockQuestions(def);
    if (report.rejectedCount > 0 || valid.length !== 100) {
      console.error(`❌ Validation FAILED for ${gen.name} (${valid.length}/100 valid, ${report.rejectedCount} rejected):`);
      report.reasons.forEach((err) => console.error(`   - ${err}`));
      process.exit(1);
    }
    console.log(`✅ Validation PASSED: ${valid.length} questions, 10 units covered, no duplicates.`);

    // 2. Insert to database
    const insertion = await insertMockTestToDatabase(def, valid);
    console.log(`🎉 DB INSERT SUCCESS: ExamPaper ID: ${insertion.examPaper.id}, Questions: ${insertion.count}`);

    // Track statistics
    const diffCount: Record<string, number> = {};
    def.questions.forEach((q) => {
      const diff = q.difficulty || 'MEDIUM';
      diffCount[diff] = (diffCount[diff] || 0) + 1;
    });

    results.push({
      name: gen.name,
      code: def.subjectCode,
      paperId: insertion.examPaper.id,
      questionsCount: insertion.count,
      unitsCovered: new Set(def.questions.map((q) => q.unitNumber)).size,
      difficultyBreakdown: diffCount,
    });
  }

  console.log('\n\n================================================================');
  console.log('📊 FINAL SUMMARY TABLE OF ALL GENERATED MOCK TESTS');
  console.log('================================================================\n');

  console.table(
    results.map((r) => ({
      Subject: r.name,
      Code: r.code,
      'Questions': r.questionsCount,
      'Units': r.unitsCovered,
      'Paper ID': r.paperId,
    }))
  );

  console.log(`\nTotal Subjects with Production Mock Tests: ${results.length} / 19`);
  console.log(`Total High-Quality CBT Mock Questions in Database: ${results.reduce((acc, r) => acc + r.questionsCount, 0)}`);
}

main()
  .catch((e) => {
    console.error('Fatal error in mock generator:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
