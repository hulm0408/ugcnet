import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, Users, FileText, BarChart3, ChevronRight, AlertTriangle, Layers, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Arabic NET/JRF admin management panel.',
};

const adminSections = [
  {
    title: 'Questions',
    desc: 'View, edit, and classify questions',
    href: '/admin/questions',
    icon: FileText,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Import Jobs',
    desc: 'Manage JSON/CSV question imports',
    href: '/admin/import',
    icon: Database,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Users',
    desc: 'Manage user accounts and roles',
    href: '/admin/users',
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Analytics',
    desc: 'Practice stats and question performance',
    href: '/admin/analytics',
    icon: BarChart3,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Syllabus',
    desc: 'Manage Units, Topics, and Subtopics',
    href: '/admin/syllabus',
    icon: Layers,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Settings',
    desc: 'SEO metadata and Security rules',
    href: '/admin/settings',
    icon: Settings,
    color: 'bg-slate-50 text-slate-600',
  },
];

export default function AdminPage() {
  return (
    <div className="flex-1 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Arabic NET/JRF Platform Management</p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <AlertTriangle size={14} className="text-amber-500" />
            <span className="text-xs font-medium text-amber-700">Admin access only</span>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {adminSections.map(({ title, desc, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex items-center gap-4"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 text-sm">{title}</div>
                <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Quick Stats Placeholder */}
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-semibold text-slate-900 text-sm mb-4">Database Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Total Questions', 'Published', 'Draft', 'Users'].map((label) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-slate-800">—</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
