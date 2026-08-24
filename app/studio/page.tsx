import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import { generatePersonalizedVisualPage } from '@/lib/visualStudioEngine';
import VisualStudioWorkspace from '@/components/studio/VisualStudioWorkspace';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const activeSubject = await getActiveSubjectServer();
  return {
    title: `${activeSubject.name} Personalized Visual Learning Studio — UGC NET / JRF`,
    description: `Your personal learning world for UGC NET ${activeSubject.name}. Dynamic vector maps, timelines, conceptual frameworks, and interactive thinking spaces.`,
  };
}

export default async function VisualStudioPage() {
  const session = await auth();
  const activeSubject = await getActiveSubjectServer();

  // For seamless trial & exploration, if not logged in redirect to login or demo
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/studio');
  }

  // Fetch or auto-initialize user's project for this subject
  let projects = await prisma.visualLearningProject.findMany({
    where: {
      user_id: session.user.id,
      subject_id: activeSubject.id,
    },
    include: {
      subject: {
        select: { id: true, code: true, slug: true, name: true, name_native: true, direction: true },
      },
      pages: {
        orderBy: { page_number: 'asc' },
      },
    },
    orderBy: { updated_at: 'desc' },
  });

  // Auto-initialize first personalized project if none exists yet
  if (projects.length === 0) {
    const newProject = await prisma.visualLearningProject.create({
      data: {
        user_id: session.user.id,
        subject_id: activeSubject.id,
        title: `${activeSubject.name} Core Preparation Atlas`,
        description: `Bespoke visual learning path for UGC NET ${activeSubject.name}`,
        academic_level: 'JRF_ASPIRANT',
        visual_theme: 'ACADEMIC_CLEAN',
        entity_index: [],
      },
    });

    const initialPageData = await generatePersonalizedVisualPage({
      subject: activeSubject,
      projectTitle: newProject.title,
      academicLevel: newProject.academic_level as any,
      visualTheme: newProject.visual_theme,
      previousPages: [],
      entityIndex: [],
    });

    const initialPage = await prisma.visualLearningPage.create({
      data: {
        project_id: newProject.id,
        page_number: 1,
        title: initialPageData.title,
        concept_target: initialPageData.concept_target,
        visual_format: initialPageData.visual_format,
        page_purpose: initialPageData.page_purpose,
        visual_argument: initialPageData.visual_argument,
        user_action_prompt: initialPageData.user_action_prompt,
        memory_target: initialPageData.memory_target,
        difficulty_level: initialPageData.difficulty_level,
        svg_content: initialPageData.svg_content,
        content_payload: initialPageData.content_payload,
        thinking_space_title: initialPageData.thinking_space_title,
        thinking_space_prompt: initialPageData.thinking_space_prompt,
      },
    });

    await prisma.visualLearningProject.update({
      where: { id: newProject.id },
      data: { entity_index: initialPageData.newEntities },
    });

    projects = [
      {
        ...newProject,
        subject: activeSubject,
        pages: [initialPage],
      },
    ];
  }

  return (
    <VisualStudioWorkspace
      initialProjects={projects as any}
      activeSubject={activeSubject}
    />
  );
}
