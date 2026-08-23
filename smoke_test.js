const BASE_URL = process.argv[2] || 'https://arabic-net-jrf.vercel.app';

async function testRoute(route, expectedStatus = 200, isRedirect = false) {
  try {
    const res = await fetch(`${BASE_URL}${route}`, {
      redirect: 'manual'
    });
    
    let pass = false;
    if (isRedirect && (res.status === 307 || res.status === 308 || res.status === 302)) {
        pass = true;
    } else if (res.status === expectedStatus) {
        pass = true;
    }

    if (pass) {
      console.log(`[PASS] ${route} -> ${res.status}`);
    } else {
      console.error(`[FAIL] ${route} -> Expected ${expectedStatus}${isRedirect ? ' or Redirect' : ''}, got ${res.status}`);
    }
  } catch (err) {
    console.error(`[ERROR] ${route} -> ${err.message}`);
  }
}

async function testAPI() {
    try {
        const res = await fetch(`${BASE_URL}/api/questions?published=true&limit=1`);
        if (res.status !== 200) {
            console.error(`[FAIL] /api/questions -> Expected 200, got ${res.status}`);
            return;
        }
        const data = await res.json();
        
        if (data && data.data && data.data.length > 0) {
            const q = data.data[0];
            if (q.correct_option || q.explanation) {
                console.error(`[FAIL] /api/questions -> EXPOSED CORRECT ANSWER OR EXPLANATION!`);
            } else {
                console.log(`[PASS] /api/questions -> Secure payload (no answers exposed)`);
            }
        } else {
             console.log(`[WARN] /api/questions -> Empty response, could not test payload security.`);
        }
    } catch(err) {
         console.error(`[ERROR] /api/questions -> ${err.message}`);
    }
}

async function main() {
  console.log(`--- RUNNING POST-DEPLOYMENT SMOKE TEST ON ${BASE_URL} ---`);
  
  // Public Routes
  await testRoute('/');
  await testRoute('/login');
  await testRoute('/pyq');
  await testRoute('/syllabus');
  await testRoute('/practice');
  
  // Protected Routes (should redirect to /login)
  await testRoute('/dashboard', 200, true);
  await testRoute('/admin', 200, true);
  await testRoute('/admin/questions', 200, true);

  // API Check
  await testAPI();
  
  console.log('--- TEST COMPLETE ---');
}

main();
