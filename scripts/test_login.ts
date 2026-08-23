import { signIn } from '@/lib/auth';

async function testLogin() {
  try {
    await signIn('credentials', { email: 'admin@test.com', password: 'password123', redirect: false });
    console.log("Success");
  } catch (e) {
    console.error("Login Error:", e);
  }
}

testLogin();
