'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function checkAdmin() {
  const session = await auth();
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    throw new Error('Unauthorized');
  }
  return session.user;
}

export async function updateSyllabusUnit(id: string, data: { name_arabic: string, name_english: string, is_active: boolean }) {
  await checkAdmin();
  await prisma.syllabusUnit.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/syllabus');
  revalidatePath('/syllabus');
}

export async function updateBroadTopic(id: string, data: { name_arabic: string, name_english: string, is_active: boolean }) {
  await checkAdmin();
  await prisma.broadTopic.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/syllabus');
  revalidatePath('/syllabus');
}

export async function updateSubtopic(id: string, data: { name_arabic: string, name_english: string, is_active: boolean }) {
  await checkAdmin();
  await prisma.subtopic.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/syllabus');
  revalidatePath('/syllabus');
}

export async function updateSiteSetting(key: string, value: any) {
  const user = await checkAdmin();
  
  await prisma.siteSetting.upsert({
    where: { key },
    update: {
      value,
      updated_by: user.id,
    },
    create: {
      key,
      value,
      updated_by: user.id,
    },
  });
  
  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout');
}
