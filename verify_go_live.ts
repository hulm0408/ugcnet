import fs from 'fs';

async function verify() {
  const baseUrl = 'http://localhost:3001';
  let passed = true;
  
  console.log('--- STARTING VERIFICATION ---\n');

  // 1. Verify unauthorized users cannot access protected routes
  console.log('1. Checking protected routes for unauthorized users...');
  const protectedRoutes = ['/dashboard', '/practice', '/admin', '/admin/users'];
  for (const route of protectedRoutes) {
    const res = await fetch(`${baseUrl}${route}`, { redirect: 'manual' });
    if (res.status === 307 || res.status === 302 || res.status === 308) {
      const loc = res.headers.get('location');
      if (loc && loc.includes('/login')) {
        console.log(`[PASS] ${route} correctly redirects to login.`);
      } else {
        console.log(`[FAIL] ${route} redirected to ${loc} instead of login.`);
        passed = false;
      }
    } else {
      console.log(`[FAIL] ${route} returned status ${res.status} for unauth user.`);
      passed = false;
    }
  }
  console.log('');

  // 2. Verify API security
  console.log('2. Checking API security (Question Payload)...');
  const apiRes = await fetch(`${baseUrl}/api/questions?limit=1`);
  if (apiRes.ok) {
    const json = await apiRes.json();
    const q = json.data[0];
    if (q) {
      if (q.correct_option || q.correct_option_generated || q.explanation) {
        console.log('[FAIL] API exposed correct_option or explanation!');
        passed = false;
      } else {
        console.log('[PASS] API properly omitted correct_option and explanation.');
      }
    } else {
      console.log('[WARN] No questions returned to test payload.');
    }
  } else {
    console.log(`[FAIL] API returned status ${apiRes.status}`);
    passed = false;
  }
  console.log('');

  // 3. Verify public pages load
  console.log('3. Checking public pages (Home, Login)...');
  const publicPages = ['/', '/login', '/signup'];
  for (const page of publicPages) {
    const res = await fetch(`${baseUrl}${page}`);
    if (res.ok) {
      console.log(`[PASS] ${page} loads correctly (200).`);
    } else {
      console.log(`[FAIL] ${page} returned status ${res.status}.`);
      passed = false;
    }
  }
  console.log('');
  
  if (passed) {
    console.log('ALL CHECKS PASSED.');
  } else {
    console.log('SOME CHECKS FAILED.');
  }
}

verify().catch(console.error);
