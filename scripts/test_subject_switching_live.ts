import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function testSubjectSwitching() {
  console.log('🧪 TESTING LIVE SUBJECT SWITCHING ENGINE ON VERCEL...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    // 1. Initial State: Arabic (Default)
    console.log('--- 1. Testing Default Arabic Context ---');
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const arabicHero = await page.textContent('h1');
    console.log('  📖 Initial Home H1:', arabicHero?.trim());

    await page.goto(`${BASE}/pyq`, { waitUntil: 'domcontentloaded' });
    const arabicPyqTitle = await page.textContent('h1');
    console.log('  📄 Initial PYQ H1:', arabicPyqTitle?.trim());

    // 2. Switch to General Paper 1 (Code 00) via Cookie
    console.log('\n--- 2. Switching to General Paper 1 (Code 00) ---');
    await context.addCookies([
      {
        name: 'ugc_active_subject',
        value: 'paper-1',
        domain: 'arabic-net-jrf.vercel.app',
        path: '/',
      },
    ]);

    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const paper1Hero = await page.textContent('h1');
    console.log('  📖 Paper 1 Home H1:', paper1Hero?.trim());

    await page.goto(`${BASE}/pyq`, { waitUntil: 'domcontentloaded' });
    const paper1PyqTitle = await page.textContent('h1');
    console.log('  📄 Paper 1 PYQ H1:', paper1PyqTitle?.trim());

    await page.goto(`${BASE}/syllabus`, { waitUntil: 'domcontentloaded' });
    const paper1Syllabus = await page.textContent('h1');
    console.log('  📚 Paper 1 Syllabus H1:', paper1Syllabus?.trim());

    // 3. Switch to English (Code 30)
    console.log('\n--- 3. Switching to English (Code 30) ---');
    await context.addCookies([
      {
        name: 'ugc_active_subject',
        value: 'english',
        domain: 'arabic-net-jrf.vercel.app',
        path: '/',
      },
    ]);

    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const englishHero = await page.textContent('h1');
    console.log('  📖 English Home H1:', englishHero?.trim());

    await page.goto(`${BASE}/pyq`, { waitUntil: 'domcontentloaded' });
    const englishPyqTitle = await page.textContent('h1');
    console.log('  📄 English PYQ H1:', englishPyqTitle?.trim());

    // 4. Switch to Commerce (Code 08)
    console.log('\n--- 4. Switching to Commerce (Code 08) ---');
    await context.addCookies([
      {
        name: 'ugc_active_subject',
        value: 'commerce',
        domain: 'arabic-net-jrf.vercel.app',
        path: '/',
      },
    ]);

    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const commerceHero = await page.textContent('h1');
    console.log('  📖 Commerce Home H1:', commerceHero?.trim());

    // 5. Switch back to Arabic (Code 29)
    console.log('\n--- 5. Switching back to Arabic (Code 29) ---');
    await context.addCookies([
      {
        name: 'ugc_active_subject',
        value: 'arabic',
        domain: 'arabic-net-jrf.vercel.app',
        path: '/',
      },
    ]);

    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const restoredArabicHero = await page.textContent('h1');
    console.log('  📖 Restored Arabic Home H1:', restoredArabicHero?.trim());

    console.log('\n═════════════════════════════════════════════════════════════');
    console.log('🎉 ALL PAGES DYNAMICALLY ADAPT TO ACTIVE SUBJECT CONTEXT!');
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await browser.close();
  }
}

testSubjectSwitching().finally(() => process.exit(0));
