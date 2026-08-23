'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteAccountButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone and all your practice data, bookmarks, and reports will be permanently lost.')) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/user/delete', { method: 'DELETE' });
      if (res.ok) {
        window.location.href = '/';
      } else {
        alert('Failed to delete account. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 mt-6 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
      {loading ? 'Deleting...' : 'Delete Account Permanently'}
    </button>
  );
}
