'use client';

import React, { useState } from 'react';
import { updateSiteSetting } from '../actions';
import { Save, Globe, Shield, AlertTriangle } from 'lucide-react';

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
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMessage('');
    try {
      await updateSiteSetting('seo_title', settings.seo_title);
      await updateSiteSetting('seo_description', settings.seo_description);
      await updateSiteSetting('seo_keywords', settings.seo_keywords);
      await updateSiteSetting('maintenance_mode', settings.maintenance_mode);
      await updateSiteSetting('allow_registration', settings.allow_registration);
      setSavedMessage('Settings saved successfully.');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error(error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
      {/* SEO Settings */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
          <Globe className="text-blue-500" size={20} />
          <h2 className="font-bold text-slate-900 text-lg">SEO Metadata</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Site Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={settings.seo_title}
              onChange={e => setSettings({ ...settings, seo_title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Meta Description</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={settings.seo_description}
              onChange={e => setSettings({ ...settings, seo_description: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Keywords</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={settings.seo_keywords}
              onChange={e => setSettings({ ...settings, seo_keywords: e.target.value })}
            />
            <p className="text-xs text-slate-500 mt-1">Comma separated keywords.</p>
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
          <Shield className="text-emerald-500" size={20} />
          <h2 className="font-bold text-slate-900 text-lg">Security & Access</h2>
        </div>
        <div className="p-6 space-y-6">
          <label className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              checked={settings.allow_registration}
              onChange={e => setSettings({ ...settings, allow_registration: e.target.checked })}
            />
            <div>
              <div className="font-bold text-slate-900">Allow New User Registrations</div>
              <div className="text-sm text-slate-500 mt-0.5">When disabled, no new accounts can be created.</div>
            </div>
          </label>

          <label className="flex items-start gap-4 p-4 rounded-2xl border border-red-100 bg-red-50/50 hover:bg-red-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 text-red-600 rounded border-red-300 focus:ring-red-500"
              checked={settings.maintenance_mode}
              onChange={e => setSettings({ ...settings, maintenance_mode: e.target.checked })}
            />
            <div>
              <div className="font-bold text-red-900 flex items-center gap-2">
                Enable Maintenance Mode
                {settings.maintenance_mode && <AlertTriangle size={16} className="text-red-500" />}
              </div>
              <div className="text-sm text-red-700/80 mt-0.5">When enabled, the site will be inaccessible to non-admins. Use with caution.</div>
            </div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {savedMessage && (
          <span className="text-emerald-600 font-medium text-sm animate-fade-in">{savedMessage}</span>
        )}
      </div>

    </form>
  );
}
