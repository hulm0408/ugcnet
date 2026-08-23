'use server';

import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter both email and password.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
    return { error: null }; // Should redirect, not return here on success
  } catch (error) {
    console.error("LOGIN ACTION ERROR:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials. Please try again.' };
        default:
          return { error: `Authentication error: ${error.type}` };
      }
    }
    throw error; // This is necessary for redirects to work in Next.js
  }
}

export async function signupAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || password.length < 8) {
    return { error: 'Please provide a valid email and a password of at least 8 characters.' };
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    
    if (existing) {
      return { error: 'An account with this email already exists.' };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'USER',
        emailVerified: new Date(),
      },
    });

  } catch (err) {
    console.error("Signup Database Error:", err);
    return { error: 'Failed to create account. Please try again later.' };
  }

  // After successful creation, log them in
  try {
    await signIn('credentials', {
      email: normalizedEmail,
      password,
      redirectTo: '/dashboard',
    });
    return { error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Account created, but automatic login failed. Please log in manually.' };
    }
    throw error;
  }
}

export async function googleSignInAction() {
  await signIn('google', { redirectTo: '/dashboard' });
}

export async function logoutAction() {
  await signOut({ redirectTo: '/' });
}
