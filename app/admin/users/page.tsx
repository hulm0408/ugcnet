import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { Users, Shield, ShieldAlert, Mail } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const metadata: Metadata = {
  title: 'User Directory | Admin',
};

// Server Action to update role
async function updateUserRole(userId: string, newRole: string) {
  'use server';
  const session = await auth();
  if (session?.user?.role !== 'SUPER_ADMIN' && session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized. Only Admins can change roles.');
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath('/admin/users');
}

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }

  const isSuperAdmin = session.user.role === 'SUPER_ADMIN';

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      lastActiveAt: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Users size={13} />
            <span>User Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Registered Candidates &amp; Admins
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 font-medium">
            Manage student access, role permissions, and activity status.
          </p>
        </div>

        <div className="bg-stone-900 px-4 py-2 rounded-xl border border-stone-800 flex items-center gap-2">
          <Users size={16} className="text-emerald-400" />
          <span className="font-bold text-white font-mono text-sm">{users.length}</span>
          <span className="text-xs text-stone-400">Total Users</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950/60 font-mono text-[10px] text-stone-400 uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-4 py-3.5">Joined</th>
                <th className="px-4 py-3.5">Last Active</th>
                {isSuperAdmin && <th className="px-5 py-3.5 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-medium">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-white text-sm">{user.name || 'Anonymous Aspirant'}</div>
                    <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5 font-mono">
                      <Mail size={12} /> {user.email}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                        user.role === 'SUPER_ADMIN'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : user.role === 'ADMIN'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-stone-800 text-stone-400 border-stone-700'
                      }`}
                    >
                      {user.role === 'SUPER_ADMIN' ? (
                        <ShieldAlert size={12} />
                      ) : user.role === 'ADMIN' ? (
                        <Shield size={12} />
                      ) : null}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-stone-400 font-mono text-[11px]">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-stone-400 font-mono text-[11px]">
                    {user.lastActiveAt ? user.lastActiveAt.toLocaleDateString() : 'Never'}
                  </td>
                  {isSuperAdmin && (
                    <td className="px-5 py-4 text-right">
                      <form
                        action={async () => {
                          'use server';
                          const nextRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
                          await updateUserRole(user.id, nextRole);
                        }}
                      >
                        <button
                          type="submit"
                          className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          Toggle {user.role === 'ADMIN' ? 'to User' : 'to Admin'}
                        </button>
                      </form>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
