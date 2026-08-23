import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  labelAr?: string;
  href?: string;
};

export default function SyllabusBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-1.5 text-xs font-semibold text-stone-500">
      <Link
        href="/syllabus"
        className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors bg-white border border-stone-200/80 px-2.5 py-1.5 rounded-lg shadow-sm"
      >
        <Home size={13} className="text-primary" />
        <span>Syllabus</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={idx}>
            <ChevronRight size={13} className="text-stone-400 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-stone-600 hover:text-stone-900 hover:underline transition-colors px-1.5 py-1 rounded max-w-xs truncate"
                title={item.label}
              >
                {item.label}
                {item.labelAr && (
                  <span dir="rtl" lang="ar" className="font-arabic font-bold text-stone-700 ml-1 text-[13px]">
                    ({item.labelAr})
                  </span>
                )}
              </Link>
            ) : (
              <span
                className="text-stone-900 font-bold px-1.5 py-1 max-w-xs sm:max-w-md truncate bg-stone-100/80 rounded"
                title={item.label}
              >
                {item.label}
                {item.labelAr && (
                  <span dir="rtl" lang="ar" className="font-arabic font-bold text-stone-900 ml-1 text-[13px]">
                    ({item.labelAr})
                  </span>
                )}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
