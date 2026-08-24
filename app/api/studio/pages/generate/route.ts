import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { generatePersonalizedVisualPage } from '@/lib/visualStudioEngine';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, topicPrompt } = body;

    if (!projectId) {
      return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
    }

    const project = await prisma.visualLearningProject.findUnique({
      where: { id: projectId },
      include: {
        subject: true,
        pages: {
          orderBy: { page_number: 'asc' },
        },
      },
    });

    if (!project || project.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 });
    }

    const subjectInfo = project.subject || {
      id: 'subj_arabic_code29',
      code: '29',
      slug: 'arabic',
      name: 'Arabic',
      name_native: 'اللغة العربية وآدابها',
      is_paper_1: false,
      direction: 'rtl' as const,
      primary_language: 'ar',
      secondary_language: 'en',
    };

    const existingEntities = Array.isArray(project.entity_index) ? (project.entity_index as string[]) : [];

    // Generate the personalized next page in sequence
    const generatedData = await generatePersonalizedVisualPage({
      subject: {
        ...subjectInfo,
        direction: subjectInfo.direction === 'rtl' ? 'rtl' : 'ltr',
      },
      projectTitle: project.title,
      topicPrompt: topicPrompt || `Next Chapter on ${project.title}`,
      academicLevel: project.academic_level as any,
      visualTheme: project.visual_theme,
      previousPages: project.pages.map((p) => ({
        page_number: p.page_number,
        title: p.title,
        concept_target: p.concept_target,
        visual_format: p.visual_format,
        memory_target: p.memory_target,
      })),
      entityIndex: existingEntities,
    });

    const newPage = await prisma.visualLearningPage.create({
      data: {
        project_id: project.id,
        page_number: generatedData.page_number,
        title: generatedData.title,
        concept_target: generatedData.concept_target,
        visual_format: generatedData.visual_format,
        page_purpose: generatedData.page_purpose,
        visual_argument: generatedData.visual_argument,
        user_action_prompt: generatedData.user_action_prompt,
        memory_target: generatedData.memory_target,
        difficulty_level: generatedData.difficulty_level,
        svg_content: generatedData.svg_content,
        content_payload: generatedData.content_payload,
        thinking_space_title: generatedData.thinking_space_title,
        thinking_space_prompt: generatedData.thinking_space_prompt,
      },
    });

    // Update Project with new entities
    const updatedEntityIndex = Array.from(new Set([...existingEntities, ...generatedData.newEntities]));
    await prisma.visualLearningProject.update({
      where: { id: project.id },
      data: {
        entity_index: updatedEntityIndex,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      page: newPage,
    });
  } catch (error) {
    console.error('[API /studio/pages/generate] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
