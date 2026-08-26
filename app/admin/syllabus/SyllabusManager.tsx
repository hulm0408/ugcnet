'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Save, X } from 'lucide-react';
import { updateSyllabusUnit, updateBroadTopic, updateSubtopic } from '../actions';
import toast from 'react-hot-toast';

type UnitData = {
  id: string;
  unit_number: number;
  name_arabic: string;
  name_english: string;
  is_active: boolean;
  broad_topics: BroadTopicData[];
};

type BroadTopicData = {
  id: string;
  name_arabic: string;
  name_english: string;
  is_active: boolean;
  subtopics: SubtopicData[];
};

type SubtopicData = {
  id: string;
  name_arabic: string;
  name_english: string;
  is_active: boolean;
};

export default function SyllabusManager({ initialUnits }: { initialUnits: UnitData[] }) {
  const [units, setUnits] = useState(initialUnits);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name_arabic: '', name_english: '', is_active: true });
  const [saving, setSaving] = useState(false);

  const toggleUnit = (id: string) => {
    const next = new Set(expandedUnits);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedUnits(next);
  };

  const toggleTopic = (id: string) => {
    const next = new Set(expandedTopics);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedTopics(next);
  };

  const startEdit = (id: string, name_arabic: string, name_english: string, is_active: boolean) => {
    setEditingId(id);
    setEditForm({ name_arabic, name_english, is_active });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (id: string, type: 'unit' | 'topic' | 'subtopic') => {
    setSaving(true);
    try {
      if (type === 'unit') {
        await updateSyllabusUnit(id, editForm);
      } else if (type === 'topic') {
        await updateBroadTopic(id, editForm);
      } else if (type === 'subtopic') {
        await updateSubtopic(id, editForm);
      }

      // Optimistic update
      const updatedUnits = [...units];
      if (type === 'unit') {
        const u = updatedUnits.find((u) => u.id === id);
        if (u) {
          u.name_arabic = editForm.name_arabic;
          u.name_english = editForm.name_english;
          u.is_active = editForm.is_active;
        }
      } else if (type === 'topic') {
        for (const u of updatedUnits) {
          const t = u.broad_topics.find((t) => t.id === id);
          if (t) {
            t.name_arabic = editForm.name_arabic;
            t.name_english = editForm.name_english;
            t.is_active = editForm.is_active;
            break;
          }
        }
      } else if (type === 'subtopic') {
        for (const u of updatedUnits) {
          for (const t of u.broad_topics) {
            const st = t.subtopics.find((st) => st.id === id);
            if (st) {
              st.name_arabic = editForm.name_arabic;
              st.name_english = editForm.name_english;
              st.is_active = editForm.is_active;
              break;
            }
          }
        }
      }
      setUnits(updatedUnits);
      setEditingId(null);
      toast.success('Updated successfully.');
    } catch {
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {units.map((unit) => {
        const isUnitExpanded = expandedUnits.has(unit.id);
        const isUnitEditing = editingId === unit.id;

        return (
          <div key={unit.id} className="border border-stone-800 rounded-2xl bg-stone-950/40 overflow-hidden">
            {/* Unit Header */}
            <div className="p-4 flex items-center justify-between gap-4 bg-stone-900/60 border-b border-stone-800">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.id)}
                  className="p-1 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isUnitExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {isUnitEditing ? (
                  <div className="flex flex-col sm:flex-row gap-2 flex-1 max-w-xl">
                    <input
                      type="text"
                      value={editForm.name_english}
                      onChange={(e) => setEditForm({ ...editForm, name_english: e.target.value })}
                      className="px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white"
                      placeholder="English Title"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={editForm.name_arabic}
                      onChange={(e) => setEditForm({ ...editForm, name_arabic: e.target.value })}
                      className="px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs font-arabic text-white"
                      placeholder="Arabic Title"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs">
                      UNIT {unit.unit_number}
                    </span>
                    <span className="font-bold text-sm text-white truncate">{unit.name_english}</span>
                    <span dir="rtl" className="font-arabic font-semibold text-xs text-stone-400 hidden sm:inline">
                      ({unit.name_arabic})
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {isUnitEditing ? (
                  <>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleSave(unit.id, 'unit')}
                      className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
                    >
                      <Save size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="p-1.5 bg-stone-800 text-stone-400 rounded-lg hover:bg-stone-700"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(unit.id, unit.name_arabic, unit.name_english, unit.is_active)}
                    className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Broad Topics List */}
            {isUnitExpanded && (
              <div className="p-4 space-y-3 bg-stone-950/20">
                {unit.broad_topics.map((topic) => {
                  const isTopicExpanded = expandedTopics.has(topic.id);
                  const isTopicEditing = editingId === topic.id;

                  return (
                    <div key={topic.id} className="border border-stone-800/80 rounded-xl bg-stone-900/40 p-3 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <button
                            type="button"
                            onClick={() => toggleTopic(topic.id)}
                            className="p-1 hover:bg-stone-800 rounded text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
                          >
                            {isTopicExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                          {isTopicEditing ? (
                            <div className="flex gap-2 flex-1 max-w-lg">
                              <input
                                type="text"
                                value={editForm.name_english}
                                onChange={(e) => setEditForm({ ...editForm, name_english: e.target.value })}
                                className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-xs text-white"
                              />
                              <input
                                type="text"
                                dir="rtl"
                                value={editForm.name_arabic}
                                onChange={(e) => setEditForm({ ...editForm, name_arabic: e.target.value })}
                                className="px-2.5 py-1 bg-stone-900 border border-stone-700 rounded text-xs font-arabic text-white"
                              />
                            </div>
                          ) : (
                            <div className="truncate">
                              <span className="font-semibold text-xs text-stone-200">{topic.name_english}</span>
                              <span dir="rtl" className="font-arabic text-xs text-stone-400 ml-2">
                                {topic.name_arabic}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div>
                          {isTopicEditing ? (
                            <div className="flex gap-1">
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => handleSave(topic.id, 'topic')}
                                className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-500"
                              >
                                <Save size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="p-1 bg-stone-800 text-stone-400 rounded hover:bg-stone-700"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEdit(topic.id, topic.name_arabic, topic.name_english, topic.is_active)}
                              className="p-1 text-stone-500 hover:text-stone-300 rounded cursor-pointer"
                            >
                              <Edit2 size={12} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Subtopics / Nodes list */}
                      {isTopicExpanded && (
                        <div className="pl-6 pt-2 border-t border-stone-800/60 space-y-1.5">
                          {topic.subtopics.map((st) => (
                            <div
                              key={st.id}
                              className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-stone-950/40 text-stone-300 border border-stone-800/40"
                            >
                              <span>{st.name_english}</span>
                              <span dir="rtl" className="font-arabic text-stone-400">
                                {st.name_arabic}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
