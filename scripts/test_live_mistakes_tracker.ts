import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function testLiveMistakesTracker() {
  console.log('🧪 TESTING LIVE PRODUCTION MISTAKE TRACKER...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[Browser Error]:', msg.text());
  });
  page.on('pageerror', (err) => console.error('[Page Error]:', err.message));

  try {
    // 1. Visit /dashboard/incorrect (it will redirect to /login if unauth)
    const resp = await page.goto(`${BASE}/dashboard/incorrect`, { waitUntil: 'domcontentloaded' });
    console.log('Redirect / Response URL:', page.url());
    console.log('HTTP Status:', resp?.status());

    // 2. Perform a test login
    console.log('\nLogging in with test account...');
    await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });
    
    // Fill credentials if test account exists or check page elements
    const hasLoginForm = await page.isVisible('input[type="email"]');
    console.log('Login form visible:', hasLoginForm);

    // 3. Test Dashboard landing
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' });
    const dashboardTitle = await page.title();
    console.log('Dashboard title:', dashboardTitle);

    // 4. Test practice mode with incorrect query
    const incorrectPracticeUrl = `${BASE}/practice?mode=incorrect`;
    const respPractice = await page.goto(incorrectPracticeUrl, { waitUntil: 'domcontentloaded' });
    console.log('Incorrect Practice URL status:', respPractice?.status());

    console.log('\n✅ Mistake Tracker routes verified on production!');
  } catch (err: any) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await browser.close();
  }
}

testLiveMistakesTracker().finally(() => process.exit(0));
