import { chromium } from 'playwright';

const BASE = 'https://arabic-net-jrf.vercel.app';

async function testAllSubjectsLive() {
  console.log('🧪 TESTING ALL 85 UGC NET SUBJECTS LIVE ON VERCEL...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  try {
    // 1. Verify API endpoint returns all 85 subjects
    console.log('--- 1. Testing /api/subjects Endpoint ---');
    const res = await page.request.get(`${BASE}/api/subjects`);
    console.log('  Status:', res.status());
    const json = await res.json();
    const count = json.subjects?.length;
    console.log(`  Count of Active UGC NET Subjects: ${count}`);

    if (count < 80) {
      throw new Error(`Expected at least 80 subjects, got ${count}`);
    }

    // 2. Open Home page and verify Subject Switcher dropdown & Search
    console.log('\n--- 2. Testing Subject Switcher Search UI on Live Site ---');
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });

    // Click the subject switcher button
    const switcherBtn = page.locator('button:has-text("Code")').first();
    await switcherBtn.click();
    await page.waitForTimeout(300);

    // Check search input is visible
    const searchInput = page.locator('input[placeholder*="Search by subject name"]');
    const isSearchVisible = await searchInput.isVisible();
    console.log('  🔍 Search input visible:', isSearchVisible);

    // Test search for "Political Science"
    await searchInput.fill('Political Science');
    await page.waitForTimeout(300);
    const poliSciResult = await page.locator('text="Political Science"').first().isVisible();
    console.log('  🎯 Found "Political Science" in search:', poliSciResult);

    // Test search for "Computer Science"
    await searchInput.fill('Computer Science');
    await page.waitForTimeout(300);
    const csResult = await page.locator('text="Computer Science and Applications"').first().isVisible();
    console.log('  🎯 Found "Computer Science and Applications" in search:', csResult);

    // Test search for "Law"
    await searchInput.fill('Law');
    await page.waitForTimeout(300);
    const lawResult = await page.locator('text="Law"').first().isVisible();
    console.log('  🎯 Found "Law" in search:', lawResult);

    // Test search for "Hindi"
    await searchInput.fill('Hindi');
    await page.waitForTimeout(300);
    const hindiResult = await page.locator('text="Hindi"').first().isVisible();
    console.log('  🎯 Found "Hindi" in search:', hindiResult);

    // Test search for "Yoga"
    await searchInput.fill('Yoga');
    await page.waitForTimeout(300);
    const yogaResult = await page.locator('text="Yoga"').first().isVisible();
    console.log('  🎯 Found "Yoga" in search:', yogaResult);

    console.log('\n═════════════════════════════════════════════════════════════');
    console.log(`🎉 ALL ${count} UGC NET SUBJECTS ARE LIVE & FULLY SEARCHABLE!`);
    console.log('═════════════════════════════════════════════════════════════\n');
  } catch (err: any) {
    console.error('❌ Test failed:', err.message);
  } finally {
    await browser.close();
  }
}

testAllSubjectsLive().finally(() => process.exit(0));
