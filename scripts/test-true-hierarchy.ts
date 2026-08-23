import * as fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('..', '');
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('package'));

type HierarchySummary = {
  units: Map<number, {
    nameAr: string;
    nameEn: string;
    topics: Map<string, {
      nameAr: string;
      nameEn: string;
      subtopics: Map<string, {
        nameAr: string;
        nameEn: string;
        entities: Map<string, {
          nameAr: string;
          nameEn: string;
          questionCount: number;
        }>;
      }>;
    }>;
  }>;
};

const summary: HierarchySummary = {
  units: new Map()
};

let totalParsed = 0;

for (const file of files) {
  const filePath = path.join(DATA_DIR, file);
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const questions = Array.isArray(raw) ? raw : (raw.questions || []);

  for (const q of questions) {
    totalParsed++;
    const h = q.classification_hierarchy || [];
    const unitNode = h.find((x: any) => x.type === 'unit');
    const topicNode = h.find((x: any) => x.type === 'official_topic');
    const subtopicNode = h.find((x: any) => x.type === 'subtopic');
    const entityNode = h.find((x: any) => x.type === 'entity');

    const unitNum = unitNode?.unit_number || 1;
    const unitAr = unitNode?.title_arabic || q.unit_name_arabic || `الوحدة ${unitNum}`;
    const unitEn = unitNode?.title_english || q.unit_name_english || `Unit ${unitNum}`;

    const topicAr = topicNode?.title_arabic || q.broad_topic_arabic || 'عام';
    const topicEn = topicNode?.title_english || q.broad_topic_english || 'General';

    const subtopicAr = subtopicNode?.title_arabic || q.subtopic_arabic || 'عام';
    const subtopicEn = subtopicNode?.title_english || q.subtopic_english || 'General';

    const entityAr = entityNode?.title_arabic || q.specific_entity_name_arabic || 'عام';
    const entityEn = entityNode?.title_english || q.specific_entity_name_english || 'General';

    if (!summary.units.has(unitNum)) {
      summary.units.set(unitNum, {
        nameAr: unitAr,
        nameEn: unitEn,
        topics: new Map()
      });
    }

    const u = summary.units.get(unitNum)!;
    if (!u.topics.has(topicAr)) {
      u.topics.set(topicAr, {
        nameAr: topicAr,
        nameEn: topicEn,
        subtopics: new Map()
      });
    }

    const t = u.topics.get(topicAr)!;
    if (!t.subtopics.has(subtopicAr)) {
      t.subtopics.set(subtopicAr, {
        nameAr: subtopicAr,
        nameEn: subtopicEn,
        entities: new Map()
      });
    }

    const s = t.subtopics.get(subtopicAr)!;
    if (!s.entities.has(entityAr)) {
      s.entities.set(entityAr, {
        nameAr: entityAr,
        nameEn: entityEn,
        questionCount: 0
      });
    }

    s.entities.get(entityAr)!.questionCount++;
  }
}

console.log('Total questions parsed from JSON files:', totalParsed);
console.log('\n===== TRUE SYLLABUS HIERARCHY SUMMARY =====');
for (const [unitNum, u] of summary.units.entries()) {
  console.log(`\nUnit ${unitNum}: ${u.nameEn} (${u.nameAr}) — Total Topics: ${u.topics.size}`);
  for (const [topicAr, t] of u.topics.entries()) {
    console.log(`  └─ Topic: ${t.nameEn} (${t.nameAr}) — Subtopics: ${t.subtopics.size}`);
    for (const [subtopicAr, s] of t.subtopics.entries()) {
      console.log(`      └─ Subtopic: ${s.nameEn} (${s.nameAr}) — Nodes/Entities: ${s.entities.size}`);
      const sampleEntities = Array.from(s.entities.values()).slice(0, 4).map(e => `${e.nameEn} (${e.nameAr}: ${e.questionCount} Qs)`);
      console.log(`          Sample Nodes: ${sampleEntities.join(' | ')}`);
    }
  }
}
