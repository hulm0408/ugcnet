'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handledRef = useRef(false);

  useEffect(() => {
    // Only fire once per mount/param change
    if (handledRef.current) return;

    const loginParam = searchParams.get('login');
    const logoutParam = searchParams.get('logout');

    if (loginParam === 'success') {
      toast.success('Successfully logged in!', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#107A53',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
        },
        iconTheme: { primary: '#fff', secondary: '#107A53' },
      });
      cleanUrl();
    } else if (logoutParam === 'success') {
      toast('Successfully logged out.', {
        duration: 4000,
        position: 'top-center',
        icon: '👋',
        style: {
          background: '#1c1917', // stone-900
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '12px',
        },
      });
      cleanUrl();
    }

    function cleanUrl() {
      handledRef.current = true;
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('login');
      newParams.delete('logout');
      const search = newParams.toString();
      const newUrl = search ? `${pathname}?${search}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return <Toaster />;
}
