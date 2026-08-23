import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

async function testAuth() {
  try {
    await signIn('credentials', { email: 'admin@test.com', password: 'password123', redirect: false });
    console.log("LOGIN SUCCESSFUL!");
  } catch (err) {
    if (err instanceof AuthError) {
      console.log("AUTH ERROR CAUGHT:", err.type);
    } else {
      console.log("OTHER ERROR:", err);
    }
  }
}

testAuth();
