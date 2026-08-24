import { chromium } from 'playwright';

async function screenshotLive() {
  const url = 'https://arabic-net-jrf.vercel.app/practice?year=2015&paperId=cmt4kfy4k00zzskuzoqcfgr44&paperTitle=NET%20JRF%20Arabic%202015%20Part%201';
  console.log('Fetching:', url);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('console', (msg) => console.log(`[Browser Console ${msg.type()}]:`, msg.text()));
  page.on('pageerror', (err) => console.error('[Uncaught Browser Error]:', err));
  page.on('requestfailed', (req) => console.error(`[Request Failed]: ${req.url()} - ${req.failure()?.errorText}`));

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const html = await page.content();
  console.log('HTML length:', html.length);
  console.log('Body snippet:\n', html.substring(0, 1200));

  const rtlCount = await page.$$eval('[dir="rtl"]', (els) => els.length);
  console.log('Elements with dir="rtl":', rtlCount);

  const innerText = await page.evaluate(() => document.body.innerText);
  console.log('Body inner text:\n', innerText);

  await browser.close();
}

screenshotLive().finally(() => process.exit(0));
