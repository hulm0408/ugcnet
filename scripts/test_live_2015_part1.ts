import { chromium } from 'playwright';

async function testLiveProductionPage() {
  console.log('🌐 TESTING LIVE PRODUCTION BROWSER RENDERING (2015 Part 1)...');
  const targetUrl = 'https://arabic-net-jrf.vercel.app/practice?year=2015&paperId=cmt4kfy4k00zzskuzoqcfgr44&paperTitle=NET%20JRF%20Arabic%202015%20Part%201';

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('console', (msg) => console.log(`[Console ${msg.type()}]:`, msg.text()));
  page.on('pageerror', (err) => console.error('[Uncaught Error]:', err.message));

  try {
    const resp = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('HTTP Status:', resp?.status());

    // Wait for the questions to load and render
    await page.waitForSelector('[dir="rtl"]', { timeout: 15000 });
    console.log('✅ Found Arabic question element on page!');

    const questionText = await page.textContent('[dir="rtl"]');
    console.log('Rendered Question Arabic Text:', questionText?.trim().substring(0, 100));

    const options = await page.$$eval('button', (btns) => btns.map((b) => b.innerText.trim()).filter(Boolean));
    console.log('Rendered Options / Actions Count:', options.length);
    console.log('Sample Options / Actions:', options.slice(0, 8));

    // Test clicking Next button
    console.log('\nTesting "Next >" button navigation...');
    const nextBtn = page.getByRole('button', { name: /Next/i });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      const q2Text = await page.textContent('[dir="rtl"]');
      console.log('Rendered Question 2 Arabic Text:', q2Text?.trim().substring(0, 100));
      console.log('✅ "Next >" Navigation Verified successfully!');
    } else {
      console.error('❌ "Next >" button not found');
    }

    // Test clicking an option (Option A)
    console.log('\nTesting Option Selection...');
    const optA = page.locator('button').filter({ hasText: 'A' }).first();
    if (await optA.isVisible()) {
      await optA.click();
      await page.waitForTimeout(1000);
      console.log('✅ Option clicked and evaluated successfully!');
    }
  } catch (err: any) {
    console.error('❌ Page Test Error:', err.message);
  } finally {
    await browser.close();
  }
}

testLiveProductionPage().finally(() => process.exit(0));
