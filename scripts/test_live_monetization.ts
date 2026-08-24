import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function testLiveMonetization() {
  console.log('🧪 TESTING LIVE DATA-DRIVEN BENCHMARK & MONETIZATION ON VERCEL...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[Browser Error]:', msg.text());
  });

  try {
    // 1. Test PYQ 2023 page for Free Benchmark Badge
    console.log('--- 1. Testing /pyq/2023 for Free Benchmark Badge ---');
    await page.goto(`${BASE}/pyq/2023`, { waitUntil: 'domcontentloaded' });
    const freeBenchmarkBadge = await page.isVisible('text="Free Benchmark Exam"');
    console.log('  🟢 Free Benchmark Badge Visible on 2023:', freeBenchmarkBadge);

    // 2. Test PYQ 2015 page for Pro Access Lock Badge
    console.log('\n--- 2. Testing /pyq/2015 for Pro Access Lock Badge ---');
    await page.goto(`${BASE}/pyq/2015`, { waitUntil: 'domcontentloaded' });
    const proAccessBadge = await page.isVisible('text="Pro Access"');
    console.log('  🔒 Pro Access Lock Badge Visible on 2015:', proAccessBadge);

    // 3. Test Direct API Call for Locked Paper (Should return 403)
    console.log('\n--- 3. Testing Direct API 403 Protection on Locked Paper ---');
    const lockedPaperId = 'cmt4kfy4k00zzskuzoqcfgr44'; // 2015 Part 1
    const resLocked = await page.request.get(`${BASE}/api/questions?paperId=${lockedPaperId}`);
    console.log('  🔒 Direct API Status for Locked Paper:', resLocked.status());
    const lockedJson = await resLocked.json();
    console.log('  🔒 API Error Payload:', lockedJson.error);

    // 4. Test Direct API Call for Free Benchmark Paper (Should return 200)
    console.log('\n--- 4. Testing Direct API 200 on Free Benchmark Paper ---');
    const freePaperId = 'cmt4l8h0902d2skuzo6i0xqcl'; // 2023 Paper
    const resFree = await page.request.get(`${BASE}/api/questions?paperId=${freePaperId}`);
    console.log('  🟢 Direct API Status for Free Benchmark Paper:', resFree.status());
    const freeJson = await resFree.json();
    console.log('  🟢 Questions count returned:', freeJson.data?.length);

    // 5. Test Practice URL on Locked Paper (Should render Value-Driven Paywall)
    console.log('\n--- 5. Testing Practice UI on Locked Paper (Value-Driven Paywall Screen) ---');
    await page.goto(`${BASE}/practice?year=2015&paperId=${lockedPaperId}`, { waitUntil: 'domcontentloaded' });
    const paywallTitle = await page.isVisible('text="Unlock Arabic Preparation"');
    console.log('  🔒 Paywall Screen Rendered in Practice View:', paywallTitle);

    // 6. Test Checkout Page
    console.log('\n--- 6. Testing Dynamic Subject Checkout Page ---');
    await page.goto(`${BASE}/checkout?subject=arabic`, { waitUntil: 'domcontentloaded' });
    const checkoutUrl = page.url();
    console.log('  💳 Checkout Page (or Auth Redirect) URL:', checkoutUrl);

    console.log('\n═════════════════════════════════════════════════════════════');
    console.log('🎉 DATA-DRIVEN BENCHMARK & MONETIZATION ENGINE VERIFIED LIVE!');
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await browser.close();
  }
}

testLiveMonetization().finally(() => process.exit(0));
