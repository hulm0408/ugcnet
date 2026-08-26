import { SUBJECT_REGISTRY } from '../config/subjects/registry';

console.log('=== SYLLABUS GRANULARITY & DEPTH AUDIT ===\n');

let totalUnits = 0;
let totalTopics = 0;
let totalSubtopics = 0;

for (const [slug, config] of Object.entries(SUBJECT_REGISTRY)) {
  const units = config.officialSyllabus || [];
  let subjectTopics = 0;
  let subjectSubtopics = 0;

  for (const unit of units) {
    subjectTopics += unit.topics.length;
    for (const topic of unit.topics) {
      subjectSubtopics += topic.subtopics ? topic.subtopics.length : 0;
    }
  }

  totalUnits += units.length;
  totalTopics += subjectTopics;
  totalSubtopics += subjectSubtopics;

  const avgTopicsPerUnit = (subjectTopics / (units.length || 1)).toFixed(1);
  console.log(
    `[${config.code}] ${config.name.padEnd(35)} | Units: ${units.length} | Topics: ${String(subjectTopics).padStart(2)} (Avg: ${avgTopicsPerUnit}/unit) | Subtopics: ${String(subjectSubtopics).padStart(3)}`
  );
}

console.log('\n------------------------------------------------------------');
console.log(`TOTALS: 19 Subjects | ${totalUnits} Units | ${totalTopics} Topics | ${totalSubtopics} Subtopics`);
console.log(`Average Topics per Subject: ${(totalTopics / 19).toFixed(1)}`);
console.log(`Average Subtopics per Subject: ${(totalSubtopics / 19).toFixed(1)}`);
