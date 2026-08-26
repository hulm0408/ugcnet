import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Panel — UGC NET Practice',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-stone-950 font-sans text-stone-100">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 lg:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
