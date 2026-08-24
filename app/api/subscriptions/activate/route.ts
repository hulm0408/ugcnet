import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const body = await request.json();
    const { subjectId, planId } = body;

    if (!subjectId || !planId) {
      return NextResponse.json({ error: 'Missing subjectId or planId' }, { status: 400 });
    }

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Invalid subscription plan' }, { status: 404 });
    }

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      return NextResponse.json({ error: 'Invalid subject' }, { status: 404 });
    }

    // Calculate expiry date
    const startsAt = new Date();
    const expiresAt = new Date(Date.now() + plan.duration_days * 24 * 60 * 60 * 1000);

    // Create or renew UserSubscription
    const subscription = await prisma.userSubscription.create({
      data: {
        user_id: session.user.id,
        plan_id: plan.id,
        subject_id: plan.plan_type === 'ALL_ACCESS' ? null : subject.id,
        status: 'ACTIVE',
        starts_at: startsAt,
        expires_at: expiresAt,
      },
    });

    // Update active subject for user
    await prisma.user.update({
      where: { id: session.user.id },
      data: { active_subject_id: subject.id },
    });

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        expires_at: subscription.expires_at,
        subject: subject.name,
      },
    });
  } catch (error) {
    console.error('[API /subscriptions/activate] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
