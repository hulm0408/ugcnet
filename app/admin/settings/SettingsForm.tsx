'use client';

import React, { useState } from 'react';
import { updateSiteSetting } from '../actions';
import { Save, Globe, Shield, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

type SettingsState = {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  maintenance_mode: boolean;
  allow_registration: boolean;
};

export default function SettingsForm({ initialSettings }: { initialSettings: SettingsState }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSetting('seo_title', settings.seo_title);
      await updateSiteSetting('seo_description', settings.seo_description);
      await updateSiteSetting('seo_keywords', settings.seo_keywords);
      await updateSiteSetting('maintenance_mode', settings.maintenance_mode);
      await updateSiteSetting('allow_registration', settings.allow_registration);
      toast.success('Settings saved successfully.');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* SEO Settings */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-stone-950/60 border-b border-stone-800 px-6 py-4 flex items-center gap-3">
          <Globe className="text-emerald-400" size={18} />
          <h2 className="font-bold text-white text-base">SEO &amp; Meta Configuration</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">Site Title Tag</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-stone-950/60 border border-stone-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
              value={settings.seo_title}
              onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">Meta Description</label>
            <textarea
              rows={3}
              className="w-full px-3.5 py-2.5 bg-stone-950/60 border border-stone-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-all leading-relaxed"
              value={settings.seo_description}
              onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">SEO Keywords</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-stone-950/60 border border-stone-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-all"
              value={settings.seo_keywords}
              onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
            />
            <p className="text-[11px] text-stone-500 mt-1 font-mono">Comma-separated keywords.</p>
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-stone-950/60 border-b border-stone-800 px-6 py-4 flex items-center gap-3">
          <Shield className="text-emerald-400" size={18} />
          <h2 className="font-bold text-white text-base">Security &amp; System Access</h2>
        </div>
        <div className="p-6 space-y-4">
          <label className="flex items-start gap-4 p-4 rounded-2xl border border-stone-800 hover:bg-stone-800/40 transition-colors cursor-pointer bg-stone-950/40">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 text-emerald-600 rounded border-stone-700 focus:ring-emerald-500"
              checked={settings.allow_registration}
              onChange={(e) => setSettings({ ...settings, allow_registration: e.target.checked })}
            />
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">Allow New Candidate Signups</div>
              <div className="text-xs text-stone-400 mt-0.5">
                When enabled, students can create free accounts to track mistakes and 5-level memories.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 rounded-2xl border border-stone-800 hover:bg-stone-800/40 transition-colors cursor-pointer bg-stone-950/40">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 text-amber-600 rounded border-stone-700 focus:ring-amber-500"
              checked={settings.maintenance_mode}
              onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
            />
            <div>
              <div className="font-bold text-amber-400 text-xs sm:text-sm">Maintenance Mode</div>
              <div className="text-xs text-stone-400 mt-0.5">
                Show maintenance screen to non-admin visitors during schema updates.
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
          ) : (
            <>
              <Save size={15} />
              <span>Save System Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
