import { SubjectInfo } from './subjectContext';

export type VisualFormatType =
  | 'SVG_MAP'
  | 'CHRONOLOGY_TIMELINE'
  | 'PROCESS_FLOW'
  | 'COMPARISON_MATRIX'
  | 'HIERARCHY_TREE'
  | 'CAUSE_EFFECT'
  | 'ANNOTATED_ARTIFACT'
  | 'SPATIAL_INFOGRAPHIC'
  | 'SYNTHESIS_CANVAS';

export interface PageGenerationInput {
  subject: SubjectInfo;
  projectTitle: string;
  topicPrompt?: string;
  academicLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'JRF_ASPIRANT';
  visualTheme: string;
  previousPages: Array<{
    page_number: number;
    title: string;
    concept_target: string;
    visual_format: string;
    memory_target: string;
  }>;
  entityIndex: string[];
  userPreferredTerms?: string[];
}

export interface GeneratedVisualPage {
  page_number: number;
  title: string;
  concept_target: string;
  visual_format: VisualFormatType;
  page_purpose: string;
  visual_argument: string;
  user_action_prompt: string;
  memory_target: string;
  difficulty_level: string;
  svg_content: string;
  content_payload: any;
  thinking_space_title: string;
  thinking_space_prompt: string;
  newEntities: string[];
}

/**
 * Intelligent Pedagogical Logic:
 * Determines the next best visual structure based on what was already created
 */
export function determineNextVisualFormat(
  subject: SubjectInfo,
  pageIndex: number,
  topic: string,
  previousFormats: string[]
): VisualFormatType {
  const lastFormat = previousFormats[previousFormats.length - 1];

  // Subject-specific pedagogical flow
  if (subject.slug === 'arabic' || subject.slug === 'arab-culture-and-islamic-studies') {
    if (pageIndex === 1) return 'SVG_MAP'; // Foundation: Territorial & Tribal Geography
    if (pageIndex === 2) return 'CHRONOLOGY_TIMELINE'; // Diachronic Evolution
    if (pageIndex === 3) return 'ANNOTATED_ARTIFACT'; // Masterpiece Deconstruction
    if (pageIndex === 4) return 'COMPARISON_MATRIX'; // Schools / Movements Comparison
    if (pageIndex === 5) return 'SYNTHESIS_CANVAS'; // Intellectual Synthesis
  }

  if (subject.slug === 'paper-1') {
    if (pageIndex === 1) return 'PROCESS_FLOW'; // Research/Teaching Framework
    if (pageIndex === 2) return 'COMPARISON_MATRIX'; // Quantitative vs Qualitative / Syllogism Modes
    if (pageIndex === 3) return 'CAUSE_EFFECT'; // Environmental Protocols / Policy Cascades
    if (pageIndex === 4) return 'HIERARCHY_TREE'; // Higher Education Governance
    if (pageIndex === 5) return 'SYNTHESIS_CANVAS';
  }

  if (subject.slug === 'english' || subject.slug === 'hindi' || subject.slug === 'urdu' || subject.slug === 'sanskrit') {
    if (pageIndex === 1) return 'CHRONOLOGY_TIMELINE'; // Epochs & Literary Movement
    if (pageIndex === 2) return 'COMPARISON_MATRIX'; // Thematic / Critical Theory Comparison
    if (pageIndex === 3) return 'ANNOTATED_ARTIFACT'; // Seminal Text Structure
    if (pageIndex === 4) return 'HIERARCHY_TREE'; // Genre / Dialectal Phylogeny
    if (pageIndex === 5) return 'SYNTHESIS_CANVAS';
  }

  if (subject.slug === 'commerce' || subject.slug === 'management') {
    if (pageIndex === 1) return 'PROCESS_FLOW'; // Capital Budgeting / Accounting Pipeline
    if (pageIndex === 2) return 'COMPARISON_MATRIX'; // Theories Comparison
    if (pageIndex === 3) return 'HIERARCHY_TREE'; // Banking / Regulatory Structure
    if (pageIndex === 4) return 'CAUSE_EFFECT'; // Fiscal / Monetary Policy Impact
    if (pageIndex === 5) return 'SYNTHESIS_CANVAS';
  }

  // General Adaptive Fallback: ensure no immediate format repetition
  const formatCycle: VisualFormatType[] = [
    'CHRONOLOGY_TIMELINE',
    'COMPARISON_MATRIX',
    'PROCESS_FLOW',
    'CAUSE_EFFECT',
    'HIERARCHY_TREE',
    'SPATIAL_INFOGRAPHIC',
    'SYNTHESIS_CANVAS',
  ];

  for (const fmt of formatCycle) {
    if (fmt !== lastFormat && !previousFormats.slice(-2).includes(fmt)) {
      return fmt;
    }
  }

  return 'SYNTHESIS_CANVAS';
}

