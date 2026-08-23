import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic'; // Ensure this route is not cached statically

export async function GET() {
  const envStatus = {
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    AUTH_GOOGLE_ID: !!process.env.AUTH_GOOGLE_ID,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_SECRET: !!process.env.AUTH_GOOGLE_SECRET,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    AUTH_URL: !!process.env.AUTH_URL,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    DATABASE_URL: !!process.env.DATABASE_URL,
  };

  let dbConnection = 'Checking...';
  try {
    // Attempt a simple DB query
    const userCount = await prisma.user.count();
    dbConnection = `Connected successfully. Users count: ${userCount}`;
  } catch (error: any) {
    dbConnection = `Failed to connect: ${error.message}`;
  }

  return NextResponse.json({
    message: "NextAuth Environment Diagnosis",
    envVariablesPresent: envStatus,
    databaseStatus: dbConnection,
    authVersion: "Auth.js v5 (next-auth@beta)",
    suggestions: [
      !envStatus.AUTH_SECRET && !envStatus.NEXTAUTH_SECRET ? "Missing Secret! You MUST set AUTH_SECRET (or NEXTAUTH_SECRET) in Vercel." : "Secret is present.",
      !envStatus.AUTH_GOOGLE_ID && !envStatus.GOOGLE_CLIENT_ID ? "Missing Google Client ID! You MUST set AUTH_GOOGLE_ID (or GOOGLE_CLIENT_ID) in Vercel." : "Google Client ID is present.",
      !envStatus.AUTH_GOOGLE_SECRET && !envStatus.GOOGLE_CLIENT_SECRET ? "Missing Google Client Secret! You MUST set AUTH_GOOGLE_SECRET (or GOOGLE_CLIENT_SECRET) in Vercel." : "Google Client Secret is present.",
      !envStatus.DATABASE_URL ? "Missing DATABASE_URL! Prisma cannot connect to the database." : "DATABASE_URL is present.",
    ]
  });
}
