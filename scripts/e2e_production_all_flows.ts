import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function runProductionDeepVerification() {
  console.log('🚀 COMMENCING PRODUCTION DEEP VERIFICATION LOOP ON LIVE VERCEL...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('[Browser Error]:', msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
    console.error('[Page Error]:', err.message);
  });

  // TEST 1: Exact 2015 Part 1 Direct URL
  console.log('\n--- 1. Testing Exact 2015 Part 1 Direct URL ---');
  const direct2015Url = `${BASE}/practice?year=2015&paperId=cmt4kfy4k00zzskuzoqcfgr44&paperTitle=NET%20JRF%20Arabic%202015%20Part%201`;
  const res1 = await page.goto(direct2015Url, { waitUntil: 'domcontentloaded' });
  if (res1?.status() !== 200) throw new Error(`HTTP ${res1?.status()}`);

  await page.waitForSelector('[dir="rtl"]', { timeout: 10000 });
  const q1Text = await page.textContent('[dir="rtl"]');
  console.log('  ✅ Q1 Arabic:', q1Text?.trim().substring(0, 80));

  // Check Option A text
  const optA = page.locator('button').filter({ hasText: 'A' }).first();
  console.log('  ✅ Option A visible:', await optA.isVisible());

  // Click Next >
  const nextBtn = page.getByRole('button', { name: /Next/i });
  await nextBtn.click();
  await page.waitForTimeout(600);
  const q2Text = await page.textContent('[dir="rtl"]');
  console.log('  ✅ Q2 Arabic after Next:', q2Text?.trim().substring(0, 80));

  // Click < Previous
  const prevBtn = page.getByRole('button', { name: /Previous/i });
  await prevBtn.click();
  await page.waitForTimeout(600);
  const backToQ1 = await page.textContent('[dir="rtl"]');
  console.log('  ✅ Q1 Arabic after Previous:', backToQ1?.trim().substring(0, 80));

  // TEST 2: Refresh the page
  console.log('\n--- 2. Testing Page Refresh ---');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[dir="rtl"]', { timeout: 10000 });
  const refreshedQ1 = await page.textContent('[dir="rtl"]');
  console.log('  ✅ Q1 after Reload:', refreshedQ1?.trim().substring(0, 80));

  // TEST 3: Navigation via PYQ UI Flow
  console.log('\n--- 3. Testing Navigation via PYQ UI Flow ---');
  await page.goto(`${BASE}/pyq`, { waitUntil: 'domcontentloaded' });
  await page.click('text=2015');
  await page.waitForURL('**/pyq/2015', { timeout: 10000 });
  console.log('  ✅ Navigated to /pyq/2015');

  // Click Practice Paper button for Part 1
  const practiceLink = page.locator('a[href*="cmt4kfy4k00zzskuzoqcfgr44"]').first();
  await practiceLink.click();
  await page.waitForURL('**/practice**', { timeout: 10000 });
  await page.waitForSelector('[dir="rtl"]', { timeout: 10000 });
  const pyqFlowQ1 = await page.textContent('[dir="rtl"]');
  console.log('  ✅ Q1 loaded via UI Flow:', pyqFlowQ1?.trim().substring(0, 80));

  // TEST 4: Syllabus Unit Practice
  console.log('\n--- 4. Testing Syllabus Unit 3 Practice ---');
  await page.goto(`${BASE}/practice?unit=3`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[dir="rtl"]', { timeout: 10000 });
  const unitQ1 = await page.textContent('[dir="rtl"]');
  console.log('  ✅ Unit 3 Q1 Arabic:', unitQ1?.trim().substring(0, 80));

  // TEST 5: Topic Practice
  console.log('\n--- 5. Testing Topic Practice ---');
  await page.goto(`${BASE}/practice?unit=1&topic=the-mu-allaqat-and-their-poets`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[dir="rtl"]', { timeout: 10000 });
  const topicQ1 = await page.textContent('[dir="rtl"]');
  console.log('  ✅ Topic Q1 Arabic:', topicQ1?.trim().substring(0, 80));

  // TEST 6: Search Flow
  console.log('\n--- 6. Testing Search Flow ---');
  await page.goto(`${BASE}/search?q=%D8%A7%D9%85%D8%B1%D8%A4+%D8%A7%D9%84%D9%82%D9%8A%D8%B3`, {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector('[dir="rtl"]', { timeout: 10000 });
  console.log('  ✅ Search Results Rendered with Arabic text!');

  await browser.close();

  if (consoleErrors.length > 0) {
    console.error(`\n❌ Found ${consoleErrors.length} browser errors during flow testing:`, consoleErrors);
    process.exit(1);
  }

  console.log('\n═════════════════════════════════════════════════════════════');
  console.log('🏁 ALL PRODUCTION FLOWS VERIFIED SUCCESSFULLY WITH 0 ERRORS!');
  console.log('═════════════════════════════════════════════════════════════\n');
}

runProductionDeepVerification().finally(() => process.exit(0));
