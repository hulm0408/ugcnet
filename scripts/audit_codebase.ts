import * as fs from 'fs';
import path from 'path';

function scanDir(dir: string, results: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, results);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (/fake|dummy|TODO|mockData|sampleQ|Math\.random/i.test(line)) {
          results.push(`${fullPath}:${idx + 1}: ${line.trim()}`);
        }
      });
    }
  }
  return results;
}

const hits = scanDir(path.resolve(__dirname, '../app')).concat(
  scanDir(path.resolve(__dirname, '../components'))
);
console.log('Total potential mock/random/TODO hits:', hits.length);
hits.forEach((h) => console.log(h));
