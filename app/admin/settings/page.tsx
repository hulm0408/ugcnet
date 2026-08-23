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
    seo_title: settingsMap.get('seo_title') as string || 'Arabic NET/JRF Practice — UGC NET Arabic Previous Year Questions',
    seo_description: settingsMap.get('seo_description') as string || 'Practice UGC NET/JRF Arabic Previous Year Questions from 2004–2023.',
    seo_keywords: settingsMap.get('seo_keywords') as string || 'UGC NET Arabic, JRF Arabic, Arabic PYQ',
    maintenance_mode: settingsMap.get('maintenance_mode') as boolean || false,
    allow_registration: settingsMap.get('allow_registration') as boolean !== false, // defaults to true
  };

  return (
    <div className="flex-1 bg-transparent min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 text-primary-dark rounded-xl flex items-center justify-center shadow-sm">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Platform Settings</h1>
            <p className="text-stone-500 mt-1">Manage global configuration, SEO metadata, and security rules.</p>
          </div>
        </div>

        <SettingsForm initialSettings={defaultSettings} />

      </div>
    </div>
  );
}
