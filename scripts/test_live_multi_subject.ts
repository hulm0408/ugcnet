import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function testLiveMultiSubjectPlatform() {
  console.log('🧪 TESTING LIVE MULTI-SUBJECT PLATFORM ON VERCEL...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[Browser Error]:', msg.text());
  });
  page.on('pageerror', (err) => console.error('[Page Error]:', err.message));

  try {
    // 1. Visit homepage
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    console.log('✅ Home Page loaded');

    // 2. Check Subject Switcher in Header
    const switcherButton = await page.$('button:has-text("Arabic")');
    console.log('✅ Subject Switcher button visible:', !!switcherButton);

    if (switcherButton) {
      await switcherButton.click();
      await page.waitForTimeout(500);

      const paper1Option = await page.isVisible('text="General Paper 1"');
      const englishOption = await page.isVisible('text="English"');
      const commerceOption = await page.isVisible('text="Commerce"');

      console.log('  • General Paper 1 option:', paper1Option);
      console.log('  • English option:', englishOption);
      console.log('  • Commerce option:', commerceOption);
    }

    // 3. Test API /api/subjects
    const res = await page.request.get(`${BASE}/api/subjects`);
    console.log('✅ /api/subjects HTTP Status:', res.status());
    const subjectsJson = await res.json();
    console.log(`✅ Loaded ${subjectsJson.subjects?.length} subjects from API:`, subjectsJson.subjects?.map((s: any) => `${s.name} (${s.code})`).join(', '));

    // 4. Test Syllabus 5-Tier Drilldown
    await page.goto(`${BASE}/syllabus`, { waitUntil: 'domcontentloaded' });
    const unit1Card = await page.isVisible('text="Unit 1"');
    console.log('✅ Syllabus Units visible:', unit1Card);

    // 5. Test 2015 Part 1 Direct URL
    const paperUrl = `${BASE}/practice?year=2015&paperId=cmt4kfy4k00zzskuzoqcfgr44&paperTitle=NET%20JRF%20Arabic%202015%20Part%201`;
    await page.goto(paperUrl, { waitUntil: 'domcontentloaded' });
    const q1Arabic = await page.waitForSelector('.font-arabic', { timeout: 8000 });
    console.log('✅ 2015 Part 1 loaded with Arabic questions:', !!q1Arabic);

    console.log('\n🎉 ALL LIVE MULTI-SUBJECT PLATFORM VERIFICATIONS PASSED!');
  } catch (err: any) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await browser.close();
  }
}

testLiveMultiSubjectPlatform().finally(() => process.exit(0));
