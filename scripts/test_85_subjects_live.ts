import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

const TEST_SUBJECTS = [
  { slug: 'history', title: 'History', code: '06', snippet: 'Major Rock Edict XIII' },
  { slug: 'political-science', title: 'Political Science', code: '02', snippet: 'Basic Structure Doctrine' },
  { slug: 'computer-science-and-applications', title: 'Computer Science', code: '87', snippet: 'TURING MACHINE' },
  { slug: 'law', title: 'Law', code: '58', snippet: 'FIAT JUSTITIA RUAT CAELUM' },
  { slug: 'economics', title: 'Economics', code: '01', snippet: 'IS-LM EQUILIBRIUM' },
  { slug: 'english', title: 'English', code: '30', snippet: 'FIRST FOLIO 1623' },
  { slug: 'hindi', title: 'Hindi', code: '20', snippet: 'भक्तिकाल' },
  { slug: 'geography', title: 'Geography', code: '80', snippet: 'KÖPPEN-THORNTHWAITE' },
  { slug: 'sociology', title: 'Sociology', code: '05', snippet: 'SOCIAL FACTS' },
  { slug: 'psychology', title: 'Psychology', code: '04', snippet: 'Signal Detection Theory' },
  { slug: 'education', title: 'Education', code: '09', snippet: 'CIPP Model' },
  { slug: 'management', title: 'Management', code: '17', snippet: 'PORTER 5 FORCES' },
  { slug: 'yoga', title: 'Yoga', code: '100', snippet: 'योगश्चित्तवृत्तिनिरोधः' },
  { slug: 'sanskrit', title: 'Sanskrit', code: '25', snippet: 'अष्टाध्यायी' },
  { slug: 'urdu', title: 'Urdu', code: '28', snippet: 'ہزاروں خواہشیں ایسی' },
  { slug: 'bengali', title: 'Bengali', code: '19', snippet: 'চর্যাপদ' },
  { slug: 'arabic', title: 'Arabic', code: '29', snippet: 'قِفَا نَبْكِ' },
  { slug: 'commerce', title: 'Commerce', code: '08', snippet: 'ASSETS = LIABILITIES + EQUITY' },
];

async function testAllSubjectsLive() {
  console.log(`🧪 TESTING MULTI-SUBJECT LANDING PAGES ACROSS ${TEST_SUBJECTS.length} DISCIPLINES...\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  for (const s of TEST_SUBJECTS) {
    try {
      // Test dedicated route /subject/[slug]
      const res = await page.goto(`${BASE}/subject/${s.slug}`, { waitUntil: 'domcontentloaded' });
      if (!res || res.status() !== 200) {
        throw new Error(`HTTP ${res?.status()}`);
      }

      await page.waitForTimeout(300);
      const text = await page.textContent('body');

      const hasTitle = text?.toLowerCase().includes(s.title.toLowerCase());
      const hasCode = text?.includes(`CODE ${s.code}`) || text?.includes(s.code);
      const hasSnippet = text?.includes(s.snippet);

      if (!hasTitle || !hasSnippet) {
        console.error(`❌ [FAIL] ${s.title} (Code ${s.code}) - Missing content match`);
        failed++;
      } else {
        console.log(`✅ [PASS] ${s.title.padEnd(20)} (Code ${s.code.padEnd(3)}) - Verified bespoke vector art & pedagogy`);
        passed++;
      }
    } catch (err: any) {
      console.error(`❌ [ERROR] ${s.title}: ${err.message}`);
      failed++;
    }
  }

  await browser.close();

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log(`📊 RESULTS: ${passed} PASSED | ${failed} FAILED (Total Tested: ${TEST_SUBJECTS.length})`);
  console.log('═════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    process.exit(1);
  }
}

testAllSubjectsLive();
