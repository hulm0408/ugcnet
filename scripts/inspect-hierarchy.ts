import * as fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('..', '');
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('package'));

const unitHierarchies = new Map<string, Map<string, Map<string, Set<string>>>>();

for (const file of files) {
  const filePath = path.join(DATA_DIR, file);
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const questions = Array.isArray(raw) ? raw : (raw.questions || []);

  for (const q of questions) {
    const h = q.classification_hierarchy || [];
    if (h.length > 0) {
      const unit = h.find((x: any) => x.type === 'unit');
      const topic = h.find((x: any) => x.type === 'official_topic');
      const subtopic = h.find((x: any) => x.type === 'subtopic');
      const entity = h.find((x: any) => x.type === 'entity');

      const uKey = unit ? `Unit ${unit.unit_number}: ${unit.title_english || ''} (${unit.title_arabic || ''})` : 'No Unit';
      const tKey = topic ? `${topic.title_english || ''} (${topic.title_arabic || ''})` : 'No Topic';
      const sKey = subtopic ? `${subtopic.title_english || ''} (${subtopic.title_arabic || ''})` : 'No Subtopic';
      const eKey = entity ? `${entity.title_english || ''} (${entity.title_arabic || ''})` : (q.specific_entity_name_english || 'General');

      if (!unitHierarchies.has(uKey)) unitHierarchies.set(uKey, new Map());
      const uMap = unitHierarchies.get(uKey)!;
      if (!uMap.has(tKey)) uMap.set(tKey, new Map());
      const tMap = uMap.get(tKey)!;
      if (!tMap.has(sKey)) tMap.set(sKey, new Set());
      tMap.get(sKey)!.add(eKey);
    }
  }
}

console.log('Total Units:', unitHierarchies.size);

for (const [unit, topics] of unitHierarchies.entries()) {
  console.log('\n====================================');
  console.log('UNIT:', unit);
  console.log('Total Topics in Unit:', topics.size);
  for (const [topic, subtopics] of topics.entries()) {
    console.log('  -> TOPIC (Level 2):', topic, `[${subtopics.size} Official Subtopics]`);
    for (const [subtopic, entities] of subtopics.entries()) {
      console.log('      -> SUBTOPIC (Level 3):', subtopic, `[${entities.size} Entities/Nodes]`);
      const sampleEntities = Array.from(entities).slice(0, 5);
      console.log('          Nodes (Level 4):', sampleEntities.join(', '));
    }
  }
}
