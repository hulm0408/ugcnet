import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { getActiveSubjectServer } from '@/lib/subjectContext';
import { generatePersonalizedVisualPage } from '@/lib/visualStudioEngine';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const subjectParam = searchParams.get('subject');

    const activeSubject = await getActiveSubjectServer();
    const subjectId = subjectParam || activeSubject.id;

    const projects = await prisma.visualLearningProject.findMany({
      where: {
        user_id: session.user.id,
        ...(subjectId ? { subject_id: subjectId } : {}),
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

    return NextResponse.json({ projects, activeSubject });
  } catch (error) {
    console.error('[API /studio/projects GET] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, academicLevel, visualTheme, topicPrompt } = body;

    const activeSubject = await getActiveSubjectServer();

    // 1. Create Project
    const project = await prisma.visualLearningProject.create({
      data: {
        user_id: session.user.id,
        subject_id: activeSubject.id,
        title: title || `${activeSubject.name} Visual Learning Atlas`,
        description: description || `Personalized visual learning journey for UGC NET ${activeSubject.name}`,
        academic_level: academicLevel || 'JRF_ASPIRANT',
        visual_theme: visualTheme || 'ACADEMIC_CLEAN',
        entity_index: [],
      },
    });

    // 2. Automatically Author Initial Plate 01
    const initialPageData = await generatePersonalizedVisualPage({
      subject: activeSubject,
      projectTitle: project.title,
      topicPrompt: topicPrompt || project.title,
      academicLevel: project.academic_level as any,
      visualTheme: project.visual_theme,
      previousPages: [],
      entityIndex: [],
    });

    const initialPage = await prisma.visualLearningPage.create({
      data: {
        project_id: project.id,
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

    // 3. Update entity index
    await prisma.visualLearningProject.update({
      where: { id: project.id },
      data: { entity_index: initialPageData.newEntities },
    });

    return NextResponse.json({
      success: true,
      project: {
        ...project,
        pages: [initialPage],
        subject: activeSubject,
      },
    });
  } catch (error) {
    console.error('[API /studio/projects POST] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
