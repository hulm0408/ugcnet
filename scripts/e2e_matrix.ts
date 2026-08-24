import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'https://arabic-net-jrf.vercel.app';

async function runE2EMatrix() {
  console.log(`🌐 Launching Extended Playwright E2E Verification Matrix against: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'ArabicNetJrf-QA-Bot/1.0',
  });

  const page = await context.newPage();
  let passed = 0;
  let failed = 0;

  async function testRoute(name: string, path: string, assertions: (p: typeof page) => Promise<void>) {
    console.log(`🔍 Testing: ${name} (${path})...`);
    try {
      const resp = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 35000 });
      if (!resp || resp.status() >= 400) {
        throw new Error(`HTTP status: ${resp?.status()}`);
      }
      await page.waitForTimeout(1000); // allow hydration
      await assertions(page);
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name} -> ${err.message}`);
      failed++;
    }
  }

  // 1. Home Page
  await testRoute('Home Landing Page', '/', async (p) => {
    const title = await p.title();
    if (!title.includes('Arabic NET/JRF')) throw new Error(`Unexpected title: ${title}`);
    const heading = await p.textContent('h1');
    if (!heading) throw new Error('Missing h1');
  });

  // 2. Syllabus Landing (10 Units)
  await testRoute('Syllabus Units (Level 1)', '/syllabus', async (p) => {
    const units = await p.$$('a[href^="/syllabus/"]');
    if (units.length < 10) throw new Error(`Expected >= 10 unit links, found ${units.length}`);
  });

  // 3. Syllabus Unit 1 Topics (Level 2)
  await testRoute('Unit 1 Topics (Level 2)', '/syllabus/1', async (p) => {
    const topics = await p.$$('a[href^="/syllabus/1/"]');
    if (topics.length === 0) throw new Error('No topic cards found');
  });

  // 4. Topic Sub-topics / Poets (Level 3)
  await testRoute('Topic Sub-topics (Level 3)', '/syllabus/1/the-mu-allaqat-and-their-poets', async (p) => {
    const content = await p.content();
    if (!content.includes('امْرُؤُ الْقَيْسِ') && !content.includes('Imru')) {
      throw new Error('Missing canonical subtopic for Imru al-Qais');
    }
  });

  // 5. Poet Learning Nodes (Level 4)
  await testRoute('Poet Learning Nodes (Level 4)', '/syllabus/1/the-mu-allaqat-and-their-poets/imru-al-qays', async (p) => {
    const nodes = await p.$$('a[href^="/syllabus/1/the-mu-allaqat-and-their-poets/imru-al-qays/"]');
    if (nodes.length === 0) throw new Error('No learning nodes found for Imru al-Qais');
  });

  // 6. PYQ Landing
  await testRoute('PYQ Landing Page', '/pyq', async (p) => {
    const yearCards = await p.$$('a[href^="/pyq/"]');
    if (yearCards.length < 10) throw new Error(`Expected >= 10 years, found ${yearCards.length}`);
  });

  // 7. PYQ 2023 Selection
  await testRoute('PYQ 2023 Selection', '/pyq/2023', async (p) => {
    const paperLinks = await p.$$('a[href*="practice"]');
    if (paperLinks.length === 0) throw new Error('No paper practice links found for 2023');
  });

  // 8. Search Question Bank
  await testRoute('Question Bank Search', '/search?q=%D8%A7%D9%85%D8%B1%D8%A4+%D8%A7%D9%84%D9%82%D9%8A%D8%B3', async (p) => {
    const content = await p.content();
    if (!content.includes('امرؤ القيس') && !content.includes('امْرُؤُ الْقَيْسِ')) {
      throw new Error('Search did not return matching Arabic questions');
    }
  });

  // 9. Interactive Practice Engine
  await testRoute('Interactive Practice Mode', '/practice?year=2023', async (p) => {
    await p.waitForSelector('button, a', { timeout: 10000 });
    const content = await p.content();
    if (!content.includes('Practice') && !content.includes('Mock') && !content.includes('Question')) {
      throw new Error('Practice screen did not load question/mode elements');
    }
  });

  // 10. Mobile Responsiveness Test (375x667)
  console.log('\n📱 Testing Mobile Viewport (375x667)...');
  await page.setViewportSize({ width: 375, height: 667 });

  await testRoute('Mobile Syllabus View', '/syllabus', async (p) => {
    const unitCards = await p.$$('a[href^="/syllabus/"]');
    if (unitCards.length < 10) throw new Error('Mobile syllabus units missing');
  });

  await testRoute('Mobile PYQ View', '/pyq', async (p) => {
    const yearCards = await p.$$('a[href^="/pyq/"]');
    if (yearCards.length < 10) throw new Error('Mobile PYQ years missing');
  });

  await testRoute('Mobile Search View', '/search', async (p) => {
    const input = await p.$('input[type="search"]');
    if (!input) throw new Error('Mobile search input missing');
  });

  await browser.close();

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log(`🏁 EXTENDED PLAYWRIGHT E2E MATRIX: ${passed} PASSED, ${failed} FAILED`);
  console.log('═════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runE2EMatrix().catch((err) => {
  console.error('Fatal Playwright runner error:', err);
  process.exit(1);
});
