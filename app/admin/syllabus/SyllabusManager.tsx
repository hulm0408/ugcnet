'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Save, X } from 'lucide-react';
import { updateSyllabusUnit, updateBroadTopic, updateSubtopic } from '../actions';

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
        const u = updatedUnits.find(u => u.id === id);
        if (u) {
          u.name_arabic = editForm.name_arabic;
          u.name_english = editForm.name_english;
          u.is_active = editForm.is_active;
        }
      } else if (type === 'topic') {
        for (const u of updatedUnits) {
          const t = u.broad_topics.find(t => t.id === id);
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
            const st = t.subtopics.find(st => st.id === id);
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
    } catch (e) {
      console.error(e);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const renderEditForm = (id: string, type: 'unit' | 'topic' | 'subtopic') => (
    <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2">
      <div className="grid gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Arabic Name</label>
          <input
            type="text"
            dir="rtl"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg font-arabic mt-1"
            value={editForm.name_arabic}
            onChange={e => setEditForm({ ...editForm, name_arabic: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">English Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg mt-1"
            value={editForm.name_english}
            onChange={e => setEditForm({ ...editForm, name_english: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            id={`active-${id}`}
            checked={editForm.is_active}
            onChange={e => setEditForm({ ...editForm, is_active: e.target.checked })}
          />
          <label htmlFor={`active-${id}`} className="text-sm text-slate-700">Active (Published)</label>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button 
            disabled={saving}
            onClick={() => handleSave(id, type)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} /> Save
          </button>
          <button 
            disabled={saving}
            onClick={cancelEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 disabled:opacity-50"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {units.map(unit => (
        <div key={unit.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 bg-slate-50/80 border-b border-slate-200">
            <button onClick={() => toggleUnit(unit.id)} className="flex items-center gap-3 flex-1 text-left">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold shrink-0">
                {unit.unit_number}
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">{unit.name_english}</div>
                <div className="font-arabic text-slate-600" dir="rtl">{unit.name_arabic}</div>
              </div>
              <div className="text-slate-400">
                {expandedUnits.has(unit.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </button>
            <button 
              onClick={() => startEdit(unit.id, unit.name_arabic, unit.name_english, unit.is_active)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ml-4"
            >
              <Edit2 size={18} />
            </button>
          </div>
          
          {editingId === unit.id && (
            <div className="px-4 pb-4">
              {renderEditForm(unit.id, 'unit')}
            </div>
          )}

          {expandedUnits.has(unit.id) && (
            <div className="p-4 pl-12 space-y-3">
              {unit.broad_topics.map(topic => (
                <div key={topic.id} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between p-3 bg-white">
                    <button onClick={() => toggleTopic(topic.id)} className="flex items-center gap-3 flex-1 text-left">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800 text-sm">{topic.name_english}</div>
                        <div className="font-arabic text-slate-500 text-sm" dir="rtl">{topic.name_arabic}</div>
                      </div>
                      <div className="text-slate-300">
                        {expandedTopics.has(topic.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </button>
                    <button 
                      onClick={() => startEdit(topic.id, topic.name_arabic, topic.name_english, topic.is_active)}
                      className="p-1.5 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors ml-4"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>

                  {editingId === topic.id && (
                    <div className="px-3 pb-3">
                      {renderEditForm(topic.id, 'topic')}
                    </div>
                  )}

                  {expandedTopics.has(topic.id) && (
                    <div className="p-3 pl-8 bg-slate-50 space-y-2 border-t border-slate-100">
                      {topic.subtopics.map(subtopic => (
                        <div key={subtopic.id} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                          {editingId === subtopic.id ? (
                            renderEditForm(subtopic.id, 'subtopic')
                          ) : (
                            <>
                              <div className="flex-1">
                                <div className="font-medium text-slate-700 text-sm">{subtopic.name_english}</div>
                                <div className="font-arabic text-slate-500 text-sm mt-0.5" dir="rtl">{subtopic.name_arabic}</div>
                              </div>
                              <button 
                                onClick={() => startEdit(subtopic.id, subtopic.name_arabic, subtopic.name_english, subtopic.is_active)}
                                className="p-1.5 text-slate-300 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors ml-4"
                              >
                                <Edit2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                      {topic.subtopics.length === 0 && (
                        <div className="text-xs text-slate-400 p-2 italic">No subtopics</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
