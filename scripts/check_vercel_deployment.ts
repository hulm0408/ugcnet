async function testProductionPapers() {
  console.log('Testing Production API with various queries...\n');

  const testUrls = [
    // 1. Total questions count
    'https://arabic-net-jrf.vercel.app/api/questions?published=true&limit=5',
    // 2. Paper 2004 Part 1
    'https://arabic-net-jrf.vercel.app/api/questions?published=true&limit=5&year=2004',
    // 3. Exact paperId 2015 Part 1
    'https://arabic-net-jrf.vercel.app/api/questions?published=true&limit=5&paperId=cmt4kfy4k00zzskuzoqcfgr44',
    // 4. Year 2015
    'https://arabic-net-jrf.vercel.app/api/questions?published=true&limit=5&year=2015',
    // 5. Unit 1
    'https://arabic-net-jrf.vercel.app/api/questions?published=true&limit=5&unit=1',
  ];

  for (const url of testUrls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      const json = await res.json();
      console.log(`URL: ${url}`);
      console.log(` -> Status: ${res.status}, Total: ${json.meta?.total}, Returned: ${json.data?.length}`);
      if (json.data?.length > 0) {
        console.log(`    Sample Q: ${json.data[0].question_arabic?.substring(0, 50)}...`);
        console.log(`    Exam Paper: ${JSON.stringify(json.data[0].exam_paper)}`);
      }
      console.log('');
    } catch (e: any) {
      console.error(`URL: ${url} Failed:`, e.message);
    }
  }
}

testProductionPapers().finally(() => process.exit(0));
