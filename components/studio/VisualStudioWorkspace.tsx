'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Plus,
  Brain,
  Target,
  Compass,
  CheckCircle2,
  Save,
  Loader2,
  BookOpen,
  ArrowRight,
  Eye,
  PenTool,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';

interface VisualPage {
  id: string;
  page_number: number;
  title: string;
  concept_target: string;
  visual_format: string;
  page_purpose: string;
  visual_argument: string;
  user_action_prompt: string;
  memory_target: string;
  difficulty_level: string;
  svg_content: string;
  thinking_space_title: string | null;
  thinking_space_prompt: string | null;
  user_notes: string | null;
}

interface VisualProject {
  id: string;
  title: string;
  description: string | null;
  academic_level: string;
  visual_theme: string;
  subject: {
    id: string;
    code: string;
    slug: string;
    name: string;
    name_native: string | null;
    direction: string;
  } | null;
  pages: VisualPage[];
}

interface VisualStudioWorkspaceProps {
  initialProjects: VisualProject[];
  activeSubject: any;
}

export default function VisualStudioWorkspace({
  initialProjects,
  activeSubject,
}: VisualStudioWorkspaceProps) {
  const [projects, setProjects] = useState<VisualProject[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjects[0]?.id || ''
  );
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [userNotes, setUserNotes] = useState<string>('');
  const [savingNotes, setSavingNotes] = useState<boolean>(false);
  const [generatingNextPage, setGeneratingNextPage] = useState<boolean>(false);
  const [customTopicPrompt, setCustomTopicPrompt] = useState<string>('');
  const [showNewProjectModal, setShowNewProjectModal] = useState<boolean>(false);
  const [newProjectTitle, setNewProjectTitle] = useState<string>('');
  const [creatingProject, setCreatingProject] = useState<boolean>(false);

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const currentPage = currentProject?.pages[activePageIndex] || currentProject?.pages[0];

  useEffect(() => {
    if (currentPage) {
      setUserNotes(currentPage.user_notes || '');
    }
  }, [currentPage?.id]);

  const handleSaveNotes = async () => {
    if (!currentPage) return;
    setSavingNotes(true);
    try {
      await fetch(`/api/studio/pages/${currentPage.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userNotes }),
      });
      // Update local state
      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id !== currentProject.id) return proj;
          return {
            ...proj,
            pages: proj.pages.map((pg) =>
              pg.id === currentPage.id ? { ...pg, user_notes: userNotes } : pg
            ),
          };
        })
      );
    } catch (err) {
      console.error('Failed to save thinking space notes:', err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleGenerateNextPage = async () => {
    if (!currentProject) return;
    setGeneratingNextPage(true);
    try {
      const res = await fetch('/api/studio/pages/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: currentProject.id,
          topicPrompt: customTopicPrompt.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (json.success && json.page) {
        setProjects((prev) =>
          prev.map((proj) => {
            if (proj.id !== currentProject.id) return proj;
            return {
              ...proj,
              pages: [...proj.pages, json.page],
            };
          })
        );
        setActivePageIndex(currentProject.pages.length);
        setCustomTopicPrompt('');
      }
    } catch (err) {
      console.error('Failed to generate next page:', err);
    } finally {
      setGeneratingNextPage(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    setCreatingProject(true);
    try {
      const res = await fetch('/api/studio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProjectTitle.trim(),
        }),
      });
      const json = await res.json();
      if (json.success && json.project) {
        setProjects([json.project, ...projects]);
        setSelectedProjectId(json.project.id);
        setActivePageIndex(0);
        setShowNewProjectModal(false);
        setNewProjectTitle('');
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    } finally {
      setCreatingProject(false);
    }
  };

  if (!currentProject) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-stone-900 text-white">
        <div className="max-w-md w-full text-center space-y-5 bg-stone-950 p-8 rounded-3xl border border-stone-800 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <Sparkles size={32} />
          </div>
          <h2 className="text-2xl font-black">Your Personal Learning World</h2>
          <p className="text-stone-400 text-xs leading-relaxed">
            Create your first bespoke visual project for <strong>{activeSubject.name}</strong>.
            Every diagram, timeline, map, and exercise is generated specifically for you.
          </p>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
          >
            Create My {activeSubject.name} Learning Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D0C] text-stone-100 flex flex-col">
      {/* ── TOP ACTION BAR ── */}
      <header className="h-16 border-b border-emerald-950/80 bg-[#060908] px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-stone-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-stone-900"
          >
            <ChevronLeft size={18} />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                UGC NET {activeSubject.code}
              </span>
              <h1 className="text-sm font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-xs">
                {currentProject.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Project Switcher + New Project */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              setActivePageIndex(0);
            }}
            className="bg-stone-900 border border-stone-800 text-stone-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.pages.length} Plates)
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowNewProjectModal(true)}
            className="p-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl transition-all text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Project</span>
          </button>
        </div>
      </header>

      {/* ── WORKSPACE BODY ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── LEFT / MAIN: INTERACTIVE VECTOR CANVAS ── */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto">
          {/* Filmstrip Pagination */}
          <div className="flex items-center justify-between mb-4 bg-stone-950 p-2 rounded-2xl border border-stone-800/80">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {currentProject.pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePageIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    idx === activePageIndex
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <span>Plate 0{p.page_number}</span>
                  <span className="text-[10px] opacity-75 font-mono">[{p.visual_format.replace('_', ' ')}]</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                onClick={() => setActivePageIndex(Math.max(0, activePageIndex - 1))}
                disabled={activePageIndex === 0}
                className="p-1.5 rounded-lg bg-stone-900 text-stone-300 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-mono text-stone-400">
                {activePageIndex + 1} / {currentProject.pages.length}
              </span>
              <button
                onClick={() => setActivePageIndex(Math.min(currentProject.pages.length - 1, activePageIndex + 1))}
                disabled={activePageIndex === currentProject.pages.length - 1}
                className="p-1.5 rounded-lg bg-stone-900 text-stone-300 hover:text-white disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* SVG Vector Canvas Display */}
          <div className="flex-1 bg-stone-950 rounded-3xl border border-emerald-950/80 p-3 sm:p-4 shadow-2xl relative overflow-hidden flex items-center justify-center min-h-[420px]">
            {currentPage ? (
              <div
                className="w-full h-full flex items-center justify-center transition-all animate-in zoom-in-95 duration-200"
                dangerouslySetInnerHTML={{ __html: currentPage.svg_content }}
              />
            ) : (
              <div className="text-stone-500 text-xs font-mono">Loading vector plate...</div>
            )}
          </div>

          {/* Active Learning Prompt Banner (Directly Under Visual) */}
          {currentPage && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-xs">
              <Compass size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-emerald-300 uppercase tracking-wider text-[10px]">
                  Your Active Learning Challenge
                </div>
                <div className="text-emerald-100 font-medium mt-0.5">
                  {currentPage.user_action_prompt}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ── RIGHT PANEL: PEDAGOGY, THINKING SPACE & NEXT CHAPTER ── */}
        <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-stone-800/80 bg-[#060908] p-4 sm:p-6 space-y-6 overflow-y-auto shrink-0">
          {/* 1. Page Purpose & Memory Target */}
          {currentPage && (
            <div className="space-y-3 bg-stone-950 p-4 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Target size={14} />
                <span>Plate Purpose & Memory Target</span>
              </div>
              <div className="text-xs text-stone-300 font-medium leading-relaxed">
                {currentPage.page_purpose}
              </div>
              <div className="pt-2 border-t border-stone-800/80 flex items-start gap-2 text-xs">
                <Brain size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-200 font-bold">
                  {currentPage.memory_target}
                </div>
              </div>
            </div>
          )}

          {/* 2. Personalized Thinking & Connection Space */}
          <div className="space-y-3 bg-stone-950 p-4 rounded-2xl border border-stone-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <PenTool size={14} />
                <span>Your Thinking Space</span>
              </div>
              <button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-stone-200 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 border border-stone-700"
              >
                {savingNotes ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
                <span>Save Note</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-400 font-medium">
              {currentPage?.thinking_space_prompt ||
                'Write your personal mnemonic, formula, or observation to anchor this plate.'}
            </p>

            <textarea
              rows={4}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Type your personal observations, dates, memory connections, or questions here..."
              className="w-full bg-[#090D0C] border border-stone-800 rounded-xl p-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
            />
          </div>

          {/* 3. Intelligent "Next Chapter / Page" Assistant */}
          <div className="space-y-3 bg-gradient-to-br from-emerald-950/60 to-stone-950 p-4 rounded-2xl border border-emerald-800/50">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-300">
              <Sparkles size={14} />
              <span>Next Learning Piece</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-medium">
              {currentProject.pages.length === 1
                ? 'You have established the foundational geography. Next: Generate a chronological timeline connecting these regions to their turning points.'
                : 'Ready for the next piece of your learning world? Specify a focus or let AI suggest the optimal visual format.'}
            </p>

            <input
              type="text"
              value={customTopicPrompt}
              onChange={(e) => setCustomTopicPrompt(e.target.value)}
              placeholder="e.g. Mu'allaqat Poets or Leave blank for auto..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={handleGenerateNextPage}
              disabled={generatingNextPage}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {generatingNextPage ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Authoring Next Chapter...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Generate Plate 0{currentProject.pages.length + 1}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* ── CREATE PROJECT MODAL ── */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">
              Create New {activeSubject.name} Learning Project
            </h3>
            <p className="text-xs text-stone-400">
              Every project develops its own continuous visual story, design continuity, and personal memory anchors.
            </p>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <input
                type="text"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder={`e.g. ${activeSubject.name} Classical Period Atlas`}
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingProject}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  {creatingProject ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                  <span>Create Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
