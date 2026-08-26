import { SUBJECT_REGISTRY } from '../config/subjects/registry';

console.log('--- SUBJECT SYLLABUS AUDIT ---');
const total = Object.keys(SUBJECT_REGISTRY).length;
let passed = 0;

for (const [slug, config] of Object.entries(SUBJECT_REGISTRY)) {
  const unitsCount = config.officialSyllabus ? config.officialSyllabus.length : 0;
  const source = config.syllabusSource?.documentTitle || 'MISSING';
  const ok = unitsCount === 10;
  if (ok) passed++;
  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${slug.padEnd(20)} | Code: ${config.code.padEnd(4)} | Units: ${unitsCount}/10 | Source: ${source}`);
}

console.log(`\nAudit Result: ${passed}/${total} subjects have full 10-unit official syllabi.`);
if (passed === total) {
  console.log('✅ ALL SUBJECTS VERIFIED WITH 100% COVERAGE');
} else {
  console.error('❌ SOME SUBJECTS ARE MISSING SYLLABUS DATA');
  process.exit(1);
}
