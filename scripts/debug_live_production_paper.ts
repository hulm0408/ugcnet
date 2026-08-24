import { chromium } from 'playwright';

async function main() {
  console.log('🔍 INVESTIGATING LIVE PRODUCTION URL...');
  const targetUrl = 'https://arabic-net-jrf.vercel.app/practice?year=2015&paperId=cmt4kfy4k00zzskuzoqcfgr44&paperTitle=NET%20JRF%20Arabic%202015%20Part%201';
  console.log('Target URL:', targetUrl);

  // 1. Test direct API call against production
  console.log('\n--- 1. Testing Production API directly ---');
  const apiUrl = 'https://arabic-net-jrf.vercel.app/api/questions?published=true&limit=250&paperId=cmt4kfy4k00zzskuzoqcfgr44';
  try {
    const apiRes = await fetch(apiUrl);
    console.log('API Status:', apiRes.status);
    const apiJson = await apiRes.json();
    console.log('API Response Meta:', apiJson.meta);
    console.log('API Question Count:', apiJson.data?.length);
    if (apiJson.data?.length > 0) {
      console.log('First Question Arabic:', apiJson.data[0].question_arabic?.substring(0, 60));
      console.log('First Question Paper ID:', apiJson.data[0].exam_paper?.id);
    }
  } catch (err: any) {
    console.error('API Direct Fetch Error:', err.message);
  }

  // 2. Test Live Browser Interaction
  console.log('\n--- 2. Testing Live Browser with Playwright ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // Listen to network requests & console
  page.on('console', (msg) => console.log(`[Browser Console ${msg.type()}]:`, msg.text()));
  page.on('pageerror', (err) => console.error('[Browser Uncaught Error]:', err.message));
  page.on('response', async (resp) => {
    if (resp.url().includes('/api/')) {
      console.log(`[Network Response] ${resp.status()} ${resp.url()}`);
    }
  });

  try {
    const resp = await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page HTTP Status:', resp?.status());

    await page.waitForTimeout(3000);

    const title = await page.title();
    console.log('Page Title:', title);

    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('\n--- Visible Text on Screen (first 600 chars) ---');
    console.log(bodyText.substring(0, 600));

    // Check specific elements
    const isQuestionVisible = await page.isVisible('[dir="rtl"]');
    console.log('\nisQuestionVisible (RTL element):', isQuestionVisible);

    const buttons = await page.$$eval('button', (btns) => btns.map((b) => b.innerText));
    console.log('Rendered Buttons:', buttons);
  } catch (err: any) {
    console.error('Browser Test Error:', err.message);
  } finally {
    await browser.close();
  }
}

main().finally(() => process.exit(0));
