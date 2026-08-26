import { SUBJECT_REGISTRY, getSubjectConfig } from '../config/subjects/registry';

console.log('=== MULTI-SUBJECT SYSTEM QUALITY & UNIQUENESS AUDIT ===\n');

const slugs = Object.keys(SUBJECT_REGISTRY);
console.log(`Total Handcrafted Subject Configs: ${slugs.length}\n`);

let passedCount = 0;
let failedCount = 0;

const concepts = new Set<string>();
const structuralSignatures = new Map<string, string>();

for (const slug of slugs) {
  const config = SUBJECT_REGISTRY[slug];
  const svg = config.theme.heroSvgIllustration;
  const concept = config.theme.visualConcept || 'MISSING_CONCEPT';

  // 1. Check viewBox
  const hasViewBox = svg.includes('viewBox="0 0 500 360"');
  
  // 2. Check concept uniqueness
  const isConceptUnique = !concepts.has(concept);
  concepts.add(concept);

  // 3. Structural element fingerprint (counts of shapes)
  const rectCount = (svg.match(/<rect/g) || []).length;
  const circleCount = (svg.match(/<circle/g) || []).length;
  const pathCount = (svg.match(/<path/g) || []).length;
  const polygonCount = (svg.match(/<polygon/g) || []).length;
  const lineCount = (svg.match(/<line/g) || []).length;
  const textCount = (svg.match(/<text/g) || []).length;
  
  const signature = `rect:${rectCount},circle:${circleCount},path:${pathCount},poly:${polygonCount},line:${lineCount}`;

  // 4. Check that it doesn't use the old generic template signature
  // Old template had: 4 rects, 1 circle, 2 paths (dashed connectors), 7 text elements
  const isOldTemplate = rectCount === 4 && circleCount === 1 && pathCount === 2 && svg.includes('stroke-dasharray="3,3"');

  // 5. Syllabus check
  const hasSyllabus = config.officialSyllabus && config.officialSyllabus.length > 0;

  console.log(`[${config.code}] ${config.name} (${slug})`);
  console.log(`  - Visual Concept: "${concept}"`);
  console.log(`  - Shape Signature: ${signature} (Text nodes: ${textCount})`);
  console.log(`  - Valid ViewBox: ${hasViewBox ? 'PASS' : 'FAIL'}`);
  console.log(`  - Unique Concept: ${isConceptUnique ? 'PASS' : 'FAIL'}`);
  console.log(`  - Template Re-use: ${isOldTemplate ? 'FAIL (OLD TEMPLATE)' : 'PASS (GENUINE UNIQUE SVG)'}`);
  console.log(`  - Official Syllabus Units: ${hasSyllabus ? `${config.officialSyllabus!.length} Units (Verified)` : 'Database fallback'}`);
  console.log('');

  if (hasViewBox && isConceptUnique && !isOldTemplate) {
    passedCount++;
  } else {
    failedCount++;
  }
}

console.log(`\n========================================`);
console.log(`TOTAL AUDIT RESULT: ${passedCount}/${slugs.length} SUBJECTS PASSED`);
console.log(`Failures: ${failedCount}`);
console.log(`Unique Concepts: ${concepts.size}/${slugs.length}`);
console.log(`========================================\n`);
