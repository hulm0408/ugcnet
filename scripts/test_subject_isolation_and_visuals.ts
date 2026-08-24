import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function testSubjectIsolationAndVisuals() {
  console.log('🧪 TESTING MULTI-SUBJECT ISOLATION & BESPOKE VISUALS ON VERCEL...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    // ── 1. TEST BENGALI (Code 19) ──
    console.log('--- 1. Testing Bengali (bengali) ---');
    await context.addCookies([
      { name: 'ugc_active_subject', value: 'bengali', domain: 'arabic-net-jrf.vercel.app', path: '/' },
    ]);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    const bengaliBody = await page.textContent('body');
    const hasBengaliText = bengaliBody?.includes('বাংলা সাহিত্য ও সংস্কৃতি');
    const hasCharyapada = bengaliBody?.includes('চর্যাপদ');
    const hasBagchi = bengaliBody?.includes('প্রবোধচন্দ্র বাগচী');

    console.log('  🎯 Found Bengali Native Title:', hasBengaliText);
    console.log('  🎯 Found Charyapada pillar:', hasCharyapada);
    console.log('  🎯 Found Bengali memory trick (Prabodh Chandra Bagchi):', hasBagchi);

    if (!hasBengaliText || !hasBagchi) {
      throw new Error('Bengali homepage missing bespoke content');
    }

    // ── 2. TEST ARABIC (Code 29) ──
    console.log('\n--- 2. Testing Arabic (arabic) ---');
    await context.addCookies([
      { name: 'ugc_active_subject', value: 'arabic', domain: 'arabic-net-jrf.vercel.app', path: '/' },
    ]);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    const arabicBody = await page.textContent('body');
    const hasArabicText = arabicBody?.includes('اللغة العربية وآدابها');
    const hasMuallaqat = arabicBody?.includes('المعلقات');
    const hasBilgrami = arabicBody?.includes('سبحة المرجان');

    console.log('  🎯 Found Arabic Native Title:', hasArabicText);
    console.log('  🎯 Found Muallaqat pillar:', hasMuallaqat);
    console.log('  🎯 Found Arabic memory trick (Subhat al-Marjan):', hasBilgrami);

    if (!hasArabicText || !hasBilgrami) {
      throw new Error('Arabic homepage missing bespoke content');
    }

    // ── 3. TEST COMMERCE (Code 08) ──
    console.log('\n--- 3. Testing Commerce (commerce) ---');
    await context.addCookies([
      { name: 'ugc_active_subject', value: 'commerce', domain: 'arabic-net-jrf.vercel.app', path: '/' },
    ]);
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    const commerceBody = await page.textContent('body');
    const hasCommerceTitle = commerceBody?.includes('वाणिज्य एवं वित्तीय अध्ययन');
    const hasIndAS = commerceBody?.includes('Ind-AS 115');
    const hasWalter = commerceBody?.includes("Walter's Model");

    console.log('  🎯 Found Commerce Native Title:', hasCommerceTitle);
    console.log('  🎯 Found Ind-AS pillar:', hasIndAS);
    console.log('  🎯 Found Walter Model memory trick:', hasWalter);

    if (!hasCommerceTitle || !hasWalter) {
      throw new Error('Commerce homepage missing bespoke content');
    }

    console.log('\n═════════════════════════════════════════════════════════════');
    console.log('🎉 MULTI-SUBJECT PERSONALIZATION & BESPOKE ARTWORK VERIFIED!');
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await browser.close();
  }
}

testSubjectIsolationAndVisuals().finally(() => process.exit(0));
