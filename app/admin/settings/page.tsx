import type { Metadata } from 'next';
import prisma from '@/lib/db';
import { Settings, Shield, Globe } from 'lucide-react';
import SettingsForm from './SettingsForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings — Admin Panel',
  description: 'Manage SEO and Security Settings',
};

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    redirect('/login');
  }

  // Fetch settings from db
  const dbSettings = await prisma.siteSetting.findMany();
  const settingsMap = new Map(dbSettings.map((s: any) => [s.key, s.value]));

  const defaultSettings = {
    seo_title: (settingsMap.get('seo_title') as string) || 'Arabic NET/JRF Practice — UGC NET Arabic Previous Year Questions',
    seo_description: (settingsMap.get('seo_description') as string) || 'Practice UGC NET/JRF Arabic Previous Year Questions from 2004–2023.',
    seo_keywords: (settingsMap.get('seo_keywords') as string) || 'UGC NET Arabic, JRF Arabic, Arabic PYQ',
    maintenance_mode: (settingsMap.get('maintenance_mode') as boolean) || false,
    allow_registration: (settingsMap.get('allow_registration') as boolean) !== false,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Settings size={13} />
            <span>Platform Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">System Settings</h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 font-medium">
            Manage global platform configuration, SEO metadata, and security rules.
          </p>
        </div>
      </div>

      <SettingsForm initialSettings={defaultSettings} />
    </div>
  );
}
