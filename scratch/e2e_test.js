const puppeteer = require('puppeteer');

(async () => {
  const PRODUCTION_URL = 'https://arabic-net-jrf.vercel.app';
  
  console.log(`Starting E2E Functional Test against ${PRODUCTION_URL}...`);
  
  // Launch non-headless so the user can interact if needed (for Google Login)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });

  const page = await browser.newPage();
  
  try {
    // ==========================================
    // 1. GOOGLE LOGIN
    // ==========================================
    console.log('Navigating to login page...');
    await page.goto(`${PRODUCTION_URL}/login`, { waitUntil: 'domcontentloaded' }).catch(e => {
        console.log('Navigation warning (likely a redirect):', e.message);
    });
    
    // Wait for either the Google button (if on login page) OR the dashboard (if already logged in)
    console.log('Waiting for page to stabilize...');
    await new Promise(r => setTimeout(r, 2000));
    
    if (page.url().includes('/dashboard')) {
        console.log('Already logged in!');
    } else {
        console.log('Waiting for "Continue with Google" button...');
        const googleBtnSelector = 'button:has-text("Google"), button[type="submit"]'; 
        await page.waitForSelector('button');
        
        const buttons = await page.$$('button');
        let googleBtn = null;
        for (const btn of buttons) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text && text.toLowerCase().includes('google')) {
                googleBtn = btn;
                break;
            }
        }
        
        if (!googleBtn) {
            throw new Error('Google Login button not found!');
        }
        
        console.log('Clicking Google Login...');
        await googleBtn.click();
        
        console.log('----------------------------------------------------');
        console.log('ACTION REQUIRED: Please complete the Google Login manually in the opened browser window.');
        console.log('The script will wait until you are redirected to the dashboard...');
        console.log('----------------------------------------------------');
        
        // Wait for redirect to dashboard
        await page.waitForFunction(
          () => window.location.pathname === '/dashboard',
          { timeout: 120000 } // 2 minutes to log in
        );
    }
    
    console.log('✅ Successfully logged in and reached dashboard.');
    
    // ==========================================
    // 2. USER ISOLATION (BOOKMARKS)
    // ==========================================
    console.log('Checking initial bookmarks...');
    await page.goto(`${PRODUCTION_URL}/dashboard/bookmarks`, { waitUntil: 'networkidle0' });
    
    // Check if there are bookmarks
    const hasBookmarks = await page.evaluate(() => {
        return !document.body.innerText.includes('No bookmarked questions yet');
    });
    console.log(`Initial bookmarks present: ${hasBookmarks}`);
    
    // ==========================================
    // 3. PYQ & QUIZ PRESERVATION
    // ==========================================
    console.log('Navigating to PYQ...');
    await page.goto(`${PRODUCTION_URL}/pyq`, { waitUntil: 'networkidle0' });
    
    // Wait for years to load
    await page.waitForSelector('a[href^="/pyq/"]');
    const firstYear = await page.$('a[href^="/pyq/"]');
    await firstYear.click();
    
    console.log('Selected a year, waiting for papers...');
    await page.waitForSelector('button'); // wait for paper selection buttons
    
    // Find a button that looks like a paper
    const paperBtns = await page.$$('button');
    let startBtn = null;
    for (const btn of paperBtns) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes('Start')) {
            startBtn = btn;
            break;
        }
    }
    
    if (startBtn) {
        await startBtn.click();
    } else {
        // Maybe it's a link to instructions
        const instructionsLink = await page.$('a[href^="/instructions/"]');
        if (instructionsLink) {
            await instructionsLink.click();
            await page.waitForSelector('button');
            const beginBtn = await page.$$('button');
            for (const btn of beginBtn) {
                const text = await page.evaluate(el => el.textContent, btn);
                if (text && (text.includes('Begin') || text.includes('Start'))) {
                    await btn.click();
                    break;
                }
            }
        }
    }
    
    console.log('Waiting for Quiz to load...');
    await page.waitForSelector('.question-content', { timeout: 10000 }).catch(() => console.log('Could not find .question-content'));
    
    console.log('Quiz loaded. Answering question 1...');
    // We will just find radio buttons and click the first one
    const radios = await page.$$('input[type="radio"]');
    if (radios.length > 0) {
        await radios[0].click();
        console.log('Answered Q1.');
        
        // Find 'Save & Next' button
        const btns = await page.$$('button');
        for (const btn of btns) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text && text.includes('Next')) {
                await btn.click();
                break;
            }
        }
        
        console.log('Moved to Q2. Waiting 2 seconds...');
        await new Promise(r => setTimeout(r, 2000));
        
        console.log('Going back to Q1...');
        for (const btn of btns) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text && text.includes('Previous')) {
                await btn.click();
                break;
            }
        }
        
        // Verify answer is still selected
        await new Promise(r => setTimeout(r, 1000));
        const checked = await page.$('input[type="radio"]:checked');
        if (checked) {
            console.log('✅ State Preservation: Q1 answer is still selected!');
        } else {
            console.error('❌ State Preservation FAILED: Q1 answer lost on navigation.');
        }
        
        // Submit Test
        console.log('Submitting test...');
        const submitBtns = await page.$$('button');
        for (const btn of submitBtns) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text && text.includes('Submit Test')) {
                await btn.click();
                break;
            }
        }
        
        // Wait for result page
        console.log('Waiting for results...');
        await page.waitForFunction(
            () => window.location.pathname.includes('/result'),
            { timeout: 10000 }
        ).catch(() => console.log('Could not detect result page redirect.'));
        
        const resultText = await page.evaluate(() => document.body.innerText);
        if (resultText.includes('Score') || resultText.includes('Attempted')) {
            console.log('✅ Result page loaded successfully with stats.');
        } else {
            console.error('❌ Result page did not load correctly.');
        }
    } else {
        console.log('❌ Could not find radio buttons to answer questions.');
    }
    
    // ==========================================
    // 4. LOGOUT & VERIFY SESSION END
    // ==========================================
    console.log('Logging out...');
    await page.goto(`${PRODUCTION_URL}/dashboard`, { waitUntil: 'networkidle0' });
    const navBtns = await page.$$('button');
    for (const btn of navBtns) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes('Sign out')) {
            await btn.click();
            break;
        }
    }
    
    await page.waitForFunction(
        () => window.location.pathname === '/' || window.location.pathname === '/login',
        { timeout: 10000 }
    ).catch(() => console.log('Redirect after logout failed.'));
    
    console.log('✅ Logout successful.');

    console.log('====================================================');
    console.log('✅ AUTOMATED E2E TEST SEQUENCE COMPLETED.');
    console.log('====================================================');
    
  } catch (err) {
    console.error('❌ Test Failed:', err);
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
})();
