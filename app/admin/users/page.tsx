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
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      lastActiveAt: true,
    }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">User Management</h1>
          <p className="text-sm text-stone-500 mt-1">Manage user accounts and administrative roles.</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-stone-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <span className="font-bold text-stone-900">{users.length}</span>
          <span className="text-sm text-stone-500 font-medium">Total Users</span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-stone-500">
          <thead className="bg-stone-50/80 backdrop-blur-sm text-xs uppercase text-stone-700 font-semibold border-b border-stone-200/60">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Last Active</th>
              {isSuperAdmin && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-stone-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-stone-900 group-hover:text-primary transition-colors">{user.name || 'Anonymous User'}</span>
                    <span className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <Mail size={12} /> {user.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${
                    user.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    user.role === 'ADMIN' ? 'bg-primary/10 text-primary-dark border-primary/20' :
                    'bg-stone-100 text-stone-600 border-stone-200'
                  }`}>
                    {user.role === 'SUPER_ADMIN' ? <ShieldAlert size={12} /> : 
                     user.role === 'ADMIN' ? <Shield size={12} /> : null}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.lastActiveAt ? user.lastActiveAt.toLocaleDateString() : 'Never'}
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
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                        >
                          {user.role === 'USER' ? 'Make Admin' : 'Revoke Admin'}
                        </button>
                      </form>
                    ) : (
                      <span className="text-xs text-stone-400 font-medium italic">You</span>
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