/**
 * Generates an editable, clean, publication-grade SVG vector illustration
 */
export function generateSvgContent(
  format: VisualFormatType,
  subject: SubjectInfo,
  pageNumber: number,
  title: string,
  concept: string
): string {
  const isRtl = subject.direction === 'rtl';

  if (format === 'SVG_MAP') {
    return `
      <svg viewBox="0 0 900 520" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none font-sans">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0A1E18" />
            <stop offset="100%" stop-color="#040D0A" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Base Canvas -->
        <rect width="900" height="520" rx="24" fill="url(#bgGrad)" stroke="#134E3F" stroke-width="1.5" />

        <!-- Grid Lines for Academic Cartography -->
        <g stroke="#107A53" stroke-opacity="0.15" stroke-dasharray="4,4">
          <line x1="80" y1="40" x2="80" y2="480" />
          <line x1="240" y1="40" x2="240" y2="480" />
          <line x1="400" y1="40" x2="400" y2="480" />
          <line x1="560" y1="40" x2="560" y2="480" />
          <line x1="720" y1="40" x2="720" y2="480" />
          <line x1="40" y1="120" x2="860" y2="120" />
          <line x1="40" y1="240" x2="860" y2="240" />
          <line x1="40" y1="360" x2="860" y2="360" />
        </g>

        <!-- Header Information -->
        <text x="${isRtl ? 840 : 60}" y="65" text-anchor="${isRtl ? 'end' : 'start'}" fill="#34D399" font-size="11" font-weight="800" letter-spacing="2" font-family="monospace">
          PLATE 01 • GEOGRAPHIC & TERRITORIAL FOUNDATION
        </text>
        <text x="${isRtl ? 840 : 60}" y="95" text-anchor="${isRtl ? 'end' : 'start'}" fill="#FFFFFF" font-size="20" font-weight="900">
          ${title}
        </text>

        <!-- Interactive Map Contours (Hijaz, Najd, Levant, Mesopotamia, Yemen) -->
        <!-- Hijaz Region -->
        <path d="M 180 180 Q 240 160 290 220 T 260 340 T 170 320 Z" fill="#0D3B2E" stroke="#10B981" stroke-width="2" opacity="0.85" />
        <!-- Najd Region -->
        <path d="M 310 200 Q 450 180 480 280 T 360 380 T 280 300 Z" fill="#134E3F" stroke="#34D399" stroke-width="2" opacity="0.9" />
        <!-- Yemen Region -->
        <path d="M 220 370 Q 320 360 380 440 T 240 470 T 160 420 Z" fill="#0D3B2E" stroke="#10B981" stroke-width="2" opacity="0.85" />
        <!-- Levant Region -->
        <path d="M 280 120 Q 360 90 420 150 T 320 200 Z" fill="#166534" stroke="#4ADE80" stroke-width="2" opacity="0.85" />
        <!-- Mesopotamia -->
        <path d="M 440 130 Q 560 100 620 190 T 480 250 Z" fill="#14532D" stroke="#22C55E" stroke-width="2" opacity="0.85" />

        <!-- Key Capital / Intellectual Hub Nodes -->
        <!-- Node 1: Makkah / Ukaz -->
        <circle cx="210" cy="270" r="7" fill="#F59E0B" filter="url(#glow)" />
        <circle cx="210" cy="270" r="14" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="210" y="300" text-anchor="middle" fill="#FDE68A" font-size="12" font-weight="bold">سوق عكاظ (Souq Ukaz)</text>
        <text x="210" y="315" text-anchor="middle" fill="#9CA3AF" font-size="9">Poetic Recitations & Treaties</text>

        <!-- Node 2: Al-Hirah (Mesopotamia / Manadhira) -->
        <circle cx="530" cy="180" r="6" fill="#38BDF8" filter="url(#glow)" />
        <text x="530" y="160" text-anchor="middle" fill="#BAE6FD" font-size="12" font-weight="bold">الحيرة (Al-Hirah)</text>
        <text x="530" y="145" text-anchor="middle" fill="#9CA3AF" font-size="9">Lakhmids / Tarafa & An-Nabigha</text>

        <!-- Node 3: Ghassanids (Levant) -->
        <circle cx="340" cy="135" r="6" fill="#A855F7" filter="url(#glow)" />
        <text x="340" y="115" text-anchor="middle" fill="#E9D5FF" font-size="12" font-weight="bold">الغساسنة (Ghassanids)</text>
        <text x="340" y="100" text-anchor="middle" fill="#9CA3AF" font-size="9">Hassan ibn Thabit Patronage</text>

        <!-- Connection Trade & Literary Caravan Vectors -->
        <path d="M 210 270 Q 320 210 530 180" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6,4" />
        <path d="M 210 270 Q 260 190 340 135" fill="none" stroke="#A855F7" stroke-width="2" stroke-dasharray="6,4" />

        <!-- Legend Card (Bottom Right) -->
        <rect x="630" y="330" width="230" height="150" rx="16" fill="#061A14" stroke="#134E3F" stroke-width="1.5" />
        <text x="645" y="355" fill="#34D399" font-size="11" font-weight="900" uppercase="true" letter-spacing="1">CARTOGRAPHIC ANCHORS</text>
        <circle cx="650" cy="380" r="4" fill="#F59E0B" />
        <text x="665" y="384" fill="#E5E7EB" font-size="10" font-weight="600">Literary Hubs & Fairs</text>
        <circle cx="650" cy="405" r="4" fill="#38BDF8" />
        <text x="665" y="409" fill="#E5E7EB" font-size="10" font-weight="600">Lakhmid Kingdom (Al-Hirah)</text>
        <circle cx="650" cy="430" r="4" fill="#A855F7" />
        <text x="665" y="434" fill="#E5E7EB" font-size="10" font-weight="600">Ghassanid Dynasty (Levant)</text>
        <line x1="645" y1="455" x2="660" y2="455" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,2" />
        <text x="665" y="459" fill="#9CA3AF" font-size="9">Poetic & Caravan Routes</text>
      </svg>
    `;
  }

  if (format === 'CHRONOLOGY_TIMELINE') {
    return `
      <svg viewBox="0 0 900 520" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none font-sans">
        <defs>
          <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>
        </defs>
        <rect width="900" height="520" rx="24" fill="url(#bgGrad2)" stroke="#1E293B" stroke-width="1.5" />

        <text x="60" y="65" fill="#38BDF8" font-size="11" font-weight="800" letter-spacing="2" font-family="monospace">
          PLATE 02 • DIACHRONIC CHRONOLOGY & TURNING POINTS
        </text>
        <text x="60" y="95" fill="#FFFFFF" font-size="20" font-weight="900">
          ${title}
        </text>

        <!-- Main Timeline Spine -->
        <line x1="80" y1="260" x2="820" y2="260" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />

        <!-- Epoch 1 -->
        <circle cx="150" cy="260" r="10" fill="#38BDF8" stroke="#0F172A" stroke-width="3" />
        <line x1="150" y1="260" x2="150" y2="170" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3,3" />
        <rect x="90" y="120" width="120" height="48" rx="10" fill="#1E293B" stroke="#38BDF8" stroke-width="1" />
        <text x="150" y="142" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="bold">Pre-500 CE</text>
        <text x="150" y="157" text-anchor="middle" fill="#94A3B8" font-size="9">Genesis & Orality</text>

        <!-- Epoch 2 (Turning Point) -->
        <circle cx="340" cy="260" r="14" fill="#F59E0B" stroke="#0F172A" stroke-width="4" />
        <line x1="340" y1="260" x2="340" y2="350" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3,3" />
        <rect x="270" y="355" width="140" height="56" rx="10" fill="#1E293B" stroke="#F59E0B" stroke-width="1.5" />
        <text x="340" y="378" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="bold">500 – 622 CE</text>
        <text x="340" y="393" text-anchor="middle" fill="#FFFFFF" font-size="10">Mu'allaqat Compilation</text>
        <text x="340" y="405" text-anchor="middle" fill="#94A3B8" font-size="8">Imru' al-Qais & Tarafa</text>

        <!-- Epoch 3 -->
        <circle cx="530" cy="260" r="10" fill="#38BDF8" stroke="#0F172A" stroke-width="3" />
        <line x1="530" y1="260" x2="530" y2="170" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3,3" />
        <rect x="460" y="120" width="140" height="48" rx="10" fill="#1E293B" stroke="#38BDF8" stroke-width="1" />
        <text x="530" y="142" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="bold">622 – 661 CE</text>
        <text x="530" y="157" text-anchor="middle" fill="#94A3B8" font-size="9">Mukhadramun Transition</text>

        <!-- Epoch 4 -->
        <circle cx="730" cy="260" r="10" fill="#10B981" stroke="#0F172A" stroke-width="3" />
        <line x1="730" y1="260" x2="730" y2="350" stroke="#10B981" stroke-width="1.5" stroke-dasharray="3,3" />
        <rect x="660" y="355" width="140" height="52" rx="10" fill="#1E293B" stroke="#10B981" stroke-width="1" />
        <text x="730" y="378" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="bold">661 – 750 CE</text>
        <text x="730" y="393" text-anchor="middle" fill="#FFFFFF" font-size="10">Umayyad Urbanization</text>
      </svg>
    `;
  }

  // Default Comparison Matrix / Synthesis Layout
  return `
    <svg viewBox="0 0 900 520" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none font-sans">
      <defs>
        <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181B" />
          <stop offset="100%" stop-color="#09090B" />
        </linearGradient>
      </defs>
      <rect width="900" height="520" rx="24" fill="url(#bgGrad3)" stroke="#27272A" stroke-width="1.5" />

      <text x="60" y="65" fill="#A1A1AA" font-size="11" font-weight="800" letter-spacing="2" font-family="monospace">
        PLATE 0${pageNumber} • CONCEPTUAL SYNTHESIS MATRIX
      </text>
      <text x="60" y="95" fill="#FFFFFF" font-size="20" font-weight="900">
        ${title}
      </text>

      <!-- 3-Column Comparative Archetype Structure -->
      <g transform="translate(60, 130)">
        <!-- Col 1 -->
        <rect x="0" y="0" width="240" height="320" rx="16" fill="#27272A" stroke="#3F3F46" stroke-width="1" />
        <rect x="0" y="0" width="240" height="42" rx="16" fill="#3F3F46" />
        <text x="120" y="26" text-anchor="middle" fill="#FAFAFA" font-size="13" font-weight="bold">Primary Pillar</text>
        <circle cx="120" cy="80" r="24" fill="#059669" />
        <text x="120" y="85" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="bold">01</text>
        <text x="120" y="130" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="bold">Core Canonical Rules</text>
        <text x="120" y="155" text-anchor="middle" fill="#A1A1AA" font-size="10">Foundational axioms</text>
        <text x="120" y="175" text-anchor="middle" fill="#A1A1AA" font-size="10">and definitive terminology</text>
        <line x1="20" y1="210" x2="220" y2="210" stroke="#3F3F46" />
        <text x="120" y="240" text-anchor="middle" fill="#34D399" font-size="11" font-weight="bold">Key Exam Anchor</text>
        <text x="120" y="260" text-anchor="middle" fill="#E4E4E7" font-size="10">Memorize verbatim definition</text>
      </g>

      <g transform="translate(330, 130)">
        <!-- Col 2 (Focal Point) -->
        <rect x="0" y="0" width="240" height="320" rx="16" fill="#18181B" stroke="#059669" stroke-width="2" />
        <rect x="0" y="0" width="240" height="42" rx="16" fill="#059669" />
        <text x="120" y="26" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="bold">Comparative Core</text>
        <circle cx="120" cy="80" r="24" fill="#F59E0B" />
        <text x="120" y="85" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="bold">02</text>
        <text x="120" y="130" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="bold">Distinction & Contrast</text>
        <text x="120" y="155" text-anchor="middle" fill="#D4D4D8" font-size="10">Where NTA questions test</text>
        <text x="120" y="175" text-anchor="middle" fill="#D4D4D8" font-size="10">subtle boundary conditions</text>
        <line x1="20" y1="210" x2="220" y2="210" stroke="#27272A" />
        <text x="120" y="240" text-anchor="middle" fill="#FBBF24" font-size="11" font-weight="bold">Turning Point</text>
        <text x="120" y="260" text-anchor="middle" fill="#FAFAFA" font-size="10">Avoid common trap options</text>
      </g>

      <g transform="translate(600, 130)">
        <!-- Col 3 -->
        <rect x="0" y="0" width="240" height="320" rx="16" fill="#27272A" stroke="#3F3F46" stroke-width="1" />
        <rect x="0" y="0" width="240" height="42" rx="16" fill="#3F3F46" />
        <text x="120" y="26" text-anchor="middle" fill="#FAFAFA" font-size="13" font-weight="bold">Synthesis & Action</text>
        <circle cx="120" cy="80" r="24" fill="#3B82F6" />
        <text x="120" y="85" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="bold">03</text>
        <text x="120" y="130" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="bold">Long-Term Retention</text>
        <text x="120" y="155" text-anchor="middle" fill="#A1A1AA" font-size="10">Connect to your personal</text>
        <text x="120" y="175" text-anchor="middle" fill="#A1A1AA" font-size="10">thinking space notes</text>
        <line x1="20" y1="210" x2="220" y2="210" stroke="#3F3F46" />
        <text x="120" y="240" text-anchor="middle" fill="#60A5FA" font-size="11" font-weight="bold">Your Action</text>
        <text x="120" y="260" text-anchor="middle" fill="#E4E4E7" font-size="10">Formulate personal memory link</text>
      </g>
    </svg>
  `;
}

