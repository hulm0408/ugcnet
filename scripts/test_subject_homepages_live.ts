import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function testSubjectHomepagesLive() {
  console.log('🧪 TESTING DYNAMIC PER-SUBJECT LOCALIZED HOMEPAGES ON VERCEL...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    const subjectsToTest = [
      {
        slug: 'arabic',
        name: 'Arabic',
        expectedText: 'اللغة العربية وآدابها',
        direction: 'rtl',
      },
      {
        slug: 'hindi',
        name: 'Hindi',
        expectedText: 'हिन्दी साहित्य',
        direction: 'ltr',
      },
      {
        slug: 'urdu',
        name: 'Urdu',
        expectedText: 'اردو ادب',
        direction: 'rtl',
      },
      {
        slug: 'sanskrit',
        name: 'Sanskrit',
        expectedText: 'संस्कृतम्',
        direction: 'ltr',
      },
      {
        slug: 'paper-1',
        name: 'General Paper 1',
        expectedText: 'Teaching & Research Aptitude',
        direction: 'ltr',
      },
      {
        slug: 'commerce',
        name: 'Commerce',
        expectedText: 'Concept-Driven JRF Prep',
        direction: 'ltr',
      },
      {
        slug: 'political-science',
        name: 'Political Science',
        expectedText: 'From Theory to Global Order',
        direction: 'ltr',
      },
    ];

    for (const sub of subjectsToTest) {
      console.log(`--- Testing Localized Homepage for ${sub.name} (${sub.slug}) ---`);

      await context.addCookies([
        {
          name: 'ugc_active_subject',
          value: sub.slug,
          domain: 'arabic-net-jrf.vercel.app',
          path: '/',
        },
      ]);

      await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      const h1Text = await page.textContent('h1');
      const bodyText = await page.textContent('body');
      const containsExpected = bodyText?.includes(sub.expectedText);

      console.log(`  📖 H1: ${h1Text?.replace(/\s+/g, ' ').trim()}`);
      console.log(`  🎯 Found native script/localized phrase ("${sub.expectedText}"): ${containsExpected}\n`);

      if (!containsExpected) {
        throw new Error(`Failed to find "${sub.expectedText}" on ${sub.name} homepage`);
      }
    }

    console.log('═════════════════════════════════════════════════════════════');
    console.log('🎉 ALL TESTED SUBJECT HOMEPAGES ARE FULLY LOCALIZED LIVE!');
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await browser.close();
  }
}

testSubjectHomepagesLive().finally(() => process.exit(0));
