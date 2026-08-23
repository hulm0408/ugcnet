import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { Users, Shield, ShieldAlert, Mail } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const metadata: Metadata = {
  title: 'User Management | Admin',
};

// Server Action to update role
async function updateUserRole(userId: string, newRole: string) {
  'use server';
  const session = await auth();
  if (session?.user?.role !== 'SUPER_ADMIN') {
    throw new Error('Unauthorized. Only Super Admins can change roles.');
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  });

  revalidatePath('/admin/users');
}

export default async function AdminUsersPage() {
  const session = await auth();
  // Only ADMIN and SUPER_ADMIN can view this page
  if (session?.user?.role !== 'ADMIN' && session?.user?.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }

  const isSuperAdmin = session.user.role === 'SUPER_ADMIN';

  const users = await prisma.user.findMany({
    orderBy: { created_at: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
      last_active_at: true,
    }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage user accounts and administrative roles.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
          <Users size={18} className="text-[#107A53]" />
          <span className="font-bold text-slate-900">{users.length}</span>
          <span className="text-sm text-slate-500 font-medium">Total Users</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-500">
          <thead className="bg-slate-50 text-xs uppercase text-slate-700 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Last Active</th>
              {isSuperAdmin && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{user.name || 'Anonymous User'}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail size={12} /> {user.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${
                    user.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    user.role === 'ADMIN' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {user.role === 'SUPER_ADMIN' ? <ShieldAlert size={12} /> : 
                     user.role === 'ADMIN' ? <Shield size={12} /> : null}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.created_at.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.last_active_at ? user.last_active_at.toLocaleDateString() : 'Never'}
                </td>
                {isSuperAdmin && (
                  <td className="px-6 py-4 text-right">
                    {user.id !== session.user.id ? (
                      <form action={async () => {
                        'use server';
                        const newRole = user.role === 'USER' ? 'ADMIN' : 'USER';
                        await updateUserRole(user.id, newRole);
                      }}>
                        <button 
                          type="submit"
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >
                          {user.role === 'USER' ? 'Make Admin' : 'Revoke Admin'}
                        </button>
                      </form>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium italic">You</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