/**
 * Main Studio Engine:
 * Generates the complete authored page object ensuring zero repetition and full personalization
 */
export async function generatePersonalizedVisualPage(
  input: PageGenerationInput
): Promise<GeneratedVisualPage> {
  const nextPageIndex = input.previousPages.length + 1;
  const previousFormats = input.previousPages.map((p) => p.visual_format);

  const topic = input.topicPrompt || input.projectTitle || `${input.subject.name} Core Concept`;
  const format = determineNextVisualFormat(input.subject, nextPageIndex, topic, previousFormats);

  let title = '';
  let conceptTarget = '';
  let pagePurpose = '';
  let visualArgument = '';
  let userActionPrompt = '';
  let memoryTarget = '';
  let thinkingSpaceTitle = '';
  let thinkingSpacePrompt = '';
  let newEntities: string[] = [];

  // Subject-specific tailored pedagogical narratives
  if (input.subject.slug === 'arabic') {
    if (nextPageIndex === 1) {
      title = 'الجغرافيا القبلية وأسواق الأدب في العصر الجاهلي';
      conceptTarget = 'البيئة الجغرافية للقصيدة الجاهلية ومواطن القبائل وأسواقها الأدبية';
      pagePurpose = 'فهم الروابط المكانية بين مواطن الشعراء (نجد، الحجاز، الحيرة، غسان) ومواسم الإنشاد الأدبي';
      visualArgument = 'الخريطة الطبوغرافية الموجهة تتيح للمتعلم رؤية مسارات التجارة والشعر بدلاً من سرد الأسماء مجردة';
      userActionPrompt = 'حدد على الخريطة موقع سوق عكاظ والمسار الشعري الرابط بين امرئ القيس والحيرة';
      memoryTarget = 'عكاظ = الحجاز (مجمع المعلقات) • الحيرة = المناذرة (النابغة وطرفة) • غسان = الشام (حسان بن ثابت)';
      thinkingSpaceTitle = 'مساحة التأمل والربط الذهني الخاص بك';
      thinkingSpacePrompt = 'اكتب رابطك الذهني لتذكر أسماء شعراء المعلقات السبع ومواطنهم القبلية دون نسيان.';
      newEntities = ['Souq Ukaz', 'Al-Hirah', 'Ghassanids', 'Imru al-Qais', 'Tarafa'];
    } else if (nextPageIndex === 2) {
      title = 'الخط الزمني لتطور ديوان الشعر العربي';
      conceptTarget = 'التسلسل التاريخي من التدوين الشفهي إلى العصر الأموي';
      pagePurpose = 'إدراك فترات التحول الكبرى وأثر الانتقال من البادية إلى الحواضر الإسلامية';
      visualArgument = 'المخطط الزمني ثنائي المحور يربط الأحداث السياسية بنهضة الفنون الشعرية';
      userActionPrompt = 'قارن بين شعراء المخضرمين وشعراء العصر الأموي (جرير والفرزدق والأخطل)';
      memoryTarget = 'النقائض = جرير والفرزدق (العصر الأموي) • الغزل العذري = جميل بثينة ومجنون ليلى';
      thinkingSpaceTitle = 'مساحة تدوين الفروق الجوهرية';
      thinkingSpacePrompt = 'ما هو الفرق الجوهري الذي تلاحظه بين فن النقائض والغزل العذري في أسئلة الامتحانات السابقة؟';
      newEntities = ['Jarir', 'Al-Farazdaq', 'Al-Akhtal', 'Ghazal Udhri'];
    } else {
      title = `تحليل ونقد: ${topic}`;
      conceptTarget = `دراسة تحليلية عميقة لموضوع ${topic}`;
      pagePurpose = 'تثبيت الفروق الدقيقة والمصطلحات النقدية الأكثر تكراراً في اختبارات NET/JRF';
      visualArgument = 'مصفوفة التحليل المقارن تجمع بين التعريفات، الاستشهادات، والأخطاء الشائعة';
      userActionPrompt = 'استخرج الشاهد الشعري والمصطلح البلاغي المقابل';
      memoryTarget = `القاعدة المحورية لـ ${topic}`;
      thinkingSpaceTitle = 'ملاحظات الحفظ السريع الخاصة بك';
      thinkingSpacePrompt = 'سجل اختصارك الخاص لتذكر هذا المصطلح في ورقة الامتحان.';
      newEntities = [topic];
    }
  } else if (input.subject.slug === 'paper-1') {
    if (nextPageIndex === 1) {
      title = 'Research Methodology & Paradigms Pipeline';
      conceptTarget = 'Positivism vs Post-Positivism & Research Ethics Cascade';
      pagePurpose = 'Understand step-by-step thesis formulation, sampling techniques, and hypothesis testing';
      visualArgument = 'A sequential process pipeline visually demonstrates the non-negotiable flow of rigorous scientific inquiry';
      userActionPrompt = 'Trace the transition point between inductive reasoning and deductive hypothesis verification';
      memoryTarget = 'Positivism = Quantitative/Deductive • Post-Positivism = Qualitative/Constructivist';
      thinkingSpaceTitle = 'Your Research Concept Sandbox';
      thinkingSpacePrompt = 'Write a real-world example of Type I (Alpha) error vs Type II (Beta) error from your subject area.';
      newEntities = ['Positivism', 'Post-Positivism', 'Type I Error', 'Type II Error'];
    } else {
      title = `Paper 1 Mastery: ${topic}`;
      conceptTarget = `Analytical Framework for ${topic}`;
      pagePurpose = 'Solve tricky NTA assertion-reasoning questions with zero hesitation';
      visualArgument = 'Comparative matrix highlights common distractors and official answer paradigms';
      userActionPrompt = 'Evaluate the given premise against official NTA definitions';
      memoryTarget = `Core takeaway formula for ${topic}`;
      thinkingSpaceTitle = 'Your Shortcut & Formula Anchor';
      thinkingSpacePrompt = 'Summarize this rule in one concise mathematical or mnemonic sentence.';
      newEntities = [topic];
    }
  } else {
    // Dynamic Personalized Template for any of the other 83 subjects
    title = `${input.subject.name}: ${topic}`;
    conceptTarget = `Foundational Structure & Key Precedents of ${topic}`;
    pagePurpose = `Establish deep conceptual clarity on ${topic} tailored for ${input.academicLevel} preparation`;
    visualArgument = 'Vector-structured comparative matrix separates core axioms from high-yield examination edge-cases';
    userActionPrompt = `Observe the core relationships and formulate your personal memory connection for ${topic}`;
    memoryTarget = `Essential rule: ${topic} (UGC NET ${input.subject.name})`;
    thinkingSpaceTitle = 'Your Personal Concept & Memory Space';
    thinkingSpacePrompt = `What is the single most memorable connection or mnemonic you will use to recall ${topic}?`;
    newEntities = [topic];
  }

  const svgContent = generateSvgContent(format, input.subject, nextPageIndex, title, conceptTarget);

  return {
    page_number: nextPageIndex,
    title,
    concept_target: conceptTarget,
    visual_format: format,
    page_purpose: pagePurpose,
    visual_argument: visualArgument,
    user_action_prompt: userActionPrompt,
    memory_target: memoryTarget,
    difficulty_level: input.academicLevel,
    svg_content: svgContent,
    content_payload: {
      format,
      generatedAt: new Date().toISOString(),
      entitiesCovered: newEntities,
    },
    thinking_space_title: thinkingSpaceTitle,
    thinking_space_prompt: thinkingSpacePrompt,
    newEntities,
  };
}
